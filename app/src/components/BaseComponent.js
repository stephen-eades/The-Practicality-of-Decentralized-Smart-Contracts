import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import ContextRoute from "./routing/ContextRoute";
import NavbarComponent from "./header/NavbarComponent";
import AboutComponent from "./body/AboutComponent";
import BrowseComponent from "./body/BrowseComponent";
import CreateComponent from "./body/CreateComponent";
import HelpComponent from "./body/HelpComponent";
import HomeComponent from "./body/HomeComponent";
import ViewComponent from "./body/ViewComponent";
import FooterComponent from "./footer/FooterComponent";
import { BrowserRouter, Route, Switch } from 'react-router-dom';


export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props

  
  return (
    <DrizzleContext.Provider drizzle={drizzle}>

      <div className="App">
        <BrowserRouter>
          <NavbarComponent drizzle={drizzle} drizzleState={drizzleState} />
            <Switch>
              <ContextRoute exact path="/" component={HomeComponent} context={drizzle} state={drizzleState} />
              <ContextRoute exact path="/about" component={AboutComponent} context={drizzle} state={drizzleState} />
              <ContextRoute exact path="/create" component={CreateComponent} context={drizzle} state={drizzleState} />
              <ContextRoute exact path="/help" component={HelpComponent} context={drizzle} state={drizzleState} />
              <ContextRoute exact path="/browse" component={BrowseComponent} context={drizzle} state={drizzleState} />
              <ContextRoute exact path="/view" component={ViewComponent} context={drizzle} state={drizzleState} />
            </Switch>
          <FooterComponent drizzle={drizzle} drizzleState={drizzleState} />
        </BrowserRouter>
      </div>
            
    </DrizzleContext.Provider>
  );
};
