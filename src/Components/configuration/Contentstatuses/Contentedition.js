import React, { Component } from 'react'
import {
    Container,
    Row,
    Col,
    Label,
    Input,

} from "reactstrap";
import { FaSave } from 'react-icons/fa';
// import {remover} from "../../store/Store"
import axios from "axios";
import { properties } from '../../../Properties/Properties';


const createContentStatus = properties.Port + properties.createContentStatus


export default class Contentedition extends Component {
    constructor(props) {
        super(props)

        this.state = {
            content_Status_id: null,
            musername: "",
            accessibility: 0,
            description:"",
            technical: 0,
            msg : "",
            errmsg: "",

        }
    }
    SubmitHandler = () => {
        console.log("posting data", this.state);
        axios.post(createContentStatus, this.state)
          .then((response) => {
            if (response.status === 200) {

              console.log("resposne success", response.data);
              this.setState({
                  errmsg :"",
                msg: "Data Saved Successfully",
              });
            }
          })
          .catch((error) => {
            console.log(error);

            this.setState({
                errmsg: error.response.data.message,
              });

          });
      };
    onchangehandler = (event) => {
        console.log("onchangehandler");
        this.setState({
          [event.target.name]: event.target.value,
        });
      };
    checkHandler = (event) =>{
    
        this.setState({
          [event.target.name]: event.target.value,
          technical: 1,
        });
      }
      checkHandler1 = (event) =>{
    
        this.setState({
          [event.target.name]: event.target.value,
          accessibility: 1,
        });
      }
    backHandler=()=>{
        console.log("calling back handler for list")
        // remover("Createnewuser")
        this.props.newcloseHandler()
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
                                <a>Content Statuses Search</a>
                            </b>
                        </u>
                    &#62;
                    <u>
                            {" "}
                            <b>
                                {" "}
                                <a onClick={this.backHandler}>Content Statuses Management</a>
                            </b>
                        </u>
                        &#62;
                    <u>
                            {" "}
                            <b>
                                {" "}
                                <a>Content Statuses Edition</a>
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
                            <a  onClick={this.SubmitHandler}>Create</a>{" "}
                            {" "}<FaSave

                            //   onClick={() => this.edithandler(props.original)}
                            >

                            </FaSave>{" "}
                            {/* <button >Configure</button> */}
                            <a >Create and Select</a>{" "}



                        </div>
                        <span style={{color:"Green"}}>&nbsp;&nbsp;&nbsp;{this.state.msg}</span>
                            <span style={{color:"Red"}}>&nbsp;&nbsp;&nbsp;{this.state.errmsg}</span>

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
                            <Input type="text"
                            value={this.state.content_Status_id}
                            name="content_Status_id"
                            onChange={this.onchangehandler} />
                            </Col>

                            {/* <Col>

                                <Input bsSize="sm" />
                            </Col> */}
                            <Col> </Col>

                            <Col>
                                <Label>Description</Label>
                            </Col>

                            <Col>
                            <Input type="text"
                            value={this.state.description}
                            name="description"
                            onChange={this.onchangehandler} />
                            </Col>
                            <Col> </Col>

                        </Row>

                        <Row style={{ marginTop: "10px", marginBottom:"-8px" }}>
                            <Col>
                                <Label>Accessibility</Label>
                            </Col>

                            <Col>

                            <Input type="checkbox"
                            value={this.state.accessibility}
                            name="accessibility"
                            onChange={this.checkHandler1} />
                            </Col>

                            <Col> </Col>

                            <Col>
                                <Label>Technical</Label>
                            </Col>

                            <Col>

                            <Input type="checkbox"
                            value={this.state.technical}
                            name="technical"
                            onChange={this.checkHandler} />
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
