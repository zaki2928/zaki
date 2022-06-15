import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { Wavedata, SelectedWavedata } from "../../../store/Store";
import { FaDesktop, FaPlay, FaTrashAlt } from "react-icons/fa";
import { AiFillCloseSquare } from "react-icons/ai";
import Wave_Edit from "../wave/Wave_Edit";
import {
  waveEditHandler,
  SelectedWaveCriteria,
  WaveEditdata,
  wavedisplaydata,
  wavedisplayHandler,
  WaveCriteria,
  remover,
  waveshippingdata,
  waveShippingHandler,
  CreateWaveData,
  WaveAddlinesHandler,
  WaveAddlinesdata,
  createWaveHandler,
  CreateWaveDataHandler,
  removeWaveAddlinesHandler,
} from "../../../store/Store";
import { properties } from "../../../Properties/Properties";
import axios from "axios";
import { GoDiffAdded } from "react-icons/go";
import Wave_Display from "../wave/Wave_Display";
import Wave_Display2 from "./Wave_Display2";
import WaveListShipping from "../wave/WaveListShipping";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FcCheckmark } from "react-icons/fc";
import { IoIosCheckbox } from "react-icons/io";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import {
  FaEdit,
  FaPrint,
  FaFileExport,
  FaFileSignature,
  FaAdn,
} from "react-icons/fa";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import WavePrepOdrFilter from "./WavePrepOdrFilter";
import WaveLaunchModal1 from "./WaveLaunchModal1";
import WaveLaunchModal2 from "./WaveLaunchModal2";
import { WAVE } from "../../../store/RoleBased";
const getDetailsForWaveLaunch =
  properties.Port + properties.getDetailsForWaveLaunch;
const getListOfWaveklp = properties.Port + properties.getListOfWaveklp;
const getListOfGatesForWaveLaunch =
  properties.Port + properties.getListOfGatesForWaveLaunch;
const getSalesTermforWaveLaunch =
  properties.Port + properties.getSalesTermforWaveLaunch;
const getPreparationOrderbyWaveId =
  properties.Port + properties.getPreparationOrderbyWaveId;
const deleteWave = properties.Port + properties.deleteWave;
const getWaveShbyIdWave = properties.Port + properties.getWaveShbyIdWave;
const getWaveDetailsbyIdWave = properties.Port + properties.getWaveDetailsbyIdWave;

class Wave_List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selecteddata: [],
      data: "",
      isAddlines: false,
      isEdit: false,
      newWave: false,
      isDisplay: false,
      isdisplaydata: [],
      WaveAddlinesdata: [],
      isShipping: false,
      isShippingdata: [],
      activeTab: "1",
      modalIsOpen1: false,
      modalIsOpen2: false,
      waveData: "",
      preparationOrder: [],
      errormsg: "",
      waveshippingdata: "",
    };
    console.log("wave list Called");
    this.toggle = this.toggle.bind(this);
  }
  toggle(tab) {
    if (this.state.activeTab != tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  openModalIsOpen1 = () => {
    console.log("first modal is open length", this.state.waveData.length);
    this.setState({
      modalIsOpen1: true,
      errormsg: "Ok, the wave can be launched",
    });
  };
  openModalIsclose1 = () => {
    console.log("first modal is open");
    this.setState({
      modalIsOpen1: false,
    });
  };
  openModalIsOpen2 = () => {
    console.log("first modal is open");
    this.setState({
      modalIsOpen2: true,
    });
  };
  openModalIsclose2 = () => {
    console.log("first modal is open");
    this.setState({
      modalIsOpen2: false,
    });
  };

  toggle(tab) {
    if (this.state.activeTab != tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  newcloseHandler = (data) => {
    console.log("newclose handler calling ", data);
    this.setState({
      newWave: false,
      //data: data,
    });
    this.refreshHandler();
  };
  createWaveHandler = (props) => {
    CreateWaveDataHandler(props);
    this.setState({
      newWave: true,
    });
    this.state.isdisplaydata.push(props);
  };
  saveHandler() {
    Swal.fire({
      title: "Confirmation?",
      text: "Do u really want to delete wave details!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Done", "success");
      }
    });
  }

  backHandler = () => {
    console.log("calling back handler ");
    remover("Waves");
    this.props.backHandler();
  };

  componentDidMount = () => {
    this.SelectedWaveDatamethod();

    console.log(
      "shahid+++++++++++++++++++++++++++++++++++++ selecteddata props",
      this.props.selecteddata
    );
    console.log(
      "++++++++++++++++++++++++++++++++++++++++++++++ SelectedWavedata global",
      SelectedWavedata
    );

    if (Wavedata.length !== 0) {
      this.setState({
        data: Wavedata,
        selecteddata: SelectedWavedata,
      });
    } else {
      this.setState({
        data: this.props.data,
      });
    }
  };

  getListOfGatesForWaveLaunch = () => {
    console.log(getListOfGatesForWaveLaunch);

    axios
      .post(getListOfGatesForWaveLaunch)
      .then((response) => {
        if (response.status === 200) {
          console.log(
            "resposne success for getListOfGatesForWaveLaunch",
            response.data
          );
          this.setState({
            // message: "Data Saved Successfully",
            idWarehouseArr: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getSalesTermforWaveLaunch = () => {
    console.log(getSalesTermforWaveLaunch);

    axios
      .post(getSalesTermforWaveLaunch)
      .then((response) => {
        if (response.status === 200) {
          console.log(
            "resposne success for getSalesTermforWaveLaunch",
            response.data
          );
          this.setState({
            // message: "Data Saved Successfully",
            idWarehouseArr: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  SelectedWaveDatamethod = () => {
    if (SelectedWavedata.length !== 0) {
      this.setState({
        data: SelectedWavedata,
      });
    } else {
      this.setState({
        data: this.props.data,
      });
    }
  };
  EditHandler = (props) => {
    waveEditHandler(props);
    this.setState({
      isEdit: true,
    });
  };
  EditCloseHandler = (props) => {
    this.setState({
      isEdit: false,
    });
  };
  AddlinesHandler = (props) => {
    console.log(
      " edittttttttttttttttttttttttttt addlines handler calling",
      props
    );
    //need to pas data for add lines from here
    this.getShDataByIdWave(props.idWave);
    WaveAddlinesHandler(props);

    // this.state.WaveAddlinesdata.push(props);
  };

  getShDataByIdWave = (id) => {
    console.log("getShDataByIdWave", id);
    axios
      .post(getWaveShbyIdWave + id)
      .then((res) => {
        if (res.status === 200) {
          console.log("response succcccccccccccccccccccc", res.data);
          this.setState({
            waveshippingdata: res.data,
            isAddlines: true,
          });
        } else {
          this.setState({
            isAddlines: true,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  AddlinesCloseHandler = (props) => {
    console.log("edit handlerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr calling");
    removeWaveAddlinesHandler();
    this.setState({
      isAddlines: false,
    });
    this.refreshHandler();
  };

  // DisplayHandler = (props) => {
  //   console.log("Arqum display handler calling");
  //   wavedisplayHandler(props);
  //   this.setState({
  //     isDisplay: true,
  //   });
  //   this.state.isdisplaydata.push(props);
  // };

  DisplayHandler = (props) => {
    console.log("zb display handler calling for wave details");
    axios
      .post(getWaveDetailsbyIdWave + props.idWave)
      .then((res) => {
        if (res.status === 200) {
          console.log("response succcccccccccccccccccccc", res.data);
          wavedisplayHandler(res.data);
          console.log("response written in global variable 1");
          this.setState({
            isDisplay: true,
            isdisplaydata:[],
          });
          this.state.isdisplaydata.push(res.data);
          console.log("response written in global variable 2");
        } else {
          this.setState({
            isDisplay: true,
          });
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  waveshippingHandler = () => {
    console.log("Arqum Wave shippng handler calling");
    waveShippingHandler(Wavedata);
    this.setState({
      isShipping: true,
    });
    this.state.isShippingdata.push(Wavedata);
  };

  DisplayCloseHandler = () => {
    console.log("Arqum edit handler calling", wavedisplaydata.length);
    this.setState({
      isDisplay: false,
    });
  };

  WaveShippingCloseHandler = () => {
    console.log("Arqum edit handler calling", waveshippingdata.length);
    this.setState({
      isShipping: false,
    });
  };

  getPreparationOrderByIdWave = (waveId) => {
    console.log("calling getpreparationorderbyidwave");
    axios
      .post(getPreparationOrderbyWaveId + waveId)
      .then((response) => {
        if (response.status === 200) {
          console.log(
            "response seccess getPreparationOrderbyWaveId",
            response.data
          );
          this.state.preparationOrder.push(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteHandler(props) {
    console.log("ID wave----------------", props.idWave);
    Swal.fire({
      title: "Confirmation",
      text: "Do you confirm the deletion?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Delete",
    }).then((result) => {
      console.log("swal result", result);
      if (result.value) {
        axios
          .delete(deleteWave + props.idWave)
          .then((response) => {
            console.log("my data", response);
            if (response.status === 200) {
              console.log("response  success");
              this.refreshHandler();
            }
          })
          .catch((error) => {
            console.log(error);
          });
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      }
    });
  }

  launchWave = (props) => {
    console.log(`wave data`, getDetailsForWaveLaunch);
    console.log(`wave props`, props);
    this.getPreparationOrderByIdWave(props.idWave);
    axios
      .post(getDetailsForWaveLaunch + props.idWave)
      .then((response) => {
        if (response.status === 200) {
          console.log(
            "response seccess resultdetaillist",
            response.data.resultDetailList
          );
          this.setState({
            waveData: response.data.resultDetailList,
          });

          this.openModalIsOpen1();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onWhClick = () => {
    console.log("onclick warhouse");
    this.openModalIsclose1();
    this.openModalIsOpen2();
  };

  onOkClick = () => {
    console.log("onclick warhouse");
    this.openModalIsclose1();
    this.openModalIsclose2();
    this.refreshHandler();
  };

  refreshHandler = () => {
    console.log("checking vale------------------------------>>", WaveCriteria);

    axios
      .post(getListOfWaveklp, WaveCriteria, {
        params: {
          limit: WaveCriteria.limit,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log(
            "resposne successsssssssssssss===================>",
            response.data
          );

          this.setState({
            data: response.data,
          });
        } else {
          this.setState({
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

        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaEdit
                style={{ cursor: "pointer" }}
                onClick={() => this.EditHandler(props.original)}
              >
                Delete
              </FaEdit>
            </div>
          );
        },
      },

      {
        Header: "Display Line",

        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaDesktop
                style={{ cursor: "pointer" }}
                onClick={() => this.DisplayHandler(props.original)}
              >
                Delete
              </FaDesktop>
            </div>
          );
        },
      },
      {
        Header: "Wave No",
        accessor: "idWave",
      },
      {
        Header: " Status",
        accessor: "statusWave",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusWave === 100 ? (
                <span>Created</span>
              ) : props.original.statusWave === 350 ? (
                <span>_Launchable_</span>
              ) : props.original.statusWave === 380 ? (
                <span>_Calculated_</span>
              ) : props.original.statusWave === 370 ? (
                <span>_Pre Calculated_</span>
              ) : props.original.statusWave === 400 ? (
                <span>Launched</span>
              ) : props.original.statusWave === 500 ? (
                <span>Prepared</span>
              ) : props.original.statusWave === 424 ? (
                <span>_InPreparation_</span>
              ) : props.original.statusWave === 4000 ? (
                <span>Cancelled</span>
              ) : props.original.statusWave === 355 ? (
                <span>_Error_</span>
              ) : null}
            </text>
          );
        },
      },

      {
        Header: "Shipping status",

        Cell: (props) => {
          return (
            <text>
              {props.original.statusShippingWave === -1 ? (
                <span>Created</span>
              ) : props.original.statusShippingWave === 1260 ? (
                <span>_At PLF_</span>
              ) : props.original.statusShippingWave === 1150 ? (
                <span>_Awaiting Shipment In Stock_</span>
              ) : props.original.statusShippingWave === 1190 ? (
                <span>_Pre Awaiting Shipment_</span>
              ) : props.original.statusShippingWave === 1200 ? (
                <span>_Awaiting Shipment_</span>
              ) : props.original.statusShippingWave === 1250 ? (
                <span>_Shipped to be confirmed_</span>
              ) : props.original.statusShippingWave === 2000 ? (
                <span>Shipped</span>
              ) : props.original.statusShippingWave === 4000 ? (
                <span>Cancelled</span>
              ) : props.original.statusShippingWave === 1100 ? (
                <span>_Palletised_</span>
              ) : null}
            </text>
          );
        },
      },

      {
        Header: "Workflow status",
        accessor: "statusWaveWf",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusWaveWf === 0 ? (
                <span>_Without_</span>
              ) : props.original.statusWaveWf === 100 ? (
                <span>_Launching_</span>
              ) : (
                ""
              )}
            </text>
          );
        },
      },
      {
        Header: "Comment",
        accessor: "commentaryIc",
      },
      {
        Header: "No of Pos",
        accessor: "noOfPos",
      },
      {
        Header: "Number of unlaunced boxes",
        accessor: "nbUnlaunchedBoxes",
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
      {
        Header: "Delete",
        maxWidth: 50,
        show: WAVE === 2 ? true : false,
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              {props.original.noOfPos === 0 ? (
                <FaTrashAlt
                  size={17}
                  style={{ cursor: "pointer" }}
                  onClick={() => this.deleteHandler(props.original)}
                />
              ) : (
                ""
              )}
            </div>
          );
        },
      },
      {
        Header: "Add Lines",
        maxWidth: 70,
        show: WAVE === 2 ? true : false,
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              {props.original.statusWave === 400 ||
              props.original.statusWave === 500 ? (
                ""
              ) : (
                <GoDiffAdded
                  size={20}
                  style={{ cursor: "pointer" }}
                  onClick={() => this.AddlinesHandler(props.original)}
                ></GoDiffAdded>
              )}
            </div>
          );
        },
      },
      {
        Header: "Launch",
        maxWidth: 50,
        show: WAVE === 2 ? true : false,
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              {props.original.statusWave === 400 ||
              props.original.statusWave === 500 ? (
                ""
              ) : props.original.noOfPos !== 0 ? (
                <FcCheckmark
                  size={22}
                  style={{ cursor: "pointer" }}
                  onClick={() => this.launchWave(props.original)}
                />
              ) : (
                ""
              )}
            </div>
          );
        },
      },
    ];

    const columnshipping = [
      {
        Header: "Wave No",
        accessor: "idWave",
      },
      {
        Header: "Carrier",
        accessor: "idCarrier",
      },

      {
        Header: "Dispatch Mode ",
        accessor: "idDm",
      },

      {
        Header: "Modified Date",
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
        {this.state.newWave === true || CreateWaveData.length !== 0 ? (
          <Wave_Display2 newcloseHandler={this.newcloseHandler} />
        ) : this.state.isEdit === true || WaveEditdata.length !== 0 ? (
          <Wave_Edit EditCloseHandler={this.EditCloseHandler} />
        ) : this.state.isDisplay === true || wavedisplaydata.length !== 0 ? (
          <Wave_Display
            isdisplaydata={this.state.isdisplaydata}
            DisplayCloseHandler={this.DisplayCloseHandler}
          />
        ) : this.state.isShipping === true || waveshippingdata.length !== 0 ? (
          <WaveListShipping
            isShippingdata={this.state.isShippingdata}
            WaveShippingCloseHandler={this.WaveShippingCloseHandler}
          />
        ) : this.state.isAddlines === true || WaveAddlinesdata.length !== 0 ? (
          <WavePrepOdrFilter
            AddlinesCloseHandler={this.AddlinesCloseHandler}
            waveshippingdata={this.state.waveshippingdata}
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
                  <a style={{cursor:"pointer"}}onClick={this.backHandler}>Wave search</a>
                </b>
              </u>
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor:"pointer"}}>Wave list</a>
                </b>
              </u>
            </span>
            <br />

            <div
              style={{ marginTop: "10px", marginBottom: "5px" }}
              class="row-xs-6 bottom-row "
            >
              {WAVE === 2 ? (
                <div>
                  <FaFileSignature
                    onClick={this.createWaveHandler}
                    //   onClick={() => this.edithandler(props.original)}
                  ></FaFileSignature>{" "}
                  {/* <button >Configure</button> */}
                  <span
                    onClick={this.createWaveHandler}
                    style={{ cursor: "pointer" }}
                  >
                    New
                  </span>{" "}
                </div>
              ) : (
                ""
              )}
              <FaPrint

              //   onClick={() => this.edithandler(props.original)}
              ></FaPrint>{" "}
              <a style={{cursor:"pointer"}}>Print</a>{" "}
              <FaPrint

              //   onClick={() => this.edithandler(props.original)}
              ></FaPrint>{" "}
              <a style={{cursor:"pointer"}}>Configure list</a>{" "}
              <FaPrint

              //   onClick={() => this.edithandler(props.original)}
              ></FaPrint>{" "}
              <a style={{cursor:"pointer"}}>Reset sort</a>{" "}
              <FaFileExport

              //   onClick={() => this.edithandler(props.original)}
              ></FaFileExport>{" "}
              <a style={{cursor:"pointer"}}>Export</a>{" "}
            </div>
            <button
              style={{
                float: "right",
                cursor: "pointer",
                height: "30px",
                width: "60px",
                borderRadius: "5px",
              }}
              onClick={this.refreshHandler}
            >
              Refresh
            </button>
            <br></br>
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
                  Preparation
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
                  Shipping
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
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
                  defaultFIlterMethod={this.filterCaseInsensitive}
                />
              </TabPane>

              <TabPane tabId="2">
                <WaveLaunchModal1
                  data={this.state.waveData}
                  modalIsOpen1={this.state.modalIsOpen1}
                  openModalIsclose1={this.openModalIsclose1}
                  onWhClick={this.onWhClick}
                />
                <WaveLaunchModal2
                  preparationOrder={this.state.preparationOrder}
                  onOkClick={this.onOkClick}
                  data={this.state.waveData}
                  modalIsOpen2={this.state.modalIsOpen2}
                />
                <ReactTable
                  className="-striped -highlight "
                  data={
                    this.state.selecteddata.length === 0
                      ? this.props.selecteddata
                      : this.state.selecteddata
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
        )}
      </React.Fragment>
    );
  }
}

export default Wave_List;
