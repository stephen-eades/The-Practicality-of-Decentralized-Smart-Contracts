// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.7.0;

contract Events {

    // model a poll event
    struct PollEvent {
        uint id;
        string pollName;
        bool active;
        uint totalVotesCast;
        uint numberOfParties;
    }

    // model a escrow event
    struct EscrowEvent {
        uint id;
        string wagerName;
        bool active;
        uint wagerPot;
        uint numberOfParties;
    }

    // model a wager event
    struct WagerEvent {
        uint id;
        string wagerName;
        bool active;
        uint wagerPot;
        uint numberOfParties;
    }

}