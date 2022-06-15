import React, { Component } from 'react'
import {Container,Row,Col,Label,Input} from "reactstrap";
import "react-table-v6/react-table.css";
import { FaSave } from 'react-icons/fa';
import { operationbyregionEditData, remover } from '../../../../../store/Store'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import { properties } from "../../../../../Properties/Properties"

const updateRegionMissionDistribution = properties.Port + properties.updateRegionMissionDistribution
const getWarehouses = properties.Port + properties.getWarehouses
const getlistofRegionsWHEntities = properties.Port + properties.getlistofRegionsWHEntities
const getListOfMissionClass = properties.Port + properties.getListOfMissionClass



export default class Operationbyregionedit extends Component {
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

 

  componentDidMount() {
    // console.log("calling edit data length", this.state.data.length);
    console.log( this.props.data);
    console.log("calling edit ", operationbyregionEditData);

    this.getMissionClass();
    this.getWarwhouseList();
    this.getRegionList();

    if (operationbyregionEditData !== null) {
      this.setState(
        {
          data: operationbyregionEditData,
        },
        () => {
          console.log("data present after tab switch", this.state.data);
          this.setState({
            missionClass:operationbyregionEditData.missionClass,
            wh_desc:operationbyregionEditData.wh_desc,
            warehouseIds:operationbyregionEditData.warehouseIds,
            distribution:operationbyregionEditData.distribution,
            
          });
        }
      );
    }
  }

 

  onchangehandler = (event) => {
    console.log("onchangehandler");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  backHandler=()=>{
    console.log("calling back handler for list")
    remover("operationbyregionsid")
    this.props.editcloseHandler()
  }

  updateHandler = () => {
    console.log("posting data", this.state);
    axios.put(updateRegionMissionDistribution, this.state)
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
                    <a onClick={this.updateHandler}>Create</a>
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
                        {this.state.wh_descList.map(data=> <option value={this.wh_desc} key={this.wh_desc}>{this.wh_desc}</option>)}
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
                        {this.state.wh_descList.map(data=> <option value={this.wh_desc} key={this.wh_desc}>{this.wh_desc}</option>)}
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
