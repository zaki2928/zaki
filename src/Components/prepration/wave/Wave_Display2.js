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
import {
  remover,
  WaveEditdata,
  CreateWaveData,
  WaveCriteriaHandler,
} from "../../../store/Store";
import { FcSearch } from "react-icons/fc";
import { FaSave } from "react-icons/fa";
import {
  IoIosArchive,
  IoIosRadioButtonOff,
  IoIosRefresh,
  IoIosRewind,
  IoIosSkipBackward,
  IoIosSkipForward,
} from "react-icons/io";
import {
  MdFastForward,
  MdFormatListBulleted,
  MdLightbulbOutline,
} from "react-icons/md";
import { FaRegDotCircle } from "react-icons/fa";
import { properties } from "../../../Properties/Properties";
import axios from "axios";
import Wavecreateandselecet from "./Wavecreateandselecet";
import Wave_List from "./Wave_List";
import { WAVE } from "../../../store/RoleBased";

const createAndSelectWave = properties.Port + properties.createAndSelectWave;
const createWaveSH = properties.Port + properties.createWaveSH;
const getListOfAllCarrier = properties.Port + properties.getListOfAllCarrier;
const getListOfAllDispatchMode =
  properties.Port + properties.getListOfAllDispatchMode;

class Wave_Display2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      silolist: false,
      limit: "",
      data: "",
      data2: "",
      errorsmsg: "",
      isShow: false,
      tableData: [],
      cdateIc: "2021-12-21T09:14:27.721Z",
      cleanUpNumber: "",
      cleanUpStatus: "",
      commentaryIc: "",
      cusernameIc: "",
      attribute: null,
      operation: "=",
      value: null,
      dateLaunch: "",
      ddDateMax: "",
      ddDateMin: "",
      idSite: "",
      idWave: 0,
      mDate: "",
      musername: "",
      nbUnlaunchedBoxes: "",
      statusShippingWave: "",
      statusWave: 100,
      statusWaveWf: "",
      typePo: 100,
      defaultDm: "",
      versionLock: "",
      wsNameIc: "",
      idCarrier: "",
      idDm: "",
      noOfPos: "",
      defaultcarrier: "",
      IdCarrierList: [],
      IdDmList: [],
      listFilterBean: [],
      isShippingActive: false,
      isChecked: false,
      checkeditems: new Map(),
      createSelect: false,
      errmsg:"",
      msg:"",
    };
  }

  waveCreateSelect = () => {
    console.log("wave create and select");
    this.setState({
      createSelect: true,
    });
  };

  waveListback = () => {
    console.log("wave create and select back");
    this.setState({
      createSelect: false,
    });
  };

  componentDidMount = () => {
    console.log("testing api wave  release calling");
    this.getIdCarrierList();
    this.getIdDmList();
    console.log("calling waveeee  edit dataaaaaaa ", CreateWaveData);

    if (CreateWaveData !== null) {
      this.setState(
        {
          data: CreateWaveData,
          data2: CreateWaveData,
        },
        () => {
          console.log("data present after tab switch", this.state.data);
          if (CreateWaveData.statusWave === 100) {
            this.setState({
              statusWave: "Created",
            });
          }
          if (CreateWaveData.typePo === 100) {
            this.setState({
              typePo: "Standard",
            });
          }
          if (CreateWaveData.idWave === 0) {
            this.setState({
              idWave: 0,
            });
          }
        }
      );
    }
  };

  getIdCarrierList = () => {
    console.log("calling region from dropdown", this.state.IdCarrierList);

    axios
      .get(getListOfAllCarrier)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success uzmmmmmaaaa", response.data);
          this.setState({
            IdCarrierList: response.data,
          });
          console.log("calling region from dropdown", this.state.IdCarrierList);
        } else {
          this.setState({
            IdCarrierList: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getIdDmList = () => {
    console.log("calling region from dropdown", this.state.IdDmList);

    axios
      .get(getListOfAllDispatchMode)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success uzmmmmmaaaa", response.data);
          this.setState({
            IdDmList: response.data,
          });
          console.log("calling region from dropdown", this.state.IdDmList);
        } else {
          this.setState({
            IdDmList: [],
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

  activeHandler = (event) => {
    console.log("activeHandler calling ", event.target.value);
    console.log("activeHandler calling--> ", event.target.checked);
    if (event.target.checked === true) {
      this.setState({
        // isChecked:true
        isShippingActive: true,
      });
    } else {
      this.setState({
        isShippingActive: false,

        // isChecked:false
      });
    }
  };

  backHandler = () => {
    console.log("calling back handler for wave list page");
    remover("Wave");
    this.props.newcloseHandler();
  };

  waveCreatedTestMEthod = () => {
    console.log("wave creatttttteeeeeee calling");
    const data = {
      cdateIc: this.state.cdateIc,
      cleanUpNumber: this.state.cleanUpNumber,
      cleanUpStatus: this.state.cleanUpStatus,
      commentaryIc: this.state.commentaryIc,
      cusernameIc: this.state.cusernameIc,
      dateLaunch: this.state.dateLaunch,
      ddDateMax: this.state.ddDateMax,
      ddDateMin: this.state.ddDateMin,
      idCarrier: this.state.idCarrier,
      idDm: this.state.idDm,
      idSite: this.state.idSite,
      idWave: this.state.idWave,
      idWaveSh: this.state.idWaveSh,
      isShippingActive: this.state.isShippingActive,
      mDate: this.state.mDate,
      musername: this.state.musername,
      nbUnlaunchedBoxes: this.state.nbUnlaunchedBoxes,
      noOfPos: this.state.noOfPos,
      statusShippingWave: this.state.statusShippingWave,
      statusWave: this.state.statusWave,
      statusWaveWf: this.state.statusWaveWf,
      typePo: this.state.typePo,
      versionLock: this.state.versionLock,
      wsNameIc: this.state.wsNameIc,
    };
    // console.log("wave create and select by state ",this.state);
    // console.log("posting data of wave create and select by dattttttaaa", data);
    axios
      .post(createAndSelectWave, data)
      .then((response) => {
        if (response.status === 200) {
          remover("createwaveremover");
          const criteria = {
            listFilterBean: [
              {
                attribute: "idWave",
                operation: "=",
                value: response.data[0].idWave,
              },
            ],
          };

          WaveCriteriaHandler(criteria);
          this.backHandler(response.data);

          console.log(
            "resposne successsssssssssssssssssss by responseee data",
            response.data
          );

          // this.setState({
          // msg: "Data Saved Successfully",
          // idWave:response.data.idWave,
          // data:response.data,
          // tableData: true,
          // createSelect: false
          // });

          // this.state.data.push
          // this.WaveHandler2(response.data.idWave);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // passing data to the list page
  // backHandler = (data) => {
  //   console.log("backhandler calling-->", data);
  //   //remover("Wave");
  //   remover("createwaveremover");
  //   this.props.newcloseHandler(data);
  // };

  // waveCreateSelect = () => {
  //   // if (this.validate()) {
  //     console.log("wave create and select");
  //     console.log("posting data of wave create and select", this.state);
  //     axios.post(createAndSelectWave, this.state)
  //       .then((response) => {
  //         if (response.status === 200) {

  //           console.log("resposne successsssssssssssssssssss", response.data);
  //           this.setState({
  //             msg: "Data Saved Successfully",
  //             idWave:response.data.idWave
  //           });
  //           this.WaveHandler2(response.data.idWave);
  //         }

  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   // }

  // };
  WaveHandler2 = (idwave) => {
    var data = {};
    // if(this.state.isChecked===true){
    if (this.state.isShippingActive === true) {
      data = {
        isShippingActive:true,
        idCarrier: this.state.idCarrier,
        idDm: this.state.idDm,
        idWave: idwave,
      };
    } else {
      data = {
        idCarrier: this.state.idCarrier,
        idDm: this.state.idDm,
      };
    }

    // console.log("posting data uzmmmaamaaaaaaaa", data);

    // axios.post(createWaveSH, this.state)
    //   .then((response) => {
    //     if (response.status === 200) {
    //       console.log("resposne Aijazzzzzzzzzzzz", response.data);
    //       this.setState({
    //         msg: "Data Saved Successfully",
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  SubmitHandler = () => {
    //console.log("posting data", this.state);
    console.log("wave creatttttteeeeeee uzmii calling");
    const data = {
      cdateIc: this.state.cdateIc,
      cleanUpNumber: this.state.cleanUpNumber,
      cleanUpStatus: this.state.cleanUpStatus,
      commentaryIc: this.state.commentaryIc,
      cusernameIc: this.state.cusernameIc,
      dateLaunch: this.state.dateLaunch,
      ddDateMax: this.state.ddDateMax,
      ddDateMin: this.state.ddDateMin,
      idCarrier: this.state.idCarrier,
      idDm: this.state.idDm,
      idSite: this.state.idSite,
      idWave: this.state.idWave,
      idWaveSh: this.state.idWaveSh,
      isShippingActive: this.state.isShippingActive,
      mDate: this.state.mDate,
      musername: this.state.musername,
      nbUnlaunchedBoxes: this.state.nbUnlaunchedBoxes,
      noOfPos: this.state.noOfPos,
      statusShippingWave: this.state.statusShippingWave,
      statusWave: this.state.statusWave,
      statusWaveWf: this.state.statusWaveWf,
      typePo: this.state.typePo,
      versionLock: this.state.versionLock,
      wsNameIc: this.state.wsNameIc,
    };
    axios.post(createAndSelectWave, data)
      .then((response) => {
        if (response.status === 200) {

          console.log("resposne success", response.data);
          this.setState({
              errmsg :"",
            msg: "Data Saved Successfully",
          });
        }
      })
      .catch((error) => {
        console.log(error);

        this.setState({
            errmsg: error.response.data.message,
          });

      });
  };

  validate() {
    console.log("inside validator method");
    // if (this.state.idWave === "") {
    //   console.log("inside validator waveid")
    //     this.setState({
    //         errors: "enter waveid"
    //     })
    //     return false
    // }
    if (this.state.statusWave === "") {
      console.log("enter status wave");
      this.setState({
        errors: "enter status wave",
      });
      return false;
    }
    // else if (this.state.ddDateMin === "") {
    //   console.log ("inside validator enter minimum date")
    //     this.setState({
    //         errors: "enter minimum date"
    //     })
    //     return false
    // }

    // else if (this.state.ddDateMax === "") {
    //   console.log("inside validator enter enter maximum date")
    //     this.setState({
    //         errors: "enter maximum date"
    //     })
    //     return false
    // }
    else if (this.state.typePo === "") {
      console.log("inside validator enter typepo");
      this.setState({
        errors: "enter typepo",
      });
      return false;
    }

    // else if (this.state.cdateIc === "") {
    //   console.log("inside validor enter creation date")
    //     this.setState({
    //         errors: "enter creation date"
    //     })
    //     return false
    // }
    else if (this.state.wsNameIc === "") {
      console.log("inside validor enter user creation");
      this.setState({
        errors: "enter user creation ",
      });
      return false;
    }
    // else if (this.state.commentaryIc === "") {
    //   console.log("inside validor enter comment site")
    //     this.setState({
    //         errors: "enter comment site"
    //     })
    //     return false
    // }
    //   else if (this.state.idCarrier === "") {
    //     console.log("inside validor select carrier list")
    //       this.setState({
    //           errors: "select carrier list"
    //       })
    //       return false
    //   }
    //   else if (this.state.idDm === "") {
    //     console.log("inside validor select dispatch mode")

    //     this.setState({
    //         errors: "select dispatch mode"
    //     })
    //     return false
    // }
    else {
      console.log("inside validor null exception");
      this.setState({
        errors: " ",
      });
      return true;
    }
  }
  render() {
    return (
      <React.Fragment>
        <span>{this.state.errors}</span>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
          {this.state.tableData === true ? (
            <Wave_List />
          ) : this.state.createSelect === true ? (
            <waveCreateSelect waveListback={this.waveListback} />
          ) : (
            <div>
              <IoArrowBackCircleSharp onClick={this.backHandler} />
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
                    <a style={{cursor:"pointer"}}>Wave Search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}}>Wave List</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}}>Wave Details Management</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}}>Wave Detail edition</a>
                  </b>
                </u>
              </span>
              <br />
              <div class="row-xs-6 bottom-row ">

                {/* {this.state.msg} */}

                <FaSave

                //   onClick={() => this.edithandler(props.original)}
                ></FaSave>{" "}
                {/* <button >Configure</button> */}
                
 {WAVE===2 ?  <a style={{ cursor: "pointer", fontWeight: "bold", color: "blue" }}>
              <u onClick={this.SubmitHandler}>Create</u>
            </a> : ''}
                {/* <a
                  style={{ cursor: "pointer" }}
                  onClick={this.SubmitHandler}
                >
                  Create
                </a>{" "} */}
                <FaSave

                //   onClick={() => this.edithandler(props.original)}
                ></FaSave>{" "}
                {/* <button >Configure</button> */}
                {WAVE===2 ?  <a style={{ cursor: "pointer", fontWeight: "bold", color: "blue" }}>
              <u onClick={this.waveCreatedTestMEthod}>Create and Select</u>
            </a> : ''}
                {/* <a
                  style={{ cursor: "pointer" }}
                  onClick={this.waveCreatedTestMEthod}
                >
                  Create and Select
                </a>{" "} */}
              </div>
              <span style={{color:"Green",  fontWeight: "bold"}}>&nbsp;&nbsp;&nbsp;{this.state.msg}</span>
              <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>

                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <span
                  style={{
                    color: "lightgreen",
                  }}
                >
                  <IoIosSkipBackward />
                  <u>
                    <b>prev record</b>
                  </u>
                </span>
                <span style={{ marginLeft: "8px", color: "lightgreen" }}>
                  <IoIosSkipForward />
                  <u>
                    <b>next record</b>
                  </u>
                </span>
                <span
                  style={{
                    color: "orange",
                    marginLeft: "8px",
                  }}
                >
                  <IoIosRefresh />
                  <u>
                    <b>Refresh</b>
                  </u>
                </span>

                <Col></Col>
              </Row>

              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Description</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Wave no</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    type="text"
                    value={this.state.idWave}
                    name="idWave"
                    bsSize="sm"
                  />
                </Col>
                <Col></Col>

                <Col> </Col>
                <Col>
                  <Label>Status</Label>{" "}
                </Col>
                <Col>
                  <Input
                    type="text"
                    value={this.state.statusWave === 100 ? "Created" : ""}
                    name="statusWave"
                    bsSize="sm"
                  ></Input>
                </Col>
                <Col></Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Minimum desired delivery date</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    type="date"
                    value={this.state.ddDateMin}
                    name="ddDateMin"
                    bsSize="sm"
                    onChange={this.onchangehandler}
                  />
                </Col>
                <Col></Col>

                <Col> </Col>
                <Col>
                  <Label>Max desired delivery date</Label>{" "}
                </Col>
                <Col>
                  <Input
                    type="date"
                    value={this.state.ddDateMax}
                    name="ddDateMax"
                    bsSize="sm"
                    onChange={this.onchangehandler}
                  />
                </Col>
                <Col></Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Preparation order type</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="text"
                    value={this.state.typePo === 100 ? "_standard_" : ""}
                    name="typePo "
                    bsSize="sm"
                  ></Input>
                </Col>
                <Col></Col>

                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginBottom: "20px" }}>
                <Col></Col>
                <Col></Col>
                <Col></Col>

                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col> </Col>
              </Row>
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Info Complementry</b>
              </div>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Creation date</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    type="date"
                    value={this.state.cdateIc}
                    name="cdateIc"
                    bsSize="sm"
                    onChange={this.onchangehandler}
                  />
                </Col>
                <Col></Col>

                <Col> </Col>
                <Col>
                  <Label>User Creation</Label>{" "}
                </Col>
                <Col>
                  <Input
                    type="text"
                    value={this.state.wsNameIc}
                    name="wsNameIc"
                    bsSize="sm"
                    onChange={this.onchangehandler}
                  />
                </Col>
                <Col></Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Comment</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    type="text"
                    value={this.state.commentaryIc}
                    name="commentaryIc"
                    bsSize="sm"
                    onChange={this.onchangehandler}
                  />
                </Col>
                <Col></Col>

                <Col> </Col>
                {/* <Col>
                <Label>Status</Label>{" "}
              </Col>
              <Col>
                <Input 
                   type="text"
                   value={this.state.statusWave}
                   name="statusWave"
                   bsSize="sm"

                
                />
              </Col> */}
                <Col></Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Active</Label>
                  <Input
                    bsSize="sm"
                    type="checkbox"
                    onChange={this.activeHandler}
                    style={{ marginLeft: "10px" }}
                  />{" "}
                </Col>

                <b>Shipping</b>
                <Col> </Col>
                <Col></Col>

                <Col> </Col>
                <Col> </Col>
                <Col></Col>
                <Col></Col>
                <Col> </Col>
              </Row>
              {this.state.isShippingActive === true ? (
                <div>
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Shipping</b>
                  </div>

                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Id Carrier</Label>{" "}
                    </Col>

                    <Col>
                      {" "}
                      <Input
                        type="select"
                        value={this.state.idCarrier}
                        name="idCarrier"
                        bsSize="sm"
                        onChange={this.onchangehandler}
                      >
                        <option value="">---select---</option>
                        {this.state.IdCarrierList.map((data) => (
                          <option value={data.idCarrier} key={data.idCarrier}>
                            {data.description}
                          </option>
                        ))}
                      </Input>
                    </Col>
                    <Col></Col>

                    <Col> </Col>
                    <Col>
                      <Label>Dispatch Mode</Label>{" "}
                    </Col>
                    <Col>
                      <Input
                        type="select"
                        value={this.state.idDm}
                        name="idDm"
                        bsSize="sm"
                        onChange={this.onchangehandler}
                      >
                        <option value="">---select---</option>
                        {this.state.IdDmList.map((data) => (
                          <option value={data.idDm} key={data.idDm}>
                            {data.idDm}
                          </option>
                        ))}
                      </Input>
                    </Col>
                    <Col></Col>
                    <Col> </Col>
                  </Row>
                </div>
              ) : null}

              <div></div>
              <br />

              <IoArrowBackCircleSharp />
              <IoArrowForwardCircleSharp />
              <FcSearch style={{ marginLeft: "5px" }} />
              <span style={{ color: "black", fontSize: "12px" }}>
                {" "}
                <b>User</b> : <b> asis</b> <b> Site</b>
                <b>{"  "}:</b>
                <b>
                  {"  "}
                  19
                </b>
                <b>
                  {"  "}
                  Warehouse
                </b>
                <b>{"  "}:</b>
                <b>
                  {"  "}
                  WH,
                </b>
                <b>
                  {"  "}
                  RT1
                </b>
              </span>
              <br />
            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default Wave_Display2;
