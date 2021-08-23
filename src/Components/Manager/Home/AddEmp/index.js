import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { updateEmpList } from "../../../../Redux/Action";

class AddEmp extends Component {
  constructor(props) {
    super(props);
    this.fName = createRef();
    this.lName = createRef();
    this.dob = createRef();
    this.gender = createRef();
    this.exp = createRef();
    this.pass = createRef();
  }

  handleAdd = (e) => {
    e.preventDefault();
    var fName = this.fName.current.value;
    var lName = this.lName.current.value;
    var dob = this.dob.current.value;
    var gender = this.gender.current.value;
    var exp = this.exp.current.value;
    var pass = this.pass.current.value;
    var oldList = this.props.empList;
    var curEmp = {};
    curEmp.firstName = fName;
    curEmp.lastName = lName;
    curEmp.dob = dob;
    curEmp.gender = gender;
    curEmp.experience = exp;
    curEmp.password = pass;
    oldList.push(curEmp);
    this.props.updateEmpList(oldList);
  };

  render() {
    return (
      <form className="px-4 py-3">
        <div className="mb-3">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            ref={this.fName}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last Name"
            ref={this.lName}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">DOB</label>
          <input
            type="text"
            className="form-control"
            placeholder="DOB"
            ref={this.dob}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <input
            type="text"
            className="form-control"
            placeholder="Gender"
            ref={this.gender}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Experience Year</label>
          <input
            type="text"
            className="form-control"
            placeholder="Experience Year"
            ref={this.exp}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="text"
            className="form-control"
            placeholder="Password"
            ref={this.pass}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.handleAdd}
        >
          Add Emp
        </button>
      </form>
    );
  }
}

const mapStateToProp = (state) => ({
  empList: state.empList,
});

const mapDispatchToProp = (dispatch) => ({
  updateEmpList: (payload) => dispatch(updateEmpList(payload)),
});

export default connect(mapStateToProp, mapDispatchToProp)(AddEmp);
