import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
    Button,
  } from "reactstrap";
import AccessList from './AccessList';
import { AccessData, AccessHandler, CellAccessCriteriaHandler } from '../../../../../store/Store';
import axios  from "axios";
import { properties } from '../../../../../Properties/Properties';

const getListOfCellAccessByFilterCriteria = properties.Port + properties.getListOfCellAccessByFilterCriteria
const getListOfAllRegionsWarehouseDescription = properties.Port + properties.getListOfAllRegionsWarehouseDescription
const getListOfProfileFamily = properties.Port + properties.getListOfProfileFamily
const getListOfDescription = properties.Port + properties.getListOfDescription
class AccessFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {
        limit: "",
          locationList: false,
          allocationCell: '',
          availability: '',
          descCellRack: '',
          descColumn: '',
          descIndex: '',
          descLevel: '',
          descRegion: '',
          description: '',
          idCell: '',
          idLocationStk: '',
          idProfilFamily: '',
          idRegionCellLS: '',
          idWarehouse: '',
          listFilterBean: [],
          descAisle:'',
          attribute: null,
          operation: "=",
          value: null,
           
          mDate: '',
          mDateLoc: '',
          mUsername: '',
          mUsernameLoc: '',
          typeCell: '',
          useLocation: '',
          weight: '',
          criteria: "",
          passedcriteria: "",
          idRegion:'',
          operation: "=",
          allRegionDesc:[],
          
          cellDescArr:[],
          familyProArr:[],
      }
    }

    resetdata=()=>{
      this.setState({
        limit: "",
        allocationCell: '',
        availability: '',
        descCellRack: '',
        descColumn: '',
        descIndex: '',
        descLevel: '',
        descRegion: '',
        description: '',
        idCell: '',
        idLocationStk: '',
        idProfilFamily: '',
        idRegionCellLS: '',
        idWarehouse: '',
        listFilterBean: [],
        descAisle:'',
        attribute: null,
        operation: "=",
        value: null,
        mDate: '',
        mDateLoc: '',
        mUsername: '',
        mUsernameLoc: '',
        typeCell: '',
        useLocation: '',
        weight: '',
        criteria: "",
        passedcriteria: "",
        idRegion:'',
        operation: "=",
        // allRegionDesc:[],
        
        // cellDescArr:[],
        // familyProArr:[],
      })
    }

    componentDidMount(){

      this.getListOfAllRegionsWarehouseDescription()
      this.getListOfCellModelDescription()
      this.getListOfProfileFamily()
    }

      criteriaFilterMethod = () => {
        console.log("testtttttttttttttt  api ");
        const criteria = {
          listFilterBean: this.state.listFilterBean,
          limit: this.state.limit,
        };
        axios
          .post(getListOfCellAccessByFilterCriteria, this.state, {
            params: {
              limit: this.state.limit,
            },
          })
    
          .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success", response.data);
              this.setState({
                data: response.data,
                locationList: true,
              });
              AccessHandler(response.data)
             
              CellAccessCriteriaHandler(criteria);
            } else {
              this.setState({
                locationList: true,
                data: [],
              });
              AccessHandler(response.data)
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
        if (criteria.target.name === "idRegion") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idRegion,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idRegion;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "descRegion") {
          console.log("checking id refence", criteria.target.name);
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.descRegion,
            };
            this.state.listFilterBean.push(data);
            console.log("updataed if partttt", this.state.listFilterBean);
          } else {
            this.state.listFilterBean[index].value = this.state.descRegion;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "descAisle") {
          console.log("checking id refence", criteria.target.name);
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.descAisle,
            };
            this.state.listFilterBean.push(data);
            console.log("updataed if partttt", this.state.listFilterBean);
          } else {
            this.state.listFilterBean[index].value = this.state.descAisle;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
    
        if (criteria.target.name === "descColumn") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.descColumn,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.descColumn;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "descLevel") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.descLevel,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.descLevel;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "descIndex") {
          console.log("shahiddddddddd");
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.descIndex,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.descIndex;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "useLocation") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.useLocation,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.useLocation;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "typeCell") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.typeCell,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.typeCell;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "idCell") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idCell,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idCell;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "allocationCell") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.allocationCell,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.allocationCell;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "idProfilFamily") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idProfilFamily,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idProfilFamily;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "descCellRack") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.descCellRack,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.descCellRack;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
      } else {
        console.log("value is blank", index);
        this.state.listFilterBean.splice(index, 1);
        console.log("after splice", this.state.listFilterBean);
      }
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
      
      // submitHandler=()=>{
      //   console.log("submitHandler calling")
        
      //   axios
      //   .get("https://jsonplaceholder.typicode.com/posts")
      //   .then((response) => {
      //     if (response.status === 200) {
      //       console.log("resposne success", response.data);
      //        this.setState({
      //       data:response.data,
      //       locationList:true
      
      //       })
      
      //       AccessHandler(response.data)
            
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      
      // }
      

      getListOfAllRegionsWarehouseDescription=()=>{
        console.log("getListOfAllRegionsWarehouseDescription calling")
        
        axios
        .get(getListOfAllRegionsWarehouseDescription)
        .then((response) => {
          if (response.status === 200) {
            console.log("resposne success", response.data);
             this.setState({
           allRegionDesc: response.data
      
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
      
      }
      getListOfCellModelDescription=()=>{
        console.log("getListOfCellModelDescription calling")
        
        axios
        .get(getListOfDescription)
        .then((response) => {
          if (response.status === 200) {
            console.log("resposne success", response.data);
             this.setState({
           cellDescArr: response.data
      
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
      
      }

      getListOfProfileFamily=()=>{
        console.log("getListOfCellModelDescription calling")
        
        axios
        .get(getListOfProfileFamily)
        .then((response) => {
          if (response.status === 200) {
            console.log("resposne success", response.data);
             this.setState({
           familyProArr: response.data
      
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
      
      }
     
      
      backHandler=()=>{
        console.log("calling back handler by ibrahimmmmmmm")
        this.setState({
          limit: "",
          locationList: false,
          allocationCell: '',
          availability: '',
          descCellRack: '',
          descColumn: '',
          descIndex: '',
          descLevel: '',
          descRegion: '',
          description: '',
          idCell: '',
          idLocationStk: '',
          idProfilFamily: '',
          idRegionCellLS: '',
          idWarehouse: '',
          listFilterBean: [],
          descAisle:'',
          attribute: null,
          operation: "=",
          value: null,
          mDate: '',
          mDateLoc: '',
          mUsername: '',
          mUsernameLoc: '',
          typeCell: '',
          useLocation: '',
          weight: '',
          criteria: "",
          passedcriteria: "",
          idRegion:'',
          operation: "=",
          // allRegionDesc:[],
          
          // cellDescArr:[],
          // familyProArr:[],
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
              {AccessData.length !== 0 || this.state.locationList === true ? (
                <AccessList backHandler={this.backHandler} data={this.state.data} />
              ) : (
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
                        <a>Cells Accessibility Search</a>
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
                    <b style={{ marginLeft: "5px" }}>Stock Criteria</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Region</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idRegion"
                        id="exampleSelect"
                        onChange={this.changeHandler}
                        // style={{ width: "50px" }}
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
                        type="select"
                        name="idRegion"
                        id="exampleSelect"
                        value={this.state.idRegion}
                        onChange={this.inputChangeHandler}
                        onBlur={this.onBlurHandler}
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option></option>
                       {this.state.allRegionDesc.map(data=> <option value={data.idRegion}>{data.whDesc}</option>)}
                      </Input>
                    </Col>
    
                    <Col> </Col>
                    <Col>
                      <Label>Region</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="descRegion"
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
                      name='descRegion'
                      value={this.state.descRegion}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                      bsSize="sm" />
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Aisle</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name='descAisle'
                        onChange={this.changeHandler}
                        id="exampleSelect"
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
                       name='descAisle'
                       value={this.state.descAisle}
                       onChange={this.inputChangeHandler}
                       onBlur={this.onBlurHandler}
                      bsSize="sm" />
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Column</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="descColumn"
                        onChange={this.changeHandler}
                        id="exampleSelect"
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
                       name='descColumn'
                       value={this.state.descColumn}
                       onChange={this.inputChangeHandler}
                       onBlur={this.onBlurHandler}
                      bsSize="sm" />
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
                        name='descLevel'
                   
                       onChange={this.changeHandler}
                       
                        id="exampleSelect"
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
                         name='descLevel'
                         value={this.state.descLevel}
                         onChange={this.inputChangeHandler}
                         onBlur={this.onBlurHandler}
                        bsSize="sm"
                      />
                       
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Index</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="descLevel"
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
                       name='descLevel'
                       value={this.state.descLevel}
                       onChange={this.inputChangeHandler}
                       onBlur={this.onBlurHandler}
                       bsSize="sm" />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Use Location</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="useLocation"
                        onChange={this.changeHandler}
                        id="exampleSelect"
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
                        type="select"
                       
                        id="exampleSelect"
                        name='useLocation'
                        value={this.state.useLocation}
                        onChange={this.inputChangeHandler}
                        onBlur={this.onBlurHandler}
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                         <option></option>
                        <option value="300">_In out_</option>
                        <option value="400">_No access_</option>
                        
                       
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Accessibility</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="availability"
                        onChange={this.changeHandler}
                        id="exampleSelect"
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
                      name="availability"
                      value={this.state.availability}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                       bsSize="sm" />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Cell Description</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idCell"
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
                        type="select"
                        name="idCell"
                        // id="exampleSelect"
                        value={this.state.idCell}
                        onChange={this.inputChangeHandler}
                        onBlur={this.onBlurHandler}
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option></option>
                       {this.state.cellDescArr.map(data=> <option value={data.idCell}>{data.description}</option>)}
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Cell Type</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="typeCell"
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
                      <Input bsSize="sm"
                      type="select"
                      name="typeCell"
                      value={this.state.typeCell}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                      >
                      <option></option>
                        <option value="300">Goods-in</option>
                        <option value="400">Picking</option>
                        <option value="600">Preparation</option>
                        <option value="700">Shipping</option>
                        <option value="800">_Cubing_</option>
                        <option value="2000">_Destruction_</option>
                        <option value="900">_Launching_</option>
                        <option value="1100">_Logical reservation_</option>
                        <option value="200">_OverFlow_</option>
                        <option value="100">_Stock_</option>
                        <option value="500">_Transit_</option>
                      </Input>

                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Cell Allocation</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="allocationCell"
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
                        type="select"
                        name="allocationCell"
                        onChange={this.inputChangeHandler}
                        onBlur={this.onBlurHandler}
                        value={this.state.allocationCell}

                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option></option>
                        <option value="4">Manual</option>
                        <option value="3">Rack</option>
                        <option value="5">_Buffer Manual_</option>
                        <option value="6">_Dynamic_</option>
                        <option value="2">_Infinite</option>
                        <option value="1">_Standard_</option>
                        
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Family Profile</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idProfilFamily"
                        onChange={this.changeHandler}
                        id="exampleSelect"
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
                      <Input bsSize="sm"
                      type="select"
                      name="idProfilFamily"
                      value={this.state.idProfilFamily}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                      >
                      <option></option>
                       {this.state.familyProArr.map(data=> <option value={data.idProfile}>{data.desc}</option>)}
                      </Input>
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Rack Profile</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="descCellRack"
                        onChange={this.changeHandler}
                        id="exampleSelect"descCellRack
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
                        type="text"
                        name="descCellRack"
                        value={this.state.descCellRack}
                        onChange={this.inputChangeHandler}
                        onBlur={this.onBlurHandler}
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      {/* <Label>Sabic Order Id</Label>{" "} */}
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
                      {/* <Label>Sabic Order Id</Label>{" "} */}
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

                  
                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Button  onClick={this.resetdata}>Reset Criteria</Button>{" "}

                    <Button
                      onClick={
                       this.criteriaFilterMethod
                      }
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

export default AccessFilter;