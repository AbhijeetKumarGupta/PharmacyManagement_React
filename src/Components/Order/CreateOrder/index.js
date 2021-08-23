import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { setOrders } from "../../../Redux/Action";

class CreateOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curMed: [],
    };
    this.customerName = createRef();
    this.customerNo = createRef();
    this.quantityEachProd = createRef();
    this.totalAmount = createRef();
  }
  componentDidMount() {
    this.setState({
      curMed: [
        this.props.medList[0].name,
        this.props.medList[0].price,
      ].toString(),
    });
  }
  handleDropdown = (e) => {
    this.setState({ curMed: e.target.value });
  };
  handleChange = (e) => {
    this.totalAmount.current.value =
      parseInt(this.state.curMed.split(",")[1]) * e.target.value;
  };
  handleOrder = (e) => {
    e.preventDefault();
    var orderList = this.props.orders;
    var newOrder = {};
    var orderId = new Date().valueOf();
    var customerName = this.customerName.current.value;
    var customerNo = this.customerNo.current.value;
    var products = this.state.curMed.split(",")[0];
    var quantityEachProd = this.quantityEachProd.current.value;
    var totalAmount = this.totalAmount.current.value;
    newOrder.orderId = orderId.toString();
    newOrder.customerName = customerName;
    newOrder.customerNo = customerNo;
    newOrder.products = products;
    newOrder.quantityEachProd = quantityEachProd;
    newOrder.totalAmount = totalAmount;
    orderList.push(newOrder);
    this.props.setOrders(orderList);
  };
  render() {
    return (
      <form className="px-4 py-3">
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Customer Name"
            ref={this.customerName}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Customer No</label>
          <input
            type="text"
            className="form-control"
            placeholder="Customer No"
            ref={this.customerNo}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Product: &nbsp;</label>
          <select name="medList" id="medList" onChange={this.handleDropdown}>
            {this.props.medList.map((item) => (
              <option value={[item.name, item.price]}>
                Name:{item.name}, Price:{item.price}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            type="text"
            className="form-control"
            placeholder="Quantity"
            ref={this.quantityEachProd}
            onChange={this.handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Total Amount</label>
          <input
            type="text"
            className="form-control"
            placeholder="Total Amount"
            ref={this.totalAmount}
            disabled
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handleOrder}
        >
          Order
        </button>
      </form>
    );
  }
}

const mapStateToProp = (state) => ({
  medList: state.medList,
  orders: state.orders,
});

const mapDispatchToProp = (dispatch) => ({
  setOrders: (payload) => dispatch(setOrders(payload)),
});

export default connect(mapStateToProp, mapDispatchToProp)(CreateOrder);
