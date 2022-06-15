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
import Wave_List from "../wave/Wave_List";
import { Wavedata,displayeditdata, waveHandler, remover } from "../../../store/Store";
import axios from "axios";

export default class Dispaly_Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      tableData: [],
      data:[],
      cdateIc: "",
      cleanUpNumber: "",
      cleanUpStatus: "",
      commentaryIc: "",
      cusernameIc: "",
      attribute:null,
      operation:"=",
      value:null,
      dateLaunch: "",
      ddDateMax: "",
      ddDateMin: "",
      idSite: "",
      idWave: "",
      mDate: "",
      musername: "",
      nbUnlaunchedBoxes: "",
      statusShippingWave: "",
      statusWave: "",
      statusWaveWf: "",
      typePo: "",
      versionLock: "",
      wsNameIc: "",
      IdCarrierList:[],
      IdDmList:[],
      listFilterBean: [],
      type:"",
      idCompany:"",
      reference:"",
      referenceId:"",
    };
  }


  componentDidMount(){
    console.log("calling edit datttaaaaaaaaaaaaa&&&&&&aaaa uzmaaaaaaa", displayeditdata)

    this.setState({
      dateLaunch: displayeditdata.dateLaunch,
      ddDateMax: displayeditdata.ddDateMax,
      ddDateMin: displayeditdata.ddDateMin,
      idSite: displayeditdata.idSite,
      idWave: displayeditdata.idWave ,
      statusWave:displayeditdata.statusWave,
      typePo :displayeditdata.typePo,
      idDm:displayeditdata.idDm,
      commentaryIc: displayeditdata.commentaryIc,
      wsNameIc: displayeditdata.wsNameIc ,
      type: displayeditdata.typeDetail,
      idCompany: displayeditdata.idCompany,
      reference: displayeditdata.reference,
      referenceId: displayeditdata.idReference,
    });
  }
  Backhandler = () => {
    console.log("arqum Back Handler calling");
    remover("Display_Edit");
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
                  <a style={{cursor:"pointer"}}>wave details  management </a>
                </b>
              </u>{" "}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor:"pointer"}}>wave details edition </a>
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
                <Input 
                type="text"
                 value={this.state.idWave}
                 name="idWave"
                 bsSize="sm"
                 />
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
              <b style={{ marginLeft: "5px" }}>Description </b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Type</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input 
                  type="text"
                  value={this.state.type}
                  name="idWave"
                  bsSize="sm"               
                
                >
                  {this.state.type === 1000
                    ? this.setState({ type: "Preparation Order" })
                    : this.state.type === 2000
                    ? this.setState({ type: "Container" })
                    : null}
                </Input>
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Company</Label>{" "}
              </Col>
              <Col>
                <Input 
                  type="text"
                  value={this.state.idCompany}
                  name="idWave"
                  bsSize="sm"               
                
                />
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
                <Input 
                  type="text"
                  value={this.state.reference}
                  name="idWave"
                  bsSize="sm"               
                
                />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Reference ID</Label>{" "}
              </Col>
              <Col>
                <Input 
                  type="text"
                  value={this.state.referenceId}
                  name="idWave"
                  bsSize="sm"               
                />
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
