import React, { Component } from 'react'
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaFileSignature, FaPrint, FaFileExport, FaLastfmSquare } from "react-icons/fa";

import { contentstatusData, contentstatusDataHandler, contentstatusCriteria, contentstatusEditDataHandler, remover,contentstatusid } from "../../../store/Store"
import Contentedition from "./Contentedition"
import Contentdataedit from './Contentdataedit'
import axios from "axios";
import { properties } from '../../../Properties/Properties';
import { CONTENT_STATUS } from '../../../store/RoleBased';

const getListOfContentStatusss = properties.Port + properties.getListOfContentStatusss 
const deleteContentStatus = properties.Port + properties.deleteContentStatus




export default class Contentlist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            data2: [],
            isNew: false,
            isEdit: false,
            
        
        }
    }

    componentDidMount = () => {
        if (contentstatusData.length !== 0) {
            this.setState({
                data: contentstatusData
            })
        } else {
            this.setState({
                data: this.props.data
            })
        }
    }
    refreshHandler = () => {
        console.log("submitHandler calling", this.state.limit)
        const contact = {
            listFilterBean: this.state.listFilterBean,
            limit: this.state.limit,
          };

        axios.post(getListOfContentStatusss, contentstatusCriteria, {
            params: contentstatusCriteria.limit
        }
        )
            .then((response) => {
                if (response.status === 200 && response.data.length !== 0) {
                    console.log("resposne success", response.data);
                    this.setState({
                        data: response.data,

                    })

                    contentstatusDataHandler(response.data);

                }else {
                    this.setState({
                      data: [],
                    });
                  }
            })
            .catch((error) => {
                console.log(error);
            });

    }


    deleteHandler(props) {
        console.log("ID----------------", props.content_Status_id)
        Swal.fire({
            title: 'Confirmation',
            text: "Do you confirm the deletion?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'gray',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Delete'
        }).then((result) => {
            console.log("swal result",result)
            if (result.value) {
                axios.delete(deleteContentStatus + props.content_Status_id)
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
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        }
    })
    }

    backkHandler=()=>{
        console.log("calling back handler for list")
        remover(contentstatusid)
        this.props.backHandler()
      }

      newcloseHandler =() => {
          this.setState({
            isNew: false
          })
      }



      createUserHandler=() =>{
        // CreateUserDataHandler()
        this.setState({
            isNew: true,
        })
      }

      editHandler = (props) => {
        console.log("check props data", props)
        this.setState({
          isEdit: true,
          data2: props,
            
        })
        
        contentstatusEditDataHandler(props)
      }
      
      editcloseHandler= () =>{
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
                show:
                CONTENT_STATUS === 2 ? true :false,

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
                Header: "Id",
                accessor: "content_Status_id",
            },
            
            {
                Header: "Description",
                accessor: "description",
            },
            {
                Header: "Accessibility",
                accessor:"accessibility",
                Cell: (props) => <input type="checkbox" checked={props.original.accessibility === 1 ? true : false}/>
            },
            {
                Header: "Technical",
                accessor:"technical",
                Cell: (props) => <input type="checkbox" checked={props.original.technical === 1 ? true : false}/>
            },
            {
                Header: "Version",
                accessor: "version_lock",
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
            

            }
        ];
        return (
            <React.Fragment>
                { this.state.isNew === true
                 ? (<Contentedition newcloseHandler={this.newcloseHandler} />) :

                this.state.isEdit === true
                ? (<Contentdataedit editcloseHandler={this.editcloseHandler}/>) :
                
                
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
                            <a style={{cursor:"pointer" }}onClick={this.backkHandler}>Content Statuses Search</a>
                        </b>
                    </u>
                    &#62;
                    <u>
                        {" "}
                        <b>
                            {" "}
                            <a style={{cursor:"pointer" }}>Mission Class Management</a>
                        </b>
                    </u>
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

                </span>
                <br />

                <div style={{ marginTop: "10px", marginBottom: "5px" }} class="row-xs-6 bottom-row ">
{CONTENT_STATUS ===2 ?
<div>
                    <FaFileSignature

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaFileSignature>{" "}
                    {/* <button >Configure</button> */}
                    <span style={{cursor:"pointer" }}
                        onClick={this.createUserHandler}
                    >New</span>{" "}
                    </div>
                    :''}

                    <FaPrint

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaPrint>{" "}
                    <a style={{cursor:"pointer" }} >Print</a>{" "}
                    <FaFileExport

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaFileExport>{" "}
                    <a style={{cursor:"pointer" }} >Export</a>{" "}

                    
                </div>
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
                 }
                

            </React.Fragment>
        )
    }
}
