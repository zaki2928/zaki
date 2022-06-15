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
// import { BoxData, BoxOrderHandler,BoxOrdercriteriaHandler, } from '../../../store/Store';
import { prepration_boxData, prepration_boxDataHandler,prepration_boxCriteriaHandler, } from '../../../store/Store';
import axios from "axios";
import { properties } from '../../../Properties/Properties';
import Box_List from './Box_List';

const getListOfPreparationOrders =
  properties.Port + properties.getListOfPreparationOrders;
  const getListOfPreparationBoxesViewBeansByFilterCriteria = properties.Port + properties.getListOfPreparationBoxesViewBeansByFilterCriteria
const getListOfPackagingKL = properties.Port + properties.getListOfPackagingKL
const getWarehousesForPhysicalgate = properties.Port + properties.getWarehousesForPhysicalgate




class Box_Filter extends Component {
    constructor(props) {
        super(props);
      this.state = {
              limit: "",
              boxList: false,
              containerNumPo: "",
              idContainer: "",
              idContainerPRP: "",
              idPackaging: "",
              idPo: "",
              idPrepOrder: "",
              idPrepOrderCustomer: "",
              idPrepOrderL3: "",
              idwarehousePRP: "",
              listFilterBean:[],
              attribute:null,
              operation:"=",
              value:null,
              mDate: "",
              musername: "",
              plfLink: "",
              plfObd1: "",
              prepMode: "",
              statusPo: "",
              statusPrep: "",
              statusShip: "",
              typeAlgo: "",
              typePo: "",
              typePoStuffing: "",
              versionLock: "",
              volume: "",
              warehousePreparationIds: "",
              id_packaging: "",
              idPackagingList:[],
      criteria: "",
      idReference:"",
      zGrade:"",
      idWarehouseList:[],


      }

    }

    componentDidMount = () => {
      this.getIdPackagingList();
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
    // submithandler = () => {
    //   console.log("Display list calling");
    //   this.getbodylist();
    //   this.setState({
    //     isShow: true,
    //   });
    // };
  
    // backHandler=()=>{
    //   console.log("calling back handler")
    //   this.setState({
    //     isShow: false
    //   })
    // }
  
    // componentDidMount=()=>{
    //   console.log("box api callingggggggggggggggggggggggg")
    // }

    criteriaFilterMethod = () => {
      const length = this.state.listFilterBean.length;
    const listFilterBean = [];
    console.log("testtttttttttttttt  api ",getListOfPreparationBoxesViewBeansByFilterCriteria );
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
    console.log("criteriaaaaaaaa calling", criteria)
      axios
        .post(getListOfPreparationBoxesViewBeansByFilterCriteria, this.state, {
          params: {
            limit: this.state.limit,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              data: response.data,
              boxList: true,
            });
            prepration_boxDataHandler(response.data);
            prepration_boxCriteriaHandler(criteria);
          } else {
            this.setState({
              boxList: true,
              data: [],
            });
            prepration_boxDataHandler(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    changeHandler = (event) => {
      // console.log(event.target.name)
      // console.log(event.target.value)
      console.log("index BEFORE boxxxxxxxxx list", this.state.listFilterBean);
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
      console.log("index AFTER boxxxxxxxesss print", this.state.listFilterBean);
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
      console.log("INDEX value for findingg filter criteria", index);
      if (criteria.target.value !== "") {
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
      if (criteria.target.name === "containerNumPo") {
        console.log("checking container numberrr ", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.containerNumPo,
          };
          this.state.listFilterBean.push(data);
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.containerNumPo;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "idContainerPRP") {
        console.log("checking id container prp", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.idContainerPRP,
          };
          this.state.listFilterBean.push(data);
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.idContainerPRP;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "idPackaging") {
        console.log("checking id pacakaginnnnggggg", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.idPackaging,
          };
          this.state.listFilterBean.push(data);
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.idPackaging;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "idPo") {
        console.log("checking id product", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.idPo,
          };
          this.state.listFilterBean.push(data);
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.idPo;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }


      if (criteria.target.name === "idPrepOrder") {
        console.log("checking id product", criteria.target.name);
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
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.idPrepOrder;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }


      if (criteria.target.name === "idPrepOrderCustomer") {
        console.log("checking id  prepordercustomer", criteria.target.name);
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
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.idPrepOrderCustomer;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }


      if (criteria.target.name === "idPrepOrderL3") {
        console.log("checking id product", criteria.target.name);
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
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.idPrepOrderL3;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }


      if (criteria.target.name === "idwarehousePRP") {
        console.log("checking id product", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.idwarehousePRP,
          };
          this.state.listFilterBean.push(data);
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.idwarehousePRP;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }


      if (criteria.target.name === "mDate") {
        console.log("checking id product", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.mDate,
          };
          this.state.listFilterBean.push(data);
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.mDate;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }


      if (criteria.target.name === "musername") {
        console.log("checking id product", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.musername,
          };
          this.state.listFilterBean.push(data);
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.musername;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }


      if (criteria.target.name === "plfLink") {
        console.log("checking id product", criteria.target.name);
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
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.plfLink;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }


      if (criteria.target.name === "plfObd1") {
        console.log("checking id product", criteria.target.name);
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
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.plfObd1;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }


      if (criteria.target.name === "prepMode") {
        console.log("checking id product", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.prepMode,
          };
          this.state.listFilterBean.push(data);
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.prepMode;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "statusPo") {
        console.log("checking id product", criteria.target.name);
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
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.statusPo;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "statusPrep") {
        console.log("checking id product", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.statusPrep,
          };
          this.state.listFilterBean.push(data);
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.statusPrep;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }


      if (criteria.target.name === "statusShip") {
        console.log("checking id product", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.statusShip,
          };
          this.state.listFilterBean.push(data);
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.statusShip;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }



      if (criteria.target.name === "typeAlgo") {
        console.log("checking id product", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.typeAlgo,
          };
          this.state.listFilterBean.push(data);
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.typeAlgo;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "typePo") {
        console.log("checking id product", criteria.target.name);
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
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.typePo;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "typePoStuffing") {
        console.log("checking id product", criteria.target.name);
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
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.typePoStuffing;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "versionLock") {
        console.log("checking id product", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.versionLock,
          };
          this.state.listFilterBean.push(data);
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.versionLock;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "volume") {
        console.log("checking id product", criteria.target.name);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.volume,
          };
          this.state.listFilterBean.push(data);
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.volume;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "idReference") {
        console.log("checking id product", criteria.target.name);
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

      if (criteria.target.name === "zGrade") {
        console.log("checking id product", criteria.target.name);
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
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.zGrade;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "warehousePreparationIds") {
        console.log("checking id product", criteria.target.name);
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
          console.log("updataed if partttt", this.state.listFilterBean);
        } else {
          this.state.listFilterBean[index].value = this.state.warehousePreparationIds;
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
        boxList: false,
        containerNumPo: "",
        idContainer: "",
        idContainerPRP: "",
        idPackaging: "",
        idPo: "",
        idPrepOrder: "",
        idPrepOrderCustomer: "",
        idPrepOrderL3: "",
        idwarehousePRP: "",
        listFilterBean:[],
        attribute:null,
        operation:"=",
        value:null,
        mDate: "",
        musername: "",
        plfLink: "",
        plfObd1: "",
        prepMode: "",
        statusPo: "",
        statusPrep: "",
        statusShip: "",
        typeAlgo: "",
        typePo: "",
        typePoStuffing: "",
        versionLock: "",
        volume: "",
        warehousePreparationIds: "",
        id_packaging: "",
        idPackagingList:[],
      });
    };

    backHandler = () => {
      this.setState({
        limit: "",
        boxList: false,
        containerNumPo: "",
        idContainer: "",
        idContainerPRP: "",
        idPackaging: "",
        idPo: "",
        idPrepOrder: "",
        idPrepOrderCustomer: "",
        idPrepOrderL3: "",
        idwarehousePRP: "",
        listFilterBean:[],
        attribute:null,
        operation:"=",
        value:null,
        mDate: "",
        musername: "",
        plfLink: "",
        plfObd1: "",
        prepMode: "",
        statusPo: "",
        statusPrep: "",
        statusShip: "",
        typeAlgo: "",
        typePo: "",
        typePoStuffing: "",
        versionLock: "",
        volume: "",
        warehousePreparationIds: "",
        id_packaging: "",
        idPackagingList:[],
      });
    };
    // submitHandler=()=>{
    //   console.log("submitHandler calling")
    // }



  
    render() {
        return (
            <React.Fragment>
           
           <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
           {prepration_boxData.length !== 0 || this.state.boxList === true ?
               (
                <Box_List backHandler={this.backHandler} 
                data={this.state.data}
                additem={this.props.additem} />
              ) 
              : (
         
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
                        <a>Boxes Search</a>
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
                        name="idwarehousePRP"
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
    
                    <Col> </Col>
                    <Col>
                      <Label>Container no</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idContainerPRP"
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
                       bsSize="sm"
                       onChange={this.inputChangeHandler}
                       name="idContainerPRP"
                       value={this.state.idContainerPRP}
                       onBlur={this.onBlurHandler}
                      
                      
                      />
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label>Location</Label>{" "}
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
                      name="idPrepOrderL3"
                      value={this.state.idPrepOrderL3}
                      onBlur={this.onBlurHandler}
                       />
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Parent container no</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idContainerPRP"
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
                      name="idContainerPRP"
                      value={this.state.idContainerPRP}
                      onBlur={this.onBlurHandler}
                      
                      />
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Label>Packaging ID</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="id_packaging"
                        id="exampleSelect"
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
                        name="id_packaging"
                        id="exampleSelect"
                        value={this.state.idPackaging}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        onBlur={this.onBlurHandler}
                      >
                        <option value="">---select---</option>
                      {this.state.idPackagingList.map(data => <option value={data.id_packaging} key={data.id_packaging}>{data.description}</option>)}
                      
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
                        name="statusPrep"
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
                           name="statusPrep"
                           id="exampleSelect"
                           // style={{ width: "60px" }}
                           value={this.state.statusPrep}
                           bsSize="sm"
                           onChange={this.inputChangeHandler}
                           // onBlur={() => this.onBlurHandler("company")}
                           onBlur={this.onBlurHandler}
                         >
                           <option >    </option>
                           <option value="">_creation In pogress_</option>
                           <option value="100">created</option>
                           <option value="">validated</option>
                           <option value="5000">_Destroyed_</option>
                        </Input>
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Type</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name=""
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
                        name=""
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.plfLink}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >
                        <option>   </option>
                        <option value=""> Box</option>
                        <option value="">_Loacation_</option>
                        <option value="">Product</option>
                        <option Value="">_Box Shipping_</option>
                        <option value="">_load Collection</option>
                        <option value="">_pallet_</option>
                        <option value="">_Shipping Pallet_</option>
                        <option value="">_Trailer_</option>
                        <option value="">_Unload Trailer</option>
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
                        name="plfObd1"
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
                      name="idReference"
                      value={this.state.idReference}
                      onBlur={this.onBlurHandler}
                      
                      
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Product grade</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="prepMode"
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
                        type="text"
                        name="zGrade"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.zGrade}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >
                      </Input>
                    </Col>
    
                    <Col></Col>
                   <Col></Col>
                   <Col></Col>
                   <Col></Col>
                   <Col></Col>
                  </Row>

                  <br/>

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
                <br/>
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
                      <Label>Box</Label>{" "}
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
                        name="idCarrier"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.idCarrier}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >

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
                        name="statusShip"
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
                           name="statusShip"
                           id="exampleSelect"
                           // style={{ width: "60px" }}
                           value={this.state.statusShip}
                           bsSize="sm"
                           onChange={this.inputChangeHandler}
                           // onBlur={() => this.onBlurHandler("company")}
                           onBlur={this.onBlurHandler}
                         >
                          <option>    </option>
                          <option value="-1">_Not Relevant_</option>
                     <option  value="100">Created</option>
                     <option  value="355">_Error</option>
                     <option  value="370">_Pre Calculated_</option>
                     <option value="380">_calculated_</option>
                     <option  value="390">_Awaiting Stock To preparae_</option>
                     <option  value="400">_Awaiting preparation_</option>
                     <option  value="424">_InPreparation</option>
                     <option  value="500">_Prepared_</option>
                     <option  value="4000">_Cancelled_</option>
                     <option value="4500">_Deleted_</option>
                      </Input>
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Box Preparation warehouse </Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idwarehousePRP"
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
                      <Label>preparation Order</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idPrepOrder"
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
                        name="idPrepOrder"
                        value={this.state.idPrepOrder}
                        onBlur={this.onBlurHandler}
                      
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Preparation Order Customer ID</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="idPrepOrderCustomer"
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
                        type="text"
                        name="idPrepOrderCustomer"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        value={this.state.idPrepOrderCustomer}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >

                      </Input>
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Preparation Order L3 ID</Label>{" "}
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
                        name="idPrepOrderL3"
                        value={this.state.idPrepOrderL3}
                        onBlur={this.onBlurHandler}
                      
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Label>Preparation Order status</Label>{" "}
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
                      <option value="200">_Cubing Error_</option>
                      <option value="">_CubingOk_</option>
                      <option value="350">_Launchable_</option>
                      <option value="360">Seleted</option>
                      <option value="400">_Launched_</option>
                      <option value="">InPreparation_</option>
                      <option value="500">_Prepared_</option>
                      <option value="4000">_Cancelled_</option>
                      </Input>
                    </Col>
    
                    <Col></Col>
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
                         <option value="200">_Standard_</option>
                          
                         </Input>
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row>
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
    
                    <Col></Col>
                    <Col>
                      <Label>Link</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="select"
                        name="plfLink"
                        id="plfLink"
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
                       bsSize="sm"
                       onChange={this.inputChangeHandler}
                       name="plfLink"
                       value={this.state.plfLink}
                       onBlur={this.onBlurHandler} />
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row>
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
                        name="plfObd1"
                        value={this.state.plfObd1}
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
                        name="select"
                        id="exampleSelect"
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
                      
                      bsSize="sm"
                      onChange={this.inputChangeHandler}
                      name="statusShipping"
                      value={this.state.statusShipping}
                      onBlur={this.onBlurHandler}/>
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

export default Box_Filter;