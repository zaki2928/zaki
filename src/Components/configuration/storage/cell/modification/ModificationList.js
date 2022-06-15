import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { ModificationData, remover,cellmodificationid } from '../../../../../store/Store';
import { FaPrint,FaFileExport,FaCalendarCheck } from 'react-icons/fa';
import {
  Label,
  Input,
  
} from "reactstrap";
import Swal from "sweetalert2";
class ModificationList extends Component {
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
        if (ModificationData.length !== 0) {
          console.log( ModificationData.length)
          this.setState({
            data: ModificationData
          })
        }else{
         
          this.setState({
            data: this.props.data
          })
        }
          }
        
          backHandler=()=>{
            remover(cellmodificationid)
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
            Header: "Warehouse",
            accessor: "Description",
          },
          {
            Header: "Region Description",
            accessor: "printerName",
          },
          {
            Header: "Cell Description",
            accessor: "isAvailable",
          },
          {
            Header: "Cell Type",
            accessor: "modifiedby",
          },
          {
            Header: "Cell Allocation",
            accessor: "isAvailable",
          },
          {
            Header: "Family Profile Description",
            accessor: "modifiedby",
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
                        <a onClick={this.backHandler}>Cells Modification Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Cells Modification</a>
                      </b>
                    </u>
                  </span>
                  <br />
              </div>
              <div style ={{marginTop:"5px"}}class="row-xs-6 bottom-row ">
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
                <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Length(m)</Label>
                  
                </Col>

                <Col>
                <Input bsSize="sm" />
                </Col>
                

                <Col> </Col>
                <Col>
                  <Label>Weight(kg)</Label>
                </Col>
                <Col>
                <Input bsSize="sm" />
                </Col>
               
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Width</Label>
                  
                </Col>

                <Col>
                <Input bsSize="sm" />
                </Col>
                

                <Col> </Col>
                <Col>
                  <Label>Storage Family Profile</Label>
                </Col>
                <Col>
                <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option></option>
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
                  <Label>Height(m)</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                <Button style={{ marginBottom: "10px" }}
                 onClick={() => this.validateHandler()}
                >
                  {" "}
                  Modification
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

export default ModificationList;