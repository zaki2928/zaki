import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
    Button,
  } from "reactstrap";
import RackList from './RackList';
import { RackData, RackHandler ,RackCriteriaHandler,RackCriteria} from '../../../../store/Store';
import axios from "axios";
import { properties } from '../../../../Properties/Properties';
const getDescListOfRackProfile =
  properties.Port + properties.getDescListOfRackProfile;
const getListOfRackProfile = properties.Port +properties.getListOfRackProfile;
class RackFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {
          orderList: false,
          defaultPR: 0,
          description: "",
          idProfilCellRack: 0,
          attribute: null,
          operation: "=",
          value: null,
          mDate: "",
         mUsername: "",
          versionLock: 0,
          listFilterBean: [],
          criteria:"",
          iddescriptionList: [],


      };
    }
    componentDidMount=()=>{
      console.log("testing api trailer release calling")
      this.getDescListOfRackProfile();
      }
      

      getDescListOfRackProfile=()=>{
        console.log("calling region from dropdown", this.state.iddescriptionList) 
            axios.get(getDescListOfRackProfile)
        
              .then((response) => {
                if (response.status === 200 && response.data.length !== 0) {
                 // console.log("http://localhost:8080/rackprofile/getDescListOfRackProfile", response.data);
                  this.setState({
                    iddescriptionList: response.data,
                  });
        
                } else {
                  this.setState({
                    iddescriptionList: [],
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
          // console.log("testtttttttttttttt  api ", GetListOfSiloSICLView);
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
            .post(getListOfRackProfile, criteria, {
              params: {
                limit: this.state.limit,
              },
            })
      
            .then((response) => {
              if (response.status === 200 && response.data.length !== 0) {
                console.log("resposne success", response.data);
                this.setState({
                  data: response.data,
                  orderList: true,
                });
                RackHandler(response.data);
                RackCriteriaHandler(criteria);
              } else {
                this.setState({
                  orderList: true,
                  data: [],
                });
                RackHandler(response.data);
              }
            })
            .catch((error) => {
              console.log(error);
            });
        };

      // submitHandler=()=>{
      //   console.log("submitHandler calling")
        
      //   axios
      //   .get("https://jsonplaceholder.typicode.com/posts")
      //   .then((response) => {
      //     if (response.status === 200) {
      //       console.log("resposne success", response.data);
      //        this.setState({
      //       data:response.data,
      //       orderList:true
      
      //       })
      
      //       RackHandler(response.data)
            
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      
      // }
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
          if (criteria.target.name === "idProfilCellRack") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.idProfilCellRack,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idProfilCellRack;
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
      resetdata = () => {
        console.log("reset handler");
        this.setState({
          limit:"",
          orderList: false,
          defaultPR: 0,
          description: "",
          idProfilCellRack: 0,
          attribute: null,
          operation: "=",
          value: null,
          mDate: "",
         mUsername: "",
          versionLock: 0,
          listFilterBean: [],
          criteria:""
     
        
          });
      };
      backHandler=()=>{
        console.log("calling back handler")
        this.setState({
          limit:"",
          orderList: false,
          defaultPR: 0,
          description: "",
          idProfilCellRack: 0,
          attribute: null,
          operation: "=",
          value: null,
          mDate: "",
         mUsername: "",
          versionLock: 0,
          listFilterBean: [],
          criteria:""
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
              {RackData.length !== 0 || this.state.orderList === true ?
               (
                <RackList backHandler={this.backHandler} 
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
                        <a>Cell Racks Profile Search</a>
                      </b>
                    </u>
                  </span>
                  <br />
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      marginTop: "10px",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Location Server Criteria</b>
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
                        id="description"
                        onChange={this.changeHandler}
                        bsSize="sm"
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
                        name="idProfilCellRack"
                        id="idProfilCellRack"
                        // style={{ width: "60px" }}
                        value={this.state.idProfilCellRack}
                        bsSize="sm"
                        onChange={this.inputChangeHandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        onBlur={this.onBlurHandler}
                      >
                         <option value="">---select---</option>
                      {this.state.iddescriptionList.map(data => <option value={data.idProfilCellRack} key={data.idProfilCellRack}>{data.description}</option>)}
                      </Input>
                    </Col>
    
                  
                    <Col>
                
                    </Col>
                    <Col>
                      {" "}
                   
                    </Col>
                    <Col>
                      {" "}
                 
                    </Col>
                    <Col> </Col>
                  </Row>
                  
                  <Row style={{marginTop:"5px"}}>
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
                <Col> </Col>
                <Col>
                
                </Col>
                <Col></Col>
                <Col>
            
                </Col>
                <Col></Col>
              </Row>
              

                 
                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Button  onClick={this.resetdata}>Reset Criteria</Button>{" "}                    <Button
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
        );
    }
}

export default RackFilter;