import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { IoIosFlash, IoIosSettings } from "react-icons/io";
import { MdBatteryAlert, MdEdit, MdRestore } from "react-icons/md";
import { MdPrint } from "react-icons/md";
import { TiExport } from "react-icons/ti";
// import SweetAlert2 from "sweetalert2-react";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
class Silo_Loading_List extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
        };
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
                Header: "Edit",
                accessor: "Edit",
                
              },
              {
                  Header: 'Delete',
                  accessor: "Delete",
                
              },
              {
                Header: "display",
                accessor: "display",
              },
          {
            Header: "Product ID",
            accessor: "Description",
          },
          {
            Header: "Company",
            accessor: "printerName",
          },
          {
            Header: "Product",
            accessor: "isAvailable",
          },
          {
            Header: "Product Description",
            accessor: "modifiedby",
          },
          {
            Header: "Available",
            accessor: "isAvailable",
          },
          {
            Header: "Status",
            accessor: "modifiedby",
          },
          {
            Header: "Type",
            accessor: "isAvailable",
          },
          {
            Header: "Coaf unit",
            accessor: "modifiedby",
          },
          {
            Header: "Description Unit",
            accessor: "isAvailable",
          },
          {
            Header: "Batch mode",
            accessor: "modifiedby",
          },
          {
            Header: "Product short Desc",
            accessor: "isAvailable",
          },
          {
            Header: "Product complimentory Description",
            accessor: "modifiedby",
          },
          {
            Header: "Rotation",
            accessor: "modifiedby",
          },
          {
            Header: "Created the",
            accessor: "isAvailable",
            Cell: (props) => {
              return (
                <span>
                  {props.original.isAvailable === undefined
                    ? ""
                    : props.original.isAvailable === null
                    ? ""
                    : props.original.isAvailable === ""
                    ? ""
                    : props.original.isAvailable
                        .replace("T", " ")
                        .substring(0, props.original.isAvailable.lastIndexOf("."))}
                </span>
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
            accessor: "isAvailable",
          },
          {
            Header: "intermediate material code",
            accessor: "modifiedby",
          },
          {
            Header: "Modified by",
            accessor: "modifiedby",
          },
          {
            Header: "Version",
            accessor: "isAvailable",
          },
          {
            Header: "intermediate material code",
            accessor: "modifiedby",
          },
          {
            Header: "Material tyoe",
            accessor: "modifiedby",
          },
          {
            Header: "Grade",
            accessor: "isAvailable",
          },
          {
            Header: "Root qyt",
            accessor: "modifiedby",
          },
          {
            Header: "Root desc unit",
            accessor: "modifiedby",
          },
          {
            Header: "Qty child",
            accessor: "isAvailable",
          },
          {
            Header: "Reference child",
            accessor: "modifiedby",
          },
          {
            Header: "Cycle counting inventory",
            accessor: "modifiedby",
          },
          {
            Header: "Unit code",
            accessor: "isAvailable",
          },
          {
            Header: "Quality",
            accessor: "modifiedby",
          },
          {
            Header: "Product type",
            accessor: "modifiedby",
          },
          {
            Header: "Root Qty",
            accessor: "isAvailable",
          },
          {
            Header: "Root coef unit",
            accessor: "modifiedby",
          },
          {
            Header: "Ref child code",
            accessor: "modifiedby",
          },
          {
            Header: "Qty child in base unit",
            accessor: "isAvailable",
          },
          {
            Header: "Qty root in base unit",
            accessor: "modifiedby",
          },

         {


         },

        



        ];

       

      
        return (
            <React.Fragment>

<div>
              <IoArrowBackCircleSharp />
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
                
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Silo Loading search</a>
                  </b>
                </u>
                    
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Silo Loading Management</a>
                  </b>
                </u>


              </span>


              
              <Row style={{ marginTop: "10px" ,
              border:"1px solid black",
              backgroundColor: "#0080ff"
            }}
              
              >


<IoIosSettings/>

             <span>
                <u>

                <b>Configure List</b>
                
                </u>
                
               
            <u style={{marginLeft:"10px"}}>
                
            <MdRestore/>
            <b>Reset/Sort</b>



            </u>    


            <u style={{marginLeft:"10px"}}>
                
                <MdPrint/>
                <b>Print</b>
    
    
    
                </u>    

                <u style={{marginLeft:"10px"}}>
                
                <TiExport/>
                <b>Export</b>
    
    
    
                </u>  

             </span>
                </Row>


</div>

<Row>
<Col sm="10" className="py-2" style={{display:"ruby-text",

}}>

<ReactTable 
                  className="-striped -highlight "
                //   data={this.state.data}
                  columns={columns}
                  defaultPageSize={10}
                  showPaginationTop= {true}
                  filterable
                  defaultFilterMethod={this.filterCaseInsensitive}
                />
</Col>

<Col sm="1" className="py-2" style={{
display:"ruby-text"
}}>



<Row style={{marginTop:"120px"}}><Button color="primary" size="sm" onClick={()=>this.setState({show:true})}><MdEdit/></Button></Row>
<Row style={{marginTop:"6px"}}><Button color="primary" size="sm" onClick={()=>this.setState({show:true})}><MdEdit/></Button></Row>
<Row style={{marginTop:"6px"}}><Button color="primary" size="sm"><MdEdit/></Button></Row>
<Row style={{marginTop:"6px"}}><Button color="primary" size="sm"><MdEdit/></Button></Row>
<Row style={{marginTop:"5px"}}><Button color="primary" size="sm"><MdEdit/></Button></Row>
<Row style={{marginTop:"5px"}}><Button color="primary" size="sm"><MdEdit/></Button></Row>
<Row style={{marginTop:"4px"}}><Button color="primary" size="sm"><MdEdit/></Button></Row>
<Row style={{marginTop:"5px"}}><Button color="primary" size="sm"><MdEdit/></Button></Row>
<Row style={{marginTop:"5px"}}><Button color="primary" size="sm"><MdEdit/></Button></Row>
<Row style={{marginTop:"5px"}}><Button color="primary" size="sm"><MdEdit/></Button></Row>

{/* <SweetAlert2

warning 
showCancelButton="true"
text="do u really want the retreatment of the silo loading"
confirmBtnText="yes"
confirmBtnStyle="danger"
title="Confirmation"
onConfirm={this.deleteFile}
onCancel={this.onCancel}
focusCancelBtn="true"
show={this.state.show}
/> */}



   


</Col>
</Row>

<div
              
              style={{
                border: "1px solid lightblue",
                backgroundColor:"#0080ff",
                marginLeft:"11px"
              }}
              
              
              >
              <IoArrowBackCircleSharp />
              <IoArrowForwardCircleSharp />
              <FcSearch style={{ marginLeft: "5px" }} />
              <span style={{color:"black",
              fontSize:"12px"
            
            }}>
                {" "}
                
                  {" "}
                  <b>
                    User
                  </b>
                {" "}
                :
                
                  {" "}
                  <b>
                    {" "}
                    asis
                  </b>
                  {" "}
                  <b>
                    {" "}
                    Site
                  </b>
                  <b>
                      {"  "}
                    :
                  </b>
                  <b>
                      {"  "}
                    19
                  </b>
                  <b>
                      {"  "}
                    Warehouse
                  </b>

                  <b>
                      {"  "}
                    :
                  </b>

                  <b>
                      {"  "}
                    WH,
                  </b>
                  <b>
                      {"  "}
                    RT1
                  </b>
              </span>
              <br />
              </div>




            </React.Fragment>
          );
        }
}

export default Silo_Loading_List;