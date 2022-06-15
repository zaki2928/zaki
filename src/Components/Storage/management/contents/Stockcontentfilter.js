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
import Stockcontentlist from "./Stockcontentlist";
import {
  remover,
  StockcontentData,
  StockcontentDataHandler,
  Stockcontentid,StockcontentCriteriaHandler
} from "../../../../store/Store";
import axios from "axios";
import { properties } from "../../../../Properties/Properties";
const getListOfAllWarehouse =
  properties.Port + properties.getListOfAllWarehouse;
const getlistofcontentonlystatus =
  properties.Port + properties.getlistofcontentonlystatus;

const getlistofContentbyFilterCriteria =
  properties.Port + properties.getlistofContentbyFilterCriteria;

class Stockcontentfilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: null,
      Stockcontentlist: false,
      batch: "",
      operation: "=",
      content_status_id: 0,
      id_warehouse: "",
      description: "",
      id_Company: "",
      id_Container: "",
      id_Content: 0,
      id_Location: "",
      id_Logistic_unit: "",
      id_Packaging: "",
      id_Product: "",
      id_Reference: "",
      listFilterBean: [],
      mUsername: "",
      qty_Expected: "",
      qty_Lu: "",
      qty_Reserved: "",
      status_Container: "",
      status_MVT: "",
      type_Container: "",
      type_Content: "",
      version_Lock: "",
      z_Description_unit: "",
      z_Grade: "",
      z_Inter_material_code: "",
      z_Unit_code: "",
      idWarehouseArr: [],
      idContentArr: [],
      status_MVT: "",
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

  componentDidMount = () => {
    console.log("com calling ");
    this.getListOfAllWarehouse();
    this.getlistofcontentonlystatus();
  };

  inputChangeHandler = (event) => {
    console.log("change");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // submitHandler = () => {
  //   console.log("submitHandler calling");

  //   axios
  //     .get("https://jsonplaceholder.typicode.com/posts")
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("resposne success", response.data);
  //         this.setState({
  //           data: response.data,
  //           Stockcontentlist: true,
  //         });

  //         StockcontentDataHandler(response.data);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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
  getlistofcontentonlystatus = () => {
    console.log("getListOfAllWarehouse calling");

    axios
      .get(getlistofcontentonlystatus)
      .then((response) => {
        if (response.status === 200) {
          console.log(
            "resposne success for getlistofcontentonlystatus",
            response.data
          );
          this.setState({
            // message: "Data Saved Successfully",
            idContentArr: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  criteriaFilterMethod = () => {
    console.log("testtttttttttttttt  api ", getlistofContentbyFilterCriteria);
    const length = this.state.listFilterBean.length;
    const listFilterBean = [];

    for (let i = 0; i < length; i++) {
      console.log("value of ii", i);
      if (this.state.listFilterBean[i].value !== "") {
        listFilterBean.push(this.state.listFilterBean[i]);
      }
    }
    const criteria = {
      listFilterBean: listFilterBean,
      limit: this.state.limit,
    };
    console.log("critaria =>", criteria);
    axios
      .post(getlistofContentbyFilterCriteria, criteria, {
        params: {
          limit: this.state.limit,
        },
      })

      .then((response) => {
        // if (response.status === 200 && response.data.length !== 0) {
        if (response.status === 200 && response.data !== "") {
          console.log("resposne success shahiddddddd", response.data);
          this.setState({
            data: response.data,
            Stockcontentlist: true,
          });

          StockcontentDataHandler(response.data);
          StockcontentCriteriaHandler(criteria)
        } else {
          console.log("else part");
          this.setState({
            data: [],
            Stockcontentlist: true,
          });
          console.log("resposne success shahiddddddd", response.data);
          StockcontentDataHandler(this.state.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onBlurHandler = (criteria) => {
    console.log("calling onBlurrrrr", criteria.target.name);
    console.log("calling onBlurrrrr", criteria.target.value);
    var index = this.state.listFilterBean.findIndex(
      (data) => data.attribute === criteria.target.name
    );
    console.log("INDEX VALUE FOR IF PART IN ALUE", index);

    if (criteria.target.value !== "") {
      if (criteria.target.name === "id_warehouse") {
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
      if (criteria.target.name === "content_status_id") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.content_status_id,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.content_status_id;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
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
        }
      }
      if (criteria.target.name === "id_Company") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.id_Company,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_Company;
          console.log("updataed else partt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "id_Container") {
        console.log("id container calling");
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.id_Container,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_Container;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "id_Content") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.id_Content,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_Content;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "id_Location") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: '19@'.concat(this.state.id_Location),
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_Location;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "id_Logistic_unit") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.id_Logistic_unit,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_Logistic_unit;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "id_Packaging") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.id_Packaging,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_Packaging;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "id_Product") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.id_Product,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_Product;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "id_Reference") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.id_Reference,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_Reference;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "qty_Expected") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.qty_Expected,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.qty_Expected;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "qty_Lu") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.qty_Lu,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.qty_Lu;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "qty_Reserved") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.qty_Reserved,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.qty_Reserved;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "status_Container") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.status_Container,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.status_Container;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "status_MVT") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.status_MVT,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.status_MVT;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "type_Container") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.type_Container,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.type_Container;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "type_Content") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.type_Content,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.type_Content;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "z_Description_unit") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.z_Description_unit,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value =
            this.state.z_Description_unit;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "z_Grade") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.z_Grade,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.z_Grade;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "z_Inter_material_code") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.z_Inter_material_code,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value =
            this.state.z_Inter_material_code;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "z_Unit_code") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.z_Unit_code,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.z_Unit_code;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
    } else {
      console.log("shahiddddddd");
      console.log("value is blank", index);
      this.state.listFilterBean.splice(index, 1);
      console.log("after splice", this.state.listFilterBean);
    }
  };
  changeHandler = (event) => {
    console.log("index BEFORE UPDATE print", this.state.listFilterBean);
    var index = this.state.listFilterBean.findIndex(
      (data) => data.attribute === event.target.name
    );
    if (index === -1) {
      const data = {
        attribute: event.target.name,
        operation: event.target.value,
        value: "",
      };
      this.state.listFilterBean.push(data);
    } else {
      console.log(
        (this.state.listFilterBean[index].operation = event.target.value)
      );
    }

    console.log("index AFTER UPDATE print", this.state.listFilterBean);
  };

  backHandler = () => {
    console.log("calling back handler");
    this.setState({
      limit: null,
      Stockcontentlist: false,
      batch: "",
      operation: "=",
      // content_status_id: 0,
      id_warehouse: "",
      description: "",
      id_Company: "",
      id_Container: "",
      // id_Content: 0,
      id_Location: "",
      id_Logistic_unit: "",
      id_Packaging: "",
      id_Product: "",
      id_Reference: "",
      // listFilterBean: [],
      mUsername: "",
      qty_Expected: "",
      qty_Lu: "",
      qty_Reserved: "",
      status_Container: "",
      status_MVT: "",
      type_Container: "",
      type_Content: "",
      version_Lock: "",
      z_Description_unit: "",
      z_Grade: "",
      z_Inter_material_code: "",
      z_Unit_code: "",
      // idWarehouseArr: [],
      // idContentArr: [],
      status_MVT: "",
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
          {StockcontentData.length || this.state.Stockcontentlist === true ? (
            <Stockcontentlist
              backHandler={this.backHandler}
              data={this.state.data}
              // additem={this.props.additem}
             

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
                    <a>Stock contents Search</a>
                  </b>
                </u>
              </span>
              <br />

              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop: "10px",
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
                    name="id_warehouse"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
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
                    name="id_warehouse"
                    value={this.state.id_warehouse}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  >
                    <option value=""></option>
                    {this.state.idWarehouseArr.map((data) => (
                      <option value={data.idWarehouse} key={data.idWarehouse}>
                        {data.description}
                      </option>
                    ))}
                  </Input>
                </Col>

                <Col></Col>
                <Col>
                  <Label>Location</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="id_Location"
                    onChange={this.changeHandler}
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
                    name="id_Location"
                    value={this.state.id_Location}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    bsSize="sm"
                  />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Container</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="id_Container"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
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
                    type="text"
                    name="id_Container"
                    value={this.state.id_Container}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    bsSize="sm"
                  />
                </Col>

                <Col></Col>
                <Col>
                  <Label>Company</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="id_Company"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
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
                    type="select"
                    name="id_Company"
                    value={this.state.id_Company}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    bsSize="sm"
                  >
                    <option value=""></option>
                    <option value="SK">SABIC</option>
                  </Input>
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Product</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    name="id_Reference"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  />
                </Col>
                <Col>
                  {" "}
                  <Input
                    name="id_Reference"
                    value={this.state.id_Reference}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    bsSize="sm"
                  />
                </Col>

                <Col></Col>
                <Col>
                  <Label>Intermediate material code</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="z_Inter_material_code"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
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
                    name="z_Inter_material_code"
                    value={this.state.z_Inter_material_code}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Grade</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="z_Grade"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
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
                    name="z_Grade"
                    value={this.state.z_Grade}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    bsSize="sm"
                  />
                </Col>

                <Col></Col>
                <Col>
                  <Label>Type</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="type_Content"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
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
                    type="select"
                    name="type_Content"
                    value={this.state.type_Content}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    bsSize="sm"
                  >
                    <option value=""></option>

                    <option value={200}>picking</option>
                    <option value={600}>preparation</option>
                    <option value={300}>_picking dynamic_</option>
                    <option value={100}>_stock_</option>
                  </Input>
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Content status</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="content_status_id"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
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
                    type="select"
                    name="content_status_id"
                    value={this.state.content_status_id}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    bsSize="sm"
                  >
                    {this.state.idContentArr.map((data) => (
                      <option
                        value={data.content_Status_id}
                        key={data.description}
                      >
                        {data.description}
                      </option>
                    ))}
                  </Input>
                </Col>

                <Col></Col>
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
                    name="batch"
                    value={this.state.batch}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Maximum Results</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input type="text" 
                  value="<=" 
                  bsSize="sm"
                  readOnly 
                  >&le;
                    {/* <option>=</option> */}
                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    bsSize="sm"
                    value={this.state.limit}
                    name="limit"
                    onChange={this.limitchangehandler}
                  />
                </Col>

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
                  marginTop: "10px",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Stock Criteria</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Movement status</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="status_MVT"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
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
                    type="select"
                    name="status_MVT"
                    value={this.state.status_MVT}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  >
                    <option value=""></option>
                    <option value={100}>immobile</option>
                    <option value={200}>quantity</option>
                  </Input>
                </Col>

                <Col></Col>
                <Col></Col>
                <Col> </Col>
                <Col></Col>
                <Col> </Col>
              </Row>

              <br />

              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Button>Reset Criteria</Button>{" "}
                <Button onClick={this.criteriaFilterMethod}> Display</Button>
              </div>
            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default Stockcontentfilter;
