import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { FaTrashAlt, FaFileSignature, FaPrint, FaFileExport } from "react-icons/fa";
import { Container, Row, Col, Button } from "reactstrap";
import { IoIosSettings } from "react-icons/io";
import { MdRestore } from "react-icons/md";
import { MdPrint } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import {
  Packinglinedata, PackinglineEditHandler, PackinglinedataCriteria,
  PackinglineEditdata, remover,packinglineid
} from "../../../store/Store"
import { FaEdit } from 'react-icons/fa';
import PackingLineEdit from "./PackingLineEdit";
import axios from "axios";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
  IoSearch,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { properties } from "../../../Properties/Properties";

const GetListOfPackingLineView = properties.Port + properties.GetListOfPackingLineView;

class PackingLineList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      siloedit: false,
      siloeditnewdata: [],

    };
  }


  componentDidMount = () => {

    if (Packinglinedata.length !== 0) {

      this.setState({
        data: Packinglinedata

      })

    } else {

      this.setState({
        data: this.props.data

      })

    }

  }

  backHandler = () => {
    console.log("packingLine backhandler")
    remover(packinglineid)
    this.props.backHandler()

  }

  editHandler = (props) => {
    console.log("props", props)
    this.setState({
      siloedit: true,
      siloeditnewdata: props,
    })
    PackinglineEditHandler(props)


  }

  editClosehandler = () => {
    this.setState({
      siloedit: false,
    })
  }

  refreshHandler = () => {
    console.log("checking criteria vale ", PackinglinedataCriteria);

    axios
      .post(GetListOfPackingLineView, PackinglinedataCriteria, {
        params: {
          limit: PackinglinedataCriteria.limit,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log(
            "resposne successsssssssssssss=====>",
            response.data
          );

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
    const columns = [

      {
        Header: "Edit",

        // accessor: "Edit",
        filterable: false,
        Cell: (props) => {
          return (
            <FaEdit


              onClick={() => this.editHandler(props.original)}
            >
              Edit
            </FaEdit>
          );
        },

      },
      {
        Header: "ID",
        accessor: "idPackingLine",
      },
      {
        Header: "PackingLineL3",
        accessor: "packingLineL3",

      },
      {
        Header: "MaterialType",
        accessor: "materialType",
      },
      {
        Header: "PackingLineDCS",
        accessor: "packingLineDcs",
      },
      {
        Header: "Type",
        accessor: "typePackingLine",
        Cell: (props) => {
          return (
            <text>
              {
                props.original.typePackingLine === 100 ? <span>Pallet</span>
                  : props.original.typePackingLine === 200 ? <span>Big Bag</span>
                    : null
              }
            </text>

          )
        }
      },
      {
        Header: "Location",
        // accessor: "idLocationPackingLine",
        
          Cell: (props) => {
            return <div>{
              props.original.idLocationPackingLine != null
                  ? props.original.idLocationPackingLine.replace("19@", "")
                  : ""}</div>;
  
        }
      },
      {
        Header: "Version",
        accessor: "versionLock",
      },
      {
        Header: "ModifiedDate",
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
                    }
            </span>
          );
        },
      },

      {
        Header: "Modified By",
        accessor: "mUsername",
      },


    ];


    return (
      <React.Fragment>
        {this.state.siloedit === true || PackinglineEditdata.length !== 0 ? (
          <PackingLineEdit siloeditnewdata={this.state.siloeditnewdata} editClosehandler={this.editClosehandler} />) : (
          <div>
            <IoArrowBackCircleSharp onClick={this.backHandler} />
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
                  <a style={{cursor:"pointer" }} onClick={this.backHandler}>PackingLine search</a>
                </b>
              </u>
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor:"pointer" }} onClick={this.backHandler}>PackingLine Management</a>
                </b>
              </u>


            </span>
            <div style={{ marginTop: "10px", marginBottom: "5px" }} class="row-xs-6 bottom-row ">


              <FaPrint

              //   onClick={() => this.edithandler(props.original)}
              >

              </FaPrint>{" "}
              <a style={{cursor:"pointer" }}>Print</a>{" "}




              <FaFileExport

              //   onClick={() => this.edithandler(props.original)}
              >

              </FaFileExport>{" "}
              <a style={{cursor:"pointer" }}>Export</a>{" "}

              <button
                onClick={this.refreshHandler}
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

            </div>

            <div>
              <b>
                <span
                  style={{
                    color: "red",
                  }}
                >
                  <h6>{ }</h6>
                </span>
              </b>
            </div>


            <ReactTable
              className="-striped -highlight "
              //   data={this.state.data}
              data={this.state.data.length === 0
                ? this.props.data
                : this.state.data
              }

              columns={columns}
              defaultPageSize={5}
              //showPaginationTop= {true}
              filterable
              defaultFilterMethod={this.filterCaseInsensitive}
            />


          </div>)}
      </React.Fragment>
    );
  }
}

export default PackingLineList;