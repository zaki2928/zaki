import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
  } from "reactstrap";
import "react-table-v6/react-table.css";
import { FaSave} from 'react-icons/fa';
import { CompaniesEditData, remover, companiesid} from '../../../store/Store';
import { properties } from '../../../Properties/Properties';
import axios from "axios";
import { COMPANIES } from '../../../store/RoleBased';



const updateCompany = properties.Port + properties.updateCompany
class CompaniesEdit extends Component {
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
     
    };
  }

  componentDidMount() {
    console.log("calling edit data length", this.state.data.length);
    console.log( this.props.data2);
    console.log("calling edit ", CompaniesEditData);

    if (CompaniesEditData !== null) {
      this.setState(
        {
          data: CompaniesEditData,
        },
        () => {
          console.log("data present after tab switch", this.state.data);
          this.setState({
            address1:CompaniesEditData.address1,
            address2:CompaniesEditData.address2,
            address3:CompaniesEditData.address3,
            address4:CompaniesEditData.address4,
            businessName:CompaniesEditData.businessName,
            companyNum:CompaniesEditData.companyNum,
            country:CompaniesEditData.country,
            countryCode:CompaniesEditData.countryCode,
            fax:CompaniesEditData.fax,
            email:CompaniesEditData.email,
            idCompany: CompaniesEditData.idCompany,
            mDate: CompaniesEditData.mDate,
            mUsername: CompaniesEditData.mUsername,
            phone:CompaniesEditData.phone,
            postcode:CompaniesEditData.postcode,
            town:CompaniesEditData.town,
            
          });
        }
      );
    }
  }

  SubmitHandler = () => {
    axios.put(updateCompany, this.state)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({
            msg: "Updated Successfully",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onchangehandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };



  backHandler=()=>{
    console.log("back calling========")
    remover(companiesid)
    this.props.editcloseHandler()
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
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer" }}>Companies Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer" }} onClick={this.backHandler}>Companies Management</a>
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
            
            <div>
            <span style={{color:"Green",  fontWeight: "bold"}}>{this.state.msg}</span>
              {COMPANIES === 2? 
            <div class="row-xs-6 bottom-row ">
            <FaSave
                onClick={this.SubmitHandler}
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaSave>{" "}
{/* <button >Configure</button> */}
<a style={{cursor:"pointer" }} onClick={this.SubmitHandler}>Save</a>{" "}
 </div>
 :''}
             
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop : "3px"
                }}
              >
                <b style={{ marginLeft: "5px" }}>Status</b>&nbsp;&nbsp;&nbsp;
                
              </div>

              {/* <span style={{color:"Green",  fontWeight: "bold"}}>&nbsp;&nbsp;&nbsp;{this.state.message}</span> */}

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
                  disabled="true"
                />
                </Col>
                <Col> </Col>

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

                <Col> </Col>
               
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
                <b style={{ marginLeft: "5px" }}>Cotact Details</b>
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
                <Col> </Col>

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
              <br/>



              


            </div>    
        
            
        </Container>
       
      </React.Fragment>
        );
    }
}

export default CompaniesEdit;