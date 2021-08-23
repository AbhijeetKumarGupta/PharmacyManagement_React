import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setIsAdmin, setIsSale } from "../../Redux/Action";

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = (e) => {
    this.props.setIsAdmin(false);
    this.props.setIsSale(false);
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light topbar">
        <div className="container-fluid">
          <h1 className="navbar-brand appName">Pharmacy Management System</h1>
          <div className="collapse navbar-collapse menu" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active"
                  aria-current="page"
                  onClick={this.handleLogout}
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const mapDispatchToProp = (dispatch) => ({
  setIsAdmin: (payload) => dispatch(setIsAdmin(payload)),
  setIsSale: (payload) => dispatch(setIsSale(payload)),
});

export default connect(null, mapDispatchToProp)(Topbar);
