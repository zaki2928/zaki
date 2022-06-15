import React, { Component } from 'react'
import {
    Container,
    Row,
    Col,
    Label,
    Input,

} from "reactstrap";
import { FaSave } from 'react-icons/fa';
import {remover, contentstatusEditData} from "../../../store/Store"
import axios from "axios";
import { properties } from '../../../Properties/Properties';
import { CONTENT_STATUS } from '../../../store/RoleBased';

const updateContentStatus = properties.Port + properties.updateContentStatus

export default class Contentdataedit extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data:[],
            content_Status_id: null,
            musername: "",
            accessibility: null,
            description:"",
            technical: null,
            version_lock:null,
            msg: "",

        }
    }
    componentDidMount() {
        console.log("calling edit data length", this.state.data.length);
        console.log( this.props.data2);
        console.log("calling edit ", contentstatusEditData);
    
        if (contentstatusEditData !== null) {
          this.setState(
            {
              data: contentstatusEditData,
            },
            () => {
              console.log("data present after tab switch", this.state.data);
              this.setState({
                content_Status_id:contentstatusEditData.content_Status_id,
                accessibility: contentstatusEditData.accessibility,
                technical:contentstatusEditData.technical,
                description:contentstatusEditData.description,
                musername:contentstatusEditData.musername,
                version_lock:contentstatusEditData.version_lock,
                
              });
            }
          );
        }
      }
      SubmitHandler = () => {
        axios.put(updateContentStatus, this.state)
          .then((response) => {
            if (response.status === 200) {
              console.log("resposne success", response.data);
              this.setState({
                msg: "Data updated Successfully",
              });
    
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      onchangehandler = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };
    backHandler=()=>{
        console.log("calling back handler for list")
        // remover("Createnewuser")
        this.props.editcloseHandler()
      }

    

    render() {
        return (
            <React.Fragment>
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
                                <a style={{cursor:"pointer" }}>Content Statuses Search</a>
                            </b>
                        </u>
                    &#62;
                    <u>
                            {" "}
                            <b>
                                {" "}
                                <a style={{cursor:"pointer" }}onClick={this.backHandler}>Content Statuses Management</a>
                            </b>
                        </u>
                        &#62;
                    <u>
                            {" "}
                            <b>
                                {" "}
                                <a style={{cursor:"pointer" }}>Content Statuses Edit</a>
                            </b>
                        </u>
                    </span>

                    <br />


                    <div>
                        <div class="row-xs-6 bottom-row ">
                            <FaSave

                            //   onClick={() => this.edithandler(props.original)}
                            >

                            </FaSave>{" "}
                            {/* <button >Configure</button> */}
                            {CONTENT_STATUS===2 ?  <a style={{ cursor: "pointer", fontWeight: "bold", color: "blue" }}>
              <u onClick={this.SubmitHandler}>Save</u>
            </a> : ''}
                            {/* <a onClick={this.SubmitHandler}>Save</a>{" "} */}
                            {" "}
                            {/* <FaSave

                            //   onClick={() => this.edithandler(props.original)}
                            >

                            </FaSave>{" "} */}
                            {/* <button >Configure</button> */}
                            {/* <a >Create and Select</a>{" "} */}



                        </div>
                        <span style={{color:"Green"}}>&nbsp;&nbsp;&nbsp;{this.state.msg}</span>

                        <div
                            style={{
                                border: "1px",
                                backgroundColor: "grey",
                                border: "1px solid black",
                                marginTop: "3px"
                            }}
                        >
                            <b style={{ marginLeft: "5px" }}>Description</b>
                            
                        </div>
                        <Row style={{ marginTop: "10px", marginBottom:"-8px" }}>
                            <Col>
                                <Label>Id</Label>
                            </Col>

                            <Col>

                            <Input
                                    type="text"
                                    value={this.state.content_Status_id}
                                    name="content_Status_id"
                                    onChange={this.onchangehandler}
                                    // style={{ width: "50px" }}
                                    bsSize="sm"
                                    readOnly
                                 />
                            </Col>
                            <Col> </Col>

                            <Col>
                                <Label>Description</Label>
                            </Col>

                            <Col>

                            <Input
                                    type="text"
                                    value={this.state.description}
                                    name="description"
                                    onChange={this.onchangehandler}
                                    // style={{ width: "50px" }}
                                    bsSize="sm"
                                 />
                            </Col>
                            <Col> </Col>

                        </Row>

                        <Row style={{ marginTop: "10px", marginBottom:"-8px" }}>
                            <Col>
                                <Label>Accessibility</Label>
                            </Col>

                            <Col>

                            <Input
                                //    type="checkbox"
                                //    value = "true"
                                    type="checkbox" checked={this.state.accessibility ===1 ? true : false}
                                    id="exampleSelect"
                                    name="accessibility"

                                //    type ="checkbox" checked={props.original.accessibility === 1 ? true : false}
                                    onChange={this.checkHandler}
                                //     // style={{ width: "50px" }}
                                    bsSize="sm"
                                 />
                            </Col>

                            <Col> </Col>

                            <Col>
                                <Label>Technical</Label>
                            </Col>

                            <Col>

                                <Input
                                    // type="checkbox"
                                    // checked= 'checked'
                                //    value = "true"
                      
                                    id="exampleSelect"
                                   type="checkbox" checked={this.state.technical === 1 ? true : false}
                                    name="technical"
                                    //style={{ width: "50px" }}
                                    bsSize="sm"
                                    onChange= {this.onchangehandler}
                                 />
                            </Col>
                            <Col> </Col>
                        </Row>
                        <br/>

                        
                    </div>

                </div>


            </React.Fragment>
        )
    }
}
