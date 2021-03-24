import React from "react";
import { useState } from "react";
import { newContextComponents } from "@drizzle/react-components";
import { TextField } from "@material-ui/core";


const { AccountData, ContractData, ContractForm } = newContextComponents;


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const eventManagerContract = drizzle.contracts.EventManager;

  const [idToSearch, setIdtoSearch] = useState(0);

  const onInputChange = (event) => {
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

          <TextField
            id="id-to-search-input"
            label="Contract ID"
            type="number"
            onChange={onInputChange}
          />
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
      </div>
    </div>
  );
};
