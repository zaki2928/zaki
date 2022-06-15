import React, { Component } from 'react'
import { Container, Row, Col, Label, Input, Button } from "reactstrap";
import { FaSave } from "react-icons/fa";
import Physicalgatelist from "../physical-gate/Physicalgatelist";
import axios from "axios";
import {remover} from '../../../store/Store'
import { properties } from "../../../Properties/Properties"

const createGateKl = properties.Port + properties.createGateKl

export default class Createnewlogicalgate extends Component {
    constructor(props) {
        super(props)

        this.state = {
          alwaysAvailable: 1,
          available: 1,
          defaultGate: 1,
          description: "",
          encode: "",
          gateNumber: "",
          idGate: "",
          idGateFather: "",
          idLocation: "",
          idSite: 19,
          idWarehouse: "",
          mDate: "",
          mParent: {},
          mUsername: "",
          physical: "",
          statusGate: "",
          typeAssignment: "",
          typeGate: "",
          versionLock: "",
          msg:"",
        }

    }

    onchangehandler = (event) => {
      console.log("onchangehandler", event.target.value);
      this.setState({
        [event.target.name]: event.target.value,
      });
    };

    checkboxChangeHandler = (event) => {
      console.log("Valuehandler", event.target.value)
      if(event.target.checked === true){
        this.setState({
          [event.target.name]: 1
        })
      }
      else {
        this.setState({
          [event.target.name]: 0
        })
      }
      // let value = parseInt(event.target.value, 10)
      // console.log("entered in checked value", value)
      
    }
  
  
    SubmitHandler = () => {
      console.log("posting data", this.state);
      axios.post(createGateKl, this.state)
        .then((response) => {
          if (response.status === 200) {
            console.log("resposne success", response.data);
            this.setState({
              msg: "Data Saved Successfully",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
  
    backkHandler = () => {
      console.log("calling back handler for list")
      remover("physicalgateid")
      this.props.closeHandler()
    }

    render() {
        return (
            <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          // style={{ marginLeft: "14px" }}
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
              &#62;

              <u>
                <b>
                  <a >Gates Search</a>
                </b>
              </u>
             &#62;
              <u>
                <b>
                  <a onClick={this.backkHandler}> Gates management</a>
                </b>
              </u>
              &#62;
              <u>
                <b>
             
                  <a>Gates edition</a>
                </b>
              </u>
            </span>
            <br />
            <div style={{
                marginTop:"10px"
              }}>
              <FaSave size="25" />
             <u><b onClick={this.SubmitHandler}>Create</b></u>&nbsp;&nbsp;&nbsp;
             
             
             <u ><b >Create and select</b></u>
            </div>
            <br />
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
              }}
            >
              <b style={{ marginLeft: "5px" }}>General</b>&nbsp;&nbsp;&nbsp;
              <span>{this.state.msg}</span>
            </div>
            <br />
            <li>Description</li>
            <br />
            <div >
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Description</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input 
                 value={this.state.description}
                 name="description"
                 onChange={this.onchangehandler}
                bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Site</Label>{" "}
              </Col>
              <Col>
                <Input
                type="text"
                value={this.state.idSite}
                name="idSite"
                onChange={this.onchangehandler}
                bsSize="sm" 
                
                ></Input>
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Warehouse</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                value={this.state.idWarehouse}
                name="idWarehouse"
                onChange={this.onchangehandler}
                bsSize="sm"
                type="select"
                >
                  <option>---select---</option>
                  <option value="WH">Main warehouse</option>
                  <option value="RT1">Remote Terminal 1</option>
                  </Input>
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Default</Label>{" "}
              </Col>
              <Col >
                <Input
                value={this.state.defaultGate}
                name="defaultGate"
                onChange={this.checkboxChangeHandler}
                bsSize="sm" 
                type="checkbox"
                checked={this.state.defaultGate===1 ? true : false}

                />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Available</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                value={this.state.available}
                name="available"
                onChange={this.checkboxChangeHandler}
                bsSize="sm"
                type="checkbox"
                readOnly="true"
                // defaultValue="1"
                checked={this.state.available===1 ? true : false}
                >
                  </Input>
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Always available</Label>{" "}
              </Col>
              <Col >
                <Input
                 value={this.state.alwaysAvailable}
                 name="alwaysAvailable"
                 onChange={this.checkboxChangeHandler}
                bsSize="sm" 
                type="checkbox"
                checked={this.state.alwaysAvailable===1 ? true : false}

                />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            
            
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Gate no</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                type="text"
                value={this.state.gateNumber}
                name="gateNumber"
                onChange={this.onchangehandler}
                bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Barcode</Label>{" "}
              </Col>
              <Col>
                <Input
                type="text"
                value={this.state.encode}
                name="encode"
                onChange={this.onchangehandler}
                 bsSize="sm" />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
         
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Status</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                type="text"
                value={this.state.statusGate}
                name="statusGate"
                onChange={this.onchangehandler}
                bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                {" "}
              </Col>
              <Col>
                
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
         
             
            <hr></hr>
            </div>
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
            <hr />

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
            <hr />


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

          
            <br/>
          </div>
          {/* )} */}
        </Container>
      </React.Fragment>
        )
    }
}
