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


    /**
    Sets the initial properties for this contract. Called on by the EventCreator contract.
    @param _contractName the name of the event contract
    @param _authorAddress the address of the authoring user
    @param _contractExists if the contract is instantiated or not
    */
    function setPollEvent(string memory _contractName, address _authorAddress, bool _contractExists) public {
        contractName = _contractName;
        contractAddress = address(uint160(address(this)));
        authorAddress = _authorAddress;
        contractExists = _contractExists;
    }


    // Functions to handle a single instance of a election/polling process
    // 
    // 
    // 
    // 

}