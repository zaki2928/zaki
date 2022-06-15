import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import axios from "axios";
import { Container, Row, Col, Button, Label, Input } from "reactstrap";
import {
  MultiCancelData,
  MultiCancelHandler,
  missioncancelcriteria,
  remover,
  multicancelid,
} from "../../../../store/Store";
import {
  FaPrint,
  FaFileExport,
  FaTrashAlt,
  FaCalendarCheck,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { properties } from "../../../../Properties/Properties";
import { MISSION_MULTI_CANCELLATION } from "../../../../store/RoleBased";

const MultiCancellation = properties.Port + properties.MultiCancellation;
const cancelMission = properties.Port + properties.cancelMission;
const getListOfMissionKLSView =
  properties.Port + properties.getListOfMissionKLSView;

class MultiCancelList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      msg: "",
      listOfMissionId: [],
      listOfMissions: [],
      selected: {},
      selectAll: 0,
      longIdVersionCoupleMission: [],
    };
    this.selectAllHandler = this.selectAllHandler.bind(this);
    this.selectSingle = this.selectSingle.bind(this);
  }

  Validatehandler = () => {
    console.log("missionsId isssss", this.state.longIdVersionCoupleMission);
    Swal.fire({
      title: "Confirmation",
      text: "You want to Cancle these!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes",
      msg: "",
    }).then((result) => {
      if (result.value) {
        axios
          .post(cancelMission, this.state.longIdVersionCoupleMission)
          .then((response) => {
            console.log(" data", response);
            if (response.status === 200) {
              this.refresHandler();
              console.log("response data 200 success");
              this.setState({
                msg: "Cancelled Sucessfully",
              });
              // this.componentDidMount();
              // Swal.fire( "Successfully validated ");
            } else {
              this.setState({
                msg: "Invalid Mission ID",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  selectSingle(id) {
    console.log("selectSingle");
    console.log("this.stateselected", this.state.selected);
    const newSelected = Object.assign({}, this.state.selected);
    console.log("newSelected", newSelected);
    console.log("!this.state.selected[id]", !this.state.selected[id]);
    newSelected[id] = !this.state.selected[id];
    console.log("newSelected after setting", newSelected);
    const index = this.state.listOfMissionId.indexOf(id);
    if (index == -1) {
      this.state.listOfMissionId.push(id);
    } else if (index > -1) {
      this.state.listOfMissionId.splice(index, 1);
    }
    console.log("checkbox Array", this.state.listOfMissionId);
    this.setState({
      selected: newSelected,
      selectAll: 2,
    });
    console.log("this.state", this.state);
  }

  refresHandler = () => {
    console.log("testttingggggggggggggggggggggggggggggg calling");
    axios
      .post(getListOfMissionKLSView, missioncancelcriteria, {
        params: {
          limit: missioncancelcriteria.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne successsssssssssssss", response.data);
          this.setState({
            data: response.data,
          });
          MultiCancelHandler(response.data);
        } else {
          this.setState({
            data: [],
          });
          MultiCancelHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  selectAllHandler = (events) => {
    const array = [];
    if (events.target.checked === true) {
      for (let i = 0; i < this.state.data.length; i++) {
        const localData = {
          id: this.state.data[i].idMission,
          version: this.state.data[i].versionLock,
        };
        array.push(localData);
      }
      this.setState(
        {
          longIdVersionCoupleMission: array,
        },
        () =>
          console.log("selected data", this.state.longIdVersionCoupleMission)
      );
    } else {
      this.setState(
        {
          longIdVersionCoupleMission: [],
        },
        () =>
          console.log(
            "selected all data",
            this.state.longIdVersionCoupleMission
          )
      );
    }
  };

  componentDidMount = () => {
    if (MultiCancelData.length === 0) {
      console.log(MultiCancelData.length);
      this.setState({
        data: this.props.data,
      });
    } else {
      this.setState({
        data: MultiCancelData,
      });
    }
  };

  backHandler = () => {
    remover(multicancelid);
    this.props.backHandler();
  };
  render() {
    const { msg } = this.state;
    const columns = [
      // {
      //   headerClassName: 'header-clr',
      //   Header: props=>{
      //     return(
      //       <div>
      //       <span>Select </span><br></br>

      //       </div>
      //     );
      //   },
      //   maxWidth: 60,
      //   style: {
      //     textAlign: "center"
      //   },
      //   Cell: props => (

      //   <input
      //     type="checkbox"
      //     checked={this.state.selected[props.original.idMission] === true}
      //     onChange={() => this.selectSingle(props.original.idMission)}
      //   />
      //   ),
      //   filterable: false

      // },

      {
        Header: "ID",
        accessor: "idMission",
      },
      {
        Header: "Mission No",
        accessor: "numMission",
      },
      {
        Header: "Index",
        accessor: "missionIndex",
      },

      {
        Header: "Mode",

        Cell: (props) => {
          return (
            <text>
              {props.original.missionMode === 100 ? (
                <span>Manual</span>
              ) : props.original.missionMode === 200 ? (
                <span>Automatic</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Printable",

        Cell: (props) => {
          return (
            <text>
              {props.original.printable === 1 ? (
                <span>Yes</span>
              ) : props.original.missionMode === 0 ? (
                <span>No</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Movement type",

        Cell: (props) => {
          return (
            <text>
              {props.original.typeMvt === 2 ? (
                <span>Container Transfer</span>
              ) : props.original.typeMvt === 3 ? (
                <span>Quantity Picking</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Container origin",
        accessor: "idContainerStk",
      },
      {
        Header: "Origin Location",
        accessor: "idLocation",
        Cell: (props) => {
          return (
            <div>
              {props.original.idLocation != null
                ? props.original.idLocation.replace("19@", "")
                : ""}
            </div>
          );
        },
      },
      {
        Header: "Destination location",
        accessor: "idLocationStkDisplay",
        Cell: (props) => {
          return (
            <div>
              {props.original.idLocationStkDisplay != null
                ? props.original.idLocationStkDisplay.replace("19@", "")
                : ""}
            </div>
          );
        },
      },

      {
        Header: "Destination choice type",
        accessor: "typeDestinationChoice",
        Cell: (props) => {
          return (
            <text>
              {props.original.typeDestinationChoice === 2 ? (
                <span>Free</span>
              ) : props.original.typeDestinationChoice === 1 ? (
                <span>Imposed</span>
              ) : null}
            </text>
          );
        },
      },

      {
        Header: "Mission class",

        Cell: (props) => {
          return (
            <text>
              {props.original.missionClass === 1 ? (
                <span>_Order_</span>
              ) : props.original.missionClass === 2 ? (
                <span>_Preparation_</span>
              ) : props.original.missionClass === 3 ? (
                <span>Stock to Prepare</span>
              ) : props.original.missionClass === 4 ? (
                <span>_Replishment_</span>
              ) : props.original.missionClass === 5 ? (
                <span>Preparation</span>
              ) : props.original.missionClass === 6 ? (
                <span>_Internal Movement</span>
              ) : props.original.missionClass === 7 ? (
                <span>Box Replacement_</span>
              ) : props.original.missionClass === 8 ? (
                <span>_Goods In</span>
              ) : props.original.missionClass === 9 ? (
                <span>_Destruction_</span>
              ) : null}
            </text>
          );
        },
      },

      {
        Header: "Refrence class mission",
        accessor: "reference",
      },
      {
        Header: "Quantity",
        accessor: "modifiedby",
      },

      {
        Header: "Priority",
        accessor: "priority",
      },
      {
        Header: "User treat",
        accessor: "modifiedby",
      },
      {
        Header: "Status",

        Cell: (props) => {
          return (
            <text>
              {props.original.statusMission === 100 ? (
                <span>Created</span>
              ) : props.original.statusMission === 200 ? (
                <span>Executed</span>
              ) : props.original.statusMission === 300 ? (
                <span>Executable</span>
              ) : props.original.statusMission === 400 ? (
                <span>Cancelled</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Creation date",
        accessor: "creationDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.creationDate === undefined
                ? ""
                : props.original.creationDate === null
                ? ""
                : props.original.creationDate === ""
                ? ""
                : props.original.creationDate
                    .replace("T", " ")
                    .substring(0, props.original.creationDate.lastIndexOf("."))}
            </span>
          );
        },
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
        accessor: "mUsername",
      },

      {
        Header: "Version",
        accessor: "versionLock",
      },
    ];
    return (
      <React.Fragment>
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
                <a style={{cursor:"pointer"}} onClick={this.backHandler}>
                  Mission Cancellation Search
                </a>{" "}
              </b>
            </u>
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a style={{cursor:"pointer"}}>Mission Cancelling</a>
              </b>
            </u>
            <button
                onClick={this.refresHandler}
                style={{
                  float: "right",
                  cursor: "pointer",
                  height: "30px",
                  width: "60px",
                  borderRadius: "5px",
                }}
              >
                <text style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Refresh
                </text>
              </button>
          </span>
          <br />
        </div>
        <div>
          <b>
            <span
              style={{
                color: "green",
              }}
            >
              <h6>{msg}</h6>
            </span>
          </b>
        </div>
        <div style={{ marginTop: "5px" }} class="row-xs-6 bottom-row ">
          <input type="checkbox" onChange={this.selectAllHandler}></input>{" "}
          <a style={{cursor:"pointer"}}>Select All </a> <FaCalendarCheck></FaCalendarCheck>{" "}
          <a style={{cursor:"pointer"}}>Validate Selection</a>{" "}
          <FaPrint

          //   onClick={() => this.edithandler(props.original)}
          ></FaPrint>{" "}
          <a style={{cursor:"pointer"}}>Print</a>{" "}
          <FaFileExport

          //   onClick={() => this.edithandler(props.original)}
          ></FaFileExport>{" "}
          <a style={{cursor:"pointer"}}>Export</a>
        </div>
        <ReactTable
          className="-striped -highlight "
          data={
            this.state.data.length === 0 ? this.state.data : this.state.data
          }
          columns={columns}
          defaultPageSize={5}
          showPaginationTop={false}
          filterable
          getTrProps={(state, rowInfo, column) => {
            return {
              onClick: (e) => {
                console.log("selected idmission", rowInfo.original.idMission);
                console.log("selected version", rowInfo.original.versionLock);
                console.log(
                  "id and version",
                  this.state.longIdVersionCoupleMission
                );
                var a = this.state.longIdVersionCoupleMission.findIndex(
                  (data) => data.id === rowInfo.original.idMission
                );

                if (a == -1) {
                  const prepdata = {
                    id: rowInfo.original.idMission,
                    version: rowInfo.original.versionLock,
                  };
                  this.setState(
                    {
                      longIdVersionCoupleMission: [
                        ...this.state.longIdVersionCoupleMission,
                        prepdata,
                      ],
                    },
                    () => {
                      console.log(
                        "longIdVersionCoupleMission=>",
                        this.state.longIdVersionCoupleMission
                      );
                    }
                  );
                }

                var array = this.state.longIdVersionCoupleMission;

                if (a != -1) {
                  array.splice(a, 1);
                  console.log("after splice value-==>", array);
                  this.setState({ longIdVersionCoupleMission: array });
                }
              },
              style: {
                background:
                  rowInfo !== undefined
                    ? this.state.longIdVersionCoupleMission.findIndex(
                        (data) => data.id === rowInfo.original.idMission
                      ) != -1
                      ? "#C8C8C8"
                      : ""
                    : null,
              },
            };
          }}
        />

        <Row style={{ marginTop: "10px" }}>
          <Col>
          {MISSION_MULTI_CANCELLATION ===2 ? 
            <Button
              style={{ marginBottom: "10px" }}
              onClick={() => this.Validatehandler()}
            >
              {" "}
              Validate
            </Button>
            :''}
          </Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>

        {this.state.listOfMissionId != null ||
        this.state.listOfMissionId != undefined ? (
          <div style={{ textAlign: "center", color: "gray" }}>
            Total number of Selected Rows : {this.state.listOfMissionId.length}
          </div>
        ) : (
          <div style={{ textAlign: "center", color: "gray" }}>
            Total number of Selected Rows : 0
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default MultiCancelList;
