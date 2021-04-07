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


    /**
    Sets the initial properties for this contract. Called on by the EventCreator contract.
    @param _contractName the name of the event contract
    @param _authorAddress the address of the authoring user
    @param _contractExists if the contract is instantiated or not
    @param _expirationDate the date the contract becomes expired
    */
    function setEscrowEvent(string memory _contractName, address _authorAddress, bool _contractExists, uint256 _expirationDate) public {
        contractName = _contractName;
        contractAddress = address(uint160(address(this)));
        authorAddress = _authorAddress;
        contractExists = _contractExists;
        expirationDate = _expirationDate;
        contractType = 'escrow';
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


}