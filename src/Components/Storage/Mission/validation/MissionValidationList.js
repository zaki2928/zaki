import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

import { Container, Row, Col, Button } from "reactstrap";
// import { Repackingdata } from "../../../store/Store";
import { FaCalendarCheck, FaPlay, FaPrint, FaFileExport } from "react-icons/fa";
import { FcCheckmark } from "react-icons/fc";
import { MissionValidationdata, remover, MissionValidationHandler,MissionvalidationCriteria } from "../../../../store/Store";
import { FaCheckDouble } from "react-icons/fa";
import Swal from "sweetalert2";
import MissionValidation from "./MissionValidation";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { properties } from "../../../../Properties/Properties";
import { MISSION_VALIDATION } from "../../../../store/RoleBased";
const getMissionViewById = properties.Port + properties.getMissionViewById;
const validateMission = properties.Port + properties.validateMission;
const getListOfMissionKLSView =
  properties.Port + properties.getListOfMissionKLSView;


class MissionValidationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isEdit: false,
      isDisplay: false,
      isdisplaydata: [],
      msg: "",
      // listFilterBean:[]
    };
  }

  lovehandler = () => {
    console.log("referesh handler calling");
    this.criteriaFilterMethod();
  };

  criteriaFilterMethod = () => {
    console.log("testttingggggggggggggggggggggggggggggg calling");
    axios
      .post(getListOfMissionKLSView, MissionvalidationCriteria, {
        params: {
          limit: MissionvalidationCriteria.limit,
        },
      })
      
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne successsssssssssssss", response.data);
          this.setState({
            data: response.data,
            

          });
          MissionValidationHandler(response.data);
          
        } else {
          
          this.setState({
            data: [],

          });
          MissionValidationHandler(response.data);
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   console.log("testttingggggggggggggggggggggggggggggg calling");
  //   axios
  //   .post(getListOfMissionKLSView, criteria, {
  //     params: {
  //       limit: this.state.limit,
  //     },
  //   })
      
  //     .then((response) => {
  //       if (response.status === 200 && response.data.length !== 0) {
  //         console.log("resposne successsssssssssssss", response.data);
  //         this.setState({
  //           data: response.data,
            

  //         });
  //         MissionValidationHandler(response.data);
          
  //       } else {
          
  //         this.setState({
  //           data: [],

  //         });
  //         MissionValidationHandler(response.data);
          
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

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
        "Modified Date",
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

  backHandler = () => {
    remover("Validation");
    this.props.backHandler();
  };

  componentDidMount = () => {
    if (MissionValidationdata.length === 0) {
      this.setState({
        data: this.props.data,
      });
    } else {
      this.setState({
        data: MissionValidationdata,
      });
    }
  };



  // Validatehandler = (props) => {
  //   console.log("product id isssss", props.idMission)
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "gray",
  //     cancelButtonColor: "gray",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //     }
  //   });
  // };

  Validatehandler = (props) => {
    console.log("Mission id isssss", props);
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
        const longIdVersionCoupleMission = [
          {
            id: props.idMission,
            version: props.versionLock,
          },
        ];

        axios
          .post(validateMission, longIdVersionCoupleMission)
          .then((response) => {
            console.log(" data", response);
            if (response.status === 200) {
              console.log("response data 200 success");
              this.setState({
                msg: "Validated Sucessfully",
              });
              this.componentDidMount();
              this.lovehandler();
              Swal.fire("Successfully validated Row " + props.idMission);
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

  filterCaseInsensitive(filter, row) {
    const id = filter.pivotId || filter.id;
    if (row[id] !== null) {
      return (
        row[id] !== undefined ?
          String(row[id].toString().toLowerCase())
            .includes(filter.value.toString().toLowerCase())
          :
          true
      );
    }
  }

  render() {
    const { msg } = this.state;
    const columns = [
      {
        Header: "Validate",
          show: MISSION_VALIDATION ===2 ? true: false,
          
      filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FcCheckmark
                style={{ cursor: "pointer" }}
                onClick={() => this.Validatehandler(props.original)}
              ></FcCheckmark>
            </div>
          );
        },
      },
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
        accessor: " missionMode",

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
           {props.original.printable === 1 ? <span>_Yes_</span>  :
            
          props.original.printable === 0 ? <span>_No_</span> :null}
            
            </text>
          );
        },
      },
        // Cell: (props) => {
        //   return (
        //     <text>
        //       {props.original.printable === "1" ? (
        //         <span>_Yes_</span>
        //       ) : props.original.printable === "0" ? (
        //         <span>_No_</span>
        //       ) : null}
        //     </text>
        //   );
        // },
      
      {
        Header: "Movement type",
        accessor: " typeMvt",
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
          return <div>{
            props.original.idLocation != null
                ? props.original.idLocation.replace("19@", "")
                : ""}</div>;
        },
      },
      {
        Header: "Destination location",
        accessor: "idLocationStkDisplay",
        Cell: (props) => {
          return <div>{
            props.original.idLocationStkDisplay != null
                ? props.original.idLocationStkDisplay.replace("19@", "")
                : ""}</div>;
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
        Header: "Reference class mission",
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
                <a style={{cursor:"pointer"}}onClick={this.backHandler}>Missions validation Search</a>
              </b>
            </u>{" "}
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a style={{cursor:"pointer"}}>Mission validation</a>
              </b>
            </u>
          </span>
          <br />

          {/* <br /> */}
          <button
                onClick={this.lovehandler}
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
                  color: "green",
                }}
              >
                <h6>{msg}</h6>
              </span>
            </b>

          </div>
          <div class="row-xs-6 bottom-row ">
            <FaPrint onClick={this.exportPDF}></FaPrint> <a style={{cursor:"pointer"}}>Print</a>{" "}
            <FaFileExport></FaFileExport> <a style={{cursor:"pointer"}}>Export</a>{" "}
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
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MissionValidationList;
