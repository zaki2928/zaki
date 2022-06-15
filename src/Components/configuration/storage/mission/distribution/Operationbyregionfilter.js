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
import axios from "axios";
import { operationbyregionData, operationbyregionDataHandler,operationbyregionCriteriaHandler } from "../../../../../store/Store"
import Operationbyregionlist from './Operationbyregionlist';
import { properties } from "../../../../../Properties/Properties"

const getListOfOperationByRegion = properties.Port + properties.getListOfOperationByRegion
const getListOfMissionClass = properties.Port + properties.getListOfMissionClass

export default class Operationbyregionfilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      limit: "",
      attribute: null,
      value: null,
      operation: "=",
      listFilterBean: [],
      missionClassId:"",
      missionClassList:[],
      distribution:"",
      idRegionMisClass:"",
      idWarehouse:"",
      originIdRegion:"",
      originDescRegion:"",
      versionLock:"",
      mDate:"",
      mUsername:"",
      description:"",
      
    };
  }

  componentDidMount = () => {
    this.getMissionClass();
  }

  getMissionClass = () => {
    console.log("calling region from dropdown", this.state.missionClassList) 
    axios.get(getListOfMissionClass)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            missionClassList: response.data,
          });

        } else {
          this.setState({
            missionClassList: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  
  operationFilterMethod = () => {
    console.log("put get list url");
    const criteria = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };
    axios
      .post(getListOfOperationByRegion, this.state, {    
        params: {
          limit: this.state.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
            isShow: true,
          });
          operationbyregionDataHandler(response.data);
          operationbyregionCriteriaHandler(criteria);
        } else {
          this.setState({
            isShow: true,
            data: [],
          });
          operationbyregionDataHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  changeHandler = (event) => {
    var index = this.state.listFilterBean.findIndex(
      (data) => data.attribute === event.target.name
    );
    if (index === -1) {
      const data = {
        attribute: event.target.name,
        operation: event.target.value,
      };
      this.state.listFilterBean.push(data);
    } else {
      console.log(
        (this.state.listFilterBean[index].operation = event.target.value)
      );
    }

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
    if (criteria.target.name === "missionClassId") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.missionClassId,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.missionClassId;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "distribution") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.distribution,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.distribution;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }

      if (criteria.target.name === "limit") {
        var index = this.state.listFilterBean.findIndex(
          (data) => data.attribute === criteria.target.name
        );
        if (index === -1) {
          const data = {
            attribute: criteria.target.name,
            operation: this.state.operation,
            value: this.state.limit,
          };
          this.state.listFilterBean.push(data);
        } else {
          this.state.listFilterBean[index].value = this.state.limit;
          console.log("updataed else partttt", this.state.listFilterBean);
        }
      }
    }
    else {
      this.state.listFilterBean.splice(index,1)
    }
console.log("calling criteriaARRRR", this.state.listFilterBean);
this.setState({
  attribute: "",
  operation: "=",
});

}




  backHandler = () => {
    console.log("calling back handler")
    this.setState({
      isShow: false
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

  render() {
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
          {
          operationbyregionData.length !== 0 || 
          this.state.isShow === true ? (
            <Operationbyregionlist data={this.state.data} backHandler={this.backHandler}/>
          ) : (
            <div>
              <span>
                <u>
                  <b>
                    <a>Home</a>
                  </b>
                </u>
                &#62;
                <u>
                  <b>
                    <a>Distribution operations by region search</a>
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
                <b style={{ marginLeft: "5px" }}>Mission Distribution Criteria</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Mission class</Label>
                  </Col>
                  <Col>
                    <Input
                      type="select"
                    //   name="description"
                    //   id="description"
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
                    <Input
                       type="select"
                       name="missionClassId"
                       onChange={this.inputChangeHandler}
                      //  value={this.state.description}
                       onBlur={this.onBlurHandler}
                      bsSize="sm"
                    >
                      <option>---select---</option>
                      {this.state.missionClassList.map(data => <option value={data.missionClassId} key={data.missionClassId}>{data.missionClass}</option>)}

                    </Input>
                  </Col>
                

                <Col>
                  <Label>Distributed</Label>
                  </Col>
                  <Col>
                    <Input
                      type="select"
                    //   name="typeAssignment"
                      onClick={this.changeHandler}
                    //   id="typeAssignment"
                      bsSize="sm"
                    >
                      <option value="=">=</option>
                      <option value="/=">&ne;</option>
                      <option value="AMONG">AMONG</option>
                      <option value="NOT AMONG">NOT_AMONG</option>
                    </Input>
                  </Col>
                  <Col>
                    <Input
                      type="select"
                      name="distribution"
                      onChange={this.inputChangeHandler}
                      value={this.state.distribution}
                      onBlur={this.onBlurHandler}
                      bsSize="sm"
                    >
                      <option>---select---</option>
                      <option value='0'>_NO_</option>
                      <option value='1'>_YES_</option>
                      </Input>
                  </Col>
                
              </Row>

              <br />

              <Row style={{ marginTop: "5px" }}>
                  <Col>
                    <Label>Maximum Results</Label>{" "}
                  </Col>
                  <Col>
                    {" "}
                    <Input
                      type="text"
                      name="text"
                      id="exampleSelect"
                      value="="
                      // style={{ width: "60px" }}
                      bsSize="sm"
                    >
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
                  </Col>
                  <Col>
                  </Col>
                  
                </Row>

              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                <Button>Reset Criteria</Button>
                <Button
                  onClick={this.operationFilterMethod}
                  style={{ marginLeft: "5px" }}
                >
                  Display
                </Button>
              </div>
            </div>
             )
            }
        </Container>
      </React.Fragment>
    );
  }
}
