import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import GeneralEdit from "./GeneralEdit";
import {
  FaEdit,
  FaTrashAlt,
  FaList,
  FaChrome,
  FaFileSignature,
  FaPrint,
  FaFileExport,
} from "react-icons/fa";
import Swal from "sweetalert2";
import { PackagingData,PackagingHandler, PackagingCriteriaa, GeneralEditData, GeneralEditHandler, remove, remover, packagingid} from '../../../store/Store';
import { GeneralNewData, GeneralNewHandler } from "../../../store/Store";
import {
  StockListData,
  StockListHandler,
  StockEditHandler,
  StockEditData,
} from "../../../store/Store";
import {
  PreparationListData,
  PreparationListHandler,
  PreparationEditHandler,
  PreparationEditData,
} from "../../../store/Store";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";

import {
  FaCog,
  FaSdCard,
  FaCalendarCheck,
  FaPrescriptionBottleAlt,
} from "react-icons/fa";
import { FaRegShareSquare, FaComments } from "react-icons/fa";
import { FaRegListAlt, FaDiceD6, FaCubes } from "react-icons/fa";

import GeneralNew from "./GeneralNew";

import StockList from "./StockList";
import PreparationList from "./PreparationList";
import axios from "axios";
import { properties } from "../../../Properties/Properties";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import StockEdit from "./StockEdit";
import PreparationEdit from "./PreparationEdit";
import { PACKAGING } from "../../../store/RoleBased";

const deletePackaging = properties.Port + properties.deletePackaging;
const getListOfPackagingKLPView = properties.Port + properties.getListOfPackagingKLPView


class PackagingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data2: [],
      generalEdit: false,
      isdisplaydata: [],
      customer: false,
      customerArr: [],
      shipping: false,
      shippingArr: [],
      preparation: false,
      preparationArr: [],
      activeTab: "1",
      data3: [],
      shippingDisp: false,
      shippingPrepDisp: false,
      shippingDisplayArr: [],
      shippingPrpDisplayArr: [],
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab != tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  componentDidMount = () => {
    console.log("Stock datAAAAAAAA+++++++", this.state.data3);
    console.log("Stock datAAAAAAAA+++++++", StockListData);
    if (PackagingData.length !== 0) {
      this.setState({
        data: PackagingData,
      });
    } else {
      this.setState({
        data: this.props.data,
      });
    }
    //-------------------
    if (StockListData.length === 0) {
      console.log("length is zero");
      this.state.data.push(this.props.shippingArr);
      console.log("after data pushed in table", this.state.data);
    } else {
      console.log("length is not zero", StockListData);
      this.setState(
        {
          data: StockListData,
        },
        () => {
          console.log("after data pushed in table line 51", this.state.data);
        }
      );
    }
    //------------
    if (PreparationListData.length === 0) {
      console.log("length is zero");
      this.state.data.push(this.props.preparationArr);
      console.log("after data pushed in table", this.state.data);
    } else {
      console.log("length is not zero", PreparationListData);
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
    //------------
  };

  backHandler = () => {
    console.log("calling back handler for list");
    remover(packagingid);
    // remover(Packagingid)
    this.props.backHandler();
  };

  editHandler = (props) => {
    console.log("check props dataaaaaa", props);
    this.setState({
      generalEdit: true,
    });
    this.state.data2.push(props);
    GeneralEditHandler(props);
  };

  editClosehandler = () => {
    this.setState({
      generalEdit: false,
    });
  };

  // stockListHandler = () => {
  //   console.log("stock list handler calling")
  //   StockListHandler(PackagingData)
  //   this.setState({
  //     shipping: true,
  //   })
  //   this.state.shippingArr.push(PackagingData);
  // }
  stockListHandlerr = (props) => {
    console.log("check props dataaaaaa");
    this.setState({
      shippingDisp: true,
    });
    console.log("chekkkkkk", props);
    this.state.shippingDisplayArr.push(props);
    StockEditHandler(props);
  };

  shippingDiplayClosehandler = () => {
    this.setState({
      shippingDisp: false,
    });
  };

  // preparationListHandler = () => {
  //   console.log("preparation list handler calling")
  //   PreparationListHandler(PackagingData)
  //   this.setState({
  //     preparation: true,
  //   })
  //   this.state.preparationArr.push(PackagingData);
  // }
  preparationListHandlerr = (props) => {
    console.log("check props dataaaaaa");
    this.setState({
      shippingPrepDisp: true,
    });
    console.log("chekkkkkk", props);
    this.state.shippingPrpDisplayArr.push(props);
    PreparationEditHandler(props);
  };

  shippingprepClosehandler = () => {
    this.setState({
      shippingPrepDisp: false,
    });
  };

  CustomerEditionHandler = () => {
    console.log("customer handler calling");
    GeneralNewHandler(PackagingData);
    this.setState({
      customer: true,
    });
    this.state.customerArr.push(PackagingData);
  };

  customerCloseHandler = () => {
    this.setState({
      customer: false,
    });
  };

  shippingCloseHandler = () => {
    this.setState({
      shipping: false,
    });
  };

  preparationCloseHandler = () => {
    this.setState({
      preparation: false,
    });
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
      if (result.value) {
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
              this.refreshHandler();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
            // else if (response.status === 200 && response.data === 300) {
            //   console.log("response data 300 success");
            //   this.setState({
            //     msg: "*This packaging id is a child product"
            //   })
            // }
            //  else if (response.status === 200 && response.data === 100){
            //   console.log("response data 100 success");
            //   this.setState({
            //     msg: "*You cannot delete this Pacaging as it is associated with another Table"
            //   })
            // }
            else {
              this.setState({
                msg: "Invalid Packaging  ID",
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

refreshHandler=()=>{
  console.log(`refresh handler calling`)
  this.refreshFunc();
}

  refreshFunc = () => {
    console.log("refresh calling");
    axios
      .post(getListOfPackagingKLPView, PackagingCriteriaa, {
        params: {
          limit: PackagingCriteriaa.limit,
        },
      })
      
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne successsssssssssssss", response.data);
          this.setState({
            data: response.data,
            

          });
          PackagingHandler(response.data);
          
        } else {
          
          this.setState({
            data: [],

          });
          PackagingHandler(response.data);
          
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
        accessor: "Delete",
        show:
        PACKAGING === 2 ? true : false,
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaTrashAlt style={{cursor:"pointer" }}onClick={() => this.deleteHandler(props.original)}>
                Delete
              </FaTrashAlt>
            </div>
          );
        },
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
        Header: "Type",
        accessor: "typePackaging",
        Cell: (props) => {
          return (
            <text>
              {props.original.typePackaging === 100 ? (
                <span>Pallet</span>
              ) : props.original.typePackaging === 200 ? (
                <span>Bag</span>
              ) : props.original.typePackaging === 300 ? (
                <span>Trailer</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Volume Type",
        accessor: "calculVolume",
        Cell:(props) => {
          return (
            <text>
              {
                props.original.calculVolume===100 ? <span>Packaging</span>:
                props.original.calculVolume===200 ? <span>_UL_</span>:null
              }
            </text>
          )
        }
      },
      {
        Header: "Default",
        accessor: "modifiedby",
        Cell: (props) => {
          return <input type="checkbox" id="myid"></input>;
        },
      },
      {
        Header: "External Length(cm)",
        accessor: "lenthEXT",
      },
      {
        Header: "External Width(cm)",
        accessor: "widthEXT",
      },
      {
        Header: "External Height(cm)",
        accessor: "heightEXT",
      },

      {
        Header: "Empty Weight(kg)",
        accessor: "emptyWeigth",
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

    const stockColumn = [
      {
        Header: "Edit",
        accessor: "Edit",
        filterable: false,
        Cell: (props) => {
          return (
            <FaEdit onClick={() => this.stockListHandlerr(props.original)}>
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
        Header: "Technical Id",
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
        Header: "Modified Date",
        accessor: "mDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.mDate !== null
                ? props.original.mDate.substring(0, 10)
                : ""}
              &nbsp;
              {props.original.mDate !== null
                ? props.original.mDate.substring(14, 19)
                : ""}
            </span>
          );
        },
      },
      {
        Header: "Modified by",
        accessor: "mUsername",
      },
    ];

    const prepColumn = [
      {
        Header: "Edit",
        accessor: "Edit",
        filterable: false,
        Cell: (props) => {
          return (
            <FaEdit
              onClick={() => this.preparationListHandlerr(props.original)}
            >
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
              {props.original.mDate !== null
                ? props.original.mDate.substring(0, 10)
                : ""}
              &nbsp;
              {props.original.mDate !== null
                ? props.original.mDate.substring(14, 19)
                : ""}
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
        {this.state.generalEdit === true || GeneralEditData.length !== 0 ? (
          <GeneralEdit
            editClosehandler={this.editClosehandler}
            data2={this.state.data2}
          />
        ) : this.state.shippingDisp === true || StockEditData.length !== 0 ? (
          <StockEdit
            shippingArr={this.state.shippingArr}
            shippingDiplayClosehandler={this.shippingDiplayClosehandler}
          />
        ) : this.state.shippingPrepDisp === true ||
          PreparationEditData.length !== 0 ? (
          <PreparationEdit
            preparationArr={this.state.preparationArr}
            shippingprepClosehandler={this.shippingprepClosehandler}
          />
        ) : this.state.customer === true || GeneralNewData.length !== 0 ? (
          <GeneralNew
            customerArr={this.state.customerArr}
            customerCloseHandler={this.customerCloseHandler}
          />
        ) : (
          <div>
            {/* <IoArrowBackCircleSharp />
            <IoArrowForwardCircleSharp />
            <FcSearch style={{ marginLeft: "5px" }} /> */}
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
                  <a style={{cursor:"pointer"}} onClick={this.backHandler}>Packagings Search</a>
                </b>
              </u>
              {" "}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor:"pointer" }}>Packagings List</a>
                </b>
              </u>
              {/* <Button outline color="secondary" style={{ marginTop: "5px", marginLeft: "5px", float: "right" }}

                      onClick={
                        this.stockListHandler
                      }
                    >
                      {" "}
                      Stock Tab
                    </Button>

                    <Button style={{ marginTop: "5px", float: "right", }} outline color="secondary"
                      onClick={
                        this.preparationListHandler
                      }
                    >
                      {" "}
                      Preparation Tab
                    </Button>
                    <Button outline color="secondary" style={{ marginTop: "5px", marginLeft: "5px", float: "right" }}

                      active="true"
                    >
                      {" "}
                      General Tab
                    </Button> */}
            </span>
            <br />
            <br />

           
            <Nav tabs style={{ cursor: "pointer" }}>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1",
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  General
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2",
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Stock
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "3",
                  })}
                  onClick={() => {
                    this.toggle("3");
                  }}
                >
                  Preparation
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <br/>
            <span>
                <div class="row-xs-6 bottom-row ">
              <input type="checkbox" id="myid"></input> <a style={{cursor:"pointer" }}>Select All </a>{" "}
              <FaCalendarCheck/>{" "}
              <a style={{cursor:"pointer" }}>Validate Section</a>{" "}
              <FaFileSignature/
              >{" "}
              {PACKAGING ===2 ?
              <span style={{cursor:"pointer" }} onClick={this.CustomerEditionHandler}>New</span>
              :''}
              <FaPrint/
              >{" "}
              <a style={{cursor:"pointer" }}>Print</a>{" "}
              <FaFileExport/>{" "}
              <a style={{cursor:"pointer" }}>Export</a>{" "}
            </div>
                </span> 
                <span>
                <button
                onClick={this.refreshHandler}
                style={{
                  // float: "right",
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
                <br/>
              <TabPane tabId="1">
                <ReactTable
                  className="-striped -highlight "
                  data={
                    this.state.data.length === 0
                      ? this.props.data
                      : this.state.data
                  }
                  columns={columns}
                  defaultPageSize={5}
                  showPaginationTop={false}
                  filterable
                  defaultFilterMethod={this.filterCaseInsensitive}
                />
              </TabPane>

              <TabPane tabId="2">
                <ReactTable
                  className="-striped -highlight "
                  data={
                    this.state.data.length === 0
                      ? this.props.data
                      : this.state.data
                  }
                  columns={stockColumn}
                  defaultPageSize={5}
                  showPaginationTop={false}
                  filterable
                  defaultFilterMethod={this.filterCaseInsensitive}
                />
              </TabPane>

              <TabPane tabId="3">
                <ReactTable
                  className="-striped -highlight "
                  data={
                    this.state.data.length === 0
                      ? this.props.data
                      : this.state.data
                  }
                  columns={prepColumn}
                  defaultPageSize={5}
                  showPaginationTop={false}
                  filterable
                  defaultFilterMethod={this.filterCaseInsensitive}
                />
              </TabPane>
            </TabContent>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default PackagingList;
