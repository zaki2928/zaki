import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import axios from "axios";
import Cellmodelsedit from './Cellmodelsedit';
import Cellmodelsnew from './Cellmodelsnew'
import { FaTimes, FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from 'sweetalert2'
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaSave, FaFileSignature } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import {cellmodelsData,cellmodelsCriteria,cellmodelsDataHandler,cellmodelsEditData,cellmodelsEditDataHandler, remover, cellmodelsid } from '../../../../store/Store'
import { properties } from '../../../../Properties/Properties'

const getListOfCellModels = properties.Port + properties.getListOfCellModels
const deleteCellModel = properties.Port + properties.deleteCellModel

export default class Cellmodelslist extends Component {
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
    console.log("gate data-----------",cellmodelsData )
    if (cellmodelsData.length !== 0) {
      this.setState({
        data: cellmodelsData
      })
    } else {
      this.setState({
        data: this.props.data,
      })
    }
  }

  cellmodelsFilterMethod = () => {
    console.log("submitHandler calling")

    axios.post(getListOfCellModels, cellmodelsCriteria, {
      params: {
        limit: cellmodelsCriteria.limit,
      },
    })
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,

          })

          cellmodelsDataHandler(response.data);
          this.componentDidMount();

        } else {
          this.setState({
            data: [],
          });
          cellmodelsDataHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  

  deleteHandler(props) {
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
      if (result) {
        axios.delete(deleteCellModel + props.idCellModel)
          .then((response) => {
            console.log("mj data", response);
            if (response.status === 200) {
              console.log("response  success");
              // this.refreshHandler();
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
    remover(cellmodelsid)
    this.props.backHandler()
  }

  closeHandler = () => {
    this.setState({
      isNew: false
    })
  }

  editHandler = (props) => {
    console.log("check props data", props)
    console.log("edit data from edit handlr", cellmodelsEditData)
    this.setState({
      isEdit: true,
      data2: props,

    })

    cellmodelsEditDataHandler(props)
  }

  editcloseHandler = () => {
    console.log("edit close from list page")
    this.setState({
      isEdit: false,
    })
  }

  refreshhhHandler = () => {
    console.log("refresh button pressed")
    this.refreshHandler()
  }

  refreshHandler = () => {
    console.log("rizwannn", cellmodelsCriteria)
    axios.post(getListOfCellModels, cellmodelsCriteria, {
      params:{
        limit: cellmodelsCriteria.limit
      },
    })
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
          })
          cellmodelsDataHandler(response.data);
        } else {
          this.setState({
            data: [],
          });
          cellmodelsDataHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

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
                style={{cursor:"pointer" }}
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
                              style={{cursor:"pointer" }}
                                onClick={() => this.deleteHandler(props.original)}
                            >
                                Delete
                      </FaTrashAlt>
                        </div>
                    );
                },

            },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "No of Indexes",
        accessor: "numberOfIndex",
      },
      {
        Header: "Length(m)",
        accessor: "lenght",
      },
      {
        Header: "Width(m)",
        accessor: "width",
      },
      {
        Header: "Height(m)",
        accessor: "height",
      },
      {
        Header: "Weight(kg)",
        accessor: "weight",
      },
      {
        Header: "Default",
        accessor:"defaultCell",
        Cell: (props) => <input type="checkbox" checked={props.original.defaultCell === 0 ? true : false}/>
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
              }
            </span>
          );
        },
      },
      {
        Header: "Modified By",
        accessor: "musername",
      },
     
    ];
    return (
      <React.Fragment>
        { this.state.isEdit === true 
        || cellmodelsEditData.length !== 0  
        ? 
        ( <Cellmodelsedit editcloseHandler={this.editcloseHandler} data2={this.state.data2} /> ) 
        : 
        this.state.isNew === true ?
        (<Cellmodelsnew closeHandler={this.closeHandler} /> )
        
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
                  <a style={{cursor:"pointer" }} onClick={this.backkHandler}>Cell models Search</a>
                </b>
              </u>
              &#62;
              <u>
                <b>
                  <a style={{cursor:"pointer" }}> Cell models Management</a>
                </b>
              </u>

            </span>
            <br />
            <div>
              <FaFileSignature /><span style={{cursor:"pointer" }} onClick={this.newCreateHandler}><u>New</u></span>
              &nbsp;
              <FaSave  /><span><u style={{cursor:"pointer" }}>Save</u></span>
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
