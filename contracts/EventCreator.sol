// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;
import './PollEvent.sol';
import './WagerEvent.sol';
import './EscrowEvent.sol';


/**
@title A contract voting process
@author Stephen Eades
@notice This contract...
@dev This contract...
*/
contract EventCreator {


    /**
    Creates a new PollEvent contract and maps it
    @param _contractName the name of the event contract
    @param _authorAddress the address of the authoring user
    @return the contract instance
    */
    function createPollEventContract(string memory _contractName, address _authorAddress) payable public returns(PollEvent) {
        // Need to create and deploy an instance of a Poll Event contract and return it so frontend can interact with it.
        PollEvent pollEventContract = new PollEvent();
        pollEventContract.setPollEvent(_contractName, _authorAddress, true);
        return pollEventContract;
    }


    /**
    Creates a new WagerEvent contract and maps it
    @param _contractName the name of the event contract
    @param _authorAddress the address of the authoring user
    @return the contract instance
    */
    function createWagerEventContract(string memory _contractName, address _authorAddress) payable public returns(WagerEvent) {
        // Need to create and deploy an instance of a Wager Event contract and return it so frontend can interact with it.
        WagerEvent wagerEventContract = new WagerEvent();
        wagerEventContract.setWagerEvent(_contractName, _authorAddress, true);
        return wagerEventContract;
    }


    /**
    Creates a new EscrowEvent contract and maps it
    @param _contractName the name of the event contract
    @param _authorAddress the address of the authoring user
    @return the contract instance
    */
    function createEscrowEventContract(string memory _contractName, address _authorAddress) payable public returns(EscrowEvent) {
        // Need to create and deploy an instance of an escrow Event contract and return it so frontend can interact with it.
        EscrowEvent escrowEventContract = new EscrowEvent();
        escrowEventContract.setEscrowEvent(_contractName, _authorAddress, true);
        return escrowEventContract;
    }


}