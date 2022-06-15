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
import { intertrailerdata, intertrailerHandler } from "../../../store/Store";
import axios from "axios";

import InterwarehouseTrailerList from "./InterwarehouseTrailerList";

export default class InterwarehouseTrailer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      tableData: [],
    };
  }

  submithandler = () => {
    console.log("Display list calling");
    this.getbodylist();
    this.setState({
      isShow: true,
    });
  };


  listbackHandler=()=>{
    console.log("calling back Handler")
      this.setState({
    
        isShow:false
      })
    }

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
          intertrailerHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
          {intertrailerdata.length !== 0 || this.state.isShow === true ? (
            <InterwarehouseTrailerList tableData={this.state.tableData}
            listbackHandler={this.listbackHandler}
            
            
            />
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
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>WH trailer search</a>
                  </b>
                </u>
              </span>
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop:"5px"
                }}
              >
                <b style={{ marginLeft: "5px" }}>General Criteria</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Warehouse from </Label>{" "}
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
                    // style={{ width: "50px" }}
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
                  <Label>Warehouse to</Label>{" "}
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
              <Row style={{marginTop:"10px"}}>
                <Col>
                  <Label>ID</Label>{" "}
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
                  <Label>Driver Name</Label>{" "}
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
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{marginTop:"10px"}}>
                <Col>
                  <Label>Bar code</Label>{" "}
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
                  <Label>Status</Label>{" "}
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
                    // style={{ width: "50px" }}
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
              
              <Row style={{marginTop:"10px"}}>
                <Col>
                  <Label>Maximum Result</Label>{" "}
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
                    <option>&#60;=</option>
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
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
             

              <Row style={{marginTop:"10px"}}>
                <Col>
                  {" "}
                </Col>
                <Col>
                  {" "}
                  
                  
                </Col>
                <Col>
                  {" "}
                 
                   
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
              <Row style={{marginTop:"10px"}}>
                <Col>
                 {" "}
                </Col>
                <Col>
                  {" "}
                 </Col>
                <Col>
                  {" "}
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
             
             
              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Button>Reset Criteria</Button>{" "}
                <Button onClick={this.submithandler}> Display</Button>
              </div>
            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}
