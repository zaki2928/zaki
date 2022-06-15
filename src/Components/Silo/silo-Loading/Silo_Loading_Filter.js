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
  IoInformation,
  IoInformationCircle,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import Silo_Loading_List from "../../Silo/silo-Loading/Silo_Loading_List";
import {SiloLoadingFilterdata,siloLoadingFilterHandler,SiloLoadingFilterCriteriaHandler} from "../../../store/Store";
import { properties } from "../../../Properties/Properties";
import axios from "axios";
const GetListOfSiloLoadingSiCl =
  properties.Port + properties.GetListOfSiloLoadingSiCl;
 class Silo_Loading_Filter extends Component {
  constructor(props) {
    super(props);

    this.state = {
           limit:"",
      Silo_Loading_List : false,
      data:[],
      attribute: null,
      operation: "=",
      value: null,
      idSiloLoading : "", 
      mDate: "", 
      musername: "",  
      versionLock: "",
			batch: "",  
      characUse: "",  
      feat1: "",  
      feat2: "",  
      feat3: "",  
      sellByDate: "",
			useByDate: "",  
      commentary: "",  
      idCompany: "",  
      idContentStatus: "",  
      density: "",
			endLoadingDate: "",  
      grade: "",  
      qtyLoaded: "",  
      qtyToLoad: "",  
      idReceptionN3: "",
			idReceptionLineN3: "",  
      idReference: "",  
      rejectionStatus: "",  
      siloNumberL3: "",  
      idSite: "",
			startLoadingDate: "",  
      statusSiloLoading: "",  
      typeReception: "",  
      cleanUpNumber: "",
			cleanUpStatus: "",
      listFilterBean: [],
      criteria: "",
    };
  }

  componentDidMount=()=>{
    console.log("calling silo loading filter");
    
    }

criteriaFilterMethod = () => {
  const length = this.state.listFilterBean.length;
  const listFilterBean = [];
    console.log("testtttttttttttttt  api ", GetListOfSiloLoadingSiCl);
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
      .post(GetListOfSiloLoadingSiCl, criteria, {
        params: {
          limit: this.state.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
            Silo_Loading_List: true,
          });
          siloLoadingFilterHandler(response.data);
          SiloLoadingFilterCriteriaHandler(criteria);
        } else {
          this.setState({
            Silo_Loading_List: true,
            data: [],
          });
          siloLoadingFilterHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeHandler = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
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

  
  // onBlurHandler = (criteria) => {
  //   console.log("calling onBlurrrrr", criteria.target.name);
  //   console.log("calling onBlurrrrr", criteria.target.value);
  //   var index = this.state.listFilterBean.findIndex(
  //     (data) => data.attribute === criteria.target.name
  //   );
  //   console.log("INDEX VALUE FOR IF PART IN ALUE", index);
  
  //   if (criteria.target.value !== "") {
  //     if (criteria.target.name === "idCompany") {
  //       var index = this.state.listFilterBean.findIndex(
  //         (data) => data.attribute === criteria.target.name
  //       );
  //       if (index === -1) {
  //         const data = {
  //           attribute: criteria.target.name,
  //           operation: this.state.operation,
  //           value: this.state.idCompany,
  //         };
  //         this.state.listFilterBean.push(data);
  //       } else {
  //         this.state.listFilterBean[index].value = this.state.idCompany;
  //         console.log("updataed else partttt", this.state.listFilterBean);
  //       }
  //     }
  //     if (criteria.target.name === "siloNumberL3") {
  //       var index = this.state.listFilterBean.findIndex(
  //         (data) => data.attribute === criteria.target.name
  //       );
  //       if (index === -1) {
  //         const data = {
  //           attribute: criteria.target.name,
  //           operation: this.state.operation,
  //           value: this.state.siloNumberL3,
  //         };
  //         this.state.listFilterBean.push(data);
  //       } else {
  //         this.state.listFilterBean[index].value = this.state.siloNumberL3;
  //         console.log("updataed else partttt", this.state.listFilterBean);
  //       }
  //     }
  //     if (criteria.target.name === "idReceptionN3") {
  //       var index = this.state.listFilterBean.findIndex(
  //         (data) => data.attribute === criteria.target.name
  //       );
  //       if (index === -1) {
  //         const data = {
  //           attribute: criteria.target.name,
  //           operation: this.state.operation,
  //           value: this.state.idReceptionN3,
  //         };
  //         this.state.listFilterBean.push(data);
  //       } else {
  //         this.state.listFilterBean[index].value = this.state.idReceptionN3;
  //         console.log("updataed else partttt", this.state.listFilterBean);
  //       }
  //     }
  //     if (criteria.target.name === "idReference") {
  //       var index = this.state.listFilterBean.findIndex(
  //         (data) => data.attribute === criteria.target.name
  //       );
  //       if (index === -1) {
  //         const data = {
  //           attribute: criteria.target.name,
  //           operation: this.state.operation,
  //           value: this.state.idReference,
  //         };
  //         this.state.listFilterBean.push(data);
  //       } else {
  //         this.state.listFilterBean[index].value = this.state.idReference;
  //         console.log("updataed else partttt", this.state.listFilterBean);
  //       }
  //     }
  //     if (criteria.target.name === "statusSiloLoading") {
  //       var index = this.state.listFilterBean.findIndex(
  //         (data) => data.attribute === criteria.target.name
  //       );
  //       if (index === -1) {
  //         const data = {
  //           attribute: criteria.target.name,
  //           operation: this.state.operation,
  //           value: this.state.statusSiloLoading,
  //         };
  //         this.state.listFilterBean.push(data);
  //       } else {
  //         this.state.listFilterBean[index].value = this.state.statusSiloLoading;
  //         console.log("updataed else partttt", this.state.listFilterBean);
  //       }
  //     }
     
      
      
  //   } else {
  //     console.log("repacking blur else line 448");
  //   }
  // };


  onBlurHandler = (criteria) => {
    console.log("calling onBlurrrrr", criteria.target.name);
    console.log("calling onBlurrrrr", criteria.target.value);
    var index = this.state.listFilterBean.findIndex(
      (data) => data.attribute === criteria.target.name
    );
    console.log("INDEX VALUE FOR IF PART IN ALUE", index);
  
    if (criteria.target.value !== "") {
      if (criteria.target.name === "idCompany") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.idCompany,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.idCompany;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "siloNumberL3") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.siloNumberL3,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.siloNumberL3;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "idReceptionN3") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.idReceptionN3,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.idReceptionN3;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
      if (criteria.target.name === "idReference") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.idReference,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.idReference;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "statusSiloLoading") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.statusSiloLoading,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.statusSiloLoading;
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

  //    console.log("inside if part");
     
  //   } else {
  //     console.log("packaging blur else line 339");
  //   }
  // };
  

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
            limit:"",
      Silo_Loading_List : false,
      data:[],
      attribute: null,
      operation: null,
      value: "=",
      idSiloLoading : "", 
      mDate: "", 
      musername: "",  
      versionLock: "",
			batch: "",  
      characUse: "",  
      feat1: "",  
      feat2: "",  
      feat3: "",  
      sellByDate: "",
			useByDate: "",  
      commentary: "",  
      idCompany: "",  
      idContentStatus: "",  
      density: "",
			endLoadingDate: "",  
      grade: "",  
      qtyLoaded: "",  
      qtyToLoad: "",  
      idReceptionN3: "",
			idReceptionLineN3: "",  
      idReference: "",  
      rejectionStatus: "",  
      siloNumberL3: "",  
      idSite: "",
			startLoadingDate: "",  
      statusSiloLoading: "",  
      typeReception: "",  
      cleanUpNumber: "",
			cleanUpStatus: "",
      listFilterBean: [],
    });
  };
  backHandler = () => {
    console.log("calling back handler");
    this.setState({
           limit:"",
      Silo_Loading_List : false,
      data:[],
      attribute: null,
      operation: "=",
      value: null,
      idSiloLoading : "", 
      mDate: "", 
      musername: "",  
      versionLock: "",
			batch: "",  
      characUse: "",  
      feat1: "",  
      feat2: "",  
      feat3: "",  
      sellByDate: "",
			useByDate: "",  
      commentary: "",  
      idCompany: "",  
      idContentStatus: "",  
      density: "",
			endLoadingDate: "",  
      grade: "",  
      qtyLoaded: "",  
      qtyToLoad: "",  
      idReceptionN3: "",
			idReceptionLineN3: "",  
      idReference: "",  
      rejectionStatus: "",  
      siloNumberL3: "",  
      idSite: "",
			startLoadingDate: "",  
      statusSiloLoading: "",  
      typeReception: "",  
      cleanUpNumber: "",
			cleanUpStatus: "",
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
          {this.state.Silo_Loading_List === true ||SiloLoadingFilterdata.length!==0? (
            <Silo_Loading_List
            
            backHandler={this.backHandler}
            data={this.state.data}
            
            />
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
                    <a>Silo Loading Search</a>
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
                  <Label>Company</Label>{" "}
                </Col>

                <Col>
                  {" "}
                   <Input
                    type="select"
                    name="idCompany"
                    id="exampleSelect"
                    // style={{ width: "50px" }}
                    bsSize="sm"
                    onChange={this.changeHandler}
                  >
                    {/* <option>---select---</option> */}
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
                    <option value="AMONG">AMONG</option>
                    <option value="NOT AMONG">NOT_AMONG</option>
                  </Input>
                </Col>
      
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="idCompany"
                    id="exampleSelect"
                    // style={{ width: "60px" }}
                    value={this.state.idCompany}
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    // onBlur={() => this.onBlurHandler("company")}
                    onBlur={this.onBlurHandler}
                  >
                    {" "}
                    <option value="">---select-----</option>
                    <option value="SK">SK</option>
                  </Input>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Silo no L3</Label>{" "}
                </Col>
                <Col>
                  {" "}
                 <Input
                    type="select"
                    name="siloNumberL3 "
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
                    name="siloNumberL3"
                    value={this.state.siloNumberL3}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("idReceptionN3")}
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Reception ID</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="idReceptionN3"
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
                    name="idReceptionN3"
                    value={this.state.idReceptionN3}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("idReceptionN3")}
                  />
                </Col>

                <Col></Col>
                <Col>
                  <Label>Reference</Label>{" "}
                </Col>
                <Col>
                  {" "}
                 <Input
                    type="select"
                    name="idReference"
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
                    name="idReference"
                    value={this.state.idReference}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("idReference")}
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Status</Label>{" "}
                </Col>
                <Col>
                  {" "}
                 <Input
                    type="select"
                    name="statusSiloLoading  "
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
                    name="statusSiloLoading"
                    id="exampleSelect"
                    value={this.state.statusSiloLoading}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option value="">---select---</option>
                    <option value="1000">Closed</option>
                    <option value="200">Incoherent</option>
                    <option value="100">Created</option>
                    <option value="400">Inprogress</option>
                    <option value="1100">Closed & Rejected</option>
                  </Input>
                </Col>


                <Col></Col>
                <Col>
                  {" "}
                </Col>
                <Col>
                  {" "}
                  </Col>
                <Col>
                  {" "}
                
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Maximum Result</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="text"
                    name="select"
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
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("idReference")}
                  />
                </Col>

                <Col></Col>
                <Col>
                 {" "}
                </Col>
                <Col>
                  {" "}
                 
                </Col>
                <Col>
                  {" "}
                </Col>
                <Col> </Col>
              </Row>
              <div
                style={{
                  
                }}
              >
              </div>



              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Row>
                      <Col><Button 
                            size="sm"
                      style={{marginTop:"10px",
                    }} onClick={this.resetdata}
                      
                      
                      >Reset Criteria</Button>
</Col>
                      <Col><Button 
                 
                  style={{marginTop:"10px"}}
                  size="sm"
				  onClick={this.criteriaFilterMethod}
                >
                  {" "}
                  Display
                </Button></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      {/* <Col><span style={{color:"lightgreen",
                    }}
                    
                    >
                        <b style={{color:"black",
                    marginRight:"5px"}}> <IoInformationCircle/></b><u><b>filters</b></u></span></Col> */}
                   
                                
            </Row>
              </div>



            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default Silo_Loading_Filter;