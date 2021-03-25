import React from "react";
import { useState } from "react";
import { newContextComponents } from "@drizzle/react-components";
import { TextField } from "@material-ui/core";
import crepe from "./../../crepe.svg";


const { AccountData, ContractData, ContractForm } = newContextComponents;


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const eventManagerContract = drizzle.contracts.EventManager;

  const [contractType, setContractType] = useState("poll");
  const [pollContractName, setPollContractName] = useState("");

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

  const onContractNameInputChange = (event) => {
    setPollContractName(event.target.value);
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
          <h1>Create</h1>
          
          <h2>Make your own Smart Contracts</h2>
          <p>
            Configure your own decentralized events using smart contracts. Select the event type below to get started. 
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

          {contractType === "poll" && (
            <form>
              <h2>Poll Event Smart Contract</h2>
              <p>
                Poll events allow a voting process to be configured. Users
                can access the poll and cast their vote before the poll ends.
                After the poll, view the results and see the winner. Complete 
                the form below to configure your poll event, then deploy it!
              </p>
              <br></br>

              <TextField
                id="poll-contract-name"
                label="Contract Name"
                type="text"
                onChange={onContractNameInputChange}
              />
              <br></br>

              <div className="bottom-form-class">
                <button onClick={createNewPollContract}>Deploy</button>
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
              </div>
            </form>
          )}

          {contractType === "escrow" && (
            <form>
              <h2>Escrow Event Smart Contract</h2>
              <p>
                Escrow events allow a escrow process to be configured. Specified 
                users can access the escrow and deposit their funds to be locked.
                After the lock period is over, the configured funds will be released. 
                Complete the form below to configure your escrow event, then deploy it!
              </p>
              <button onClick={createNewEscrowContract}>Deploy</button>
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
              <h2>Wager Event Smart Contract</h2>
              <p>
                Wager events allow a betting process to be configured. Specified 
                users can access the wager and agree to the bet by depositing funds.
                After the wager conditions are met, the configured funds will be released
                to the winner of the bet. 
                Complete the form below to configure your escrow event, then deploy it!
              </p>
              <button onClick={createNewWagerContract}>Deploy</button>
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
