import React from "react";
import {
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";
import { Container } from 'react-bootstrap';
import AddScanResult from './screens/addScanResult';
import ScanResultList from './screens/scanResultList'
import Findings from './screens/findings'
import NavBar from './components/navbar';
import { ToastContainer } from 'react-toastify';
import PublicRoute from './components/publicRoute'

const Routes = (props) => {
  return (
    <Router>
      <NavBar />
      <Container>
        <Switch>
          <PublicRoute path="/" component={AddScanResult} exact />
          <PublicRoute path="/scan_results" component={ScanResultList} exact />
          <PublicRoute path="/scan_results/:id/findings" component={Findings} exact />
        </Switch>
        <ToastContainer />
      </Container>
    </Router>
  );
}

export default Routes;