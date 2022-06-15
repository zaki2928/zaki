import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import RackEdit from './RackEdit';
import { FaEdit, FaTrashAlt,FaFileSignature,FaDesktop,FaPrint, FaFileExport } from "react-icons/fa";
import Swal from "sweetalert2";
import { RackData, RackDisplayData,nesteddisplaydata,nesteddisplayhandler, RackDisplayHandler,RackCriteria, RackEditData, RackEditHandler,RackNewData,RackNewHandler, remover,rackid } from '../../../../store/Store';
import { properties } from "../../../../Properties/Properties";
import axios from "axios";
import RackDisplay from './RackDisplay';
import RackNew from './RackNew';
import { RACK_PROFILE } from '../../../../store/RoleBased';

// const deleteRackProfile =
//   properties.Port + "rackprofile/deleteeRackProfile/";
const deleteeRackProfile = properties.Port + properties.deleteeRackProfile;
const getListOfRackProfile = properties.Port + properties.getListOfRackProfile;
const getListOfProfileLineByIdRackCell = properties.Port + properties.getListOfProfileLineByIdRackCell;
// const getListOfProfileLineByIdRackCell = properties.Port  +"rackprofile/getListOfProfileLineByIdRackCell/";

class RackList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          data2: [],
          orderEdit: false,
          orderDisplay: false,
          isdisplaydata: [],
          new : false,
          newArr :[],
          idProfilCellRack :0,
        };
      }

      componentDidMount=()=>{
        if (RackData.length !== 0) {
          this.setState({
            data: RackData
          })
        }else{
          this.setState({
            data: this.props.data
          })
        }
          }
        
          backHandler=()=>{
            console.log("calling back handler for list")
            remover(rackid)
            this.props.backHandler()
          }
        

      editHandler=(props)=>{
        console.log("check props dataaaaaa", props)
          this.setState({
              orderEdit: true,
              data2: props,
          })
          //this.state.data2.push(props)
          RackEditHandler(props)
      }
     

    editClosehandler=()=>{
      this.setState({
        orderEdit: false,
      })
  }

  displayHandler=(props)=>{
    console.log("display handler calling uzzuuuuu", props.idProfilCellRack)
    this.getListOfProfileLineByIdRackCell(props.idProfilCellRack);
     RackDisplayHandler(props)
     console.log("chek rack here ==========>", RackDisplayData)
    // nesteddisplayhandler(props);
   
  //  nesteddisplayhandler(props);
  // this.getListOfProfileLineByIdRackCell(props.idProfilCellRack);

  }

  getListOfProfileLineByIdRackCell = (id) => {
    console.log(" calling getListOfProfileLineByIdRackCell", id);

    axios
      .post(getListOfProfileLineByIdRackCell+ id)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success logistic unit ", response.data);
          // this.setState({
          //   data: response.data,
          // });
          nesteddisplayhandler(response.data);
          nesteddisplayhandler(response.data);
          this.setState({
            orderDisplay: true,
      
          })        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  

displayCloseHandler=()=>{
  this.setState({
    orderDisplay: false,
  })
}

newHandler=(props)=>{
  console.log("check props dataaaaaa", props)
    this.setState({
        new: true,
        
    })
    this.state.newArr.push(props)
    RackNewHandler(props)
}


newcloseHandler = (data) => {
  console.log("newclose handler calling ", data);
  this.setState({
    new: false,
    // data: data,
  });
  // /this.refreshHandler();
};

refreshHandler = () => {
  console.log("checking vale------------------------------>>", RackCriteria);

  axios
    .post(getListOfRackProfile, RackCriteria, {
      params: {
        limit: RackCriteria.limit,
      },
    })
    .then((response) => {
      if (response.status === 200 && response.data.length !== 0) {
        console.log(
          "resposne successsssssssssssss===================>",
          response.data
        );

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
            axios.post(deleteeRackProfile + props.idProfilCellRack)
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
                Header: "Display",
                accessor: "display",
                filterable:false,
                Cell: (props) => {
                  return (
                    <div>
                      <FaDesktop
                      
                        onClick={() => this.displayHandler(props.original)}
                      >
                        Display
                      </FaDesktop>
                    </div>
                  );
                },
              },
              
          {
            Header: "ID",
            accessor: "idProfilCellRack",
          },
          {
            Header: "Description",
            accessor: "description",
          },
          {
            Header: "Default Profile",
            accessor: "defaultPR",
            Cell: (props) => {
              return (
                <input style={{marginLeft:"40px"}} type="checkbox" />
              );
            },
          },
          {
            Header: "Version Lock",
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
                  }
                </span>
              );
            },
          },
          {
            Header: "Modified by",
            accessor: "mUsername",
          },
          
          {
            Header: 'Cancel Modal',
            show: RACK_PROFILE === 2 ? true: false,
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
              {this.state.orderEdit === true || RackEditData.length !== 0 ?
              (<RackNew editClosehandler={this.editClosehandler} data2={this.state.data2}/>) :
              this.state.orderDisplay === true || nesteddisplaydata.length !== 0 ? (
                <RackDisplay isdisplaydata={this.state.isdisplaydata} displayCloseHandler={this.displayCloseHandler} />
              ) :
              this.state.new === true || RackNewData.length !== 0 ? (
                <RackEdit newcloseHandler={this.newcloseHandler} />
              ) :
             
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
                        <a style={{cursor:"pointer"}} onClick={this.backHandler}>Cell Racks Profile Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}}>Cell Racks Profile Management</a>
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
                  <div class="row-xs-6 bottom-row " style={{marginTop:"10px",marginBottom:"10px"}}>
                    {RACK_PROFILE === 2?
                    <div>
                  <FaFileSignature
                  
                  //   onClick={() => this.edithandler(props.original)}
                  >
                    
                  </FaFileSignature>{" "}
  {/* <button >Configure</button> */}
  <span style={{cursor:"pointer"}}
  onClick={this.newHandler}
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

export default RackList;