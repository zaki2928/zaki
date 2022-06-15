import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button,  Label, Input} from "reactstrap";
import ProductEdit from './OrderEdit';
import { FaEdit, FaTrashAlt, FaList } from "react-icons/fa";
import { ShippingDispEditHandler, ShippingDisplayData, ShippingDisplayHandler,
   remover, ShippingDispEditData, } from '../../../store/Store';
import { FaPrint, FaFileExport } from "react-icons/fa";
import ShippingDisplayEdit from './ShippingDisplayEdit';


class ShippingDisplay extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          orderEdit: false,
          shipping: false,
          shippingArr: [],
          shippingDisp: false,
          shippingDisplayArr: [],
          siteLog: false,
          siteLogArr: [],
        };
      }

      componentDidMount(){
        console.log("calling edit datttaaaaaaaaaaaaaaaaa")
        if (ShippingDisplayData.length === 0) {
          console.log("length is zero");
          this.state.data.push(this.props.shippingArr);
          console.log("after data pushed in table", this.state.data);
        } else {
          console.log("length is not zero", ShippingDisplayData);
         this.state.data.push(ShippingDisplayData)
          console.log("after data pushed in table", this.state.data);
        }
      }
        displayHandler = (props) => {
          console.log("ibzy display handler calling");
          ShippingDisplayHandler(props);
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
        remover("ShippingDisplay")
        this.props.shippingCloseHandler()
      }

      shippingDisplayHandler=(props)=>{
        console.log("check props dataaaaaa")
        this.setState({
          shippingDisp: true,
            
        })
        console.log("chekkkkkk", props)
        this.state.shippingDisplayArr.push(props)
        ShippingDispEditHandler(props)
      }

      shippingDiplayClosehandler=()=>{
        this.setState({
          shippingDisp: false,
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
                      
                      onClick={() => this.shippingDisplayHandler(props.original)}
                    >
                      Edit
                    </FaEdit>
                  );
                },
              },
              
          {
            Header: "Technical ID",
            accessor: "body",
          },
          {
            Header: "Carrier",
            accessor: "printerName",
          },
          {
            Header: "Carrier Recieved",
            accessor: "isAvailable",
          },
          {
            Header: "Dispatch Mode",
            accessor: "modifiedby",
          },
          {
            Header: "Dispatch Mode",
            accessor: "isAvailable",
          },
          {
            Header: "Means of Transport",
            accessor: "modifiedby",
          },
          {
            Header: "Location",
            accessor: "isAvailable",
          },
          {
            Header: "Palletisation Type",
            accessor: "modifiedby",
          },
          {
            Header: "Gate",
            accessor: "isAvailable",
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
              {this.state.shippingDisp === true || ShippingDispEditData.length !== 0 ? 
              <ShippingDisplayEdit shippingDisplayArr={this.state.shippingDisplayArr} shippingDiplayClosehandler={this.shippingDiplayClosehandler}/> :
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
        <a onClick={this.backHandler}>Container Display</a>
      </b>
    </u>{" "}
    &#62;
    <u>
      {" "}
      <b>
        {" "}
        <a>Preparation Orders Management</a>
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
              ? this.props.shippingArr : this.state.data
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

export default ShippingDisplay;