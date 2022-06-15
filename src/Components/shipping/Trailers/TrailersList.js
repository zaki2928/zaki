import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import {FaEdit, FaTrashAlt, FaList, FaAlignCenter, FaAlignJustify} from "react-icons/fa"
import TrailersEdit from './TrailersEdit';
import { TrailersData, remover, TrailersEditData, TrailersEditHandler, TrailersFilterHandler, TrailerCriteriaHandler, trailersid } from '../../../store/Store';
import { FaTruck } from "react-icons/fa";
import axios from "axios";


import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import Swal from "sweetalert2";
import { properties } from '../../../Properties/Properties';
import { TRAILER_EXIT } from '../../../store/RoleBased';

const TrailerExit = properties.Port + properties.TrailerExit
const listofTrailerExitViewbyFilter = properties.Port + properties.listofTrailerExitViewbyFilter

class TrailersList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          TrailsEdit: false,
          msg:''
        };
      }

      componentDidMount=()=>{
        if (TrailersData.length !== 0) {
          this.setState({
            data: TrailersData
          })
        }else{
          this.setState({
            data: this.props.data
          })
        }
          }
        
          backHandler=()=>{
            console.log("calling back handler for list")
            remover(trailersid)
            this.props.backHandler()
          }

          refreshHandler=()=>{
            console.log("refreshHandler calling")
            this.criteriaFilterMethod()
          }
        

     edithandler=(props)=>{
          this.setState({
              TrailsEdit: true,
          })
          TrailersEditHandler(props)
      }

      editClosehandler=()=>{
        this.setState({
            TrailsEdit: false,
        })
    }

    criteriaFilterMethod = () => {
      console.log("testtttttttttttttt  api ");
      const criteria = {
        listFilterBean: this.state.listFilterBean,
        limit: this.state.limit,
      };
      axios
        .post(listofTrailerExitViewbyFilter, this.state, {
          params: {
            limit: this.state.limit,
          },
        })
        .then((response) => {
          console.log("uzzzzzzmmmmmaaaaaa=========>")
          if (response.status === 200 && response.data.length !== 0) {
            console.log("resposne success ______________________________", response.data);
            this.setState({
              data: response.data,
              trailsList: true,
            });
            TrailersFilterHandler(response.data);
            TrailerCriteriaHandler(criteria);
          } else {
            this.setState({
              trailsList: true,
              data: [],
              
              
            });
          
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };



    trailerExitMethod = (props) => {
      console.log("Mission id isssss", props.idContainerShClient);
      Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to exit trailer?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "gray",
        cancelButtonColor: "gray",
        confirmButtonText: "Yes",
        msg: "",
      }).then((result) => {
        if (result.value) {
  
          axios
            .post(TrailerExit+props.idContainerShClient)
            .then((response) => {
              console.log(" data", response);
              if (response.status === 200) {
                console.log("response data 200 success");
                this.setState({
                  msg: "trailer exited Successfully",
                });
                this.componentDidMount();
              
                Swal.fire("trailer exited Successfully");
              } else {
                this.setState({
                  msg: "Invalid trailer ID",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    };
    // trailerExitModal=()=>{
    //   Swal.fire({
    //     title: 'Do you confirm the Release?',http://localhost:8080/ShippingTrailer/trailerExit/039999900147229218
    //     showDenyButton: true,
    //     showCancelButton: true,
    //     confirmButtonText: `Release`,
    //     denyButtonText: `Don't Release`,
    //   }).then((result) => {
    //     /* Read more about isConfirmed, isDenied below */
    //     if (result.isConfirmed) {
    //       Swal.fire('Saved!', '', 'success')
    //     } else if (result.isDenied) {
    //       Swal.fire('Changes are not saved', '', 'info')
    //     }
    //   })
    // }

    filterCaseInsensitive(filter, row) {
      const id = filter.pivotId || filter.id;
      if (row[id] !== null) {
        return (
          row[id] !== undefined ?
            String(row[id].toString().toLowerCase())
              .includes(filter.value.toString().toLowerCase())
            :
            true
        );
      }
    }

    render() {
      const { msg } = this.state;
        const columns = [
            {
                Header: "Edit",
                accessor: "Edit",
                filterable: false,
                Cell: (props) => {
                  return (
                    <FaEdit
                      style={{  cursor: "pointer" }}
                      color="primary"
                      onClick={() => this.edithandler(props.original)}
                    >
                      Edit
                    </FaEdit>
                  );
                },
              },
             
           {
                 Header: "ID",
                 accessor: "idContainerShClient",
           },
           {
             Header: "Company",
             accessor: "idCompany",
           },
           {
             Header: "SAP id",
             accessor: "sapId",
           },
           {
             Header: "Trailer identification",
             accessor: "trailerIdentification",
           },
           {
             Header: "RFID tag",
             accessor: "rfidTag",
           },
           {
             Header: "Driver name",
             accessor: "driverName",
           },

           {
               Header: "Trailer type",
               accessor: "trailerType",
               Cell: (props) => {
                return (
                  <text>
                 {props.original.trailerType === "" ? <span>Truck</span> : props.original.trailerType === "" ?<span>_20 feet container_</span> :
                  props.original.trailerType === "" ? <span>_40 Feet Container_</span>: props.original.trailerType === "" ?<span>_Bulk Truck_</span>:
                 props.original.trailerType ===""?  <span>_Sea Bulk_</span>:props.original.trailerType === "" ? <span>_20 and 40 feet mixed_</span> :null}
                  
                  </text>
                );
              },
             },
             {
               Header: "Preparation type",
               accessor: "trailerPreparationType",
               Cell: (props) => {
                return (
                  <text>
                  
                {props.original.trailerPreparationType === 100 ? <span>_STD_</span>:props.original.trailerPreparationType === 200 ? <span>_Plf_</span> :null}
                  
                  </text>
                );
              },
             },
             {
               Header: "Trailer number",
               accessor: "trailerNumber",
             },
             {
               Header: "Status",
               accessor: "statusClient",
               Cell: (props) => {
                return (
                  <text>
                 {props.original.statusClient === 200 ? <span>_created_</span> : props.original.statusClient === 350 ?<span>_Site Entrance Arrival_</span> :
               props.original.statusClient === 400 ? <span>_Gate Arrival_</span>:props.original.statusClient === 500 ? <span>_Begin Load</span> :
               props.original.statusClient === 4000 ? <span>_Closed_</span>:props.original.statusClient === 360 ? <span>_Stored_</span>:
               props.original.statusClient === 4000 ? <span>_Shipped To Be Confirmed_</span>:props.original.statusClient === 360 ? <span>_At Plf_</span>:
               props.original.statusClient === 4000 ? <span>_Shipped_</span>:props.original.statusClient === 360 ? <span>_Cancelled_</span>:
               props.original.statusClient === ""?<span>_Destroyed_</span>:props.original.statusClient === "0" ? <span>_order Linked_</span>:props.original.statusClient === "0"? <span>_Gate Allocated_</span>:null}
                  </text>
                );
              },

             },
             {
               Header: "Preparation order",
               accessor: "idPrepOrder",
             },
             {
               Header: "Recording gate",
               accessor: "idRecordingGate",
             },

             {
               Header: "Weighing status",
               accessor: "statusWeighing",
               Cell: (props) => {
                return (
                  <text>
                    {props.original.statusWeighing === 400 ? <span>_Not To Be Weighed_</span> 
       :null
                    }
                  </text>
                );
              },

             },
             {
               Header: "Reception line ID",
               accessor: "idPrepLineN3",
             },
             {
               Header: "Position in consolidation area",
               accessor: "consolidationAreaPosition",
             },
             {
               Header: "Expected container number",
               accessor: "expectedContainerNumber",
             },
             {
               Header: "Seal",
               accessor: "seal",
             },

             {
                Header: "Silo box preparation",
                accessor: "idContainerPrpSilo",
              },
              {
                Header: "Incoming date",
                accessor: "incomingDate",
              },
              {
                Header: "Outgoing date",
                accessor: "outgoingDate",
              },
             {
               Header: "Version",
               accessor: "versionLock",
             },
             {
               Header: "Modified Date",
               accessor: "mDate",
               Cell: (props) => {
                return (
                  <span>
                    {props.original.mDate !== null
                      ? props.original.mDate.substring(0, 10)
                      : ""}
                    &nbsp;
                    {props.original.mDate !== null
                      ? props.original.mDate.substring(14, 19)
                      : ""}
                  </span>
                );
              },
             },
             {
               Header: "Modified by",
               accessor: "mUsername",
             },
             {
                Header: "Trailer no",
                accessor: "idContainerSH",
              },
              {
                Header: "Shipment no",
                accessor: "idship",
              },
              {
                Header: "Carrier",
                accessor: "idCarrier",
              },  
              {
                Header: "Dispatch mode",
                accessor: "idDm",
              },
              {
                Header: "Palletisation type",
                accessor: "typePalletisation",
                Cell: (props) => {
                  return (
                    <text>
                     {props.original.typePalletisation === "-1" ? <span>_Non Relevant_</span> :props.original.typePalettisation === -1 ?<span>Trailer</span> :
                        
                        props.original.typePalletisation === 0 ? <span>_Without_</span>:props.original.typePalletisation === 0 ? <span>Palettisation</span> :null}
                      
                    </text>
                  );
                },
              },
              {
                Header: "Palletisation type father",
                accessor: "typePalFather",
                Cell: (props) => {
                  return (
                    <text>
                     {props.original.typePalFather === "-1" ? <span>_Non Relevant_</span> :props.original.typePalFather === -1 ?<span>Trailer</span> :
                        
                        props.original.typePalFather === 0 ? <span>_Without_</span>:props.original.typePalFather === 0 ? <span>Palettisation</span> :null}
                      
                    </text>
                  );
                },

              },
             {
               Header: "Gate",
               accessor: "idGateLoaded",
             },
             {
                Header: "Single PO ID",
                accessor: "idPoSingle",
              },
              {
                Header: "Single wave ID",
                accessor: "idWaveSingle",
              },
              {
                Header: "Pallet status",
                accessor: "statusSh",
                Cell: (props) => {
                  return (
                    <text>
                      {props.original.statusSh === "1200" ? <span>_Cancelled_</span> :props.original.statusSh === -0 ?<span>Created</span> :
                        
                        props.original.statusSh === 1255 ? <span>_Shipped To be Confirmed_</span>:null}
                      {/* {props.original.statusSh === "4000" ? <span>_Cancelled_</span>  */}
         {/* :null */}
                      
                    </text>
                  );
                },

              },  
              {
                Header: "Warehouse",
                accessor: "idWarehouse",
              },
              {
                Header: "Container no",
                accessor: "idContainer",
              },
              {
                Header: "Status",
                accessor: "statusContainer",
                Cell: (props) => {
                  return (
                    <text>
                   {props.original.statusContainer === 0 ? <span>Validated</span> : props.original.statusContainer === 350 ?<span>Destroyed</span>
                //  props.original.statusContainer === 400 ? <span>_Gate Arrival_</span>:props.original.statusContainer === 500 ? <span>_Begin Load</span> 
                //  props.original.statusContainer === 4000 ? <span>_Closed_</span>:props.original.statusContainer === 360 ? <span>_Stored_</span>:
                //  props.original.statusContainer === 4000 ? <span>_Shipped To Be Confirmed_</span>:props.original.statusContainer === 360 ? <span>_At Plf_</span>:
                //  props.original.statusContainer === 4000 ? <span>_Shipped_</span>:props.original.statusContainer === 360 ? <span>_Cancelled_</span>:
                //  props.original.statusContainer === ""?<span>_Destroyed_</span>:props.original.statusContainer === "0" ? <span>_order Linked_</span>:props.original.statusContainer === "0"? <span>_Gate Allocated_</span>:null}
                :null}

                    </text>
                  );
                },
              },
             {
               Header: "Type",
               accessor: "typeContainer",
               Cell: (props) => {
                return (
                  <text>
                    {props.original.typeContainer === "-1" ? <span>_trailer_</span> 
       :null
                    }
                  </text>
                );
              },

             },
             {
                Header: "Parent container no",
                accessor: "idContainerFather",
              },
              {
                Header: "Packaging ID",
                accessor: "idPackaging",
              },
              {
                Header: "Location",
                accessor: "idLocation",
                Cell: (props) => {

                  return <div>{
    
                    props.original.idLocation != null
    
                        ? props.original.idLocation.replace("19@", "")
    
                        : ""}</div>;
    
                },
              },  
              {
                Header: "Height(m)",
                accessor: "height",
              },
              {
                Header: "Weight(kg)",
                accessor: "weight",
              },
              {
                Header: "Preparation order status",
                accessor: "statusPo",
                Cell: (props) => {
                  return (
                    <text>
                {props.original.statusPo === 200 ? <span>_Cubic error_</span> : props.original.statusPo === 350 ?<span>_Launchable_</span> :
                 props.original.statusPo === 400 ? <span>Launched</span>:props.original.statusPo === 500 ? <span>Prepared</span> :
                 props.original.statusPo === 4000 ? <span>Cancelled</span>:props.original.statusPo === 360 ? <span>Selected</span> :null}
                    
                    </text>
                  );
                },
              },
             {
               Header: "PO shipping status",
               accessor: "statusShipping",
               Cell: (props) => {
                return (
                  <text>
              {props.original.statusShipping === -1 ? <span>Created</span> : props.original.statusShipping === 1260 ?<span>_At PLF_</span> :
               props.original.statusShipping === 0 ? <span>_Awaiting Shipment In Stock_</span>:props.original.statusShipping === 0 ? <span>Awaiting Shipment</span> :
               props.original.statusShipping === 1250 ? <span>_Shipped to be confirmed_</span>:props.original.statusShipping === 0 ? <span>Shipped</span> :
               props.original.statusShipping === 4000 ? <span>Cancelled</span>:props.original.statusShipping === 0 ? <span>_Palletised_</span> :null}
                    
                  </text>
                );
              },
             },
             {
              Header: "Exit",
              show: TRAILER_EXIT === 2? true: false,
              // accessor: "Edit",
              filterable: false,
              Cell: (props) => {
                return (
                  <FaTruck
                    style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
                    color="primary"
                    onClick={() => this.trailerExitMethod(props.original)}
                  >
                    Edit
                  </FaTruck>
                );
              },
            },
           
         ];
        return (
          
            <React.Fragment>
               {this.state.TrailsEdit === true || TrailersEditData.length !== 0 ?
               <TrailersEdit editClosehandler={this.editClosehandler}/> :
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
                    &#8680;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}} onClick={this.backHandler}>Trailers Filter</a>
                      </b>
                    </u>
                    &#8680;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}} >Trailers List</a>
                      </b>
                    </u>
                    <button
              onClick={this.refreshHandler}
              style={{
                float: "right",
                cursor: "pointer",
                height: "30px",
                width: "60px",
                borderRadius: "5px",
                }}
            >
              <text style={{ fontSize: "15px", fontWeight: "bold" }}>
                Refresh
              </text>
            </button>
                  </span>
                  <br />
            <div>
            <b>
              <span
                style={{
                  color:
                    this.state.msg === "Trailer exit successfully!!!"
                      ? "green"
                      : "green",
                }}
              >
                <h6>{msg}</h6>
              </span>
            </b>
            </div>
            <ReactTable
              className="-striped -highlight "
              data={this.state.data.length === 0
                ? this.props.data : this.state.data
              }
              columns={columns}
              defaultPageSize={10}
              showPaginationTop= {true}
              filterable
              defaultFilterMethod={this.filterCaseInsensitive}
            />  
            </div>   
            }       
        </React.Fragment>

        );
    }
}

export default TrailersList;