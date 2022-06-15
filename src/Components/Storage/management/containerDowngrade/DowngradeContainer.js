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
import {Containerdowngradedata,containerdowngradeHandler} from "../../../../store/Store";
import Swal from "sweetalert2";
import axios from "axios"

 class DowngradeContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      silolist: false,
      data:[]
    };
  }


  saveHandler(){
    Swal.fire({
        title: 'Confirmation?',
        text: "Do u really want to validate!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'gray',
        cancelButtonColor: 'gray',
        confirmButtonText: 'Yes, do it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            
            'Done',
            'success'
          )
        }
      })    
}
  



componentDidMount=()=>{
console.log("calling container downgrade filter");

}
Submimthandler=()=>{
  console.log("submit handler calling")
  axios
  .get("https://jsonplaceholder.typicode.com/posts")
  .then((response) => {
    if (response.status === 200) {
      console.log("resposne success", response.data);
this.setState({
  data:response.data,
silolist:true

})

containerdowngradeHandler( response.data)
      
    }
  })
  .catch((error) => {
    console.log(error);
  });
}

backHandler=()=>{
console.log("calling back Handler")
  this.setState({

    silolist:false
  })
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
                    <a style={{curser:"pointer"}}>Container stock downgrade</a>
                  </b>
                </u>
              </span>
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Content</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>send data to SAP</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    type="checkbox"
                    name="select"
                    id="exampleSelect"
                    bsSize="sm"
                  />
                    
                </Col>
                <Col>
                  {" "}
                  
                    
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Process order</Label>{" "}
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



              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Location</Label>{" "}
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
                    <option>downgrade</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                    
                </Col>
                <Col>
                  {" "}
                  
                    
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Qty to create</Label>{" "}
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
 
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Site</Label>{" "}
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
                  <Label>Company</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                   
                    bsSize="sm"
                  >
                    <option>sabic</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>
                <Col>
                  {" "}
                

                </Col>
                <Col> </Col>
              </Row>
 

              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Product</Label>{" "}
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
                  <Label>Logic unit ID</Label>{" "}
                </Col>
                <Col>
                  {" "}
                 
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                   
                    bsSize="sm"
                  >
                    <option>=</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>
                <Col>
                  {" "}
                 
                
                 
                </Col>
                <Col> </Col>
              </Row>
              
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Content status</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                   
                    bsSize="sm"
                  >
                    <option>available</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                    
                </Col>
                <Col>
                  {" "}
                  
                    
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Quantity</Label>{" "}
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
                  <Label>Old batch</Label>{" "}
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
                
                </Col>
                <Col></Col>
                <Col>
            
                </Col>
                <Col></Col>
              </Row>

              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",

                  marginTop:"5px"
                }}
              >
                <b style={{ marginLeft: "5px",
               

            }}>Specific Packeging</b>
              </div>


              
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Packeging ID</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                   
                    bsSize="sm"
                  >
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                   
                    
                </Col>
                <Col>
                  {" "}
                
                  
                    
                </Col>
                <Col> </Col>
                <Col>
                
                </Col>
                <Col></Col>
                <Col>
            
                </Col>
                <Col></Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Height</Label>{" "}
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
                  <Label>Weight</Label>{" "}
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

              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",

                  marginTop:"5px"
                }}
              >
                <b style={{ marginLeft: "5px",
               

            }}>Status</b>
              </div>




              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Motive</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                   
                    bsSize="sm"
                  >
                    <option>=</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                   
                </Col>
                <Col>
                  {" "}
                 
                </Col>

                <Col></Col>
                <Col>
                  <Label>Comment</Label>{" "}
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
                  <Label>Print label</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="checkbox"
                    name="select"
                    id="exampleSelect"
                   
                    bsSize="sm"
                  />
                   
                   
                </Col>
                <Col>
                  {" "}
                 
                </Col>

                <Col></Col>
                <Col>
                  <Label>Printers</Label>{" "}
                </Col>
                <Col>
                  {" "}
                 
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                   
                    bsSize="sm"
                  >
                    <option>=</option>
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                   
                </Col>
                <Col>
                  {" "}
                 
                
                 
                </Col>
                <Col> </Col>
              </Row>
              




              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Button  onClick={()=>this.saveHandler()}>validate</Button>{" "}
               
              </div>

            </div>
          
        </Container>
      </React.Fragment>
    );
  }
}

export default DowngradeContainer;