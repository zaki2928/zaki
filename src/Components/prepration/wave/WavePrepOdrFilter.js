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
import Waveorder from "./Waveorder";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { TiArrowBack } from "react-icons/ti";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";

import {
  OrderprepData,
  remover,
  OrderprepHandler,
  PreparationOrderprepcriteriaHandler,
  WaveAddlinesdata,
} from "../../../store/Store";
import axios from "axios";
import { properties } from "../../../Properties/Properties";
const getListOfPreparationOrders =
  properties.Port + properties.getListOfPreparationOrders;
const getWarehousesForPhysicalgate =
  properties.Port + properties.getWarehousesForPhysicalgate;
const getWaveShbyIdWave = properties.Port + properties.getWaveShbyIdWave;

class WavePrepOdrFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limit: "",
      waveorderlist: false,
      batch: "",
      idCarrier: "",
      idCarrierReceived: "",
      idDm: "",
      idDmReceived: "",
      idGate: "",
      idLocation: "",
      idPrepOrder: "",
      idPrepOrderCustomer: "",
      idPrepOrderL3: "",
      idProduct: "",
      listFilterBean: [],
      attribute: null,
      operation: "=",
      value: null,
      mDate: "",
      meansOfTransport: "",
      plfLink: "",
      plfObd1: "",
      statusPo: "",
      statusShipping: "",
      typePalettisation: "",
      typePo: "",
      typePoStuffing: "",
      warehousePreparationIds: "",
      zContShipLine: "",
      zEtaDate: "",
      idWarehouseList: [],
      zSabicDelivId: "",
      zSabicOrderId: "",
      zSalesTerm: "",
      zShipPoint: "",
      zSkOrderId: "",
      idWave: "",
      waveshippingdata: [],
      idDisable: false,
    };
  }

  componentDidMount = () => {
    console.log("props passed", this.props.waveshippingdata);
    if (this.props.waveshippingdata !== "") {
      this.setState(
        {
          idCarrier: this.props.waveshippingdata.idCarrier,
          idDm: this.props.waveshippingdata.idDm,
          waveshippingdata: this.props.waveshippingdata,
          idDisable: true,
        },
        () => console.log("shahiddd", this.state)
      );
      const data = [
        {
          attribute: "statusPo",
          operation: "=",
          value: "350",
        },
        {
          attribute: "IdCarrier",
          operation: "=",
          value: this.props.waveshippingdata.idCarrier,
        },
        {
          attribute: "IdDm",
          operation: "=",
          value: this.props.waveshippingdata.idDm,
        },
      ];
      this.setState({
        listFilterBean: data,
      });
    } else {
      const data = [
        {
          attribute: "statusPo",
          operation: "=",
          value: "350",
        },
      ];
      this.setState({
        listFilterBean: data,
      });
    }

    console.log("calling for addliness datatatatatattatt", WaveAddlinesdata);
    this.setState({
      ddDateMax: WaveAddlinesdata.ddDateMax,
      ddDateMin: WaveAddlinesdata.ddDateMin,
      idWave: WaveAddlinesdata.idWave,
    });
    console.log("testing api trailer release calling");
    this.getIdWarehouseList();
  };

  getIdWarehouseList = () => {
    console.log("calling region from dropdown", this.state.idWarehouseList);
    axios
      .get(getWarehousesForPhysicalgate)

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

  getShDataByIdWave = (id) => {
    console.log("getShDataByIdWave");
    axios
      .post(getWaveShbyIdWave + id)
      .then((res) => {
        if (res.status === 200) {
          console.log("response succcccccccccccccccccccc", res.data);

          // let data = [];
          // data.push(res.data);
          // this.setState({
          //   waveshippingdata: data,
          // });
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  criteriaFilterMethod = () => {
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    const data = {
      listFilterBean: this.state.listFilterBean,
    };
    console.log("dataaaa", data);

    axios
      .post(getListOfPreparationOrders, data, {
        params: {
          limit: this.state.limit,
        },
      })
      .then((response) => {
        console.log("shahid=========>", response);
        // this.getShDataByIdWave(this.state.idWave);
        if (response.status === 200 && response.data.length !== 0) {
          console.log(
            "resposne success ______________________________",
            response.data
          );
          this.setState({
            data: response.data,
            waveorderlist: true,
          });
          OrderprepHandler(response.data);
          PreparationOrderprepcriteriaHandler(criteria);
        } else {
          this.setState({
            waveorderlist: true,
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
    console.log(
      "index BEFORE prepartionorder print",
      this.state.listFilterBean
    );
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
    console.log(
      "index AFTER Preparationorder print",
      this.state.listFilterBean
    );
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
          value: "19@".concat(this.state.idLocation),
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
        this.state.listFilterBean[index].value =
          this.state.warehousePreparationIds;
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

  backHandler = () => {
    this.setState({
      waveorderlist: false,
    });
    remover("WaveAddlinesdata");
    this.props.AddlinesCloseHandler();
  };

  resetdata = () => {
    this.setState({
      limit: "",
      waveorderlist: false,
      batch: "",
      idCarrier: "",
      idCarrierReceived: "",
      idDm: "",
      idDmReceived: "",
      idGate: "",
      idLocation: "",
      idPrepOrder: "",
      idPrepOrderCustomer: "",
      idPrepOrderL3: "",
      idProduct: "",
      listFilterBean: [],
      attribute: null,
      operation: "=",
      value: null,
      mDate: "",
      meansOfTransport: "",
      plfLink: "",
      plfObd1: "",
      statusPo: "",
      statusShipping: "",
      typePalettisation: "",
      typePo: "",
      typePoStuffing: "",
      warehousePreparationIds: "",
      zContShipLine: "",
      zEtaDate: "",
      zSabicDelivId: "",
      zSabicOrderId: "",
      zSalesTerm: "",
      zShipPoint: "",
      zSkOrderId: "",
    });
  };

  // backHandler = () => {
  //   this.setState({
  //     limit: "",
  //     waveorderlist: false,
  //     batch: "",
  //     idCarrier: "",
  //     idCarrierReceived: "",
  //     idDm: "",
  //     idDmReceived: "",
  //     idGate: "",
  //     idLocation: "",
  //     idPrepOrder: "",
  //     idPrepOrderCustomer: "",
  //     idPrepOrderL3: "",
  //     idProduct: "",
  //     listFilterBean: [],
  //     attribute: null,
  //     operation: "=",
  //     value: null,
  //     mDate: "",
  //     meansOfTransport: "",
  //     plfLink: "",
  //     plfObd1: "",
  //     statusPo: "",
  //     statusShipping: "",
  //     typePalettisation: "",
  //     typePo: "",
  //     typePoStuffing: "",
  //     warehousePreparationIds: "",
  //     zContShipLine: "",
  //     zEtaDate: "",
  //     zSabicDelivId: "",
  //     zSabicOrderId: "",
  //     zSalesTerm: "",
  //     zShipPoint: "",
  //     zSkOrderId: "",
  //   });
  // };

  render() {
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ marginLeft: "14px" }}
        >
          {this.state.waveorderlist === true || OrderprepData.length !== 0 ? (
            <Waveorder
              backHandler={this.backHandler}
              data={this.state.data}
              waveshippingdata={this.state.waveshippingdata}
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
                    <a style={{cursor:"pointer"}}>Wave search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}}>Wave edition</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}} onClick={this.backHandler}>Wave list</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}}>Wave details add</a>
                  </b>
                </u>
              </span>
              <br />
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "lightgrey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>
                  <div
                    style={{
                      alignContent: "center",
                    }}
                  >
                    <Row>
                      <Col></Col>
                      <Col>
                        <Label>Wave No</Label> :
                        <input value={this.state.idWave} />
                      </Col>
                      <Col></Col>
                    </Row>
                  </div>
                </b>
              </div>
              <br />
              <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>

                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <span
                  style={{
                    color: "skyblue",
                  }}
                >
                  <TiArrowBack />
                  <u>
                    <b style={{cursor:"pointer"}}>Back</b>
                  </u>
                </span>
                <span style={{ marginLeft: "8px", color: "skyblue" }}>
                  <IoIosSkipForward />
                  <u>
                    <b style={{cursor:"pointer"}}>Show /Hide Criteria</b>
                  </u>
                </span>
                <span
                  style={{
                    color: "skyblue",
                    marginLeft: "8px",
                  }}
                >
                  <u>
                    <b style={{cursor:"pointer"}}>Automatic Hide And Display</b>
                  </u>
                </span>

                <Col></Col>
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
                  <Label>Min desired delivery date</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="abc"
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
                    type="date"
                    name="ddDateMin"
                    id="ddDateMin"
                    // style={{ width: "60px" }}
                    value={this.state.ddDateMin}
                    bsSize="sm"
                    // onChange={this.inputChangeHandler}
                    // onBlur={() => this.onBlurHandler("company")}
                    // onBlur={this.onBlurHandler}
                  />
                </Col>

                <Col></Col>
                <Col>
                  <Label>Max desired delivery date</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="mDate"
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
                    type="date"
                    name="ddDateMax"
                    id="ddDateMax"
                    // style={{ width: "60px" }}
                    value={this.state.ddDateMax}
                    bsSize="sm"
                    // onChange={this.inputChangeHandler}
                    // onBlur={() => this.onBlurHandler("company")}
                    // onBlur={this.onBlurHandler}
                  />
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
                    {/* <option>     </option> */}
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
                    <option> </option>
                    <option option value="0">
                      _Non PLF_
                    </option>
                    <option value="100">_Stuffing at Affiliate_</option>
                    <option option value="200">
                      _Stuffing At PLF_
                    </option>
                  </Input>
                </Col>
                <Col> </Col>
              </Row>

              <Row>
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
                  ></Input>
                </Col>
                <Col></Col>
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
                    type="text"
                    name="idCarrier"
                    disabled={this.state.idDisable}
                    onChange={this.changeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.idCarrier}
                    bsSize="sm"
                  ></Input>
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
                    disabled={this.state.idDisable}
                    type="text"
                    name="idDm"
                    value={this.state.idDm}
                    onChange={this.changeHandler}
                    onBlur={this.onBlurHandler}
                    bsSize="sm"
                  ></Input>
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
                  ></Input>
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
                    bsSize="sm"
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
                <Col></Col>
                <Col></Col>
                <Col></Col>
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

export default WavePrepOdrFilter;
