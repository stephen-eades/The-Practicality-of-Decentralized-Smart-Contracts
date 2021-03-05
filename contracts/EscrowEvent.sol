// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;


/**
@title A contract voting process
@author Stephen Eades
@notice This contract...
@dev This contract...
*/
contract EscrowEvent {

    // Define the EscrowEvent
    string public contractName;
    address public contractAddress;
    address public authorAddress;
    bool public contractExists;


    function setEscrowEvent(string memory _contractName, address _authorAddress, bool _contractExists) public {
        contractName = _contractName;
        contractAddress = address(this);
        authorAddress = _authorAddress;
        contractExists = _contractExists;
    }


    // Functions to handle a single instance of an escrow process
    // 
    // 
    // 
    // 

}