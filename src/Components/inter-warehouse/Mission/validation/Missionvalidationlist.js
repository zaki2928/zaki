import React, { Component } from 'react'
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button, Input } from "reactstrap";
import axios from "axios";
import Swal from 'sweetalert2'
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaSave, FaFileSignature } from "react-icons/fa";
import {WhMissionVdata} from '../../../../store/Store';
import { FaCalendarCheck, FaCog, FaRegShareSquare, FaFileExport, FaPrint } from 'react-icons/fa';

export default class Missionvalidationlist extends Component {
    constructor(props) {
        super(props)

        this.state = {
        data: [],
        isValidate: false,
                 
        }

        
    }

    componentDidMount = () => {
        if (WhMissionVdata.length === 0) {
          this.setState({
            data: this.props.tableData,
          });
        } else {
          this.setState({
            data: WhMissionVdata,
          });
        }
    }

    validHandler = () =>{
      this.setState({
        isValidate: true
      })
      if (this.state.isValidate === true) {
          Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: 'gray',
            cancelButtonColor: 'gray',
            confirmButtonText: 'Yes, delete it!'
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
              Header: "Mission ID",
              accessor:"ed"
            },
            {
              Header: "Container",
              accessor:"de"
            },
            {
              Header: "Location",
              accessor: "id",
            },
            {
              Header: "Destination",
              accessor: "body",
            },
            {
              Header: "Warehouse From",
              accessor: "qt",
            },
            {
              Header: "Warehouse To",
              accessor: "qt",
            },
            {
              Header: "TO name",
              accessor: "qt",
            },
            {
              Header: "Comment",
              accessor: "body",
            },
            {
                Header: "Batch",
                accessor: "wt",
            },
            {
                Header: "Status",
                accessor: "wt",
            },
            {
                Header: "Mission class",
                accessor: "wt",
            },
            {
                Header: "User treat",
                accessor: "wt",
            },
            {
                Header: "Creation date",
                accessor: "wt",
            },
            {
                Header: "Version",
                accessor: "wt",
            },
        ]
        return (
            <React.Fragment>
          <div>
            <IoArrowBackCircleSharp onClick={this.Backhandler} />
            <IoArrowForwardCircleSharp />
            <FcSearch style={{ marginLeft: "5px" }} />
            <span>
              <u>
                <b>
                  <a>Home</a>
                </b>
              </u>
       {" "} &#62;
              <u>
                <b>
                  <a>Mission Validation List</a>
                </b>
              </u>
            </span>
            <div class="row-xs-6 bottom-row ">
              <input type="checkbox" id="myid"></input>
              {" "}
              <a >Select All </a>{" "}
                
        <FaCalendarCheck
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaCalendarCheck>{" "}
{/* <button >Configure</button> */}
<a  >Validate Selection</a>{" "}

<FaCog
              
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaCog>{" "}
{/* <button >Configure</button> */}
<a >Configure List</a>{" "}
{/* <button class="btn5 some-margin"></button> */}
<FaRegShareSquare
               
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaRegShareSquare>{" "}
                <a >Reset Sort</a>{" "}
                <FaPrint
                  
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaPrint>{" "}
<a>Print</a>{" "}
<FaFileExport
                 
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileExport>{" "}
<a >Export</a>
 </div>
            <br />
            <Row>
              <Col xs="3">
                <Button onClick={this.validHandler}>Validate</Button>
              </Col>
            </Row>
            <br/>
            {/* <div>
              <FaFileSignature /><span onClick={this.newgateHandler}><u>New</u></span>
              &nbsp;&nbsp;
              <FaSave  /><span><u>Save</u></span>
            </div>
            <br /> */}
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
      </React.Fragment>
        )
    }
}
