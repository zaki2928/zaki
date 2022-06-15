import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import ParameterEdit from './ParameterEdit';
import { FaEdit, FaTrashAlt,FaFileSignature, FaPrint, FaFileExport } from "react-icons/fa";
import Swal from "sweetalert2";
import { ParameterData, ParameterEditData, ParameterEditHandler, ParameterHandler,ParamterCriteria,remover,parameterid } from '../../../store/Store';
import {ParameterNewData , ParameterNewHandler} from "../../../store/Store";
import ParameterNew from "./ParameterNew";
import axios from "axios";
import { properties } from "../../../Properties/Properties";
import { PARAMETERS } from '../../../store/RoleBased';
const GetParameterFilterList = properties.Port + properties.GetParameterFilterList;
const DeleteParameterValue = properties.Port + properties.DeleteParameterValue;


class ParameterList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          data2: [],
          generalEdit: false,
          customer : false,
          customerArr : [],
        };
      }

      componentDidMount=()=>{
        if (ParameterData.length !== 0) {
          this.setState({
            data: ParameterData
          })
        }else{
          this.setState({
            data: this.props.data
          })
        }
          }
        
          backHandler=()=>{
            console.log("calling back handler for list")
            remover(parameterid)
            this.props.backHandler()
          }
        
          refreshHandler=()=>{
            console.log("refreshHandler calling")
            this.parameterFilterMethod()
          }

      editHandler=(props)=>{
        console.log("check props dataaaaaa", props)
          this.setState({
            generalEdit: true,
            data2: props,
              
          })
          
          ParameterEditHandler(props)
      }
     
      parameterFilterMethod = () => {
        console.log("testttingggggggggggggggggggggggggggggg calling");
        axios
          .post(GetParameterFilterList, ParamterCriteria, {
            params: {
              limit: ParamterCriteria.limit,
            },
          })
    
          .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne successsssssssssssss", response.data);
              this.setState({
                data: response.data,
              });
              this.componentDidMount();
              ParameterHandler(response.data);
            } else {
              this.setState({
                data: [],
              });
              ParameterHandler(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
    editClosehandler=()=>{
      this.parameterFilterMethod();
      this.setState({
        generalEdit: false,
      })
  }


NewHandler=(props)=>{
  console.log("customer handler calling")
  ParameterNewHandler(props)
  this.setState({
    customer: true,
  })
 this.state.customerArr.push(props);
}


  NewCloseHandler=()=>{
    this.parameterFilterMethod();
    this.setState({
      customer: false,
    })
    }

      deleteHandler(props){
        Swal.fire({
          title: 'Confirmation',
          text: "Do you confirm the deletion?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'gray',
          cancelButtonColor: 'gray',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            axios
          .delete(
            DeleteParameterValue +
            props.code
          )
          .then((response) => {
            console.log(" data", response);
            if (response.status === 200 && response.data === 200) {
              console.log("response 200 successs");
              this.setState({
                msg: "",
              });
              this.componentDidMount();
			         this.refreshhandler();
               this.parameterFilterMethod();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else if (response.status === 200 && response.data === 300) {
              console.log("response data 300 success");
              this.setState({
                msg: "*This product is a child product",
              });
            } else if (response.status === 200 && response.data === 100) {
              console.log("response data 100 success");
              this.setState({
                msg: "*You cannot delete this product as it is associated with containers",
              });
            } else {
              this.setState({
                msg: "Invalid Product ID",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
          }
        })
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
                accessor: "Edit",
                filterable: false,
                Cell: (props) => {
                  return (
                    <FaEdit
                    style={{cursor:"pointer" }}
                      onClick={() => this.editHandler(props.original)}
                    >
                      Edit
                    </FaEdit>
                  );
                },
              },
              {
                Header: 'Delete',
                show: PARAMETERS === 2? true: false,
                accessor: "Delete",
                filterable:false,
                Cell: (props) => {
                  return (
                    <div>
                      <FaTrashAlt
                    style={{cursor:"pointer" }}
                        onClick={() => this.deleteHandler(props.original)}
                      >
                        Delete
                      </FaTrashAlt>
                    </div>
                  );
                },
              
            },
         
          {
            Header: "ID",
            accessor: "code",
          },
          {
            Header: "Value",
            accessor: "parameterValue",
          },
          {
            Header: "Category",
            accessor: "category",
            Cell: (props) => {
              return (
                <text>
                  {
                    props.original.category===70000?<span>Security</span>:
                    props.original.category===170000?<span>Security</span>:
                    props.original.category===100000?<span>None</span>:
                    props.original.category===134000?<span>None</span>:
                    props.original.category===114000?<span>Document</span>:
                    props.original.category===14000?<span>Document</span>:
                    props.original.category===90000?<span>Web user interface</span>:
                    props.original.category===190000?<span>Web user interface</span>:
                    props.original.category===114000?<span>Document</span>:
                    props.original.category===114000?<span>Document</span>:
                    props.original.category===114000?<span>Document</span>:
                    props.original.category===114000?<span>Document</span>:
                    props.original.category===600?<span>Container</span>:
                    props.original.category===101810?<span>Inventory</span>:
                    props.original.category===100?<span>100</span>:
                    null
                  }
                </text>
              );
            },
           
          },
          {
            Header: "Extensible",
            accessor: "siteExtensible",
            Cell: (props) =>{
              return(
                  <text>
                      {
                          props.original.siteExtensible=== 0 ? <span>No</span>:<span>Yes</span>
                      }
                  </text>
              )
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
          
        
        ];
        return (
            <React.Fragment>
              {this.state.generalEdit === true || ParameterEditData.length !== 0 ?
              (<ParameterEdit editClosehandler={this.editClosehandler} data2={this.state.data2}/>) :
              this.state.customer === true || ParameterNewData.length !== 0 ?
              (<ParameterNew customerArr={this.state.customerArr} NewCloseHandler={this.NewCloseHandler}/>) :

           
              
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
                        <a style={{cursor:"pointer" }} onClick={this.backHandler}>Parameters Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer" }}>Parameter Management</a>
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
 {PARAMETERS === 2?  
 <div>
<FaFileSignature
                  
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileSignature>{" "}
{/* <button >Configure</button> */}
<span 
onClick={this.NewHandler}
style={{cursor:"pointer" }}>New</span>{" "}
</div>               
:''} 

                <FaPrint
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaPrint>{" "}
<a  style={{cursor:"pointer" }}>Print</a>{" "}
<FaFileExport
                 
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileExport>{" "}
<a style={{cursor:"pointer" }}>Export</a>{" "}


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

export default ParameterList;