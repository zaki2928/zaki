import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button,  Label, Input} from "reactstrap";
import ProductEdit from './OrderEdit';
import { FaPrint, FaFileExport } from "react-icons/fa";
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

class OrderComments extends Component {

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

        commentCloseHandler = (props) => {
          console.log("ibzy edit handler calling");
      
          this.setState({
            orderDisplay: false,
          });
        };

      
      backHandler=()=>{
        console.log("calling back handler for list")
        remover("OrderComments")
        this.props.commentCloseHandler()
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
            Header: "ID",
            accessor: "body",
          },
          {
            Header: "Preparation Order ID",
            accessor: "printerName",
          },
          {
            Header: "Category",
            accessor: "isAvailable",
          },
          {
            Header: "Comment",
            accessor: "modifiedby",
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
        <a>Preparation Order search</a>
      </b>
    </u>{" "}
    &#62;
    <u>
      {" "}
      <b>
        {" "}
        <a onClick={this.backHandler}>Preparation Orders Management</a>
      </b>
    </u>{" "}
    &#62;
    <u>
      {" "}
      <b>
        {" "}
        <a>Preparation Order Comments</a>
      </b>
    </u>{" "}
  </span>
  <br />
  <div class="row-xs-6 bottom-row " style={{marginTop:"10px"}}>
                <FaPrint
                  
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaPrint>{" "}
<a >Print</a>{" "}
<FaFileExport
                 
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileExport>{" "}
<a  >Export</a>{" "}


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

export default OrderComments;