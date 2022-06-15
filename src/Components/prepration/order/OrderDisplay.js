import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button,  Label, Input} from "reactstrap";
import ProductEdit from './OrderEdit';
import { FaEdit, FaTrashAlt, FaList } from "react-icons/fa";
import { OrderDispEditHandler, OrderDisplayData, OrderDisplayHandler,
   remover, OrderDispEditData, } from '../../../store/Store';
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FaPrint, FaFileExport } from "react-icons/fa";
import { FcSearch } from "react-icons/fc";
import OrderDisplayEdit from './OrderDisplayEdit';
import { FaCog, FaSdCard } from 'react-icons/fa';
import { FaRegShareSquare } from 'react-icons/fa';
import { FaRegListAlt } from 'react-icons/fa';

class OrderDisplay extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          orderEdit: false,
          orderDisplay: false,
          isdisplaydata: [],
          editDisp: false,
          editDisplayArr: [],
          siteLog: false,
          siteLogArr: [],
        };
      }

      componentDidMount(){
        console.log("calling edit datttaaaaaaaaaaaaaaaaa")
        if (OrderDisplayData.length === 0) {
          console.log("length is zero");
          this.state.data.push(this.props.isdisplaydata);
          console.log("after data pushed in table", this.state.data);
        } else {
          console.log("length is not zero", OrderDisplayData);
         this.state.data.push(OrderDisplayData)
          console.log("after data pushed in table", this.state.data);
        }
      }
        displayHandler = (props) => {
          console.log("ibzy display handler calling");
          OrderDisplayHandler(props);
          this.setState({
            orderDisplay: true,
            isdisplaydata: props,
            orderEdit: false,
          });
        };

        displayCloseHandler = (props) => {
          console.log("ibzy edit handler calling");
      
          this.setState({
            orderDisplay: false,
          });
        };

      
      backHandler=()=>{
        console.log("calling back handler for list")
        remover("OrderDisplay")
        this.props.displayCloseHandler()
      }

      editDisplayHandler=(props)=>{
        console.log("check props dataaaaaa")
        this.setState({
           editDisp: true,
            
        })
        console.log("chekkkkkk", props)
        this.state.editDisplayArr.push(props)
        OrderDispEditHandler(props)
      }

      editDiplayClosehandler=()=>{
        this.setState({
          editDisp: false,
        })
    }

  

    siteLogisticClosehandler=()=>{
      this.setState({
        siteLog: false,
      })
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
                      
                      onClick={() => this.editDisplayHandler(props.original)}
                    >
                      Edit
                    </FaEdit>
                  );
                },
              },
              {
                Header: "ID",
                accessor: "body",
              },
          {
            Header: "Preparation Order ID",
            accessor: "idPrepOrder",
          },
          {
            Header: "Reception Line ID",
            accessor: "printerName",
          },
          {
            Header: "Reference",
            accessor: "idReference",
          },
          {
            Header: "Logistoc Unit ID",
            accessor: "idLogisticUnit",
          },
          {
            Header: "Qty Per Package",
            accessor: "qtyPerPackage",
          },
          {
            Header: "Qty to be prepared",
            accessor: "qtyToBePrep",
          },
          {
            Header: "Batch",
            accessor: "batch",
          },
          {
            Header: "Customer Product Code",
            accessor: "customerProductCode",
          },
          {
            Header: "Customer Product Description",
            accessor: "customerProductDescription",
          },
          {
            Header: "Content Status",
            accessor: "contentStatusId",
          },
          {
            Header: "Modified the",
            accessor: "modifiedby",
          },
          {
            Header: "Modified by",
            accessor: "modifiedby",
          },
          {
            Header: "Silo Number L3",
            accessor: "zSiloNumberL3",
          },
          {
            Header: "Customer Reference",
            accessor: "zCustomerRef",
          },
          {
            Header: "Bolt Thrower",
            accessor: "zBeltThrower",
          },
          
        ];
        return (
            <React.Fragment>
              {this.state.editDisp === true || OrderDispEditData.length !== 0 ? 
              <OrderDisplayEdit editDisplayArr={this.state.editDisplayArr} editDiplayClosehandler={this.editDiplayClosehandler}/> :
              <Container
              className="themed-container"
               fluid={true}
                // style={{ border: "1px solid black", marginLeft: "14px" }}
        >
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
        <a style={{cursor:"pointer"}}>Preparation Order search</a>
      </b>
    </u>{" "}
    &#62;
    <u>
      {" "}
      <b>
        {" "}
        <a style={{cursor:"pointer"}}onClick={this.backHandler}>Preparation Orders Management</a>
      </b>
    </u>{" "}
    &#62;
    <u>
      {" "}
      <b>
        {" "}
        <a style={{cursor:"pointer"}}>Preparation Order Lines Management</a>
      </b>
    </u>{" "}
  </span>
  <br />
  <div class="row-xs-6 bottom-row " style={{marginTop:"10px"}}>
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
       <div>
          <hr/>
          <ReactTable
            className="-striped -highlight "
            data={this.state.data.length === 0
              ? this.props.isdisplaydata : this.state.data
            }
            columns={columns}
            defaultPageSize={10}
            showPaginationTop= {true}
            filterable
          />
            </div>

            </Container>
              }
            </React.Fragment>
        );
    }
}

export default OrderDisplay;