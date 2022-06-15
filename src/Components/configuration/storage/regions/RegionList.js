import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import RegionEdit from './RegionEdit';
import { FaEdit, FaTrashAlt,FaFileSignature, FaPrint, FaFileExport } from "react-icons/fa";
import Swal from "sweetalert2";
import { regioncriteriaData, RegionData, RegionEditData, RegionEditHandler, RegionHandler, remover,regionid } from '../../../../store/Store';
import {RegionNewData , RegionNewHandler} from "../../../../store/Store";
import RegionNew from "./RegionNew";
import {properties} from "../../../../Properties/Properties"
import axios from 'axios';
import { Row } from 'reactstrap';


const deleteRegionKLS = properties.Port +  properties.deleteRegionKLS
const getListOfRegionByFilterCriteria = properties.Port + properties.getListOfRegionByFilterCriteria

class RegionList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          data2: [],
          regionEdit: false,
          regions : false,
          regionsArr : [],
          message:""
        };
      }

      componentDidMount=()=>{
        if (RegionData.length !== 0) {
          this.setState({
            data: RegionData
          })
        }else{
          this.setState({
            data: this.props.data
          })
        }
          }
        
          backHandler=()=>{
            console.log("calling back handler for list")
            remover(regionid)
            this.props.backHandler()
          }
        

      editHandler=(props)=>{
        console.log("check props dataaaaaa", props)
          this.setState({
            regionEdit: true,
              
          })
          this.state.data2.push(props)
          RegionEditHandler(props)
      }
     

    editClosehandler=()=>{
      this.setState({
        regionEdit: false,
      })
  }









CustomerEditionHandler=(props)=>{
  console.log("regionsArr handler calling")
  RegionNewHandler(props)
  this.setState({
    regions: true,
  })
 this.state.regionsArr.push(props);
}


  customerCloseHandler=()=>{
    this.setState({
      regions: false,
    })
    }

    refreshHandler = () => {
      console.log("submitHandler calling", this.state.limit)
      const contact = {
          listFilterBean: this.state.listFilterBean,
          limit: this.state.limit,
        };

      axios.post(getListOfRegionByFilterCriteria, regioncriteriaData, {
          params: regioncriteriaData.limit
      }
      )
          .then((response) => {
              if (response.status === 200 && response.data.length !== 0) {
                  console.log("resposne success", response.data);
                  this.setState({
                      data: response.data,

                  })

                  RegionHandler(response.data);

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



    deleteHandler(props) {
      console.log("ID----------------", props.idRegion)
      Swal.fire({
          title: 'Confirmation',
          text: "Do you confirm the deletion?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'gray',
          cancelButtonColor: 'gray',
          confirmButtonText: 'delete'
      }).then((result) => {
          console.log("swal result",result)
          if (result.value) {
              axios.post(deleteRegionKLS + props.idRegion)
              .then((response) => {
                  console.log("mj data", response);
                  if (response.status === 200) {
                    console.log("response  success");
                    // this.refreshHandler();
                  }
                })
              .catch((error) => {
                  console.log(error);
              });
          if (result.isConfirmed) {

          }
          
          else{
              Swal.fire(
                  'Not Deleted!',
                  'The conflict occurred in database',
                  'failed'
              )
          }
      }
  })
  }

      // deleteHandler(props){
      //   Swal.fire({
      //     title: 'Confirmation',
      //     text: "Do you confirm the deletion?",
      //     icon: 'warning',
      //     showCancelButton: true,
      //     confirmButtonColor: 'gray',
      //     cancelButtonColor: 'gray',
      //     confirmButtonText: 'Yes, delete it!'
      //   }).then((result) => {
      //     if (result.value) {
      //       console.log("delete handler",props.idRegion)
      //       axios.delete(deleteRegionKLS + props.idRegion)
      //       .then((response)=> {
      //         if (response.status===200 && response.data === 200){
      //           this.setState({
      //             message:""
      //           });
      //           Swal.fire(
      //             "Deleted successsfully"
      //           )
      //         }
      //         else {
      //           if (response.status ===500 && response.data ===500) {
      //             this.setState({
      //               message:"The conflict occurred in database",
      //             })
                  
      //           }
      //         } 
      //       })
      //       .cache((error)=>{
      //         console.log(error)
      //       })
           
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
        const columns = [
            {
                Header: "Edit",
                accessor: "Edit",
                filterable: false,
                Cell: (props) => {
                  return (
                    <FaEdit
                    style={{cursor:"pointer"}}
                      onClick={() => this.editHandler(props.original)}
                    >
                      Edit
                    </FaEdit>
                  );
                },
              },
          {
            Header: "Site",
            accessor: "idSite",
          },
          {
            Header: "Warehouse",
            accessor: "idWarehouse",
          },
          {
            Header: "ID",
            accessor: "idRegion",
          },
          {
            Header: "Description",
            accessor: "description",
          },
          {
            Header: "Short Description",
            accessor: "descriptionShort",
          },
          {
            Header: "Default Region",
            accessor: "defaultRegion",
            Cell: (props) => {
              return (
                <input type="checkbox"  checked={props.original.defaultRegion===1?true:false}></input>
              );
            },
          },
          {
            Header: "Location Scan Mode",
            accessor: "modeLocationScan",
            Cell: (props) => {
              return (
                <span>{props.original.modeLocationScan===100?"_Both_":"_check digit only"}</span>
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
            Header: 'Delete',
            accessor: "Delete",
            filterable:false,
            Cell: (props) => {
              return (
                <div>
                  <FaTrashAlt
                
                    onClick={() => this.deleteHandler(props.original)}
                  >
                    Delete
                  </FaTrashAlt>
                </div>
              );
            },
          
        },
        
        ];
        return (
            <React.Fragment>
              {this.state.regionEdit === true || RegionEditData.length !== 0 ?
              (<RegionEdit editClosehandler={this.editClosehandler} data2={this.state.data2}/>) :
              this.state.regions === true || RegionNewData.length !== 0 ?
              (<RegionNew regionsArr={this.state.regionsArr} customerCloseHandler={this.customerCloseHandler}/>) :

           
              
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
                        <a style={{cursor:"pointer"}} onClick={this.backHandler}>Regions Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}}>Regions Management</a>
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
                  
                  <div style = {{marginTop:"10px",marginBottom:"5px"}} class="row-xs-6 bottom-row ">
                  
<FaFileSignature
                  
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileSignature>{" "}
{/* <button >Configure</button> */}
<span style={{cursor:"pointer"}}
onClick={this.CustomerEditionHandler}
>New</span>{" "}

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

<Row>{this.state.message}</Row>


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

export default RegionList;