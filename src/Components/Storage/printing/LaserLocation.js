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
import Swal from "sweetalert2";
import axios from "axios"
import { properties } from "../../../Properties/Properties";

const GetListofPrinterLaserExc = properties.Port+ properties.GetListofPrinterLaserExc;

 class LaserLocation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      silolist: false,
      GetListofPrinterLaserExc:[],
      data:[],
      idExchange:"",
      description:"",
    };
  }

  componentDidMount=()=>{
    this.getListofPrinterMethod()
  
  }

  getListofPrinterMethod = () => {
    console.log("testtttttttttttttt  api ");
    
    axios
      .post(GetListofPrinterLaserExc, this.state, {
        params: {
          limit: this.state.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            GetListofPrinterLaserExc: response.data,
            
          });

        } else {
          this.setState({
           
            GetListofPrinterLaserExc: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  saveHandler(){
    Swal.fire({
        title: 'Confirmation',
        text: "Do you really want to validate?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'gray',
        cancelButtonColor: 'gray',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            
            'Done',
            'success'
          )
        }
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
                    <a>Laser Location Label</a>
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
                <b style={{ marginLeft: "5px" }}>Data Entry</b>
              </div>
             



              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Printers</Label>{" "}
                </Col>

                <Col>
                
                  <Input
                    type="select"
                    name="idExchange"
                   // id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                       <option>--- Select Printer ---</option>
                    {this.state.GetListofPrinterLaserExc.map(data=><option value={data.idExchange} key={data.idExchange} >{data.description}</option>)}
                 
                  </Input>
                    
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>
 
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Document Type</Label>{" "}
                </Col>

                <Col>
                
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option>Column</option>
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
                  <Label>Region</Label>{" "}
                </Col>

                <Col>
                
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option>RT1-Logical Reservation RT1</option>
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
                  <Label>Region Description</Label>{" "}
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
                  <Label>Aisle</Label>{" "}
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
                  <Label>Column</Label>{" "}
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
             


              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
             <Button  onClick={()=>this.saveHandler()}>Validate</Button>{" "}
               
              </div>

            </div>
          
        </Container>
      </React.Fragment>
    );
  }
}

export default LaserLocation;