import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Label,
  Input,

} from "reactstrap";
import "react-table-v6/react-table.css";
import { FaSave} from 'react-icons/fa';
import { remover } from "../../../store/Store";


export default class SiteParamNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packinglinefilter: false,
    };
  }

  backHandler=()=>{
    console.log("calling back handler for list")
    remover("SiteParamNew")
    this.props.customerCloseHandler()
  }

  render() {
    
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          // style={{ border: "1px solid black", marginLeft: "14px" }}
        >
            {

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
                        <a onClick={this.backHandler}>Site Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a onClick={this.backHandler}>Site Management</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Site Parameter Edition</a>
                      </b>
                    </u>
                  </span>
                  <br />
              
              
              <div>
              <div class="row-xs-6 bottom-row "style={{marginBottom:"10px",marginTop:"10px"}}>
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
                <b style={{ marginLeft: "5px" }}>Status</b>
              </div>
             
 
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Description</Label>{" "}
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
                <Col> </Col>
               
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Comment</Label>{" "}
                </Col>

                <Col>
                
                <Input bsSize="sm" />
                    
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Category</Label>{" "}
                </Col>

                <Col>
                
                <Input bsSize="sm" />
                    
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Value</Label>{" "}
                </Col>

                <Col>
                
                <Input bsSize="sm" />
                  
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>
              <br/>


              


            </div>    

            </div>       
            
              }
          
        </Container>
      </React.Fragment>
    )
  }
}
