import React from "react";


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  return (
    <div className="App">
      <div className="app-body">

        <div>
          <h1>Help</h1>
          <h2>How to use Crêpe</h2>
          <p>
            Using Crêpe requires the Ethereum native currency, Ether (ETH). This cryptocurrency allows the user to interact with smart contract event. 
            Examples of transactions could be a user casting a vote in a poll smart contract event, or adding money to an escrow smart contract event that 
            will be distributed later on. Crêpe will always prompt the user before executing any transactions, and users that author smart contract events 
            can deactivate the event at any time they choose. To get started, buy some Ethereum and create a Metamask account to hold the ETH currency. 
          </p>
          <br></br>
          <h3>Resources:</h3>
          <p>
            Learn about <a href="https://ethereum.org/en/developers/docs/dapps/">Decentralized Applications.</a> 
            <br></br><br></br>
            See how <a href="https://ethereum.org/en/developers/docs/smart-contracts/">Smart Contracts work.</a> 
            <br></br><br></br>
            Buy Ethereum at <a href="https://coinbase.com/">Coinbase.</a> 
            <br></br><br></br>
            Download the <a href="https://metamask.io/">Metamask Wallet extension.</a> 
            <br></br><br></br>
          </p>
        </div>

      </div>
    </div>
  );
};
