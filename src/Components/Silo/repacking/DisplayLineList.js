import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
// import { Container, Row, Col, Button } from "reactstrap";
import { remover } from "../../../store/Store";
// import { FaPlay } from "react-icons/fa";
// import EditRepacking from "./EditRepacking";
import Swal from "sweetalert2";


import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,

} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaShare } from "react-icons/fa";
import { FaPrint, FaFileExport, FaDesktop } from 'react-icons/fa';
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
  RepackingEditHandler,
  Displaylistdata,
  RepackingDisplaylineHandler,
  DisplayEditRepackinglineHandler,
  displayeditrepacking,
  DisplayContainerListInRepacking,
  listOfContainerInRepacking,
} from "../../../store/Store";
import { IoIosRemoveCircleOutline, IoIosRefreshCircle } from "react-icons/io";
import DisplayListOfContainers from "../../Silo/repacking/DisplayListOfContainers";
import DisplayEditRepacking from "../../Silo/repacking/DisplayEditRepacking";
import axios from "axios";
import { properties } from "../../../Properties/Properties";
import { REPACKING } from "../../../store/RoleBased";
import Loader from "react-loader-spinner";

const closeRejectedRepackingLine = properties.Port + properties.closeRejectedRepackingLine
const sendRepackingToDCS = properties.Port + properties.sendRepackingToDCS
const getListOfRepackingLineView = properties.Port + properties.getListOfRepackingLineView


class DisplayLineList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isEdit: false,
      isDisplay: false,
      isDisplayContainer: false,
      isdisplaydata: [],
      idFolder: "",
      loading: false,
      errormsg:"",
    };
  }

  // componentDidMount = () => {
  //   console.log("desplay line list data", this.props.isdisplaydata);
  //   // if (Displaylistdata.length === 0) {
  //   //   // console.log("length is zero");
  //   //   // this.state.data.push(this.props.isdisplaydata);
  //   //   // console.log("after data pushed in table", this.state.data);
  //   // // } else {
  //   // //   console.log("length is not zero", Displaylistdata);
  //   //   this.setState({
  //   //     data: Displaylistdata,
  //   //   }
  //   //   // console.log("after data pushed in table", this.state.data);



  //   // }
  //   if (Displaylistdata !== 0) {
  //     this.setState(
  //       {
  //         data: Displaylistdata,
  //       },
  //       () => {
  //         console.log("data present after tab switch", this.state.data);
  //         this.setState({

  //           idFolder: Displaylistdata.idFolder,


  //         });
  //       }
  //     );
  //   }
  // };

  refreshHandler = () => {

    console.log("calling refresh", Displaylistdata[0].idFolder)
    const criteria = {
      listFilterBean: [
        {
          attribute: "idFolder",
          operation: "=",
          value: Displaylistdata[0].idFolder,
        },
      ],
    };
    axios
      .post(
        getListOfRepackingLineView, criteria, {
        params: {
          limit: 0,
        },
      }
      )

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,

          });

        } else {
          this.setState({

            data: [],
          });

        }
      })
      .catch((error) => {
        console.log(error);
      });
  }



  componentDidMount() {
    // console.log("calling displaylist line 89 ", Displaylistdata);
    // console.log("calling display data length", this.state.data.length);
    // console.log("display list data displayarr", this.props.displayarr);
    console.log("calling displaylist line 92 ", Displaylistdata);

    if (Displaylistdata !== null) {
      this.setState(
        {
          data: Displaylistdata,
        },
        () => {
          console.log("data present after tab switch", this.state.data);
          this.setState({

            idFolder: Displaylistdata[0].idFolder,


          });
        }
      );
    }
  }




  EditHandler = (props) => {
    console.log("Shahid edit handler calling");
    RepackingEditHandler(props);
    this.setState({
      isEdit: true,
    });
  };


  RejectLinehandler = (props) => {
    if (Displaylistdata.length !== 0) {
      console.log("Repacking Id isssss", props.idRepacking)
      Swal.fire({
        title: "Close Reject Line",
        text: "You  want to  Close Reject Line!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "gray",
        cancelButtonColor: "gray",
        confirmButtonText: "Yes",
        msg: "",
      }).then((result) => {
        console.log("result response valueww", result);
        if (result.value === true) {
          axios.post(closeRejectedRepackingLine + props.idRepacking)
            .then((response) => {
              console.log(" data", response);
              if (response.status === 200) {
                console.log("response data 200 success");
                this.setState({
                  msg: " Sucessfull",

                })
                this.componentDidMount();
                Swal.fire("Successfully closed Reject Line ");
              }
              else {
                this.setState({
                  msg: "Invalid Repacking ID"
                })
              }

            })
            .catch((error) => {

              console.log(error);
            })
        }
        else {

          Swal.fire("Cancelled ");
        }
      });
    }
    else {

      this.setState({ msg: "something went Wrong!" });
    }

  }



  SendToDcsHandler = (props) => {
    if (Displaylistdata.length !== 0) {
      this.setState({
        errormsg: "",
       });
      console.log("Repacking Id isssss", props.idRepacking)
      Swal.fire({
        title: "Send to DCS",
        text: "You  want to Send to DCS!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "gray",
        cancelButtonColor: "gray",
        confirmButtonText: "Yes",
        msg: "",
      }).then((result) => {
        console.log("result response valueww", result);
        if (result.value === true) {
          this.setState({
           loading: true,
          });
          axios.post(sendRepackingToDCS + props.idRepacking)
            .then((response) => {
              console.log(" data", response);
              if (response.status === 200) {
                console.log("response data 200 success");
                this.setState({
                  loading: false,
                  msg: " Sucessfull",

                })
                this.componentDidMount();
                Swal.fire("Successfully done ");
              }
              else {
                this.setState({
                  msg: "Invalid Repacking ID"
                })
              }

            })
            .catch((error) => {
              console.log(error);
              this.setState({
                loading: false,
                errormsg: error.response.data.message,
               });

            })
        }
        else {

          // Swal.fire("Cancelled ");
        }
      });
    }
    else {

      this.setState({ msg: "something went Wrong!" });
    }

  }


  // SendToDcsHandler() {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You want to Send this to DCS",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "gray",
  //     cancelButtonColor: "gray",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire("Send!", "Your file is successfully send to DCS.", "success");
  //     }
  //   });
  // }

  // RejectLinehandler() {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You want to Reject this line!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "gray",
  //     cancelButtonColor: "gray",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire("rejected!", "Your file has been Rejected.", "success");
  //     }
  //   });
  // }
  EditCloseHandler = () => {
    console.log("Shahid edit handler calling");

    this.setState({
      isEdit: false,
    });
  };
  DisplayLineHandler = (props) => {
    console.log(" displayedit handler calling");
    RepackingDisplaylineHandler(props);
    this.setState({
      isDisplay: true,
      isdisplaydata: props,
      isEdit: false,
    });
  };
  DisplayLineCloseHandler = () => {
    console.log(" edit handler calling");

    this.setState({
      isDisplay: false,
    });
  };

  DisplayListOfContainersCloseHandler=()=>{
    this.setState({
      isDisplayContainer: false,
    });
  }

  backhandler = () => {
    console.log("Display handler calling");
    remover("Display Line Data");
    this.props.DisplayCloseHandler();
  };



  displayHandler = (props) => {
    this.setState({
      isDisplay: true,
      isdisplaydata: props,
    })
    DisplayEditRepackinglineHandler(props)
  }

  displayContainerHandler = (props) => {
    this.setState({
      isDisplayContainer: true,
      //isdisplaydata: props,
    })
    DisplayContainerListInRepacking(props)
  }

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

    const { msg } = this.state
    const columns = [

      {
        Header: "Display",
        accessor: "display",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaDesktop onClick={() => this.displayHandler(props.original)}>
                Display
              </FaDesktop>
            </div>
          );
        },
      },
      {
        Header: "Display Containers",
        accessor: "display containers",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaDesktop onClick={() => this.displayContainerHandler(props.original)}>
                Display Containers
              </FaDesktop>
            </div>
          );
        },
      },

      {
        Header: "ID",
        accessor: "idRepackingLine",

      },

      {
        Header: "Company",
        accessor: "idCompany",
      },
      {
        Header: "FolderID",
        accessor: "idFolder",
      },
      {
        Header: "ID folderline",
        accessor: "idFolderLine",
      },
      {
        Header: "Reception type",
        Cell: (props) => {
          return (
            <text>
              {props.original.typeReception === 5 ? <span>Process order</span> : props.original.typeReception === 11 ? <span>Material to material</span> : null}
            </text>
          );
        },
      },
      {
        Header: "Treatment type",
        Cell: (props) => {
          return (
            <text>
              {props.original.typeTreatment === 100 ? <span>Process order</span> : props.original.typeTreatment === 200 ? <span>Manufacturing</span> : null}
            </text>
          );
        },
      },
      {
        Header: "Silo no L3",
        accessor: "siloNumberL3",
      },
      {
        Header: "Packing Line Id",
        accessor: "idPackingLine",
      }, {
        Header: "IMC",
        accessor: "idReferenceFrom",
      }, {
        Header: "Final Product",
        accessor: "idReferenceTo",
      }, {
        Header: "Product Unit",
        accessor: "commentary",
      },
      {
        Header: "Grade",
        accessor: "grade",
      }, {
        Header: "Qty child",
        accessor: "qtyProductChild",
      },
      {
        Header: "Batch",
        accessor: "batch",
      },

      {
        Header: "Qty to repack",
        accessor: "qtyToRepack",
      },
      {
        Header: "Number of pallets already done",
        accessor: "nbPalletToCreate",
      },
      {
        Header: "Qty repacked",
        accessor: "qtyRepacked",
      },
      {
        Header: "Status",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusRepackingLine === 1000 ? <span>Closed</span> : props.original.statusRepackingLine === 200 ? <span>In coherent</span> :
                props.original.statusRepackingLine === 100 ? <span>Created</span> : props.original.statusRepackingLine === 400 ? <span>In progress</span> :
                  props.original.statusRepackingLine === 1100 ? <span>Closed & Rejected</span> : null}
            </text>
          );
        },

      },
      {
        Header: "Final content status ID",
        accessor: "contentStatus",
      },

      {
        Header: "Rejection status",
        accessor: "rejectionStatus",
        Cell: (props) => {
          return (
            <text>
              {props.original.rejectionStatus === 0 ? (
                <span>OK</span>
              ) : props.original.rejectionStatus === 200 ? (
                <span>_INCOHERENCE_WITH_PRODUCT_IN_SILO_</span>
              ) : props.original.rejectionStatus === 100 ? (
                <span>PRODUCT_UNKNOWN</span>
              ) : props.original.rejectionStatus === 300 ? (
                <span>_BAD_RELATIONSHIP_</span>
              ) : props.original.rejectionStatus === 400 ? (
                <span>_PACKING_LINE_BUSY_</span>
              ) : props.original.rejectionStatus === 500 ? (
                <span>_SILO_UNKNOWN_</span>
              ) : props.original.rejectionStatus === 600 ? (
                <span>_TOO_MANY_CONTENTS_</span>
              ) : props.original.rejectionStatus === 700 ? (
                <span>_SILO_EMPTY_</span>
              ) : props.original.rejectionStatus === 800 ? (
                <span>_NEGATIVE_QTY_CHILD_</span>
              ) : props.original.rejectionStatus === 900 ? (
                <span>_PACKING_LINE_UNKNOWN_</span>
              ) : props.original.rejectionStatus === 1000 ? (
                <span>_TOO_MANY_CONTAINERS_</span>
              ) : props.original.rejectionStatus === 1100 ? (
                <span>_NOT_A_INTERMEDIATE_MATERIAL_CODE_</span>
              ) : props.original.rejectionStatus === 1200 ? (
                <span>_ANOTHER_PROCESS_IN_PROGRESS_ON_SILO_</span>
              ) : props.original.rejectionStatus === 1300 ? (
                <span>_NOT_VRAC_PRODUCT_</span>
              ) : props.original.rejectionStatus === 1400 ? (
                <span>_SAME_ORIGINAL_AND_FINAL_PRODUCT_</span>
              ) : props.original.rejectionStatus === 1500 ? (
                <span>_NO_CHILD_PRODUCT_</span>
              ) : props.original.rejectionStatus === 1600 ? (
                <span>_PACKING_LINE_MT_INCOHERENT_WITH_SILO_</span>
              ) : props.original.rejectionStatus === 1700 ? (
                <span>_PACKING_LINE_TYPE_INCOHERENT_WITH_FINAL_PRODUCT_</span>
              ) : props.original.rejectionStatus === 1800 ? (
                <span>_PRODUCT_NOT_AVAILABLE_</span>
              ) : null}
            </text>
          );
        },
      },

      {
        Header: "Start date",
        accessor:"startProductionDate",
      },

      {
        Header: "End date",
        accessor: "endProductionDate",
      },

      {
        Header: "Packaging",
        accessor: "idPackaging",
      },

      {
        Header: "Warehouse eligiblity",
        Cell: (props) => {
          return (
            <text>
              {props.original.idEligibilityWarehouse === 'WH' ? <span>Main Warehouse</span> : props.original.idEligibilityWarehouse === 'RT1' ? <span>Remote Terminal 1</span> : null}
            </text>
          );
        },
      },
      {
        Header: "Warehouse destination",
        Cell: (props) => {
          return (
            <text>
              {props.original.idDestinationWarehouse === 'WH' ? <span>Main Warehouse</span> : props.original.idDestinationWarehouse === 'RT1' ? <span>Remote Terminal 1</span> : null}
            </text>
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
        accessor: "musername",
      },

      {
        Header: "Version",
        accessor: "versionLock",
      },



      {
        Header: "Send to DCS",
        show: REPACKING === 2? true: false,
        accessor: "check",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              {props.original.statusRepackingLine === 100 || props.original.statusRepackingLine === 200 ? (
            <IoIosRefreshCircle
              style={{ height: "1.0em", width: "1.0em", cursor: "pointer" }}
              color="primary"
              onClick={() => this.SendToDcsHandler(props.original)}
            >
              retry
            </IoIosRefreshCircle>
             ) : (
              ""
            )}
          </div>
          );
        },
      },

      {
        Header: "Close reject Line",
        show:REPACKING ===2? true: false,
        accessor: "retry",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              {props.original.statusRepackingLine === 100 || props.original.statusRepackingLine === 200 ? (
            <IoIosRemoveCircleOutline
            style={{ height: "1.0em", width: "1.0em", cursor: "pointer" }}
              onClick={() => this.RejectLinehandler(props.original)}
            >
              Edit
            </IoIosRemoveCircleOutline>
            ) : (
              ""
            )}
          </div>

          );
        },
      },

    ];



    return (
      <React.Fragment>

      {this.state.loading ? (
            <div className="">
              <div className="row">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                  <div className="col spinner_item p-5">
                    <Loader
                      type="BallTriangle"
                      color="#00BFFF"
                      height={120}
                      width={100}
                      // visible={loading}
                    />
                  </div>
                </div>
                <div class="col-md-4"></div>
              </div>
            </div>
          ) : ( <div>

        {this.state.isDisplay === true || displayeditrepacking.length !== 0 ? (
          <DisplayEditRepacking DisplayLineCloseHandler={this.DisplayLineCloseHandler}
            isdisplaydata={this.state.isdisplaydata}
          />

        ) :( <div>

          {this.state.isDisplayContainer === true ? (
            <DisplayListOfContainers DisplayListOfContainersCloseHandler={this.DisplayListOfContainersCloseHandler}
              isdisplaydata={this.state.isdisplaydata}
            />
  
          ): (
          <div>
            <IoArrowBackCircleSharp onClick={this.backhandler} />
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
                  <a>Repackings search</a>
                </b>
              </u>{" "}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a onClick={this.backhandler}>Repackings</a>
                </b>
              </u>{" "}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a>Repacking Lines </a>
                </b>
              </u>{" "}
            </span>
            <br />
            <hr></hr>
            <div><b><span style={{
              color: this.state.msg === "atleast 1 row must be selected" ? "red" : "green"
            }}><h6>{msg}</h6></span></b>


              <FaPrint

                onClick={this.exportPDF}
              >

              </FaPrint >{" "}
              <a >Print</a>{" "}
              <FaFileExport


              >

              </FaFileExport>{" "}
              <a  >Export</a>{" "}

                <Button style={{float: 'right'}} onClick={this.refreshHandler}>Refresh</Button>



            </div>
            <hr></hr>
            <div>
              
              <span
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              {this.state.errormsg}
            </span>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  
                </Col>
                <Col>
                  {" "}
                  

                </Col>

                <Col>
                  {" "}
                  

                </Col>
                <Col>
                <Label>Folder ID</Label>{" "}
                  

                </Col>

                <Col><Input bsSize="sm" value={this.state.idFolder} /> </Col>
                <Col>

                </Col>
                <Col>
                  {" "}


                </Col>
                <Col>
                  {" "}

                </Col>
                {/* <Col> </Col> */}
              </Row>



            </div>
            <div

            >


              <br />
            </div>
            <hr></hr>
            <ReactTable
              className="-striped -highlight "
              data={
                this.state.data.length === 0
                  ? this.props.isdisplaydata
                  : this.state.data
              }
              columns={columns}
              defaultPageSize={1}
              showPaginationTop={false}
              filterable
              defaultFilterMethod={this.filterCaseInsensitive}
            />
          </div>)}
          </div>)}
          </div>)}
      </React.Fragment>

    );

  }
}

export default DisplayLineList;
