import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button,  Label, Input} from "reactstrap";
import ProductEdit from './OrderEdit';
import { FaEdit, FaTrashAlt, FaList } from "react-icons/fa";
import { OrderDisplayData, OrderDisplayHandler,
   remover, } from '../../../store/Store';
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import OrderDisplayEdit from './OrderDisplayEdit';
import { FaCog, FaSdCard } from 'react-icons/fa';
import { FaRegShareSquare } from 'react-icons/fa';
import { FaRegListAlt } from 'react-icons/fa';

class OrderBox extends Component {

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
        console.log("calling edit datttaaaaaaaaaaaaaaaaa",OrderDisplayData)
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

        boxCloseHandler = (props) => {
          console.log("ibzy edit handler calling");
      
          this.setState({
            orderDisplay: false,
          });
        };

      
      backHandler=()=>{
        console.log("calling back handler for list")
        remover("OrderBox")
        this.props.boxCloseHandler()
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
            Header: "Box",
            accessor: "body",
          },
          {
            Header: "Box Preparation Warehouse",
            accessor: "printerName",
          },
          {
            Header: "Packaging Id",
            accessor: "isAvailable",
          },
          {
            Header: "Volume(dm3)",
            accessor: "modifiedby",
          },
          {
            Header: "Preparation Algorithm",
            accessor: "body",
          },
          {
            Header: "Container No in PO",
            accessor: "body",
          },
          {
            Header: "Status",
            accessor: "body",
          },
          {
            Header: "Shipping Status",
            accessor: "statusShipping",
          },
          {
            Header: "Preparation Mode",
            accessor: "body",
          },
          {
            Header: "Preparation Order Id",
            accessor: "idPrepOrder",
          },
          {
            Header: "Preparation Order",
            accessor: "idPrepOrder",
          },
          {
            Header: "Preparation Order Customer Id",
            accessor: "idPrepOrderCustomer",
          },
          {
            Header: "Preparation Order L3 Id",
            accessor: "idPrepOrderL3",
          },
          {
            Header: "Preparation Order Status",
            accessor: "statusPo",
          },
          {
            Header: "Preparation Order Type",
            accessor: "typePo",
          },
          {
            Header: "Stuffing Type",
            accessor: "typePoStuffing",
          },
          {
            Header: "Link",
            accessor: "plfLink",
          },
          {
            Header: "OBD1",
            accessor: "plfObd1",
          },
          {
            Header: "PO Preparation Warehouse",
            accessor: "warehousePreparationIds",
          },
          {
            Header: "Version",
            accessor: "versionLock",
          },

          
          {
            Header: "Modified the",
            accessor: "modifiedby",
          },
          {
            Header: "Modified by",
            accessor: "modifiedby",
          },
          
        ];
        return (
            <React.Fragment>
              
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
    &#8680;
    <u>
      {" "}
      <b>
        {" "}
        <a onClick={this.backHandler}>Boxes Management</a>
      </b>
    </u>{" "}
    
  </span>
  <br />
  <div class="row-xs-6 bottom-row ">
        <FaCog
                  style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
                  color="primary"
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaCog>{" "}
{/* <button >Configure</button> */}
<a href="#" >Configure List</a>{" "}
{/* <button class="btn5 some-margin"></button> */}
<FaRegShareSquare
                  style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
                  color="primary"
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaRegShareSquare>{" "}
                <a href="#" class="a71">Reset Sort</a>{" "}
                <FaRegListAlt
                  style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
                  color="primary"
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaRegListAlt>{" "}
<a href="#" class="a81">Print</a>{" "}
<FaSdCard
                  style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
                  color="primary"
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaSdCard>{" "}
<a href="#" class="a91">Export</a>
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
              
            </React.Fragment>
        );
    }
}

export default OrderBox;