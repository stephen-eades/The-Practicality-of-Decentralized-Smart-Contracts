// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;


/**
@title An Escrow contract for handling an escrow process
@author Stephen Eades
@notice This contract...
@dev This contract...
*/
contract EscrowEvent {


    // Define the EscrowEvent
    string public contractName;
    address payable public contractAddress;
    address public authorAddress;
    bool public contractExists;
    uint256 public expirationDate;
    string public contractType;
    string[] public memberAddresses;
    uint public amount;


    // Store the members count
    uint totalMembersInEscrow;


    // Map each member using the current total count as id
    mapping (uint => Member) public memberAddressMap;


    /**
    Model for each member
    */
    struct Member {
        uint id;
        string memberAddress;
        uint currentDeposit;
        uint requiredDeposit;
    }


    /**
    Sets the initial properties for this contract. Called on by the EventCreator contract.
    @param _contractName the name of the event contract
    @param _authorAddress the address of the authoring user
    @param _contractExists if the contract is instantiated or not
    @param _expirationDate the date the contract becomes expired
    */
    function setEscrowEvent(string memory _contractName, address _authorAddress, bool _contractExists, uint256 _expirationDate, string[] memory _memberAddresses, uint _amount) public {
        contractName = _contractName;
        contractAddress = address(uint160(address(this)));
        authorAddress = _authorAddress;
        contractExists = _contractExists;
        expirationDate = _expirationDate;
        contractType = 'escrow';
        memberAddresses = _memberAddresses;
        amount = _amount;
        setupEscrow();
    }


    /**
    Gets the type of the Event
    @return string type of the contract
    */
    function getContractType() public view returns(string memory) {
        return contractType;
    }
    

    /**
    Gets the name of the Escrow Event
    @return string name of the Escrow 
    */
    function getContractName() public view returns(string memory) {
        return contractName;
    }


    /**
    Gets the author of the Escrow Event
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
    Gets the expiration date of the Escrow Event
    @return uint256 the timestamp of the expiration date
    */
    function getContractExpirationDate() public view returns(uint256) {
        return expirationDate;
    }


    /**
    Configures and sets initial values for the escrow
    */
    function setupEscrow() public {
        for (uint i=0; i<memberAddresses.length; i++) {
            addMemberAddress(memberAddresses[i]);
        }   
    }


    /**
    What function does here
    @return type description...
    */
    function addMemberAddress(string memory _address) public {
        totalMembersInEscrow++; 
        memberAddressMap[totalMembersInEscrow] = Member(totalMembersInEscrow, _address, 0, amount);
    }


    /**
    What function does here
    @return type description...
    */
    function getEscrowData() external view returns (string[] memory, uint[] memory, uint[] memory) {
        // return the addresses with id as index in array
        string[] memory tempEscrowAddressesArray = new string[](totalMembersInEscrow);
        for (uint i=0; i<totalMembersInEscrow; i++) {
            tempEscrowAddressesArray[i] = memberAddressMap[(i+1)].memberAddress;
        }

        // return the currentDeposited amount
        uint[] memory tempRequiredAmountsArray = new uint[](totalMembersInEscrow);
        for (uint i=0; i<totalMembersInEscrow; i++) {
            tempRequiredAmountsArray[i] = memberAddressMap[(i+1)].requiredDeposit;
        }

        // return the currentDeposited amount
        uint[] memory tempDepositedAmountsArray = new uint[](totalMembersInEscrow);
        for (uint i=0; i<totalMembersInEscrow; i++) {
            tempDepositedAmountsArray[i] = memberAddressMap[(i+1)].currentDeposit;
        }

        return (tempEscrowAddressesArray, tempRequiredAmountsArray, tempDepositedAmountsArray);
    }


    /**
    What function does here
    @return type description...
    */
    function deposit(string memory _address) payable public {

        // WILL NEED TO PASS ID INSTEAD OF ADDRESS, SINCE MAPPING IS DONE BY ID
        // THIS SHOULD BE EASY TO CHANGE, THEN CAN JUST LOOKUP STORING ETH...

        // logic to allow address to deposit 
        // if msg.sender == _address... then we allow, else error?
        // Will need to somehow check this on the frontend too...

        // After adding, will need to change mapping to remember how much person deposited...
        
    }


}