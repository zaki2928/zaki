import React, { Component } from "react";
// import tools from "../Css/tools.css";
import login from "../css/login.css";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import { FaUserCircle } from "react-icons/fa";
// import loginbg2 from "../Images/loginbg2.jpg";
// import axios from "axios";
// import { properties } from "./WebServiceLink/WebServiceLink";

// const loginUrl = properties.Port + properties.loginUrl;
import axios from "axios";
import { setUserName } from "../store/RoleBased";
import { properties } from "../Properties/Properties";
import { setUserRoleAccess } from "../store/RoleBased";
import { ListOfLoginMenusHandler } from "../store/Store";

const getlogin = properties.Port + properties.getlogin;
const loginURL = properties.Port + properties.loginURL;
export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      errmesg: "",
      exceptionmsg: "",
    };
  }

  ChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  LoginMethod = () => {
    console.log("Date which we are sending for login", this.state);
    axios
      .post(loginURL + this.state.login + "/" + this.state.password)
      .then((response) => {
        console.log(response.data);
        setUserName(response.data.userBean.login);
        if (response.status === 200) {
          ListOfLoginMenusHandler(response.data);

          setUserRoleAccess(response.data);
          this.setState({
            loginData: response.data,
          });
          this.props.logdinhandler();
        }
      })
      .catch((error) => {
        this.setState({
          exceptionmsg: error.response.data.message,
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        {/* <img className="lgbg" src={loginbg2} alt="login-img" /> */}

        <div className="main formalign">
          <br></br>
          <Form className="login-form">
            <div>
              {/* <h3 className="">Tools Management</h3> */}
              <FaUserCircle className="loginicon" />
            </div>
            <br />
            <FormGroup className="text-left">
              <span style={{ color: "red", fontWeight: "bold" }}>
                {this.state.exceptionmsg}
              </span>

              {/* <Label>Username</Label> */}
              <Input
                value={this.state.login}
                name="login"
                onChange={this.ChangeHandler}
                placeholder="Username"
              />
            </FormGroup>
            <FormGroup className="text-left">
              {/* <Label >Password</Label> */}
              <Input
                value={this.state.password}
                name="password"
                onChange={this.ChangeHandler}
                type="password"
                placeholder="Password"
              />
            </FormGroup>
            <FormGroup check>
              {/* <Label check>
              <Input type="checkbox" id="checkbox2" />
              Remember me
            </Label> */}
            </FormGroup>
            <br></br>
            <Button
              className="btn-lg  btn-block btn-success"
              onClick={this.LoginMethod}
            >
              Login
            </Button>
            {/* <div className="text-center ">
                <a href="/sign-up">Sign up</a>
                <span className="p-2">|</span>
                <a href="/forgot-password">Forgot Password</a>
            </div> */}
          </Form>
        </div>
      </React.Fragment>
    );
  }
}
