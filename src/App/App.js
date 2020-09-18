import React, { Component } from "react";
import styles from "./App.module.scss";
import { connect } from "react-redux";
import Dashboard from "../components/Dashboard";
import RetailerView from "../views/RetailerView";
import UserView from "../views/UserView";
import RetailerProfileView from '../views/RetailerProfileView'
import { Switch, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <div className={styles.appMobileContainer}>
          <Switch>
            <Route
              path='/userview'
              component={UserView} />
            <Route
              path='/retailerview'
              component={RetailerView} />
            <Route
              path='/retailerprofile'
              component={RetailerProfileView} />
          </Switch>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    retailers: state.retailers,
  };
};

App = connect(mapStateToProps, null)(App);

export default App;
