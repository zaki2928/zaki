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
import PalletToDestructionList from "./PalletToDestructionList";
import {
  Palletmovementcritariahandler,
  StoragePalletHandler,
  getlistofPalletDestructionRegionHandler,
  StoragePalletData,
} from "../../../../store/Store";
import {
  palletDestructionDataHandler,
  palletDestructionData,
  palletDestructionCriteriaHandler,
} from "../../../../store/Store";
import axios from "axios";
import { properties } from "../../../../Properties/Properties";
const getListOfDesctructionContainers =
  properties.Port + properties.getListofDestructionContainers;
const getlistofRegionsRTEntities =
  properties.Port + properties.getlistofRegionsRTEntities;
const getRegionForPalletDestruction =
  properties.Port + properties.getRegionForPalletDestruction;
const getListOfAllWarehouse =
  properties.Port + properties.getListOfAllWarehouse;
const getListOfPackagingKL = properties.Port + properties.getListOfPackagingKL;

export default class PalletToDestructionFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idWarehouse: "WH",
      palletDestructionfilter: false,
      tableData: [],
      batch: "",
      ContainerNo: "",
      limit: null,
      creation_date: "",
      height: "",
      idContainerStk: "",
      product: "",
      idContainerFather: "",
      idLocation: "",
      idPackaging: "",
      listFilterBean: [],
      modefieddate: "",
      modefiedusername: "",
      operation: "=",
      statusContainer: 500,
      listofregions: [],
      statusMvt: 100,
      typeContainer: "",
      vlock: "",
      volume: "",
      weight: "",
      z_description_unit: "",
      z_grade: "",
      listofwarehouse: [],
      listOfPackaging: [],
      idPackaging: "",
      description: "",
    };
  }

  limitchangehandler = (event) => {
    if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
      this.setState({
        [event.target.name]: event.target.value,
      });
    } else {
    }
  };
  backHandler = () => {
    console.log("calling back handler");
    this.setState({
      palletDestructionfilter: false,
    });
  };

  submithandler = () => {
    console.log("Display list calling");
    this.getbodylist();
    this.setState({
      palletDestructionfilter: true,
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

    console.log("index AFTER UPDATE print", this.state.listFilterBean);
  };

  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  test = (data) => {
    console.log("testing calling");
    this.setState({
      tableData: data,
    });
  };

  componentDidMount = () => {
    const data = [
      {
        attribute: "idWarehouse",
        operation: "=",
        value: "WH",
      },
      {
        attribute: "statusMvt",
        operation: "=",
        value: 100,
      },
      {
        attribute: "statusContainer",
        operation: "=",
        value: 500,
      },
      {
        attribute: "typeContainer",
        operation: "=",
        value: 100,
      },
    ];

    console.log("testigggggggggg", data);
    this.setState(
      {
        listFilterBean: data,
      },
      console.log("adeeba======>", this.state.listFilterBean)
    );

    this.getListofwarehouse();
    this.getListOfPackaging();
  };
  submithandler = () => {
    console.log("calling submit");
    if (this.state.warehouse === "WH") {
      this.getListofRegionforWH();
    } else {
      this.getListofRegionforRT();
    }
  };

  criteriaFilterMethod = () => {
    console.log("testtttttttttttttt  api ", getListOfDesctructionContainers);
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(getListOfDesctructionContainers, this.state, {
        params: {
          limit: this.state.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          palletDestructionDataHandler(response.data);
          this.setState({
            tableData: response.data,
            palletDestructionfilter: true,
          });

          palletDestructionCriteriaHandler(criteria);
        } else {
          this.setState({
            tableData: [],
            palletDestructionfilter: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getListofRegionforRT = () => {
    console.log("testtttttttttttttt  api ", getlistofRegionsRTEntities);

    axios
      .get(getRegionForPalletDestruction)

      .then((response) => {
        if (response.status === 200) {
          console.log("getListofRegionforRT==>", response.data);
          this.setState({
            listofregions: response.data,
          });
          getlistofPalletDestructionRegionHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getListofRegionforWH = () => {
    console.log("testtttttttttttttt  api ", getRegionForPalletDestruction);

    axios
      .get(getRegionForPalletDestruction)

      .then((response) => {
        if (response.status === 200) {
          console.log("getListofRegionforWH==>", response.data);
          this.setState({
            listofregions: response.data,
          });
          getlistofPalletDestructionRegionHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getListofwarehouse = () => {
    console.log("testtttttttttttttt  api ", getListOfAllWarehouse);

    axios
      .get(getListOfAllWarehouse)

      .then((response) => {
        if (response.status === 200) {
          console.log("responseeeeeeeeeeeeeeeeeeeeeeeeeee", response.data);
          this.setState({
            listofwarehouse: response.data,
            warehouse: response.data[1].idWarehouse,
          });
          this.getListofRegionforWH();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getListOfPackaging = () => {
    axios
      .post(getListOfPackagingKL)
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("packaging list data", response.data);
          this.setState({
            listOfPackaging: response.data,
            // idPackaging:response.data.idPackaging
          });
        } else {
          this.setState({
            listOfPackaging: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
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
      if (criteria.target.name === "batch") {
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
      if (criteria.target.name === "ContainerNo") {
        console.log("checking id refence", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.ContainerNo,
          };
          this.state.listFilterBean.push(data);
          console.log("updated if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.ContainerNo;
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "creation_date") {
        console.log("checking id refence", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.creation_date,
          };
          this.state.listFilterBean.push(data);
          console.log("updated if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.creation_date;
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "height") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.height,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.height;
          console.log("updated else partttt", this.state.listFilterBean);
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
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "product") {
        console.log("adeebaaaaa");
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.product,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.product;
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "idContainerFather") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.idContainerFather,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.idContainerFather;
          console.log("updated else partttt", this.state.listFilterBean);
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
            value: "19@".concat(this.state.idLocation),
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.idLocation;
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "idPackaging") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.idPackaging,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.idPackaging;
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "modefieddate") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.modefieddate,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.listFilterBean;
          console.log("updated else partttt", this.state.modefieddate);
        }
      }
      if (criteria.target.name === "modefieddate") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.modefieddate,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.modefieddate;
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "modefiedusername") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.modefiedusername,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.modefiedusername;
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "statusContainer") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.statusContainer,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.statusContainer;
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "statusMvt") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.statusMvt,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.statusMvt;
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "typeContainer") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.typeContainer,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.typeContainer;
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "vlock") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.vlock,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.vlock;
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "volume") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.volume,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.volume;
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "weight") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.weight,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.weight;
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "z_description_unit") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.z_description_unit,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value =
            this.state.z_description_unit;
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "z_grade") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.z_grade,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.z_grade;
          console.log("updated else partttt", this.state.listFilterBean);
        }
      }
    } else {
      console.log("value is blank", index);
      this.state.listFilterBean.splice(index, 1);
      console.log("after splice", this.state.listFilterBean);
    }

    console.log("calling criteriaARRRR", this.state.listFilterBean);
    this.setState({
      attribute: "",
      operation: "=",
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
          {palletDestructionData.length !== 0 ||
            this.state.palletDestructionfilter === true ? (
            <PalletToDestructionList
              backHandler={this.backHandler}
              tableData={this.state.tableData}
              listofregions={this.state.listofregions}
              test={this.test}
            />
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
                    <a>Pallets to destruction movements criteria</a>
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
                    name="idWarehouse"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    {/* <option value=">">&gt;</option> */}
                    {/* <option value="<">&lt;</option> */}
                    {/* <option value="<=">&le;</option> */}
                    {/* <option value=">=">&ge;</option> */}
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
                    onBlur={this.onBlurHandler}
                    onChange={this.inputChangeHandler}
                    value={this.state.idWarehouse}
                    bsSize="sm"
                  >
                    {/* <option value="">-----select----</option> */}
                    {this.state.listofwarehouse.map((data) => (
                      <option value={data.idWarehouse}>
                        {data.description}
                      </option>
                    ))}
                  </Input>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Container No</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="ContainerNo"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    {/* <option value=">">&gt;</option> */}
                    {/* <option value="<">&lt;</option> */}
                    {/* <option value="<=">&le;</option> */}
                    {/* <option value=">=">&ge;</option> */}
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
                    name="ContainerNo"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.ContainerNo}
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "7px" }}>
                <Col>
                  <Label>Location</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="idLocation"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    {/* <option value=">">&gt;</option> */}
                    {/* <option value="<">&lt;</option> */}
                    {/* <option value="<=">&le;</option> */}
                    {/* <option value=">=">&ge;</option> */}
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
                    name="idLocation"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.idLocation}
                  />
                </Col>

                <Col></Col>
                <Col>
                  <Label>Parent Container No</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="idContainerFather"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    {/* <option value=">">&gt;</option> */}
                    {/* <option value="<">&lt;</option> */}
                    {/* <option value="<=">&le;</option> */}
                    {/* <option value=">=">&ge;</option> */}
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
                    name="idContainerFather"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.idContainerFather}
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "7px" }}>
                <Col>
                  <Label>Packaging ID</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="idPackaging"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    {/* <option value=">">&gt;</option> */}
                    {/* <option value="<">&lt;</option> */}
                    {/* <option value="<=">&le;</option> */}
                    {/* <option value=">=">&ge;</option> */}
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
                    name="idPackaging"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.idPackaging}
                  >
                    <option value="">---select---</option>
                    {this.state.listOfPackaging.map((data) => (
                      <option value={data.idPackaging}>
                        {data.description}
                      </option>
                    ))}
                  </Input>
                </Col>

                <Col></Col>
                <Col>
                  <Label>Status</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="statusMvt"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    {/* <option value=">">&gt;</option> */}
                    {/* <option value="<">&lt;</option> */}
                    {/* <option value="<=">&le;</option> */}
                    {/* <option value=">=">&ge;</option> */}
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
                    name="statusMvt"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.idLocation}
                  >
                    <option value="500">Validated</option>
                  </Input>
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "7px" }}>
                <Col>
                  <Label>Type</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="typeContainer"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    {/* <option value=">">&gt;</option> */}
                    {/* <option value="<">&lt;</option> */}
                    {/* <option value="<=">&le;</option> */}
                    {/* <option value=">=">&ge;</option> */}
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
                    name="typeContainer"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.typeContainer}
                    bsSize="sm"
                  >
                    <option value="100">_Pallet_</option>
                  </Input>
                </Col>

                <Col></Col>
                <Col>
                  <Label>Product</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="product"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    {/* <option value=">">&gt;</option> */}
                    {/* <option value="<">&lt;</option> */}
                    {/* <option value="<=">&le;</option> */}
                    {/* <option value=">=">&ge;</option> */}
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
                    name="product"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.product}
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "7px" }}>
                <Col>
                  <Label>Batch</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="batch"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    {/* <option value=">">&gt;</option> */}
                    {/* <option value="<">&lt;</option> */}
                    {/* <option value="<=">&le;</option> */}
                    {/* <option value=">=">&ge;</option> */}
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
                    name="batch"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.batch}
                    bsSize="sm"
                  />
                </Col>

                <Col></Col>
                <Col></Col>
                <Col> </Col>
                <Col> </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "7px" }}>
                <Col>
                  <Label>Maximum Result</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="text"
                    name="limit"
                    value="<="
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    readOnly
                  >
                    {/* <option>=</option> */}
                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    bsSize="sm"
                    name="limit"
                    value={this.state.limit}
                    onChange={this.limitchangehandler}
                  />
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
                  marginTop: "7px",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Stock Criteria</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Movement Status</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "50px" }}
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
                    type="select"
                    name="statusMvt"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.statusMvt}
                    bsSize="sm"
                  >
                    <option value="100">_Immobile_</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>

                <Col> </Col>
                <Col> </Col>
                <Col> </Col>

                <Col> </Col>
              </Row>
              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Button>Reset Criteria</Button>{" "}
                <Button onClick={this.criteriaFilterMethod}> Display</Button>
              </div>
            </div>
          )}
          {/* {this.state.silolist === true ? (
            <SiloRepackingList />
          ) : } */}
        </Container>
      </React.Fragment>
    );
  }
}
