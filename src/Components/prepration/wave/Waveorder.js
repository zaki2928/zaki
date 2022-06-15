import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Label, Input, Button } from "reactstrap";
import {
  Wavedata,
  SelectedWavedata,
  remover,
  OrderprepData,
  WaveAddlinesdata,
  PreparationOrderprepCriteria,
  OrderdetailsHandler,
  OrderdetailsData,
} from "../../../store/Store";
import classnames from "classnames";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { FaDesktop, FaPlay, FaTrashAlt } from "react-icons/fa";
import { BsFillDisplayFill } from "react-icons/bs";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { TiArrowBack } from "react-icons/ti";
import { IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { FcSearch } from "react-icons/fc";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaPrint, FaFileExport, FaFileSignature } from "react-icons/fa";
import axios from "axios";
import { properties } from "../../../Properties/Properties";

const AddLineServiceMethod = properties.Port + properties.AddLineServiceMethod;
const removeWaveAddedline = properties.Port + properties.RemoveAddedPOLine;
const getListOfWaveDetailsByWaveId =
  properties.Port + properties.getListOfWaveDetailsByWaveId;
const getListOfPreparationOrders =
  properties.Port + properties.getListOfPreparationOrders;

class Waveorder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      // idWave:"",
      data2: [],
      WaveAddlinesdata: [],
      activeTab: "1",
      OrderprepData: [],
      idWave: "",
      listOfPO: [],
      idWaveDetail: "",
      mDate: "",
      musername: "",
      versionLock: "",
      idCompany: "",
      reference: "",
      idReference: "",
      typeDetail: "",
      orderList1: false,
      idPrepOrder: [],
    };
  }

  toggle(tab) {
    if (this.state.activeTab != tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  addServiceLineMethod = (props) => {
    console.log("inside addServiceLineMethod", props);
    // this.state.listOfPO.push(props.idPrepOrder)
    const data = {
      idPrepOrder: [props.idPrepOrder],
      idWave: this.state.idWave,
    };
    axios
      .post(AddLineServiceMethod, data)
      .then((response) => {
        if (response.status === 200) {
          console.log(
            "resposne success ______________________________",
            response.data
          );
          this.refreshHandler();
          this.getWaveDetailMethod(data.idWave);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // saveHandler() {
  //     Swal.fire({
  //         title: 'Confirmation?',
  //         text: "Do u really want to delete wave details!",
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: 'gray',
  //         cancelButtonColor: 'gray',
  //         confirmButtonText: 'Yes, do it!'
  //     }).then((result) => {
  //         if (result.isConfirmed) {
  //             Swal.fire(

  //                 'Done',
  //                 'success'
  //             )
  //         }
  //     })
  // }

  backtoWaveListHandler = () => {
    console.log("calling back handler for list physical gate");
    // remover("Wave")
    remover("WaveAddlinesdata");
    this.props.backHandler();
  };

  deleteHandler(props) {
    console.log("ID wave----------------", props.idWave);
    console.log("Prep order----------------", props.reference);
    const dataWD = {
      idPrepOrder: [props.reference],
      idWave: props.idWave,
    };
    Swal.fire({
      title: "Confirmation",
      text: "Do you confirm the deletion?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Delete",
    }).then((result) => {
      console.log("swal result", result);
      if (result.value) {
        axios
          .post(removeWaveAddedline, dataWD)
          .then((response) => {
            console.log("my data", response);
            if (response.status === 200) {
              console.log("response  success");
              this.refreshHandler();
              this.getWaveDetailMethod(props.idWave);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  }

  getWaveDetailMethod = (idWave) => {
    console.log("uzzzzzzmmmmmaaaaaa=========>", this.state.idWave);
    axios
      .post(getListOfWaveDetailsByWaveId + idWave)
      .then((response) => {
        console.log("uzzzzzzmmmmmaaaaaa=========> wave detail");
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success ______ selected data", response.data);
          this.setState({
            data2: response.data,
            orderList1: true,
          });
        } else {
          this.setState({
            orderList1: true,
            data2: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    console.log("calling for addliness datatatatatattatt", WaveAddlinesdata);

    this.setState({
      idWave: WaveAddlinesdata.idWave,
    });
    console.log("calling uzmiiiiii", WaveAddlinesdata.idWave);
    this.getWaveDetailMethod(WaveAddlinesdata.idWave);
    console.log("com calling ftom list OrderData==>", OrderprepData);
    console.log(
      "com calling ftom list page this.props.data==>",
      this.props.data
    );

    if (OrderprepData.length !== 0) {
      this.setState({
        data: OrderprepData,
      });
    } else {
      this.setState({
        data: this.props.data,
      });
    }
    console.log("chkekdgjkdfhjhgjkdhfghvjndfkjng", this.state.listOfPO);
  };

  refreshHandler = () => {
    axios
      .post(getListOfPreparationOrders, PreparationOrderprepCriteria, {
        params: {
          limit: PreparationOrderprepCriteria.limit,
        },
      })
      .then((response) => {
        console.log("uzmiiiiiiiiiiiiiiiiiiii", response.data);
        if (response.status === 200 && response.data.length !== 0) {
          this.setState({
            data: response.data,
          });
        } else {
          this.setState({
            data: [],
          });
        }
      });
  };

  render() {
    const columns = [
      //   {
      //     Header: "Edit",

      //     filterable: false,
      //     Cell: (props) => {
      //       return (
      //         <div>
      //           <FaEdit
      //             style={{ cursor: "pointer" }}
      //             onClick={() => this.EditHandler(props.original)}
      //           >
      //             Delete
      //           </FaEdit>
      //         </div>
      //       );
      //     },
      //   },

      {
        Header: "Technical ID",
        accessor: "idPo",
      },
      {
        Header: "ID",
        accessor: "idPrepOrder",
      },
      //   {
      //     Header: " Status",
      //     accessor: "statusWave",
      //     Cell: (props) => {
      //       return (
      //         <text>
      //        {props.original.statusWave === 100 ? <span>Created</span> : props.original.statusWave === 350 ?<span>_Launchable_</span> :
      //       props.original.statusWave === 380 ? <span>_Calculated_</span>:props.original.statusWave === 370 ? <span>_Pre Calculated_</span> :
      //       props.original.statusWave === 400 ? <span>Launched</span>:props.original.statusWave === 500 ? <span>Prepared</span> :
      //       props.original.statusWave === 424 ? <span>_InPreparation_</span>: props.original.statusWave === 4000 ? <span>Cancelled</span>:props.original.statusWave === 355 ? <span>_Error_</span> :null}

      //         </text>
      //       );
      //     },

      //   },

      {
        Header: "Company",
        accessor: "idCompany",
      },
      {
        Header: "Client no",
        accessor: "client",
      },
      {
        Header: "Prepration order type",
        accessor: "typePo",
        Cell: (props) => {
          return (
            <text>
              {props.original.typePo === 100 ? <span>_Standard_</span> : null}
            </text>
          );
        },
      },
      {
        Header: "Stuffing type",
        accessor: "typePoStuffing",
        Cell: (props) => {
          return (
            <text>
              {props.original.typePoStuffing === 100 ? (
                <span>_Stuffing Affiliation_</span>
              ) : props.original.typePoStuffing === 0 ? (
                <span>_Non Plf_</span>
              ) : props.original.typePoStuffing === 200 ? (
                <span>_stuffing at Plf_</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Urgency",
        accessor: "urgency",
      },
      {
        Header: "Postcode",
        accessor: "post",
      },
      {
        Header: "Desired delivery date",
        accessor: "desiredDeliveryDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.deriredDeliveryDate === undefined
                ? ""
                : props.original.deriredDeliveryDate === null
                ? ""
                : props.original.deriredDeliveryDate === ""
                ? ""
                : props.original.deriredDeliveryDate
                    .replace("T", " ")
                    .substring(
                      0,
                      props.original.deriredDeliveryDate.lastIndexOf(".")
                    )}
            </span>
          );
        },
      },
      {
        Header: "Desired prepration date",
        accessor: "dsiredPreparationDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.dsiredPreparationDate === undefined
                ? ""
                : props.original.dsiredPreparationDate === null
                ? ""
                : props.original.dsiredPreparationDate === ""
                ? ""
                : props.original.dsiredPreparationDate
                    .replace("T", " ")
                    .substring(
                      0,
                      props.original.dsiredPreparationDate.lastIndexOf(".")
                    )}
            </span>
          );
        },
      },
      {
        Header: "Add",
        Cell: (props) => {
          return (
            <button onClick={() => this.addServiceLineMethod(props.original)}>
              ADD
            </button>
          );
        },
      },
      {
        Header: "Version",
        accessor: "versionLock",
      },
      {
        Header: "Modified the",
        accessor: "mUserName",
      },
      {
        Header: "Modified Date",
        accessor: "mDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.mDate === undefined
                ? ""
                : props.original.mDate === null
                ? ""
                : props.original.mDate === ""
                ? ""
                : props.original.mDate
                    .replace("T", " ")
                    .substring(0, props.original.mDate.lastIndexOf("."))}
            </span>
          );
        },
      },
      
      {
        Header: "Prepration type",
        accessor: "pep",
      },
      {
        Header: "Gate trailer typeeee",
        accessor: "gate",
      },
      {
        Header: "Link",
        accessor: "plfLink",
      },
    ];

    const columnWaveDetails = [
      {
        Header: "ID",
        accessor: "idWaveDetail",
      },
      {
        Header: "Company",
        accessor: "idCompany",
      },
      {
        Header: "Reference",
        accessor: "reference",
      },
      {
        Header: "Reference ID",
        accessor: "idReference",
      },
      {
        Header: "Wave No",
        accessor: "idWave",
      },
      {
        Header: "Status",
        accessor: "statusPo",
      },
      {
        Header: "Version",
        accessor: "versionLock",
      },
      {
        Header: "Modified Date",
        accessor: "mDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.mDate === undefined
                ? ""
                : props.original.mDate === null
                ? ""
                : props.original.mDate === ""
                ? ""
                : props.original.mDate
                    .replace("T", " ")
                    .substring(0, props.original.mDate.lastIndexOf("."))}
            </span>
          );
        },
      },
      {
        Header: "Modified by",
        accessor: "mUserName",
      },
      {
        Header: "Delete",
        maxWidth: 50,
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaTrashAlt
                size={17}
                style={{ cursor: "pointer" }}
                onClick={() => this.deleteHandler(props.original)}
              />
            </div>
          );
        },
      },
    ];

    return (
      <React.Fragment>
        {/* {
        
         this.state.isShipping === true || waveshippingdata.length !== 0 ? (
          <WaveListShipping
            isShippingdata={this.state.isShippingdata}
            WaveShippingCloseHandler={this.WaveShippingCloseHandler}
          />
        )
        
        
        : ( */}

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
                <a onClick={this.backHandler}>Wave list</a>
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
                  //   marginLeft:"620px",marginRight:"620px"
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
            <span
              style={{
                color: "skyblue",
              }}
            >
              <TiArrowBack />
              <u>
                <b onClick={this.backtoWaveListHandler}>Back</b>
              </u>
            </span>
            <span style={{ marginLeft: "8px", color: "skyblue" }}>
              <IoIosSkipForward />
              <u>
                <b>Show /Hide Criteria</b>
              </u>
            </span>
            <span
              style={{
                color: "skyblue",
                marginLeft: "8px",
              }}
            >
              <u>
                <b>Automatic Hide And Display</b>
              </u>
            </span>
          </Row>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "1",
                })}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                Wave Order
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({
                  active: this.state.activeTab === "2",
                })}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Wave Details
              </NavLink>
            </NavItem>
          </Nav>

          <div
            style={{ marginTop: "10px", marginBottom: "5px" }}
            class="row-xs-6 bottom-row "
          ></div>
          <br></br>

          {/* <ReactTable
            className="-striped -highlight "
            //   data={this.state.data.length === 0
            //     ? this.props.data : this.state.data
            //   }
            columns={columns}
            defaultPageSize={10}
            showPaginationTop={true}
            filterable
          /> */}
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <ReactTable
                className="-striped -highlight "
                data={this.state.data}
                columns={columns}
                defaultPageSize={10}
                showPaginationTop={true}
                filterable
              />
            </TabPane>

            <TabPane tabId="2">
              <ReactTable
                className="-striped -highlight "
                data={this.state.data2}
                columns={columnWaveDetails}
                defaultPageSize={10}
                showPaginationTop={true}
                filterable
              />
            </TabPane>
          </TabContent>
        </div>
        {/* )} */}
      </React.Fragment>
    );
  }
}

export default Waveorder;
