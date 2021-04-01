import React from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { newContextComponents } from "@drizzle/react-components";
import { TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';


const { AccountData, ContractData, ContractForm } = newContextComponents;

// for datepicker component
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  deployButton: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const { address } = useParams();
  const routeToCreatedContract = (address) => {
    setTimeout(() => {
      history.push(`/browse`);
      // history.push(`/view/${address}`)
    }, 1500);
  }

  const history = useHistory();

  const eventManagerContract = drizzle.contracts.EventManager;

  const [contractType, setContractType] = useState("poll");

  const [pollContractName, setPollContractName] = useState("");
  const [escrowContractName, setEscrowContractName] = useState("");
  const [wagerContractName, setWagerContractName] = useState("");

  const [pollContractAuthor, setPollContractAuthor] = useState(drizzleState.accounts[0]);
  const [escrowContractAuthor, setEscrowContractAuthor] = useState(drizzleState.accounts[0]);
  const [wagerContractAuthor, setWagerContractAuthor] = useState(drizzleState.accounts[0]);

  const classes = useStyles(); // for datepicker component
  const [pollExpirationDate, setPollExpirationDate] = useState();
  const [escrowExpirationDate, setEscrowExpirationDate] = useState();
  const [wagerExpirationDate, setWagerExpirationDate] = useState();

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

  let pollOptions = [];

  const onRadioInputChange = (event) => {
    if (event.target.value === "poll") {
      setContractType(event.target.value);
    } else if (event.target.value === "escrow") {
      setContractType(event.target.value);
    } else if (event.target.value === "wager") {
      setContractType(event.target.value);
    } else {
      showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Error setting contract type' });
    }
  }

  const onPollContractNameInputChange = (event) => {
    setPollContractName(event.target.value); 
  }

  const onEscrowContractNameInputChange = (event) => {
    setEscrowContractName(event.target.value); 
  }

  const onWagerContractNameInputChange = (event) => {
    setWagerContractName(event.target.value); 
  }

  const onPollExpirationDateInputChange = (event) => {
    let date = (new Date(event.target.value)).getTime() / 1000;
    setPollExpirationDate(date); 
  }

  const onEscrowExpirationDateInputChange = (event) => {
    let date = (new Date(event.target.value)).getTime() / 1000;
    setEscrowExpirationDate(date); 
  }

  const onWagerExpirationDateInputChange = (event) => {
    let date = (new Date(event.target.value)).getTime() / 1000;
    setWagerExpirationDate(date); 
  }

  function validateForm(formName) {
    if (formName === "poll") {
      if (pollContractName.length === 0) {
        // Highlight error textField
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Please input contract name' });
        return false;
      } else if (!pollExpirationDate || pollExpirationDate < new Date().getTime() / 1000) {
        // Highlight error textField
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Please select a future date' });
        return false;
      }
      // add cases to invalidate poll form
      return true;
    } 
    if (formName === "escrow") {
      if (escrowContractName.length === 0) {
        // Highlight error textField
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Please input contract name' });
        return false;
      } else if (!escrowExpirationDate || escrowExpirationDate < new Date().getTime() / 1000) {
        // Highlight error textField
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Please select a future date' });
        return false;
      }
      // add cases to invalidate escrow form
      return true;
    }
    if (formName === "wager") {
      if (wagerContractName.length === 0) {
        // Highlight error textField
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Please input contract name' });
        return false;
      } else if (!wagerExpirationDate || wagerExpirationDate < new Date().getTime() / 1000) {
        // Highlight error textField
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Please select a future date' });
        return false;
      }
      // add cases to invalidate wager form
      return true;
    }
  }

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
  function createNewPollContract() {
    if (validateForm("poll")) {
      eventManagerContract.methods.createPollEventContract.cacheSend(pollContractName, pollExpirationDate, {
        from: drizzleState.accounts[0],
        gas: 900000, // remove this before deploying to prod
      })
      showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Poll Contract Deployed' });
      routeToCreatedContract(address);
    }
  }

  /**
   * Same as above...
   */
  function createNewEscrowContract() {
    if (validateForm("escrow")) {
      eventManagerContract.methods.createEscrowEventContract.cacheSend(escrowContractName, escrowExpirationDate, {
        from: drizzleState.accounts[0],
        gas: 900000, // remove this before deploying to prod
      })
      showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Escrow Contract Deployed' });
      routeToCreatedContract(address);
    }
  }

  /**
   * Same as above...
   */
  function createNewWagerContract() {
    if (validateForm("wager")) {
      eventManagerContract.methods.createWagerEventContract.cacheSend(wagerContractName, wagerExpirationDate, {
        from: drizzleState.accounts[0],
        gas: 900000, // remove this before deploying to prod
      })
      showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Wager Contract Deployed' });
      routeToCreatedContract(address);
    }
  }

  return (
    <div className="App">
      <div className="app-body">
        <div>
          <h1>Create</h1>
          
          <h2>Make your own Smart Contracts</h2>
          <p>
            Configure your own decentralized events using smart contracts. Select the event type below to get started. 
          </p>
        </div>

        <div className="section">
          <div>
            <span className="radio-button-container-class">
              <Radio
                value="poll"
                name="poll_event"
                className="radio-input-button-class"
                checked={contractType === "poll"}
                onChange={onRadioInputChange}
              />
              Poll
            </span>

            <span className="radio-button-container-class">
              <Radio
                value="escrow"
                name="escrow_event"
                className="radio-input-button-class"
                checked={contractType === "escrow"}
                onChange={onRadioInputChange}
              />
              Escrow
            </span>

            <span className="radio-button-container-class">
            <Radio
              value="wager"
              name="wager_event"
              className="radio-input-button-class"
              checked={contractType === "wager"}
              onChange={onRadioInputChange}
            />
            Wager
            </span>
          </div>

          {contractType === "poll" && (
            <form className="form-class">
              <h2>Poll Event Smart Contract</h2>
              <p>
                Poll events allow a voting process to be configured. Users
                can access the poll and cast their vote before the poll ends.
                After the poll, view the results and see the winner. Complete 
                the form below to configure your poll event, then deploy it!
              </p>
              <br></br>

              <TextField
                id="poll-contract-name"
                label="Contract Name"
                type="text"
                className={classes.textField}
                onChange={onPollContractNameInputChange}
              />
              <br></br><br></br>

              <TextField
                id="poll-contract-author"
                label="Author Address"
                type="text"
                value={pollContractAuthor}
                className={classes.textField}
                disabled
              />
              <br></br><br></br>

              <TextField
                id="poll-contract-expiration"
                label="Expiration Date"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onPollExpirationDateInputChange}
              />
              <br></br><br></br>

              <div className="bottom-form-class">
                <div className={classes.deployButton}>
                  <Button variant="contained" color="secondary" onClick={createNewPollContract}>
                    Deploy
                  </Button>
                  <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    message={message}
                    key={vertical + horizontal}
                  />
                </div>
                <br></br>
              </div>
            </form>
          )}

          {contractType === "escrow" && (
            <form>
              <h2>Escrow Event Smart Contract</h2>
              <p>
                Escrow events allow a escrow process to be configured. Specified 
                users can access the escrow and deposit their funds to be locked.
                After the lock period is over, the configured funds will be released. 
                Complete the form below to configure your escrow event, then deploy it!
              </p>
              <br></br>

              <TextField
                id="escrow-contract-name"
                label="Contract Name"
                type="text"
                className={classes.textField}
                onChange={onEscrowContractNameInputChange}
              />
              <br></br><br></br>

              <TextField
                id="escrow-contract-author"
                label="Author Address"
                type="text"
                value={escrowContractAuthor}
                className={classes.textField}
                disabled
              />
              <br></br><br></br>

              <TextField
                id="escrow-contract-expiration"
                label="Expiration Date"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onEscrowExpirationDateInputChange}
              />
              <br></br><br></br>
              
              <div className="bottom-form-class">
                <div className={classes.deployButton}>
                  <Button variant="contained" color="secondary" onClick={createNewEscrowContract}>
                    Deploy
                  </Button>
                  <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    message={message}
                    key={vertical + horizontal}
                  />
                </div>
                <br></br>
              </div>
            </form>
          )}

          {contractType === "wager" && (
            <form>
              <h2>Wager Event Smart Contract</h2>
              <p>
                Wager events allow a betting process to be configured. Specified 
                users can access the wager and agree to the bet by depositing funds.
                After the wager conditions are met, the configured funds will be released
                to the winner of the bet. 
                Complete the form below to configure your escrow event, then deploy it!
              </p>
              <br></br>

              <TextField
                id="wager-contract-name"
                label="Contract Name"
                type="text"
                className={classes.textField}
                onChange={onWagerContractNameInputChange}
              />
              <br></br><br></br>

              <TextField
                id="wager-contract-author"
                label="Author Address"
                type="text"
                value={wagerContractAuthor}
                className={classes.textField}
                disabled
              />
              <br></br><br></br>

              <TextField
                id="wager-contract-expiration"
                label="Expiration Date"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={onWagerExpirationDateInputChange}
              />
              <br></br><br></br>

              <div className="bottom-form-class">
                <div className={classes.deployButton}>
                  <Button variant="contained" color="secondary" onClick={createNewWagerContract}>
                    Deploy
                  </Button>
                  <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={open}
                    onClose={handleClose}
                    message={message}
                    key={vertical + horizontal}
                  />
                </div>
                <br></br>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
