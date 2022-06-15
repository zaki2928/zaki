import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
  } from "reactstrap";
  import { FaSave} from "react-icons/fa";
  import {remover , RackEditData} from '../../../../store/Store';
  import axios from 'axios';
  import { properties } from '../../../../Properties/Properties';
import { RACK_PROFILE } from '../../../../store/RoleBased';

  const createRackProfile =
properties.Port + properties.createRackProfile;
class RackNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
        newDisp: false,
        newDisplayArr: [],
        errmsg:"",
        msg:"",
    };
  }
  componentDidMount(){
    console.log(this.props.newDisplayArr)

    if (RackEditData !== null) {
      this.setState(
        {
          data: RackEditData,
        },
        () => {
          console.log("data present after tab switch", this.state.data);
          this.setState({
            idProfilCellRack:RackEditData.idProfilCellRack,
            defaultPR: RackEditData.defaultPR,
            description: RackEditData.description,
            mDate:RackEditData.mDate,
            mUsername:RackEditData.mUsername,
            versionLock:RackEditData.versionLock,
            
          });
        }
      );
    }


  }
  SubmitHandler = () => {
    //console.log("posting data", this.state);
    console.log("rack creatttttteeeeeee uzmii calling");
    const data = {
      idProfilCellRack:this.state.idProfilCellRack,
      defaultPR: this.state.defaultPR,
      description: this.state.description,
      mDate:this.state.mDate,
      mUsername:this.state.mUsername,
      versionLock:this.state.versionLock,
    };
     console.log("rack send edit dat", data);
    axios.post(createRackProfile, data)
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

backHandler=()=>{
  console.log("calling back handler for list zakii")
  remover("RackNew")
  this.props.editClosehandler();
}

// backHandler = (data) => {
//   console.log("backhandler calling rack cell-->", data);
//   this.props.editClosehandler(data);
// };

onchangehandler = (event) => {
  console.log("onchangehandler", event.target.value);
  // console.log("onchangehandler", event.target.name);
  this.setState({
    [event.target.name]: event.target.value,
  });
};
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
  
                  <div class="row-xs-6 bottom-row ">

{/* {this.state.msg} */}
{RACK_PROFILE === 2?
<div>
<FaSave

//   onClick={() => this.edithandler(props.original)}
></FaSave>{" "}
{/* <button >Configure</button> */}
<a
  style={{ cursor: "pointer" }}
  onClick={this.SubmitHandler}
>
  save
</a>{" "}
<FaSave

//   onClick={() => this.edithandler(props.original)}
></FaSave>{" "}
</div>
    :''}

{/* <button >Configure</button> */}
{/* <a
  style={{ cursor: "pointer" }}
  onClick={this.RackCreatedTestMEthod}
>
  Create and Select
</a>{" "} */}
</div>
<span style={{color:"Green",  fontWeight: "bold"}}>&nbsp;&nbsp;&nbsp;{this.state.msg}</span>
<Row>
<Col></Col>
<Col></Col>
<Col></Col>

<Col></Col>
<Col></Col>
<Col></Col>
<Col></Col>
<Col></Col>

</Row>

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
  <Label>Description</Label>{" "}
</Col>

<Col>
  {" "}
  <Input
    type="text"
    value={this.state.description}
    name="description"
    bsSize="sm"
    onChange={this.onchangehandler}

  />
</Col>
<Col></Col>

<Col> </Col>
    </Row>
<Row style={{ marginTop: "10px" }}>
 <Col>
   <Label>Default Profile</Label>
 </Col>

<Col>
<input  type="checkbox" />
</Col>
<Col> </Col>


<Col> </Col>

</Row>
                 
                   
           

                   <div>
                  <hr />
                   
                 
              </div>
            
               </Container>
          </React.Fragment>
        );
    }
}

export default RackNew;