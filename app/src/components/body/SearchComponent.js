import React from "react";
import { useState } from "react";
import { newContextComponents } from "@drizzle/react-components";
import { TextField } from "@material-ui/core";


const { AccountData, ContractData, ContractForm } = newContextComponents;


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const eventManagerContract = drizzle.contracts.EventManager;

  const [idToSearch, setIdtoSearch] = useState(0);

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

  const onIdInputChange = (event) => {
    if (event.target.value && event.target.value > 0) {
      setIdtoSearch(event.target.value);
    } else {
      setIdtoSearch(0);
    }
  }

  const onSubmit = () => {
    console.log(idToSearch);
  }

  return (
    <div className="App">
      <div className="app-body">
        <div>
          <h1>Search</h1>
          <h2>Find a specific Smart Contract</h2>
          <p>
            Find a particular smart contract event to interact with. Select the event type below to search. 
          </p>
        </div>

        <div className="section">

          <span className="radio-input-class">
            <input
              type="radio"
              name="poll_event"
              value="poll"
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
              checked={contractType === "wager"}
              onChange={onRadioInputChange}
            />
            Wager
          </span>
          <br></br>

          {contractType === "poll" && (
            <div>
              <h2>Poll Event Smart Contracts</h2>
              <TextField
                id="id-to-search-input"
                label="Contract ID"
                type="number"
                value={idToSearch}
                onChange={onIdInputChange}
              />
              <br></br>
              <br></br>

              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getPollEventContractInstanceWithId"
                methodArgs={[idToSearch]}
              />
              <br></br>
            </div>
          )}

          {contractType === "escrow" && (
            <div>
              <h2>Escrow Event Smart Contracts</h2>
              <TextField
                id="id-to-search-input"
                label="Contract ID"
                type="number"
                value={idToSearch}
                onChange={onIdInputChange}
              />
              <br></br>
              <br></br>

              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getEscrowEventContractInstanceWithId"
                methodArgs={[idToSearch]}
              />
              <br></br>
            </div>
          )}

          {contractType === "wager" && (
            <div>
              <h2>Wager Event Smart Contracts</h2>
              <TextField
                id="id-to-search-input"
                label="Contract ID"
                type="number"
                value={idToSearch}
                onChange={onIdInputChange}
              />
              <br></br>
              <br></br>

              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getWagerEventContractInstanceWithId"
                methodArgs={[idToSearch]}
              />
              <br></br>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
