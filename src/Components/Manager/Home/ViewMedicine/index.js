import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { setMedList } from "../../../../Redux/Action";

class ViewMedicine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editId: "",
      name: "",
      manufacturerName: "",
      price: "",
      stock: "",
      discount: "",
    };
    this.name = createRef();
    this.manufacturerName = createRef();
    this.price = createRef();
    this.stock = createRef();
    this.discount = createRef();
  }
  handleChange = (propertyName, event) => {
    const state = this.state;
    state[propertyName] = event.target.value;
    this.setState(state);
  };
  handleRemove = (e) => {
    var tempList = this.props.medList.filter(
      (item) => item.name + item.manufacturerName + item.price !== e.target.id
    );
    this.props.setMedList(tempList);
  };
  handleEdit = (e) => {
    var tempList = this.props.medList.filter(
      (item) => item.name + item.manufacturerName + item.price === e.target.id
    );
    this.setState({ name: tempList[0].name });
    this.setState({ manufacturerName: tempList[0].manufacturerName });
    this.setState({ price: tempList[0].price });
    this.setState({ stock: tempList[0].stock });
    this.setState({ discount: tempList[0].discount });
    this.setState({ edit: true });
    this.setState({ editId: e.target.id });
  };

  handleUpdate = (e) => {
    e.preventDefault();
    var name = this.name.current.value;
    var manufacturerName = this.manufacturerName.current.value;
    var price = this.price.current.value;
    var stock = this.stock.current.value;
    var discount = this.discount.current.value;
    var curMed = {};
    var totalWithoutcurMed = [];
    var ind = -1;
    for (var i = 0; i < this.props.medList.length; i++) {
      var item = this.props.medList[i];
      if (item.name + item.manufacturerName + item.price !== e.target.id) {
        totalWithoutcurMed.push(item);
      } else {
        ind = i;
        totalWithoutcurMed.push(null);
      }
    }
    curMed.name = name;
    curMed.manufacturerName = manufacturerName;
    curMed.price = price;
    curMed.stock = stock;
    curMed.discount = discount;
    totalWithoutcurMed[ind] = curMed;
    this.setState({ edit: false });
    this.props.setMedList(totalWithoutcurMed);
  };

  render() {
    return (
      <>
        <h2>Medicine List</h2>
        {this.props.medList.map(
          ({ name, manufacturerName, price, stock, discount }, index) => (
            <div className="empList" key={index}>
              <hr />
              <div>
                <span>
                  <p>
                    <span>Name -</span> {name}
                  </p>
                  <p>
                    <span>Manufaturer Name -</span> {manufacturerName}
                  </p>
                  <p>
                    <span>Price -</span> {price}
                  </p>
                  <p>
                    <span>Stock -</span> {stock}
                  </p>
                  <p>
                    <span>Discount -</span> {discount}
                  </p>
                </span>
                <span className="buttonsSpan">
                  <button
                    type="button"
                    onClick={this.handleRemove}
                    id={name + manufacturerName + price}
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={this.handleEdit}
                    id={name + manufacturerName + price}
                  >
                    Edit
                  </button>
                </span>
              </div>
            </div>
          )
        )}
        {this.state.edit && (
          <div className="editMedDetails">
            <form className="px-4 py-3">
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Medicine Name"
                  ref={this.name}
                  value={this.state.name}
                  onChange={this.handleChange.bind(this, "name")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Manufacturer Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Manufaturer"
                  ref={this.manufacturerName}
                  value={this.state.manufacturerName}
                  onChange={this.handleChange.bind(this, "manufacturerName")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Price"
                  ref={this.price}
                  value={this.state.price}
                  onChange={this.handleChange.bind(this, "price")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Stock</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Stock"
                  ref={this.stock}
                  value={this.state.stock}
                  onChange={this.handleChange.bind(this, "stock")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Discount</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Discount"
                  ref={this.discount}
                  value={this.state.discount}
                  onChange={this.handleChange.bind(this, "discount")}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleUpdate}
                id={this.state.editId}
              >
                Update Med
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
});

const mapDispatchToProp = (dispatch) => ({
  setMedList: (payload) => dispatch(setMedList(payload)),
});

export default connect(mapStateToProp, mapDispatchToProp)(ViewMedicine);
