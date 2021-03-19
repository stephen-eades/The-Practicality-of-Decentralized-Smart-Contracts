import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import crepe from "./../../crepe.svg";


const { AccountData, ContractData, ContractForm } = newContextComponents;


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const eventManagerContract = drizzle.contracts.EventManager;


  return (
    <div className="App">
      <div className="app-body">
        <div>
          <h1>Browse Smart Contracts</h1>
          <img src={crepe} alt="crepe-logo" className="crepe-body-logo-class"/>
          <h2>Experience Smart Contracts with Crêpe.</h2>
          <p>
            Using Crêpe anyone can create their own personalized smart contract. Start with a contract template
            and configure it however you'd like, all without typing a single line of code. Easily setup and deploy
            trustless smart contracts for events such as Polls, Wagers, and Escrows. Download Metamask, fund your
            account and get started below!
          </p>
        </div>

        <div className="section">
          <strong>getPollEventContractCount: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="EventManager"
            method="getPollEventContractCount"
          />
          <br></br>

          <strong>getPollEventContractList: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="EventManager"
            method="getPollEventContractList"
          />
          <br></br>
        </div>
      </div>
    </div>
  );
};
