import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { FaCalendarCheck, FaEdit, FaFileExport, FaPrint } from "react-icons/fa";
import { Container, Row, Col, Button } from "reactstrap";
import {
  StoragePalletData,
  StoragePalletEditHandler,
  StoragePalletEditdata,
  // remover,
  Palletmovementcritaria,
  StoragePalletHandler,
  // getlistofPalletDestructionRegion,
} from "../../../../store/Store";
import {
  palletDestructionDataHandler,
  palletDestructionData,
  palletDestructionEditDataHandler,
  remover,
  palletdestructionid,
  palletDestructionEditData,
  palletDestructionCriteria,
  getlistofPalletDestructionRegion,
} from "../../../../store/Store";
import axios from "axios";
import PalletToDestructionEdit from "./PalletToDestructionEdit";
import { Label, Input } from "reactstrap";
import Swal from "sweetalert2";
import Loader from "react-loader-spinner";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaCog, FaSdCard } from "react-icons/fa";
import { FaRegShareSquare } from "react-icons/fa";
import { FaRegListAlt } from "react-icons/fa";
import { properties } from "../../../../Properties/Properties";
import { PALLET } from "../../../../store/RoleBased";

const getListOfDesctructionContainers =
  properties.Port + properties.getListofDestructionContainers;
const getRegionDescForPalletDestruction =
  properties.Port + properties.getRegionDescForPalletDestruction;
const getListOfMotiveStockForPalletDestruction =
  properties.Port + properties.getListOfMotiveStockForPalletDestruction;
const palletDestructionConfirmValidation =
  properties.Port + properties.palletDestructionConfirmValidation;
class PalletToDestructionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containerid: [],
      cellType: "",
      idRegion: "",
      idMotive: "",
      cellAllocation: "",
      regionDesc: "",
      aisle: "",
      column: "",
      level: "",
      index: "",
      version: "",
      data: [],
      palletEdit: false,
      palletEditArray: [],
      listofregions: [],
      listofmotives: [],
      listcelltype: [],
      listcellAllocation: [],
      listRegionDesciption: [],
      listaisle: [],
      listcolumn: [],
      listlevel: [],
      listindex: [],
      selected: [],
      data2: [],
      errormsg: "",
      errormsg2: "",
      exceptionmsg: "",
      dataToN3: true,
      comment: "",
      loading: false,
    };
  }

  componentDidMount = () => {
    console.log("com calling from lst page ", palletDestructionData.length);
    console.log("com calling from lst tableData ", this.props.tableData);
    this.regionDescDataHandler();
    this.motiveDataHandler();
    if (palletDestructionData.length === 0) {
      console.log("if condition");
      this.setState({
        data: palletDestructionData,
      });
    } else {
      console.log("else condition");
      this.setState(
        {
          data: palletDestructionData,
          listofregions: getlistofPalletDestructionRegion,
          idRegion: getlistofPalletDestructionRegion[0].idRegion,
        },
        () => console.log("saving data in regions-->", this.state.listofregions)
      );
    }
  };

  backHandler = () => {
    console.log("calling back handler for list");
    // this.setState({missionEdit:false})
    remover(palletdestructionid);
    this.props.backHandler();
  };

  refreshHandler = () => {
    console.log("refreshHandler calling");
    this.criteriaFilterMethod();
  };

  motiveDataHandler = () => {
    console.log("calling motiveDataHandler");
    axios
      .get(getListOfMotiveStockForPalletDestruction)

      .then((response) => {
        if (response.status === 200) {
          console.log("getListofRegionforPalletDestruction==>", response.data);
          this.setState({
            listofmotives: response.data
          });
          if(this.state.listofmotives.length !=0){
            this.setState({
              idMotive: this.state.listofmotives[0].idMotive
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  regionDescDataHandler = () => {
    console.log("calling regionDescDataHandler");
    const listindex = [];
    const listlevel = [];
    const listRegionDesciption = [];
    const listaisle = [];
    const listcolumn = [];
    axios
      .get(getRegionDescForPalletDestruction)

      .then((response) => {
        if (response.status === 200) {
          console.log("getListofRegionforPalletDestruction==>", response.data);
          if(response.data.length !=0){
            listRegionDesciption.push(response.data[0]);
            listaisle.push(response.data[1]);
            listcolumn.push(response.data[2]);
            listlevel.push(response.data[3]);
            listindex.push(response.data[4]);
            this.setState({
              // listcelltype: response.data.listofcelltypandcellallocation,
              // listcellAllocation: response.data.listofcelltypandcellallocation,
              regionDesc: response.data[0].desc_key,
              aisle: response.data[1].desc_key,
              column: response.data[2].desc_key,
              level: response.data[3].desc_key,
              index: response.data[4].desc_key,
              listindex: listindex,
              listlevel: listlevel,
              listRegionDesciption: listRegionDesciption,
              listaisle: listaisle,
              listcolumn: listcolumn,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  validateHandler = () => {
    if (this.state.containerid.length != 0) {
      this.setState({
        errormsg: "",
      });
      if (this.state.idRegion != "") {
        this.setState({
          errormsg2: "",
          exceptionmsg: "",
        });
        Swal.fire({
          title: "Confirmation",
          text: "Do you confirm the container(s) destruction?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "gray",
          cancelButtonColor: "gray",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.value) {
            this.setState({
              loading: true,
            });
            // axios.post(palletDestructionConfirmValidation, this.state);{
            // }
            axios
              .post(palletDestructionConfirmValidation, this.state)
              .then((response) => {
                this.criteriaFilterMethod();
                this.setState({
                  loading: false,
                  containerid: [],
                  comment:"",
                  dataToN3: true,
                });
                Swal.fire("Validated Successfully");
                console.log("response 200 successs");
              })

              .catch((error) => {
                console.log("pallllllet error", error);
                this.setState({
                  loading: false,
                  exceptionmsg: error.response.data.message,
                });
              });
          }
        });
      } else {
        this.setState({
          errormsg2: "Please select Region.",
        });
      }
    } else {
      this.setState({
        errormsg: "Please select atleast one row.",
      });
    }
  };

  checkboxhandler = (event) => {
    if (event.target.checked === false) {
          this.setState(
            {
              dataToN3: false,
            }
          );
    }else {
      this.setState(
        {
          dataToN3: true,
        }
      );
    }
  };

  onChange = (event) => {
    // console.log("calling on change ");
    // this.setState({
    //   idRegion: event.target.value,
    // });
    // axios
    //   .post(getRegiondatabyregionid + event.target.value)

    //   .then((response) => {
    //     if (response.status === 200) {
    //       console.log("getListofRegionforRT==>", response.data);
    //       this.setState({
    //         listcelltype: response.data.listofcelltypandcellallocation,
    //         listcellAllocation: response.data.listofcelltypandcellallocation,
    //         listindex: response.data.listofdescindexList,
    //         listlevel: response.data.listofdesclevelList,
    //         listRegionDesciption: response.data.listofklsregiondesc,
    //         listaisle: response.data.listofdiscaisle,
    //         listcolumn: response.data.listofdisccolumn,
    //       });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  changeHandler = (events) => {
    this.setState({
      [events.target.name]: events.target.value,
    });
  };

  criteriaFilterMethod = () => {
    console.log("testtttttttttttttt  api ", getListOfDesctructionContainers);

    axios
      .post(getListOfDesctructionContainers, palletDestructionCriteria, {
        params: {
          limit: palletDestructionCriteria.limit,
        },
      })

      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          palletDestructionDataHandler(response.data);
          this.setState(
            {
              data: response.data,
            },
            () => console.log("testing data", this.state.data)
          );

          this.componentDidMount();
        } else {
          this.setState({
            // prodList: true,
            data: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editCloseHandler = () => {
    this.setState({
      palletEdit: false,
    });
  };

  editHandler = (props) => {
    console.log("check props dataaaaaa", props);
    this.setState({
      palletEdit: true,
      data2: props,
    });
    palletDestructionEditDataHandler(props);
  };

  componentWillMount = () => {
    console.log("component will mount ");
    console.log("will calling from lst page ", palletDestructionData);
    console.log(
      "com calling from lst page---------------------------mmmmm ",
      getlistofPalletDestructionRegion
    );
    if (palletDestructionData.length === 0) {
      this.setState({
        data: this.props.tableData,
        listofregions: this.props.listofregions,
      });
    } else {
      this.setState(
        {
          data: palletDestructionData,
          listofregions: getlistofPalletDestructionRegion,
        },
        () => console.log("saving data in regions-->", this.state.listofregions)
      );
    }
  };

  selectAll = (events) => {
    console.log("Selected all change =>", events.target.checked);
    console.log("Selected all change =>", this.state.data.idContainer);
    const array = [];
    if (events.target.checked === true) {
      this.setState(
        {
          containerid: [],
        },
        () => {
          for (let i = 0; i < this.state.data.length; i++) {
            array.push(this.state.data[i].idContainer);
          }
          this.setState(
            {
              containerid: array,
            },
            () => console.log("selected all=>", this.state.containerid)
          );
        }
      );
    } else {
      this.setState({
        containerid: [],
      });
    }
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
        // accessor: "Edit",
        filterable: false,
        Cell: (props) => {
          return (
            <FaEdit
              style={{ height: "1em", width: "1em", cursor: "pointer" }}
              color="primary"
              onClick={() => this.editHandler(props.original)}
            >
              Edit
            </FaEdit>
          );
        },
      },

      {
        Header: "Stock Container No.",
        accessor: "idContainerStk",
        //   filterable:false,
        //   Cell: (props) => {
        //     return (
        //       <div>
        //         <FaTrashAlt
        //           style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
        //           onClick={() => this.deletehanler(props.original)}
        //         >
        //           Delete
        //         </FaTrashAlt>
        //       </div>
        //     );
        //   },
      },
      {
        Header: "Warehouse",
        accessor: "idWarehouse",
      },
      {
        Header: "Container No",
        accessor: "idContainer",
      },
      {
        Header: "Status",
        accessor: "statusContainer",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusContainer === 50 ? (
                <span>CREATION_IN_PROGRESS</span>
              ) : props.original.statusContainer === 100 ? (
                <span>STATUS_CREATED</span>
              ) : props.original.statusContainer === 800 ? (
                <span>STATUS_DESTROYED</span>
              ) : props.original.statusContainer === 500 ? (
                <span>Validated</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Type",
        accessor: "typeContainer",
        Cell: (props) => {
          return (
            <text>
              {props.original.typeContainer === 100 ? (
                <span>PALLET</span>
              ) : props.original.typeContainer === 200 ? (
                <span>PRODUCT</span>
              ) : props.original.typeContainer === 400 ? (
                <span>SHIPPING_PALLET</span>
              ) : props.original.typeContainer === 500 ? (
                <span>BOX</span>
              ) : props.original.typeContainer === 510 ? (
                <span>BOX_SHIPPING</span>
              ) : props.original.typeContainer === 600 ? (
                <span>LOCATION</span>
              ) : props.original.typeContainer === 700 ? (
                <span>LOAD_COLLECTION</span>
              ) : props.original.typeContainer === 710 ? (
                <span>UNLOAD_COLLECTION</span>
              ) : props.original.typeContainer === 800 ? (
                <span>TRAILER</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Parent Container No",
        accessor: "idContainerFather",
      },
      {
        Header: "Packaging Id",
        accessor: "idPackaging",
      },
      {
        Header: "Location",
        // accessor: "id_location",
        Cell: (props) => {
          return (
            <div>
              {props.original.idLocation != null
                ? props.original.idLocation.replace("19@", "")
                : ""}
            </div>
          );
        },
      },
      {
        Header: "Height(m)",
        accessor: "height",
      },
      {
        Header: "Weight(kg)",
        accessor: "weight",
      },
      {
        Header: "Movement Status",
        accessor: "statusMvt",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusMvt === 100 ? (
                <span>IMMOBILE</span>
              ) : props.original.statusMvt === 200 ? (
                <span>TRANSFER</span>
              ) : props.original.statusMvt === 300 ? (
                <span>MVT_QTY</span>
              ) : null}
            </text>
          );
        },
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
        Header: "Modified By",
        accessor: "mUsername",
      },
    ];
    return (
      <React.Fragment>

{this.state.loading ? (
            <div className="">
              <div className="row">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                  <div className="col spinner_item p-5">
                    <Loader
                      type="BallTriangle"
                      color="#00BFFF"
                      height={120}
                      width={100}
                      // visible={loading}
                    />
                  </div>
                </div>
                <div class="col-md-4"></div>
              </div>
            </div>
          ) : (<div>

        {this.state.palletEdit === true ||
          palletDestructionEditData.length !== 0 ? (
          <PalletToDestructionEdit
            editCloseHandler={this.editCloseHandler}
            data2={this.state.data2}
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
                  <a style={{ cursor: "pointer" }} onClick={this.backHandler}>
                    Pallets to destruction movements criteria
                  </a>
                </b>
              </u>
              {""}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a>Pallets to destruction movements list</a>
                </b>
              </u>
            </span>
            <br />
            <div class="row-xs-6 bottom-row ">
              <input type="checkbox" onChange={this.selectAll}></input>{" "}
              <a>Select All </a>{" "}
              <FaCalendarCheck

              //   onClick={() => this.edithandler(props.original)}
              ></FaCalendarCheck>{" "}
              {/* <button >Configure</button> */}
              <a>Validate Selection</a>{" "}
              <FaPrint

              //   onClick={() => this.edithandler(props.original)}
              ></FaPrint>{" "}
              <a>Print</a>{" "}
              <FaFileExport

              //   onClick={() => this.edithandler(props.original)}
              ></FaFileExport>{" "}
              <a>Export</a>
              <Button
                onClick={this.refreshHandler}
                style={{ marginLeft: "20px", float: "right" }}
              >
                Refresh
              </Button>
            </div>
            <br />{" "}
            <span
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              {this.state.exceptionmsg}
            </span>
            <div>
              {" "}
              <ReactTable
                className="-striped -highlight "
                //   data={this.state.data}
                data={this.state.data}
                columns={columns}
                defaultPageSize={5}
                showPaginationTop={true}
                filterable
                defaultFilterMethod={this.filterCaseInsensitive}
                getTrProps={(state, rowInfo, column) => {
                  return {
                    onClick: (e) => {
                      console.log("selected==>", rowInfo.original.idContainer);
                      var a = this.state.containerid.indexOf(
                        rowInfo.original.idContainer
                      );

                      if (a == -1) {
                        this.setState(
                          {
                            containerid: [
                              ...this.state.containerid,
                              rowInfo.original.idContainer,
                            ],
                          },
                          () => {
                            console.log(
                              "containerid=>",
                              this.state.containerid
                            );
                          }
                        );
                        // Pass props to the React component
                      }

                      var array = this.state.containerid;

                      if (a != -1) {
                        array.splice(a, 1);
                        this.setState({ containerid: array });
                      }
                    },
                    style: {
                      background:
                        rowInfo !== undefined
                          ? this.state.containerid.findIndex(
                            (data) => data === rowInfo.original.idContainer
                          ) != -1
                            ? "#C8C8C8"
                            : ""
                          : null,
                    },
                    // #393740 - Lighter, selected row
                    // #302f36 - Darker, not selected row
                    // style: {
                    //   background:
                    //     this.state.containerid.indexOf(
                    //       rowInfo.original.idContainer
                    //     ) != -1
                    //       ? "#C8C8C8"
                    //       : "",
                    // },
                  };
                }}
              />
              <div>
                <hr />
                <Row style={{ marginTop: "10px" }}>
                  <Col>
                    <Label>Motive</Label>
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="select"
                      name="idMotive"
                      onChange={this.changeHandler}
                      bsSize="sm"
                      disabled={PALLET !== 2}
                    >
                      {/* <option>----select----</option> */}
                      {this.state.listofmotives.map((data) => (
                        <option value={data.idMotive}>{data.description}</option>
                      ))}
                    </Input>
                  </Col>

                  <Col></Col>
                  <Col></Col>
                </Row>

                <Row style={{ marginTop: "10px" }}>
                  <Col>
                    <Label>Comment</Label>
                  </Col>

                  <Col>
                  <Input
                    name="comment"
                    value={this.state.comment}
                    onChange={this.changeHandler}
                    bsSize="sm"
                  ></Input>
                  </Col>
                  <Col></Col>

                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px" }}>
                  <Col>
                    <Label>Send Data To Sap</Label>
                  </Col>

                  <Col>
                    <input
                      type="checkbox"
                      name="dataToN3"
                      value={this.state.dataToN3}
                      onChange={this.checkboxhandler}
                      checked={this.state.dataToN3}
                    ></input>
                  </Col>
                  <Col></Col>

                  <Col> </Col>
                </Row>
                <div style={{ marginTop: "20px", color: "gray",
                    fontWeight: "bold",}}><span >&bull;  Location Destination</span></div>
                <hr />
              </div>
              {this.state.idRegion === "" ? (
                <span
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {this.state.errormsg2}
                </span>
              ) : (
                ""
              )}
              <Row style={{ marginTop: "10px" }}>
                {/* <Col>
                  <Label>Region</Label>
                </Col>

                <Col>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={this.onChange}
                    bsSize="sm"
                  >
                    <option>----select----</option>
                    {this.state.listofregions.map((data) => (
                      <option value={data.id_region}>{data.wh_desc}</option>
                    ))}
                  </Input>
                </Col>
                <Col></Col>

                <Col> </Col>
                <Col>
                  <Label>Cell Type</Label>
                </Col>
                <Col>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option>=</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>
                <Col></Col>
                <Col> </Col> */}
                <Col>
                  <Label>Region</Label>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="idRegion"
                    onChange={this.onChange}
                    bsSize="sm"
                    disabled={PALLET !== 2}
                  >
                    {/* <option>----select----</option> */}
                    {this.state.listofregions.map((data) => (
                      <option value={data.idRegion}>{data.whDesc}</option>
                    ))}
                  </Input>
                </Col>
                <Col>
                  <Label>Cell Type</Label>
                </Col>
                <Col>
                  <Input
                    type="select"
                    name="cellType"
                    value={this.state.cellType}
                    bsSize="sm"
                    onChange={this.changeHandler}
                    disabled={PALLET !== 2}
                  >
                    <option value="">_Destruction_</option>
                    {/* {this.state.listcellAllocation.map((data) => (
                      <option value={data.allocation_cell}>
                        {data.type_cell === 100
                          ? "_Stock_"
                          : data.type_cell === 500
                          ? "_Transit_"
                          : ""}
                      </option>
                    ))} */}
                  </Input>
                </Col>
                <Col>
                  <Label>Cell Allocation</Label>
                </Col>

                <Col>
                  <Input
                    type="select"
                    name="cellAllocation"
                    value={this.state.cellAllocation}
                    bsSize="sm"
                    onChange={this.changeHandler}
                    disabled={PALLET !== 2}
                  >
                    <option value="3">_Infinite_</option>
                    {/* {this.state.listcellAllocation.map((data) => (
                      <option value={data.allocation_cell}>
                        {data.allocation_cell === 3
                          ? "_infinite_"
                          : data.allocation_cell === 2
                          ? "Rack"
                          : ""}
                      </option>
                    ))} */}
                  </Input>
                </Col>
               
              </Row>
              <Row style={{ marginTop: "10px" }}>


                <Col>
                  <Label>Region Description</Label>
                </Col>
                <Col>
                  <Input
                    type="select"
                    onChange={this.changeHandler}
                    // value={this.state.listRegionDesciption}
                    name="regionDesc"
                    bsSize="sm"
                    value={this.state.regionDesc}
                    disabled={PALLET !== 2}
                  >
                    {/* <option>--select--</option> */}
                    {this.state.listRegionDesciption.map((data) => (
                      <option value={data.desc_key}>
                        {data.desc_key}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col>
                  <Label>Aisle</Label>
                </Col>

                <Col>
                  <Input
                    type="select"
                    name="aisle"
                    VALUE={this.state.aisle}
                    onChange={this.changeHandler}
                    bsSize="sm"
                    disabled={PALLET !== 2}
                  >
                    {/* <option>--select--</option> */}
                    {this.state.listaisle.map((data) => (
                      <option value={data.desc_key}>
                        {data.desc_key}
                      </option>
                    ))}
                  </Input>
                </Col>

                <Col>
                  <Label>Column</Label>
                </Col>
                <Col>
                  <Input
                    type="select"
                    name="column"
                    onChange={this.changeHandler}
                    value={this.state.column}
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    disabled={PALLET !== 2}
                  >
                    {/* <option>--select--</option> */}
                    {this.state.listcolumn.map((data) => (
                      <option value={data.desc_key}>
                        {data.desc_key}
                      </option>
                    ))}
                  </Input>
                </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
              <Col>
                  <Label>Level</Label>
                </Col>

                <Col>
                  <Input
                    type="select"
                    name="level"
                    onChange={this.changeHandler}
                    value={this.state.level}
                    bsSize="sm"
                    disabled={PALLET !== 2}
                  >
                    {/* <option>--select--</option> */}
                    {this.state.listlevel.map((data) => (
                      <option value={data.desc_key} >
                        {data.desc_key}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col>
                  <Label>Index</Label>
                </Col>
                <Col>
                  <Input
                    type="select"
                    name="index"
                    value={this.state.index}
                    onChange={this.changeHandler}
                    bsSize="sm"
                    disabled={PALLET !== 2}
                  >
                    {/* <option>--select--</option> */}
                    {this.state.listindex.map((data) => (
                      <option value={data.desc_key}>
                        {data.desc_key}
                      </option>
                    ))}
                  </Input>
                </Col>
                <Col></Col>
                <Col></Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>



              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  {PALLET === 2 ? (
                    <Button
                      style={{ marginBottom: "10px" }}
                      onClick={() => this.validateHandler()}
                    >
                      {" "}
                      Validate
                    </Button>
                  ) : (
                    ""
                  )}
                  &nbsp; &nbsp;
                  {this.state.containerid.length === 0 ? (
                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      {this.state.errormsg}
                    </span>
                  ) : (
                    ""
                  )}
                </Col>
                <Col></Col>

                {/* <Col></Col>
                <Col></Col> */}
                {/* <Col></Col>
                <Col></Col> */}
              </Row>
            </div>
          </div>
        )}
        </div>
        )}
      </React.Fragment>
    );
  }
}

export default PalletToDestructionList;
