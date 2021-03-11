// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;
import './EventCreator.sol';
import './PollEvent.sol';
import './WagerEvent.sol';
import './EscrowEvent.sol';


/**
@title A parent contract managing the creation and storage of Event contracts
@author Stephen Eades
@notice This contract uses an experimental Ethereum feature ABIEncoderV2
@dev This contract handles the creation and storage of Poll, Wager, and Escrow events.
It additionally manages there expiration/unlocking actions and provides
getter and setter methods for displaying information on a frontend interface.
*/
contract EventManager {


    // Store total count for each event contract type
    uint totalPollEventContracts;
    uint totalWagerEventContracts;
    uint totalEscrowEventContracts;


    // Map each event contract address using the current total count as the key
    mapping (uint => address) public pollEventHistoryMap;
    mapping (uint => address) public wagerEventHistoryMap;
    mapping (uint => address) public escrowEventHistoryMap;


    // Store each event contract in an array for reference
    PollEvent[] pollEventContractArray;
    WagerEvent[] wagerEventContractArray;
    EscrowEvent[] escrowEventContractArray;


    // Store the EventCreator contract and its address
    address eventCreatorContractAddress;
    EventCreator eventCreatorContract;


    constructor(address _eventCreatorContractAddress) public {
        // Grab an instance of the EventCreator contract
        eventCreatorContractAddress = _eventCreatorContractAddress;
        eventCreatorContract = EventCreator(_eventCreatorContractAddress);

        // Create a sample PollEventContract
        createPollEventContract('MyTest Poll Contract');
    }


    /**
    Creates a new PollEvent contract, stores it in the array, and maps its address
    @param _contractName the name of the contract
    @return address of the contract that was created
    */
    function createPollEventContract(string memory _contractName) payable public returns(address) {
        totalPollEventContracts++;
        // Use the factory EventCreator contract to make a new contract, storing the address
        PollEvent pollEventContract = eventCreatorContract.createPollEventContract(_contractName, msg.sender);
        address pollEventContractAddress = address(pollEventContract.contractAddress);

        // Map the contract address with the incremental total count of PollEvents as the key
        pollEventHistoryMap[totalPollEventContracts] = pollEventContractAddress;

        // Finally store the new contract in an array and return the contract address
        pollEventContractArray.push(pollEventContract);
        return pollEventContractAddress;
    }


    /**
    Gets a specific PollEvent contract address using its Id
    @param _Id the Id mapped to the PollEvent contract address
    @return address of the PollEvent contract that was selected
    */
    function getPollEventContractAddress(uint _Id) public view returns(address) {
        return pollEventHistoryMap[_Id];
    }


    /**
    Gets a specific PollEvent contract instance using its Id
    @param _Id the Id mapped to the PollEvent contract address
    @return PollEvent contract instance that was selected
    */
    function getPollEventContractInstance(uint _Id) public view returns(PollEvent) {
        return PollEvent(getPollEventContractAddress(_Id));
    }


    /**
    Gets the total number of existing PollEvent contracts
    @return uint total count 
    */
    function getPollEventContractCount() public view returns(uint) {
        return totalPollEventContracts;
    }


    /**
    Gets an array of all the PollEvent contract instances
    @return PollEvent[] containing all PollEvent contracts
    */
    function getPollEventContractList() public view returns(PollEvent[] memory) {
        PollEvent[] memory tempPollEventContractArray = new PollEvent[](totalPollEventContracts);
        for (uint i=0; i<totalPollEventContracts; i++) {
            tempPollEventContractArray[i] = getPollEventContractInstance(i+1);
        }
        return tempPollEventContractArray;
    }


}