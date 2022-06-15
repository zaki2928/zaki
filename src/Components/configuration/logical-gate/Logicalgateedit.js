import React, { Component } from "react";
import { Container, Row, Col, Label, Input, Button } from "reactstrap";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaSave } from "react-icons/fa";
import Logicalgatelist from "./Logicalgatelist";
import axios from "axios";

export default class Logicalgateedit extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  Backhandler = () => {
    this.props.editCloseHandler();
  };

  render() {
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ marginLeft: "14px" }}
        >
          {/* {Logicalgatelistdata.length !== 0 || this.state.isShow === true ? (
            <Logicalgatelist tableData={this.state.tableData} />
          ) : ( */}
          <div>
          
            <span>
              <u>
                <b>
                  <a>Home</a>
                </b>
              </u>
              &nbsp; &#62; &nbsp;
              <u>
                <b>
                  <a onClick={this.Backhandler}>Logical Gate Search</a>
                </b>
              </u>
              &nbsp; &#62; &nbsp;
              <u>
                <b>
                  <a>Logical Gate Edit</a>
                </b>
              </u>
            </span>
            <br />
            <div>
              <FaSave size="25" />
            </div>
            <br />
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
              }}
            >
              <b style={{ marginLeft: "5px" }}>General</b>
            </div>
            <br />
            <li>Description</li>
            <div style={{ background: "#f2f1ed", padding: "2px 2px 8px 10px" }}>
              <Row style={{ marginTop: "10px" }}>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Description</Label>
                  <Col>
                    <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      bsSize="sm"
                    />
                  </Col>

                  <Col></Col>
                </Col>

                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Site</Label>
                  <Col>
                    <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      bsSize="sm"
                    />
                  </Col>
                  <Col></Col>
                </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Warehouse</Label>
                  <Col>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      bsSize="sm"
                    >
                      <option>=</option>
                    </Input>
                  </Col>
                  <Col></Col>
                </Col>

                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Default</Label>
                  <Col>
                    <Input
                      type="checkbox"
                      name="checkbox"
                      id="exampleSelect"
                      style={{ marginLeft: "25px" }}
                    />
                  </Col>
                  <Col></Col>
                </Col>
              </Row>

              <Row>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Available</Label>
                  <Col>
                    <Input
                      type="checkbox"
                      name="checkbox"
                      id="exampleSelect"
                      style={{ marginLeft: "25px" }}
                    />
                  </Col>
                  <Col></Col>
                </Col>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Always Available</Label>
                  <Col>
                    <Input
                      type="checkbox"
                      name="checkbox"
                      id="exampleSelect"
                      style={{ marginLeft: "25px" }}
                    />
                  </Col>
                  <Col></Col>
                </Col>
              </Row>

              <Row>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Status</Label>
                  <Col>
                    <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      bsSize="sm"
                    />
                  </Col>
                  <Col></Col>
                </Col>
              </Row>
            </div>
            <br />

            <Row>
              <Col style={{ display: "flex" }}>
                <li>
                  <Input type="checkbox" style={{ marginLeft: "5px" }} />
                </li>

                <Label style={{ marginLeft: "30px" }}>
                  Active &nbsp;&nbsp; Stock
                </Label>
              </Col>
            </Row>

            <Row>
              <Col style={{ display: "flex" }}>
                <li>
                  <Input type="checkbox" style={{ marginLeft: "5px" }} />
                </li>

                <Label style={{ marginLeft: "30px" }}>
                  Active &nbsp;&nbsp; Goods-In
                </Label>
              </Col>
            </Row>

            <Row>
              <Col style={{ display: "flex" }}>
                <li>
                  <Input type="checkbox" style={{ marginLeft: "5px" }} />
                </li>

                <Label style={{ marginLeft: "30px" }}>
                  Active &nbsp;&nbsp; Shipping
                </Label>
              </Col>
            </Row>

            <div style={{ background: "#f2f1ed", padding: "2px 2px 8px 10px" }}>
              <Row style={{ marginTop: "10px" }}>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Assignment</Label>
                  <Col>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      bsSize="sm"
                    >
                      <option></option>
                    </Input>
                  </Col>

                  <Col></Col>
                </Col>

                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Location</Label>
                  <Col>
                    <Input type="select" name="select" id="exampleSelect">
                      <option></option>
                    </Input>
                  </Col>
                  <Col></Col>
                </Col>
              </Row>
            </div>
            <br/>
          </div>
          {/* )} */}
        </Container>
      </React.Fragment>
    );
  }
}
