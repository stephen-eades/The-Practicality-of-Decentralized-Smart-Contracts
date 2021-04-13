import Web3 from "web3";
import EventManager from "./contracts/EventManager.json";
import EventCreator from "./contracts/EventCreator.json";

const options = {
  // For local testing on ganache, etc.
  web3: {
    block: false,
    customProvider: new Web3("ws://localhost:7845"),
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:7845'
    }
  },
  contracts: [EventManager, EventCreator],
};

export default options;
  