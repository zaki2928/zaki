import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";

import {
  CancelData,
  remover,
  cancelid,
  cancelcriteria,
  CancelHandler,
} from "../../../../store/Store";
import {
  FaPrint,
  FaFileExport,
  FaTrashAlt,
  FaCalendarTimes,
} from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import axios from "axios";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { properties } from "../../../../Properties/Properties";
import { MISSION_CANCELLATION } from "../../../../store/RoleBased";

const SingleCancellation = properties.Port + properties.SingleCancellation;
const cancelMission = properties.Port + properties.cancelMission;
const getListOfMissionKLSView =
  properties.Port + properties.getListOfMissionKLSView;

class CancelList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      msg: "",
      errormsg: "",
      containerid: [],
      exceptionmsg: "",
    };
  }

  Validatehandler = (props) => {
    console.log("Mission id isssss", props);
    Swal.fire({
      title: "Confirmation",
      text: "You want to Cancel this!",
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
          .post(cancelMission, longIdVersionCoupleMission)
          .then((response) => {
            console.log(" data", response);
            if (response.status === 200) {
              this.refresHandler();
              console.log("response data 200 success");
              this.setState({
                msg: "Cancelled Sucessfully",
              });
              //this.componentDidMount();
              //this.lovehandler();
              //Swal.fire("Successfully validated Row " + props.idMission);
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

  refresHandler = () => {
    console.log("testttingggggggggggggggggggggggggggggg calling");
    axios
      .post(getListOfMissionKLSView, cancelcriteria, {
        params: {
          limit: cancelcriteria.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne successsssssssssssss", response.data);
          this.setState({
            data: response.data,
          });
          CancelHandler(response.data);
        } else {
          this.setState({
            data: [],
          });
          CancelHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // validateHandler=(props)=> {
  //   console.log("missionsId isssss",props.idMission)
  //   Swal.fire({
  //     title: "Validation",
  //     text: "You want to Cancel this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "gray",
  //     cancelButtonColor: "gray",
  //     confirmButtonText: "Yes",
  //     msg:"",
  //   }).then((result) => {
  //     if (result) {
  //       axios.post(SingleCancellation)
  //         .then((response) => {
  //           console.log(" data", response);
  //           if (response.status === 200 ) {
  //             console.log("response data 200 success");
  //             this.setState({
  //               msg:"Cancelled Sucessfully",

  //             })
  //             this.componentDidMount();
  //             Swal.fire( "Successfully Cancelled ");
  //           }
  //           else{
  //             this.setState({
  //               msg: "Invalid Mission ID"
  //             })
  //           }

  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });

  //     }
  //   });
  // }

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

  componentDidMount = () => {
    if (CancelData.length === 0) {
      console.log(CancelData.length);
      this.setState({
        data: this.props.data,
      });
    } else {
      this.setState({
        data: CancelData,
      });
    }
  };

  backHandler = () => {
    remover(cancelid);
    this.props.backHandler();
  };

  render() {
    const { msg } = this.state;
    const columns = [
      {
        Header: "Cancel",
       
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              {MISSION_CANCELLATION === 2 ? 
              <FcCancel
                style={{ cursor: "pointer" }}
                onClick={() => this.Validatehandler(props.original)}
              ></FcCancel>
              :''}
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
      // {
      //   Header: "Quantity",
      //   accessor: "modifiedby",        need to check as qty accessor isn't available
      // },

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
                <a style={{cursor:"pointer"}}onClick={this.backHandler}>
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
          {/* <input type="checkbox" id="myid"></input>
              {" "}
              <a >Select All </a>{" "} */}
          {/* <FaCalendarCheck
                
           
                >
                  
                </FaCalendarCheck>{" "}

<a  >Validate Selection</a> */}
          <FaPrint onClick={this.exportPDF}></FaPrint> <a style={{cursor:"pointer"}}>Print</a>{" "}
          <FaFileExport

          //   onClick={() => this.edithandler(props.original)}
          ></FaFileExport>{" "}
          <a style={{cursor:"pointer"}}>Export</a>
        </div>
        <ReactTable
          className="-striped -highlight "
          data={
            this.state.data.length === 0 ? this.props.data : this.state.data
          }
          columns={columns}
          defaultPageSize={5}
          showPaginationTop={false}
          filterable
        />
      </React.Fragment>
    );
  }
}

export default CancelList;
