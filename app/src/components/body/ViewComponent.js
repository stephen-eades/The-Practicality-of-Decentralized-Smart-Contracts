import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import PollEvent from "./../../contracts/PollEvent.json";


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

  const [displayContract, setDisplayContract] = useState(false);

  const { address } = useParams();
  const [contractName, setContractName] = useState('');
  const [contractType, setContractType] = useState('');
  const [contractAuthor, setContractAuthor] = useState();
  const [contractExpirationDate, setContractExpirationDate] = useState();
  
  
  /**
   * 
   */
  function getContractData() {
    let contract = new drizzle.web3.eth.Contract(PollEvent.abi, address);

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

  /**
   * 
   */
  function getContractType(contract) {
    contract.methods.getContractType().call({from: drizzleState.accounts[0]})
    .then(function(result){
      setContractType(result);
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

  // Init function runs to get data
  useEffect(() => {
    getContractData();
  }) 

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
              <h1>{ contractName }</h1>
              <p>
                information about contract here as form, then section below for interaction
              </p>
            </div>
            <div className="section">
              Contract address: { address }
              <br></br>
              Event type: { contractType }
              <br></br>
              Event name: { contractName }
              <br></br>
              Author address: { contractAuthor }
              <br></br>
              Expiration Date: { contractExpirationDate }
              <br></br>
            </div>

            {contractType === 'poll' && (
              <div className="section">
                Content for {contractType} type contracts
              </div>        
            )}  
            
            {contractType === 'escrow' && (
              <div className="section">
                Content for {contractType} type contracts
              </div>        
            )}                      

            {contractType === 'raffle' && (
              <div className="section">
                Content for {contractType} type contracts
              </div>        
            )}

          </div>          
        )}

    </div>
  );
};
