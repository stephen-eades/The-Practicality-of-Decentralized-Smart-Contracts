import React from "react";
import { useState } from "react";
import { newContextComponents } from "@drizzle/react-components";
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const { AccountData, ContractData, ContractForm } = newContextComponents;

// for Button component
const useStyles = makeStyles((theme) => ({
  viewButton: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const classes = useStyles(); // for Button component

  const eventManagerContract = drizzle.contracts.EventManager;

  const [displayContract, setDisplayContract] = useState(false);

  const { address } = useParams();
  const [contractName, setContractName] = useState('');
  const [contractAuthor, setContractAuthor] = useState();
  const [contractExpirationDate, setContractExpirationDate] = useState();
  
  
  /**
   * 
   */
  function getContractData() {
    // Get the contract information here
    setDisplayContract(true);
  }

  return (
    <div className="App">
  
        {displayContract === false && (
          <div className="app-body">
            <div className="view-section-padding-top">
              <div>
                <h1>Smart Contract Successfully Deployed</h1>
                <p>
                  <label> Address: </label>
                  { address }
                </p>
              </div>

              <div className="view-button-section">
                <div className={classes.deployButton}>
                  <Button size="large" variant="contained" color="secondary" onClick={getContractData}>
                    View
                  </Button>
                </div>
              </div>      
            </div> 
          </div>
        )}

        {displayContract === true && (
          <div className="app-body">
            <div>
              <h1>{ contractName }</h1>
              <p>
                information about contract here as form, then section below for interaction
              </p>
            </div>
            <div className="section">
              { address }
            </div>
          </div>          
        )}

    </div>
  );
};
