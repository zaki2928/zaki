import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button,Label,
    Input,
    FormGroup, } from "reactstrap";
import { IoIosSettings } from "react-icons/io";
import { MdRestore } from "react-icons/md";
import { MdPrint } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import {siloEditdata,remover } from "../../../store/Store";
import { FaEdit } from 'react-icons/fa';
import axios from "axios";
import { properties } from '../../../Properties/Properties';


const GetSiloLoadingSiClBysiloNumberL3 = properties.Port + properties.GetSiloLoadingSiClBysiloNumberL3
const getListOfRepackingLineByPackingLine = properties.Port + properties.getListOfRepackingLineByPackingLine

class Silo_Edit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //show:true,
      //show2:false,
      data: [],
      data2: [],
      idSiloSi:"",
      idSilo:"",
      idSiloMt:"",
      versionLock:"",
      dcsLevel:"",
      dcsmaxLevel:"",
      quantityDcs:"",
      dcsRelease:"",
      dcssiloloadingProcess:"",
      statussiloLoading:"",
      silonumberDcs:"",
      coefdcsLevel:"",
      mDate:"",
      mUsername:"",
      idpackingLine:"",
      idprocessOrder:"",
      lastdataSend:"",
      idContentStatus:"",
      idGate:"",
      characUse:"",
      quantity:"",
      statusFill:"",
      useprocessOrder:"",
      sellbyDate:"",
      usebyDate:"",
      bay:"",
      batch:"",
      feat1:"",
      feat2:"",
      feat3:"",
      idCompany:"",
      descriptionUnit:"",
      grade:"",
      idlocationSilo:"",
      idRefrence:"",
      siloNumberl3:"",
      coefUnit:"",
      density:"",
      materialType:"",
      idSite:"",
    
    };
  }


  componentDidMount() {
    console.log("calling edit data length", this.state.data.length);
    console.log("calling edit datttaaaaaaaaaaaaa&&&&&&aaaa", this.props.siloeditnewdata);
    console.log("calling edit ", siloEditdata);

    if (siloEditdata !== null) {
     this.getSiloLoadingListBySiloNumber(siloEditdata[0].siloNumberl3)
     
     this.getSiloLoadingListByIdPackingLine(siloEditdata[0].idpackingLine)


      this.setState(
        {
          data: siloEditdata,
          data2: siloEditdata,
        },
        () => {
          console.log("data present after tab switch", this.state.data);
          if (siloEditdata[0].statusFill===0) {
            this.setState({
              
                statusFill:"Release"

            })
          } if (siloEditdata[0].statusFill===1) {
            this.setState({
              statusFill:"Filling"
            })
          }
          if (siloEditdata[0].statusFill===2) {
            this.setState({
              statusFill:"Filled"
            })
          }

          this.setState({
            
	quantityDcs:siloEditdata[0].quantityDcs,
  statussiloLoading:siloEditdata[0].statussiloLoading,
	silonumberDcs:siloEditdata[0].silonumberDcs,
  idContentStatus:siloEditdata[0].idContentStatus,
  
  bay:siloEditdata[0].bay,
	batch:siloEditdata[0].batch,
  idCompany:siloEditdata[0].idCompany,
  idlocationSilo:siloEditdata[0].idlocationSilo,
  siloNumberl3:siloEditdata[0].siloNumberl3,
  density:siloEditdata[0].density,
	materialType:siloEditdata[0].materialType,
  useprocessOrder:siloEditdata[0].useprocessOrder,
  idGate:siloEditdata[0].idGate,
  grade:siloEditdata[0].grade,
  idRefrence:siloEditdata[0].idRefrence,
  quantity:siloEditdata[0].quantity,
  idpackingLine:siloEditdata[0].idpackingLine,




          });
        }
      );
    }
  }

  
  getSiloLoadingListBySiloNumber = (id) => {
    console.log("print silo numberrrrrrrrrrr",id)
    axios
      .post(GetSiloLoadingSiClBysiloNumberL3 + id)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne successsssssssssssssssssssssss ", response.data);
          this.setState({
            data:response.data
          });
        
        } else {
          this.setState({
            data: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getSiloLoadingListByIdPackingLine = (idd) => {
    console.log("packing line idddddddddd",idd)
    axios
      .post(getListOfRepackingLineByPackingLine + idd)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne successsssssssssssssssssssssss ", response.data);
          this.setState({
            data2:response.data
          });
        
        } else {
          this.setState({
            data2: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  backHandler=()=>{
    console.log("calling back handler for list")
    remover("Silo_Edit")
    this.props.editClosehandler()
  }
  
    
      render() {
        const columns2 = [
            
          {
            Header: "ID",
             accessor: "idRepackingLine",
           
          },
            {
                  Header: "Company",
                   accessor: "repackingSICLEntity.idCompany",
                
                
              },
              {
                Header: "Folder ID",
                 accessor: "repackingSICLEntity.idFolder",
              
              
            },
              {
                Header: "Folder line id",
                 accessor: "idFolderLine",
              },
              {
                Header: "Packing line id",
                accessor: "idPackingLine",
              },
              {
                Header: "Reception Type",
                 accessor: "typeReception",
              },
              {
                Header: "Treatment Type",
                 accessor: "typeTreatment",
              },
              {
                Header: "Status",
                 accessor: "statusRepackingLine",
              },
              {
                Header: "Reference from",
                 accessor: "idReferenceFrom",
              },
              {
                Header: "Reference to",
                accessor: "idReferenceTo",
              },
              {
                Header: "Product unit",
                accessor: "productKLEntity.zUnitCode",
              },
              {
                Header: "Qty to repack",
                accessor: "qtyToRepack",
              }, {
                Header: "Qty repacked",
                accessor: "qtyRepacked",
              },
              {
                Header: "Silo number L3",
                accessor: "siloNumberL3",
              },
              {
                Header: "Number of pallets already done",
                accessor: "nbPalletToCreate",
              },
        ];
        const columns3= [
          {
            Header: "ID",
             accessor: "idSiloLoading",
           
          },
            {
                  Header: "Reception ID",
                   accessor: "idReceptionN3",
                
                
              },
              {
                Header: "Reception type",
                 accessor: "typeReception",
              
              
            },
              {
                Header: "Status",
                Cell: (props) => {
                  return (
                    <text>
                      {props.original.statusSiloLoading === 1000 ? <span>Closed</span> : props.original.statusSiloLoading === 200 ?<span>Incoherent</span> :
                       props.original.statusSiloLoading === 100 ? <span>Created</span>:props.original.statusSiloLoading === 400 ? <span>Inprogress</span> :
                       props.original.statusSiloLoading === 1100 ? <span>Closed & Rejected</span> :null}
                    </text>
                  );
                },
              },
              {
                Header: "Rejection status",
               // accessor: "rejectionStatus",
                Cell: (props) => {
                  return (
                    <text>
                      {props.original.rejectionStatus === 0 ? <span>OK</span> : props.original.rejectionStatus === 200 ?<span>SILO-NOT_EMPTY</span> :
                       props.original.rejectionStatus === 100 ? <span>SILO_UNKNOWN</span>:props.original.rejectionStatus === 300 ? <span>NOT_AN_IMC</span> :
                       props.original.rejectionStatus === 400 ? <span>NO_PRODUCT_FOR_IMC</span>: props.original.rejectionStatus === 500 ?<span>ANOTHER_SILO_LOADING_IN_PROGRESS</span>
                       :props.original.rejectionStatus === 600 ?<span>NO_BATCH</span> :null}
                    </text>
                  );
                },
              },
              {
                Header: "Intermediate material code",
                 accessor: "idReference",
              },
              {
                Header: "IMC grade",
                 accessor: "grade",
              },
              {
                Header: "IMC Batch",
                 accessor: "batch",
              },
              {
                Header: "Qty to load",
                 accessor: "qtyToLoad",
              },
              {
                Header: "Description unit",
                // accessor: "",
              },
              {
                Header: "Silo number L3",
                accessor: "siloNumberL3",
              },
             
        ];
        const columns = [
            
          {
            Header: "ID",
             accessor: "idSiloLoading",
           
          },
            {
                  Header: "Reception ID",
                   accessor: "idReceptionN3",
                
                
              },
              {
                Header: "Reception type",
                 accessor: "typeReception",
              
              
            },
              {
                Header: "Status",
                Cell: (props) => {
                  return (
                    <text>
                      {props.original.statusSiloLoading === 1000 ? <span>Closed</span> : props.original.statusSiloLoading === 200 ?<span>Incoherent</span> :
                       props.original.statusSiloLoading === 100 ? <span>Created</span>:props.original.statusSiloLoading === 400 ? <span>Inprogress</span> :
                       props.original.statusSiloLoading === 1100 ? <span>Closed & Rejected</span> :null}
                    </text>
                  );
                },
              },
              {
                Header: "Rejection status",
               // accessor: "rejectionStatus",
                Cell: (props) => {
                  return (
                    <text>
                      {props.original.rejectionStatus === 0 ? <span>OK</span> : props.original.rejectionStatus === 200 ?<span>SILO-NOT_EMPTY</span> :
                       props.original.rejectionStatus === 100 ? <span>SILO_UNKNOWN</span>:props.original.rejectionStatus === 300 ? <span>NOT_AN_IMC</span> :
                       props.original.rejectionStatus === 400 ? <span>NO_PRODUCT_FOR_IMC</span>: props.original.rejectionStatus === 500 ?<span>ANOTHER_SILO_LOADING_IN_PROGRESS</span>
                       :props.original.rejectionStatus === 600 ?<span>NO_BATCH</span> :null}
                    </text>
                  );
                },
              },
              {
                Header: "Intermediate material code",
                 accessor: "idReference",
              },
              {
                Header: "IMC grade",
                 accessor: "grade",
              },
              {
                Header: "IMC Batch",
                 accessor: "batch",
              },
              {
                Header: "Qty to load",
                 accessor: "qtyToLoad",
              },
              {
                Header: "Description unit",
                // accessor: "",
              },
              {
                Header: "Silo number L3",
                accessor: "siloNumberL3",
              },
             
        ];
        return (
            <React.Fragment>
                
<div>
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
                    <a onClick={this.backHandler}>Silo search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a onClick={this.backHandler}>Silo Management</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Silo Edition</a>
                  </b>
                </u>



              </span>
              <div style={{
                marginLeft:"15px"
            
            }}>
  <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Material type</Label>{" "}
              </Col>

              <Col>
                {" "}
               <Input bsSize="sm" value={this.state.materialType} />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Company</Label>{" "}
              </Col>
              <Col>
              <Input bsSize="sm" value={this.state.idCompany} />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Silo number L3</Label>{" "}
              </Col>

              <Col>
                {" "}
                
                <Input bsSize="sm" value={this.state.siloNumberl3} />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Intermediate material code</Label>{" "}
              </Col>
              <Col>
              <Input bsSize="sm" value={this.state.idRefrence} />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>DCS Silo no</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.silonumberDcs} />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>IMC Grade</Label>{" "}
              </Col>
              <Col><Input bsSize="sm" value={this.state.grade} />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Bay</Label>{" "}
              </Col>

              <Col>
                {" "}
               <Input bsSize="sm" value={this.state.bay} />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Batch</Label>{" "}
              </Col>
              <Col>
             <Input bsSize="sm" value={this.state.batch} />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Location</Label>{" "}
              </Col>

              <Col>
                {" "}
               <Input bsSize="sm" value={this.state.idlocationSilo.replace("19@","")} />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Content status</Label>{" "}
              </Col>
              <Col>
             <Input bsSize="sm" value={this.state.idContentStatus} />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Status fill</Label>{" "}
              </Col>
              {/* <text>
                {props.original.statusFill === 0 ? <span>Release</span> : props.original.statusFill === 1 ?<span>Filling</span> :
                 props.original.statusFill === 2 ? <span>Filled</span>:null}
              </text> */}

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.statusFill} 
                />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>IMC quantity(T)</Label>{" "}
              </Col>
              <Col>
              <Input bsSize="sm" value={this.state.quantity} />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Loading status</Label>{" "}
              </Col>

              <Col>
                {" "}
               <Input
               
                  value={this.state.statussiloLoading}
                   name="statussiloLoading"
                   bsSize="sm"
                  >{this.state.statussiloLoading ===100 ?this.setState({statussiloLoading:"_InActive_"}) : 
                  this.state.statussiloLoading ===200 ?this.setState({statussiloLoading:"_Active_"}): 
                  this.state.statussiloLoading ===300 ?this.setState({statussiloLoading:"_Holding_"}):
                null
            }
                </Input>
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>DCS quantity(T)</Label>{" "}
              </Col>
              <Col>
              <Input bsSize="sm" value={this.state.quantityDcs} />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Gate</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.idGate} />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Density</Label>{" "}
              </Col>
              <Col>
             <Input bsSize="sm" value={this.state.density} />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
             < Row>
                <Col>
                  <Label style={{marginLeft:"15px",
                }}>UseProcessOrder</Label>
                </Col>

                <Col>
                  {" "}
                  <Input type="checkbox"
                    bsSize="sm"
                    checked={this.state.useprocessOrder===1}
                  />
    
                </Col>
                <Col>
                  {" "}
                    
                </Col>

                <Col> </Col>
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

</div>
<div style={{border:"1px solid black",backgroundColor:"grey",marginLeft:"0px",marginTop:"3px"}}>
<span>
<IoArrowForwardCircleSharp onClick={()=>{this.setState({show:!this.state.show})}}>
{ this.state.show}
</IoArrowForwardCircleSharp>
<b> Silo Loading</b> 
</span>

</div>



</div>
{this.state.show? <div><ReactTable 
                  className="-striped -highlight "
                  data={
                    this.state.data
                  }
                  columns={columns}
                  defaultPageSize={5}
                  //showPaginationTop= {true}
                  filterable={true}/>


                  </div> : null
              }



<div style={{border:"1px solid black",backgroundColor:"grey",marginLeft:"0px",marginTop:"3px"}}>
<span>
<IoArrowForwardCircleSharp onClick={()=>{this.setState({show2:!this.state.show2})}}>
{ this.state.show2
}
</IoArrowForwardCircleSharp>
<b> Repacking Lines</b> 
</span>

</div>
{this.state.show2? <div><ReactTable 
                  className="-striped -highlight "
                  data={
                    this.state.data2
                  }
                  columns={columns2}
                  defaultPageSize={5}
                  //showPaginationTop= {true}
                  filterable={true}/>


                  </div> : null
              }
<div style={{border:"1px solid black",backgroundColor:"grey",marginLeft:"0px",marginTop:"3px"}}>
<span>
<IoArrowForwardCircleSharp onClick={()=>{this.setState({show3:!this.state.show3})}}>
{ this.state.show3
}
</IoArrowForwardCircleSharp>
<b> preparation Lines</b> 
</span>

</div>
{this.state.show3? <div><ReactTable 
                  className="-striped -highlight "
                  data={
                    this.state.data2
                  }
                  columns={columns3}
                  defaultPageSize={5}
                  //showPaginationTop= {true}
                  filterable={true}/>


                  </div> : null
              }


             
              <br />
              




            </React.Fragment>
          );
        }
}

export default Silo_Edit;