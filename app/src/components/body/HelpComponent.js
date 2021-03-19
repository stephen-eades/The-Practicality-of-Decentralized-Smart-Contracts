import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  return (
    <div className="App">
      <div className="app-body">

        <div>
          <h1>Help with Crêpe</h1>
          <LiveHelpIcon style={{ fontSize: 125, fill: "#ff636e" }}/>
          <h2>Experience Smart Contracts with Crêpe.</h2>
          <p>
            Using Crêpe anyone can create their own personalized smart contract. Start with a contract template
            and configure it however you'd like, all without typing a single line of code. Easily setup and deploy
            trustless smart contracts for events such as Polls, Wagers, and Escrows. Download Metamask, fund your
            account and get started below!
          </p>
        </div>

      </div>
    </div>
  );
};
