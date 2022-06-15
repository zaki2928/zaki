import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import RolesEdit from './RolesEdit';
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaEdit, FaTrashAlt, FaFileSignature, FaPrint, FaFileExport } from "react-icons/fa";
import Swal from "sweetalert2";
import { WarehouseData, RolesEditData, RolesEditHandler, remover, RefreshRoleCriteria } from '../../../store/Store';
import { RolesNewData, RolesNewHandler,RolesData, RolesHandler} from "../../../store/Store";
import RolesNew from "./RolesNew";
import axios from 'axios';
import { properties } from '../../../Properties/Properties';
import { ROLES } from '../../../store/RoleBased';

const GetListOfRoles = properties.Port + properties.GetListOfRoles;
const deleteroleByRoleId = properties.Port + properties.deleteroleByRoleId

class RolesList extends Component {
  constructor(props) {
    super(props);
    

    this.state = {
      data: [],
      data2: [],
      generalEdit: false,
      customer: false,
      customerArr: [],
      msg: "",
    };
  }

  componentDidMount = () => {
    console.log("warehouse Data", RolesData)
    if (RolesData.length !== 0) {
      this.setState({
        data: RolesData
      })
    } else {
      this.setState({
        data: this.props.data
      })
    }
  }

  backHandler = () => {
    console.log("calling back handler for list")
    remover("Roles")
    this.props.backHandler()
  }

  

  editHandler = (props) => {
    console.log("check props dataaaaaa", props)
    this.setState({
      generalEdit: true,

    })
    this.state.data2.push(props)
    RolesEditHandler(props)
  }


  editClosehandler = () => {
    this.criteriaFilterMethod()
    this.setState({
      generalEdit: false,
    })
  }

  refreshRoleHandler=()=>{
    console.log("referesh role handler calling");
    this.criteriaFilterMethod()
  }

  criteriaFilterMethod = () => {
    console.log("testttingggggggggggggggggggggggggggggg refresh role filter method calling");
    axios
      .post(GetListOfRoles, RefreshRoleCriteria, {
        params: {
          limit: RefreshRoleCriteria.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne successsssssssssssss", response.data);
          this.setState({
            data: response.data,
          });
          RolesHandler(response.data);
        } else {
          this.setState({
            data: [],
          });
          RolesHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  CustomerEditionHandler = (props) => {
    console.log("customer handler calling")
    RolesNewHandler(props)
    this.setState({
      customer: true,
    })
    this.state.customerArr.push(props);
  }


  customerCloseHandler = () => {
    this.setState({
      customer: false,
    })
  }

  deleteHandler = (props) => {
    console.log("deleting role by id", props)
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!",
      msg: "",
    }).then((result) => {
      if (result) {
        axios
          .delete(
            deleteroleByRoleId +
            props.idRole
          )
          .then((response) => {
            console.log(" data", response);
            if (response.status === 200 && response.data === true) {
              console.log("response true successs");
              this.setState({
                msg: "",
              });
              this.componentDidMount();
              Swal.fire("Deleted!", "Role has been deleted.", "success");
            } else if (response.status === 200 && response.data === false) {
              console.log("response data false success");
              this.setState({
                msg: "*You can't delete this role, it has already associated with user",
              });
            } else if (response.status === 500) {
              console.log("response data 500 success");
              this.setState({
                msg: "*Invalid Role",
              });
            } else {
              this.setState({
                msg: "Invalid Role",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
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
    const { msg } = this.state;
    const columns = [
      {
        Header: "Edit",
        accessor: "Edit",
        filterable: false,
        Cell: (props) => {
          return (
            <FaEdit style={{ marginLeft: "40px",cursor:"pointer" }}
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
        ROLES === 2 ? true : false,
        accessor: "Delete",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaTrashAlt style={{ marginLeft: "40px", cursor:"pointer" }}

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
        accessor: "name",
      },
      {
        Header: "Level",
        accessor: "roleLevel",
        Cell: (props) => {
          return (
            <text>
              {props.original.roleLevel === 100 ? <span>User</span> :
               props.original.roleLevel === 200 ? <span>Administrator</span> :
                props.original.roleLevel === 300 ? <span>_Super administrator_</span> : 
                 null}
            </text>
          );
        },
      },
      {
        Header: "Category",
        accessor: "category",
        Cell: (props) => {
          return (
            <text>
              {props.original.category === 100 ? <span>_System_</span> : 
              props.original.category === 200 ? <span>_Common_</span> :
                null}
            </text>
          );
        },
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
        accessor: "mUsername",
      },




    ];
    return (
      <React.Fragment>
        {this.state.generalEdit === true || RolesEditData.length !== 0 ?
          (<RolesEdit editClosehandler={this.editClosehandler} data2={this.state.data2} />) :
          this.state.customer === true || RolesNewData.length !== 0 ?
            (<RolesNew customerArr={this.state.customerArr} customerCloseHandler={this.customerCloseHandler} />) :



            <div>
                  <IoArrowBackCircleSharp />
                    <IoArrowForwardCircleSharp />
                  <FcSearch style={{ marginLeft: "5px" }} />


              <span>
                {" "}
                <u>
                  {" "}
                  <b>
                    <a style={{cursor:"pointer" }}>Home</a>
                  </b>
                </u>{" "}
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer" }} onClick={this.backHandler}>Roles Search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer" }}>Roles Management</a>
                  </b>
                </u>

              </span>
              <br />

              <div style={{ marginTop: "10px", marginBottom: "5px" }} class="row-xs-6 bottom-row ">
{ROLES === 2 ?
<div>
                <FaFileSignature
                     onClick={this.CustomerEditionHandler}       
                //   onClick={() => this.edithandler(props.original)}
                >
              
                </FaFileSignature>{" "}
                {/* <button >Configure</button> */}
                <span
                style={{cursor:"pointer" }}
                  onClick={this.CustomerEditionHandler}
                >New</span>{" "}
                </div>
:''}
                <FaPrint

                //   onClick={() => this.edithandler(props.original)}
                >

                </FaPrint>{" "}
                <a style={{cursor:"pointer" }} >Print</a>{" "}
                <FaPrint

                //   onClick={() => this.edithandler(props.original)}
                >

                </FaPrint>{" "}
                <a style={{cursor:"pointer" }}>Configure list</a>{" "}

                <FaPrint

                //   onClick={() => this.edithandler(props.original)}
                >

                </FaPrint>{" "}
                <a style={{cursor:"pointer" }}>Reset sort</a>{" "}

                <FaFileExport

                //   onClick={() => this.edithandler(props.original)}
                >

                </FaFileExport>{" "}
                <a style={{cursor:"pointer" }}>Export</a>{" "}
                
                <button
              onClick={this.refreshRoleHandler}
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
                    <h6>{msg}</h6>
                  </span>
                </b>
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

    );

  }
}

export default RolesList;