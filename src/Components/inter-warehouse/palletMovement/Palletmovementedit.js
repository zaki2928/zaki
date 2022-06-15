import React, { Component } from 'react'
import { Container, Row, Col, Label, Input, Button } from "reactstrap";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaSave } from "react-icons/fa";
import axios from "axios";

export default class Palletmovementedit extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }

       
    }


    render() {
        return (
            <React.Fragment>
        {/* <Container
          className="themed-container"
          fluid={true}
          style={{ marginLeft: "14px" }}
        > */}
          <div>
            <IoArrowBackCircleSharp onClick={this.Backhandler} />
            <IoArrowForwardCircleSharp />
            <FcSearch style={{ marginLeft: "5px" }} />
            <span>
              <u>
                <b>
                  <a>Home</a>
                </b>
              </u>
              {" "}&#62;
              <u>
                <b>
                  <a>Pallet Movement Search</a>
                </b>
              </u>
              {" "}&#62;
              <u>
                <b>
                  <a>Pallet Movement Edit</a>
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
            <li>Status</li>
            <hr/>
            <div style={{ background: "#f2f1ed", padding: "2px 2px 8px 10px" }}>

              <Row style={{ marginTop: "10px" }}>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Container no</Label>
                  <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      style={{width:"126px",height:"28px",marginLeft:"63px"}}
                    />
                </Col>

                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Location</Label>
                  <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      style={{width:"126px",height:"28px",marginLeft:"66px"}}

                    />
                  <u style={{color:"blue"}}>Edit</u>
                  
                </Col>
                
              </Row>

             
              <Row style={{ marginTop: "10px" }}>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Status</Label>
                  <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      style={{width:"126px",height:"28px",marginLeft:"111px"}}
                    />
                </Col>

                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Type</Label>
                  <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      style={{width:"126px",height:"28px",marginLeft:"93px"}}

                    />
                </Col>
              </Row>

              
              <Row style={{ marginTop: "10px" }}>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Container no(Parent)</Label>
                  <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      style={{width:"126px",height:"28px",marginLeft:"10px"}}
                    />
                </Col>

                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Packaging ID</Label>
                  <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      style={{width:"126px",height:"28px",marginLeft:"36px"}}

                    />
                  <u style={{color:"blue"}}>Edit</u>
                  
                </Col>
              </Row>

             
              <Row style={{ marginTop: "10px" }}>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Weight(kg)</Label>
                  <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      style={{width:"126px",height:"28px",marginLeft:"78px"}}
                    />
                </Col>

                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Empty weight(kg)</Label>
                  <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      style={{width:"126px",height:"28px",marginLeft:"10px"}}

                    />
                </Col>
              </Row>

              
              <Row style={{ marginTop: "10px" }}>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Height(m)</Label>
                  <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      style={{width:"126px",height:"28px",marginLeft:"84px"}}
                    />
                </Col>

                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Volume(dm3)</Label>
                  <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      style={{width:"126px",height:"28px",marginLeft:"34px"}}

                    />
                </Col>
              </Row>
            </div>
            <br />

            <li>CONTENT</li>
            <div style={{ background: "#f2f1ed", padding: "2px 2px 8px 10px" }}>

            </div>
            <br/>
            <li>
                  <Input type="checkbox" style={{ marginLeft: "5px" }} />
                  <Label style={{ marginLeft: "25px" }}>
                  Active &nbsp;&nbsp; Stock
                </Label>
            </li>

            <hr/>

            <div style={{ background: "#f2f1ed", padding: "2px 2px 8px 10px" }}>
            <Col xs="4" style={{ display: "flex" }}>
                  <Label>Movement status</Label>
                  <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      style={{width:"126px",height:"28px",marginLeft:"10px"}}

                    />
                </Col>
                

            </div>
            <br/>
          </div>
          {/* )} */}
        {/* </Container> */}
        </React.Fragment>

        )
    }
}
