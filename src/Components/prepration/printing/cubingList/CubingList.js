import React, { Component } from "react";
import ReactTable from "react-table-v6";
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import {Containerdowngradedata,containerdowngradeHandler} from "../../../../store/Store";
import Swal from "sweetalert2";
import axios from "axios"

 class CubingList extends Component {
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     silolist: false,
  //     data:[]
  //   };
  // }


  saveHandler(){
    Swal.fire({
        title: 'Confirmation',
        text: "Do you really want to validate?",
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
    return (
      <React.Fragment>
          
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
         
            
            
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
                    <a>Cubing List</a>
                  </b>
                </u>
              </span>
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Data Entry</b>
              </div>
             



              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Printers</Label>{" "}
                </Col>

                <Col>
                
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option>Laser L5 Gate 1</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                    
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>
 
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Document Type</Label>{" "}
                </Col>

                <Col>
                
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option>Wave</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                    
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Wave ID</Label>{" "}
                </Col>

                <Col>
                
                <Input
                   
                   bsSize="sm"
                 />
                    
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>


              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Button  onClick={()=>this.saveHandler()}>Validate</Button>{" "}

              <ReactTable
              className="-striped -highlight "
              // data={this.state.data}
              data={this.state.data.length === 0
                ? this.props.data : this.state.data
              }
              defaultPageSize={5}
              showPaginationTop= {true}
              filterable
              defaultFilterMethod={this.filterCaseInsensitive}
            />
               
              </div>

            </div>
          
        </Container>
      </React.Fragment>
    );
  }
}

export default CubingList;