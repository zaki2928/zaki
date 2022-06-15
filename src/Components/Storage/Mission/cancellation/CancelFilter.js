import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
    Button,
  } from "reactstrap";
import CancelList from './CancelList';
import { CancelData, CancelHandler, CancelCriteriaHandler, } from '../../../../store/Store';
import axios  from "axios";
import {properties} from "../../../../Properties/Properties"

const getListOfMissionKLSView = properties.Port + properties.getListOfMissionKLSView

class CancelFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {
          locationList: false, 
          data: [],
          limit: "",
          attribute: null,
          operation: "=",
          value: null,
           idMission: "",
           idResaContainer: "",
           idResaContent: "",
           missionIndex: "",
          missionMode: "",
          numMission: "",
           priority: "",
           typeMvt: "",
           useUnmarkedContainer: "",
           printable: "",
           statusMission: "",
           typeContainer: "",
           typeContainerChoice: "",
           typeDestinationChoice: "",
           mDate: "",
           creationDate: "",
           executionDate: "",
          startingDate: "",
          mUsername: "",
           userTreatLogin: "",
          idLocationStkDisplay: "",
           idLocationStk: "",
          idWarehouseFrom: "",
          idWarehouseTo: "",
          versionLock: "",
          allocationCell: "",
           typeCell: "",
           useLocation: "",
           idRegion: "",
           idRegionCell: "",
           idLocation: "",
          descIndex: "",
          height: "",
          length: "",
          width: "",
          idReservation: "",
           idMovement: "",
          missionClass: "",
          statusProgress: "",
          commentaryIc: "",
          cUsernameIc: "",
          wsNameIc: "",
          reference: "",
          idContainerStk: "",
          cDateIc: "",
          batch:"",
          description:"",
          idProduct:"",
          pcreationDate:"",
          zGrade:"",
          zIMC:"",
           listFilterBean: [],
    
      }
    }

   
      
      submitHandler=()=>{
        console.log("submitHandler calling")
        
        axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          if (response.status === 200) {
            console.log("resposne success", response.data);
             this.setState({
            data:response.data,
            locationList:true
      
            })
      
            CancelHandler(response.data)
            
          }
        })
        .catch((error) => {
          console.log(error);
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
    




      criteriaFilterMethod = () => {
        const criteria = {
          listFilterBean: this.state.listFilterBean,
          limit: this.state.limit,
        };

        axios
          .post(
            getListOfMissionKLSView,this.state,
            {
              params: {
                limit: this.state.limit,
              },
            }
          )
          // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
          .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success", response.data);
              this.setState({
                data: response.data,
                locationList: true,
              });
              CancelHandler(response.data);
              CancelCriteriaHandler(criteria);
            } else {
              this.setState({
                locationList: true,
                data: [],
              });
              CancelHandler(response.data);
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
            "inside else part",
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

      
      backHandler=()=>{
        console.log("calling back handler")
        this.setState({
          locationList: false
        })
      }


      inputChangeHandler = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      }




      onBlurHandler = (criteria) => {
        console.log("calling onBlurrrrr", criteria.target.name);
        console.log("calling onBlurrrrr", criteria.target.value);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        console.log("INDEX VALUE FOR IF PART IN ALUE", index);
      
        if (criteria.target.value !== "") {
          if (criteria.target.name === "idMission") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.idMission,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idMission;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "typeMvt") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.typeMvt,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.typeMvt;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "idLocation") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: '19@'.concat(this.state.idLocation),
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idLocation;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "idContainerStk") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.idContainerStk,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idContainerStk;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "idLocation") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: '19@'.concat(this.state.idLocation),
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idLocation;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "idLocationStkDisplay") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: '19@'.concat(this.state.idLocationStkDisplay),
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idLocationStkDisplay;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
          if (criteria.target.name === "missionClass") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.missionClass,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.missionClass;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
    
          if (criteria.target.name === "reference") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.reference,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.reference;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
    
          if (criteria.target.name === "zGrade") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.zGrade,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.zGrade;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
    
          if (criteria.target.name === "userTreatLogin") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.userTreatLogin,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.userTreatLogin;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
    
    
    
          if (criteria.target.name === "statusMission") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.statusMission,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.statusMission;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
    
          if (criteria.target.name === "creationDate") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.creationDate,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.creationDate;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
    
          if (criteria.target.name === "mDate") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.mDate,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.mDate;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
    
          if (criteria.target.name === "idProduct") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.idProduct,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idProduct;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
    
          if (criteria.target.name === "versionLock") {
            console.log("id container calling");
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
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          } 
          
          
    
          if (criteria.target.name === "batch") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.batch,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.batch;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          } 
    
    
          
        } else {
          console.log("repacking blur else line 448");
        }
      };
      






      resetdata = () => {
        console.log("reset handler");
        this.setState({
          data: [],
          isShow: false,
          limit: "",
          attribute: null,
          operation: "=",
          value: null,
           idMission: "",
           idResaContainer: "",
           idResaContent: "",
           missionIndex: "",
          missionMode: "",
          numMission: "",
           priority: "",
           typeMvt: "",
           useUnmarkedContainer: "",
           printable: "",
           statusMission: "",
           typeContainer: "",
           typeContainerChoice: "",
           typeDestinationChoice: "",
           mDate: "",
           creationDate: "",
           executionDate: "",
          startingDate: "",
          mUsername: "",
           userTreatLogin: "",
          idLocationStkDisplay: "",
           idLocationStk: "",
          idWarehouseFrom: "",
          idWarehouseTo: "",
          versionLock: "",
          allocationCell: "",
           typeCell: "",
           useLocation: "",
           idRegion: "",
           idRegionCell: "",
           idLocation: "",
          descIndex: "",
          height: "",
          length: "",
          width: "",
          idReservation: "",
           idMovement: "",
          missionClass: "",
          statusProgress: "",
          commentaryIc: "",
          cUsernameIc: "",
          wsNameIc: "",
          reference: "",
          idContainerStk: "",
          cDateIc: "",
          batch:"",
          description:"",
          idProduct:"",
          pcreationDate:"",
          zGrade:"",
          zIMC:"",
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
              {CancelData.length !== 0 || this.state.locationList === true ? (
                <CancelList backHandler={this.backHandler} data={this.state.data} />
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
                        <a>Mission Cancellation Search</a>
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
                      <Label>Mission Nos</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="idMission"
                    id="idMission"
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
                   
                  </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    name="idMission"
                    value={this.state.idMission}
                    onBlur={this.onBlurHandler}
                    
                  />
                    </Col>
    
                    <Col>
                      <Label>Movement Type</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="typeMvt"
                    id="typeMvt"
                    onChange={this.changeHandler}
                    
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
                    name="typeMvt"
                    id="typeMvt"
                    value={this.state.typeMvt}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option>---select---</option>
                    <option value="1">_Container Transfer_ </option>
                    <option value="2">_Quantity Picking_</option>
                    
                    
                  </Input> 
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Origin Location</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="idLocation"
                    id="idLocation"
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
                    name="idLocation"
                    value={this.state.idLocation}
                    onBlur={this.onBlurHandler}
                    
                  />
                    </Col>
    
                  
                    <Col>
                      <Label>Container Origin</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="idContainerStk"
                    id="idContainerStk"
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
                    name="idContainerStk"
                    value={this.state.idContainerStk}
                    onBlur={this.onBlurHandler}
                    
                  />
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Destination Location</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="idLocationStkDisplay"
                    id="idLocationStkDisplay"
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
                    name="idLocationStkDisplay"
                    value={this.state.idLocationStkDisplay}
                    onBlur={this.onBlurHandler}
                    
                  />
                    </Col>
    
                  
                    <Col>
                      <Label>Mission Class</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="missionClass"
                    id="missionClass"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    {/* <option>---select---</option> */}
                    <option value="=">=</option>
                  
                    <option value="AMONG">AMONG</option>
                    <option value="NOT AMONG">NOT_AMONG</option>
                   
                  </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="missionClass"
                    id="missionClass"
                    value={this.state.missionClass}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option>---select---</option>
                    <option value="1">_Order_ </option>
                    <option value="2">_Preparation_</option>
                    <option value="3">_Replishment_ </option>
                    <option value="4">_Preparation_</option>
                    <option value="5">_Box Replacement_ </option>
                    <option value="6">_Destruction_</option>
                    <option value="7">_Goods In_</option>
                    <option value="1">_Internal movement_ </option>
                    <option value="8">_Manufacturing_</option>
                    <option value="9">_Stock to prepare_</option>
                    
                    
                  </Input>
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Reference Class Mission</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="reference"
                    id="reference"
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
                    name="reference"
                    value={this.state.reference}
                    onBlur={this.onBlurHandler}
                    
                  />
                    </Col>
    
                    
                    <Col>
                      <Label>Batch</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="batch"
                    id="batch"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    {/* <option>---select---</option> */}
                    <option value="=">=</option>
                  
                    <option value="AMONG">AMONG</option>
                    <option value="NOT AMONG">NOT_AMONG</option>
                   
                  </Input>

                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="text"
                    name="batch"
                    id="batch"
                    value={this.state.batch}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  />
                   
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Reference Product</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="reference"
                    id="reference"
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
                    name="reference"
                    value={this.state.reference}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("description")}
                  />

                    </Col>
    
                   
                    <Col>
                      <Label>Grade</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="batch"
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
                    name="idFolder"
                    value={this.state.idFolder}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("description")}
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

export default CancelFilter;