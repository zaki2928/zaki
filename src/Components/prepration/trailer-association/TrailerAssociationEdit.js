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
import { FaSave } from "react-icons/fa";
import {
  Repackingdata,
  RepackingHandler,
  remover,
  TrailerAssociationEditdata,
} from "../../../store/Store";
import axios from "axios";
import { properties } from "../../../Properties/Properties";
import TrailerAssociationList from "./TrailerAssociationList";
import { TRAILER_ASSOCIATION } from "../../../store/RoleBased";

const getListOfAllWarehouse =
  properties.Port + properties.getListOfAllWarehouse;
const updateTrailer = properties.Port + properties.updateTrailer;
const getAssociatedTrailerbyPrepId=properties.Port + properties.getAssociatedTrailerbyPrepId;

export default class TrailerAssociationEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      tableData: [],
      rfid_tag: "",
      sap_id: "",
      mDate: "",
      mUsername: "",
      driver_name: "",
      trailer_type: "",
      trailer_identification: "",
      consolidatationArea: "",
      wb_empty_weight: 3780,
      expected_container_number: 22,
      id_recording_gate: "",
      version_lock: "",
      id_prep_order: "",
      idWarehouseArr: [],
      idWarehouse: "",
      id_trailer: "",
      errorsmsg: "",
      trailerasslist: false,
      errormsg:"",
    };
  }

  trailerAsslistmethod = () => {
    console.log("trailer asssociated method  list callingggggg");
    this.setState({
      trailerasslist: true,
    });
  };

  trailerAsslistbackmethod = () => {
    console.log("trailer asssociated method  list calling====== back");
    this.setState({
      trailerasslist: false,
    });
  };

  componentDidMount = () => {
    console.log(
      "testing api trailer association calling calling",
      TrailerAssociationEditdata
    );
    this.getListOfAllWarehouse();
    this.setState({
      sap_id: TrailerAssociationEditdata.sap_id,
      trailer_type: TrailerAssociationEditdata.trailer_type,
      id_trailer: TrailerAssociationEditdata.id_trailer,
      // wb_empty_weight: TrailerAssociationEditdata,

      id_prep_order: TrailerAssociationEditdata.id_prep_order,
    });
  };

  getListOfAllWarehouse = () => {
    console.log("getListOfAllWarehouse calling");

    axios
      .get(getListOfAllWarehouse)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success for warehouse", response.data);
          this.setState({
            // message: "Data Saved Successfully",
            idWarehouseArr: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onchangehandler = (event) => {
    console.log("onchangehandler", event.target.value);
    // console.log("onchangehandler", event.target.name);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  // submithandler = () => {
  //   console.log("Display list calling");
  //   this.getbodylist();
  //   this.setState({
  //     isShow: true,
  //   });
  // };

  trailerassociationmethod = () => {
    console.log("trailerassociation methoddddddd calling");
    const data = {
      rfid_tag: this.state.rfid_tag,
      sap_id: this.state.sap_id,
      driver_name: this.state.driver_name,
      trailer_type: this.state.trailer_type,
      trailer_identification: this.state.trailer_identification,
      wb_empty_weight: this.state.wb_empty_weight,
      expected_container_number: this.state.expected_container_number,
      id_recording_gate: this.state.id_recording_gate,
      id_prep_order: this.state.id_prep_order,
      trailer_number: this.state.id_trailer,
    };

    console.log("testing dataaaaaaaaaaa======>", data);
    if( this.state.rfid_tag !="" && this.state.driver_name !="" && this.state.trailer_identification !=""){
      this.setState({
        errormsg:"",
      });
    axios
      .post(updateTrailer, data)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response);
          this.getAssociatedTrailerbyIdPrep();
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }else{
      this.setState({
        errormsg:"Value is required",
      });
    }
  };

  getAssociatedTrailerbyIdPrep = () => {
    console.log("getAssociatedTrailerbyIdPrep");
    axios
      .post(
        getAssociatedTrailerbyPrepId +
          this.state.id_prep_order
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("response success", response.data);
          this.setState({
            isShow: false,
            tableData: [],
            rfid_tag: "",
            sap_id: "",
            mDate: "",
            mUsername: "",
            driver_name: "",
            trailer_type: "",
            trailer_identification: "",
            wb_empty_weight: 3780,
            expected_container_number: 22,
            id_recording_gate: "",
            version_lock: "",
            id_prep_order: "",
            idWarehouseArr: [],
            idWarehouse: "",
            id_trailer: "",
            errorsmsg: "",
            trailerasslist: false,
          });

          this.props.toggle("2");
          this.Backhandler();
          this.props.getAssociatedTrailerfromChild(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  Backhandler = () => {
    console.log("shahid Back Handler calling");
    remover("Trailer Association Edit");
    this.props.EditCloseHandler();
  };

  render() {
    return (
      <React.Fragment>
        <span>{this.state.errors}</span>
        <Container className="themed-container" fluid={true}>
          <div>
            <IoArrowBackCircleSharp onClick={this.Backhandler} />
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
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor:"pointer"}}>Trailer association search</a>
                </b>
              </u>{" "}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{ cursor: "pointer" }} onClick={this.Backhandler}>
                    Trailer association management
                  </a>
                </b>
              </u>{" "}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor:"pointer"}}>Trailer association edition</a>
                </b>
              </u>{" "}
            </span>
            <br />
            <br />
            {TRAILER_ASSOCIATION === 2?
            <div class="row-xs-6 bottom-row ">
              <FaSave
                style={{ cursor: "pointer" }}
                onClick={this.trailerassociationmethod}
                //   onClick={() => this.edithandler(props.original)}
              ></FaSave>{" "}
              {/* <button >Configure</button> */}
              <a
                style={{ cursor: "pointer" }}
                onClick={this.trailerassociationmethod}
              >
                Save
              </a>
            </div>
            :''}
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
                marginTop: "3px",
              }}
            >
              <b style={{ marginLeft: "5px" }}>PREPARATION ORDER</b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label style={{marginRight: "5px"}}>Preparation order</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.id_prep_order}
                  name="id_prep_order"
                  bsSize="sm"
                  style={{marginBottom: "1%", width:"280px", marginLeft:"-25%"}}
                />
              </Col>
            </Row>
            <Col> </Col>
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
              }}
            >
              <b style={{ marginLeft: "5px" }}>TRAILER DESCRIPTION </b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>SAP Id</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.sap_id}
                  name="sap_id"
                  bsSize="sm"
                  onChange={this.onchangehandler}
                />
              </Col>
              <Col>
                <Label>Trailer type</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={
                    this.state.trailer_type === 20 ? "_40_feet_container_" : ""
                  }
                  name="trailer_type"
                  bsSize="sm"
                  onChange={this.onchangehandler}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Driver name</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.driver_name}
                  name="driver_name"
                  bsSize="sm"
                  onChange={this.onchangehandler}
                />
                 {this.state.driver_name ===""?
                <span style={{color:"red", fontWeight:"bold"}}>{this.state.errormsg}</span>:""}
              </Col>
              <Col>
                <Label>RFID tag</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.rfid_tag}
                  name="rfid_tag"
                  bsSize="sm"
                  onChange={this.onchangehandler}
                />
                 {this.state.rfid_tag ===""?
                <span style={{color:"red", fontWeight:"bold"}}>{this.state.errormsg}</span>:""}
              </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Trailer identification</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.trailer_identification}
                  name="trailer_identification"
                  bsSize="sm"
                  onChange={this.onchangehandler}
                />
                 {this.state.trailer_identification ===""?
                <span style={{color:"red", fontWeight:"bold"}}>{this.state.errormsg}</span>:""}
              </Col>
              <Col>
                <Label>Empty weight (kg)</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.wb_empty_weight}
                  name="wb_empty_weight"
                  bsSize="sm"
                  onChange={this.onchangehandler}
                />
              </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Recording gate</Label>
              </Col>

              <Col>
                <Input
                  type="select"
                  value={this.state.id_recording_gate}
                  name="id_recording_gate"
                  bsSize="sm"
                  onChange={this.onchangehandler}
                >
                  <option value={0}>---select---</option>
                  <option value={11}>RT1 - Gate Remote Terminal</option>
                  <option value={141}>WH - Gate Entrance 1</option>
                  {/* {this.state.idWarehouseArr.map((data) => (
                    <option value={data.idWarehouse} key={data.idWarehouse}>
                      {data.description}
                    </option> */}
                </Input>
              </Col>
              <Col>
                <Label>Expected container number</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.expected_container_number}
                  name="expected_container_number"
                  bsSize="sm"
                  onChange={this.onchangehandler}
                  style={{marginBottom: "2%"}}
                />
              </Col>
            </Row>
            {this.state.id_recording_gate !== "141" ? (
              <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
                <Col>
                  {" "}
                  <Label>Consolidation area position</Label>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="text"
                    value={this.state.consolidatationArea}
                    name="consolidatationArea"
                    bsSize="sm"
                    onChange={this.onchangehandler}
                    style={{marginBottom: "2%"}}
                  />
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>
            ) : (
              ""
            )}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}
