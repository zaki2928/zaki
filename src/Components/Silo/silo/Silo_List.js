import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { IoIosSettings } from "react-icons/io";
import { MdRestore } from "react-icons/md";
import { MdPrint } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import {siloFilterHandler,Silofilterdata,remover,siloid,siloEditdata,siloEditHandler,SiloFilterCriteria} from "../../../store/Store";
import { FaEdit } from 'react-icons/fa';
import Silo_Edit from "../silo/Silo_Edit"
import axios from "axios";
import { properties } from "../../../Properties/Properties";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
  IoSearch,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";

const GetListOfSiloSICLView =
  properties.Port + properties.GetListOfSiloSICLView;

class Silo_List extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          siloedit:false,
          siloeditnewdata:[],
          
        };
      }

      refreshhandler = () => {
        console.log("referesh handler calling");
        this.criteriaFilterMethod();
      };
      criteriaFilterMethod = () => {
        console.log("testtttttttttttttt  api ", GetListOfSiloSICLView);
        const criteria = {
          listFilterBean: this.state.listFilterBean,
          limit: this.state.limit,
        };
        axios
          .post(GetListOfSiloSICLView, SiloFilterCriteria, {
            params: {
              limit: SiloFilterCriteria.limit,
            },
          })
    
          .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success", response.data);
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
    
componentDidMount=()=>{

if(Silofilterdata.length!==0)
{

this.setState({
data:Silofilterdata

})

}else{

this.setState({
data:this.props.data

})

}

}

backHandler=()=>{
  console.log("silolist backhandler")
remover(siloid)
this.props.backHandler()

}



// editHandler=(props)=>{
//   this.setState({
//       siloedit: true,

//   })
//   this.state.siloeditnewdata.push(props)
//   siloEditHandler(props)
// }
editHandler=(props)=>{
  console.log("props",props)
  this.setState({
    siloedit: true,
    siloeditnewdata: props,
  })
  siloEditHandler(props)
 
}



editClosehandler=()=>{
  this.setState({
      siloedit: false,
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
               Header: "ID",
               accessor: "idSiloSi",
         },
         {
           Header: "Material type",
           accessor: "materialType",
         },
         {
           Header: "Location",
          //  accessor: "idlocationSilo",
           Cell: (props) => {
            return <div>{
              props.original.idlocationSilo != null
                  ? props.original.idlocationSilo.replace("19@", "")
                  : ""}</div>;
  
        }
         },
         {
           Header: "Silo number L3",
           accessor: "siloNumberl3",
         },
         {
          Header: "Bay",
          accessor: "bay",
        },
        {
          Header: "Status fill",
          Cell: (props) => {
            return (
              <text>
                {props.original.statusFill === 0 ? <span>Released</span> : props.original.statusFill === 1 ?<span>Filling</span> :
                 props.original.statusFill === 2 ? <span>Filled</span>:null}
              </text>
            );
          },
  
          //accessor:  a => ("statusFill"==="0"  ? "Release" :"statusFill"==="1"  ? "Filling" : "statusFill"==="2" ? "Filled" :"")
       //accessor:"statusFill",
        },
        {
          Header: "Gate",
          accessor: "gate",
        },
        {
          Header: "Use Process order",
          accessor: "useprocessOrder",
          Cell: (props) => {
            return (
              <input
              type="checkbox"
              checked={props.original.useprocessOrder===1}
               
                //onClick={() => this.editHandler(props.original)}
              >
                
              </input>
            );
          },
        },
        {
         Header: "Company",
         accessor: "idCompany",
       },
       {
         Header: "Intermediate Material Code",
         accessor: "idRefrence",
       }, 
      {
        Header: "IMC grade",
        accessor: "grade",
      },
      {
        Header: "IMC Batch",
        accessor: "batch",
      },
      {
       Header: "Content status",
       Cell: (props) => {
        return (
          <text>
            {props.original.idContentStatus === 0 ? <span>Available</span>
            :null}
          </text>
        );
      },
      //  accessor: "idContentStatus",
     },
     {
       Header: "IMC Quantity",
       accessor: "quantity",
     }, 
     {
      Header: "IMC Unit",
      accessor: "coefUnit",
    },
    {
      Header: "Density",
      accessor: "density",
    },
    {
     Header: "Loading status",
     Cell: (props) => {
      return (
        <text>
          {props.original.statussiloLoading === 100 ? <span>InActive</span> : props.original.statussiloLoading === 200 ?<span>Active</span> :
           props.original.statussiloLoading === 300 ? <span>Holding</span>:null}
        </text>
      );
    },
    //  accessor: "statussiloLoading",
   },
   {
     Header: "DCS release",
     accessor: "dcsRelease",
     Cell: (props) => {
      return (
        <input
        type="checkbox"
        checked={props.original.dcsRelease===1}
         
          //onClick={() => this.editHandler(props.original)}
        >
          
        </input>
      );
    },
   },
    {
    Header: "DCS loading process",
    accessor: "dcssiloloadingProcess",
    Cell: (props) => {
      return (
        <input
        type="checkbox"
        checked={props.original.dcssiloloadingProcess===1}
         
          //onClick={() => this.editHandler(props.original)}
        >
          
        </input>
      );
    },
  },
  {
    Header: "DCS Silo no",
    accessor: "silonumberDcs",
  },
  {
   Header: "DCS level coef",
   accessor: "coefdcsLevel",
 },
 {
   Header: "Process order",
   accessor: "idprocessOrder",
 },
  {
  Header: "DCS quantity",
  accessor: "quantityDcs",
},
{
  Header: "DCS level",
  accessor: "dcsLevel",
},
{
 Header: "DCS max level",
 accessor: "dcsmaxLevel",
},

{
  Header: "DCS level Progress",
  accessor: "dcsLevel",

  width: 170,
  Cell: (props) => {
    return (
      <progress id="file" value={props.original.dcsLevel} max="100"> {props.original.dcsLevel}% </progress>
    );
  },
},
 {
  Header: "Reference",
  // accessor: "idRefrence",
},
{
  Header: "Quantity",
  // accessor: "quantity",
},
{
 Header: "Unit",
//  accessor: "coefUnit",
},
{
 Header: "Grade",
//  accessor: "grade",
}, 
{
  Header: "Batch",
  // accessor: "batch",
},
{
  Header: "Container",
  // accessor: "",
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
 accessor: "mUsername",
},
         
       ];

        return (
            <React.Fragment>
{this.state.siloedit=== true||siloEditdata.length!==0?(
            <Silo_Edit  siloeditnewdata={this.state.siloeditnewdata}  editClosehandler={this.editClosehandler}/>):(
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
                    <a onClick={this.backHandler}>Silo search</a>
                  </b>
                </u>
                    &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a onClick={this.backHandler}>Silo Management</a>
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

                
</div>)}
            </React.Fragment>
          );
        }
}

export default Silo_List;