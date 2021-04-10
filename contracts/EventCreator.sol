// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;
import './event-types/PollEvent.sol';
import './event-types/RaffleEvent.sol';
import './event-types/EscrowEvent.sol';


/**
@title A factory implementation for creating smart contracts
@author Stephen Eades
@notice This contract uses an experimental Ethereum feature ABIEncoderV2
@notice This contract utilizes EIP-1167: Minimal Proxy Contract (https://eips.ethereum.org/EIPS/eip-1167)
@dev This contract is used to create new smart contracts based on the user inputs. Each factory method returns the contract address.
This should be passed to the EventManager.sol contract during deployment as a parameter so it can be referenced.
*/
contract EventCreator {


    /**
    Creates a new PollEvent contract and calls on it to set its properties
    @param _contractName the name of the event contract
    @param _authorAddress the address of the authoring user
    @return the contract instance
    */
    function createPollEventContract(string memory _contractName, address _authorAddress, uint256 _expirationDate, string[] memory _candidates) payable public returns(PollEvent) {
        // Need to create and deploy an instance of a Poll Event contract and return it so frontend can interact with it.
        PollEvent pollEventContract = new PollEvent();
        pollEventContract.setPollEvent(_contractName, _authorAddress, true, _expirationDate, _candidates);
        return pollEventContract;
    }


    /**
    Creates a new RaffleEvent contract and calls on it to set its properties
    @param _contractName the name of the event contract
    @param _authorAddress the address of the authoring user
    @return the contract instance
    */
    function createRaffleEventContract(string memory _contractName, address _authorAddress, uint256 _expirationDate) payable public returns(RaffleEvent) {
        // Need to create and deploy an instance of a Raffle Event contract and return it so frontend can interact with it.
        RaffleEvent raffleEventContract = new RaffleEvent();
        raffleEventContract.setRaffleEvent(_contractName, _authorAddress, true, _expirationDate);
        return raffleEventContract;
    }


    /**
    Creates a new EscrowEvent contract and calls on it to set its properties
    @param _contractName the name of the event contract
    @param _authorAddress the address of the authoring user
    @return the contract instance
    */
    function createEscrowEventContract(string memory _contractName, address _authorAddress, uint256 _expirationDate, address[] memory _memberAddresses, uint _amount) payable public returns(EscrowEvent) {
        // Need to create and deploy an instance of an escrow Event contract and return it so frontend can interact with it.
        EscrowEvent escrowEventContract = new EscrowEvent();
        escrowEventContract.setEscrowEvent(_contractName, _authorAddress, true, _expirationDate, _memberAddresses, _amount);
        return escrowEventContract;
    }


}