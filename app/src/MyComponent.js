import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import crepe from "./crepe.svg";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import Icon from '@material-ui/core/Icon';
// import NavbarComponent from "./NavbarComponent" // TODO: Make this component
// import FooterComponent from "./FooterComponent"; // TODO: Make this component


const { AccountData, ContractData, ContractForm } = newContextComponents;


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const eventManagerContract = drizzle.contracts.EventManager;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHomeMenuClick = () => {
    // navigate
    handleClose();
  };

  const handleAboutMenuClick = () => {
    // navigate
    handleClose();
  };

  const handleCreateMenuClick = () => {
    // navigate
    handleClose();
  };

  const handleBrowseMenuClick = () => {
    // navigate
    handleClose();
  };

  const handleHelpMenuClick = () => {
    // navigate
    handleClose();
  };

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
  function createNewContract() {
    eventManagerContract.methods.createPollEventContract.cacheSend('TestContractName', {
      from: drizzleState.accounts[0],
      gas: 900000, // remove this before deploying to prod
    })
  }

  return (
    <div className="App">
      <div className="app-header">
        <h4 className="account-label-class">Account:</h4>
        <span className="account-address-class">
          <AccountData
            drizzle={drizzle}
            drizzleState={drizzleState}
            accountIndex={0}
            units="ether"
            precision={3}
          />
        </span>
      </div>

      <span className="navbar-icon-class">
        <Button className="navbar-icon-color-class" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          <MenuIcon style={{ fontSize: 33 }}/>

        </Button>
        <Menu 
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleHomeMenuClick}>Home</MenuItem>
          <MenuItem onClick={handleAboutMenuClick}>About</MenuItem>
          <MenuItem onClick={handleCreateMenuClick}>Create</MenuItem>
          <MenuItem onClick={handleBrowseMenuClick}>Browse</MenuItem>
          <MenuItem onClick={handleHelpMenuClick}>Help</MenuItem>
        </Menu>
      </span>

      <div className="app-body">
        <div>
          <h1>Crêpe Smart Contracts</h1>
          <img src={crepe} alt="crepe-logo" className="crepe-body-logo-class"/>
          <h2>Experience Smart Contracts with Crêpe.</h2>
          <p>
            Using Crêpe anyone can create their own personalized smart contract. Start with a contract template
            and configure it however you'd like, all without typing a single line of code. Easily setup and deploy
            trustless smart contracts for events such as Polls, Wagers, and Escrows. Download Metamask, fund your
            account and get started below!
          </p>
        </div>

        <div className="section">
          <h2>Testing EventManager Contract Functions</h2>
          <p>
            Testing the funcionality of the EventManager Contract.
            Once functionality all works on single page,
            break it out to a multiple page webapp and create Contracts
            for each of the event types. Thus removing BaseEvents.
          </p>

          {/* This can be used once EIP-1167 is implemented */}
          {/* <strong>createPollEventContract: </strong>
          <ContractForm
            drizzle={drizzle}
            contract="EventManager"
            method="createPollEventContract"
            labels={["name"]}
          />
          <br></br> */}

          <button onClick={createNewContract}>Add Contract</button>
          <br></br>

          <strong>getPollEventContract: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="EventManager"
            method="getPollEventContractInstance"
            methodArgs={[1]}
          />
          <br></br>

          <strong>getPollEventContractCount: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="EventManager"
            method="getPollEventContractCount"
          />
          <br></br>

          <strong>getPollEventContractList: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="EventManager"
            method="getPollEventContractList"
          />
          <br></br>
        </div>
      </div>

      <div className="app-footer">
        <img src={crepe} alt="crepe-logo" className="crepe-footer-logo-class"/> 

        <div className="footer-hyperlink-wrapper">
          <div className="footer-col-one">
            <ul>
              <li>
                <a href="www.google.com">Home</a> 
              </li>
              <li>
                <a href="www.google.com">About</a> 
              </li>
              <li>
                <a href="www.google.com">Help</a> 
              </li>
            </ul>
          </div>

          <div className="footer-col-two">
            <ul>
              <li>
                <a href="www.google.com">Create</a> 
              </li>
              <li>
                <a href="www.google.com">Browse</a> 
              </li>
              <li>
                <a href="www.google.com">Search</a> 
              </li>
            </ul>
          </div>
        </div> 

        <div className="footer-subtext-class">
          <p>Created by Stephen Eades 2021 - IT8010 Capstone Project - Instructed by Dr. Murat Ozer</p>
          <div className="logo-attribution-text-class">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a>
            from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
           </div>
        </div>
        
      </div>
    </div>
  );
};
