import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import { accountIndex } from './../../test/_test.js'


// for TextField component
const useStyles = makeStyles((theme) => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 450,
  },
  searchButton: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const history = useHistory();

  const classes = useStyles(); // for TextField component

  const eventManagerContract = drizzle.contracts.EventManager;

  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'right',
    message: ''
  });

  const { vertical, horizontal, message, open } = state;

  const showSnackbar = (newState) => {
    setState({ ...newState });
  };

  const handleClose = () => {
    setState({ open: false, vertical: 'top', horizontal: 'right', message: message });
  };

  const [contractAddress, setContractAddress] = useState("");

  const onContractAddressInputChange = (event) => {
    setContractAddress(event.target.value); 
  }

  async function searchForContract() {
    let allContractAddresses = [];

    await eventManagerContract.methods.getPollEventContractList().call({from: drizzleState.accounts[accountIndex]})
    .then(function(result){
      for (let i=0; i<result.length; i++) {
        let tempObj = { address: result[i], type: 'poll' }
        allContractAddresses.push(tempObj)
      }
    });

    await eventManagerContract.methods.getEscrowEventContractList().call({from: drizzleState.accounts[accountIndex]})
    .then(function(result){
      for (let i=0; i<result.length; i++) {
        let tempObj = { address: result[i], type: 'escrow' }
        allContractAddresses.push(tempObj)
      }
    });

    await eventManagerContract.methods.getLotteryEventContractList().call({from: drizzleState.accounts[accountIndex]})
    .then(function(result){
      for (let i=0; i<result.length; i++) {
        let tempObj = { address: result[i], type: 'lottery' }
        allContractAddresses.push(tempObj)
      }
    });

    // Check if address matches existing any existing events
    const index = allContractAddresses.map(e => e.address).indexOf(contractAddress);
    if (index >= 0) {
      // Search found an existing event, navigate to it:
      history.push(`/view/${allContractAddresses[index].type}/${contractAddress}`)
    } else {
      showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Unable to find Smart Contract Event' });
    }


  }

  return (
    <div className="App">
      <div className="app-body">
        <div>
          <h1>Search</h1>
          <h2>Find a specific Smart Contract</h2>
          <p>
            Find a particular smart contract event to interact with. Input the address and click search. 
          </p>
        </div>

        <div className="section-centered">
          <form>
            <br></br><br></br>
            <TextField
              id="contract-address-field"
              label="Contract Address"
              type="text"
              className={classes.textField}
              onChange={onContractAddressInputChange}
            />

            <span className={classes.searchButton}>
              <Button variant="contained" color="secondary" onClick={searchForContract}>
                Search
              </Button>
              <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message={message}
                key={vertical + horizontal}
              />
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
