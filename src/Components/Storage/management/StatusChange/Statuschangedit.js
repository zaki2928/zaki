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
import {remover, Statuschangeeditdata} from "../../../../store/Store";
import Swal from "sweetalert2";

 class Statuschangedit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status : false,
      data:[],
      batch: "",
  coefUnit: 0,
  contentStatusId: 0,
  description: "",
  descriptionUnit: "",
  idCompany: "",
  idContainer: "",
  idContentStk: 0,
  idExpectedCoefUnit: 0,
  idLocation: "",
  idLogisticUnit: "",
  idProduct: 0,
  idReference: "",
  idWarehouse: "",
  attribute: null,
      operation: "=",
      value: null,

  mDate: "",
  mUserName: "",
  qtyReservedCoefUnit: 0,
  quantityCoefUnit: 0,
  statusContainer: 0,
  statusMvt: 0,
  typeContainer: 0,
  typeContent: 0,
  versionLock: 0,
  zGrade: "",
  zInterMaterialCode: "",
  idReceptionLineN3Rec:"",
  idReceptionLineN3:"",
  typeReceptionRec:"",
  idWarehouseArr: [],
  idContentArr: [],
  limit:"",
  listFilterBean: []
    };
  }
//   saveHandler(){
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
  console.log("calling silo loading edit", Statuschangeeditdata);
  this.setState({
    batch: Statuschangeeditdata.batch,
    coefUnit: Statuschangeeditdata.coefUnit,
    contentStatusId: Statuschangeeditdata.contentStatusId,
    description: Statuschangeeditdata.description,
    descriptionUnit: Statuschangeeditdata.descriptionUnit ,
    idCompany:Statuschangeeditdata.idCompany,
    idContainer :Statuschangeeditdata.idContainer,
    idContentStk:Statuschangeeditdata.idContentStk,
    idExpectedCoefUnit:Statuschangeeditdata.idExpectedCoefUnit,
    idLocation:Statuschangeeditdata.idLocation,
    idLogisticUnit:Statuschangeeditdata.idLogisticUnit,
    idProduct:Statuschangeeditdata.idProduct,
    idReference:Statuschangeeditdata.idReference,
    idWarehouse:Statuschangeeditdata.idWarehouse,
    mDate:Statuschangeeditdata.mDate,
    mUserName:Statuschangeeditdata.mUserName,
    qtyReservedCoefUnit:Statuschangeeditdata.qtyReservedCoefUnit,
    quantityCoefUnit:Statuschangeeditdata.quantityCoefUnit,
    statusContainer:Statuschangeeditdata.statusContainer,
    statusMvt:Statuschangeeditdata.statusMvt,
    typeContainer:Statuschangeeditdata.typeContainer,
    typeContent:Statuschangeeditdata.typeContent,
    versionLock:Statuschangeeditdata.versionLock,
    zGrade:Statuschangeeditdata.zGrade,
    zInterMaterialCode:Statuschangeeditdata.zInterMaterialCode,
    typeReceptionRec:Statuschangeeditdata.typeReceptionRec,
    idReceptionLineN3Rec:Statuschangeeditdata.idReceptionLineN3Rec,
    idReceptionLineN3:Statuschangeeditdata.idReceptionLineN3,
    listFilterBean:Statuschangeeditdata.listFilterBean,
  
    
  })
}


backHandler=()=>{
  console.log("calling back handler for list")
  remover("Statuschangedit")
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
                    <a>Status search</a>
                  </b>
                </u>
                &#60;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style = {{ cursor: "pointer" }} onClick={this.backHandler}>Change content Status</a>
                  </b>
                </u>
                &#60;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a> Status change content  edition</a>
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
                  marginTop:"20px",
                  backgroundColor: " grey",
                  border:"1px solid black"
                }}
              >
                {/* <IoIosArchive/>  */}

                <b style={{ marginLeft: "5px" }}> &#62; &#62;{" "}
                 
                General</b>
               <div style={{border:"1px solid lightblue"}}>
                
                
                </div> 
<div>
{/* <IoIosArchive/> */}
<b style={{ marginLeft: "5px" }}>Status</b>
</div>
              </div>
            
             
              <div>
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
                <Col>
                  {" "}
                  
                    
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Location</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                   
                   type="text"
                   value={this.state.idLocation.replace("19@","")}
                   name="idLocation"
                   bsSize="sm"                  
                  />
            
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col> </Col>
              </Row>
             
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Product</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                   type="text"
                   value={this.state.idProduct}
                   name="idProduct"
                   bsSize="sm"
                 />
            
                </Col>
                <Col>
                  {" "}
                  
                </Col>

                <Col></Col>
                <Col>
                  <Label>Product Description</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                   
                   type="text"
                   value={this.state.descriptionUnit}
                   name="descriptionUnit"
                   bsSize="sm"                 
                  />
                   
                </Col>
                <Col>
                  {" "}
                </Col>
                <Col> </Col>
              </Row>
              
             


              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Intermediate material code</Label>
                </Col>
                <Col>
                  {" "}
                  <Input
                      type="text"
                      value={this.state.zInterMaterialCode}
                      name="zInterMaterialCode"
                      bsSize="sm"              
                 />
            
                </Col>
                <Col>
                  {" "}
                  
                </Col>

                <Col></Col>
                <Col>
                  <Label>	Grade</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                   
                   type="text"
                   value={this.state.zGrade}
                   name="zGrade"
                   bsSize="sm"                  
                  />
                   
                </Col>
                <Col>
                  {" "}
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Quantity (PAL)</Label>
                </Col>
                <Col>
                  {" "}
                  <Input
                      type="text"
                      value={this.state.coefUnit}
                      name="coefUnit"
                      bsSize="sm"             
                 />
            
                </Col>
                <Col>
                  {" "}
                  
                </Col>

                <Col></Col>
                <Col>
                  <Label>	Type</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                   
                   type="text"
                   value={this.state.typeContent}
                   name="typeContent"
                   bsSize="sm"
                  >
                     {this.state.typeContent ===100 ?this.setState({typeContent:"Stock"}) : 
                     this.state.typeContent ===200 ?this.setState({typeContent:"Picking"}):
                     this.state.typeContent ===300 ?this.setState({typeContent:"Picking Dynamic"}):
                     this.state.typeContent ===600 ?this.setState({typeContent:"Prepration"}):

                    null
                   }
                   </Input>
                </Col>
                <Col>
                  {" "}
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Logistic unit ID</Label>
                </Col>
                <Col>
                  {" "}
                  <Input
                   type="text"
                   value={this.state.idLogisticUnit}
                   name="idLogisticUnit"
                   bsSize="sm"
                 />
            
                </Col>
                <Col>
                  {" "}
                  
                </Col>

                <Col></Col>
                <Col>
                  <Label>Logistic unit qty (PAL)</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                   
                   type="text"
                   value={this.state.quantityCoefUnit}
                   name="quantityCoefUnit"
                   bsSize="sm"
                  />
                   
                </Col>
                <Col>
                  {" "}
                </Col>
                <Col> </Col>
              </Row>
               <Row>
                 <Col>
                  <Label>Content status</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                   
                   type="text"
                   value={this.state.contentStatusId}
                   name="contentStatusId"
                   bsSize="sm"
                  >
                    {this.state.contentStatusId ===0 ?this.setState({contentStatusId:"Available"}) : 
                   
                   
                    null
                   }
                    </Input>
                   
                </Col>
                <Col>
                  {" "}
                </Col>
                <Col> </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>

                  </Row>



              <div  style={{
                  border: "1px",
                  border: "1px solid black",
                  marginTop:"15px",
                  backgroundColor: "grey"
                }}>
                     {/* <IoIosArchive/>  */}
                <span><b>Statements</b></span>

                </div>
                <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Batch</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                   
                   type="text"
                   value={this.state.batch}
                   name="batch"
                   bsSize="sm"
                  />
                   
                </Col>
                <Col>
                  {" "}
                </Col>

               
              </Row>
              
              <div  style={{
                  border: "1px",
                  border: "1px solid black",
                  marginTop:"15px",
                  backgroundColor: "grey"
                }}>
                     {/* <IoIosArchive/>  */}
                <span><b>Stock Quantities</b></span>

                </div>
                <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Reserved quantity (PAL)</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="text"
                    value={this.state.qtyReservedCoefUnit}
                    name="qtyReservedCoefUnit"
                    bsSize="sm"            

                  />
                   
                </Col>
                <Col></Col>
                {/* <Col></Col> */}
                {/* <Col></Col> */}
                <Col>
                  <Label>Expected quantity (PAL)</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                   
                   type="text"
                   value={this.state.idExpectedCoefUnit}
                   name="idExpectedCoefUnit"
                   bsSize="sm"          
                  />
                   
                </Col>
                <Col></Col>
                {/* <Col></Col> */}
                {/* <Col></Col> */}
                </Row>
           
              <div  style={{
                  border: "1px",
                  border: "1px solid black",
                  marginTop:"10px",
                  backgroundColor: "grey"
                }}>
                     {/* <IoIosArchive/>  */}
                <span><b>Informations Of Reception</b></span>

                </div>
                <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Reception ID</Label>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="text"
                    value={this.state.idReceptionLineN3}
                    name="idReceptionLineN3"
                    bsSize="sm"
                 />
            
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
                  <Input
                   
                   type="text"
                   value={this.state.idReceptionLineN3Rec}
                   name="idReceptionLineN3Rec"
                   bsSize="sm"     
                  />
                   
                </Col>
                <Col>
                  {" "}
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Reception Type</Label>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="text"
                    value={this.state.typeReceptionRec}
                    name="typeReceptionRec"
                    bsSize="sm"
                 >
                    {this.state.typeReceptionRec === 5 ?this.setState({typeReceptionRec:"Process Order "}):
                     this.state.typeReceptionRec ===11 ?this.setState({typeReceptionRec:"Material to Material"}):

                    null
                   }
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

export default Statuschangedit;