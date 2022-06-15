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

 class Silo_Loading_Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data:[],
      idSiloLoading : "", 
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
      idCompany: "",  
      idContentStatus: "",  
      density: "",
			endLoadingDate: "",  
      grade: "",  
      qtyLoaded: "",  
      qtyToLoad: "",  
      idReceptionN3: "",
			idReceptionLineN3: "",  
      idReference: "",  
      rejectionStatus: "",  
      siloNumberL3: "",  
      idSite: "",
			startLoadingDate: "",  
      statusSiloLoading: "",  
      typeReception: "",  
      cleanUpNumber: "",
			cleanUpStatus: "",
    };
  }

  componentDidMount() {
    console.log("calling edit data length", this.state.data.length);
    console.log("calling edit datttaaaaaaaaaaaaa&&&&&&aaaa", this.props.data2);
    console.log("calling edit ", SiloLoadingEditdata);
    if (SiloLoadingEditdata !== null) {
      this.setState(
        {
          data: SiloLoadingEditdata,
        },
        () => {
          console.log("data present after tab switch", this.state.data);
          if (SiloLoadingEditdata.statusSiloLoading===1000) {
            this.setState({
              
              statusSiloLoading:"Closed"

            })
          } if (SiloLoadingEditdata.statusSiloLoading===200) {
            this.setState({
              statusSiloLoading:"Incoherent"
            })
          }
          if (SiloLoadingEditdata.statusSiloLoading===100) {
            this.setState({
              statusSiloLoading:"Created"
            })
          }
          if (SiloLoadingEditdata.statusSiloLoading===400) {
            this.setState({
              statusSiloLoading:"Inprogress"
            })
          }
          if (SiloLoadingEditdata.statusSiloLoading===1100) {
            this.setState({
              statusSiloLoading:"Closed & Rejected"
            })
          }
          if (SiloLoadingEditdata.rejectionStatus===0) {
            this.setState({
              rejectionStatus:"OK"
            })
          }if (SiloLoadingEditdata.rejectionStatus===200) {
            this.setState({
              rejectionStatus:"SILO-NOT_EMPTY"
            })
          }if (SiloLoadingEditdata.rejectionStatus===100) {
            this.setState({
              rejectionStatus:"SILO_UNKNOWN"
            })
          }if (SiloLoadingEditdata.rejectionStatus===300) {
            this.setState({
              rejectionStatus:"NOT_AN_IMC"
            })
          }if (SiloLoadingEditdata.rejectionStatus===400) {
            this.setState({
              rejectionStatus:"NO_PRODUCT_FOR_IMC"
            })
          }if (SiloLoadingEditdata.rejectionStatus===500) {
            this.setState({
              rejectionStatus:"ANOTHER_SILO_LOADING_IN_PROGRESS"
            })
          }if (SiloLoadingEditdata.rejectionStatus===600) {
            this.setState({
              rejectionStatus:"NO_BATCH"
            })
          }
          

          this.setState({
            idSiloLoading : SiloLoadingEditdata.idSiloLoading, 
            mDate: SiloLoadingEditdata.mDate, 
            musername: SiloLoadingEditdata.musername,  
            versionLock: SiloLoadingEditdata.versionLock,
            batch: SiloLoadingEditdata.batch,  
            characUse: SiloLoadingEditdata.characUse,  
            feat1: SiloLoadingEditdata.feat1,  
            feat2: SiloLoadingEditdata.feat2,  
            feat3: SiloLoadingEditdata.feat3,  
            sellByDate: SiloLoadingEditdata.sellByDate,
            useByDate: SiloLoadingEditdata.useByDate,  
            commentary: SiloLoadingEditdata.commentary,  
            idCompany: SiloLoadingEditdata.idCompany,  
            idContentStatus: SiloLoadingEditdata.idContentStatus,  
            density: SiloLoadingEditdata.density,
            endLoadingDate: SiloLoadingEditdata.endLoadingDate,  
            grade: SiloLoadingEditdata.grade,  
            qtyLoaded: SiloLoadingEditdata.qtyLoaded,  
            qtyToLoad: SiloLoadingEditdata.qtyToLoad,  
            idReceptionN3: SiloLoadingEditdata.idReceptionN3,
            idReceptionLineN3: SiloLoadingEditdata.idReceptionLineN3,  
            idReference: SiloLoadingEditdata.idReference,  
            //rejectionStatus: SiloLoadingEditdata.rejectionStatus,  
            siloNumberL3: SiloLoadingEditdata.siloNumberL3,  
            idSite: SiloLoadingEditdata.idSite,
            startLoadingDate: SiloLoadingEditdata.startLoadingDate,  
            //statusSiloLoading: SiloLoadingEditdata.statusSiloLoading,  
            typeReception: SiloLoadingEditdata.typeReception,  
            cleanUpNumber: SiloLoadingEditdata.cleanUpNumber,
            cleanUpStatus: SiloLoadingEditdata.cleanUpStatus,
           
          });
        }
      );
    }
  }


  saveHandler(){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'gray',
        cancelButtonColor: 'gray',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

}




backHandler=()=>{
  console.log("calling back handler for list")
  remover("Silo_Loading_Edit")
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
                    <a onClick={this.backHandler}>Silo Search</a>
                  </b>
                </u>
                &#60;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a onClick={this.backHandler}>Silo Loading Management</a>
                  </b>
                </u>
                &#60;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a onClick={this.backHandler}>Silo Loading edition</a>
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
                  <Label>Silo no L3</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.siloNumberL3} />
            
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>
             
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Reception ID</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.idReceptionN3} />
            
                </Col>
                <Col>
                  {" "}
                  
                </Col>

                <Col></Col>
                <Col>
                  <Label>Reception Line ID</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.idReceptionLineN3} />
                   
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
                  <Input bsSize="sm" value={this.state.statusSiloLoading } />
                </Col>
                <Col>
                  {" "}
                  
                </Col>

                <Col></Col>
                <Col>
                  <Label>Rejection Status</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.rejectionStatus } />
                   
                </Col>
                <Col>
                  {" "}
                </Col>
                <Col> </Col>
              </Row>
              
              <div  style={{
                  border: "1px",
                  border: "1px solid black",
                  marginTop:"15px",
                  backgroundColor: "grey"
                }}>
                     <IoIosArchive/> 
                <span><b>Logistic DATA</b></span>

                </div>
                <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Intermediate Material Code</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.idReference } />
                    
                </Col>
                <Col>
                  {" "}
                  
                    
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Grade</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.grade } />
            
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Content Status</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.idContentStatus } />
                    
                </Col>
                <Col>
                  {" "}
                  
                    
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Batch</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.batch } />
            
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Density</Label>{" "}
                </Col>
                <Col>
                  {" "}
                 <Input bsSize="sm" value={this.state.density } />
            
                </Col>
                <Col>
                  {" "}
                  
                </Col>

                <Col></Col>
                <Col>
                  {" "}
                </Col>
                <Col>
                  {" "}
                
                   
                </Col>
                <Col>
                  {" "}
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  {" "}
                </Col>
                <Col>
                  {" "}
                 
            
                </Col>
                <Col>
                  {" "}
                  
                </Col>

                <Col></Col>
                <Col>
                 {" "}
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
                  border: "1px solid black",
                  marginTop:"10px",
                  backgroundColor: "grey"
                }}>
                     <IoIosArchive/> 
                <span><b>QUANTITIES</b></span>

                </div>
                <Row style={{marginTop:"15px"}}>
                <Col>
                  <Label>Qty to load(T)</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.qtyToLoad } />
            
                </Col>
                <Col>
                  {" "}
                  
                </Col>

                <Col></Col>
                <Col>
                  {" "}
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

export default Silo_Loading_Edit;