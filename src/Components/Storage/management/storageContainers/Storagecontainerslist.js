import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import {
  StoragecontainerData,
  Storagfiltercriteria,
  remover,
  SetStorageEditData,
  StoragecontainerEditdata,
  StoragecontainerDataHandler,
} from "../../../../store/Store";
import { FaPrint, FaFileExport, FaCalendarCheck, FaEdit } from "react-icons/fa";
import { Label, Input } from "reactstrap";
import Swal from "sweetalert2";
import Storagecontainersedit from "./Storagecontainersedit";
import axios from "axios";
import { properties } from "../../../../Properties/Properties";

const getKLContainerbyFilterCriteria = properties.Port + properties.getKLContainerbyFilterCriteria
class Storagecontainerslist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isEdit: false,
    };
  }

  validateHandler() {
    Swal.fire({
      title: "Confirmation",
      text: "Do you confirm the modification?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  componentDidMount = () => {
    console.log("shahidddddddddddd", StoragecontainerData);
    if (StoragecontainerData.length !== 0) {
      console.log(StoragecontainerData.length);
      this.setState({
        data: StoragecontainerData,
      });
    } else {
      this.setState({
        data: this.props.data,
      });
    }
  };

  backkHandler = () => {
    remover("Containers");
    this.props.backHandler();
  };

  editcloseHandler = () => {
    this.setState({
      isEdit: false,
    });
    remover("StoragecontainerEditdata");
  };

  editHandler = (props) => {
    this.setState({
      isEdit: true,
    });
    SetStorageEditData(props);
  };

  refreshandler = () => {
    console.log("calling refresh Handler", Storagfiltercriteria);
    axios
      .post(
        getKLContainerbyFilterCriteria,
        Storagfiltercriteria,
        {
          params: {
            limit: Storagfiltercriteria.limit,
          },
        }
      )

      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success shahiddddddd-->", response.data);

          StoragecontainerDataHandler(response.data);
          this.setState({
            data: response.data,
          });
        } else {
          console.log("else part");
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
        filterable: false,
        Cell: (props) => {
          return (
            <FaEdit style={{cursor:"pointer"}}onClick={() => this.editHandler(props.original)}>
              Edit
            </FaEdit>
          );
        },
      },
      {
        Header: "Stock container no",
        accessor: "id_container",
      },
      {
        Header: "Warehouse",
        accessor: "id_warehouse",
      },
      {
        Header: "Container no",
        accessor: "id_container",
      },
      {
        Header: "Status",
        accessor: "status_container",
        Cell: (props) => {
          return (
            <span>
               {props.original.status_container === 100 ? <font>Created</font> : ""}
              {props.original.status_container === 500 ? <font>Validated</font> : ""}
              
            </span>
          );
        },
      },
      {
        Header: "Type",
        accessor: "type_container",
        Cell: (props) => {
          return (
            <span>
              {props.original.type_container === 100 ? (
                <font>_Pallet_</font>
              ) : props.original.type_container === 200 ? (
                <font>_Product_</font>
              ) : props.original.type_container === 400 ? (
                <font>_Shipping pallet_</font>
              ) : props.original.type_container === 800 ? (
                <font>_Trailer_</font>
              ) : props.original.type_container === 500 ? (
                <font>_Box_</font>
              ) : props.original.type_container === 510 ? (
                <font>_Box shipping_</font>
              ) : props.original.type_container === 600 ? (
                <font>_Location_</font>
              ) : props.original.type_container === 700 ? (
                <font>_Load collection_</font>
              ) : props.original.type_container === 710 ? (
                <font>_Unload collection_</font>
              ) : (
                ""
              )}
            </span>
          );
        },
      },
      {
        Header: "Parent container no",
        accessor: "id_container_father",
      },
      {
        Header: "Packaging ID",
        accessor: "id_packaging",
      },
      {
        Header: "Location",
        accessor: "id_location",
        Cell: (props) => {
          return <span>{props.original.id_location.substring(3)}</span>;
        },
      },
      {
        Header: "Height(m)",
        accessor: "height",
      },
      {
        Header: "Weight(Kg)",
        accessor: "weight",
      },
      {
        Header: "Version",
        accessor: "version_Lock",
      },
      {
        Header: "Modified By",
        accessor: "mUsername",
      },
      {
        Header: "Modified Date",
        accessor: "mDate",
        // Cell: (props) => {
        //   return (
        //     <span>
        //       {props.original.mDate === undefined
        //         ? ""
        //         : props.original.mDate === null
        //         ? ""
        //         : props.original.mDate === ""
        //         ? ""
        //         : props.original.mDate
        //             .replace("T", " ")
        //             .substring(0, props.original.mDate.lastIndexOf("."))}
        //     </span>
        //   );
        // },
      },
      {
        Header: "Movement status",
        accessor: "status_mvt",
        Cell: (props) => {
          return (
            <span>
              {props.original.status_mvt === 100 ? <font>_Immobile_</font> : ""}
              {props.original.status_mvt === 200 ? <font>_Transfer_</font> : ""}
              {props.original.status_mvt === 300 ? <font>Quantity</font> : ""}
            </span>
          );
        },
      },

      {
        Header: "Batch",
        accessor: "batch",
      },
      {
        Header: "Grade",
        accessor: "z_grade",
      },
      {
        Header: "Reference",
        accessor: "id_reference",
      },
    ];
    return (
      <React.Fragment>
        {this.state.isEdit === true || StoragecontainerEditdata !== null ? (
          <Storagecontainersedit editcloseHandler={this.editcloseHandler} />
        ) : (
          <div>
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
                    <a style={{cursor:"pointer"}} onClick={this.backkHandler}>Containers search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}}>Access to containers</a>
                  </b>
                </u>
              </span>
              <br />
            </div>
            <div style={{ marginTop: "5px" }} class="row-xs-6 bottom-row ">
              <FaPrint /> <a style={{cursor:"pointer"}}>Print</a>&nbsp;
              <FaFileExport /> <a style={{cursor:"pointer"}}>Export</a>
              <button
                onClick={this.refreshandler}
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

            <br></br>
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

export default Storagecontainerslist;
