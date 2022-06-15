import React, { Component } from "react";
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
import { IoIosArchive, IoIosRefresh, IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";


 class Silo_Loading_Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      silolist: false,
    };
  }

  render() {
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
          {this.state.silolist === true ? (
            <Silo_Loading_Edit/>
          ) : (
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
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Silo Loading Search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Silo Loading Management</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Silo Loading edition</a>
                  </b>
                </u>
              </span>
              <br />
              <Row>
                  <Col></Col>
              <Col></Col>
              <Col></Col>
             
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <span  style={{
            color:"lightgreen",}}><IoIosSkipBackward/><u><b>prev record</b></u></span>
              <span style={{marginLeft:"8px" ,
            color:"lightgreen",
            }}><IoIosSkipForward/><u><b>next record</b></u></span>
            <span 
              
              style={{
            color:"orange",
            marginLeft:"8px"
          }}
              
              ><IoIosRefresh/><u><b>Refresh</b></u></span>
              
             <Col></Col>             

              </Row>
              <div
                style={{
                  border: "1px",
                  border: "1px solid black",
                  marginTop:"20px",
                  backgroundColor: "#0080ff"
                }}
              >
                <IoIosArchive/> 

                <b style={{ marginLeft: "5px" }}
                 
                >Description</b>
               
              </div>
              <div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Company</Label>{" "}
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
                  <Label>Silo_no_L3</Label>{" "}
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
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Reception ID</Label>{" "}
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

                <Col></Col>
                <Col>
                  <Label>Reception line ID</Label>{" "}
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
              </Row>
              
             


              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Status</Label>{" "}
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

                <Col></Col>
                <Col>
                  <Label>Rejection status</Label>{" "}
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
              </Row>
             
              <div  style={{
                  border: "1px",
                  border: "1px solid black",
                  marginTop:"35px",
                  backgroundColor: "#0080ff"
                }}>
                     <IoIosArchive/> 
                <span><b>Logistic Data</b></span>

                </div>
                <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Material_code</Label>{" "}
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
                  <Label>Grade</Label>{" "}
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
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Content status</Label>{" "}
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

                <Col></Col>
                <Col>
                  <Label>Batch</Label>{" "}
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
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Density</Label>{" "}
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

                <Col></Col>
                <Col>
                 {" "}
                </Col>
                <Col>
                  {" "}
                  
                   
                </Col>
                <Col>
                  {" "}
                </Col>
                <Col> </Col>
              </Row>

              <div  style={{
                  border: "1px",
                  border: "1px solid black",
                  marginTop:"35px",
                  backgroundColor: "#0080ff"
                }}>
                     <IoIosArchive/> 
                <span><b>Quantities</b></span>

                </div>
                <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Qty to load(T)</Label>{" "}
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
                 {" "}
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




              <div
              
              style={{
                border: "1px solid lightblue",
                backgroundColor: "#0080ff",
                marginTop:"35px"
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



            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default Silo_Loading_Edit;