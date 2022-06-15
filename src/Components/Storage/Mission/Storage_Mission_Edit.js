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
import Storage_Mission_List from "../Mission/Storage_Mission_List";
import "react-table-v6/react-table.css";
import ReactTable from "react-table-v6";

export default class Storage_Mission_Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packinglinefilter: false,
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
            {
              this.state.packinglinefilter===true?(
                <Storage_Mission_List />
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
                <b style={{ marginLeft: "5px" }}>*Description</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Mission No</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Index</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Mode</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Movement Type</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Container Choice Type</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Mission Class</Label>{" "}
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
                  <Label>Priority</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              

                            
            </div>            
              )}
          {/* {this.state.silolist === true ? (
            <SiloRepackingList />
          ) : } */}
        </Container>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
            {
              this.state.packinglinefilter===true?(
                <Storage_Mission_List />
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
                <b style={{ marginLeft: "5px" }}>*Containers</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Containers Origin</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Origin Location</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Origin Warehouse</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Destination Location</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Destination Warehouse</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col> </Col>
               
                
              </Row>

              

            </div>       
              )}
          
        </Container>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
            {
              this.state.packinglinefilter===true?(
                <Storage_Mission_List />
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
                <b style={{ marginLeft: "5px" }}>*Details</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Product</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Product Description</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Intermediate Material Code</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Grade</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>User Treat</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Creation Bag</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              

            </div>       
              )}
          
        </Container>
      </React.Fragment>
    )
  }
}
