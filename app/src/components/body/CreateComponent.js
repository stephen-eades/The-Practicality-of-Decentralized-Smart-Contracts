import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import InputAdornment from '@material-ui/core/InputAdornment';
import { accountIndex } from './../../test/_test.js'


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
  demo: {
    backgroundColor: theme.palette.background.paper,
    maxHeight: 115,
    overflowX: 'auto',
  },
}));


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const routeToCreatedContract = (address, type) => {
    setTimeout(() => {
      // history.push(`/browse`);
      history.push(`/view/${type}/${address}`)
    }, 500);
  }

  const history = useHistory();

  const eventManagerContract = drizzle.contracts.EventManager;
  const eventCreatorContract = drizzle.contracts.EventCreator;

  const [contractType, setContractType] = useState("poll");

  const [pollContractName, setPollContractName] = useState("");
  const [escrowContractName, setEscrowContractName] = useState("");
  const [lotteryContractName, setLotteryContractName] = useState("");

  const [pollContractAuthor] = useState(drizzleState.accounts[accountIndex]);
  const [escrowContractAuthor] = useState(drizzleState.accounts[accountIndex]);
  const [lotteryContractAuthor] = useState(drizzleState.accounts[accountIndex]);

  const classes = useStyles(); // for datepicker component
  const [pollExpirationDate, setPollExpirationDate] = useState();
  const [escrowExpirationDate, setEscrowExpirationDate] = useState();
  const [lotteryExpirationDate, setLotteryExpirationDate] = useState();

  const [pollCandidateName, setPollCandidateName] = useState("");
  const [pollCandidateList, setPollCandidateList] = useState([]); 

  const [escrowAmount, setEscrowAmount] = useState("");
  const [escrowAddress, setEscrowAddress] = useState("");
  const [escrowAddressList, setEscrowAddressList] = useState([]); 

  const [lotteryBuyin, setLotteryBuyin] = useState("");
  const [lotteryTicketCount, setLotteryTicketCount] = useState("");

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

  const onRadioInputChange = (event) => {
    if (event.target.value === "poll") {
      setContractType(event.target.value);
    } else if (event.target.value === "escrow") {
      setContractType(event.target.value);
    } else if (event.target.value === "lottery") {
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

  const onLotteryContractNameInputChange = (event) => {
    setLotteryContractName(event.target.value); 
  }

  const onPollExpirationDateInputChange = (event) => {
    let date = (new Date(event.target.value)).getTime() / 1000;
    setPollExpirationDate(date); 
  }

  const onEscrowExpirationDateInputChange = (event) => {
    let date = (new Date(event.target.value)).getTime() / 1000;
    setEscrowExpirationDate(date); 
  }

  const onLotteryExpirationDateInputChange = (event) => {
    let date = (new Date(event.target.value)).getTime() / 1000;
    setLotteryExpirationDate(date); 
  }

  const onCandidateNameInputChange = (event) => {
    setPollCandidateName(event.target.value); 
  }

  const onEscrowAmountInputChange = (event) => {
    setEscrowAmount(event.target.value); 
  }

  const onEscrowAddressInputChange = (event) => {
    setEscrowAddress(event.target.value); 
  }

  const onLotteryBuyinInputChange = (event) => {
    setLotteryBuyin(event.target.value); 
  }

  const onLotteryTicketCountInputChange = (event) => {
    setLotteryTicketCount(event.target.value); 
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
      } else if (pollCandidateList.length < 2) {
        // Highlight error textField
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Please add at least 2 candidates' });
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
      } else if (escrowAmount.length === 0 || escrowAmount <= 0) {
        // Highlight error textField
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Please enter a valid amount' });
        return false;
      } else if (escrowAddressList.length === 0) {
        // Highlight error textField
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Please add at least 1 address' });
        return false;
      }
      // add cases to invalidate escrow form
      return true;
    }
    if (formName === "lottery") {
      if (lotteryContractName.length === 0) {
        // Highlight error textField
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Please input contract name' });
        return false;
      } else if (!lotteryExpirationDate || lotteryExpirationDate < new Date().getTime() / 1000) {
        // Highlight error textField
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Please select a future date' });
        return false;
      } else if (lotteryTicketCount.length === 0 || lotteryTicketCount <= 0) {
        // Highlight error textField
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Please enter a valid ticket count' });
        return false;
      } else if (lotteryBuyin.length === 0 || lotteryBuyin <= 0) {
        // Highlight error textField
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Please enter a valid amount' });
        return false;
      }
      // add cases to invalidate lottery form
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
      try {
        (async () => {
          var ethJsUtil = require('ethereumjs-util');
          var creatorNonce = await drizzle.web3.eth.getTransactionCount(eventCreatorContract.address);
  
          var futureAddress = ethJsUtil.bufferToHex(ethJsUtil.generateAddress(
            // The contract address creating the new contract
            eventCreatorContract.address,
            creatorNonce,
          )) 

          eventManagerContract.methods.createPollEventContract.cacheSend(
            pollContractName, pollExpirationDate, pollCandidateList, {
            from: drizzleState.accounts[accountIndex],
            gas: 6000000, // remove this before deploying to prod
          }) 
          routeToCreatedContract(futureAddress, "poll");
        })();
      }
      catch(err) {
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Unable to deploy' });
      }
    }
  }

  /**
   * Same as above...
   */
  function createNewEscrowContract() {
    if (validateForm("escrow")) {
      try {
        (async () => {
          var ethJsUtil = require('ethereumjs-util');
          var creatorNonce = await drizzle.web3.eth.getTransactionCount(eventCreatorContract.address);
  
          var futureAddress = ethJsUtil.bufferToHex(ethJsUtil.generateAddress(
            // The contract address creating the new contract
            eventCreatorContract.address,
            creatorNonce,
          )); 
          eventManagerContract.methods.createEscrowEventContract.cacheSend(
            escrowContractName, escrowExpirationDate, escrowAddressList, drizzle.web3.utils.toWei(escrowAmount), {
            from: drizzleState.accounts[accountIndex],
            gas: 6000000, // remove this before deploying to prod
          })
          routeToCreatedContract(futureAddress, "escrow");
        })();
      }
      catch(err) {
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Unable to deploy' });
      }
    }
  }

  /**
   * Same as above...
   */
  function createNewLotteryContract() {
    if (validateForm("lottery")) {
      try {
        (async () => {
          var ethJsUtil = require('ethereumjs-util');
          var creatorNonce = await drizzle.web3.eth.getTransactionCount(eventCreatorContract.address);
  
          var futureAddress = ethJsUtil.bufferToHex(ethJsUtil.generateAddress(
            // The contract address creating the new contract
            eventCreatorContract.address,
            creatorNonce,
          )); 
          eventManagerContract.methods.createLotteryEventContract.cacheSend(
            lotteryContractName, lotteryExpirationDate, lotteryTicketCount, drizzle.web3.utils.toWei(lotteryBuyin), {
            from: drizzleState.accounts[accountIndex],
            gas: 6000000, // remove this before deploying to prod
          });
          routeToCreatedContract(futureAddress, "lottery");
        })();
      }
      catch(err) {
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Unable to deploy' });
      }
    }
  }

  function addPollCandidateName() {
    if (pollCandidateName.length) {
      pollCandidateList.push(pollCandidateName);
      document.getElementById('poll-candidate-input').value = '';
      setPollCandidateName('');
    } else {
      showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Please enter a candidate name' });
    }
  }

  function addEscrowAddress() {
    if (escrowAddress.length && drizzle.web3.utils.isAddress(escrowAddress)) {
      escrowAddressList.push(escrowAddress);
      document.getElementById('escrow-address-input').value = '';
      setEscrowAddress('');
    } else {
      showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Please enter a valid address' });
    }
  }

  function removeFromList(index) {
    if (contractType === "poll") {
      let tempList = [...pollCandidateList];
      tempList.splice(index,1);
      setPollCandidateList(tempList);
    } else if (contractType === "escrow") {
      let tempList = [...escrowAddressList];
      tempList.splice(index,1);
      setEscrowAddressList(tempList);
    } else {
      showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Error removing option. Try again.' });
    }
  }

  const customList = (items) => (
    <Paper className={classes.demo}>

      <List component="div" role="list">
        {items.map((value, index) => {
          return (
            <ListItem key={index}>
              <ListItemText id={`candidate-${index}`} primary={value} />
              <DeleteIcon className="hover-cursor" onClick={() => removeFromList(index)} />
            </ListItem>
          );
        })}
      </List>

    </Paper>
  );

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
              value="lottery"
              name="lottery_event"
              className="radio-input-button-class"
              checked={contractType === "lottery"}
              onChange={onRadioInputChange}
            />
            Lottery
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

              <div className="column">
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
              </div>

              <div className="column">
                <TextField
                  id="poll-candidate-input"
                  label="Enter Candidate names"
                  type="text"
                  className={classes.textField}
                  onChange={onCandidateNameInputChange}
                />
                <Button className="add-poll-candidate-button" variant="contained" color="secondary" onClick={addPollCandidateName}>
                  Add
                </Button>
                <br></br><br></br>
                <div>
                  {pollCandidateList.length > 0 && (
                    customList(pollCandidateList)
                  )}
                </div>
              </div>
            </form>
          )}

          {contractType === "escrow" && (
            <form>
              <h2>Escrow Event Smart Contract</h2>
              <p>
                Escrow events allow an escrow process to be configured. Specified 
                users can access and deposit their funds to be locked.
                After expiration, the funds will be released. 
                Complete the form below to configure your escrow event, then deploy it!
              </p>
              <br></br>

              <div className="column">
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
              </div>

              <div className="column">
                <TextField
                  id="escrow-amount-input"
                  label="Enter Amount"
                  type="number"
                  className={classes.textField}
                  onChange={onEscrowAmountInputChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
                  }}
                />
                <br></br><br></br>

                <TextField
                  id="escrow-address-input"
                  label="Enter Involved Addresses"
                  type="text"
                  className={classes.textField}
                  onChange={onEscrowAddressInputChange}
                />
                <Button className="add-escrow-address-button" variant="contained" color="secondary" onClick={addEscrowAddress}>
                  Add
                </Button>
                <br></br><br></br>
                <div>
                  {escrowAddressList.length > 0 && (
                    customList(escrowAddressList)
                  )}
                </div>
              </div>
            </form>
          )}

          {contractType === "lottery" && (
            <form>
              <h2>Lottery Event Smart Contract</h2>
              <p>
                Lottery events allow a lottery process to be configured. Any user can access and
                enter by depositing the buy-in amount.
                After expiration, the pot is released to a winner. Complete the form 
                below to configure your lottery event, then deploy it!
              </p>
              <br></br>

              <div className="column">
                <TextField
                  id="lottery-contract-name"
                  label="Contract Name"
                  type="text"
                  className={classes.textField}
                  onChange={onLotteryContractNameInputChange}
                />
                <br></br><br></br>

                <TextField
                  id="lottery-contract-author"
                  label="Author Address"
                  type="text"
                  value={lotteryContractAuthor}
                  className={classes.textField}
                  disabled
                />
                <br></br><br></br>

                <TextField
                  id="lottery-contract-expiration"
                  label="Expiration Date"
                  type="date"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={onLotteryExpirationDateInputChange}
                />
                <br></br><br></br>

                <div className="bottom-form-class">
                  <div className={classes.deployButton}>
                    <Button variant="contained" color="secondary" onClick={createNewLotteryContract}>
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
              </div>

              <div className="column">
                <TextField
                  id="lottery-buyin-input"
                  label="Enter Buy-in"
                  type="number"
                  className={classes.textField}
                  onChange={onLotteryBuyinInputChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">ETH</InputAdornment>,
                  }}
                />
                <br></br><br></br>

                <TextField
                  id="lottery-ticket-count-input"
                  label="Enter Ticket Count"
                  type="number"
                  className={classes.textField}
                  onChange={onLotteryTicketCountInputChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">Tickets</InputAdornment>,
                  }}
                />
                <br></br><br></br>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
