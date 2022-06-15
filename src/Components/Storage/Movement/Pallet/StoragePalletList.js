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
  // getlistofRegionsRTWHEntities,
} from "../../../../store/Store";
import {
  palletMovementDataHandler,
  palletMovementData,
  palletMovementEditDataHandler,
  remover,
  storagepalletid,
  palletMovementEditData,
  palletMovementCriteria,
  getlistofRegionsRTWHEntities,
} from "../../../../store/Store";
import axios from "axios";
import StoragePalletEdit from "./StoragePalletEdit";
import { Label, Input } from "reactstrap";
import Swal from "sweetalert2";
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
const GetListOfAllPalletFilters =
  properties.Port + properties.getListofPalletMovement;
const getRegiondatabyregionid =
  properties.Port + properties.getRegiondatabyregionid;

const palletMovementConfirmValidation =
  properties.Port + properties.palletMovementConfirmValidation;
class StoragePalletList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containerid: [],
      cellType: "",
      region_id: "",
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
    };
  }

  componentDidMount = () => {
    console.log("com calling from lst page ", palletMovementData.length);
    console.log("com calling from lst tableData ", this.props.tableData);

    if (palletMovementData.length === 0) {
      console.log("if condition");
      this.setState({
        data: palletMovementData,
      });
    } else {
      console.log("else condition");
      this.setState(
        {
          data: palletMovementData,
          listofregions: getlistofRegionsRTWHEntities,
        },
        () => console.log("saving data in regions-->", this.state.listofregions)
      );
    }
  };

  backHandler = () => {
    console.log("calling back handler for list");
    // this.setState({missionEdit:false})
    remover(storagepalletid);
    this.props.backHandler();
  };

  refreshHandler = () => {
    console.log("refreshHandler calling");
    this.criteriaFilterMethod();
  };

  validateHandler = () => {
    if (this.state.containerid.length != 0) {
      this.setState({
        errormsg: "",
      });
      if (this.state.region_id != "") {
        this.setState({
          errormsg2: "",
          exceptionmsg: "",
        });
        Swal.fire({
          title: "Confirmation",
          text: "Do you confirm the container(s) movement?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "gray",
          cancelButtonColor: "gray",
          confirmButtonText: "Yes",
        }).then((result) => {
          if (result.value) {
            // axios.post(palletMovementConfirmValidation, this.state);{
            // }
            axios
              .post(palletMovementConfirmValidation, this.state)
              .then((response) => {
                this.criteriaFilterMethod();
                Swal.fire("Validated Successfully");
                console.log("response 200 successs");
              })

              .catch((error) => {
                console.log("pallllllet error", error);
                this.setState({
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

  onChange = (event) => {
    console.log("calling on change ");
    this.setState({
      region_id: event.target.value,
    });
    axios
      .post(getRegiondatabyregionid + event.target.value)

      .then((response) => {
        if (response.status === 200) {
          console.log("getListofRegionforRT==>", response.data);
          this.setState({
            listcelltype: response.data.listofcelltypandcellallocation,
            listcellAllocation: response.data.listofcelltypandcellallocation,
            listindex: response.data.listofdescindexList,
            listlevel: response.data.listofdesclevelList,
            listRegionDesciption: response.data.listofklsregiondesc,
            listaisle: response.data.listofdiscaisle,
            listcolumn: response.data.listofdisccolumn,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeHandler = (events) => {
    this.setState({
      [events.target.name]: events.target.value,
    });
  };

  criteriaFilterMethod = () => {
    console.log("testtttttttttttttt  api ", GetListOfAllPalletFilters);

    axios
      .post(GetListOfAllPalletFilters, palletMovementCriteria, {
        params: {
          limit: palletMovementCriteria.limit,
        },
      })

      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          palletMovementDataHandler(response.data);
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
    palletMovementEditDataHandler(props);
  };

  componentWillMount = () => {
    console.log("component will mount ");
    console.log("will calling from lst page ", palletMovementData);
    console.log(
      "com calling from lst page---------------------------mmmmm ",
      getlistofRegionsRTWHEntities
    );
    if (palletMovementData.length === 0) {
      this.setState({
        data: this.props.tableData,
        listofregions: this.props.listofregions,
      });
    } else {
      this.setState(
        {
          data: palletMovementData,
          listofregions: getlistofRegionsRTWHEntities,
        },
        () => console.log("saving data in regions-->", this.state.listofregions)
      );
    }
  };

  selectAll = (events) => {
    console.log("Selected all change =>", events.target.checked);
    console.log("Selected all change =>", this.state.data.containerNo);
    const array = [];
    if (events.target.checked === true) {
      this.setState(
        {
          containerid: [],
        },
        () => {
          for (let i = 0; i < this.state.data.length; i++) {
            array.push(this.state.data[i].containerNo);
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
        accessor: "id_CONTAINER_STK",
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
        accessor: "id_warehouse",
      },
      {
        Header: "Container No",
        accessor: "containerNo",
      },
      {
        Header: "Status",
        accessor: "status_container",
        Cell: (props) => {
          return (
            <text>
              {props.original.status_container === 50 ? (
                <span>CREATION_IN_PROGRESS</span>
              ) : props.original.status_container === 100 ? (
                <span>STATUS_CREATED</span>
              ) : props.original.status_container === 800 ? (
                <span>STATUS_DESTROYED</span>
              ) : props.original.status_container === 500 ? (
                <span>Validated</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Type",
        accessor: "type_container",
        Cell: (props) => {
          return (
            <text>
              {props.original.type_container === 100 ? (
                <span>PALLET</span>
              ) : props.original.type_container === 200 ? (
                <span>PRODUCT</span>
              ) : props.original.type_container === 400 ? (
                <span>SHIPPING_PALLET</span>
              ) : props.original.type_container === 500 ? (
                <span>BOX</span>
              ) : props.original.type_container === 510 ? (
                <span>BOX_SHIPPING</span>
              ) : props.original.type_container === 600 ? (
                <span>LOCATION</span>
              ) : props.original.type_container === 700 ? (
                <span>LOAD_COLLECTION</span>
              ) : props.original.type_container === 710 ? (
                <span>UNLOAD_COLLECTION</span>
              ) : props.original.type_container === 800 ? (
                <span>TRAILER</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Parent Container No",
        accessor: "id_container_father",
      },
      {
        Header: "Packaging Id",
        accessor: "id_packaging",
      },
      {
        Header: "Location",
        // accessor: "id_location",
        Cell: (props) => {
          return (
            <div>
              {props.original.id_location != null
                ? props.original.id_location.replace("19@", "")
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
        Header: "Version",
        accessor: "vlock",
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
        accessor: "modefiedusername",
      },
      {
        Header: "Movement Status",
        accessor: "status_mvt",
        Cell: (props) => {
          return (
            <text>
              {props.original.status_mvt === 100 ? (
                <span>IMMOBILE</span>
              ) : props.original.status_mvt === 200 ? (
                <span>TRANSFER</span>
              ) : props.original.status_mvt === 300 ? (
                <span>MVT_QTY</span>
              ) : null}
            </text>
          );
        },
      },

      {
        Header: "Batch",
        accessor: "batch",
      },
      {
        Header: "Grade",
        accessor: "z_grade",
      },
      {
        Header: "Reference",
        accessor: "id_REFERENCE",
      },
    ];
    return (
      <React.Fragment>
        {this.state.palletEdit === true ||
        palletMovementEditData.length !== 0 ? (
          <StoragePalletEdit
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
                    Pallet Movement Criteria
                  </a>
                </b>
              </u>
              {""}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a>Pallet Movement List</a>
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
                      console.log("selected==>", rowInfo.original.containerNo);
                      var a = this.state.containerid.indexOf(
                        rowInfo.original.containerNo
                      );

                      if (a == -1) {
                        this.setState(
                          {
                            containerid: [
                              ...this.state.containerid,
                              rowInfo.original.containerNo,
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
                              (data) => data === rowInfo.original.containerNo
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
                    //       rowInfo.original.containerNo
                    //     ) != -1
                    //       ? "#C8C8C8"
                    //       : "",
                    // },
                  };
                }}
              />
              {this.state.region_id === "" ? (
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
                    name="region_id"
                    onChange={this.onChange}
                    bsSize="sm"
                    disabled={PALLET !== 2}
                  >
                    <option>----select----</option>
                    {this.state.listofregions.map((data) => (
                      <option value={data.id_region}>{data.wh_desc}</option>
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
                    <option>--select--</option>
                    {this.state.listcellAllocation.map((data) => (
                      <option value={data.allocation_cell}>
                        {data.type_cell === 100
                          ? "_Stock_"
                          : data.type_cell === 500
                          ? "_Transit_"
                          : ""}
                      </option>
                    ))}
                  </Input>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
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
                    <option>--select--</option>
                    {this.state.listcellAllocation.map((data) => (
                      <option value={data.allocation_cell}>
                        {data.allocation_cell === 3
                          ? "_infinite_"
                          : data.allocation_cell === 2
                          ? "Rack"
                          : ""}
                      </option>
                    ))}
                  </Input>
                </Col>

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
                    <option>--select--</option>
                    {this.state.listRegionDesciption.map((data) => (
                      <option value={data.desc_key} key={data.desc_key}>
                        {data.desc_key}
                      </option>
                    ))}
                  </Input>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
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
                    <option>--select--</option>
                    {this.state.listaisle.map((data) => (
                      <option key={data} value={data}>
                        {data}
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
                    <option>--select--</option>
                    {this.state.listcolumn.map((data) => (
                      <option key={data} value={data}>
                        {data}
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
                    <option>--select--</option>
                    {this.state.listlevel.map((data) => (
                      <option value={data} key={data}>
                        {data}
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
                    <option>--select--</option>
                    {this.state.listindex.map((data) => (
                      <option value={data} key={data}>
                        {data}
                      </option>
                    ))}
                  </Input>
                </Col>
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
      </React.Fragment>
    );
  }
}

export default StoragePalletList;
