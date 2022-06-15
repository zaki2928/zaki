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
import Boxreplacementlist from "../../shipping/box-replacement/Boxreplacementlist";
import {Boxreplacementdata,BoxreplacementHandler,Boxreplacementcriteriadata,BoxreplacementCriteriaHandler} from "../../../store/Store"
import axios from "axios"
import { properties } from "../../../Properties/Properties";
const getlistofboxreplacementbyfiltercriteria =
  properties.Port + properties.getlistofboxreplacementbyfiltercriteria;

 class Boxreplacement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      silolist: false,
      data:[],
      limit: "",
   anotherBatch: "",
  batch: "",
  idCarrier: "",
  idContainerFather:"" ,
  idContainerPrpsh: "",
  idDm: "",
  idLocation:"" ,
  idPackaging:"" ,
  idPrepOrder:"" ,
	listFilterBean: [],
  criteria:"",
  attribute: null,
  operation: "=",
  value: null,
  mDate: "",
  mUserName:"" ,
  statusPo: "",
  statusPrep: 500,
  statusShipping: 1000,
  typePalletisation: "",
  verionLock: ""
    };
  }
componentDidMount=()=>{
  const data = [
    {
      attribute: "statusPrep",
      operation: "=",
      value: 500,
    },
    {
      attribute: "statusShipping",
      operation: "=",
      value: 1000,
    },
  ];
console.log("calling silo filter");

}

criteriaFilterMethod = () => {
  const length = this.state.listFilterBean.length;
  const listFilterBean = [];
    console.log("testtttttttttttttt  api ", getlistofboxreplacementbyfiltercriteria);
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
      .post(getlistofboxreplacementbyfiltercriteria, criteria, {
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
          BoxreplacementHandler(response.data);
          BoxreplacementCriteriaHandler(criteria);
        } else {
          this.setState({
            silolist: true,
            data: [],
          });
          BoxreplacementHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


// Submimthandler=()=>{
//   console.log("submit handler calling")
//   axios
//   .get("https://jsonplaceholder.typicode.com/posts")
//   .then((response) => {
//     if (response.status === 200) {
//       console.log("resposne success", response.data);
// this.setState({
//   data:response.data,
// silolist:true

// })

// BoxreplacementHandler( response.data)
      
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// }


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
    console.log(
      "ELSE PARTTTTTT",
      (this.state.listFilterBean[index].operation = event.target.value)
    );
  }
 
  console.log("index AFTER UPDATE print", this.state.listFilterBean);
 
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
    if (criteria.target.name === "idContainerPrpsh") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.idContainerPrpsh,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.idContainerPrpsh;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "statusPrep") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.statusPrep,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.statusPrep;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "idPrepOrder") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.idPrepOrder,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.idPrepOrder;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "statusPo") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.statusPo,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.statusPo;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }  

    if (criteria.target.name === "idCarrier") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.idCarrier,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.idCarrier;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }  

    if (criteria.target.name === "statusShipping") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.statusShipping,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.statusShipping;
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

backHandler=()=>{
console.log("calling back Handler")
  this.setState({

    silolist:false
  })
}

resetdata = () => {
  console.log("reset handler");
  this.setState({
  
silolist: false,
data:[],
limit: "",
anotherBatch: "",
batch: "",
idCarrier: "",
idContainerFather:"" ,
idContainerPrpsh: "",
idDm: "",
idLocation:"" ,
idPackaging:"" ,
idPrepOrder:"" ,
listFilterBean: [],
criteria:"",
attribute: null,
operation: "=",
value: null,
mDate: "",
mUserName:"" ,
statusPo: "",
statusPrep: "",
statusShipping: "",
typePalletisation: "",
verionLock: ""
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
          {this.state.silolist === true ||Boxreplacementdata.length!==0? (
            <Boxreplacementlist 
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
                    <a>Box Replacement Search</a>
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
                <b style={{ marginLeft: "5px" }}>Shipping Criteria</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Container</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
                    <option value="=">=</option>
                    <option value="/=">&ne;</option>
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
                    name="idContainerPrpsh"
                    value={this.state.idContainerPrpsh}
                    onBlur={this.onBlurHandler}
                  />
                    
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Preparation Status</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="statusPrep"
                    id="exampleSelect"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
                    <option value="=">=</option>
                    
                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="statusPrep"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.statusPrep}
                    bsSize="sm"
                  >
                    <option value="500">_Prepared_</option>
                  </Input>

                </Col>
                <Col> </Col>
              </Row>
              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Preparation Order</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
                     <option value="=">=</option>
                    <option value="/=">&ne;</option>
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
                    name="idPrepOrder"
                    value={this.state.idPrepOrder}
                    onBlur={this.onBlurHandler}
                    
                    />
                </Col>

                <Col></Col>
                <Col>
                  <Label>Prep order Status</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    onChange={this.changeHandler}

                    bsSize="sm"
                  >
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
                    name="statusPo"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.statusPo}
                    bsSize="sm"
                  
                  >
                  <option value="">   </option>
                    <option value="400">_Launched_</option>
                    <option value="424">_InPreparation_</option>
                    <option value="500">_Prepared_</option>


                  </Input>
                </Col>
                <Col> </Col>
              </Row>
              
             


              <Row style={{marginTop:"5px"}}>
                <Col>
                  <Label>Carrier</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="idCarrier"
                    id="exampleSelect"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
                     <option value="=">=</option>
                    <option value="/=">&ne;</option>
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
                    name="idCarrier"
                    value={this.state.idCarrier}
                    onBlur={this.onBlurHandler}
                     />
                </Col>

                <Col></Col>
                <Col>
                  <Label>Shipping Status</Label>{" "}
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="statusShipping"
                    id="exampleSelect"
                    onChange={this.changeHandler}
                    bsSize="sm"
                  >
                    <option value="=">=</option>
                    
                  </Input>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="statusShipping"
                    onChange={this.inputChangeHandler}
                    onBlur={this.onBlurHandler}
                    value={this.state.statusShipping}
                    bsSize="sm"
                  >
                    <option value="1000">_Awaiting Palletised_</option>
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
              
            
              
            

              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
              <Button  onClick={this.resetdata}>Reset Criteria</Button>{" "}
                <Button 
                  onClick={
                    this.criteriaFilterMethod
                  }
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

export default Boxreplacement;