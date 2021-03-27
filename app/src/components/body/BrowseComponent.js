import React from "react";
import { useState } from "react";
import { newContextComponents } from "@drizzle/react-components";
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


const { AccountData, ContractData, ContractForm } = newContextComponents;

// for radio component
const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Stephens Poll', '0x864...fF957', '0x864...fF957', '3/29/2021', <SearchIcon />),
  createData('Presidential Election', '0x80a...4A82C', '0x80a...4A82C', '4/1/2021', <SearchIcon />),
  createData('Class President', '0x56a...cE769', '0x864...fF957', '5/22/2021', <SearchIcon />),
  createData('Best Singer', '0xb0f...E916F', '0x864...fF957', '7/15/2021', <SearchIcon />),
  createData('Favorite Ice Cream Flavor', '0x64c...b370b', '0x864...fF957', '1/4/2022', <SearchIcon />),
];

// Add data from contracts, use proxy for each event type contract
var contract = [];

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const classes = useStyles();

  const eventManagerContract = drizzle.contracts.EventManager;

  const [contractType, setContractType] = useState("poll");

  const resTest = [];

  const onRadioInputChange = (event) => {
    if (event.target.value === "poll") {
      setContractType(event.target.value);
    } else if (event.target.value === "escrow") {
      setContractType(event.target.value);
    } else if (event.target.value === "wager") {
      setContractType(event.target.value);
    } else {
      console.log("Error setting contract type.")
    }
  }

  function getPollAddressContract() {
    resTest = eventManagerContract.methods.getEscrowEventContractList.cacheCall();
  }

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
                value="wager"
                name="wager_event"
                className="radio-input-button-class"
                checked={contractType === "wager"}
                onChange={onRadioInputChange}
              />
              Wager
            </span>
          </div>
          <br></br>

          {contractType === "poll" && (
            <div>
              <h2>Poll Event Smart Contracts</h2>
              {/* <strong>Total Events: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getPollEventContractCount"
              />
              <br></br> */}

              {/* TABLE HERE */}
              <TableContainer component={Paper} onLoad={getPollAddressContract}>
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
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
    
              {/* <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getPollEventContractList"
              />
              <br></br> */}
            </div>
          )}

          {contractType === "escrow" && (
            <div>
              <h2>Escrow Event Smart Contracts</h2>
              {/* <strong>Total Events: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getEscrowEventContractCount"
              />
              <br></br> */}

              {/* TABLE HERE */}
              <TableContainer component={Paper} onLoad={getPollAddressContract}>
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
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getEscrowEventContractList"
              />
              <br></br> */}
            </div>
          )}

          {contractType === "wager" && (
            <div>
              <h2>Wager Event Smart Contracts</h2>
              {/* <strong>Total Events: </strong>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getWagerEventContractCount"
              />
              <br></br> */}

              {/* TABLE HERE */}
              <TableContainer component={Paper} onLoad={getPollAddressContract}>
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
                    {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                        <StyledTableCell component="th" scope="row">
                          {row.name}
                        </StyledTableCell>
                        <StyledTableCell align="right">{row.calories}</StyledTableCell>
                        <StyledTableCell align="right">{row.fat}</StyledTableCell>
                        <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                        <StyledTableCell align="right">{row.protein}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="EventManager"
                method="getWagerEventContractList"
              />
              <br></br> */}
            </div>
          )}


        </div>
      </div>
    </div>
  );
};
