import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
    FormGroup,
    Button,
  } from "reactstrap";
import PackagingList from '../packaging/PackagingList';
import {
    IoArrowBackCircleSharp,
    IoArrowForwardCircleSharp,
    IoInformationCircle
  } from "react-icons/io5";
  import { FcSearch } from "react-icons/fc";
import { PackagingData, PackagingHandler, PackagingCriteriaaHandler } from '../../../store/Store';
import axios from "axios";
import { properties } from '../../../Properties/Properties';

const getListOfPackagingKLPView = properties.Port + properties.getListOfPackagingKLPView
class PackagingFilter extends Component {
    constructor(props) {
        super(props);
      this.state = {
          packagingList: false,
          data:[],
          limit: "",
          attribute: null,
          operation: "=",
          value: null,
          idPackagingStk:"",
          calculVolume:"",
          defaultPackaging:"",
          description:"",
          descriptionShort:"",
          heightEXT:"",
          lenthEXT:"",
          widthEXT:"",
          emptyWeigth:"",
          typePackaging:"",
	        mDate:"",
          mUsername:"",
          versionLock:"",
          idPackaging:"",
          heightINT:"",
          lenthINT:"",
          widthINT:"",
          listFilterBean: [],
          criteria:"",

      }
    }
    componentDidMount=()=>{
      console.log("component Did Mount called")
      }
      
      submitHandler=()=>{
        console.log("submitHandler calling")
        
        axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          if (response.status === 200) {
            console.log("resposne success", response.data);
             this.setState({
            data:response.data,
            packagingList:true
      
            })
      
            PackagingHandler(response.data)
            
          }
        })
        .catch((error) => {
          console.log(error);
        });
      
      }
      
      
      backHandler=()=>{
        console.log("calling back handler")
        this.setState({
          packagingList: false,
          data:[],
          limit: "",
          attribute: null,
          operation: "=",
          value: null,
          idPackagingStk:"",
          calculVolume:"",
          defaultPackaging:"",
          description:"",
          descriptionShort:"",
          heightEXT:"",
          lenthEXT:"",
          widthEXT:"",
          emptyWeigth:"",
          typePackaging:"",
	        mDate:"",
          mUsername:"",
          versionLock:"",
          idPackaging:"",
          heightINT:"",
          lenthINT:"",
          widthINT:"",
          listFilterBean: [],
          criteria:"",
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
  console.log("testtttttttttttttt  api ", getListOfPackagingKLPView);
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
      getListOfPackagingKLPView,criteria,
      {
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
          packagingList: true,
        });
        PackagingHandler(response.data);
        PackagingCriteriaaHandler(criteria)
      } else {
        this.setState({
          packagingList: true,
          data: [],
        });
        PackagingHandler(response.data);
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

//   if (criteria.target.name === "description") {
//     var index = this.state.listFilterBean.findIndex(
//       (data) => data.attribute === criteria.target.name
//     );
//     if (index === -1) {
//       const data = {
//         attribute: criteria.target.name,
//         operation: this.state.operation,
//         value: this.state.description,
//       };
//       this.state.listFilterBean.push(data);
//     } else {
//       this.state.listFilterBean[index].value = this.state.description;
//       console.log("updataed else partttt", this.state.listFilterBean);
//     }
//   }
//   if (criteria.target.name === "lenthINT") {
//     console.log("checking lenthINT", criteria.target.name);
//     var index = this.state.listFilterBean.findIndex(
//       (data) => data.attribute === criteria.target.name
//     );
//     if (index === -1) {
//       const data = {
//         attribute: criteria.target.name,
//         operation: this.state.operation,
//         value: this.state.lenthINT,
//       };
//       this.state.listFilterBean.push(data);
//       console.log("updataed if partttt", this.state.listFilterBean);
//     } else {
//       this.state.listFilterBean[index].value = this.state.lenthINT;
//       console.log("updataed else partttt", this.state.listFilterBean);
//     }
//   }
//   if (criteria.target.name === "widthINT") {
//     console.log("checking widthINT", criteria.target.name);
//     var index = this.state.listFilterBean.findIndex(
//       (data) => data.attribute === criteria.target.name
//     );
//     if (index === -1) {
//       const data = {
//         attribute: criteria.target.name,
//         operation: this.state.operation,
//         value: this.state.widthINT,
//       };
//       this.state.listFilterBean.push(data);
//       console.log("updataed if partttt", this.state.listFilterBean);
//     } else {
//       this.state.listFilterBean[index].value = this.state.widthINT;
//       console.log("updataed else partttt", this.state.listFilterBean);
//     }
//   }

//   if (criteria.target.name === "heightINT") {
//     console.log("checking heightINT", criteria.target.name);
//     var index = this.state.listFilterBean.findIndex(
//       (data) => data.attribute === criteria.target.name
//     );
//     if (index === -1) {
//       const data = {
//         attribute: criteria.target.name,
//         operation: this.state.operation,
//         value: this.state.heightINT,
//       };
//       this.state.listFilterBean.push(data);
//     } else {
//       this.state.listFilterBean[index].value = this.state.heightINT;
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
    if (criteria.target.name === "description") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.description,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.description;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "lenthINT") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.lenthINT,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.lenthINT;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "widthINT") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.widthINT,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.widthINT;
        console.log("updataed else partttt", this.state.listFilterBean);
      }
    }
    if (criteria.target.name === "heightINT") {
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === criteria.target.name
      );
      if (index === -1) {
        const data = {
          attribute: criteria.target.name,
          operation: this.state.operation,
          value: this.state.heightINT,
        };
        this.state.listFilterBean.push(data);
      } else {
        this.state.listFilterBean[index].value = this.state.heightINT;
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
   
    
    
//   } else {
//     console.log("packaging blur else line 339");
//   }
// };


resetdata = () => {
  console.log("reset handler");
  this.setState({
    packagingList: false,
    data:[],
    limit: "",
    attribute: null,
    operation: "=",
    value: null,
    idPackagingStk:"",
    calculVolume:"",
    defaultPackaging:"",
    description:"",
    descriptionShort:"",
    heightEXT:"",
    lenthEXT:"",
    widthEXT:"",
    emptyWeigth:"",
    typePackaging:"",
    mDate:"",
    mUsername:"",
    versionLock:"",
    idPackaging:"",
    heightINT:"",
    lenthINT:"",
    widthINT:"",
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
              {PackagingData.length !== 0 || this.state.packagingList === true ?
               (
                <PackagingList backHandler={this.backHandler} 
                data={this.state.data} />
              ) 
              : (
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
                        <a>Packagings Search</a>
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
                    <b style={{ marginLeft: "5px" }}>General Criteria</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Description</Label>{" "}
                    </Col>
    
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="description"
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
                    name="description"
                    value={this.state.description}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("description")}
                  />
                    </Col>
    
                    <Col> </Col>
                    <Col>
                      
                    </Col>
                    <Col>
                      
                    </Col>
                    <Col>
                      {" "}
                    
                    </Col>
                    <Col> </Col>
                  </Row>
                  

                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Maximum result</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="text"
                    name="text"
                    id="exampleSelect"
                    value="<="
                    readOnly

                    bsSize="sm"
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
                      {/* <Label>Product Type</Label>{" "} */}
                    </Col>
                    <Col>
                     
                    </Col>
                    <Col>
                      
                    </Col>
                    <Col> </Col>
                  </Row>
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      marginTop: "10px"
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Stock Criteria</b>
                  </div>
                  <div 
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      
                    }}
                  >
                  
                    <b style={{marginTop:"10px", marginLeft: "5px" }}>Preparation Criteria</b>
                  </div>

                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Internal Length(cm)</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="lenthINT"
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
                    name="lenthINT"
                    value={this.state.lenthINT}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("description")}
                  />
                    </Col>
    
                    <Col></Col>
                    <Col>
                      <Label>Internal Width(cm)</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="widthINT"
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
                    name="widthINT"
                    value={this.state.widthINT}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("description")}
                  />
                    </Col>
                    <Col> </Col>
                  </Row>

                  

                  <Row>
                    <Col>
                      <Label>Internal Height(cm)</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <Input
                    type="select"
                    name="heightINT"
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
                    name="heightINT"
                    value={this.state.heightINT}
                    onBlur={this.onBlurHandler}
                    // onBlur={() => this.onBlurHandler("description")}
                  />
                    </Col>
    
                    <Col></Col>
                    <Col>
                   
                    </Col>
                    <Col>
                      
                    </Col>
                    <Col>
                     
                    </Col>
                    <Col> </Col>
                  </Row>
                 
                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Row>
                      <Col style={{display:"flex"}}>
                      <Button 
                       onClick={this.resetdata}
                            size="sm"
                      style={{marginTop:"10px", width: "106px"
                    }}
                      
                      
                      >Reset Criteria</Button> &nbsp;
{/* </Col>
                      <Col> */}
                      <Button 
                onClick={this.criteriaFilterMethod}
                  style={{marginTop:"10px"}}
                  size="sm"
                >
                  {" "}
                  Display
                </Button>
                </Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col><span style={{color:"lightgreen",
                    }}
                    
                    >
                        <b style={{color:"black",
                    marginRight:"5px"}}> <IoInformationCircle/></b><u><b>filters</b></u></span></Col>
                   
                                
            </Row>
              </div>

                </div>
              )}
            </Container>
          </React.Fragment>
        );
    }
}

export default PackagingFilter;