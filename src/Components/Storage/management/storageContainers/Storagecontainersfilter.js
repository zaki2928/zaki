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
import Storagecontainerslist from "./Storagecontainerslist";
import {
  StoragecontainerData,
  StoragecontainerDataHandler,
  SetStoragefilter,
} from "../../../../store/Store";
import axios from "axios";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import {properties} from "../../../../Properties/Properties"

const getKLContainer = properties.Port + properties.getKLContainer
const getWarehousesForPhysicalgate = properties.Port + properties.getWarehousesForPhysicalgate
const getListOfPackagingKL = properties.Port + properties.getListOfPackagingKL


class Storagecontainersfilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      tableData: [],
      value: null,
      batch: "",
      id_container: "",
      id_container_father: "",
      id_content: 0,
      id_location: "",
      id_packaging: "",
      idPackagingList:[],
      id_reference: "",
      id_warehouse: "",
      idWarehouseList:[],
      listFilterBean: [],
      status_container: "",
      status_mvt: "",
      type_container: "",
      z_grade: "",
      z_id_elligibility: "",
      idWarehouseEliList:[],
      operation: "=",
      limit: null,
      criteria:"",

    };
  }

  componentDidMount = () => {
    this.getIdWarehouseList();
    this.getIdPackagingList();
    this.getidWarehouseEliList();

  }

  criteriaFilterMethod = () => {
  const length = this.state.listFilterBean.length;
  const listFilterBean = [];
  console.log("testtttttttttttttt  api ", getKLContainer);
  for (let i = 0; i < length; i++) {
    console.log("value of ii", i);
    if (this.state.listFilterBean[i].value !== " ") {
      listFilterBean.push(this.state.listFilterBean[i]);
    }
  }
  console.log("on submittIIIIIIIng", listFilterBean);
  this.setState({
    listFilterBean: listFilterBean,
  });
    // console.log("testtttttttttttttt  api ", GetProductListOfAllFilters);
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(getKLContainer,criteria,{
          params: {
            limit: this.state.limit,
          },
        }
      )

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success shahiddddddd", response.data);
          this.setState({
            data: response.data,
            isShow:true
          });
         
          console.log("if part");
          StoragecontainerDataHandler(response.data);
          SetStoragefilter(criteria);
        } else {
          console.log("else part");
          this.setState({
            isShow: true,
            data: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // idWarehouseEliList

  getidWarehouseEliList = () => {
    console.log("calling warehouse from dropdown", this.state.idWarehouseEliList) 
    axios.get(getWarehousesForPhysicalgate)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            idWarehouseEliList: response.data,
          });

        } else {
          this.setState({
            idWarehouseEliList: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getIdWarehouseList = () => {
    console.log("calling warehouse from dropdown", this.state.idWarehouseList) 
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

  getIdPackagingList = () => {
    console.log("calling packagingList from dropdown", this.state.idPackagingList) 
    axios.post(getListOfPackagingKL)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            idPackagingList: response.data,
          });

        } else {
          this.setState({
            idPackagingList: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
      if (criteria.target.name === "z_id_elligibility") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.z_id_elligibility,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.z_id_elligibility;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "id_container") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.id_container,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_container;
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
            value: '19@'.concat(this.state.id_location),
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_location;
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
      if (criteria.target.name === "id_reference") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.id_reference,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_reference;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "id_reference") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.id_reference,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.id_reference;
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
    }
    else {
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
  //   } else {
  //     console.log("value is blank", index);
  //     this.state.listFilterBean.splice(index, 1);
  //     console.log("value is list if filter bean", this.state.listFilterBean);
  //   }
  // };

  limitchangehandler = (event) => {
    if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
      this.setState({
        [event.target.name]: event.target.value,
      });
    } else {
    }
  };

  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  backHandler = () => {
    console.log("calling back handler");
    this.setState({
      isShow: false,
      tableData: [],
      value: null,
      batch: "",
      id_container: "",
      id_container_father: "",
      id_content: 0,
      id_location: "",
      id_packaging: "",
      idPackagingList:[],
      id_reference: "",
      id_warehouse: "",
      idWarehouseList:[],
      listFilterBean: [],
      status_container: "",
      status_mvt: "",
      type_container: "",
      z_grade: "",
      z_id_elligibility: "",
      idWarehouseEliList:[],
      operation: "=",
      limit: null,
      criteria:"",
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
          {this.state.isShow === true  || StoragecontainerData.length !== 0 ?
           (
            <Storagecontainerslist
            backHandler={this.backHandler}
              data={this.state.data}
            />
          ) : (
            <div>
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
                      <a>Container Eligibility Search</a>
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
                      value={this.state.id_warehouse}
                      onChange={this.changeHandler}
                      bsSize="sm"
                    >
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
                      // name="id_warehouse"
                      bsSize="sm"
                      value={this.state.id_warehouse}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                    >
                     <option value="">---select---</option>
                      {this.state.idWarehouseList.map(data => <option value={data.id_warehouse} key={data.id_warehouse}>{data.description}</option>)}
                      
                    </Input>
                  </Col>

                  <Col> </Col>
                  <Col>
                    <Label>Product Grade</Label>{" "}
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
                      name="z_grade"
                      value={this.state.z_grade}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                    />
                  </Col>
                  <Col> </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>Container No</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="id_container"
                      onChange={this.changeHandler}
                      bsSize="sm"
                    >
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
                      name="id_container"
                      value={this.state.id_container}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                    />
                  </Col>

                  <Col></Col>
                  <Col>
                    <Label>Location</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="id_location"
                      onChange={this.changeHandler}
                      bsSize="sm"
                    >
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
                      name="id_location"
                      value={this.state.id_location}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                    />
                  </Col>
                  <Col> </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>Parent Container No</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="id_container_father"
                      bsSize="sm"
                      onChange={this.changeHandler}
                    >
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
                      name="id_container_father"
                      value={this.state.id_container_father}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                    />
                  </Col>

                  <Col></Col>
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
                      bsSize="sm"
                      // name="id_packaging"
                      // value={this.state.id_packaging}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                    >
                      <option value="">---select---</option>
                      {this.state.idPackagingList.map(data => <option value={data.id_packaging} key={data.id_packaging}>{data.description}</option>)}
                      
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
                      name="status_container"
                      // id="exampleSelect"
                      onChange={this.changeHandler}
                      bsSize="sm"
                    >
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
                      name="status_container"
                      value={this.state.status_container}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                      bsSize="sm"
                    >
                      <option value="">---select---</option>
                      <option value="50">_Creation in progress_</option>
                      <option value="100">Created</option>
                      <option value="500">Validated</option>
                      <option value="800">_Destroyed_</option>
                    </Input>
                  </Col>

                  <Col></Col>
                  <Col>
                    <Label>Type</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="type_container"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
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
                      name="type_container"
                      value={this.state.type_container}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                      bsSize="sm"
                    >
                      <option value="">---select---</option>
                      <option value="500">Box</option>
                      <option value="600">Location</option>
                      <option value="200">Product</option>
                      <option value="510">_Box shipping_</option>
                      <option value="700">_Load collection_</option>
                      <option value="100">_Pallet_</option>
                      <option value="400">_Shipping trailer_</option>
                      <option value="800">_Trailer_</option>
                      <option value="710">_Unload collection_</option>
                      
                    </Input>
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
                      name="batch"
                      value={this.state.batch}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                    />
                  </Col>

                  <Col></Col>
                  <Col>
                    <Label>Product</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="id_reference"
                      onChange={this.changeHandler}
                      bsSize="sm"
                    >
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
                      name="id_reference"
                      value={this.state.id_reference}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
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
                    <Input type="text"
                    value="<="
                    bsSize="sm"
                    readOnly></Input>
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
                      name="status_mvt"
                      onChange={this.changeHandler}
                      bsSize="sm"
                    >
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
                      name="status_mvt"
                      value={this.state.status_mvt}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                      bsSize="sm"
                    >
                      
                      <option value="">---select---</option>
                      <option value="100">_Immobile_</option>
                      <option value="200">_Transfer_</option>
                      <option value="300">Quantity</option>
                    </Input>
                  </Col>

                  <Col> </Col>
                  <Col>
                    <Label>Warehouse Eligibility</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="z_id_elligibility"
                      onChange={this.changeHandler}
                      bsSize="sm"
                    >
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
                      bsSize="sm"
                      name="z_id_elligibility"
                      // value={this.state.z_id_elligibility}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                    >
                      <option value="">---select---</option>
                      {this.state.idWarehouseEliList.map(data => <option value={data.z_id_elligibility} key={data.z_id_elligibility}>{data.description}</option>)}
                      
                    </Input>
                  </Col>
                  <Col> </Col>
                </Row>
                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Button>Reset Criteria</Button>{" "}
                  <Button onClick={this.criteriaFilterMethod}> Submit</Button>
                </div>
              </div>
              {/* <span>
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
                    <a>Containers Search</a>
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
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>

                <Col></Col>
                <Col>
                  <Label>Container no</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option>=</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Location</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>

                <Col></Col>
                <Col>
                  <Label>Parent container no</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>packaging id</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
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
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Type</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
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
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Product grade</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
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
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Maximum Results</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                  <Input bsSize="sm" />
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
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>

                <Col></Col>
                <Col>
                  <Label>Warehouse eligiblity</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <br />

              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Button>Reset Criteria</Button>{" "}
                <Button onClick={this.submitHandler}> Displayy</Button>
              </div> */}
            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default Storagecontainersfilter;
