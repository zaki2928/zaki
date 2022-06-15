import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { FaEdit, FaFileExport, FaPrint } from 'react-icons/fa';
import { Container, Row, Col, Button } from "reactstrap";
import {StorageMissionData ,StorageMissionEditHandler,StorageMissionEditdata,remover } from "../../../../store/Store";
import Storage_Mission_Edit from "../display/Storage_Mission_Edit";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaCog, FaSdCard } from 'react-icons/fa';
import { FaRegShareSquare } from 'react-icons/fa';
import { FaRegListAlt } from 'react-icons/fa';
import jsPDF from "jspdf";
import "jspdf-autotable";

class Storage_Mission_List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      missionEdit : false,
      missionEditArray :[]
    };
  }

  componentDidMount = () => {
    if (StorageMissionData.length === 0) {
      this.setState({
        data: this.props.data,
      });
    } else {
      this.setState({
        data: StorageMissionData,
      });
    }

  }

  backHandler=()=>{
    console.log("calling back handler for list")
    // this.setState({missionEdit:false})
    remover("storagemissionid")
    this.props.backHandler()
  }


  exportPDF = () => {
    console.log("export pdf callingn");
    const unit = "pt";
    const size = "A1"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 1100;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(13);

    const title = "SIMPANA";

    const headers = [
      [
        "ID",
        "Mission No",

        "Index",
        "Mode",
        "Printable",
        "Movement type",
        "Container origin",
        "Origin Location",
        "Destination location",
        "Mission class",
        "Refrence class mission",
        "Quantity",
        "Priority",
        "User treat",
        "Status",
        "Creation date",
        "Modified the",
        "Modified by",
        "Version",
      ],
    ];

    const data1 = this.state.data.map((elt) => [
      elt.idMission,
      elt.numMission,
      elt.missionIndex,
      elt.missionMode,
      elt.printable,
      elt.typeMvt,
      elt.idResaContainer,
      elt.idLocation,
      elt.idLocationStkDisplay,
      elt.missionClass,
      elt.reference,
      elt.modifiedby,
      elt.priority,
      elt.statusMission,
      elt.creationDate,
      elt.mDate,
      elt.mUsername,
      elt.versionLock,
      
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data1,
      setFontSize: 2,
    };

    doc.text(title, marginLeft, 30);
    // doc.setFontSize(1);
    doc.autoTable(content);
    doc.save("report.pdf");
  };


  editClosehandler=()=>{
    this.setState({
      missionEdit: false,
    })
}

  editHandler=(props)=>{
    console.log("check props dataaaaaa", props)
    StorageMissionEditHandler(props)
      this.setState({
        missionEdit: true,
          
      })
      this.state.missionEditArray.push(props)
      
     
  }

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
            
            // accessor: "Edit",
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
            Header: "ID",
            accessor: "idMission",
          },
          {
            Header: "Mission No",
            accessor: "numMission",
          },
          {
            Header: "Index",
            accessor: "missionIndex",
          },
    
          {
            Header: "Mode",
            Cell: (props) => {
              return (
                <text>
                  {props.original.missionMode === 100 ? <span>Manual</span> : props.original.missionMode === 200 ?<span>Automatic</span> 
                    :null}
                </text>
              );
            },
          },
          {
            Header: "Printable",
            accessor: "printable",
            Cell: (props) => {
              return (
                <text>
                  {props.original.printable === 1 ? <span>Yes</span> : props.original.missionMode === 0 ?<span>No</span> 
                    :null}
                </text>
              );
            },
          },
          {
            Header: "Movement type",
           

            Cell: (props) => {
              return (
                <text>
                  {props.original.typeMvt === 2 ? <span>Container Transfer</span> : props.original.typeMvt === 3 ?<span>Quantity Picking</span> 
                    :null}
                </text>
              );
            },
          },
          {
            Header: "Container choice type",
            accessor: "typeContainerChoice",


            Cell: (props) => {
              return (
                <text>
                  {props.original.typeContainerChoice === 2 ? <span>Free</span> : props.original.typeContainerChoice === 1 ?<span>Imposed</span> 
                    :null}
                </text>
              );
            },
          },
          {
            Header: "Container origin",
            accessor: "idResaContainer",


          },
          {
            Header: "Origin Location",
            accessor: "idLocation",
            Cell: (props) => {
              return <div>{
                props.original.idLocation != null
                    ? props.original.idLocation.replace("19@", "")
                    : ""}</div>;
            },
          },
          {
            Header: "Destination location",
            accessor: "idLocationStkDisplay",
            Cell: (props) => {
              return <div>{
                props.original.idLocationStkDisplay != null
                    ? props.original.idLocationStkDisplay.replace("19@", "")
                    : ""}</div>;
            },
          },

          {
            Header: "Destination choice type",
            accessor: "typeDestinationChoice",
            Cell: (props) => {
              return (
                <text>
                  {props.original.typeDestinationChoice === 2 ? <span>Free</span> : props.original.typeDestinationChoice === 1 ?<span>Imposed</span> 
                    :null}
                </text>
              );
            },
          },

          {
            Header: "Container type",
            accessor: "typeContainer",
            Cell: (props) => {
              return (
                <text>
                  {props.original.typeContainer === 100 ? <span>_pallet_</span> : props.original.typeContainer === 200 ?<span>not found</span> 
                    :null}
                </text>
              );
            },
          },

          {
            Header: "Mission class",
            accessor: "missionClass",
            Cell: (props) => {
              return (
                <text>
                  {props.original.missionClass === 1 ? <span>_Order_</span> : props.original.missionClass === 2 ?<span>_Preparation_</span> :
                   props.original.missionClass === 3 ? <span>Stock to Prepare</span>:props.original.missionClass === 4 ? <span>_Replishment_</span> :
                   props.original.missionClass === 5 ? <span>Preparation</span>:props.original.missionClass === 6 ? <span>_Internal Movement</span> :
                   props.original.missionClass === 7 ? <span>Box Replacement_</span>:props.original.missionClass === 8 ? <span>_Goods In</span> :
                   props.original.missionClass === 9 ?<span>_Destruction_</span>:
                   null}
                </text>
              );
            },
          },
          {
            Header: "Refrence class mission",
            accessor: "reference",
          },
          {
            Header: "Quantity",
            accessor: "modifiedby",
          },
    
    
          {
            Header: "Priority",
            accessor: "priority",
          },
          {
            Header: "User treat",
            accessor: "modifiedby",
          },
          {
            Header: "Status",
            accessor: "statusMission",
            Cell: (props) => {
              return (
                <text>
                  {props.original.statusMission === 100 ? <span>Created</span> : props.original.statusMission === 200 ?<span>Executed</span> :
                   props.original.statusMission === 300 ? <span>Executable</span>:props.original.statusMission === 400 ? <span>Cancelled</span> 
                   :null}
                </text>
              );
            },
          },
          {
            Header: "Creation date",
            accessor: "creationDate",
            Cell: (props) => {
              return (
                <span>
                  {props.original.creationDate !== null
                    ? props.original.creationDate.substring(0, 10)
                    : ""}
                  &nbsp;
                  {props.original.creationDate !== null
                    ? props.original.creationDate.substring(14, 19)
                    : ""}
                </span>
              );
            },
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
         
    
         
 
    ];
    return (
      <React.Fragment>
        {this.state.missionEdit === true || StorageMissionEditdata.length !== 0 ?
              (<Storage_Mission_Edit editClosehandler = {this.editClosehandler} missionEditArray={this.state.missionEditArray}/>) :
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
                    <a onClick={this.backHandler}>Mission Search</a>
                  </b>
                </u>{""}
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Mission Display</a>
                  </b>
                </u>
              </span>
              <br />
              <div
                style={{
               
                }}
              >
                <u style={{ float:"right", marginRight:"40px" }}><a >Refresh</a>{" "}</u>
                {/* <b href="#" style={{ marginLeft: "950px" }}>Refresh</b> */}
              </div>
              <div class="row-xs-6 bottom-row ">
        <FaCog
              
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaCog>{" "}
{/* <button >Configure</button> */}
<a >Configure List</a>{" "}
{/* <button class="btn5 some-margin"></button> */}
<FaRegShareSquare
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaRegShareSquare>{" "}
                <a >Reset Sort</a>{" "}
                <FaPrint
               
               onClick={this.exportPDF}
                >
                  
                </FaPrint>{" "}
<a >Print</a>{" "}
<FaFileExport
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileExport>{" "}
<a >Export</a>
 </div>
        <ReactTable
          className="-striped -highlight "
          //   data={this.state.data}
          data={this.state.data.length === 0
            ? this.props.data
            : this.state.data
            }
          columns={columns}
          defaultPageSize={5}
          showPaginationTop={false}
          filterable
          defaultFilterMethod={this.filterCaseInsensitive}

        />
        </div>
  }
      </React.Fragment>
    );
  }
}

export default Storage_Mission_List;
