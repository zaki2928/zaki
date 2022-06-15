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
import OrderList from "./OrderList";
import "react-table-v6/react-table.css";
import axios from 'axios'
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { remover,OrderCustomerData } from "../../../store/Store";
import ReactTable from "react-table-v6";
import { properties } from '../../../Properties/Properties';

const getCompanyById = properties.Port + properties.getCompanyById

export default class OrderCustomer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packinglinefilter: false,
    };
  }

  componentDidMount(){
    console.log("uzmmmmmmmmmmaaaaaaaaaaaaa", OrderCustomerData.idCompany)
this.getConpanybyId(OrderCustomerData.idCompany)
    this.setState({
      idPrepOrder: OrderCustomerData.idPrepOrder,
      statusPrep: OrderCustomerData.statusPrep,


    })
  }

  getConpanybyId=(id)=>{
  console.log("cLLING GET company by id",id)
  axios
  .post(getCompanyById + id, {
   
  })
  .then((response) => {
    console.log("uzmaaaaaaaaaa=========>",response.data)
    if (response.status === 200) {
      console.log("resposne success for successs", response.data);

      this.setState({
          message: "",
          idCompany: response.data.idCompany,
          mDate:response.data.mDate,
          mUsername:response.data.mUsername,
          versionLock:response.data.versionLock,
          address1:response.data.address1,
          address2:response.data.address2,
          address3:response.data.address3,
          address4:response.data.address4,
          businessName:response.data.businessName,
          companyNum:response.data.companyNum,
          countryCode:response.data.countryCode,
          email:response.data.email,
          fax:response.data.fax,
          town:response.data.town,
          country:response.data.country,
          phone:response.data.phone,
          postCode:response.data.postCode,
          recepientName:response.data.recepientName,
          versionLock:response.data.versionLock,
          // phone:response.data.phone,

 
        });

      }
  })
  .catch((error) => {
    console.log(error);
  });
  }
  backHandler=()=>{
    console.log("calling back handler for list")
    remover("OrderCustomer")
    this.props.customerCloseHandler()
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
                    <a>Preparation Order</a>
                  </b>
                </u>{""}
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a onClick={this.backHandler} >Preparation Orders Management</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Preparation Order Customer</a>
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
                <b style={{ marginLeft: "5px" }}>*Description</b>
              </div>
              
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Preparation Order</Label>
                </Col>

                <Col>
                
                  <Input 
                   type="text"
                   value={this.state.idPrepOrder}
                   name="idPrepOrder"
                   bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Status</Label>
                </Col>
                
                <Col>
                
                  <Input 
                   type="text"
                   value={this.state.statusPrep}
                   name="statusPrep"
                   bsSize="sm" />
                  
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
                <OrderList />
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
                <b style={{ marginLeft: "5px" }}>*Customer Details</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Billing Details</Label>
                </Col>

                <Col>
                
                  
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Shipping Details</Label>
                </Col>
                
                <Col>
                
                 
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Business Name</Label>
                </Col>

                <Col>
                
                  <Input 
                                     type="text"
                                     value={this.state.name}
                                     name="businessName"
                                     bsSize="sm" 
                                     readOnly
                                     />
                                     
                
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Business Name</Label>
                </Col>
                
                <Col>
                
                  <Input 
                  
                  type="text"
                   value={this.state.businessName}
                   name="businessName"
                   bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "5px" }} >
                <Col>
                  <Label>Address1</Label>
                </Col>

                <Col>
                
                  <Input
                   type="text"
                   value={this.state.add}
                   name="address1"
                   bsSize="sm"
                   readOnly />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Address1</Label>
                </Col>
                
                <Col>
                
                  <Input
                   type="text"
                   value={this.state.address1}
                   name="address1"
                   bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Address2</Label>
                </Col>

                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.add}
                  name="address2"
                  bsSize="sm"
                  readOnly />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Address2</Label>
                </Col>
                
                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.address2}
                  name="address2"
                  bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Address3</Label>
                </Col>

                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.add}
                  name="address3"
                  bsSize="sm"
                  readOnly />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Address3</Label>
                </Col>
                
                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.address3}
                  name="address3"
                  bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Address4</Label>
                </Col>

                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.add}
                  name="address4"
                  bsSize="sm" 
                  readOnly/>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Address4</Label>
                </Col>
                
                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.address4}
                  name="address4"
                  bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Postcode</Label>
                </Col>

                <Col>
                
                  <Input 
                  
                  type="text"
                   value={this.state.pst}
                   name="postCode"
                   bsSize="sm" 
                   readOnly/>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Postcode</Label>
                </Col>
                
                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.postCode}
                  name="postCode"
                  bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Town</Label>
                </Col>

                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.twn}
                  name="town"
                  bsSize="sm"
                  
                  readOnly/>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Town</Label>
                </Col>
                
                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.town}
                  name="town"
                  bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Country Code</Label>
                </Col>

                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.cntrycode}
                  name="countryCode"
                  bsSize="sm" 
                  readOnly/>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Country Code</Label>
                </Col>
                
                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.countryCode}
                  name="countryCode"
                  bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Country</Label>
                </Col>

                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.cntry}
                  name="country"
                  bsSize="sm"
                  readOnly />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Country</Label>
                </Col>
                
                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.country}
                  name="country"
                  bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Phone</Label>
                </Col>

                <Col>
                
                  <Input 
                  
                  type="text"
                   value={this.state.phn}
                   name="phone"
                   bsSize="sm" 
                   readOnly/>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Phone</Label>
                </Col>
                
                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.phone}
                  name="phone"
                  bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
              <Col>
                  <Label>Fax</Label>
                </Col>

                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.fc}
                  name="fax"
                  bsSize="sm"
                  readOnly />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Fax</Label>
                </Col>
                
                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.fax}
                  name="fax"
                  bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Email</Label>
                </Col>

                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.eml}
                  name="email"
                  bsSize="sm"
                  readOnly />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Email</Label>
                </Col>
                
                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.email}
                  name="email"
                  bsSize="sm" />
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
