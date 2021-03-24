import React from "react";
import crepe_raster from "./../../crepe_raster.jpg";


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  return (
    <div className="App">
      <div className="app-body">

        <div>
          <h1>About</h1>
          <h2>What is Crêpe?</h2>
          <img src={crepe_raster} alt="strawberry-crepe" className="about-crepe-img-class"/>
          <p>
            Using Crêpe anyone can create their own personalized smart contract. Start with a contract template
            and configure it however you'd like, all without typing a single line of code. Easily setup and deploy
            trustless smart contracts for events such as Polls, Wagers, and Escrows. Download Metamask, fund your
            account and get started below!
          </p>
          <p>
            Crêpe was designed to test the practicality of smart contracts for everyday use. By providing smart
            contract templates, any user, regardless of their experience with decentralized systems, can setup and
            deploy their own event processes by a smart contract. Crêpe only requires Ethereum's native token ETH to 
            run, and the application has been optimized to use as little gas as possible per transaction. 
          </p>
          <p>
            Below is detailed analysis of the speed and costs of transactions for interacting with and deploying smart
            contracts on Crêpe:
          </p>
        </div>

      </div>
    </div>
  );
};
