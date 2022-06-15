import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Label,
  Input,

} from "reactstrap";
import WarehouseList from "./WarehouseList";
import "react-table-v6/react-table.css";
import { FaRegCopy,FaRegFolder} from 'react-icons/fa';
import { remover ,WarehouseNewData, WarehouseNewHandler,warehousebacktolistHandler,WarehousebacktolistData,WarehouseHandler} from "../../../store/Store";
import axios from "axios"
import { FaLessThanEqual, FaSave} from 'react-icons/fa';
import { properties } from '../../../Properties/Properties';

 const CreateUpdateWarehouse = properties.Port + properties.CreateUpdateWarehouse
 const editWarehouse = properties.Port + properties.editWarehouse
export default class WarehouseNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempArr:[],
      backtolist:false,
      backtolistdata:[],
      warehousenew:[],
      data: [],
      idWarehouse: "",
      mDate: "",
      mUsername: "",
  versionLock: "",
  defaultWarehouse: "",
description: "",
useShippingPosition: "",
idSite: "",
message:"",
success:"",

    };
  }

  backHandler=()=>{
    console.log("calling back handler for list")
    remover("WarehouseNew")
    this.props.customerCloseHandler()
  }


  // componentDidMount(){
  //   console.log("calling general new datttaaaaaaaaaaaaaaaaa")
  //   if (WarehouseNewData.length === 0) {
  //     console.log("length is zero");
  //     this.state.data.push(this.props.warehousenew);
  //     console.log("after data pushed in table", this.state.data);
  //   } else {
  //     console.log("length is not zero", WarehouseNewData);
     
  //    this.setState({
  //          data:WarehouseNewData,
			     
  //   },
  //   ()=>{
  //     console.log("after data pushed(inside warehouse ", this.state.data);
  //   }
    
  //   )
      
  //   }
  // }

 

  createHandler = () => {
    
    console.log("idwaerehouse",this.state.idWarehouse)
    console.log("idwaerehouse",this.state.description)
    if(this.state.idWarehouse===""){
   this.setState({
     message:"value required"
   })
    }
   else if(this.state.description===""){
   this.setState({
     message:" value required"
   })
    }
    else{
      console.log("create handler calling Warehouse new", this.state);
      axios
        .post(editWarehouse, this.state)
        // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
        .then((response) => {
          if (response.status === 200) {
            console.log("resposne success", response.data);
            this.setState({
              message: "Data Created Successfully",
              
            });
           
          }
  
  else{
  
  
    this.setState({
      message: "something wrong happened! ",
      
    });
  
  }
  
  
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };





  

  createSelectHandler = () => {
    const TempArr=[];
    console.log("idwaerehouse",this.state.idWarehouse)
    console.log("idwaerehouse",this.state.description)
    if(this.state.idWarehouse===""){
   this.setState({
     message:"value required"
   })
    }
   else if(this.state.description===""){
   this.setState({
     message:" value required"
   })
    }
    else{
      console.log("create handler calling Warehouse new", this.state);
      axios
        .post(CreateUpdateWarehouse, this.state)
        // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
        .then((response) => {
          if (response.status === 200) {
            console.log("resposne success", response.data);
           
            this.setState({
              tempArr:response.data,
             
              message: "Data Created Successfully",
              
            });
         
           TempArr.push(response.data)
            WarehouseHandler(TempArr);
           
          }
  
  else{
  
  
    this.setState({
    
      message: "something wrong happened! ",
      
    });
    WarehouseHandler(response.data);
  }
  
  
        })
        .catch((error) => {
          console.log(error);
        });
    }

    // this.backHandler();
    
    this.props.customerCloseHandler(TempArr)
    remover("WarehouseNew")
  };



  onchangehandler = (event) => {
    console.log("onchangehandler");
  
    this.setState({
      [event.target.name]: event.target.value,
    });
  };




  checkBoxHandler=(event)=>{
    if(event.target.checked===true){
    this.setState({
      [event.target.name]:1
    })
    
    
    }
    
    if(event.target.checked===false){
      this.setState({
        [event.target.name]:0
      })
      
      
      }
      
      }


      // validate = () => {
      //   console.log("calling validate");
      //     if (this.state.idWarehouse === "" && this.state.useShippingPosition === "") {
      //     this.setState({
      //       message: "Value required",
      //     });
      //     return false;
      //   } else if (this.state.idWarehouse === "" || this.state.useShippingPosition === "") {
      //     this.setState({
      //       message: "Value required",
      //     });
      //     return false;
      //   }   else {
      //     this.setState({
      //       message: "Success",
      //     });
      //     return true;
      //   }
      // };
    



  render() {
    const { message } = this.state
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
            {
              this.state.backtolist===true?(
                <WarehouseList 
                
               
                />
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
                        <a onClick={this.backHandler}>Warehouses Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a onClick={this.backHandler}>Access to Warehouses</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Warehouse Display</a>
                      </b>
                    </u>
                  </span>
                  <br />
              
              
              <div>
              <div class="row-xs-6 bottom-row ">
             
            
            
            <FaSave
                  style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
                  color="primary"
                  onClick={this.createHandler}
                >
                  
                </FaSave>{" "}

<a style={{cursor:"pointer" }} onClick={this.createHandler} >Create</a>{" "}
{" "}<FaRegCopy
                  style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
                  color="primary"
                  onClick={this.createSelectHandler}
                >
                  
                </FaRegCopy>{" "}

<a style={{cursor:"pointer" }} onClick={this.createSelectHandler}>Create and Select</a>{" "}
              


 </div>
 <span>
                        <span style={{
            color: this.state.message==="Something went wrong!"?"red":"green"
          }}><h6>{message}</h6></span>
                      </span>
 <div>
             
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop : "10px"
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
                  value={this.state.idWarehouse}
                 required="true"
                  name="idWarehouse"
                  onChange={this.onchangehandler}
                  
                  
                />
                </Col>
                <Col>
                {this.state.idWarehouse === "" ? (
                  <span style={{ fontWeight: "bold", color: "red" }}>
                    {this.state.message}
                  </span>
                ) : (
                  ""
                )}{" "}
              </Col>

              
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
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
                <Col>
                {this.state.description === "" ? (
                  <span style={{ fontWeight: "bold", color: "red" }}>
                    {this.state.message}
                  </span>
                ) : (
                  ""
                )}{" "}
              </Col>

              
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Default</Label>
                </Col>
                
                <Col>
                  
                <Input type="checkbox"
                checked={this.state.defaultWarehouse===1?true:false}
                
                    bsSize="sm"
                    name="defaultWarehouse"
                  onChange={this.checkBoxHandler}
                  //  value={this.state.defaultWarehouse}
                  />
                </Col>
                <Col> </Col>

              
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Use shipping position</Label>
                </Col>
                
                <Col>
                  
                <Input type="checkbox"
                checked={this.state.useShippingPosition===1?true:false}
                
                    bsSize="sm"
                    name="useShippingPosition"
                  onChange={this.checkBoxHandler}
                  //  value={this.state.defaultWarehouse}
                  />
                </Col>
                <Col> </Col>

              
                <Col> </Col>
                
              </Row>
             

            </div> 
              

            </div>    

            </div>       
            
              )}
          
        </Container>
      </React.Fragment>
    )
  }
}
