import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
    Button,
  } from "reactstrap";
import StockSnapList from './StockSnapList';
import { StockSnapData, StockSnapHandler,snapshotcriteriaHandler,snapshotcriteria } from '../../../../store/Store';
import axios from "axios";
import { properties } from '../../../../Properties/Properties';
const getWarehousesForPhysicalgate = properties.Port + properties.getWarehousesForPhysicalgate;
const getlistofstocksnapshotfiltercriteria=properties.Port + properties.getlistofstocksnapshotfiltercriteria;
const getListOfAllRegionsWarehouseDescription = properties.Port + properties.getListOfAllRegionsWarehouseDescription;
const getlistofcontentonlystatus =
  properties.Port + properties.getlistofcontentonlystatus;
  const getlistOfAllCompanies = properties.Port + properties.getlistOfAllCompanies

class StockSnapFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {
      orderList: false,
        data: [],
        batch: "",
        coefUnit: 0,
        contentStatus: 0,
        description: "",
        descriptionUnit: "",
        idCompany: "",
        idProduct: 0,
        idRefrence: "",
        idWarehouse: "",
        listFilterBean:[],
        attribute: null,
        operation: "=",
        value: null,
        quantity: 0,
        type: 0,
        weight: 0,
        zGrade: "",
        zIntermaterialCode: "",
        zProductType: 0,
        zQuality: 0,
        idWarehouseList:[],
        allRegionDesc:[],
        idCompanyArr:[],
        idRegion:"",
        idContentArr:[],
        contentStatusId:"",
        limit: "",



      }
      }
        componentDidMount=()=>{
      console.log("testing api trailer release calling")
      this.getIdWarehouseList();
      this.getListOfAllRegionsWarehouseDescription();
      this.getlistofcontentonlystatus();
     this.getCompanyMethod();
      }
      
      getListOfAllRegionsWarehouseDescription=()=>{
        console.log("getListOfAllRegionsWarehouseDescription calling")
        
        axios
        .get(getListOfAllRegionsWarehouseDescription)
        .then((response) => {
          if (response.status === 200) {
            console.log("resposne success", response.data);
             this.setState({
           allRegionDesc: response.data
      
            })
          }
        })
        .catch((error) => {
          console.log(error);
        });
      
      }
      getIdWarehouseList = () => {
        console.log("calling region from dropdown", this.state.idWarehouseList) 
        axios.get(getWarehousesForPhysicalgate)
    
          .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success uzmmmmmaaaa", response.data);
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

      getCompanyMethod = () => {
        axios
            .get(getlistOfAllCompanies)
            .then((response) => {
                if (response.status === 200) {
                    console.log("resposne success for company", response.data);
                    this.setState({
                        // message: "Data Saved Successfully",
                        idCompanyArr: response.data
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
    
      // criteriaFilterMethod = () => {
      //   const length = this.state.listFilterBean.length;
      //   const listFilterBean = [];
      //   console.log("=================== testing data===>", this.state.listFilterBean);
      //   for (let i = 0; i < length; i++) {
      //     console.log("value of ii", i);
      //     if (this.state.listFilterBean[i].value !== "") {
      //       listFilterBean.push(this.state.listFilterBean[i]);
      //     }
      //   }
      //   console.log("on submitting", listFilterBean);
      //   this.setState({
      //     listFilterBean: listFilterBean,
      //   });
      //   const criteria = {
      //     listFilterBean: listFilterBean,
      //     limit: this.state.limit,
      //   };
      //   console.log("testtttttttttttttt  api ");
      //   // const criteria = {
      //   //   listFilterBean: this.state.listFilterBean,
      //   //   limit: this.state.limit,
      //   // };
      //   axios
      //     .post(getlistofstocksnapshotfiltercriteria, this.state, {
      //       params: {
      //         limit: this.state.limit,
      //       },
      //     })
      //     .then((response) => {
      //       console.log("snapshot=========>")
      //       if (response.status === 200 && response.data.length !== 0) {
      //         console.log("resposne success ______________________________", response.data);
      //         this.setState({
      //           data: response.data,
      //           orderList: true,
      //         });
      //         StockSnapHandler(response.data);
      //         snapshotcriteriaHandler(criteria);
      //       } else {
      //         this.setState({
      //           orderList: true,
      //           data: [],
      //         });
            
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
      // };

      criteriaFilterMethod = () => {
        const length = this.state.listFilterBean.length;
        const listFilterBean = [];
          console.log("testtttttttttttttt  api ", getlistofstocksnapshotfiltercriteria);
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
            .post(getlistofstocksnapshotfiltercriteria, criteria, {
              params: {
                limit: this.state.limit,
              },
            })
      
            .then((response) => {
              if (response.status === 200 && response.data.length !== 0) {
                console.log("resposne success", response.data);
                this.setState({
                  data: response.data,
                  orderList: true,
                });
                StockSnapHandler(response.data);
                snapshotcriteriaHandler(criteria);
              } else {
                this.setState({
                  orderList: true,
                  data: [],
                });
                StockSnapHandler(response.data);
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
            value: " ",
    
          };
          this.state.listFilterBean.push(data);
        } else {

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



      onBlurHandler = (criteria) => {
        console.log("calling onBlurrrrr", criteria.target.name);
        console.log("calling onBlurrrrr", criteria.target.value);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        console.log("INDEX VALUE FOR IF PART IN ALUE", index);
      
        if (criteria.target.value !== "") {
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
          if (criteria.target.name === "coefUnit") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.coefUnit,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.coefUnit;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "contentStatus") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.contentStatus,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.contentStatus;
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
          }

          
          if (criteria.target.name === "idRegion") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.idRegion,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idRegion;
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
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }  
          if (criteria.target.name === "descriptionUnit") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.descriptionUnit,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.descriptionUnit;
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

          // if (criteria.target.name === "idProduct") {
          //   var index = this.state.listFilterBean.findIndex(
          //     (data) => data.attribute === criteria.target.name
          //   );
          //   if (index === -1) {
          //     const data = {
          //       attribute: criteria.target.name,
          //       operation: this.state.operation,
          //       value: this.state.idProduct,
          //     };
          //     this.state.listFilterBean.push(data);
          //   } else {
          //     this.state.listFilterBean[index].value = this.state.idProduct;
          //     console.log("updataed else partttt", this.state.listFilterBean);
          //   }
          // }

          if (criteria.target.name === "idRefrence") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.idRefrence,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idRefrence;
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


          if (criteria.target.name === "quantity") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.quantity,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.quantity;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }

          if (criteria.target.name === "type") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.type,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.type;
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
          if (criteria.target.name === "zIntermaterialCode") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.zIntermaterialCode,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.zIntermaterialCode;
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

          if (criteria.target.name === "zmaterialType") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.zmaterialType,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.zmaterialType;
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
    
     

      
      
      backHandler=()=>{
        console.log("calling back handler")
        this.setState({
          orderList: false
        })
      }
    
      resetdata=()=>{
        this.setState({
          limit: "",
          orderList: false,
          data: [],
          batch: "",
          coefUnit: 0,
          contentStatus: 0,
          description: "",
          descriptionUnit: "",
          idCompany: "",
          idProduct: 0,
          idRefrence: "",
          idWarehouse: "",
          listFilterBean:[],
          attribute: null,
          operation: "=",
          value: null,
           quantity: 0,
          type: 0,
          weight: 0,
          zGrade: "",
          zIntermaterialCode: "",
          zProductType: 0,
          zQuality: 0,
          idWarehouseList:[],
          allRegionDesc:[],
          idRegion:"",
          idContentArr:[],
          contentStatusId:"",
         
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
              {StockSnapData.length !== 0 || this.state.orderList === true ?
               (
                <StockSnapList backHandler={this.backHandler} 
                data={this.state.data} additem={this.props.additem} />
              ) 
              : (
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
                        <a>Stock Snapshot Search</a>
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
                    <b style={{ marginLeft: "5px" }}>Stock Criteria</b>
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
                        name="idWarehouse"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.idWarehouse}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        onBlur={this.onBlurHandler}
                      >
                         <option value="">---select---</option>
                      {this.state.idWarehouseList.map(data => <option value={data.idWarehouse} key={data.idWarehouse}>{data.description}</option>)}
                    </Input>
                    </Col>

    
                   
                    <Col>
                      <Label>Company</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idCompany"
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
                        bsSize="sm"
                        value={this.state.idCompany}
                        onChange={this.inputChangeHandler}
                        onBlur={this.onBlurHandler}
                      >
                         <option value =""> </option>
                     {this.state.idCompanyArr.map((data) => (
                      <option
                        value={data.idCompany}
                        key={data.businessName}
                      >
                        {data.businessName}
                      </option>
                    ))}  
                        {/* <option value="">    </option>
                        <option value="SK">Sabic</option> */}

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
                        name="idRefrence"
                        value={this.state.idRefrence}
                        onBlur={this.onBlurHandler}
                      />
                    </Col>
    
                  
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
                      <Input
                      bsSize="sm"
                      onChange={this.inputChangeHandler}
                      name="zIntermaterialCode"
                      value={this.state.zIntermaterialCode}
                      onBlur={this.onBlurHandler}

                      >
                       
                      </Input>
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
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
    
                   
                    <Col>
                      <Label>Material Type</Label>{" "}
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
                      name="zmaterialType"
                      value={this.state.zmaterialType}
                      onBlur={this.onBlurHandler}                      >
                        
                      </Input>
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Quality</Label>{" "}
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
                         name="zQuality"
                         id="exampleSelect"
                         value={this.state.zQuality}
                         bsSize="sm"
                         onChange={this.inputChangeHandler}
                         onBlur={this.onBlurHandler}
                      >
                        <option value="">  </option>
                        <option value="100">_Prime_</option>
                        <option value="200">_Non Prime_</option>
                        <option value="300">_Scrap_</option>
                      </Input>
                    </Col>
    
                   
                    <Col>
                      <Label>Product Type</Label>{" "}
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
                      name="zProductType"
                      id="exampleSelect"
                      value={this.state.zProductType}
                      bsSize="sm"
                      onChange={this.inputChangeHandler}
                      onBlur={this.onBlurHandler}
                      >
                        <option value="">  </option>
                        <option value="200">_Bulk_</option>
                        <option value="100">_Non Bulk_</option>

                      </Input>
                      
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
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
                         name="type"
                         id="exampleSelect"
                         value={this.state.type}
                         bsSize="sm"
                         onChange={this.inputChangeHandler}
                         onBlur={this.onBlurHandler}
                      >
                        <option value="">  </option>
                        <option value="200">Picking</option>
                        <option value="600">Preparation </option>
                        <option value="300">PICKING_DYNAMIC</option>
                        <option value="100">_Stock_</option>

                      </Input>
                    </Col>
    
                   
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
                    <Col> </Col>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Region</Label>{" "}
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
                        name="idRegion"
                        id="exampleSelect"
                        value={this.state.idRegion}
                        onChange={this.inputChangeHandler}
                        onBlur={this.onBlurHandler}
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option></option>
                       {this.state.allRegionDesc.map(data=> <option value={data.idRegion}>{data.whDesc}</option>)}
                      </Input>
                    </Col>
    
                   
                    <Col>
                      <Label>Batch</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="batch"
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
                     name="batch"
                     value={this.state.batch}
                     onBlur={this.onBlurHandler}                   
                      >
                     
                      </Input>
                      
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Group by Material Type</Label>{" "}
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
                      <input type="checkbox" id="myid"></input>
                    </Col>
    
                   
                    <Col>
                      <Label>Group by Material Type/packaging</Label>{" "}
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
                      <input type="checkbox" id="myid"></input>
                      
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Group by Type</Label>{" "}
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
                      <input type="checkbox" id="myid"></input>
                    </Col>
    
                   
                    <Col>
                      <Label>Group by Content Status</Label>{" "}
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
                      <input type="checkbox" id="myid"></input>
                      
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Group by Characteristics</Label>{" "}
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
                      <input type="checkbox" id="myid"></input>
                    </Col>
    
                   
                    <Col>
                      {/* <Label>Group by Material Type/packaging</Label> */}
                      {" "}
                    </Col>
                    <Col>
                      {" "}
                      {/* <Input
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
                      {" "}
                      {/* <input type="checkbox" id="myid"></input> */}
                      
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
    
                    <Col>
                      {/* <Label>Sabic Order Id</Label>{" "} */}
                    </Col>
                    <Col>
                      {" "}
                      {/* <Input
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
                      {" "}
                      {/* <Input bsSize="sm" /> */}
                    </Col>
                    <Col> </Col>
                  </Row>

                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Button  onClick={this.resetdata}>Reset Criteria</Button>{" "}
                    <Button
                      onClick={
                       this.criteriaFilterMethod
                      }
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

export default StockSnapFilter;