import React from "react";
import eventManagerAndCreatorDeploy from "./../../EventManagerAndCreatorDeploy.png";
import eventContractsCompare from "./../../EventContractsCompare.png";
import lotteryIncreaseTicketDeploy from "./../../LotteryIncreaseTicketDeploy.png";
import lotteryIncreaseTicketGas from "./../../LotteryIncreaseTicketGas.png";
import escrowDepositTransaction from "./../../EscrowDepositTransaction.png";
import pollVoteTransaction from "./../../PollVoteTransaction.png";
import ethGwei1 from "./../../ethGwei1.png";
import ethGwei2 from "./../../ethGwei2.png";
import ethGwei3 from "./../../ethGwei3.png";


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  return (
    <div className="App">
      <div className="app-body">

        <div>
          <h1>About</h1>
          <h2>What is Crêpe?</h2>
          <p>
            Crêpe was designed to test the practicality of smart contracts for everyday use. By providing smart
            contract templates, any user, regardless of their experience with decentralized systems, can setup and
            deploy their own event processes by a smart contract. Crêpe only requires Ethereum's native token ETH to 
            run, and the application can be accessed by any other user on the network. 
          </p>
          <br></br>
          <h3>Learn more:</h3>
          <p>
            The code for this application is in this <a href="https://github.com/stephen-eades/The-Practicality-of-Decentralized-Smart-Contracts">Github repository.</a> 
            <br></br><br></br>
            Below is data regarding the costs of transactions for interacting with and deploying smart
            contracts on Crêpe. The Jupyter Notebook files can be found in the above repo as well:
          </p>
          <br></br><br></br>
          <br></br><br></br>
          <h3>EventManager & EventCreator Deployment</h3>
          <img src={eventManagerAndCreatorDeploy} alt="event-manager-creator-deploy" className="data-img-class"/>
          <br></br><br></br>
          <br></br><br></br>
          <br></br><br></br>
          <h3>Poll, Escrow, & Lottery Contract Deployment</h3>
          <img src={eventContractsCompare} alt="event-contract-deploy" className="data-img-class"/>
          <br></br><br></br>
          <br></br><br></br>
          <br></br><br></br>
          <h3>Event Contract Transactions</h3>
          <img src={lotteryIncreaseTicketDeploy} alt="lottery-increase-deploy-cost" className="data-img-class"/>
          <img src={lotteryIncreaseTicketGas} alt="lottery-increase-deploy-gas" className="data-img-class"/>
          <img src={escrowDepositTransaction} alt="escrow-deposit-transaction" className="data-img-class"/>
          <img src={pollVoteTransaction} alt="poll-vote-transaction" className="data-img-class"/>
          <br></br><br></br>
          <br></br><br></br>
          <br></br><br></br>
          <h3>Ether and Gwei Correlation</h3>
          <img src={ethGwei1} alt="eth-gwei-1" className="data-img-class"/>
          <img src={ethGwei2} alt="eth-gwei-2" className="data-img-class"/>
          <img src={ethGwei3} alt="eth-gwei-3" className="data-img-class"/>
        </div>

      </div>
    </div>
  );
};
