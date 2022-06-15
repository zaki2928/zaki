import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
  } from "reactstrap";
import "react-table-v6/react-table.css";
import { FaLessThanEqual, FaSave} from 'react-icons/fa';
import { remover ,WarehouseEditData} from '../../../store/Store';
import axios from "axios";
import { properties } from '../../../Properties/Properties';
import { WAREHOUSE } from '../../../store/RoleBased';

const updateWarehouse = properties.Port + properties.updateWarehouse


class WarehouseEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isCheckedshipping:false,
      isCheckedWarehouse:false,
      idWarehouse: "",
      mDate: "",
   mUsername: "",
  versionLock: "",
defaultWarehouse: "",
description: "",
useShippingPosition: "",
idSite: "",
message:"",
isEdit:false,
    };
  }

  componentDidMount(){
    console.log("calling WarehouseEditData cmpdidmnt", WarehouseEditData);
    console.log("calling edit data length", this.state.data.length);
    console.log("calling edit datttaaaaaaaaaaaaa&&&&&&aaaa", this.props.data2);
    console.log("calling edit ", WarehouseEditData);
  
    if (WarehouseEditData !== null) {
      this.setState(
        {
          data: WarehouseEditData,
        },
        () => {
          console.log("data present after tab switch", WarehouseEditData);
          this.setState({
           
            idWarehouse: WarehouseEditData.idWarehouse, 
            mDate: WarehouseEditData.mDate, 
            musername: WarehouseEditData.musername, 
            description: WarehouseEditData.description,
            defaultWarehouse: WarehouseEditData.defaultWarehouse,
            useShippingPosition: WarehouseEditData.useShippingPosition, 
            idSite:WarehouseEditData.idSite,
         
          },

          ()=>{

            if(WarehouseEditData.defaultWarehouse===0){
this.setState({

  isEdit:true
})

            }
          }
          
          );
        }
      );
    }
  }
  
  
  backHandler=()=>{
    remover("WarehouseEdit")
    this.props.editClosehandler()
  }



  onchangehandler = (event) => {
    console.log("onchangehandler");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };


//     saveHandler = () => {
//     console.log("submit handler calling Warehouse new", this.state);
//     axios
//       .put("http://localhost:8080/warehouse/updateWarehouse", this.state)
//       // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
//       .then((response) => {
//         if (response.status === 200) {
//           console.log("resposne success", response.data);
//           this.setState({
//             message: "Data Saved Successfully",
            
//           });
         
//         }

// else{


//   this.setState({
//     message: "something wrong happened! ",
    
//   });

// }


//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };


saveHandler = () => {
  console.log("idwaerehouse",this.state.idWarehouse)
  console.log("description",this.state.description)
  if(this.state.description===""){
 this.setState({
   message:"value required"
 })
  }
 
  else{
    console.log("create handler calling Warehouse new", this.state);
    axios
      .put(updateWarehouse, this.state)
      // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({
            message: "Data Updated Successfully",
            
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



    render() {
      const { message } = this.state
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
                        <a style={{cursor:"pointer" }} onClick={this.backHandler}>Warehouses Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer" }} onClick={this.backHandler}>Access to Warehouses</a>
                      </b>
                    </u>
                   
                  </span>
                  <br />
            
            <div>
            {WAREHOUSE === 2? 
            <div class="row-xs-6 bottom-row ">
            <span style={{
            color: this.state.message==="data must be filled"?"red":"green"
          }}><h6>{message}</h6></span>
         
            <FaSave
                
                onClick={this.saveHandler}
                >
                  
                </FaSave>{" "}
{/* <button >Configure</button> */}
<a style={{cursor:"pointer" }}  onClick={this.saveHandler}>Save</a>{" "}
 </div> 
 :''}                   
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
                <b style={{ marginLeft: "5px" }}>Description</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>ID</Label>
                </Col>
                
                <Col><Input bsSize="sm" value={this.state.idWarehouse}   readOnly="true"/>
                </Col>
                <Col> </Col>

              
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
                disabled={this.state.isEdit===true?false:true}
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
                    bsSize="sm"
                    name="useShippingPosition"
                   onChange={this.checkBoxHandler}
                   checked={this.state.useShippingPosition===1?true:false}
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

export default WarehouseEdit;