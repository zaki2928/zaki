import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Label,
  Input,

} from "reactstrap";
import "react-table-v6/react-table.css";
import { FaSave} from 'react-icons/fa';
import { remover } from "../../../store/Store";
import axios from "axios";
import { properties } from '../../../Properties/Properties';

const createSite = properties.Port + properties.createSite


export default class SitesNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
   
	    data: [],
	  	
		idSite:"",
		mDate:"",
		mUsername:"",
		versionLock:"",
		address1:"",
		address2:"",
		address3:"",
		address4:"",
		businessName:"",
		country:"",
		countryCode:"",
		email:"",
		fax:"",
		phone:"",
		postCode:"",
		recepientName:"",
		town:"",
		siteNum:"",
    };
  }
  
      onchangehandler = (event) => {
    console.log("onchangehandler");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  
  SubmitHandler = () => {
    console.log("Date which we are s ending", this.state);
    axios
      .post(createSite, this.state)
      // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({
            message: "Data Saved Successfully",
           
          });
   
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  backHandler=()=>{
    console.log("calling back handler for list")
    remover("SitesNew")
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
                        <a onClick={this.backHandler}style={{cursor:'pointer'}}>Sites Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Sites Management</a>
                      </b>
                    </u>
                  </span>
              
              <br />
              
              
              <div>
              <div class="row-xs-6 bottom-row ">
			  <span style={{ fontWeight: "bold", color: "green" }}>
              {this.state.message}
              <br />
            </span>
            <FaSave
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaSave>{" "}
{/* <button >Configure</button> */}
<a >  <a onClick={this.SubmitHandler} style={{cursor:'pointer'}}>Create</a></a>{" "}
{" "}<FaSave
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                {/* </FaSave>{" "} */}
                </FaSave>{" "}  
{/* <button >Configure</button> */}
{/* <a >Create and Select</a>{" "} */}
<a style={{cursor:'pointer'}} >Create and Select</a>{" "}            


 </div>

 <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop : "3px"
                }}
              >
                <b style={{ marginLeft: "5px" }}>Status</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Id</Label>
                </Col>
                
                <Col>
                  
                   <Input bsSize="sm" 
				  
                  value={this.state.idSite}
                  name="idSite"
                  onChange={this.onchangehandler}
				   />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Number</Label>
                </Col>
                
                <Col>
                  
                   <Input bsSize="sm" 
				  
                  value={this.state.siteNum}
                  name="siteNum"
                  onChange={this.onchangehandler}
				   />
                </Col>
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Name</Label>
                </Col>
                
                <Col>
                  
                   <Input bsSize="sm" 
				  
                  value={this.state.businessName}
                  name="businessName"
                  onChange={this.onchangehandler}
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
                <b style={{ marginLeft: "5px" }}>Contact Details</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Address1</Label>
                </Col>
                
                <Col>
                    <Input bsSize="sm" 
				  
                  value={this.state.address1}
                  name="address1"
                  onChange={this.onchangehandler}
				   />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Address2</Label>
                </Col>
                
                <Col>
                  
                   <Input bsSize="sm" 
				  
                  value={this.state.address2}
                  name="address2"
                  onChange={this.onchangehandler}
				   />
                </Col>
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Address3</Label>
                </Col>
                
                <Col>
                  
                    <Input bsSize="sm" 
				  
                  value={this.state.address3}
                  name="address3"
                  onChange={this.onchangehandler}
				   />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Address4</Label>
                </Col>
                
                <Col>
                  
                    <Input bsSize="sm" 
				  
                  value={this.state.address4}
                  name="address4"
                  onChange={this.onchangehandler}
				   />
                </Col>
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Postcode</Label>
                </Col>
                
                <Col>
                  
                     <Input bsSize="sm" 
				  
                  value={this.state.postCode}
                  name="postCode"
                  onChange={this.onchangehandler}
				   />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Town</Label>
                </Col>
                
                <Col>
                  
                    <Input bsSize="sm" 
				  
                  value={this.state.town}
                  name="town"
                  onChange={this.onchangehandler}
				   />
                </Col>
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Country code</Label>
                </Col>
                
                <Col>
                    <Input bsSize="sm" 
				  
                  value={this.state.countryCode}
                  name="countryCode"
                  onChange={this.onchangehandler}
				   />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Country</Label>
                </Col>
                
                <Col>
                  
                    <Input bsSize="sm" 
				  
                  value={this.state.country}
                  name="country"
                  onChange={this.onchangehandler}
				   />
                </Col>
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Phone</Label>
                </Col>
                
                <Col>
                  
                   <Input bsSize="sm" 
				  
                  value={this.state.phone}
                  name="phone"
                  onChange={this.onchangehandler}
				   />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Fax</Label>
                </Col>
                
                <Col>
                  
                    <Input bsSize="sm" 
				  
                  value={this.state.fax}
                  name="fax"
                  onChange={this.onchangehandler}
				   />
                </Col>
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Email</Label>
                </Col>
                
                <Col>
                  
                     <Input bsSize="sm" 
				  
                  value={this.state.email}
                  name="email"
                  onChange={this.onchangehandler}
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
            
              }
          
        </Container>
      </React.Fragment>
    )
  }
}
