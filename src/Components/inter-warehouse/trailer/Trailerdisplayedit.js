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
import Int from "../../inter-warehouse/trailer/InterwarehouseTrailerList";
import { intertrailerdata, intertrailerHandler, remover } from "../../../store/Store";
import axios from "axios";

export default class Trailerdisplayedit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      tableData: [],
      data:[],
    };
  }
  

  
  Backhandler = () => {
    console.log("arqum Back Handler calling");
    remover("Trailerdisplayedit");
    this.props.DisplayEditCloseHandler();
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
                  <a>WH trailers search</a>
                </b>
              </u>{" "}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a>WH trailers management</a>
                </b>
              </u>{" "}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a>wave details  management </a>
                </b>
              </u>{" "}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a>wave details edition </a>
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
              <b style={{ marginLeft: "5px" }}>Wave</b>
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
               {" "}
              </Col>
              <Col>
               
              </Col>
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
                <Label>Type</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Company</Label>{" "}
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Reference</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Reference ID</Label>{" "}
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
             
                {" "}
                
              </Col>
                
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
