import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { FaEdit } from "react-icons/fa";
import { Container, Row, Col, Button, Label, Input } from "reactstrap";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaCog, FaSdCard } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import { FaRegListAlt, FaPrint, FaFileExport } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  Missionmultivalidata,
  multiMissionvalidationCriteria,
  remover,
  MissionmultivaliHandler,
} from "../../../../store/Store";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { properties } from "../../../../Properties/Properties";
import { MISSION_MULTI_VALIDATION, USERNAME } from "../../../../store/RoleBased";
const getListOfMissionKLSView =
  properties.Port + properties.getListOfMissionKLSView;

const validateMission = properties.Port + properties.validateMission;
export default class Missionmultivalilist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      longIdVersionCoupleMission: [],
      data: [],
      limit: "",
      msg: "",
      listOfMissionId: [],
      listOfMissions: [],
      selected: {},
      selectAll: 0,
      Beans: [],
      checkesItems: new Map(),
      errorMsg: "",
      mUsername:USERNAME,
    };

    this.selectAllHandler = this.selectAllHandler.bind(this);
    // this.selectSingle = this.selectSingle.bind(this);
  }
  selectAllValidations = (events) => {
    console.log("Selected all change ibzyyyyyyy =>", events.target.checked);
    console.log("Selected all change id mission here =>", this.state.data);
    const array = [];
    if (events.target.checked === true) {
      for (let i = 0; i < this.state.data.length; i++) {
        const localData = {
          id: this.state.data[i].idMission,
          version: this.state.data[i].versionLock,
          mUsername:USERNAME,
        };
        console.log("localData here =>", localData);
        array.push(localData);
      }
      this.setState(
        {
          longIdVersionCoupleMission: array,
        },
        () =>
          console.log(
            "selected all TRUE validation ibzyy after setting localdata=>",
            this.state.longIdVersionCoupleMission
          )
      );
    } else {
      this.setState(
        {
          longIdVersionCoupleMission: [],
        },
        () =>
          console.log(
            "selected all fALSE validation ibzyy=>",
            this.state.longIdVersionCoupleMission
          )
      );
    }
  };
  // selectSingle(id) {
  //   console.log("selectSingle");
  //   console.log("this.stateselected", this.state.selected);
  //   const newSelected = Object.assign({}, this.state.selected);
  //   console.log("newSelected", newSelected);
  //   console.log("!this.state.selected[id]", !this.state.selected[id]);
  //   newSelected[id] = !this.state.selected[id];
  //   console.log("newSelected after setting", newSelected);
  //   const index = this.state.listOfMissionId.indexOf(id);
  //   if (index == -1) {
  //     this.state.checkesItems.set(id, true);
  //     this.state.listOfMissionId.push(id);
  //   } else if (index > -1) {
  //     this.state.checkesItems.set(id, false);
  //     this.state.listOfMissionId.splice(index, 1);
  //   }
  //   console.log("checkbox Array", this.state.listOfMissionId);
  //   this.setState({
  //     selected: newSelected,
  //     selectAll: 2,
  //   });
  //   console.log("this.state", this.state);
  // }
  refreshhandler = () => {
    console.log("refresh handler calling");
    this.criteriaFilterMethod();
  };

  criteriaFilterMethod = () => {
    console.log("testttingggggggggggggggggggggggggggggg calling");
    axios
      .post(getListOfMissionKLSView, multiMissionvalidationCriteria, {
        params: {
          limit: multiMissionvalidationCriteria.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne successsssssssssssss", response.data);
          this.setState({
            data: response.data,
          });
          MissionmultivaliHandler(response.data);
          // remover("Mission Multi Validation")
        } else {
          this.setState({
            data: [],
          });
          MissionmultivaliHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  selectAllHandler() {
    console.log("selectAllHandler");
    console.log("this.reactTable", this.reactTable);
    let newSelected = {};
    let newListOfMissionId = [];

    if (this.state.selectAll === 0) {
      this.reactTable.forEach((x) => {
        newSelected[x.idMission] = true;
        const index = this.state.listOfMissionId.indexOf(x.idMission);
        //console.log("index", index)
        if (index == -1) {
          this.state.listOfMissionId.push(x.idMission);
        }
      });
      newListOfMissionId = this.state.listOfMissionId;
    }
    console.log("checkbox Array", newListOfMissionId);
    console.log("newSelected", newSelected);
    var result = Object.entries(newSelected);
    console.log("newSelected array", result);

    this.setState({
      selected: newSelected,
      listOfMissionId: newListOfMissionId,
      selectAll: this.state.selectAll === 0 ? 1 : 0,
    });
    console.log("this.state", this.state);
  }

  componentDidMount = () => {
    // console.log("componentDidMount mission data all data", this.state.data);
    // console.log("componentDidMount mission data all data***", this.props.data);
    // for (let i = 0; i < Missionmultivalidata.length; i++) {
    //   // const tempval= Missionmultivalidata[i].idMission

    //   // const mapss={
    //   //   [tempval]:false
    //   // }
    //   console.log("inside loop");
    //   this.state.checkesItems.set(Missionmultivalidata[i].idMission, false);
    // }
    // console.log("Checked data all", this.state.checkesItems);
    if (Missionmultivalidata.length === 0) {
      this.setState({
        data: this.props.data,
      });
    } else {
      this.setState({
        data: Missionmultivalidata,
      });
    }
  };

  componentWillMount = () => {
    console.log("component will mount ");
    console.log("will calling from lst page ", Missionmultivalidata);
    console.log("com calling from lst page---------------------------mmmmm ");
    if (Missionmultivalidata.length === 0) {
      this.setState({
        data: this.props.data,
      });
    } else {
      this.setState({
        data: Missionmultivalidata,
      });
    }
  };

  AllHandler = (event) => {
    console.log("calling AllHandler", event.target.checked);
    if (event.target.checked === true) {
      for (let i = 0; i < this.state.checkesItems.size; i++) {
        this.state.checkesItems.set(Missionmultivalidata[i].idMission, true);
        this.state.listOfMissionId.push(Missionmultivalidata[i].idMission);
      }
    }

    if (event.target.checked === false) {
      for (let i = 0; i < this.state.checkesItems.size; i++) {
        this.state.checkesItems.set(Missionmultivalidata[i].idMission, false);
      }
    }
  };

  backHandler = () => {
    console.log("calling back handler for list");

    remover("Multiple Validation");
    this.props.backHandler();
  };

  limitchangehandler = (event) => {
    if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
      this.setState({
        [event.target.name]: event.target.value,
      });
    } else {
    }
  };

  exportPDF = () => {
    console.log("export pdf callingn");
    const unit = "pt";
    const size = "A1"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 1100;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(13);

    const title = "SIMPANA";

    const headers = [
      [
        "ID",
        "Mission No",

        "Index",
        "Mode",
        "Printable",
        "Movement type",
        "Container origin",
        "Origin Location",
        "Destination location",
        "Mission class",
        "Refrence class mission",
        "Quantity",
        "Priority",
        "User treat",
        "Status",
        "Creation date",
        "Modified the",
        "Modified by",
        "Version",
      ],
    ];

    const data1 = this.state.data.map((elt) => [
      elt.idMission,
      elt.numMission,
      elt.missionIndex,
      elt.missionMode,
      elt.printable,
      elt.typeMvt,
      elt.idResaContainer,
      elt.idLocation,
      elt.idLocationStkDisplay,
      elt.missionClass,
      elt.reference,
      elt.modifiedby,
      elt.priority,
      elt.statusMission,
      elt.creationDate,
      elt.mDate,
      elt.mUsername,
      elt.versionLock,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data1,
      setFontSize: 2,
    };

    doc.text(title, marginLeft, 30);
    // doc.setFontSize(1);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  // Validatehandler = () => {
  //   if (this.state.listOfMissionId.length !== 0) {
  //     console.log("missionsId isssss", this.state.listOfMissionId);
  //     Swal.fire({
  //       title: "Validation",
  //       text: "You want to Validate these!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "gray",
  //       cancelButtonColor: "gray",
  //       confirmButtonText: "Yes",
  //       msg: "",
  //     }).then((result) => {
  //       console.log("result response valueww", result.value);
  //       if (result.value === true) {
  //         axios
  //           .post(validateMission + this.state.listOfMissionId)
  //           .then((response) => {
  //             console.log(" data", response);
  //             if (response.status === 200) {
  //               console.log("response data 200 success");
  //               this.setState({
  //                 msg: "Validated Sucessfully",
  //               });
  //               this.componentDidMount();
  //               Swal.fire("Successfully validated ");
  //             } else {
  //               this.setState({
  //                 msg: "Invalid Mission ID",
  //               });
  //             }
  //           })
  //           .catch((error) => {
  //             console.log(error);
  //           });
  //       } else {
  //         Swal.fire("not validated ");
  //       }
  //     });
  //   } else {
  //     this.setState({ msg: "atleast 1 row must be selected" });
  //   }
  // };

  Validatehandler = () => {
    if (this.state.longIdVersionCoupleMission.length !== 0) {
      this.setState({
        errorMsg: "",
      });

      console.log("Mission id isssss", this.state.longIdVersionCoupleMission);
      Swal.fire({
        title: "Validation",
        text: "You want to Validate this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "gray",
        cancelButtonColor: "gray",
        confirmButtonText: "Yes",
        msg: "",
      }).then((result) => {
        if (result.value) {
          const header = {
            'sessionUserId':USERNAME
          }
         
          axios
            .post(validateMission, this.state.longIdVersionCoupleMission, {headers:header})
            .then((response) => {
              console.log(" data", response);
              if (response.status === 200) {
                console.log("response data 200 success");
                this.setState({
                  msg: "Validated Sucessfully",
                });
                this.componentDidMount();
                this.refreshhandler();
                // this.criteriaFilterMethod();
                Swal.fire("Successfully validated");
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    } else {
      this.setState({
        errorMsg: "please select Atleast one row",
      });
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
    const { msg } = this.state;
    const { count } = this.state.listOfMissionId.length;
    const columns = [
      // {
      //   headerClassName: "header-clr",
      //   Header: (props) => {
      //     return (
      //       <div>
      //         <span>Select All </span>
      //         <br></br>
      //         <input type="checkbox" onChange={this.selectAllValidations}></input>
      //       </div>
      //     );
      //   },
      //   maxWidth: 60,
      //   style: {
      //     textAlign: "center",
      //   },
      //   Cell: (props) => (
      //     <input
      //       type="checkbox"
      //       // checked={this.state.selected[props.original.idMission] === true}
      //       checked={this.state.checkesItems.get(props.original.idMission)}
      //       onChange={() => this.selectSingle(props.original.idMission)}
      //     />
      //   ),
      //   filterable: false,
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
        accessor: "missionMode",
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
        accessor: "printable",
        Cell: (props) => {
          return (
            <text>
              {props.original.printable === 1 ? (
                <span>_Yes_</span>
              ) : props.original.printable === 0 ? (
                <span>_No_</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Movement type",
        accessor: "typeMvt",
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
        Header: "Mission class",
        accessor: "missionClass",
        Cell: (props) => {
          return (
            <text>
              {props.original.missionClass === 1 ? (
                <span>_Goods In_</span>
              ) : props.original.missionClass === 2 ? (
                <span>_Replishment_</span>
              ) : props.original.missionClass === 3 ? (
                <span>_Internal Movement_</span>
              ) : props.original.missionClass === 4 ? (
                <span>_Preparation_</span>
              ) : props.original.missionClass === 5 ? (
                <span>_Order_</span>
              ) : props.original.missionClass === 6 ? (
                <span>Stock to Prepare</span>
              ) : props.original.missionClass === 7 ? (
                <span>Manufacturing</span>
              ) : props.original.missionClass === 8 ? (
                <span>Destruction</span>
              ) : props.original.missionClass === 9 ? (
                <span>Interwarehouse movement</span>
              ) : props.original.missionClass === 10 ? (
                <span>Box replacement</span>
              ) : props.original.missionClass === 0 ? (
                <span>Not specified</span>
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
        accessor: "statusMission",

        Cell: (props) => {
          return (
            <text>
              {props.original.statusMission === 100 ? (
                <span>Created</span>
              ) : props.original.statusMission === 200 ? (
                <span>_Executable_</span>
              ) : props.original.statusMission === 300 ? (
                <span>Executed</span>
              ) : props.original.statusMission === 400 ? (
                <span>_Cancelled_</span>
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
        Header: "Version",
        accessor: "versionLock",
      },
    ];
    return (
      <React.Fragment>
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
                <a onClick={this.backHandler}>
                  {" "}
                  Mission Multi Validation Search{" "}
                </a>
              </b>
            </u>
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a> Mission Multi Validation List</a>
              </b>
            </u>
            {""}
          </span>
          <br />
          <button
            onClick={this.refreshhandler}
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
          <div>
            <b>
              <span
                style={{
                  color:
                    this.state.msg === "atleast 1 row must be selected"
                      ? "red"
                      : "green",
                }}
              >
                <h6>{msg}</h6>
              </span>
            </b>
            <input type="checkbox" onChange={this.selectAllValidations}></input>{" "}
            <a>Select All </a> <FaPrint onClick={this.exportPDF}></FaPrint>{" "}
            <a>Print</a> <FaFileExport></FaFileExport> <a>Export</a>{" "}
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
            defaultFilterMethod={this.filterCaseInsensitive}
            getTrProps={(state, rowInfo, column) => {
              return {
                onClick: (e) => {
                  console.log(
                    "selected==> idmission",
                    rowInfo.original.idMission
                  );
                  console.log(
                    "selected==> virsion",
                    rowInfo.original.versionLock
                  );
                  console.log(
                    "id and veriosn",
                    this.state.longIdVersionCoupleMission
                  );
                  var a = this.state.longIdVersionCoupleMission.findIndex(
                    (data) => data.id === rowInfo.original.idMission
                  );
                  console.log("valueeee of a----->", a);

                  if (a == -1) {
                    const prepdata = {
                      id: rowInfo.original.idMission,
                      version: rowInfo.original.versionLock,
                      mUsername:USERNAME,
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
              {MISSION_MULTI_VALIDATION === 2 ? (
                <Button
                  style={{ marginBottom: "10px" }}
                  onClick={() => this.Validatehandler()}
                >
                  {" "}
                  Validate
                </Button>
              ) : (
                ""
              )}
              &nbsp; &nbsp;
              {this.state.longIdVersionCoupleMission.length === 0 ? (
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {this.state.errorMsg}
                </span>
              ) : (
                ""
              )}
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}
