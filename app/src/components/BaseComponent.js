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
import { accountIndex } from './../test/_test.js'
import Web3 from "web3";


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props


  window.addEventListener('load', async () => {
    console.log('testttt');
    // Wait for loading completion to avoid race conditions with web3 injection timing.
      if (window.ethereum) {
        console.log('test');
        const web3 = new Web3(window.ethereum);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          web3.eth.sendTransaction({from: drizzleState.accounts[accountIndex]}); // remove this before deploying to prod});
          console.log(web3);
          // Acccounts now exposed
          return web3;
        } catch (error) {
          console.error(error);
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log('Injected web3 detected.');
        return web3;
      }
      // Fallback to localhost; use dev console port by default...
      else {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
        const web3 = new Web3(provider);
        console.log('No web3 instance injected, using Local web3.');
        return web3;
      }
    });


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
