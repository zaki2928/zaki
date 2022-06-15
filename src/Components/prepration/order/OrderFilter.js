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
import OrderList from '../../prepration/order/OrderList';
import {
    IoArrowBackCircleSharp,
    IoArrowForwardCircleSharp,
  } from "react-icons/io5";
  import { FcSearch } from "react-icons/fc";
import { OrderData, OrderHandler,PreparationOrdercriteriaHandler,} from '../../../store/Store';
import axios from "axios";
import { properties } from '../../../Properties/Properties';
const getListOfPreparationOrders =
  properties.Port + properties.getListOfPreparationOrders;
  const getWarehousesForPhysicalgate = properties.Port + properties.getWarehousesForPhysicalgate

class OrderFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {
          limit: "",
          orderList: false,
          batch:"",
          idCarrier:"",
          idCarrierReceived:"",
          idDm:"",
          idDmReceived:"",
          idGate:"",
          idLocation:"",
          idPrepOrder:"",
          idPrepOrderCustomer:"",
          idPrepOrderL3:"",
          idProduct:"",
          listFilterBean:[],
          attribute:null,
          operation:"=",
          value:null,
          mDate:"",
          meansOfTransport:"",
          plfLink:"",
          plfObd1:"",
          statusPo:"",
          statusShipping:"",
          typePalettisation:"",
          typePo:"",
          typePoStuffing:"",
          warehousePreparationIds:"",
          zContShipLine:"",
          zEtaDate:"",
          idWarehouseList:[],
          zSabicDelivId:"",
          zSabicOrderId:"",
          zSalesTerm:"",
          zShipPoint:"",
          zSkOrderId:"",
      }

    }


    componentDidMount=()=>{
      console.log("testing api trailer release calling")
      this.getIdWarehouseList();

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
    

      criteriaFilterMethod = () => {
        console.log("testtttttttttttttt  api ");
        const criteria = {
          listFilterBean: this.state.listFilterBean,
          limit: this.state.limit,
        };
        axios
          .post(getListOfPreparationOrders, this.state, {
            params: {
              limit: this.state.limit,
            },
          })
          .then((response) => {
            console.log("shahid=========>")
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success ______________________________", response.data);
              this.setState({
                data: response.data,
                orderList: true,
              });
              OrderHandler(response.data);
              PreparationOrdercriteriaHandler(criteria);
            } else {
              this.setState({
                orderList: true,
                data: [],
              });
            
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };


      changeHandler = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        console.log("index BEFORE prepartionorder print", this.state.listFilterBean);
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
        console.log("index AFTER Preparationorder print", this.state.listFilterBean);
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
    
        if (criteria.target.name === "idPrepOrder") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idPrepOrder,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idPrepOrder;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "idProduct") {
          console.log("checking id product", criteria.target.name);
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
            console.log("updataed if partttt", this.state.listFilterBean);
          } else {
            this.state.listFilterBean[index].value = this.state.idProduct;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "batch") {
          console.log("checking id refence", criteria.target.name);
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
            console.log("updataed if partttt", this.state.listFilterBean);
          } else {
            this.state.listFilterBean[index].value = this.state.batch;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
    
        if (criteria.target.name === "idCarrier") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idCarrier,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idCarrier;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "idCarrierReceived") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idCarrierReceived,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idCarrierReceived;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "idDm") {
          console.log("shahiddddddddd");
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idDm,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idDm;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "idDmReceived") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idDmReceived,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idDmReceived;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "idGate") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idGate,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idGate;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
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
        if (criteria.target.name === "idPrepOrderCustomer") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idPrepOrderCustomer,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idPrepOrderCustomer;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "idPrepOrderL3") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.idPrepOrderL3,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.idPrepOrderL3;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "meansOfTransport") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.meansOfTransport,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.meansOfTransport;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "plfLink") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.plfLink,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.plfLink;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "plfObd1") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.plfObd1,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.plfObd1;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "statusPo") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.statusPo,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.statusPo;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }
        if (criteria.target.name === "statusShipping") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.statusShipping,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.statusShipping;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "typePalettisation") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.typePalettisation,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.typePalettisation;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }


        if (criteria.target.name === "typePo") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.typePo,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.typePo;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }


        if (criteria.target.name === "typePoStuffing") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.typePoStuffing,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.typePoStuffing;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "warehousePreparationIds") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.warehousePreparationIds,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.warehousePreparationIds;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "zContShipLine") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.zContShipLine,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.zContShipLine;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "zEtaDate") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.zEtaDate,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.zEtaDate;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "zSabicDelivId") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.zSabicDelivId,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.zSabicDelivId;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "zSabicOrderId") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.zSabicOrderId,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.zSabicOrderId;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "zSalesTerm") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.zSalesTerm,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.zSalesTerm;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "zShipPoint") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.zShipPoint,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.zShipPoint;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
        }

        if (criteria.target.name === "zSkOrderId") {
          var index = this.state.listFilterBean.findIndex(
            (data) => data.attribute === criteria.target.name
          );
          if (index === -1) {
            const data = {
              attribute: criteria.target.name,
              operation: this.state.operation,
              value: this.state.zSkOrderId,
            };
            this.state.listFilterBean.push(data);
          } else {
            this.state.listFilterBean[index].value = this.state.zSkOrderId;
            console.log("updataed else partttt", this.state.listFilterBean);
          }
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
        this.setState({
          limit: "",
          orderList: false,
          batch:"",
          idCarrier:"",
          idCarrierReceived:"",
          idDm:"",
          idDmReceived:"",
          idGate:"",
          idLocation:"",
          idPrepOrder:"",
          idPrepOrderCustomer:"",
          idPrepOrderL3:"",
          idProduct:"",
          listFilterBean:[],
          attribute:null,
          operation:"=",
          value:null,
          mDate:"",
          meansOfTransport:"",
          plfLink:"",
          plfObd1:"",
          statusPo:"",
          statusShipping:"",
          typePalettisation:"",
          typePo:"",
          typePoStuffing:"",
          warehousePreparationIds:"",
          zContShipLine:"",
          zEtaDate:"",
          zSabicDelivId:"",
          zSabicOrderId:"",
          zSalesTerm:"",
          zShipPoint:"",
          zSkOrderId:"",
        });
      };

      backHandler = () => {
        this.setState({
          limit: "",
          orderList: false,
          batch:"",
          idCarrier:"",
          idCarrierReceived:"",
          idDm:"",
          idDmReceived:"",
          idGate:"",
          idLocation:"",
          idPrepOrder:"",
          idPrepOrderCustomer:"",
          idPrepOrderL3:"",
          idProduct:"",
          listFilterBean:[],
          attribute:null,
          operation:"=",
          value:null,
          mDate:"",
          meansOfTransport:"",
          plfLink:"",
          plfObd1:"",
          statusPo:"",
          statusShipping:"",
          typePalettisation:"",
          typePo:"",
          typePoStuffing:"",
          warehousePreparationIds:"",
          zContShipLine:"",
          zEtaDate:"",
          zSabicDelivId:"",
          zSabicOrderId:"",
          zSalesTerm:"",
          zShipPoint:"",
          zSkOrderId:"",
        });
      };
      submitHandler=()=>{
        console.log("submitHandler calling")
        
      //   axios
      //   .get("https://jsonplaceholder.typicode.com/posts")
      //   .then((response) => {
      //     if (response.status === 200) {
      //       console.log("resposne success", response.data);
      //        this.setState({
      //       data:response.data,
      //       orderList:true
      
      //       })
      
      //       OrderHandler(response.data)
            
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      
      // }
      
      
      // backHandler=()=>{
      //   console.log("calling back handler")
      //   this.setState({
      //     orderList: false
      //   })
      // }
      }
    render() {
        return (
            <React.Fragment>
            <Container
              className="themed-container"
              fluid={true}
              style={{ border: "1px solid black", marginLeft: "14px" }}
            >
              {OrderData.length !== 0 || this.state.orderList === true ?
               (
                <OrderList backHandler={this.backHandler} 
                data={this.state.data}
                additem={this.props.additem} />
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
                        <a>Preparation Orders Search</a>
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
                    <b style={{ marginLeft: "5px" }}>Preparation Criteria</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Preparation Order</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idPrepOrder"
                        id="exampleSelect"
                        bsSize="sm"
                        onChange={this.changeHandler}
                        // style={{ width: "50px" }}
                        
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
                        type="text"
                        name="idPrepOrder"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                  
                        value={this.state.idPrepOrder}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >
                        
                      </Input>
                    </Col>
    
                    <Col> </Col>
                    <Col>
                      <Label>Preparation Order Customer Id</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idPrepOrderCustomer"
                        id="exampleSelect"
                        onChange={this.changeHandler}
                        // style={{ width: "60px" }}
                        bsSize="sm"
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
                       bsSize="sm"
                       onChange={this.inputChangeHandler}
                       name="idPrepOrderCustomer"
                       value={this.state.idPrepOrderCustomer}
                       onBlur={this.onBlurHandler}
                      
                      
                      />
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label>Preparation Order L3 Id</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idPrepOrderL3"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                      bsSize="sm"
                      onChange={this.inputChangeHandler}
                      name="idPrepOrderL3"
                      value={this.state.idPrepOrderL3}
                      onBlur={this.onBlurHandler}
                       />
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Preparation Order Status</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="statusPo"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                      name="statusPo"
                      id="exampleSelect"
                      // style={{ width: "60px" }}
                      value={this.state.statusPo}
                      bsSize="sm"
                      onChange={this.inputChangeHandler}
                      // onBlur={() => this.onBlurHandler("company")}
                      onBlur={this.onBlurHandler}
                    >
                      <option>     </option>
                      <option>Created</option>
                      <option value="200">_CubingError_</option>
                      <option value="">_CubingOk_</option>
                      <option value="350">_Launchable_</option>
                      <option value="360">Seleted</option>
                      <option value="400">_Launched_</option>
                      <option value="">InPreparation_</option>
                      <option value="500">_Prepared_</option>
                      <option value="4000">_Cancelled_</option>                      
                    </Input>
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label>Preparation Order Type</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="typePo"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        name="typePo"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.typePo}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >
                        <option>     </option>
                        <option value="100">_Standard_</option>
                        
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Stuffing Type</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="typePoStuffing"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        name="typePoStuffing"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.typePoStuffing}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >
                        <option>     </option>
                        <option option value="0">_Non PLF_</option>
                        <option value="100">_Stuffing at Affiliate_</option>
                        <option option value="200">_Stuffing At PLF_</option>

                        
                        </Input>
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Link</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="plfLink"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        type="text"
                        name="plfLink"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.plfLink}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >
                        
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>OBD1</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="plfObd1"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                      bsSize="sm"
                      onChange={this.inputChangeHandler}
                      name="plfObd1"
                      value={this.state.plfObd1}
                      onBlur={this.onBlurHandler}
                      
                      
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Product</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idProduct"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        type="text"
                        name="idProduct"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.idProduct}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >
                       
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
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        name="batch"
                        value={this.state.batch}
                        onBlur={this.onBlurHandler}
                     />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>PO Preparation Warehouse</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="warehousePreparationIds"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        name="idWarehouse"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.idWarehouse}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >
                         <option value="">---select---</option>
                      {this.state.idWarehouseList.map(data => <option value={data.idWarehouse} key={data.idWarehouse}>{data.description}</option>)}
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Saudi Kayan Order Id</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="zSkOrderId"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        name="zSkOrderId"
                        value={this.state.zSkOrderId}
                        onBlur={this.onBlurHandler}
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Sales Term</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="zSalesTerm"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        name="zSalesTerm"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.zSalesTerm}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >
                        <option>    </option>
                        <option option value="">_FOB_</option>
                        <option option value="">_FOT_</option>
                        <option option value="">_ROAD TANK_</option>
                        <option option value="">_SEA BULK_</option>
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Shipping Point</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="zShipPoint"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        name="zShipPoint"
                        value={this.state.zShipPoint}
                        onBlur={this.onBlurHandler}
                      
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Container Shipping Line</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="zContShipLine"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        type="text"
                        name="zContShipLine"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.zContShipLine}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >

                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Sabic Order Id</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="zSabicOrderId"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        name="zSabicOrderId"
                        value={this.state.zSabicOrderId}
                        onBlur={this.onBlurHandler}
                      
                      
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Sabic Delivery Id</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="zSabicDelivId"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        type="text"
                        name="zSabicDelivId"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.zSabicDelivId}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >

                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>ETA Date</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="zEtaDate"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        name="zEtaDate"
                        value={this.state.zEtaDate}
                        onBlur={this.onBlurHandler}
                      
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
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
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Shipping Criteria</b>
                  </div>

                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Carrier</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idCarrier"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        name="idCarrier"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.idCarrier}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
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
                      <Label>Carrier Recieved</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idCarrierReceived"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                          name="idCarrierReceived"
                          id="exampleSelect"
                          // style={{ width: "60px" }}
                          value={this.state.idCarrierReceived}
                          bsSize="sm"
                          onChange={this.inputChangeHandler}
                          // onBlur={() => this.onBlurHandler("company")}
                          onBlur={this.onBlurHandler}
                          >
                          <option></option>
                          <option></option>
                          <option></option>
                          <option></option>
                          <option></option>

                      </Input>
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Dispatch Mode</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idDm"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        name="idDm"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.idDm}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}

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
                      <Label>Dispatch Mode Recieved</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idDmReceived"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                       name="idDm"
                      id="exampleSelect"  
                     // style={{ width: "60px" }}
                     value={this.state.idDm}
                     bsSize="sm"
                   onChange={this.inputChangeHandler}
                  // onBlur={() => this.onBlurHandler("company")}
                  onBlur={this.onBlurHandler}
                       
                   >
                   <option></option>
                    <option></option>
                   <option></option>
                  <option></option>
                  <option></option>
                  </Input>
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Means Of Transport</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="meansOfTransport"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        type="text"
                        name="meansOfTransport"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.meansOfTransport}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >

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
                        name="idLocation"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        name="idLocation"
                        value={this.state.idLocation}
                        onBlur={this.onBlurHandler}
                      
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Palletisation Type</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="typePalettisation"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                        name="typePalettisation"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.typePalettisation}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >
                        <option>    </option>
                        <option option value="-1">_NonRelevant_</option>
                        <option option value="">_Palettisation_</option>
                        <option option value="-1">_Trailer_</option>
                        <option option value="">_Without_</option>
                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Gate</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idGate"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                        onChange={this.changeHandler}
                      

                      >
                         {/* <option>---select---</option> */}
                         <option value="=">contains </option>
                          
                      
                      </Input>
                    </Col>
                    <Col>
                      {" "}
                      {/* <Input bsSize="sm" /> */}
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Shipping Status</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="statusShipping"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
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
                       name="statusShipping"
                       id="exampleSelect"
                       // style={{ width: "60px" }}
                      value={this.state.statusShipping}
                      bsSize="sm"
                       onChange={this.inputChangeHandler}
                       // onBlur={() => this.onBlurHandler("company")}
                       onBlur={this.onBlurHandler}
                       >
                     <option>    </option>
                     <option option value="-1">Created</option>
                     <option option value="1260">_At Plf_</option>
                     <option option value="0">_Awaiting shipment in stock_</option>
                     <option option value="0">_Awaiting shipment_</option>
                     <option option value="4000">_Cancelled_</option>
                     <option option value="0">_Palletised_</option>
                     <option option value="1250">_Shipped to be confirmed_</option>
                     <option option value="0">_Shipped_</option>
                       </Input>
                      
                    
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
          </React.Fragment>
        );
    }
}

export default OrderFilter;