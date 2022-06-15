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
  import {remover ,OrderDisplayData} from '../../../store/Store';
class OrderDisplayEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editDisp: false,
      editDisplayArr: [],
    };
  }
  componentDidMount(){
    console.log("uzmmmmmmmmmmaaaaaaaaaaaaa", this.props.OrderDisplayData)


    this.setState({
      idReference: OrderDisplayData.idReference,
      idLogisticUnit: OrderDisplayData.idLogisticUnit,
      qtyPerPackage: OrderDisplayData.qtyPerPackage,
      qtyToBePrep: OrderDisplayData.qtyToBePrep,
      customerProductCode: OrderDisplayData.customerProductCode,
      customerProductDescription: OrderDisplayData.customerProductDescription,
      contentStatusId: OrderDisplayData.contentStatusId,
      batch: OrderDisplayData.batch,
      zCustomerRef: OrderDisplayData.zCustomerRef,
      zSiloNumberL3: OrderDisplayData.zSiloNumberL3,
      zBeltThrower: OrderDisplayData.zBeltThrower,






    })

    
  }




backHandler=()=>{
  console.log("calling back handler for list")
  remover("OrderDisplayEdit")
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
              {/* <IoArrowBackCircleSharp onClick={this.backHandler}/>
                  <IoArrowForwardCircleSharp />
                  <FcSearch style={{ marginLeft: "5px" }} /> */}
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
        <a>Preparation Order search</a>
      </b>
    </u>{" "}
    &#62;
    <u>
      {" "}
      <b>
        {" "}
        <a>Preparation Orders Management</a>
      </b>
    </u>{" "}
    &#62;
    <u>
      {" "}
      <b>
        {" "}
        <a onClick={this.backHandler}>Preparation Order Lines Management</a>
      </b>
    </u>{" "}
    &#62;
    <u>
      {" "}
      <b>
        {" "}
        <a>Preparation Order Line Edition</a>
      </b>
    </u>{" "}
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
                    <b style={{ marginLeft: "5px" }}>*Description</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Reference</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                                         type="text"
                                         value={this.state.idReference}
                                         name="idReference"
                                         bsSize="sm" />
                      
                    </Col>
    
                    <Col> </Col>
                    <Col>
                      <Label>Logistic unit id</Label>{" "}
                    </Col>
                    
                    <Col>
                      {" "}
                      <Input 
                      type="text"
                      value={this.state.idLogisticUnit}
                      name="idLogisticUnit"
                      bsSize="sm" />
                      
                    </Col>
                    <Col> </Col>
                  </Row>
    
                  <Row style={{ marginTop: "3px" }}>
                  <Col>
                      <Label>Qty per package(PAL)</Label>{" "}
                    </Col>
    
                    <Col>
                          {" "}
                          <Input 
                           type="text"
                           value={this.state.qtyPerPackage}
                           name="qtyPerPackage"
                           bsSize="sm"
                          />
                        </Col>
                    <Col> </Col>
                    <Col>
                      <Label>Qty to be prepared(PAL)</Label>{" "}
                    </Col>
    
                    <Col>
                          {" "}
                          <Input 
                          
                          type="text"
                          value={this.state.qtyToBePrep}
                          name="qtyToBePrep"
                          bsSize="sm"
                          />
                        </Col>
                    <Col> </Col>
                  </Row>
    
                  <Row style={{ marginTop: "3px" }}>
                    <Col >
                      <Label>Customer Product Code</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                       type="text"
                       value={this.state.customerProductCode}
                       name="customerProductCode"
                       bsSize="sm" />
                    </Col>
                    <Col> </Col>
                    <Col>
                      <Label>Customer Product Description</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input  type="text"
                      value={this.state.customerProductDescription}
                      name="customerProductDescription"
                      bsSize="sm"/>
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "3px" }}>
                    <Col >
                      <Label>Content Status</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                       type="text"
                       value={this.state.contentStatusId}
                       name="contentStatusId"
                       bsSize="sm"/>
                    </Col>
                    <Col> </Col>
                    <Col>
                      
                    </Col>
    
                    <Col>
                      {" "}
                      
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
                    <b style={{ marginLeft: "5px" }}>*Statements</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Batch</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                       type="text"
                       value={this.state.batch}
                       name="batch"
                       bsSize="sm" />
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
                    <b style={{ marginLeft: "5px" }}>*Description</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Customer Reference</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                       type="text"
                       value={this.state.zCustomerRef}
                       name="zCustomerRef"
                       bsSize="sm"
                      />
                    </Col>
    
                    <Col> </Col>
                    <Col>
                      <Label>Silo Number L3</Label>{" "}
                    </Col>
                    
                    <Col>
                      {" "}
                      <Input 
                       type="text"
                       value={this.state.zSiloNumberL3}
                       name="zSiloNumberL3"
                       bsSize="sm"
                      />
                    </Col>
                    <Col> </Col>
                  </Row>
    
                  
                  <Row style={{ marginTop: "3px" }}>
                    <Col>
                      <Label>Belt Thrower</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                       type="text"
                       value={this.state.zBeltThrower}
                       name="zBeltThrower"
                       bsSize="sm"
                       onChange={this.changeHandler}

                       />
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
                   
                 
              </div>
            
               </Container>
          </React.Fragment>
        );
    }
}

export default OrderDisplayEdit;