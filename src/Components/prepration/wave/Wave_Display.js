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

import {
  waveEditHandler,
  wavedisplaydata,
  wavedisplayHandler,
} from "../../../store/Store";
import { BsFillDisplayFill } from "react-icons/bs";
import {FaDesktop, FaEdit} from "react-icons/fa";
import Display_Edit from "../wave/Display_Edit";
import {displayeditdata,dispalyeditHandler} from "../../../store/Store";

class Wave_Display extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isEdit: false,
      isDisplay: false,
      isdisplaydata: [],
      isDisplayedit:false,
      isdisplayeditdata:[],
    };
  }

  componentDidMount = () => {
    console.log("desplay line list data", this.props.isdisplaydata);
    if (wavedisplaydata.length === 0) {
      console.log("length is zero");
      this.state.data.push(this.props.isdisplaydata);
      console.log("after data pushed in table", this.state.data);
    } else {
      console.log("length is not zero", wavedisplaydata);
      this.setState({
        data: wavedisplaydata,
      });
      console.log("after data pushed in table", this.state.data);
    }
  };
  EditHandler = (props) => {
    console.log("arqum edit handler calling");
    waveEditHandler(props);
    this.setState({
      isEdit: true,
    });
  };

  SendToDcsHandler() {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Send this to DCS",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Send!", "Your file is successfully send to DCS.", "success");
      }
    });
  }

  RejectLinehandler() {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to Reject this line!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("rejected!", "Your file has been Rejected.", "success");
      }
    });
  }
  EditCloseHandler = () => {
    console.log("arqum edit handler calling");

    this.setState({
      isEdit: false,
    });
  };
  DisplayHandler = (props) => {
    console.log("arqum display handler calling");
    wavedisplayHandler(props);
    this.setState({
      isDisplay: true,
      isdisplaydata: props,
      isEdit: false,
    });
  };


  DisplayEditHandler = (props) => {
    console.log("arqum display edit handler calling");
    dispalyeditHandler(props);
    this.setState({
      isDisplayedit: true,
      isdisplayeditdata: props,
      isEdit: false,
    });
  };

  DisplayCloseHandler = () => {
    console.log("arqum edit handler calling");

    this.setState({
      isDisplay: false,
    });
  };


  DisplayEditCloseHandler = () => {
    console.log("arqum display edit handler calling");

    this.setState({
      isDisplayedit: false,
    });
  };


  backhandler = () => {
    console.log("arqum handler calling");
    remover("Wave_Display");
    this.props.DisplayCloseHandler();
  };




  render() {
    const columns = [
      {
        Header: "Edit",
        Cell: (props) => {
          return (
            <div>
              <FaEdit
                style={{ cursor: "pointer" }}
                onClick={() => this.DisplayEditHandler(props.original)}
              >
                Delete
              </FaEdit>
            </div>
          );
        },
      }, 
      {
        Header: "ID",
        accessor: "idWaveDetail",
      },
      {
        Header: "Type",
        accessor: "typeDetail",
        Cell: (props) => {
          return (
            <text>
              {props.original.typeDetail === 1000 ? (
                <span>Preparation Order</span>
              ) : props.original.typeDetail === 2000 ? (
                <span>Container</span>
              ) : (
                ""
              )}
            </text>
          );
        },
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
        Header: "Wave no",
        accessor: "idWave",
      },
      {
        Header: " Status",
        accessor: "waveData.statusWave",
        Cell: (props) => {
          return (
            <text>
              {props.original.waveData.statusWave === 100 ? (
                <span>Created</span>
              ) : props.original.waveData.statusWave === 350 ? (
                <span>_Launchable_</span>
              ) : props.original.waveData.statusWave === 380 ? (
                <span>_Calculated_</span>
              ) : props.original.waveData.statusWave === 370 ? (
                <span>_Pre Calculated_</span>
              ) : props.original.waveData.statusWave === 400 ? (
                <span>Launched</span>
              ) : props.original.waveData.statusWave === 500 ? (
                <span>Prepared</span>
              ) : props.original.waveData.statusWave === 424 ? (
                <span>_InPreparation_</span>
              ) : props.original.waveData.statusWave === 4000 ? (
                <span>Cancelled</span>
              ) : props.original.waveData.statusWave === 355 ? (
                <span>_Error_</span>
              ) : null}
            </text>
          );
        },
      },

      {
        Header: "Workflow status",
        accessor: "waveData.statusWaveWf",
        Cell: (props) => {
          return (
            <text>
              {props.original.waveData.statusWaveWf === 0 ? (
                <span>_Without_</span>
              ) : props.original.waveData.statusWaveWf === 100 ? (
                <span>_Launching_</span>
              ) : (
                ""
              )}
            </text>
          );
        },
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
        accessor: "musername",
      },
      
    ];
    return (
      <React.Fragment>

{ this.state.isDisplay === true || displayeditdata.length !== 0 ? 
          <Display_Edit
            isdisplayeditdata={this.state.isdisplayeditdata}
            DisplayEditCloseHandler={this.DisplayEditCloseHandler}
          />:
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
              <a style={{cursor:"pointer"}}>Wave search</a>
            </b>
          </u>{" "}
          &#62;
          <u>
            {" "}
            <b>
              {" "}
              <a style = {{ cursor: "pointer" }} onClick={this.backhandler}>Wave list</a>
            </b>
          </u>{" "}
          &#62;
          <u>
            {" "}
            <b>
              {" "}
              <a style={{cursor:"pointer"}}>Wave details management </a>
            </b>
          </u>{" "}
        </span>
        <br />
        <ReactTable
          className="-striped -highlight "
          data={
            this.state.data.length === 0
              ? this.props.isdisplaydata
              : this.state.data
          }
          columns={columns}
          defaultPageSize={5}
          showPaginationTop={false}
          filterable
        />
        </div>
        }
      </React.Fragment>
    );
  }
}

export default Wave_Display;
