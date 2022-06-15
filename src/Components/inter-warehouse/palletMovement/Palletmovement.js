import React, { Component } from 'react'
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
  import { FcSearch } from "react-icons/fc";
  import axios from "axios";
  import {Palletmovementdata, PalletmovementHandler} from "../../../store/Store"
  import Palletmovementlist from './Palletmovementlist'

export default class Palletmovement extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 tableData:[],
                 isShow: false,
        }

        
    }
    submithandler = () => {
        console.log("Display list calling");
        this.getbodylist();
        this.setState({
          isShow: true,
        });
  
      };
  
      getbodylist = () => {
        console.log("bodylist calling");
        axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then((response) => {
            if (response.status === 200) {
              console.log("resposne success", response);
  
              this.setState({
                tableData: response.data,
              });
              PalletmovementHandler(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      backHandler = () => {
        this.setState({
          isShow: false
        })
      };
  

    

    render() {
        return (
            <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
          {Palletmovementdata.length !== 0 || this.state.isShow === true ? (
            <Palletmovementlist tableData = {this.state.tableData} backHandler = {this.backHandler} />
          ) : (
          <div>
            {/* <IoArrowBackCircleSharp />
            <IoArrowForwardCircleSharp />
            <FcSearch style={{ marginLeft: "5px" }} /> */}
            <span>
              <u>
                  
                  <b>
                    <a>Home</a>
                  </b>
                </u>
                &nbsp;
              <u>
                <b>
                  <a>Pallet Movement</a>
                </b>
              </u>
            </span>
            <br />
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
              }}
            >
              <b style={{ marginLeft: "5px" }}>General Criteria</b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Warehouse from</Label>
              </Col>

              <Col>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  // style={{ width: "50px" }}
                  bsSize="sm"
                >
                  <option>=</option>
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </Input>
              </Col>
              <Col>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  // style={{ width: "60px" }}
                  bsSize="sm"
                >
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </Input>
              </Col>

              <Col> </Col>
              <Col>
                <Label>Warehouse to</Label>
              </Col>
              <Col>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  // style={{ width: "60px" }}
                  bsSize="sm"
                >
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </Input>
              </Col>
              <Col>
                <Input type="select" bsSize="sm">
                <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </Input>
              </Col>
              <Col> </Col>
            </Row>
            <Row>
              <Col>
                <Label>Container no</Label>
              </Col>
              <Col>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  // style={{ width: "60px" }}
                  bsSize="sm"
                >
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </Input>
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>

              <Col></Col>
              <Col>
                <Label>Location</Label>
              </Col>
              <Col>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  // style={{ width: "60px" }}
                  bsSize="sm"
                >
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </Input>
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>
              <Col> </Col>
            </Row>
            <Row>
              <Col>
                <Label>Parent container no</Label>
              </Col>
              <Col>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  // style={{ width: "60px" }}
                  bsSize="sm"
                >
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </Input>
              </Col>
              <Col>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  // style={{ width: "60px" }}
                  bsSize="sm"
                >
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </Input>
              </Col>

              <Col></Col>
              <Col>
                <Label>Packaging Id</Label>
              </Col>
              <Col>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  // style={{ width: "60px" }}
                  bsSize="sm"
                >
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </Input>
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>
              <Col> </Col>
            </Row>
            <Row>
              <Col>
                <Label>Status</Label>
              </Col>
              <Col>
                <Input
                  type="name"
                  name="name"
                  id="exampleSelect"
                  // style={{ width: "60px" }}
                  bsSize="sm"
                >
                </Input>
              </Col>
              <Col>
                <Input
                  type="name"
                  name="name"
                  id="exampleSelect"
                  // style={{ width: "60px" }}
                  bsSize="sm"
                >
                  
                </Input>
              </Col>

              <Col></Col>
              <Col>
                <Label>Type</Label>
              </Col>
              <Col>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  style={{ width: "120px" }}
                  bsSize="sm"
                >
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </Input>
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>
              <Col> </Col>
            </Row>

            <Row>
              <Col>
                <Label>Batch</Label>
              </Col>
              <Col>
                <Input
                  type="name"
                  name="name"
                  id="exampleSelect"
                  // style={{ width: "60px" }}
                  bsSize="sm"
                >
                </Input>
              </Col>
              <Col>
                <Input
                  type="name"
                  name="name"
                  id="exampleSelect"
                  // style={{ width: "60px" }}
                  bsSize="sm"
                >
                  
                </Input>
              </Col>

              <Col></Col>
              <Col>
                <Label>Product</Label>
              </Col>
              <Col>
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  style={{ width: "120px" }}
                  bsSize="sm"
                >
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                  <option></option>
                </Input>
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>
              <Col> </Col>
            </Row>

            <Row>
                <Col style={{display:"flex"}}>
                    <Label>Maximum results</Label>
                    <Col xs="2">
                    <Input type="text" />
                </Col>
                <Col xs="2">
                <Input type="text" />
                </Col>
                </Col>
                
            </Row>
            <br/>
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
              }}
            >
              <b style={{ marginLeft: "5px" }}>Stock Criteria</b>
            </div>
            <br/>


            <Row>
                <Col style={{display:"flex"}}>
                    <Label>Movement status</Label>
                    <Col xs="2">
                    <Input type="select">
                        <option></option>
                        <option></option>
                        <option></option>
                    </Input>
                </Col>
                <Col xs="2">
                <Input type="select">
                        <option></option>
                        <option></option>
                        <option></option>
                    </Input>
                </Col>
                </Col>
                
            </Row>


            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Button>Reset Criteria</Button>
              <Button onClick={this.submithandler} style={{marginLeft:"5px"}}>Submit</Button>
            </div>
          </div>
          
           )}
        </Container>
      </React.Fragment>
        )
    }
}
