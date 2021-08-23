import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { setOrders } from "../../../Redux/Action";

class ViewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curMed: [],
      edit: false,
      editId: "",
      orderId: "",
      customerName: "",
      customerNo: "",
      product: "",
      quantityEachProd: "",
      totalAmount: "",
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
  handleRemove = (e) => {
    e.preventDefault();
    var tempList = this.props.orderList.filter(
      (item) => item.orderId !== e.target.id
    );
    this.props.setOrders(tempList);
  };
  handleDropdown = (e) => {
    this.setState({ curMed: e.target.value }, () => {
      this.handleChangeQuant(
        "totalAmount",
        parseInt(this.quantityEachProd.current.value)
      );
    });
  };
  handleEdit = (e) => {
    e.preventDefault();
    var tempList = this.props.orderList.filter(
      (item) => item.orderId === e.target.id
    );
    this.setState({ customerName: tempList[0].customerName });
    this.setState({ customerNo: tempList[0].customerNo });
    this.setState({ products: tempList[0].products });
    this.setState({ quantityEachProd: tempList[0].quantityEachProd });
    this.setState({ totalAmount: tempList[0].totalAmount });
    this.setState({ edit: true });
    this.setState({ editId: e.target.id });
  };
  handleChange = (propertyName, event) => {
    const state = this.state;
    state[propertyName] = event.target.value;
    this.setState(state, () => {
      if (propertyName === "quantityEachProd") {
        this.handleChangeQuant("totalAmount", event.target.value);
      }
    });
  };
  handleChangeQuant = (propertyName, val) => {
    const state = this.state;
    state[propertyName] = parseInt(this.state.curMed.split(",")[1]) * val;
    this.setState(state);
  };

  handleUpdate = (e) => {
    e.preventDefault();
    var orderId = "";
    var customerName = this.customerName.current.value;
    var customerNo = this.customerNo.current.value;
    var products = this.state.curMed.split(",")[0];
    var quantityEachProd = this.quantityEachProd.current.value;
    var totalAmount = this.totalAmount.current.value;
    var curOrder = {};
    var totalWithoutcurOrder = [];
    var ind = null;
    for (var i = 0; i < this.props.orderList.length; i++) {
      var item = this.props.orderList[i];
      if (item.orderId !== e.target.id) {
        totalWithoutcurOrder.push(item);
      } else {
        ind = i;
        orderId = item.orderId;
        totalWithoutcurOrder.push(null);
      }
    }
    curOrder.orderId = orderId;
    curOrder.customerName = customerName;
    curOrder.customerNo = customerNo;
    curOrder.products = products;
    curOrder.quantityEachProd = quantityEachProd;
    curOrder.totalAmount = totalAmount;
    totalWithoutcurOrder[ind] = curOrder;
    this.setState({ edit: false });
    this.props.setOrders(totalWithoutcurOrder);
  };

  render() {
    return (
      <>
        <h2>Order List</h2>
        {this.props.orderList.map(
          (
            {
              orderId,
              customerName,
              customerNo,
              products,
              quantityEachProd,
              totalAmount,
            },
            index
          ) => (
            <div className="orderList" key={orderId}>
              <hr />
              <div>
                <span>
                  <p>
                    <span>O-Id -</span> {orderId}
                  </p>
                  <p>
                    <span>Name -</span> {customerName}
                  </p>
                  <p>
                    <span>No -</span> {customerNo}
                  </p>
                  <p>
                    <span>Product -</span> {products}
                  </p>
                  <p>
                    <span>Quantity -</span> {quantityEachProd}
                  </p>
                  <p>
                    <span>Total -</span> {totalAmount}
                  </p>
                </span>
                {this.props.isAdmin && (
                  <span className="buttonsSpan">
                    <button
                      type="button"
                      onClick={this.handleRemove}
                      id={orderId}
                    >
                      Remove
                    </button>
                    <button
                      type="button"
                      onClick={this.handleEdit}
                      id={orderId}
                    >
                      Edit
                    </button>
                  </span>
                )}
              </div>
            </div>
          )
        )}
        {this.state.edit && (
          <div className="editEmpDetails">
            <form className="px-4 py-3">
              <div className="mb-3">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Customer Name"
                  value={this.state.customerName}
                  ref={this.customerName}
                  onChange={this.handleChange.bind(this, "customerName")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Customer No</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Customer No"
                  value={this.state.customerNo}
                  ref={this.customerNo}
                  onChange={this.handleChange.bind(this, "customerNo")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Product: &nbsp;</label>
                <select
                  name="medList"
                  id="medList"
                  onChange={this.handleDropdown}
                >
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
                  value={this.state.quantityEachProd}
                  ref={this.quantityEachProd}
                  onChange={this.handleChange.bind(this, "quantityEachProd")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Total Amount</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Total Amount"
                  value={this.state.totalAmount}
                  ref={this.totalAmount}
                  disabled
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleUpdate}
                id={this.state.editId}
              >
                Update
              </button>
            </form>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProp = (state) => ({
  medList: state.medList,
  orderList: state.orders,
  isAdmin: state.isAdmin,
});

const mapDispatchToProp = (dispatch) => ({
  setOrders: (payload) => dispatch(setOrders(payload)),
});

export default connect(mapStateToProp, mapDispatchToProp)(ViewOrder);
