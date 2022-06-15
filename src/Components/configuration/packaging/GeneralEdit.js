import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
    FormGroup,
    Button,
  } from "reactstrap";
  import ReactTable from "react-table-v6";
  import "react-table-v6/react-table.css";
  import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
  IoBulb,
  IoCheckbox,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaSave} from 'react-icons/fa';
import { GeneralEditData, remover } from '../../../store/Store';
import {ImCheckboxUnchecked} from "react-icons/im";
import axios from "axios";
import { properties } from '../../../Properties/Properties';
import { PACKAGING } from '../../../store/RoleBased';

const createPackagingKL = properties.Port + properties.createPackagingKL
class GeneralEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
          data: [],
          idPackagingStk:"",
          calculVolume:"",
          defaultPackaging:"",
          description:"",
          descriptionShort:"",
          heightEXT:"",
          lenthEXT:"",
          widthEXT:"",
          emptyWeigth:"",
          typePackaging:"",
	        mDate:"",
          mUsername:"",
          versionLock:"",
          idPackaging:"",
          heightINT:"",
          lenthINT:"",
          widthINT:"",
      
    };
  }

  
  componentDidMount(){
    console.log("calling Repacking Edit edit", GeneralEditData);
    console.log("calling edit data length", this.state.data.length);
    console.log("calling edit datttaaaaaaaaaaaaa&&&&&&aaaa", this.props.data2);
    console.log("calling edit ", GeneralEditData);
  
    if (GeneralEditData !== null) {
      this.setState(
        {
          data: GeneralEditData,
        },
        () => {
          console.log("data present after tab switch", this.state.data);
          this.setState({
           
            idPackaging: GeneralEditData.idPackaging, 
            description: GeneralEditData.description, 
            descriptionShort: GeneralEditData.descriptionShort, 
            typePackaging: GeneralEditData.typePackaging,
            calculVolume: GeneralEditData.calculVolume,
            emptyWeigth: GeneralEditData.emptyWeigth,
            lenthEXT: GeneralEditData.lenthEXT, 
            widthEXT: GeneralEditData.widthEXT, 
            heightEXT:GeneralEditData.heightEXT, 
            lenthINT: GeneralEditData.lenthINT, 
            widthINT: GeneralEditData.widthINT, 
            heightINT:GeneralEditData.heightINT, 
           
         
          });
        }
      );
    }
  }


  SubmitHandler = () => {
    console.log("submit handler calling general new", this.state);
    axios
      .post(createPackagingKL, this.state)
      // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
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
    console.log("calling back handler for list")
    remover("GeneralEdit")
    this.props.editClosehandler()
  }


    render() {
      
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
                    <a style={{cursor:"pointer"}} onClick={this.backHandler}>Packaging search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a >Packaging edition</a>
                  </b>
                </u> &nbsp;&nbsp;
                <span style={{ fontWeight: "bold", color: "green" }}>
              {this.state.message}
              <br />
            </span>


                <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      marginTop: "10px"
                    }}
                  >
                    

                    <b style={{ marginLeft: "5px" }}><b>&gt;&gt;</b>General</b>
                  </div>
                  <FaSave></FaSave>
                  {PACKAGING===2 ?  <a style={{ cursor: "pointer", fontWeight: "bold", color: "blue" }}>
              <u onClick={this.SubmitHandler}>Save</u>
            </a> : ''}
                  {/* <span onClick={this.SubmitHandler}><u>Save</u></span> */}
                  <div 
                    style={{
                      border: "1px",
                      //backgroundColor: "grey",
                     // border: "1px solid black",
                      
                    }}
                  >
                  
                    <b style={{ marginLeft: "5px" }}><li>Description</li></b>
                  </div>

              </span>
              <hr></hr>
              <div style={{
                marginLeft:"15px"
            
            }}>
  <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>ID</Label>
                </Col>

                <Col>
                
                <Input bsSize="sm" value={this.state.idPackaging} disabled={"true"}/>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Description</Label>
                </Col>
                
                <Col>
                  
                <Input
                  bsSize="sm"
                  value={this.state.description}
                  required="true"
                  name="description"
                  onChange={this.onchangehandler}
                />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Short Description</Label>
                </Col>
                
                <Col>
                  
                <Input
                  bsSize="sm"
                  value={this.state.descriptionShort}
                  required="true"
                  name="descriptionShort"
                  onChange={this.onchangehandler}
                />
                </Col>
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Type</Label>
                </Col>

                <Col>
                <Input
                  type="select"
                  bsSize="sm"
                  value={this.state.typePackaging}
              
                  name="typePackaging"
                  
                  disabled="true"
                >
                  <option value="100">_Pallet_</option>
                  <option value="200">_Scrap_</option>
                  <option value="300">_Trailer_</option>
                  <option value="400">_Product_</option>
                </Input>
              
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Volume Type</Label>
                </Col>
                
                <Col>
                  
                <Input
                  type="select"
                  bsSize="sm"
                  value={this.state.calculVolume}
                 
                  name="calculVolume"
                  
                  disabled="true"
                >
                  <option value="100">_UL_</option>
                  <option value="200">_Packaging_</option>
                
                </Input>
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Empty Weight </Label>
                </Col>
                
                <Col>
                
                <Input
                  bsSize="sm"
                  value={this.state.emptyWeigth}
                  required="true"
                  onChange={this.onchangehandler}
                  name="emptyWeigth"
                />
                </Col>
                <Col> </Col>                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Default</Label>
                </Col>

                <Col>
                
                  <input type ="checkbox" id="myid"></input> 
                </Col>

                <Col> </Col>
                <Col>
                 
                </Col>
                
                <Col>
                  
                </Col>
                <Col> </Col>

                <Col>
              
                </Col>
                
                <Col>
                  
                </Col>
                <Col> </Col>
                
              </Row>    

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>External Lenght(cm)</Label>
                </Col>

                <Col>
                
                <Input
                  bsSize="sm"
                  value={this.state.lenthEXT}
                  required="true"
                  onChange={this.onchangehandler}
                  name="lenthEXT"
                />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>External Width(cm)</Label>
                </Col>
                
                <Col>
                  
                <Input
                  bsSize="sm"
                  value={this.state.widthEXT}
                  required="true"
                  onChange={this.onchangehandler}
                  name="widthEXT"
                />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>External Height(cm)</Label>
                </Col>
                
                <Col>
                  
                <Input
                  bsSize="sm"
                  value={this.state.heightEXT}
                  required="true"
                  onChange={this.onchangehandler}
                  name="heightEXT"
                />
                </Col>
                <Col> </Col>
                
              </Row>    
             
</div>

<div>
<hr></hr>

<ImCheckboxUnchecked style={{cursor:'pointer'}} onClick={()=>{this.setState({show2:!this.state.show2})}}

>{ this.state.show2}</ImCheckboxUnchecked>
            {" "}
              <b >Active </b>{" "}
              <b style={{ marginLeft: "5px" }}><b>&gt;&gt;</b>Preparation</b>
</div>


{this.state.show2? <div>
  
  <Row style={{border:"1px solid black",backgroundColor:"grey",marginLeft:"0px",marginTop:"3px"}}>
<span>
<IoArrowForwardCircleSharp >

</IoArrowForwardCircleSharp>
<b> Dimensions</b> 
</span>

</Row>

  <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Internal Lenght(cm)</Label>
                </Col>

                <Col>
                
                <Input
                  bsSize="sm"
                  value={this.state.lenthINT}
                  required="true"
                  onChange={this.onchangehandler}
                  name="lenthINT"
                />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Internal Width(cm)</Label>
                </Col>
                
                <Col>
                  
                <Input
                  bsSize="sm"
                  value={this.state.widthINT}
                  required="true"
                  onChange={this.onchangehandler}
                  name="widthINT"
                />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Internal Height(cm)</Label>
                </Col>
                
                <Col>
                  
                <Input
                  bsSize="sm"
                  value={this.state.heightINT}
                  required="true"
                  onChange={this.onchangehandler}
                  name="heightINT"
                />
                </Col>
                <Col> </Col>
                
              </Row>    

  </div> : null
}

</div>



            </React.Fragment>
          );
        }
}

export default GeneralEdit;