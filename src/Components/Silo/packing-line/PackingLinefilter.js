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
import PackingLineList from "./PackingLineList";
import {packinglineHandler, Packinglinedata, PackinglinedataCriteriaHandler} from '../../../store/Store';
import { properties } from "../../../Properties/Properties";

import axios from "axios";
const GetListOfPackingLineView =
  properties.Port + properties.GetListOfPackingLineView;

 class PackingLinefilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
    silolist: false,
	limit: "",
    prodList: false,
    attribute: null,
    operation: "=",
    value: null,
	  attribute: null,
      operation: "=",
      value: null,
       idPackingLine:"", 
       versionLock: "",
		bagNumber: "",  
       counterBag: "",  
       counterError: "",  
       counterFracture: "",
		counterMet: "",  
       counterUnweight: "",  
       endBatch: "",  
       startBatch: "",
		packingLineDcs: "",  
       packingLineL3: "",  
       idLocationPackingLine: "",  
       typePackingLine: "",
		idSiloMt: "", 
       mDate: "",  
       mUsername: "", 
       idSite: "", 
       materialType: "",
       listFilterBean: [],
       criteria:"",


	  
    };
  }

  limitchangehandler = (event) => {
    if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
      this.setState({
        [event.target.name]: event.target.value,
      });
    } else {
    }
  };

  packinglineHandler = (event) => {
    if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
      this.setState({
        [event.target.name]: event.target.value,
      });
    } else {
    }
  };





 criteriaFilterMethod = () => {
  const length = this.state.listFilterBean.length;
  const listFilterBean = [];
    console.log("testtttttttttttttt  api ", GetListOfPackingLineView);
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
      .post(GetListOfPackingLineView, criteria, {
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
          packinglineHandler(response.data);
          PackinglinedataCriteriaHandler(criteria);
        } else {
          this.setState({
            silolist: true,
            data: [],
          });
          packinglineHandler(response.data);
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

 console.log("calling onBlur Handler", criteria.target.name);
  console.log("calling onBlur Handler", criteria.target.value);
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
  if (criteria.target.name === "packingLineL3") {
    console.log("checking idFolder", criteria.target.name);
    var index = this.state.listFilterBean.findIndex(
      (data) => data.attribute === criteria.target.name
    );
    if (index === -1) {
      const data = {
        attribute: criteria.target.name,
        operation: this.state.operation,
        value: this.state.packingLineL3,
      };
      this.state.listFilterBean.push(data);
      console.log("updataed if partttt", this.state.listFilterBean);
    } else {
      this.state.listFilterBean[index].value = this.state.packingLineL3;
      console.log("updataed else partttt", this.state.listFilterBean);
    }
  }
  if (criteria.target.name === "packingLineDcs") {
    console.log("checking idReferenceTo", criteria.target.name);
    var index = this.state.listFilterBean.findIndex(
      (data) => data.attribute === criteria.target.name
    );
    if (index === -1) {
      const data = {
        attribute: criteria.target.name,
        operation: this.state.operation,
        value: this.state.packingLineDcs,
      };
      this.state.listFilterBean.push(data);
      console.log("updataed if partttt", this.state.listFilterBean);
    } else {
      this.state.listFilterBean[index].value = this.state.packingLineDcs;
      console.log("updataed else partttt", this.state.listFilterBean);
    }
  }

  if (criteria.target.name === "typePackingLine") {
    var index = this.state.listFilterBean.findIndex(
      (data) => data.attribute === criteria.target.name
    );
    if (index === -1) {
      const data = {
        attribute: criteria.target.name,
        operation: this.state.operation,
        value: this.state.typePackingLine,
      };
      this.state.listFilterBean.push(data);
    } else {
      this.state.listFilterBean[index].value = this.state.typePackingLine;
      console.log("updataed else partttt", this.state.listFilterBean);
    }
  }
  

  if (criteria.target.name === "idLocationPackingLine") {
    var index = this.state.listFilterBean.findIndex(
      (data) => data.attribute === criteria.target.name
    );
    if (index === -1) {
      const data = {
        attribute: criteria.target.name,
        operation: this.state.operation,
        value: '19@'.concat(this.state.idLocationPacking),
      };
      this.state.listFilterBean.push(data);
    } else {
      this.state.listFilterBean[index].value = this.state.idLocationPacking;
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
    operation: "",
  });

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
	idPackingLine:"", 
       versionLock: "",
			 bagNumber: "",  
       counterBag: "",  
       counterError: "",  
       counterFracture: "",
			 counterMet: "",  
       counterUnweight: "",  
       endBatch: "",  
       startBatch: "",
			 packingLineDcs: "",  
       packingLineL3: "",  
       idLocationPacking: "",  
       typePackingLine: "",
			 idSiloMt: "", 
       mDate: "",  
       mUsername: "", 
       idSite: "", 
       materialType: "",
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
	  attribute: null,
      operation: "=",
      value: null,
       idPackingLine:"", 
       versionLock: "",
		bagNumber: "",  
       counterBag: "",  
       counterError: "",  
       counterFracture: "",
		counterMet: "",  
       counterUnweight: "",  
       endBatch: "",  
       startBatch: "",
		packingLineDcs: "",  
       packingLineL3: "",  
       idLocationPackingLine: "",  
       typePackingLine: "",
		idSiloMt: "", 
       mDate: "",  
       mUsername: "", 
       idSite: "", 
       materialType: "",
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
          {this.state.silolist === true ||Packinglinedata.length!==0? (
            <PackingLineList 
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
                    <a>PackingLine Search</a>
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
                  <Label>PackingLine L3</Label>{" "}
                </Col>
                <Col>
                  {" "}
                    <Input
                    type="select"
                    name="packingLineL3"
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
                    name="packingLineL3"
                    value={this.state.packingLineL3}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("siloNumberl3")}
                  />

                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>PackingLine DCS</Label>{" "}
                </Col>
                <Col>
                  {" "}
                    <Input
                    type="select"
                    name="packingLineDcs"
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
                 {/* <Input
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    type="text"
                    name="dcsLevel"
                    value={this.state.packingLineDcs}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("dcsLevel")}
                  /> */}
                  <Input
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    name="packingLineDcs"
                    value={this.state.packingLineDcs}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("siloNumberl3")}
                  />
                </Col>

                <Col></Col>
                <Col>
                  <Label> Type</Label>{" "}
                </Col>
                <Col>
                  {" "}
                    <Input
                    type="select"
                    name="typePackingLine"
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
                    name="typePackingLine"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    value={this.state.typePackingLine}
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    // onBlur={() => this.onBlurHandler("company")}
                    onBlur={this.onBlurHandler}
                  >
                    {" "}
                    <option value="">---select-----</option>
                    <option value="0">Pallet</option>
                    <option value="1">Big bag</option>
                    {/* <option value="2">Filled</option> */}
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

export default PackingLinefilter;