import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import {  } from "../../../store/Store";
import Box_Edit from "../Box/Box_Edit";
// import {BoxData, BoxEditHandler,BoxEditdata, remover,} from "../../../store/Store";
import {prepration_boxData, prepration_boxEditDataHandler,prepration_boxEditData, remover,prepration_boxCriteria,prepration_boxid} from "../../../store/Store";

import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import Swal from "sweetalert2";
import { FaEdit } from "react-icons/fa";
import { properties } from '../../../Properties/Properties';
import axios from "axios";



const getListOfPreparationBoxesViewBeansByFilterCriteria = properties.Port + properties.getListOfPreparationBoxesViewBeansByFilterCriteria


class Box_List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data2: [],
      boxorderEdit: false,
      


    };

    // this.toggle = this.toggle.bind(this);

  }

  // toggle(tab) {
  //   if (this.state.activeTab != tab) {
  //     this.setState({
  //       activeTab: tab,
  //     });
  //   }
  // }



  saveHandler(){
    Swal.fire({
        title: 'Confirmation?',
        text: "Do u really want to delete wave details!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'gray',
        cancelButtonColor: 'gray',
        confirmButtonText: 'Yes, do it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            
            'Done',
            'success'
          )
        }
      })    
}

  componentDidMount = () => {
    console.log("com calling from list page==>",prepration_boxData)
    console.log("com calling from list page props==>",this.props.data)
    if (prepration_boxData.length !== 0) {
      this.setState({
        data: prepration_boxData
      })
    }else{
      this.setState({
        data: this.props.data
      })
    }
      }

      backkHandler=()=>{
        console.log("calling back handler for list")
        remover(prepration_boxid)
        this.props.backHandler()
      }
    
      editHandler=(props)=>{
        console.log("check props dataaaaaa", props)
          this.setState({
            boxorderEdit: true,
              
          })
          this.state.data2.push(props)
          prepration_boxEditDataHandler(props)
      }
  EditCloseHandler = (props) => {
    console.log("Uzma edit handler calling");

    this.setState({
      boxorderEdit: false,
    });
  };

  refreshhandler = () => {
    console.log("referesh handler calling");
    this.criteriaFilterMethod();
  };

  criteriaFilterMethod = () => {
    console.log("testtttttttttttttt  api ", prepration_boxCriteria);
    
    axios
      .post(getListOfPreparationBoxesViewBeansByFilterCriteria, prepration_boxCriteria, {
        params: {
          limit: prepration_boxCriteria.limit,
        },
      })

      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
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
    const columns = [
     
      {
        Header: "Edit",
        accessor: "Edit",
        filterable: false,
        Cell: (props) => {
          return (
            <FaEdit
           
              onClick={() => this.editHandler(props.original)}
            >
              Edit
            </FaEdit>
          );
        },
      },
      {
        Header: "Box",
        accessor: "idContainerPRP",
        // Cell: (props) => {
        //   return (
        //     <text>
        // {props.original.statusShip === -1 ? <span>Created</span> : props.original.statusShip === 0 ?<span>_Error_</span> :
        //  props.original.statusShip === 0 ? <span>_Pre Calculated_</span>:props.original.statusShip === 0 ? <span>_calculated_</span> :
        //  props.original.statusShip === 0? <span>_Awaiting Stock to Preapare_</span>:props.original.statusShip === 0 ? <span>_Awaiting Preparation_</span> :
        //  props.original.statusShip === 0 ? <span>_In Preparation_</span>:props.original.statusShip === 0 ? <span>_Prepared_</span> :
        //  props.original.statusShip === 0 ? <span>Cancelled</span>:props.original.statusShip === 0 ? <span>_Deleted_</span> :null}
              
        //     </text>
        //   );
        // },
      },
      {
        Header: "Box Preparation warehouse",
        accessor: "idwarehousePRP",
      },
      {
        Header: "Pacakging ID",
        accessor: "idPackaging",
      },

      {
        Header: "Volume (dm3)",
        accessor: "volume",
      },
      {
        Header: "Preparation Algorithm",
        accessor: "typeAlgo",
        Cell: (props) => {
          return (
            <text>
              {props.original.typeAlgo === "400" ? <span>Pallet Box</span> 
 :null
              }
            </text>
          );
        },


      },
      {
        Header: "Container no in po",
        accessor: "containerNumPo",
      },
      {
        Header: "Status",
        accessor: "statusPrep",
        Cell: (props) => {
          return (
            <text>
              {props.original.statusPrep === "100" ? <span>Created</span> :
              props.original.statusPrep === "390" ? <span>_Awaiting stock to prepare_ </span>:
               props.original.statusPrep === "500" ? <span>_PREPARED_ </span> 
 :null
              }
            </text>
          );
        },
      },
      {
        Header: " Shipping Status",
        accessor: "statusShip",
        Cell: (props) => {
          return (
            <text>
        {props.original.statusShip === "-1" ? <span>_NonRelevant_</span> : props.original.statusShip === 355 ?<span>_Error_</span> :
         props.original.statusShip === 370 ? <span>_Pre Calculated_</span>:props.original.statusShip === 380 ? <span>_calculated_</span> :
         props.original.statusShip === 390? <span>_Awaiting Stock to Preapare_</span>:props.original.statusShip === 400 ? <span>_Awaiting Preparation_</span> :
         props.original.statusShip === 424 ? <span>_In Preparation_</span>:props.original.statusShip === 500 ? <span>_Prepared_</span> :
         props.original.statusShip === 4000 ? <span>Cancelled</span>:props.original.statusShip === 4500 ? <span>_Deleted_</span>:
         props.original.statusShip === "1000" ? <span>_AWAITING PALLATISED_</span>:  props.original.statusShip === "1100" ? <span>_ PALLATISED_</span>:
         props.original.statusShip === "1200" ? <span>_AWAITING SHIPPMENT_</span>: props.original.statusShip === "1255" ? <span>_SHIIPPED AT PLF_</span>  :null}
              
            </text>
          );
        },
//         Cell: (props) => {
//           return (
//             <text>
//               {props.original.statusShip === -1 ? <span>Created</span> 
//  :null
//               }
//             </text>
//           );
//         },
      },
      // {
      //   Header: "Shipping Status",
      //   accessor: "statusShip",
      // },
      {
        Header: "Preparation Mode",
        accessor: "prepMode",
        Cell: (props) => {
          return (
            <text>
              {props.original.prepMode === "200" ? <span>_Stock_</span> 
 :null
              }
            </text>
          );
        },
      },
      {
        Header: "Preparation  order id",
        accessor: "idPo",
      },
      {
        Header: "Preparation order",
        accessor: "idPrepOrder",
      },
      {
        Header: "Preparation order Customer Id",
        accessor: "idPrepOrderCustomer",
      },
      {
        Header: "Preparation order L3 ID",
        accessor: "idPrepOrderL3",
      },
      {
        Header: "Preparation order status",
        accessor: "statusPo",
        Cell: (props) => {
          return (
            <text>
           {props.original.statusPo === 200 ? <span>_Cubic error_</span>: props.original.statusPo === 424 ? <span>_In preparation_</span> : props.original.statusPo === 350 ?<span>_Launchable_</span> :
         props.original.statusPo === 400 ? <span>Launched</span>:props.original.statusPo === 500 ? <span>Prepared</span> :
         props.original.statusPo === 4000 ? <span>Cancelled</span>:props.original.statusPo === 360 ? <span>Selected</span> :null}
            
            </text>
          );
        },
      },
      {
        Header: "Preparation order type",
        accessor: "typePo",
        Cell: (props) => {
          return (
            <text>
              {props.original.typePo === 100 ? <span>_Standard_</span> 
 :null
              }
            </text>
          );
        },
      },

      {
        Header: "Stuffing type",
        accessor: "typePoStuffing",
        Cell: (props) => {
          return (
            <text>
           {props.original.typePoStuffing === 100 ? <span>_Stuffing Affiliation_</span> : props.original.typePoStuffing === 0 ?<span>_Non Plf_</span> :
            
          props.original.typePoStuffing === 200 ? <span>_stuffing at Plf_</span> :null}
            
            </text>
          );
        },
      },
      {
        Header: "Link",
        accessor: "plfLink",
      },
      {
        Header: "OBD1",
        accessor: "plfObd1",
      },
      {
        Header: "Preparation order warehouse",
        accessor: "idwarehousePRP",
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
        accessor: "musername",
      },
     
    ];
    return (
      <React.Fragment>
        {this.state.boxorderEdit === true || prepration_boxEditData.length !== 0 ? (
          <Box_Edit EditCloseHandler={this.EditCloseHandler}data2={this.state.data2}/>)
        : (

            <div>
            <IoArrowBackCircleSharp onClick={this.backkHandler}/>
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
                    <a style={{cursor:"pointer"}}onClick={this.backkHandler}>Boxes search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}}>Boxes Management </a>
                  </b>
                </u>
                </span>
                <button
              onClick={this.refreshhandler}
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

                <ReactTable
              className="-striped -highlight "
              // data={this.state.data}
              data={this.state.data.length === 0
                ? this.props.data : this.state.data
              }
              columns={columns}
              defaultPageSize={5}
              showPaginationTop= {true}
              filterable
              defaultFilterMethod={this.filterCaseInsensitive}
            />
              
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Box_List;
