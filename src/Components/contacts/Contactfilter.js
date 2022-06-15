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
import { FcSearch } from "react-icons/fc";
import {ContactDataHandler, ContactData, contactcriteriaHandler} from '../../store/Store'
import Contactlist from './Contactlist'
import axios from "axios";
import {properties} from '../../Properties/Properties'


const getListOfContact = properties.Port + properties.getListOfContact

export default class Contactfilter extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            Contactlist: false,
            limit: "",
            attribute: null,
            value: null,
            firstName:"",
            businessName:"",
            contactFunction:"",
            listFilterBean: [],
            idLanguage:"",
            musername:"",
            mdate:"",
            loginUser:"",
            operation:"",
        }
    }

    contactFilterHandler = () => {
        console.log("submitHandler calling", this.state.limit)
        const contact = {
            listFilterBean: this.state.listFilterBean,
            limit: this.state.limit,
          };

        axios.post(getListOfContact, this.state, {
            params: {
                limit: this.state.limit,
              },
        })
            .then((response) => {
                if (response.status === 200 && response.data.length !== 0) {
                    console.log("resposne success", response.data);
                    this.setState({
                        data: response.data,
                        Contactlist:true

                    })

                    ContactDataHandler(response.data);
                    contactcriteriaHandler(contact);

                }else {
                    this.setState({
                      Contactlist: true,
                      data: [],
                    });
                    ContactDataHandler(response.data);
                  }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    changeHandler = (event) => {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === event.target.name
        );
        if (index === -1) {
          const data = {
            attribute: event.target.name,
            operation: event.target.value,
          };
          this.state.listFilterBean.push(data);
        } else {
          console.log(
            (this.state.listFilterBean[index].operation = event.target.value)
          );
        }
       
      };

      inputChangeHandler = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };

      onBlurHandler = (criteria) => {
        console.log("calling onBlurrrrr", criteria.target.name);
        console.log("calling onBlurrrrr", criteria.target.value);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        console.log("INDEX VALUE FOR IF PART IN ALUE", index);

        if (criteria.target.name === "businessName") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.businessName,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.businessName;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }

          if (criteria.target.name === "firstName") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.firstName,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.firstName;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }

          if (criteria.target.name === "contactFunction") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.contactFunction,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.contactFunction;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }

          if (criteria.target.name === "limit") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.limit,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.limit;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }

    console.log("calling criteriaARRRR", this.state.listFilterBean);
    this.setState({
      attribute: "",
      operation: "=",
    });
    
    }

    limitchangehandler = (event) => {
        if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
          this.setState({
            [event.target.name]: event.target.value,
          });
        } else {
        }
      };

      resetHandler = () => {
        this.setState({
          Contactlist: false,
            limit: "",
            attribute: null,
            value: null,
            firstName:"",
            businessName:"",
            contactFunction:"",
            listFilterBean: [],
            idLanguage:"",
            musername:"",
            mdate:"",
            loginUser:"",
        })
      }

    backHandler=()=>{
        console.log("calling back handler")
        this.setState({
            Contactlist: false
        })
      }

    

    
    render() {
        return (
            <React.Fragment>
                <Container
                    className="themed-container"
                    fluid={true}
                    style={{ border: "1px solid black", marginLeft: "14px" }}
                >
                    {ContactData.length !== 0 || this.state.Contactlist === true ?
                    (<Contactlist 
                        backHandler={this.backHandler} 
                        data={this.state.data}
                    /> ) :   
                    
                (
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
                                <a>Contact Search</a>
                            </b>
                        </u>
                    </span>
                        <br />

                        <div
                            style={{
                                border: "1px",
                                backgroundColor: "grey",
                                border: "1px solid black",
                                marginTop: "10px"
                            }}
                        >

                            <b style={{ marginLeft: "5px" }}>Criteria</b>
                        </div>

                        <Row style={{ marginTop: "10px" }}>
                            <Col>
                                <Label>Name</Label>{" "}
                            </Col>
                            <Col>
                                {" "}
                                <Input
                                    type="select"
                                    name="businessName"
                                    id="exampleSelect"
                                    // style={{ width: "60px" }}
                                    bsSize="sm"
                                >
                                    <option value="=">=</option>
                                    <option value="/=">&ne;</option>
                                    <option value="START WITH">START_WITH</option>
                                    <option value="CONTAINS">CONTAINS</option>
                                    <option value="AMONG">AMONG</option>
                                    <option value="NOT AMONG"> NOT_AMONG</option>
                                    <option value="MATCHES">MATCHES</option>
                                    <option value="NOT MATCHES">NOT_MATCHES</option>
                                </Input>
                            </Col>
                            <Col>
                                {" "}
                                <Input
                                    type="text"
                                    // id="exampleSelect"
                                    name="businessName"
                                    onChange={this.inputChangeHandler}
                                    value={this.state.businessName}
                                    onBlur={this.onBlurHandler}
                                    // style={{ width: "60px" }}
                                    bsSize="sm"
                                 />
                            </Col>

                            <Col></Col>
                            <Col>
                                <Label>Firstname</Label>{" "}
                            </Col>
                            <Col>
                                {" "}
                                <Input
                                    type="select"
                                    name="firstName"
                                    id="exampleSelect"
                                    // style={{ width: "60px" }}
                                    bsSize="sm"
                                >
                                    <option value="=">=</option>
                                    <option value="/=">&ne;</option>
                                    <option value="START WITH">START_WITH</option>
                                    <option value="CONTAINS">CONTAINS</option>
                                    <option value="AMONG">AMONG</option>
                                    <option value="NOT AMONG"> NOT_AMONG</option>
                                    <option value="MATCHES">MATCHES</option>
                                    <option value="NOT MATCHES">NOT_MATCHES</option>
                                </Input>
                            </Col>
                            <Col>
                                {" "}
                                <Input 
                                bsSize="sm"
                                type="text"
                                name="firstName"
                                onChange={this.inputChangeHandler}
                                value={this.state.firstName}
                                onBlur={this.onBlurHandler}
                                
                                />
                            </Col>
                            <Col> </Col>
                        </Row>

                        <Row>
                        <Col>
                                <Label>Function</Label>{" "}
                            </Col>
                            <Col>
                                {" "}
                                <Input
                                    type="select"
                                    name="contactFunction"
                                    id="exampleSelect"
                                    // style={{ width: "60px" }}
                                    bsSize="sm"
                                >
                                    <option value="=">=</option>
                                    <option value="/=">&ne;</option>
                                    <option value="START WITH">START_WITH</option>
                                    <option value="CONTAINS">CONTAINS</option>
                                    <option value="AMONG">AMONG</option>
                                    <option value="NOT AMONG"> NOT_AMONG</option>
                                    <option value="MATCHES">MATCHES</option>
                                    <option value="NOT MATCHES">NOT_MATCHES</option>
                                </Input>
                            </Col>
                            <Col>
                                {" "}
                                <Input
                                    type="text"
                                    name="contactFunction"
                                    onChange={this.inputChangeHandler}
                                    value={this.state.contactFunction}
                                    onBlur={this.onBlurHandler}
                                    // style={{ width: "60px" }}
                                    bsSize="sm"
                                 />
                            </Col>
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>
                            <Col></Col>


                        </Row>

                        <Row style={{ marginTop: "5px" }}>
                            <Col>
                                <Label>Maximum Results</Label>{" "}
                            </Col>
                            <Col>
                                {" "}
                                <Input
                                type="text"
                                name="text"
                                id="exampleSelect"
                                bsSize="sm"
                                value="<="
                                readOnly
                                >&le;
                                 style={{ width: "60px" }}
                               
                            
                                
                            </Input>
                            </Col>
                            <Col>
                                {" "}
                                <Input
                    bsSize="sm"
                    onChange={this.limitchangehandler}
                    name="limit"
                    value={this.state.limit}
                  />
                            </Col>

                            <Col></Col>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                            <Col> </Col>
                        </Row>
                        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <Button onClick={this.resetHandler}>Reset Criteria</Button>{" "}
                            <Button
                                onClick={
                                    this.contactFilterHandler
                                }
                            >
                                {" "}
                      Submit
                    </Button>
                        </div>



                </div>

)}
                </Container>
                                
            </React.Fragment>
        )
    }
}
