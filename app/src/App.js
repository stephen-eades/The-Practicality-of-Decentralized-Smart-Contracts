import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import BaseComponent from "./components/BaseComponent";
import "./App.css";
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';


const drizzle = new Drizzle(drizzleOptions);


const App = () => {

  // (async() => {
  //   const provider = await detectEthereumProvider();

  //   if (provider) {
  //     startApp(provider); // Initialize your app
  //   } else {
  //     console.log('Please install MetaMask!');
  //   }
  
  //   function startApp(provider) {
  //     // If the provider returned by detectEthereumProvider is not the same as
  //     // window.ethereum, something is overwriting it, perhaps another wallet.
  //     if (provider !== window.ethereum) {
  //       console.error('Do you have multiple wallets installed?');
  //     } else {
  //       drizzle.web3 = provider;
  //       console.log(provider);
  //       console.log(drizzle.web3);
  //       // console.log(drizzle.web3.eth.accounts.givenProvider);
  //       // console.log(drizzleState);
        
  //       // drizzleState.accounts = { 0: drizzle.web3.eth.accounts.givenProvider.selectedAddress };
  //     }
  //     // Access the decentralized web!
  //   }
  // })();

  // window.addEventListener('load', async () => {
  //   console.log('test');
  //   // Modern dapp browsers...
  //   if (window.ethereum) {
  //     console.log(window.ethereum);

  //     window.web3 = new Web3(drizzle.web3.ethereum);
  //     try {
  //         // Request account access if needed
  //         await drizzle.web3.ethereum.enable();
  //         // Acccounts now exposed
  //         drizzle.web3.eth.sendTransaction({/* ... */});
  //     } catch (error) {
  //         // User denied account access...
  //     }
  //   }
  // });

  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading..."
          }

          return (
            <div className="app">
              <BaseComponent drizzle={drizzle} drizzleState={drizzleState} />
            </div>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
