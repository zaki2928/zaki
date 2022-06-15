import React, { Component } from "react";
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

import { WaveShippingEditdata, waveShippingEditHandler, remover } from "../../../store/Store";
import axios from "axios";

export default class WaveEditShipping extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      tableData: [],
    };
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
          waveShippingEditHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  Backhandler = () => {
    console.log("shahid Back Handler calling");
    remover("WaveEditShipping");
    this.props.EditCloseHandler();
  };
  render() {
    return (
      <React.Fragment>
        <Container className="themed-container" fluid={true}>
          <div>
            <IoArrowBackCircleSharp onClick={this.Backhandler} />
            <IoArrowForwardCircleSharp />
            <FcSearch style={{ marginLeft: "5px" }} />
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
                  <a style={{cursor:"pointer"}}>Wave search</a>
                </b>
              </u>{" "}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor:"pointer"}}>Wavelist</a>
                </b>
              </u>{" "}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor:"pointer"}}>wave edition </a>
                </b>
              </u>{" "}
            </span>
            <br />
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
              }}
            >
              <b style={{ marginLeft: "5px" }}>Description</b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Wave no</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Status</Label>{" "}
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Minimum desired delivery date</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Max desired delivery date</Label>{" "}
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>

            <Row style={{marginTop:"10px"}}>
              <Col>
                <Label>Preparation order type</Label>{" "}
              </Col>
              <Col>
                {" "}
                <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    bsSize="sm"
                    readOnly="true"
                  >
                    <option>standard</option>
                  </Input>

              </Col>
              <Col></Col>

              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginBottom: "20px" }}>
              <Col></Col>
              <Col></Col>
              <Col></Col>

              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col> </Col>
            </Row>
          </div>

          <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
              }}
            >
              <b style={{ marginLeft: "5px" }}>Info Complementry</b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Creation date</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>User Creation</Label>{" "}
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Comment</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Status</Label>{" "}
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
              <Label>Active</Label>
             
              <Input bsSize="sm"
              type="checkbox" 
              style={{marginLeft:"10px",
            
            }}
              />
                {" "}
                
              </Col>
                <b>Shipping</b>
              <Col>
              
                {" "}
                
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                {" "}
              </Col>
              <Col>
                
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
<div>

</div>
        </Container>
      </React.Fragment>
    );
  }
}
