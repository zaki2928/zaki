import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button,  Label, Input} from "reactstrap";
import ProductEdit from './GeneralEdit';
import { FaEdit, FaTrashAlt, FaList, FaFileSignature, FaPrint, FaFileExport } from "react-icons/fa";
import Swal from "sweetalert2";
import { StockEditHandler, StockListData, StockListHandler,
   remover, StockEditData, } from '../../../store/Store';
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import StockEdit from './StockEdit';
import { FaCog, FaSdCard ,FaCalendarCheck,FaPrescriptionBottleAlt} from 'react-icons/fa';
import { FaRegShareSquare } from 'react-icons/fa';
import { FaRegListAlt } from 'react-icons/fa';
import {StockNewData , StockNewHandler} from "../../../store/Store";
import StockNew from "./StockNew"
import axios from "axios";
import { properties } from '../../../Properties/Properties';

const deletePackaging = properties.Port + properties.deletePackaging
class StockList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          orderEdit: false,
          shipping: false,
          shippingArr: [],
          shippingDisp: false,
          shippingDisplayArr: [],
          stocknew: false,
          stocknewArr: [],
        };
      }

      componentDidMount(){
        console.log("calling edit datttaaaaaaaaaaaaaaaaa")
        if (StockListData.length === 0) {
          console.log("length is zero");
          this.state.data.push(this.props.shippingArr);
          console.log("after data pushed in table", this.state.data);
        } else {
          console.log("length is not zero", StockListData);
        // this.state.data.push(StockListData)
        this.setState({
          data:StockListData
        },
        ()=>{
          console.log("after data pushed in table line 51", this.state.data);
        }
        
        )
         
        }
      }
        displayHandler = (props) => {
          console.log("ibzy display handler calling");
          StockListHandler(props);
          this.setState({
            shipping: true,
            shippingArr: props,
            orderEdit: false,
          });
        };

        displayCloseHandler = (props) => {
          console.log("ibzy edit handler calling");
      
          this.setState({
            shipping: false,
          });
        };

      
      backHandler=()=>{
        console.log("calling back handler for list")
        remover("StockList")
        this.props.shippingCloseHandler()
      }

      stockListHandler=(props)=>{
        console.log("check props dataaaaaa")
        this.setState({
          shippingDisp: true,
            
        })
        console.log("chekkkkkk", props)
        this.state.shippingDisplayArr.push(props)
        StockEditHandler(props)
      }

      shippingDiplayClosehandler=()=>{
        this.setState({
          shippingDisp: false,
        })
    }

    stocknewClosehandler=()=>{
      this.setState({
        stocknew: false,
      })
  }

    
StockNewEditionHandler=()=>{
  console.log("customer handler calling")
  StockNewHandler(StockListData)
  this.setState({
    stocknew: true,
  })
 this.state.stocknewArr.push(StockListData);
}

deleteHandler=(props)=> {
  console.log("Id  is", props.idPackaging)
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "gray",
    cancelButtonColor: "gray",
    confirmButtonText: "Yes, delete it!",
    msg:"",
  }).then((result) => {
    if (result) {
      axios.delete(deletePackaging + props.idPackaging)
        .then((response) => {
          console.log(" data", response);
          if (response.status === 200) {
            console.log("response data 200 success");
            this.setState({
              msg:""
            })
            this.componentDidMount();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
          // else if (response.status === 200 && response.data === 300) {
          //   console.log("response data 300 success");
          //   this.setState({
          //     msg: "*This packaging id is a child product"
          //   })  
          // }
          //  else if (response.status === 200 && response.data === 100){
          //   console.log("response data 100 success");
          //   this.setState({
          //     msg: "*You cannot delete this Pacaging as it is associated with another Table"
          //   })  
          // }
          else{
            this.setState({
              msg: "Invalid Packaging  ID"
            })  
          }
          
        })
        .catch((error) => {
          console.log(error);
        });
      // Swal.fire("Deleted!", "Your file has been deleted.", "success");
    }
  });
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
                      
                      
                      onClick={() => this.stockListHandler(props.original)}
                    >
                      Edit
                    </FaEdit>
                  );
                },
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
              
          {
            Header: "Technical ID",
            accessor: "idPackagingStk",
          },
          {
            Header: "ID",
            accessor: "idPackaging",
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
            Header: "Modified Date",
            accessor: "mDate",
            Cell: (props) => {
              return (
                <span>
                  {props.original.dateCreation === undefined
                ? ""
                : props.original.dateCreation === null
                ? ""
                : props.original.dateCreation === ""
                ? ""
                : props.original.dateCreation
                    .replace("T", " ")
                    .substring(0, props.original.dateCreation.lastIndexOf("."))}
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
              {this.state.shippingDisp === true || StockEditData.length !== 0 ? 
              <StockEdit shippingDisplayArr={this.state.shippingDisplayArr} shippingDiplayClosehandler={this.shippingDiplayClosehandler}/> :

              this.state.stocknew === true || StockNewData.length !== 0 ? 
              <StockNew stocknewArr={this.state.stocknewArr} stocknewClosehandler={this.stocknewClosehandler}/> :

              
              <Container
              className="themed-container"
               fluid={true}
                // style={{ border: "1px solid black", marginLeft: "14px" }}
        >
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
        <a onClick={this.backHandler}>Packagings Search</a>
      </b>
    </u>{" "}
    
    <Button style={{marginTop:"5px",float:"right",}} outline color="secondary"
                     
                     onClick={this.backHandler}
                    >
                      {" "}
                      General Tab
                    </Button>
                    <Button outline color="secondary" style={{marginTop:"5px", marginLeft:"5px",float:"right"}}
                     
                    
                     active="true"
                     >
                       {" "}
                       Stock Tab
                     </Button>

  </span>
  <br />
  <div class="row-xs-6 bottom-row ">
                  <input type="checkbox" id="myid"></input>
            {" "}
              <a  >Select All </a>{" "}
              <FaCalendarCheck
                  
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaCalendarCheck>{" "}
{/* <button >Configure</button> */}
<a >Validate Section</a>{" "}
<FaFileSignature
                  
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileSignature>{" "}
{/* <button >Configure</button> */}
<span 
onClick={this.StockNewEditionHandler}
>New</span>{" "}

        <FaCog
               
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaCog>{" "}
{/* <button >Configure</button> */}
<a >Configure List</a>{" "}
{/* <button class="btn5 some-margin"></button> */}
<FaRegShareSquare
                  
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaRegShareSquare>{" "}
                <a  >Reset Sort</a>{" "}
                <FaPrint
                  
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaPrint>{" "}
<a >Print</a>{" "}
<FaFileExport
                  
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileExport>{" "}
<a >Export</a>{" "}


 </div>
       <div>
          <hr/>
          <ReactTable
            className="-striped -highlight "
            data={this.state.data.length === 0
              ? this.props.shippingArr : this.state.data
            }
            columns={columns}
            defaultPageSize={5}
            showPaginationTop= {false}
            filterable
            defaultFilterMethod={this.filterCaseInsensitive}
          />
            </div>

            </Container>
              }
            </React.Fragment>
        );
    }
}

export default StockList;