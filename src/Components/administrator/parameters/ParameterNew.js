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
import { properties } from "../../../Properties/Properties";
import axios from "axios";
const CreateParameterValue = properties.Port + properties.CreateParameterValue;


export default class ParameterNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      category: "",
      code: "",
      mDate: "",
      mUsername: "",
      parameterValue: "",
      siteExtensible: "",
      versionLock: "",
    };
  }

  backHandler=()=>{
    console.log("calling back handler for list")
    remover("ParameterNew")
    this.props.NewCloseHandler()
  }

  onchangehandler = (event) => {
    console.log("onchangehandler");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  SubmitHandler = () => {
    console.log("posting data", this.state);
    axios
      .post(CreateParameterValue, this.state)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({
            message: "Data Saved Successfully",
          });

          // ProductHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                        <a style={{cursor:"pointer" }}onClick={this.backHandler}>Parameter Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer" }} onClick={this.backHandler}>Parameter Management</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer" }}>Parameter Edition</a>
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
<a style={{cursor:"pointer" }}onClick={this.SubmitHandler}>Create</a>{" "}
{" "}<FaSave
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaSave>{" "}
{/* <button >Configure</button> */}
<a style={{cursor:"pointer" }}>Create and Select</a>{" "}
              


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
                  <Label>ID</Label>{" "}
                </Col>

                <Col>
                
                <Input bsSize="sm" 
                 value={this.state.code}
                 name="code"
                 onChange={this.onchangehandler}/>
                    
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>
 
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Description</Label>{" "}
                </Col>

                <Col>
                <Input bsSize="sm"
                value={this.state.versionLock}
                name="versionLock"
                onChange={this.onchangehandler} />
                    
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
                  <Label>Value</Label>{" "}
                </Col>

                <Col>
                
                <Input bsSize="sm" 
                value={this.state.parameterValue}
                name="parameterValue"
                onChange={this.onchangehandler}/>
                    
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Category</Label>{" "}
                </Col>

                <Col>
                
                <Input
                    type="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    value={this.state.category}
                    name="category"
                    onChange={this.onchangehandler}
                  >
                   <option value="">---select---</option>
                  <option value="600">No Prime</option>
                  <option value="200">Prime</option>
                  <option value="300">Scrap</option>
                  </Input>
                  
                </Col>
              

                <Col><input type="checkbox" />   </Col>
                <Col><Label>For super administrator </Label> </Col>
               
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Extensible</Label>{" "}
                </Col>

                <Col>
                
                <input type="checkbox" 
                
                value={this.state.siteExtensible}
                name="siteExtensible"
                onChange={this.onchangehandler}
                />
                    
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>


              


            </div>    

            </div>       
            
              }
          
        </Container>
      </React.Fragment>
    )
  }
}
