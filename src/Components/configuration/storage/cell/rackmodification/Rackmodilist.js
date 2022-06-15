import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { CellrackData, remover } from '../../../../../store/Store';
import { FaPrint,FaFileExport,FaCalendarCheck } from 'react-icons/fa';
import {
  Label,
  Input,
  
} from "reactstrap";
import Swal from "sweetalert2";


class Rackmodilist extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
        };
      }

      validateHandler(){
        Swal.fire({
          title: 'Confirmation',
          text: "Do you confirm the modification?",
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
        if (CellrackData.length !== 0) {
          console.log( CellrackData.length)
          this.setState({
            data: CellrackData
          })
        }else{
         
          this.setState({
            data: this.props.data
          })
        }
          }
        
          backHandler=()=>{
            remover("Rack cells")
            this.props.backHandler()
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
                Header: "ID",
                accessor: "body",
          },
          {
            Header: "Rack profile",
            accessor: "rack",
          },
          {
            Header: "Families profile",
            accessor: "FamlyName",
          },
          {
            Header: "Height(m)",
            accessor: "hei",
          },
          {
            Header: "Weight(kg)",
            accessor: "isAvailable",
          },
          {
            Header: "Region",
            accessor: "modifiedby",
          },
          {
            Header: "Aisle",
            accessor: "isAvailable",
          },
          {
            Header: "Column",
            accessor: "modifiedby",
          },
          {
            Header: "Level",
            accessor: "isAvailable",
          },
          {
            Header: "Modified The",
            accessor: "modifiedby",
          },
          {
            Header: "Warehouse",
            accessor: "wareh",
          },
          {
            Header: "Location",
            accessor: "isAvailable",
          },
          {
            Header: "Use Location",
            accessor: "isAvailable",
          },
          {
            Header: "Availability",
            accessor: "isAvailable",
          },
          {
            Header: "Loaction Modified The",
            accessor: "isAvailable",
          },
          {
            Header: "Loaction Modified By",
            accessor: "isAvailable",
          },
          {
            Header: "Version",
            accessor: "isAvailable",
          },
          {
            Header: "Modified by",
            accessor: "isAvailable",
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
                        <a onClick={this.backHandler}>Rack cells search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Rack Cells management</a>
                      </b>
                    </u>
                  </span>
                  <br />
              </div>
              <div style ={{marginTop:"5px"}}class="row-xs-6 bottom-row ">
              <input type="checkbox" id="myid"></input>
              {" "}
              <a >Select All </a>{" "}
                
        <FaCalendarCheck
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaCalendarCheck>{" "}
{/* <button >Configure</button> */}
<a  >Validate Selection</a>{" "}



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
                  
                    <b style={{ marginLeft: "5px" }}>Characteristics</b>
                  </div>


                <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Rack profile</Label>{" "}
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
                    <option>_In_Out_</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>
                <Col></Col>
                <Col></Col>

                <Col>
                  <Label>Use location</Label>{" "}
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
                    <option>_In_Out_</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>
                
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
              <br/>
              <Row>
              <Col>
              <Button style={{ marginBottom: "10px" }}
                 onClick={() => this.validateHandler()}
                >
                  {" "}
                  Modify profile
                </Button>
                <br/>
                <Button style={{ marginBottom: "10px" }}
                 onClick={() => this.validateHandler()}
                >
                  {" "}
                  Modify accessibility
                </Button>
                
                </Col>
              </Row>
            </React.Fragment>
            
        );
    }
}

export default Rackmodilist;