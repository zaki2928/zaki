import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { Wavedata , WaveShippingEditdata, waveShippingEditHandler,} from "../../../store/Store";
import { FaDesktop, FaPlay, FaTrashAlt } from "react-icons/fa";
import WaveEditShipping from "../wave/WaveEditShipping";
import {
  waveEditHandler,
  WaveEditdata,
  wavedisplaydata,
  wavedisplayHandler,
  remover
} from "../../../store/Store";
import { BsFillDisplayFill } from "react-icons/bs";
import Wave_Display from "../wave/Wave_Display";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
class WaveListShipping extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isEdit: false,
      isDisplay: false,
      isdisplaydata: [],
    };
  }



  saveHandler(){
    Swal.fire({
        title: 'Confirmation?',
        text: "Do u really want to delete wave details!",
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

backHandler=()=>{
  console.log("calling back handler for list")
  remover("WaveListShipping")
  this.props.WaveShippingCloseHandler()
}


  componentDidMount = () => {
    if (Wavedata.length === 0) {
      this.setState({
        data: this.props.tableData,
      });
    } else {
      this.setState({
        data: Wavedata,
      });
    }
  };
  EditHandler = (props) => {
    console.log("Arqum edit handler calling");
    waveShippingEditHandler(props);
    this.setState({
      isEdit: true,
    });
  };
  EditCloseHandler = (props) => {
    console.log("Arqum edit handler calling");

    this.setState({
      isEdit: false,
    });
  };
 
  render() {
    const columns = [
      {
        Header: "S NO",
        accessor: "id",   
      },
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
        Header: "Delete",

        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaTrashAlt
                style={{ cursor: "pointer" }}
                onClick={() => this.saveHandler()}
              >
                Delete
              </FaTrashAlt>
            </div>
          );
        },
      },




      {
        Header: "Wave No",
        accessor: "body",
      },
      {
        Header: " Carrier",
        accessor: "Description",
      },
      {
        Header: " Dispatch mode",
        accessor: "printerName",
      },

     
    ];
    return (
      <React.Fragment>
        {this.state.isEdit === true || WaveEditdata.length !== 0 ? (
          <WaveEditShipping EditCloseHandler={this.EditCloseHandler} />
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
                    <a style={{cursor:"pointer"}}>Wave search</a>
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
                <Row style={{marginTop:"9px"}}>
               
                   

                   
                  
                <Button style={{marginTop:"5px",float:"right",marginLeft:"15px"}} outline color="secondary"
                   
                     
                     onClick={
                      this.backHandler
                      }
                      
                  
                    >
                      {" "}
                      Preparation Tab
                    </Button>
                
               
                
                <Button style={{marginTop:"5px",float:"right",marginLeft:"0px"}} outline color="secondary"
                      active="true"
                     onClick={
                       this.preparationListHandler
                      }
                    >
                      {" "}
                      Shipping Tab
                    </Button>
                
               
              
                    </Row>
              </span>
           
          <ReactTable
            className="-striped -highlight "
            data={
              this.state.data.length === 0
                ? this.props.tableData
                : this.state.data
            }
            columns={columns}
            defaultPageSize={5}
            showPaginationTop={false}
            filterable
          />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default WaveListShipping;
