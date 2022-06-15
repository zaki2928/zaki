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
import Familieslist from './Familieslist';
import { FcSearch } from "react-icons/fc";
import { FamiliesData, FamiliesDataHandler,familycriteria,familyfiltercriteriaHandler } from "../../../../store/Store"
import axios from "axios";
import { properties } from '../../../../Properties/Properties';
const getAllFamilyByFilterCriteria =
  properties.Port + properties.getAllFamilyByFilterCriteria;
  const listOfAllFamilyDEScriptions=  properties.Port + properties.listOfAllFamilyDEScriptions;


export default class Familiesfilter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Familieslist: false,
            defaultFamily: 0,
            description: "",
            descriptionShort: "",
            idFamily: 0,
            listFilterBean: [],
                
            attribute: null,
            operation: "=",
            value: null,
                
            
            mDate: "",
            mUsername: "",
            tolerance: 0,
            typeFamily: 0,
            versionLock: 0,
            iddescriptionlisttt:[],
        }
    }
    componentDidMount=()=>{
        console.log("testing api descriptionnnn lissstttt ====== calling")
        this.getDescriptionlist();
  
        }
        
    getDescriptionlist = () => {
        console.log("calling region from dropdown", this.state.iddescriptionlisttt) 
        axios.get(listOfAllFamilyDEScriptions)
    
          .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success uzmmmmmaaaa", response.data);
              this.setState({
                iddescriptionlisttt: response.data,
              });
    
            } else {
              this.setState({
                iddescriptionlisttt: [],
              });
              
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
    

    criteriaFilterMethod = () => {
        const length = this.state.listFilterBean.length;
        const listFilterBean = [];
          console.log("testtttttttttttttt  api ", getAllFamilyByFilterCriteria);
          for (let i = 0; i < length; i++) {
            console.log("value of ii", i);
            if (this.state.listFilterBean[i].value !== " ") {
              listFilterBean.push(this.state.listFilterBean[i]);
            }
          }
          console.log("on submittIIIIIIIng", listFilterBean);
          this.setState({
            listFilterBean: listFilterBean,
          });
          const criteria = {
            listFilterBean: this.state.listFilterBean,
            limit: this.state.limit,
          };
          axios
            .post(getAllFamilyByFilterCriteria, criteria, {
              params: {
                limit: this.state.limit,
              },
            })
      
            .then((response) => {
              if (response.status === 200 && response.data.length !== 0) {
                console.log("resposne success", response.data);
                this.setState({
                  data: response.data,
                  Familieslist: true,
                });
                FamiliesDataHandler(response.data);
                familyfiltercriteriaHandler(criteria);
              } else {
                this.setState({
                    Familieslist: true,
                  data: [],
                });
                FamiliesDataHandler(response.data);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        };



        changeHandler = (event) => {
   
            console.log("index BEFORE UPDATE print", this.state.listFilterBean);
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === event.target.name
            );
            if (index === -1) {
              const data = {
                attribute: event.target.name,
                operation: event.target.value,
                value: " ",
        
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
            console.log("index AFTER UPDATE print", this.state.listFilterBean);
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
          
            if (criteria.target.value !== "") {
              if (criteria.target.name === "description") {
                var index = this.state.listFilterBean.findIndex(
                  (data) => data.attribute === criteria.target.name
                );
                if (index === -1) {
                  const data = {
                    attribute: criteria.target.name,
                    operation: this.state.operation,
                    value: this.state.description,
                  };
                  this.state.listFilterBean.push(data);
                } else {
                  this.state.listFilterBean[index].value = this.state.description;
                  console.log("updataed else partttt", this.state.listFilterBean);
                }
              }
              if (criteria.target.name === "typeFamily") {
                var index = this.state.listFilterBean.findIndex(
                  (data) => data.attribute === criteria.target.name
                );
                if (index === -1) {
                  const data = {
                    attribute: criteria.target.name,
                    operation: this.state.operation,
                    value: this.state.typeFamily,
                  };
                  this.state.listFilterBean.push(data);
                } else {
                  this.state.listFilterBean[index].value = this.state.typeFamily;
                  console.log("updataed else partttt", this.state.listFilterBean);
                }
              }
               
            }
            else {
                console.log("value is blank", index);
                this.state.listFilterBean.splice(index, 1);
                console.log("after splice", this.state.listFilterBean);
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

    // submitHandler = () => {
    //     console.log("submitHandler calling")
    //     axios
    //         .get("https://jsonplaceholder.typicode.com/posts")
            
    //         .then((response) => {
    //             if (response.status === 200) {
    //                 console.log("resposne success", response.data);
    //                 this.setState({
    //                     data: response.data,
    //                     Familieslist:true

    //                 })

    //                 FamiliesDataHandler(response.data)

    //             }
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });

    // }

    backHandler=()=>{
        console.log("calling back handler")
        this.setState({
          Familieslist: false
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
                    {FamiliesData.length !== 0 || this.state.Familieslist === true ?
               (
                <Familieslist 
                backHandler={this.backHandler} 
                data={this.state.data} />
              ) 
              : (
                   
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
                                    <a>Families Search</a>
                                </b>
                            </u>
                        </span>
                        <br />

                        <div
                            style={{
                                border: "1px",
                                backgroundColor: "grey",
                                border: "1px solid black",
                                marginTop: "10px"
                            }}
                        >

                            <b style={{ marginLeft: "5px" }}>General Criteria</b>
                        </div>

                        <Row style={{ marginTop: "10px" }}>
                            <Col>
                                <Label>Description</Label>{" "}
                            </Col>
                            <Col>
                                {" "}
                                <Input
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                    // style={{ width: "60px" }}
                                    bsSize="sm"
                                    onChange={this.changeHandler}

                                >
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                                </Input>
                            </Col>
                            <Col>
                                {" "}
                                <Input
                            type="select"
                            name="description"
                            id="exampleSelect"
                            // style={{ width: "60px" }}
                            value={this.state.description}
                            bsSize="sm"
                            onChange={this.inputChangeHandler}
                            // onBlur={() => this.onBlurHandler("company")}
                            onBlur={this.onBlurHandler}
                                >
                         <option value="">---select---</option>
                      {this.state.iddescriptionlisttt.map(data => <option value={data.description} key={data.description}>{data.description}</option>)}
                                </Input>
                            </Col>

                            <Col></Col>
                            <Col></Col>

                            <Col>
                                <Label>Type</Label>{" "}
                            </Col>
                            <Col>
                                {" "}
                                <Input
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                    // style={{ width: "60px" }}
                                    bsSize="sm"
                                    onChange={this.changeHandler}

                                >
                                    <option value="=">=</option>
                                    <option value="/=">&ne;</option>
                                    <option value="AMONG">AMONG</option>
                                    <option value="NOT AMONG">NOT_AMONG</option>
                                </Input>
                            </Col>
                            <Col>
                                {" "}
                                <Input
                            type="select"
                            name="typeFamily"
                            id="exampleSelect"
                            // style={{ width: "60px" }}
                            value={this.state.typeFamily}
                            bsSize="sm"
                            onChange={this.inputChangeHandler}
                            // onBlur={() => this.onBlurHandler("company")}
                            onBlur={this.onBlurHandler}
                                >
                                    <option value="">   </option>
                                    <option value="5000">_Other_ </option>
                                    <option value="500">_Aerosol_</option>
                                    <option value="600">_fragile_</option>
                                    <option value="400">_Hazardous_</option>
                                    <option value="300">_Vertical_</option>

                                </Input>         
                                 </Col>
                            <Col> </Col>
                        </Row>

                        

                        <Row style={{ marginTop: "5px" }}>
                        <Col>
                                <Label>Maximum results</Label>{" "}
                            </Col>
                            <Col>
                                {" "}
                                <Input
                    type="text"
                    name="text"
                    id="exampleSelect"
                    value="<="
                    // style={{ width: "60px" }}
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

                            <Col>
                            </Col>

                            <Col></Col>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                            <Col>
                            </Col>
                            <Col> </Col>
                        </Row>

                        <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <Button>Reset Criteria</Button>{" "}
                            <Button
                                onClick={
                                    this.criteriaFilterMethod
                                }
                            >
                                {" "}
                      Display
                    </Button>
                        </div>



                    </div>
                    )}
           
                </Container>

            </React.Fragment>
        )
    }
}
