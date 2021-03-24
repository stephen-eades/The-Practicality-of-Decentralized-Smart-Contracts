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
          <h1>Search Smart Contracts</h1>
          
          <h2>Search for existing smart contract events</h2>
          <p>
            Input the ID of the smart contract to view.
          </p>
        </div>

        <div className="section">
          <h2>Testing EventManager Contract Functions</h2>
          <p>
            Testing the funcionality of the EventManager Contract.
            Once functionality all works on single page,
            break it out to a multiple page webapp and create Contracts
            for each of the event types. Thus removing BaseEvents.
          </p>
          <br></br>

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

          <TextField
                id="id-to-search-input"
                label="Contract ID"
                type="number"
                onChange={onIdInputChange}
          />
          <br></br>

          {contractType === "poll" && (
            <div>
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
