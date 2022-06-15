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
import OrderList from "./PackagingList";
import "react-table-v6/react-table.css";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { remover } from "../../../store/Store";
import ReactTable from "react-table-v6";
import { FaRegCopy,FaRegFolder} from 'react-icons/fa';
import {PreparationNewData , PreparationNewHandler} from "../../../store/Store";
import {ImCheckboxChecked, ImCheckboxUnchecked} from "react-icons/im";
import axios from "axios";
import { properties } from '../../../Properties/Properties';

const createPackagingKL = properties.Port + properties.createPackagingKL
export default class PreparationNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packinglinefilter: false,
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
    console.log("calling general new datttaaaaaaaaaaaaaaaaa")
    if (PreparationNewData.length === 0) {
      console.log("length is zero");
      this.state.data.push(this.props.generalArr);
      console.log("after data pushed in table", this.state.data);
    } else {
      console.log("length is not zero", PreparationNewData);
     
     this.setState({
           data:PreparationNewData,
			      // idPackaging: PreparationNewData[0].idPackaging, 
            // description: PreparationNewData[0].description, 
            
            // descriptionShort: PreparationNewData[0].descriptionShort, 
            // typePackaging: PreparationNewData[0].typePackaging,
            // calculVolume: PreparationNewData[0].calculVolume,
            // emptyWeigth: PreparationNewData[0].emptyWeigth,
            // lenthEXT: PreparationNewData[0].lenthEXT, 
            // widthEXT: PreparationNewData[0].widthEXT, 
            // heightEXT:PreparationNewData[0].heightEXT, 
            // lenthINT: PreparationNewData[0].lenthINT, 
            // widthINT: PreparationNewData[0].widthINT, 
            // heightINT:PreparationNewData[0].heightINT, 
    },
    ()=>{
      console.log("after data pushed(inside packaging list) in table line 91", this.state.data);
    }
    
    )
      
    }
  }

  SubmitHandler = () => {
    console.log("submit handler calling preparation new", this.state);
    axios
      .post(createPackagingKL, this.state)
      // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({
            message: "Data Saved Successfully",
           
          });
         

          
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
    remover("PreparationNew")
    this.props.prparationnewClosehandler()
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
                <OrderList />
              ) : (
                
              
            
            <div>
              <IoArrowBackCircleSharp onClick={this.backHandler} />
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
                    <a>Packagings Search</a>
                  </b>
                </u>{""}
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Packagings Management</a>
                  </b>
                </u>
                
              </span>
              <br />
              <br />
              <span style={{ fontWeight: "bold", color: "green" }}>
              {this.state.message}
              <br />
            </span>
              
              <div>
            <div class="row-xs-6 bottom-row ">
            <FaRegFolder
                  style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
                  color="primary"
                  onClick={this.SubmitHandler}
                >
                  
                </FaRegFolder>{" "}
{/* <button >Configure</button> */}
<a  >Create</a>{" "}

<FaRegCopy
                  style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
                  color="primary"
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaRegCopy>{" "}
{/* <button >Configure</button> */}
<a href="#" >Create & Select</a>{" "}
              


 </div>

            <div
                style={{
                  border: "1px",
                  // backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop : "10px"
                }}
              >
                <b style={{ marginLeft: "5px" }}><b>&gt;&gt;General</b></b>
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
                  <Label>ID</Label>
                </Col>

                <Col>
                
                <Input
                  bsSize="sm"
                  value={this.state.idPackaging}
                 required="true"
                  name="idPackaging"
                  onChange={this.onchangehandler}
                  type="text"
                  title="enter idPackaging(String) "
                  min="0"
                  placeholder="String Type"
                  
                />
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
                  type="text"
                  title="enter description(String) "
                  min="0"
                  placeholder="String Type"
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
                  type="text"
                  title="enter descriptionShort(String) "
                  min="0"
                  placeholder="String Type"
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
                  required="true"
                  name="typePackaging"
                  onChange={this.onchangehandler}
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
                  
                {/* <Input bsSize="sm" value={this.state.calculVolume} disabled={"true"} /> */}
                <Input
                  type="select"
                  bsSize="sm"
                  value={this.state.calculVolume}
                  required="true"
                  name="calculVolume"
                  onChange={this.onchangehandler}
                >
                  <option value="100">_UL_</option>
                  <option value="200">_Packaging_</option>
                
                </Input>
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Empty Weight(kg)</Label>
                </Col>
                
                <Col>
                 
                <Input
                  bsSize="sm"
                  value={this.state.emptyWeigth}
                  required="required"
                  onChange={this.onchangehandler}
                  name="emptyWeigth"
                  type="number"
                  title="enter weight(Float) "
                  min="0"
                  placeholder="FloatType"
                />
                
                </Col>
                <Col> </Col>
                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Default</Label>
                </Col>

                <Col>
                
                <input type="checkbox" id="myid"></input>
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
                  <Label>External Length(cm)</Label>
                </Col>

                <Col>
                
                <Input
                  bsSize="sm"
                  value={this.state.lenthEXT}
                  required="true"
                  onChange={this.onchangehandler}
                  name="lenthEXT"
                  title="enter lenthEXT(Float) "
                  min="0"
                  placeholder="Float Type"
                  type="number"
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
                  title="enter widthEXT(Float) "
                  min="0"
                  placeholder="Float Type"
                  type="number"
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
                  title="enter heightEXT(Float) "
                  min="0"
                  placeholder="Float Type"
                  type="number"
                />
                </Col>
                <Col> </Col>
                
              </Row>

              <hr/>
              <div>
<hr></hr>

<ImCheckboxUnchecked style={{cursor:'pointer'}} onClick={()=>{this.setState({show2:!this.state.show2})}}

>{ this.state.show2}</ImCheckboxUnchecked>
            {" "}
              <b >Active </b>{" "}
              <b style={{ marginLeft: "5px" }}><b></b>Stock</b>
</div>


{this.state.show2? <div>
  <ImCheckboxChecked style={{cursor:'pointer'}}

></ImCheckboxChecked>
            {" "}
              <b >Active </b>{" "}
              <b style={{ marginLeft: "5px" }}><b>&gt;&gt;</b>Stock</b>
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
                  title="enter lenthINT(Float) "
                  min="0"
                  placeholder="Float Type"
                  type="number"
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
                  title="enter widthINT(Float) "
                  min="0"
                  placeholder="Float Type"
                  type="number"
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
                  title="enter heightINT(Float) "
                  min="0"
                  placeholder="Float Type"
                  type="number"

                  
                />
                </Col>
                <Col> </Col>
                
              </Row>    

  </div> : null
}


<div>
<hr></hr>

<ImCheckboxUnchecked style={{cursor:'pointer'}} onClick={()=>{this.setState({show:!this.state.show})}}

>{ this.state.show}</ImCheckboxUnchecked>
            {" "}
              <b >Active </b>{" "}
              <b style={{ marginLeft: "5px" }}>Preparation</b>
</div>


{this.state.show? <div>
  <ImCheckboxChecked></ImCheckboxChecked>
  {" "}
    <b >Active </b>{" "}
    <b style={{ marginLeft: "5px" }}><b>&gt;&gt;</b>Preparation</b>
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
                  title="enter lenthINT(Float) "
                  min="0"
                  placeholder="Float Type"
                  type="number"
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
                  title="enter widthINT(Float) "
                  min="0"
                  placeholder="Float Type"
                  type="number"
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
                  min="0"
                  placeholder="Float Type"
                  type="number"
                />
                </Col>
                <Col> </Col>
                
              </Row>    

  </div> : null
}

                    
            </div>           
              

            </div>       
            
              )}
          
        </Container>
      </React.Fragment>
    )
  }
}
