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
import {
    IoArrowBackCircleSharp,
    IoArrowForwardCircleSharp,
  } from "react-icons/io5";
  import { FcSearch } from "react-icons/fc";
import MasterMissionList from './MasterMissionList';
import { MasterMissionCriteriaHandler, MasterMissionData, MasterMissionHandler } from '../../../../../store//Store';
import axios  from "axios";
import { properties } from '../../../../../Properties/Properties';

const getListOfMasterMissionByFilterCriteria = properties.Port + properties.getListOfMasterMissionByFilterCriteria
const getWarehousesForPhysicalgate = properties.Port + properties.getWarehousesForPhysicalgate
class MasterMissionFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {
          missionMasterList: false,
          data: [],
          limit: "",
              attribute: null,
              operation: "=",
              value: null,
               idMission: "",
               idWarehouseList:[],
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
              typeContainerChoice:"",
              idProduct:"" ,
            description:"" ,
              zIMC:"" ,
              zGrade :"",
              pcreationDate:"",
               listFilterBean: [],
               palletToTake:'',
               encode:'',
               originMasters:'',
               idMissionAM: "",
               zIdLocationOriginMaster:'',
               idTargetMisDistr: '',
               zIdContainerMaster: "",
               zIdContainerSelected1: "",
               zIdContainerSelected2: "",
               zIdContainerSelected3: "",
               zIdContainerSelected4: "",
               zIdContainerSelected5: "",
               zIdContainerSelected6: "",
               versionLock: '',
               idMission: '',
               numMission: '',
               idWarehouseFrom: '',
               idWarehouseTo: '',
               idLocationStkDisplay: '',
               priority: '',
               statusMission: '',
               mDate: '',
               mUsername: '',
               klsVersionLock: '',
               creationDate: '',
               userTreatLogin: "",
               zSabicDelivId: '',
               zSabicOrderId: '',
               zSkDelivId: '',
               zSkOrderId: '',
               idPrepOrder: '',
      }
    }

    limitchangehandler = (event) => {
      if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
        this.setState({
          [event.target.name]: event.target.value,
        });
      } else {
      }
    };
    getIdWarehouseList = () => {
      console.log("calling region from dropdown", this.state.idWarehouseList) 
      axios.get(getWarehousesForPhysicalgate)
  
        .then((response) => {
          if (response.status === 200 && response.data.length !== 0) {
            console.log("resposne success uzmmmmmaaaa", response.data);
            this.setState({
              idWarehouseList: response.data,
            });
  
          } else {
            this.setState({
              idWarehouseList: [],
            });
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  

    criteriaFilterMethod = () => {
      console.log("testtttttttttttttt  api ");
      const criteria = {
        listFilterBean: this.state.listFilterBean,
        limit: this.state.limit,
      };
      axios
        .post(
          getListOfMasterMissionByFilterCriteria, this.state,
          {
            params: {
              limit: this.state.limit,
            },
          }
        )
        // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
        .then((response) => {
          if (response.status === 200 ) {
            console.log("resposne success", response.data);
            this.setState({
              data: response.data,
              missionMasterList: true,
            });
            MasterMissionHandler(response.data);
            MasterMissionCriteriaHandler(criteria);
          } else {
            this.setState({
              missionMasterList: true,
              data: [],
            });
            MasterMissionHandler(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    componentDidMount=()=>{
      console.log("testing api trailer release calling")
      this.getIdWarehouseList();

      }
      
      submitHandler=()=>{
        console.log("submitHandler calling")
      
      }
      
      
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
                value: this.state.idLocation,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idLocation;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "statusMission") {
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
          if (criteria.target.name === "zIdLocationOriginMaster") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.zIdLocationOriginMaster,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.zIdLocationOriginMaster;
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
                value: this.state.idLocationStkDisplay,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idLocationStkDisplay;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
          if (criteria.target.name === "idPrepOrder") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.idPrepOrder,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idPrepOrder;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
    
          if (criteria.target.name === "zSabicOrderId") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.zSabicOrderId,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.zSabicOrderId;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
    
          if (criteria.target.name === "zSkDelivId") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.zSkDelivId,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.zSkDelivId;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
    
          if (criteria.target.name === "zSkOrderId") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.zSkOrderId,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.zSkOrderId;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
    
    
    
          if (criteria.target.name === "zSabicDelivId") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.zSabicDelivId,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.zSabicDelivId;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
    

          if (criteria.target.name === "idWarehouseTo") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.idWarehouseTo,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idWarehouseTo;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
    
          if (criteria.target.name === "idWarehouseFrom") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.idWarehouseFrom,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idWarehouseFrom;
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
          listFilterBean: [],
    
        });
      };
    

      backHandler=()=>{
        console.log("calling back handler")
        this.setState({
          missionMasterList: false
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
              {MasterMissionData.length !== 0 || this.state.missionMasterList === true ? (
                <MasterMissionList backHandler={this.backHandler} data={this.state.data} />
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
                        <a>Master Missions Criteria</a>
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
                      <Label>Warehouse From</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="idWarehouseFrom"
                    id="idWarehouseFrom"
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
                    type="select"
                    onChange={this.inputChangeHandler}
                    name="idWarehouseFrom"
                    value={this.state.idWarehouseFrom}
                    onBlur={this.onBlurHandler}
                    >
                    <option value="">---select---</option>
                    {this.state.idWarehouseList.map(data => <option value={data.idWarehouse} key={data.idWarehouse}>{data.description}</option>)}
                  </Input>
                    </Col>
    
                    <Col> </Col>
                    <Col>
                      <Label>Warehouse To</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="idWarehouseTo"
                    id="idWarehouseTo"
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
                    type ="select"
                    name="idWarehouseTo"
                    value={this.state.idWarehouseTo}
                    onBlur={this.onBlurHandler}
                    >
                       <option value="">---select---</option>
                      {this.state.idWarehouseList.map(data => <option value={data.idWarehouse} key={data.idWarehouse}>{data.description}</option>)}
                    </Input>
                  
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Mission No </Label>{" "}
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
    
                    <Col></Col>
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
                      <Label>Status</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="statusMission"
                    id="statusMission"
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
                    name="statusMission"
                    id="statusMission"
                    value={this.state.statusMission}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option>---select---</option>
                    <option value="100">_Created _ </option>
                    <option value="200">_Cancelled_</option>
                    <option value="300">_Executable_ </option>
                    <option value="400">_Executed_</option>
                    
                    
                  </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>User Treat</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="userTreatLogin"
                        id="userTreatLogin"
                        onChange={this.changeHandler}

                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option>=</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        name="userTreatLogin"
                        value={this.state.userTreatLogin}
                        onBlur={this.onBlurHandler}
                        
                      />
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
                    name="zIdLocationOriginMaster"
                    id="zIdLocationOriginMaster"
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
                    name="zIdLocationOriginMaster"
                    value={this.state.zIdLocationOriginMaster}
                    onBlur={this.onBlurHandler}
                    
                  />
                    </Col>
    
                    <Col></Col>
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
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Preparation Order Id</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idPrepOrder"
                        id="exampleSelect"
                        onChange={this.changeHandler}

                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option>=</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input
                          bsSize="sm"
                          onChange={this.inputChangeHandler}
                          name="idPrepOrder"
                          value={this.state.idPrepOrder}
                          onBlur={this.onBlurHandler}
                          
                       >
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Sabic Order Id</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="zSabicOrderId"
                        id="exampleSelect"
                        onChange={this.changeHandler}

                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option>=</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        name="zSabicOrderId"
                        value={this.state.zSabicOrderId}
                        onBlur={this.onBlurHandler}
                        
                      
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Sabic Delivery Id</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="zSabicDelivId"
                        id="exampleSelect"
                        onChange={this.changeHandler}

                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option>=</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input
                          bsSize="sm"
                          onChange={this.inputChangeHandler}
                          name="zSabicDelivId"
                          value={this.state.zSabicDelivId}
                          onBlur={this.onBlurHandler}
                          
                      >

                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Saudi Kayan Order Id</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="zSkOrderId"
                        id="exampleSelect"
                        onChange={this.changeHandler}

                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option>=</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input 
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        name="zSkOrderId"
                        value={this.state.zSkOrderId}
                        onBlur={this.onBlurHandler}
                        
                      
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Saudi Kayan Delivery Id</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="zSkDelivId"
                        id="exampleSelect"
                        onChange={this.changeHandler}

                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option>=</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      <Input

                       bsSize="sm"
                    onChange={this.inputChangeHandler}
                    name="zSkDelivId"
                    value={this.state.zSkDelivId}
                    onBlur={this.onBlurHandler}
                    >
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      {/* <Label>Sabic Order Id</Label>{" "} */}
                    </Col>
                    <Col>
                      {" "}

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

                    </Col>
                    <Col>
                      {" "}
                      {/* <Input bsSize="sm" /> */}
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

export default MasterMissionFilter;