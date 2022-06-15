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
// import SiloRepackingList from "../Silo/SiloRepackingList";
import StoragePalletList from "./StoragePalletList";
import {
  Palletmovementcritariahandler,
  StoragePalletHandler,
  getlistofRegionsRTWHEntitiesHandler,
  StoragePalletData,
} from "../../../../store/Store";
import {
  palletMovementDataHandler,
  palletMovementData,
  palletMovementCriteriaHandler,
} from "../../../../store/Store";
import axios from "axios";
import { properties } from "../../../../Properties/Properties";
const GetListOfAllPalletFilters =
  properties.Port + properties.getListofPalletMovement;
const getlistofRegionsRTEntities =
  properties.Port + properties.getlistofRegionsRTEntities;
const getlistofRegionsWHEntities =
  properties.Port + properties.getlistofRegionsWHEntities;
const getListOfAllWarehouse =
  properties.Port + properties.getListOfAllWarehouse;
const getListOfPackagingKL = properties.Port + properties.getListOfPackagingKL;

export default class StoragePalletFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id_warehouse: "WH",
      palletfilter: false,
      tableData: [],
      batch: "",
      ContainerNo: "",
      limit: null,
      creation_date: "",
      height: "",
      id_CONTAINER_STK: "",
      ID_REFERENCE: "",
      id_container_father: "",
      id_location: "",
      id_packaging: "",
      listFilterBean: [],
      modefieddate: "",
      modefiedusername: "",
      operation: "=",
      status_container: 500,
      listofregions: [],
      status_mvt: 100,
      type_container: "",
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
      palletfilter: false,
    });
  };

  submithandler = () => {
    console.log("Display list calling");
    this.getbodylist();
    this.setState({
      palletfilter: true,
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
        attribute: "id_warehouse",
        operation: "=",
        value: "WH",
      },
      {
        attribute: "status_mvt",
        operation: "=",
        value: 100,
      },
      {
        attribute: "status_container",
        operation: "=",
        value: 500,
      },
      {
        attribute: "type_container",
        operation: "=",
        value: 100,
      },
    ];

    console.log("testigggggggggg", data);
    this.setState(
      {
        listFilterBean: data,
      },
      console.log("shahid======>", this.state.listFilterBean)
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
    console.log("testtttttttttttttt  api ", GetListOfAllPalletFilters);
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(GetListOfAllPalletFilters, this.state, {
        params: {
          limit: this.state.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          palletMovementDataHandler(response.data);
          this.setState({
            tableData: response.data,
            palletfilter: true,
          });

          palletMovementCriteriaHandler(criteria);
        } else {
          this.setState({
            tableData: [],
            palletfilter: true,
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
      .get(getlistofRegionsRTEntities)

      .then((response) => {
        if (response.status === 200) {
          console.log("getListofRegionforRT==>", response.data);
          this.setState({
            listofregions: response.data,
          });
          getlistofRegionsRTWHEntitiesHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getListofRegionforWH = () => {
    console.log("testtttttttttttttt  api ", getlistofRegionsWHEntities);

    axios
      .get(getlistofRegionsWHEntities)

      .then((response) => {
        if (response.status === 200) {
          console.log("getListofRegionforWH==>", response.data);
          this.setState({
            listofregions: response.data,
          });
          getlistofRegionsRTWHEntitiesHandler(response.data);
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
            // id_packaging:response.data.idPackaging
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
      if (criteria.target.name === "id_warehouse") {
        this.getWarehousedata(criteria);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.id_warehouse,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_warehouse;
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
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.ContainerNo;
          console.log("updataed else partttt", this.state.listFilterBean);
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
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.creation_date;
          console.log("updataed else partttt", this.state.listFilterBean);
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
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "id_CONTAINER_STK") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.id_CONTAINER_STK,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_CONTAINER_STK;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "ID_REFERENCE") {
        console.log("shahiddddddddd");
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.ID_REFERENCE,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.ID_REFERENCE;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "id_container_father") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.id_container_father,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value =
            this.state.id_container_father;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "id_location") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: "19@".concat(this.state.id_location),
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_location;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "id_packaging") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.id_packaging,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_packaging;
          console.log("updataed else partttt", this.state.listFilterBean);
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
          console.log("updataed else partttt", this.state.modefieddate);
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
          console.log("updataed else partttt", this.state.listFilterBean);
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
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "status_container") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.status_container,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.status_container;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "status_mvt") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.status_mvt,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.status_mvt;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "type_container") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.type_container,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.type_container;
          console.log("updataed else partttt", this.state.listFilterBean);
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
          console.log("updataed else partttt", this.state.listFilterBean);
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
          console.log("updataed else partttt", this.state.listFilterBean);
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
          console.log("updataed else partttt", this.state.listFilterBean);
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
          console.log("updataed else partttt", this.state.listFilterBean);
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
          console.log("updataed else partttt", this.state.listFilterBean);
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
          {palletMovementData.length !== 0 ||
          this.state.palletfilter === true ? (
            <StoragePalletList
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
                    <a>Pallet Movement Criteria</a>
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
                    name="id_warehouse"
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
                    name="id_warehouse"
                    onBlur={this.onBlurHandler}
                    onChange={this.inputChangeHandler}
                    value={this.state.id_warehouse}
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
              <Row>
                <Col>
                  <Label>Location</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="id_location"
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
                    name="id_location"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.id_location}
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
                    name="id_container_father"
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
                    name="id_container_father"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.id_container_father}
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Packaging ID</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="id_packaging"
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
                    name="id_packaging"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.id_packaging}
                  >
                    <option value="">---select---</option>
                    {this.state.listOfPackaging.map((data) => (
                      <option value={data.id_packaging}>
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
                    name="status_mvt"
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
                    name="status_mvt"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.id_location}
                  >
                    <option value="500">Validated</option>
                  </Input>
                </Col>
                <Col> </Col>
              </Row>
              <Row>
                <Col>
                  <Label>Type</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="type_container"
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
                    name="type_container"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.type_container}
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
                    name="ID_REFERENCE"
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
                    name="ID_REFERENCE"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.ID_REFERENCE}
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row>
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
                <Col>
                  <Label>Grade</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="z_grade"
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
                    name="z_grade"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.z_grade}
                  />
                </Col>
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
                    name="status_mvt"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.status_mvt}
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
