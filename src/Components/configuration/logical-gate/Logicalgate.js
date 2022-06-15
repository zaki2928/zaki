import React, { Component } from "react";
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
import axios from "axios";
import { logicalgateData, logicalgateDataHandler, logicalphysicalgateCriteriaHandler} from "../../../store/Store";
import Logicalgatelist from "./Logicalgatelist";
import { properties } from "../../../Properties/Properties"

const getListOfLogicalGates = properties.Port + properties.getListOfLogicalGates
const getDescriptionListForLogicalGate = properties.Port + properties.getDescriptionListForLogicalGate
const getTypeAssignmentsForPhysicalgate = properties.Port + properties.getTypeAssignmentsForPhysicalgate
const getWarehousesForPhysicalgate = properties.Port + properties.getWarehousesForPhysicalgate


export default class Logicalfilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      limit: "",
      attribute: null,
      value: null,
      operation: "=",
      listFilterBean: [],
      alwaysAvailable: "",
      available: "",
      defaultGate: "",
      description: "",
      descriptionList:[],
      encode: "",
      gateNumber: "",
      idGate: "",
      idGateFather: "",
      idLocation: "",
      idSite: "",
      idWarehouse: "WH",
      idWarehouseList:[],
      mDate: "",
      mParent: {},
      mUsername: "",
      physical: "",
      statusGate: "",
      typeAssignment: "",
      typeAssignmentList:[],
      typeGate: "",
      versionLock: "",
    };
  }

  componentDidMount = () => {
    const data = [
      {
        attribute: "idWarehouse",
        operation: "=",
        value: "WH",
      },
      {
        attribute: "typeAssignment",
        operation: "=",
        value: 100,
      },
    ];

    console.log("testigggggggggg", data);
    this.setState(
      {
        listFilterBean: data,
      },
      console.log("zakiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii======>", this.state.listFilterBean)
    );
    this.getDescList();
    this.getTypeAssignList();
    this.getIdWarehouseList();

  }

  submithandler = () => {
    console.log("calling submit");
    if (this.state.warehouse === "WH") {
      this.getListofRegionforWH();
    } else {
      this.getListofRegionforRT();
    }
  };

  getDescList = () => {
    console.log("calling region from dropdown", this.state.descriptionList) 
    axios.get(getDescriptionListForLogicalGate)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            descriptionList: response.data,
          });

        } else {
          this.setState({
            descriptionList: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getTypeAssignList = () => {
    console.log("calling region from dropdown", this.state.typeAssignmentList) 
    axios.get(getTypeAssignmentsForPhysicalgate)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            typeAssignmentList: response.data,
          });

        } else {
          this.setState({
            typeAssignmentList: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getIdWarehouseList = () => {
    console.log("calling region from dropdown", this.state.idWarehouseList) 
    axios.get(getWarehousesForPhysicalgate)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
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

  logicalicalgateFilterMethod = () => {
    console.log("put get list url");
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(getListOfLogicalGates, this.state, {
        params: {
          limit: this.state.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
            isShow: true,
          });
          logicalgateDataHandler(response.data);
          logicalphysicalgateCriteriaHandler(criteria);
        } else {
          this.setState({
            isShow: true,
            data: [],
          });
          logicalgateDataHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


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

  getWarehousedata = (event) => {
    if (event.target.value === "RT1") {
      this.getListofRegionforRT();
    } else {
      this.getListofRegionforWH();
    }
  };

  onBlurHandler = (criteria) => {
    console.log("calling onBlurrrrr", criteria.target.name);
    console.log("calling onBlurrrrr", criteria.target.value);
    var index = this.state.listFilterBean.findIndex(
      (data) => data.attribute === criteria.target.name
    );
    console.log("INDEX VALUE FOR IF PART IN ALUE", index);

    if (criteria.target.value !== "") {
    if (criteria.target.name === "description") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.description,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.description;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "typeAssignment") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.typeAssignment,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.typeAssignment;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "idWarehouse") {
        this.getWarehousedata(criteria);
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
    }
    else {
      this.state.listFilterBean.splice(index,1)
    }
console.log("calling criteriaARRRR", this.state.listFilterBean);
this.setState({
  attribute: "",
  operation: "=",
});

}


  backHandler = () => {
    console.log("calling back handler")
    this.setState({
      isShow: false,
      limit: "",
      attribute: null,
      value: null,
      operation: "=",
      listFilterBean: [],
      alwaysAvailable: "",
      available: "",
      defaultGate: "",
      description: "",
      // descriptionList:[],
      encode: "",
      gateNumber: "",
      idGate: "",
      idGateFather: "",
      idLocation: "",
      idSite: "",
      idWarehouse: "WH",
      // idWarehouseList:[],
      mDate: "",
      mParent: {},
      mUsername: "",
      physical: "",
      statusGate: "",
      typeAssignment: "",
      // typeAssignmentList:[],
      typeGate: "",
      versionLock: "",
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

  refreshHandler=()=>{
    this.setState({
      isShow: false,
      limit: "",
      attribute: null,
      value: null,
      operation: "=",
      listFilterBean: [],
      alwaysAvailable: "",
      available: "",
      defaultGate: "",
      description: "",
      descriptionList:[],
      encode: "",
      gateNumber: "",
      idGate: "",
      idGateFather: "",
      idLocation: "",
      idSite: "",
      idWarehouse: "",
      idWarehouseList:[],
      mDate: "",
      mParent: {},
      mUsername: "",
      physical: "",
      statusGate: "",
      typeAssignment: "",
      typeAssignmentList:[],
      typeGate: "",
      versionLock: "",
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
          {logicalgateData.length !== 0 || this.state.isShow === true ? (
            <Logicalgatelist data={this.state.data} backHandler={this.backHandler}/>
          ) : (
            <div>
              
              <span>
                <u>
                  <b>
                    <a>Home</a>
                  </b>
                </u>{" "}
                &#62;{" "}
               
                <u>
                  <b>
                    <a>Logical Gate Search</a>
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
                  <Label>Description</Label>
                  </Col>
                  <Col>
                    <Input
                      type="select"
                      name="description"
                      id="description"
                      onChange={this.changeHandler}
                      bsSize="sm"
                    >
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                    </Input>
                  </Col>
                  <Col>
                    <Input
                       type="select"
                       name="description"
                       onChange={this.inputChangeHandler}
                      //  value={this.state.description}
                       onBlur={this.onBlurHandler}
                      bsSize="sm"
                    >
                      <option value="">---select---</option>
                      {this.state.descriptionList.map(data => <option value={data.description} key={data.description}>{data.description}</option>)}

                    </Input>
                  </Col>
                

                <Col>
                  <Label>Assignment</Label>
                  </Col>
                  <Col>
                    <Input
                      type="select"
                      name="typeAssignment"
                      onClick={this.changeHandler}
                      id="typeAssignment"
                      bsSize="sm"
                    >
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                    </Input>
                  </Col>
                  <Col>
                    <Input
                      type="select"
                      name="typeAssignment"
                      onChange={this.inputChangeHandler}
                      value={this.state.typeAssignment}
                      onBlur={this.onBlurHandler}
                      bsSize="sm"
                    >
                      {/* <option value="">---select---</option> */}
                      {this.state.typeAssignmentList.map(data => <option value={data.value} key={data.typeAssignment}>{data.description}</option>)}
                    </Input>
                  </Col>
                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Warehouse</Label>
                  </Col>
                  <Col>
                    <Input
                      type="select"
                      name="idWarehouse"
                      onClick={this.changeHandler}
                      id="idWarehouse"
                      bsSize="sm"
                    >
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                    </Input>
                  </Col>
                  <Col>
                    <Input
                      type="select"
                      name="idWarehouse"
                      onChange={this.inputChangeHandler}
                      value={this.state.idWarehouse}
                      onBlur={this.onBlurHandler}
                      bsSize="sm"
                    >
                      {/* <option value="">---select---</option> */}
                      {this.state.idWarehouseList.map(data => <option value={data.idWarehouse} key={data.idWarehouse}>{data.description}</option>)}
                      
                    </Input>
                  </Col>
                  <Col></Col>
                  <Col>
                  </Col>
                  <Col>
                  </Col>
               
              </Row>
              <br />

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
                    >&le;
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
                  
                </Row>

              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Button onClick={this.refreshHandler}>Reset Criteria</Button>
                <Button
                  onClick={this.logicalicalgateFilterMethod}
                  style={{ marginLeft: "5px" }}
                >
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
