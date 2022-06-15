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

import {
  TrailerAssociationdata,
  TrailerAssociationHandler,
  TrailerAssociationCriteriaHandler,
  SelectedTrailerAssociationHandler,
  SelectedTrailerAssociationCriteriaHandler,
  AssociatedTrailerHandler
} from "../../../store/Store";
import axios from "axios";
import TrailerAssociationList from "./TrailerAssociationList";
import { properties } from "../../../Properties/Properties";

const getListOfTrailer = properties.Port + properties.getListOfTrailer;
const getListOfAssociatedTrailers =
  properties.Port + properties.getListOfAssociatedTrailers;

export default class TrailerAssociationFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: "",
      data: [],
      tableData: false,
      consolidation_area_position: "",
      containers: "",
      driver_name: "",
      expected_container_number: "",
      id_company: "",
      id_container_sh_client: "",
      id_gate_loaded: "",
      id_prep_line_n3: "",
      id_prep_order: "",
      id_recording_gate: "",
      mdate: "",
      musername: "",
      rfid_tag: "",
      sap_id: "",
      status_client: "",
      status_po: "",
      status_shipping: "",
      status_weighing: "",
      trailer_identification: "",
      trailer_number: "",
      trailer_preparation_type: "",
      trailer_type: "",
      version_lock: "",
      attribute: null,
      operation: "=",
      value: null,
      mDate: "",
      idWarehouseList: [],
      listFilterBean: [],
      associatedTrailerData:[],
    };
  }

  componentDidMount = () => {
    console.log(
      "testing api Associatetrailer release calling",
      TrailerAssociationdata
    );
  };

  getIdFilterMethod = () => {
    this.criteriaFilterMethod();
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(getListOfTrailer, this.state, {
        params: {
          limit: this.state.limit,
        },
      })
      .then((response) => {
        console.log("uzzzzzzmmmmmaaaaaa=========>");
        if (response.status === 200 && response.data.length !== 0) {
          console.log(
            "resposne success ______________________________>",
            response.data
          );
          this.setState({
            data: response.data,
            tableData: true,
          });
          TrailerAssociationHandler(response.data);
          TrailerAssociationCriteriaHandler(criteria);
          // SelectedTrailerAssociationHandler(response.data);
          // SelectedTrailerAssociationCriteriaHandler(criteria);
        } else {
          this.setState({
            tableData: true,
            data: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  criteriaFilterMethod = () => {
    // this.getIdFilterMethod();
    console.log("testtttttttttttttt  api ");
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(getListOfAssociatedTrailers, this.state, {
        params: {
          limit: this.state.limit,
        },
      })
      .then((response) => {
        console.log("uzzzzzzmmmmmaaaaaa=========>>>>>>>>>>>>>>>>>",this.state);
        if (response.status === 200 && response.data.length !== 0) {
          console.log(
            "ibrahim console value______________________________",
            response.data
          );
          // this.getIdFilterMethod();
          this.setState({
            associatedTrailerData: response.data,
            tableData: true,
          });
          AssociatedTrailerHandler(response.data)
          // TrailerAssociationHandler(response.data);
          // TrailerAssociationCriteriaHandler(criteria);
        } else {
          this.setState({
            tableData: true,
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

    if (criteria.target.name === "plfLink") {
      console.log("checking idsap", criteria.target.name);
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.plfLink,
        };
        this.state.listFilterBean.push(data);
        console.log("updataed if partttt", this.state.listFilterBean);
      } else {
        this.state.listFilterBean[index].value = this.state.plfLink;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "id_company") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.id_company,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.id_company;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }

    if (criteria.target.name === "id_prep_order") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.id_prep_order,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.id_prep_order;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }

    // if (criteria.target.name === "statusSh") {
    //   var index = this.state.listFilterBean.findIndex(
    //     (data) => data.attribute === criteria.target.name
    //   );
    //   if (index === -1) {
    //     const data = {
    //       attribute: criteria.target.name,
    //       operation: this.state.operation,
    //       value: this.state.statusSh,
    //     };
    //     this.state.listFilterBean.push(data);
    //   } else {
    //     this.state.listFilterBean[index].value = this.state.statusSh;
    //     console.log("updataed else partttt", this.state.listFilterBean);
    //   }
    // }

    // if (criteria.target.name === "idPrepOrder") {
    //   var index = this.state.listFilterBean.findIndex(
    //     (data) => data.attribute === criteria.target.name
    //   );
    //   if (index === -1) {
    //     console.log("please remove after clone")
    //     const data = {
    //       attribute: criteria.target.name,
    //       operation: this.state.operation,
    //       value: this.state.idPrepOrder,
    //     };
    //     this.state.listFilterBean.push(data);
    //   } else {
    //     this.state.listFilterBean[index].value = this.state.idPrepOrder;
    //     console.log("updataed else partttt", this.state.listFilterBean);
    //   }
    // }

    // if (criteria.target.name === "trailerType") {
    //   var index = this.state.listFilterBean.findIndex(
    //     (data) => data.attribute === criteria.target.name
    //   );
    //   if (index === -1) {
    //     const data = {
    //       attribute: criteria.target.name,
    //       operation: this.state.operation,
    //       value: this.state.trailerType,
    //     };
    //     this.state.listFilterBean.push(data);
    //   } else {
    //     this.state.listFilterBean[index].value = this.state.trailerType;
    //     console.log("updataed else partttt", this.state.listFilterBean);
    //   }
    // }

    // if (criteria.target.name === "rfidTag") {
    //   var index = this.state.listFilterBean.findIndex(
    //     (data) => data.attribute === criteria.target.name
    //   );
    //   if (index === -1) {
    //     const data = {
    //       attribute: criteria.target.name,
    //       operation: this.state.operation,
    //       value: this.state.rfidTag,
    //     };
    //     this.state.listFilterBean.push(data);
    //   } else {
    //     this.state.listFilterBean[index].value = this.state.rfidTag;
    //     console.log("updataed else partttt", this.state.listFilterBean);
    //   }
    // }

    // if (criteria.target.name === "idRecordingGate") {
    //   var index = this.state.listFilterBean.findIndex(
    //     (data) => data.attribute === criteria.target.name
    //   );
    //   if (index === -1) {
    //     const data = {
    //       attribute: criteria.target.name,
    //       operation: this.state.operation,
    //       value: this.state.idRecordingGate,
    //     };
    //     this.state.listFilterBean.push(data);
    //   } else {
    //     this.state.listFilterBean[index].value = this.state.idRecordingGate;
    //     console.log("updataed else partttt", this.state.listFilterBean);
    //   }
    // }
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
      limit: "",
      isShow: false,
      tableData: false,
      consolidation_area_position: "",
      containers: "",
      driver_name: "",
      expected_container_number: "",
      id_company: "",
      id_container_sh_client: "",
      id_gate_loaded: "",
      id_prep_line_n3: "",
      id_prep_order: "",
      id_recording_gate: "",
      mdate: "",
      musername: "",
      rfid_tag: "",
      sap_id: "",
      status_client: "",
      status_po: "",
      status_shipping: "",
      status_weighing: "",
      trailer_identification: "",
      trailer_number: "",
      trailer_preparation_type: "",
      trailer_type: "",
      version_lock: "",
      attribute: null,
      operation: "=",
      value: null,
      mDate: "",
      idWarehouseList: [],
      listFilterBean: [],
    });
  };

  backHandler = () => {
    console.log("calling back handler");
    this.setState({
      limit: "",
      // isShow: false,
      tableData: false,
      consolidation_area_position: "",
      containers: "",
      driver_name: "",
      expected_container_number: "",
      id_company: "",
      id_container_sh_client: "",
      id_gate_loaded: "",
      id_prep_line_n3: "",
      id_prep_order: "",
      id_recording_gate: "",
      mdate: "",
      musername: "",
      rfid_tag: "",
      sap_id: "",
      status_client: "",
      status_po: "",
      status_shipping: "",
      status_weighing: "",
      trailer_identification: "",
      trailer_number: "",
      trailer_preparation_type: "",
      trailer_type: "",
      version_lock: "",
      attribute: null,
      operation: "=",
      value: null,
      mDate: "",
      idWarehouseList: [],
      listFilterBean: [],
    });
  };

  render() {
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{
            border: "1px solid black",
            marginLeft: "14px",
          }}
        >
          {TrailerAssociationdata.length !== 0 ||
          this.state.tableData === true ? (
            <TrailerAssociationList
              backHandler={this.backHandler}
              data={this.state.data}
              additem={this.props.additem}
            />
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
                &#62;
                {/* > */}
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Trailer association search</a>
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
                  <Label>Company</Label>{" "}
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
                    <option>=</option>
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
                    name="id_company"
                    id="id_company"
                    // style={{ width: "60px" }}
                    value={this.state.id_company}
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    // onBlur={() => this.onBlurHandler("company")}
                    onBlur={this.onBlurHandler}
                  >
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Preparation Order</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    onChange={this.changeHandler}
                  >
                    <option>=</option>
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
                    onChange={this.inputChangeHandler}
                    name="id_prep_order"
                    value={this.state.id_prep_order}
                    onBlur={this.onBlurHandler}
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Link</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="plfLink"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    onChange={this.changeHandler}
                  >
                    <option>=</option>
                    {/* <option>=</option>
                    <option></option>
                    <option></option>
                    <option></option> */}
                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    name="plfLink"
                    value={this.state.plfLink}
                    onBlur={this.onBlurHandler}
                  />
                </Col>

                <Col></Col>
                <Col></Col>
                <Col> </Col>
                <Col> </Col>
                <Col> </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Maximum Result</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="text"
                    name="text"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    value="<="
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
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
              <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>

              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Button onClick={this.resetdata}>Reset Criteria</Button>{" "}
                <Button onClick={this.getIdFilterMethod}> Submit</Button>
              </div>
            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}
