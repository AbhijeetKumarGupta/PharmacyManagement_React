import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./Components/Login";
import AdminHome from "./Components/Manager/Home";
import EmpHome from "./Components/Employee/Home";
import Topbar from "./Components/Topbar";
import Footer from "./Components/Footer";
import { connect } from "react-redux";
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Topbar />
        <Switch>
          <Route path="/" exact component={Login} />
          <Route
            path="/home/"
            component={
              this.props.isAdmin
                ? AdminHome
                : this.props.isSale
                ? EmpHome
                : Login
            }
          />
          <Route
            component={() => (
              <h1 style={{ marginTop: "50px" }}>404 Not Found</h1>
            )}
          />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

const mapStateToProp = (state) => ({
  isAdmin: state.isAdmin,
  isSale: state.isSale,
});

export default connect(mapStateToProp, null)(App);
