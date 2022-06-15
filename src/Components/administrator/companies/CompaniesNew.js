import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Label,
  Input,

} from "reactstrap";
import CompaniesList from "./CompaniesList";
import "react-table-v6/react-table.css";
import { FaSave} from 'react-icons/fa';
import { remover } from "../../../store/Store";
import axios from "axios";
import {properties} from '../../../Properties/Properties'

const createCompany = properties.Port + properties.createCompany


export default class CompaniesNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      address1: "",
      address2: "",
      address3: "",
      address4: "",
      businessName: "",
      companyNum: "",
      country: "",
      countryCode: "",
      email: "",
      fax: "",
      idCompany: "",
      mDate: "",
      mUsername: "",
      phone: "",
      postCode: "",
      recepientName: "",
      town: "",
      versionLock: 0,
      msg:"",
      errormsg:"",
    };
  }

  onchangehandler = (event) => {
    console.log("onchangehandler");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  SubmitHandler = () => {
    console.log("posting data", this.state);
    if( this.state.idCompany !="" && this.state.businessName !="" && this.state.address1 !=""){
      this.setState({
        errormsg:"",
      });
      axios.post(createCompany, this.state)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({
            msg: "Data Saved Successfully",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }else{
      this.setState({
        errormsg:"Value is required",
      });

    }
   
  };


  backHandler=()=>{
    console.log("calling back handler for list")
    remover("Companiesid")
    this.props.closeHandler()
  }

  render() {
    
    return (
      <React.Fragment>
        
            
                
              
            
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
                        <a>Companies Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a onClick={this.backHandler}>Companies Management</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Company Edition</a>
                      </b>
                    </u>
                  </span>
                  <br />
              
                  <span style={{color:"Green",  fontWeight: "bold"}}>{this.state.msg}</span>
              <div>
              <div class="row-xs-6 bottom-row ">
            <FaSave
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaSave>{" "}
{/* <button >Configure</button> */}
<a style={{cursor:"pointer" }} onClick={this.SubmitHandler}>Create</a>{" "}
{" "}<FaSave
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaSave>{" "}
{/* <button >Configure</button> */}
<a style={{cursor:"pointer" }} >Create and Select</a>{" "}
              


 </div>

 <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop : "3px"
                }}
              >
                <b style={{ marginLeft: "5px" }}>Status</b>&nbsp;&nbsp;&nbsp;
                <span>{this.state.msg}</span>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>ID</Label>
                </Col>
                
                <Col>
                <Input
                  type="text"
                  value={this.state.idCompany}
                  name="idCompany"
                  onChange={this.onchangehandler}
                  bsSize="sm"
                />
                </Col>
                <Col> 
                {this.state.idCompany ===""?
                <span style={{color:"red", fontWeight:"bold"}}>{this.state.errormsg}</span>:""}
                
                </Col>

                <Col>
                  <Label>Number</Label>
                </Col>
                
                <Col>
                <Input 
                            bsSize="sm"
                            type="text"
                            name="companyNum"
                            onChange={this.onchangehandler}
                            value={this.state.companyNum}
                                
                                />
                </Col>
                <Col> </Col>
                
              </Row>

              

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Name</Label>
                </Col>
                
                <Col>
                <Input 
                            bsSize="sm"
                            type="text"
                            name="businessName"
                            onChange={this.onchangehandler}
                            value={this.state.businessName}
                                
                                />
                </Col>

                <Col> 
                 {this.state.businessName ===""?
                <span style={{color:"red", fontWeight:"bold"}}>{this.state.errormsg}</span>:""}</Col>
               
                <Col>
                 
                </Col>
                
                <Col>
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
                  marginTop : "10px"
                }}
              >
                <b style={{ marginLeft: "5px" }}>Contact Details</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Address1</Label>
                </Col>
                
                <Col>
                <Input 
                            bsSize="sm"
                            type="text"
                            name="address1"
                            onChange={this.onchangehandler}
                            value={this.state.address1}
                                
                                />
                </Col>
                <Col> 
                {this.state.address1 ===""?
                <span style={{color:"red", fontWeight:"bold"}}>{this.state.errormsg}</span>:""} </Col>

                <Col>
                  <Label>Address2</Label>
                </Col>
                
                <Col>
                <Input 
                            bsSize="sm"
                            type="text"
                            name="address2"
                            onChange={this.onchangehandler}
                            value={this.state.address2}
                                
                                />
                </Col>
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Address3</Label>
                </Col>
                
                <Col>
                <Input 
                            bsSize="sm"
                            type="text"
                            name="address3"
                            onChange={this.onchangehandler}
                            value={this.state.address3}
                                
                                />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Address4</Label>
                </Col>
                
                <Col>
                <Input 
                            bsSize="sm"
                            type="text"
                            name="address4"
                            onChange={this.onchangehandler}
                            value={this.state.address4}
                                
                                />
                </Col>
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Postcode</Label>
                </Col>
                
                <Col>
                <Input 
                            bsSize="sm"
                            type="text"
                            name="postCode"
                            onChange={this.onchangehandler}
                            value={this.state.postCode}
                                
                                />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Town</Label>
                </Col>
                
                <Col>
                <Input 
                            bsSize="sm"
                            type="text"
                            name="town"
                            onChange={this.onchangehandler}
                            value={this.state.town}
                                
                                />
                </Col>
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Country Code</Label>
                </Col>
                
                <Col>
                <Input 
                            bsSize="sm"
                            type="text"
                            name="countryCode"
                            onChange={this.onchangehandler}
                            value={this.state.countryCode}
                                
                                />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Country</Label>
                </Col>
                
                <Col>
                <Input 
                            bsSize="sm"
                            type="text"
                            name="country"
                            onChange={this.onchangehandler}
                            value={this.state.country}
                                
                                />
                </Col>
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Phone</Label>
                </Col>
                
                <Col>
                <Input 
                            bsSize="sm"
                            type="text"
                            name="phone"
                            onChange={this.onchangehandler}
                            value={this.state.phone}
                                
                                />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Fax</Label>
                </Col>
                
                <Col>
                <Input 
                            bsSize="sm"
                            type="text"
                            name="fax"
                            onChange={this.onchangehandler}
                            value={this.state.fax}
                                
                                />
                </Col>
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Email</Label>
                </Col>

                <Col>
                <Input 
                            bsSize="sm"
                            type="text"
                            name="email"
                            onChange={this.onchangehandler}
                            value={this.state.email}
                                
                                />
                </Col>

                <Col> </Col>
               
                <Col>
                 
                </Col>
                
                <Col>
                </Col>
                <Col> </Col>
              </Row>


              


            </div>    

            </div>       
            
              
          
        
      </React.Fragment>
    )
  }
}
