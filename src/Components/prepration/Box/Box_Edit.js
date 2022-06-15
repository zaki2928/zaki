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
import Box_List from "../Box/Box_List";
import { BoxData,prepration_boxEditData, BoxOrderHandler, remover,BoxEditdata } from "../../../store/Store";
import axios from "axios";

export default class Box_Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: "",
      boxorderEdit:false,
      boxList: false,
      data: [],
      containerNumPo: "",
      idContainer: "",
      idContainerPRP: "",
      idPackaging: "",
      idPo: "",
      idPrepOrder: "",
      idPrepOrderCustomer: "",
      idPrepOrderL3: "",
      idwarehousePRP: "",
      listFilterBean:[],
      attribute:null,
      operation:"=",
      value:null,
      mDate: "",
      musername: "",
      plfLink: "",
      plfObd1: "",
      prepMode: "",
      statusPo: "",
      statusPrep: "",
      statusShip: "",
      typeAlgo: "",
      typePo: "",
      typePoStuffing: "",
      versionLock: "",
      volume: "",
      warehousePreparationIds: ""
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
    console.log("calling edit uzmaaaaaaa  for edddddittttt  datatattatatt", prepration_boxEditData)
    this.setState({
      idContainer: prepration_boxEditData.idContainer,
      containerNumPo: prepration_boxEditData.containerNumPo,
      idContainerPRP: prepration_boxEditData.idContainerPRP,
      idPackaging: prepration_boxEditData.idPackaging,
      idPo: prepration_boxEditData.idPo ,
      idPrepOrder:prepration_boxEditData.idPrepOrder,
      idPrepOrderCustomer :prepration_boxEditData.idPrepOrderCustomer,
      idPrepOrderL3:prepration_boxEditData.idPrepOrderL3,
      idwarehousePRP:prepration_boxEditData.idwarehousePRP,
      mDate:prepration_boxEditData.mDate,
      musername:prepration_boxEditData.musername,
      plfLink:prepration_boxEditData.plfLink,
      plfObd1:prepration_boxEditData.plfObd1,
      prepMode:prepration_boxEditData.prepMode,
      statusPo:prepration_boxEditData.statusPo,
      statusPrep:prepration_boxEditData.statusPrep,
      statusShip:prepration_boxEditData.statusShip,
      typeAlgo:prepration_boxEditData.typeAlgo,
      typePo:prepration_boxEditData.typePo,
      typePoStuffing:prepration_boxEditData.typePoStuffing,
      versionLock:prepration_boxEditData.versionLock,
      volume:prepration_boxEditData.volume,
      warehousePreparationIds:prepration_boxEditData.warehousePreparationIds,
      idLocation:prepration_boxEditData.idLocation,
      weight:prepration_boxEditData.weight,
      emptyWeight:prepration_boxEditData.emptyWeight,
      height:prepration_boxEditData.height,
      idWave:prepration_boxEditData.idWave,

      
    })
  }

  Backhandler = () => {
    console.log("uzzzzzzzzzzz    Handler calling");
    remover("Box_Edit");
    this.props.EditCloseHandler();
  };
  render() {
    return (
      <React.Fragment>
        <Container className="themed-container" fluid={true}>
          
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
                  <a>Boxes search</a>
                </b>
              </u>{" "}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a>Boxes Management</a>
                </b>
              </u>{" "}

            </span>
            <br />
            <div>

            <div
                style={{
                  border: "1px",
                  // backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop : "10px"
                }}
              >
                <b style={{ marginLeft: "5px" }}> &#62; &#62;{" "}General</b>
              </div>
             
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop : "3px"
                }}
              >
                <b style={{ marginLeft: "5px" }}>status</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Container No</Label>
                </Col>

                <Col>
                
                  <Input
                   type="text"
                   value={this.state.idContainer}
                   name="idContainer"
                   bsSize="sm"
                 />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Location</Label>
                </Col>
                
                <Col>
                  
                  <Input  
                   type="text"
                   value={this.state.idLocation}
                   name="idLocation"
                   bsSize="sm" />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>status</Label>
                </Col>
                
                <Col>
                  
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Type</Label>
                </Col>

                <Col>
                
                  <Input 
                    type="text"
                    value={this.state.typePo}
                    name="typePo"
                    bsSize="sm"
                  >
                   {this.state.typePo === "100" ?this.setState({typePo:"_Standard_"}) : 
                 

                   null}
                    </Input>

                </Col>

                <Col> </Col>
                <Col>
                  <Label>Company No (Parent)</Label>
                </Col>
                
                <Col>
                  
                  <Input 
                   type="text"
                   value={this.state.idContainerPRP}
                   name="idContainerPRP"
                   bsSize="sm"
                  
                  
                  
                  />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Pacakaging Id</Label>
                </Col>
                
                <Col>
                  
                  <Input 
                  
                  type="text"
                   value={this.state.idPackaging}
                   name="idPackaging"
                   bsSize="sm"
                  />
                </Col>
                <Col> </Col>
                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>weight(kg)</Label>
                </Col>

                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.weight}
                  name="weight"
                  bsSize="sm"
                  
                  />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>empty Weight (Kg)</Label>
                </Col>
                
                <Col>
                  
                  <Input 
                  type="text"
                  value={this.state.emptWeight}
                  name="emptyWeight"
                  bsSize="sm"
                  
                  
                  />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Height(m)</Label>
                </Col>
                
                <Col>
                  
                  <Input 
                  type="text"
                  value={this.state.height}
                  name="height"
                  bsSize="sm"
                  
                  
                  />
                </Col>
                <Col> </Col>
                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>volume (dm3)</Label>
                </Col>

                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.volume}
                  name="volume"
                  bsSize="sm"
                  
                  />
                </Col>

                <Col> </Col>
            
                <Col> </Col>
                
              </Row>

                    
            </div>           
            
           
          
             <hr/>
              
              
                 <div>
              <hr/>
              <div>
            <input type="checkbox" id="myid"></input>
            {" "}
              <a href="#" >Active </a>{" "}
              <a style={{marginLeft : "15px"}}> &#62; &#62;Preparation </a>{" "}

              </div>
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop : "10px"
                }}
              >
                
              </div>
                {/* <b style={{ marginLeft: "5px" }}>preparation</b> */}
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Preparation Alghorithm</Label>
                </Col>

                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.typeAlgo}
                  name="typeAlgo"
                  bsSize="sm"
                  
                  >
                   {this.state.typeAlgo === "400" ?this.setState({typeAlgo:"Pallet Box"}) : 

                  null
              }
              </Input>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>History</Label>
                </Col>
                
                <Col>
                  
                  <Input 
                  type="text"
                  value={this.state.history}
                  name="history"
                  bsSize="sm"
                  
                  />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Preparation status</Label>
                </Col>
                
                <Col>
                  
                  <Input 
                  type="text"
                  value={this.state.statusPrep}
                  name="statusPrep"
                  bsSize="sm"
                  
                  >
                 {this.state.statusPrep === "" ?this.setState({statusPrep:"_creation In pogress_"}) : 
                  this.state.statusPrep ===100 ?this.setState({statusPrep:"Created"}): 
                  this.state.statusPrep ==="" ?this.setState({statusPrep:"validated"}):
                  this.state.statusPrep ===5000 ?this.setState({statusPrep:"_Destroyed_"}):

                   null}
                  </Input>
                </Col>
                <Col> </Col>
                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Shipping status</Label>
                </Col>

                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.statusShip}
                  name="statusShip"
                  bsSize="sm"
                  
                  >
                    {this.state.statusShip === -1 ?this.setState({statusShip:"_Not Relevant_"}) : 
                  this.state.statusShip ===100 ?this.setState({statusShip:"Created"}): 
                  this.state.statusShip ===390 ?this.setState({statusShip:"_Awaiting Stock To preparae_"}):
                  this.state.statusShip ===355 ?this.setState({statusShip:"_Error"}):
                  this.state.statusShip ===370 ?this.setState({statusShip:"_pre Calculated_"}):
                  this.state.statusShip ===380 ?this.setState({statusShip:"_Calculated_"}):
                  this.state.statusShip ===400 ?this.setState({statusShip:"_Awaiting preparation_"}):
                  this.state.statusShip ===424 ?this.setState({statusShip:"_In InPreparation_"}):
                  this.state.statusShip ===500 ?this.setState({statusShip:"_Prepared_"}):
                  this.state.statusShip ===4000 ?this.setState({statusShip:"_Cancelled_"}):
                  this.state.statusShip ===4500 ?this.setState({statusShip:"_Deleted_"}):
                   null}
                  </Input>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>wave id</Label>
                </Col>
                
                <Col>
                  
                  <Input 
                  type="text"
                  value={this.state.idWave}
                  name="idWave"
                  bsSize="sm"
                  
                  
                  />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Preparation Order Id</Label>
                </Col>
                
                <Col>
                  
                  <Input 
                  
                  type="text"
                   value={this.state.idPrepOrder}
                   name="idPrepOrder"
                   bsSize="sm"
                  
                  />
                </Col>
                <Col> </Col>
                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Preparation  Order  customer Id</Label>
                </Col>

                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.idPrepOrderCustomer}
                  name="idPrepOrderCustomer"
                  bsSize="sm"
                  
                  
                  />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Preparation Order L3 Id</Label>
                </Col>
                
                <Col>
                  
                  <Input 
                  
                  type="text"
                   value={this.state.idPrepOrderL3}
                   name="idPrepOrderL3"
                   bsSize="sm"
                  
                  />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Preparation Order Status</Label>
                </Col>
                
                <Col>
                  
                  <Input 
                  type="text"
                  value={this.state.statusPo}
                  name="statusPo"
                  bsSize="sm"
                  
                  >
                    {this.state.statusPo ===500 ?this.setState({statusPo:"_Prepared_"}) : 
                  this.state.statusPo ===100 ?this.setState({statusPo:"Created"}): 
                  this.state.statusPo ===355 ?this.setState({statusPo:"_Error_"}):
                  this.state.statusPo ===350 ?this.setState({statusPo:"_Launchable_"}):
                  this.state.statusPo ===370 ?this.setState({statusPo:"_pre Calculated_"}):
                  this.state.statusPo ===380 ?this.setState({statusPo:"_Calculated_"}):
                  this.state.statusPo ===400 ?this.setState({statusPo:"_Launched_"}):
                  this.state.statusPo ===424 ?this.setState({statusPo:"_In InPreparation_"}):
                  this.state.statusPo ===500 ?this.setState({statusPo:"_Prepared_"}):
                  this.state.statusPo ===4000 ?this.setState({statusPo:"_Cancelled_"}):
                  this.state.statusPo ===360 ?this.setState({statusPo:"_Selected_"}):
                   null
                  }
                  </Input>
                </Col>
                <Col> </Col>
                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Preparation Order Type</Label>
                </Col>

                <Col>
                
                  <Input 
                  type="text"
                  value={this.state.typePo}
                  name="typePo"
                  bsSize="sm"

                  >
                    {this.state.typePo ===100 ?this.setState({typePo:"_Standard_"}) : 
                  // this.state.typePo ===100 ?this.setState({statusPo:"Created"}): 
                  // this.state.statusPo ===355 ?this.setState({statusPo:"_Error_"}):
                  // this.state.statusPo ===350 ?this.setState({statusPo:"_Launchable_"}):
                  // this.state.statusPo ===370 ?this.setState({statusPo:"_pre Calculated_"}):
                  // this.state.statusPo ===380 ?this.setState({statusPo:"_Calculated_"}):
                  // this.state.statusPo ===400 ?this.setState({statusPo:"_Launched_"}):
                  // this.state.statusPo ===424 ?this.setState({statusPo:"_In InPreparation_"}):
                  // this.state.statusPo ===500 ?this.setState({statusPo:"_Prepared_"}):
                  // this.state.statusPo ===4000 ?this.setState({statusPo:"_Cancelled_"}):
                  // this.state.statusPo ===360 ?this.setState({statusPo:"_Selected_"}):
                   null
                  }
                  </Input>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>customer No In Po</Label>
                </Col>
                
                <Col>
                  
                  <Input 
                  type="text"
                  value={this.state.containerNumPo}
                  name="containerNumPo"
                  bsSize="sm"
                  
                  />
                </Col>
                <Col> </Col>


                <Col> </Col>
                
              
                <Col> </Col>
                
              </Row>
               
           
                <Col> </Col>
                
  
        </Container>
       
      </React.Fragment>
        );
    }
}
