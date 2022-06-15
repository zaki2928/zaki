import React, { Component } from 'react'
import {Container,Row,Col,Label,Input} from "reactstrap";
import "react-table-v6/react-table.css";
import { FaSave } from 'react-icons/fa';
import { cellmodelsEditData, remover, cellmodelsid} from '../../../../store/Store'
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';


export default class Cellmodelsedit extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

  componentDidMount() {
    // console.log("calling edit data length", this.state.data.length);
    console.log( this.props.data);
    console.log("calling edit ", cellmodelsEditData);

    if (cellmodelsEditData !== null) {
      this.setState(
        {
          data: cellmodelsEditData,
        },
        () => {
          console.log("data present after tab switch", this.state.data);
          this.setState({
            description:cellmodelsEditData.description,
            defaultCell:cellmodelsEditData.defaultCell,
            height:cellmodelsEditData.height,
            idCell:cellmodelsEditData.idCell,
            lenght: cellmodelsEditData.lenght,
            mDate: cellmodelsEditData.mDate,
            musername: cellmodelsEditData.musername,
            numberOfContainer: cellmodelsEditData.numberOfContainer,
            numberOfIndex:cellmodelsEditData.numberOfIndex,
            weight:cellmodelsEditData.weight,
            width:cellmodelsEditData.width,
           
            
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
    remover(cellmodelsid)
    this.props.editcloseHandler()
  }

  
 
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
                    <a style={{cursor:"pointer" }} onClick={this.backHandler}>Cell models Search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer" }} onClick={this.backHandler}>Cell models Management</a>
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
                    <a style={{cursor:"pointer" }} onClick={this.createRoleMethod}>Create</a>
                    {" "}<FaSave

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaSave>{" "}
                    <a style={{cursor:"pointer" }}>Create and Select</a>{" "}
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
                        type="text"
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
                        value={this.state.numberOfIndex}
                        name="numberOfIndex"
                        onChange={this.onchangehandler}
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
                        id='defaultCell'
                        value={this.state.defaultCell}
                        name="defaultCell"
                        onChange={this.onchangehandler}
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
                      value={this.state.lenght}
                      name="lenght"
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
                      value={this.state.width}
                      name="width"
                      onChange={this.onchangehandler}
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
                     value={this.state.height}
                     name="height"
                     onChange={this.onchangehandler}
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
                     value={this.state.weight}
                     name="weight"
                     onChange={this.onchangehandler}
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
