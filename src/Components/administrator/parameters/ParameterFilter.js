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
import ParameterList from './ParameterList';
import { ParameterData, ParameterHandler, ParameterCriteriaHandler, remover, parameterid } from '../../../store/Store';
import axios from "axios";
import { properties } from "../../../Properties/Properties";
const GetParameterFilterList = properties.Port + properties.GetParameterFilterList;
const getListOfDescription= properties.port+ properties.getDescOfParameter;
class ParameterFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {
          parameterList: false,
          parameterArr : [],
          parameter : "",
          limit: "",
          category : "",
          siteExtensible : "",
          code : "",
          mUsername: "",
          parameterValue: "",
          mDate: "",
          versionLock : "",
          listFilterBean:[],
          attribute: null,
          operation: "=",
          value: null,
          criteria:"",
          listOfDescription:[],
      }
    }
    componentDidMount=()=>{
      axios
      .get("http://localhost:8080/parameter/getDescOfParameter")
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            listOfDescription: response.data,
            
          });
         
        } else {
          this.setState({
            
            data: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
      }

      parameterFilterMethod = () => {
        const length = this.state.listFilterBean.length;
        const listFilterBean = [];
        console.log("testtttttttttttttt  api ", GetParameterFilterList);
        for (let i = 0; i < length; i++) {
          console.log("value of ii", i);
          if (this.state.listFilterBean[i].value !== " ") {
            listFilterBean.push(this.state.listFilterBean[i]);
          }
        }
        console.log("on submittIIIIIIIng", listFilterBean);
        this.setState({
          listFilterBean: listFilterBean,
        });

        console.log(GetParameterFilterList);
        const criteria = {
          listFilterBean: this.state.listFilterBean,
          limit: this.state.limit,
        };
        axios
          .post(GetParameterFilterList,criteria,
            {
              params: {
                limit: this.state.limit,
              },
            }
          )
    
          .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success", response.data);
              this.setState({
                data: response.data,
                parameterList: true,
              });
              ParameterHandler(response.data);
              ParameterCriteriaHandler(criteria);
            } else {
              this.setState({
                parameterList: true,
                data: [],
              });
              ParameterHandler(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

      changeHandler = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === event.target.name
        );
        if (index === -1) {
          const data = {
            attribute: event.target.name,
            operation: event.target.value,
            value: "",
          };
          this.state.listFilterBean.push(data);
        } else {
          //  this.state.listFilterBean[index]
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
    console.log("calling onBlurHandler", criteria.target.name);
    console.log("calling onBlurHandler", criteria.target.value);
    var index = this.state.listFilterBean.findIndex(
      (data) => data.attribute === criteria.target.name
    );
    console.log(index);

    if (criteria.target.value !== "") {
    if (criteria.target.name === "siteExtensible") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.siteExtensible,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.siteExtensible;
        console.log("updated else part", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "category") {
      console.log("checking id refence", criteria.target.name);
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.category,
        };
        this.state.listFilterBean.push(data);
        console.log(this.state.listFilterBean);
      } else {
        this.state.listFilterBean[index].value = this.state.category;
        console.log(this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "code") {
      console.log(criteria.target.name);
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.code,
        };
        this.state.listFilterBean.push(data);
        console.log(this.state.listFilterBean);
      } else {
        this.state.listFilterBean[index].value = this.state.code;
        console.log(this.state.listFilterBean);
      }
    }

    if (criteria.target.name === "parameterValue") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.parameterValue,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.parameterValue;
        console.log(this.state.listFilterBean);
      }
    }
    
    if (criteria.target.name === "versionLock") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.versionLock,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.versionLock;
        console.log(this.state.listFilterBean);
      }
    }
 } else {
      console.log("value is blank", index);
      this.state.listFilterBean.splice(index, 1);
      console.log("after splice", this.state.listFilterBean);
    }
    console.log(this.state.listFilterBean);
    this.setState({
      attribute: "",
      operation: "=",
    });
  };
      
     
      
      
      backHandler=()=>{
        console.log("calling back handler")
        //remover(parameterid)
        this.setState({
          parameterList: false
        })

      }

      limitchangehandler = (event) => {
        if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
          this.setState({
            [event.target.name]: event.target.value,
          });
        } else {
        }
      };

      resetdata = () => {
        console.log("reset handler");
        this.setState({
          limit: "",
          attribute: null,
          operation: "=",
          value: null,
          listFilterBean: [],
          parameterList: false,
          parameterArr : [],
          parameter : "",
          category : "",
          siteExtensible : "",
          code : "",
          mUsername: "",
          parameterValue: "",
          mDate: "",
          versionLock : "",
        });
      };
    
    render() {
        return (
            <React.Fragment>
            <Container
              className="themed-container"
              fluid={true}
              style={{ border: "1px solid black", marginLeft: "14px" }}
            >
              {ParameterData.length !== 0 || this.state.parameterList === true ?
               (
                <ParameterList backHandler={this.backHandler} 
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
                        <a>Parameters Search</a>
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
                        name="versionLock"
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
                        type="text"
                        name="versionLock"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        
                      </Input>
                    </Col>
    
                 
                    <Col>
                      <Label>Category</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="category"
                        id="exampleSelect"
                        onChange={this.changeHandler}
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                         <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    
                    <option value="AMONG">AMONG</option>
                    <option value="NOT AMONG">NOT_AMONG</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input
                      type="select"
                      name="category"
                      onChange={this.inputChangeHandler}
                      value={this.state.category}
                       onBlur={this.onBlurHandler}
                      bsSize="sm"
                    >
                      <option></option>
                      <option value="600">Container</option>
                      <option value="114000">Document</option>
                      <option value="101810">Inventory</option>                      
                      <option value="100000">None</option>
                      <option value="_IHM dvlpment config_">_IHM dvlpment config_</option>
                      <option value="70000">_Security_</option>
                      <option value="90000">_Web user interface_</option>
                    </Input>
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Value</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="parameterValue"
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
                        type="text"
                        name="parameterValue"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                      <option value='='>=</option>
                      <option value="/=">&ne;</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                       
                      </Input>
                    </Col>
    
                    <Col>
                      <Label>Extensible</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                      type="select"
                      name="siteExtensible"
                      onClick={this.changeHandler}
                      onBlur={this.onBlurHandler}
                      bsSize="sm"
                    >
                      <option value='='>=</option>
                      <option value="/=">&ne;</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                    </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input type="select"
                      name="siteExtensible"
                      onChange={this.inputChangeHandler}
                      value={this.state.siteExtensible}
                      onBlur={this.onBlurHandler} bsSize="sm" >
                      <option></option>
                      <option value="0">No</option>
                      <option value="1">Yes</option>
                    </Input>
                    </Col>
                    <Col> </Col>
                  </Row>

                 
                  

                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Description</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="code"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        {/* <option>=</option> */}
                        <option value='='>=</option>
                        <option value="/=">&ne;</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                        {/* <option></option>
                        <option></option>
                        <option></option>
                        <option></option> */}
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      
                      <Input
                        type="select"
                        name="code"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        value={this.state.code}
                        onBlur={this.onBlurHandler}
                      >
                        <option></option>
                                     {this.state.listOfDescription.map(data =>
                                        <option value={data.code} key={data.code}>
                                            {data.code}</option>)
                                        }
                      </Input> 
                    </Col>
    
                    <Col>
                      {/* <Label>Email</Label>{" "} */}
                    </Col>
                    <Col>
                      {" "}
                      {/* <Input
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
                      {" "}
                      {/* <Input bsSize="sm" /> */}
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
                      value="<="
                      readOnly
                      >
                      &le;
                         {/* type="select" */}
                         {/* name="select" */}
                         {/* id="exampleSelect" */}
                         {/* style={{ width: "60px" }} */}
                         {/* bsSize="sm" */}
                      
                      
                        {/* <option>=</option> */}
                        {/* <option></option>
                        <option></option>
                        <option></option>
                        <option></option> */}
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                      bsSize="sm"
                      onChange={this.limitchangehandler}
                      name="limit"
                      value={this.state.limit}/>
                    </Col>
    
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
                    <Button onClick={this.resetdata}>Reset Criteria</Button>{" "}
                    <Button
                      onClick={this.parameterFilterMethod}
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

export default ParameterFilter;