import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { IoIosSettings } from "react-icons/io";
import { MdDelete, MdFindReplace, MdRestore } from "react-icons/md";
import { MdPrint } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import { Boxreplacementdata, remover, Boxreplacementeditdata, BoxreplacementeditHandler, BoxreplacementHandler, Boxreplacementcriteriadata } from "../../../store/Store";
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { RiSwapBoxFill } from 'react-icons/ri';
import Boxreplacementedit from "../../shipping/box-replacement/Boxreplacementedit";
import Swal from "sweetalert2";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
  IoSearch,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import BoxreplacementModal from './BoxreplacementModal';
import axios from 'axios';
import { properties } from '../../../Properties/Properties';
const getlistofboxreplacementbyfiltercriteria =
  properties.Port + properties.getlistofboxreplacementbyfiltercriteria;

  const replaceContainerByContainerId =
  properties.Port + properties.replaceContainerByContainerId;
class Boxreplacementlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      siloedit: false,
      siloeditnewdata: [],
      isOpen: false,
      idContainer:"",
      batch:'',
      msg:'',
      exceptionmsg: "",
     

    };
  }

  changeHandler=(props)=>{
    console.log("box calling", props.idContainerPrpsh)
    this.setState({
      idContainer:props.idContainerPrpsh,
    })
  }

  saveHandler = (props) => {
    console.log("box calling", props.idContainerPrpsh)
    Swal.fire({
      title: "Confirmation",
      text: "Do u want box-replacement",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "replace",
    }).then((result) => {
      console.log("swal result", result);
      if (result.value) {
        axios
          .post(replaceContainerByContainerId + props.idContainerPrpsh)
          .then((response) => {
            console.log("my data", response);
            if (response.status === 200) {
              console.log("response  success");
              this.setState({
                msg: "box replaced successfully",
              });
             
            }
          })
          .catch((error) => {
            console.log(error);
            this.setState({
              exceptionmsg: error.response.data.message,
            });
          });
        if (result.isConfirmed) {
          Swal.fire(      
                'Done',
                'success'
          );
        }
      }
    });
  }
    // Swal.fire({
    //   title: 'Confirmation?',
    //   text: "Do u want box-replacement!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: 'gray',
    //   cancelButtonColor: 'gray',
    //   confirmButtonText: 'Yes, do it!'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire(

    //       'Done',
    //       'success'
    //     )
    //   }
    // })
  


  componentDidMount = () => {

    if (Boxreplacementdata.length !== 0) {

      this.setState({
        data: Boxreplacementdata

      })

    } else {

      this.setState({
        data: this.props.data

      })

    }

  }

  backHandler = () => {
    console.log("silolist backhandler")
    remover("Boxes replacement")
    this.props.backHandler()

  }



  editHandler = (props) => {
    this.setState({
      siloedit: true,

    })
    this.state.siloeditnewdata.push(props)
    BoxreplacementeditHandler(props)
  }


  editClosehandler = () => {
    this.setState({
      siloedit: false,
    })
  }

  refreshHandler = () => {
    console.log("calling refreshHandler")
    this.criteriaFilterMethod()
  }

  // Submimthandler=()=>{
  //   axios
  //   .get("https://jsonplaceholder.typicode.com/posts")
  //   .then((response) => {
  //     if (response.status === 200) {
  //       console.log("resposne success", response.data);
  // this.setState({
  //   data:response.data,
  // silolist:true
  // })
  // BoxreplacementHandler( response.data)

  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }

  criteriaFilterMethod = () => {

    console.log("testttingggggggggggggggggggggggggggggg calling");
    axios
      .post(getlistofboxreplacementbyfiltercriteria, Boxreplacementcriteriadata, {
        params: {
          limit: Boxreplacementcriteriadata.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne successsssssssssssss", response.data);
          this.setState({
            data: response.data,


          });
          BoxreplacementHandler(response.data);

        } else {

          this.setState({
            data: [],

          });
          BoxreplacementHandler(response.data);

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
  openModal = (props) => {
    console.log("calling model", props)
    this.setState({
     
      idContainer:props.idContainerPrpsh,
    },()=>{
      this.setState({ isOpen: true})
    });
  };

  closeModal = () => {
    console.log("closing model")
    this.setState({
      isOpen: false,
    });
  };

  onChangeHandler=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
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
              style={{ cursor: "pointer" }}
              color="primary"
              onClick={() => this.editHandler(props.original)}
            >
              Edit
            </FaEdit>
          );
        },
      },

      {
        Header: "ID",
        accessor: "idContainerPrpsh",
      },

      {
        Header: "Preparation status",
        accessor: "statusPrep",
      },

      {
        Header: "Box Replacement",
        accessor: "Replacement",
        filterable: false,
        Cell: (props) => {
          return (
            <RiSwapBoxFill
              style={{ cursor: "pointer" }}
              color="primary"
              onClick={() => this.saveHandler(props.original)}

            >
              Edit
            </RiSwapBoxFill>
          );
        },
      },
      {
        Header: "Another Batch",
        accessor: "Replacement",
        filterable: false,
        Cell: (props) => {
          return (
            <RiSwapBoxFill
              style={{ cursor: "pointer" }}
              color="primary"
              onClick={() => this.openModal(props.original)}

            >
            </RiSwapBoxFill>
          );
        },
      },


      {
        Header: "Shipping status",
        accessor: "statusShipping",
      },
      {
        Header: " Parent container no",
        accessor: "idContainerFather",
      },
      {
        Header: "Packaging ID",
        accessor: "idPackaging",
      },
      {
        Header: " Preparation order",
        accessor: "idPrepOrder",
      },
      {
        Header: "Preparation order status",
        accessor: "statusPo",
      },

      {
        Header: "Carrier",
        accessor: "idCarrier",
      },
      {
        Header: "Dispatch mode",
        accessor: "idDm",
      },
      {
        Header: " Palletisation type",
        accessor: "typePalletisation",
      },

      {
        Header: "Modified the",
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
                // .substring(0, props.original.mDate.lastIndexOf("."))
              }
            </span>
          );
        },
      },

      {
        Header: "Location",
        accessor: "idLocation",
      },
      {
        Header: "Version",
        accessor: "verionLock",
      },
      {
        Header: "Modified by",
        accessor: "mUserName",
      },

    ];

    return (
      <React.Fragment>
        {this.state.siloedit === true || Boxreplacementeditdata.length !== 0 ?
          <Boxreplacementedit tableData={this.state.siloeditnewdata} editClosehandler={this.editClosehandler} /> :
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
                  <a style={{ cursor: "pointer" }} onClick={this.backHandler}>Box Replacement Search</a>
                </b>
              </u>
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a>Box Replacement Management</a>
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
              <BoxreplacementModal
                closeModal={this.closeModal}
                isOpen={this.state.isOpen}
                onChangeHandler={this.onChangeHandler}
                boxData={this.state.idContainer}
                />

              {/* <button onClick={this.openModal}
                style={{
                  float: "left",
                  cursor: "pointer",
                  height: "30px",
                  width: "120px",
                  borderRadius: "5px",
                }}
              >
                <text style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Configure list
                </text>
              </button> */}
            </span>
            <br />
            <br />
            <span style={{color:"Green",  fontWeight: "bold"}}>&nbsp;&nbsp;&nbsp;{this.state.msg}</span>
            <span
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              {this.state.exceptionmsg}
            </span>

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




          </div>}
      </React.Fragment>
    );
  }
}

export default Boxreplacementlist;