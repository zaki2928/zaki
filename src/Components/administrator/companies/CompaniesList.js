import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import CompaniesEdit from './CompaniesEdit';
import { FaEdit, FaTrashAlt,FaFileSignature, FaPrint, FaFileExport } from "react-icons/fa";
import Swal from "sweetalert2";
import { CompaniesData, CompaniesEditData, CompaniesEditHandler,CompaniesDataHandler, remover,companiesid } from '../../../store/Store';
import {CompaniesNewData , CompaniesNewHandler, companiesCriteria} from "../../../store/Store";
import CompaniesNew from "./CompaniesNew";
import {properties} from '../../../Properties/Properties'
import axios from "axios";
import { COMPANIES } from '../../../store/RoleBased';


const getListOfCompanies = properties.Port + properties.getListOfCompanies
const deleteCompany = properties.Port + properties.deleteCompany


class CompaniesList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          data2: [],
          isNew: false,
          isEdit: false,
          limit:"",
          // generalEdit: false,
          // customer : false,
          // customerArr : [],
        };
      }

      componentDidMount = () => {
        if (CompaniesData.length !== 0) {
            this.setState({
                data: CompaniesData
            })
        } else {
            this.setState({
                data: this.props.data,
            })
        }
    }

    companiesFilterHandler = () => {
      axios.post(getListOfCompanies, companiesCriteria, {
          params: {
              limit: companiesCriteria.limit,
            },
      })
          .then((response) => {
              if (response.status === 200 && response.data.length !== 0) {
                  console.log("resposne success", response.data);
                  this.setState({
                      data: response.data,
                      
                  })

                  CompaniesDataHandler(response.data);
                  this.componentDidMount();

              }else {
                  this.setState({
                    data: [],
                  });
                  CompaniesDataHandler(response.data);
                }
          })
          .catch((error) => {
              console.log(error);
          });

  }

  refreshHandler = () => {
    console.log("refreshHandler calling")
    this.companiesFilterHandler()
  }

deleteHandler(props) {
  console.log("ID----------------", props.idCompany)
  console.log("delete url", deleteCompany)
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
          axios.delete(deleteCompany + props.idCompany)
          .then((response) => {
              console.log("mj data", response);
              if (response.status === 200) {
                console.log("response  success");
                this.refreshHandler();
              }
            })
          .catch((error) => {
              console.log(error);
          });

          Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
          )
      }
  })
}
        
          backHandler=()=>{
            console.log("calling back handler for list")
            remover(companiesid)
            this.props.backHandler()
          }
        

          newCreateHandler = () => {
            console.log("new contact++++++++++++++++++++++++++++")
            this.setState({
                isNew: true,
            })
        }
    
          closeHandler =() => {
              this.setState({
                isNew: false
              })
          }
    
    
          editHandler=(props)=>{
            console.log("check props data", props)
              this.setState({
                isEdit: true,
                data2: props,
                  
              })
              
              CompaniesEditHandler(props)
          }
          
          editcloseHandler= () =>{
              this.setState({
                  isEdit: false,
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
                show: COMPANIES===2? true: false,
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
            accessor: "idCompany",
          },
          {
            Header: "Number",
            accessor: "companyNum",
          },
          {
            Header: "Name",
            accessor: "businessName",
          },
          {
            Header: "Address1",
            accessor: "address1",
           
          },
          {
            Header: "Address2",
            accessor: "address2",
          },
          {
            Header: "Address3",
            accessor: "address3",
          },
          {
            Header: "Address4",
            accessor: "address4",
          },
          {
            Header: "Post Code",
            accessor: "postCode",
          },
          {
            Header: "Town",
            accessor: "town",
          },
          {
            Header: "Country Code",
            accessor: "countryCode",
          },
          {
            Header: "Country",
            accessor: "country",
          },
          {
            Header: "Phone",
            accessor: "phone",
          },
          {
            Header: "Fax",
            accessor: "fax",
          },
          {
            Header: "Email",
            accessor: "email",
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
              {this.state.isEdit === true || CompaniesEditData.length !== 0 ?
              (<CompaniesEdit editcloseHandler={this.editcloseHandler} data2={this.state.data2}/>) :
              this.state.isNew === true ?
              (<CompaniesNew  closeHandler={this.closeHandler}/>) :

           
              
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
                        
                        <a style={{cursor:"pointer" }} onClick={this.backHandler}>Companies Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a >Companies Management</a>
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
     {COMPANIES === 2? 
     <div>
<FaFileSignature
                  
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileSignature>{" "}
{/* <button >Configure</button> */}
<span  style={{cursor:"pointer" }}
onClick={this.newCreateHandler}
>New</span>{" "}
</div>
:''}             

                <FaPrint
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaPrint>{" "}
<a style={{cursor:"pointer" }}>Print</a>{" "}
<FaFileExport
                 
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileExport>{" "}
<a style={{cursor:"pointer"}} >Export</a>{" "}


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

export default CompaniesList;