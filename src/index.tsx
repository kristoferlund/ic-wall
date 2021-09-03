import { ICContext, useICContextValues } from "@/ic/context";
import { ExternalProvider, Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserWall from "./pages/UserWall";
import Wall from "./pages/Wall";
import "./styles/globals.css";

function getLibrary(provider: ExternalProvider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const ICCtx = (props: any) => {
  const icContextValues = useICContextValues();
  return (
    <ICContext.Provider value={icContextValues}>
      {props.children}
    </ICContext.Provider>
  );
};

ReactDOM.render(
  <Web3ReactProvider getLibrary={getLibrary}>
    <ICCtx>
      <Router>
        <Switch>
          <Route exact path="/">
            <Wall />
          </Route>
          <Route path="/:urlEthAccount">
            <UserWall />
          </Route>
        </Switch>
      </Router>
    </ICCtx>
  </Web3ReactProvider>,

  document.getElementById("root")
);
