import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import Operationbyregionnew from './Operationbyregionnew';
import Operationbyregionedit from './Operationbyregionedit'
import { FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2'
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaSave, FaFileSignature } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {operationbyregionData,operationbyregionCriteria,operationbyregionDataHandler,operationbyregionEditData,operationbyregionEditDataHandler, remover } from '../../../../../store/Store'
import { properties } from "../../../../../Properties/Properties"

const getListOfOperationByRegion = properties.Port + properties.getListOfOperationByRegion
const deleteRegionMissionDistribution = properties.Port + properties.deleteRegionMissionDistribution

export default class Operationbyregionlist extends Component {
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
    console.log("gate data-----------",operationbyregionData )
    if (operationbyregionData.length !== 0) {
      this.setState({
        data: operationbyregionData
      })
    } else {
      this.setState({
        data: this.props.data,
      })
    }
  }

  operationFilterMethod = () => {
    console.log("submitHandler calling")

    axios.post(getListOfOperationByRegion, operationbyregionCriteria, {
      params: {
        limit: operationbyregionCriteria.limit,
      },
    })
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,

          })

          operationbyregionDataHandler(response.data);
          this.componentDidMount();

        } else {
          this.setState({
            data: [],
          });
          operationbyregionDataHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  

  deleteHandler(props) {
    console.log("ID----------------", props.idGate)
    console.log("delete url", deleteRegionMissionDistribution)
    Swal.fire({
      title: 'Confirmation',
      text: "Do you confirm the deletion?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'gray',
      cancelButtonColor: 'gray',
      confirmButtonText: 'delete'
    }).then((result) => {
      console.log("swal result", result)
      if (result.value) {
        axios.delete(deleteRegionMissionDistribution + props.idGate)
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

        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  newCreateHandler = () => {
    console.log("new contact++++++++++++++++++++++++++++")
    // newCreateContactDataHandler()
    this.setState({
      isNew: true,
    })
  }

  backkHandler = () => {
    console.log("calling back handler for list")
    remover("operationbyregionsid")
    this.props.backHandler()
  }

  closeHandler = () => {
    this.setState({
      isNew: false
    })
  }

  editHandler = (props) => {
    console.log("check props data", props)
    console.log("edit data from edit handlr", operationbyregionEditData)
    this.setState({
      isEdit: true,
      data2: props,

    })

    operationbyregionEditDataHandler(props)
  }

  editcloseHandler = () => {
    console.log("edit close from list page")
    this.setState({
      isEdit: false,
    })
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
    const columns = [
      {
        Header: "Edit",
        accessor: "Edit",
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
                Header: 'Delete',
                accessor: "Delete",
                filterable: false,
                Cell: (props) => {
                    return (
                        <div>
                            <FaTrashAlt

                                onClick={() => this.deleteHandler(props.original)}
                            >
                                Delete
                      </FaTrashAlt>
                        </div>
                    );
                },

            },
      {
        Header: "ID",
        accessor: "idRegionMisClass",
      },
      {
        Header: "Warehouse",
        accessor: "idWarehouse",
      },
      {
        Header: "Region origin",
        accessor: "originIdRegion",
      },
      {
        Header: "Region destination",
        accessor: "originDescRegion",
      },
      {
        Header: "Mission class",
        accessor: "missionClassId",
      },
      {
        Header: "Distributed",
        accessor:"distribution",
        Cell: (props) => <input type="checkbox" checked={props.original.distribution === 1 ? true : false}/>
      },
      {
        Header: "Version",
        accessor: "versionLock",
      },
      {
        Header: "Modifid Date",
        Cell: (props) => {
          return (
            <span>
              {props.original.mDate === undefined
                ? ""
                : props.original.mDate === null
                ? ""
                : props.original.mDate === ""
                ? ""
                : props.original.mDate.substring(0, 10)}
              &nbsp;
              {props.original.mDate === undefined
                ? ""
                : props.original.mDate === null
                ? ""
                : props.original.mDate === ""
                ? ""
                : props.original.mDate.substring(14, 19)}
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
        { this.state.isEdit === true 
        || operationbyregionEditData.length !== 0  
        ? 
        ( <Operationbyregionedit editcloseHandler={this.editcloseHandler} data2={this.state.data2} /> ) 
        : 
        this.state.isNew === true ?
        (<Operationbyregionnew closeHandler={this.closeHandler} /> )
        
        :( 
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
                  <a onClick={this.backkHandler}>Distribution operations by region Search</a>
                </b>
              </u>
              &#62;
              <u>
                <b>
                  <a> Distribution operations by region Management</a>
                </b>
              </u>

            </span>
            <br />
            <div>
              <FaFileSignature /><span onClick={this.newCreateHandler}><u>New</u></span>
              &nbsp;&nbsp;
              <FaSave  /><span><u>Save</u></span>
            </div>
            <br />
            <ReactTable
          className="-striped -highlight "
          data={this.state.data.length === 0
              ? this.props.data : this.state.data
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
