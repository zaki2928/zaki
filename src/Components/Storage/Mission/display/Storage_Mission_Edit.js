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
import Storage_Mission_List from "../display/Storage_Mission_List";
import "react-table-v6/react-table.css";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { remover,StorageMissionEditdata } from "../../../../store/Store";
import ReactTable from "react-table-v6";

export default class Storage_Mission_Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packinglinefilter: false,

      data: [],
     
           idMission: "",
           idResaContainer: "",
           idResaContent: "",
           missionIndex: "",
          missionMode: "",
          numMission: "",
           priority: "",
           typeMvt: "",
           useUnmarkedContainer: "",
           printable: "",
           statusMission: "",
           typeContainer: "",
           typeContainerChoice: "",
           typeDestinationChoice: "",
           mDate: "",
           creationDate: "",
           executionDate: "",
          startingDate: "",
          mUsername: "",
           userTreatLogin: "",
          idLocationStkDisplay: "",
           idLocationStk: "",
          idWarehouseFrom: "",
          idWarehouseTo: "",
          versionLock: "",
          allocationCell: "",
           typeCell: "",
           useLocation: "",
           idRegion: "",
           idRegionCell: "",
           idLocation: "",
          descIndex: "",
          height: "",
          length: "",
          width: "",
          idReservation: "",
           idMovement: "",
          missionClass: "",
          statusProgress: "",
          commentaryIc: "",
          cUsernameIc: "",
          wsNameIc: "",
          reference: "",
          idContainerStk: "",
          cDateIc: "",
          batch:"",
          typeContainerChoice:"",
           
    };
  }

  backHandler=()=>{
    console.log("calling back handler for list")
    remover("Storage_Mission_Edit")
    this.props.editClosehandler()
  }

  componentDidMount(){
    console.log("calling Repacking Edit edit", StorageMissionEditdata);
    console.log("calling edit data length", this.state.data.length);
    console.log("calling edit datttaaaaaaaaaaaaa&&&&&&aaaa", this.props.missionEditArray);
    console.log("calling edit ", StorageMissionEditdata);
  
    if (StorageMissionEditdata !== null) {
      this.setState(
        {
          data: StorageMissionEditdata,
        },
        () => {
          console.log("data present after tab switch", this.state.data);
          this.setState({
           
            idMission: StorageMissionEditdata.idMission,
            idResaContainer: StorageMissionEditdata.idResaContainer,
            idResaContent: StorageMissionEditdata.idResaContent,
            missionIndex: StorageMissionEditdata.missionIndex,
           missionMode: StorageMissionEditdata.missionMode,
           numMission: StorageMissionEditdata.numMission,
            priority: StorageMissionEditdata.priority,
            typeMvt: StorageMissionEditdata.typeMvt,
            useUnmarkedContainer: StorageMissionEditdata.useUnmarkedContainer,
            printable: StorageMissionEditdata.printable,
            statusMission: StorageMissionEditdata.statusMission,
            typeContainer: StorageMissionEditdata.typeContainer,
            typeContainerChoice: StorageMissionEditdata.typeContainerChoice,
            typeDestinationChoice: StorageMissionEditdata.typeDestinationChoice,
            mDate: StorageMissionEditdata.mDate,
            creationDate: StorageMissionEditdata.creationDate,
            executionDate: StorageMissionEditdata.executionDate,
           startingDate: StorageMissionEditdata.startingDate,
           mUsername: StorageMissionEditdata.mUsername,
            userTreatLogin: StorageMissionEditdata.userTreatLogin,
           idLocationStkDisplay: StorageMissionEditdata.idLocationStkDisplay,
            idLocationStk: StorageMissionEditdata.idLocationStk,
           idWarehouseFrom: StorageMissionEditdata.idWarehouseFrom,
           idWarehouseTo: StorageMissionEditdata.idWarehouseTo,
           versionLock: StorageMissionEditdata.versionLock,
           allocationCell: StorageMissionEditdata.allocationCell,
            typeCell: StorageMissionEditdata.typeCell,
            useLocation: StorageMissionEditdata.useLocation,
            idRegion: StorageMissionEditdata.idRegion,
            idRegionCell: StorageMissionEditdata.idRegionCell,
            idLocation: StorageMissionEditdata.idLocation,
           descIndex: StorageMissionEditdata.descIndex,
           height: StorageMissionEditdata.height,
           length: StorageMissionEditdata.length,
           width: StorageMissionEditdata.width,
           idReservation: StorageMissionEditdata.idReservation,
            idMovement: StorageMissionEditdata.idMovement,
           missionClass: StorageMissionEditdata.missionClass,
           statusProgress: StorageMissionEditdata.statusProgress,
           commentaryIc: StorageMissionEditdata.commentaryIc,
           cUsernameIc: StorageMissionEditdata.cUsernameIc,
           wsNameIc: StorageMissionEditdata.wsNameIc,
           reference: StorageMissionEditdata.reference,
           idContainerStk: StorageMissionEditdata.idContainerStk,
           cDateIc: StorageMissionEditdata.cDateIc,
           batch:StorageMissionEditdata.batch,
           typeContainerChoice:StorageMissionEditdata.typeContainerChoice,

           idProduct: StorageMissionEditdata.idProduct,
           description:StorageMissionEditdata.description,
           zIMC:StorageMissionEditdata.zIMC,
           zGrade:StorageMissionEditdata.zGrade,
           pcreationDate:StorageMissionEditdata.pcreationDate,
          });
        }
      );
    }
  }
  

  render() {
    
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
            {
              this.state.packinglinefilter===true?(
                <Storage_Mission_List />
              ) : (
                
              
            
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
                    <a>Mission Search</a>
                  </b>
                </u>{""}
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a onClick={this.backHandler}>Mission Display</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Mission Edition</a>
                  </b>
                </u>
              </span>
              <br />
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>*Description</b>
              </div>
              
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Mission No</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.idMission} />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Index</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.missionIndex} />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Mode</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.missionMode} />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Movement Type</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.typeMvt}/>
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Container Choice Type</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.typeContainerChoice} />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Mission Class</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.missionClass}/>
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Status</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.statusMission} />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Priority</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.priority}/>
                </Col>
                <Col> </Col>
              </Row>

              

                            
            </div>            
              )}
          {/* {this.state.silolist === true ? (
            <SiloRepackingList />
          ) : } */}
        </Container>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
            {
              this.state.packinglinefilter===true?(
                <Storage_Mission_List />
              ) : (           
            <div>
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>*Containers</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Containers Origin</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.idContainerStk} />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Origin Location</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.idLocation.replace("19@","")}/>
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Origin Warehouse</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.idWarehouseFrom}/>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Destination Location</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.idLocationStkDisplay.replace("19@","")} />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Destination Warehouse</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm"  value={this.state.idWarehouseTo}/>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col> </Col>
               
                
              </Row>

              

            </div>       
              )}
          
        </Container>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
            {
              this.state.packinglinefilter===true?(
                <Storage_Mission_List />
              ) : (           
            <div>
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>*Details</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Product</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm"  value={this.state.idProduct}/>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Product Description</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm"  value={this.state.description}/>
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Intermediate Material Code</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm"  value={this.state.zIMC}/>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Grade</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm"  value={this.state.zGrade}/>
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>User Treat</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm"  value={this.state.idWarehouseTo}/>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Creation Date</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm"  value={this.state.pcreationDate}/>
                </Col>
                <Col> </Col>
              </Row>

              

            </div>       
              )}
          
        </Container>
      </React.Fragment>
    )
  }
}
