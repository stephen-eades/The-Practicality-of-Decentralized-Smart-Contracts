import React from "react";
import { useHistory } from "react-router-dom";
import { newContextComponents } from "@drizzle/react-components";
import crepe from "./../../crepe.svg";
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import SearchIcon from '@material-ui/icons/Search';



const { AccountData, ContractData, ContractForm } = newContextComponents;

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const classes = useStyles();

  const history = useHistory();

  function handleCreateIconClick() {
    history.push("/create");
  }

  function handleBrowseIconClick() {
    history.push("/browse");
  }

  return (
    <div className="App">
      <div className="app-body">
        <div>
          <h1>Crêpe</h1>
          <h2>Create Custom Smart Contracts</h2>
          <img src={crepe} alt="crepe-logo" className="crepe-body-logo-class"/>
          <p>
            Using Crêpe anyone can create their own personalized smart contract. Start with a contract template
            and configure it however you'd like, all without typing a single line of code. Easily setup and deploy
            trustless smart contracts for events such as Polls, Wagers, and Escrows. Download Metamask, fund your
            account and get started below!
          </p>
        </div>

        <div className="section-centered">
          <span className={classes.root}>
            <IconButton color="secondary" aria-label="add an alarm" onClick={handleCreateIconClick}>
              <AddCircleOutlineIcon style={{ fontSize: 125 }}/>
            </IconButton>
          </span>
          <span className={classes.root}>
            <IconButton color="secondary" aria-label="add an alarm" onClick={handleBrowseIconClick}>
              <SearchIcon style={{ fontSize: 125 }}/>
            </IconButton>
          </span>
        </div>
      </div>
    </div>
  );
};
