import React, { Component } from "react";
import "./css/header.css";
// import logo from "./simpanalogo.png";
import Loader from "react-loader-spinner";
import { USERNAME } from "./store/RoleBased";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <span
        style={{
          fontSize: "12px",
          marginLeft: "5%",
          cursor: "pointer",
          height: "200px",
          width: "100%",
          // backgroundColor: "yellow",
          marginTop: "150px",
        }}
      >
        <b>
          <Loader
            style={{ marginRight: "12px", float: "right" }}
            type="Puff"
            color="#00BFFF"
            height={20}
            width={30}
            timeout={300000} //3 secs
          />
          <u
            onClick={this.props.logouthandler}
            style={{ marginRight: "12px", float: "right" }}
          >
            Logout
          </u>
          <h6 style={{ marginRight: "12px", float: "right" }}><b>{USERNAME}</b></h6>
        
          {/* <select
            style={{ marginRight: "12px", float: "right", width: "70px" }}
          >
            <option>English</option>
          </select>
          <u style={{ marginRight: "12px", float: "right" }}>Language</u>
          <select
            style={{ marginRight: "12px", float: "right", width: "70px" }}
          >
            <option>red</option>
          </select>

          <u style={{ marginRight: "12px", float: "right" }}>Style</u>
          <u style={{ marginRight: "12px", float: "right" }}>Translation</u> */}
        </b>
        {/* <button onClick={this.props.logouthandler}>click</button> */}
      </span>
    );
  }
}

export default Header;
