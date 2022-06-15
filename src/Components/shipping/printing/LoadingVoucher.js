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
import Loader from "react-loader-spinner";

const listofLaserprinter =
  properties.Port + properties.listofLaserprinter;
  const generateLoadingVoucher =
  properties.Port + properties.generateLoadingVoucher;

 class LoadingVoucher extends Component {

  constructor(props) {
    super(props);

    this.state = {
      silolist: false,
      data:[],
      listFilterBean:[],
      limit:0,
      listOfLaserPrinter:[],
      idTrailer	:"",
      printerId:"",
      documentType:30010,
      idExchange:"",
      errormsg:"",
      number:1,
      exceptionmsg:"",
      loading: false,
    };
  }

  getListofPrinterMethod = () => {
    console.log("testtttttttttttttt  api ");
    
    axios
      .post(listofLaserprinter, this.state, {
        params: {
          limit: this.state.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            listOfLaserPrinter: response.data,
            idExchange:response.data[0].idExchange
          });

        } else {
          this.setState({
            listOfLaserPrinter: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  submitHandler = () => {
    console.log("testtttttttttttttt  api");
    if (this.state.idTrailer != "") {
      this.setState({
        errormsg: "",
        exceptionmsg:"",
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
      if (result.value) {
        this.setState({
          loading: true,
         });
        axios
        .post(generateLoadingVoucher+this.state.idTrailer+"/"+this.state.idExchange)
        .then((response) => {
          if (response.status === 200) {
            this.setState({
              loading: false,
              idTrailer	:"",
              });
            console.log("resposne success", response.status);
            Swal.fire("The demand has been taken in account");
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            loading: false,
            exceptionmsg: error.response.data.message,
          });
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

  lastDocumentHandler = () => {
    console.log("testtttttttttttttt  api");
    if (this.state.idTrailer != "") {
      this.setState({
        exceptionmsg:"No Document Found",
      });
    }
  };

  onChange=(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

//   saveHandler(){
//     Swal.fire({
//         title: 'Information',
//         text: "The demand has been taken in account",
//         icon: 'warning',
//         showCancelButton: false,
//         confirmButtonColor: 'gray',
//         cancelButtonColor: 'gray',
//         confirmButtonText: 'Yes'
//       }).then((result) => {
//         if (result.isConfirmed) {
//           Swal.fire(
            
//             'Done',
//             'success'
//           )
//         }
//       })    
// }


  render() {
    return (
      <React.Fragment>
         {this.state.loading ? (
            <div className="">
              <div className="row">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                  <div className="col spinner_item p-5">
                    <Loader
                      type="BallTriangle"
                      color="#00BFFF"
                      height={120}
                      width={100}
                      // visible={loading}
                    />
                  </div>
                </div>
                <div class="col-md-4"></div>
              </div>
            </div>
          ) : ( <div>
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
                    <a>Loading Voucher</a>
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
                    name="select"
                    id="exampleSelect"
                    onChange={this.onChange}
                    bsSize="sm"
                  >
                     {this.state.listOfLaserPrinter.map(data=><option value={data.idExchange} key={data.idExchange} >{data.description}</option>)}
                 
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
                    <option>Trailer</option>
                  </Input>
                    
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Id</Label>{" "}
                </Col>
                {/* <Col> </Col> */}
                <Col>
                
                <Input
                type="text"
                  name="idTrailer"
                  value={this.state.idTrailer}
                   onChange={this.onChange}
                   bsSize="sm"
                   
                 />
                    
                </Col>
                <Col> {this.state.idTrailer === "" ? (
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      {this.state.errormsg}
                    </span>
                  ) : (
                    ""
                  )}{" "}</Col>
              

                <Col> </Col>
                {/* <Col> </Col> */}
               
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Number</Label>{" "}
                </Col>

                <Col>
                
                <Input
                type="text"
                  name="number"
                  value={this.state.number}
                   onChange={this.onChange}
                   bsSize="sm"
                   
                 />
                    
                </Col>
              

                <Col> </Col>
                <Col> </Col>
               
              </Row>


              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              
                 <Button  disabled={true}>Clear Path</Button>
                 <Button style={{marginLeft:"5px"}}  onClick={()=>this.submitHandler()}>Generate</Button>
                 <Button style={{marginLeft:"5px"}}  onClick={()=>this.lastDocumentHandler()}>Display last document generated</Button>
                 <Button style={{marginLeft:"5px"}}  disabled={true}>Print</Button>
                {" "}
               
              </div>
              <span
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              {this.state.exceptionmsg}
            </span>

            </div>
          
        </Container>
        </div>)}
      </React.Fragment>
    );
  }
}

export default LoadingVoucher;