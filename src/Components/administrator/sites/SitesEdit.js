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
import { remover , SitesEditData} from '../../../store/Store';
import axios from "axios";
import {properties} from "../../../Properties/Properties"
import { SITES } from '../../../store/RoleBased';

const createSite = properties.Port + properties.createSite
class SitesEdit extends Component {
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

  componentDidMount(){
     console.log("calling edit data length", this.state.data.length);
    console.log("calling edit datttaaaaaaaaaaaaa&&&&&&aaaa", this.props.data2);
    console.log("calling edit ", SitesEditData);
	if (SitesEditData !== null) {
      this.setState(
        {
          data: SitesEditData,
        },
		 () => {
          console.log("data present after tab switch", this.state.data);
          this.setState({
			  idSite:SitesEditData.idSite,
		mDate:SitesEditData.mDate,
		businessName:SitesEditData.businessName,
		versionLock:SitesEditData.versionLock,
		address1:SitesEditData.address1,
		address2:SitesEditData.address2,
		address3:SitesEditData.address3,
		address4:SitesEditData.address4,
		businessName:SitesEditData.businessName,
		country:SitesEditData.country,
		countryCode:SitesEditData.countryCode,
		email:SitesEditData.email,
		fax:SitesEditData.fax,
		phone:SitesEditData.phone,
		postCode:SitesEditData.postCode,
		recepientName:SitesEditData.recepientName,
		town:SitesEditData.town,
		siteNum:SitesEditData.siteNum,
			   
			   });
        }
      );
    }
			  
			  

  }
    onchangehandler = (event) => {
    console.log("onchangehandler");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  backHandler=()=>{
    remover("SitesEdit")
    this.props.editClosehandler()
  }
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

          // ProductHandler(response.data);
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
                        <a style={{cursor:"pointer" }} onClick={this.backHandler}>Sites Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a onClick={this.backHandler}style={{cursor:'pointer'}}>Sites Management</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Sites Edition</a>
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
            {SITES === 2?
            <div>
            <FaSave
                style={{cursor:"pointer" }}
                onClick={this.SubmitHandler}
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaSave>{" "}
                <a onClick={this.SubmitHandler}style={{cursor:'pointer'}}>Save</a>
            </div>
            :''}
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
                  
                 <Input bsSize="sm" value={this.state.idSite} />
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
        
            
        </Container>
       
      </React.Fragment>
        );
    }
}

export default SitesEdit;