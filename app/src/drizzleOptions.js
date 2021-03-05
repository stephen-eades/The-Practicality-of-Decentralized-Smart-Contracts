import Web3 from "web3";
import EventManager from "./contracts/EventManager.json";
import EventCreator from "./contracts/EventCreator.json";

const options = {
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:8545"),
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:8545'
    }
  },
  contracts: [EventManager, EventCreator],
};

export default options;
