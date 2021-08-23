import React, { Component } from "react";
import CreateOrder from "../../Order/CreateOrder";
import ViewOrder from "../../Order/ViewOrder";
import { orderList, medicineList } from "../../../Data";
import { connect } from "react-redux";
import { setOrders, setMedList } from "../../../Redux/Action";
import { Redirect } from "react-router-dom";

class EmpHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
    };
  }
  componentDidMount() {
    this.props.setOrders(orderList);
    this.props.setMedList(medicineList);
  }
  render() {
    return this.props.isSale ? (
      <div className="mainHomeEmp">
        <div className="leftDiv">
          {/* Create Order*/}
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
            Create Order
          </button>
          {/* View Order*/}
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
            View Order
          </button>
        </div>
        <div className="rightDiv">
          {this.state.selected === 0 && <CreateOrder />}
          {this.state.selected === 1 && <ViewOrder />}
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
  }
}

const mapStateToProp = (state) => ({
  isSale: state.isSale,
});

const mapDispatchToProp = (dispatch) => ({
  setOrders: (payload) => dispatch(setOrders(payload)),
  setMedList: (payload) => dispatch(setMedList(payload)),
});

export default connect(mapStateToProp, mapDispatchToProp)(EmpHome);
