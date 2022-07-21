import React, { Component } from "react";
import UserService from "../services/UserService";
import HeaderComponent from "./HeaderComponent";

export default class LoginUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
      email: "",
      password: "",
    };
    this.changeEmailHandler = this.changeEmailHandler.bind(this);
    this.changePasswordHandler = this.changePasswordHandler.bind(this);

    this.loginUser = this.loginUser.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  loginUser = (e) => {
    e.preventDefault();

    let user = {
      emailAddress: this.state.email,
      password: this.state.password,
    };

    console.log("user => " + JSON.stringify(user));
    UserService.loginUser(user.emailAddress, user.password).then((res) => {
      this.setState({
        id: res.data,
      });

      if (this.state.id == "") {
        document.getElementById("error").style.display = "block";
      } else {
        this.props.history.push(`/home/${this.state.id}`);
      }
    });
  };

  registerUser() {
    this.props.history.push("/register");
  }

  changeEmailHandler = (event) => {
    this.setState({ email: event.target.value });
  };

  changePasswordHandler = (event) => {
    this.setState({ password: event.target.value });
  };

  render() {
    return (
      <div className="container-xl">
        <div className="container-xl">
          <div className="row">
            <div className="card col-md-6 offset-md-3 offset-md-3">
              <h3 className="text-center">Log in User</h3>
              <div className="card-body">
                <form>
                  <div className="form-group">
                    <label>Email </label>
                    <input
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.changeEmailHandler}
                      placeholder="Enter email"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      We'll never share your email with anyone else.
                    </small>
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={this.state.password}
                      onChange={this.changePasswordHandler}
                      placeholder="Password"
                    />
                  </div>

                  <p
                    id="error"
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      display: "none",
                    }}
                  >
                    Incorrect user details
                  </p>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this.loginUser}
                  >
                    {" "}
                    Log in
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ marginLeft: "10px" }}
                    onClick={this.registerUser}
                  >
                    {" "}
                    Register User
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
