import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import crepe from "./../../crepe.svg";


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleHomeMenuClick = () => {
    // navigate
    handleClose();
  };

  const handleAboutMenuClick = () => {
    // navigate
    handleClose();
  };

  const handleCreateMenuClick = () => {
    // navigate
    handleClose();
  };

  const handleBrowseMenuClick = () => {
    // navigate
    handleClose();
  };

  const handleSearchMenuClick = () => {
    // navigate
    handleClose();
  };

  return (
    <div className="App">
      <div className="app-footer">
        <div className="footer-sourcemap-wrapper">
          <img src={crepe} alt="crepe-logo" className="crepe-footer-logo-class"/> 

          <div className="footer-hyperlink-wrapper">
            <div className="footer-col-one">
              <ul>
                <li>
                  <a href="www.google.com">Home</a> 
                </li>
                <li>
                  <a href="www.google.com">About</a> 
                </li>
                <li>
                  <a href="www.google.com">Search</a> 
                </li>
              </ul>
            </div>

            <div className="footer-col-two">
              <ul>
                <li>
                  <a href="www.google.com">Create</a> 
                </li>
                <li>
                  <a href="www.google.com">Browse</a> 
                </li>
                <li>
                  <a href="www.google.com">Search</a> 
                </li>
              </ul>
            </div>
          </div> 
        </div>

        <div className="footer-subtext-class">
          <p>Created by Stephen Eades 2021 - IT8010 Capstone Project - Instructed by Dr. Murat Ozer</p>
          <div className="logo-attribution-text-class">Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a>
            from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>
           </div>
        </div>
        
      </div>
    </div>
  );
};
