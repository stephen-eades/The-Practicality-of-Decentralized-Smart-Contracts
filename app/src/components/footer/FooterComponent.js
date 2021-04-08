import React from "react";
import crepe from "./../../crepe.svg";


export default () => {

  return (
    <div className="App">
      <div className="app-footer">
        <div className="footer-sourcemap-wrapper">
          <img src={crepe} alt="crepe-logo" className="crepe-footer-logo-class"/> 

          <div className="footer-hyperlink-wrapper">
            <div className="footer-col-one">
              <ul>
                <li>
                  <a href="/">Home</a> 
                </li>
                <li>
                  <a href="/about">About</a> 
                </li>
                <li>
                  <a href="/help">Help</a> 
                </li>
              </ul>
            </div>

            <div className="footer-col-two">
              <ul>
                <li>
                  <a href="/create">Create</a> 
                </li>
                <li>
                  <a href="/browse">Browse</a> 
                </li>
                <li>
                  <a href="/search">Search</a> 
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
