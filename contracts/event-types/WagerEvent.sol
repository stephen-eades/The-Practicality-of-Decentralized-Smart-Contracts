// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;


/**
@title A Wager contract for handling a betting process
@author Stephen Eades
@notice This contract...
@dev This contract...
*/
contract WagerEvent {


    // Define the WagerEvent
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
    function setWagerEvent(string memory _contractName, address _authorAddress, bool _contractExists, uint256 _expirationDate) public {
        contractName = _contractName;
        contractAddress = address(uint160(address(this)));
        authorAddress = _authorAddress;
        contractExists = _contractExists;
        expirationDate = _expirationDate;
    }


    // Functions to handle a single instance of a wager process
    // 
    // 
    // 
    // 

}