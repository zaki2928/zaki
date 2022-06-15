import React, { Component } from 'react'
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button,  Label, Input} from "reactstrap";
import { FaEdit, FaTrashAlt, FaList } from "react-icons/fa";
import {  UncubedOrderDisplayData, UncubedOrderDisplayHandler,
   remover,
   uncubedid,} from '../../../store/Store';
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import Swal from "sweetalert2";
import axios from 'axios';
import { FaPrint, FaFileExport } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import { properties } from '../../../Properties/Properties';

const getViewUncubedPoLineId = properties.Port + properties.getViewUncubedPoLineId
export default class UncubedDisplayList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          data2: [],
          uncubedDisplay: [],
          isuncubeddisplaydata: [],
          display:false,
          displayarr:[],
          edit:false,
          poArr:[],
          idLinePoCb: '',
          mDate: "",
          mUsername: '',
          idLinePo: '',
          errorCubing: "",
          idLogisticUnit:'', 
          idPo: '',
          idPrepLineN3: '',
          idReference: '',
          qtyPerPackage: '',
          qtyToPrep: '',
        };
      }
      componentDidMount(){
        console.log("calling edit datttaaaaaaaaaaaaaaaaa uzzzzzzmaaaaaa",UncubedOrderDisplayData.idPo)
       this.getPOlistByID(UncubedOrderDisplayData.idPo);
        if (UncubedOrderDisplayData.length === 0) {
          console.log("length is zero");
          this.state.data.push(this.props.isuncubeddisplaydata);
          console.log("after data pushed in table", this.state.data);
        } else {
          console.log("length is not zero", UncubedOrderDisplayData);
         this.state.data.push(UncubedOrderDisplayData)
          console.log("after data pushed in table", this.state.data);
        }
      }

      
        displayHandler = (props) => {
          console.log("ibzy display handler calling");
          UncubedOrderDisplayHandler(props);
          this.setState({
            uncubedDisplay: true,
            isuncubeddisplaydata: props,
            orderEdit: false,
          });
        };

        getPOlistByID = (id) => {
         
          console.log("get po by id");
          axios
              .post(getViewUncubedPoLineId + id)
              // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
              .then((response) => {
                  if (response.status === 200) {
                      console.log("resposne success getPOlistByID", response.data);
                     const data = []
                     data.push(response.data)
                      this.setState({
                        poArr:data
                          // message: "Data Saved Successfully",
          //                 idLinePoCb: response.data.idLinePoCb,
          // mDate: response.data.mDate,
          // mUsername: response.data.mUsername,
          // idLinePo: response.data.idLinePo,
          // errorCubing: response.data.errorCubing,
          // idLogisticUnit:response.data.idLogisticUnit, 
          // idPo: response.data.idPo,
          // idPrepLineN3: response.data.idPrepLineN3,
          // idReference: response.data.idReference,
          // qtyPerPackage: response.data.qtyPerPackage,
          // qtyToPrep: response.data.qtyToPrep,
                      });
  
  
                  }
              })
              .catch((error) => {
                  console.log(error);
              });
      };
  
       
      
        displayCloseHandler = (props) => {
          console.log("ibzy edit handler calling");
      
          this.setState({
            uncubedDisplay: false,
          });
        };

      
      backHandler=()=>{
        console.log("calling back handler for list")
        remover(uncubedid)
        this.props.displayCloseHandler()
      }
    render() {
        const columns = [
            {
        
            Header: "ID",
            accessor: "idPo",
          },
      {
        Header: "Preparation Order ID",
        accessor: "idPrepOrder",
      },
      {
        Header: "Preparation  order Line ID",
        accessor: "idLinePo",
      },
      {
        Header: "Reception Line ID ",
        accessor: "idPrepLineN3",
      },
      {
        Header: "Reference",
        accessor: "idReference",
      },
      {
        Header: "Logistoc Unit ID",
        accessor: "idLogisticUnit",
      },
      {
        Header: "Qty Per Package",
        accessor: "qtyPerPackage",
      },
      {
        Header: "Qty to be prepared",
        accessor: "qtyToPrep",
      },

      {
        Header: "Modified Date",
        accessor: "mDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.mDate === undefined
                ? ""
                : props.original.mDate === null
                ? ""
                : props.original.mDate === ""
                ? ""
                : props.original.mDate
                    .replace("T", " ")
                    .substring(0, props.original.mDate.lastIndexOf("."))}
            </span>
          );
        },
      },
      {
        Header: "Modified by",
        accessor: "mUsername",
      },

      
      {
        Header: "Error Description",
        accessor: "errorCubing",
        Cell: (props) => {
          return (
            <text>
        {props.original.errorCubing === "10001" ? <span>NO_TRAILER_ASSOCIATED</span> :
         props.original.errorCubing === "10002" ?<span>NUMBER_OF_TRAILER_SILO_INCORRECT</span> :
         props.original.errorCubing === "10003" ? <span>SEVERAL_TRAILER_TYPES</span>:
         props.original.errorCubing === "10004" ? <span>NO_SILO_SPECIFIED</span> :
         props.original.errorCubing === "10005" ? <span>SILO_NOT_EXISTING</span>:
         props.original.errorCubing === "10006" ? <span>PHYSICAL_GATE_NOT_EXISTING</span> :
         props.original.errorCubing === "10007" ? <span>LOGICAL_GATE_NOT_EXISTING</span>:
         props.original.errorCubing === "10008" ? <span>SEVERAL_LOGICAL_GATES</span>:
         props.original.errorCubing === "10009" ? <span>TRAILER_TYPE_NOT_EXISTING</span>:
         props.original.errorCubing === "10010" ? <span>PRODUCT_NOT_EXISTING</span>:
         props.original.errorCubing === "10011" ? <span>SEVERAL_INTERMEDIATE_MATERIAL_CODES</span>:
         props.original.errorCubing === "10012" ? <span>SEVERAL_LINES_FOR_A_SILO</span>:
         props.original.errorCubing === "10013" ? <span>SILO_SPECIFIED_TRAILER_TRUCK</span>:
         props.original.errorCubing === "10014" ? <span>SEVERAL_SAP_TRAILER_ID</span>:
         props.original.errorCubing === "10015" ? <span>SEVERAL_MULTI_MATERIAL_TYPE</span>:
         props.original.errorCubing === "1"  ? <span>NO_LUSITE_MATCHING</span>:
         props.original.errorCubing === "2"  ? <span>LU_NOT_MATCHING_QTY</span>:
         props.original.errorCubing === "3"  ? <span>LU_DOES_NOT_HAVE_MATCHING_LUSITE</span>:
         props.original.errorCubing === "4"  ? <span>LU_NO_PACKAGING</span>:
         props.original.errorCubing === "5"  ? <span>CUBING_LOCATION_NOT_FOUND</span>:
         props.original.errorCubing === "6"  ? <span>PRODUCT_NOT_FOUND</span>:
         props.original.errorCubing === "7"  ? <span>PACKAGING_NOT_FOUND</span>:
         props.original.errorCubing === "8"  ? <span>PO_SELECTION_NOT_FOUND</span>:
         props.original.errorCubing === "9"  ? <span>CHARACTERISTIC</span>:
         props.original.errorCubing === "10" ? <span>PREP_LOCATION_NOT_FOUND</span>:
         props.original.errorCubing === "11" ? <span>ALGO_NOT_FOUND</span>:
         props.original.errorCubing === "12" ? <span>DIMENSION_NOT_CORRECT</span>:
         props.original.errorCubing === "13" ? <span>WEIGHT_NOT_CORRECT</span>:
         props.original.errorCubing === "14" ? <span>PRODUCT_NOT_AVAILABLE</span>:
         props.original.errorCubing === "15" ? <span>PRODUCT_STATUS_INCORRECT</span>:
         props.original.errorCubing === "16" ? <span>QUANTITY_GT_MAX</span>
         :null}
              
            </text>
          );
        },
      },
      
    ];
        return (
            <React.Fragment>
 <Container
              className="themed-container"
               fluid={true}
                // style={{ border: "1px solid black", marginLeft: "14px" }}
        >
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
        <a style={{cursor:"pointer"}}>Uncubed Pos Search</a>
      </b>
    </u>{" "}
    &#62;
    <u>
      {" "}
      <b>
        {" "}
        <a style={{cursor:"pointer"}}onClick={this.backHandler}>Uncubed Pos List</a>
      </b>
    </u>{" "}
    &#62;
    <u>
      {" "}
      <b>
        {" "}
        <a style={{cursor:"pointer"}}>Uncubed Pos Lines </a>
      </b>
    </u>{" "}
  </span>
  <br />
  <div class="row-xs-6 bottom-row " style={{marginTop:"10px"}}>
                <FaPrint
                  
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaPrint>{" "}
<a style={{cursor:"pointer"}}>Print</a>{" "}
<FaFileExport
                 
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileExport>{" "}
<a style={{cursor:"pointer"}}>Export</a>{" "}


 </div>
       <div>
          <hr/>
          <ReactTable
            className="-striped -highlight "
            data={this.state.poArr.length === 0
              ? this.props.isuncubeddisplaydata : this.state.poArr
            }
            columns={columns}
            defaultPageSize={this.state.poArr.length === 0
              ? this.props.isuncubeddisplaydata.length : this.state.poArr}
            showPaginationTop= {true}
            filterable
          />
            </div>

            </Container>
              

            </React.Fragment>
        )
    }
}
