import React from "react";
import { DrizzleContext } from "@drizzle/react-plugin";
import { Drizzle } from "@drizzle/store";
import drizzleOptions from "./drizzleOptions";
import BaseComponent from "./components/BaseComponent";
import "./App.css";


const drizzle = new Drizzle(drizzleOptions);


const App = () => {

  return (
    <DrizzleContext.Provider drizzle={drizzle}>
      <DrizzleContext.Consumer>
        {drizzleContext => {
          
          const { drizzle, drizzleState, initialized } = drizzleContext;

          if (!initialized) {
            return "Loading..."
          }

          return (
            <div className="app">
              <BaseComponent drizzle={drizzle} drizzleState={drizzleState} />
            </div>
          )
        }}
      </DrizzleContext.Consumer>
    </DrizzleContext.Provider>
  );
}

export default App;
