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
import {
    IoArrowBackCircleSharp,
    IoArrowForwardCircleSharp,
    IoInformation,
    IoInformationCircle,
  } from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
// import {Uncubeddata, UncubedHandler,UncubedCriteriaHandler}from'../../../store/Store';
import { Uncubeddata,UncubedHandler,UncubedCriteriaHandler, }from '../../../store/Store';
import axios from 'axios';
import UncubedList from './UncubedList';
import { properties } from '../../../Properties/Properties';

const getListOfPoKlp =
properties.Port + properties.getListOfPoKlp;
const getWarehousesForPhysicalgate = properties.Port + properties.getWarehousesForPhysicalgate

const getListOfUncubedPOLineFilterCriteriaa = properties.Port + properties.getListOfUncubedPOLineFilterCriteriaa
export default class UncubedFilter extends Component {


  
    constructor(props) {
        super(props);
    
        this.state = {
            limit: "",
            uncubedlist: false,
            listFilterBean:[],
            attribute:null,
            operation:"=",
            value:null,
            mDate:"",
            plfObd1:"",
            idPo:"",
            idPrepOrder:""
        }
    }

    componentDidMount=()=>{
        console.log("testing apiiiiiiiiiii calling")

    }
        criteriaFilterMethod = () => {
            console.log("testtttttttttttttt  api ");
            const criteria = {
              listFilterBean: this.state.listFilterBean,
              limit: this.state.limit,
            };
            axios
              .post(getListOfUncubedPOLineFilterCriteriaa, this.state, {
                params: {
                  limit: this.state.limit,
                },
              })
              .then((response) => {
                console.log("uzmmmmmmmaaaaaaaa=========>")
                if (response.status === 200 && response.data.length !== 0) {
                  console.log("resposne success ______________________________", response.data);
                  this.setState({
                    data: response.data,
                    uncubedlist: true,
                  });
                  UncubedHandler(response.data);
                  UncubedCriteriaHandler(criteria);
                } else {
                  this.setState({
                    uncubedlist: true,
                    data: [],
                  });
                
                }
              })
              .catch((error) => {
                console.log(error);
              });
          };
          changeHandler = (event) => {
            // console.log(event.target.name)
            // console.log(event.target.value)
            console.log("index BEFORE prepartionorder  uncubbbbbeeeedddd  print", this.state.listFilterBean);
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === event.target.name
            );
            if (index === -1) {
              const data = {
                attribute: event.target.name,
                operation: event.target.value,
              };
              this.state.listFilterBean.push(data);
            } else {
              //  this.state.listFilterBean[index]
              console.log(
                "ELSE PARTTTTTT",
                (this.state.listFilterBean[index].operation = event.target.value)
              );
            }
            // this.state.listFilterBean[index] = {
            //   operation: event.target.value
            // }
            console.log("index AFTER Preparationorder uncubbbbeeeddd print", this.state.listFilterBean);
            // this.setState({
            //   attribute: event.target.name,
            //   operation: event.target.value
            // })
          };
        
    
          inputChangeHandler = (event) => {
            this.setState({
              [event.target.name]: event.target.value,
            });
          };
    
          onBlurHandler = (criteria) => {
            console.log("calling onBlurrrrr", criteria.target.name);
            console.log("calling onBlurrrrr", criteria.target.value);
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            console.log("INDEX VALUE FOR IF PART IN ALUE", index);
        
            if (criteria.target.name === "idPrepOrder") {
              var index = this.state.listFilterBean.findIndex(
                (data) => data.attribute === criteria.target.name
              );
              if (index === -1) {
                const data = {
                  attribute: criteria.target.name,
                  operation: this.state.operation,
                  value: this.state.idPrepOrder,
                };
                this.state.listFilterBean.push(data);
              } else {
                this.state.listFilterBean[index].value = this.state.idPrepOrder;
                console.log("updataed else partttt", this.state.listFilterBean);
              }
            }
    
            if (criteria.target.name === "idProduct") {
              console.log("checking id product", criteria.target.name);
              var index = this.state.listFilterBean.findIndex(
                (data) => data.attribute === criteria.target.name
              );
              if (index === -1) {
                const data = {
                  attribute: criteria.target.name,
                  operation: this.state.operation,
                  value: this.state.idProduct,
                };
                this.state.listFilterBean.push(data);
                console.log("updataed if partttt", this.state.listFilterBean);
              } else {
                this.state.listFilterBean[index].value = this.state.idProduct;
                console.log("updataed else partttt", this.state.listFilterBean);
              }
            }
            console.log("calling criteriaARRRR", this.state.listFilterBean);
             this.setState({
              attribute: "",
               operation: "=",
        });
      };
      limitchangehandler = (event) => {
        if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
          this.setState({
            [event.target.name]: event.target.value,
          });
        } else {
        }
      };

      resetdata = () => {
        this.setState({
          limit: "",
          uncubedlist: false,
          // limit: "",
          // uncubedlist: false,
          listFilterBean:[],
          attribute:null,
          operation:"=",
          value:null,
          mDate:"",
          plfObd1:"",
          idPo:"",
          idPrepOrder:""
        });
    };
    backHandler = () => {
        this.setState({
          limit: "",
          uncubedlist: false,
          // limit: "",
          // uncubedlist: false,
          listFilterBean:[],
          attribute:null,
          operation:"=",
          value:null,
          mDate:"",
          plfObd1:"",
          idPo:"",
          idPrepOrder:""
        });
    };
    submitHandler=()=>{
        console.log("submitHandler calling")
    }
    render() {
        return (
           <React.Fragment>
           <Container   
           
           className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
            {Uncubeddata.length !== 0 || this.state.uncubedlist === true ?
               (
                <UncubedList backHandler={this.backHandler} 
                data={this.state.data}
                additem={this.props.additem} />
              ) 
              : (

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
                    <a>Uncubed Pos Search</a>
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
                <b style={{ marginLeft: "5px" }}>Cubing Criteria</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col >
                  <Label>Preparation Order</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="idPrepOrder"
                    id="exampleSelect"
                    // style={{ width: "50px" }}
                    bsSize="sm"
                    onChange={this.changeHandler}
                  >
                    {/* <option>---select---</option> */}
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    <option value="AMONG">AMONG</option>
                    <option value="NOT AMONG">NOT_AMONG</option>
                    <option value="STARTS WITH">Starts with</option>
                   <option value="MATCHES">Matches</option>
                    <option value="NOT MATCHES">Not Matches</option>

                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="text"
                    name="idPrepOrder"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    value={this.state.idPrepOrder}
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    // onBlur={() => this.onBlurHandler("company")}
                    onBlur={this.onBlurHandler}
                  >
                    {" "}
                    {/* <option>SK</option>
                    <option value="SK">---select-----</option> */}
                  </Input>
                </Col>
                 <Col/>
                 <Col> </Col>
                 <Col> </Col>
                <Col> </Col>
                <Col> </Col>

            
                
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Maximum Result</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="text"
                    name="text"
                    id="exampleSelect"
                    value="<="
                    bsSize="sm"
                    readOnly
                  >
                    value=&le;
                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    bsSize="sm"
                    onChange={this.limitchangehandler}
                    name="limit"
                    value={this.state.limit}
                  />
                </Col>

                <Col></Col>
                <Col>
                 {" "}
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col>
                  {" "}
                </Col>
                <Col> </Col>
              </Row>


              
              <div
                style={{
                  
                }}
              >
              </div>



              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Row>
                      <Col><Button 
                       onClick={this.resetdata}
                            size="sm"
                      style={{marginTop:"10px",
                    }}
                      
                      
                      >Reset Criteria</Button>
                 </Col>
                      <Col><Button 
                onClick={this.criteriaFilterMethod}
                  style={{marginTop:"10px"}}
                  size="sm"
                >
                  {" "}
                  Display
                </Button></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                   
                                
            </Row>
              </div>



            </div>
          

              )}
           </Container>

           </React.Fragment>
        )
    }
}
