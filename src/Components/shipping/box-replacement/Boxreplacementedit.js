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
import {Boxreplacementeditdata,remover } from "../../../store/Store";
import { FaEdit } from 'react-icons/fa';




class Boxreplacementedit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      
    };
  }


  componentDidMount = () => {
    if (Boxreplacementeditdata.length === 0) {
      this.setState({
        data: this.props.tableData,
      });
    } else {
      this.setState({
        data: Boxreplacementeditdata,
      });
    }
  };
  backHandler=()=>{
    console.log("calling back handler for list")
    remover("Boxreplacementedit")
    this.props.editClosehandler()
  }
  
    
      render() {
        const columns = [
            
          {
            Header: "Edit",
            accessor: "Edit",
            filterable: false,
            Cell: (props) => {
              return (
                <FaEdit
                  style={{  cursor: "pointer" }}
                  color="primary"
                 // onClick={() => this.editHandler(props.original)}
                >
                  Edit
                </FaEdit>
              );
            },
          },
            {
                  Header: 'Delete',
                  accessor: "body",
                
                
              },
              {
                Header: "display",
                accessor: "display",
              },
        ];
        return (
            <React.Fragment>
                
<div>
              <IoArrowBackCircleSharp onClick={this.backHandler}/>
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
                    <a>Box Replacement search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}} onClick={this.backHandler}>Box Replacement Management</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Box Replacement Edition</a>
                  </b>
                </u>



              </span>
              <div style={{
                marginLeft:"15px"
            
            }}>
  <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Container type</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Container no L3</Label>{" "}
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>DS5 Box no</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Bay</Label>{" "}
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Location</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Status till</Label>{" "}
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Loading status</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Gate</Label>{" "}
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>

             
              < Row>
                <Col>
                  <Label style={{marginLeft:"15px",
                }}>use_process_order</Label>
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
                
                backgroundColor:"grey",
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
                  data={
                    this.state.data.length === 0
                      ? this.props.tableData
                      : this.state.data
                  }
                  columns={columns}
                  defaultPageSize={5}
                  //showPaginationTop= {true}
                  filterable
                />



<div
              
              style={{
                border: "1px solid lightblue",
                marginLeft:"0px",
                backgroundColor:"grey"
              }}
              
              
              >
              <IoArrowForwardCircleSharp />
              <span style={{color:"black",
            
               
            }}>
                {" "}
                
                  {" "}
                  <b>
                    shipping Lines
                  </b>
               
              </span>
              <br />
              </div>

              <div
              
              style={{
                border: "1px solid lightblue",
                marginLeft:"0px",
                backgroundColor:"grey"
              }}
              
              
              >
              <IoArrowForwardCircleSharp />
              <span style={{color:"black",
            
               
            }}>
                {" "}
                
                  {" "}
                  <b>
                    Boxreplacement Lines
                  </b>
               
              </span>
              <br />
              </div>




            </React.Fragment>
          );
        }
}

export default Boxreplacementedit;