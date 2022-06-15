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
  import { FaSave} from "react-icons/fa";
  import axios from 'axios';
  import {remover,RackDisplayData ,RackCriteriaHandler} from '../../../../store/Store';
import RackDisplay from './RackDisplay';
import { properties } from '../../../../Properties/Properties';
const createProfileLine =
properties.Port + properties.createProfileLine;
const getListOfAllPackaging =
  properties.Port + properties.getListOfAllPackaging;
// const getListOfAllPackaging = properties.Port  ="rackprofile/getListOfAllPackaging/";
class RackDisplayNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
        data: [],
        tabledata:[],
        newDisp: false,
        newDisplayArr: [],
        creatselect:false,
        errmsg:"",
        msg:"",
        numberOfContainer:"",
        idpackagingList: [],
        idPackaging:"",
        description:""

    };
  }

  rackCreateeSelect = () => {
    console.log("rack create and select");
    this.setState({
      creatselect : true,
    });
  };

  RackkListback = () => {
    console.log("rack create and select back");
    this.setState({
      creatselect: false,
    });
  };

  getListOfAllPackaging=()=>{
    console.log("calling region from dropdown", this.state.idpackagingList) 
        axios.get(getListOfAllPackaging)
    
          .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success uzmmmmmaaaa", response.data);
              this.setState({
                idpackagingList: response.data,
              });
    
            } else {
              this.setState({
                idpackagingList: [],
              });
              
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
  
  componentDidMount(){
    this.getListOfAllPackaging();
    console.log(this.props.newDisplayArr)

    console.log("length is not zero", RackDisplayData);
    this.setState({
      description:RackDisplayData.description,
    });
  }
  RackLineCreatedTestMEthod = () => {
    console.log("rack creatttttteeeeeee calling=====================");
    const data = {
      idProfilCrLine:this.state.idProfilCrLine,
    mDate:this.state.mDate,
    mUsername:this.state.mUsername,
    versionLock:this.state.versionLock,
    numberOfContainer:this.state.numberOfContainer,
    idPackaging:this.state.idPackaging,
    idProfilCellRack:RackDisplayData.idProfilCellRack,
    profil:this.state.profil,
    };

    axios
      .post(createProfileLine, data)
      .then((response) => {
        if (response.status === 200) {
          console.log("response dta rack cell", response.data)
          remover("RackDisplayNew")
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
      idProfilCrLine:this.state.idProfilCrLine,
    mDate:this.state.mDate,
    mUsername:this.state.mUsername,
    versionLock:this.state.versionLock,
    numberOfContainer:this.state.numberOfContainer,
    idPackaging:this.state.idPackaging,
    idProfilCellRack:RackDisplayData.idProfilCellRack,
    profil:this.state.profil,
    };
    axios.post(createProfileLine, data)
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

  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };


backHandler=()=>{
  console.log("calling back handler for list")
  remover("RackDisplayNew")
  this.props.newDiplayClosehandler()
}

backHandler = (data) => {
  console.log("backhandler calling rack cell-->", data);
  remover("RackDisplayNew")
  this.props.newDiplayClosehandler(data);
};


    render() {
        return (
          <React.Fragment>
       
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}

        >
          {this.state.tabledata=== true  ?  (
            <RackDisplay/>
           ) :this.state.creatselect === true ?(
           <rackCreateeSelect RackkListback={this.RackkListback}/>
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
                    <a onClick={this.backHandler}>Cell Racks Profile Search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a onClick={this.backHandler}>Cell Racks Profile Management</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a onClick={this.backHandler}>Cell Racks Profile Line Management</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                 <a>Cell Racks Profile Line Edition</a>
                  </b>
                </u>
              </span>
              <br />
              <Row style={{ marginTop: "10px" }}>
                     <Col>
                       <Label>Description</Label>{" "}
                       
                     </Col>
                     <Col>
                       {" "}
                       <input value={this.state.description} />
                     </Col>
                
     
                     
                     <Col>
                       {/* <Label>Name</Label>{" "} */}
                     </Col>
                     
                     <Col>
                       {/* {" "}
                       <Input bsSize="sm" /> */}
                     </Col>
                     <Col> </Col>
                   </Row>
                   <hr/>
                   <div>
            <div class="row-xs-6 bottom-row " style={{marginBottom:"10px",marginTop:"10px"}}>
            <FaSave
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaSave>{" "}

<a 
 style={{ cursor: "pointer" }}
 onClick={this.SubmitHandler}
>Create</a>{" "}
{" "}<FaSave
                
           
                >
                  
                </FaSave>{" "}
 
<a 
 style={{ cursor: "pointer" }}
 onClick={this.RackLineCreatedTestMEthod}

>Create and Select</a>{" "}
 </div>      

 <span style={{color:"Green",  fontWeight: "bold"}}>&nbsp;&nbsp;&nbsp;{this.state.msg}</span>
             

            </div> 


             
                <div>
                  <hr />
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
                  <Label>Packaging</Label>
                </Col>
                
                <Col>
                <Input
                        type="select"
                        name="idPackaging"
                        id="idPackaging"
                        // style={{ width: "60px" }}
                        value={this.state.idPackaging}
                        bsSize="sm"
                        onChange={this.onchangehandler}
                        // onBlur={() => this.onBlurHandler("company")}
                        // onBlur={this.onBlurHandler}
                      >
                         <option value="">---select---</option>
                      {this.state.idpackagingList.map(data => <option value={data.idPackaging} key={data.idPackaging}>{data.description}</option>)}
                      </Input>
                </Col>
                <Col> </Col>

              
                <Col> </Col>
                
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>No of Containers</Label>
                </Col>
                
                <Col>
                {" "}
                <Input
                    type="text"
                    value={this.state.numberOfContainer}
                    name="numberOfContainer"
                    bsSize="sm"
                    onChange={this.onchangehandler}

                  />
                </Col>
                <Col> </Col>

              
                <Col> </Col>
                
              </Row>
             
    
                 
                </div> 


              <br />
            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}
export default RackDisplayNew;