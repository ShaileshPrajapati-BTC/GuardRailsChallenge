import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import AddScanResult from './screens/addScanResult';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <AddScanResult />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routes;