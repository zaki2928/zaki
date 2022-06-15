import React, { Component } from 'react'
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaFileSignature, FaPrint, FaFileExport, FaLastfmSquare } from "react-icons/fa";
import {FamiliesData, remover,familycriteria,FamiliesDataHandler} from "../../../../store/Store"
import Addfamilies from "./Addfamilies"
import Editfamilies from './Editfamilies'
import axios from 'axios'
import { properties } from '../../../../Properties/Properties';
import { FAMILY_PROFILE } from '../../../../store/RoleBased';
const getAllFamilyByFilterCriteria =
  properties.Port + properties.getAllFamilyByFilterCriteria;
const deleteFamily=  properties.Port + properties.deleteFamily;



export default class Familieslist extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            isNew: false,
            isEdit: false,
            idFamily:"",
            passingDataEdit:'',
            
        
        }
    }

    componentDidMount = () => {
        if (FamiliesData.length !== 0) {
            this.setState({
                data: FamiliesData
            })
        } else {
            this.setState({
                data: this.props.data
            })
        }
    }

    deleteHandler(props){
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: 'gray',
          cancelButtonColor: 'gray',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.value) {
            console.log("delete id =======", props)
            axios.post(deleteFamily + props.idFamily)
            .then((response) => {
                console.log("my data", response);
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

      refreshHandler = () => {
        console.log("referesh handler calling");
        this.criteriaFilterMethod();
      };

      criteriaFilterMethod = () => {
    
        console.log("testttingggggggggggggggggggggggggggggg calling");
        axios
          .post(getAllFamilyByFilterCriteria, familycriteria, {
            params: {
              limit: familycriteria.limit,
            },
          })
          
          .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne successsssssssssssss", response.data);
              this.setState({
                data: response.data,
                
    
              });
              FamiliesDataHandler(response.data);
              
            } else {
              
              this.setState({
                data: [],
    
              });
              FamiliesDataHandler(response.data);
              
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

    backHandler=()=>{
        console.log("calling back handler for list")
        remover("Families")
        this.props.backHandler()
      }

      newcloseHandler =() => {
          this.setState({
            isNew: false
          })
      }



      createUserHandler=() =>{
        // CreateUserDataHandler()
        this.setState({
            isNew: true,
        })
      }

      editHandler = (data) => {
          this.setState({
              isEdit: true,
              passingDataEdit: data
          })
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
                show: FAMILY_PROFILE === 2? true:false,
                accessor: "Delete",
                filterable: false,
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
                Header: "Description",
                accessor: "description",
            },
            {
                Header: "Short Description",
                accessor: "descriptionShort",
            },
            {
                Header: "Type",
                accessor: "typeFamily",
                Cell: (props) => {
               return (
                    <text>
                      {props.original.typeFamily === 100 ? (
                        <span>_PREP_</span>
                      ) : props.original.typeFamily === 200 ? (
                        <span>_STOCK_</span>
                      ) : props.original.typeFamily === 700 ? (
                        <span>_INVENTORY_</span>
                      ) : props.original.typeFamily === 300 ? (
                        <span>_VERTICAL_</span>
                      ) : props.original.typeFamily === 400 ? (
                        <span>_HAZARDOUS_</span>
                      ) : props.original.typeFamily === 500 ? (
                        <span>_AEROSOL_</span>
                      ) : props.original.typeFamily === 600 ? (
                            <span>_FRAGILE_</span>
                      ) : props.original.typeFamily === 5000 ? (
                             <span>_OTHER_</span>
                      ) : null}
                    </text>
                  );
                },
            },
            {
                Header: "Default",
                accessor:"defaultFamily",
                Cell: () => <input type="checkbox" checked={FamiliesData.defaultFamily===1?true:false}/>
            },
            {
                Header: "Modified Date",
                accessor: "mDate",
                // Cell: (props) => {
                //   return (
                //     <span>
                //       {props.original.mDate === undefined
                //         ? ""
                //         : props.original.mDate === null
                //         ? ""
                //         : props.original.mDate === ""
                //         ? ""
                //         : props.original.mDate
                //             .replace("T", " ")
                //             .substring(0, props.original.mDate.lastIndexOf("."))}
                //     </span>
                // )}
            },
            {
                Header: "Modified By",
                accessor: "mUsername",
            },


        ];
        return (
            <React.Fragment>
                { this.state.isNew === true
                 ? (<Addfamilies newcloseHandler={this.newcloseHandler} />) :

                this.state.isEdit === true
                ? (<Editfamilies editcloseHandler={this.editcloseHandler} data={this.state.passingDataEdit}/>) :
                
                
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
                            <a style={{cursor:"pointer"}} onClick={this.backHandler}>Families Search</a>
                        </b>
                    </u>
                    &#62;
                    <u>
                        {" "}
                        <b>
                            {" "}
                            <a style={{cursor:"pointer"}} >Families Management</a>
                        </b>
                    </u>

                </span>
                <br />
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


                <div style={{ marginTop: "10px", marginBottom: "5px" }} class="row-xs-6 bottom-row ">
{FAMILY_PROFILE === 2? 
                  <div>

                    <FaFileSignature

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaFileSignature>{" "}
                    {/* <button >Configure</button> */}
                    <span style={{cursor:"pointer"}}
                        onClick={this.createUserHandler}
                    >New</span>{" "}
                    </div>

                    :''}
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
                <ReactTable
                    className="-striped -highlight "
                    data={this.state.data.length === 0
                        ? this.props.data : this.state.data
                    }
                    columns={columns}
                    defaultPageSize={10}
                    showPaginationTop={true}
                    filterable
                    defaultFilterMethod={this.filterCaseInsensitive}

                />
                </div>
                  }
                

            </React.Fragment>
        )
    }
}
