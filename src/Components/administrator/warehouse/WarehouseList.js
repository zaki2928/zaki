import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import WarehouseEdit from './WarehouseEdit';
import { FaEdit, FaTrashAlt,FaFileSignature, FaPrint, FaFileExport } from "react-icons/fa";
import Swal from "sweetalert2";
import { WarehouseData,WarehouseHandler, WarehouseEditData, WarehouseEditHandler, remover, WarehousecriteriaData,warehouseid } from '../../../store/Store';
import {WarehouseNewData , WarehouseNewHandler} from "../../../store/Store";
import WarehouseNew from "./WarehouseNew";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { properties } from '../../../Properties/Properties';
import { WAREHOUSE } from '../../../store/RoleBased';

const deleteWarehouseNew = properties.Port + properties.deleteWarehouseNew
const getListOfAllWarehouse = properties.Port + properties.getListOfAllWarehouse
class WarehouseList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          data2: [],
          generalEdit: false,
          customer : false,
          customerArr : [],
          msg: "",
        };
      }

      componentDidMount=()=>{
        console.log("list page data",WarehouseData);
        if (WarehouseData.length !== 0) {
          this.setState({
            data: WarehouseData

          })
        }else{
          this.setState({
            data: this.props.data
          })
        }
          }
        
          backHandler=()=>{
            // this.setState({

            //   data:WarehouseData
            // },
            
            // console.log("mydata",this.state.data)
            // )
            console.log("calling back handler for list")

            remover(warehouseid)
            this.props.backHandler()
          }
        
//           componentDidUpdate=()=>{
// if(WarehouseData){


// }

//           }

      editHandler=(props)=>{
        console.log("check props dataaaaaa", props)
          this.setState({
            generalEdit: true,
              
          })
          this.state.data2.push(props)
          WarehouseEditHandler(props)
      }
     

    editClosehandler=()=>{
      this.setState({
        generalEdit: false,
      })
  }
CustomerEditionHandler=(props)=>{
  console.log("customer edit handler calling")
  WarehouseNewHandler(props)
  this.setState({
    customer: true,
  })
 this.state.customerArr.push(props);
}


  customerCloseHandler=()=>{
    console.log("customer handler close calling90")
    this.setState({
      // data:data,
      customer: false,
      // data:WarehouseData
    })
    }

//     componentDidUpdate=()=>{
// if(WarehouseData){


// }

//     }
refreshHandler = () => {
  console.log("submitHandler calling", this.state.limit)
  // const contact = {
  //     listFilterBean: this.state.listFilterBean,
  //     limit: this.state.limit,
  //   };

  axios.post(getListOfAllWarehouse, WarehousecriteriaData, {
      params: WarehousecriteriaData.limit
  }
  )
      .then((response) => {
          if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success", response.data);
              this.setState({
                  data: response.data,
              })

              WarehouseHandler(response.data);

          }else {
              this.setState({
                data: [],
              });
            }
      })
      .catch((error) => {
          console.log(error);
      });

}

    deleteHandler = (props) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "gray",
        cancelButtonColor: "gray",
        confirmButtonText: "Yes, delete it!",
        msg: "",
      }).then((result) => {
        if (result.value) {
          axios
            .delete(
              deleteWarehouseNew +
                props.idWarehouse
            )
            .then((response) => {
              console.log(" data", response);
              if (response.status === 200 && response.data === 200) {
                console.log("response 200 successs");
                // this.setState({
                //   msg: "Your file has been deleted",
                // });
                this.componentDidMount();
                this.refreshHandler();
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
              } else if (response.status === 200 && response.data === 100) {
                console.log("response data 100 success");
                this.setState({
                  msg: "You cannot delete this ID associated with SK_WMS_KL_LOCATION",
                });
              }  else {
                this.setState({
                  msg: "Invalid Warehouse ID",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        
        }
      });
    };




    exportPDF = () => {
      console.log("export pdf calling");
      const unit = "pt";
      const size = "A1"; // Use A1, A2, A3 or A4
      const orientation = "landscape"; // portrait or landscape
  
      const marginLeft = 1100;
      const doc = new jsPDF(orientation, unit, size);
      doc.setFontSize(13);
  
      const title = "SK_WMS_WAREHOUSE";
  
      const headers = [
        [
          
          "ID",
  
          "Site",
          "Description",
          "Default",
          "Use shipping position",
          "Modified Date",
          "Modified By",
          "Version",
        
          
        ],
      ];
  
      const data1 = this.state.data.map((elt) => [
        
        elt.idWarehouse,
        elt.idSite,
        elt.description,
        elt.defaultWarehouse,
        elt.useShippingPosition,
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
      doc.save("WAREHOUSE.pdf");
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
        const { msg } = this.state;
        const columns = [
            {
                Header: "Edit",
                accessor: "Edit",
                filterable: false,
                Cell: (props) => {
                  return (
                    <FaEdit style={{marginLeft:"40px",cursor:"pointer"}}
                      
                      onClick={() => this.editHandler(props.original)}
                    >
                      Edit
                    </FaEdit>
                  );
                },
              },
              
         
          {
            Header: "ID",
            accessor: "idWarehouse",
          },
          {
            Header: "Site",
            accessor: "idSite",
          },
          {
            Header: "Description",
            accessor: "description",
          },
          {
            Header: "Default",
            accessor: "defaultWarehouse",
            Cell: (props) => {
              return (
                <input
                type="checkbox"
                checked={props.original.defaultWarehouse===1?true:false}
                 
            
                />
                  
                
              );
            },
          },
          {
            Header: "Use shipping position",
            accessor: "useShippingPosition",
            Cell: (props) => {
              return (
                <input
                type="checkbox"
                checked={props.original.useShippingPosition===1?true:false}
                 
            
                />
                  
               
              );
            },
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
                  }
                </span>
              );
            },
          },
          {
            Header: "Modified By",
            accessor: "mUsername",
          },
          {
            Header: "Version",
            accessor: "versionLock",
           
          },
          {
            Header: 'Delete',
            show: WAREHOUSE === 2? true: false,
            accessor: "Delete",
            filterable:false,
            Cell: (props) => {
              return (
                <div>
                  {props.original.useShippingPosition===1 && props.original.defaultWarehouse===1 ?
                  "":<FaTrashAlt style={{marginLeft:"40px"}}

                
                  onClick={() => this.deleteHandler(props.original)}
                    >
                      Delete
                    </FaTrashAlt>
                }
                  
                </div>
              );
            },
          
        },
          
        
        ];
        return (
            <React.Fragment>
              {this.state.generalEdit === true || WarehouseEditData.length !== 0 ?
              (<WarehouseEdit editClosehandler={this.editClosehandler} data2={this.state.data2}/>) :
              this.state.customer === true || WarehouseNewData.length !== 0 ?
              (<WarehouseNew customerArr={this.state.customerArr} customerCloseHandler={this.customerCloseHandler}/>) :

           
              
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
                        <a style={{cursor:"pointer" }}onClick={this.backHandler}>Warehouses Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer" }}>Access to Warehouses</a>
                      </b>
                    </u>
                    
                  </span>
                  <br />
                  {/* <span
                  style={{
                    color: "red",
                  }}
                >
                  <h6>{msg}</h6>
                </span> */}
                  <div style = {{marginTop:"10px",marginBottom:"5px"}} class="row-xs-6 bottom-row ">
                  {WAREHOUSE=== 2? 
                  <div>
                              <FaFileSignature
                                                
                                              //   onClick={() => this.edithandler(props.original)}
                                              >
                                                
                                              </FaFileSignature>{" "}
                              {/* <button >Configure</button> */}
                              <span style={{cursor:"pointer" }}
                              onClick={this.CustomerEditionHandler}
            >New</span>{" "}
            </div>
            :''}

                <FaPrint
                
                onClick={this.exportPDF}
                >
                  
                </FaPrint>{" "}
          <a style={{cursor:"pointer" }}>Print</a>{" "}
              <FaFileExport
                 
               
                >
                  
                </FaFileExport>{" "}
            <a style={{cursor:"pointer" }}>Export</a>{" "}

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

                </div>
                <div>
                <b>
                  <span
                    style={{
                      color: "red",
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
                  defaultPageSize={5}
                  showPaginationTop= {false}
                  filterable
                  defaultFilterMethod={this.filterCaseInsensitive}
                />
                  </div>
                  }
            </React.Fragment>
            
          );
         
        }
}

export default WarehouseList;