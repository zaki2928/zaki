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
import Contentlist from './Contentlist';
import { FcSearch } from "react-icons/fc";
import { contentstatusData, contentstatusDataHandler, contentstatusCriteriaHandler } from "../../../store/Store"
import axios from "axios";
import {properties} from '../../../Properties/Properties';


const getDescriptionList = properties.Port + properties.getListOfDescriptionFromContentStatus
const getListOfContentStatus = properties.Port + properties.getListOfContentStatus
const getListOfContentStatusss = properties.Port + properties.getListOfContentStatusss

export default class Contentfilter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Contentlist: false,
            limit: "",
            attribute: null,
            value: null,
            firstName:"",
            operation:"=",
            description:"",
            technical:"",
            accessbility:"",
            listFilterBean: [],
            idLanguage:"",
            musername:"",
            mdate:"",
            loginUser:"",
            descriptionList:[],

        }
    }

    contentFilterHandler = () => {
        console.log("submitHandler calling", this.state)
        const content = {
            listFilterBean: this.state.listFilterBean,
            limit: this.state.limit,
          };

        axios.post(getListOfContentStatusss, this.state, {
            params: {
                limit: this.state.limit,
              },
        })
            .then((response) => {
                if (response.status === 200 && response.data.length !== 0) {
                    console.log("resposne success", response.data);
                    this.setState({
                        data: response.data,
                        Contentlist:true

                    })

                    contentstatusDataHandler(response.data);
                    contentstatusCriteriaHandler(content);

                }else {
                    this.setState({
                      Contentlist: true,
                      data: [],
                    });
                    contentstatusDataHandler(response.data);
                  }
            })
            
            .catch((error) => {
                console.log(error);
            });

    }
    changeHandler = (event) => {
      console.log("++++++++++++++++++++++",event.target.value)
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === event.target.name
        );
        if (index === -1) {
          console.log("++++++++++++++++")
          const data = {
            attribute: event.target.name,
            operation: event.target.value,
          };
          this.state.listFilterBean.push(data);
        } else {
          console.log(
            (this.state.listFilterBean[index].operation = event.target.value)
          );
        }
       
      };
      getDescriptionList = () => {
        console.log("calling description from dropdown", this.state.warehouseIds) 
        axios.get(getDescriptionList)
    
          .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success", response.data);
              this.setState({
                descriptionList: response.data,
              });
    
            } else {
              this.setState({
                descriptionList: [],
              });
              
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      componentDidMount= () =>{
        this.getDescriptionList()
      }
    inputChangeHandler = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
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
    backHandler=()=>{
        console.log("calling back handler")
        this.setState({
          Contentlist: false,
          listFilterBean:[],
          limit: null,
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
        }
        console.log("calling criteriaARRRR", this.state.listFilterBean);
    this.setState({
      attribute: "",
      operation: "=",
    });
    }
    render() {
        return (
            <React.Fragment>
                <Container
                    className="themed-container"
                    fluid={true}
                    style={{ border: "1px solid black", marginLeft: "14px" }}
                >
                    {contentstatusData.length !== 0 || this.state.Contentlist === true ?
               (
                <Contentlist 
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
                                    <a>Content Statuses Search</a>
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
                                    name="description"
                                    //id="exampleSelect"
                                    // style={{ width: "60px" }}
                                    bsSize="sm"
                                    onChange={this.changeHandler}
                                    
                                >
                                   <option value="=">=</option>
                                    <option value="/=">&ne;</option>
                                    <option value="AMONG">AMONG</option>
                                    <option value="NOT AMONG"> NOT_AMONG</option>
                                </Input>
                            </Col>
                            <Col>
                                {" "}
                                <Input
                                    type="select"
                                    name="description"
                                    onChange={this.inputChangeHandler}
                                    //value={this.state.contentFunction}
                                    onBlur={this.onBlurHandler}
                                    // style={{ width: "60px" }}
                                    bsSize="sm"
                                 >
                                     <option></option>
                                     {this.state.descriptionList.map(data =>
                                        <option value={data.description} key={data.content_Status_id}>
                                            {data.description}</option>)
                                        }
                {/* <option value={this.state.descriptionList}>{this.state.descriptionList}</option>) */}
                    
                                 </Input>
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
                                    readOnly
                                    // style={{ width: "60px" }}
                                    bsSize="sm"
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
                            <Button onClick={this.resetHandler}>Reset Criteria</Button>{" "}
                            <Button
                                onClick={
                                    this.contentFilterHandler
                                }
                            >
                                {" "}
                      Submit
                    </Button>
                        </div>



                    </div>
                    )}
           
                </Container>

            </React.Fragment>
        )
    }
}
