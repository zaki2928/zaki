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
  IoInformation,
  IoInformationCircle,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import SiloRepackingList from "../Silo/SiloRepackingList";

 class Silo_Loading_Filter extends Component {
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
            <Silo_Loading_Filter/>
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
                    <a>Silo Loading Search</a>
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
                <b style={{ marginLeft: "5px" }}>General Criteria</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Company</Label>{" "}
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
                    type="select"
                    name="select"
                    id="exampleSelect"
                   
                    bsSize="sm"
                  >
                    <option>SK</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
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
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input 
                  
                  bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Reception_ID</Label>{" "}
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
                  <Label>Reference</Label>{" "}
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
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Status</Label>{" "}
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
                  <Input

                    type="select"
                    name="select"
                    id="exampleSelect"
                    bsSize="sm">

                    <option></option>
                    <option></option>
                     <option></option>
                    <option></option>
                    <option></option>

                    </Input>
                 
                
    
                </Col>

                <Col></Col>
                <Col>
                  {" "}
                </Col>
                <Col>
                  {" "}
                  </Col>
                <Col>
                  {" "}
                
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Maximum_Result</Label>{" "}
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
                 {" "}
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col>
                  {" "}
                </Col>
                <Col> </Col>
              </Row>
              <div
                style={{
                  
                }}
              >
              </div>



              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Row>
                      <Col><Button color="primary"
                            size="sm"
                      style={{marginTop:"10px",
                    }}
                      
                      
                      >Reset Criteria</Button>
</Col>
                      <Col><Button color="primary"
                  onClick={() =>
                    this.setState({
                      silolist: true,
                    })
                  }
                  style={{marginTop:"10px"}}
                  size="sm"
                >
                  {" "}
                  Submit
                </Button></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      { <Col><span style={{color:"lightgreen",
                    }}
                    
                    >
                        <b style={{color:"black",
                    marginRight:"5px"}}> <IoInformationCircle/></b><u><b>filters</b></u></span></Col> }
                   
                                
            </Row>
              </div>





              <div
              
              style={{
                border: "1px solid lightblue",
                backgroundColor:"#0080ff"
              }}
              
              
              >
              <IoArrowBackCircleSharp />
              <IoArrowForwardCircleSharp />
              <FcSearch style={{ marginLeft: "5px" }} />
              <span style={{color:"black",
              fontSize:"12px"
            }}
            
            
            
            >
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

export default Silo_Loading_Filter;