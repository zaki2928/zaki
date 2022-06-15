import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import OrderEdit from "./OrderEdit";
import {
  FaEdit,
  FaList,
  FaChrome,
  FaDesktop,
  FaCommentAlt,
  FaPersonBooth,
  FaPrint,
  FaFileExport,
  FaTrashAlt,
} from "react-icons/fa";

import { MdCancel } from "react-icons/md";
import { ImCross } from "react-icons/im";

import Swal from "sweetalert2";
import {
  OrderCommentsData,
  OrderCommentsHandler,
  FamiliesEditionData,
  ProdFamiliesEditionHandler,
  OrderData,
  OrderDisplayData,
  OrderDisplayHandler,
  OrderEditData,
  OrderEditHandler,
  remover,
  preparationorderid,
} from "../../../store/Store";

import {
  OrderTrailerData,
  OrderTrailerHandler,
  OrderHandler,
  PreparationOrdercriteriaHandler,
  OrderBoxData,
  OrderBoxHandler,
  OrderCustomerData,
  OrderCustomerHandler,
} from "../../../store/Store";
import {
  ShippingDisplayData,
  ShippingDisplayHandler,
  PreparationOrderCriteria,
} from "../../../store/Store";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
  IoPerson,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import OrderDisplay from "./OrderDisplay";
import ProductFamiliesEdition from "./ProductFamiliesEdition";
import { FaCog, FaSdCard, FaOdnoklassniki } from "react-icons/fa";
import { FaRegShareSquare, FaComments } from "react-icons/fa";
import { FaRegListAlt, FaDiceD6, FaCubes } from "react-icons/fa";
import OrderComments from "./OrderComments";
import OrderCustomer from "./OrderCustomer";
import OrderBox from "./OrderBox";
import OrderTrailer from "./OrderTrailer";
import ShippingDisplay from "./ShippingDisplay";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import axios from "axios";
import { properties } from "../../../Properties/Properties";
import { PREPARATION_ORDER } from "../../../store/RoleBased";
const cancelPreparationByIdpo =
  properties.Port + properties.cancelPreparationByIdpo;
const getListOfPreparationOrders =
  properties.Port + properties.getListOfPreparationOrders;

class OrderList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data2: [],
      orderEdit: false,
      isDisplay: false,
      isdisplaydata: [],
      families: false,
      FamiliesArr: [],
      comments: false,
      commentsArr: [],
      customer: false,
      customerArr: [],
      box: false,
      boxArr: [],
      trailer: false,
      trailerArr: [],
      shipping: false,
      shippingArr: [],
      activeTab: "1",
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
    console.log("com calling ftom list page==>", OrderData);
    console.log("com calling ftom list page props==>", this.props.data);
    if (OrderData.length !== 0) {
      this.setState({
        data: OrderData,
      });
    } else {
      this.setState({
        data: this.props.data,
      });
    }
  };

  backHandler = () => {
    console.log("calling back handler for list");
    remover(preparationorderid);
    this.props.backHandler();
  };

  editHandler = (props) => {
    console.log("check props dataaaaaa", props);
    this.setState({
      orderEdit: true,
    });
    this.state.data2.push(props);
    OrderEditHandler(props);
  };

  editClosehandler = () => {
    this.setState({
      orderEdit: false,
    });
  };

  displayHandler = (props) => {
    console.log("display handler calling");
    OrderDisplayHandler(props);
    this.setState({
      isDisplay: true,
    });
    this.state.isdisplaydata.push(props);
  };

  shippingdisplayHandler = (props) => {
    console.log("display handler calling");
    ShippingDisplayHandler(props);
    this.setState({
      shipping: true,
    });
    this.state.shippingArr.push(props);
  };

  displayCloseHandler = () => {
    // remover("OrderDisplay")
    this.setState({
      isDisplay: false,
    });
  };

  familiesEditionHandler = (props) => {
    console.log("familiesss handler calling");
    ProdFamiliesEditionHandler(props);
    this.setState({
      families: true,
    });
    this.state.FamiliesArr.push(props);
  };

  CommentsEditionHandler = (props) => {
    console.log("comment handler calling");
    OrderCommentsHandler(props);
    this.setState({
      comments: true,
    });
    this.state.commentsArr.push(props);
  };

  CustomerEditionHandler = (props) => {
    console.log("customer handler calling");
    OrderCustomerHandler(props);
    this.setState({
      customer: true,
    });
    this.state.customerArr.push(props);
  };

  BoxEditionHandler = (props) => {
    console.log("box handler calling=========>", props);
    OrderBoxHandler(props);
    this.setState({
      box: true,
    });
    this.state.boxArr.push(props);
  };

  TrailerEditionHandler = (props) => {
    console.log("box handler calling");
    OrderTrailerHandler(props);
    this.setState({
      trailer: true,
    });
    this.state.trailerArr.push(props);
  };

  familieCloseHandler = () => {
    this.setState({
      families: false,
    });
  };

  commentCloseHandler = () => {
    this.setState({
      comments: false,
    });
  };

  customerCloseHandler = () => {
    this.setState({
      customer: false,
    });
  };

  boxCloseHandler = () => {
    this.setState({
      box: false,
    });
  };

  trailerCloseHandler = () => {
    this.setState({
      trailer: false,
    });
  };

  shippingCloseHandler = () => {
    this.setState({
      shipping: false,
    });
  };

  deleteHandler() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  cancelPrepByIdPo = (props) => {
    console.log("cancel prep by id calling ", props);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you confirm the cancellation!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes",
    }).then((result) => {
      console.log("result.isConfirmed bf", result.isConfirmed);
      if (result.value) {
        console.log("result.isConfirmed", result.value);
        axios
          .post(cancelPreparationByIdpo + props.idPo)
          .then((response) => {
            if (response.status === 200) {
              console.log("response sucess");
              this.refreshHandler();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    });
  };

  refreshHandler = () => {
    console.log("testtttttttttttttt  api ", PreparationOrderCriteria);
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(getListOfPreparationOrders, PreparationOrderCriteria, {
        params: {
          limit: PreparationOrderCriteria.limit,
        },
      })
      .then((response) => {
        console.log("shahid=========>");
        if (response.status === 200 && response.data.length !== 0) {
          console.log(
            "resposne success ______________________________",
            response.data
          );
          this.setState({
            data: response.data,
          });
          OrderHandler(response.data);
          PreparationOrdercriteriaHandler(PreparationOrderCriteria);
        } else {
          this.setState({
            orderList: true,
            data: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  filterCaseInsensitive(filter, row) {
    const id = filter.pivotId || filter.id;
    if (row[id] !== null) {
      return row[id] !== undefined
        ? String(row[id].toString().toLowerCase()).includes(
            filter.value.toString().toLowerCase()
          )
        : true;
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
            <FaEdit style={{cursor:"pointer"}}onClick={() => this.editHandler(props.original)}>
              Edit
            </FaEdit>
          );
        },
      },
      // {
      //   Header: "Cancel",
      //   show: PREPARATION_ORDER === 2 ? true : false,
      //   filterable: false,
      //   Cell: (props) => {
      //     return (
      //       <div>
      //         {props.original.statusPo === 350 ? (
      //           <MdCancel onClick={() => this.cancelPrepByIdPo(props.original)}>
      //             Cancel
      //           </MdCancel>
      //         ) : (
      //           ""
      //         )}
      //       </div>
      //     );
      //   },
      // },
      {
        Header: "Display",
        accessor: "display",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaDesktop style={{cursor:"pointer"}}onClick={() => this.displayHandler(props.original)}>
                Display
              </FaDesktop>
            </div>
          );
        },
      },
      {
        Header: "Display Comment",
        accessor: "display",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaCommentAlt style={{cursor:"pointer"}}
                onClick={() => this.CommentsEditionHandler(props.original)}
              >
                Comments
              </FaCommentAlt>
            </div>
          );
        },
      },
      {
        Header: "Display Customer",
        accessor: "display",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <IoPerson style={{cursor:"pointer"}}
                onClick={() => this.CustomerEditionHandler(props.original)}
              >
                Delete
              </IoPerson>
            </div>
          );
        },
      },

      {
        Header: "Display Box",
        accessor: "display",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaDiceD6 style={{cursor:"pointer"}}onClick={() => this.BoxEditionHandler(props.original)}>
                Product families
              </FaDiceD6>
            </div>
          );
        },
      },
      {
        Header: "Preparation Order ID",
        accessor: "idPo",
      },
      {
        Header: " Stuffing Type",
        accessor: "typePoStuffing",
        Cell: (props) => {
          return (
            <text>
              {props.original.typePoStuffing === 100 ? (
                <span>_Stuffing Affiliation_</span>
              ) : props.original.typePoStuffing === 0 ? (
                <span>_Non Plf_</span>
              ) : props.original.typePoStuffing === 200 ? (
                <span>_stuffing at Plf_</span>
              ) : null}
            </text>
          );
        },
      },

      // {
      //   Header: "Stuffing Type",
      //   accessor: "typePoStuffing",
      // },
      {
        Header: "Link",
        accessor: "plfLink",
      },
      {
        Header: "OBD1",
        accessor: "plfObd1",
      },
      {
        Header: "Preparation Order",
        accessor: "idPrepOrder",
      },
      {
        Header: "Preparation Order Customer Id",
        accessor: "idPrepOrderCustomer",
      },
      {
        Header: "Preparation Order L3 Id",
        accessor: "idPrepOrderL3",
      },
      {
        Header: " Preparation Order Status",
        accessor: "statusPo",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusPo === 200 ? (
                <span>_CubingError_</span>
              ) : props.original.statusPo === 350 ? (
                <span>_Launchable_</span>
              ) : props.original.statusPo === 400 ? (
                <span>Launched</span>
              ) : props.original.statusPo === 500 ? (
                <span>Prepared</span>
              ) : props.original.statusPo === 4000 ? (
                <span>Cancelled</span>
              ) : props.original.statusPo === 360 ? (
                <span>Selected</span>
              ) : props.original.statusPo === 424 ? (
                <span>In_Preparation</span>
              ) : null}
            </text>
          );
        },
      },
      // {
      //   Header: "Preparation Order Status",
      //   accessor: "statusPo",
      // },
      // {
      //   Header: "Shipping Status",
      //   accessor: "statusShipping",
      // },
      {
        Header: " Shipping Status",
        accessor: "statusShipping",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusShipping === -1 ? (
                <span>Created</span>
              ) : props.original.statusShipping === 1260 ? (
                <span>_At PLF_</span>
              ) : props.original.statusShipping === 1150 ? (
                <span>_Awaiting Shipment In Stock_</span>
              ) : props.original.statusShipping === 1200 ? (
                <span>Awaiting Shipment</span>
              ) : props.original.statusShipping === 1250 ? (
                <span>_Shipped to be confirmed_</span>
              ) : props.original.statusShipping === 2000 ? (
                <span>Shipped</span>
              ) : props.original.statusShipping === 4000 ? (
                <span>Cancelled</span>
              ) : props.original.statusShipping === 1100 ? (
                <span>_Palletised_</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: " Preparation Order Type",
        accessor: "typePo",
        Cell: (props) => {
          return (
            <text>
              {props.original.typePo === 100 ? <span>_Standard_</span> : null}
            </text>
          );
        },
      },
      // {
      //   Header: "Preparation Order Type",
      //   accessor: "typePo",
      // },
      {
        Header: "PO Preparation Warehouse",
        accessor: "warehousePreparationIds",
      },
      {
        Header: "Company",
        accessor: "idCompany",
      },
      {
        Header: " Preparation status",
        accessor: "statusPrep",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusPrep === -1 ? (
                <span>_NonRelevant_</span>
              ) : null}
            </text>
          );
        },
      },
      // {
      //   Header: "Preparation Status",
      //   accessor: "statusPrep",
      // },
      {
        Header: "Urgency",
        accessor: "urgency",
      },
      {
        Header: "Printing Language",
        accessor: "printingLanguage",
      },
      {
        Header: "Order Taken Date",
        accessor: "orderTakenDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.orderTakenDate === undefined
                ? ""
                : props.original.orderTakenDate === null
                ? ""
                : props.original.orderTakenDate === ""
                ? ""
                : props.original.orderTakenDate
                    .replace("T", " ")
                    // .substring(
                    //   0,
                    //   props.original.orderTakenDate.lastIndexOf(".")
                    // )
              }
            </span>
          );
        },
      },
      {
        Header: "Desired Preparation Date",
        accessor: "dsiredPreparationDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.dsiredPreparationDate === undefined
                ? ""
                : props.original.dsiredPreparationDate === null
                ? ""
                : props.original.dsiredPreparationDate === ""
                ? ""
                : props.original.dsiredPreparationDate
                    .replace("T", " ")
                    // .substring(
                    //   0,
                    //   props.original.dsiredPreparationDate.lastIndexOf(".")
                    // )
              }
            </span>
          );
        },
      },
      {
        Header: "Desired Delivery Date",
        accessor: "desiredDeliveryDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.desiredDeliveryDate === undefined
                ? ""
                : props.original.desiredDeliveryDate === null
                ? ""
                : props.original.desiredDeliveryDate === ""
                ? ""
                : props.original.desiredDeliveryDate
                    .replace("T", " ")
                    // .substring(
                    //   0,
                    //   props.original.desiredDeliveryDate.lastIndexOf(".")
                    // )
              }
            </span>
          );
        },
      },
      {
        Header: "Customer Desired Delivery Date",
        accessor: "desiredDeliveryDateClient",
        Cell: (props) => {
          return (
            <span>
              {props.original.desiredDeliveryDateClient === undefined
                ? ""
                : props.original.desiredDeliveryDateClient === null
                ? ""
                : props.original.desiredDeliveryDateClient === ""
                ? ""
                : props.original.desiredDeliveryDateClient
                    .replace("T", " ")
              }
            </span>
          );
        },
      },
      {
        Header: "Workflow Status",
        accessor: "statusPoWf",
      },
      {
        Header: "Trailers Affected",
        accessor: "zNbOfTrailersAff",
      },
      // {
      //   Header: "Cancel",
      //   accessor: "Delete",
      //   filterable: false,
      //   Cell: (props) => {
      //     return (
      //       <div>
      //         <ImCross onClick={() => this.deleteHandler()}>Delete</ImCross>
      //       </div>
      //     );
      //   },
      // },
      {
        Header: "Cancel",
        show: PREPARATION_ORDER === 2 ? true : false,
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              {props.original.statusPo === 350 ? (
                <ImCross onClick={() => this.cancelPrepByIdPo(props.original)}>
                  Cancel
                </ImCross>
              ) : (
                ""
              )}
            </div>
          );
        },
      },
      {
        Header: "Display Trailer",
        accessor: "display",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaCubes
                onClick={() => this.TrailerEditionHandler(props.original)}
              >
                Display
              </FaCubes>
            </div>
          );
        },
      },

      {
        Header: "Version",
        accessor: "versionLock",
      },
      {
        Header: "Modified The",
        accessor: "mUserName",
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
        Header: "Container Shipping line",
        accessor: "zContShipLine",
      },
      {
        Header: "Number of Trailers",
        accessor: "zNbOfTrailers",
      },
      {
        Header: "ETA Date",
        accessor: "zEtaDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.zEtaDate === undefined
                ? ""
                : props.original.zEtaDate === null
                ? ""
                : props.original.zEtaDate === ""
                ? ""
                : props.original.zEtaDate
                    // 
              }
            </span>
          );
        },
      },
      {
        Header: "Transport Plan",
        accessor: "zTrspPlan",
      },
      {
        Header: "Vessel",
        accessor: "zVessel",
      },
      {
        Header: "Transport Company",
        accessor: "zTransCo",
      },
      {
        Header: "Saudi Kayan Order Id",
        accessor: "zSkOrderId",
      },
      {
        Header: "Saudi Kayan Delivery Id",
        accessor: "zSkDelivId",
      },
      {
        Header: "Saudi Kayan Shipment Id",
        accessor: "zSkShipId",
      },
      {
        Header: "Sabic Order Id",
        accessor: "zSabicOrderId",
      },
      {
        Header: "Sabic Delivery Id",
        accessor: "zSabicDelivId",
      },
      {
        Header: "Sabic Shipment Id",
        accessor: "zSabicShipId",
      },
      {
        Header: "Shipping Point",
        accessor: "zShipPoint",
      },
      {
        Header: "Voyage",
        accessor: "zVoyage",
      },
      {
        Header: "Destination",
        accessor: "zDest",
      },
      {
        Header: "SAP shipment number",
        accessor: "zSapShipmentNumber",
      },
    ];

    const columnshipping = [
      {
        Header: "Technical ID",
        accessor: "idPrepOrder",
      },
      {
        Header: "Carrier",
        accessor: "idCarrier",
      },
      {
        Header: "Carrier Recieved",
        accessor: "idCarrierReceived",
      },
      {
        Header: "Dispatch Mode",
        accessor: "idDm",
      },
      {
        Header: "Dispatch Mode Recieved",
        accessor: "idDmReceived",
      },
      {
        Header: "Means of Transport",
        accessor: "meansOfTransport",
      },
      {
        Header: "Location",
        accessor: "idLocation",
      },
      {
        Header: " PalletisationType",
        accessor: "typePalettisation",
        Cell: (props) => {
          return (
            <text>
              {props.original.typePalettisation === -1 ? (
                <span>_Non Relevant_</span>
              ) : props.original.typePalettisation === 300 ? (
                <span>Trailer</span>
              ) : props.original.typePalettisation === 100 ? (
                <span>_Without_</span>
              ) : props.original.typePalettisation === 200 ? (
                <span>Palettisation</span>
              ) : null}
            </text>
          );
        },
      },

      // {
      //   Header: "Palletisation Type",
      //   accessor: "typePalettisation",
      // },
      {
        Header: "Gate",
        accessor: "idGate",
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
        accessor: "mUserName",
      },
    ];

    return (
      <React.Fragment>
        {this.state.orderEdit === true || OrderEditData.length !== 0 ? (
          <OrderEdit
            editClosehandler={this.editClosehandler}
            data2={this.state.data2}
          />
        ) : this.state.isDisplay === true || OrderDisplayData.length !== 0 ? (
          <OrderDisplay
            isdisplaydata={this.state.isdisplaydata}
            displayCloseHandler={this.displayCloseHandler}
          />
        ) : this.state.shipping === true || ShippingDisplayData.length !== 0 ? (
          <ShippingDisplay
            shippingArr={this.state.shippingArr}
            shippingCloseHandler={this.shippingCloseHandler}
          />
        ) : this.state.families === true || FamiliesEditionData.length !== 0 ? (
          <ProductFamiliesEdition
            FamiliesArr={this.state.FamiliesArr}
            familieCloseHandler={this.familieCloseHandler}
          />
        ) : this.state.comments === true || OrderCommentsData.length !== 0 ? (
          <OrderComments
            commentsArr={this.state.commentsArr}
            commentCloseHandler={this.commentCloseHandler}
          />
        ) : this.state.customer === true || OrderCustomerData.length !== 0 ? (
          <OrderCustomer
            customerArr={this.state.customerArr}
            customerCloseHandler={this.customerCloseHandler}
          />
        ) : this.state.box === true || OrderBoxData.length !== 0 ? (
          <OrderBox
            boxArr={this.state.boxArr}
            boxCloseHandler={this.boxCloseHandler}
          />
        ) : this.state.trailer === true || OrderTrailerData.length !== 0 ? (
          <OrderTrailer
            trailerArr={this.state.trailerArr}
            trailerCloseHandler={this.trailerCloseHandler}
          />
        ) : (
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
                  <a style={{cursor:"pointer"}}onClick={this.backHandler}>Preparation Order Search</a>
                </b>
              </u>{" "}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor:"pointer"}}>Preparation Order Management</a>
                </b>
              </u>
            </span>
            <br />
            <div class="row-xs-6 bottom-row ">
              <FaPrint

              //   onClick={() => this.edithandler(props.original)}
              ></FaPrint>{" "}
              <a style={{cursor:"pointer"}}>Print</a>{" "}
              <FaFileExport

              //   onClick={() => this.edithandler(props.original)}
              ></FaFileExport>{" "}
              <a style={{cursor:"pointer"}}>Export</a>{" "}
              {/* <Button outline color="secondary"  style={{marginLeft:"700px"}}
                      onClick={
                       this.shippingdisplayHandler
                      }
                    >
                      {" "}
                      Shipping Tab
                    </Button> */}
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "1",
                    })}
                    style={{cursor:"pointer"}}
                    onClick={() => {
                      this.toggle("1");
                    }}
                  >
                    Preparation
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: this.state.activeTab === "2",
                    })}
                    style={{cursor:"pointer"}}
                    onClick={() => {
                      this.toggle("2");
                    }}
                  >
                    Shipping
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  {/* <div style={{ height: "100%", backgroundColor: "yellow" }}>
                    <a
                      style={{
                        float: "right",
                        cursor: "pointer",
                        color: "blue",
                      }}
                      onClick={this.refreshHandler}
                    >
                      <u> Refresh</u>
                    </a>
                  </div> */}
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
                    data={
                      this.state.data.length === 0
                        ? this.props.data
                        : this.state.data
                    }
                    columns={columns}
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
              </TabContent>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default OrderList;
