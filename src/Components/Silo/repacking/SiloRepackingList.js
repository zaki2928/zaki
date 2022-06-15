import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { IoIosRefreshCircle, IoIosRemoveCircleOutline, IoIosSettings } from "react-icons/io";
import { MdRestore } from "react-icons/md";
import { MdPrint } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import { SiloLoadingFilterdata, remover, repackingid, SiloLoadingEditdata, siloLoadingEditHandler, siloEditdata } from "../../../store/Store";
import { FaCheck, FaEdit, FaReadme, FaDesktop } from 'react-icons/fa';
import Silo_Loading_Edit from "../silo-Loading/Silo_Loading_Edit";
import { Repackingdata, RepackingHandler } from "../../../store/Store";
import EditRepacking from "../../Silo/repacking/EditRepacking";
import DisplayLineList from "../../Silo/repacking/DisplayLineList";
import Swal from "sweetalert2";
import {
  RepackingEditHandler,
  RepackingEditdata,
  Displaylistdata,
  RepackingDisplaylineHandler,
  RepackingdataCriteria
} from "../../../store/Store";

import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
  IoSearch,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import axios from "axios";
import { properties } from "../../../Properties/Properties"

const getListOfRepackingLineView = properties.Port + properties.getListOfRepackingLineView

class SiloRepackingList extends Component {

  saveHandler() {
    Swal.fire({
      title: 'Confirmation?',
      text: "Do u really want to retreatment of the silo loading!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'gray',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(

          'Done',
          'success'
        )
      }
    })
  }


  saveHandler2() {
    Swal.fire({
      title: 'Confirmation?',
      text: "Do u confirm the line closure!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'gray',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes, do it!',
      cancelButtonText: "No"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(

          'Done',
          'success'
        )
      }
    })

  }



  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data2: [],
      display: false,
      displayarr: [],
      edit: false,
    };
  }


  componentDidMount = () => {

    if (Repackingdata.length !== 0) {

      this.setState({
        data: Repackingdata

      })

    } else {

      this.setState({
        data: this.props.data

      })

    }

  }

  refreshhandler = () => {
    console.log("referesh handler calling");
    this.criteriaFilterMethod();
  };

  criteriaFilterMethod = () => {
    console.log("testtttttttttttttt  api ", getListOfRepackingLineView);
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(getListOfRepackingLineView, RepackingdataCriteria, {
        params: {
          limit: RepackingdataCriteria.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
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

  

  backHandler = () => {
    console.log("silo repacking list backhandler")
    remover(repackingid)
    this.props.backHandler()

  }



  editHandler = (props) => {
    this.setState({
      edit: true,
      data2: props,
    })
    RepackingEditHandler(props)
  }


  displayHandler = (props) => {
    this.setState({
      display: true,
      displayarr: props,
    })
    RepackingDisplaylineHandler(props)
  }







  // getRepackingLineById = (id) => {
  //   console.log(" calling getRePackingLineSICLById", id);

  //   axios
  //     .post("http://localhost:8080/repacking/getRePackingLineSICLById/" + id)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         console.log("getRePackingLineSICLById", response.data);
  //         // this.setState({
  //         //   data: response.data,
  //         // });
  //         // NestedLogisticUnitHandler(response.data);
  //         // this.props.additem("Logistic Units");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };










  editClosehandler = () => {
    this.setState({
      edit: false,
    })
  }


  DisplayCloseHandler = () => {
    this.setState({
      display: false,
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
            <FaEdit

              onClick={() => this.editHandler(props.original)}
            >
              Edit
            </FaEdit>

          );
        },
      },

      {
        Header: "Display",
        accessor: "display",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaDesktop onClick={() => this.displayHandler(props.original)}>
                Display
              </FaDesktop>
            </div>
          );
        },
      },



      // {
      //   Header: "ID",
      //   accessor: "idRepacking",


      // },
      // {
      //   Header: "Company",
      //   accessor: "idCompany",
      // },
      {
        Header: "Folder ID",
        accessor: "idFolder",
      },



      {
        Header: "Status",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusRepackingLine === 1000 ? <span>Closed</span> : props.original.statusRepackingLine === 200 ? <span>In coherent</span> :
                props.original.statusRepackingLine === 100 ? <span>Created</span> : props.original.statusRepackingLine === 400 ? <span>In progress</span> :
                  props.original.statusRepackingLine === 1100 ? <span>Closed & Rejected</span> : null}
            </text>
          );
        },

      },
      {
        Header: "Product",
        accessor: "idReferenceTo",
      },


      {
        Header: "Batch",
        accessor: "batch",
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
        Header: " Modified By",
        accessor: "musername",
      },



      {
        Header: "Version",
        accessor: "versionLock",
      },


    ];

    return (
      <React.Fragment>
        {this.state.edit === true || RepackingEditdata.length !== 0 ? (
          <EditRepacking editClosehandler={this.editClosehandler}
            data2={this.state.data2}
          />

        ) :

          this.state.display === true || Displaylistdata.length !== 0 ? (
            <DisplayLineList
              displayarr={this.state.displayarr}
              DisplayCloseHandler={this.DisplayCloseHandler}
            />
          ) :
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
                    <a onClick={this.backHandler}>Repacking search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Repackings</a>
                  </b>
                </u>

              </span>
              <br />
              <br />
              
              {/* <div> */}
              <Button style={{ float: "right", marginTop: "-38px" }} color="secondary" 
                onClick={this.refreshhandler}
              >Refresh</Button>
              <ReactTable
                className="-striped -highlight "
                //   data={this.state.data}
                data={this.state.data.length === 0
                  ? this.props.data
                  : this.state.data
                }

                columns={columns}
                defaultPageSize={5}
                //showPaginationTop= {true}
                filterable
                defaultFilterMethod={this.filterCaseInsensitive}
              />
              {/* </div> */}


              <Row style={{
                marginTop: "10px",

              }}>


                <br />

              </Row>
            </div>}


      </React.Fragment>
    );
  }
}

export default SiloRepackingList;