import React, { Component } from 'react'
import ReactTable from "react-table-v6"
import "react-table-v6/react-table.css"
import { Container, Row, Col, Button, Label, Input } from "reactstrap"
import {Palletmovementdata} from '../../../store/Store'
import { FaEdit, FaFileSignature, FaPrint, FaFileExport, } from "react-icons/fa";
import Palletmovementedit from './Palletmovementedit';
import Swal from "sweetalert2";

export default class Palletmovementlist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            isEdit: false,

                 
        }

       
    }

    componentDidMount = () => {
        if (Palletmovementdata.length === 0) {
          this.setState({
            data: this.props.tableData,
          });
        } else {
          this.setState({
            data: Palletmovementdata,
          });
        }
    }

    editHandler = () => {
        this.setState ({
          isEdit: true,
        })
      }

    editCloseHandler = (props) => {
        console.log("edit close handler calling");
    
        this.setState({
          isEdit: false,
        });
      };

      validateHandler(){
        Swal.fire({
          title: 'Confirmation',
          text: "Do you confirm the movement of 1 container(s)?",
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
      
      backHandler = () => {
        console.log("back handler calling from list page")
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
                Header: "edit",
                Cell: () => (
                    <FaEdit onClick={this.editHandler} />
                )
            },
            {
                Header: "display",
                accessor:"dis",
            },
            {
                Header: "Stock container no",
                accessor: "body",
            },
            {
                Header: "Warehouse",
                accessor: "qt",
            },
            {
                Header: "Container no",
                accessor: "qt",
            },
            {
                Header: "Status",
                accessor: "qt",
            },
            {
                Header: "Type",
                accessor: "qt",
            },
            {
                Header: "Parent container no",
                accessor: "wt",
            },
            {
                Header: "Packaging Id",
                accessor: "wt",
            },
            {
                Header: "Location",
                accessor: "wt",
            },
            {
                Header: "Height(m)",
                accessor: "wt",
            },
            {
                Header: "Weight(kg)",
                accessor: "wt",
            },
            {
                Header: "Version",
                accessor: "wt",
            },
            {
                Header: "Modified the",
                accessor: "wt",
            },
            {
                Header: "Modified by",
                accessor: "wt",
            },
            {
                Header: "Movement status",
                accessor: "wt",
            },
            {
                Header: "Versions",
                accessor: "wt",
            },
            {
                Header: "Modified the",
                accessor: "wt",
            },{
                Header: "Modified by",
                accessor: "wt",
            },{
                Header: "Batch",
                accessor: "wt",
            },
        ]
        return (
        <React.Fragment>
              {this.state.isEdit === true ?
                (<Palletmovementedit  editCloseHandler={this.editCloseHandler}/>):
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
                            <a onClick={this.backHandler}>Access to Pallet Warehouse Movements</a>
                        </b>
                    </u>
                    &#62;
                    <u>
                        {" "}
                        <b>
                            {" "}
                            <a >Pallet Warehouse Movements</a>
                        </b>
                    </u>

                </span>
                <br />

                <div style={{ marginTop: "10px", marginBottom: "5px", marginLeft:"20px" }} class="row-xs-6 bottom-row ">
                  
                  <Input type="checkbox"/>
                  <a>Select all</a> &nbsp;
                    <FaPrint

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaPrint>{" "}
                    <a  >Print</a>{" "}
                    <FaFileExport

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaFileExport>{" "}
                    <a  >Export</a>{" "}


                </div>
                <ReactTable
          className="-striped -highlight "
            data={this.state.data.length === 0
              ? this.props.tableData
              : this.state.data
                }
          columns={columns}
          defaultPageSize={10}
          showPaginationTop={true}
          filterable
          defaultFilterMethod={this.filterCaseInsensitive}
        />
         
        
        <div style={{ background: "#f2f1ed", padding: "2px 2px 8px 10px" }}>

        <Row style={{ marginTop: "10px" }}>
                <Col  style={{ display: "flex" }}>
                  <Label>Warehouse</Label>
                  <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      style={{width:"126px",height:"28px",marginLeft:"84px"}}
                    />
                </Col>

                <Col  style={{ display: "flex" }}>
                  <Label>TO Name</Label>
                  <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      style={{width:"126px",height:"28px",marginLeft:"34px"}}

                    />
                </Col>

                <Col  style={{ display: "flex" }}>
                  <Label>Comment</Label>
                  <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      style={{width:"126px",height:"28px",marginLeft:"34px"}}

                    />
                </Col>

                <Col >
                    <Button  onClick={() => this.validateHandler()} color="secondary">Validate</Button>
                </Col>
              </Row>
        </div>
                </div>
                }

        </React.Fragment>
        )
    }
}
