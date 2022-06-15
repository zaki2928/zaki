import React, { Component } from "react";

import Home from "./Home";
import Login from "../src/Components/Login";
// import Repacking from "./Components/Repacking";
import axios from "axios"
import { properties } from "./Properties/Properties";

import { resetRoleBaseAccess } from "./store/RoleBased";

const triggerCronicJobs =
  properties.Port + properties.triggerCronicJobs;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedin: false,
      shahid: "shahid",
    };
  }
  logdinhandler = () => {
    console.log("login handler calling");
    this.setState({
      loggedin: true,
    });
  };
  logouthandler = () => {
    console.log("logout handler calling");
    resetRoleBaseAccess()
    this.setState({
      loggedin: false,
    });
  };
  componentDidMount=()=>{
    localStorage.setItem("job","faraz")
    axios.post(triggerCronicJobs)
    .then((Response)=>{
      if(Response.status=== 200)
      console.log("Response success for trigger cronic job")
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  render() {
    return (
      <div>
        {this.state.loggedin === true ? (
          <Home logouthandler={this.logouthandler} shahid={this.state.shahid} />
        ) : (
          <Login logdinhandler={this.logdinhandler} />
        )}
        {/* <Repacking /> */}
      </div>
    );
  }
}
