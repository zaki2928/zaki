import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { ModificationData, remover } from '../../../../../store/Store';
import { FaPrint,FaFileExport,FaCalendarCheck } from 'react-icons/fa';
import {
  Label,
  Input,
  
} from "reactstrap";
import Swal from "sweetalert2";
class CreationForm extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
        };
      }

      validateHandler(){
        Swal.fire({
          title: 'Confirmation',
          text: "Do you confirm the Validation?",
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
        
          }
        
          backHandler=()=>{
            remover("Cells Modification")
            this.props.backHandler()
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
                        <a>Cells Creation</a>
                      </b>
                    </u>
                    
                  </span>
                  <br />
              </div>

                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      marginTop: "10px"
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Stock Criteria</b>
                  </div>
                  
                  <Container
              className="themed-container"
              fluid={true}
              style={{ border: "1px solid black",marginTop: "10px" }}
            >
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Region</Label>
                  
                </Col>

                <Col>
                <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
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
                  <Label>Short Description)</Label>
                </Col>
                <Col>
                <Input bsSize="sm" />
                </Col>
               
                <Col> </Col>
              </Row>
             

              <Row style={{ marginTop: "10px",marginBottom:"10px" }}>
                <Col>
                  <Label>Cell</Label>{" "}
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
                    <option>Cell 1250 * 850</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
              </Container>
                    
              <Container
              className="themed-container"
              fluid={true}
              style={{ border: "1px solid black",marginTop: "10px" }}
            >
                <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Length(m)</Label>
                  
                </Col>

                <Col>
                <Input bsSize="sm" />
                </Col>
                

                <Col> </Col>
                <Col>
                  <Label>Width(m)</Label>
                </Col>
                <Col>
                <Input bsSize="sm" />
                </Col>
               
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Height(m)</Label>
                  
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
                <Row style={{ marginTop: "10px",marginBottom:"10px" }}>
                <Col>
                  <Label>Storage Family Profile</Label>{" "}
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
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                </Col>
                <Col></Col>
                <Col><Label>Rotation</Label>{" "}</Col>
                <Col>  <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option>A</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input></Col>
                <Col></Col>
              </Row>
              </Container>
              <Container
              className="themed-container"
              fluid={true}
              style={{ border: "1px solid black",marginTop: "10px" }}>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label></Label>
                </Col>

                <Col>
                
                <Label>Region</Label>
                </Col>

                <Col>
                  <Label>Desc 1</Label>
                </Col>
                
                <Col>
                  
                <Label>Desc 2</Label>
                </Col>
             

                <Col>
                <Label>Desc 3</Label>
                </Col>

                <Col>
                <Label>Desc 4</Label>
                </Col>
                   
              </Row>
              <Row style={{ marginTop: "5px" }}>
              <Col>
                
                <Label>Region Start</Label>
                </Col>
                <Col>
                <Input bsSize="sm" />
                </Col>

                <Col>
                
                <Input bsSize="sm" />
                </Col>

                <Col>
                <Input bsSize="sm" />
                </Col>
                
                <Col>  
                <Input bsSize="sm" />
                </Col>
             

                <Col>
                <Input bsSize="sm" />
                </Col>
                   
              </Row>

              <Row style={{ marginTop: "5px" }}>
              <Col>
                
                <Label>Number</Label>
                </Col>
                <Col>
                <Input bsSize="sm" />
                </Col>

                <Col>
                
                <Input bsSize="sm" />
                </Col>

                <Col>
                <Input bsSize="sm" />
                </Col>
                
                <Col>  
                <Input bsSize="sm" />
                </Col>
             

                <Col>
                <Input bsSize="sm" />
                </Col>
                   
              </Row>
              <Row style={{ marginTop: "5px" }}>
              <Col>
                
                <Label>Region End</Label>
                </Col>
                <Col>
                <Input bsSize="sm" />
                </Col>

                <Col>
                
                <Input bsSize="sm" />
                </Col>

                <Col>
                <Input bsSize="sm" />
                </Col>
                
                <Col>  
                <Input bsSize="sm" />
                </Col>
             

                <Col>
                <Input bsSize="sm" />
                </Col>
                   
              </Row>
              <Row style={{ marginTop: "5px" ,marginBottom: "10px"}}>
              <Col>
                
                <Label>Steps</Label>
                </Col>
                <Col>
                <Input bsSize="sm" />
                </Col>

                <Col>
                
                <Input bsSize="sm" />
                </Col>

                <Col>
                <Input bsSize="sm" />
                </Col>
                
                <Col>  
                <Input bsSize="sm" />
                </Col>
             

                <Col>
                <Input bsSize="sm" />
                </Col>
                   
              </Row>
             
              </Container>
              <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      marginTop: "10px"
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Location Server</b>
                  </div>
                  <Container
              className="themed-container"
              fluid={true}
              style={{ border: "1px solid black",marginTop: "10px" }}>
                  <input type="radio" value="" name="" /> Cubing Infinite <br></br>
                  <input type="radio" value="" name="" /> Destruction Infinite<br></br>
                  <input type="radio" value="" name="" /> GoodsIn Infinite<br></br>
                  <input type="radio" value="" name="" /> Launching Infinite<br></br>
                  <input type="radio" value="" name="" /> Picking Dynamic<br></br>
                  <input type="radio" value="" name="" /> Picking Infinite<br></br>
                  <input type="radio" value="" name="" /> Picking Manual<br></br>
                  <input type="radio" value="" name="" /> Preparation Infinite<br></br>
                  <input type="radio" value="" name="" /> Shipping Infinite<br></br>
                  <input type="radio" value="" name="" /> Stock Buffer Manual<br></br>
                  <input type="radio" value="" name="" /> Stock Infinite<br></br>
                  <input type="radio" value="" name="" /> Stock Manual<br></br>
                  <input type="radio" value="" name="" /> Stock Rack<br></br>
                  <input type="radio" value="" name="" /> Transit Infinite<br></br>
                  <input type="radio" value="" name="" /> Logical Resa Infinite<br></br>
                  </Container>
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      marginTop: "10px"
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Preparation</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Sector</Label>
                  
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
                  Validate
                </Button>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
              </Container>
              
            </React.Fragment>
            
        );
    }
}

export default CreationForm;