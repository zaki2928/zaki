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
import {WaveEditdata, Wavedata, waveHandler, remover } from "../../../store/Store";
import axios from "axios";

export default class Wave_Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      tableData: [],
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
    };
  }

  // submithandler = () => {
  //   console.log("Display list calling");
  //   this.getbodylist();
  //   this.setState({
  //     isShow: true,
  //   });
  // };

  componentDidMount(){
    console.log("calling edit datttaaaaaaaaaaaaa&&&&&&aaaa uzmaaaaaaa", WaveEditdata)

    this.setState({
      dateLaunch: WaveEditdata.dateLaunch,
      ddDateMax: WaveEditdata.ddDateMax,
      ddDateMin: WaveEditdata.ddDateMin,
      idSite: WaveEditdata.idSite,
      idWave: WaveEditdata.idWave ,
      statusWave:WaveEditdata.statusWave,
      typePo :WaveEditdata.typePo,
      idDm:WaveEditdata.idDm,
      commentaryIc: WaveEditdata.commentaryIc,
      wsNameIc: WaveEditdata.wsNameIc ,


    });
  }

  Backhandler = () => {
    console.log("shahid Back Handler calling");
    remover("Wave_Edit");
    this.props.EditCloseHandler();
  }

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
                  <a style={{cursor:"pointer"}} onClick={this.Backhandler}>Wavelist</a>
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
              <b style={{ marginLeft: "5px"  }}>Description</b>
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
                 bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Status</Label>{" "}
              </Col>
              <Col>
                <Input 
                type="text"
                value={this.state.statusWave}
                name="statusWave"
                bsSize="sm"
                 >
                   {this.state.statusWave ===500 ?this.setState({statusWave:"_Prepared_"}) : 
                   this.state.statusWave ===100 ?this.setState({statusWave:"Created"}): 
                   this.state.statusWave ===355 ?this.setState({statusWave:"_Error_"}):
                   this.state.statusWave ===350 ?this.setState({statusWave:"_Launchable_"}):
                   this.state.statusWave ===370 ?this.setState({statusWave:"_pre Calculated_"}):
                   this.state.statusWave ===380 ?this.setState({statusWave:"_Calculated_"}):
                   this.state.statusWave ===400 ?this.setState({statusWave:"_Launched_"}):
                   this.state.statusWave ===424 ?this.setState({statusWave:"_In InPreparation_"}):
                   this.state.statusWave ===500 ?this.setState({statusWave:"_Prepared_"}):
                   this.state.statusWave ===4000 ?this.setState({statusWave:"_Cancelled_"}):
                    null
                   }
                    {/* // <option value="100">Created</option>
                    // <option value="350">_Launchable_</option>
                    // <option value="355">_Error_</option>
                    // <option value="370">_pre Calculated_</option>
                    // <option value="380">_Calculated_</option>
                    // <option value="400">_Launched_</option>
                    // <option value="424">_In InPreparation_</option>
                    // <option value="500">_Prepared_</option>
                    // <option value="4000">_Cancelled_</option> */}
               </Input>


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
                <Input 
                type="text"
                 value={this.state.ddDateMin}
                 name="ddDateMin"
                 bsSize="sm"
                 readOnly={true}
                />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Max desired delivery date</Label>{" "}
              </Col>
              <Col>
                <Input 
                  type="text"
                  value={this.state.ddDateMax}
                  name="ddDateMax"
                  bsSize="sm"
                  readOnly={true}
                />
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
                  type="text"
                  value={this.state.typePo}
                  name="typePo "
                  bsSize="sm"
                  >
                      {this.state.typePo ===100 ?this.setState({typePo:"_standard_"}) :null}
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
                <Input 
                 type="text"
                 value={this.state.dateLaunch}
                 name="dateLaunch"
                 bsSize="sm"
                readOnly={true}
                />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>User Creation</Label>{" "}
              </Col>
              <Col>
                <Input 
                type="text"
                value={this.state.wsNameIc}
                name="wsNameIc"
                bsSize="sm"
                readOnly={true}            
                />
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
                <Input 
                   type="text"
                   value={this.state.commentaryIc}
                   name="commentaryIc"
                   bsSize="sm"
                   readOnly={true}                
                />
              </Col>
              <Col></Col>

              <Col> </Col>
              {/* <Col>
                <Label>Status</Label>{" "}
              </Col>
              <Col>
                <Input 
                   type="text"
                   value={this.state.statusWave}
                   name="statusWave"
                   bsSize="sm"

                
                />
              </Col> */}
              <Col></Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
              <Label>Active</Label>
             
              <Input bsSize="sm"
              type="checkbox" 
              readOnly={true}
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
