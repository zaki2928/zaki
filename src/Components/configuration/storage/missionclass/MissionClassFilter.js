
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
import axios from 'axios';

import { FcSearch } from "react-icons/fc";
import MissionClassList from './MissionClassList';
import { properties } from '../../../../Properties/Properties';
import { missionClassData, missionclassDataHandler, CriteriaHandler,MissionclassCriteriaHandler } from "../../../../store/Store"
const getListOfClassMissionKls =properties.Port + properties.getListOfClassMissionKls
const getClassMissionKlsById = properties .Port + properties.getClassMissionKlsById

export default class MissionClassFilter extends Component {
  constructor(props) {
    super(props)

    this.state = {
       missionclasslist: false,
        limit: "",
    attribute: null,
        value: null,
        description:"",
        listFilterBean: [],
        missionClassList:[],
        versionLock:"",
        missionClassId:"",
        imperativeDeadline:"",
        desiredDeadline:"",
        priority:"",
        musername:"",
        mdate:"",
    }
}
MissionClassFilterHandler = () => {
    console.log("submitHandler calling", this.state)
    const mission = {
        listFilterBean: this.state.listFilterBean,
        limit: this.state.limit,
      };

    axios.post(getListOfClassMissionKls, this.state, {
        params: {
            limit: this.state.limit,
          },
    })
    .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
            console.log("resposne success", response.data);
            this.setState({
                data: response.data,
                missionclasslist:true

            })

            missionclassDataHandler(response.data);
            MissionclassCriteriaHandler(mission);
        }else {
            this.setState({
              Contentlist: true,
              data: [],
            });
            missionclassDataHandler(response.data);
          }
    })
    
    .catch((error) => {
        console.log(error);
    });

}
changeHandler = (event) => {
    console.log("++++++++++++++++++++++",event.target.value)
      var index = this.state.listFilterBean.findIndex(
        (data) => data.attribute === event.target.name
      );
      if (index === -1) {
        console.log("++++++++++++++++")
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
    getMissionClassList = () => {
        console.log("calling description from dropdown", this.state.missionClassId)
        axios.get(getClassMissionKlsById) 
    //     axios.get(getClassMissionKlsById,this.state,{
    //     params: {
    //         limit: this.state.limit,
    //       }
    // })
    
          .then((response) => {
            if (response.status === 200 && response.data.length !== 0) {
              console.log("resposne success", response.data);
              this.setState({
                descriptionList: response.data,
              });
            } else {
                this.setState({
                  descriptionList: [],
                });
                
              }
            })
            .catch((error) => {
              console.log(error);
            });
        };
        componentDidMount= () =>{
            this.getMissionClassList()
          }
          inputChangeHandler = (event) => {
            this.setState({
              [event.target.name]: event.target.value,
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
            console.log("calling back handler")
            this.setState({
                missionclasslist: false,
              listFilterBean:[],
              limit: null,
            })
          }
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
              }
              console.log("calling criteriaARRRR", this.state.listFilterBean);
          this.setState({
            attribute: "",
            operation: "=",
          });
          }
          render() {
            return (
                <React.Fragment>
                    <Container
                        className="themed-container"
                        fluid={true}
                        style={{ border: "1px solid black", marginLeft: "14px" }}
                    >
                         {missionClassData.length !== 0 || this.state.missionclasslist === true ?
                         (
                       < MissionClassList
                        backHandler={this.backHandler} 
                         data={this.state.data} />
                        ) 
                       :
                       (
                   
                        <div>
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
                                        <a>Misssion class Search</a>
                                    </b>
                                </u>
                            </span>
                            <br />
                            <div
                            style={{
                                border: "1px",
                                backgroundColor: "grey",
                                border: "1px solid black",
                                marginTop: "10px"
                            }}
                        >

                            <b style={{ marginLeft: "5px" }}>General Criteria</b>
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
                      <option>---select---</option>
                      <option>---select---</option>

                      <option>---select---</option>
                      <option>---select---</option>
                      <option>---select---</option>
                      {/* {this.state.missionClassList.map(data => <option value={data.missionClassId} key={data.missionClassId}>{data.missionClass}</option>)} */}

                    </Input>
                  </Col>
                  </Row>
                  <Row style={{ marginTop: "5px" }}>
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
                                    readOnly
                                    style={{ width: "60px" }}
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
                                    style={{ width: "80px" }}
                                    value={this.state.limit}
                                />
                            </Col>
                            </Row>
                            <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                            <Button onClick={this.resetHandler}>Reset Criteria</Button>{" "}
                            <Button
                                onClick={
                                    this.MissionClassFilterHandler
                                }
                            >
                                {" "}
                      Submit
                    </Button>
                        </div>



                    </div>
                    )}
                    </Container>

</React.Fragment>
)
}
}


 
