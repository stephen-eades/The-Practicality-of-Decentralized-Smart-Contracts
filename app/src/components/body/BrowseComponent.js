import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import PollEvent from "./../../contracts/PollEvent.json";
import EscrowEvent from "./../../contracts/EscrowEvent.json";
import LotteryEvent from "./../../contracts/LotteryEvent.json";
import { accountIndex } from './../../test/_test.js'


// for radio component
const useStyles = makeStyles((theme) => ({
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

  const classes = useStyles();
  const history = useHistory();

  const eventManagerContract = drizzle.contracts.EventManager;

  const [rows, setRows] = useState([]);
  const [contractType, setContractType] = useState("poll");

  const onRadioInputChange = (event) => {
    setRows([]);
    if (event.target.value === "poll") {
      setContractType(event.target.value);
      getPollAddressContractList();
    } else if (event.target.value === "escrow") {
      setContractType(event.target.value);
      getEscrowAddressContractList();
    } else if (event.target.value === "lottery") {
      setContractType(event.target.value);
      getLotteryAddressContractList();
    } else {
      console.log("Error setting contract type.")
    }
  }

  async function createTableData(contractList) {
    let tempRows = [];
    for (let contract of contractList) {
      const data = await createContractData(contract, <SearchIcon />);
      tempRows.push(data);
    }
    setRows(tempRows);
  }

  async function createContractData(contract, icon) {
    var name = await getContractName(contract);
    var address = contract.options.address;
    var author = await getContractAuthor(contract);
    var expiration = await getContractExpirationDate(contract);

    expiration = new Date(expiration * 1000).toDateString();
    
    return { name, address, author, expiration, icon };
  }

  /**
   * 
   */
  function getContractName(contract) {
    return new Promise (function (resolve, reject) {
      contract.methods.getContractName().call({from: drizzleState.accounts[accountIndex]}, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    })
  }

  /**
   * 
   */
  function getContractAuthor(contract) {
    return new Promise (function (resolve, reject) {
      contract.methods.getContractAuthor().call({from: drizzleState.accounts[accountIndex]}, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    })
  }

  /**
   * 
   */
  function getContractExpirationDate(contract) {
    return new Promise (function (resolve, reject) {
      contract.methods.getContractExpirationDate().call({from: drizzleState.accounts[accountIndex]}, function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      })
    })
  }

  function viewContract(address, type) {
    history.push(`/view/${type}/${address}`)
  }

  function getPollAddressContractList() {
    let tempContractList = [];
    eventManagerContract.methods.getPollEventContractList().call({from: drizzleState.accounts[accountIndex]})
      .then(function(result){
        for (let i=0; i<result.length; i++) {
          tempContractList.push(createPollContractInstance(result[i]));
        }
        createTableData(tempContractList);
      });
  }

  function createPollContractInstance(address) {
    return new drizzle.web3.eth.Contract(PollEvent.abi, address);
  }

  function getEscrowAddressContractList() {
    let tempContractList = [];
    eventManagerContract.methods.getEscrowEventContractList().call({from: drizzleState.accounts[accountIndex]})
      .then(function(result){
        for (let i=0; i<result.length; i++) {
          tempContractList.push(createEscrowContractInstance(result[i]));
        }
        createTableData(tempContractList);
      });
  }

  function createEscrowContractInstance(address) {
    return new drizzle.web3.eth.Contract(EscrowEvent.abi, address);
  }

  function getLotteryAddressContractList() {
    let tempContractList = [];
    eventManagerContract.methods.getLotteryEventContractList().call({from: drizzleState.accounts[accountIndex]})
      .then(function(result){
        for (let i=0; i<result.length; i++) {
          tempContractList.push(createLotteryContractInstance(result[i]));
        }
        createTableData(tempContractList);
      });
  }

  function createLotteryContractInstance(address) {
    return new drizzle.web3.eth.Contract(LotteryEvent.abi, address);
  }

  // Init function runs to get data
  useEffect(() => {
    getPollAddressContractList();
  }, []) 

  return (
    <div className="App">
      <div className="app-body">
        <div>
          <h1>Browse</h1>
          <h2>View existing Smart Contracts</h2>
          <p>
            Find available smart contract events to interact with. Select the event type below to view events. 
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
          <br></br>

          {contractType === "poll" && (
            <div>
              <h2>Poll Event Smart Contracts</h2>
              
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="right">Address</StyledTableCell>
                      <StyledTableCell align="right">Author</StyledTableCell>
                      <StyledTableCell align="right">Expiration</StyledTableCell>
                      <StyledTableCell align="right">View</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell className="addr-longtext-class" align="right">{row.address}</StyledTableCell>
                        <StyledTableCell className="addr-longtext-class" align="right">{row.author}</StyledTableCell>
                        <StyledTableCell align="right">{row.expiration}</StyledTableCell>
                        <StyledTableCell className="hover-cursor" align="right" onClick={() => viewContract(row.address, "poll")}>{row.icon}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </div>
          )}

          {contractType === "escrow" && (
            <div>
              <h2>Escrow Event Smart Contracts</h2>

              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="right">Address</StyledTableCell>
                      <StyledTableCell align="right">Author</StyledTableCell>
                      <StyledTableCell align="right">Expiration</StyledTableCell>
                      <StyledTableCell align="right">View</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell className="addr-longtext-class" align="right">{row.address}</StyledTableCell>
                        <StyledTableCell className="addr-longtext-class" align="right">{row.author}</StyledTableCell>
                        <StyledTableCell align="right">{row.expiration}</StyledTableCell>
                        <StyledTableCell className="hover-cursor" align="right" onClick={() => viewContract(row.address, "escrow")}>{row.icon}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </div>
          )}

          {contractType === "lottery" && (
            <div>
              <h2>Lottery Event Smart Contracts</h2>

              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell align="right">Address</StyledTableCell>
                      <StyledTableCell align="right">Author</StyledTableCell>
                      <StyledTableCell align="right">Expiration</StyledTableCell>
                      <StyledTableCell align="right">View</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell className="addr-longtext-class" align="right">{row.address}</StyledTableCell>
                        <StyledTableCell className="addr-longtext-class" align="right">{row.author}</StyledTableCell>
                        <StyledTableCell align="right">{row.expiration}</StyledTableCell>
                        <StyledTableCell className="hover-cursor" align="right" onClick={() => viewContract(row.address, "lottery")}>{row.icon}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

            </div>
          )}


        </div>
      </div>
    </div>
  );
};
