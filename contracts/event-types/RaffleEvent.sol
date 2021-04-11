// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;


/**
@title A Raffle contract for handling a raffle process
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


    // Store the ticket count
    // uint totalTicketCount;


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
    }


    /**
    Sets the initial properties for this contract. Called on by the EventCreator contract.
    @param _contractName the name of the event contract
    @param _authorAddress the address of the authoring user
    @param _contractExists if the contract is instantiated or not
    @param _expirationDate the date the contract becomes expired
    */
    function setRaffleEvent(string memory _contractName, address _authorAddress, bool _contractExists, uint256 _expirationDate, uint _ticketCount) public {
        contractName = _contractName;
        contractAddress = address(uint160(address(this)));
        authorAddress = _authorAddress;
        contractExists = _contractExists;
        expirationDate = _expirationDate;
        ticketCount = _ticketCount;
        contractType = 'raffle';
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
    Gets the name of the Raffle Event
    @return string name of the Raffle 
    */
    function getContractName() public view returns(string memory) {
        return contractName;
    }


    /**
    Gets the author of the Raffle Event
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
    Gets the expiration date of the Raffle Event
    @return uint256 the timestamp of the expiration date
    */
    function getContractExpirationDate() public view returns(uint256) {
        return expirationDate;
    }


    /**
    Configures and sets initial values for the raffle
    */
    function setupRaffle() public {
        for (uint i=0; i<ticketCount; i++) {
            uint uniqueNumber = uint256(keccak256(abi.encodePacked(i)));
            generateTicket(i, uniqueNumber);
        }   
        // Determine winning ticket
        determineWinningTicket();
    }


    /**
    What function does here
    @return type description...
    */
    function generateTicket(uint i, uint uniqueNumber) public { 
        ticketRaffleMap[i] = Ticket(i, contractAddress, uniqueNumber, 'Available');
    }


    /**
    What function does here
    @return type description...
    */
    function determineWinningTicket() public { 
        uint winningNumber = getRandomNumberInRange();
        uint uniqueNumber = 0;
    }


    /**
    What function does here
    @return type description...
    */
    function getRandomNumberInRange() public returns(uint) { 
        uint randomHash = uint256(keccak256(abi.encodePacked(block.difficulty, now)));
        return randomHash % ticketCount;
        
    }

}