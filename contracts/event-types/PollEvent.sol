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
    string public contractType;
    string[] public candidates;


    // Store the total candidate count
    uint totalCandidatesInPoll;


    // Map each candidate using the current total count as id
    mapping (uint => Candidate) public candidateMap; 


    // Map each voter using they're address as id
    mapping (address => bool) public voterMap; 


    /**
    Model for each candidate
    */
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }


    /**
    Sets the initial properties for this contract. Called on by the EventCreator contract.
    @param _contractName the name of the event contract
    @param _authorAddress the address of the authoring user
    @param _contractExists if the contract is instantiated or not
    @param _expirationDate the date the contract becomes expired
    */
    function setPollEvent(string memory _contractName, address _authorAddress, bool _contractExists, uint256 _expirationDate, string[] memory _candidates) public {
        contractName = _contractName;
        contractAddress = address(uint160(address(this)));
        authorAddress = _authorAddress;
        contractExists = _contractExists;
        expirationDate = _expirationDate;
        candidates = _candidates;
        contractType = 'poll';
        setupPoll();
    }


    /**
    Gets the type of the Event
    @return string type of the contract
    */
    function getContractType() public view returns(string memory) {
        return contractType;
    }
    

    /**
    Gets the name of the Poll Event
    @return string name of the poll 
    */
    function getContractName() public view returns(string memory) {
        return contractName;
    }


    /**
    Gets the author of the Poll Event
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
    Gets the expiration date of the Poll Event
    @return uint256 the timestamp of the expiration date
    */
    function getContractExpirationDate() public view returns(uint256) {
        return expirationDate;
    }


    /**
    Configures and sets initial values for the poll
    */
    function setupPoll() public {
        for (uint i=0; i<candidates.length; i++) {
            addCandidate(candidates[i]);
        }   
    }


    /**
    What function does here
    @return type description...
    */
    function addCandidate(string memory name) public {
        totalCandidatesInPoll++; 
        candidateMap[totalCandidatesInPoll] = Candidate(totalCandidatesInPoll, name, 0);
    }


    /**
    What function does here
    @return type description...
    */
    function getElectionData() external view returns (string[] memory, uint[] memory) {
        string[] memory tempCandidatesArray = new string[](totalCandidatesInPoll);
        for (uint i=0; i<totalCandidatesInPoll; i++) {
            tempCandidatesArray[i] = candidateMap[(i+1)].name;
        }

        uint[] memory tempVoteCountArray = new uint[](totalCandidatesInPoll);
        for (uint i=0; i<totalCandidatesInPoll; i++) {
            tempVoteCountArray[i] = candidateMap[(i+1)].voteCount;
        }
        return (tempCandidatesArray, tempVoteCountArray);
    }


    /**
    What function does here
    @return type description...
    */
    function canAddressVote(address _address) public view returns(bool) {
        // Check expiration date
        if (now < expirationDate) {
            if (voterMap[_address] && voterMap[_address] == true) {
                // Address has already voted, return true
                return true;
            } else {
                // Address has not voted yet
                return false;
            }
        }
    }


    /**
    What function does here
    @return type description...
    */
    function vote(uint id) payable public {
        require (!voterMap[msg.sender]);
        require (id > 0 && id <= totalCandidatesInPoll);
        if (now < expirationDate) {
            candidateMap[id].voteCount++;
            voterMap[msg.sender] = true;
        }
    }

}