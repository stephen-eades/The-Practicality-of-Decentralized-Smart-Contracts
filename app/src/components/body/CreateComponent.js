import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import crepe from "./../../crepe.svg";


const { AccountData, ContractData, ContractForm } = newContextComponents;


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const eventManagerContract = drizzle.contracts.EventManager;

  /**
   * @todo This function call currently uses far too much gas, making it useless for the user.
   * Need to switch to using a proxy contract to save gas (https://eips.ethereum.org/EIPS/eip-1167).
   * This currently only works by manually setting a high gas limit to allow it to go through since
   * we are using Ganache which provides free gas.
   * 
   * Should check these out for dynamically adding contracts: 
   * https://www.trufflesuite.com/docs/drizzle/getting-started/contract-interaction#adding-contracts-dynamically
   * https://betterprogramming.pub/learn-solidity-the-factory-pattern-75d11c3e7d29
   * https://medium.com/upstate-interactive/how-to-build-a-contract-factory-that-creates-contract-clones-efcc9619be0b
   */
  function createNewContract() {
    eventManagerContract.methods.createPollEventContract.cacheSend('TestContractName', {
      from: drizzleState.accounts[0],
      gas: 900000, // remove this before deploying to prod
    })
  }

  return (
    <div className="App">
      <div className="app-body">
        <div>
          <h1>Create Smart Contracts</h1>
          
          <h2>Subtitle can go here...</h2>
          <p>
            Text can go here...
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

          {/* This can be used once EIP-1167 is implemented */}
          {/* <strong>createPollEventContract: </strong>
          <ContractForm
            drizzle={drizzle}
            contract="EventManager"
            method="createPollEventContract"
            labels={["name"]}
          />
          <br></br> */}

          <button onClick={createNewContract}>Add Contract</button>
          <br></br>

          <strong>getPollEventContract: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="EventManager"
            method="getPollEventContractInstance"
            methodArgs={[1]}
          />
          <br></br>

        </div>
      </div>
    </div>
  );
};
