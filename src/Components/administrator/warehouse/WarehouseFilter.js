import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
    FormGroup,
    Button,
  } from "reactstrap";
import WarehouseList from './WarehouseList';
import { WarehouseData, WarehouseHandler,WarehousecriteriaDataHandler } from '../../../store/Store';
import axios from "axios";
import { properties } from '../../../Properties/Properties';

const getListOfAllWarehouse = properties.Port + properties.getListOfAllWarehouse
class WarehouseFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {

        data: [],
          packagingList: false,
          limit: "",
          attribute: null,
          operation: "=",
          value: null,
         idWarehouse: "",
          mDate: "",
       mUsername: "",
      versionLock: "",
	defaultWarehouse: "",
 description: "",
useShippingPosition: "",
idSite: "",
listFilterBean: [],
      }
    }
    componentDidMount=()=>{
   
      }
      
      submitHandler=()=>{
        console.log("submitHandler calling")
        
        axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          if (response.status === 200) {
            console.log("resposne success", response.data);
             this.setState({
            data:response.data,
            packagingList:true
      
            })
      
            WarehouseHandler(response.data)
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
      
      }
      
      
      limitchangehandler = (event) => {
        if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
          this.setState({
            [event.target.name]: event.target.value,
          });
        } else {
        }
      };

      criteriaFilterMethod = () => {
        const criteria = {
          listFilterBean: this.state.listFilterBean,
          limit: this.state.limit,
        };
        axios
          .post(
            getListOfAllWarehouse,this.state,
            {
              params: {
                limit: this.state.limit,
              },
            }
          )
          // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
          .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success", response.data);
              this.setState({
                data: response.data,
                packagingList: true,
              });
  
              WarehouseHandler(response.data);
              WarehousecriteriaDataHandler(criteria);
            } else {
              this.setState({
                packagingList: true,
                data: [],
              });
              WarehouseHandler(response.data);
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
          };
          this.state.listFilterBean.push(data);
        } else {
         
          console.log(
            "inside else part",
            (this.state.listFilterBean[index].operation = event.target.value)
          );
        }
       
        console.log("index AFTER UPDATE print", this.state.listFilterBean);
     
      };
    
      inputChangeHandler = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      }




      backHandler=()=>{
        console.log("calling back handler")
        this.setState({
          packagingList: false
        })
      }


      onBlurHandler = (criteria) => {
        console.log("calling onBlurrrrr", criteria.target.name);
        console.log("calling onBlurrrrr", criteria.target.value);
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        console.log("INDEX VALUE FOR IF PART IN ALUE", index);
      
        if (criteria.target.value !== "") {
          if (criteria.target.name === "idWarehouse") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.idWarehouse,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idWarehouse;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "mDate") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.mDate,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.mDate;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "mUsername") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.mUsername,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.mUsername;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "versionLock") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.versionLock,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.versionLock;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "defaultWarehouse") {
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.defaultWarehouse,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.defaultWarehouse;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
          if (criteria.target.name === "description") {
            console.log("id container calling");
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
    
    
          if (criteria.target.name === "useShippingPosition") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.useShippingPosition,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.useShippingPosition;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
    
    
          if (criteria.target.name === "idSite") {
            console.log("id container calling");
            var index = this.state.listFilterBean.findIndex(
              (data) => data.attribute === criteria.target.name
            );
            if (index === -1) {
              const data = {
                attribute: criteria.target.name,
                operation: this.state.operation,
                value: this.state.idSite,
              };
              this.state.listFilterBean.push(data);
            } else {
              this.state.listFilterBean[index].value = this.state.idSite;
              console.log("updataed else partttt", this.state.listFilterBean);
            }
          }
    
     
        } else {
          console.log("repacking blur else line 448");
        }
      };





      resetdata = () => {
        console.log("reset handler");
        this.setState({
          data: [],
          packagingList: false,
          limit: "",
          attribute: null,
          operation: "=",
          value: null,
         idWarehouse: "",
          mDate: "",
       mUsername: "",
      versionLock: "",
	defaultWarehouse: "",
 description: "",
useShippingPosition: "",
idSite: "",
listFilterBean: [],
        });
      };
    





    render() {
        return (
            <React.Fragment>
            <Container
              className="themed-container"
              fluid={true}
              style={{ border: "1px solid black", marginLeft: "14px" }}
            >
              {WarehouseData.length !== 0 || this.state.packagingList === true ?
               (
                <WarehouseList backHandler={this.backHandler} 
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
                        <a>Warehouses Search</a>
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
                  
                    <b style={{ marginLeft: "5px" }}>Criteria</b>
                  </div>

                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>ID</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="idWarehouse"
                    id="idWarehouse"
                    onChange={this.changeHandler}
                   
                    bsSize="sm"
                  >
                    {/* <option>---select---</option> */}
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
          
                    <option value="STARTS">STARTS_WITH</option>
                    <option value="CONTAINS">CONTAINS</option>
                    <option value="AMONG">AMONG</option>
                    <option value="NOT AMONG">NOT_AMONG</option>
                    <option value="MATCHES">MATCHES</option>
                    <option value="NOT MATCHES">NOT_MATCHES</option>
                  </Input>

                    </Col>
                    <Col>
                      {" "}
                      <Input
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    name="idWarehouse"
                    value={this.state.idWarehouse}
                    onBlur={this.onBlurHandler}
                    
                  />
                    </Col>
    
                    
                    <Col>
                      <Label>Description</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="description"
                    id="description"
                    onChange={this.changeHandler}
                   
                    bsSize="sm"
                  >
                    {/* <option>---select---</option> */}
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
          
                    <option value="STARTS">STARTS_WITH</option>
                    <option value="CONTAINS">CONTAINS</option>
                    <option value="AMONG">AMONG</option>
                    <option value="NOT AMONG">NOT_AMONG</option>
                    <option value="MATCHES">MATCHES</option>
                    <option value="NOT MATCHES">NOT_MATCHES</option>
                  </Input>

                    </Col>
                    <Col>
                      {" "}
                      <Input
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    name="description"
                    value={this.state.description}
                    onBlur={this.onBlurHandler}
                    
                  />
                    </Col>
                    <Col> </Col>
                  </Row>

                  
                  

                  

                  <Row style={{ marginTop: "10px" }}>
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

                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                    <Button  onClick={this.resetdata}>Reset Criteria</Button>{" "}
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
        );
    }
}

export default WarehouseFilter;