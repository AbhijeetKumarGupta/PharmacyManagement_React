import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { setMedList } from "../../../../Redux/Action";

class AddMedicine extends Component {
  constructor(props) {
    super(props);
    this.name = createRef();
    this.manufacturerName = createRef();
    this.price = createRef();
    this.stock = createRef();
    this.discount = createRef();
  }
  handleAdd = (e) => {
    e.preventDefault();
    var name = this.name.current.value;
    var manufacturerName = this.manufacturerName.current.value;
    var price = this.price.current.value;
    var stock = this.stock.current.value;
    var discount = this.discount.current.value;
    var curMed = {};
    var totalMed = this.props.medList;
    curMed.name = name;
    curMed.manufacturerName = manufacturerName;
    curMed.price = price;
    curMed.stock = stock;
    curMed.discount = discount;
    totalMed.push(curMed);
    this.props.setMedList(totalMed);
  };
  render() {
    return (
      <form className="px-4 py-3">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Medicine Name"
            ref={this.name}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Manufacturer Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Manufaturer"
            ref={this.manufacturerName}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control"
            placeholder="Price"
            ref={this.price}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Stock</label>
          <input
            type="text"
            className="form-control"
            placeholder="Stock"
            ref={this.stock}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Discount</label>
          <input
            type="text"
            className="form-control"
            placeholder="Discount"
            ref={this.discount}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handleAdd}
        >
          Add Med
        </button>
      </form>
    );
  }
}

const mapStateToProp = (state) => ({
  medList: state.medList,
});

const mapDispatchToProp = (dispatch) => ({
  setMedList: (payload) => dispatch(setMedList(payload)),
});

export default connect(mapStateToProp, mapDispatchToProp)(AddMedicine);
