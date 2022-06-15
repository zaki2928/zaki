import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Label,
  Input,

} from "reactstrap";
import SitesList from "./SitesList";
import "react-table-v6/react-table.css";
import { FaSave} from 'react-icons/fa';
import { remover } from "../../../store/Store";


export default class RegionNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packinglinefilter: false,
    };
  }

  backHandler=()=>{
    console.log("calling back handler for list")
    remover("RegionNew")
    this.props.customerCloseHandler()
  }

  render() {
    
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
            {
              this.state.packinglinefilter===true?(
                <SitesList />
              ) : (
                
              
            
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
                        <a onClick={this.backHandler}>Sites Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Sites Management</a>
                      </b>
                    </u>
                  </span>
              
              <br />
              
              
              <div>
              <div class="row-xs-6 bottom-row ">
            <FaSave
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaSave>{" "}
{/* <button >Configure</button> */}
<a >Create</a>{" "}
{" "}<FaSave
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaSave>{" "}
{/* <button >Configure</button> */}
<a >Create and Select</a>{" "}
              


 </div>

 <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop : "3px"
                }}
              >
                <b style={{ marginLeft: "5px" }}>Description</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Description</Label>
                </Col>
                
                <Col>
                  
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Short Description</Label>
                </Col>
                
                <Col>
                  
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Site</Label>
                </Col>

                <Col>
                
                <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "50px" }}
                        bsSize="sm"
                      >
                        <option>Saudi Kayan</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                </Col>

                <Col> </Col>
               
                <Col>
                  <Label>Warehouse</Label>
                </Col>
                
                <Col>
                  
                <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "50px" }}
                        bsSize="sm"
                      >
                        <option>Remote Terminal 1</option>
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
                  <Label>Default Region</Label>
                </Col>

                <Col>
                
                <input type="checkbox" id="myid"></input>
                </Col>

                <Col> </Col>
                
                
                <Col>
                 
                </Col>
                <Col> </Col>

                <Col>
                
                </Col>
                
               
                
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Mode Transit Location</Label>
                </Col>

                <Col>
                
                <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "50px" }}
                        bsSize="sm"
                      >
                        <option>Never</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                </Col>

                <Col> </Col>
               
                <Col>
                  <Label>Location Scan Mode</Label>
                </Col>
                
                <Col>
                  
                <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "50px" }}
                        bsSize="sm"
                      >
                        <option>Both</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                </Col>
                <Col> </Col>
                

              
                
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Combination Cell</Label>
                </Col>

                <Col>
                
                <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "50px" }}
                        bsSize="sm"
                      >
                        <option>All</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                </Col>

                <Col> </Col>
               
                <Col>
                  <Label>Cells Order</Label>
                </Col>
                
                <Col>
                  
                <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "50px" }}
                        bsSize="sm"
                      >
                        <option>_RACL_</option>
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
                  <Label>Alphabet</Label>
                </Col>

                <Col>
                
                <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "50px" }}
                        bsSize="sm"
                      >
                        <option>Alphabet alphanumeric</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                </Col>

                <Col> </Col>
               
                <Col>
                 
                </Col>
                
                <Col>
                </Col>
                <Col> </Col>
              </Row>
               </div>           
               <div>
              <hr/>
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop : "10px"
                }}
              >
                <b style={{ marginLeft: "5px" }}>Cells Order Description</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Region</Label>
                </Col>

                <Col>
                
                <Label>Desc1</Label>
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
              <Row>
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

              <Row style={{marginTop:"10px",marginBottom:"10px"}}>
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


              


            </div>    

            </div>       
            
              )}
          
        </Container>
      </React.Fragment>
    )
  }
}
