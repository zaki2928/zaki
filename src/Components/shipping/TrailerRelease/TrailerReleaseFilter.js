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
import TrailerReleaseList from '../TrailerRelease/TrailerReleaseList';
import { TrailerReleaseFilterHandler, TrailerReleaseData } from "../../../store/Store";
import axios from "axios";
import { properties } from '../../../Properties/Properties';

const getListOfTrailerReleaseViewFilter = properties.Port + properties.getListOfTrailerReleaseViewFilter
const getListOfAllWarehouse = properties.Port + properties.getListOfAllWarehouse
const getListOfAllGatesKL = properties.Port + properties.getListOfAllGatesKL
class TrailerReleaseFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trailRelizList: false,
      data: [],
      consolidationAreaPosition: 0,
      containerNumber: 0,
      driverName: "",
      expectedContainerNumber: 0,
      idCompany: "",
      idContainerPrpSilo: '',
      idContainerSh: "",
      idContanerShCLient: "",
      idEmptyWeigthWb: '',
      idPrepLineN3: 0,
      idPrepOrder: "",
      idRecordingGate: 0,
      idSap: 0,
      idWeighingBridge: '',
      idWeightWb: '',
      id_carrier: "",
      id_container: "",
      id_dm: "",
      id_gate_loaded: 0,
      id_po_single: 0,
      id_ship: '',
      id_wave_single: 0,
      incomingDate: "",
      listFilterBean: [],

      attribute: '',
      operation: '',
      value: '',
      operation: "=",
      mDate: "",
      mUsername: "",
      outgoingDate: '',
      refidTagHistory: "",
      rfidTag: "",
      seal: '',
      statusClient: 0,
      statusWeighing: 0,
      status_sh: 0,
      totalContainerNumber: 0,
      trailerIdentification: "",
      trailerNumber: 0,
      trailerNumberHistory: 0,
      trailerPreparationType: 0,
      trailerType: 0,
      typeAssignmentRecGate: 0,
      type_pal_father: 0,
      type_palletisation: 0,
      versionLock: 0,
      wbEmptyWeight: 0,
      wbWeight: 0,
      idWarehouseArr: [],
      idGatesArr: [],
    }
  }
  componentDidMount = () => {
    console.log("testing api trailer release calling")
    this.getListOfAllWarehouse();
    this.getListOfAllGates();
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


  getListOfAllGates = () => {
    console.log("getListOfAllGatesKL calling")

    axios
      .get(getListOfAllGatesKL)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success for gates", response.data);
          this.setState({
            // message: "Data Saved Successfully",
            idGatesArr: response.data
          });

        }
      })
      .catch((error) => {
        console.log(error);
      });

  }


  // submitHandler = () => {
  //   console.log("submitHandler calling")

  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts")
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("resposne success", response.data);
  //         this.setState({
  //           data: response.data,
  //           trailRelizList: true

  //         })

  //         TrailerReleaseFilterHandler(response.data)

  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  // }


  backHandler = () => {
    console.log("calling back handler")
    this.setState({
      trailRelizList: false
    })
  }


  criteriaFilterMethod = () => {
    console.log("testtttttttttttttt  api  ibrahim");
    // const criteria = {
    //   listFilterBean: this.state.listFilterBean,
    //   limit: this.state.limit,
    // };
    axios
      .post(getListOfTrailerReleaseViewFilter, this.state.listFilterBean, {
        params: {
          limit: this.state.limit,
        },
      })

      .then((response) => {
        console.log("uzzzzzzmmmmmaaaaaa=========>")
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success++++++++++++", response.data);
          this.setState({
            data: response.data,
            trailRelizList: true,

          });
          TrailerReleaseFilterHandler(response.data)

          // CellAccessCriteriaHandler(criteria);
        } else {
          this.setState({
            trailRelizList: true,
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

    if (criteria.target.name === "idContanerShCLient") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.idContanerShCLient,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.idContanerShCLient;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "rfidTag") {
      console.log("checking id refence", criteria.target.name);
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
        console.log("updataed if partttt", this.state.listFilterBean);
      } else {
        this.state.listFilterBean[index].value = this.state.rfidTag;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "driverName") {
      console.log("checking id refence", criteria.target.name);
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.driverName,
        };
        this.state.listFilterBean.push(data);
        console.log("updataed if partttt", this.state.listFilterBean);
      } else {
        this.state.listFilterBean[index].value = this.state.driverName;
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
      trailRelizList: false,
      data: [],
      consolidationAreaPosition: 0,
      containerNumber: 0,
      driverName: "",
      expectedContainerNumber: 0,
      idCompany: "",
      idContainerPrpSilo: '',
      idContainerSh: "",
      idContanerShCLient: "",
      idEmptyWeigthWb: '',
      idPrepLineN3: 0,
      idPrepOrder: "",
      idRecordingGate: 0,
      idSap: 0,
      idWeighingBridge: '',
      idWeightWb: '',
      id_carrier: "",
      id_container: "",
      id_dm: "",
      id_gate_loaded: 0,
      id_po_single: 0,
      id_ship: '',
      id_wave_single: 0,
      incomingDate: "",
      listFilterBean: [],

      attribute: '',
      operation: '',
      value: '',
      operation: "=",
      mDate: "",
      mUsername: "",
      outgoingDate: '',
      refidTagHistory: "",
      rfidTag: "",
      seal: '',
      statusClient: 0,
      statusWeighing: 0,
      status_sh: 0,
      totalContainerNumber: 0,
      trailerIdentification: "",
      trailerNumber: 0,
      trailerNumberHistory: 0,
      trailerPreparationType: 0,
      trailerType: 0,
      typeAssignmentRecGate: 0,
      type_pal_father: 0,
      type_palletisation: 0,
      versionLock: 0,
      wbEmptyWeight: 0,
      wbWeight: 0, 
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
          {TrailerReleaseData.length !== 0 || this.state.trailRelizList === true ? (
            <TrailerReleaseList backHandler={this.backHandler} data={this.state.data} />
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
                    <a>Trailer Release Filter</a>
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
                <b style={{ marginLeft: "5px" }}>General Criteria</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Warehouse</Label>{" "}
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
                    name="idWarehouse"
                    value={this.state.idWarehouse}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option></option>
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
                    name="idContanerShCLient"
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
                      bsSize="sm"
                      onChange={this.inputChangeHandler}
                      name="idContanerShCLient"
                      value={this.state.idContanerShCLient}
                      onBlur={this.onBlurHandler}
                  
                    />
                </Col>
                <Col> </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Driver name</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="driverName"
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
                      bsSize="sm"
                      onChange={this.inputChangeHandler}
                      name="driverName"
                      value={this.state.driverName}
                      onBlur={this.onBlurHandler}
                  
                    />
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
                  <Label>Gate</Label>{" "}
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
                    name="idGate"
                    value={this.state.idGate}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option></option>
                    {this.state.idGatesArr.map(data => <option value={data.idGate} key={data.idGate}>{data.description}</option>)}
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

export default TrailerReleaseFilter;