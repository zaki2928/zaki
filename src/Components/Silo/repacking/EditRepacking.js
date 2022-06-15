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
import { IoIosArchive, IoIosRadioButtonOff, IoIosRefresh, IoIosRewind, IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { MdFastForward, MdFormatListBulleted, MdLightbulbOutline } from "react-icons/md";
import { FaRegDotCircle } from "react-icons/fa";
import {remover, SiloLoadingEditdata} from "../../../store/Store";
import Swal from "sweetalert2";
import axios from "axios";
import {
  RepackingEditHandler,
  RepackingEditdata,
  Displaylistdata,
  RepackingDisplaylineHandler,
} from "../../../store/Store";
import { properties } from "../../../Properties/Properties";

const editRePackingLineSICL = properties.Port + properties.editRePackingLineSICL

 class EditRepacking extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data:[],
       idRepackingLine: "", 
       mDate: "", 
       musername: "", 
       versionLock: "",
			 batch: "", 
       characUse: "", 
       feat1: "", 
       feat2: "", 
       feat3: "", 
       sellByDate: "",
			 useByDate: "", 
       commentary: "", 
       bagNumber: "", 
       counterBag: "", 
       counterError: "",
			 counterFracture: "", 
       counterMet: "", 
       counterUnweight: "", 
       endBatch: "", 
       startBatch: "",
			 endProductionDate: "", 
       expectedDeliveryDate: "", 
       idContentStatus: "", 
       idFolderLine: "",
			 idMfLocation: "", 
       nbPalletToCreate: "", 
       orderDate: "", 
       idPackingLine: "", 
       qtyRepacked: "",
			 qtyToRepack: "", 
       qtyToTreat: "", 
       qtyTreated: "", 
       idReferenceFrom: "", 
       idReferenceTo: "",
			 rejectionStatus: "", 
       siloNumberL3: "", 
       startProductionDate: "", 
       statusRepackingLine: "",
			 typeReception: "", 
       typeTreatment: "", 
       idRepacking: "", 
       idDestinationWarehouse: "",
			 idEligibiltyWarehouse: "", 
       idPackaging: "", 
       toName: "", 
       idCompany: "", 
       idFolder: "",
			 idSite: "", 
       statusRepacking: "", 
       cleanUpNumber: "", 
       cleanUpStatus: "",
    
    };
  }


  

componentDidMount(){
  console.log("calling Repacking Edit edit", RepackingEditdata);
  console.log("calling edit data length", this.state.data.length);
  console.log("calling edit datttaaaaaaaaaaaaa&&&&&&aaaa", this.props.data2);
  console.log("calling edit ", RepackingEditdata);

  if (RepackingEditdata !== null) {
    this.setState(
      {
        data: RepackingEditdata,
      },
      () => {
        console.log("data present after tab switch", this.state.data);
        this.setState({
         
          idRepackingLine: RepackingEditdata.idRepackingLine, 
          mDate: RepackingEditdata.mDate, 
          musername: RepackingEditdata.musername, 
          versionLock: RepackingEditdata.versionLock,
          batch: RepackingEditdata.batch,
          characUse: RepackingEditdata.characUse, 
          feat1: RepackingEditdata.feat1, 
          feat2:RepackingEditdata.feat2, 
          feat3: RepackingEditdata.feat3, 
          sellByDate: RepackingEditdata.sellByDate,
          useByDate: RepackingEditdata.useByDate, 
          commentary: RepackingEditdata.commentary, 
          bagNumber: RepackingEditdata.bagNumber, 
          counterBag:RepackingEditdata.counterBag, 
          counterError: RepackingEditdata.counterError,
          counterFracture: RepackingEditdata.counterFracture, 
          counterMet: RepackingEditdata.counterMet, 
          counterUnweight: RepackingEditdata.counterUnweight, 
          endBatch: RepackingEditdata.endBatch, 
          startBatch: RepackingEditdata.startBatch,
          endProductionDate: RepackingEditdata.endProductionDate, 
          expectedDeliveryDate: RepackingEditdata.expectedDeliveryDate, 
          idContentStatus: RepackingEditdata.idContentStatus, 
          idFolderLine: RepackingEditdata.idFolderLine,
          idMfLocation: RepackingEditdata.idMfLocation, 
          nbPalletToCreate: RepackingEditdata.nbPalletToCreate, 
          orderDate:RepackingEditdata.orderDate, 
          idPackingLine: RepackingEditdata.idPackingLine, 
          qtyRepacked: RepackingEditdata.qtyRepacked,
          qtyToRepack: RepackingEditdata.qtyToRepack, 
          qtyToTreat: RepackingEditdata.qtyToTreat, 
          qtyTreated: RepackingEditdata.qtyTreated, 
          idReferenceFrom: RepackingEditdata.idReferenceFrom, 
          idReferenceTo: RepackingEditdata.idReferenceTo,
          rejectionStatus: RepackingEditdata.rejectionStatus, 
          siloNumberL3: RepackingEditdata.siloNumberL3, 
          startProductionDate: RepackingEditdata.startProductionDate, 
          statusRepackingLine: RepackingEditdata.statusRepackingLine,
          typeReception: RepackingEditdata.typeReception, 
          typeTreatment: RepackingEditdata.typeTreatment, 
          idRepacking: RepackingEditdata.idRepacking, 
          idDestinationWarehouse: RepackingEditdata.idDestinationWarehouse,
          idEligibiltyWarehouse: RepackingEditdata.idEligibiltyWarehouse, 
          idPackaging: RepackingEditdata.idPackaging, 
          toName: RepackingEditdata.toName, 
          idCompany: RepackingEditdata.idCompany, 
          idFolder: RepackingEditdata.idFolder,
          idSite: RepackingEditdata.idSite, 
          statusRepacking: RepackingEditdata.statusRepacking, 
          cleanUpNumber: RepackingEditdata.cleanUpNumber, 
          cleanUpStatus: RepackingEditdata.cleanUpStatus,
       
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

SubmitHandler = () => {
  console.log("Data which we are ending with s", this.state);
  axios
    .post(editRePackingLineSICL, this.state)
    // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
    .then((response) => {
      if (response.status === 200) {
        console.log("resposne success", response.data);
        this.setState({
          message: "Data Saved Successfully",
        });

        // ProductHandler(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};



















backHandler=()=>{
  console.log("calling back handler for Repacking list")
  remover("Repacking Edit Data")
  this.props.editClosehandler()
}

  render() {


    const columns = [
      {
        Header: "idCompany",
        accessor: "idCompany",
      },
      {
        Header: "idFolder",
        accessor: "idFolder",
      },
      {
        Header: "statusRepackingLine",
        accessor: "statusRepackingLine",
      },
     
     
    ];





    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          // style={{ border: "1px solid black", marginLeft: "14px" }}
        >
          
            <div>
              <IoArrowBackCircleSharp onClick={this.backHandler} />
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
                &#60;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Repackings Search</a>
                  </b>
                </u>
                &#60;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a onClick={this.backHandler}>Repackings</a>
                  </b>
                </u>
                &#60;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Repacking edition</a>
                  </b>
                </u>
              </span>
              <br />
              <Row>
                  <Col></Col>
              <Col></Col>
              <Col></Col>
             
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <span><IoIosSkipBackward/><u><b>prev record</b></u></span>
              <span style={{marginLeft:"8px"
            }}><IoIosSkipForward/><u><b>next record</b></u></span>
            <span 
              
              style={{
            marginLeft:"8px"
          }}
              
              ><IoIosRefresh/><u><b>Refresh</b></u></span>
              
             <Col></Col>             

              </Row>
            
            
              <div
                style={{
                  border: "1px",
                  border: "1px solid black",
                  marginTop:"20px",
                  backgroundColor: "grey",
                  
                }}
              >


                  
                <IoIosArchive/> 

                <b style={{ marginLeft: "5px" }}
                 
                >Description</b>
               
              </div>
              <div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Company</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.idCompany} />
                    
                </Col>
                <Col>
                  {" "}
                  
                    
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Folder ID</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.idFolder} />
            
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>
             
              <Row style={{marginTop:"5px"}}>
                <Col>
                <Label>Status</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.statusRepackingLine} >
                  {this.state.statusRepackingLine === 1000 ? this.setState({statusRepackingLine:"Closed"}) : 
                  this.state.statusRepackingLine === 200 ? this.setState({statusRepackingLine:"In coherent"}) :
                this.state.statusRepackingLine === 100 ? this.setState({statusRepackingLine:"Created"}) : 
                this.state.statusRepackingLine === 400 ? this.setState({statusRepackingLine:"In progress"}) :
                this.state.statusRepackingLine === 1100 ? this.setState({statusRepackingLine:"Closed & Rejected"}) : null}
                  </Input>
            
                </Col>
                <Col>
                  {" "}
                  
                </Col>

                <Col></Col>
                <Col>
                  
                </Col>
                <Col>
                  {" "}
                 
                   
                </Col>
                <Col>
                  {" "}
                </Col>
                <Col> </Col>
              </Row>
              
             

              <div  style={{
                  border: "1px",
                  border: "1px solid lightblue",
                  marginTop:"15px",
                  backgroundColor: "#0080ff"
                }}>
                    
                </div>
              
              </div>

              <div
              
          
              
              >
          
             
              <br />
              </div>


            </div>
          
        </Container>
      </React.Fragment>
    );
  }
}

export default EditRepacking;