// SPDX-License-Identifier: MIT
pragma solidity 0.5.16;
pragma experimental ABIEncoderV2;
import './EventCreator.sol';
import './event-types/PollEvent.sol';
import './event-types/RaffleEvent.sol';
import './event-types/EscrowEvent.sol';


/**
@title A parent contract managing the creation and storage of Event contracts
@author Stephen Eades
@notice This contract uses an experimental Ethereum feature ABIEncoderV2
@dev This contract handles the creation and storage of Poll, Raffle, and Escrow events.
It additionally manages there expiration/unlocking actions and provides
getter and setter methods for displaying information on a frontend interface.
*/
contract EventManager {


    // Store total count for each event contract type
    uint totalPollEventContracts;
    uint totalRaffleEventContracts;
    uint totalEscrowEventContracts;


    // Map each event contract address using the current total count as the key
    mapping (uint => address) public pollEventHistoryMap;
    mapping (uint => address) public raffleEventHistoryMap;
    mapping (uint => address) public escrowEventHistoryMap;


    // Store each event contract in an array for reference
    PollEvent[] pollEventContractArray;
    RaffleEvent[] raffleEventContractArray;
    EscrowEvent[] escrowEventContractArray;


    // Store the EventCreator contract and its address
    address eventCreatorContractAddress;
    EventCreator eventCreatorContract;


    constructor(address _eventCreatorContractAddress) public {
        // Grab an instance of the EventCreator contract
        eventCreatorContractAddress = _eventCreatorContractAddress;
        eventCreatorContract = EventCreator(_eventCreatorContractAddress);
    }


    // POLL EVENTS //

    /**
    Creates a new PollEvent contract, stores it in the array, and maps its address
    @param _contractName the name of the contract
    @return address of the contract that was created
    */
    function createPollEventContract(string memory _contractName, uint256 _expirationDate, string[] memory _candidates) payable public returns(address) {
        totalPollEventContracts++;
        // Use the factory EventCreator contract to make a new contract, storing the address
        PollEvent pollEventContract = eventCreatorContract.createPollEventContract(_contractName, msg.sender, _expirationDate, _candidates);
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
    function getPollEventContractInstanceWithId(uint _Id) public view returns(PollEvent) {
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
            tempPollEventContractArray[i] = getPollEventContractInstanceWithId(i+1);
        }
        return tempPollEventContractArray;
    }


    // ESCROW EVENTS //

    /**
    Creates a new EscrowEvent contract, stores it in the array, and maps its address
    @param _contractName the name of the contract
    @return address of the contract that was created
    */
    function createEscrowEventContract(string memory _contractName, uint256 _expirationDate) payable public returns(address) {
        totalEscrowEventContracts++;
        // Use the factory EventCreator contract to make a new contract, storing the address
        EscrowEvent escrowEventContract = eventCreatorContract.createEscrowEventContract(_contractName, msg.sender, _expirationDate);
        address escrowEventContractAddress = address(escrowEventContract.contractAddress);

        // Map the contract address with the incremental total count of EscrowEvents as the key
        escrowEventHistoryMap[totalEscrowEventContracts] = escrowEventContractAddress;

        // Finally store the new contract in an array and return the contract address
        escrowEventContractArray.push(escrowEventContract);
        return escrowEventContractAddress;
    }


    /**
    Gets a specific EscrowEvent contract address using its Id
    @param _Id the Id mapped to the EscrowEvent contract address
    @return address of the EscrowEvent contract that was selected
    */
    function getEscrowEventContractAddress(uint _Id) public view returns(address) {
        return escrowEventHistoryMap[_Id];
    }


    /**
    Gets a specific EscrowEvent contract instance using its Id
    @param _Id the Id mapped to the EscrowEvent contract address
    @return EscrowEvent contract instance that was selected
    */
    function getEscrowEventContractInstanceWithId(uint _Id) public view returns(EscrowEvent) {
        return EscrowEvent(getEscrowEventContractAddress(_Id));
    }


    /**
    Gets the total number of existing EscrowEvent contracts
    @return uint total count 
    */
    function getEscrowEventContractCount() public view returns(uint) {
        return totalEscrowEventContracts;
    }


    /**
    Gets an array of all the EscrowEvent contract instances
    @return EscrowEvent[] containing all EscrowEvent contracts
    */
    function getEscrowEventContractList() public view returns(EscrowEvent[] memory) {
        EscrowEvent[] memory tempEscrowEventContractArray = new EscrowEvent[](totalEscrowEventContracts);
        for (uint i=0; i<totalEscrowEventContracts; i++) {
            tempEscrowEventContractArray[i] = getEscrowEventContractInstanceWithId(i+1);
        }
        return tempEscrowEventContractArray;
    }


    // WAGER EVENTS //

    /**
    Creates a new RaffleEvent contract, stores it in the array, and maps its address
    @param _contractName the name of the contract
    @return address of the contract that was created
    */
    function createRaffleEventContract(string memory _contractName, uint256 _expirationDate) payable public returns(address) {
        totalRaffleEventContracts++;
        // Use the factory EventCreator contract to make a new contract, storing the address
        RaffleEvent raffleEventContract = eventCreatorContract.createRaffleEventContract(_contractName, msg.sender, _expirationDate);
        address raffleEventContractAddress = address(raffleEventContract.contractAddress);

        // Map the contract address with the incremental total count of RaffleEvents as the key
        raffleEventHistoryMap[totalRaffleEventContracts] = raffleEventContractAddress;

        // Finally store the new contract in an array and return the contract address
        raffleEventContractArray.push(raffleEventContract);
        return raffleEventContractAddress;
    }


    /**
    Gets a specific RaffleEvent contract address using its Id
    @param _Id the Id mapped to the RaffleEvent contract address
    @return address of the RaffleEvent contract that was selected
    */
    function getRaffleEventContractAddress(uint _Id) public view returns(address) {
        return raffleEventHistoryMap[_Id];
    }


    /**
    Gets a specific RaffleEvent contract instance using its Id
    @param _Id the Id mapped to the RaffleEvent contract address
    @return RaffleEvent contract instance that was selected
    */
    function getRaffleEventContractInstanceWithId(uint _Id) public view returns(RaffleEvent) {
        return RaffleEvent(getRaffleEventContractAddress(_Id));
    }


    /**
    Gets the total number of existing RaffleEvent contracts
    @return uint total count 
    */
    function getRaffleEventContractCount() public view returns(uint) {
        return totalRaffleEventContracts;
    }


    /**
    Gets an array of all the RaffleEvent contract instances
    @return RaffleEvent[] containing all RaffleEvent contracts
    */
    function getRaffleEventContractList() public view returns(RaffleEvent[] memory) {
        RaffleEvent[] memory tempRaffleEventContractArray = new RaffleEvent[](totalRaffleEventContracts);
        for (uint i=0; i<totalRaffleEventContracts; i++) {
            tempRaffleEventContractArray[i] = getRaffleEventContractInstanceWithId(i+1);
        }
        return tempRaffleEventContractArray;
    }
}