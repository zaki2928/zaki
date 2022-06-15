import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { intertrailerdata,remover } from "../../../store/Store";
import { FaDesktop, FaFileSignature, FaPlay, FaTrashAlt } from "react-icons/fa";
import InterwarehouseTrailerEdit from "../../inter-warehouse/trailer/InterwarehouseTrailerEdit";
import CreatenewTrailerPage from "../../inter-warehouse/trailer/CreatenewTrailerPage";
import {
  intertrailereditHandler,
  intertrailereditdata,
  intertrailerdisplaydata,
  intertrailerdisplayHandler,
  intertrailernewdata,
  intertrailernewHandler
} from "../../../store/Store";
import { BsFillDisplayFill } from "react-icons/bs";
import InterwarehouseTrailerDisplay from "../../inter-warehouse/trailer/InterwarehouseTrailerDisplay";
import { FaSave } from "react-icons/fa";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
  IoCreate,
  IoExit,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import Swal from "sweetalert2";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
class InterwarehouseTrailerList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isEdit: false,
      isDisplay: false,
      isdisplaydata: [],
      createNew: false,
      newdata:[],
    };
  }

  newtrailerHandler = () => {
    this.setState ({
      createNew: true,
    })
  }

  saveHandler(){
    Swal.fire({
        title: 'Confirmation?',
        text: "Do u really want to delete warehouse trailers details!",
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

saveHandler2(){
  Swal.fire({
      title: 'Confirmation?',
      text: "Do u really want to exit trailers",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'gray',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes'
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
    console.log("silolist backhandler")
  remover("Inter Warehouse Trailer")
  this.props.listbackHandler()
  
  }



  componentDidMount = () => {
    if (intertrailerdata.length === 0) {
      this.setState({
        data: this.props.tableData,
      });
    } else {
      this.setState({
        data: intertrailerdata,
      });
    }
  };
  EditHandler = (props) => {
    console.log("Arqum trailer edit handler calling");
    intertrailereditHandler(props);
    this.setState({
      isEdit: true,
    });
  };
  EditCloseHandler = (props) => {
    console.log("Arqum trailer edit close handler calling");

    this.setState({
      isEdit: false,
    });
  };
  DisplayHandler = (props) => {
    console.log("Arqum display handler calling");
    intertrailerdisplayHandler(props);
    this.setState({
      isDisplay: true,
    });
    this.state.isdisplaydata.push(props);
  };

  DisplayCloseHandler = () => {
    console.log("Arqum display close handler calling", intertrailerdisplaydata.length);
    this.setState({
      isDisplay: false,
    });
  };





  NewHandler = () => {
    console.log("Arqum new handler calling");
    intertrailernewHandler(intertrailerdata);
    this.setState({
      createNew:true,
    });
    this.state.newdata.push(intertrailerdata);
  };

  NewCloseHandler = () => {
    console.log("Arqum new close handler calling", intertrailernewdata.length);
    this.setState({
      createNew: false,
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

        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaEdit
                
                onClick={() => this.EditHandler(props.original)}
              >
               
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
         
                onClick={() => this.saveHandler()}
              >
                Delete
              </FaTrashAlt>
            </div>
          );
        },
      },

      {
        Header: "ID",
        accessor: "id",
       
       
      },
      {
        Header: "Status",
        accessor: "body",
       
       
      },

      {
        Header: "Display Line",

        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaDesktop
              
                onClick={() => this.DisplayHandler(props.original)}
              >
               
              </FaDesktop>
            </div>
          );
        },
      },

          
      
      {
        Header: "Location",
        accessor: "body",
      },
      {
        Header: "Warehouse from",
        accessor: "Description",
      },
      {
        Header: "Loading gate",
        accessor: "printerName",
      },

      {
        Header: "Warehouse to",
        accessor: "modifiedby",
      },
      {
        Header: "Uploading Gate",
        accessor: "isAvailable",
      },
      {
        Header: "Trailer identification",
        accessor: "modifiedby",
      },
      {
        Header: "No of containers",
        accessor: "isAvailable",
      },
      {
        Header: "Driver name",
        accessor: "modifiedby",
      },
      {
        Header: "Barcode",
        accessor: "modifiedby",
      },
      {
        Header: "Recording gate",
        accessor: "isAvailable",
      },
      {
        Header: "Seal",
        accessor: "modifiedby",
      },
      {
        Header: "Trailer type",
        accessor: "modifiedby",
      },
      {
        Header: "Created the",
        accessor: "modifiedby",
      },
      {
        Header: "Closure the",
        accessor: "modifiedby",
      },
      {
        Header: "Arrival date",
        accessor: "modifiedby",
      },
      {
        Header: "Returned",
        accessor: "modifiedby",
        Cell: (props) => {
          return (
            <input type="checkbox" id="myid"></input>
          );
        },
      },

      {
        Header: "Modified the",
        accessor: "modifiedby",
      },
      {
        Header: "Modified by",
        accessor: "modifiedby",
      },
      {
        Header: "Version",
        accessor: "modifiedby",
      },

    ];
    return (
      <React.Fragment>
        {this.state.isEdit === true || intertrailereditdata.length !== 0 ? (
          <InterwarehouseTrailerEdit EditCloseHandler={this.EditCloseHandler} />
        ) : this.state.isDisplay === true || intertrailerdisplaydata.length !== 0 ? (
          <InterwarehouseTrailerDisplay
            isdisplaydata={this.state.isdisplaydata}
            DisplayCloseHandler={this.DisplayCloseHandler}
          />
        ) : this.state.createNew === true ||intertrailernewdata.length !==0 ? (
        <CreatenewTrailerPage 
        newdata={this.state.newdata}
        NewCloseHandler={this.NewCloseHandler}
        
        />
        
        ) 
        :
        (

          <div>

<IoArrowBackCircleSharp  onClick={this.backHandler}/>
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
                    <a>WH trailers search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>WH trailers management</a>
                  </b>
                </u>
              </span>
              <div>
            <Row  >
              <Col style={{marginLeft:"10px"}}>
                <span>
                    <FaFileSignature onClick={this.newtrailerHandler} />
                    <u><b onClick={this.newtrailerHandler}>New</b></u>
                </span>
              </Col>
              
              <Col>
                {" "}
                
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                {" "}
              </Col>
              <Col>
               
              </Col>
              <Col></Col>
              <Col> <span>
                    <u><b><IoExit  onClick={() => this.saveHandler2()}/>Exit</b></u>
                </span></Col>
            </Row>
                    
</div>

<Row style={{marginTop:"6px"}} >

            </Row>
                 
          <ReactTable
            className="-striped -highlight "
            data={
              this.state.data.length === 0
                ? this.props.tableData
                : this.state.data
            }
            columns={columns}
            defaultPageSize={10}
            showPaginationTop={true}
            filterable
            defaultFilterMethod={this.filterCaseInsensitive}
          />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default InterwarehouseTrailerList;
