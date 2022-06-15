import React, { Component } from 'react'
import {Container,Row,Col,Label,Input} from "reactstrap";
import "react-table-v6/react-table.css";
import { FaSave } from 'react-icons/fa';
import { remover, cellmodelsid } from '../../../../store/Store'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import { properties } from '../../../../Properties/Properties'

const createCellModel = properties.Port + properties.createCellModel

export default class Cellmodelsnew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      msg:"",
      description:"",
      defaultCell: "",
      height: "",
      idCell: "",
      lenght:"",
      mDate: "",
      musername: "",
      numberOfContainer: "",
      numberOfIndex: "",
      versionLock: "",
      weight: "",
      width: ""

    };
  }

 
  backHandler=()=>{
    console.log("calling back handler for list")
    remover(cellmodelsid)
    this.props.closeHandler()
  }

  onchangehandler = (event) => {
    console.log("onchangehandler");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitHandler = () => {
    console.log("posting data", this.state);
    axios
      .post(createCellModel, this.state)
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
                    <a onClick={this.backHandler}>Cell models Search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a onClick={this.backHandler}>Cell models Management</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Cell models Edition</a>
                  </b>
                </u>
              </span>
              <br />


              <div>
                <div className="row-xs-6 bottom-row ">

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
                        <h6>{this.state.msg}</h6>
                      </span>
                    </b>
                  </div>



                </div>

                <div>
                  <hr />
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      marginTop: "10px"
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Description</b>
                  </div>

                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Description</Label>
                    </Col>

                    <Col>

                      <Input bsSize="sm"
                        value={this.state.description}
                        name="description"
                        onChange={this.onchangehandler}
                      />
                    </Col>
                    <Col> </Col>


                    <Col> </Col>

                  </Row>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>No of Indexes</Label>
                    </Col>

                    <Col>

                      <Input
                        type="text"
                        name="numberOfIndex"
                        // id="numberOfIndex"
                        // value={this.state.numberOfIndex}
                        onChange={this.onchangehandler}
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        
                      </Input>
                    </Col>
                    <Col> </Col>


                    <Col> </Col>

                  </Row>
                  <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Col>
                      <Label>Default</Label>
                    </Col>

                    <Col>

                      <Input
                        type="checkbox"
                        name="defaultCell"
                        id="defaultCell"
                        value={this.state.defaultCell}
                        onChange={this.onchangehandler}
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
                    <b style={{ marginLeft: "5px" }}>Characteristics</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Length(m)</Label>
                </Col>
                  <Col>
                    <Input
                      type="text"
                      name="lenght"
                      value={this.state.lenght}
                    //   id="description"
                      onChange={this.onchangehandler}
                      bsSize="sm"
                    >
                    </Input>
                  </Col>
                  <Col>
                    <Label>Width(m)</Label>
                  </Col>
                  <Col>
                    <Input
                       type="text"
                       name="width"
                       onChange={this.onchangehandler}
                       value={this.state.width}
                      bsSize="sm"
                    >
                    </Input>
                  </Col>
                </Row>

                <Row>
                <Col>
                  <Label>Height(m)</Label>
                  </Col>
                  <Col>
                  <Input
                      type="text"
                      name="height"
                      onChange={this.onchangehandler}
                      value={this.state.height}
                      bsSize="sm"
                    >
                      </Input>
                  </Col>
                  <Col>
                    <Label>Weight(kg)</Label>
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      name="weight"
                      onChange={this.onchangehandler}
                      value={this.state.weight}
                      bsSize="sm"
                    >
                      </Input>
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
