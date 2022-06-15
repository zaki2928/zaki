import React, { Component } from 'react';
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
  import {remover } from '../../../../store/Store';
class EditSiteLogisticUnit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      siteLog: false,
      siteLogArr: [],
    };
  }

  componentDidMount(){
    console.log("ibzy component colling", this.props.siteLogArr)
  }

  backHandler=()=>{
    console.log("calling back handler for list")
    remover("EditSiteLogisticUnit")
    this.props.siteLogisticClosehandler()
  }

    render() {
        return (
            <React.Fragment>
            <Container
              className="themed-container"
              fluid={true}
              // style={{ border: "1px solid black", marginLeft: "14px" }}
            >
                 
                  <span>
                    {" "}
                    <u>
                      {" "}
                      <b>
                        <a>Home</a>
                      </b>
                    </u>{" "}
                    &#8680;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}}onClick={this.backHandler}>Display Logistic Unit</a>
                      </b>
                    </u>
                    &#8680;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}}>Site Logistic Unit</a>
                      </b>
                    </u>
                  </span>
                  <div
                      style={{
                        border: "1px",
                        backgroundColor: "grey",
                        border: "1px solid black",
                      }}
                    >
                     
                    </div>
                  <div>
                  <hr />
                 <Row style={{ marginTop: "0px" }}>
                <Col>
                  <Label>Product</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Product description</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "3px" }}>
                <Col >
                  <Label>Intermediate material code</Label>{" "}
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
              </div>
              

             
                   <div>
                  <hr />
                 <Row style={{ marginTop: "0px" }}>
                <Col>
                  <Label>Logistic unit id</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Description</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "3px" }}>
                <Col >
                  <Label>Status</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Error status</Label>{" "}
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
                            <option>_NO ERROR_</option>
                            <option>_ERROR_</option>
                            
                          </Input>
                        </Col>
                <Col> </Col>
              </Row>
              </div>
                
                <div>
                  <hr />
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>* <b>&#62;&#62;</b><a > GENERAL</a></b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Site</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input bsSize="sm" />
                    </Col>
    
                    <Col> </Col>
                    <Col>
                      <Label>Available</Label>{" "}
                    </Col>
                    
                    <Col>
                      {" "}
                      <Input bsSize="sm" />
                    </Col>
                    <Col> </Col>
                  </Row>
    
                  <Row style={{ marginTop: "3px" }}>
                  <Col>
                      <Label>Status</Label>{" "}
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
                            <option>_IN PROGRESS_</option>
                            <option>_COMPLETE_</option>
                            
                          </Input>
                        </Col>
                    <Col> </Col>
                    <Col>
                      <Label>Error status</Label>{" "}
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
                            <option>_NO ERROR_</option>
                            <option>_ERROR_</option>
                            
                          </Input>
                        </Col>
                    <Col> </Col>
                  </Row>
    
                  <Row style={{ marginTop: "3px" }}>
                    <Col >
                      <Label>Modifiedd by</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input bsSize="sm" />
                    </Col>
                    <Col> </Col>
                    <Col>
                      <Label>Modified the</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input bsSize="sm" type="date" />
                    </Col>
                    <Col> </Col>
                  </Row>
    
                 
                </div> 

            
                <div>
                  <hr />
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>
                        * <input type="checkbox"></input> &nbsp;Active  <b>&#62;&#62;</b>
                        <a >STOCK</a></b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Storage profile</Label>{" "}
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
                            <option>(Default: Default storage profile)</option>
                            {/* <option>_ERROR_</option> */}
                            
                          </Input>
                        </Col>
                    <Col> </Col>
                    <Col>
                      <Label>First goods in</Label>{" "}
                    </Col>
                    
                    <Col>
                      {" "}
                      <Input bsSize="sm" />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "3px" }}>
                    <Col>
                      <Label>Number of layers(cm)</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input bsSize="sm" />
                    </Col>
    
                    <Col> </Col>
                    <Col>
                      {/* <Label></Label>{" "} */}
                    </Col>
                    
                    <Col>
                      {" "}
                      {/* <Input bsSize="sm" /> */}
                    </Col>
                    <Col> </Col>
                  </Row>
                 
                </div> 
               
                <div>
                  <hr />
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}> * <input type="checkbox"></input>
                     &nbsp;Active  <b>&#62;&#62;</b>
                        <a >PREPARATION</a></b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Preparation algorithm</Label>{" "}
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
                            <option>Full case</option>
                            {/* <option>_ERROR_</option> */}
                            
                          </Input>
                        </Col>
    
                    <Col> </Col>
                    <Col>
                      <Label>Packaging</Label>{" "}
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
                            <option>Full case</option>
                            {/* <option>_ERROR_</option> */}
                            
                          </Input>
                        </Col>
                    <Col> </Col>
                  </Row>
    
                  <Row style={{ marginTop: "3px" }}>
                    <Col>
                      <Label>Preparation mode</Label>{" "}
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
                            <option>_Picking dynamic_</option>
                            {/* <option>_ERROR_</option> */}
                            
                          </Input>
                        </Col>
                    <Col> </Col>
                    <Col>
                      <Label>Preparation location</Label>{" "}
                    </Col>
                    
                    <Col>
                      {" "}
                      <Input bsSize="sm" />
                    </Col>
                    <Col> </Col>
                  </Row>
    
                  <Row style={{ marginTop: "3px" }}>
                    <Col>
                      <Label>Content status</Label>{" "}
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
                            <option>Available</option>
                            {/* <option>_ERROR_</option> */}
                            
                          </Input>
                        </Col>
                    <Col> </Col>
                    <Col>
                      {/* <Label>Root qty</Label>{" "} */}
                    </Col>
                    
                    <Col>
                      {" "}
                      {/* <Input bsSize="sm" /> */}
                    </Col>
                    <Col> </Col>
                  </Row>
                </div>  
                   <br/>
              </Container>

              {/* <div style={{ marginTop: "10px", marginBottom: "2px",marginLeft: "550px" }}>
               <Button>save</Button>
               </div> */}
          </React.Fragment>
        );
    }
}

export default EditSiteLogisticUnit;