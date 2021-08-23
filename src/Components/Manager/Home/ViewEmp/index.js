import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { updateEmpList } from "../../../../Redux/Action";

class ViewEmp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      editId: "",
      fName: "",
      lName: "",
      dob: "",
      gender: "",
      exp: "",
      pass: "",
    };
    this.fName = createRef();
    this.lName = createRef();
    this.dob = createRef();
    this.gender = createRef();
    this.exp = createRef();
    this.pass = createRef();
  }

  handleChange = (propertyName, event) => {
    const state = this.state;
    state[propertyName] = event.target.value;
    this.setState(state);
  };
  handleRemove = (e) => {
    var tempList = this.props.empList.filter(
      (item) => item.firstName + item.lastName + item.dob !== e.target.id
    );
    this.props.updateEmpList(tempList);
  };
  handleEdit = (e) => {
    var tempList = this.props.empList.filter(
      (item) => item.firstName + item.lastName + item.dob === e.target.id
    );
    this.setState({ fName: tempList[0].firstName });
    this.setState({ lName: tempList[0].lastName });
    this.setState({ dob: tempList[0].dob });
    this.setState({ gender: tempList[0].gender });
    this.setState({ exp: tempList[0].experience });
    this.setState({ pass: tempList[0].password });
    this.setState({ edit: true });
    this.setState({ editId: e.target.id });
  };
  handleUpdate = (e) => {
    e.preventDefault();
    var fName = this.fName.current.value;
    var lName = this.lName.current.value;
    var dob = this.dob.current.value;
    var gender = this.gender.current.value;
    var exp = this.exp.current.value;
    var pass = this.pass.current.value;
    var curEmp = {};
    var totalWithoutCurEmp = [];
    var ind = -1;
    for (var i = 0; i < this.props.empList.length; i++) {
      var item = this.props.empList[i];
      if (item.firstName + item.lastName + item.dob !== e.target.id) {
        totalWithoutCurEmp.push(item);
      } else {
        ind = i;
        totalWithoutCurEmp.push(null);
      }
    }
    curEmp.firstName = fName;
    curEmp.lastName = lName;
    curEmp.dob = dob;
    curEmp.gender = gender;
    curEmp.experience = exp;
    curEmp.password = pass;
    totalWithoutCurEmp[ind] = curEmp;
    this.setState({ edit: false });
    this.props.updateEmpList(totalWithoutCurEmp);
  };
  render() {
    return (
      <>
        <h2>Employees List</h2>
        {this.props.empList.map(
          (
            { firstName, lastName, dob, gender, experience, password },
            index
          ) => (
            <div className="medList" key={index}>
              <hr />
              <div>
                <span>
                  <p>
                    <span>First Name -</span> {firstName}
                  </p>
                  <p>
                    <span>Last Name -</span> {lastName}
                  </p>
                  <p>
                    <span>DOB -</span> {dob}
                  </p>
                  <p>
                    <span>Gender -</span> {gender}
                  </p>
                  <p>
                    <span>Experience -</span> {experience}
                  </p>
                  <p>
                    <span>Password -</span> {password}
                  </p>
                </span>
                <span className="buttonsSpan">
                  <button
                    type="button"
                    onClick={this.handleRemove}
                    id={firstName + lastName + dob}
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    onClick={this.handleEdit}
                    id={firstName + lastName + dob}
                  >
                    Edit
                  </button>
                </span>
              </div>
            </div>
          )
        )}
        {this.state.edit && (
          <div className="editEmpDetails">
            <form className="px-4 py-3">
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                  ref={this.fName}
                  value={this.state.fName}
                  onChange={this.handleChange.bind(this, "fName")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                  ref={this.lName}
                  value={this.state.lName}
                  onChange={this.handleChange.bind(this, "lName")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">DOB</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="DOB"
                  ref={this.dob}
                  value={this.state.dob}
                  onChange={this.handleChange.bind(this, "dob")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Gender</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Gender"
                  ref={this.gender}
                  value={this.state.gender}
                  onChange={this.handleChange.bind(this, "gender")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Experience Year</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Experience Year"
                  ref={this.exp}
                  value={this.state.exp}
                  onChange={this.handleChange.bind(this, "exp")}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Password"
                  ref={this.pass}
                  value={this.state.pass}
                  onChange={this.handleChange.bind(this, "pass")}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleUpdate}
                id={this.state.editId}
              >
                Update Emp
              </button>
            </form>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProp = (state) => ({
  empList: state.empList,
});

const mapDispatchToProp = (dispatch) => ({
  updateEmpList: (payload) => dispatch(updateEmpList(payload)),
});

export default connect(mapStateToProp, mapDispatchToProp)(ViewEmp);
