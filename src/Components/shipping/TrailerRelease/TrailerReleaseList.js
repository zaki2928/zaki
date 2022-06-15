import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { TrailerReleaseData, remover, TrailerReleaseFilterHandler, TrailerReleaseCriteriaHandler, TrailerReleaseCriteria } from "../../../store/Store";
import { FaPrint, FaFileExport, FaCalendarCheck, FaEdit } from "react-icons/fa";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import Swal from "sweetalert2";
import { properties } from "../../../Properties/Properties";
import axios from "axios";
import { TRAILER_RELEASE } from "../../../store/RoleBased";

const releaseTrailer = properties.Port + properties.releaseTrailer;
const getListOfTrailerReleaseViewFilter = properties.Port + properties.getListOfTrailerReleaseViewFilter

class TrailerReleaseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listFmkBeans: [],
      data: [],
      Beans: [],
      errormsg:"",
      msg:"",
    };
  }

  componentDidMount = () => {
    if (TrailerReleaseData.length !== 0) {
      this.setState({
        data: TrailerReleaseData,
      });
    } else {
      this.setState({
        data: this.props.data,
      });
    }
  };

  validateHandler = () => {
    if(this.state.listFmkBeans.length !=0){
      this.setState({
        errormsg: ""
      });
    
    Swal.fire({
      title: "Confirmation",
      text: "Do you confirm to release trailer?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.value) {
        this.releaseTrailer();
        console.log("confirmmmmmmmmmmmmm", result);
        // this.cellAccessModeficationmethod
        Swal.fire("Modified!", "Your data has been Modified.", "success");
      }
    });
  }
  else{
    this.setState({
      errormsg :"Please select atleast one row."
    });
  }
};

  releaseTrailer = () => {
    console.log(
      "ibrahim inside trauiler releaseeeeeeee****************",
      this.state.listFmkBeans
    );
    const data = {
      listFmkBeans: this.state.listFmkBeans,
    };
    console.log("shahidddddddddddddddd", data);
    axios
      .post(releaseTrailer, data)
      .then((response) => {
        console.log("response success");
        if (response.status === 200) {
          this.setState({
            msg:"trailer released successfully!!!"
          })
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  selectAll = (events) => {
    console.log("Selected all change =>", events.target.checked);
    const array = [];
    if (events.target.checked === true) {
      for (let i = 0; i < this.state.data.length; i++) {
        array.push(this.state.data[i]);
      }
      this.setState(
        {
          Beans: array,
        },
        () => console.log("selected all=>", this.state.Beans)
      );
    } else {
      this.setState({
        Beans: [],
      });
    }
  };

  addData = (data) => {
    console.log("add ata calling ", data);
    const Beans = {
      trailRelizList: data,

      consolidationAreaPosition: data,
      containerNumber: data,
      driverName: data,
      expectedContainerNumber: data,
      idCompany: data,
      idContainerPrpSilo: data,
      idContainerSh: data,
      idContanerShCLient: data,
      idEmptyWeigthWb: data,
      idPrepLineN3: data,
      idPrepOrder: data,
      idRecordingGate: data,
      idSap: data,
      idWeighingBridge: data,
      idWeightWb: data,
      id_carrier: data,
      id_container: data,
      id_dm: data,
      id_gate_loaded: data,
      id_po_single: data,
      id_ship: data,
      id_wave_single: data,
      incomingDate: data,
      listFilterBean: [],

      attribute: data,
      operation: data,
      value: data,

      mDate: data,
      mUsername: data,
      outgoingDate: data,
      refidTagHistory: data,
      rfidTag: data,
      seal: data,
      statusClient: data,
      statusWeighing: data,
      status_sh: data,
      totalContainerNumber: data,
      trailerIdentification: data,
      trailerNumber: data,
      trailerNumberHistory: data,
      trailerPreparationType: data,
      trailerType: data,
      typeAssignmentRecGate: data,
      type_pal_father: data,
      type_palletisation: data,
      versionLock: data,
      wbEmptyWeight: data,
      wbWeight: data,
    };

    this.state.listOfMissionBeanViews.push(Beans);
    //  this.setState({

    //  })
    console.log("check datra===>", this.state.listOfMissionBeanViews);
  };

  backHandler = () => {
    console.log("calling back handler for list");
    remover("Trailer Release");
    this.props.backHandler();
  };

  refreshHandler=()=>{
    console.log("refreshHandler calling")
    this.criteriaFilterMethod()
  }

  criteriaFilterMethod = () => {
    console.log("testtttttttttttttt  api  ibrahim");
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(getListOfTrailerReleaseViewFilter, TrailerReleaseCriteria, {
        params: {
          limit: TrailerReleaseCriteria.limit,
        },
      })

      .then((response) => {
        console.log("uzzzzzzmmmmmaaaaaa=========>")
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success++++++++++++", response.data);
          this.setState({
            data: response.data,
            trailRelizList: true,

          });
          TrailerReleaseFilterHandler(response.data);
          TrailerReleaseCriteriaHandler(criteria);
          // CellAccessCriteriaHandler(criteria);
        } else {
          this.setState({
            trailRelizList: true,
            data: [],
          });
          TrailerReleaseFilterHandler(response.data)
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
    const { msg } = this.state;
    const columns = [
      {
        Header: "ID",
        accessor: "idContanerShCLient",
      },
      {
        Header: "Company",
        accessor: "idCompany",
      },
      {
        Header: "SAP id",
        accessor: "idSap",
      },
      {
        Header: "Trailer identification",
        accessor: "trailerIdentification",
      },
      {
        Header: "RFID tag",
        accessor: "rfidTag",
      },
      {
        Header: "Driver name",
        accessor: "driverName",
      },

      {
        Header: "Trailer type",
        accessor: "trailerType",
        Cell: (props) => {
          return (
            <text>
              {props.original.trailerType === 10 ? (
                <span>_20 feet container_</span>
              ) : props.original.trailerType === 20 ? (
                <span>_40 feet container_</span>
              ) : props.original.trailerType === 30 ? (
                <span>_20 and 40 feet mixed_</span>
              ) : props.original.trailerType === 40 ? (
                <span>_Sea bulk_</span>
              ) : props.original.trailerType === 50 ? (
                <span>_Truck_</span>
              ) : props.original.trailerType === 60 ? (
                <span>_Bulk Truck_</span>
              ) 
               : null}
            </text>
          );
        },
      },
      {
        Header: "Preparation type",
        accessor: "trailerPreparationType",
        Cell: (props) => {
          return (
            <text>
              {props.original.trailerPreparationType === 0 ? (
                <span>_STD_</span>
              ) : props.original.trailerPreparationType === 100 ? (
                <span>_PLF_</span>
              ) 
               : null}
            </text>
          );
        },
      },
      {
        Header: "Trailer number",
        accessor: "trailerNumber",
      },
      {
        Header: "Status",
        accessor: "statusClient",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusClient === 0 ? (
                <span>_Created_</span>
              ) : props.original.statusClient === 10 ? (
                <span>_Order Linked_</span>
              ) : props.original.statusClient === 15 ? (
                <span>_Gate allocated_</span>
              ) : props.original.statusClient === 20 ? (
                <span>_Site entrance arrival_</span>
              ) : props.original.statusClient === 25 ? (
                <span>_Gate arrival_</span>
              ) : props.original.statusClient === 30 ? (
                <span>_Begin load_</span>
              ) : props.original.statusClient === 40 ? (
                <span>_Closed_</span>
              ) : props.original.statusClient === 45 ? (
                <span>_Stored_</span>
              ) : props.original.statusClient === 60 ? (
                <span>_Shipped to be confirmed_</span>
              ) : props.original.statusClient === 65 ? (
                <span>_At PLF_</span>
              ) : props.original.statusClient === 80 ? (
                <span>_Shipped_</span>
              ) : props.original.statusClient === 100 ? (
                <span>_Cancelled_</span>
              ) : props.original.statusClient === 110 ? (
                <span>_Destroyed_</span>
              ) 
               : null}
            </text>
          );
        },
      },
      {
        Header: "Preparation order",
        accessor: "idPrepOrder",
      },
      {
        Header: "Recording gate",
        accessor: "recordingGate",
      },

      //chekkk
      {
        Header: "Weighing status",
        accessor: "statusWeighing",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusWeighing === 100 ? (
                <span>_To be weighed_</span>
              ) : props.original.statusWeighing === 200 ? (
                <span>_Weighed in_</span>
              ) : props.original.statusWeighing === 300 ? (
                <span>_Weighed out_</span>
              ) : props.original.statusWeighing === 400 ? (
                <span>_Not to be weighed_</span>
              ) 
               : null}
            </text>
          );
        },
      },
      {
        Header: "Reception line ID",
        accessor: "idPrepLineN3",
      },
      {
        Header: "Position in consolidation area",
        accessor: "consolidationAreaPosition",
      },
      {
        Header: "Expected container number",
        accessor: "expectedContainerNumber",
      },
      {
        Header: "Seal",
        accessor: "seal",
      },
      {
        Header: "Version",
        accessor: "versionLock",
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
      {
        Header: "Gate",
        accessor: "id_gate_loaded",
      },
    ];
    return (
      <React.Fragment>
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
            &#8680;
            <u>
              {" "}
              <b>
                {" "}
                <a style={{cursor:"pointer"}}onClick={this.backHandler}>Trailer Release Filter</a>
              </b>
            </u>
            &#8680;
            <u>
              {" "}
              <b>
                {" "}
                <a style={{cursor:"pointer"}}>Trailer Release List</a>
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
        </div>
        <a href="text">
          <b style={{cursor:"pointer"}}>Validate selection</b>
        </a>

        {/* <ReactTable
              className="-striped -highlight "
              // data={this.state.data}
              data={this.state.data.length === 0
                ? this.props.data : this.state.data
              }
              columns={columns}
              defaultPageSize={5}
              showPaginationTop= {true}
              filterable
            />
             */}

        <div style={{ marginTop: "5px" }} className="row-xs-6 bottom-row ">
        <b>
              <span
                style={{
                  color:
                    this.state.msg === "atleast 1 row must be selected"
                      ? "red"
                      : "green",
                }}
              >
                <h6>{msg}</h6>
              </span>
            </b>
          <input type="checkbox" id="myid" onChange={this.selectAll}></input>{" "}
          <a style={{cursor:"pointer"}}>Select All </a>{" "}
          <FaCalendarCheck

          //   onClick={() => this.edithandler(props.original)}
          ></FaCalendarCheck>{" "}
          {/* <button >Configure</button> */}
          {/* <a>Validate Selection</a>{" "} */}
          <FaPrint

          //   onClick={() => this.edithandler(props.original)}
          ></FaPrint>{" "}
          <a style={{cursor:"pointer"}}>Print</a>{" "}
          <FaFileExport

          //   onClick={() => this.edithandler(props.original)}
          ></FaFileExport>{" "}
          <a style={{cursor:"pointer"}}>Export</a>
        </div>
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
          getTrProps={(state, rowInfo, column) => {
            return {
              onClick: (e) => {
                console.log("selected==>", rowInfo);
                var a = this.state.listFmkBeans.findIndex(
                  (data) => rowInfo.original.idContanerShCLient === data.id
                );

                console.log("prointing AAAA", a);
                if (a === -1) {
                  const data = {
                    id: rowInfo.original.idContanerShCLient,
                    version: rowInfo.original.versionLock,
                  };
                  this.state.listFmkBeans.push(data);
                  this.setState(
                    {
                      listFilterBean: [...this.state.listFmkBeans, data],
                    },
                    () => {
                      console.log(
                        "this.state.beansssss",
                        this.state.listFmkBeans
                      );
                    }
                  );
                  // Pass props to the React component
                }

                var array = this.state.listFmkBeans;

                if (a != -1) {
                  array.splice(a, 1);
                  this.setState({ listFmkBeans: array }, () => {
                    console.log(
                      "this.state.beansssss",
                      this.state.listFmkBeans
                    );
                  });
                }
              },
              // #393740 - Lighter, selected row
              // #302f36 - Darker, not selected row
              style: {
                background:
                  rowInfo !== undefined
                    ? this.state.listFmkBeans.findIndex(
                        (data) =>
                          data.id === rowInfo.original.idContanerShCLient
                      ) != -1
                      ? "#C8C8C8"
                      : ""
                    : null,
              },
            };
          }}
        />

        <br />
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid grey" }}
        >
{ TRAILER_RELEASE===2 ?
          <div style={{ marginTop: "5px", marginBottom: "5px" }}>
            <Button onClick={this.validateHandler}> Release</Button>
            <Col>{
                    this.state.Beans.length ===0 ?<span style={{
                      color:"red",
                      fontWeight: "bold"
                    }}>
                    {
                    this.state.errormsg
                    }
                    </span>:""
                  }
          </Col>
          </div>
:''}
        </Container>
        <br />
      </React.Fragment>
    );
  }
}

export default TrailerReleaseList;
