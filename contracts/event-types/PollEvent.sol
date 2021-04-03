// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;


/**
@title A Poll contract for handling a voting process
@author Stephen Eades
@notice This contract...
@dev This contract...
*/
contract PollEvent {


    // Define the PollEvent
    string public contractName;
    address payable public contractAddress;
    address public authorAddress;
    bool public contractExists;
    uint256 public expirationDate;


    /**
    Sets the initial properties for this contract. Called on by the EventCreator contract.
    @param _contractName the name of the event contract
    @param _authorAddress the address of the authoring user
    @param _contractExists if the contract is instantiated or not
    @param _expirationDate the date the contract becomes expired
    */
    function setPollEvent(string memory _contractName, address _authorAddress, bool _contractExists, uint256 _expirationDate) public {
        contractName = _contractName;
        contractAddress = address(uint160(address(this)));
        authorAddress = _authorAddress;
        contractExists = _contractExists;
        expirationDate = _expirationDate;
    }


    // Functions to handle a single instance of a election/polling process
    // 
    // 
    

    /**
    Gets the name of the Poll Event
    @return string name of the poll 
    */
    function getPollName() public view returns(string memory) {
        return contractName;
    }


    /**
    Gets the author of the Poll Event
    @return address the address that created the contract
    */
    function getPollAuthor() public view returns(address) {
        return authorAddress;
    }


    /**
    Checks the contracts existing state
    @return bool the contract existing or not
    */
    function doesPollExists() public view returns(bool) {
        return contractExists;
    }


    /**
    Gets the expiration date of the Poll Event
    @return uint256 the timestamp of the expiration date
    */
    function getPollExpiration() public view returns(uint256) {
        return expirationDate;
    }

}