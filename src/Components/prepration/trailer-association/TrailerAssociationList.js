import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { Repackingdata, AssociatedTrailerdata, AssociatedTrailerHandler } from "../../../store/Store";
import { FaEdit, FaPlay } from "react-icons/fa";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import {
  TrailerAssociationEditdata,
  TrailerAssociationdata,
  TrailerEditHandler,
  remover,
  TrailerAssociationCriteriaHandler,
  TrailerAssociationHandler
} from "../../../store/Store";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import axios from "axios";
import { BsFillDisplayFill } from "react-icons/bs";
import TrailerAssociationEdit from "./TrailerAssociationEdit";
import { TRAILER_ASSOCIATION } from "../../../store/RoleBased";
import { properties } from "../../../Properties/Properties";
import Swal from "sweetalert2";
import { VscDebugDisconnect } from "react-icons/vsc";

const disassociateTrailer = properties.Port + properties.disassociateTrailer;
const getListOfTrailer = properties.Port + properties.getListOfTrailer;
const getListOfAssociatedTrailers = properties.Port + properties.getListOfAssociatedTrailers;

class TrailerAssociationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isEdit: false,
      isDisplay: false,
      isdisplaydata: [],
      activeTab: "1",
      associatedTrailer: [],
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

  getAssociatedTrailerfromChild = (data) => {
    console.log("calling getAssociatedTrailerfromChild", data);
    this.setState({
      associatedTrailer: [...this.state.associatedTrailer, data],
    });
  };

  componentDidMount = () => {
    console.log("com calling ftom list page==>", TrailerAssociationdata);
    console.log("com calling ftom list page props==>", this.props.data);
    if (TrailerAssociationdata.length !== 0) {
      this.setState({
        data: TrailerAssociationdata,
      });
    } else {
      this.setState({
        data: this.props.data,
      });
    }
  };

  // componentDidMount = () => {
  //   console.log("calling comMMMMMMMMMMMMMMMMMMMMM", this.state.data);
  //   console.log("calling TrailerAssociationdata", TrailerAssociationdata);
  //   if (TrailerAssociationdata.length === 0) {
  //     this.setState({
  //       data: this.props.tableData,
  //     });
  //   } else {
  //     this.setState({
  //       data: TrailerAssociationdata,
  //     });
  //   }
  // };
  backHandler = () => {
    console.log("calling back handler for list physical gate");
    remover("Trailers association");
    this.props.backHandler();
  };
  EditHandler = (props) => {
    console.log("Shahid edit handler calling");
    TrailerEditHandler(props);
    this.setState({
      isEdit: true,
    });
  };
  EditCloseHandler = (props) => {
    console.log("Shahid edit handler calling");

    this.setState({
      isEdit: false,
      // activeTab: "2",
    });
  };

  refreshhHandler=()=>{
    console.log("refreshHandler calling")
    this.getIdFilterMethod()
  }
  refreshHandler=()=>{
    console.log("refreshHandler calling")
    this.criteriaFilterMethod()
  }
  getIdFilterMethod = () => {
    this.criteriaFilterMethod();
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(getListOfTrailer, this.state, {
        params: {
          limit: this.state.limit,
        },
      })
      .then((response) => {
        console.log("uzzzzzzmmmmmaaaaaa=========>");
        if (response.status === 200 && response.data.length !== 0) {
          console.log(
            "resposne success ______________________________>",
            response.data
          );
          this.setState({
            data: response.data,
            tableData: true,
          });
          TrailerAssociationHandler(response.data);
          TrailerAssociationCriteriaHandler(criteria);
          // SelectedTrailerAssociationHandler(response.data);
          // SelectedTrailerAssociationCriteriaHandler(criteria);
        } else {
          this.setState({
            tableData: true,
            data: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  criteriaFilterMethod = () => {
    // this.getIdFilterMethod();
    console.log("testtttttttttttttt  api ");
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(getListOfAssociatedTrailers, this.state, {
        params: {
          limit: this.state.limit,
        },
      })
      .then((response) => {
        console.log("uzzzzzzmmmmmaaaaaa=========>>>>>>>>>>>>>>>>>",this.state);
        if (response.status === 200 && response.data.length !== 0) {
          console.log(
            "ibrahim console value______________________________",
            response.data
          );
          // this.getIdFilterMethod();
          this.setState({
            associatedTrailerData: response.data,
            tableData: true,
          });
          AssociatedTrailerHandler(response.data)
          // TrailerAssociationHandler(response.data);
          // TrailerAssociationCriteriaHandler(criteria);
        } else {
          this.setState({
            tableData: true,
            data: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  DisassociateHandler = (data3) => {
    console.log("Disassociation Handler Calling",data3);
    Swal.fire({
      title: "Confirmation",
      text: "Do you want to Disassociate?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes",
    })
    .then((result) => {
      if (result.value) {
        axios
          .post(disassociateTrailer,data3)
          .then((response) => {
            Swal.fire("Disassociated Successfully");
            console.log("response 200 successs");
            this.refreshHandler();
            this.refreshhHandler();
          })
          .catch((error) => {
            console.log(error);
            });
          }
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
    const associatedTrailer = [
      {
        Header: "ID",
        accessor: "id_container_sh_client",
      },

      {
        Header: "Company",
        accessor: "id_company",
      },
      {
        Header: "SAP ID",
        accessor: "sap_id",
      },
      {
        Header: "Trailer Identification",
        accessor: "trailer_identification",
      },

      {
        Header: "RFID Tag",
        accessor: "rfid_tag",
      },
      {
        Header: "Driver Name",
        accessor: "driver_name",
      },
      {
        Header: "Trailer Type",
        accessor: "trailer_type",
        Cell: (props) => {
          return (
            <text>
              {props.original.trailer_type === 10 ? (
                <span>_20 feet container_</span>
              ) : props.original.trailer_type === 20 ? (
                <span>_40 feet container_</span>
              ) : props.original.trailer_type === 30 ? (
                <span>_20 and 40 feet mixed_</span>
              ) : props.original.trailer_type === 40 ? (
                <span>_Sea bulk_</span>
              ) : props.original.trailer_type === 50 ? (
                <span>_Truck_</span>
              ) : props.original.trailer_type === 60 ? (
                <span>_Bulk Truck_</span>
              ) 
               : null}
            </text>
          );
        },
      },
      {
        Header: "Preparation Type",
        accessor: "trailer_preparation_type",
        Cell: (props) => {
          return (
            <text>
              {props.original.trailer_preparation_type === 100 ? (
                <span>_PLF_</span>
              ) : props.original.trailer_preparation_type}
            </text>
          );
        },
      },
      {
        Header: "Trailer Number",
        accessor: "trailer_number",
      },
      {
        Header: "Status",
        accessor: "status_client",
      },
      {
        Header: "Preparation Order Id",
        accessor: "id_prep_order",
      },
      {
        Header: "recording Gate",
        accessor: "id_recording_gate",
      },
      {
        Header: "Weighing Status",
        accessor: "status_weighing",
        Cell: (props) => {
          return (
            <text>
              {props.original.status_weighing === 400 ? (
                <span>_Not to be weighed_</span>
              ) : props.original.status_weighing}
            </text>
          );
        },
      },
      {
        Header: "Reception Line Id",
        accessor: "id_prep_line_n3",
      },
      {
        Header: "Position In consolidation area",
        accessor: "consolidation_area_position",
      },
      {
        Header: "Expected Container Number",
        accessor: "expected_container_number",
      },
      {
        Header: "Version",
        accessor: "version_lock",
      },
      {
        Header: "Modified Date",
        accessor: "mdate",
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
        accessor: "musername",
      },
      // {
      //   Header: "Gate",
      //   accessor: "id_gate_loaded",
      // },
      {
        Header: "Preparation Order Status",
        accessor: "status_po",
        Cell: (props) => {
          return (
            <text>
              {props.original.status_po === 200 ? (
                <span>_CubingError_</span>
              ) : props.original.status_po === 350 ? (
                <span>_Launchable_</span>
              ) : props.original.status_po === 400 ? (
                <span>Launched</span>
              ) : props.original.status_po === 500 ? (
                <span>Prepared</span>
              ) : props.original.status_po === 4000 ? (
                <span>Cancelled</span>
              ) : props.original.status_po === 360 ? (
                <span>Selected</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Po Shipping Status",
        accessor: "status_shipping",
        Cell: (props) => {
          return (
            <text>
        {props.original.status_shipping === -1 ? <span>NON_RELEVANT</span> :
         props.original.status_shipping === 1200 ?<span>AWAITING_SHIPMENT</span> :
         props.original.status_shipping === 4000 ? <span>CANCELLED</span>
         :null}
              
            </text>
          );
        },
      },
      {
        Header: "Disassociate",
        show: TRAILER_ASSOCIATION === 2? true: false,
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <VscDebugDisconnect
                style={{ cursor: "pointer" }}
                onClick={() => this.DisassociateHandler(props.original)}
              >
                Edit
              </VscDebugDisconnect>
            </div>
          );
        },
      },
    ];

    const columnshipping = [
      {
        Header: "ID",
        accessor: "id_trailer",
      },
      {
        Header: "SAP id",
        accessor: "sap_id",
      },

      {
        Header: "Trailer Type ",
        accessor: "trailer_type",
        Cell: (props) => {
          return (
            <text>
              {props.original.trailer_type === 10 ? (
                <span>_20 feet container_</span>
              ) : props.original.trailer_type === 20 ? (
                <span>_40 feet container_</span>
              ) : props.original.trailer_type === 30 ? (
                <span>_20 and 40 feet mixed_</span>
              ) : props.original.trailer_type === 40 ? (
                <span>_Sea bulk_</span>
              ) : props.original.trailer_type === 50 ? (
                <span>_Truck_</span>
              ) : props.original.trailer_type === 60 ? (
                <span>_Bulk Truck_</span>
              ) 
               : null}
            </text>
          );
        },
      },

      {
        Header: "Trailer Identification L3",
        accessor: "trailer_identification",
      },
      {
        Header: "Version",
        accessor: "version_lock",
      },
      {
        Header: "Preparation Order ",
        accessor: "id_prep_order",
      },
      {
        Header: "Preparation Order Status",
        accessor: "status_po",
        Cell: (props) => {
          return (
            <text>
              {props.original.status_po === 200 ? (
                <span>_CubingError_</span>
              ) : props.original.status_po === 350 ? (
                <span>_Launchable_</span>
              ) : props.original.status_po === 400 ? (
                <span>Launched</span>
              ) : props.original.status_po === 500 ? (
                <span>Prepared</span>
              ) : props.original.status_po === 4000 ? (
                <span>Cancelled</span>
              ) : props.original.status_po === 360 ? (
                <span>Selected</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Po Shipping Status",
        accessor: "status_shipping",
        Cell: (props) => {
          return (
            <text>
        {props.original.status_shipping === -1 ? <span>NON_RELEVANT</span> :
         props.original.status_shipping === 1200 ?<span>AWAITING_SHIPMENT</span> :
         props.original.status_shipping === 4000 ? <span>CANCELLED</span>
         :null}
              
            </text>
          );
        },
      },
      {
        Header: "Edit",
show: TRAILER_ASSOCIATION === 2? true: false,
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaEdit
                style={{ cursor: "pointer" }}
                onClick={() => this.EditHandler(props.original)}
              >
                Edit
              </FaEdit>
            </div>
          );
        },
      },
    ];
    return (
      <React.Fragment>
        {this.state.isEdit === true || TrailerAssociationEditdata != null ? (
          <TrailerAssociationEdit
            EditCloseHandler={this.EditCloseHandler}
            toggle={this.toggle}
            getAssociatedTrailerfromChild={this.getAssociatedTrailerfromChild}
          />
        ) : (
          <div>
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
                  <a style={{cursor: "pointer"}} onClick={this.backHandler}>Trailer association search</a>
                </b>
              </u>
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor:"pointer"}}>Trailer association management</a>
                </b>
              </u>
            </span>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1",
                  })}style={{cursor:"pointer"}}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  Trailers
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2",
                  })}style={{cursor:"pointer"}}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  AssociatedTrailers
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
              <button
              onClick={this.refreshhHandler}
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
                    this.state.data.length === 0
                      ? this.props.data
                      : this.state.data
                  }
                  columns={columnshipping}
                  defaultPageSize={10}
                  showPaginationTop={true}
                  filterable
                  defaultFilterMethod={this.filterCaseInsensitive}
                />
              </TabPane>

              <TabPane tabId="2">
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
            <br />
            <br />
                <ReactTable
                  className="-striped -highlight "
                  data={this.state.associatedTrailer.length !==0 ?this.state.associatedTrailer:AssociatedTrailerdata}
                  columns={associatedTrailer}
                  defaultPageSize={10}
                  showPaginationTop={true}
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

export default TrailerAssociationList;
