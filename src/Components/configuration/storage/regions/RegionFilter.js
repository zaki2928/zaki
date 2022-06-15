import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
    FormGroup,
    Button,
  } from "reactstrap";
import RegionList from './RegionList';
import {
    IoArrowBackCircleSharp,
    IoArrowForwardCircleSharp,
  } from "react-icons/io5";
  import { FcSearch } from "react-icons/fc";
import { RegionData, RegionHandler, regioncriteriaHandler } from '../../../../store/Store';
import axios from "axios";
import { properties } from '../../../../Properties/Properties';

const getListOfRegionByFilterCriteria = properties.Port + properties.getListOfRegionByFilterCriteria
const getListOfAllWarehouse = properties.Port + properties.getListOfAllWarehouse
const getListOfWarehouseById = properties.Port + properties.getListOfWarehouseById
const getlistOfAllAlphabets = properties.Port + properties.getlistOfAllAlphabets

class RegionFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {
        isShow: false,
          idRegion:'',
    mDate: '',
    mUsername: "",
    versionLock: '',
    cellDescOrder: "",
    combinationCell: '',
    defaultRegion: '',
    description: "",
    descriptionShort: "",
    desc1Length: '',
    desc2Length: '',
    desc3Length: '',
    desc4Length: '',
    regionLength: '',
    sepDesc1Desc2:'' ,
    sepDesc2Desc3: "",
    sepDesc3Desc4: '',
    sepRegionDesc1: '',
    modeTransitLocation: '',
    idAlpha: '',
    idSite: "",
    idWarehouse: "",
    modeLocationScan: '',
    idAlphaArr:[],
    idWarehouseArr:[],
    listFilterBean:[],
    limit: "",
    attribute: null,
    operation: "=",
    value: null,
    criteria: "",
    passedcriteria: "",

      }
    }
    componentDidMount=()=>{
      console.log("testing api trailer release calling")
      this.getAlphabetMethod()
      this.getWarehouseMethod()
      }
      
      submitHandler=()=>{
        console.log("submitHandler calling")
        
        axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          if (response.status === 200) {
            console.log("resposne success", response.data);
             this.setState({
            data:response.data,
            packagingList:true
      
            })
      
            RegionHandler(response.data)
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
      
      }

      criteriaFilterMethod = () => {
        console.log("testtttttttttttttt  api ");
        const criteria = {
          listFilterBean: this.state.listFilterBean,
          limit: this.state.limit,
        };
        axios
          .post(getListOfRegionByFilterCriteria, this.state, {
            params: {
              limit: this.state.limit,
            },
          })
    
          .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success", response.data);
              this.setState({
                data: response.data,
                isShow: true,
              });
              RegionHandler(response.data)
              regioncriteriaHandler(criteria);
            } else {
              this.setState({
                isShow: true,
                data: [],
              });
              RegionHandler(response.data)
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
        if (criteria.target.name === "description") {
          console.log("checking description", criteria.target.name);
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
        if (criteria.target.name === "descriptionShort") {
          console.log("checking id refence", criteria.target.name);
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
            console.log("updataed if partttt", this.state.listFilterBean);
          } else {
            this.state.listFilterBean[index].value = this.state.descriptionShort;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
    
        if (criteria.target.name === "cellDescOrder") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.cellDescOrder,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.cellDescOrder;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "idAlpha") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idAlpha,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idAlpha;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "modeLocationScan") {
          console.log("shahiddddddddd");
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: '19@'.concat(this.state.modeLocationScan),
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.modeLocationScan;
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
          isShow: false,
          idRegion:'',
          mDate: '',
          mUsername: "",
          versionLock: '',
          cellDescOrder: "",
          combinationCell: '',
          defaultRegion: '',
          description: "",
          descriptionShort: "",
          desc1Length: '',
          desc2Length: '',
          desc3Length: '',
          desc4Length: '',
          regionLength: '',
          sepDesc1Desc2:'' ,
          sepDesc2Desc3: "",
          sepDesc3Desc4: '',
          sepRegionDesc1: '',
          modeTransitLocation: '',
          idAlpha: '',
          idSite: "",
          idWarehouse: "",
          modeLocationScan: '',
          idAlphaArr:[],
          idWarehouseArr:[],
          listFilterBean:[],
          limit: "",
          attribute: null,
          operation: "=",
          value: null,
          criteria: "",
          passedcriteria: "",
        })
      }

      getWarehouseMethod = () => {
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
    };


      getWarehouseById = (id) => {
        const index = this.state.dropdownWarehousevalue.findIndex((data) =>
            data.idWarehouse === id
        )
        if (index === -1) {
            console.log("user create method" + id);
            axios
                .post(getListOfWarehouseById + id)
                // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
                .then((response) => {
                    if (response.status === 200) {
                        console.log("resposne success", response.data);
                        this.state.warehouses.push(response.data)
                        this.setState({
                            // message: "Data Saved Successfully",
                            dropdownWarehousevalue: this.state.warehouses
                        });

                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    };

    getAlphabetMethod = () => {
      axios
          .get(getlistOfAllAlphabets)
          .then((response) => {
              if (response.status === 200) {
                  console.log("resposne success for alphabet", response.data);
                  this.setState({
                      // message: "Data Saved Successfully",
                      idAlphaArr: response.data
                  });

              }
          })
          .catch((error) => {
              console.log(error);
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
              {RegionData.length !== 0 || this.state.isShow === true ?
               (
                <RegionList backHandler={this.backHandler} 
                data={this.state.data} />
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
                        <a>Regions Search</a>
                      </b>
                    </u>
                  </span>
                  <br />
          
                  <div 
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      marginTop: "10px"
                    }}
                  >
                  
                    <b style={{ marginLeft: "5px" }}>StockCriteria</b>
                  </div>

                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Warehouse</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                      type="select"
                      name="idWarehouse"
                     
                      onChange={this.changeHandler}
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
                       value={this.state.idWarehouse}
                        onChange={this.inputChangeHandler}
                        onBlur={this.onBlurHandler}
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option></option>
                       {this.state.idWarehouseArr.map(data =>  <option value={data.idWarehouse} key={data.idWarehouse}>{data.description}</option>)}
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Description</Label>{" "}
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
                      <Input bsSize="sm" />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Short Description</Label>{" "}
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
                        type="text"
                        name="descriptionShort"
                        value={this.state.descriptionShort}
                        onChange={this.inputChangeHandler}
                        onBlur={this.onBlurHandler}
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                       
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Cells Order</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                      type="select"
                      name="cellDescOrder"
                    
                      onChange={this.changeHandler}
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
                      type="select"
                       name="cellDescOrder"
                       value={this.state.cellDescOrder}
                        onChange={this.inputChangeHandler}
                        onBlur={this.onBlurHandler}
                      >
                        <option></option>
                      <option value="RACIL">_RACIL_</option>
                      <option value="RACLI">_RACLI_</option>
                      </Input>
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "5px" }}>
                    <Col>
                      <Label>Alphabet</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                      type="select"
                      name="idAlpha"
                     
                      onChange={this.changeHandler}
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
                        name="idAlpha"
                       onChange={this.inputChangeHandler}
                       onBlur={this.onBlurHandler}
                       value={this.state.idAlpha}
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option></option>
                       {this.state.idAlphaArr.map(data => <option value={data.idAlpha} key={data.idAlpha}>{data.description}</option>)}
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Location Scan Mode</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                      type="select"
                      name="modeLocationScan"
                    
                      onChange={this.changeHandler}
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
                      type="select"
                      value={this.state.modeLocationScan}
                      name="modeLocationScan"
                      onBlur={this.onBlurHandler}
                      onChange={this.inputChangeHandler}
                      >
                         <option value="100">-Both_</option>
                      <option value="200">_check digits only</option>
                      </Input>
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
    
                    <Col></Col>
                    <Col>
                      {/* <Label>Product Type</Label>{" "} */}
                    </Col>
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
                    <Button>Reset Criteria</Button>{" "}
                    <Button
                      onClick={
                       this.criteriaFilterMethod
                      }
                    >
                      {" "}
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            </Container>
          </React.Fragment>
        );
    }
}

export default RegionFilter;