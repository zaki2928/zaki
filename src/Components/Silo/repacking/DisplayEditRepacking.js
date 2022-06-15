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
import {FaSave} from "react-icons/fa";
import { IoIosArchive, IoIosRadioButtonOff, IoIosRefresh, IoIosRewind, IoIosSkipBackward, IoIosSkipForward } from "react-icons/io";
import { MdFastForward, MdFormatListBulleted, MdLightbulbOutline } from "react-icons/md";
import { FaRegDotCircle } from "react-icons/fa";
import {remover, SiloLoadingEditdata} from "../../../store/Store";
import Swal from "sweetalert2";
import axios from "axios";
import {
  RepackingEditHandler,
  Displaylistdata,
  RepackingDisplaylineHandler,
  DisplayEditRepackinglineHandler,
  displayeditrepacking,
} from "../../../store/Store";
import { properties } from "../../../Properties/Properties";

const getListOfAllWarehouse = properties.Port + properties.getListOfAllWarehouse
const getWarehouseById= properties.Port + properties.getListOfWarehouseById
const getListOfPackagingKL=properties.Port+ properties.getListOfPackagingKL
const getPackingLineByMaterialType=properties.Port+ properties.getPackingLineByMaterialType
const getListOfSiloByMaterialType=properties.Port+ properties.getListOfSiloByMaterialType
const getListofPackagingforContainercreation =
  properties.Port + properties.getListofPackagingforContainercreation;
const editRePackingLineSICL= properties.Port+properties.editRePackingLineSICL;
 class DisplayEditRepacking extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data:[],
      warehouseDate:[],
      siloData:[],
      packagingData:[],
      packingLineData:[],
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
       contentStatus:"",
       msg:"",
    };
  }

getListOfWarehouse=()=>{
  axios.get(getListOfAllWarehouse)
  .then((response)=>{
    console.log("--------------",response.data)
    if((response.status===200)&&(response.data.length!==0))
    {
      this.setState({
        warehouseDate: response.data
      })
    }
    else{
      this.setState({
        warehouseDate: [],
      })
    }
  })
}

getListOfSilo=()=>{
  const materialType=displayeditrepacking.idPackaging.substring(0,displayeditrepacking.idPackaging.lastIndexOf('P'))
  console.log("=============",materialType)
  axios.post(getListOfSiloByMaterialType+materialType)
  .then((response)=>{
    if((response.status===200)&&(response.data.length!==0))
    {
      console.log("--------------",response.data)
      this.setState({
        siloData: response.data
      })
    }
    else{
      this.setState({
        siloData: [],
      })
    }
  })
  .catch((error)=>{
    console.log(error)
  })
}

getListOfPackagingId=()=>{
  axios.get(getListOfPackagingKL)
  .then((response)=>{
    console.log("--------------",response.data)
    if((response.status===200)&&(response.data.length!==0))
    {
      this.setState({
        packagingData: response.data
      })
    }
    else{
      this.setState({
        warehouseDate: [],
      })
    }
  })
}
getlistofPackaging = () => {
  console.log("get list of packaging calling by shahid");

  axios
    .post(getListofPackagingforContainercreation + displayeditrepacking.idReferenceTo)

    .then((response) => {
      if (response.status === 200 && response.data.length !== 0) {
        console.log("resposne success getlistofPackaging =>", response.data);
        this.setState({
          packagingData: response.data,
          
        });
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        error: "Invalid product",
        packagingData: [],
        
      });
    });
};

getWarehousebyId=()=>{
  axios.post(getWarehouseById+displayeditrepacking.idDestinationWarehouse)
  .then((response)=>{
    console.log("--------------",response.data)
    if((response.status===200)&&(response.data.length!==0))
    {
      this.setState({
        idDestinationWarehouse: response.data.description
      })
    }
    else{
      this.setState({
        idDestinationWarehouse: "",
      })
    }
  })
  .catch((error)=>{
    console.log(error)
  })
  axios.post(getWarehouseById+displayeditrepacking.idEligibilityWarehouse)
  .then((response)=>{
    if((response.status===200)&&(response.data.length!==0))
    {
      console.log("--------------",response.data)
      this.setState({
        idEligibiltyWarehouse: response.data.description
      })
    }
    else{
      this.setState({
        idEligibiltyWarehouse: "",
      })
    }
  })
  .catch((error)=>{
    console.log(error)
  })
}
getListOfPackingLineByMaterialType=()=>{
  const materialType=displayeditrepacking.idPackaging.substring(0,displayeditrepacking.idPackaging.lastIndexOf('P'))
  console.log("=============",materialType)
  axios.post(getPackingLineByMaterialType+materialType)
  .then((response)=>{
    if((response.status===200)&&(response.data.length!==0))
    {
      console.log("--------------",response.data)
      this.setState({
        packingLineData: response.data
      })
    }
    else{
      this.setState({
        packingLineData: [],
      })
    }
  })
  .catch((error)=>{
    console.log(error)
  })
}

componentDidMount(){
  console.log("calling DisplayEditRepacking", displayeditrepacking);
  console.log("calling Displayedit data length", this.state.data.length);
  console.log("calling Displayedit datttaaaaaaaaaaaaa&&&&&&aaaa", this.props.isdisplaydata);
  console.log("calling Displayedit ", displayeditrepacking);
  this.getListOfWarehouse();
  this.getListOfSilo();
  this.getlistofPackaging();
  this.getWarehousebyId();
  this.getListOfPackingLineByMaterialType();
  //this.get
  if (displayeditrepacking !== null) {
    this.setState(
      {
        data: displayeditrepacking,
      },
      () => {
        console.log("data present after tab switch", this.state.data);
        this.setState({
         
          idRepackingLine: displayeditrepacking.idRepackingLine, 
          //mDate: displayeditrepacking.mDate, 
          musername: displayeditrepacking.musername, 
          versionLock: displayeditrepacking.versionLock,
          batch: displayeditrepacking.batch,
          characUse: displayeditrepacking.characUse, 
          feat1: displayeditrepacking.feat1, 
          feat2:displayeditrepacking.feat2, 
          feat3: displayeditrepacking.feat3, 
          sellByDate: displayeditrepacking.sellByDate,
          useByDate: displayeditrepacking.useByDate, 
          commentary: displayeditrepacking.commentary, 
          bagNumber: displayeditrepacking.bagNumber, 
          counterBag:displayeditrepacking.counterBag, 
          counterError: displayeditrepacking.counterError,
          counterFracture: displayeditrepacking.counterFracture, 
          counterMet: displayeditrepacking.counterMet, 
          counterUnweight: displayeditrepacking.counterUnweight, 
          endBatch: displayeditrepacking.endBatch, 
          startBatch: displayeditrepacking.startBatch,
          endProductionDate: displayeditrepacking.endProductionDate, 
          expectedDeliveryDate: displayeditrepacking.expectedDeliveryDate, 
          idContentStatus: displayeditrepacking.idContentStatus, 
          idFolderLine: displayeditrepacking.idFolderLine,
          idMfLocation: displayeditrepacking.idMfLocation, 
          nbPalletToCreate: displayeditrepacking.nbPalletToCreate, 
          orderDate:displayeditrepacking.orderDate, 
          idPackingLine: displayeditrepacking.idPackingLine, 
          qtyRepacked: displayeditrepacking.qtyRepacked,
          qtyToRepack: displayeditrepacking.qtyToRepack, 
          qtyToTreat: displayeditrepacking.qtyToTreat, 
          qtyTreated: displayeditrepacking.qtyTreated, 
          idReferenceFrom: displayeditrepacking.idReferenceFrom, 
          idReferenceTo: displayeditrepacking.idReferenceTo,
          rejectionStatus: displayeditrepacking.rejectionStatus, 
          siloNumberL3: displayeditrepacking.siloNumberL3, 
          startProductionDate: displayeditrepacking.startProductionDate, 
          statusRepackingLine: displayeditrepacking.statusRepackingLine,
          typeReception: displayeditrepacking.typeReception, 
          typeTreatment: displayeditrepacking.typeTreatment, 
          idRepacking: displayeditrepacking.idRepacking, 
          //idDestinationWarehouse: displayeditrepacking.idDestinationWarehouse,
          //idEligibiltyWarehouse: displayeditrepacking.idEligibilityWarehouse, 
          idPackaging: displayeditrepacking.idPackaging, 
          toName: displayeditrepacking.toName, 
          idCompany: displayeditrepacking.idCompany, 
          idFolder: displayeditrepacking.idFolder,
          idSite: displayeditrepacking.idSite, 
          statusRepacking: displayeditrepacking.statusRepacking, 
          cleanUpNumber: displayeditrepacking.cleanUpNumber, 
          cleanUpStatus: displayeditrepacking.cleanUpStatus,
          contentStatus: displayeditrepacking.contentStatus,
        });
      }
    );
  }
}


updateRepackingLine=()=>{
  
  console.log("this.state======== ",this.state)
  // this.setState({
         
  //   idContentStatus: displayeditrepacking.idContentStatus, 
    
  //   rejectionStatus: displayeditrepacking.rejectionStatus, 
    
  //   statusRepackingLine: displayeditrepacking.statusRepackingLine,
  //   typeReception: displayeditrepacking.typeReception, 
  //   typeTreatment: displayeditrepacking.typeTreatment, 
    
  //   statusRepacking: displayeditrepacking.statusRepacking, 

  //   cleanUpStatus: displayeditrepacking.cleanUpStatus,
  //   contentStatus: displayeditrepacking.contentStatus,
  // },()=>console.log("this.state======== ",this.state))
   axios
    .put(editRePackingLineSICL, this.state)
  .then((response)=>{
    if(response.status===200)
    {
      this.setState({
        msg: "Data Saved Sucessfully"
      })
    }
  })
  .catch((error)=>{
    console.log(error)
    this.setState({
      msg:"Data Not Saved"
    })
  })
}


onchangehandler = (event) => {
  console.log("onchangehandler");
  this.setState({
      [event.target.name]: event.target.value,
  });
};

backHandler=()=>{
  console.log("calling back handler for DisplayRepackingEdit list")
  remover("DisplayEditRepacking")
  this.props.DisplayLineCloseHandler()
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
        Header: "idRepackingLine",
        accessor: "idRepackingLine",
      },
      {
        Header: "mDate",
        accessor: "mDate",
      },
      {
        Header: "musername",
        accessor: "musername",
      },
      {
        Header: "versionLock",
        accessor: "versionLock",
      },
      {
        Header: "batch",
        accessor: "batch",
      },
      {
        Header: "characUse",
        accessor: "characUse",
      },
      {
        Header: "statusRepackingLine",
        accessor: "statusRepackingLine",
      },
      {
        Header: "feat1",
        accessor: "feat1",
      },
      {
        Header: "feat2",
        accessor: "feat2",
      },
      {
        Header: "feat3",
        accessor: "feat3",
      },
      {
        Header: "sellByDate",
        accessor: "sellByDate",
      },
      {
        Header: "useByDate",
        accessor: "useByDate",
      },
      {
        Header: "commentary",
        accessor: "commentary",
      },
      {
        Header: "bagNumber",
        accessor: "bagNumber",
      },
      {
        Header: "counterBag",
        accessor: "counterBag",
      },
      {
        Header: "counterError",
        accessor: "counterError",
      },
      {
        Header: "counterFracture",
        accessor: "counterFracture",
      },
      {
        Header: "counterMet",
        accessor: "counterMet",
      },
      {
        Header: "counterUnweight",
        accessor: "counterUnweight",
      },
      {
        Header: "endBatch",
        accessor: "endBatch",
      },
      {
        Header: "startBatch",
        accessor: "startBatch",
      },
      {
        Header: "endProductionDate",
        accessor: "endProductionDate",
      },


      {
        Header: "expectedDeliveryDate",
        accessor: "expectedDeliveryDate",
      },
      {
        Header: "idContentStatus",
        accessor: "idContentStatus",
      },
      {
        Header: "counterError",
        accessor: "counterError",
      },
      {
        Header: "idFolderLine",
        accessor: "idFolderLine",
      },
      {
        Header: "idMfLocation",
        accessor: "idMfLocation",
      },
      {
        Header: "nbPalletToCreate",
        accessor: "nbPalletToCreate",
      },
      {
        Header: "orderDate",
        accessor: "orderDate",
      },
      {
        Header: "idPackingLine",
        accessor: "idPackingLine",
      },
      {
        Header: "qtyRepacked",
        accessor: "qtyRepacked",
      },

      {
        Header: "qtyToRepack",
        accessor: "qtyToRepack",
      },
      {
        Header: "qtyToTreat",
        accessor: "qtyToTreat",
      },
      {
        Header: "qtyTreated",
        accessor: "qtyTreated",
      },
      {
        Header: "idReferenceFrom",
        accessor: "idReferenceFrom",
      },
      {
        Header: "idReferenceTo",
        accessor: "idReferenceTo",
      },
      {
        Header: "rejectionStatus",
        accessor: "rejectionStatus",
      },
      {
        Header: "siloNumberL3",
        accessor: "siloNumberL3",
      },
      {
        Header: "startProductionDate",
        accessor: "startProductionDate",
      },
      {
        Header: "statusRepackingLine",
        accessor: "statusRepackingLine",
      },
      {
        Header: "typeReception",
        accessor: "typeReception",
      },
      {
        Header: "typeTreatment",
        accessor: "typeTreatment",
      },
      {
        Header: "idRepacking",
        accessor: "idRepacking",
      },
      {
        Header: "idDestinationWarehouse",
        accessor: "idDestinationWarehouse",
      },
      {
        Header: "idEligibiltyWarehouse",
        accessor: "idEligibiltyWarehouse",
      },
     



      {
        Header: "toName",
        accessor: "toName",
      },
      {
        Header: "idSite",
        accessor: "idSite",
      },
      {
        Header: "statusRepacking",
        accessor: "statusRepacking",
      },


      {
        Header: "cleanUpNumber",
        accessor: "cleanUpNumber",
      },
      {
        Header: "cleanUpStatus",
        accessor: "cleanUpStatus",
      },
      {
        Header: "idPackaging",
        accessor: "idPackaging",
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
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Repackings Search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a onClick={this.backHandler}>Repackings</a>
                  </b>
                </u>
              
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Repacking Line edition</a>
                  </b>
                </u>
              </span>
              <br />
              <div>
                        <div class="row-xs-6 bottom-row ">
                            <FaSave

                            //   onClick={() => this.edithandler(props.original)}
                            >

                            </FaSave>{" "}
                            <a style={{ cursor: "pointer", fontWeight: "bold", color: "blue" }}>
              <u onClick={this.updateRepackingLine}>Save</u>
            </a>
                            {/* <button >Configure</button> */}
                            {/* <a onClick={this.UpdateUserMEthod} >save</a>{" "} */}
                            {" "}



                        </div>
                        </div>
                        <div>
                            <b>
                                <span
                                    style={{
                                        color: "green",
                                    }}
                                >
                                    <h6>{this.state.msg}</h6>
                                </span>
                            </b>
                        </div>
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
                <Col xs="2">
                  <Label>Folder ID</Label>{" "}
                </Col>

                <Col xs="2">
                  {" "}
                  <Input bsSize="sm" value={this.state.idFolder} />
                    
                </Col>
                <Col>
                  {" "}
                  
                    
                </Col>

                <Col> </Col>
                <Col xs="2">
                  <Label>Folder Line ID</Label>{" "}
                </Col>
                <Col xs="2">
                  {" "}
                  <Input bsSize="sm" value={this.state.idFolderLine} />
            
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col xs="2">
                  <Label>Reception Type</Label>{" "}
                </Col>

                <Col xs="2">
                  {" "}
                  <Input bsSize="sm" value={this.state.typeReception===5?"Process order":
                                              this.state.typeReception===11?"Material to material":""} >
                  {/* {this.state.typeReception === 5 ? this.setState({typeReception:"Process order"}) :
                   this.state.typeReception === 11 ? this.setState({typeReception:"Material to material"}):
                    null} */}
                    </Input>
                </Col>
                <Col>
                  {" "}
                  
                    
                </Col>

                <Col> </Col>
                <Col xs="2">
                  <Label>Treatment Type</Label>{" "}
                </Col>
                <Col xs="2">
                  {" "}
                  <Input bsSize="sm" 
                  value={this.state.typeTreatment===100?"Process order":
                        this.state.typeTreatment===200?"Manufacturing":""} />
                  
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col xs="2">
                  <Label>Reference From</Label>{" "}
                </Col>

                <Col xs="2">
                  {" "}
                  <Input bsSize="sm" value={this.state.idReferenceFrom} />
                    
                </Col>
                <Col>
                  {" "}
                  
                    
                </Col>

                <Col> </Col>
                <Col xs="2">
                  <Label>Reference To</Label>{" "}
                </Col>
                <Col xs="2">
                  {" "}
                  <Input bsSize="sm" value={this.state.idReferenceTo} />
            
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col xs="2">
                  <Label>Qty To Repack (PAL)</Label>{" "}
                </Col>

                <Col xs="2">
                  {" "}
                  <Input bsSize="sm" value={this.state.qtyToRepack} />
                    
                </Col>
                <Col>
                  {" "}
                  
                    
                </Col>

                <Col> </Col>
                <Col xs="2">
                  <Label>Qty Repacked (PAL)</Label>{" "}
                </Col>
                <Col xs="2">
                  {" "}
                  <Input bsSize="sm" value={this.state.qtyRepacked} />
            
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col xs="2">
                  <Label>Status</Label>{" "}
                </Col>

                <Col xs="2">
                  {" "}
                  <Input bsSize="sm" value={
                  this.state.statusRepackingLine === 1000 ?"Closed" : 
                  this.state.statusRepackingLine === 200 ?"In coherent" :
                this.state.statusRepackingLine === 100 ?"Created" : 
                this.state.statusRepackingLine === 400 ?"In progress":
                this.state.statusRepackingLine === 1100 ?"Closed & Rejected" : ""}>
                  </Input>
                    
                </Col>
                <Col>
                  {" "}
                  
                    
                </Col>

                <Col> </Col>
                <Col xs="2">
                  <Label>Final Content Status ID</Label>{" "}
                </Col>
                <Col xs="2">
                  {" "}
                  <Input bsSize="sm" value={this.state.contentStatus} />
            
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col xs="2">
                  <Label>Rejection Status</Label>{" "}
                </Col>

                <Col xs="2">
                  {" "}
                  <Input bsSize="sm"
                   value={this.state.rejectionStatus === 0 ?
                    "OK"
                   :this.state.rejectionStatus === 200 ?
                     "_INCOHERENCE_WITH_PRODUCT_IN_SILO_"
                   :this.state.rejectionStatus === 100 ?
                    "PRODUCT_UNKNOWN"
                   :this.state.rejectionStatus === 300 ?
                    "_BAD_RELATIONSHIP_"
                   :this.state.rejectionStatus === 400 ?
                    "_PACKING_LINE_BUSY_"
                   :this.state.rejectionStatus === 500 ?
                    "_SILO_UNKNOWN_"
                   :this.state.rejectionStatus === 600 ?
                   "_TOO_MANY_CONTENTS_"
                   :this.state.rejectionStatus === 700 ?
                    "_SILO_EMPTY_"
                   :this.state.rejectionStatus === 800 ?
                   "_NEGATIVE_QTY_CHILD_"
                   :this.state.rejectionStatus === 900 ?
                    "_PACKING_LINE_UNKNOWN_"
                   :this.state.rejectionStatus === 1000 ?
                    "_TOO_MANY_CONTAINERS_"
                   :this.state.rejectionStatus === 1100 ?
                   "_NOT_A_INTERMEDIATE_MATERIAL_CODE_"
                   :this.state.rejectionStatus === 1200 ?
                   "_ANOTHER_PROCESS_IN_PROGRESS_ON_SILO_"
                   :this.state.rejectionStatus === 1300 ?
                   "_NOT_VRAC_PRODUCT_"
                   :this.state.rejectionStatus === 1400 ?
                   "_SAME_ORIGINAL_AND_FINAL_PRODUCT_"
                   :this.state.rejectionStatus === 1500 ?
                   "_NO_CHILD_PRODUCT_"
                   :this.state.rejectionStatus === 1600 ?
                   "_PACKING_LINE_MT_INCOHERENT_WITH_SILO_"
                   :this.state.rejectionStatus === 1700 ?
                   "_PACKING_LINE_TYPE_INCOHERENT_WITH_FINAL_PRODUCT_"
                   :this.state.rejectionStatus === 1800 ?
                   "_PRODUCT_NOT_AVAILABLE_"
                   :null
                    }
                   name = "rejectionStatus" 
                   />
                  
                    
                </Col>
                <Col>
                  {" "}
                  
                    
                </Col>

                <Col> </Col>
                <Col xs="2">
                  <Label>SilonumberL3</Label>{" "}
                </Col>
                <Col xs="2">
                  {" "}
                  <Input 
                  type="select"
                  name="siloNumberL3" 
                  bsSize="sm" 
                  value={this.state.siloNumberL3} 
                  onChange={this.onchangehandler} >
                  {this.state.siloData.map(data => <option value={data.siloNumberl3} key={data.siloNumberl3}>{data.siloNumberl3}</option>)}
                      </Input>
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col xs="2">
                  <Label>Comment</Label>{" "}
                </Col>

                <Col xs="2">
                  {" "}
                  <Input bsSize="sm" value={this.state.commentary} />
                    
                </Col>
                <Col>
                  {" "}
                  
                    
                </Col>

                <Col> </Col>
                <Col xs="2">
                  <Label>Packing Line ID</Label>{" "}
                </Col>
                <Col xs="2">
                  {" "}
                  <Input 
                  name="idPackingLine"
                  type="select"
                   bsSize="sm"
                   value={this.state.idPackingLine} 
                   onChange={this.onchangehandler}>
                  {this.state.packingLineData.map(data => <option value={data.packingLineL3} key={data.idPackingLine}>{data.packingLineL3}</option>)}
                      </Input>
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col xs="2">
                  <Label>Warehouse Eligiblity</Label>{" "}
                </Col>

                <Col xs="2">
                  {" "}
                  <Input 
                  type="select" 
                  bsSize="sm" 
                  name="idEligibiltyWarehouse"
                  value={this.state.idEligibiltyWarehouse}  
                  onChange={this.onchangehandler} >
                  
                      {this.state.warehouseDate.map(data => <option value={data.id_warehouse} key={data.id_warehouse}>{data.description}</option>)}
                      </Input>
                </Col>
                <Col>
                  {" "}
                  
                    
                </Col>

                <Col> </Col>
                <Col xs="2">
                  <Label>Packaging line</Label>{" "}
                </Col>
                <Col  xs="2">
                  {" "}
                  <Input 
                  name="idPackaging"
                  type="select" 
                  bsSize="sm" 
                  value={this.state.idPackaging} 
                  onChange={this.onchangehandler} >
                  {this.state.packagingData.map(data => <option value={data.description} key={data.idPackaging}>{data.description}</option>)}
                      </Input>
            
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>
             
              <Row style={{marginTop:"10px"}}>
                <Col xs="2">
                <Label>Warehouse Destination</Label>{" "}
                </Col>
                <Col xs="2">
                  {" "}
                  <Input
                  name="idDestinationWarehouse" 
                  type="select" 
                  bsSize="sm" 
                  value={this.state.idDestinationWarehouse}  
                  onChange={this.onchangehandler}>

                    
                  {this.state.warehouseDate.map(data => <option value={data.id_warehouse} key={data.id_warehouse}>{data.description}</option>)}
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
              
              <div style={{border:"1px solid black",backgroundColor:"grey",marginLeft:"0px",marginTop:"3px"}}>
<span>
<IoArrowForwardCircleSharp >

</IoArrowForwardCircleSharp>
<b> Counter Packing Lines</b> 
</span>

</div>
<Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Counter Bag </Label>{" "}
              </Col>

              <Col>
                {" "}
               <Input bsSize="sm" value={this.state.counterBag} />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Counter met</Label>{" "}
              </Col>
              <Col>
              <Input bsSize="sm" value={this.state.counterMet} />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Counter Fracture</Label>{" "}
              </Col>

              <Col>
                {" "}
                
                <Input bsSize="sm" value={this.state.counterFracture} />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label> Counter Unweight</Label>{" "}
              </Col>
              <Col>
              <Input bsSize="sm" value={this.state.counterUnweight} />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
           
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Counter Error </Label>{" "}
              </Col>

              <Col>
                {" "}
               <Input bsSize="sm" value={this.state.counterBag} />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Bag Number</Label>{" "}
              </Col>
              <Col>
              <Input bsSize="sm" value={this.state.counterMet} />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Start Batch</Label>{" "}
              </Col>

              <Col>
                {" "}
                
                <Input bsSize="sm" value={this.state.startBatch} />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label> End Batch</Label>{" "}
              </Col>
              <Col>
              <Input bsSize="sm" value={this.state.endBatch} />
              </Col>
              <Col></Col>
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

export default DisplayEditRepacking;