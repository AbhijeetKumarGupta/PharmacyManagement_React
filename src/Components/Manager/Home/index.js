import React, { Component } from "react";
import { emplList, medicineList, orderList } from "../../../Data";
import AddMedicine from "./AddMedicine";
import ViewMedicine from "./ViewMedicine";
import AddEmp from "./AddEmp";
import ViewEmp from "./ViewEmp";
import CreateOrder from "../../Order/CreateOrder";
import ViewOrder from "../../Order/ViewOrder";
import { connect } from "react-redux";
import { setEmpList, setMedList, setOrders } from "../../../Redux/Action";
import { Redirect } from "react-router-dom";

class AdminHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    };
  }

  componentDidMount() {
    this.props.setEmpList(emplList);
    this.props.setMedList(medicineList);
    this.props.setOrders(orderList);
  }

  render() {
    return this.props.isAdmin ? (
      <div className="mainHomeAdmin">
        <div className="leftDiv">
          {/* Add Medicine*/}
          <button
            className={
              this.state.selected === 0
                ? "optionButtons active"
                : "optionButtons"
            }
            type="button"
            onClick={() => {
              this.setState({ selected: 0 });
            }}
          >
            Add Medicine
          </button>
          {/* View Medicine*/}
          <button
            className={
              this.state.selected === 1
                ? "optionButtons active"
                : "optionButtons"
            }
            type="button"
            onClick={() => {
              this.setState({ selected: 1 });
            }}
          >
            View Medicine
          </button>
          {/* Add Emp*/}
          <button
            className={
              this.state.selected === 2
                ? "optionButtons active"
                : "optionButtons"
            }
            type="button"
            onClick={() => {
              this.setState({ selected: 2 });
            }}
          >
            Add Employee
          </button>
          {/* View Emp*/}
          <button
            className={
              this.state.selected === 3
                ? "optionButtons active"
                : "optionButtons"
            }
            type="button"
            onClick={() => {
              this.setState({ selected: 3 });
            }}
          >
            View Employees
          </button>
          {/* Create Order*/}
          <button
            className={
              this.state.selected === 4
                ? "optionButtons active"
                : "optionButtons"
            }
            type="button"
            onClick={() => {
              this.setState({ selected: 4 });
            }}
          >
            Create Order
          </button>
          {/* View Order*/}
          <button
            className={
              this.state.selected === 5
                ? "optionButtons active"
                : "optionButtons"
            }
            type="button"
            onClick={() => {
              this.setState({ selected: 5 });
            }}
          >
            View Order
          </button>
        </div>
        <div className="rightDiv">
          {this.state.selected === 0 && <AddMedicine />}
          {this.state.selected === 1 && <ViewMedicine />}
          {this.state.selected === 2 && <AddEmp />}
          {this.state.selected === 3 && <ViewEmp />}
          {this.state.selected === 4 && <CreateOrder />}
          {this.state.selected === 5 && <ViewOrder />}
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProp = (state) => ({
  isAdmin: state.isAdmin,
});

const mapDispatchToProp = (dispatch) => ({
  setEmpList: (payload) => dispatch(setEmpList(payload)),
  setMedList: (payload) => dispatch(setMedList(payload)),
  setOrders: (payload) => dispatch(setOrders(payload)),
});

export default connect(mapStateToProp, mapDispatchToProp)(AdminHome);
