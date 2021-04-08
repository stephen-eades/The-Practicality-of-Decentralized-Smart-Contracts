import React from "react";
import { useHistory } from "react-router-dom";
import crepe from "./../../crepe.svg";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  createButton: {
    '& > *': {
      margin: theme.spacing(3),
    },
  },
  browseButton: {
    '& > *': {
      margin: theme.spacing(3),
    },
  },
}));


export default () => {
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
            trustless smart contracts for events such as Polls, Raffles, and Escrows. Download Metamask, fund your
            account and get started below!
          </p>
        </div>

        <div className="section-centered">
          <span className={classes.createButton}>
            <Button size="large" variant="contained" color="secondary" onClick={handleCreateIconClick}>
              Create
            </Button>
          </span>
          <span className={classes.browseButton}>
            <Button size="large" variant="contained" color="secondary" onClick={handleBrowseIconClick}>
              Browse
            </Button>
          </span>
        </div>
      </div>
    </div>
  );
};
