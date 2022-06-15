import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";
import Modal from 'react-modal'
import ModalHeader from '../../prepration/wave/ModalHeader'
import axios from "axios";
import Swal from "sweetalert2";
import { properties } from '../../../Properties/Properties';

const boxReplaceWithAnotherBatch =
properties.Port + properties.boxReplaceWithAnotherBatch;
export default class BoxreplacementModal extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
      batch:'',
      exceptionmsg: "",
    }
  }

  deleteHandler() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
  // validateData=()=>
  // {
  //   console.log("+++++++++++++++++++++++++++",this.props.boxData);
  //   console.log("+++++++++++++++++++++++++++@@",this.state.batch);
   
  // }
  onChangeHandler=(event)=>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  submitHandler=()=>{
  
    const data={
      batch: this.state.batch,
       idContainer: this.props.boxData
    }
    console.log("+++++++++++++++++++++++++++@@",data);
    axios.post(boxReplaceWithAnotherBatch, data)
    .then((response) => {
      if (response.status === 200) {
        console.log("resposne success", response.data);
        this.setState({
          msg: "box replaced successfully",
        });
        this.props.closeModal()
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        exceptionmsg: error.response.data.message,
      });
    });
  }
  
  render() {
    return (
      <div>
        <Modal
          // onAfterOpen={this.validateData}
          isOpen={this.props.isOpen}
          //   onAfterOpen={afterOpenModal}
          onRequestClose={this.props.closeModal}
          style={{
            content: {
              top: "70%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "35%",
              height: "auto",
              position: "fixed",
              style:"font-weight: bold",
            },
            overlay: {
              background: "rgba(0,0,0,0.8)",
            },
          }}
        >
           
          <ModalHeader close={this.props.closeModal} />

          <Row style={{ marginTop: "10px" }}>

              <Col >
      
      <Label>Please Enter the new Batch:</Label>{" "}
      </Col>
      </Row>
          <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Batch</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                        type="text"
                        name="batch"
                       
                  onChange={this.onChangeHandler}
                        value={this.state.batch}
                        bsSize="sm"
                        // onChange={this.inputChangeHandler}
                        // onBlur={this.onBlurHandler}
                      >
                        
                      </Input>
                    </Col>
                    <Col> </Col>
                    </Row>
                    <br/>
          {/* <label for="Enter Input">Enter Input:</label><br/>
          <input type="text" id="Enter" name="Enter"></input> */}

          <Row>
            <Col>
              <button
                onClick={this.submitHandler}
                // disabled={this.state.errormsg2===""?false:true}
                  style={{
                    float: "left",
                    cursor: "pointer",
                    height: "30px",
                    width: "60px",
                    borderRadius: "5px",
                    }}
                  // border: "2px solid black",
                  // borderRadius: "5px",
                  // width: "inherit",
                
              >
              <text style={{ fontSize: "15px", fontWeight: "bold" }}>
              OK
              </text>
                
              </button>
            </Col>
            <Col>
              <button
                style={{
                  float: "left",
                  cursor: "pointer",
                  height: "30px",
                  width: "60px",
                  borderRadius: "5px",
                  marginLeft: "20px",
                  // border: "2px solid black",
                  // borderRadius: "5px",
                  // width: "inherit",
                }}
                onClick={this.props.closeModal}

              >
              <text style={{ fontSize: "15px", fontWeight: "bold" }}>
              Cancel
              </text>
               
              </button>
            </Col>
            <Col> <span
              style={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              {this.state.exceptionmsg}
            </span></Col>
            </Row>
          </Modal>
      </div>
    )
  }
}
