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
import SitesList from './SitesList';
import { SitesData, SitesHandler, SitesCriteriaHandler } from '../../../store/Store';
import axios from "axios";
import { properties } from "../../../Properties/Properties";

const GetListOfSites =
  properties.Port + properties.GetListOfSites;
class SitesFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {
		limit: "",
		siteList: false,
		attribute: null,
		operation: "=",
		value: null,
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
		listFilterBean: [],
      }
    }
   
      
     
	   criteriaFilterMethod = () => {
 
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(GetListOfSites, this.state, {
        params: {
          limit: this.state.limit,
        },
      })

      .then((response) => {
        console.log("resposne Uzmaaaaaaaa", response);
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
            siteList: true,
          });
          SitesHandler(response.data);
          SitesCriteriaHandler(criteria);
        } else {
          console.log("elseeeeeeeeeee---->>>>>>>>>>>>>>>>>")
          this.setState({
            siteList: true,
            data: [],
          },()=>console.log("sitelist value",this.state.sitelist));
          // SitesHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
   changeHandler = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
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
      //  this.state.listFilterBean[index]
      console.log(
        "ELSE PARTTTTTT",
        (this.state.listFilterBean[index].operation = event.target.value)
      );
    }
    // this.state.listFilterBean[index] = {
    //   operation: event.target.value
    // }
    console.log("index AFTER UPDATE print", this.state.listFilterBean);
    // this.setState({
    //   attribute: event.target.name,
    //   operation: event.target.value
    // })
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
      if (criteria.target.name === "idSite") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.idSite,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.idSite;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "mUsername") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.mUsername,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.mUsername;
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
        console.log("id container calling");
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
        console.log("id container calling");
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
        console.log("id container calling");
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
        console.log("id container calling");
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
        console.log("id container calling");
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
      if (criteria.target.name === "siteNum") {
        console.log("id container calling");
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.siteNum,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.siteNum;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "phone") {
        console.log("id container calling");
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
        console.log("id container calling");
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
        console.log("id container calling");
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
      
      
    } else {
      console.log("repacking blur else line 448");
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
   		limit: "",
		siteList: false,
		attribute: null,
		operation: "=",
		value: null,
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
		listFilterBean: [],
	  
      });
  };
  backHandler = () => {
    console.log("calling back handler");
	 this.setState({
    	limit: "",
		siteList: false,
		attribute: null,
		operation: "=",
		value: null,
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
		listFilterBean: [],
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
              {SitesData.length !== 0 || this.state.siteList === true ?
               
                <SitesList backHandler={this.backHandler} 
                data={this.state.data} />
              
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
                        <a>Sites Search</a>
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
                    name="idSite"
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
                    name="idSite"
                    value={this.state.idSite}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("idSite")}
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
                    name="mUsername"
                    id="exampleSelect"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    {/* <option>---select---</option> */}
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    {/* <option value=">">&gt;</option> */}
                    {/* <option value="<">&lt;</option> */}
                    {/* <option value="<=">&le;</option> */}
                    {/* <option value=">=">&ge;</option> */}
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
                    name="mUsername"
                    value={this.state.mUsername}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("mUsername")}
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
                    name="postCode"
                    value={this.state.postCode}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("postCode")}
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
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    {/* <option>---select---</option> */}
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    {/* <option value=">">&gt;</option> */}
                    {/* <option value="<">&lt;</option> */}
                    {/* <option value="<=">&le;</option> */}
                    {/* <option value=">=">&ge;</option> */}
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
                    name="town"
                    value={this.state.town}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("town")}
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
                    name="countryCode"
                    value={this.state.countryCode}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("countryCode")}
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
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    {/* <option>---select---</option> */}
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    {/* <option value=">">&gt;</option> */}
                    {/* <option value="<">&lt;</option> */}
                    {/* <option value="<=">&le;</option> */}
                    {/* <option value=">=">&ge;</option> */}
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
                    name="country"
                    value={this.state.country}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("country")}
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
                    name="address1"
                    value={this.state.address1}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("address1")}
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
                    name="address2"
                    value={this.state.address2}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("address2")}
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
                    name="address3"
                    value={this.state.address3}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("address3")}
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
                    name="address4"
                    value={this.state.address4}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("address4")}
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
                    name="siteNum"
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
                    <option value="CONTAINS">CONTAINS</option>
                    <option value="AMONG">AMONG</option>
                    <option value="NOT AMONG">NOT_AMONG</option>
                    <option value="MATCHES">MATCHES</option>
                    <option value="NOT MATCHES">NOT_MATCHES</option> */}
                  </Input>
                    </Col>
                     <Col>
                  {" "}
                 <Input
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    name="siteNum"
                    value={this.state.siteNum}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("siteNum")}
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
                    name="phone"
                    value={this.state.phone}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("phone")}
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
                    name="fax"
                    value={this.state.fax}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("fax")}
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
                    name="email"
                    value={this.state.email}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("email")}
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
                    <Button onClick={this.resetdata}>Reset Criteria</Button>{" "}
                    <Button
                     onClick={this.criteriaFilterMethod}
                    >
                      {" "}
                      Display
                    </Button>
                  </div>
                </div>
              )}
            </Container>
          </React.Fragment>
        );
    }
}

export default SitesFilter;