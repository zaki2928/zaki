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
import Container_List from "../../inter-warehouse/containersEligibility/Container_List";
import "react-table-v6/react-table.css";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { remover } from "../../../store/Store";
import ReactTable from "react-table-v6";


export default class Container_Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packinglinefilter: false,
    };
  }

  backHandler=()=>{
    console.log("calling back handler for list")
    remover("Container_Edit")
    this.props.editClosehandler()
  }

  render() {
    
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          // style={{ border: "1px solid black", marginLeft: "14px" }}
        >
            {
              
                
              
            
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
                    <a style={{cursor:"pointer"}}>Container Eligibility Search</a>
                  </b>
                </u>{""}
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}} onClick={this.backHandler}>Container Eligibility Management</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}}>Container Display</a>
                  </b>
                </u>
              </span>
              <br />
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}> &#62; &#62;General</b>
              </div>
              <b style={{ marginLeft: "5px" }}>Status</b>
              
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Container No</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Location</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Status</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Type</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Container no(Parent)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Packaging Id</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Weight(Kg)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Empty Weight(Kg)</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Height(m)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Volume(dm3)</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              

                            
            </div>            
              }
          {/* {this.state.silolist === true ? (
            <SiloRepackingList />
          ) : } */}
        </Container>
        <Container
          className="themed-container"
          fluid={true}
          // style={{ border: "1px solid black", marginLeft: "14px" }}
        >
            {
              this.state.packinglinefilter===true?(
                <Container_List />
              ) : (           
            <div>
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Content</b>
              </div>
             Container No : 0908765467898765467
            <div>
            <input type="checkbox" id="myid"></input>
            {" "}
              <a href="#" >Select All </a>{" "}
              <a style={{marginLeft : "15px"}}> &#62; &#62;Stock </a>{" "}

              </div>

            </div>       
              )}
          
        </Container>
        <Container
          className="themed-container"
          fluid={true}
          // style={{ border: "1px solid black", marginLeft: "14px" }}
        >
            {
              this.state.packinglinefilter===true?(
                <Container_List />
              ) : (           
            <div>
              
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label style={{ marginBottom: "5px" }}>Movement Status</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input style={{ marginBottom: "5px" }} bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col> </Col>
                <Col> </Col>
                
                <Col> </Col>
              </Row>

              

              

            </div>       
              )}
          
        </Container>
      </React.Fragment>
    )
  }
}
