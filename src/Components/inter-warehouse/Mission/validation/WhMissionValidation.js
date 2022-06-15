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
  import {
    IoArrowBackCircleSharp,
    IoArrowForwardCircleSharp,
  } from "react-icons/io5";
  import { FcSearch } from "react-icons/fc";
  import axios from "axios";
  import {WhMissionVdata,WhMissionVHandler} from '../../../../store/Store';
  import Missionvalidationlist from './Missionvalidationlist'

export default class WhMissionValidation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isShow: "true",
            tableData: [],
        }

        
    }

    submithandler = () => {
        console.log("Display list calling");
        this.getbodylist();
        this.setState({
          isShow: true,
        });
      };
    
      getbodylist = () => {
        console.log("bodylist calling");
        axios
          .get("https://jsonplaceholder.typicode.com/posts")
          .then((response) => {
            if (response.status === 200) {
              console.log("resposne success", response);
    
              this.setState({
                tableData: response.data,
              });
            //   LogicalgateHandler(response.data);
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
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
          {WhMissionVdata.length !== 0 || this.state.isShow === true ? (
            <Missionvalidationlist tableData={this.state.tableData} />
          ) : (
            <div>
              <IoArrowBackCircleSharp />
              <IoArrowForwardCircleSharp />
              <FcSearch style={{ marginLeft: "5px" }} />
              <span>
                <u>
                  <b>
                    <a>Home</a>
                  </b>
                </u>
                <u>
                  <b>
                    <a>WH Mission Validation</a>
                  </b>
                </u>
              </span>
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Stock Criteria</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Warehouse from</Label>
                  <Col>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      bsSize="sm"
                    >
                      <option>=</option>
                    </Input>
                  </Col>
                  <Col>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      bsSize="sm"
                    >
                      <option>=</option>
                    </Input>
                  </Col>
                </Col>

                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Warehouse to</Label>
                  <Col>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      bsSize="sm"
                    >
                      <option>=</option>
                    </Input>
                  </Col>
                  <Col>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      bsSize="sm"
                    >
                      <option>=</option>
                    </Input>
                  </Col>
                </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Container</Label>
                  <Col>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      bsSize="sm"
                    >
                      <option>=</option>
                    </Input>
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      bsSize="sm"
                    >
                      <option>=</option>
                    </Input>
                  </Col>
                </Col>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Batch</Label>
                  <Col>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      bsSize="sm"
                    >
                      <option>=</option>
                    </Input>
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      bsSize="sm"
                    >
                      <option>=</option>
                    </Input>
                  </Col>
                </Col>
              </Row>
              <br />

              <Row>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>TO name</Label>
                  <Col>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      bsSize="sm"
                    >
                      <option>=</option>
                    </Input>
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      bsSize="sm"
                    ></Input>
                  </Col>
                </Col>
              </Row>
              <hr/>
              <br/>

              <Row>
                <Col xs="4" style={{ display: "flex" }}>
                  <Label>Maximum result</Label>
                  <Col>
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      bsSize="sm"
                    >
                      <option>=</option>
                    </Input>
                  </Col>
                  <Col>
                    <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      bsSize="sm"
                    ></Input>
                  </Col>
                </Col>
              </Row>

              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Button>Reset Criteria</Button>
                <Button
                  onClick={this.submithandler}
                  style={{ marginLeft: "5px" }}
                >
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
