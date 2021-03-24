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
  function createNewPollContract() {
    eventManagerContract.methods.createPollEventContract.cacheSend('TestContractName', {
      from: drizzleState.accounts[0],
      gas: 900000, // remove this before deploying to prod
    })
  }

  /**
   * Same as above...
   */
  function createNewEscrowContract() {
    eventManagerContract.methods.createEscrowEventContract.cacheSend('TestContractName', {
      from: drizzleState.accounts[0],
      gas: 900000, // remove this before deploying to prod
    })
  }

  /**
   * Same as above...
   */
  function createNewWagerContract() {
    eventManagerContract.methods.createWagerEventContract.cacheSend('TestContractName', {
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

          <h2>Testing EventManager Contract Functions</h2>
          <p>
            Testing the funcionality of the EventManager Contract.
            Once functionality all works on single page,
            break it out to a multiple page webapp and create Contracts
            for each of the event types. Thus removing BaseEvents.
          </p>

          {contractType === "poll" && (
            <form>
              Poll Form

              <button onClick={createNewPollContract}>Add Contract</button>
              {/* This can be used once EIP-1167 is implemented */}
              {/* <strong>createPollEventContract: </strong>
              <ContractForm
                drizzle={drizzle}
                contract="EventManager"
                method="createPollEventContract"
                labels={["name"]}
              />
              <br></br> */}
              <br></br>
            </form>
          )}

          {contractType === "escrow" && (
            <form>
              Escrow Form

              <button onClick={createNewEscrowContract}>Add Contract</button>
              {/* This can be used once EIP-1167 is implemented */}
              {/* <strong>createEscrowEventContract: </strong>
              <ContractForm
                drizzle={drizzle}
                contract="EventManager"
                method="createEscrowEventContract"
                labels={["name"]}
              />
              <br></br> */}
              <br></br>
            </form>
          )}

          {contractType === "wager" && (
            <form>
              Wager Form

              <button onClick={createNewWagerContract}>Add Contract</button>
              {/* This can be used once EIP-1167 is implemented */}
              {/* <strong>createWagerEventContract: </strong>
              <ContractForm
                drizzle={drizzle}
                contract="EventManager"
                method="createWagerEventContract"
                labels={["name"]}
              />
              <br></br> */}
              <br></br>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
