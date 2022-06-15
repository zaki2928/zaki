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
import LogisticUnitList from "./LogisticUnitList";
import { LogisticUnitData, LogisticUnitHandler,LogisticUnitfilterHandler,logisticUnitCriteriaHandler } from "../../../../store/Store";
import axios from "axios";
import { properties } from "../../../../Properties/Properties";

const getListofAllFilteredDataForLUproduct = properties.Port + properties.getListofAllFilteredDataForLUproduct
class LogisticUnitFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packagingList: false,
      data: [],
      limit: "",
      description: "",
      idProduct: "",
      idReference: "",
      mDate: "",
      mUsername: "",
      rotation: "",
      zGrade: "",
      zIMC: "",
      controlQty: '',
      description: "",
      height: '',
      idLU: '',
      idLogisticUnit: "",
      idProduct: '',
      length: '',
      mDate: '',
      mUsername: '',
      quantity: '',
      statusError: '',
      statusLu: '',
      versionLock: '',
      weight: '',
      weightNet: '',
      width: '',
      prodDescription:'',
      prodGrade:'',
      prodIMC:'',
      prodProduct:'',
      listFilterBean: [],
      criteria: "",
      operation: "=",
      attribute: null,
      value: null,

    };
  }
  // componentDidMount = () => {
  //   console.log("passed data from product table", LogisticUnitData);
  //   if (LogisticUnitData.length !== 0) {
  //     this.setState({
  //       data: LogisticUnitData,
  //     });
  //   }
  // };

  criteriaFilterMethod = () => {
    const length = this.state.listFilterBean.length;
    const listFilterBean = [];
    console.log("testtttttttttttttt  api ", getListofAllFilteredDataForLUproduct);
    for (let i = 0; i < length; i++) {
      console.log("value of i", i);
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
    console.log("criteria+++++++++",criteria)
    axios
      .post(getListofAllFilteredDataForLUproduct, criteria, {
         params: {
          limit: this.state.limit,
        },
      })

      .then((response) => {
        console.log("shahid",response.data)
        if (response.status === 200 && response.data !== null && response.data !== "") {
          // const criteria = {
          //   listFilterBean: this.state.listFilterBean,
          //   limit: this.state.limit,
          // };

          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
            packagingList: true,
          });
      // LogisticUnitfilterHandler(criteria)

          LogisticUnitHandler(response.data);
          logisticUnitCriteriaHandler(criteria);
        } else {
          this.setState({
            data: [],
          });
          LogisticUnitHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
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
    // this.state.listFilterBean[index] = {
    //   operation: event.target.value
    // }
    console.log("index AFTER UPDATE print", this.state.listFilterBean);
    // this.setState({
    //   attribute: event.target.name,
    //   operation: event.target.value
    // })
  };

  onBlurHandler = (criteria) => {
    console.log("calling onBlurrrrr", criteria.target.name);
    console.log("calling onBlurrrrr", criteria.target.value);
    var index = this.state.listFilterBean.findIndex(
      (data) => data.attribute === criteria.target.name
    );
    console.log("INDEX VALUE FOR IF PART IN ALUE", index);

    if (criteria.target.value !== "") {
    if (criteria.target.name === "idLogisticUnit") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.idLogisticUnit,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.idLogisticUnit;
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

    if (criteria.target.name === "statusLu") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.statusLu,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.statusLu;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "length") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.length,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.length;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "width") {
      console.log("shahiddddddddd");
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.width,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.width;
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


  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
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

  backHandler = () => {
    console.log("calling back handler");
    this.setState({
      packagingList: false,
      data: [],
      limit: "",
      description: "",
      idProduct: "",
      idReference: "",
      mDate: "",
      mUsername: "",
      rotation: "",
      zGrade: "",
      zIMC: "",
      controlQty: '',
      description: "",
      height: '',
      idLU: '',
      idLogisticUnit: "",
      idProduct: '',
      length: '',
      mDate: '',
      mUsername: '',
      quantity: '',
      statusError: '',
      statusLu: '',
      versionLock: '',
      weight: '',
      weightNet: '',
      width: '',
      prodDescription:'',
      prodGrade:'',
      prodIMC:'',
      prodProduct:'',
      listFilterBean: [],
      criteria: "",
      operation: "=",
      attribute: null,
      value: null,
    });
  };

  resetHandler = () =>{
    this.setState({
      packagingList: false,
      data: [],
      limit: "",
      description: "",
      idProduct: "",
      idReference: "",
      mDate: "",
      mUsername: "",
      rotation: "",
      zGrade: "",
      zIMC: "",
      controlQty: '',
      description: "",
      height: '',
      idLU: '',
      idLogisticUnit: "",
      idProduct: '',
      length: '',
      mDate: '',
      mUsername: '',
      quantity: '',
      statusError: '',
      statusLu: '',
      versionLock: '',
      weight: '',
      weightNet: '',
      width: '',
      prodDescription:'',
      prodGrade:'',
      prodIMC:'',
      prodProduct:'',
      listFilterBean: [],
      criteria: "",
      operation: "=",
      attribute: null,
      value: null,
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
          {LogisticUnitData !== null ||
          this.state.packagingList === true ? (
            <LogisticUnitList
              backHandler={this.backHandler}
              data={this.state.data}
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
                    <a>Logistic Units Search</a>
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
                  <Label>Logistic Unit ID</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="idLogisticUnit"
                    id="exampleSelect"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
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
                    // name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    name="idLogisticUnit"
                    value={this.state.idLogisticUnit}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  >
                   
                  </Input>
                </Col>

                <Col>
                  <Label>Logistic Unit Description</Label>{" "}
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
                  <Input bsSize="sm"
                  name="description"
                  value={this.state.description}
                   onChange={this.inputChangeHandler}
                   onBlur={this.onBlurHandler}
                  />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
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
                   
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    name="idReference"
                    value={this.state.idReference}
                     onChange={this.inputChangeHandler}
                     onBlur={this.onBlurHandler}
                  >
                   
                  </Input>
                </Col>

                <Col>
                  <Label>Description Product</Label>{" "}
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
                  <Input bsSize="sm" 
                   name="description"
                   value={this.state.description}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Status</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="statusLu"
                    id="exampleSelect"
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
                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    // name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    name="statusLu"
                    value={this.state.statusLu}
                     onChange={this.inputChangeHandler}
                     onBlur={this.onBlurHandler}
                  >
                    <option value="">      </option>
                    <option value="100">_InProgress_</option>
                    <option value="200">_To be filled_</option>
                    <option value="400">_Closure request_</option>
                    <option value="500">_Closed_</option>
                  
                  </Input>
                </Col>

                <Col>
                  <Label>Length(cm)</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="length"
                    id="exampleSelect"
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
                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm" 
                   name="length"
                   value={this.state.length}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Width(cm)</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="width"
                    id="exampleSelect"
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
                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="text"
                    // name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    name="width"
                    value={this.state.width}
                     onChange={this.inputChangeHandler}
                     onBlur={this.onBlurHandler}
                  >
                   
                  </Input>
                </Col>

                <Col>
                  <Label>Height(cm)</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="height"
                    id="exampleSelect"
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
                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm" 
                   name="height"
                   value={this.state.height}
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
                  <Input bsSize="sm"
                   onChange={this.limitchangehandler}
                   name="limit"
                   value={this.state.limit}
                  />
                </Col>

                <Col>{/* <Label>Product Type</Label>{" "} */}</Col>
                <Col>
                  {/* {" "}
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
                      </Input> */}
                </Col>
                <Col>
                  {/* {" "}
                      <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>

              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Button onClick={this.resetHandler}>Reset Criteria</Button>{" "}
                <Button onClick={this.criteriaFilterMethod}> Submit</Button>
              </div>
            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default LogisticUnitFilter;
