import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { RackStatusData, remover,rackstatusid, RackStatusHandler } from '../../../../store/Store';
import axios from "axios";
import { FaPrint,FaFileExport,FaCalendarCheck } from 'react-icons/fa';
import {
  Label,
  Input,
  
} from "reactstrap";
import Swal from "sweetalert2";
class RackStatusList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
        };
      }

      validateHandler(){
        Swal.fire({
          title: 'Confirmation',
          text: "Do you confirm the Change?",
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

componentDidMount=()=>{
        if (RackStatusData.length !== 0) {
          console.log( RackStatusData.length)
          this.setState({
            data: RackStatusData
          })
        }else{
         
          this.setState({
            data: this.props.data
          })
        }
          }
        
          backHandler=()=>{
            remover(rackstatusid)
            this.props.backHandler()
          }

          refreshHandler=()=>{
            console.log("refreshHandler calling")
            this.criteriaFilterMethod()
          }

          criteriaFilterMethod = ()=>{
            axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then((response) => {
              if (response.status === 200) {
                console.log("resposne success", response.data);
                 this.setState({
                data:response.data,
                locationList:true
          
                })
          
                RackStatusHandler(response.data)
                
              }
            })
            .catch((error) => {
              console.log(error);
            });
          
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
                Header: "Stock Content No",
                accessor: "body",
          },
          {
            Header: "Content No",
            accessor: "Description",
          },
          {
            Header: "Container No",
            accessor: "printerName",
          },
          {
            Header: "Location",
            accessor: "isAvailable",
          },
          {
            Header: "Content Status",
            accessor: "modifiedby",
          },
          {
            Header: "Type",
            accessor: "isAvailable",
          },
          {
            Header: "Container Status",
            accessor: "isAvailable",
          },
          {
            Header: "Container Type",
            accessor: "isAvailable",
          },
          {
            Header: "Product Company",
            accessor: "modifiedby",
          },
          {
            Header: "Product ID",
            accessor: "isAvailable",
          },
          {
            Header: "Product",
            accessor: "modifiedby",
          },
          {
            Header: "Product Description",
            accessor: "isAvailable",
          },
          {
            Header: "Product Unit",
            accessor: "modifiedby",
          },
          {
            Header: "Quantity Unit",
            accessor: "isAvailable",
          },
          {
            Header: "Intermediate Material Code",
            accessor: "isAvailable",
          },
          {
            Header: "Grade",
            accessor: "isAvailable",
          },
          {
            Header: "Logistic Unit ID",
            accessor: "isAvailable",
          },
          {
            Header: "Batch",
            accessor: "isAvailable",
          },
          {
            Header: "Quantity",
            accessor: "isAvailable",
          },
          {
            Header: "Version",
            accessor: "isAvailable",
          },

          {
            Header: "Modified Date",
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
            accessor: "modifiedby",
          },
          {
            Header: "Reserved Quantity",
            accessor: "isAvailable",
          },
          {
            Header: "Expected Quantity",
            accessor: "isAvailable",
          },
          {
            Header: "Version",
            accessor: "isAvailable",
          },
          {
            Header: "Modified The",
            accessor: "modifiedby",
          },
          {
            Header: "Modified By",
            accessor: "modifiedby",
          },
          
        ];
        return (
            <React.Fragment>
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
                        <a onClick={this.backHandler}>Rack Status Change Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Access to Rack Status Change</a>
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
              <div style ={{marginTop:"5px"}}className="row-xs-6 bottom-row ">
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
                <ReactTable
                  className="-striped -highlight "
                  data={this.state.data.length === 0
                    ? this.props.data : this.state.data
                  }
                  columns={columns}
                  defaultPageSize={10}
                  showPaginationTop= {true}
                  filterable
                  defaultFilterMethod={this.filterCaseInsensitive}
                />
                 <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      marginTop: "10px"
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Status</b>
                  </div>
                <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Status</Label>
                  
                </Col>

                <Col>
                <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "50px" }}
                        bsSize="sm"
                      >
                        <option>=</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                </Col>
                

                <Col> </Col>
                <Col>
                  <Label>Motive</Label>
                </Col>
                <Col>
                <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "50px" }}
                        bsSize="sm"
                      >
                        <option>=</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                </Col>
               
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Comment</Label>
                  
                </Col>

                <Col>
                <Input bsSize="sm" />
                </Col>
                

                <Col> </Col>
                <Col>
                  <Label>Send Data to SAP</Label>
                </Col>
                <Col>
                <input type="checkbox" id="myid"></input>
                </Col>
               
                <Col> </Col>
              </Row>
                
              <Row style={{ marginTop: "10px" }}>
                <Col>
                <Button style={{ marginBottom: "10px" }}
                 onClick={() => this.validateHandler()}
                >
                  {" "}
                  Change
                </Button>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
            </React.Fragment>
            
        );
    }
}

export default RackStatusList;