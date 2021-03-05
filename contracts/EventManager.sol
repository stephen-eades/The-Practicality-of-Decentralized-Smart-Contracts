// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;
import './EventCreator.sol';
import './PollEvent.sol';
import './WagerEvent.sol';
import './EscrowEvent.sol';


/**
@title A contract that manages events
@author Stephen Eades
@notice This contract uses an experimental Ethereum feature ABIEncoderV2
@dev This contract handles the creation of Poll, Wager, and Escrow events.
It additionally manages there expiration/unlocking actions and provides
getter and setter methods for displaying information on a frontend interface.
*/
contract EventManager {


    // store total count for each event contract type
    uint totalPollEventContracts;
    uint totalWagerEventContracts;
    uint totalEscrowEventContracts;


    // map each event contract using the contract's address as key
    // mapping (address => PollEvent) public pollEventHistoryMap;
    mapping (uint => address) public pollEventHistoryMap; // use incremental key to map each contract address
    mapping (address => WagerEvent) public wagerEventHistoryMap;
    mapping (address => EscrowEvent) public escrowEventHistoryMap;


    // store each event contract in an array for reference
    PollEvent[] pollEventContractArray;
    WagerEvent[] wagerEventContractArray;
    EscrowEvent[] escrowEventContractArray;


    // Store the EventCreator contract and its address
    address eventCreatorContractAddress;
    EventCreator eventCreatorContract;


    constructor(address _eventCreatorContractAddress) public {
        // Grab an instance of the EventCreator contract for reference
        eventCreatorContractAddress = _eventCreatorContractAddress;
        eventCreatorContract = EventCreator(_eventCreatorContractAddress);

        // Create a sample PollEventContract
        createPollEventContract('MyTest Poll Contract');
    }


    /**
    Creates a new PollEvent contract and maps its address
    @param _contractName the name of the contract
    @return bool value if successful
    */
    function createPollEventContract(string memory _contractName) payable public returns(address) {
        // Create a new contract instance, map its address using the incremental as key, then add it to an array
        totalPollEventContracts++;
        PollEvent pollEventContract = eventCreatorContract.createPollEventContract(_contractName, msg.sender);
        address pollEventContractAddress = address(pollEventContract.contractAddress);
        pollEventHistoryMap[totalPollEventContracts] = pollEventContractAddress;
        pollEventContractArray.push(pollEventContract);
        return pollEventContractAddress; // display address on web for user
    }


    /**
    Gets a specific PollEvent contract using its Id
    @param _Id the ID mapped to the PollEvent contract address
    @return PollEvent contract address that was selected
    */
    function getPollEventContractAddress(uint _Id) public view returns(address) {
        return pollEventHistoryMap[_Id];
    }


    /**
    Gets a specific PollEvent contract using its address
    @param _pollEventContractAddress the address mapped to the PollEvent contract
    @return PollEvent contract that was selected
    */
    function getPollEventContractWithAddress(address _pollEventContractAddress) public pure returns(PollEvent) {
        return PollEvent(_pollEventContractAddress);
    }

    /**
    Gets a specific PollEvent contract
    @param _Id the ID mapped to the PollEvent contract address
    @return PollEvent contract address that was selected
    */
    function getPollEventContract(uint _Id) public view returns(PollEvent) {
        return getPollEventContractWithAddress(getPollEventContractAddress(_Id));
    }

    /**
    Gets the total number of existing PollEvents contract
    @return uint total count 
    */
    function getPollEventContractCount() public view returns(uint) {
        return totalPollEventContracts;
    }


    /**
    Get an array of all the PollEvent contracts
    @return PollEvent[] containing all PollEvent contracts
    */
    function getPollEventContractList() public view returns(PollEvent[] memory) {
        PollEvent[] memory tempPollEventContractArray = new PollEvent[](totalPollEventContracts);
        for (uint i=0; i<totalPollEventContracts; i++) {
            tempPollEventContractArray[i] = getPollEventContract(i+1);
        }
        return tempPollEventContractArray;
    }


}