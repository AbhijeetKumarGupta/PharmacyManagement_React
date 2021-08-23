import React, { Component, createRef } from "react";
import { adminCreds, salesCreds } from "../../Data";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  setIsAdmin,
  setIsSale,
  setAdminCred,
  setSalesCred,
} from "../../Redux/Action";

class Login extends Component {
  constructor(props) {
    super(props);
    this.id = createRef();
    this.pass = createRef();
  }

  componentDidMount() {
    this.props.setAdminCred(adminCreds);
    this.props.setSalesCred(salesCreds);
  }

  handleLogin = (id, pass) => {
    console.log("Enter");
    var adminCred = this.props.adminCred;
    var empCred = this.props.salesCred;
    for (var i = 0; i < adminCred.length; i++) {
      if (adminCred[i].id === id && adminCred[i].pass === pass) {
        this.props.setIsAdmin(true);
        break;
      }
    }

    if (this.props.isAdmin === false) {
      for (var i = 0; i < empCred.length; i++) {
        if (empCred[i].id === id && empCred[i].pass === pass) {
          this.props.setIsSale(true);
          break;
        }
      }
    }
  };
  handleSubmit = (e) => {
    this.handleLogin(this.id.current.value, this.pass.current.value);
  };
  render() {
    return (
      <>
        <form className="px-4 py-3 mainLogin">
          <h2>Login</h2>
          <hr />
          <div className="mb-3">
            <label className="form-label">Id</label>
            <input
              type="text"
              className="form-control"
              placeholder="User Id"
              ref={this.id}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              ref={this.pass}
            />
          </div>
          <Link
            className="btn btn-primary"
            to="/home/"
            onClick={this.handleSubmit}
          >
            Login
          </Link>
        </form>
      </>
    );
  }
}
const mapStateToProp = (state) => ({
  isAdmin: state.isAdmin,
  isSale: state.isSale,
  adminCred: state.adminCred,
  salesCred: state.salesCred,
});

const mapDispatchToProp = (dispatch) => ({
  setIsAdmin: (payload) => dispatch(setIsAdmin(payload)),
  setIsSale: (payload) => dispatch(setIsSale(payload)),
  setAdminCred: (payload) => dispatch(setAdminCred(payload)),
  setSalesCred: (payload) => dispatch(setSalesCred(payload)),
});

export default connect(mapStateToProp, mapDispatchToProp)(Login);
