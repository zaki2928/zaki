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
import RolesList from './RolesList';
import { RefreshRolecriteriaHandler, RolesData, RolesHandler } from '../../../store/Store';
import axios from "axios";
import { properties } from "../../../Properties/Properties";

const GetListOfRoles = properties.Port + properties.GetListOfRoles;

class RolesFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {
          rolesList: false,
          idRole: '',
          mDate: "",
          mUsername: "",
          versionLock: '',
          category: '',
          cdate: "",
          cusername: "",
          roleLevel: '',
          listOfMenuId: [],
          listOfMenus: [],
          name: "",
          limit: "",
          attribute: null,
          operation: "=",
          value: null,
          listFilterBean: [],
          criteriaArr: [],
          criteria: "",
          passedcriteria: "",
      }
    }
    componentDidMount=()=>{
   
      }
      
      criteriaFilterMethodForRoles = () => {
        console.log("testtttttttttttttt  api ", GetListOfRoles);
        const criteria = {
          listFilterBean: this.state.listFilterBean,
          limit: this.state.limit,
        };
        
        axios
          .post(GetListOfRoles, this.state, {
            params: {
              limit: this.state.limit,
            },
          })
    
          .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success", response.data);
              this.setState({
                data: response.data,
                rolesList: true,
              });
              RolesHandler(response.data);
             RefreshRolecriteriaHandler(criteria)
            } else {
              this.setState({
                rolesList: true,
                data: [],
              });
              RolesHandler(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };


      
   changeHandler = (event) => {
    console.log("index BEFORE UPDATE print", this.state.listFilterBean);
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
        "ELSE PARTTTTTT",
        (this.state.listFilterBean[index].operation = event.target.value)
      );
    }
    console.log("index AFTER UPDATE print", this.state.listFilterBean);
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
  
    if (criteria.target.value !== "") {
      if (criteria.target.name === "name") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.name,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.name;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "roleLevel") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.roleLevel,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.roleLevel;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "category") {
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
        } else {
          this.state.listFilterBean[index].value = this.state.category;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
    }else {
      console.log("something else");
    }
  };

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
   	      rolesList: false,
          idRole: '',
          mDate: "",
          mUsername: "",
          versionLock: '',
          category: '',
          cdate: "",
          cusername: "",
          roleLevel: '',
          listOfMenuId: '',
          listOfMenus: '',
          name: "",
          limit: "",
          attribute: null,
          operation: "=",
          value: null,
          listFilterBean: [],
      });
  };


      // submitHandler=()=>{
      //   console.log("submitHandler calling")
        
      //   axios
      //   .post("http://localhost:8080/role/getListOfRole")
      //   .then((response) => {
      //     if (response.status === 200) {
      //       console.log("resposne success", response.data);
      //        this.setState({
      //       data:response.data,
      //       rolesList:true
      
      //       })
      
      //       RolesHandler(response.data)
            
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      
      // }
      
      
      backHandler=()=>{
        console.log("calling back handler")
        this.setState({
          rolesList: false,
          idRole: '',
          mDate: "",
          mUsername: "",
          versionLock: '',
          category: '',
          cdate: "",
          cusername: "",
          roleLevel: '',
          listOfMenuId: [],
          listOfMenus: [],
          name: "",
          limit: "",
          attribute: null,
          operation: "=",
          value: null,
          listFilterBean: [],
          criteriaArr: [],
          criteria: "",
          passedcriteria: "",
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
              {RolesData.length !== 0 || this.state.rolesList === true ?
               (
                <RolesList backHandler={this.backHandler} 
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
                        <a>Roles Search</a>
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
                    name="name"
                    id="exampleSelect"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    {/* <option>---select---</option> */}
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
                    onChange={this.inputChangeHandler}
                    name="name"
                    value={this.state.name}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("idSite")}
                  />

                </Col>
                    
                    <Col>
                      <Label>Level</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="select"
                        name="roleLevel"
                        id="exampleSelect"
                        onChange={this.changeHandler}
                        bsSize="sm"
                      >
                         <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                    <option value="<=">&le;</option>
                    <option value=">=">&ge;</option>
                    <option value="AMONG">AMONG</option>
                    <option value="NOT AMONG">NOT_AMONG</option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input
                      type="select"
                      name="roleLevel"
                      id="exampleSelect"
                      // style={{ width: "60px" }}
                      value={this.state.roleLevel}
                      bsSize="sm"
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                    >
                      {" "}
                      <option>---select---</option>
                      <option value="100">User</option>
                      <option value="200">Administrator</option>
                      <option value="300">_Super Administrator_</option>
                    </Input>
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
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
                      id="exampleSelect"
                      // style={{ width: "60px" }}
                      value={this.state.category}
                      bsSize="sm"
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                    >
                      {" "}
                      <option>---select---</option>
                      <option value="200">common</option>
                      <option value="100">system</option>
                    </Input>
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
                  
                  

                  

                  <Row style={{ marginTop: "5px" }}>
                  <Col>
                    <Label>Maximum result</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      value="<="
                      readOnly>&le;
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
                    <Button 
                     type="reset"
                    value="Reset"
                    onClick={this.resetdata}>Reset Criteria</Button>{" "}
                    <Button
                     onClick={this.criteriaFilterMethodForRoles} type="button"
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

export default RolesFilter;