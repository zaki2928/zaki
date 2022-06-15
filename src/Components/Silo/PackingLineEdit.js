import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";
import PackingLineList from "../Silo/PackingLineList";
import "react-table-v6/react-table.css";
import ReactTable from "react-table-v6";

export default class PackingLineEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packinglinefilter: false,
    };
  }
  render() {
    const columns = [
       
        {
        Header: "ID",
        accessor: "display",
          },
      {
        Header: "Folder ID",
        accessor: "Edit",
      },
      {
        Header: "Folder Line ID",
        accessor: "Delete",
        
      },
      {
        Header: "Reception Type",
        accessor: "display",
      },
      {
        Header: "Packing Line ID",
        accessor: "Description",
      },
      {
        Header: "Reference From",
        accessor: "isAvailable",
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
        accessor: "modifiedby",
      },
      {
        Header: "Product Unit",
        accessor: "modifiedby",
      },
      {
        Header: "Intermediate Material Code",
        accessor: "modifiedby",
      },
      {
        Header: "Grade",
        accessor: "modifiedby",
      },
      {
        Header: "Qty to Repack",
        accessor: "modifiedby",
      },
      {
        Header: "Qty Repacked",
        accessor: "modifiedby",
      },
      {
        Header: "Comments",
        accessor: "modifiedby",
      },
      {
        Header: "Batch",
        accessor: "modifiedby",
      },
      {
        Header: "Final Content Status Id",
        accessor: "modifiedby",
      },
      {
        Header: "Status",
        accessor: "modifiedby",
      },
      {
        Header: "Rejection Status",
        accessor: "modifiedby",
      },
      {
        Header: "Start Date",
        accessor: "modifiedby",
      },
      {
        Header: "End Date",
        accessor: "modifiedby",
      },
      {
        Header: "Modified the",
        accessor: "modifiedby",
      },
      {
        Header: "Modified By",
        accessor: "modifiedby",
      },
      
    ];
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
            {
              this.state.packinglinefilter===true?(
                <PackingLineList />
              ) : (

              
            
            <div>
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>*Description</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Material Type</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Packing Line L3</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
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

                <Col> </Col>
                <Col>
                  <Label>Type</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Packaging Line DCS</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col> </Col>
              </Row>              
            </div>            
              )}
          {/* {this.state.silolist === true ? (
            <SiloRepackingList />
          ) : } */}
        </Container>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
            {
              this.state.packinglinefilter===true?(
                <PackingLineList />
              ) : (           
            <div>
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>*Counter Packing Line</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Counter Bag</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Counter met</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Counter Fracture</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Counter Unweight</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Counter Error</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Bag Number</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Start Batch</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>End Batch</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
<container>
<div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>*Repacking Lines</b>
              </div>

              <ReactTable
          className="-striped -highlight "
          //   data={this.state.data}
          columns={columns}
          defaultPageSize={2}
          
        />
</container>   
            </div>       
              )}
          
        </Container>
      </React.Fragment>
    )
  }
}
