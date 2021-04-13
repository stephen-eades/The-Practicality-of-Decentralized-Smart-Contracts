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
    string public contractType;
    address payable public contractAddress;
    address public authorAddress;
    bool public contractExists;
    uint256 public expirationDate;
    address[] public memberAddresses;
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
        address memberAddress;
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
    function setEscrowEvent(string memory _contractName, address _authorAddress, bool _contractExists, uint256 _expirationDate, address[] memory _memberAddresses, uint _amount) public {
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
    function addMemberAddress(address _address) public {
        totalMembersInEscrow++; 
        memberAddressMap[totalMembersInEscrow] = Member(totalMembersInEscrow, _address, 0, amount);
    }


    /**
    What function does here
    @return type description...
    */
    function getEscrowData() external view returns (address[] memory, uint[] memory, uint[] memory) {
        // return the addresses with id as index in array
        address[] memory tempEscrowAddressesArray = new address[](totalMembersInEscrow);
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
    function canAddressDeposit(uint id) external view returns(bool) {
        if (msg.sender == memberAddressMap[id].memberAddress) {
            // Address is validated, now check if deposit is open
            if (memberAddressMap[id].currentDeposit == 0) {
                return true;
            }
        }
        return false;
    }


    /**
    What function does here
    @return type description...
    */
    function deposit(uint id) payable public {
        memberAddressMap[id].currentDeposit = memberAddressMap[id].requiredDeposit;
    }


    /**
    What function does here
    @return type description...
    */
    function canAddressWithdraw(uint id) external view returns(bool) {
        if (msg.sender == memberAddressMap[id].memberAddress) {
            // Address is validated, now check if deposit is available for withdraw
            if (memberAddressMap[id].currentDeposit == memberAddressMap[id].requiredDeposit) {
                // Deposit available, now check if expiration date has passed
                if (now >= expirationDate) {
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
    function withdraw(uint id) public payable returns(bool) {
        address payable addr = address(uint160(memberAddressMap[id].memberAddress));
        addr.transfer(contractAddress.balance/totalMembersInEscrow);
        memberAddressMap[id].currentDeposit = 0;
        return true;
    }


}