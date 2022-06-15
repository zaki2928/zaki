import React, { Component } from 'react'
import {
    Container,
    Row,
    Col,
    Label,
    Input,

} from "reactstrap";
import { FaSave } from 'react-icons/fa';
import {contactEditData,remover} from "../../store/Store"
import { properties } from "../../Properties/Properties"
import axios from "axios";
import { CONTACTS, USERNAME } from '../../store/RoleBased';


const updateContact = properties.Port + properties.updateContact

export default class Editcontact extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data:[],
            firstName:"",
            businessName:"",
            contactFunction:"",
            idLanguage:"",
            address1: "",
            address2: "",
            address3: "",
            address4: "",
            postcode:"",
            town:"",
            countryCode:"",
            country:"",
            phone:"",
            fax:"",
            email:"",
            msg:"",
            idContact:"",
         
        }
    }

    componentDidMount() {
        console.log("calling edit data length", this.state.data.length);
        console.log( this.props.data2);
        console.log("calling edit ", contactEditData);
    
        if (contactEditData !== null) {
          this.setState(
            {
              data: contactEditData,
            },
            () => {
              console.log("data present after tab switch", this.state.data);
              this.setState({
                firstName:contactEditData.firstName,
                businessName:contactEditData.businessName,
                contactFunction:contactEditData.contactFunction,
                idLanguage:contactEditData.idLanguage,
                address1: contactEditData.address1,
                address2: contactEditData.address2,
                address3: contactEditData.address3,
                address4: contactEditData.address4,
                postcode:contactEditData.postcode,
                town:contactEditData.town,
                countryCode:contactEditData.countryCode,
                country:contactEditData.country,
                phone:contactEditData.phone,
                fax:contactEditData.fax,
                email:contactEditData.email,
                idContact:contactEditData.idContact,
              });
            }
          );
        }
      }

    SubmitHandler = () => {
        const header = {
            'sessionUserId':USERNAME
          }
        axios.put(updateContact, this.state,{headers:header})
          .then((response) => {
            if (response.status === 200) {
              console.log("resposne success", response.data);
              this.setState({
                msg: "Data Updated Successfully",
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
        console.log("calling back handler for list")
        remover("contactEditData")
        this.props.editcloseHandler()
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
                                <a onClick={this.backHandler} style={{cursor:"pointer" }}>Contact Search</a>
                            </b>
                        </u>
                    &#62;
                    <u>
                            {" "}
                            <b>
                                {" "}
                                <a>Contact Management</a>
                            </b>
                        </u>
                    </span>

                    <br />


                    <div>
                        {CONTACTS === 2? 
                        <div class="row-xs-6 bottom-row ">
                            <FaSave

                            //   onClick={() => this.edithandler(props.original)}
                            >

                            </FaSave>{" "}
                            {/* <button >Configure</button> */}
                            <a onClick={this.SubmitHandler} style={{cursor:'pointer'}}>Save</a>{" "}
                            {" "}
                            <span style={{color:"Green",  fontWeight: "bold"}}>&nbsp;&nbsp;&nbsp;{this.state.msg}</span>
                            {/* <FaSave

                            //   onClick={() => this.edithandler(props.original)}
                            > */}

                            {/* </FaSave> */}
                            {/* {" "}
                            <a >Create and Select</a>{" "} */}


                        </div>
                        :''}

                        <div
                            style={{
                                border: "1px",
                                backgroundColor: "grey",
                                border: "1px solid black",
                                marginTop: "3px"
                            }}
                        >
                            <b style={{ marginLeft: "5px" }}>Contact</b>
                            {/* <span style={{color:"white"}}>&nbsp;&nbsp;&nbsp;{this.state.msg}</span> */}
                        </div>

                        <Row style={{ marginTop: "10px", marginBottom:"-8px" }}>
                            <Col>
                                <Label>Name</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="text"
                                    value={this.state.businessName}
                                    name="businessName"
                                    onChange={this.onchangehandler}
                                    // style={{ width: "50px" }}
                                    bsSize="sm"
                                 />
                            </Col>

                            <Col> </Col>

                            <Col>
                                <Label>Firstname</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="text"
                                    value={this.state.firstName}
                                    name="firstName"
                                    onChange={this.onchangehandler}
                                    // style={{ width: "50px" }}
                                    bsSize="sm"
                                 />
                            </Col>
                            <Col> </Col>
                        </Row>

                        <Row style={{ marginTop: "5px", marginBottom:"-8px" }}>
                            <Col>
                                <Label>Function</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="text"
                                    value={this.state.contactFunction}
                                    name="contactFunction"
                                    onChange={this.onchangehandler}
                                    // style={{ width: "50px" }}
                                    bsSize="sm"
                                />
                                
                            </Col>

                            <Col> </Col>

                            <Col>
                                <Label>Language</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="text"
                                    value={this.state.idLanguage}
                                    name="idLanguage"
                                    onChange={this.onchangehandler}
                                    // style={{ width: "50px" }}
                                    bsSize="sm"
                                 />
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
                                marginTop: "10px"
                            }}
                        >
                            <b style={{ marginLeft: "5px" }}>Contact Details</b>
                        </div>

                        <Row style={{ marginTop: "10px" }}>
                            <Col>
                            <Label>Address 1</Label>
                            </Col>
                            <Col>
                            <Input 
                            type="text"
                            value={this.state.address1}
                            name="address1"
                            onChange={this.onchangehandler}/>
                            </Col>

                        <Col>
                            <Label>Address 2</Label>
                            </Col>
                            <Col>
                            <Input type="text"
                            value={this.state.address2}
                            name="address2"
                            onChange={this.onchangehandler} />
                            </Col>
                            
                        </Row>

                        <Row style={{ marginTop: "10px" }}>
                        <Col>
                            <Label>Address 3</Label>
                            </Col>
                            <Col>
                            <Input type="text"
                            value={this.state.address3}
                            name="address3"
                            onChange={this.onchangehandler} />
                            </Col>

                        <Col>
                            <Label>Address 4</Label>
                            </Col>
                            <Col>
                            <Input type="text"
                            value={this.state.address4}
                            name="address4"
                            onChange={this.onchangehandler} />
                            </Col>
                           
                        </Row>

                        <Row style={{ marginTop: "10px" }}>
                        <Col>
                            <Label>Postcode</Label>
                            </Col>
                            <Col>
                            <Input type="text"
                            value={this.state.postcode}
                            name="postcode"
                            onChange={this.onchangehandler} />
                            </Col>

                        <Col>
                            <Label>Town</Label>
                            </Col>
                            <Col>
                            <Input type="text"
                            value={this.state.town}
                            name="town"
                            onChange={this.onchangehandler} />
                            </Col>
                           
                        </Row>

                        <Row style={{ marginTop: "10px" }}>
                        <Col>
                            <Label>Country code</Label>
                            </Col>
                            <Col>
                            <Input type="text"
                            value={this.state.countryCode}
                            name="countryCode"
                            onChange={this.onchangehandler} />
                            </Col>

                        <Col>
                            <Label>Country</Label>
                            </Col>
                            <Col>
                            <Input type="text"
                            value={this.state.country}
                            name="country"
                            onChange={this.onchangehandler} />
                            </Col>
                           
                        </Row>

                        <Row style={{ marginTop: "10px" }}>
                        <Col>
                            <Label>Phone</Label>
                            </Col>
                            <Col>
                            <Input type="text"
                            value={this.state.phone}
                            name="phone"
                            onChange={this.onchangehandler} />
                            </Col>

                        <Col>
                            <Label>Fax</Label>
                            </Col>
                            <Col>
                            <Input type="text"
                            value={this.state.fax}
                            name="fax"
                            onChange={this.onchangehandler} />
                            </Col>
                           
                        </Row>

                        <Row style={{ marginTop: "10px" }}>
                        <Col>
                            <Label>email</Label>
                            </Col>
                            <Col>
                            <Input type="text"
                            value={this.state.email}
                            name="email"
                            onChange={this.onchangehandler} />
                            </Col>

                        <Col>
                            
                            </Col>
                            <Col>
                            
                            </Col>
                           
                        </Row>                        
                        <br/>





                    </div>

                </div>


            </React.Fragment>
        )
    }
}
