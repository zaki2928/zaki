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
  intertrailereditHandler,
  intertrailerdisplaydata,
  intertrailerdisplayHandler,
} from "../../../store/Store";
import { BsFillDisplayFill } from "react-icons/bs";
import {FaEdit} from "react-icons/fa";
import Trailerdisplayedit from "../../inter-warehouse/trailer/Trailerdisplayedit";
import {intertrailerdisplayeditdata,trailerdispalyeditHandler} from "../../../store/Store";

class InterwarehouseTrailerDisplay extends Component {
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
    if (intertrailerdisplaydata.length === 0) {
      console.log("length is zero");
      this.state.data.push(this.props.isdisplaydata);
      console.log("after data pushed in table", this.state.data);
    } else {
      console.log("length is not zero", intertrailerdisplaydata);
      this.setState({
        data: intertrailerdisplaydata,
      });
      console.log("after data pushed in table", this.state.data);
    }
  };
  EditHandler = (props) => {
    console.log("arqum edit handler calling");
    intertrailereditHandler(props);
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

  
  EditCloseHandler = () => {
    console.log("arqum edit handler calling");

    this.setState({
      isEdit: false,
    });
  };
  DisplayHandler = (props) => {
    console.log("arqum display handler calling");
    intertrailerdisplayHandler(props);
    this.setState({
      isDisplay: true,
      isdisplaydata: props,
      isEdit: false,
    });
  };


  DisplayEditHandler = (props) => {
    console.log("arqum display edit handler calling");
    trailerdispalyeditHandler(props);
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
    remover("InterwarehouseTrailerDisplay");
    this.props.DisplayCloseHandler();
  };




  render() {
    const columns = [
     
  
      {
        Header: "Container",
        accessor: "body",
      },
      {
        Header: "Status",
        accessor: "body",
      },

      {
        Header: "Tariler  ID",
        accessor: "body",
      },
      {
        Header: "Warehouse from",
        accessor: "body",
      },
      {
        Header: "Warehouse to",
        accessor: "modifiedby",
      },
      {
        Header: "To name",
        accessor: "isAvailable",
      },
      {
        Header: "Comment",
        accessor: "modifiedby",
      },

      {
        Header: "Location",
        
      },
      {
        Header: "Batch",
        accessor: "modifiedby",
      },

      {
        Header: "Modified the",
        
      },
      {
        Header: "Modified by",
        
      },
      {
        Header: "version",
        
      },
    ];
    return (
      <React.Fragment>

{ this.state.isDisplay === true || intertrailerdisplayeditdata.length !== 0 ? 
          <Trailerdisplayedit
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
              <a>WH trailers search</a>
            </b>
          </u>{" "}
          &#62;
          <u>
            {" "}
            <b>
              {" "}
              <a>WH Containers management</a>
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
          defaultPageSize={10}
          showPaginationTop={true}
          filterable
        />
        </div>
        }
      </React.Fragment>
    );
  }
}

export default InterwarehouseTrailerDisplay;
