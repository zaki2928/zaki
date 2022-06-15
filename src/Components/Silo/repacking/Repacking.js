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
import {SiloLoadingFilterdata,siloLoadingFilterHandler} from "../../../store/Store";
import SiloRepackingList from "./SiloRepackingList";
import { Repackingdata, RepackingHandler, RepackingdataCriteriaHandler } from "../../../store/Store";
import {properties} from "../../../Properties/Properties"
import axios from "axios";

const getListOfRepackingLineView=properties.Port+properties.getListOfRepackingLineView

 class Repacking extends Component {
  constructor(props) {
    super(props);

    this.state = {
      List : false,
      data:[],
      limit: "",
      attribute: null,
      operation: "=",
      value: null,
       idRepackingLine: "", 
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
       bagNumber: "", 
       counterBag: "", 
       counterError: "",
			 counterFracture: "", 
       counterMet: "", 
       counterUnweight: "", 
       endBatch: "", 
       startBatch: "",
			 endProductionDate: "", 
       expectedDeliveryDate: "", 
       idContentStatus: "", 
       idFolderLine: "",
			 idMfLocation: "", 
       nbPalletToCreate: "", 
       orderDate: "", 
       idPackingLine: "", 
       qtyRepacked: "",
			 qtyToRepack: "", 
       qtyToTreat: "", 
       qtyTreated: "", 
       idReferenceFrom: "", 
       idReferenceTo: "",
			 rejectionStatus: "", 
       siloNumberL3: "", 
       startProductionDate: "", 
       statusRepackingLine: "",
			 typeReception: "", 
       typeTreatment: "", 
       idRepacking: "", 
       idDestinationWarehouse: "",
			 idEligibiltyWarehouse: "", 
       idPackaging: "", 
       toName: "", 
       idCompany: "", 
       idFolder: "",
			 idSite: "", 
       statusRepacking: "", 
       cleanUpNumber: "", 
       cleanUpStatus: "",
       listFilterBean: [],
       criteria:"",

    };
  }

  componentDidMount=()=>{
    console.log("calling repackingfilter in silo");
    
    }



    // Submithandler=()=>{
    //   console.log("submit handler silo loading filter calling")
    //   axios
    //   .get("https://jsonplaceholder.typicode.com/posts")
    //   .then((response) => {
    //     if (response.status === 200) {
    //       console.log("resposne success", response.data);
    // this.setState({
    //   data:response.data,
    //   List:true
    
    // })
    
    // RepackingHandler( response.data)
          
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }

    backHandler=()=>{
      console.log("calling back Handler")
        this.setState({
      
          List:false
        })
      }


      limitchangehandler = (event) => {
        if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
          this.setState({
            [event.target.name]: event.target.value,
          });
        } else {
        }
      };



//criteria method start

criteriaFilterMethod = () => {
  const length = this.state.listFilterBean.length;
  const listFilterBean = [];
  console.log("testtttttttttttttt  api ", getListOfRepackingLineView);
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
    .post(
      getListOfRepackingLineView,  criteria, {
        params: {
          limit: this.state.limit,
        },
      }
    )
    // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
    .then((response) => {
      if (response.status === 200 && response.data.length !== 0) {
        console.log("resposne success", response.data);
        this.setState({
          data: response.data,
          List: true,
        });
        RepackingHandler(response.data);
        RepackingdataCriteriaHandler(criteria);
      } else {
        this.setState({
          List: true,
          data: [],
        });
        RepackingHandler(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

//change handler method start


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
      "inside else part",
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

//change handler method ends

//input change handler method start

inputChangeHandler = (event) => {
  this.setState({
    [event.target.name]: event.target.value,
  });
}
//onBlur handler method start


// onBlurHandler = (criteria) => {
//   console.log("calling onBlur Handler", criteria.target.name);
//   console.log("calling onBlur Handler", criteria.target.value);
//   var index = this.state.listFilterBean.findIndex(
//     (data) => data.attribute === criteria.target.name
//   );
//   console.log("INDEX VALUE FOR IF PART IN ALUE", index);

//   if (criteria.target.name === "idCompany") {
//     var index = this.state.listFilterBean.findIndex(
//       (data) => data.attribute === criteria.target.name
//     );
//     if (index === -1) {
//       const data = {
//         attribute: criteria.target.name,
//         operation: this.state.operation,
//         value: this.state.idCompany,
//       };
//       this.state.listFilterBean.push(data);
//     } else {
//       this.state.listFilterBean[index].value = this.state.idCompany;
//       console.log("updataed else partttt", this.state.listFilterBean);
//     }
//   }
//   if (criteria.target.name === "idFolder") {
//     console.log("checking idFolder", criteria.target.name);
//     var index = this.state.listFilterBean.findIndex(
//       (data) => data.attribute === criteria.target.name
//     );
//     if (index === -1) {
//       const data = {
//         attribute: criteria.target.name,
//         operation: this.state.operation,
//         value: this.state.idFolder,
//       };
//       this.state.listFilterBean.push(data);
//       console.log("updataed if partttt", this.state.listFilterBean);
//     } else {
//       this.state.listFilterBean[index].value = this.state.idFolder;
//       console.log("updataed else partttt", this.state.listFilterBean);
//     }
//   }
//   if (criteria.target.name === "idReferenceTo") {
//     console.log("checking idReferenceTo", criteria.target.name);
//     var index = this.state.listFilterBean.findIndex(
//       (data) => data.attribute === criteria.target.name
//     );
//     if (index === -1) {
//       const data = {
//         attribute: criteria.target.name,
//         operation: this.state.operation,
//         value: this.state.idReferenceTo,
//       };
//       this.state.listFilterBean.push(data);
//       console.log("updataed if partttt", this.state.listFilterBean);
//     } else {
//       this.state.listFilterBean[index].value = this.state.idReferenceTo;
//       console.log("updataed else partttt", this.state.listFilterBean);
//     }
//   }

//   if (criteria.target.name === "idReferenceFrom") {
//     var index = this.state.listFilterBean.findIndex(
//       (data) => data.attribute === criteria.target.name
//     );
//     if (index === -1) {
//       const data = {
//         attribute: criteria.target.name,
//         operation: this.state.operation,
//         value: this.state.idReferenceFrom,
//       };
//       this.state.listFilterBean.push(data);
//     } else {
//       this.state.listFilterBean[index].value = this.state.idReferenceFrom;
//       console.log("updataed else partttt", this.state.listFilterBean);
//     }
//   }
//   if (criteria.target.name === "statusRepackingLine") {
//     var index = this.state.listFilterBean.findIndex(
//       (data) => data.attribute === criteria.target.name
//     );
//     if (index === -1) {
//       const data = {
//         attribute: criteria.target.name,
//         operation: this.state.operation,
//         value: this.state.statusRepackingLine,
//       };
//       this.state.listFilterBean.push(data);
//     } else {
//       this.state.listFilterBean[index].value = this.state.statusRepackingLine;
//       console.log("updataed else partttt", this.state.listFilterBean);
//     }
//   }
//   if (criteria.target.name === "batch") {
//     console.log("batch");
//     var index = this.state.listFilterBean.findIndex(
//       (data) => data.attribute === criteria.target.name
//     );
//     if (index === -1) {
//       const data = {
//         attribute: criteria.target.name,
//         operation: this.state.operation,
//         value: this.state.batch,
//       };
//       this.state.listFilterBean.push(data);
//     } else {
//       this.state.listFilterBean[index].value = this.state.batch;
//       console.log("updataed else partttt", this.state.listFilterBean);
//     }
//   }
 
//   console.log("calling criteriaARRRR", this.state.listFilterBean);
//   this.setState({
//     attribute: "",
//     operation: "",
//   });
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
    if (criteria.target.name === "idFolder") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.idFolder,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.idFolder;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "idReferenceTo") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.idReferenceTo,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.idReferenceTo;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "idReferenceFrom") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.idReferenceFrom,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.idReferenceFrom;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "statusRepackingLine") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.statusRepackingLine,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.statusRepackingLine;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "batch") {
      console.log("id container calling");
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.batch,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.batch;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }  
  } else {
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

// changeHandler = (event) => {
//   console.log("index BEFORE UPDATE print", this.state.listFilterBean);
//   var index = this.state.listFilterBean.findIndex(
//     (data) => data.attribute === event.target.name
//   );
//   if (index === -1) {
//     const data = {
//       attribute: event.target.name,
//       operation: event.target.value,
//       value: "",
//     };
//     this.state.listFilterBean.push(data);
//   } else {
//     console.log(
//       (this.state.listFilterBean[index].operation = event.target.value)
//     );
//   }

//   console.log("index AFTER UPDATE print", this.state.listFilterBean);
// };

//onBlur handler method end 
resetdata = () => {
  console.log("reset handler");
  this.setState({
    List : false,
    data:[],
    limit: "",
    attribute: null,
    operation: "=",
    value: null,
     idRepackingLine: "", 
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
     bagNumber: "", 
     counterBag: "", 
     counterError: "",
     counterFracture: "", 
     counterMet: "", 
     counterUnweight: "", 
     endBatch: "", 
     startBatch: "",
     endProductionDate: "", 
     expectedDeliveryDate: "", 
     idContentStatus: "", 
     idFolderLine: "",
     idMfLocation: "", 
     nbPalletToCreate: "", 
     orderDate: "", 
     idPackingLine: "", 
     qtyRepacked: "",
     qtyToRepack: "", 
     qtyToTreat: "", 
     qtyTreated: "", 
     idReferenceFrom: "", 
     idReferenceTo: "",
     rejectionStatus: "", 
     siloNumberL3: "", 
     startProductionDate: "", 
     statusRepackingLine: "",
     typeReception: "", 
     typeTreatment: "", 
     idRepacking: "", 
     idDestinationWarehouse: "",
     idEligibiltyWarehouse: "", 
     idPackaging: "", 
     toName: "", 
     idCompany: "", 
     idFolder: "",
     idSite: "", 
     statusRepacking: "", 
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
          {this.state.List === true ||Repackingdata.length!==0? (
            <SiloRepackingList
            
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
                    <a>Repackings</a>
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
                <Col >
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
                  <Label>Folder ID</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="idFolder"
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
                    name="idFolder"
                    value={this.state.idFolder}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("description")}
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Reference To</Label>{" "}
                </Col>
                <Col >
                  {" "}
                  <Input
                    type="select"
                    name="idReferenceTo"
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
                <Col >
                  {" "}
                  <Input
                    bsSize="sm"
                    onChange={this.inputChangeHandler}
                    name="idReferenceTo"
                    value={this.state.idReferenceTo}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("description")}
                  />
                </Col>

                <Col></Col>
                <Col>
                  <Label>Reference From</Label>{" "}
                </Col>
                <Col >
                  {" "}
                  <Input
                    type="select"
                    name="idReferenceFrom"
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
                    name="idReferenceFrom"
                    value={this.state.idReferenceFrom}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("description")}
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
                    name="statusRepackingLine"
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
                    name="statusRepackingLine"
                    id="exampleSelect"
                    value={this.state.statusRepackingLine}
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    // style={{ width: "60px" }}
                    bsSize="sm"
                  >
                    <option value="">---select---</option>
                    <option value="100">Created</option>
                    <option value="200">_Incoherent_</option>
                    <option value="400">_In_Progress_</option>
                    <option value="1000">_Closed_</option>
                    <option value="1100">_Closed_Rejected_</option>
                    
                  </Input> 
                
    
                </Col>

                <Col></Col>
                <Col>
                <Label>Batch</Label> {" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="batch"
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
                    name="batch"
                    value={this.state.batch}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("description")}
                  />
                
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
                    name="text"
                    id="exampleSelect"
                    value="<="
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
                       onClick={this.resetdata}
                            size="sm"
                      style={{marginTop:"10px",
                    }}
                      
                      
                      >Reset Criteria</Button>
</Col>
                      <Col><Button 
                onClick={this.criteriaFilterMethod}
                  style={{marginTop:"10px"}}
                  size="sm"
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
                      <Col></Col>
                   
                                
            </Row>
              </div>



            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default Repacking;