import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button, Label, Input } from "reactstrap";
import {
  FaEdit,
  FaTrashAlt,
  FaList,
  FaFileSignature,
  FaPrint,
  FaFileExport,
} from "react-icons/fa";
import Swal from "sweetalert2";
import {
  PreparationEditHandler,
  PreparationListData,
  PreparationListHandler,
  remover,
  PreparationEditData,
} from "../../../store/Store";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import PreparationEdit from "./PreparationEdit";
import {
  FaCog,
  FaSdCard,
  FaCalendarCheck,
  FaPrescriptionBottleAlt,
} from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import { FaRegListAlt } from "react-icons/fa";
import {
  PreparationNewData,
  PreparationNewHandler,
} from "../../../store/Store";
import PreparationNew from "./PreparationNew";
import axios from "axios";
import { properties } from "../../../Properties/Properties";

const deletePackaging = properties.Port + properties.deletePackaging;

class PreparationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      orderEdit: false,
      preparation: false,
      preparationArr: [],
      shippingDisp: false,
      shippingPrpDisplayArr: [],
      preparationnew: false,
      preparationnewArr: [],
    };
  }

  componentDidMount() {
    console.log("calling edit datttaaaaaaaaaaaaaaaaa");
    if (PreparationListData.length === 0) {
      console.log("length is zero");
      this.state.data.push(this.props.preparationArr);
      console.log("after data pushed in table", this.state.data);
    } else {
      console.log("length is not zero", PreparationListData);
      //this.state.data.push(PreparationListData)
      this.setState(
        {
          data: PreparationListData,
        },
        () => {
          console.log(
            "after data pushed(inside preparation list) in table line 50",
            this.state.data
          );
        }
      );
    }
  }
  displayHandler = (props) => {
    console.log("ibzy display handler calling");
    PreparationListHandler(props);
    this.setState({
      preparation: true,
      preparationArr: props,
      orderEdit: false,
    });
  };

  displayCloseHandler = (props) => {
    console.log("ibzy edit handler calling");

    this.setState({
      preparation: false,
    });
  };

  backHandler = () => {
    console.log("calling back handler for list");
    remover("PreparationList");
    this.props.preparationCloseHandler();
  };

  preparationListHandler = (props) => {
    console.log("check props dataaaaaa");
    this.setState({
      shippingDisp: true,
    });
    console.log("chekkkkkk", props);
    this.state.shippingPrpDisplayArr.push(props);
    PreparationEditHandler(props);
  };

  shippingDiplayClosehandler = () => {
    this.setState({
      shippingDisp: false,
    });
  };

  prparationnewClosehandler = () => {
    this.setState({
      preparationnew: false,
    });
  };

  PreparationNewEditionHandler = () => {
    console.log("customer handler calling");
    PreparationNewHandler(PreparationListData);
    this.setState({
      preparationnew: true,
    });
    this.state.preparationnewArr.push(PreparationListData);
  };

  deleteHandler = (props) => {
    console.log("Id  is", props.idPackaging);
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
      if (result) {
        axios
          .delete(deletePackaging + props.idPackaging)
          .then((response) => {
            console.log(" data", response);
            if (response.status === 200) {
              console.log("response data 200 success");
              this.setState({
                msg: "",
              });
              this.componentDidMount();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else {
              this.setState({
                msg: "Invalid Packaging  ID",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
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
    const columns = [
      {
        Header: "Editt",
        accessor: "Edit",
        filterable: false,
        Cell: (props) => {
          return (
            <FaEdit onClick={() => this.preparationListHandler(props.original)}>
              Edit
            </FaEdit>
          );
        },
      },

      {
        Header: "Delete",
        accessor: "Delete",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaTrashAlt onClick={() => this.deleteHandler(props.original)}>
                Delete
              </FaTrashAlt>
            </div>
          );
        },
      },

      {
        Header: "Technical ID",
        accessor: "idPackagingStk",
      },
      {
        Header: "ID",
        accessor: "idPackaging",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Short Description",
        accessor: "descriptionShort",
      },
      {
        Header: "Internal Length(cm)",
        accessor: "lenthINT",
      },
      {
        Header: "Internal Width(cm)",
        accessor: "widthINT",
      },
      {
        Header: "Internal Height(cm)",
        accessor: "heightINT",
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
                    .substring(0, props.original.mDate.lastIndexOf("."))}
            </span>
          );
        },
      },
      {
        Header: "Modified by",
        accessor: "mUsername",
      },
    ];
    return (
      <React.Fragment>
        {this.state.shippingDisp === true ||
        PreparationEditData.length !== 0 ? (
          <PreparationEdit
            shippingPrpDisplayArr={this.state.shippingPrpDisplayArr}
            shippingDiplayClosehandler={this.shippingDiplayClosehandler}
          />
        ) : this.state.preparationnew === true ||
          PreparationNewData.length !== 0 ? (
          <PreparationNew
            preparationnewArr={this.state.preparationnewArr}
            prparationnewClosehandler={this.prparationnewClosehandler}
          />
        ) : (
          <Container
            className="themed-container"
            fluid={true}
            // style={{ border: "1px solid black", marginLeft: "14px" }}
          >
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
                  <a>Packagings Search</a>
                </b>
              </u>{" "}
              <Button
                style={{ marginTop: "5px", float: "right" }}
                outline
                color="secondary"
                onClick={this.preparationListHandler}
                active="true"
              >
                {" "}
                Preparation Tab
              </Button>
              <Button
                outline
                color="secondary"
                style={{ marginTop: "5px", marginLeft: "5px", float: "right" }}
                onClick={this.backHandler}
              >
                {" "}
                General Tab
              </Button>
            </span>
            <br />
            <div class="row-xs-6 bottom-row ">
              <input type="checkbox" id="myid"></input> <a>Select All </a>{" "}
              <FaCalendarCheck

              //   onClick={() => this.edithandler(props.original)}
              ></FaCalendarCheck>{" "}
              {/* <button >Configure</button> */}
              <a>Validate Section</a>{" "}
              <FaFileSignature

              //   onClick={() => this.edithandler(props.original)}
              ></FaFileSignature>{" "}
              {/* <button >Configure</button> */}
              <span onClick={this.PreparationNewEditionHandler}>New</span>{" "}
              <FaCog

              //   onClick={() => this.edithandler(props.original)}
              ></FaCog>{" "}
              {/* <button >Configure</button> */}
              <a>Configure List</a>{" "}
              {/* <button class="btn5 some-margin"></button> */}
              <FaRegShareSquare

              //   onClick={() => this.edithandler(props.original)}
              ></FaRegShareSquare>{" "}
              <a>Reset Sort</a>{" "}
              <FaPrint

              //   onClick={() => this.edithandler(props.original)}
              ></FaPrint>{" "}
              <a>Print</a>{" "}
              <FaFileExport

              //   onClick={() => this.edithandler(props.original)}
              ></FaFileExport>{" "}
              <a>Export</a>{" "}
            </div>
            <div>
              <hr />
              <ReactTable
                className="-striped -highlight "
                data={
                  this.state.data.length === 0
                    ? this.props.preparationArr
                    : this.state.data
                }
                columns={columns}
                defaultPageSize={5}
                showPaginationTop={false}
                filterable
                defaultFilterMethod={this.filterCaseInsensitive}
              />
            </div>
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default PreparationList;
