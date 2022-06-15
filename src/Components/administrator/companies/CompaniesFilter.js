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
import CompaniesList from './CompaniesList';
import { CompaniesData, CompaniesDataHandler, companiescriteriaHandler } from '../../../store/Store';
import axios from "axios";
import {properties} from "../../../Properties/Properties"

const getListOfCompanies = properties.Port + properties.getListOfCompanies



class CompaniesFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {
          companiesList: false,
          listFilterBean:[],
          limit: "",
          attribute: null,
          value: null,
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
          versionLock: 0
      }
    }
    

    companiesFilterHandler = () => {
      console.log("submitHandler calling", this.state.limit)
      const companies = {
          listFilterBean: this.state.listFilterBean,
          limit: this.state.limit,
        };

      axios.post(getListOfCompanies, this.state, {
          params: {
              limit: this.state.limit,
            },
      })
          .then((response) => {
              if (response.status === 200 && response.data.length !== 0) {
                  console.log("resposne success", response.data);
                  this.setState({
                      data: response.data,
                      companiesList:true

                  })

                  CompaniesDataHandler(response.data);
                  companiescriteriaHandler(companies);

              }else {
                  this.setState({
                    companiesList: true,
                    data: [],
                  });
                  CompaniesDataHandler(response.data);
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

    if (criteria.target.name === "idCompany") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.idCompany,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.idCompany;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

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

      if (criteria.target.name === "postCode") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.postCode,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.postCode;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "town") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.town,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.town;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "countryCode") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.countryCode,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.countryCode;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "country") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.country,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.country;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "address1") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.address1,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.address1;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "address2") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.address2,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.address2;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "address3") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.address3,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.address3;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "address4") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.address4,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.address4;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "companyNum") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.companyNum,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.companyNum;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "phone") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.phone,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.phone;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "fax") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.fax,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.fax;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "email") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.email,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.email;
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
      
      
      backHandler=()=>{
        console.log("calling back handler")
        this.setState({
          companiesList: false
        })
      }

      resetHandler = () => {
        this.setState({
          listFilterBean:[],
          limit: "",
          attribute: null,
          value: null,
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
          versionLock: 0
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
              {CompaniesData.length !== 0 || this.state.companiesList === true ?
               (
                <CompaniesList backHandler={this.backHandler} 
                data={this.state.data} />
              ) 
              : (
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
                      <Label>ID</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idCompany"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                       <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        bsSize="sm"
                        type="text"
                        name="idCompany"
                        onChange={this.inputChangeHandler}
                        value={this.state.idCompany}
                        onBlur={this.onBlurHandler}
                        
                      >
                      </Input>
                    </Col>
    
                    <Col></Col>
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
                      <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                            bsSize="sm"
                            type="text"
                            name="businessName"
                            onChange={this.inputChangeHandler}
                            value={this.state.businessName}
                            onBlur={this.onBlurHandler}
                                
                                />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Post Code</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="postCode"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                            bsSize="sm"
                            type="text"
                            name="businessName"
                            onChange={this.inputChangeHandler}
                            value={this.state.businessName}
                            onBlur={this.onBlurHandler}
                                
                                />
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Town</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="town"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                            bsSize="sm"
                            type="text"
                            name="town"
                            onChange={this.inputChangeHandler}
                            value={this.state.town}
                            onBlur={this.onBlurHandler}
                                
                                />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Country Code</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="countryCode"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                            bsSize="sm"
                            type="text"
                            name="countryCode"
                            onChange={this.inputChangeHandler}
                            value={this.state.countryCode}
                            onBlur={this.onBlurHandler}
                                
                                />
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Country</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="country"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                            bsSize="sm"
                            type="text"
                            name="country"
                            onChange={this.inputChangeHandler}
                            value={this.state.country}
                            onBlur={this.onBlurHandler}
                                
                                />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Address1</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="address1"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                       <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                            bsSize="sm"
                            type="text"
                            name="address1"
                            onChange={this.inputChangeHandler}
                            value={this.state.address1}
                            onBlur={this.onBlurHandler}
                                
                                />
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Address2</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="address2"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                            bsSize="sm"
                            type="text"
                            name="address2"
                            onChange={this.inputChangeHandler}
                            value={this.state.address2}
                            onBlur={this.onBlurHandler}
                                
                                />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Address3</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="address3"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                       <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                            bsSize="sm"
                            type="text"
                            name="address3"
                            onChange={this.inputChangeHandler}
                            value={this.state.address3}
                            onBlur={this.onBlurHandler}
                                
                                />
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Address4</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="address4"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                            bsSize="sm"
                            type="text"
                            name="address4"
                            onChange={this.inputChangeHandler}
                            value={this.state.address4}
                            onBlur={this.onBlurHandler}
                                
                                />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Number</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="companyNum"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
					            <option value=">">&gt;</option>
                      <option value="<">&lt;</option>
                      <option value="<=">&le;</option>
                      <option value=">=">&ge;</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                            bsSize="sm"
                            type="text"
                            name="companyNum"
                            onChange={this.inputChangeHandler}
                            value={this.state.companyNum}
                            onBlur={this.onBlurHandler}
                                
                                />
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Phone</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="phone"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                            bsSize="sm"
                            type="text"
                            name="phone"
                            onChange={this.inputChangeHandler}
                            value={this.state.phone}
                            onBlur={this.onBlurHandler}
                                
                                />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Fax</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="fax"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                            bsSize="sm"
                            type="text"
                            name="fax"
                            onChange={this.inputChangeHandler}
                            value={this.state.fax}
                            onBlur={this.onBlurHandler}
                                
                                />
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Email</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="email"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                            bsSize="sm"
                            type="text"
                            name="email"
                            onChange={this.inputChangeHandler}
                            value={this.state.email}
                            onBlur={this.onBlurHandler}
                                
                                />
                    </Col>
                    <Col> </Col>
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
                                value="<="
                                // style={{ width: "60px" }}
                                bsSize="sm"
                                readOnly
                            >
                                value=&le;
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
                      {/* <Label>Product Type</Label>{" "} */}
                    </Col>
                    <Col>
                      {/* {" "}
                      <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option>=</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input> */}
                    </Col>
                    <Col>
                      {/* {" "}
                      <Input bsSize="sm" /> */}
                    </Col>
                    <Col> </Col>
                  </Row>
                 
                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Button onClick={this.resetHandler}>Reset Criteria</Button>{" "}
                    <Button
                      onClick={
                       this.companiesFilterHandler
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
        );
    }
}

export default CompaniesFilter;