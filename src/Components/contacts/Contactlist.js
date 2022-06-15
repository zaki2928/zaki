import React, { Component } from 'react'
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaFileSignature, FaPrint, FaFileExport, FaLastfmSquare } from "react-icons/fa";
import { ContactData, contactCriteria, ContactDataHandler,contactEditData,contactEditDataHandler, remover,contactid} from "../../store/Store"
import Createcontact from "./Createcontact"
import Editcontact from './Editcontact';
import axios from "axios";
import {properties} from '../../Properties/Properties'
import { CONTACTS } from '../../store/RoleBased';


const getListOfContact = properties.Port + properties.getListOfContact
const deleteContact = properties.Port + properties.deleteContact




export default class Contactlist extends Component {
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
        if (ContactData.length !== 0) {
            this.setState({
                data: ContactData
            })
        } else {
            this.setState({
                data: this.props.data,
            })
        }
    }

    contactFilterHandler = () => {
        console.log("submitHandler calling")

        axios.post(getListOfContact, contactCriteria, {
            params: {
                limit: contactCriteria.limit,
              },
        })
            .then((response) => {
                if (response.status === 200 && response.data.length !== 0) {
                    console.log("resposne success", response.data);
                    this.setState({
                        data: response.data,

                    })

                    ContactDataHandler(response.data);
                    this.componentDidMount();

                }else {
                    this.setState({
                      data: [],
                    });
                    ContactDataHandler(response.data);
                  }
            })
            .catch((error) => {
                console.log(error);
            });

    }

    refreshHandler = () => {
        console.log("submitHandler calling", this.state.limit)
        const contact = {
            listFilterBean: this.state.listFilterBean,
            limit: this.state.limit,
          };

        axios.post(getListOfContact, contactCriteria, {
            params: contactCriteria.limit
        }
        )
            .then((response) => {
                if (response.status === 200 && response.data.length !== 0) {
                    console.log("resposne success", response.data);
                    this.setState({
                        data: response.data,

                    })

                    ContactDataHandler(response.data);

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
        console.log("ID----------------", props.idContact)
        console.log("delete url", deleteContact)
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
                axios.delete(deleteContact + props.idContact)
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

    backHandler=()=>{
        console.log("calling back handler for list")
        remover(contactid)
        this.props.backHandler()
      }

      closeHandler =() => {
          this.setState({
            isNew: false
          })
      }



    //   createUserHandler=() =>{
    //     CreateUserDataHandler()
    //     this.setState({
    //         newUser: true,
    //     })
    //   }

      editHandler=(props)=>{
        console.log("check props data", props)
          this.setState({
            isEdit: true,
            data2: props,
              
          })
          
          contactEditDataHandler(props)
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
                show: CONTACTS === 2? true: false,
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
                Header: "Name",
                accessor: "businessName",
            },
            {
                Header: "Firstname",
                accessor: "firstName",
            },
            {
                Header: "Fuction",
                accessor: "contactFunction",
            },
            {
                Header: "Language",
                accessor: "idLanguage",
            },
            {
                Header: "User",
                accessor: "musername",
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
                accessor: "mdfBy",
            },


        ];
        return (
            <React.Fragment>
                { this.state.isNew === true
                 ? (<Createcontact closeHandler={this.closeHandler}/>) :

                this.state.isEdit === true || contactEditData.length !== 0
                ? (<Editcontact editcloseHandler={this.editcloseHandler} data2={this.state.data2}/>) :
                (
                
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
                            <a onClick={this.backHandler} style={{cursor:'pointer'}}>Contact Search</a>
                        </b>
                    </u>
                    &#62;
                    <u>
                        {" "}
                        <b>
                            {" "}
                            <a >Contact Management</a>
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

{CONTACTS === 2? 
<div>
                    <FaFileSignature
                     onClick={this.newCreateHandler}
                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaFileSignature>{" "}
                    {/* <button >Configure</button> */}
                    <span
                        onClick={this.newCreateHandler} style={{cursor:'pointer'}}
                    >New</span>{" "}
                    </div>
                    :''}

                    <FaPrint

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaPrint>{" "}
                    <a  style={{cursor:'pointer'}}>Print</a>{" "}
                    <FaFileExport

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaFileExport>{" "}
                    <a style={{cursor:'pointer'}}>Export</a>{" "}
             
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
                )
                 }
                

            </React.Fragment>
        )
    }
}
