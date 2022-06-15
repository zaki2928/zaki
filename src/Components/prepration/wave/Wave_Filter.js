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
  Wavedata,
  waveHandler,
  SelectedwaveHandler,
  WaveCriteriaHandler,
  SelectedWaveCriteriaHandler,
  SelectedWavedata,
} from "../../../store/Store";
import axios from "axios";

import Wave_List from "./Wave_List";
import { properties } from "../../../Properties/Properties";

const getListOfAllCarrier = properties.Port + properties.getListOfAllCarrier;
const getListOfAllDispatchMode =
  properties.Port + properties.getListOfAllDispatchMode;
const getListOfWave = properties.Port + properties.getListOfWave;
const getListOfWaveklp = properties.Port + properties.getListOfWaveklp;

export default class Wave_Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: "",
      selecteddata: [],
      isShow: false,
      tableData: [],
      cdateIc: "",
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
      idWave: "",
      mDate: "",
      musername: "",
      nbUnlaunchedBoxes: "",
      statusShippingWave: "",
      statusWave: "",
      statusWaveWf: "",
      typePo: "",
      versionLock: "",
      wsNameIc: "",
      IdCarrierList: [],
      IdDmList: [],
      listFilterBean: [],
    };
  }

  // submithandler = () => {
  //   console.log("Display list calling");
  //   this.getbodylist();
  //   this.setState({
  //     isShow: true,
  //   });
  // };

  backHandler = () => {
    console.log("calling back handler");
    this.setState({
      isShow: false,
    });
  };
  componentDidMount = () => {
    console.log("testing api wave  release calling");
    this.getIdCarrierList();
    this.getIdDmList();
    // this.getWaveSHFilterMethod();
  };
  //  getfiltermethodShid =()=>{

  //  }

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

  getWaveSHFilterMethod = () => {
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(getListOfWave, this.state, {
        params: {
          limit: this.state.limit,
        },
      })
      .then((response) => {
        console.log("SHahid list of sh wave", response);
        if (response.status === 200 && response.data.length !== 0) {
          SelectedwaveHandler(response.data);
          SelectedWaveCriteriaHandler(criteria);
          console.log("resposne success ______ selected data", response.data);
          this.setState({
            selecteddata: response.data,
            tableData: true,
          });
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
    console.log("testtttttttttttttt  api ");
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(getListOfWaveklp, this.state, {
        params: {
          limit: this.state.limit,
        },
      })
      .then((response) => {
        console.log("uzzzzzzmmmmmaaaaaa=========>");
        if (response.status === 200 && response.data.length !== 0) {
          console.log(
            "resposne successssssssssssssss ______________________________",
            response.data
          );

          this.setState({
            data: response.data,
            tableData: true,
          });
          waveHandler(response.data);
          WaveCriteriaHandler(criteria);
          this.getWaveSHFilterMethod();
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

  // getbodylist = () => {
  //   console.log("bodylist calling");
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts")
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("resposne success", response);

  //         this.setState({
  //           tableData: response.data,
  //         });
  //         waveHandler(response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  changeHandler = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    console.log("index BEFORE wave    print", this.state.listFilterBean);
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
    console.log("index AFTer wave  print", this.state.listFilterBean);
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

    if (criteria.target.name === "statusWave") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.statusWave,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.statusWave;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }

    if (criteria.target.name === "typePo") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.typePo,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.typePo;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }

    if (criteria.target.name === "statusShippingWave") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.statusShippingWave,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.statusShippingWave;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "ddDateMin") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.ddDateMin,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.ddDateMin;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "ddDateMax") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.ddDateMax,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.ddDateMax;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    // if (criteria.target.name === "idCarrier") {
    //   var index = this.state.listFilterBean.findIndex(
    //     (data) => data.attribute === criteria.target.name
    //   );
    //   if (index === -1) {
    //     const data = {
    //       attribute: criteria.target.name,
    //       operation: this.state.operation,
    //       value: this.state.idCarrier,
    //     };
    //     this.state.listFilterBean.push(data);
    //   } else {
    //     this.state.listFilterBean[index].value = this.state.idCarrier;
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
      data: [],
      limit: "",
      isShow: false,
      tableData: [],
      listFilterBean: [],
      cdateIc: "",
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
      idWave: "",
      mDate: "",
      musername: "",
      nbUnlaunchedBoxes: "",
      statusShippingWave: "",
      statusWave: "",
      statusWaveWf: "",
      typePo: "",
      versionLock: "",
      wsNameIc: "",
      IdCarrierList: [],
      IdDmList: [],
    });
  };

  backHandler = () => {
    this.setState({
      limit: "",
      isShow: false,
      tableData: [],
      cdateIc: "",
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
      idWave: "",
      mDate: "",
      musername: "",
      nbUnlaunchedBoxes: "",
      statusShippingWave: "",
      statusWave: "",
      statusWaveWf: "",
      typePo: "",
      versionLock: "",
      wsNameIc: "",
      // IdCarrierList:[],
      // IdDmList:[],
    });
  };

  submitHandler = () => {
    console.log("submitHandler calling");
  };
  render() {
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
          {Wavedata.length !== 0 || this.state.tableData === true ? (
            // this.state.tableData=== true || SelectedWavedata.length !==0(
            //  < Wave_List SelectedWavedata={this.state.SelectedWavedata}backHandler={this.backHandler}/>
            // )
            <Wave_List
              backHandler={this.backHandler}
              data={this.state.data}
              selecteddata={this.state.selecteddata}
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
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Wave search</a>
                  </b>
                </u>
              </span>
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop: "5px",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Preparation Criteria</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Wave No</Label>{" "}
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
                    name="idWave"
                    value={this.state.idWave}
                    onBlur={this.onBlurHandler}
                  />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Status</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="statusWave"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    onChange={this.changeHandler}
                  >
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
                    name="statusWave"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    value={this.state.statusWave}
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    // onBlur={() => this.onBlurHandler("company")}
                    onBlur={this.onBlurHandler}
                  >
                    <option> </option>
                    <option value="100">Created</option>
                    <option value="350">_Launchable_</option>
                    <option value="355">_Error_</option>
                    <option value="370">_pre Calculated_</option>
                    <option value="380">_Calculated_</option>
                    <option value="400">_Launched_</option>
                    <option value="424">_In InPreparation_</option>
                    <option value="500">_Prepared_</option>
                    <option value="4000">_Cancelled_</option>
                  </Input>
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Preparation order type</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="typePo"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    onChange={this.changeHandler}
                  >
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
                    name="typePo"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    value={this.state.typePo}
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    // onBlur={() => this.onBlurHandler("company")}
                    onBlur={this.onBlurHandler}
                  >
                    <option> </option>
                    <option value="100">_Standard_</option>
                  </Input>
                </Col>

                <Col></Col>
                <Col>
                  <Label>Desired delivery date</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="text"
                    name="select"
                    id="exampleSelect"
                    value=">="
                    bsSize="sm"
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="date"
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    name="ddDateMin"
                    value={this.state.ddDateMin}
                    onBlur={this.onBlurHandler}
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Desired delivery date</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="text"
                    name="ddDateMax"
                    id="exampleSelect"
                    value="<="
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    onChange={this.changeHandler}
                  >
                    {/* <option>&#62;</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option> */}
                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="date"
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    name="ddDateMax"
                    value={this.state.ddDateMax}
                    onBlur={this.onBlurHandler}
                  />
                </Col>

                <Col></Col>
                <Col> </Col>
                <Col> </Col>
                <Col> </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Maximum Result</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="text"
                    name="select"
                    id="exampleSelect"
                    value="<="
                    readOnly
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    {/* <option>=</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option> */}
                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop: "10px",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Shipping Criteria</b>
              </div>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Carrier</Label>{" "}
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
                    name="idCarrier"
                    id="idCarrier"
                    // style={{ width: "60px" }}
                    value={this.state.idCarrier}
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    // onBlur={() => this.onBlurHandler("company")}
                    onBlur={this.onBlurHandler}
                  >
                    <option value="">---select---</option>
                    {this.state.IdCarrierList.map((data) => (
                      <option value={data.idCarrier} key={data.idCarrier}>
                        {data.description}
                      </option>
                    ))}
                  </Input>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Dispatch mode</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="idDm"
                    id="idDm"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    onChange={this.changeHandler}
                  >
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
                    name="idDm"
                    id="idDm"
                    // style={{ width: "60px" }}
                    value={this.state.idDm}
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    // onBlur={() => this.onBlurHandler("company")}
                    onBlur={this.onBlurHandler}
                  >
                    <option value="">---select---</option>
                    {this.state.IdDmList.map((data) => (
                      <option value={data.idDm} key={data.idDm}>
                        {data.idDm}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Shipping status</Label>{" "}
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
                    name="statusShippingWave"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    value={this.state.statusShippingWave}
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    // onBlur={() => this.onBlurHandler("company")}
                    onBlur={this.onBlurHandler}
                  >
                    <option> </option>
                    <option value="100">Created</option>
                    <option value="1260">_At Plf_</option>
                    <option value="1150">_Awaiting shipment in stock_</option>
                    <option value="1190">_Awaiting shipment_</option>
                    <option value="2000">_Cancelled_</option>
                    <option value="990">_Palletised_</option>
                    <option value="1250">_Shipped to be confirmed_</option>
                    <option value="2000">_Shipped_</option>
                  </Input>
                </Col>

                <Col></Col>
                <Col></Col>
                <Col> </Col>
                <Col> </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col> </Col>
                <Col> </Col>
                <Col> </Col>

                <Col></Col>
                <Col> </Col>
                <Col> </Col>
                <Col> </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col> </Col>
                <Col> </Col>
                <Col> </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>

              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Button onClick={this.resetdata}>Reset Criteria</Button>{" "}
                <Button onClick={this.criteriaFilterMethod}> Submit</Button>
              </div>
            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}
