import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import {
  gateerrormesg,
  setGateerrormesg,
  logicalgateData,
  logicalphysicalgateCriteria,
  logicalgateDataHandler,
  logicalgateEditData,
  logicalgateEditDataHandler,
  remover,
  logicalgateid,
} from "../../../store/Store";
import Logicalgateedit from "./Logicalgateedit";
import Createnewlogicalgate from "./Createnewlogicalgate";
import { FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaSave, FaFileSignature } from "react-icons/fa";
import { properties } from "../../../Properties/Properties";
import { LOGICAL_GATE, USERNAME } from "../../../store/RoleBased";

const getListOfLogicalGates =
  properties.Port + properties.getListOfLogicalGates;
const getGateDetailsByGateNo =
  properties.Port + properties.getGateDetailsByGateNo;
const ShippingGate = properties.Port + properties.ShippingGate;

export default class Logicalgatelist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data2: [],
      isNew: false,
      isEdit: false,
      listGateReserveBean: [],
      isChecked: false,
      checkeditems: new Map(),
      idGate: "",
      tempdata: [],
      msg: "",
      mUsername:USERNAME,
    };
  }

  componentWillMount = () => {
    console.log("component will mount calling");
    if (logicalgateData.length !== 0) {
      this.setState({
        data: logicalgateData,
        tempdata: logicalgateData,
      });
    }
  };

  componentDidMount = () => {
    console.log("gate data-----------", logicalgateData);
    const newData = [...logicalgateData];
    this.setState({ data: newData });
    if (logicalgateData.length !== 0) {
      this.setState({
        data: logicalgateData,
        tempdata: logicalgateData,
      });
    } else {
      this.setState({
        data: this.props.data,
        tempdata: this.props.data,
      });
    }
  };

  gateCheckBoxHandler = (data, gatenumber) => {
    // console.log("calling gate checkbox handler>", data);
    for (let i = 0; i < data.listOfChild.length; i++) {
      if (data.listOfChild[i].gateNumber === gatenumber) {
        return true;
      }
    }
  };

  savehandler = (listGateReserveBean, logicalid, gateNumber) => {
    console.log("save handlerrrrrrrrr calling");
    const data = {
      idGate: this.state.idGate,
    };
    axios
      .post(ShippingGate, this.state)

      .then((response) => {
        if (response.status === 200) {
          console.log("refresh handlerr calling");
          this.refreshhhHandler();
          this.setState({
            msg: "Data Saved Successfully",
          });
          console.log(
            "resposne success++++++++++++++++++++++++++++++++",
            response.data
          );
          // const data = {
          //   newLogicalGateId: logicalid,
          //   oldLogicalGateId: response.data.idGateFather,
          //   physicalGateId: response.data.idGate,
          // };
          // this.state.listGateReserveBean.push(data);
          // console.log(
          //   "uzmmaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
          //   this.state.listGateReserveBean
          // );
          this.setState({
            tempdata: this.state.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  logicalicalgateFilterMethod = () => {
    console.log("submitHandler calling");

    axios
      .post(getListOfLogicalGates, logicalphysicalgateCriteria, {
        params: {
          limit: logicalphysicalgateCriteria.limit,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
          });

          logicalgateDataHandler(response.data);
          this.componentDidMount();
        } else {
          this.setState({
            data: [],
          });
          logicalgateDataHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  physicalgateapi = (gateNumber, logicalid) => {
    console.log("gate number", gateNumber);
    axios
      .get(getGateDetailsByGateNo + gateNumber)
      .then((response) => {
        if (response.status === 200) {
          const index = this.state.listGateReserveBean.findIndex(
            (data) => data.physicalGateId === response.data.idGate
          );
          this.setState({
            msg: "",
          });
          console.log(
            "resposne success++++++++++++++++++++++++++++++++",
            response.data.idGate
          );
          // this.forceUpdate();
          console.log("index", index);
          const data = {
            newLogicalGateId: logicalid,
            oldLogicalGateId: response.data.idGateFather,
            physicalGateId: response.data.idGate,
          };
          if (index === -1) {
            this.state.listGateReserveBean.push(data);
          } else {
            this.state.listGateReserveBean.splice(index, 1);
            this.state.listGateReserveBean.push(data);
          }

          console.log(
            "uzmmaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
            this.state.listGateReserveBean
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // deleteHandler(props) {
  //   console.log("ID----------------", props.idGate)
  //   console.log("delete url", deleteGateKl)
  //   Swal.fire({
  //     title: 'Confirmation',
  //     text: "Do you confirm the deletion?",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: 'gray',
  //     cancelButtonColor: 'gray',
  //     confirmButtonText: 'delete'
  //   }).then((result) => {
  //     console.log("swal result", result)
  //     if (result.value) {
  //       axios.delete(deleteGateKl + props.idGate)
  //         .then((response) => {
  //           console.log("mj data", response);
  //           if (response.status === 200) {
  //             console.log("response  success");
  //             this.refreshHandler();
  //           }
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });

  //       Swal.fire(
  //         'Deleted!',
  //         'Your file has been deleted.',
  //         'success'
  //       )
  //     }
  //   })
  // }

  newCreateHandler = () => {
    console.log("new contact++++++++++++++++++++++++++++");
    // newCreateContactDataHandler()
    this.setState({
      isNew: true,
    });
  };

  backkHandler = () => {
    console.log("calling back handler for list");
    remover(logicalgateid);
    this.props.backHandler();
    setGateerrormesg(false);
  };

  closeHandler = () => {
    this.setState({
      isNew: false,
    });
  };

  editHandler = (props) => {
    console.log("check props data", props);
    console.log("edit data from edit handlr", logicalgateEditData);
    this.setState({
      isEdit: true,
      data2: props,
    });

    logicalgateEditDataHandler(props);
  };

  editcloseHandler = () => {
    console.log("edit close from list page");
    this.setState({
      isEdit: false,
    });
  };

  // refreshhhHandler = () => {
  //   console.log("refresh button pressed", logicalphysicalgateCriteria);
  //   // this.refreshHandler();
  // };

  refreshhhHandler = () => {
    setGateerrormesg(false);
    axios
      .post(getListOfLogicalGates, logicalphysicalgateCriteria, {
        params: {
          limit: logicalphysicalgateCriteria.limit,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
          });
          logicalgateDataHandler(response.data);
        } else {
          this.setState({
            data: [],
          });
          logicalgateDataHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  resethHandler = () => {
    setGateerrormesg(false);
    axios
      .post(getListOfLogicalGates, logicalphysicalgateCriteria, {
        params: {
          limit: logicalphysicalgateCriteria.limit,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
            tempdata: response.data,
            listGateReserveBean: [],
          });
          logicalgateDataHandler(response.data);
        } else {
          this.setState({
            data: [],
            listGateReserveBean: [],
          });
          logicalgateDataHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  onchangehandler = (props, physicalgate) => {
    console.log("onchange calling");
    let index = this.state.tempdata.findIndex(
      (data) => data.idGate === props.idGate
    );
    for (let i = 0; i < this.state.tempdata.length; i++) {
      for (let j = 0; j < this.state.tempdata[i].listOfChild.length; j++) {
        if (this.state.tempdata[i].listOfChild[j].gateNumber === physicalgate) {
          if (this.state.tempdata[i].statusGate !== 100) {
            setGateerrormesg(true);
            this.forceUpdate();
            return;
            console.log("shahid iqbal");
          } else {
            setGateerrormesg(false);
            console.log("else part");
            for (let i = 0; i < this.state.tempdata.length; i++) {
              for (
                let j = 0;
                j < this.state.tempdata[i].listOfChild.length;
                j++
              ) {
                if (
                  this.state.tempdata[i].listOfChild[j].gateNumber ===
                  physicalgate
                ) {
                  const data = this.state.tempdata[i].listOfChild[j];
                  this.state.tempdata[i].listOfChild.splice(j, 1);
                  logicalgateDataHandler(this.state.tempdata);

                  this.state.tempdata[index].listOfChild.push(data);
                }
              }
            }
            this.setState({
              data: this.state.tempdata,
            });

            this.physicalgateapi(physicalgate, props.idGate);
          }
        }
      }
    }
  };

  filterCaseInsensitive(filter, row) {
    const id = filter.pivotId || filter.id;
    if (row[id] !== null) {
      return row[id] !== undefined
        ? String(row[id].toString().toLowerCase()).includes(
            filter.value.toString().toLowerCase()
          )
        : true;
    }
  }

  render() {
    console.log("component rerenderrrrrrrrrrrrrr");
    const columns = [
      {
        Header: "Edit",
        Cell: () => <FaEdit style={{cursor:"pointer" }} onClick={this.gateeditHandler} />,
      },
      {
        Header: "Delete",
        show: LOGICAL_GATE === 2 ? true : false,
        Cell: () => <FaTrashAlt  style={{cursor:"pointer" }}/>,
      },
      {
        Header: "Id",
        accessor: "idGate",
      },
      {
        Header: "Site",
        accessor: "idSite",
      },
      {
        Header: "Warehouse",
        accessor: "idWarehouse",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Available",
        accessor: "available",
        Cell: (props) => (
          <input
            type="checkbox"
            checked={props.original.available === 1 ? true : false}
          />
        ),
      },
      {
        Header: "Always Available",
        accessor: "alwaysAvailable",
        Cell: (props) => (
          <input
            type="checkbox"
            checked={props.original.alwaysAvailable === 1 ? true : false}
          />
        ),
      },
      {
        Header: "Status",
        accessor: "statusGate",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusGate === 100 ? (
                <span>Free</span>
              ) : props.original.statusGate === 200 ? (
                <span>Reserved</span>
              ) : props.original.statusGate === 300 ? (
                <span>Busy</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Type",
        accessor: "typeGate",
        Cell: (props) => {
          return (
            <text>
              {props.original.typeGate === 100 ? (
                <span>Truck</span>
              ) : props.original.typeGate === 200 ? (
                <span>Container</span>
              ) : props.original.typeGate === 1000 ? (
                <span>Multi</span>
              ) : props.original.typeGate === -1 ? (
                <span>Not_Relevant</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Assignment",
        accessor: "typeAssignment",
        Cell: (props) => {
          return (
            <text>
              {props.original.typeAssignment === 100 ? (
                <span>Shipping</span>
              ) : props.original.typeAssignment === 200 ? (
                <span>GoodsIn</span>
              ) : props.original.typeAssignment === 300 ? (
                <span>Inter_Stock</span>
              ) : props.original.typeAssignment === 400 ? (
                <span>Inter_Warehouse</span>
              ) : props.original.typeAssignment === 100000 ? (
                <span>Shipping_Silo</span>
              ) : props.original.typeAssignment === 110000 ? (
                <span>Shipping_After_Storage</span>
              ) : // props.original.typeAssignment===700?<span>LOAD_COLLECTION</span>:
              // props.original.typeAssignment===710?<span>UNLOAD_COLLECTION</span>:
              // props.original.typeAssignment===800?<span>TRAILER</span>
              null}
            </text>
          );
        },
      },

      {
        Header: "1",
        Cell: (props) => (
          <input
            type="radio"
            name="1"
            onChange={() => this.onchangehandler(props.original, 1)}
            checked={this.gateCheckBoxHandler(props.original, 1)}
          ></input>
        ),
      },
      {
        Header: "2",
        Cell: (props) => (
          <input
            type="radio"
            name="2"
            onChange={() => this.onchangehandler(props.original, 2)}
            checked={this.gateCheckBoxHandler(props.original, 2)}
          ></input>
        ),
      },
      {
        Header: "3",
        Cell: (props) => (
          <input
            type="radio"
            name="3"
            onChange={() => this.onchangehandler(props.original, 3)}
            checked={this.gateCheckBoxHandler(props.original, 3)}
          ></input>
        ),
      },
      {
        Header: "4",
        Cell: (props) => (
          <input
            type="radio"
            name="4"
            onChange={() => this.onchangehandler(props.original, 4)}
            checked={this.gateCheckBoxHandler(props.original, 4)}
          ></input>
        ),
      },
      {
        Header: "5",
        Cell: (props) => (
          <input
            type="radio"
            name="5"
            onChange={() => this.onchangehandler(props.original, 5)}
            checked={this.gateCheckBoxHandler(props.original, 5)}
          ></input>
        ),
      },
      {
        Header: "6",
        Cell: (props) => (
          <input
            type="radio"
            name="5"
            onChange={() => this.onchangehandler(props.original, 6)}
            checked={this.gateCheckBoxHandler(props.original, 6)}
          ></input>
        ),
      },
      {
        Header: "7",
        Cell: (props) => (
          <input
            type="radio"
            name="7"
            onChange={() => this.onchangehandler(props.original, 7)}
            checked={this.gateCheckBoxHandler(props.original, 7)}
          ></input>
        ),
      },
      {
        Header: "8",
        Cell: (props) => (
          <input
            type="radio"
            name="8"
            onClick={() => this.onchangehandler(props.original, 8)}
            checked={this.gateCheckBoxHandler(props.original, 8)}
          ></input>
        ),
      },
      {
        Header: "9",
        Cell: (props) => (
          <input
            type="radio"
            name="9"
            onChange={() => this.onchangehandler(props.original, 9)}
            checked={this.gateCheckBoxHandler(props.original, 9)}
          ></input>
        ),
      },
      {
        Header: "10",
        Cell: (props) => (
          <input
            type="radio"
            name="10"
            onChange={() => this.onchangehandler(props.original, 10)}
            checked={this.gateCheckBoxHandler(props.original, 10)}
          ></input>
        ),
      },
      {
        Header: "11",
        Cell: (props) => (
          <input
            type="radio"
            name="11"
            onChange={() => this.onchangehandler(props.original, 11)}
            checked={this.gateCheckBoxHandler(props.original, 11)}
          ></input>
        ),
      },
      {
        Header: "12",
        Cell: (props) => (
          <input
            type="radio"
            name="12"
            onChange={() => this.onchangehandler(props.original, 12)}
            checked={this.gateCheckBoxHandler(props.original, 12)}
          ></input>
        ),
      },
      {
        Header: "13",
        Cell: (props) => (
          <input
            type="radio"
            name="13"
            onChange={() => this.onchangehandler(props.original, 13)}
            checked={this.gateCheckBoxHandler(props.original, 13)}
          ></input>
        ),
      },
      {
        Header: "14",
        Cell: (props) => (
          <input
            type="radio"
            name="14"
            onChange={() => this.onchangehandler(props.original, 14)}
            checked={this.gateCheckBoxHandler(props.original, 14)}
          ></input>
        ),
      },
      {
        Header: "15",
        Cell: (props) => (
          <input
            type="radio"
            name="15"
            onChange={() => this.onchangehandler(props.original, 15)}
            checked={this.gateCheckBoxHandler(props.original, 15)}
          ></input>
        ),
      },
      {
        Header: "16",
        Cell: (props) => (
          <input
            type="radio"
            name="16"
            onChange={() => this.onchangehandler(props.original, 16)}
            checked={this.gateCheckBoxHandler(props.original, 16)}
          ></input>
        ),
      },
      {
        Header: "17",
        Cell: (props) => (
          <input
            type="radio"
            name="17"
            onChange={() => this.onchangehandler(props.original, 17)}
            checked={this.gateCheckBoxHandler(props.original, 17)}
          ></input>
        ),
      },
      {
        Header: "18",
        Cell: (props) => (
          <input
            type="radio"
            name="18"
            onChange={() => this.onchangehandler(props.original, 18)}
            checked={this.gateCheckBoxHandler(props.original, 18)}
          ></input>
        ),
      },
      {
        Header: "19",
        Cell: (props) => (
          <input
            type="radio"
            name="19"
            onChange={() => this.onchangehandler(props.original, 19)}
            checked={this.gateCheckBoxHandler(props.original, 19)}
          ></input>
        ),
      },
      {
        Header: "20",
        Cell: (props) => (
          <input
            type="radio"
            name="20"
            onChange={() => this.onchangehandler(props.original, 20)}
            checked={this.gateCheckBoxHandler(props.original, 20)}
          ></input>
        ),
      },
      {
        Header: "21",
        Cell: (props) => (
          <input
            type="radio"
            name="21"
            onChange={() => this.onchangehandler(props.original, 21)}
            checked={this.gateCheckBoxHandler(props.original, 21)}
          ></input>
        ),
      },
      {
        Header: "22",
        Cell: (props) => (
          <input
            type="radio"
            name="22"
            onChange={() => this.onchangehandler(props.original, 22)}
            checked={this.gateCheckBoxHandler(props.original, 22)}
          ></input>
        ),
      },
      {
        Header: "23",
        Cell: (props) => (
          <input
            type="radio"
            name="23"
            onChange={() => this.onchangehandler(props.original, 23)}
            checked={this.gateCheckBoxHandler(props.original, 23)}
          ></input>
        ),
      },
      {
        Header: "24",
        Cell: (props) => (
          <input
            type="radio"
            name="24"
            onChange={() => this.onchangehandler(props.original, 24)}
            checked={this.gateCheckBoxHandler(props.original, 24)}
          ></input>
        ),
      },
      {
        Header: "25",
        Cell: (props) => (
          <input
            type="radio"
            name="25"
            onChange={() => this.onchangehandler(props.original, 25)}
            checked={this.gateCheckBoxHandler(props.original, 25)}
          ></input>
        ),
      },
      {
        Header: "26",
        Cell: (props) => (
          <input
            type="radio"
            name="26"
            onChange={() => this.onchangehandler(props.original, 26)}
            checked={this.gateCheckBoxHandler(props.original, 26)}
          ></input>
        ),
      },
      {
        Header: "27",
        Cell: (props) => (
          <input
            type="radio"
            name="27"
            onChange={() => this.onchangehandler(props.original, 27)}
            checked={this.gateCheckBoxHandler(props.original, 27)}
          ></input>
        ),
      },
      {
        Header: "28",
        Cell: (props) => (
          <input
            type="radio"
            name="28"
            onChange={() => this.onchangehandler(props.original, 28)}
            checked={this.gateCheckBoxHandler(props.original, 28)}
          ></input>
        ),
      },
      {
        Header: "29",
        Cell: (props) => (
          <input
            type="radio"
            name="29"
            onChange={() => this.onchangehandler(props.original, 29)}
            checked={this.gateCheckBoxHandler(props.original, 29)}
          ></input>
        ),
      },
      {
        Header: "30",
        Cell: (props) => (
          <input
            type="radio"
            name="30"
            onChange={() => this.onchangehandler(props.original, 30)}
            checked={this.gateCheckBoxHandler(props.original, 30)}
          ></input>
        ),
      },
      {
        Header: "31",
        Cell: (props) => (
          <input
            type="radio"
            name="31"
            onChange={() => this.onchangehandler(props.original, 31)}
            checked={this.gateCheckBoxHandler(props.original, 31)}
          ></input>
        ),
      },
      {
        Header: "32",
        Cell: (props) => (
          <input
            type="radio"
            name="32"
            onChange={() => this.onchangehandler(props.original, 32)}
            checked={this.gateCheckBoxHandler(props.original, 32)}
          ></input>
        ),
      },
      {
        Header: "33",
        Cell: (props) => (
          <input
            type="radio"
            name="33"
            onChange={() => this.onchangehandler(props.original, 33)}
            checked={this.gateCheckBoxHandler(props.original, 33)}
          ></input>
        ),
      },
      {
        Header: "34",
        Cell: (props) => (
          <input
            type="radio"
            name="34"
            onChange={() => this.onchangehandler(props.original, 34)}
            checked={this.gateCheckBoxHandler(props.original, 34)}
          ></input>
        ),
      },
      {
        Header: "35",
        Cell: (props) => (
          <input
            type="radio"
            name="35"
            onChange={() => this.onchangehandler(props.original, 35)}
            checked={this.gateCheckBoxHandler(props.original, 35)}
          ></input>
        ),
      },
      {
        Header: "36",
        Cell: (props) => (
          <input
            type="radio"
            name="36"
            onChange={() => this.onchangehandler(props.original, 36)}
            checked={this.gateCheckBoxHandler(props.original, 36)}
          ></input>
        ),
      },
      {
        Header: "37",
        Cell: (props) => (
          <input
            type="radio"
            name="37"
            onChange={() => this.onchangehandler(props.original, 37)}
            checked={this.gateCheckBoxHandler(props.original, 37)}
          ></input>
        ),
      },
      {
        Header: "38",
        Cell: (props) => (
          <input
            type="radio"
            name="38"
            onChange={() => this.onchangehandler(props.original, 38)}
            checked={this.gateCheckBoxHandler(props.original, 38)}
          ></input>
        ),
      },
      {
        Header: "39",
        Cell: (props) => (
          <input
            type="radio"
            name="39"
            onChange={() => this.onchangehandler(props.original, 39)}
            checked={this.gateCheckBoxHandler(props.original, 39)}
          ></input>
        ),
      },
      {
        Header: "40",
        Cell: (props) => (
          <input
            type="radio"
            name="40"
            onChange={() => this.onchangehandler(props.original, 40)}
            checked={this.gateCheckBoxHandler(props.original, 40)}
          ></input>
        ),
      },
      {
        Header: "41",
        Cell: (props) => (
          <input
            type="radio"
            name="41"
            onChange={() => this.onchangehandler(props.original, 41)}
            checked={this.gateCheckBoxHandler(props.original, 41)}
          ></input>
        ),
      },
      {
        Header: "42",
        Cell: (props) => (
          <input
            type="radio"
            name="42"
            onChange={() => this.onchangehandler(props.original, 42)}
            checked={this.gateCheckBoxHandler(props.original, 42)}
          ></input>
        ),
      },
      {
        Header: "43",
        Cell: (props) => (
          <input
            type="radio"
            name="43"
            onChange={() => this.onchangehandler(props.original, 43)}
            checked={this.gateCheckBoxHandler(props.original, 43)}
          ></input>
        ),
      },
      {
        Header: "44",
        Cell: (props) => (
          <input
            type="radio"
            name="44"
            onChange={() => this.onchangehandler(props.original, 44)}
            checked={this.gateCheckBoxHandler(props.original, 44)}
          ></input>
        ),
      },
      {
        Header: "45",
        Cell: (props) => (
          <input
            type="radio"
            name="45"
            onChange={() => this.onchangehandler(props.original, 45)}
            checked={this.gateCheckBoxHandler(props.original, 45)}
          ></input>
        ),
      },
      {
        Header: "46",
        Cell: (props) => (
          <input
            type="radio"
            name="46"
            onChange={() => this.onchangehandler(props.original, 46)}
            checked={this.gateCheckBoxHandler(props.original, 46)}
          ></input>
        ),
      },
      {
        Header: "47",
        Cell: (props) => (
          <input
            type="radio"
            name="47"
            onChange={() => this.onchangehandler(props.original, 47)}
            checked={this.gateCheckBoxHandler(props.original, 47)}
          ></input>
        ),
      },
      {
        Header: "48",
        Cell: (props) => (
          <input
            type="radio"
            name="48"
            onChange={() => this.onchangehandler(props.original, 48)}
            checked={this.gateCheckBoxHandler(props.original, 48)}
          ></input>
        ),
      },
      {
        Header: "49",
        Cell: (props) => (
          <input
            type="radio"
            name="49"
            onChange={() => this.onchangehandler(props.original, 49)}
            checked={this.gateCheckBoxHandler(props.original, 49)}
          ></input>
        ),
      },
      {
        Header: "50",
        Cell: (props) => (
          <input
            type="radio"
            name="50"
            onChange={() => this.onchangehandler(props.original, 50)}
            checked={this.gateCheckBoxHandler(props.original, 50)}
          ></input>
        ),
      },
      {
        Header: "51",
        Cell: (props) => (
          <input
            type="radio"
            name="51"
            onChange={() => this.onchangehandler(props.original, 51)}
            checked={this.gateCheckBoxHandler(props.original, 51)}
          ></input>
        ),
      },
      {
        Header: "52",
        Cell: (props) => (
          <input
            type="radio"
            name="52"
            onChange={() => this.onchangehandler(props.original, 52)}
            checked={this.gateCheckBoxHandler(props.original, 52)}
          ></input>
        ),
      },
      {
        Header: "53",
        Cell: (props) => (
          <input
            type="radio"
            name="53"
            onChange={() => this.onchangehandler(props.original, 53)}
            checked={this.gateCheckBoxHandler(props.original, 53)}
          ></input>
        ),
      },
      {
        Header: "54",
        Cell: (props) => (
          <input
            type="radio"
            name="54"
            onChange={() => this.onchangehandler(props.original, 54)}
            checked={this.gateCheckBoxHandler(props.original, 54)}
          ></input>
        ),
      },
      {
        Header: "55",
        Cell: (props) => (
          <input
            type="radio"
            name="55"
            onChange={() => this.onchangehandler(props.original, 55)}
            checked={this.gateCheckBoxHandler(props.original, 55)}
          ></input>
        ),
      },
      {
        Header: "56",
        Cell: (props) => (
          <input
            type="radio"
            name="56"
            onChange={() => this.onchangehandler(props.original, 56)}
            checked={this.gateCheckBoxHandler(props.original, 56)}
          ></input>
        ),
      },
      {
        Header: "57",
        Cell: (props) => (
          <input
            type="radio"
            name="5"
            onChange={() => this.onchangehandler(props.original, 57)}
            checked={this.gateCheckBoxHandler(props.original, 57)}
          ></input>
        ),
      },
      {
        Header: "58",
        Cell: (props) => (
          <input
            type="radio"
            name="58"
            onChange={() => this.onchangehandler(props.original, 58)}
            checked={this.gateCheckBoxHandler(props.original, 58)}
          ></input>
        ),
      },
      {
        Header: "59",
        Cell: (props) => (
          <input
            type="radio"
            name="59"
            onChange={() => this.onchangehandler(props.original, 59)}
            checked={this.gateCheckBoxHandler(props.original, 59)}
          ></input>
        ),
      },
      {
        Header: "60",
        Cell: (props) => (
          <input
            type="radio"
            name="60"
            onChange={() => this.onchangehandler(props.original, 60)}
            checked={this.gateCheckBoxHandler(props.original, 60)}
          ></input>
        ),
      },
      {
        Header: "61",
        Cell: (props) => (
          <input
            type="radio"
            name="61"
            onChange={() => this.onchangehandler(props.original, 61)}
            checked={this.gateCheckBoxHandler(props.original, 61)}
          ></input>
        ),
      },
      {
        Header: "62",
        Cell: (props) => (
          <input
            type="radio"
            name="62"
            onChange={() => this.onchangehandler(props.original, 62)}
            checked={this.gateCheckBoxHandler(props.original, 62)}
          ></input>
        ),
      },
      {
        Header: "63",
        Cell: (props) => (
          <input
            type="radio"
            name="63"
            onChange={() => this.onchangehandler(props.original, 63)}
            checked={this.gateCheckBoxHandler(props.original, 63)}
          ></input>
        ),
      },
      {
        Header: "64",
        Cell: (props) => (
          <input
            type="radio"
            name="64"
            onChange={() => this.onchangehandler(props.original, 64)}
            checked={this.gateCheckBoxHandler(props.original, 64)}
          ></input>
        ),
      },
      {
        Header: "65",
        Cell: (props) => (
          <input
            type="radio"
            name="65"
            onChange={() => this.onchangehandler(props.original, 65)}
            checked={this.gateCheckBoxHandler(props.original, 65)}
          ></input>
        ),
      },
      {
        Header: "66",
        Cell: (props) => (
          <input
            type="radio"
            name="66"
            onChange={() => this.onchangehandler(props.original, 66)}
            checked={this.gateCheckBoxHandler(props.original, 66)}
          ></input>
        ),
      },
      {
        Header: "67",
        Cell: (props) => (
          <input
            type="radio"
            name="67"
            onChange={() => this.onchangehandler(props.original, 67)}
            checked={this.gateCheckBoxHandler(props.original, 67)}
          ></input>
        ),
      },
      {
        Header: "68",
        Cell: (props) => (
          <input
            type="radio"
            name="68"
            onChange={() => this.onchangehandler(props.original, 68)}
            checked={this.gateCheckBoxHandler(props.original, 68)}
          ></input>
        ),
      },
      {
        Header: "69",
        Cell: (props) => (
          <input
            type="radio"
            name="69"
            onChange={() => this.onchangehandler(props.original, 69)}
            checked={this.gateCheckBoxHandler(props.original, 69)}
          ></input>
        ),
      },
      {
        Header: "70",
        Cell: (props) => (
          <input
            type="radio"
            name="70"
            onChange={() => this.onchangehandler(props.original, 70)}
            checked={this.gateCheckBoxHandler(props.original, 70)}
          ></input>
        ),
      },
      {
        Header: "71",
        Cell: (props) => (
          <input
            type="radio"
            name="71"
            onChange={() => this.onchangehandler(props.original, 71)}
            checked={this.gateCheckBoxHandler(props.original, 71)}
          ></input>
        ),
      },
      {
        Header: "72",
        Cell: (props) => (
          <input
            type="radio"
            name="72"
            onChange={() => this.onchangehandler(props.original, 72)}
            checked={this.gateCheckBoxHandler(props.original, 72)}
          ></input>
        ),
      },
      {
        Header: "73",
        Cell: (props) => (
          <input
            type="radio"
            name="73"
            onChange={() => this.onchangehandler(props.original, 73)}
            checked={this.gateCheckBoxHandler(props.original, 73)}
          ></input>
        ),
      },
      {
        Header: "74",
        Cell: (props) => (
          <input
            type="radio"
            name="74"
            onChange={() => this.onchangehandler(props.original, 74)}
            checked={this.gateCheckBoxHandler(props.original, 74)}
          ></input>
        ),
      },
      {
        Header: "75",
        Cell: (props) => (
          <input
            type="radio"
            name="75"
            onChange={() => this.onchangehandler(props.original, 75)}
            checked={this.gateCheckBoxHandler(props.original, 75)}
          ></input>
        ),
      },
      {
        Header: "76",
        Cell: (props) => (
          <input
            type="radio"
            name="76"
            onChange={() => this.onchangehandler(props.original, 76)}
            checked={this.gateCheckBoxHandler(props.original, 76)}
          ></input>
        ),
      },
      {
        Header: "77",
        Cell: (props) => (
          <input
            type="radio"
            name="77"
            onChange={() => this.onchangehandler(props.original, 77)}
            checked={this.gateCheckBoxHandler(props.original, 77)}
          ></input>
        ),
      },
      {
        Header: "78",
        Cell: (props) => (
          <input
            type="radio"
            name="78"
            onChange={() => this.onchangehandler(props.original, 78)}
            checked={this.gateCheckBoxHandler(props.original, 78)}
          ></input>
        ),
      },
      {
        Header: "79",
        Cell: (props) => (
          <input
            type="radio"
            name="79"
            onChange={() => this.onchangehandler(props.original, 79)}
            checked={this.gateCheckBoxHandler(props.original, 79)}
          ></input>
        ),
      },
      {
        Header: "80",
        Cell: (props) => (
          <input
            type="radio"
            name="80"
            onChange={() => this.onchangehandler(props.original, 80)}
            checked={this.gateCheckBoxHandler(props.original, 80)}
          ></input>
        ),
      },
      {
        Header: "81",
        Cell: (props) => (
          <input
            type="radio"
            name="81"
            onChange={() => this.onchangehandler(props.original, 81)}
            checked={this.gateCheckBoxHandler(props.original, 81)}
          ></input>
        ),
      },
      {
        Header: "82",
        Cell: (props) => (
          <input
            type="radio"
            name="82"
            onChange={() => this.onchangehandler(props.original, 82)}
            checked={this.gateCheckBoxHandler(props.original, 82)}
          ></input>
        ),
      },
      {
        Header: "83",
        Cell: (props) => (
          <input
            type="radio"
            name="83"
            onChange={() => this.onchangehandler(props.original, 83)}
            checked={this.gateCheckBoxHandler(props.original, 83)}
          ></input>
        ),
      },
      {
        Header: "84",
        Cell: (props) => (
          <input
            type="radio"
            name="84"
            onChange={() => this.onchangehandler(props.original, 84)}
            checked={this.gateCheckBoxHandler(props.original, 84)}
          ></input>
        ),
      },
      {
        Header: "85",
        Cell: (props) => (
          <input
            type="radio"
            name="85"
            onChange={() => this.onchangehandler(props.original, 85)}
            checked={this.gateCheckBoxHandler(props.original, 85)}
          ></input>
        ),
      },
      {
        Header: "86",
        Cell: (props) => (
          <input
            type="radio"
            name="86"
            onChange={() => this.onchangehandler(props.original, 86)}
            checked={this.gateCheckBoxHandler(props.original, 86)}
          ></input>
        ),
      },
      {
        Header: "87",
        Cell: (props) => (
          <input
            type="radio"
            name="87"
            onChange={() => this.onchangehandler(props.original, 87)}
            checked={this.gateCheckBoxHandler(props.original, 87)}
          ></input>
        ),
      },
      {
        Header: "88",
        Cell: (props) => (
          <input
            type="radio"
            name="87"
            onChange={() => this.onchangehandler(props.original, 87)}
            checked={this.gateCheckBoxHandler(props.original, 88)}
          ></input>
        ),
      },
      {
        Header: "89",
        Cell: (props) => (
          <input
            type="radio"
            name="89"
            onChange={() => this.onchangehandler(props.original, 89)}
            checked={this.gateCheckBoxHandler(props.original, 89)}
          ></input>
        ),
      },
      {
        Header: "90",
        Cell: (props) => (
          <input
            type="radio"
            name="90"
            onChange={() => this.onchangehandler(props.original, 90)}
            checked={this.gateCheckBoxHandler(props.original, 90)}
          ></input>
        ),
      },
      {
        Header: "91",
        Cell: (props) => (
          <input
            type="radio"
            name="91"
            onChange={() => this.onchangehandler(props.original, 91)}
            checked={this.gateCheckBoxHandler(props.original, 91)}
          ></input>
        ),
      },
      {
        Header: "92",
        Cell: (props) => (
          <input
            type="radio"
            name="92"
            onChange={() => this.onchangehandler(props.original, 92)}
            checked={this.gateCheckBoxHandler(props.original, 92)}
          ></input>
        ),
      },
      {
        Header: "93",
        Cell: (props) => (
          <input
            type="radio"
            name="93"
            onChange={() => this.onchangehandler(props.original, 93)}
            checked={this.gateCheckBoxHandler(props.original, 93)}
          ></input>
        ),
      },
      {
        Header: "94",
        Cell: (props) => (
          <input
            type="radio"
            name="94"
            onChange={() => this.onchangehandler(props.original, 94)}
            checked={this.gateCheckBoxHandler(props.original, 94)}
          ></input>
        ),
      },
      {
        Header: "95",
        Cell: (props) => (
          <input
            type="radio"
            name="95"
            onChange={() => this.onchangehandler(props.original, 95)}
            checked={this.gateCheckBoxHandler(props.original, 95)}
          ></input>
        ),
      },
      {
        Header: "96",
        Cell: (props) => (
          <input
            type="radio"
            name="96"
            onChange={() => this.onchangehandler(props.original, 96)}
            checked={this.gateCheckBoxHandler(props.original, 96)}
          ></input>
        ),
      },
      {
        Header: "97",
        Cell: (props) => (
          <input
            type="radio"
            name="97"
            onChange={() => this.onchangehandler(props.original, 97)}
            checked={this.gateCheckBoxHandler(props.original, 97)}
          ></input>
        ),
      },
      {
        Header: "98",
        Cell: (props) => (
          <input
            type="radio"
            name="98"
            onChange={() => this.onchangehandler(props.original, 98)}
            checked={this.gateCheckBoxHandler(props.original, 98)}
          ></input>
        ),
      },
      {
        Header: "99",
        Cell: (props) => (
          <input
            type="radio"
            name="99"
            onChange={() => this.onchangehandler(props.original, 99)}
            checked={this.gateCheckBoxHandler(props.original, 99)}
          ></input>
        ),
      },
      {
        Header: "100",
        Cell: (props) => (
          <input
            type="radio"
            name="100"
            onChange={() => this.onchangehandler(props.original, 100)}
            checked={this.gateCheckBoxHandler(props.original, 100)}
          ></input>
        ),
      },
      {
        Header: "101",
        Cell: (props) => (
          <input
            type="radio"
            name="101"
            onChange={() => this.onchangehandler(props.original, 101)}
            checked={this.gateCheckBoxHandler(props.original, 101)}
          ></input>
        ),
      },
      {
        Header: "102",
        Cell: (props) => (
          <input
            type="radio"
            name="102"
            onChange={() => this.onchangehandler(props.original, 102)}
            checked={this.gateCheckBoxHandler(props.original, 102)}
          ></input>
        ),
      },
      {
        Header: "103",
        Cell: (props) => (
          <input
            type="radio"
            name="103"
            onChange={() => this.onchangehandler(props.original, 103)}
            checked={this.gateCheckBoxHandler(props.original, 103)}
          ></input>
        ),
      },
      {
        Header: "104",
        Cell: (props) => (
          <input
            type="radio"
            name="104"
            onChange={() => this.onchangehandler(props.original, 104)}
            checked={this.gateCheckBoxHandler(props.original, 104)}
          ></input>
        ),
      },
      {
        Header: "105",
        Cell: (props) => (
          <input
            type="radio"
            name="105"
            onChange={() => this.onchangehandler(props.original, 105)}
            checked={this.gateCheckBoxHandler(props.original, 105)}
          ></input>
        ),
      },
      {
        Header: "106",
        Cell: (props) => (
          <input
            type="radio"
            name="106"
            onChange={() => this.onchangehandler(props.original, 106)}
            checked={this.gateCheckBoxHandler(props.original, 106)}
          ></input>
        ),
      },
      {
        Header: "107",
        Cell: (props) => (
          <input
            type="radio"
            name="107"
            onChange={() => this.onchangehandler(props.original, 107)}
            checked={this.gateCheckBoxHandler(props.original, 107)}
          ></input>
        ),
      },
      {
        Header: "108",
        Cell: (props) => (
          <input
            type="radio"
            name="108"
            onChange={() => this.onchangehandler(props.original, 108)}
            checked={this.gateCheckBoxHandler(props.original, 108)}
          ></input>
        ),
      },
      {
        Header: "109",
        Cell: (props) => (
          <input
            type="radio"
            name="109"
            onChange={() => this.onchangehandler(props.original, 109)}
            checked={this.gateCheckBoxHandler(props.original, 109)}
          ></input>
        ),
      },
      {
        Header: "110",
        Cell: (props) => (
          <input
            type="radio"
            name="110"
            onChange={() => this.onchangehandler(props.original, 110)}
            checked={this.gateCheckBoxHandler(props.original, 110)}
          ></input>
        ),
      },
      {
        Header: "111",
        Cell: (props) => (
          <input
            type="radio"
            name="111"
            onChange={() => this.onchangehandler(props.original, 111)}
            checked={this.gateCheckBoxHandler(props.original, 111)}
          ></input>
        ),
      },
      {
        Header: "112",
        Cell: (props) => (
          <input
            type="radio"
            name="112"
            onChange={() => this.onchangehandler(props.original, 112)}
            checked={this.gateCheckBoxHandler(props.original, 112)}
          ></input>
        ),
      },
      {
        Header: "113",
        Cell: (props) => (
          <input
            type="radio"
            name="113"
            onChange={() => this.onchangehandler(props.original, 113)}
            checked={this.gateCheckBoxHandler(props.original, 113)}
          ></input>
        ),
      },
      {
        Header: "114",
        Cell: (props) => (
          <input
            type="radio"
            name="114"
            onChange={() => this.onchangehandler(props.original, 114)}
            checked={this.gateCheckBoxHandler(props.original, 114)}
          ></input>
        ),
      },
      {
        Header: "115",
        Cell: (props) => (
          <input
            type="radio"
            name="115"
            onChange={() => this.onchangehandler(props.original, 115)}
            checked={this.gateCheckBoxHandler(props.original, 115)}
          ></input>
        ),
      },
      {
        Header: "116",
        Cell: (props) => (
          <input
            type="radio"
            name="116"
            onChange={() => this.onchangehandler(props.original, 116)}
            checked={this.gateCheckBoxHandler(props.original, 116)}
          ></input>
        ),
      },
      {
        Header: "117",
        Cell: (props) => (
          <input
            type="radio"
            name="117"
            onChange={() => this.onchangehandler(props.original, 117)}
            checked={this.gateCheckBoxHandler(props.original, 117)}
          ></input>
        ),
      },
      {
        Header: "118",
        Cell: (props) => (
          <input
            type="radio"
            name="118"
            onChange={() => this.onchangehandler(props.original, 118)}
            checked={this.gateCheckBoxHandler(props.original, 118)}
          ></input>
        ),
      },
      {
        Header: "119",
        Cell: (props) => (
          <input
            type="radio"
            name="119"
            onChange={() => this.onchangehandler(props.original, 119)}
            checked={this.gateCheckBoxHandler(props.original, 119)}
          ></input>
        ),
      },
      {
        Header: "120",
        Cell: (props) => (
          <input
            type="radio"
            name="120"
            onChange={() => this.onchangehandler(props.original, 120)}
            checked={this.gateCheckBoxHandler(props.original, 120)}
          ></input>
        ),
      },
      {
        Header: "121",
        Cell: (props) => (
          <input
            type="radio"
            name="121"
            onChange={() => this.onchangehandler(props.original, 121)}
            checked={this.gateCheckBoxHandler(props.original, 121)}
          ></input>
        ),
      },
      {
        Header: "122",
        Cell: (props) => (
          <input
            type="radio"
            name="122"
            onChange={() => this.onchangehandler(props.original, 122)}
            checked={this.gateCheckBoxHandler(props.original, 122)}
          ></input>
        ),
      },
      {
        Header: "123",
        Cell: (props) => (
          <input
            type="radio"
            name="5"
            onChange={() => this.onchangehandler(props.original, 123)}
            checked={this.gateCheckBoxHandler(props.original, 123)}
          ></input>
        ),
      },
      {
        Header: "124",
        Cell: (props) => (
          <input
            type="radio"
            name="124"
            onChange={() => this.onchangehandler(props.original, 124)}
            checked={this.gateCheckBoxHandler(props.original, 124)}
          ></input>
        ),
      },
      {
        Header: "125",
        Cell: (props) => (
          <input
            type="radio"
            name="125"
            onChange={() => this.onchangehandler(props.original, 125)}
            checked={this.gateCheckBoxHandler(props.original, 125)}
          ></input>
        ),
      },
      {
        Header: "126",
        Cell: (props) => (
          <input
            type="radio"
            name="126"
            onChange={() => this.onchangehandler(props.original, 126)}
            checked={this.gateCheckBoxHandler(props.original, 126)}
          ></input>
        ),
      },
      {
        Header: "127",
        Cell: (props) => (
          <input
            type="radio"
            name="127"
            onChange={() => this.onchangehandler(props.original, 127)}
            checked={this.gateCheckBoxHandler(props.original, 127)}
          ></input>
        ),
      },
      {
        Header: "128",
        Cell: (props) => (
          <input
            type="radio"
            name="128"
            onChange={() => this.onchangehandler(props.original, 128)}
            checked={this.gateCheckBoxHandler(props.original, 128)}
          ></input>
        ),
      },
      {
        Header: "129",
        Cell: (props) => (
          <input
            type="radio"
            name="129"
            onChange={() => this.onchangehandler(props.original, 129)}
            checked={this.gateCheckBoxHandler(props.original, 129)}
          ></input>
        ),
      },
      {
        Header: "130",
        Cell: (props) => (
          <input
            type="radio"
            name="130"
            onChange={() => this.onchangehandler(props.original, 130)}
            checked={this.gateCheckBoxHandler(props.original, 130)}
          ></input>
        ),
      },
    ];
    return (
      <React.Fragment>
        {this.state.isEdit === true ? (
          <Logicalgateedit editCloseHandler={this.editCloseHandler} />
        ) : this.state.createNew === true ? (
          <Createnewlogicalgate closeHandler={this.closeHandler} />
        ) : (
          <div>
            <span>
              <u>
                <b>
                  <a>Home</a>
                </b>
              </u>
              &nbsp; 
              <u>
                <b>
                  <a style={{cursor:"pointer" }} onClick={this.backkHandler}>Logical Gate Search</a>
                </b>
              </u>
            </span>
            <br />
            <div>
              {LOGICAL_GATE === 2 ? (
                <div>
                  <FaFileSignature />
                  <span style={{cursor:"pointer" }} onClick={this.newCreateHandler}>
                    <u>New</u>
                  </span>
                  &nbsp;
                </div>
              ) : (
                ""
              )}
              {LOGICAL_GATE === 2 ? (
                <div>
                  <FaSave />
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={this.savehandler}
                  >
                    <u>Save</u>
                  </span>
                </div>
              ) : (
                ""
              )}
              <button
                onClick={this.refreshhhHandler}
                style={{
                  float: "right",
                  cursor: "pointer",
                  height: "30px",
                  width: "60px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                }}
              >
                Refresh
              </button>
              <button
                onClick={this.resethHandler}
                style={{
                  float: "right",
                  cursor: "pointer",
                  height: "30px",
                  width: "60px",
                  borderRadius: "5px",
                  fontWeight: "bold",
                  marginLeft: "5px",
                }}
              >
                Reset
              </button>
            </div>
            <br />{" "}
            <span
              style={{
                color: "green",
                fontWeight: "bold",
              }}
            >
              {gateerrormesg}
            </span>
            <br />
            <ReactTable
              className="-striped -highlight "
              data={
                this.state.data.length === 0
                  ? this.props.tableData
                  : this.state.data
              }
              columns={columns}
              defaultPageSize={10}
              showPaginationTop={true}
              filterable
              defaultFilterMethod={this.filterCaseInsensitive}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}
