import React, { Component } from 'react'
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaFileSignature, FaPrint, FaFileExport, FaLastfmSquare } from "react-icons/fa";
import { missionClassData,MissionclassCriteria,missionclassDataHandler,MissionclassEditDataHandler,remover,missionClassid } from '../../../../store/Store';
import axios from "axios";
import { properties } from '../../../../Properties/Properties';
import { Mission_Class } from '../../../../store/RoleBased';
import MissionClassEdit from './MissionClassEdit';
import MissionClassDataEdit from './MissionClassDataEdit';


const getListOfClassMissionKls =properties.port + properties.getListOfClassMissionKls
const geteditClassMissionkls = properties.port + properties.geteditClassMissionkls

export default class MissionClassList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            data: [],
            data2: [],
            isNew: false,
            isEdit: false,
            
        
        }
    }
    componentDidMount = () => {
         if (missionClassData.length !== 0) {
            this.setState({
                data: missionClassData
            })
        } else {
            this.setState({
                data: this.props.data
            })
        }
    }
    refreshHandler = () => {
        console.log("submitHandler calling", this.state.limit)
        const contact = {
            listFilterBean: this.state.listFilterBean,
            limit: this.state.limit,
          };
          axios.post(getListOfClassMissionKls, MissionclassCriteria, {
            params: MissionclassCriteria.limit
        }
        )
        .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
                console.log("resposne success", response.data);
                this.setState({
                    data: response.data,

                })
                missionclassDataHandler(response.data);
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
backkHandler=()=>{
    console.log("calling back handler for list")
    remover(missionClassid)
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

editHandler = (props) => {
  console.log("check props data", props)
  this.setState({
    isEdit: true,
    data2: props,
      
  })
  MissionclassEditDataHandler(props)
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
            Header: "Mission Class",
            accessor: "missionClassId",
        },
        
        {
            Header: "Priority",
            accessor: "priority",
        },
        {
            Header: "Desired Deadline(min)",
            accessor:"desiredDeadline",
            // Cell: (props) => <input type="checkbox" checked={props.original.accessibility === 1 ? true : false}/>
        },
        {
            Header: "Imperative Deadline",
            accessor:"imperativeDeadline",
            // Cell: (props) => <input type="checkbox" checked={props.original.technical === 1 ? true : false}/>
        },
        // {
        //     Header: "Version",
        //     accessor: "version_lock",
        // },
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
            accessor: "musername",
        

        }
    ];
    return (
        <React.Fragment>
                { this.state.isNew === true
                 ? (<MissionClassEdit newcloseHandler={this.newcloseHandler} />) :

                this.state.isEdit === true
                ? (<MissionClassDataEdit editcloseHandler={this.editcloseHandler}/>) :
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
                        <a style={{cursor:"pointer" }}onClick={this.backkHandler}>Mission Class Search</a>
                    </b>
                </u>
                &#62;
                <u>
                    {" "}
                    <b>
                        {" "}
                        <a style={{cursor:"pointer" }}>Mission Class Management</a>
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

                <div style={{ marginTop: "10px", marginBottom: "5px" }} class="row-xs-6 bottom-row ">
{Mission_Class  ===2 ?
<div>
                    <FaFileSignature

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaFileSignature>{" "}
                    {/* <button >Configure</button> */}
                    <span style={{cursor:"pointer" }}
                        onClick={this.createUserHandler}
                    >New</span>{" "}
                    </div>
                    :''}

                    <FaPrint

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaPrint>{" "}
                    <a style={{cursor:"pointer" }} >Print</a>{" "}
                    <FaFileExport

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaFileExport>{" "}
                    <a style={{cursor:"pointer" }} >Export</a>{" "}

                    
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

                
  
//   render() {
//     return (
//       <div>MissionClassList</div>
//     )
//   }
// }
