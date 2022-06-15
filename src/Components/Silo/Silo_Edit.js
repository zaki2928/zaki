import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button,Label,
    Input,
    FormGroup, } from "reactstrap";
import { IoIosSettings } from "react-icons/io";
import { MdRestore } from "react-icons/md";
import { MdPrint } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
class Silo_Edit extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
        };
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
                >
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Silo search</a>
                  </b>
                </u>
                    >
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Silo Management</a>
                  </b>
                </u>
                >
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Silo Edition</a>
                  </b>
                </u>



              </span>
              <div style={{
                marginLeft:"15px"
            
            }}>


             < Row >
                <Col>
                  <Label  style={{marginLeft:"20px"}}>Material Type</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    bsSize="sm"
                  />
    
                </Col>
                <Col>
                  {" "}
                    
                </Col>

                <Col> </Col>
                <Col>
                
                </Col>
                <Col>
                  {" "}
                
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>




              < Row >
                <Col>
                  <Label style={{marginLeft:"20px"}}>Silo_No_L3</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    bsSize="sm"
                  />
    
                </Col>
                <Col>
                  {" "}
                    
                </Col>

                <Col> </Col>
                <Col>
                
                </Col>
                <Col>
                  {" "}
                
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>



              < Row >
                <Col>
                  <Label style={{marginLeft:"20px"}}>DCS_Silo_no</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    bsSize="sm"
                  />
    
                </Col>
                <Col>
                  {" "}
                    
                </Col>

                <Col> </Col>
                <Col>
                
                </Col>
                <Col>
                  {" "}
                
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>

              < Row >
                <Col>
                  <Label style={{marginLeft:"20px"}}>Bay</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    bsSize="sm"
                  />
    
                </Col>
                <Col>
                  {" "}
                    
                </Col>

                <Col> </Col>
                <Col>
                
                </Col>
                <Col>
                  {" "}
                
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>

              < Row>
                <Col>
                  <Label style={{marginLeft:"20px"}}>Location</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    bsSize="sm"
                  />
    
                </Col>
                <Col>
                  {" "}
                    
                </Col>

                <Col> </Col>
                <Col>
                
                </Col>
                <Col>
                  {" "}
                
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>

              < Row>
                <Col>
                  <Label style={{marginLeft:"20px"}}>Status_till</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    bsSize="sm"
                  />
    
                </Col>
                <Col>
                  {" "}
                    
                </Col>

                <Col> </Col>
                <Col>
                
                </Col>
                <Col>
                  {" "}
                
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>

              < Row>
                <Col>
                  <Label style={{marginLeft:"13px"}}>Loading_Status</Label>
                </Col>

                <Col>
                  <Input
                    bsSize="sm"
                  />
    
                </Col>
                <Col>
                  {" "}
                    
                </Col>

                <Col> </Col>
                <Col>
                
                </Col>
                <Col>
                  {" "}
                
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>

              < Row>
                <Col>
                  <Label style={{marginLeft:"20px"}}>Gate</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    bsSize="sm"
                  />
    
                </Col>
                <Col>
                  {" "}
                    
                </Col>

                <Col> </Col>
                <Col>
                
                </Col>
                <Col>
                  {" "}
                
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>

              < Row>
                <Col>
                  <Label style={{marginLeft:"20px"}}>use_process_order</Label>
                </Col>

                <Col>
                  {" "}
                  <Input type="checkbox"
                    bsSize="sm"
                  />
    
                </Col>
                <Col>
                  {" "}
                    
                </Col>

                <Col> </Col>
                <Col>
                
                </Col>
                <Col>
                  {" "}
                
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>

</div>


              <div style={{border:"1px solid black",
                
                backgroundColor:"#0080ff",
                marginLeft:"0px",
                marginTop:"3px"
            }}
                
                
                
                >

<span>
    <b> Silo Loading</b>
</span>


                </div>

             

</div>




                <ReactTable
                  className="-striped -highlight "
                //   data={this.state.data}
                  columns={columns}
                  defaultPageSize={10}
                  showPaginationTop= {true}
                  filterable
                />



<div
              
              style={{
                border: "1px solid lightblue",
                marginLeft:"0px",
                backgroundColor:"#0080ff"
              }}
              
              
              >
              <IoArrowForwardCircleSharp />
              <span style={{color:"black",
            
               
            }}>
                {" "}
                
                  {" "}
                  <b>
                    Repacking Lines
                  </b>
               
              </span>
              <br />
              </div>

              <div
              
              style={{
                border: "1px solid lightblue",
                marginLeft:"0px",
                backgroundColor:"#0080ff"
              }}
              
              
              >
              <IoArrowForwardCircleSharp />
              <span style={{color:"black",
            
               
            }}>
                {" "}
                
                  {" "}
                  <b>
                    Preparation Lines
                  </b>
               
              </span>
              <br />
              </div>




            </React.Fragment>
          );
        }
}

export default Silo_Edit;