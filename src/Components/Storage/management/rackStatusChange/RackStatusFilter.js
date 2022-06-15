import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
    Button,
  } from "reactstrap";
import RackStatusList from './RackStatusList';
import { RackStatusData, RackStatusHandler } from '../../../../store/Store';
import axios  from "axios";
class RackStatusFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {
          locationList: false,
      }
    }

    componentDidMount=()=>{
      }
      
      submitHandler=()=>{
        console.log("submitHandler calling")
        
        axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          if (response.status === 200) {
            console.log("resposne success", response.data);
             this.setState({
            data:response.data,
            locationList:true
      
            })
      
            RackStatusHandler(response.data)
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
      
      }
      
      
      backHandler=()=>{
        console.log("calling back handler")
        this.setState({
          locationList: false
        })
      }
      
    render() {
        return (
            <React.Fragment>
            <Container
              className="themed-container"
              fluid={true}
              style={{ border: "1px solid black", marginLeft: "14px" }}
            >
              {RackStatusData.length !== 0 || this.state.locationList === true ? (
                <RackStatusList backHandler={this.backHandler} data={this.state.data} />
              ) : (
                <div>
                  <span>
                    {" "}
                    <u>
                      {" "}
                      <b>
                        <a>Home</a>
                      </b>
                    </u>{" "}
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Rack Status Change Search</a>
                      </b>
                    </u>
                  </span>
                  <br />
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      marginTop: "10px"
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>General Criteria</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Warehouse</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
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
                      {" "}
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
                      <Label>Location</Label>{" "}
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
                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Container</Label>{" "}
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
    
                  
                    <Col>
                      <Label>Company</Label>{" "}
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
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Type</Label>{" "}
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
                      <Label>Cell Allocation</Label>{" "}
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
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Content Status</Label>{" "}
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
                      <Label>Movement Status</Label>{" "}
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
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Maximum Results</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="text"
                        name="select"
                        id="exampleSelect"
                        value="<="
                        // style={{ width: "60px" }}
                        bsSize="sm"
                        readOnly
                      >
                        {/* <option>=</option> */}
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
    
                    <Col>
                      {/* <Label>Sabic Order Id</Label>{" "} */}
                    </Col>
                    <Col>
                      {" "}
                      {/* <Input
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
                      </Input> */}
                    </Col>
                    <Col>
                      {" "}
                      {/* <Input bsSize="sm" /> */}
                    </Col>
                    <Col> </Col>
                  </Row>

                  

                  
                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Button>Reset Criteria</Button>{" "}
                    <Button
                      onClick={
                       this.submitHandler
                      }
                    >
                      {" "}
                      Submit
                    </Button>
                  </div>
                </div>
                )} 
            </Container>
          </React.Fragment>
        );
    }
}

export default RackStatusFilter;