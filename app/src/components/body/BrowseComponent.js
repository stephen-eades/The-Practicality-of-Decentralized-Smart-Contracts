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
    if (event.target.value == "poll") {
      setContractType(event.target.value);
    } else if (event.target.value == "escrow") {
      setContractType(event.target.value);
    } else if (event.target.value == "wager") {
      setContractType(event.target.value);
    } else {
      console.log("Error setting contract type.")
    }
  }

  return (
    <div className="App">
      <div className="app-body">
        <div>
          <h1>Browse Smart Contracts</h1>
          <h2>Subtitle can go here...</h2>
          <p>
            Text can go here...
          </p>
        </div>

        <div className="section">
          <input
            type="radio"
            name="poll_event"
            value="poll"
            checked={contractType === "poll"}
            onChange={onRadioInputChange}
          />
          Poll

          <input
            type="radio"
            name="escrow_event"
            value="escrow"
            checked={contractType === "escrow"}
            onChange={onRadioInputChange}
          />
          Escrow

          <input
            type="radio"
            name="wager_event"
            value="wager"
            checked={contractType === "wager"}
            onChange={onRadioInputChange}
          />
          Wager
          <br></br>
          <br></br>

          {contractType === "poll" && (
            <div>
              <strong>Total Poll Events: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getPollEventContractCount"
              />
              <br></br>
    
              <strong>List of Poll Event Addresses: </strong>
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
              <strong>Total Escrow Events: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getEscrowEventContractCount"
              />
              <br></br>
    
              <strong>List of Escrow Event Addresses: </strong>
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
              <strong>Total Wager Events: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getWagerEventContractCount"
              />
              <br></br>
    
              <strong>List of Wager Event Addresses: </strong>
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
