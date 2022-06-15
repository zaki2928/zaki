import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { Wavedata, SelectedWavedata } from "../../../store/Store";
import { FaDesktop, FaPlay, FaTrashAlt } from "react-icons/fa";
import Wave_Edit from "../wave/Wave_Edit";
import {
  waveEditHandler,
  WaveEditdata,
  wavedisplaydata,
  wavedisplayHandler,
  remover,
  waveshippingdata,
  waveShippingHandler,
  CreateWaveData,
  createWaveHandler,
  CreateWaveDataHandler,
} from "../../../store/Store";

import { FcSearch } from "react-icons/fc";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEdit, FaPrint, FaFileExport, FaFileSignature } from "react-icons/fa";
import WavePrepOdrFilter from "./WavePrepOdrFilter";

class Wavecreateandselecet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selecteddata: [],
      data: "",
      isEdit: false,
      newWave: false,
      isDisplay: false,
      isdisplaydata: [],
      isShipping: false,
      isShippingdata: [],
      isShow: false,
      isShippingActive: true,
    };
  }

  wavePrepFilter = () => {
    this.setState({
      isShow: true,
    });
  };

  wavePrepCloseFilter = () => {
    this.setState({
      isShow: false,
    });
  };

  closeHandler = () => {
    console.log("back handler from wave list---------");
    this.props.waveListback();
  };

  createWaveHandler = (props) => {
    CreateWaveDataHandler(props);
    this.setState({
      newWave: true,
    });
    this.state.isdisplaydata.push(props);
  };
  saveHandler() {
    Swal.fire({
      title: "Confirmation?",
      text: "Do u really want to delete wave details!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Done", "success");
      }
    });
  }

  backHandler = () => {
    console.log("calling back handler for list physical gate");
    remover("Wave");
    this.props.backHandler();
  };

  componentDidMount = () => {
    this.SelectedWaveDatamethod();
    console.log("com calling ftom list page==>", this.props.selecteddata);
    console.log(
      "com calling ftom list page==>SelectedWavedata",
      SelectedWavedata
    );
    console.log("com calling ftom list page props==>", this.props.data);
    if (Wavedata.length !== 0) {
      this.setState({
        data: Wavedata,
        selecteddata: SelectedWavedata,
      });
    } else {
      this.setState({
        data: this.props.data,
      });
    }
  };

  SelectedWaveDatamethod = () => {
    console.log("com calling ftom list page==>", SelectedWavedata);

    console.log("com calling ftom list page props==>", this.props.data);
    if (SelectedWavedata.length !== 0) {
      this.setState({
        data: SelectedWavedata,
      });
    } else {
      this.setState({
        data: this.props.data,
      });
    }
  };
  EditHandler = (props) => {
    console.log("Arqum edit handler calling");
    waveEditHandler(props);
    this.setState({
      isEdit: true,
    });
  };
  EditCloseHandler = (props) => {
    console.log("Arqum edit handler calling");

    this.setState({
      isEdit: false,
    });
  };
  DisplayHandler = (props) => {
    console.log("Arqum display handler calling");
    wavedisplayHandler(props);
    this.setState({
      isDisplay: true,
    });
    this.state.isdisplaydata.push(props);
  };

  waveshippingHandler = () => {
    console.log("Arqum Wave shippng handler calling");
    waveShippingHandler(Wavedata);
    this.setState({
      isShipping: true,
    });
    this.state.isShippingdata.push(Wavedata);
  };

  DisplayCloseHandler = () => {
    console.log("Arqum edit handler calling", wavedisplaydata.length);
    this.setState({
      isDisplay: false,
    });
  };

  WaveShippingCloseHandler = () => {
    console.log("Arqum edit handler calling", waveshippingdata.length);
    this.setState({
      isShipping: false,
    });
  };

  render() {
    const columns = [
      {
        Header: "Edit",

        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaEdit
                style={{ cursor: "pointer" }}
                onClick={() => this.EditHandler(props.original)}
              >
                edit
              </FaEdit>
            </div>
          );
        },
      },

      {
        Header: "Display Line",

        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaDesktop
                style={{ cursor: "pointer" }}
                onClick={() => this.DisplayHandler(props.original)}
              >
                display
              </FaDesktop>
            </div>
          );
        },
      },
      {
        Header: "Wave No",
        accessor: "idWave",
      },
      {
        Header: " Status",
        accessor: "statusWave",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusWave === 100 ? (
                <span>Created</span>
              ) : props.original.statusWave === 350 ? (
                <span>_Launchable_</span>
              ) : props.original.statusWave === 380 ? (
                <span>_Calculated_</span>
              ) : props.original.statusWave === 370 ? (
                <span>_Pre Calculated_</span>
              ) : props.original.statusWave === 400 ? (
                <span>Launched</span>
              ) : props.original.statusWave === 500 ? (
                <span>Prepared</span>
              ) : props.original.statusWave === 424 ? (
                <span>_InPreparation_</span>
              ) : props.original.statusWave === 4000 ? (
                <span>Cancelled</span>
              ) : props.original.statusWave === 355 ? (
                <span>_Error_</span>
              ) : null}
            </text>
          );
        },
      },

      {
        Header: "Shipping status",
        accessor: "statusShippingWave",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusShippingWave === -1 ? (
                <span>Created</span>
              ) : props.original.statusShippingWave === 1260 ? (
                <span>_At PLF_</span>
              ) : props.original.statusShippingWave === 1150 ? (
                <span>_Awaiting Shipment In Stock_</span>
              ) : props.original.statusShippingWave === 1190 ? (
                <span>Awaiting Shipment</span>
              ) : props.original.statusShippingWave === 1250 ? (
                <span>_Shipped to be confirmed_</span>
              ) : props.original.statusShippingWave === 2000 ? (
                <span>Shipped</span>
              ) : props.original.statusShippingWave === 4000 ? (
                <span>Cancelled</span>
              ) : props.original.statusShippingWave === 990 ? (
                <span>_Palletised_</span>
              ) : null}
            </text>
          );
        },
      },

      {
        Header: "Workflow status",
        accessor: "statusWaveWf",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusWaveWf === 100 ? (
                <span>_Without_</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Comment",
        accessor: "commentaryIc",
      },
      {
        Header: "No of Pos",
        accessor: "noOfPos",
      },
      {
        Header: "Number of unlaunced boxes",
        accessor: "nbUnlaunchedBoxes",
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
        Header: "Add lines",
        filterable: false,
        Cell: (props) => {
          return <b onClick={this.wavePrepFilter}>Add</b>;
        },
      },
    ];

    return (
      <React.Fragment>
        {this.state.isShow === true ? (
          <WavePrepOdrFilter wavePrepCloseFilter={this.wavePrepCloseFilter} />
        ) : (
          <div>
            <u>
              {" "}
              <b>
                <a>Home</a>
              </b>
            </u>
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
                <a onClick={this.closeHandler}>Wave edition</a>
              </b>
            </u>
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a style={{cursor:"pointer"}}>Wave list</a>
              </b>
            </u>
            <br />
            <FaFileSignature
              onClick={this.createWaveHandler}
            ></FaFileSignature>{" "}
            <span onClick={this.createWaveHandler}>New</span>{" "}
            <FaPrint></FaPrint> <a style={{cursor:"pointer"}}>Print</a> <FaPrint></FaPrint>{" "}
            <a style={{cursor:"pointer"}}>Configure list</a> <FaPrint></FaPrint> <a style={{cursor:"pointer"}}>Reset sort</a>{" "}
            <FaFileExport></FaFileExport> <a style={{cursor:"pointer"}}>Export</a> {/* </div> */}
            {/* <br></br> */}
            <ReactTable
              className="-striped -highlight "
              //   data={this.state.data.length === 0
              //     ? this.props.data : this.state.data
              //   }
              columns={columns}
              defaultPageSize={10}
              showPaginationTop={true}
              filterable
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Wavecreateandselecet;
