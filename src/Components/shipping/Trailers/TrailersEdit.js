import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
    FormGroup,
    Button,
  } from "reactstrap";
  import Swal from "sweetalert2";
import { TrailersEditData, remover } from '../../../store/Store';
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";


class TrailersEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      limit:"",
      trailsList: false,
      idWarehouse:"",
      sapId:"",
      listFilterBean:[],
      idWaveSingle:"",
      consolidationAreaPosition: "",
      driverName: "",
      expectedContainerNumber: "",
      height: "",
      idCarrier: "",
      idCompany: "",
      idContainer: "",
      idContainerFather: "",
      idContainerPrpSilo: "",
      idContainerSh: "",
      idContainerShClient: "",
      idDm: "",
      idGateLoaded: "",
      idLocation: "",
      idPackaging: "",
      idPoSingle: "",
      idPrepLineN3: "",
      idPrepOrder: "",
      idRecordingGate: "",
      idShip: "",
      incomingDate: "",
      attribute: null,
      operation: "=",
      value: null,
      mDate: "",
      musername: "",
      outgoingDate: "",
      rfidTag: "",
      seal: "",
      statusClient: "",
      statusContainer: "",
      statusSh: "",
      statusWeighing: "",
      trailerIdentification: "",
      trailerNumber: "",
      trailerPreparationType: "",
      trailerType: "",
      typeContainer: "",
      typePalFather: "",
      typePalettisation: "",
      versionLock: "",
      weight:"",

            }
}


    // saveHandler(){
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: 'gray',
    //         cancelButtonColor: 'gray',
    //         confirmButtonText: 'Yes, delete it!'
    //       }).then((result) => {
    //         if (result.isConfirmed) {
    //           Swal.fire(
    //             'Deleted!',
    //             'Your file has been deleted.',
    //             'success'
    //           )
    //         }
    //       })

    // }
    
    
  componentDidMount(){
    console.log("calling edit datttaaaaaaaaaaaaaaaaa", TrailersEditData)
    this.setState({
      
      idWarehouse:TrailersEditData.idWarehouse,
      sapId:TrailersEditData.sapId,
      idWaveSingle:TrailersEditData.idWaveSingle,
      consolidationAreaPosition:TrailersEditData.consolidationAreaPosition, 
      driverName:TrailersEditData.driverName,
      expectedContainerNumber:TrailersEditData.expectedContainerNumber,
      height:TrailersEditData.height,
      idCarrier:TrailersEditData.idCarrier,
      idCompany:TrailersEditData.idCompany,
      idContainer:TrailersEditData.idContainer,
      idContainerFather:TrailersEditData.idContainerFather,
      idContainerPrpSilo:TrailersEditData.idContainerPrpSilo,
      idContainerSh:TrailersEditData.idContainerSh,
      idContainerShClient:TrailersEditData.idContainerShClient,
      idDm:TrailersEditData.idDm,
      idGateLoaded:TrailersEditData.idGateLoaded,
      idLocation:TrailersEditData.idLocation,
      idPackaging:TrailersEditData.idPackaging,
      idPoSingle:TrailersEditData.idPoSingle,
      idPrepLineN3:TrailersEditData.idPrepLineN3,
      idPrepOrder:TrailersEditData.idPrepOrder,
      idRecordingGate:TrailersEditData.idRecordingGate,
      idShip:TrailersEditData.idShip,
      incomingDate:TrailersEditData.incomingDate,
      mDate:TrailersEditData.mDate,
      musername:TrailersEditData.musername,
      outgoingDate:TrailersEditData.outgoingDate,
      rfidTag:TrailersEditData.rfidTag,
      seal:TrailersEditData.seal,
      statusClient:TrailersEditData.statusClient,
      statusContainer:TrailersEditData.statusContainer,
      statusSh:TrailersEditData.statusSh,
      statusWeighing:TrailersEditData.statusWeighing,
      trailerIdentification:TrailersEditData.trailerIdentification,
      trailerNumber:TrailersEditData.trailerNumber,
      trailerPreparationType:TrailersEditData.trailerPreparationType,
      trailerType:TrailersEditData.trailerType,
      typeContainer:TrailersEditData.typeContainer,
      typePalFather:TrailersEditData.typePalFather,
      typePalettisation:TrailersEditData.typePalettisation,
      versionLock:TrailersEditData.versionLock,
      weight:TrailersEditData.weight,
    })
  }
  backHandler=()=>{
    console.log("calling back handler for list")
    remover("TrailersEdit")
    this.props.editClosehandler()
  }


    render() {
        return (
            <React.Fragment>
            <Container
              className="themed-container"
              fluid={true}
              // style={{ border: "1px solid black", marginLeft: "14px" }}
            >
                <IoArrowBackCircleSharp onClick={this.backHandler}/>
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
                        <a>Trailers Filter</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}} onClick={this.backHandler}>Trailers List</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Trailers Edit</a>
                      </b>
                    </u>
                  </span>
                  <br />
                <div>
                 
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>*<b></b>GENERAL</b>
                  </div>

                  <div style={{
                      border: "1px",
                    //   backgroundColor: "grey",
                      border: "1px solid black",
                    }}><b>* PREPARATION CONTAINERS</b></div>

                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Container no</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input
                       type="text"
                      value={this.state.idContainer}
                      name="idContainer"
                       bsSize="sm" 
                       />
                    </Col>
    
                    <Col> </Col>
                    <Col>
                      <Label>Location</Label>{" "}
                    </Col>
                    
                    <Col>
                      {" "}
                      <Input 
                      type="text"
                      value={this.state.idLocation}
                      name="idLocation"
                      bsSize="sm"
                      />
                    </Col>
                    <Col> </Col>
                  </Row>
    
                  <Row style={{ marginTop: "3px" }}>
                  <Col>
                      <Label>Status</Label>{" "}
                    </Col>
    
                    <Col>
                          {" "}
                          <Input
                           type="text"
                           value={this.state.statusClient}
                           name=""
                           bsSize="sm"
                          >                            
                          </Input>
                        </Col>
                    <Col> </Col>
                    <Col>
                      <Label>Type</Label>{" "}
                    </Col>
    
                    <Col>
                          {" "}
                          <Input
                            type="text"
                            value={this.state.typeContainer}
                            name=""
                            bsSize="sm"
                          >
                            
                          </Input>
                        </Col>
                    <Col> </Col>
                  </Row>
    
                  <Row style={{ marginTop: "3px" }}>
                    <Col >
                      <Label>Container no(parent)</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                      type="text"
                      value={this.state.idContainerFather}
                      name="idContainerFather"
                      bsSize="sm"
                      />
                    </Col>
                    <Col> </Col>
                    <Col>
                      <Label>Packaging ID</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                      type="text"
                      value={this.state.idPackaging}
                      name="idPackaging"
                      bsSize="sm"
                      
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "3px" }}>
                    <Col >
                      <Label>Weight(kg)</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                      type="text"
                      value={this.state.weight}
                      name="weight"
                      bsSize="sm"
                      
                      />
                    </Col>
                    <Col> </Col>
                    <Col>
                      <Label>Empty weight(kg)</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                      type="text"
                      value={this.state.weight}
                      name="weight"
                      bsSize="sm"
                      
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "3px" }}>
                    <Col >
                      <Label>Height(m)</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                      type="text"
                      value={this.state.height}
                      name="height"
                      bsSize="sm"
                      />
                    </Col>
                    <Col> </Col>
                    <Col>
                      <Label>Volume(dm3)</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input
                      type="text"
                      value={this.state.idPrepOrder}
                      name="idPrepOrder"
                      bsSize="sm"
                      readOnly
                      />
                    </Col>
                    <Col> </Col>
                  </Row>
                </div>          
            <div>
                
                <div>
                  <hr/>
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>*CONTAINERS</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Container no:</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                      type="text"
                      value={this.state.idContainerSH}
                      name="idContainerSH"
                      bsSize="sm"
                      
                      />
                    </Col>
    
                    <Col> </Col>
                    <Col>
                      
                    </Col>
    
                    <Col>
                      {" "}
                     
                    </Col>
    
                    <Col> </Col>
                    </Row>
                 
                </div> <br/>           
            </div>

            <div>
            <hr/>
                <div>
                  <br />
                  <div style={{
                     marginTop: "-20px"
                    }}> <label><input type="checkbox"></input>&nbsp; <b>Active</b></label></div>

                   <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>*DESCRIPTION</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Status</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                      type="text"
                      value={this.state.statusSh}
                      name="statusSh"
                      bsSize="sm"
                      />
                    </Col>
    
                    <Col> </Col>
                    <Col>
                      <Label>History</Label>{" "}
                    </Col>
                    
                    <Col>
                      {" "}
                      <Input 
                      type="text"
                      value={this.state.idPrepOrder}
                      name="idPrepOrder"
                      bsSize="sm"
                      />
                    </Col>
                    <Col> </Col>
                  </Row>
    
                  <Row style={{ marginTop: "3px" }}>
                  <Col>
                      <Label>Trailer type</Label>{" "}
                    </Col>
    
                    <Col>
                          {" "}
                          <Input
                            type="text"
                            value={this.state.trailerType}
                            name="trailerType"
                            bsSize="sm"
                          >                            
                          </Input>
                        </Col>
                    <Col> </Col>
                    <Col>
                      <Label>Trailer identification</Label>{" "}
                    </Col>
    
                    <Col>
                          {" "}
                          <Input
                            type="text"
                            value={this.state.trailerIdentification}
                            name="trailerIdentification"
                            bsSize="sm"
                          >
                            
                          </Input>
                        </Col>
                    <Col> </Col>
                  </Row>
    
                  <Row style={{ marginTop: "3px" }}>
                    <Col >
                      <Label>SAP id</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                     type="text"
                     value={this.state.sapId}
                     name="sapId"
                     bsSize="sm" 
                      
                      />
                    </Col>
                    <Col> </Col>
                    <Col>
                      <Label>Driver name</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                      type="text"
                      value={this.state.driverName}
                      name="driverName"
                      bsSize="sm"
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "3px" }}>
                    <Col >
                      <Label>Recording gate</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input
                        type="text"
                        value={this.state.idRecordingGate}
                        name="idRecordingGate"
                        bsSize="sm"
                      >
                        <option>Gate Entrance 1</option>
                        {/* <option></option>
                        <option></option>
                        <option></option>
                        <option></option> */}
                      </Input>
                    </Col>
                    <Col> </Col>
                    <Col>
                      <Label>RFID tag</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                      type="text"
                      value={this.state.rfidTag}
                      name="rfidTag"
                      bsSize="sm"
                      />
                    </Col>
                    <Col> </Col>
                  </Row>

                  <Row style={{ marginTop: "3px" }}>
                    <Col >
                      <Label>Gate</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                      type="text"
                      value={this.state.idGateLoaded}
                      name="idGateLoaded"
                      bsSize="sm"
                      />
                    </Col>
                    <Col> </Col>
                    <Col>
                      <Label>Trailer number</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                      type="text"
                      value={this.state.trailerNumber}
                      name="trailerNumber"
                      bsSize="sm"
                      />
                    </Col>
                    <Col> </Col>
                  </Row>
                  <Row style={{ marginTop: "3px" }}>
                    <Col >
                      <Label>Weighing status</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input 
                      type="text"
                      value={this.state.statusWeighing}
                      name="statusWeighing"
                      bsSize="sm"
                      />
                    </Col>
                    <Col> </Col>
                    <Col>
                      {/* <Label>Trailer number</Label>{" "} */}
                    </Col>
    
                    <Col>
                      {" "}
                      {/* <Input bsSize="sm"/> */}
                    </Col>
                    <Col> </Col>
                  </Row>
    
                 
                </div>           
                
            </div>

            <div>
            <hr/>
                   <div>
                   <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>*DATES</b>
                  </div>
                 <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Incoming date</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input 
                  type="text"
                  value={this.state.incomingDate}
                  name="incomingDate"
                  bsSize="sm"
                  type="date" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Outgoing date</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input 
                  type="text"
                  value={this.state.outgoingDate}
                  name="outgoingDate"
                  bsSize="sm"
                  
                  type="date"/>
                </Col>
                <Col> </Col>
              </Row>

              </div>  
              </div>
             
              <div>
                <hr/>                 
                  <Button>Containers</Button>
                  <Button style={{marginLeft:"10px"}}>Shipping</Button>
              </div><br/>  

               </Container>
          </React.Fragment>
        );
    }
}

export default TrailersEdit;