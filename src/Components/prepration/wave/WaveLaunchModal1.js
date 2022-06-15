import React, { Component } from "react";
import Modal from "react-modal";
import ModalHeader from "../wave/ModalHeader";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";

export default class WaveLaunchModal1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      errormsg2:""
      //Available Stock is less than required quantity
    };
  }
  validateData=()=>
  {
    console.log("+++++++++++++++++++++++++++",this.props.data);
    for (let index = 0; index < this.props.data.length; index++) {
      //const element = array[index];
      if(this.props.data[index].qtyToPrepare>this.props.data[index].qtyAvailable)
      {
        this.setState({
          errormsg2:"Available Stock is less than required quantity"
        })
      }
    }
  }
  render() {
    const columns = [
      {
        Header: "Product",
        accessor: "reference",
      },
      {
        Header: "Unit",
        accessor: "unit",
      },

      {
        Header: "Batch",
        accessor: "batch",
      },

      {
        Header: "Needed",
        accessor: "qtyToPrepare",
      },
      {
        Header: "Total Stock",
        accessor: "qtyAvailable",
      },
      {
        Header: "WH",
        accessor: "qtyAvailable",
      },
      {
        Header: "RT1",
        Cell: (props) => {
          return <div>0</div>;
        },
      },

      {
        Header: "SOLA",
        // accessor: "totalstock",
        Cell: (props) => {
          return <div>0</div>;
        },
      },
      {
        Header: "Missing",
        accessor: "qtyMissing",
        
      },
    ];
    return (
      <div>
        
        <Modal
          isOpen={this.props.modalIsOpen1}
          onAfterOpen={this.validateData}
          onRequestClose={this.props.openModalIsclose1}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              height: "auto",
              position: "fixed",
            },
            overlay: {
              background: "rgba(0,0,0,0.8)",
            },
          }}
        >
        
          <ModalHeader close={this.props.openModalIsclose1} />
          <div>
          {/* {this.state.errormsg} */}
          {
                    this.props.qtyAvailable <  this.props.qtyToPrepare ?<span style={{
                      color:"red",
                      fontWeight: "bold"
                    }}>
                    {
                    this.props.errormsg
                    }
                    </span>:""
                  }
              {this.props.errormsg} 
              {/* {this.state.errormsg2}     */}
          </div>
          <span 
          style={{color:'red',fontWeight: 'bold'}}
          >{this.state.errormsg2}</span>
          <ReactTable
            style={{
              marginLeft: "-20px",
              marginRight: "-20px",
              marginBottom: "-20px",
            }}
            className="-striped -highlight "
            data={this.props.data}
            columns={columns}
            defaultPageSize={this.props.data.length + 1}
            filterable
          />
          <br />
          <Row>
            <Col>
              <button
                onClick={this.props.onWhClick}
                disabled={this.state.errormsg2===""?false:true}
                style={{
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "inherit",
                }}
                
              >
                WH
              </button>
            </Col>
            <Col>
              <button
                style={{
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "inherit",
                }}
              >
                RT1
              </button>
            </Col>
            <Col>
              <button
                style={{
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "inherit",
                }}
              >
                SOLA
              </button>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col>
              <button
                style={{
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "inherit",
                }}
              >
                CONFIGURE
              </button>
            </Col>
          </Row>

          <br />
          <Row>
            <Col></Col>
            <Col></Col>
            <Col>
              <button
                style={{
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "inherit",
                }}
              >
                Refresh
              </button>
            </Col>
            <Col>
              <button
                style={{
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "inherit",
                }}
                onClick={this.props.openModalIsclose1}
              >
                Cancel
              </button>
            </Col>

            <Col></Col>
            <Col></Col>
          </Row>

          {/* <button onClick={this.props.onWhClick}>WH</button> */}
        </Modal>
      </div>
    );
  }
}
