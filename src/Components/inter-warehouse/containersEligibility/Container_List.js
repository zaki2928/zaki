import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { FaEdit } from 'react-icons/fa';
import { Container, Row, Col, Button } from "reactstrap";
import {ContainerData ,ContainerEditHandler,ContainerEditdata,remover } from "../../../store/Store";
import Container_Edit from "../../inter-warehouse/containersEligibility/Container_Edit";
import {
  Label,
  Input,
  
} from "reactstrap";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaCog, FaSdCard } from 'react-icons/fa';
import { FaRegShareSquare } from 'react-icons/fa';
import { FaPrint,FaFileExport,FaCalendarCheck } from 'react-icons/fa';

import Swal from "sweetalert2";

class Container_List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      containerEdit : false,
      containerEditArray :[]
    };
  }

  componentDidMount = () => {
    if (ContainerData.length === 0) {
      this.setState({
        data: this.props.tableData,
      });
    } else {
      this.setState({
        data: ContainerData,
      });
    }

  }

  validateHandler(){
    Swal.fire({
      title: 'Confirmation',
      text: "Do you confirm the eligibility affection of 1 container(s)?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'gray',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes',
      
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }

  backHandler=()=>{
    console.log("calling back handler for list")
    // this.setState({missionEdit:false})
    remover("containereligibilityid")
    this.props.backHandler()
  }

  editClosehandler=()=>{
    this.setState({
      containerEdit: false,
    })
}

  editHandler=(props)=>{
    console.log("check props dataaaaaa", props)
    ContainerEditHandler(props)
      this.setState({
        containerEdit: true,
          
      })
      this.state.containerEditArray.push(props)
      
     
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
            Header: "",
            
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
        Header: "Warehouse Eligibilty",
        accessor: "Edit",
        // filterable: false,
        // Cell: (props) => {
        // //   return (
        // //     <FaEdit
        // //       style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
        // //       color="primary"
        // //       onClick={() => this.edithandler(props.original)}
        // //     >
        // //       Edit
        // //     </FaEdit>
        // //   );
        // },
      },
      {
        Header: "Stock Container No.",
        accessor: "Delete",
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
        accessor: "display",
      },
      {
        Header: "Container No",
        accessor: "Description",
      },
      {
        Header: "Status",
        accessor: "isAvailable",
      },
      {
        Header: "Type",
        accessor: "isAvailable",
      },
      {
        Header: "Parent Container No",
        accessor: "modifiedby",
      },
      {
        Header: "Packaging Id",
        accessor: "modifiedby",
      },
      {
        Header: "Location",
        accessor: "modifiedby",
      },
      {
        Header: "Height(m)",
        accessor: "modifiedby",
      },
      {
        Header: "Weight(kg)",
        accessor: "modifiedby",
      },
      {
        Header: "Version",
        accessor: "modifiedby",
      },
      
      {
        Header: "Modified The",
        accessor: "modifiedby",
      },
      {
        Header: "Modified By",
        accessor: "modifiedby",
      },
      {
        Header: "Movement Status",
        accessor: "modifiedby",
      },
      {
        Header: "Version",
        accessor: "modifiedby",
      },
      {
        Header: "Modified The",
        accessor: "modifiedby",
      },
      {
        Header: "Modified By",
        accessor: "modifiedby",
      },
      {
        Header: "Batch",
        accessor: "modifiedby",
      },

      
    ];
    return (
      <React.Fragment>
        {this.state.containerEdit === true || ContainerEditdata.length !== 0 ?
              (<Container_Edit editClosehandler = {this.editClosehandler} containerEditArray={this.state.containerEditArray}/>) :
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
                    <a style={{cursor:"pointer"}} onClick={this.backHandler}>Container Eligibility Search</a>{" "}
                  </b>
                </u>{""}
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}}>Container Eligibility Management</a>
                  </b>
                </u>
              </span>
              <br />
              <div
                style={{
                 
                }}
              >
                <a style={{ marginLeft: "950px" }} >Refresh</a>{" "}
                {/* <b href="#" style={{ marginLeft: "950px" }}>Refresh</b> */}
              </div>
              <div class="row-xs-6 bottom-row ">
              <input type="checkbox" id="myid"></input>
              {" "}
              <a style={{cursor:"pointer"}}>Select All </a>{" "}
                
        <FaCalendarCheck
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaCalendarCheck>{" "}
{/* <button >Configure</button> */}
<a style={{curser:"pointer"}} >Validate Selection</a>{" "}


                <FaPrint
                  
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaPrint>{" "}
<a style={{cursor:"pointer"}}>Print</a>{" "}
<FaFileExport
                 
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileExport>{" "}
<a style={{cursor:"pointer"}}>Export</a>
 </div>
        <ReactTable
          className="-striped -highlight "
          //   data={this.state.data}
          data={this.state.data.length === 0
            ? this.props.tableData
            : this.state.data
            }
          columns={columns}
          defaultPageSize={5}
          showPaginationTop={true}
          filterable
          defaultFilterMethod={this.filterCaseInsensitive}
        />
        <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Warehouse Eligibility</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option>Main Warehouse</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>
                
                
                <Col><Button style={{ marginBottom: "10px" }}
                 onClick={() => this.validateHandler()}
                >
                  {" "}
                  Validate
                </Button></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
        </div>
  }
      </React.Fragment>
    );
  }
}

export default Container_List;
