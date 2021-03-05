import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "./logo.png";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  return (
    <div className="App">
      <div>
        <img src={logo} alt="drizzle-logo" />
        <h1>Custom Contracts</h1>
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
         tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
         veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
          ea commodo consequat. Duis aute irure dolor in reprehenderit in 
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur 
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
          mollit anim id est laborum
        </p>
      </div>

      <div className="section">
        <h2>Active Account</h2>
        <div className="account-data-class">
          <AccountData
            drizzle={drizzle}
            drizzleState={drizzleState}
            accountIndex={0}
            units="ether"
            precision={3}
          />
        </div>
      </div>

      

      <div className="section">
        <h2>Testing EventManager Contract Functions</h2>
        <p>
          Testing the funcionality of the EventManager Contract.
          Once functionality all works on single page,
          break it out to a multiple page webapp and create Contracts
          for each of the event types. Thus removing BaseEvents.
        </p>


        <strong>createPollEventContract: </strong>
        <ContractForm
          drizzle={drizzle}
          contract="EventManager"
          method="createPollEventContract"
          labels={["name"]}
        />
        <br></br>


        <strong>getPollEventContract: </strong>
        <ContractData
          drizzle={drizzle}
          drizzleState={drizzleState}
          contract="EventManager"
          method="getPollEventContract"
          methodArgs={[1]}
        />
        <br></br>


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
  );
};
