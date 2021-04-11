import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { TextField } from "@material-ui/core";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import PollEvent from "./../../contracts/PollEvent.json";
import EscrowEvent from "./../../contracts/EscrowEvent.json";
import RaffleEvent from "./../../contracts/RaffleEvent.json";
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';


// for Button component
const useStyles = makeStyles((theme) => ({
  viewButton: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  table: {
    minWidth: '100%',

  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#ff636ed1",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const classes = useStyles(); // for Button component

  const [contractInstance, setContractInstance] = useState();

  const { address } = useParams();
  const { type } = useParams();
  const [displayContract, setDisplayContract] = useState(false);
  const [pollRows, setPollRows] = useState([]);
  const [escrowRows, setEscrowRows] = useState([]);
  const [raffleRows, setRaffleRows] = useState([]);
  const [contractAddress] = useState(address);
  const [contractName, setContractName] = useState('');
  const [contractType, setContractType] = useState('');
  const [contractAuthor, setContractAuthor] = useState();
  const [contractExpirationDate, setContractExpirationDate] = useState();

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
  
  /**
   * 
   */
  async function getContractData() {
    let contract;
    if (type === "poll") {
      contract = new drizzle.web3.eth.Contract(PollEvent.abi, address);
    } else if (type === "escrow") {
      contract = new drizzle.web3.eth.Contract(EscrowEvent.abi, address);
    } else if (type === "raffle") {
      contract = new drizzle.web3.eth.Contract(RaffleEvent.abi, address);
    } else {
      // Error, no type detected
      console.log('No contract type was detected.');
    }

    setContractInstance(contract);

    if (contract){
      try {
        getContractType(contract);
        getContractName(contract);
        getContractAuthor(contract);
        getContractExpirationDate(contract);

        setDisplayContract(true);
      }
      catch(err) {
        console.log('Error retrieving contract data');
      }
    } else {
      console.log('Could not find contract. Please try again.');
    }
  }

  const mockEscrowList = [
    { address: '0xdc5899241404C43dBDb9Dadb2Eb83fC368aBe2EF', required: '5 ETH', current: '5 ETH' },
    { address: '0x6b14DD21B3d6FAaa0Ba7164a26B7F53dA981A21b', required: '5 ETH', current: '5 ETH' },
    { address: '0xA5b7cd700b87FE69d57df47E8ab6FD73d14D0f73', required: '5 ETH', current: '0 ETH' },
  ]

  const mockRaffleList = [
    { id: 1, address: '0xdc5899241404C43dBDb9Dadb2Eb83fC368aBe2EF', ticket: '4572845731' },
    { id: 2, address: '0x6b14DD21B3d6FAaa0Ba7164a26B7F53dA981A21b', ticket: '9873214563' },
    { id: 3, address: '0xA5b7cd700b87FE69d57df47E8ab6FD73d14D0f73', ticket: '7234018687' },
  ]

  function getPollTableData(contract) {
    contract.methods.getElectionData().call({from: drizzleState.accounts[0]})
    .then(function(result){
      let tempCandidatesList = result[0];
      let tempVoteCountList = result[1];
      let tempPollList = [];
      for (let i=0; i<result[0].length; i++) {
        let tempObject = { id: i+1, name: tempCandidatesList[i], total: tempVoteCountList[i] }
        tempPollList.push(tempObject);
      } 
      createPollTableData(tempPollList);
    });
  }

  function getEscrowTableData(contract) {
    contract.methods.getEscrowData().call({from: drizzleState.accounts[0]})
    .then(function(result){
      console.log(result);
      // TODO: Error here when doing more than 1 address, maybe need to change type in solidity from string to uint32?
      let tempEscrowAddressList = result[0];
      let tempRequiredDepositList = result[1];
      let tempCurrentDepositList = result[2];
      let tempEscrowList = [];
      for (let i=0; i<result[0].length; i++) {
        let tempObject = { id: i+1, address: tempEscrowAddressList[i], required: tempRequiredDepositList[i], current: tempCurrentDepositList[i] }
        tempEscrowList.push(tempObject);
      } 
      createEscrowTableData(tempEscrowList);
    });
  }

  function getRaffleTableData(contract) {
    // Get raffle data to pass in as list for each row
    createRaffleTableData(mockRaffleList);
  }

  /**
   * Takes in a list of candidate data 
   */
  function createPollTableData(candidateList) {
    let tempPollRows = [];
    for (let candidate of candidateList) {
      const data = createCandidateData(candidate, <HowToVoteIcon />);
      tempPollRows.push(data);
    }
    setPollRows(tempPollRows);
  }

  /**
   * Takes in a list of escrow data 
   */
  function createEscrowTableData(escrowList) {
    let tempEscrowRows = [];
    for (let escrow of escrowList) {
      const data = createEscrowData(escrow, <EnhancedEncryptionIcon />, <LockOpenIcon />);
      tempEscrowRows.push(data);
    }
    setEscrowRows(tempEscrowRows);
  }

  /**
   * Takes in a list of raffle data 
   */
  function createRaffleTableData(raffleList) {
    let tempRaffleRows = [];
    for (let raffle of raffleList) {
      const data = createRaffleData(raffle, <ReceiptIcon />);
      tempRaffleRows.push(data);
    }
    setRaffleRows(tempRaffleRows);
  }

  /**
   * 
   */
  function createCandidateData(candidate, icon) {
    var id = candidate.id
    var name = candidate.name
    var total = candidate.total
    
    return { id, name, total, icon };
  }

  /**
   * 
   */
  function createEscrowData(escrow, depositIcon, withdrawIcon) {
    // var id = await getCandidateName(candidate);
    // var name = contract.options.address;
    // var total = await getContractAuthor(candidate);
    var id = escrow.id
    var address = escrow.address
    var required = escrow.required
    var current = escrow.current
    
    return { id, address, required, current, depositIcon, withdrawIcon };
  }

  /**
   * 
   */
  function createRaffleData(raffle, icon) {
    // var id = await getCandidateName(candidate);
    // var name = contract.options.address;
    // var total = await getContractAuthor(candidate);
    var id = raffle.id
    var address = raffle.address
    var ticket = raffle.ticket
    
    return { id, address, ticket, icon };
  }

  /**
   * 
   */
  async function getContractType(contract) {
    await contract.methods.getContractType().call({from: drizzleState.accounts[0]})
    .then(function(result){
      setContractType(result[0].toUpperCase() + result.slice(1)); // Capitalize
      if (result === 'poll') {
        getPollTableData(contract);
      } else if (result === 'escrow') {
        getEscrowTableData(contract);
      } else if (result === 'raffle') {
        getRaffleTableData(contract);
      } else {
        // Error
        console.log('Error retrieving table data.')
      }
    });
  }

  /**
   * 
   */
  function getContractName(contract) {
    contract.methods.getContractName().call({from: drizzleState.accounts[0]})
    .then(function(result){
      setContractName(result);
    });
  }

  /**
   * 
   */
  function getContractAuthor(contract) {
    contract.methods.getContractAuthor().call({from: drizzleState.accounts[0]})
    .then(function(result){
      setContractAuthor(result);
    });
  }

  /**
   * 
   */
  function getContractExpirationDate(contract) {
    contract.methods.getContractExpirationDate().call({from: drizzleState.accounts[0]})
    .then(function(result){
      result = new Date(result * 1000).toDateString();
      setContractExpirationDate(result);
    });
  }

  function vote(id) {
    try {
      contractInstance.methods.canAddressVote(drizzleState.accounts[0]).call({from: drizzleState.accounts[0]})
        .then(function(result){
          if (result === false) {
            // Address has not voted, cast the vote
            contractInstance.methods.vote(id).send({
              from: drizzleState.accounts[0],
              gas: 2000000, // remove this before deploying to prod
            }).then(function(result){
              showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Successfully cast vote.' });
              window.location.reload(); // Forces wallet to update after transaction
            });
          } else {
            // Address has already voted, show snackbar
            showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Your address has already voted.' });
          }
        });
    }
    catch(err) {
      console.log('Error while voting: ' + err);
    }
  }

  function makeEscrowDeposit(id, selectedAddress, required) {
    try {
      if (drizzleState.accounts[0] === selectedAddress) {
        contractInstance.methods.canAddressDeposit(id).call({from: drizzleState.accounts[0]})
        .then(function(result){
          if (result === true) {
            // NOTE: We will automatically force full deposit 
            contractInstance.methods.deposit(id).send({
              from: drizzleState.accounts[0],
              gas: 2000000, // remove this before deploying to prod
              value: drizzle.web3.utils.toWei(required, "ether"),
            }).then(function(result){
              showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Successfully deposited.' });
              window.location.reload(); // Forces wallet to update after transaction
            });
          } else {
            showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Required amount already deposited.' });
          }
          
        });
      } else {
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Not authorized to make deposit.' });
      }
    }
    catch(err) {
      showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Unable to make deposit.' });
    }
  }

  function makeEscrowWithdrawl(id, selectedAddress) {
    try {
      if (drizzleState.accounts[0] === selectedAddress) {
        contractInstance.methods.canAddressWithdraw(id).call({from: drizzleState.accounts[0]})
        .then(function(result){
          if (result === true) {
            // NOTE: We will automatically force full withdraw
            contractInstance.methods.withdraw(id).send({
              from: drizzleState.accounts[0],
              gas: 2000000, // remove this before deploying to prod
            }).then(function(result){
              showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Successfully withdrew funds.' });
              window.location.reload(); // Forces wallet to update after transaction
            });
          } else {
            showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: "Can't withdraw until after expiration." });
          }
          
        });
      } else {
        showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Not authorized to make withdraw.' });
      }
    }
    catch(err) {
      showSnackbar({ open: true, vertical: 'top', horizontal: 'right', message: 'Unable to make withdraw.' });
    }
  }

  function buyRaffleTicket(id) {
    // check expiration date first is past, if so snackbar error

    // then check if already voted, if so snackbar error

    // else submit the purchase and provide the raffle ticket information by updating ui
    console.log(id);
  }

  // Init function runs to get data
  useEffect(() => {
    getContractData()
  }, []) 

  return (
    <div className="App">
  
        {displayContract === false && (
          <div className="app-body">
            <div className="view-section-padding-top">
              <div>
                <h1>Loading Smart Contract...</h1>
                <p>
                  <label> Address: </label>
                  { address }
                </p>
              </div>

              <div className="view-button-section">
                <div className={classes.deployButton}>
                  <Button size="large" variant="contained" color="secondary" onClick={getContractData}>
                    Reload
                  </Button>
                </div>
              </div>      
            </div> 
          </div>
        )}

        {displayContract === true && (
          <div className="app-body">
            <div>
              <h1>View</h1>
              <h2>
                { contractName }
              </h2>
              <p>
              View and Interact with this Smart Contract Event.
              </p>
            </div>
            <div className="section-short-centered">
              <form>

                <TextField
                  id="contract-address"
                  label="Contract Address"
                  type="text"
                  value={contractAddress || ''}
                  className={classes.textField}
                  disabled
                />

                <TextField
                  id="contract-type"
                  label="Contract Type"
                  type="text"
                  value={contractType || ''}
                  className={classes.textField}
                  disabled
                />
                <br></br><br></br>

                <TextField
                  id="contract-author"
                  label="Contract Author"
                  type="text"
                  value={contractAuthor || ''}
                  className={classes.textField}
                  disabled
                />

                <TextField
                  id="contract-expiration-date"
                  label="Expiration Date"
                  type="text"
                  value={contractExpirationDate || ''}
                  className={classes.textField}
                  disabled
                />

              </form>
            </div>

            {contractType === 'Poll' && (
              <div>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="right">Name</StyledTableCell>
                        <StyledTableCell align="right">Total</StyledTableCell>
                        <StyledTableCell align="right">Vote</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {pollRows.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th" scope="row">
                            {row.id}
                          </StyledTableCell>
                          <StyledTableCell align="right">{row.name}</StyledTableCell>
                          <StyledTableCell align="right">{row.total}</StyledTableCell>
                          <StyledTableCell className="hover-cursor" align="right" onClick={() => vote(row.id)}>{row.icon}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>        
            )}  
            
            {contractType === 'Escrow' && (
              <div>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>Address</StyledTableCell>
                        <StyledTableCell align="right">Required</StyledTableCell>
                        <StyledTableCell align="right">Current</StyledTableCell>
                        <StyledTableCell align="right">Deposit</StyledTableCell>
                        <StyledTableCell align="right">Withdraw</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {escrowRows.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell className="addr-longtext-class" component="th" scope="row">
                            {row.address}
                          </StyledTableCell>
                          <StyledTableCell align="right">{row.required}</StyledTableCell>
                          <StyledTableCell align="right">{row.current}</StyledTableCell>
                          <StyledTableCell className="hover-cursor" align="right" onClick={() => makeEscrowDeposit(row.id, row.address, row.required)}>{row.depositIcon}</StyledTableCell>
                          <StyledTableCell className="hover-cursor" align="right" onClick={() => makeEscrowWithdrawl(row.id, row.address)}>{row.withdrawIcon}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>             
            )}                      

            {contractType === 'Raffle' && (
              <div>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell align="right">Address</StyledTableCell>
                        <StyledTableCell align="right">Ticket</StyledTableCell>
                        <StyledTableCell align="right">Purchase</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {raffleRows.map((row, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell component="th" scope="row">
                            {row.id}
                          </StyledTableCell>
                          <StyledTableCell className="addr-longtext-class" align="right">{row.address}</StyledTableCell>
                          <StyledTableCell align="right">{row.ticket}</StyledTableCell>
                          <StyledTableCell className="hover-cursor" align="right" onClick={() => buyRaffleTicket(row.id)}>{row.icon}</StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>       
            )}
            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              message={message}
              key={vertical + horizontal}
            />
          </div>          
        )}

    </div>
  );
};
