import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import Stockcontentedit from "./Stockcontentedit";
import {
  StockcontentData,
  remover,
  SetStockcontentedit,
  Stockcontenteditdata,StockcontentCriteria,StockcontentDataHandler,Stockcontentid,StockSnapDisplayData,nesteddisplayreferencedata
} from "../../../../store/Store";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
  IoInformation,
  IoInformationCircle,
} from "react-icons/io5";
import { FaPrint, FaFileExport, FaEdit } from "react-icons/fa";
import { Label, Input } from "reactstrap";
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { properties } from "../../../../Properties/Properties";
import axios from "axios";
const getlistofcontentonlystatus =
  properties.Port + properties.getlistofcontentonlystatus;
  const getlistofContentbyFilterCriteria = properties.Port + properties.getlistofContentbyFilterCriteria;
  const listOfContentEntities=properties.Port + properties.listOfContentEntities;

class Stockcontentlist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      isEdit: false,
      contentArr:[]
    };
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
        "Batch",
        "content_status_id",

        "DESCRIPTION",
        "id_Company",
        "id_Container",
        "id_Content",
        "id_Location",
        "id_Logistic_unit",
        "id_Packaging",
        "id_Product",
        "id_Reference",
        "qty_Expected",
        "qty_Lu",
        "qty_Reserved",
        "quantity",
        "status_Container",
        "status_MVT",
        "type_Container",
        "type_Content",
        "version_Lock",
        "z_Grade",
        "z_Inter_material_code",
      ],
    ];

    const data1 = this.state.data.map((elt) => [
      elt.batch,
      elt.content_status_id,
      elt.description,
      elt.id_Company,
      elt.id_Container,
      elt.id_Content,
      elt.id_Location,
      elt.id_Logistic_unit,
      elt.id_Packaging,
      elt.id_Product,
      elt.id_Reference,
      elt.qty_Expected,
      elt.qty_Lu,
      elt.qty_Reserved,
      elt.quantity,
      elt.status_Container,
      elt.status_MVT,
      elt.type_Container,
      elt.type_Content,
      elt.version_Lock,
      elt.z_Grade,
      elt.z_Inter_material_code,
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

  validateHandler() {
    Swal.fire({
      title: "Confirmation",
      text: "Do you confirm the modification?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  componentDidMount = () => {
    console.log("testinggggggggggggggggggggggggggg contentstatusData -----",StockcontentData)
   
    if(StockcontentData!==null && StockcontentData !== ""){
      console.log("testinggggggggggggggggggggggggggg contentstatusData======",StockcontentData)
     
     this.state.data.push(StockcontentData)
    //  console.log("table data",this.state.data)
    }
     if (nesteddisplayreferencedata !== null && nesteddisplayreferencedata !== "") {
       console.log("testinggggggggggggggggggggggggggg nesteddisplayreferencedata",nesteddisplayreferencedata)
       this.setState({
        idRefrence: StockSnapDisplayData .idRefrence,
       
       });
       this.getstocksnapDisplayByidReference(StockSnapDisplayData .idRefrence);
     }
 
    // console.log("shahidddddddddddddd", StockcontentData);
    // if (StockcontentData.length !== 0) {
    //   console.log(StockcontentData.length);
    //   this.setState({
    //     data: StockcontentData,
    //   });
    // } else {
    //   this.setState({
    //     data: this.props.data,
    //   });
    // }
  };

  editcloseHandler = () => {
    console.log("list");
    this.setState({
      isEdit: false,
    });

    remover("Stockcontenteditdata");
  };

  editHandle = (props) => {
    this.setState({
      isEdit: true,
    });
    SetStockcontentedit(props);
  };

  contentStatus=(id)=>{
  
    for(let i=0;i<this.state.contentArr.length;i++){
      if(this.state.contentArr[i].content_Status_id===id){
        return this.state.contentArr[i].description;
      }
    }
    
  }
  getstocksnapDisplayByidReference=(id)=>{

    console.log(" calling getdisplaydata by refernce ======>>>>>>>>>>>>>>>>>", id);

    axios
      .post(listOfContentEntities+ id)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success stock content dadadadadddadaddadda ", response.data);
          this.setState({
            data: response.data,
          });
        //   nesteddisplayreferenceHandler(response.data)
        //   this.props.additem("Content Statuses");

          // nesteddisplayreferenceHandler(response.data)
          // this.setState({
          //   orderDisplay: true,
      
          // })  
              }
      })
      .catch((error) => {
        console.log(error);
      });
  
}

  getlistofcontentonlystatus = () => {

    axios
      .get(getlistofcontentonlystatus)
      .then((response) => {
        if (response.status === 200) {
          
          this.setState({
            contentArr: response.data,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  refreshhhHandler = () => {
    console.log("refresh button pressed")
    this.refreshHandler()
  }


  refreshHandler = () => {
    axios.post(getlistofContentbyFilterCriteria, StockcontentCriteria, {
      params:{
        limit: StockcontentCriteria.limit
      },
    })
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
          })
          StockcontentDataHandler(response.data);
        } else {
          this.setState({
            data: [],
          });
          StockcontentDataHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }
  backnav = () =>{
    console.log("calling back handler for list");
    remover("Contents")
    this.props.backHandler()
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
        filterable: false,
        Cell: (props) => {
          return (
            <FaEdit style={{cursor:"pointer"}} onClick={() => this.editHandle(props.original)}>
              Edit
            </FaEdit>
          );
        },
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Content no",
        accessor: "id_Content",
      },
      {
        Header: "Container no",
        accessor: "id_Container",
      },
      {
        Header: "Location",
        //accessor: "id_Location",
        Cell: (props) => {
          return <div>{
            props.original.id_Location != null
                ? props.original.id_Location.replace("19@", "")
                : ""}</div>;
        },
      },
      {
        Header: "Content status",
        accessor: "content_status_id",
        Cell:(props)=>{
          return(
            <div>{this.contentStatus(props.original.content_status_id)}</div>
          )
        }
      },
      {
        Header: "type",
        accessor: "type_Content",
        Cell:(props)=>{
          return(
            <text>
              {
                props.original.type_Content===100?<span>Stock</span>:
                props.original.type_Content===200?<span>Picking</span>:
                props.original.type_Content===300?<span>Picking Dynamic</span>:
                props.original.type_Content===600?<span>Prepration</span>:null
              }
            </text>
          )
        }
        
      },
      {
        Header: "Container status",
        accessor: "status_Container",
        Cell:(props)=>{
          return(
            <text>
              {
                props.original.status_Container===50?<span>In progress</span>:
                props.original.status_Container===100?<span>Created</span>:
                props.original.status_Container===500?<span>Validated</span>:
                props.original.status_Container===800?<span>800</span>:null
                
              }
            </text>
          )
        }
      },
      {
        Header: "Product unit",
        accessor: "id_Logistic_unit",
      },
      {
        Header: "Container type",
        accessor: "type_Container",
        Cell:(props)=>{
          return(
            <text>
              {
                props.original.status_Container===100?<span>Pallet</span>:
                props.original.status_Container===200?<span>Product</span>:
                props.original.status_Container===400?<span>Shipping Pallet</span>:
                props.original.status_Container===500?<span>Box</span>:
                props.original.status_Container===510?<span>Box Shipping</span>:
                props.original.status_Container===600?<span>Location</span>:
                props.original.status_Container===700?<span>Load Collection</span>:
                props.original.status_Container===710?<span>Unload Collection</span>:
                props.original.status_Container===800?<span>Trailer</span>:null
                
              }
            </text>
          )
        }
      },
      {
        Header: "Product company",
        accessor: "id_Company",
      },
      {
        Header: "Product ID",
        accessor: "id_Product",
      },
      {
        Header: "Product",
        accessor: "id_Reference",
      },
      {
        Header: "Product description",
        accessor: "description",
      },
      {
        Header: "Quantity unit",
        accessor: "qty_Lu",
      },
      {
        Header: "Intermediate material code",
        accessor: "z_Inter_material_code",
      },
      {
        Header: "Grade",
        accessor: "z_Grade",
      },
      {
        Header: "Logistic unit ID",
        accessor: "id_Logistic_unit",
      },
      {
        Header: "Batch",
        accessor: "batch",
      },
      {
        Header: "Packaging ID",
        accessor: "id_Packaging",
      },
      {
        Header: "Version",
        accessor: "version_Lock",
      },
     
      {
        Header: "Modified by",
        accessor: "mUsername",
      },
      {
        Header: "Reserved quantity",
        accessor: "isAvailable",
      },
      {
        Header: "Expected quantity",
        accessor: "qty_Expected",
      },
      {
        Header: "Version",
        accessor: "version_Lock",
      },
      {
        Header: "Modified Date",
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
        Header: "Movement status",
        accessor: "status_MVT",
        Cell:(props)=>{
          return(
            <text>
              {
                props.original.status_Container===100?<span>Created</span>:
                props.original.status_Container===400?<span>Movement in wait</span>:
                props.original.status_Container===500?<span>Closed</span>:null
                
              }
            </text>
          )
        }
      },
    ];
    return (
      <React.Fragment>
        {this.state.isEdit === true || Stockcontenteditdata !== null ? (
          <Stockcontentedit editcloseHandler={this.editcloseHandler} />
        ) : (
          <div>
            <div>
              <span>
                <IoArrowBackCircleSharp
                  onClick={this.backnav}
                />
                <IoArrowForwardCircleSharp />
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
                    <a
                      style={{ cursor: "pointer" }}
                      onClick={this.backnav}
                    >
                      Stock contents search
                    </a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}}>Access to stock contents</a>
                  </b>
                </u>
              </span>
              <br />
            </div>
            <div style={{ marginTop: "5px" }} class="row-xs-6 bottom-row ">
              <FaPrint onClick={this.exportPDF} /> <a style={{cursor:"pointer"}}>Print</a>&nbsp;
              <FaFileExport /> <a style={{cursor:"pointer"}}>Export</a>
            </div>
            <button
              onClick={this.refreshhhHandler}
              style={{
                // float: "right",
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
              data={
                this.state.data.length === 0 ? this.props.data : this.state.data
              }
              columns={columns}
              defaultPageSize={10}
              showPaginationTop={true}
              filterable
              defaultFilterMethod={this.filterCaseInsensitive}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Stockcontentlist;
