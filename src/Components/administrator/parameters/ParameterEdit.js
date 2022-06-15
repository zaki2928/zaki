import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
  } from "reactstrap";
import "react-table-v6/react-table.css";
import { FaSave} from 'react-icons/fa';
import { ParameterEditData, remover } from '../../../store/Store';
import axios from "axios";
import { properties } from "../../../Properties/Properties";
import { PARAMETERS } from '../../../store/RoleBased';
const UpdateParameterValue = properties.Port + properties.UpdateParameterValue;
class ParameterEdit extends Component {
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


  componentDidMount() {
    console.log("calling edit data length", this.state.data.length);
    console.log( this.props.data2);
    console.log("calling edit ", ParameterEditData);

    if (ParameterEditData !== null) {
      this.setState(
        {
          data: ParameterEditData,
        },
        () => {
          console.log("data present after tab switch", this.state.data);
          this.setState({
            category: ParameterEditData.category,
            // product: ProductEditData[0].idReference,
            versionLock: ParameterEditData.versionLock,
            code: ParameterEditData.code,
            parameterValue: ParameterEditData.parameterValue,
            siteExtensible: ParameterEditData.siteExtensible,
          });
        }
      );
    }
  }

  
  SubmitHandler = () => {
    axios
      .post(UpdateParameterValue, this.state)
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

  onchangehandler = (event) => {
    console.log("onchangehandler");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  backHandler=()=>{
    remover("ParameterEdit")
    this.props.editClosehandler()
  }


    render() {
      
        return (
            <React.Fragment>
       
        <Container
          className="themed-container"
          fluid={true}
          // style={{ border: "1px solid black", marginLeft: "14px" }}
        >
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
                        <a  style={{cursor:"pointer" }}onClick={this.backHandler}>Parameter Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a onClick={this.backHandler}>Parameter Management</a>
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
            <div class="row-xs-6 bottom-row " style={{marginBottom:"10px",marginTop:"10px"}}>
            {PARAMETERS=== 2? 
            <div>
            <FaSave
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaSave>{" "}
{/* <button >Configure</button> */}
<a style={{cursor:"pointer" }} onClick={this.SubmitHandler}>Save</a>{" "}
</div>
:''}
 </div>
             
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop : "3px"
                }}
              >
                <b style={{ marginLeft: "5px" ,}}>Satus</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>ID</Label>{" "}
                </Col>

                <Col>
                
                <Input
                  bsSize="sm"
                  value={this.state.code}
                  name="code"
                  onChange={this.onchangehandler}
                />
                    
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>
 

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Comment</Label>{" "}
                </Col>

                <Col>
                
                <Input bsSize="sm" 
                 onChange={this.onchangehandler}/>
                    
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Value</Label>{" "}
                </Col>

                <Col>
                
                <Input
                  bsSize="sm"
                  value={this.state.parameterValue}
                  name="parameterValue"
                  onChange={this.onchangehandler}
                />
                    
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
                  name="category"
                  id="exampleSelect"
                  // style={{ width: "50px" }}
                  bsSize="sm"
                  value={this.state.category}
                  onChange={this.onchangehandler}
                >
                  <option value="">---select---</option>
                  <option value="600">No Prime</option>
                  <option value="200">Prime</option>
                  <option value="300">Scrap</option>
                </Input>
                  
                </Col>
              

                <Col><input type="checkbox" />   </Col>
                <Col> <Label>For super administrator </Label></Col>
               
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Extensible</Label>{" "}
                </Col>

                <Col>
                
                <input type="checkbox" 
                 onChange={this.onchangehandler}
                 
                name="siteExtensible" 
                value={this.state.siteExtensible}
                 />
                    
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>
            </div>    
        
            
        </Container>
       
      </React.Fragment>
        );
    }
}

export default ParameterEdit;