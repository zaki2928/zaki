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
class ProductDisplayEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editDisp: false,
      editDisplayArr: [],
    };
  }
  componentDidMount(){
    console.log("dhkfjshjgv", this.props.editDisplayArr)
  }


backHandler=()=>{
  console.log("calling back handler for list")
  remover("ProductDisplayEdit")
  this.props.editDiplayClosehandler()
}
    render() {
        return (
            <React.Fragment>
              <div><a href="text">Save</a></div>
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
                        <a style={{cursor:"pointer"}} onClick={this.backHandler}>Display Logistic Unit</a>
                      </b>
                    </u>
                    &#8680;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}}>Logistic Unit Edit</a>
                      </b>
                    </u>
                  </span>
                
               
                <div>
                  <hr />
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>*Status</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
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
                 <hr/>
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>*QUANTITY</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Quantity(PAL)</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input bsSize="sm" />
                    </Col>
    
                    <Col> </Col>
                    <Col>
                      {/* <Label>Quantity(PAL)</Label>{" "} */}
                    </Col>
    
                    <Col>
                      {" "}
                      {/* <Input bsSize="sm" /> */}
                    </Col>
    
                    <Col> </Col>
                    </Row>
                 
                </div>           
                
     
                <div>
                  <hr/>
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>*DIMENTIONS</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Length(cm)</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input bsSize="sm" />
                    </Col>
    
                    <Col> </Col>
                    <Col>
                      <Label>Weight(g)</Label>{" "}
                    </Col>
                    
                    <Col>
                      {" "}
                      <Input bsSize="sm" />
                    </Col>
                    <Col> </Col>
                  </Row>
    
                  <Row style={{ marginTop: "3px" }}>
                    <Col>
                      <Label>Width(cm)</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input bsSize="sm" />
                    </Col>
    
                    <Col> </Col>
                    <Col>
                      <Label>Weight net(g)</Label>{" "}
                    </Col>
                    
                    <Col>
                      {" "}
                      <Input bsSize="sm" />
                    </Col>
                    <Col> </Col>
                  </Row>
    
                  <Row style={{ marginTop: "3px" }}>
                    <Col>
                      <Label>Height (cm)</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input bsSize="sm" />
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
           

                   <div>
                  <hr />
                   <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>*Characteristics Statement</b>
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
            
               </Container>
          </React.Fragment>
        );
    }
}

export default ProductDisplayEdit;