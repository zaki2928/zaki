import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
  } from "reactstrap";
  import {
    IoArrowBackCircleSharp,
    IoArrowForwardCircleSharp,
  } from "react-icons/io5";
  
  import { FcSearch } from "react-icons/fc";
import { FaSave} from 'react-icons/fa';
import { remover,RackCriteriaHandler } from '../../../../store/Store';
import {
  IoIosArchive,
  IoIosRadioButtonOff,
  IoIosRefresh,
  IoIosRewind,
  IoIosSkipBackward,
  IoIosSkipForward,
} from "react-icons/io";
import axios from "axios";
import { properties } from '../../../../Properties/Properties';
import RackList from './RackList';
//const createRackProfile = properties.Port +properties.getListOfRackProfile
const createRackProfile =
properties.Port + properties.createRackProfile;
class RackEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      tabledata:[],
      createandselect: false,
      errmsg:"",
      msg:"",

     
    };
  }

  rackCreateSelect = () => {
    console.log("rack create and select");
    this.setState({
      createandselect : true,
    });
  };

  RackListback = () => {
    console.log("rack create and select back");
    this.setState({
      createandselect: false,
    });
  };
  componentDidMount(){
    console.log(this.props.data2)

  }

  RackCreatedTestMEthod = () => {
    console.log("rack creatttttteeeeeee calling=====================");
    const data = {
      idProfilCellRack:this.state.idProfilCellRack,
      defaultPR: this.state.defaultPR,
      description: this.state.description,
      mDate:this.state.mDate,
      mUsername:this.state.mUsername,
      versionLock:this.state.versionLock,

    };

    axios
      .post(createRackProfile, data)
      .then((response) => {
        if (response.status === 200) {
          console.log("response dta rack cell", response.data)
          remover("RackEdit")
          const criteria = {
            listFilterBean: [
              {
                attribute: "idProfilCellRack",
                operation: "=",
                value: response.data[0].idProfilCellRack,
              },
            ],
          };
          RackCriteriaHandler(criteria);

          this.backHandler(response.data);

          console.log(
            "resposne successsssssssssssssssssss by responseee data",
            response.data
          );

         
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  SubmitHandler = () => {
    //console.log("posting data", this.state);
    console.log("rack creatttttteeeeeee uzmii calling");
    const data = {
      idProfilCellRack:this.state.idProfilCellRack,
      defaultPR: this.state.defaultPR,
      description: this.state.description,
      mDate:this.state.mDate,
      mUsername:this.state.mUsername,
      versionLock:this.state.versionLock,
    };
    axios.post(createRackProfile, data)
      .then((response) => {
        if (response.status === 200) {

          console.log("resposne success", response.data);
          this.setState({
              errmsg :"",
            msg: "Data Saved Successfully",
          });
        }
      })
      .catch((error) => {
        console.log(error);

        this.setState({
            errmsg: error.response.data.message,
          });

      });
  };
  onchangehandler = (event) => {
    console.log("onchangehandler", event.target.value);
    // console.log("onchangehandler", event.target.name);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  backHandler=()=>{
    console.log("calling back handler for list")
    remover("RackEdit")
    this.props.newcloseHandler()
  };
 


    // passing data to the list page
    // backHandler = (data) => {
    //   console.log("backhandler calling rack cell-->", data);
    //   this.props.newcloseHandler(data);
    // };


    render() {
        return (
            <React.Fragment>
       
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}

        >
          {this.state.tabledata=== true  ?  (
            <RackList/>
           ) :this.state.createandselect === true ?(
           <rackCreateSelect RackListback={this.RackListback}/>
            ):(
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
                    <a style={{cursor:"pointer"}}onClick={this.backHandler}>Cell Racks Profile Search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}}onClick={this.backHandler}>Cell Racks Profile Management</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}}>Cell Racks Profile Edition</a>
                  </b>
                </u>
                &#62;
                {/* <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Wave Detail edition</a>
                  </b>
                </u> */}
              </span>
              <br />
              <div class="row-xs-6 bottom-row ">

                {/* {this.state.msg} */}

                <FaSave

                //   onClick={() => this.edithandler(props.original)}
                ></FaSave>{" "}
                {/* <button >Configure</button> */}
                <a
                  style={{ cursor: "pointer" }}
                  onClick={this.SubmitHandler}
                >
                  Create
                </a>{" "}
                <FaSave

                //   onClick={() => this.edithandler(props.original)}
                ></FaSave>{" "}
                {/* <button >Configure</button> */}
                <a
                  style={{ cursor: "pointer" }}
                  onClick={this.RackCreatedTestMEthod}
                >
                  Create and Select
                </a>{" "}
              </div>
              <span style={{color:"Green",  fontWeight: "bold"}}>&nbsp;&nbsp;&nbsp;{this.state.msg}</span>
              <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>

                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>

              </Row>

              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Description</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Description</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    type="text"
                    value={this.state.description}
                    name="description"
                    bsSize="sm"
                    onChange={this.onchangehandler}

                  />
                </Col>
                <Col></Col>

                <Col> </Col>
                    </Row>
               <Row style={{ marginTop: "10px" }}>
                 <Col>
                   <Label>Default Profile</Label>
                 </Col>
                
                <Col>
                <input  type="checkbox" />
                </Col>
                <Col> </Col>

              
                <Col> </Col>
                
             </Row>

              <br />
            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default RackEdit;