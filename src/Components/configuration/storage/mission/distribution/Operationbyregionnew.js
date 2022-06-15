import React, { Component } from 'react'
import {Container,Row,Col,Label,Input} from "reactstrap";
import "react-table-v6/react-table.css";
import { FaSave } from 'react-icons/fa';
import { remover } from '../../../../../store/Store'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import { properties } from "../../../../../Properties/Properties"

const getListOfMissionClass = properties.Port + properties.getListOfMissionClass
const getWarehouses = properties.Port + properties.getWarehouses
const getlistofRegionsWHEntities = properties.Port + properties.getlistofRegionsWHEntities
const createRegionMissionDistribution = properties.Port + properties.createRegionMissionDistribution



export default class Operationbyregionnew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      missionClass:"",
      missionClassList:[],
      wh_desc:"",
      wh_descList:[],
      warehouseIds: "",
      whList:[],
      distribution: 0,

    };
  }

  checkHandler = (event) =>{
    this.setState({
      [event.target.name]: event.target.value,
      distribution: 1,
    });
  }

  componentDidMount = () => {
    this.getMissionClass();
    this.getWarwhouseList();
    this.getRegionList();
  }

  getMissionClass = () => {
    console.log("calling region from dropdown", this.state.missionClassList) 
    axios.get(getListOfMissionClass)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            missionClassList: response.data,
          });

        } else {
          this.setState({
            missionClassList: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getWarwhouseList = () => {
    console.log("calling warwhouse from dropdown", this.state.whList) 
    axios.get(getWarehouses)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            whList: response.data,
          });

        } else {
          this.setState({
            whList: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getRegionList = () => {
    console.log("calling warwhouse from dropdown", this.state.wh_descList) 
    axios.get(getlistofRegionsWHEntities)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            wh_descList: response.data,
          });

        } else {
          this.setState({
            wh_descList: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  backHandler=()=>{
    console.log("calling back handler for list")
    remover("cellmodelsid")
    this.props.NewCloseHandler()
  }

  onchangehandler = (event) => {
    console.log("onchangehandler");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = () => {
    console.log("posting data", this.state);
    axios.post(createRegionMissionDistribution, this.state)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({
            msg: "Data Saved Successfully",
          });

        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

 

  onchangehandler = (event) => {
    console.log("onchangehandler");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  
 
  render() {
    const { message } = this.state;
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
        // style={{ border: "1px solid black", }}
        >
          {
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
                    <a onClick={this.backHandler}>Distribution operations by region Search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a onClick={this.backHandler}>Distribution operations by region Management</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Distribution operations by region Edition</a>
                  </b>
                </u>
              </span>
              <br />


              <div>
                <div class="row-xs-6 bottom-row ">

                  {/* <button >Configure</button> */}
                  <div>
                    <FaSave>

                    </FaSave>{" "}
                    <a onClick={this.submitHandler}>Create</a>
                    {" "}<FaSave

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaSave>{" "}
                    <a >Create and Select</a>{" "}
                  </div>

                  <div>
                    <b>
                      <span
                        style={{
                          color: "green",
                        }}
                      >
                        <h6>{message}</h6>
                      </span>
                    </b>
                  </div>



                </div>

                <div>
                  <hr />
                  {/* <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      marginTop: "10px"
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Description</b>
                  </div> */}

                <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Warehouse</Label>
                </Col>
                  <Col>
                    <Input
                      type="select"
                      name="warehouseIds"
                    //   id="description"
                      onChange={this.onchangehandler}
                      bsSize="sm"
                    >
                        <option>---select</option>
                        {this.state.whList.map(data => <option value={data.warehouseIds} key={data.warehouseIds}>{data.description}</option>)}
                    </Input>
                  </Col>
                  <Col>
                    <Label>Mission class</Label>
                  </Col>
                  <Col>
                    <Input
                       type="select"
                       name="missionClass"
                      onChange={this.onchangehandler}
                      //  value={this.state.description}
                      bsSize="sm"
                    >
                        <option>---select</option>
                      {this.state.missionClassList.map(data => <option value={data.missionClass} key={data.missionClass}>{data.missionClass}</option>)}
                    </Input>
                  </Col>
                </Row>

                  <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Col>
                      <Label>Distributed</Label>
                    </Col>

                    <Col>

                      <Input
                        type="checkbox"
                        name="distribution"
                        // id="distribution"
                        value={this.state.distribution}
                        onChange={this.checkHandler}
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        

                      </Input>
                    </Col>
                    <Col> </Col>


                    <Col> </Col>

                  </Row>

                </div>
                <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      marginTop: "10px"
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Origin</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Region</Label>
                </Col>
                  <Col>
                    <Input
                      type="select"
                      name="wh_desc"
                    //   id="description"
                      onChange={this.onchangehandler}
                      bsSize="sm"
                    >
                        <option>---select</option>
                        {this.state.wh_descList.map(data=> <option value={data.value} key={data.wh_desc}>{data.wh_desc}</option>)}
                    </Input>
                  </Col>
                  <Col>
                    
                  </Col>
                  <Col>
                  </Col>
                </Row>
                    
                <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      marginTop: "10px"
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Destination</b>
                  </div>
                  <br/>
                <Row>
                <Col>
                  <Label>Region</Label>
                  </Col>
                  <Col>
                    <Input
                      type="select"
                      name="wh_desc"
                      onClick={this.onchangehandler}
                      bsSize="sm"
                    >
                        <option>---select---</option>
                        {this.state.wh_descList.map(data=> <option value={data.value} key={data.wh_desc}>{data.wh_desc}</option>)}
                    </Input>
                  </Col>
                  <Col>
                  </Col>
                  <Col>
                  </Col>
                
              </Row>
                <br/>
              </div>
            </div>
          }

        </Container>
      </React.Fragment>
    )
  }
}
