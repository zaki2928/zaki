import React, { Component } from "react";
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
import SiloRepackingList from "./SiloRepackingList";

 class Silo_Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      silolist: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
          {this.state.silolist === true ? (
            <Silo_Filter/>
          ) : (
            <div>
              <IoArrowBackCircleSharp />
              <IoArrowForwardCircleSharp />
              <FcSearch style={{ marginLeft: "5px" }} />
              <span>
                {" "}
                <u>
                  {" "}
                  <b>
                    <a>Home</a>
                  </b>
                </u>{" "}
                
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Silo Search</a>
                  </b>
                </u>
              </span>
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "#0080ff",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Silo Criteria</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Material Type</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
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
                  {" "}
                  <Input 
                    
                    bsSize="sm"
                  />
                    
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Silo_no_L3</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option>=</option>
                    {/* <option></option> */}
                    {/* <option></option> */}
                    {/* <option></option> */}
                    {/* <option></option> */}
                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input 
                  
                  bsSize="sm"/>

                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>DCS_silo_no</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col></Col>
                <Col>
                  <Label>Status_till</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                  {" "}
                  <Input bsSize="sm"
                   type="select"
                   name="select"
                   id="exampleSelect"
                  
                  >

                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>

                  </Input>
                </Col>
                <Col> </Col>
              </Row>
              
             


              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Maximum results</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                  {" "}
                  <Input bsSize="sm"/>
                  
                    
                </Col>
                <Col> </Col>
                <Col>
                
                </Col>
                <Col></Col>
                <Col>
            
                </Col>
                <Col></Col>
              </Row>

          













              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Button color="primary">Reset Criteria</Button>{" "}
                <Button color="primary"
                  onClick={() =>
                    this.setState({
                      silolist: true,
                    })
                  }
                >
                  {" "}
                  Submit
                </Button>
              </div>





              <div
              
              style={{
                border: "1px solid lightblue",
                backgroundColor: "#0080ff"
              }}
              
              
              >
              <IoArrowBackCircleSharp />
              <IoArrowForwardCircleSharp />
              <FcSearch style={{ marginLeft: "5px" }} />
              <span style={{color:"black",
              fontSize:"12px"
            
            }}>
                {" "}
                
                  {" "}
                  <b>
                    User
                  </b>
                {" "}
                :
                
                  {" "}
                  <b>
                    {" "}
                    asis
                  </b>
                  {" "}
                  <b>
                    {" "}
                    Site
                  </b>
                  <b>
                      {"  "}
                    :
                  </b>
                  <b>
                      {"  "}
                    19
                  </b>
                  <b>
                      {"  "}
                    Warehouse
                  </b>

                  <b>
                      {"  "}
                    :
                  </b>

                  <b>
                      {"  "}
                    WH,
                  </b>
                  <b>
                      {"  "}
                    RT1
                  </b>
              </span>
              <br />
              </div>



            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default Silo_Filter;