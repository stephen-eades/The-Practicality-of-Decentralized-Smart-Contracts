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
          <h2>Subtitle can go here...</h2>
          <p>
            Text can go here...
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
