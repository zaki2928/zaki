import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import Swal from "sweetalert2";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import {
  FaEdit,
  FaTrashAlt,
  FaFileSignature,
  FaPrint,
  FaFileExport,
  FaLastfmSquare,
} from "react-icons/fa";
import {
  NewUserData,
  NewUserDataHandler,
  remover,
  CreateUserData,
  CreateUserDataHandler,
  UserEditHandler,
  UserEditData,
  RefreshUserCriteria,
} from "../../store/Store";
import Createnewuser from "./Createnewuser";
import Edituser from "./Edituser";
import axios from "axios";
import { properties } from "../../Properties/Properties";
import { USERS } from "../../store/RoleBased";

const GetListOfUsersByFilterCriteria =
  properties.Port + properties.GetListOfUsersByFilterCriteria;
const getUserById = properties.Port + properties.getUserById;
const deleteUserByUserId = properties.Port + properties.deleteUserByUserId;
export default class Userlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      newUser: false,
      isEdit: false,
      idUser: "",
      data2: [],
      editUserArr: [],
    };
  }

  componentDidMount = () => {
    if (NewUserData.length !== 0) {
      this.setState({
        data: NewUserData,
      });
    } else {
      this.setState({
        data: this.props.data,
      });
    }
  };

  backHandler = () => {
    console.log("calling back handler for list");
    remover("Users");
    this.props.backHandler();
  };

  newcloseHandler = () => {
    this.setState({
      newUser: false,
    });
  };

  createUserHandler = () => {
    CreateUserDataHandler();
    this.setState({
      newUser: true,
    });
  };

  editHandler = (props) => {
    console.log("check props dataaaaaa", props);
    this.getUserByUserId(props.idUser);
    // this.setState({
    //     isEdit: true,
    //     data2:
    // })
    // this.state.data2.push(props)
    // UserEditHandler(props)
  };

  getUserByUserId(id) {
    console.log("calling getRoleByRoleId ", id);
    axios
      .post(getUserById + id)
      // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposnse.dataaaa@@@@@ ", response.data);
          UserEditHandler(response.data);
          this.setState({
            isEdit: true,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  editcloseHandler = () => {
    this.criteriaFilterMethod();
    this.setState({
      isEdit: false,
    });
  };

  refreshUserHandler = () => {
    console.log("referesh role handler calling");
    this.criteriaFilterMethod();
  };

  deleteHandler = (props) => {
    console.log("deleting user by id", props);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!",
      msg: "",
    }).then((result) => {
      if (result.value) {
        axios
          .delete(deleteUserByUserId + props.idUser)
          .then((response) => {
            console.log(" data", response);
            if (response.status === 200 && response.data === true) {
              console.log("response true successs");
              this.setState({
                msg: "",
              });
              this.componentDidMount();
              Swal.fire("Deleted!", "User has been deleted.", "success");
            } else if (response.status === 200 && response.data === false) {
              console.log("response data false success");
              this.setState({
                msg: "*Some error exists, contact to technical team",
              });
            } else {
              this.setState({
                msg: "Invalid user",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  criteriaFilterMethod = () => {
    console.log(
      "testttingggggggggggggggggggggggggggggg refresh role filter method calling"
    );
    axios
      .post(GetListOfUsersByFilterCriteria, RefreshUserCriteria, {
        params: {
          limit: RefreshUserCriteria.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne successsssssssssssss", response.data);
          this.setState({
            data: response.data,
          });
          NewUserDataHandler(response.data);
        } else {
          this.setState({
            data: [],
          });
          NewUserDataHandler(response.data);
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
        accessor: "Edit",
        filterable: false,
        Cell: (props) => {
          return (
            <FaEdit style={{cursor:"pointer" }} onClick={() => this.editHandler(props.original)}>
              Edit
            </FaEdit>
          );
        },
      },

      {
        Header: "Delete",
        show: USERS === 2 ? true : false,
        accessor: "Delete",

        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaTrashAlt style={{cursor:"pointer" }} onClick={() => this.deleteHandler(props.original)}>
                Delete
              </FaTrashAlt>
            </div>
          );
        },
      },
      {
        Header: "Login",
        accessor: "login",
      },
      {
        Header: "Name",
        accessor: "lastName",
      },
      {
        Header: "Firstname",
        accessor: "firstName",
      },
      {
        Header: "Expiry Date",
        accessor: "expiryDate",
      },
      {
        Header: "Catagory",
        //accessor: "category",
        Cell: (props) => {
          return (
            <text>
              {props.original.category === 100 ? (
                <span>System</span>
              ) : props.original.category === 200 ? (
                <span>Common</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Level",
        //accessor: "userLevel",
        Cell: (props) => {
          return (
            <text>
              {props.original.userLevel === 100 ? (
                <span>User</span>
              ) : props.original.userLevel === 200 ? (
                <span>Administrator</span>
              ) : props.original.userLevel === 300 ? (
                <span>Super Administrator</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Status",
        //accessor: "status",
        Cell: (props) => {
          return (
            <text>
              {props.original.status === 100 ? (
                <span>_Not Valid</span>
              ) : props.original.status === 200 ? (
                <span>Valid</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Language",
        accessor: "defaultLanguage",
      },
      {
        Header: "Site",
        accessor: "defaultSite",
      },
      {
        Header: "Company",
        accessor: "defaultCompany",
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
        {this.state.newUser === true || CreateUserData !== null ? (
          <Createnewuser newcloseHandler={this.newcloseHandler} />
        ) : this.state.isEdit === true ? (
          <Edituser
            editcloseHandler={this.editcloseHandler}
            data2={this.state.data2}
          />
        ) : (
          <div>
            <IoArrowBackCircleSharp />
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
                  <a style={{cursor:"pointer" }} onClick={this.backHandler}>User Search</a>
                </b>
              </u>
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor:"pointer" }}>User Management</a>
                </b>
              </u>
            </span>
            <br />

            <div
              style={{ marginTop: "10px", marginBottom: "5px" }}
              class="row-xs-6 bottom-row "
            >
              {USERS === 2 ? (
                <div>
                  <FaFileSignature
                    onClick={this.createUserHandler}
                    //   onClick={() => this.edithandler(props.original)}
                  ></FaFileSignature>{" "}
                  {/* <button >Configure</button> */}
                  <span style={{cursor:"pointer" }} onClick={this.createUserHandler}>New</span>{" "}
                </div>
              ) : (
                ""
              )}
              <FaPrint

              //   onClick={() => this.edithandler(props.original)}
              ></FaPrint>{" "}
              <a style={{cursor:"pointer" }}>Print</a>{" "}
              <FaPrint

              //   onClick={() => this.edithandler(props.original)}
              ></FaPrint>{" "}
              <a style={{cursor:"pointer" }}>Configure list</a>{" "}
              <FaPrint

              //   onClick={() => this.edithandler(props.original)}
              ></FaPrint>{" "}
              <a style={{cursor:"pointer" }}>Reset sort</a>{" "}
              <FaFileExport

              //   onClick={() => this.edithandler(props.original)}
              ></FaFileExport>{" "}
              <a style={{cursor:"pointer" }}>Export</a>{" "}
              <button
                onClick={this.refreshUserHandler}
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
