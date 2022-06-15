import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import Silo_List from "../silo/Silo_List";
import {Silofilterdata,siloFilterHandler,SiloFilterCriteriaHandler} from "../../../store/Store";
import { properties } from "../../../Properties/Properties";

import axios from "axios";
const GetListOfSiloSICLView =
  properties.Port + properties.GetListOfSiloSICLView;

 class Silo_Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
    silolist: false,
	limit: "",
    prodList: false,
    attribute: null,
    operation: "=",
    value: null,
	idSiloSi:"",
	idSilo:"",
	idSiloMt:"",
	versionLock:"",
	dcsLevel:"",
	dcsmaxLevel:"",
	quantityDcs:"",
	dcsRelease:"",
	dcssiloloadingProcess:"",
	statussiloLoading:"",
	silonumberDcs:"",
	coefdcsLevel:"",
	mDate:"",
	mUsername:"",
	idpackingLine:"",
	idprocessOrder:"",
	lastdataSend:"",
	idContentStatus:"",
	idGate:"",
	characUse:"",
	quantity:"",
	statusFill:"",
	useprocessOrder:"",
	sellbyDate:"",
	usebyDate:"",
	bay:"",
	batch:"",
	feat1:"",
	feat2:"",
	feat3:"",
	idCompany:"",
	descriptionUnit:"",
	grade:"",
	idlocationSilo:"",
	idRefrence:"",
	siloNumberl3:"",
	coefUnit:"",
	density:"",
	materialType:"",
	idSite:"",
	listFilterBean: [],
  criteria:"",
	  
    };
  }
 criteriaFilterMethod = () => {
  const length = this.state.listFilterBean.length;
  const listFilterBean = [];
    console.log("testtttttttttttttt  api ", GetListOfSiloSICLView);
    for (let i = 0; i < length; i++) {
      console.log("value of ii", i);
      if (this.state.listFilterBean[i].value !== " ") {
        listFilterBean.push(this.state.listFilterBean[i]);
      }
    }
    console.log("on submittIIIIIIIng", listFilterBean);
    this.setState({
      listFilterBean: listFilterBean,
    });
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(GetListOfSiloSICLView, criteria, {
        params: {
          limit: this.state.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
            silolist: true,
          });
          siloFilterHandler(response.data);
          SiloFilterCriteriaHandler(criteria);
        } else {
          this.setState({
            silolist: true,
            data: [],
          });
          siloFilterHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeHandler = (event) => {
   
    console.log("index BEFORE UPDATE print", this.state.listFilterBean);
    var index = this.state.listFilterBean.findIndex(
      (data) => data.attribute === event.target.name
    );
    if (index === -1) {
      const data = {
        attribute: event.target.name,
        operation: event.target.value,
        value: " ",

      };
      this.state.listFilterBean.push(data);
    } else {
      //  this.state.listFilterBean[index]
      console.log(
        "ELSE PARTTTTTT",
        (this.state.listFilterBean[index].operation = event.target.value)
      );
    }
    // this.state.listFilterBean[index] = {
    //   operation: event.target.value
    // }
    console.log("index AFTER UPDATE print", this.state.listFilterBean);
    // this.setState({
    //   attribute: event.target.name,
    //   operation: event.target.value
    // })
  };

  inputChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

 
  onBlurHandler = (criteria) => {
    console.log("calling onBlurrrrr", criteria.target.name);
    console.log("calling onBlurrrrr", criteria.target.value);
    var index = this.state.listFilterBean.findIndex(
      (data) => data.attribute === criteria.target.name
    );
    console.log("INDEX VALUE FOR IF PART IN ALUE", index);
  
    if (criteria.target.value !== "") {
      if (criteria.target.name === "materialType") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.materialType,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.materialType;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "siloNumberl3") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.siloNumberl3,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.siloNumberl3;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "silonumberDcs") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.silonumberDcs,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.silonumberDcs;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "statusFill") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.statusFill,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.statusFill;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }  
    }
    else {
        console.log("value is blank", index);
        this.state.listFilterBean.splice(index, 1);
        console.log("after splice", this.state.listFilterBean);
      }
     
  console.log("calling criteriaARRRR", this.state.listFilterBean);
    this.setState({
      attribute: "",
      operation: "=",
    });
  };

  limitchangehandler = (event) => {
    if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
      this.setState({
        [event.target.name]: event.target.value,
      });
    } else {
    }
  };

  resetdata = () => {
    console.log("reset handler");
    this.setState({
    silolist: false,
	limit: "",
    prodList: false,
    attribute: null,
    operation: "=",
    value: null,
	idSiloSi:"",
	idSilo:"",
	idSiloMt:"",
	versionLock:"",
	dcsLevel:"",
	dcsmaxLevel:"",
	quantityDcs:"",
	dcsRelease:"",
	dcssiloloadingProcess:"",
	statussiloLoading:"",
	silonumberDcs:"",
	coefdcsLevel:"",
	mDate:"",
	mUsername:"",
	idpackingLine:"",
	idprocessOrder:"",
	lastdataSend:"",
	idContentStatus:"",
	idGate:"",
	characUse:"",
	quantity:"",
	statusFill:"",
	useprocessOrder:"",
	sellbyDate:"",
	usebyDate:"",
	bay:"",
	batch:"",
	feat1:"",
	feat2:"",
	feat3:"",
	idCompany:"",
	descriptionUnit:"",
	grade:"",
	idlocationSilo:"",
	idRefrence:"",
	siloNumberl3:"",
	coefUnit:"",
	density:"",
	materialType:"",
	idSite:"",
	listFilterBean: [],
	  
      });
  };
  backHandler = () => {
    console.log("calling back handler");
	 this.setState({
       silolist: false,
	limit: "",
    prodList: false,
    attribute: null,
    operation: "=",
    value: null,
	idSiloSi:"",
	idSilo:"",
	idSiloMt:"",
	versionLock:"",
	dcsLevel:"",
	dcsmaxLevel:"",
	quantityDcs:"",
	dcsRelease:"",
	dcssiloloadingProcess:"",
	statussiloLoading:"",
	silonumberDcs:"",
	coefdcsLevel:"",
	mDate:"",
	mUsername:"",
	idpackingLine:"",
	idprocessOrder:"",
	lastdataSend:"",
	idContentStatus:"",
	idGate:"",
	characUse:"",
	quantity:"",
	statusFill:"",
	useprocessOrder:"",
	sellbyDate:"",
	usebyDate:"",
	bay:"",
	batch:"",
	feat1:"",
	feat2:"",
	feat3:"",
	idCompany:"",
	descriptionUnit:"",
	grade:"",
	idlocationSilo:"",
	idRefrence:"",
	siloNumberl3:"",
	coefUnit:"",
	density:"",
	materialType:"",
	idSite:"",
	listFilterBean: [],
    });
  };


  render() {
    return (
      <React.Fragment>
       
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
          {this.state.silolist === true ||Silofilterdata.length!==0? (
            <Silo_List 
            backHandler={this.backHandler}
            data={this.state.data}/>
          ) : (
            <div>
              <IoArrowBackCircleSharp />
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
                    <a>Silo Search</a>
                  </b>
                </u>
              </span>
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Silo Criteria</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Material Type</Label>{" "}
                </Col>

                <Col>
                  {" "}
                     <Input
                    type="select"
                    name="materialType"
                    id="exampleSelect"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    {/* <option>---select---</option> */}
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    {/* <option value=">">&gt;</option> */}
                    {/* <option value="<">&lt;</option> */}
                    {/* <option value="<=">&le;</option> */}
                    {/* <option value=">=">&ge;</option> */}
                    <option value="STARTS">STARTS_WITH</option>
                    <option value="CONTAINS">CONTAINS</option>
                    <option value="AMONG">AMONG</option>
                    <option value="NOT AMONG">NOT_AMONG</option>
                    <option value="MATCHES">MATCHES</option>
                    <option value="NOT MATCHES">NOT_MATCHES</option>
                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    name="materialType"
                    value={this.state.materialType}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("materialType")}
                  />
                    
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Silo no L3</Label>{" "}
                </Col>
                <Col>
                  {" "}
                    <Input
                    type="select"
                    name="siloNumberl3"
                    id="exampleSelect"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    {/* <option>---select---</option> */}
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    {/* <option value=">">&gt;</option> */}
                    {/* <option value="<">&lt;</option> */}
                    {/* <option value="<=">&le;</option> */}
                    {/* <option value=">=">&ge;</option> */}
                    <option value="STARTS">STARTS_WITH</option>
                    <option value="CONTAINS">CONTAINS</option>
                    <option value="AMONG">AMONG</option>
                    <option value="NOT AMONG">NOT_AMONG</option>
                    <option value="MATCHES">MATCHES</option>
                    <option value="NOT MATCHES">NOT_MATCHES</option>
                  </Input>
                </Col>
                <Col>
                  {" "}
                 <Input
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    name="siloNumberl3"
                    value={this.state.siloNumberl3}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("siloNumberl3")}
                  />

                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>DCS silo no</Label>{" "}
                </Col>
                <Col>
                  {" "}
                    <Input
                    type="select"
                    name="silonumberDcs"
                    id="exampleSelect"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    {/* <option>---select---</option> */}
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    <option value=">">&gt;</option>
                    <option value="<">&lt;</option>
                    <option value="<=">&le;</option>
                    <option value=">=">&ge;</option>
                    {/* <option value="STARTS">STARTS_WITH</option> */}
                    {/* <option value="CONTAINS">CONTAINS</option> */}
                    {/* <option value="AMONG">AMONG</option> */}
                    {/* <option value="NOT AMONG">NOT_AMONG</option> */}
                    {/* <option value="MATCHES">MATCHES</option> */}
                    {/* <option value="NOT MATCHES">NOT_MATCHES</option> */}
                  </Input>
                </Col>
                <Col>
                  {" "}
                 <Input
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    name="silonumberDcs"
                    value={this.state.silonumberDcs}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("silonumberDcs")}
                  />
                </Col>

                <Col></Col>
                <Col>
                  <Label>Status fill</Label>{" "}
                </Col>
                <Col>
                  {" "}
                    <Input
                    type="select"
                    name="statusFill"
                    id="exampleSelect"
                    onChange={this.changeHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    {/* <option>---select---</option> */}
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    {/* <option value=">">&gt;</option> */}
                    {/* <option value="<">&lt;</option> */}
                    {/* <option value="<=">&le;</option> */}
                    {/* <option value=">=">&ge;</option> */}
                    {/* <option value="STARTS">STARTS_WITH</option> */}
                    {/* <option value="CONTAINS">CONTAINS</option> */}
                    <option value="AMONG">AMONG</option>
                    <option value="NOT AMONG">NOT_AMONG</option>
                    {/* <option value="MATCHES">MATCHES</option> */}
                    {/* <option value="NOT MATCHES">NOT_MATCHES</option> */}
                  </Input>
                </Col>
                <Col>
                  {" "}
                       <Input
                    type="select"
                    name="statusFill"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    value={this.state.statusFill}
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    // onBlur={() => this.onBlurHandler("company")}
                    onBlur={this.onBlurHandler}
                  >
                    {" "}
                    <option value="">---select-----</option>
                    <option value="0">Released</option>
                    <option value="1">Filling</option>
                    <option value="2">Filled</option>
                  </Input>
                </Col>
                <Col> </Col>
              </Row>
              
             


              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Maximum results</Label>{" "}
                </Col>
                <Col>
                  {" "}
                    <Input
                    type="text"
                    name="text"
                    id="exampleSelect"
                    value="<="
                    // style={{ width: "60px" }}
                    bsSize="sm"
                    readOnly
                  >
                    value=&le;
                  </Input>
                </Col>
                <Col>
                  {" "}
                   <Input
                    bsSize="sm"
                    onChange={this.limitchangehandler}
                    name="limit"
                    value={this.state.limit}
                  />
                  
                    
                </Col>
                <Col> </Col>
                <Col>
                
                </Col>
                <Col></Col>
                <Col>
            
                </Col>
                <Col></Col>
              </Row>

        

              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Button  onClick={this.resetdata}>Reset Criteria</Button>{" "}
                <Button 
                 onClick={this.criteriaFilterMethod}
                >
                  {" "}
                  Display
                </Button>
              </div>

            </div>
          )}
        </Container>
      
      </React.Fragment>
    );
  }
}

export default Silo_Filter;