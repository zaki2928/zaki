import React, { Component } from 'react'
import {
    Container,
    Row,
    Col,
    Label,
    Input,

} from "reactstrap";
import { FaSave } from 'react-icons/fa';
import axios from 'axios';
// import {remover} from "../../store/Store"
import { properties } from '../../../../Properties/Properties';
import { FAMILY_PROFILE } from '../../../../store/RoleBased';
const createFamilyKLOthers=  properties.Port + properties.createFamilyKLOthers;



export default class Editfamilies extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data:[],
            typeFamily:'',
            description:'',
            descriptionShort:'',
            defaultFamily:'',
            idFamily:'',
            message:"",
        }
    }

    backHandler=()=>{
        console.log("calling back handler for list")
        // remover("Createnewuser")
        this.props.editcloseHandler()
      }

      componentDidMount=()=>{
        console.log("calling componentDidMount here for family", this.props.data)
        this.setState({
            typeFamily:this.props.data.typeFamily,
            description:this.props.data.description,
            descriptionShort:this.props.data.descriptionShort,
            defaultFamily:this.props.data.defaultFamily,
            idFamily:this.props.data.idFamily,
        })
      }

      onchekcboxHandler=(event)=>{
        console.log("chek value", event.target.checked)
        if (event.target.checked) {
            this.setState({
                defaultFamily:1
            })
        }else{
            this.setState({
                defaultFamily:0
            })
        }
    }

    onchangehandler = (event) => {
        console.log("onchangehandler", event.target.value);
        // console.log("onchangehandler", event.target.name);
        this.setState({
          [event.target.name]: event.target.value,
        });
      };
    
      UpdateFamilyMethod=()=>{
        console.log("calling create fmily method", this.state)
                axios
                    .post(createFamilyKLOthers, this.state)
                    // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
                    .then((response) => {
                        if (response.status === 200) {
                            console.log("resposne success", response.data);
                            this.setState({
                              message: "family saved Successfully",
                              idRole: response.data.idRole
                            });
                  
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                        });    
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
                                <a style={{cursor:"pointer"}}>Families Search</a>
                            </b>
                        </u>
                    &#62;
                    <u>
                            {" "}
                            <b>
                                {" "}
                                <a style={{cursor:"pointer"}} onClick={this.backHandler}>Families Management</a>
                            </b>
                        </u>
                        &#62;
                    <u>
                            {" "}
                            <b>
                                {" "}
                                <a style={{cursor:"pointer"}}>Families Edit</a>
                            </b>
                        </u>
                    </span>

                    <br />


                    <div>
                    {FAMILY_PROFILE ===2 ?

                        <div class="row-xs-6 bottom-row ">
                            <FaSave

                            //   onClick={() => this.edithandler(props.original)}
                            >

                            </FaSave>{" "}
                            {/* <button >Configure</button> */}
                            <a style={{cursor:"pointer"}} onClick={this.UpdateFamilyMethod}>Save</a>{" "}
                            

                            

                            {/* <button >Configure</button> */}
                            {/* <a >Create and Select</a>{" "} */}


                        </div>
                                                    :''}

                        <span style={{color:"Green",  fontWeight: "bold"}}>&nbsp;&nbsp;&nbsp;{this.state.message}</span>


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
                                <Label>Description</Label>
                            </Col>

                            <Col>

                                <Input bsSize="sm"
                                 type="text"
                                 value={this.state.description}
                                 name="description"
                                
                                 onChange={this.onchangehandler}
                                  />
                            </Col>
                            <Col> </Col>

                            <Col>
                                <Label>Short description</Label>
                            </Col>

                            <Col>

                                <Input bsSize="sm"
                                 type="text"
                                 value={this.state.descriptionShort}
                                 name="descriptionShort"
                                
                                 onChange={this.onchangehandler}
                                  />
                            </Col>
                            <Col> </Col>

                        </Row>

                        <Row style={{ marginTop: "10px", marginBottom:"-8px" }}>
                            <Col>
                                <Label>Type</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="select"
                                    id="exampleSelect"
                                    name='typeFamily'
                                    value={this.state.typeFamily}
                                    onChange={this.onchangehandler}
                                    // style={{ width: "50px" }}
                                    bsSize="sm"
                                 >
                                     <option value="">   </option>
                                     <option value={5000}>others</option>
                                     <option value={500}>_Aerosol_</option>
                                     <option value={600}>_Fragile_</option>
                                     <option value={400}>_Hazardous</option>
                                     <option value={300}>_vertical_</option>
                                 </Input>
                            </Col>

                            <Col> </Col>

                            <Col>
                                <Label>Default</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="checkbox"
                                    id="exampleSelect"
                                    name='defaultFamily'
                                    onChange={this.onchekcboxHandler}
                                    checked={this.state.defaultFamily===1?true:false}
                                    value={this.state.defaultFamily}
                                    bsSize="sm"
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
