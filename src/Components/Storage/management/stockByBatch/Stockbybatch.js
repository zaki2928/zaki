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
import Stockbybatchlistpage from './Stockbybatchlistpage'
import { StockbatchData, StockbatchDataHandler, StockbatchCriteriaHandler } from '../../../../store/Store'
import axios from "axios";
import {properties} from '../../../../Properties/Properties'

const getListofStockByBatch = properties.Port + properties.getListofStockByBatch
const getRegions = properties.Port + properties.getRegions
const getWarehouses = properties.Port + properties.getWarehouses

export default class Stockbybatch extends Component {
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
      batch: null,
      dateCreation: "",
      date: null,
      descriptionUnit: "PAL",
      materialType: null,
      productReference: null,
      regionId: null,
      regionList:[],
      warehouseId: null,
      whList:[],
      quantityAvailable: "",
      quantityDamaged: "",
      quantityTotal: "",
      quantityTransit: "",
      weightAvailable: "",
      weightDamaged: "",
      weightTotal: "",
      weightTransit: "",
      // filterCriteria:{
      // batch: null,
      // date: null,
      // descriptionUnit: null,
      // materialType: null,
      // productReference: null,
      // regionIds: null,
      // warehouseIds: null,
      // },
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

  getRegionList = () => {
    console.log("calling region from dropdown", this.state.regionList) 
    axios.get(getRegions)

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

  getWarwhouseList = () => {
    console.log("calling warwhouse from dropdown", this.state.whList) 
    axios.get(getWarehouses)

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

 
      const data = [
        {
        attribute: "descriptionUnit",
        operation: "=",
        value: "PAL",
      }
    ]
    ;
      this.setState(
        {
          listFilterBean: data,
        }
      );
    
    this.getRegionList()
    this.getWarwhouseList()
  }

  // criteriaFilterMethod = () => {
  //   const length = this.state.listFilterBean.length;
  //   const listFilterBean = [];
  //     console.log("testtttttttttttttt  api ", getListofStockByBatch);
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
  //       listFilterBean: this.state.listFilterBean,
  //       limit: this.state.limit,
  //     };
  //     axios
  //       .post(getListofStockByBatch, criteria, {
  //         params: {
  //           limit: this.state.limit,
  //         },
  //       })
  
  //       .then((response) => {
  //         if (response.status === 200 && response.data.length !== 0) {
  //           console.log("resposne success", response.data);
  //           this.setState({
  //             data: response.data,
  //             isShow: true,
  //           });
  //           StockbatchDataHandler(response.data);
  //           //StockbatchCriteriaHandler(criteria);
  //         } else {
  //           this.setState({
  //             isShow: true,
  //             data: [],
  //           });
  //           StockbatchDataHandler(response.data);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };

  StockByBatchFilterMethod = () => {
    console.log("stock filter calling", this.state)
    const length = this.state.listFilterBean.length;
      const listFilterBean = [];
        console.log("testtttttttttttttt  api ", getListofStockByBatch);
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
      listFilterBean: this.state.filterCriteria,
      limit: this.state.limit,
    };
    axios.post(getListofStockByBatch, this.state, {
        params: {
          limit: this.state.limit,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
            isShow: true,
          });
          StockbatchDataHandler(response.data);
          StockbatchCriteriaHandler(criteria);
        } else {
          this.setState({
            isShow: true,
            data: [],
          });
          StockbatchDataHandler(response.data);
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
        value: " ",

      };
      this.state.listFilterBean.push(data);
    } else {
      console.log(
        (this.state.listFilterBean[index].operation = event.target.value)
      );
    }
    console.log("index AFTER UPDATE print", this.state.listFilterBean);

  };



  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onBlurH = (criteria) => {
    console.log("calling onBlurrrrr", criteria.target.name);
    console.log("calling onBlurrrrr", criteria.target.value);
    var index = this.state.listFilterBean.findIndex(
      (data) => data.attribute === criteria.target.name
    );
    console.log("INDEX VALUE FOR IF PART IN ALUE", index);
  
    if (criteria.target.value !== "") {
      if (criteria.target.name === "warehouseId") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.warehouseId,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.warehouseId;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "regionId") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.regionId,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.regionId;
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

      if (criteria.target.name === "dateCreation") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.dateCreation,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.dateCreation;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      } 
      
      if (criteria.target.name === "materialType") {
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

      if (criteria.target.name === "quantityAvailable") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.quantityAvailable,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.quantityAvailable;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }  

      if (criteria.target.name === "quantityDamaged") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.quantityDamaged,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.quantityDamaged;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }  

      if (criteria.target.name === "quantityTotal") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.quantityTotal,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.quantityTotal;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }  

      if (criteria.target.name === "quantityTransit") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.quantityTransit,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.quantityTransit;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }  

      if (criteria.target.name === "weightAvailable") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.weightAvailable,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.weightAvailable;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }  

      if (criteria.target.name === "weightDamaged") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.weightDamaged,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.weightDamaged;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }  

      if (criteria.target.name === "weightTotal") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.weightTotal,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.weightTotal;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }  

      if (criteria.target.name === "date") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.date,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.date;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }  

      if (criteria.target.name === "weightTransit") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.weightTransit,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.weightTransit;
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
// onBlurH = (event) => {
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
//   else if (event.target.name === "dateCreation"){
//     if (event.target.value !== ""){
//       this.state.filterCriteria= {
//         dateCreation: event.target.value
//       }
//     }
//     else {
//       this.state.filterCriteria= {
//         dateCreation: null
//       }
//     }
    
//   }

//   else {
//     console.log("else calling")
//   }
// }

  bacHandler = () => {
    console.log("calling back handler by uzmaaa")
    this.setState({
      isShow: false,
      limit: "",
      attribute: null,
      // operation: "=",
      value: null,
      // descriptionUnit: "PAL",
      // listFilterBean: [],
      batch: null,
      dateCreation: "",
      date: null,
      materialType: null,
      productReference: null,
      regionId: null,
      // regionList:[],
      warehouseId: null,
      // whList:[],
      quantityAvailable: "",
      quantityDamaged: "",
      quantityTotal: "",
      quantityTransit: "",
      weightAvailable: "",
      weightDamaged: "",
      weightTotal: "",
      weightTransit: "",
      // filterCriteria:{
      // batch: null,
      // date: null,
      // descriptionUnit: null,
      // materialType: null,
      
    })
  }


  resetdata = () => {
    console.log("reset handler");
    this.setState({
      isShow: false,
      // data: [],
      limit: "",
      attribute: null,
      operation: "=",
      value: null,
      listFilterBean: [],
      batch: "",
      dateCreation: "",
      date: "",
      // descriptionUnit: "PAL",
      materialType: "",
      productReference: "",
      quantityAvailable: "",
      quantityDamaged: "",
      quantityTotal: "",
      quantityTransit: "",
      weightAvailable: "",
      weightDamaged: "",
      weightTotal: "",
      weightTransit: "",
      // filterCriteria:{
      // batch: null,
      // date: null,
      // descriptionUnit: null,
      // materialType: null,
      // productReference: null,
      // regionIds: null,
      // warehouseIds: null,
      // },
      
    },()=>{
      console.log("inside resert handler for compnent mount")
      this.componentDidMount()
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
          {StockbatchData.length !== 0 || this.state.isShow === true ? (
            <Stockbybatchlistpage bacHandler={this.bacHandler} data={this.state.data} additem={this.props.additem} />
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

                <u>
                  {" "}
                  &#62;
                  <b>
                    {" "}
                    <a>Stock by batch search</a>
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
                    name="warehouseId"
                    // id="warehouseIds"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option>=</option>

                    <option>AMONG</option>

                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="warehouseId"
                    // id="description"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    value={this.state.warehouseId}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurH}
                  >
                    <option value="">---select---</option>
                    {this.state.whList.map(data => <option value={data.idWarehouse} key={data.warehouseIds}>{data.description}</option>)}
                    


                  </Input>
                </Col>

                <Col>
                  <Label> Region</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="regionId"
                    id="regionId"
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
                    name="regionId"
                    value={this.state.regionId}                                                
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurH}
                  >
                    <option value="">---select---</option>
                    {this.state.regionList.map(data =><option value={data.idRegion} >{data.description}</option> )}
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
                    onBlur={this.onBlurH}
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
                    name="batch"
                    value={this.state.batch}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurH}
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
                    onBlur={this.onBlurH}

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
                    name="materialType"
                    value={this.state.materialType}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurH}
                  />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label> Date</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="date"
                    id="date"
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
                    type="date"
                    name="date"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    value={this.state.date}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurH}
                  >

                  </Input>
                </Col>

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
                <Button onClick={this.resetdata} >Reset Criteria</Button>
                {/* <Button onClick={()=> this.props.additem("Stock By Location")} >Reset Criteria</Button> */}

                <Button onClick={this.StockByBatchFilterMethod} style={{ marginLeft: "5px" }}>Display</Button>
              </div>
            </div>

          )}
        </Container>
      </React.Fragment>
    );
  }
}
