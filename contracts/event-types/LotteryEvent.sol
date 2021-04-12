// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;


/**
@title A Lottery contract for handling a lottery process
@author Stephen Eades
@notice This contract...
@dev This contract...
*/
contract RaffleEvent {


    // Define the RaffleEvent
    string public contractName;
    address payable public contractAddress;
    address public authorAddress;
    bool public contractExists;
    uint256 public expirationDate;
    string public contractType;
    uint public ticketCount;
    Ticket public winningTicket;
    Ticket[] public ticketArray;
    uint public buyin;


    // Map each Ticket using the current total count as id
    mapping (uint => Ticket) public ticketRaffleMap;


    /**
    Model for each ticket
    */
    struct Ticket {
        uint id;
        address owner;
        uint number; // Unique hash
        string status; // Available or Sold
        bool winner;
    }


    /**
    Sets the initial properties for this contract. Called on by the EventCreator contract.
    @param _contractName the name of the event contract
    @param _authorAddress the address of the authoring user
    @param _contractExists if the contract is instantiated or not
    @param _expirationDate the date the contract becomes expired
    */
    function setRaffleEvent(string memory _contractName, address _authorAddress, bool _contractExists, uint256 _expirationDate, uint _ticketCount, uint _buyin) public {
        contractName = _contractName;
        contractAddress = address(uint160(address(this)));
        authorAddress = _authorAddress;
        contractExists = _contractExists;
        expirationDate = _expirationDate;
        ticketCount = _ticketCount;
        contractType = 'lottery';
        buyin = _buyin;
        setupRaffle();
    }


    /**
    Gets the type of the Event
    @return string type of the contract
    */
    function getContractType() public view returns(string memory) {
        return contractType;
    }
    

    /**
    Gets the name of the Lottery Event
    @return string name of the Lottery 
    */
    function getContractName() public view returns(string memory) {
        return contractName;
    }


    /**
    Gets the author of the Lottery Event
    @return address the address that created the contract
    */
    function getContractAuthor() public view returns(address) {
        return authorAddress;
    }


    /**
    Checks the contracts existing state
    @return bool the contract existing or not
    */
    function doesContractExists() public view returns(bool) {
        return contractExists;
    }


    /**
    Gets the expiration date of the Lottery Event
    @return uint256 the timestamp of the expiration date
    */
    function getContractExpirationDate() public view returns(uint256) {
        return expirationDate;
    }


    /**
    Configures and sets initial values for the lottery
    */
    function setupRaffle() public {
        // Generate the winning ticket first
        generateWinningTicket();

        // Since winning ticket is already created, loop once less
        for (uint i=1; i<ticketCount; i++) {
            uint uniqueNumber = uint256(keccak256(abi.encodePacked(i, block.difficulty, now))); 
            generateTicket(i, uniqueNumber);
        }   
        // shuffleTickets(); // TODO: Fix this, indexing is bugged
    }


    /**
    What function does here
    @return type description...
    */
    function generateTicket(uint i, uint uniqueNumber) public { 
        Ticket memory ticket = Ticket(i, address(0), uniqueNumber, 'Available', false);
        ticketRaffleMap[i+1] = ticket;
        ticketArray.push(ticket);
    }


    /**
    What function does here
    @return type description...
    */
    function generateWinningTicket() public { 
        uint number = 0;
        uint uniqueNumber = uint256(keccak256(abi.encodePacked(number, block.difficulty, now)));
        Ticket memory ticket = Ticket(0, address(0), uniqueNumber, 'Available', true);
        ticketRaffleMap[0+1] = ticket;
        ticketArray.push(ticket);
    }


    /**
    What function does here
    @return type description...
    */
    function shuffleTickets() public { 
        for (uint256 i = 0; i < ticketArray.length; i++) {
            uint256 n = i + uint(keccak256(abi.encodePacked(now))) % (ticketArray.length - i); // number between 0-(ticketcount-1)

            Ticket memory temp = ticketRaffleMap[n+1]; // grab a ticket to store
            ticketRaffleMap[n+1] = ticketRaffleMap[i+1]; // // assign a different ticket to its spot
            ticketRaffleMap[i+1] = temp; // assign the stored ticked to the other spot, swap essentially
        }
    }


    /**
    What function does here
    @return type description...
    */
    function getRaffleData() external view returns (uint[] memory, address[] memory, uint[] memory, string[] memory, uint) {
        // return the id of each ticket
        uint[] memory tempTicketIdArray = new uint[](ticketCount);
        for (uint i=0; i<ticketCount; i++) {
            tempTicketIdArray[i] = ticketRaffleMap[(i+1)].id;
        }
        
        // return the addresses
        address[] memory tempTicketAddressesArray = new address[](ticketCount);
        for (uint i=0; i<ticketCount; i++) {
            tempTicketAddressesArray[i] = ticketRaffleMap[(i+1)].owner;
        }

        // return the unique ticket number
        uint[] memory tempTicketNumberArray = new uint[](ticketCount);
        for (uint i=0; i<ticketCount; i++) {
            tempTicketNumberArray[i] = ticketRaffleMap[(i+1)].number;
        }

        // return the ticket status
        string[] memory tempTicketStatusArray = new string[](ticketCount);
        for (uint i=0; i<ticketCount; i++) {
            tempTicketStatusArray[i] = ticketRaffleMap[(i+1)].status;
        }

        return (tempTicketIdArray, tempTicketAddressesArray, tempTicketNumberArray, tempTicketStatusArray, buyin);
    }


    /**
    What function does here
    @return type description...
    */
    function canTicketBePurchased(uint id) external view returns(bool) {
        if (keccak256(abi.encodePacked(ticketRaffleMap[id+1].status)) == keccak256(abi.encodePacked("Available"))) {
            if (now < expirationDate) {
                return true;
            }
        }
        return false;
    }


    /**
    What function does here
    @return type description...
    */
    function purchaseTicket(uint id) payable public {
        ticketRaffleMap[id+1].owner = msg.sender;
        ticketRaffleMap[id+1].status = 'Sold';
    }


    /**
    What function does here
    @return type description...
    */
    function canTicketBeClaimed(uint id) external view returns(bool) {
        // The address owns the ticket
        if (msg.sender == ticketRaffleMap[id+1].owner) {
            // The lottery has ended
            if (now >= expirationDate) {
                // The ticket is the winning ticket
                if (ticketRaffleMap[id+1].winner == true) {
                    return true;
                }
            }
        }
        return false;
    }


    /**
    What function does here
    @return type description...
    */
    function claimTicket(uint id) public payable returns(bool) {
        if (ticketRaffleMap[id+1].winner == true) {
            address payable addr = address(uint160(ticketRaffleMap[id+1].owner));
            addr.transfer(contractAddress.balance);
            return true;
        } else {
            return false;
        }
    }


}