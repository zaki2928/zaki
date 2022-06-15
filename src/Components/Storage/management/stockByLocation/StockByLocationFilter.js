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
import {
    IoArrowBackCircleSharp,
    IoArrowForwardCircleSharp,
  } from "react-icons/io5";
  import { FcSearch } from "react-icons/fc";
import StockByLocationList from './StockByLocationList';
import { StocklocationData, StocklocationDataHandler, StocklocationCriteriaHandler } from '../../../../store/Store';
import axios  from "axios";
import {properties} from '../../../../Properties/Properties'

const getListofStockByLocation = properties.Port + properties.getListofStockByLocation
const getLocationRegions = properties.Port + properties.getLocationRegions
const getLocationWarehouses = properties.Port + properties.getLocationWarehouses

class StockByLocationFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {
        isShow: false,
        data: [],
        limit: "",
        attribute: null,
        operation: "=",
        value: null,
        listFilterBean: [],
        warehouseIds:null,
        whList:[],
        regionIds:null,
        regionList:[],
        batch: null,
        descriptionUnit: "PAL",
        materialType: null,
        productReference: null,
        statusMovement: null,
        grade: "",
        location: "",
        logisticUnitId: "",
        quality: "",
        quantity: "",
        filterCriteria: {
          batch: null,
          descriptionUnit: null,
          location:null,
          materialType: null,
          productReference: null,
          regionIds: null,
          statusMovement: null,
          warehouseIds: null
        },
      }
    }

    limitchangehandler = (event) => {
      if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
        this.setState({
          [event.target.name]: event.target.value,
        });
      } else {
      }
    };
  
    getLocationRegionList = () => {
      console.log("calling region from dropdown", this.state.regionList) 
      axios.get(getLocationRegions)
  
        .then((response) => {
          if (response.status === 200 && response.data.length !== 0) {
            console.log("resposne success", response.data);
            this.setState({
              regionList: response.data,
            });
  
          } else {
            this.setState({
              regionList: [],
            });
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    getLocationWarwhouseList = () => {
      console.log("calling warwhouse from dropdown", this.state.whList) 
      axios.get(getLocationWarehouses)
  
        .then((response) => {
          if (response.status === 200 && response.data.length !== 0) {
            console.log("resposne success", response.data);
            this.setState({
              whList: response.data,
            });
  
          } else {
            this.setState({
              whList: [],
            });
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
    componentDidMount= () =>{
      this.getLocationRegionList()
      this.getLocationWarwhouseList()
    }
  
    StockByLocationFilterMethod = () => {
      console.log("filter data", this.state)
      const criteria = {
        listFilterBean: this.state.listFilterBean,
        limit: this.state.limit,
      };
      axios.post(getListofStockByLocation, this.state, {
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
            StocklocationDataHandler(response.data);
            StocklocationCriteriaHandler(criteria);
          } else {
            this.setState({
              isShow: true,
              data: [],
            });
            StocklocationDataHandler(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
  
  
    changeHandler = (event) => {
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
        console.log(
          (this.state.listFilterBean[index].operation = event.target.value)
        );
      }
  
    };
  
  
  
    inputChangeHandler = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    }

    // onBlurHandler = (event) => {
    //   if(event.target.name === "warehouseIds") {
    //     if (event.target.value !== ""){
    //       const arr = []
    //     arr.push(event.target.value)
    //     this.setState({
    //       warehouseIds: arr
    //     })
    //     }
    //     else {
    //       this.setState({
    //         warehouseIds: null
    //       })
    //     }
        
    //   }
    //   else if (event.target.name === "regionIds"){
    //     if (event.target.value !== ""){
    //       const arr2 = []
    //       arr2.push(event.target.value)
    //       this.setState({
    //         regionIds: arr2
    //       })
    //     }
    //     else {
    //       this.setState({
    //         regionIds: null
    //       })
    //     }
        
    //   }
    //   else if (event.target.name === "descriptionUnit"){
    //     if (event.target.value !== ""){
    //       this.state.filterCriteria= {
    //         descriptionUnit: event.target.value
    //       }
    //     }
    //     else {
    //       this.state.filterCriteria= {
    //         descriptionUnit: null
    //       }
    //     }
        
    //   }
    //   else if (event.target.name === "productReference"){
    //     if (event.target.value !== ""){
    //       this.state.filterCriteria= {
    //         productReference: event.target.value
    //       }
    //     }
    //     else {
    //       this.state.filterCriteria= {
    //         productReference: null
    //       }
    //     }
    //   }
    //   else if (event.target.name === "batch"){
    //     if (event.target.value !== ""){
    //       this.state.filterCriteria= {
    //         batch: event.target.value
    //       }
    //     }
    //     else {
    //       this.state.filterCriteria= {
    //         batch: null
    //       }
    //     }
        
    //   }
    //   else if (event.target.name === "materialType"){
    //     if (event.target.value !== ""){
    //       this.state.filterCriteria= {
    //         materialType: event.target.value
    //       }
    //     }
    //     else {
    //       this.state.filterCriteria= {
    //         materialType: null
    //       }
    //     }
        
    //   }
    //   else if (event.target.name === "statusMovement"){
    //     if (event.target.value !== ""){
    //       this.state.filterCriteria= {
    //         statusMovement: event.target.value
    //       }
    //     }
    //     else {
    //       this.state.filterCriteria= {
    //         statusMovement: null
    //       }
    //     }
        
    //   }
    //   else if (event.target.name === "location"){
    //     if (event.target.value !== ""){
    //       this.state.filterCriteria= {
    //         location: event.target.value
    //       }
    //     }
    //     else {
    //       this.state.filterCriteria= {
    //         location : null
    //       }
    //     }
        
    //   }
      
    //   else {
    //     console.log("else calling")
    //   }
    //   console.log("++++++++++++++++",this.state.filterCriteria)
    // }

    resetHandler = () => {
      this.state = {
        isShow: false,
        data: [],
        limit: "",
        attribute: null,
        operation: "=",
        value: null,
        listFilterBean: [],
        warehouseIds:null,
        whList:[],
        regionIds:null,
        regionList:[],
        batch: null,
        descriptionUnit: "PAL",
        materialType: null,
        productReference: null,
        statusMovement: null,
        grade: "",
        location: "",
        logisticUnitId: "",
        quality: "",
        quantity: "",
        // filterCriteria: {
        //   batch: null,
        //   descriptionUnit: null,
        //   location:null,
        //   materialType: null,
        //   productReference: null,
        //   regionIds: null,
        //   statusMovement: null,
        //   warehouseIds: null
        // },
      }
    }
  
  
  
    onBlurHandler = (criteria) => {
      console.log("calling onBlurrrrr", criteria.target.name);
      console.log("calling onBlurrrrr", criteria.target.value);
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      console.log("INDEX VALUE FOR IF PART IN ALUE", index);
  
      if (criteria.target.value !== "") {
        if (criteria.target.name === "regionIds") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.regionIds,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.regionIds;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "warehouseIds") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.warehouseIds,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.warehouseIds;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "productReference") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.productReference,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.productReference;
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
        if (criteria.target.name === "materialType") {
          console.log("id container calling");
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.materialType,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.materialType;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
  
  
        if (criteria.target.name === "statusMovement") {
          console.log("id container calling");
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.statusMovement,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.statusMovement;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "location") {
          console.log("id container calling");
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: '19@'.concat(this.state.location),
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.location;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
  
        if (criteria.target.name === "limit") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.limit,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.limit;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
  
      } else {
        this.state.listFilterBean.splice(index,1)
      }
  console.log("calling criteriaARRRR", this.state.listFilterBean);
  this.setState({
    attribute: "",
    operation: "=",
  });
    };
  
  
    backHandler = () => {
      console.log("calling back handler")
      this.setState({
        isShow: false
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
              {StocklocationData.length !== 0 || this.state.isShow === true ? (
                <StockByLocationList backHandler={this.backHandler} data={this.state.data} />
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
                        <a>Stock by Location</a>
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
                    name="warehouseIds"
                    id="warehouseIds"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option value="=">=</option>

                    <option value="AMONG">AMONG</option>

                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="warehouseIds"
                    id="warehouseIds"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    // value={this.state.description}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  >
                    <option>---select---</option>
                    {this.state.whList.map((data) => <option value={data.warehouseIds} key={data.warehouseIds}>{data.description}</option>)}
                    


                  </Input>
                </Col>

                <Col>
                  <Label> Region</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="regionIds"
                    id="regionIds"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
                    <option value="=">=</option>

                    <option value="AMONG">AMONG</option>

                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm"
                  type="select"
                    name="regionIds"
                    // value={this.state.id_region}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  >
                    <option>---select---</option>
                    {this.state.regionList.map((data) =><option value={data.regionIds} key={data.regionIds}>{data.description}</option> )}
                  </Input>
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
                    name="productReference"
                    id="productReference"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option value="=">=</option>

                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="text"
                    name="productReference"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    value={this.state.productReference}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  >

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
                    id="batch"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option value="=">=</option>

                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm"
                  type="text"
                    name="batch"
                    value={this.state.batch}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Description Unit</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="descriptionUnit"
                    id="descriptionUnit"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option value="=">=</option>

                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="descriptionUnit"
                    bsSize="sm"
                    value={this.state.descriptionUnit}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  >
                    <option value="PAL">PAL</option>
                    <option value="BAG"> BAG</option>
                    <option value="KG">KG</option>
                  </Input>
                </Col>

                <Col>
                  <Label>Material Type</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="materialType"
                    id="materialType"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option value="=">=</option>

                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm"
                  type="text"
                    name="materialType"
                    value={this.state.materialType}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label> Movement status</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="statusMovement"
                    id="statusMovement"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option value="<=">&le;</option>

                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="statusMovement"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    value={this.state.statusMovement}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                  >
                    <option></option>

                  </Input>
                </Col>

                <Col>
                  <Label>Location</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="location"
                    id="location"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option value="=">=</option>

                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm"
                  type="text"
                    name="location"
                    value={this.state.location}
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
                      value="<="
                      // style={{ width: "60px" }}
                      bsSize="sm"
                      readOnly
                    >
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
                  </Col>
                  <Col>
                  </Col>
                  
                </Row>

                  
                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Button onClick={this.resetHandler}>Reset Criteria</Button>{" "}
                    <Button
                      onClick={
                       this.StockByLocationFilterMethod
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

export default StockByLocationFilter;