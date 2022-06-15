import React, { Component } from 'react'
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";

import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
  IoSearch,
} from "react-icons/io5";
import { FaCheck, FaEdit, FaDesktop } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import { Uncubeddata,UncubedHandler,UncubedCriteria, UncubedOrderDisplayData, UncubedOrderDisplayHandler, remover, uncubedid } from '../../../store/Store';
import UncubedDisplayList from './UncubedDisplayList';
import axios from "axios";
import Swal from "sweetalert2";
import { properties } from '../../../Properties/Properties';
const getListOfUncubedPOLineFilterCriteriaa = properties.Port + properties.getListOfUncubedPOLineFilterCriteriaa

export default class UncubedList extends Component {


  

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data2: [],
      uncubedDisplay: [],
      isuncubeddisplaydata: [],
      display: false,
      displayarr: [],
      edit: false,
    };
  }

 refreshHandler=()=>{
console.log("refresh handler callling")
this.criteriaFilterMethod();
 }

 criteriaFilterMethod = () => {
  console.log("testttingggggggggggggggggggggggggggggg calling");
  axios
    .post(getListOfUncubedPOLineFilterCriteriaa, UncubedCriteria, {
      params: {
        limit: UncubedCriteria.limit,
      },
    })
    
    .then((response) => {
      if (response.status === 200 && response.data.length !== 0) {
        console.log("resposne successsssssssssssss", response.data);
        this.setState({
          data: response.data,
          

        });
        UncubedHandler(response.data);
        
      } else {
        
        this.setState({
          data: [],

        });
        UncubedHandler(response.data);
        
      }
    })
    .catch((error) => {
      console.log(error);
    });
};


  // saveHandler() {
  //   Swal.fire({
  //     title: 'Confirmation?',
  //     text: "Do u really want to retreatment of the silo loading!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: 'gray',
  //     cancelButtonColor: 'gray',
  //     confirmButtonText: 'Yes, do it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire(

  //         'Done',
  //         'success'
  //       )
  //     }
  //   })
  // }


  // saveHandler2() {
  //   Swal.fire({
  //     title: 'Confirmation?',
  //     text: "Do u confirm the line closure!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: 'gray',
  //     cancelButtonColor: 'gray',
  //     confirmButtonText: 'Yes, do it!',
  //     cancelButtonText: "No"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire(

  //         'Done',
  //         'success'
  //       )
  //     }
  //   })

  // }

  componentDidMount = () => {
    this.refreshHandler();
    console.log("com calling ftom list page==>l", Uncubeddata)
    console.log("com calling ftom list page props==>", this.props.data)
    if (Uncubeddata.length !== 0) {
      this.setState({
        data: Uncubeddata
      })
    } else {
      this.setState({
        data: this.props.data
      })
    }
  }
  backHandler = () => {
    console.log("calling back handler for list")
    remover(uncubedid)
    this.props.backHandler()
  }

  UncubedisplayHandler = (props) => {
    console.log("display handler calling")
    UncubedOrderDisplayHandler(props)
    this.setState({
      UncubedDisplay: true,
    })
    this.state.isuncubeddisplaydata.push(props);
  }

  displayCloseHandler = () => {
    this.setState({
      UncubedDisplay: false,
    })
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
    const columns = [
      {

        Header: "display",
        accessor: "display",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaDesktop style={{cursor:"pointer"}}onClick={() => this.UncubedisplayHandler(props.original)}>
                Display
              </FaDesktop>
            </div>
          );
        },
      },



      {
        Header: " Preparation Order ID",
        accessor: "idPo",
      },
      {
        Header: "Preaparation Order",
        accessor: "idPrepOrder",

      },
      {
        Header: "Preparation Order Cutomer Id",
        accessor: "idPrepOrderCustomer",
      },
      {
        Header: "Preaparation Order l3 ID",
        accessor: "idPrepOrderL3",
      },



      {
        Header: " Preparation Order Status",
        accessor: "statusPo",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusPo === 200 ? <span>_CubingError_</span> : props.original.statusPo === 350 ? <span>_Launchable_</span> :
                props.original.statusPo === 400 ? <span>Launched</span> : props.original.statusPo === 500 ? <span>Prepared</span> :
                  props.original.statusPo === 4000 ? <span>Cancelled</span> : props.original.statusPo === 360 ? <span>Selected</span> : null}

            </text>
          );
        },
      },

      {
        Header: "Preparation Order Type",
        accessor: "typePo",
        Cell: (props) => {
          return (
            <text>
              {props.original.typePo === 100 ? <span>_Standard_</span>
                : null
              }
            </text>
          );
        },
      },
      {
        Header: "Stuffing Type",
        accessor: "typePoStuffing",
        Cell: (props) => {
          return (
            <text>
              {props.original.typePoStuffing === 100 ? <span>_Stuffing Affiliation_</span> : props.original.typePoStuffing === 0 ? <span>_Non Plf_</span> :

                props.original.typePoStuffing === 200 ? <span>_stuffing at Plf_</span> : null}

            </text>
          );
        },
      },
      {
        Header: "Link",
        accessor: "plfLink",
      },
      {
        Header: "OBD1",
        accessor: "plfObd1",
      },
      {
        Header: "PO Preparation Warehouse",
        accessor: "warehousePreparationIds",
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
        Header: " Modified By",
        accessor: "musername",
      },



    ];
    return (
      <React.Fragment>
        {this.state.uncubedDisplay === true || UncubedOrderDisplayData.length !== 0 ? (
          <UncubedDisplayList isuncubeddisplaydata={this.state.isuncubeddisplaydata} displayCloseHandler={this.displayCloseHandler} />
          // <UncubedDisplayList
       
          // displayCloseHandler={this.displayCloseHandler}
          //   data2={this.state.data2} />
        ) :(
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
                  <a style={{cursor:"pointer"}}onClick={this.backHandler}>Uncubed POs search</a>
                </b>
              </u>
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor:"pointer"}}>Uncubed POs List</a>
                </b>
              </u>
            </span>
            <br />
            <br />
            
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

            <ReactTable
              className="-striped -highlight "
              data={this.state.data.length === 0
                ? this.props.data : this.state.data
              }
              columns={columns}
              defaultPageSize={10}
              showPaginationTop={true}
              filterable
              defaultFilterMethod={this.filterCaseInsensitive}
            />
            {/* </div> */}


            {/* <Row style={{
              marginTop: "100px",

            }}>


              <br />

            </Row> */}

          </div>
        )
        }
        
      </React.Fragment>
    );
  }
}
