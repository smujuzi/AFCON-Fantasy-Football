import React, { Component } from "react";
import UserService from "../services/UserService";
import HeaderComponent from "./HeaderComponent";

class RegisterUserComponent extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password1: "",
      password2: "",
    };

    this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
    this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePassword1Handler = this.changePassword1Handler.bind(this);
    this.changePassword2Handler = this.changePassword2Handler.bind(this);
    this.saveUser = this.saveUser.bind(this);
  }

  saveUser = (e) => {
    e.preventDefault();

    if (this.state.password1 !== this.state.password2) {
      document.getElementById("error").style.display = "block";
    }
    else if(this.state.firstName == "" |
            this.state.lastName == "" |
            this.state.emailAddress == "" )
            {
              document.getElementById("error").style.display = "block";
            }
            else{

              let user = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                emailAddress: this.state.email,
                password: this.state.password1,
              };
          
              console.log("user => " + JSON.stringify(user));
              UserService.registerUser(user).then((res) => {
          
                this.props.history.push("/");
              });

            }

    
  };

  changeFirstNameHandler = (event) => {
    this.setState({ firstName: event.target.value });
  };

  changeLastNameHandler = (event) => {
    this.setState({ lastName: event.target.value });
  };

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  changePassword1Handler = (event) => {
    this.setState({ password1: event.target.value });
  };

  changePassword2Handler = (event) => {
    this.setState({ password2: event.target.value });
  };

  cancel() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3>Register User</h3>

              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label> First Name: </label>
                    <input
                      placeholder="First Name"
                      name="firstName"
                      className="form-control"
                      value={this.state.firstName}
                      onChange={this.changeFirstNameHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Last Name: </label>
                    <input
                      placeholder="Last Name"
                      name="lastName"
                      className="form-control"
                      value={this.state.lastName}
                      onChange={this.changeLastNameHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label> Email: </label>
                    <input
                      placeholder="Email Address"
                      name="email"
                      className="form-control"
                      value={this.state.email}
                      onChange={this.changeEmailHandler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={this.state.password1}
                      onChange={this.changePassword1Handler}
                    />
                  </div>

                  <div className="form-group">
                    <label>Re-type Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Re-type Password"
                      value={this.state.password2}
                      onChange={this.changePassword2Handler}
                    />
                  </div>
                  <p id="error" style={{display: "none", color: "red"}}>Please fill out form correctly</p>

                  <button
                    className="btn btn-success"
                    onClick={this.saveUser}
                  >
                    Register
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={this.cancel.bind(this)}
                    style={{ marginLeft: "10px" }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterUserComponent;
