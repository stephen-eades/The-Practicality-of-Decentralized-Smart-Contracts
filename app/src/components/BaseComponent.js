import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import ContextRoute from "./routing/ContextRoute";
import NavbarComponent from "./header/NavbarComponent";
import AboutComponent from "./body/AboutComponent";
import HelpComponent from "./body/HelpComponent";
import BrowseComponent from "./body/BrowseComponent";
import CreateComponent from "./body/CreateComponent";
import SearchComponent from "./body/SearchComponent";
import HomeComponent from "./body/HomeComponent";
import ViewComponent from "./body/ViewComponent";
import FooterComponent from "./footer/FooterComponent";
import { BrowserRouter, Switch } from 'react-router-dom';
import Web3 from "web3";
import detectEthereumProvider from '@metamask/detect-provider';


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  // drizzleState = drizzle.store.getState();
  // console.log(drizzleState);


  // (async() => {

    // drizzleState = await drizzle.store.getState();
    // console.log(drizzleState);
    // console.log(drizzleState);
    // drizzleState = drizzle.store.getState();
    // const provider = await detectEthereumProvider();

    // if (provider) {
    //   await startApp(provider); // Initialize your app
    // } else {
    //   console.log('Please install MetaMask!');
    // }
  
    // async function startApp(provider) {
    //   // If the provider returned by detectEthereumProvider is not the same as
    //   // window.ethereum, something is overwriting it, perhaps another wallet.
    //   if (provider !== window.ethereum) {
    //     console.error('Do you have multiple wallets installed?');
        
    //   } else {
    //     console.log(drizzle.web3);
    //     console.log(drizzle.web3.eth.accounts.givenProvider); // this is the provider... so why isn't address updating...
    //     console.log(drizzleState);

    //     // drizzleState.accounts = { 0: drizzle.web3.eth.accounts.givenProvider.selectedAddress };

    //     // inject the new provider we want...
    //     // drizzle.web3.setProvider(drizzle.web3.eth.accounts.givenProvider);
    //   }
    //   // Access the decentralized web!
    // }
  // })();


  return (
    <DrizzleContext.Provider drizzle={drizzle}>

      <div className="App-container">
        <BrowserRouter>
          <NavbarComponent drizzle={drizzle} drizzleState={drizzleState} />
            <div className="content-wrap">
              <Switch>
                <ContextRoute exact path="/" component={HomeComponent} context={drizzle} state={drizzleState} />
                <ContextRoute exact path="/about" component={AboutComponent} context={drizzle} state={drizzleState} />
                <ContextRoute exact path="/help" component={HelpComponent} context={drizzle} state={drizzleState} />
                <ContextRoute exact path="/create" component={CreateComponent} context={drizzle} state={drizzleState} />
                <ContextRoute exact path="/search" component={SearchComponent} context={drizzle} state={drizzleState} />
                <ContextRoute exact path="/browse" component={BrowseComponent} context={drizzle} state={drizzleState} />
                <ContextRoute exact path="/view/:type/:address" component={ViewComponent} context={drizzle} state={drizzleState} />
              </Switch>
            </div>
          <FooterComponent drizzle={drizzle} drizzleState={drizzleState} />
        </BrowserRouter>
      </div>
            
    </DrizzleContext.Provider>
  );
};
