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
import ProductList from "./ProductList";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import {
  ProductData,
  ProductHandler,
  ProductcriteriaHandler,
} from "../../../../store/Store";
import axios from "axios";
import { properties } from "../../../../Properties/Properties";


const GetProductListOfAllFilters =
  properties.Port + properties.GetProductListOfAllFilters;
class ProductFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: "",
      prodList: false,
      attribute: null,
      operation: "=",
      value: null,
      company: "",
      criteriaArr: [],
      product: "",
      description: "",
      available: "",
      batchStatement: "",
      cleanUpNumber: "",
      cleanUpStatus: "",
      coefUnit: "",
      controlQty: "",
      creationDate: "",
      description: "",
      descriptionCompl: "",
      descriptionShort: "",
      descriptionUnit: "",
      feat1Statement: "",
      feat2Statement: "",
      feat3Statement: "",
      idCompany: "",
      idProduct: "",
      idReference: "",
      mDate: "",
      mUsername: "",
      rotation: "",
      sellbydateStatement: "",
      statusProduct: "",
      type: "",
      typeProduct: "",
      usebydateStatement: "",
      versionLock: "",
      zGrade: "",
      zIMC: "",
      zLuChildCode: "",
      zMaterialType: "",
      zProductType: "",
      zQtyProductChild: "",
      zQtyProductChildinBu: "",
      zQtyProductRoot: "",
      zQtyProductRootinBu: "",
      zQuality: "",
      zUnitCode: "",
      zcoefUnit: "",
      zcyclecountingInventory: "",
      zdescriptionUnit: "",
      zidProductChild: "",
      listFilterBean: [],
      criteria: "",
      passedcriteria: "",
      // listofFilterbean:[],

    };
  }

  componentDidMount = () => {
    console.log("testing api trailer release calling");
  };

  criteriaFilterMethod = () => {
    this.props.startLoading()
    const length = this.state.listFilterBean.length;
    const listFilterBean = [];
    console.log("testtttttttttttttt  api ", GetProductListOfAllFilters);
    for (let i = 0; i < length; i++) {
      console.log("value of ii", i);
      if (this.state.listFilterBean[i].value !== "") {
        listFilterBean.push(this.state.listFilterBean[i]);
      }
    }
    console.log("on submittung", listFilterBean);
    this.setState({
      listFilterBean: listFilterBean,
      
    });
    const criteria = {
      listFilterBean: listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(GetProductListOfAllFilters, criteria, {
        params: {
          limit: this.state.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
           
            

          },()=>{
            this.setState({
              prodList: true,
            })
          });
          ProductHandler(response.data);
          ProductcriteriaHandler(criteria);
        } else {
          this.setState({
            prodList: true,
            data: [],
          });
          ProductHandler(response.data);
        }
        this.props.stopLoading();
      })
      .catch((error) => {
        console.log(error);
        this.props.stopLoading();
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
        value: "",
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

    if (criteria.target.value !== "") {
      if (criteria.target.name === "company") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.company,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.company;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "idReference") {
        console.log("checking id refence", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.idReference,
          };
          this.state.listFilterBean.push(data);
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.idReference;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "description") {
        console.log("checking id refence", criteria.target.name);
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
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.description;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "zGrade") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.zGrade,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.zGrade;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "zProductType") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.zProductType,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.zProductType;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "zIMC") {
        console.log("shahiddddddddd");
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.zIMC,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.zIMC;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "typeProduct") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.typeProduct,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.typeProduct;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "zQuality") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.zQuality,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.zQuality;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "descriptionShort") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.descriptionShort,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.descriptionShort;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "descriptionCompl") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.descriptionCompl,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.descriptionCompl;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "available") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.available,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.available;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "statusProduct") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.statusProduct,
          };
          this.state.listFilterBean.push(data);
          console.log("updataed if", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.statusProduct;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "zMaterialType") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.zMaterialType,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.zMaterialType;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "creationDate") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.creationDate,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.creationDate;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
    } else {
      console.log("value is blank", index);
      this.state.listFilterBean.splice(index, 1);
      console.log("after splice", this.state.listFilterBean);
    }
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
      prodList: false,
      attribute: null,
      operation: "=",
      value: null,
      company: "",
      criteriaArr: [],
      product: "",
      description: "",
      available: "",
      batchStatement: "",
      cleanUpNumber: "",
      cleanUpStatus: "",
      coefUnit: "",
      controlQty: "",
      creationDate: "",
      description: "",
      descriptionCompl: "",
      descriptionShort: "",
      descriptionUnit: "",
      feat1Statement: "",
      feat2Statement: "",
      feat3Statement: "",
      idCompany: "",
      idProduct: "",
      idReference: "",
      mDate: "",
      mUsername: "",
      rotation: "",
      sellbydateStatement: "",
      statusProduct: "",
      type: "",
      typeProduct: "",
      usebydateStatement: "",
      versionLock: "",
      zGrade: "",
      zIMC: "",
      zLuChildCode: "",
      zMaterialType: "",
      zProductType: "",
      zQtyProductChild: "",
      zQtyProductChildinBu: "",
      zQtyProductRoot: "",
      zQtyProductRootinBu: "",
      zQuality: "",
      zUnitCode: "",
      zcoefUnit: "",
      zcyclecountingInventory: "",
      zdescriptionUnit: "",
      zidProductChild: "",
      listFilterBean: [],
    });
  };

  backHandler = () => {
    this.setState({
      limit: "",
      prodList: false,
      attribute: null,

      value: null,
      company: "",
      criteriaArr: [],
      product: "",
      description: "",
      available: "",
      batchStatement: "",
      cleanUpNumber: "",
      cleanUpStatus: "",
      coefUnit: "",
      controlQty: "",
      creationDate: "",
      description: "",
      descriptionCompl: "",
      descriptionShort: "",
      descriptionUnit: "",
      feat1Statement: "",
      feat2Statement: "",
      feat3Statement: "",
      idCompany: "",
      idProduct: "",
      idReference: "",
      mDate: "",
      mUsername: "",
      rotation: "",
      sellbydateStatement: "",
      statusProduct: "",
      type: "",
      typeProduct: "",
      usebydateStatement: "",
      versionLock: "",
      zGrade: "",
      zIMC: "",
      zLuChildCode: "",
      zMaterialType: "",
      zProductType: "",
      zQtyProductChild: "",
      zQtyProductChildinBu: "",
      zQtyProductRoot: "",
      zQtyProductRootinBu: "",
      zQuality: "",
      zUnitCode: "",
      zcoefUnit: "",
      zcyclecountingInventory: "",
      zdescriptionUnit: "",
      zidProductChild: "",
      listFilterBean: [],
    });
  };

  render() {
    return (
      <React.Fragment>
        {/* <form> */}
          <Container
            className="themed-container"
            fluid={true}
            style={{ border: "1px solid black", marginLeft: "14px" }}
          >
            {ProductData.length !== 0 || this.state.prodList === true ? (
              <ProductList
                backHandler={this.backHandler}
                data={this.state.data}
                loaderHandler={this.loaderHandler}
                additem={this.props.additem}
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
                  <u>
                    {" "}
                    <b>
                      {" "}
                      <a>Product</a>
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
                    <Label>Company</Label>{" "}
                  </Col>

                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="company"
                      id="exampleSelect"
                      // style={{ width: "50px" }}
                      bsSize="sm"
                      onChange={this.changeHandler}
                    >
                      {/* <option>---select---</option> */}
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
                      name="company"
                      id="exampleSelect"
                      // style={{ width: "60px" }}
                      value={this.state.company}
                      bsSize="sm"
                      onChange={this.inputChangeHandler}
                      // onBlur={() => this.onBlurHandler("company")}
                      onBlur={this.onBlurHandler}
                    >
                      {" "}
                      {/* <option>---select-----</option> */}
                      <option value="SK">SK</option>
                    </Input>
                  </Col>

                  <Col> </Col>
                  <Col>
                    <Label>Product</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="idReference"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
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
                      onChange={this.inputChangeHandler}
                      name="idReference"
                      value={this.state.idReference}
                      onBlur={this.onBlurHandler}
                      // onBlur={() => this.onBlurHandler("idReference")}
                    />
                  </Col>
                  <Col> </Col>
                </Row>
                <Row>
                  <Col>
                    <Label>Product Description</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="description"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
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
                      onChange={this.inputChangeHandler}
                      name="description"
                      value={this.state.description}
                      onBlur={this.onBlurHandler}
                      // onBlur={() => this.onBlurHandler("description")}
                    />
                  </Col>
                  <Col></Col>
                  <Col>
                    <Label>Available</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="available"
                      id="exampleSelect"
                      // style={{ width: "50px" }}
                      bsSize="sm"
                      onChange={this.changeHandler}
                    >
                      {/* <option>---select---</option> */}
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      {/* <option value=">">&gt;</option> */}
                      {/* <option value="<">&lt;</option> */}
                      {/* <option value="<=">&le;</option> */}
                      {/* <option value=">=">&ge;</option> */}
                      {/* <option value="STARTS">STARTS_WITH</option> */}
                      {/* <option value="CONTAINS">CONTAINS</option> */}
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      {/* <option value="MATCHES">MATCHES</option> */}
                      {/* <option value="NOT MATCHES">NOT_MATCHES</option> */}
                    </Input>
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="available"
                      id="exampleSelect"
                      // style={{ width: "60px" }}
                      value={this.state.available}
                      bsSize="sm"
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                    >
                      {" "}
                      <option>---select---</option>
                      <option value="1">Yes</option>
                      <option value="0">No</option>
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
                      name="statusProduct"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      {/* <option value=">">&gt;</option> */}
                      {/* <option value="<">&lt;</option> */}
                      {/* <option value="<=">&le;</option> */}
                      {/* <option value=">=">&ge;</option> */}
                      {/* <option value="STARTS">STARTS_WITH</option> */}
                      {/* <option value="CONTAINS">CONTAINS</option> */}
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      {/* <option value="MATCHES">MATCHES</option> */}
                      {/* <option value="NOT MATCHES">NOT_MATCHES</option> */}
                    </Input>
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="statusProduct"
                      id="exampleSelect"
                      value={this.state.statusProduct}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      <option value="">---select---</option>
                      <option value="100">created</option>
                      <option value="400">closure request</option>
                      <option value="500">closed</option>
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
                      name="typeProduct"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      {/* <option value=">">&gt;</option> */}
                      {/* <option value="<">&lt;</option> */}
                      {/* <option value="<=">&le;</option> */}
                      {/* <option value=">=">&ge;</option> */}
                      {/* <option value="STARTS">STARTS_WITH</option> */}
                      {/* <option value="CONTAINS">CONTAINS</option> */}
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      {/* <option value="MATCHES">MATCHES</option> */}
                      {/* <option value="NOT MATCHES">NOT_MATCHES</option> */}
                    </Input>
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="typeProduct"
                      id="exampleSelect"
                      value={this.state.typeProduct}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      <option>---select---</option>
                      <option value="200">consumable</option>
                      <option value="100">production</option>
                    </Input>
                  </Col>
                  <Col> </Col>
                </Row>

                <Row>
                  <Col>
                    <Label>Product Short Description</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="descriptionShort"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
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
                      onChange={this.inputChangeHandler}
                      name="descriptionShort"
                      value={this.state.descriptionShort}
                      onBlur={this.onBlurHandler}
                    />
                  </Col>

                  <Col></Col>
                  <Col>
                    <Label>Product Complementory Description</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="descriptionCompl"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
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
                      onChange={this.inputChangeHandler}
                      name="descriptionCompl"
                      value={this.state.descriptionCompl}
                      onBlur={this.onBlurHandler}
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row>
                  <Col>
                    <Label>Created The</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="creationDate"
                      id="exampleSelect"
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value=">">&gt;</option>
                      <option value="<">&lt;</option>
                      <option value="<=">&le;</option>
                      <option value=">=">&ge;</option>
                      {/* <option value="STARTS">STARTS_WITH</option> */}
                      {/* <option value="CONTAINS">CONTAINS</option> */}
                      {/* <option value="AMONG">AMONG</option> */}
                      {/* <option value="NOT AMONG">NOT_AMONG</option> */}
                      <option value="for">FOR</option>
                      <option value="until">UNTIL</option>
                    </Input>
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="date"
                      name="creationDate"
                      id="exampleSelect"
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    ></Input>
                  </Col>

                  <Col></Col>
                  <Col>
                    <Label>Intermediate Material Code</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="zIMC"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
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
                      onChange={this.inputChangeHandler}
                      // onChange={this.changeHandler}
                      name="zIMC"
                      value={this.state.zIMC}
                      onBlur={this.onBlurHandler}
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row>
                  <Col>
                    <Label>Grade</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="zGrade"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
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
                      type="text"
                      name="zGrade"
                      value={this.state.zGrade}
                      id="exampleSelect"
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    ></Input>
                  </Col>

                  <Col></Col>
                  <Col>
                    <Label>Material Type</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="zMaterialType"
                      onChange={this.changeHandler}
                      id="exampleSelect"
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
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
                      name="zMaterialType"
                      value={this.state.zMaterialType}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row>
                  <Col>
                    <Label>Quality</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="zQuality"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      {/* <option value=">">&gt;</option> */}
                      {/* <option value="<">&lt;</option> */}
                      {/* <option value="<=">&le;</option> */}
                      {/* <option value=">=">&ge;</option> */}
                      {/* <option value="STARTS">STARTS_WITH</option> */}
                      {/* <option value="CONTAINS">CONTAINS</option> */}
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      {/* <option value="MATCHES">MATCHES</option> */}
                      {/* <option value="NOT MATCHES">NOT_MATCHES</option> */}
                    </Input>
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="zQuality"
                      id="exampleSelect"
                      value={this.state.zQuality}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      <option>---select---</option>
                      <option value="200">No Prime</option>
                      <option value="100">Prime</option>
                      <option value="300">Scrap</option>
                    </Input>
                  </Col>

                  <Col></Col>
                  <Col>
                    <Label>Product Type</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="zProductType"
                      id="exampleSelect"
                      onChange={this.changeHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      {/* <option>---select---</option> */}
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      {/* <option value=">">&gt;</option> */}
                      {/* <option value="<">&lt;</option> */}
                      {/* <option value="<=">&le;</option> */}
                      {/* <option value=">=">&ge;</option> */}
                      {/* <option value="STARTS">STARTS_WITH</option> */}
                      {/* <option value="CONTAINS">CONTAINS</option> */}
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                      {/* <option value="MATCHES">MATCHES</option> */}
                      {/* <option value="NOT MATCHES">NOT_MATCHES</option> */}
                    </Input>
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="zProductType"
                      id="exampleSelect"
                      value={this.state.zProductType}
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
                      <option>---select---</option>
                      <option value="200">Bulk</option>
                      <option value="100">Non Bulk</option>
                    </Input>
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

                  <Col></Col>
                  <Col>{/* <Label>Product Type</Label>{" "} */}</Col>
                  <Col>
                    
                  </Col>
                  <Col>
                    {/* {" "}
                      <Input bsSize="sm" /> */}
                  </Col>
                  <Col> </Col>
                </Row>

                <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Button
                    // onClick={() => {
                    //   this.resetdata();
                    // }}
                    type="reset"
                    value="Reset"
                    onClick={this.resetdata}
                  >
                    Reset Criteria
                  </Button>{" "}
                  <Button onClick={this.criteriaFilterMethod} type="button">
                    {" "}
                    Submit
                  </Button>
                </div>
              </div>
            )}
          </Container>
        {/* </form> */}
      </React.Fragment>
    );
  }
}

export default ProductFilter;
