import React from "react";
import { useState } from "react";
import { newContextComponents } from "@drizzle/react-components";
import crepe from "./../../crepe.svg";


const { AccountData, ContractData, ContractForm } = newContextComponents;


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const eventManagerContract = drizzle.contracts.EventManager;

  const [contractType, setContractType] = useState("poll");

  const onRadioInputChange = (event) => {
    if (event.target.value === "poll") {
      setContractType(event.target.value);
    } else if (event.target.value === "escrow") {
      setContractType(event.target.value);
    } else if (event.target.value === "wager") {
      setContractType(event.target.value);
    } else {
      console.log("Error setting contract type.")
    }
  }

  return (
    <div className="App">
      <div className="app-body">
        <div>
          <h1>Browse</h1>
          <h2>View existing Smart Contracts</h2>
          <p>
            Find available smart contract events to interact with. Select the event type below to view events. 
          </p>
        </div>

        <div className="section">
          <span className="radio-input-class">
            <input
              type="radio"
              name="poll_event"
              value="poll"
              className="radio-input-button-class"
              checked={contractType === "poll"}
              onChange={onRadioInputChange}
            />
            Poll
          </span>

          <span className="radio-input-class">
            <input
              type="radio"
              name="escrow_event"
              value="escrow"
              className="radio-input-button-class"
              checked={contractType === "escrow"}
              onChange={onRadioInputChange}
            />
            Escrow
          </span>

          <span className="radio-input-class">
            <input
              type="radio"
              name="wager_event"
              value="wager"
              className="radio-input-button-class"
              checked={contractType === "wager"}
              onChange={onRadioInputChange}
            />
            Wager
          </span>
          <br></br>
          <br></br>

          {contractType === "poll" && (
            <div>
              <h2>Poll Event Smart Contracts</h2>
              <strong>Total Events: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getPollEventContractCount"
              />
              <br></br>
    
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getPollEventContractList"
              />
              <br></br>
            </div>
          )}

          {contractType === "escrow" && (
            <div>
              <h2>Escrow Event Smart Contracts</h2>
              <strong>Total Events: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getEscrowEventContractCount"
              />
              <br></br>

              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getEscrowEventContractList"
              />
              <br></br>
            </div>
          )}

          {contractType === "wager" && (
            <div>
              <h2>Wager Event Smart Contracts</h2>
              <strong>Total Events: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getWagerEventContractCount"
              />
              <br></br>

              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getWagerEventContractList"
              />
              <br></br>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};
