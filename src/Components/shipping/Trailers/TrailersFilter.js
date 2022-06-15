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
import TrailersList from './TrailersList';
import { TrailersData,TrailerCriteriaHandler, TrailersFilterHandler } from '../../../store/Store';
import axios from "axios";
import { properties } from '../../../Properties/Properties';
const getListOfAllWarehouse = properties.Port + properties.getListOfAllWarehouse

// const getWarehousesForPhysicalgate = properties.Port + properties.getWarehousesForPhysicalgate
const listofTrailerExitViewbyFilter = properties.Port + properties.listofTrailerExitViewbyFilter

class TrailersFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {
        limit:"",
        trailsList: false,
        consolidationAreaPosition: "",
          driverName: "",
          expectedContainerNumber: "",
          expr1: "",
          height: "",
          idCarrier: "",
          idCompany: "",
          idContainer: "",
          idContainerFather: "",
          idContainerPrpSilo: "",
          idContainerSH: "",
          idContainerShClient: "",
          idDm: "",
          idGateLoaded: "",
          idLocation: "",
          idPackaging: "",
          idPoSingle: "",
          idPrepLineN3: "",
          idPrepOrder: "",
          idRecordingGate: "",
          idWarehouse: "",
          idWaveSingle: "",
          idWave:"",
          idship: "",
          incomingDate: "",
          mDate: "",
          mUsername: "",
          outgoingDate: "",
          rfidTag: "",
          sapId: "",
          statusClient: "",
          statusContainer: "",
          statusPO: "",
          statusSH: "",
          statusShipping: "",
          statusWeighing: "",
          trailerIdentification: "",
          trailerNumber: "",
          trailerPreparationType: "",
          trailerType: "",
          typeContainer: "",
          typePalFather: "",
          typePalletisation: "",
          versionLock: "",
          weight: "",
          attribute: null,
         operation: "=",
        value: null,
        idWarehouseArr: [],
        listFilterBean:[],
        
        // idWarehouse:"",
        // sapId:"",
        // idWaveSingle:"",
        // consolidationAreaPosition: "",
        // driverName: "",
        // expectedContainerNumber: "",
        // height: "",
        // idCarrier: "",
        // idCompany: "",
        // idContainer: "",
        // idContainerFather: "",
        // idContainerPrpSilo: "",
        // idContainerSh: "",
        // idContainerShClient: "",
        // idDm: "",
        // idGateLoaded: "",
        // idLocation: "",
        // idPackaging: "",
        // idPoSingle: "",
        // idPrepLineN3: "",
        // idPrepOrder: "",
        // idRecordingGate: "",
        // idShip: "",
        // incomingDate: "",
        // attribute: null,
        // operation: "=",
        // value: null,
        // mDate: "",
        // musername: "",
        // outgoingDate: "",
        // rfidTag: "",
        // seal: "",
        // statusClient: "",
        // statusContainer: "",
        // statusSh: "",
        // statusWeighing: "",
        // trailerIdentification: "",
        // trailerNumber: "",
        // trailerPreparationType: "",
        // trailerType: "",
        // typeContainer: "",
        // typePalFather: "",
        // typePalettisation: "",
        // versionLock: "",
        // idWarehouseList:[],
        // listFilterBean:[],
        // weight:""
      }
            }
          
    componentDidMount=()=>{
      console.log("testing api trailer release calling")
      this.getListOfAllWarehouse();

      }

      getListOfAllWarehouse = () => {
        console.log("getListOfAllWarehouse calling")
    
        axios
          .get(getListOfAllWarehouse)
          .then((response) => {
            if (response.status === 200) {
              console.log("resposne success for warehouse", response.data);
              this.setState({
                // message: "Data Saved Successfully",
                idWarehouseArr: response.data
              });
    
            }
          })
          .catch((error) => {
            console.log(error);
          });
    
      }
      
      // getIdWarehouseList = () => {
      //   console.log("calling region from dropdown", this.state.idWarehouseList) 
      //   axios.get(getWarehousesForPhysicalgate)
    
      //     .then((response) => {
      //       if (response.status === 200 && response.data.length !== 0) {
      //         console.log("resposne success uzmmmmmaaaa", response.data);
      //         this.setState({
      //           idWarehouseList: response.data,
      //         });
    
      //       } else {
      //         this.setState({
      //           idWarehouseList: [],
      //         });
              
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // };
      criteriaFilterMethod = () => {
        console.log("testtttttttttttttt  api ");
        const criteria = {
          listFilterBean: this.state.listFilterBean,
          limit: this.state.limit,
        };
        axios
          .post(listofTrailerExitViewbyFilter, this.state, {
            params: {
              limit: this.state.limit,
            },
          })
          .then((response) => {
            console.log("uzzzzzzmmmmmaaaaaa=========>")
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success ______________________________", response.data);
              this.setState({
                data: response.data,
                trailsList: true,
              });
              TrailersFilterHandler(response.data);
              TrailerCriteriaHandler(criteria);
            } else {
              this.setState({
                trailsList: true,
                data: [],
                
                
              });
            
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };



     
      changeHandler = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        console.log("index BEFORE trailersssss   print", this.state.listFilterBean);
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
        console.log("index AFTER trailersssssss print", this.state.listFilterBean);
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
    
        if (criteria.target.name === "idWarehouse") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idWarehouse,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idWarehouse;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "sapId") {
          console.log("checking idsap", criteria.target.name);
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.sapId,
            };
            this.state.listFilterBean.push(data);
            console.log("updataed if partttt", this.state.listFilterBean);
          } else {
            this.state.listFilterBean[index].value = this.state.sapId;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "idPrepOrder") {
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

        if (criteria.target.name === "idWave") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idWave,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idWave;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }


        if (criteria.target.name === "trailerType") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.trailerType,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.trailerType;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "trailerPreparationType") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );

          
          if (index === -1) {
            // console.log("please remove after clone")
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.trailerPreparationType,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.trailerPreparationType;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "rfidTag") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.rfidTag,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.rfidTag;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }


        if (criteria.target.name === "trailerNumber") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.trailerNumber,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.trailerNumber;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "idRecordingGate") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idRecordingGate,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idRecordingGate;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "idContainerShClient") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idContainerShClient,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idContainerShClient;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "statusClient") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.statusClient,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.statusClient;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
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
    
      
      resetdata = () => {
        this.setState({
          limit:"",
        trailsList: false,
        consolidationAreaPosition: "",
          driverName: "",
          expectedContainerNumber: "",
          expr1: "",
          height: "",
          idCarrier: "",
          idCompany: "",
          idContainer: "",
          idContainerFather: "",
          idContainerPrpSilo: "",
          idContainerSH: "",
          idContainerShClient: "",
          idDm: "",
          idGateLoaded: "",
          idLocation: "",
          idPackaging: "",
          idPoSingle: "",
          idPrepLineN3: "",
          idPrepOrder: "",
          idRecordingGate: "",
          idWarehouse: "",
          idWaveSingle: "",
          idWave:"",
          idship: "",
          incomingDate: "",
          mDate: "",
          mUsername: "",
          outgoingDate: "",
          rfidTag: "",
          sapId: "",
          statusClient: "",
          statusContainer: "",
          statusPO: "",
          statusSH: "",
          statusShipping: "",
          statusWeighing: "",
          trailerIdentification: "",
          trailerNumber: "",
          trailerPreparationType: "",
          trailerType: "",
          typeContainer: "",
          typePalFather: "",
          typePalletisation: "",
          versionLock: "",
          weight: "",
          attribute: null,
         operation: "=",
          value: null, 
          listFilterBean:[],


        })
      }
      
      
      backHandler=()=>{
        console.log("calling back handler")
        this.setState({
          limit:"",
          trailsList: false,
          consolidationAreaPosition: "",
            driverName: "",
            expectedContainerNumber: "",
            expr1: "",
            height: "",
            idCarrier: "",
            idCompany: "",
            idContainer: "",
            idContainerFather: "",
            idContainerPrpSilo: "",
            idContainerSH: "",
            idContainerShClient: "",
            idDm: "",
            idGateLoaded: "",
            idLocation: "",
            idPackaging: "",
            idPoSingle: "",
            idPrepLineN3: "",
            idPrepOrder: "",
            idRecordingGate: "",
            idWarehouse: "",
            idWaveSingle: "",
            idWave:"",
            idship: "",
            incomingDate: "",
            mDate: "",
            mUsername: "",
            outgoingDate: "",
            rfidTag: "",
            sapId: "",
            statusClient: "",
            statusContainer: "",
            statusPO: "",
            statusSH: "",
            statusShipping: "",
            statusWeighing: "",
            trailerIdentification: "",
            trailerNumber: "",
            trailerPreparationType: "",
            trailerType: "",
            typeContainer: "",
            typePalFather: "",
            typePalletisation: "",
            versionLock: "",
            weight: "",
            attribute: null,
           operation: "=",
            value: null, 
            listFilterBean:[],
  

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
              {TrailersData.length!== 0 || this.state.trailsList === true ? (
                <TrailersList backHandler={this.backHandler} data={this.state.data}/>
              ) : (
                <div>
                  <IoArrowBackCircleSharp />
                  <IoArrowForwardCircleSharp />
                  <FcSearch style={{ marginLeft: "5px" }} />
                  <span>
                    {" "}
                    <u>
                      {" "}
                      <b>
                        <a>Home</a>
                      </b>
                    </u>{" "}
                    &#8680;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Trailer</a>
                      </b>
                    </u>
                  </span>
                  <br />
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Containers Criteria</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Warehouse</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "50px" }}
                        bsSize="sm"
                        onChange={this.changeHandler}
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
                        name="idWarehouse"
                        id="idWarehouse"
                        // style={{ width: "60px" }}
                        value={this.state.idWarehouse}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >
                       <option value="">---select---</option>
                      {this.state.idWarehouseArr.map(data => <option value={data.idWarehouse} key={data.idWarehouse}>{data.description}</option>)}
                      </Input>
                    </Col>
    
                    <Col> </Col>
                    <Col>
                      <Label>ID</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="select"
                        id="idContainerSh"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                        onChange={this.changeHandler}
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
                      
                      bsSize="sm"
                        onChange={this.inputChangeHandler}
                        name="idContainerShClient"
                        value={this.state.idContainerShClient}
                        onBlur={this.onBlurHandler} />
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label>SAP id</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="sapId"
                        id="sapId"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                        onChange={this.changeHandler}
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
                                              
                        onChange={this.inputChangeHandler}
                        name="sapId"
                        value={this.state.sapId}
                        onBlur={this.onBlurHandler}
                         bsSize="sm" />
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Preparation order id</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idPrepOrder"
                        id="idPrepOrder"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                        onChange={this.changeHandler}
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
                        bsSize="sm"
                         onChange={this.inputChangeHandler}
                         name="idPrepOrder"
                         value={this.state.idPrepOrder}
                        onBlur={this.onBlurHandler}
                         />
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label>Wave id</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idWave"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                        onChange={this.changeHandler}
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
                        bsSize="sm"
                       onChange={this.inputChangeHandler}
                      name="idWave"
                      value={this.state.idWave}
                       onBlur={this.onBlurHandler}
                      >
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Trailer type</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="trailerType"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                        onChange={this.changeHandler}
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
                       name="trailerType"
                       id="exampleSelect"
                       // style={{ width: "60px" }}
                       value={this.state.trailerType}
                       bsSize="sm"
                       onChange={this.inputChangeHandler}
                       // onBlur={() => this.onBlurHandler("company")}
                       onBlur={this.onBlurHandler}
                      >
                        <option value="">     </option>
                        <option value="50">Truck</option>
                        <option value="30">_20 And 40 feet Mixed_</option>
                        <option value="10">_20 Feet Container_</option>
                        <option value="60">_Bulk Truck_</option>
                        <option value="40">_Sea Bulk_</option>
                      </Input>
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Preparation type</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="trailerPreparationType"
                        id="trailerPreparationType"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                        onChange={this.changeHandler}
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
                        name="trailerPreparationType"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.trailerPreparationType}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >
                        <option value="">     </option>
                        <option value="100">_Plf_</option>
                        <option value="0">_STD_</option>

                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>RFID tag</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="rfidTag"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                        onChange={this.changeHandler}
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
                       bsSize="sm"
                       onChange={this.inputChangeHandler}
                       name="rfidTag"
                       value={this.state.rfidTag}
                         onBlur={this.onBlurHandler}
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Trailer number</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="trailerNumber"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                        onChange={this.changeHandler}
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
                           bsSize="sm"
                          onChange={this.inputChangeHandler}
                           name="trailerNumber"
                            value={this.state.trailerNumber}
                           onBlur={this.onBlurHandler}
                      >
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Recording gate</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idRecordingGate"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                        onChange={this.changeHandler}
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
                       name="idRecordingGate"
                       id="exampleSelect"
                       // style={{ width: "60px" }}
                       value={this.state.idRecordingGate}
                       bsSize="sm"
                       onChange={this.inputChangeHandler}
                       // onBlur={() => this.onBlurHandler("company")}
                       onBlur={this.onBlurHandler}
                      >
                        <option value="">    </option>
                        <option value="141">Gate Entrance 1</option>
                        <option value="7">Gate Remote Terminal</option>

                      </Input>
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Status</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="statusClient"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                        onChange={this.changeHandler}
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
                      name="statusClient"
                      id="exampleSelect"
                      // style={{ width: "60px" }}
                      value={this.state.statusClient}
                      bsSize="sm"
                      onChange={this.inputChangeHandler}
                      // onBlur={() => this.onBlurHandler("company")}
                      onBlur={this.onBlurHandler}
                      >
                        <option value="">     </option>
                        <option value="0">Created</option>
                        <option value="10">_Order Linked</option>
                        <option value="15">_Gate Allocated_</option>
                        <option value="20">_Site entrance Arrival_</option>
                        <option value="25">_Gate Arrival_</option>
                        <option value="30">_Begin Loaded_</option>
                        <option value="40">_Closed_</option>
                        <option value="45">_Stored_</option>
                        <option value="60">_Shipped to be confirmed_</option>
                        <option value="65">_At Plf_</option>
                        <option value="80">_Shipped_</option>
                        <option value="100">_Cancelled_</option>
                        <option value="110">_Destroyed_</option>
                      </Input>
                    </Col>
    
                    <Col></Col>
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
                    <Col> </Col>
                  </Row>

                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Button onClick={this.resetdata}>Reset Criteria</Button>{" "}
                    <Button
                      onClick={
                       this.criteriaFilterMethod
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

export default TrailersFilter;