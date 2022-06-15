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
  IoInformation,
  IoInformationCircle,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import Statuschangelist from "../../../Storage/management/StatusChange/Statuschangelist";
import {Statuschangedata,statuschangeHandler,statuschangeCriteriaHandler} from "../../../../store/Store";
import { properties } from "../../../../Properties/Properties";
import axios from "axios";
const getListOfFilterDataForChangeStatus =
  properties.Port + properties.getListOfFilterDataForChangeStatus;
const getListOfAllWarehouse = properties.Port + properties.getListOfAllWarehouse
const getlistofcontentonlystatus =
  properties.Port + properties.getlistofcontentonlystatus;

 class Statuschange extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status : false,
      data:[],
      batch: "",
  coefUnit: 0,
  contentStatusId: 0,
  description: "",
  descriptionUnit: "",
  idCompany: "",
  idContainer: "",
  idContentStk: 0,
  idExpectedCoefUnit: 0,
  idLocation: "",
  idLogisticUnit: "",
  idProduct: 0,
  idReference: "",
  idWarehouse: "",
  attribute: null,
      operation: "=",
      value: null,

  mDate: "",
  mUserName: "",
  qtyReservedCoefUnit: 0,
  quantityCoefUnit: 0,
  statusContainer: 0,
  statusMvt: 0,
  typeContainer: 0,
  typeContent: 0,
  versionLock: 0,
  zGrade: "",
  zInterMaterialCode: "",
  idWarehouseArr: [],
  idContentArr: [],
  limit:"",
  listFilterBean: []
    };
  }

  componentDidMount=()=>{
    console.log("calling status change filter");
    this.getListOfAllWarehouse();
    this.getlistofcontentonlystatus();
    }

    getListOfAllWarehouse = () => {
      console.log("getListOfAllWarehouse calling")
  
      axios
        .get(getListOfAllWarehouse)
        .then((response) => {
          if (response.status === 200) {
            console.log("resposne success for warehouse", response.data);
            this.setState({
              // message: "Data Saved Successfully",
              idWarehouseArr: response.data
            });
  
          }
        })
        .catch((error) => {
          console.log(error);
        });
  
    }

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
      const length = this.state.listFilterBean.length;
      const listFilterBean = [];
        console.log("testtttttttttttttt  api ", getListOfFilterDataForChangeStatus);
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
        const criteria = {
          listFilterBean: this.state.listFilterBean,
          limit: this.state.limit,
        };
        axios
          .post(getListOfFilterDataForChangeStatus, criteria, {
            params: {
              limit: this.state.limit,
            },
          })
    
          .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success", response.data);
              this.setState({
                data: response.data,
               status: true,
              });
              statuschangeHandler(response.data);
              statuschangeCriteriaHandler(criteria);
            } else {
              this.setState({
                status: true,
                 data: [],
              });
              statuschangeHandler(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

    // criteriaFilterMethod = () => {
    //   const length = this.state.listFilterBean.length;
    //   const listFilterBean = [];
    //     console.log("testtttttttttttttt  api ", getListOfFilterDataForChangeStatus);
    //     for (let i = 0; i < length; i++) {
    //       console.log("value of ii", i);
    //       if (this.state.listFilterBean[i].value !== " ") {
    //         listFilterBean.push(this.state.listFilterBean[i]);
    //       }
    //     }
    //     console.log("on submittIIIIIIIng", listFilterBean);
    //     this.setState({
    //       listFilterBean: listFilterBean,
    //     });
    //     const criteria = {
    //       listFilterBean ,
    //       limit: this.state.limit,
    //     };
    //     axios
    //       .post(getListOfFilterDataForChangeStatus, criteria, {
    //         params: {
    //           limit: this.state.limit,
    //         },
    //       })
    
    //       .then((response) => {
    //         if (response.status === 200 && response.data.length !== 0) {
    //           console.log("resposne success", response.data);
    //           this.setState({
    //             data: response.data,
    //             status: true,
    //           });
    //           statuschangeHandler(response.data);
    //           statuschangeCriteriaHandler(criteria);
    //         } else {
    //           this.setState({
    //             status: true,
    //             data: [],
    //           });
    //           statuschangeHandler(response.data);
    //         }
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   };
    
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
            value: " ",
    
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
          if (criteria.target.name === "idLocation") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: '19@'.concat(this.state.idLocation),
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idLocation;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "idContainer") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.idContainer,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idContainer;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "idCompany") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.idCompany,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idCompany;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "idProduct") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.idProduct,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idProduct;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "zInterMaterialCode") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.zInterMaterialCode,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.zInterMaterialCode;
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
          if (criteria.target.name === "typeContent") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.typeContent,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.typeContent;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "contentStatusId") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.contentStatusId,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.contentStatusId;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          

          if (criteria.target.name === "idWarehouse") {
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
    
      limitchangehandler = (event) => {
        if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
          this.setState({
            [event.target.name]: event.target.value,
          });
        } else {
        }
      };

      resetdata = () => {
        console.log("reset handler");
        this.setState({
          status : false,
          data:[],
          batch: "",
      coefUnit: 0,
      contentStatusId: 0,
      description: "",
      descriptionUnit: "",
      idCompany: "",
      idContainer: "",
      idContentStk: 0,
      idExpectedCoefUnit: 0,
      idLocation: "",
      idLogisticUnit: "",
      idProduct: 0,
      idReference: "",
      idWarehouse: "",
      attribute: null,
          operation: "=",
          value: null,
    
      mDate: "",
      mUserName: "",
      qtyReservedCoefUnit: 0,
      quantityCoefUnit: 0,
      statusContainer: 0,
      statusMvt: 0,
      typeContainer: 0,
      typeContent: 0,
      versionLock: 0,
      zGrade: "",
      zInterMaterialCode: "",
      limit:"",
      listFilterBean: []
        })
      };

    // Submithandler=()=>{
    //   console.log("submit handler stataus filter calling")
    //   axios
    //   .get("https://jsonplaceholder.typicode.com/posts")
    //   .then((response) => {
    //     if (response.status === 200) {
    //       console.log("resposne success", response.data);
    // this.setState({
    //   data:response.data,
    //   status:true
    
    // })
    
    // statuschangeHandler( response.data)
          
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }

    backHandler=()=>{
      console.log("calling back Handler")
        this.setState({
      
          status:false
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
          {this.state.status === true ||Statuschangedata.length!==0? (
            <Statuschangelist
            
            backHandler={this.backHandler}
            data={this.state.data}
            
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
                    <a>Status Search</a>
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
                    type="select"
                    name="select"
                    id="exampleSelect"
                    bsSize="sm"
                    onChange={this.changeHandler}

                  >
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    <option value="AMONG">AMONG</option>
                    <option value="NOT AMONG">NOT_AMONG</option>                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input 
                    type="select"
                    name="idWarehouse"
                    value={this.state.idWarehouse}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option value = ""> </option>
                    {this.state.idWarehouseArr.map(data => <option value={data.idWarehouse} key={data.idWarehouse}>{data.description}</option>)}
                 
                  </Input>
                </Col>

                <Col> </Col>
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
                    onChange={this.changeHandler}

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
                    onChange={this.inputChangeHandler}
                    name="idLocation"
                    value={this.state.idLocation}
                    onBlur={this.onBlurHandler} />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Container</Label>{" "}
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
                   name="idContainer"
                   value={this.state.idContainer}
                   onBlur={this.onBlurHandler}
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
                   name="idCompany"
                   id="exampleSelect"
               
                   value={this.state.idCompany}
                   bsSize="sm"
                   onChange={this.inputChangeHandler}
                  
                   onBlur={this.onBlurHandler}
                  >
                    <option value = ""> </option>
                    <option value = "">Sabic</option>
                    
                  </Input>
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{marginTop:"5px"}}>
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
                    onChange={this.changeHandler}

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
                   onChange={this.inputChangeHandler}
                   name="idReference"
                   value={this.state.idReference}
                   onBlur={this.onBlurHandler} />
                </Col>

                <Col></Col>
                <Col>
                  <Label>Intermediate Material Code</Label>{" "}
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
                   onChange={this.inputChangeHandler}
                   name="zInterMaterialCode"
                   value={this.state.zInterMaterialCode}
                   onBlur={this.onBlurHandler} />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Grade</Label>{" "}
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
                    name="zGrade"
                    value={this.state.zGrade}
                    onBlur={this.onBlurHandler}
                  >
                    
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
                    name="typeContent"
                    id="exampleSelect"
                   
                    value={this.state.typeContent}
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    
                    onBlur={this.onBlurHandler}
                  >
                    <option value = "100">_Stock_</option>
              
                  </Input>
                </Col>
                <Col> </Col>
              </Row>


              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Content Status</Label>{" "}
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
                    name="contentStatusId"
                    value={this.state.contentStatusId}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    bsSize="sm"
                  >
                    <option value =""> </option>
                     {this.state.idContentArr.map((data) => (
                      <option
                        value={data.contentStatusId}
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
                    id="batch"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    onChange={this.changeHandler}

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
                   onBlur={this.onBlurHandler}
                   onChange={this.inputChangeHandler}

                   />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
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
                    name="statusMvt"
                    id="exampleSelect"
                    value={this.state.statusMvt}
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  >
                    <option value = "100">_Immobile_</option>
                    
                  </Input>
                </Col>

                <Col></Col>
                <Col>
                </Col>
                <Col>
                  {" "}
                
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Maximum result</Label>{" "}
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
                    &le;
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
                <Col>
                  {" "}
                </Col>
                <Col>
                  {" "}
                  </Col>
                <Col>
                  {" "}
                
                </Col>
                <Col> </Col>
              </Row>
              <div
                style={{
                  
                }}
              >
              </div>



              {/* <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Row>
                      <Col><Button 
                            size="sm"
                      style={{marginTop:"10px",
                    }}
                      
                      
                      >Reset Criteria</Button>
</Col>
                      <Col><Button 
                  onClick={
                    this.Submithandler
                  }
                  style={{marginTop:"10px"}}
                  size="sm"
                >
                  {" "}
                  Submit
                </Button></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col><span style={{color:"lightgreen",
                    }}
                    
                    >
                        <b style={{color:"black",
                    marginRight:"5px"}}> <IoInformationCircle/></b><u><b>filters</b></u></span></Col>
                   
                                
            </Row>
              </div> */}

    <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Button  onClick={this.resetdata}>Reset Criteria</Button>{" "}
                <Button 
                 onClick={this.criteriaFilterMethod}
                >
                  {" "}
                  Display
                </Button>
              </div>



            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default Statuschange;