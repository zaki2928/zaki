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
import Userlist from './Userlist';
import { FcSearch } from "react-icons/fc";
import { NewUserData, NewUserDataHandler, RefreshUsercriteriaHandler } from "../../store/Store";
import axios from "axios";
import { properties } from '../../Properties/Properties';



const GetListOfUsersByFilterCriteria = properties.Port + properties.GetListOfUsersByFilterCriteria
const getListOfLanguage = properties.Port + properties.getListOfLanguage
const getListOfAllUserData = properties.Port + properties.getListOfAllUserData
export default class Userfilter extends Component {
  constructor(props) {
    super(props)

    this.state = {
      Userlist: false,
      idUser: '',
      mDate: "",
      mUsername: "",
      versionLock: '',
      category: '',
      cxdate: "",
      cxusername: "",
      cdate: "",
      cusername: "",
      expiryDate: "",
      firstName: "",
      lastName: "",
      userLevel: '',
      login: "",
      password: "",
      status: '',
      defaultCompany: "",
      defaultLanguage: "",
      defaultSite: "",
      defaultWarehouse: "",
      isActive: '',
      isAdmin: '',
      listOfMenus: [],
      listFilterBean: [],
      listOfRoles: [],
      listOfRolesIds: [],
      listOfUserId: [],
      listOfSiteBeans: [],
      listOfCompanyBeans: [],
      listOfWarehouseBeans: [],
      listOfWarehouseIds: [],
      listOfCompanyIds: [],
      listOfSiteIds: [],
      idWarehouse: '',
      idRole: '',
      limit: "",
      attribute: null,
      operation: "=",
      value: null,
      criteria: "",
      passedcriteria: "",
      idLangArr:[],

    }
  }
componentDidMount = ()=>{
  console.log("uzzzzzzzzzzzzzzz language");
  this.getLanguageMethod()
}

  criteriaFilterMethodForUsers= () => {
    console.log("testtttttttttttttt  api ", GetListOfUsersByFilterCriteria);
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    
    axios
      .post(GetListOfUsersByFilterCriteria, this.state, {
        params: {
          limit: this.state.limit,
        },
      })


      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
            Userlist: true,
          });
          NewUserDataHandler(response.data);
         RefreshUsercriteriaHandler(criteria)
        } else {
          this.setState({
            Userlist: true,
            data: [],
          });
          NewUserDataHandler(response.data);
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
        value:""
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
      if (criteria.target.name === "login") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.login,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.login;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "cusername") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.cusername,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.cusername;
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
      if (criteria.target.name === "status") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.status,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.status;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "expiryDate") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.expiryDate,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.expiryDate;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "defaultLanguage") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.defaultLanguage,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.defaultLanguage;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "userLevel") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.userLevel,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.userLevel;
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
    } else {
      console.log("value is blank", index);
      this.state.listFilterBean.splice(index, 1);
      console.log("after splice", this.state.listFilterBean);
    }
   
console.log("calling criteriaARRRR", this.state.listFilterBean);
  this.setState({
    attribute: "",
    operation: "=",
  });
  };

  limitchangehandler = (event) => {
    if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
      this.setState({
        [event.target.name]: event.target.value,
      });
    } else {
    }
  };
  getLanguageMethod = () => {
    axios
        .post(getListOfLanguage)
        .then((response) => {
            if (response.status === 200) {
                console.log("resposne success for languageeeeeee556667", response.data);
                // response.data.map(id => id.idLanguage === "en" ? this.setState({
                //     defaultLanguage: id.idLanguage
                // }) : null)
                this.setState({
                    message: "",
                    idLangArr: response.data,
                    langAvail: response.data.available,

                });

            }
        })
        .catch((error) => {
            console.log(error);
        });
};


  resetdata = () => {
    console.log("reset handler");
    this.setState({
      Userlist: false,
      idUser: '',
      mDate: "",
      mUsername: "",
      versionLock: '',
      category: '',
      cxdate: "",
      cxusername: "",
      cdate: "",
      cusername: "",
      expiryDate: "",
      firstName: "",
      lastName: "",
      userLevel: '',
      login: "",
      password: "",
      status: '',
      defaultCompany: "",
      defaultLanguage: "",
      defaultSite: "",
      defaultWarehouse: "",
      isActive: '',
      isAdmin: '',
      listOfMenus: [],
      listFilterBean: [],
      listOfRoles: [],
      listOfRolesIds: [],
      listOfUserId: [],
      listOfSiteBeans: [],
      listOfCompanyBeans: [],
      listOfWarehouseBeans: [],
      listOfWarehouseIds: [],
      listOfCompanyIds: [],
      listOfSiteIds: [],
      idWarehouse: '',
      idRole: ''

    });
  };



  backHandler = () => {
    console.log("calling back handler")
    this.setState({
      Userlist: false,
      idUser: '',
      mDate: "",
      mUsername: "",
      versionLock: '',
      category: '',
      cxdate: "",
      cxusername: "",
      cdate: "",
      cusername: "",
      expiryDate: "",
      firstName: "",
      lastName: "",
      userLevel: '',
      login: "",
      password: "",
      status: '',
      defaultCompany: "",
      defaultLanguage: "",
      defaultSite: "",
      defaultWarehouse: "",
      isActive: '',
      isAdmin: '',
      listOfMenus: [],
      listFilterBean: [],
      listOfRoles: [],
      listOfRolesIds: [],
      listOfUserId: [],
      listOfSiteBeans: [],
      listOfCompanyBeans: [],
      listOfWarehouseBeans: [],
      listOfWarehouseIds: [],
      listOfCompanyIds: [],
      listOfSiteIds: [],
      idWarehouse: '',
      idRole: ''

    })
  }


  submitHandler = () => {
    console.log("submitHandler calling")

    axios
      .post(getListOfAllUserData)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
            Userlist: true

          })

          NewUserDataHandler(response.data)

        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  // backHandler = () => {
  //   console.log("calling back handler")
  //   this.setState({
  //     Userlist: false
  //   })
  // }

  render() {
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
          {NewUserData.length !== 0 || this.state.Userlist === true ?
            (
              <Userlist
                backHandler={this.backHandler}
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
                      <a>User Search</a>
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
                    <Label>Login</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="login"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      {/* <option value=">">&gt;</option>
                      <option value="<">&lt;</option>
                      <option value="<=">&le;</option>
                      <option value=">=">&ge;</option> */}
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
                      name="login"
                      value={this.state.login}
                      onBlur={this.onBlurHandler}
                  
                    />
                  </Col>


                  <Col></Col>
                  <Col>
                    <Label>Name</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="cusername"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      {/* <option value=">">&gt;</option>
                      <option value="<">&lt;</option>
                      <option value="<=">&le;</option>
                      <option value=">=">&ge;</option> */}
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
                      name="cusername"
                      value={this.state.cusername}
                      onBlur={this.onBlurHandler}
                      // onBlur={() => this.onBlurHandler("idReference")}
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "5px" }}>
                  <Col>
                    <Label>Firstname</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="firstName"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      {/* <option value=">">&gt;</option>
                      <option value="<">&lt;</option>
                      <option value="<=">&le;</option>
                      <option value=">=">&ge;</option> */}
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
                      name="firstName"
                      value={this.state.firstName}
                      onBlur={this.onBlurHandler}
                      // onBlur={() => this.onBlurHandler("idReference")}
                    />
                  </Col>
                  <Col></Col>
                  <Col>
                    <Label>Status</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="status"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value=">">&gt;</option>
                      <option value="<">&lt;</option>
                      <option value="<=">&le;</option>
                      <option value=">=">&ge;</option>
                      {/* <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option> */}
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      {/* <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option> */}
                    </Input>
                  </Col>
                  <Col>
                    {" "}
                    <Input
                    type="select"
                    name="status"
                    id="exampleSelect"
                    value={this.state.value}
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  >
                    {" "}
                    <option value="">---select-----</option>
                    <option value="200">Valid</option>
                      <option value="100">Invalid</option>
                  </Input>
                    {/* <Input
                      bsSize="sm"
                      type="select"
                      onChange={this.inputChangeHandler}
                      name="status"
                      value={this.state.status}
                      onBlur={this.onBlurHandler}
                    >
                      <option value="200">    </option>
                       <option value="200">Valid</option>
                      <option value="100">Invalid</option>
                      </Input> */}
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "5px" }}>
                  <Col>
                    <Label>Expiry Date  </Label>{"    "}
                  </Col>
                  <Col>
                    {"   "}
                    <Input
                      type="select"
                      name="expiryDate"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value=">">&gt;</option>
                      <option value="<">&lt;</option>
                      <option value="<=">&le;</option>
                      <option value=">=">&ge;</option>
                      <option value="for">for</option>
                      <option value="until">until</option>
                      {/* <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option> */}
                    </Input>
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="date"
                      onChange={this.inputChangeHandler}
                      name="expiryDate"
                      value={this.state.expiryDate}
                      onBlur={this.onBlurHandler}
                      bsSize="sm"
                      // onBlur={() => this.onBlurHandler("idReference")}
                    >
                      {/* <option></option>
                      <option></option> */}
                      </Input>
                  </Col>
                  <Col></Col>
                  <Col>
                    <Label>Language</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="defaultLanguage"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      {/* <option value=">">&gt;</option>
                      <option value="<">&lt;</option>
                      <option value="<=">&le;</option>
                      <option value=">=">&ge;</option>
                      <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option> */}
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      {/* <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option> */}
                    </Input>
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      bsSize="sm"
                      type="select"
                      onChange={this.inputChangeHandler}
                      name="defaultLanguage"
                      value={this.state.defaultLanguage}
                      onBlur={this.onBlurHandler}
                      // onBlur={() => this.onBlurHandler("idReference")}
                    >
                       <option value="">---select-----</option>
                      {this.state.idLangArr.map(data=>
                         <option value={data.idLanguage}>{data.description}</option>
                        
                        )}
                     
                      
                      </Input>
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "5px" }}>
                  <Col>
                    <Label>Level</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="userLevel"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value=">">&gt;</option>
                      <option value="<">&lt;</option>
                      <option value="<=">&le;</option>
                      <option value=">=">&ge;</option>
                      {/* <option value="STARTS">STARTS_WITH</option>
                      <option value="CONTAINS">CONTAINS</option> */}
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      {/* <option value="MATCHES">MATCHES</option>
                      <option value="NOT MATCHES">NOT_MATCHES</option> */}
                    </Input>
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      bsSize="sm"
                      type="select"
                      onChange={this.inputChangeHandler}
                      name="userLevel"
                      value={this.state.userLevel}
                      onBlur={this.onBlurHandler}
                      // onBlur={() => this.onBlurHandler("idReference")}
                    >
                      <option value="">---select-----</option>
                      <option value="100">user</option>
                      <option value="200">Administrator</option>
                      <option value="300">Super Administrator</option>
                      </Input>
                  </Col>
                  <Col></Col>
                  <Col>
                    <Label>Catagory</Label>{" "}
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
                      {/* <option>---select---</option> */}
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
                    value={this.state.category}
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  >
                    {" "}
                    <option value="">---select-----</option>
                    <option value="200">common</option>
                      <option value="100">system</option>
                  </Input>
                    {/* <Input
                      bsSize="sm"
                      type="select"
                      onChange={this.inputChangeHandler}
                      name="category"
                      value={this.state.category}
                      onBlur={this.onBlurHandler}
                    >
                      <option value="200">     </option>
                      <option value="200">common</option>
                      <option value="100">system</option>
                      </Input> */}
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
                      bsSize="sm"
                      value="<="
                      readOnly
                      >&le;
                       style={{ width: "50px" }}

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
                  <Button type='reset'>Reset Criteria</Button>{" "}
                  <Button
                    onClick={
                      this.criteriaFilterMethodForUsers
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