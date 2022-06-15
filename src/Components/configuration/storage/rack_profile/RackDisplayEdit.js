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
 
  import { FaSave} from "react-icons/fa";
  import {remover,RackDispEditData  ,RackDisplayData } from '../../../../store/Store';
  import axios from 'axios'
  import { properties } from '../../../../Properties/Properties';
import { RACK_PROFILE } from '../../../../store/RoleBased';
  const getListOfAllPackaging =
  properties.Port + properties.getListOfAllPackaging;
  const createProfileLine =
  properties.Port + properties.createProfileLine;
class RackDisplayEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editDisp: false,
      editDisplayArr: [],
      idPackaging:"",
      description:"",
      numberOfContainer:"",
      idpackagingList:[],
      errmsg:"",
      msg:"",
    };
  }

  
  componentDidMount(){
    this.getListOfAllPackaging();
    console.log("dhkfjshjgv", this.props.editDisplayArr)
    console.log("comp callin in display by  RackDispEditData ", RackDispEditData   )
    // if (RackDispNewData .length === 0) {
      console.log("length is not zero +++++++++++++++++++++++++++++++++++++", RackDispEditData  );
        this.setState({
          idPackaging:RackDispEditData.idPackaging,
          numberOfContainer:RackDispEditData.numberOfContainer,
          idProfilCrLine:RackDispEditData.idProfilCrLine,
          idProfilCellRack:RackDispEditData.idProfilCellRack,
          versionLock:RackDispEditData.versionLock,
        });
    console.log("length is not zero", RackDisplayData);
    this.setState({
      description:RackDisplayData.description,
    });
    // console.log("comp callin in display by  RackDispNewData", RackDispNewData  )
    // // if (RackDispNewData .length === 0) {
    //   console.log("length is not zero +++++++++++++++++++++++++++++++++++++", RackDispNewData );
    //     this.setState({
    //       idPackaging:RackDispNewData .idPackaging,
    //     });
    // }

  }
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
  
savehandler= ()=>{
    //console.log("posting data", this.state);
    console.log("rack creatttttteeeeeee uzmii calling");
    const data = {
      numberOfContainer:this.state.numberOfContainer,
            idProfilCrLine:this.state.idProfilCrLine,
            idPackaging:this.state.idPackaging,
            idProfilCellRack:this.state.idProfilCellRack,



}
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

backHandler=()=>{
  console.log("calling back handler for list")
  remover("RackDisplayEdit")
  this.props.editDiplayClosehandler()
}
    render() {
        return (
            <React.Fragment>
            <Container
              className="themed-container"
              fluid={true}
              // style={{ border: "1px solid black", marginLeft: "14px" }}
            >
              
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
                        <a style={{cursor:"pointer"}} onClick={this.backHandler}>Cell Racks Profile Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}} onClick={this.backHandler}>Cell Racks Profile Management</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}}onClick={this.backHandler}>Cell Racks Profile Line Management</a>
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
           {RACK_PROFILE === 2?
           <div>
            <FaSave
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaSave>{" "}
{/* <button >Configure</button> */}
<a 
 style={{ cursor: "pointer" }}
 onClick={this.savehandler}
>Save</a>{" "}
</div>
:''}
 </div>  
 <span style={{color:"Green",  fontWeight: "bold"}}>&nbsp;{this.state.msg}</span>
                  
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
                        bsSize="sm"
                        value={this.state.idPackaging}
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
                  <Label>No Of Containers</Label>
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
                   
           

                   <div>
                  <hr />
                   
                 
              </div>
            
               </Container>
          </React.Fragment>
        );
    }
}

export default RackDisplayEdit;