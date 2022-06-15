import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import Physicalgateedit from "../physical-gate/Physicalgateedit";
import Createnewphysicalgate from "../physical-gate/Createnewphysicalgate";
import { FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaSave, FaFileSignature } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {
  physicalgateData,
  physicalgateCriteria,
  physicalgateDataHandler,
  physicalgateEditData,
  physicalgateEditDataHandler,
  remover,
  physicalgateid,
} from "../../../store/Store";
import { properties } from "../../../Properties/Properties";
import { PHYSICAL_GATE } from "../../../store/RoleBased";

const getListOfGateKl = properties.Port + properties.getListOfGateKl;
const deleteGateKl = properties.Port + properties.deleteGateKl;

export default class Physicalgatelist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data2: [],
      isNew: false,
      isEdit: false,
    };
  }

  componentDidMount = () => {
    console.log("gate data-----------", physicalgateData);
    if (physicalgateData.length !== 0) {
      this.setState({
        data: physicalgateData,
      });
    } else {
      this.setState({
        data: this.props.data,
      });
    }
  };

  physicalgateFilterMethod = () => {
    console.log("submitHandler calling");

    axios
      .post(getListOfGateKl, physicalgateCriteria, {
        params: {
          limit: physicalgateCriteria.limit,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
          });

          physicalgateDataHandler(response.data);
          this.componentDidMount();
        } else {
          this.setState({
            data: [],
          });
          physicalgateDataHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  refreshhhHandler = () => {
    console.log("refresh button pressed");
    this.refreshHandler();
  };

  refreshHandler = () => {
    axios
      .post(getListOfGateKl, physicalgateCriteria, {
        params: {
          limit: physicalgateCriteria.limit,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
          });
          physicalgateDataHandler(response.data);
        } else {
          this.setState({
            data: [],
          });
          physicalgateDataHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteHandler(props) {
    console.log("ID----------------", props.idGate);
    console.log("delete url", deleteGateKl);
    Swal.fire({
      title: "Confirmation",
      text: "Do you confirm the deletion?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "delete",
    }).then((result) => {
      console.log("swal result", result);
      if (result.value) {
        axios
          .delete(deleteGateKl + props.idGate)
          .then((response) => {
            console.log("mj data", response);
            if (response.status === 200) {
              console.log("response  success");
              this.refreshHandler();
            }
          })
          .catch((error) => {
            console.log(error);
          });

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  newCreateHandler = () => {
    console.log("new contact++++++++++++++++++++++++++++");
    // newCreateContactDataHandler()
    this.setState({
      isNew: true,
    });
  };

  backkHandler = () => {
    console.log("calling back handler for list");
    remover(physicalgateid);
    this.props.backHandler();
  };

  closeHandler = () => {
    this.setState({
      isNew: false,
    });
  };

  editHandler = (props) => {
    console.log("check props data", props);
    console.log("edit data from edit handlr", physicalgateEditData);
    this.setState({
      isEdit: true,
      data2: props,
    });

    physicalgateEditDataHandler(props);
  };

  editcloseHandler = () => {
    console.log("edit close from list page");
    this.setState({
      isEdit: false,
    });
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
    const columns = [
      {
        Header: "Edit",
        accessor: "Edit",
        filterable: false,
        Cell: (props) => {
          return (
            <FaEdit
              style={{ cursor: "pointer" }}
              onClick={() => this.editHandler(props.original)}
            >
              Edit
            </FaEdit>
          );
        },
      },
      {
        Header: "Delete",
        show: PHYSICAL_GATE === 2 ? true : false,
        accessor: "Delete",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaTrashAlt
                style={{ cursor: "pointer" }}
                onClick={() => this.deleteHandler(props.original)}
              >
                Delete
              </FaTrashAlt>
            </div>
          );
        },
      },
      {
        Header: "Id",
        accessor: "idGate",
      },
      {
        Header: "Version",
        accessor: "versionLock",
      },
      {
        Header: "Site",
        accessor: "idSite",
      },
      {
        Header: "Warehouse",
        accessor: "idWarehouse",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Available",
        accessor: "available",
        Cell: (props) => (
          <input
            type="checkbox"
            checked={props.original.available === 1 ? true : false}
          />
        ),
      },
      {
        Header: "Always Available",
        accessor: "alwaysAvailable",
        Cell: (props) => (
          <input
            type="checkbox"
            checked={props.original.alwaysAvailable === 1 ? true : false}
          />
        ),
      },
      {
        Header: "Physical",
        accessor: "physical",
        Cell: (props) => (
          <input
            type="checkbox"
            checked={props.original.physical === 1 ? true : false}
          />
        ),
      },
      {
        Header: "Default",
        accessor: "defaultGate",
        Cell: (props) => (
          <input
            type="checkbox"
            checked={props.original.defaultGate === 1 ? true : false}
          />
        ),
      },
      {
        Header: "Location",
        // accessor: "idLocation",
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
        Header: "Status",
        accessor: "statusGate",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusGate === 100 ? (
                <span>Free</span>
              ) : props.original.statusGate === 200 ? (
                <span>Reserved</span>
              ) : props.original.statusGate === 300 ? (
                <span>Busy</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Type",
        accessor: "typeGate",
        Cell: (props) => {
          return (
            <text>
              {props.original.typeGate === 100 ? (
                <span>Truck</span>
              ) : props.original.typeGate === 200 ? (
                <span>Container</span>
              ) : props.original.typeGate === 1000 ? (
                <span>Multi</span>
              ) : props.original.typeGate === -1 ? (
                <span>Not_Relevant</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Assignment",
        accessor: "typeAssignment",
        Cell: (props) => {
          return (
            <text>
              {props.original.typeAssignment === 100 ? (
                <span>Shipping</span>
              ) : props.original.typeAssignment === 200 ? (
                <span>GoodsIn</span>
              ) : props.original.typeAssignment === 300 ? (
                <span>Inter_Stock</span>
              ) : props.original.typeAssignment === 400 ? (
                <span>Inter_Warehouse</span>
              ) : props.original.typeAssignment === 100000 ? (
                <span>Shipping_Silo</span>
              ) : props.original.typeAssignment === 110000 ? (
                <span>Shipping_After_Storage</span>
              ) : // props.original.typeAssignment===700?<span>LOAD_COLLECTION</span>:
              // props.original.typeAssignment===710?<span>UNLOAD_COLLECTION</span>:
              // props.original.typeAssignment===800?<span>TRAILER</span>
              null}
            </text>
          );
        },
      },
      {
        Header: "Gate No",
        accessor: "gateNumber",
      },
      {
        Header: "Parent Gate",
        accessor: "parentGate",
      },
      {
        Header: "Barcode",
        accessor: "encode",
      },
      {
        Header: "Modified Date",
        accessor: "mDate",
        Cell: (props) => {
          return <span>{props.original.mDate.replace("T", " ")}</span>;
        },
      },
      {
        Header: "Modified By",
        accessor: "mUsername",
      },
    ];
    return (
      <React.Fragment>
        {this.state.isEdit === true || physicalgateEditData.length !== 0 ? (
          <Physicalgateedit
            editcloseHandler={this.editcloseHandler}
            data2={this.state.data2}
          />
        ) : this.state.isNew === true ? (
          <Createnewphysicalgate closeHandler={this.closeHandler} />
        ) : (
          <div>
            <span>
              <u>
                <b>
                  <a>Home</a>
                </b>
              </u>
              &#62;
              <u>
                <b>
                  <a style={{ cursor: "pointer" }} onClick={this.backkHandler}>
                    Physical Gate Search
                  </a>
                </b>
              </u>
              &#62;
              <u>
                <b>
                  <a style={{ cursor: "pointer" }}> Gates Management</a>
                </b>
              </u>
            </span>
            <br />
            <div>
              {PHYSICAL_GATE === 2 ? (
                <div>
                  <FaFileSignature />
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={this.newCreateHandler}
                  >
                    <u>New</u>
                  </span>
                  &nbsp;&nbsp;
                </div>
              ) : (
                ""
              )}
              {/* {PHYSICAL_GATE ===2 ?
              <div>
              <FaSave /><span><u style={{cursor:"pointer" }}>Save</u></span>
              </div>
              :''} */}
            </div>
            <button
              onClick={this.refreshhhHandler}
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
            <br />
            <br />
            <ReactTable
              className="-striped -highlight "
              data={
                this.state.data.length === 0 ? this.props.data : this.state.data
              }
              columns={columns}
              defaultPageSize={10}
              showPaginationTop={true}
              filterable
              defaultFilterMethod={this.filterCaseInsensitive}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}
