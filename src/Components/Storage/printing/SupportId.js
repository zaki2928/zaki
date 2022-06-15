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


const printBarCode =
  properties.Port + properties.printBarCode;
const listofThermalprinter =
  properties.Port + properties.listofThermalprinter;
  const printLabel =
  properties.Port + properties.printLabel;

  

 class PalletLabel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      silolist: false,
      data:[],
      listFilterBean:[],
      limit:0,
      listOfthermalPrinter:[],
      idTracking	:"",
      printerId:"",
      documentType:30010,
      idExchange:"",
      errormsg:"",
    };
  }


  

  getListofPrinterMethod = () => {
    console.log("testtttttttttttttt  api ");
    
    axios
      .post(listofThermalprinter, this.state, {
        params: {
          limit: this.state.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            listOfthermalPrinter: response.data,
            idExchange:response.data[0].idExchange
          });

        } else {
          this.setState({
           
           listOfthermalPrinter: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  submitHandler = () => {
    console.log("testtttttttttttttt  api",printBarCode);
    if (this.state.idTracking != "") {
      this.setState({
        errormsg: "",
      });
    Swal.fire({
      title: 'Confirmation',
      text: "Do you really want to validate?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'gray',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes'
    }).then((result) => {
      console.log("shahid",result)
      if (result.value) {
        axios
        .post(printLabel+this.state.idTracking+"/"+this.state.idExchange+"/"+this.state.documentType)
        .then((response) => {
          if (response.status === 200) {
            console.log("resposne success umar", response.status);
            Swal.fire("The demand has been taken in account");
          }
        })
        .catch((error) => {
          console.log(error);
        });
        // Swal.fire(
          
        //   'Done',
        //   'success'
        // )
      }
    });
  } else {
    this.setState({
      errormsg: "Value is required",
    });
  }
  };


componentDidMount=()=>{
  this.getListofPrinterMethod()

}

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
onChange=(event)=>{
  this.setState({
    [event.target.name]: event.target.value
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
                    <a>Support Id</a>
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
                    value={this.state.idExchange}
                    onChange={this.onChange}
                    bsSize="sm"
                  >
                    {/* <option>Zebra Z1 ControlRoom1</option> */}
                    {this.state.listOfthermalPrinter.map(data=><option value={data.idExchange} key={data.idExchange} >{data.description}</option>)}
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
                    name="documentType"
                    value={this.state.documentType}
                    onChange={this.onChange}
                    bsSize="sm"
                  >
                    <option value={30010}>Number</option>
                    
                  </Input>
                    
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Number</Label>{" "}
                </Col>

                <Col>
                
                <Input
                type="text"
                  name="idTracking"
                  value={this.state.idTracking}
                   onChange={this.onChange}
                   bsSize="sm"
                   
                 />
                    
                </Col>
                

                <Col> {this.state.idTracking === "" ? (
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      {this.state.errormsg}
                    </span>
                  ) : (
                    ""
                  )}{" "}</Col>
                <Col> </Col>
               
              </Row>


              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
               <Button  onClick={()=>this.submitHandler()}>Validate</Button>{" "}
               
              </div>

            </div>
          
        </Container>
      </React.Fragment>
    );
  }
}

export default PalletLabel;