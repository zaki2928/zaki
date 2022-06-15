import React, { Component } from "react";
import wms from "../Images/wms2.png";
import "../css/homepage.css";
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";

export default class Homepage extends Component {
  render() {
    return (
      // <div>
      <Container
        className="themed-container"
        fluid={true}
        style={{ marginLeft: "14px" }}
      >

        <div style={{ float: "left" }}>
          <div className="container2">
            <div className="img">
              <img
                src={wms}
                alt="logo"
                style={{ width: "238px", height: "135px", marginLeft: "230px" }}
              />
              <br/>
              <div className="version"
                    
                    >V2.0.0, standard revision:33647, client revision:$(product.revision.client)</div>
              
            </div>
          </div>

          <div className="container3">
            <div className="tabs">
              <label>
                <b>*Tabs Management</b>
              </label>
              <br />
              {/* <div className="tabsChild">
                <a href="url">[Close first tab]</a> &nbsp;
                <a href="url">[Close all tabs]</a> &nbsp;
                <a href="url">[Close last tab]</a> <br />
                <label> Opened tabs: 2 </label>
                <br />
                <select name="Home" id="home">
                  <option value="Home">Home</option>
                  <option value="loc">loc</option>
                </select>{" "}
                &nbsp;
                <button>></button>&nbsp;
                <button>x</button>
              </div> */}
            </div>
          </div>

          <div className="container4">
            <div className="session">
              <label>
                <b>*Session Management</b>
              </label>
              <br />
              <a href="url">[logout]</a>
            </div>
          </div>

          <div className="container5">
            <div className="session">
              <label>
                <b>*About Us</b>
              </label>
              <br />
              <a href="url">http://www.saudikayan.com</a>
            </div>
          </div>
        </div>
        <div style={{ float: "left" }}>
          <div className="container6">
            <div className="head">
              <label>
                <b>*HOTKEYS</b>
              </label>
            </div>
            <div className="fields">
              F2: Products <br />
              F3: Preparation orders <br />
              F4: Waves <br />
              F5: Shipping containers <br />
              F6: Shipments <br />
              F7: Purchase orders <br />
              F8: Folders <br />
              F9: Missions display <br />
              F10: Storage containers <br />
              F11: Stock takes <br />
              F12: Stock snapshot <br />
              ---------------------------------------- <br />
              sh+F2: Cells accessibility <br />
              sh+F3: Boxes <br />
              sh+F9: WH Missions <br />
              sh+F10 Stock contents <br />
              sh+F12: Events viewer <br />
              ---------------------------------------- <br />
              Ctrl+Sh+F12: Close tab <br />
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
