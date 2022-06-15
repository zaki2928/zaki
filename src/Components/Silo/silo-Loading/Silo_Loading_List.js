import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { IoIosRefreshCircle, IoIosRemoveCircleOutline, IoIosSettings } from "react-icons/io";
import { MdRestore } from "react-icons/md";
import { MdPrint } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import {SiloLoadingFilterdata,remover,siloloadingid,SiloLoadingEditdata,siloLoadingEditHandler,
  siloLoadingFilterHandler, siloEditdata,SiloLoadingFilterCriteria} from "../../../store/Store";
import { FaCheck, FaEdit, FaReadme } from 'react-icons/fa';
import Silo_Loading_Edit from "../silo-Loading/Silo_Loading_Edit";
import Swal from "sweetalert2";
import { properties } from "../../../Properties/Properties";
import axios from "axios";


import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
  IoSearch,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";

const GetListOfSiloLoadingSiCl =
  properties.Port + properties.GetListOfSiloLoadingSiCl;
class Silo_Loading_List extends Component {

  saveHandler(){
    Swal.fire({
        title: 'Confirmation?',
        text: "Do u really want to retreatment of the silo loading!",
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


saveHandler2(){
  Swal.fire({
      title: 'Confirmation?',
      text: "Do u confirm the line closure!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'gray',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes, do it!',
      cancelButtonText:"No"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          
          'Done',
          'success'
        )
      }
    })

}





    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          siloloadingedit:false,
        
        };
      }


componentDidMount=()=>{

if(SiloLoadingFilterdata.length!==0)
{

this.setState({
data:SiloLoadingFilterdata

})

}else{

this.setState({
data:this.props.data

})

}

}

backHandler=()=>{
  console.log("siloloadinglist backhandler")
remover(siloloadingid)
this.props.backHandler()

}

refreshhandler = () => {
  console.log("referesh handler calling");
  this.criteriaFilterMethod();
};
criteriaFilterMethod = () => {
  console.log("testtttttttttttttt  api ", GetListOfSiloLoadingSiCl);
  const criteria = {
    listFilterBean: this.state.listFilterBean,
    limit: this.state.limit,
  };
  axios
    .post(GetListOfSiloLoadingSiCl, SiloLoadingFilterCriteria, {
      params: {
        limit: SiloLoadingFilterCriteria.limit,
      },
    })

    .then((response) => {
      if (response.status === 200 && response.data.length !== 0) {
        console.log("resposne success by Mujtaba", response.data);
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




editHandler=(props)=>{
  this.setState({
      siloloadingedit: true,
  })
  siloLoadingEditHandler(props)
}


editClosehandler=()=>{
  this.setState({
      siloloadingedit: false,
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
                   
                    onClick={() => this.editHandler(props.original)}
                  >
                    Edit
                  </FaEdit>
                  
                );
              },
            },
           


            {
              Header: "check",
              accessor: "check",
              filterable: false,
              Cell: (props) => {
                return (
                  <IoIosRemoveCircleOutline
                   
                    onClick={()=>this.saveHandler2()}
                  >
                    Edit
                  </IoIosRemoveCircleOutline>
                  
                );
              },
            },

            {
              Header: "Retreatment",
              accessor: "retry",
              filterable: false,
              Cell: (props) => {
                return (
                  <IoIosRefreshCircle
                    style={{ height: "1.0em", width: "1.0em", cursor: "pointer" }}
                    color="primary"
                    onClick={()=>this.saveHandler()}
                  >
                    retry
                  </IoIosRefreshCircle>
                  
                );
              },
            },

         {
               Header: "ID",
               accessor: "idSiloLoading",
         },
         {
           Header: "Company",
           accessor: "idCompany",
         },
         {
           Header: "ReceptIon ID",
           accessor: "idReceptionN3",
         },
         {
           Header: "Reception line ID",
           accessor: "idReceptionLineN3",
         },
         {
           Header: "Silo number L3",
           accessor: "siloNumberL3",
         },
         {
           Header: "Status",
           Cell: (props) => {
            return (
              <text>
                {props.original.statusSiloLoading === 1000 ? <span>Closed</span> : props.original.statusSiloLoading === 200 ?<span>Incoherent</span> :
                 props.original.statusSiloLoading === 100 ? <span>Created</span>:props.original.statusSiloLoading === 400 ? <span>Inprogress</span> :
                 props.original.statusSiloLoading === 1100 ? <span>Closed & Rejected</span> :null}
              </text>
            );
          },
           
         },

         {
             Header: "Rejection status",
            // accessor: "rejectionStatus",
             Cell: (props) => {
              return (
                <text>
                  {props.original.rejectionStatus === 0 ? <span>OK</span> : props.original.rejectionStatus === 200 ?<span>SILO-NOT_EMPTY</span> :
                   props.original.rejectionStatus === 100 ? <span>SILO_UNKNOWN</span>:props.original.rejectionStatus === 300 ? <span>NOT_AN_IMC</span> :
                   props.original.rejectionStatus === 400 ? <span>NO_PRODUCT_FOR_IMC</span>: props.original.rejectionStatus === 500 ?<span>ANOTHER_SILO_LOADING_IN_PROGRESS</span>
                   :props.original.rejectionStatus === 600 ?<span>NO_BATCH</span> :null}
                </text>
              );
            },
           },
           {
             Header: "Intermediate material code",
             accessor: "idReference",
           },
           {
             Header: "Grade",
             accessor: "grade",
           },
           {
             Header: "Batch",
             accessor: "batch",
           },
           {
             Header: "Qty to load",
             accessor: "qtyToLoad",
             Cell: (props) => {
              return <div>{
                props.original.qtyToLoad != null
                    ?( props.original.qtyToLoad).toString().slice(0,3)
                    : ""}</div>;
                  
              }
           },
           {
             Header: "Description unit",
             Cell: (props) => {
              return (
                <text>
              
                    <span> T </span>
                  
              </text>
              )
                  }
           },

           {
             Header: "Density",
             accessor: "density",
           },
           {
             Header: "Content status",
             accessor: "idContentStatus",
             Cell: (props) => {
              return (
                <text>
                  {props.original.idContentStatus === 0 ? (
                    <span>Available </span>
                    ) : null}
              </text>
              )
                  }
                  
           },
           {
             Header: "Start date",
             accessor: "startLoadingDate",
             Cell: (props) => {
              return (
                <span>
                  {props.original.startLoadingDate !== null
                    ? props.original.startLoadingDate.substring(0, 10)
                    : ""}
                  &nbsp;
                  {props.original.startLoadingDate !== null
                    ? props.original.startLoadingDate.substring(14, 19)
                    : ""}
                </span>
              );
            },
           },
           {
             Header: "End date",
             accessor: "endLoadingDate",
             Cell: (props) => {
              return (
                <span>
                  {props.original.endLoadingDate !== null
                    ? props.original.endLoadingDate.substring(0, 10)
                    : ""}
                  &nbsp;
                  {props.original.endLoadingDate !== null
                    ? props.original.endLoadingDate.substring(14, 19)
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
            {
              Header: "Version",
              accessor: "versionLock",
            },
           
       ];

        return (
            <React.Fragment>
{this.state.siloloadingedit=== true||SiloLoadingEditdata.length!==0?
            <Silo_Loading_Edit editClosehandler={this.editClosehandler}/>:
<div>
              <IoArrowBackCircleSharp onClick={this.backHandler} />
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
                    <a onClick={this.backHandler}>Silo Loading search</a>
                  </b>
                </u>
                    &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Silo Loading Management</a>
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
            <div>
              <b>
                <span>
                  <h6></h6>
                </span>
              </b>
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
                  //showPaginationTop= {true}
                  filterable
                  defaultFilterMethod={this.filterCaseInsensitive}
                />

                <Row style={{ marginTop: "10px" ,
              
            }}>

              
              <br />

                </Row>
</div>}
            </React.Fragment>
          );
        }
}

export default Silo_Loading_List;