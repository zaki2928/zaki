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
  import {
    IoArrowBackCircleSharp,
    IoArrowForwardCircleSharp,
  } from "react-icons/io5";
  import { FcSearch } from "react-icons/fc";
  import {remover } from '../../../store/Store';
  import { FaSave} from 'react-icons/fa';
  import {PreparationEditData} from '../../../store/Store';
  import {ImCheckboxUnchecked} from "react-icons/im";
class PreparationEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shippingDisp: false,
      shippingDisplayArr: [],
      data: [],
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
    };
  }
  componentDidMount(){
    console.log("calling Repacking Edit edit", PreparationEditData);
    console.log("calling edit data length", this.state.data.length);
    console.log("calling edit datttaaaaaaaaaaaaa&&&&&&aaaa", this.props.data2);
    console.log("calling edit ", PreparationEditData);
  
    if (PreparationEditData !== null) {
      this.setState(
        {
          data: PreparationEditData,
        },
        () => {
          console.log("data present after tab switch", this.state.data);
          this.setState({
           
            idPackaging: PreparationEditData.idPackaging, 
            description: PreparationEditData.description, 
            descriptionShort: PreparationEditData.descriptionShort, 
            typePackaging: PreparationEditData.typePackaging,
            calculVolume: PreparationEditData.calculVolume,
            emptyWeigth: PreparationEditData.emptyWeigth,
            lenthEXT: PreparationEditData.lenthEXT, 
            widthEXT: PreparationEditData.widthEXT, 
            heightEXT:PreparationEditData.heightEXT, 
            lenthINT: PreparationEditData.lenthINT, 
            widthINT: PreparationEditData.widthINT, 
            heightINT:PreparationEditData.heightINT, 
           
         
          });
        }
      );
    }
  }



backHandler=()=>{
  console.log("calling back handler for list")
  remover("PreparationEdit")
  this.props.shippingprepClosehandler()
}
    render() {
        return (
            <React.Fragment>
            
            <Container
              className="themed-container"
              fluid={true}
              // style={{ border: "1px solid black", marginLeft: "14px" }}
            >
              <IoArrowBackCircleSharp onClick={this.backHandler}/>
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
                        <a style={{cursor:"pointer"}} onClick={this.backHandler}>Packagings Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Packagings Management</a>
                      </b>
                    </u>
                  </span>
                
               
  <div>

  <div class="row-xs-6 bottom-row ">
            <FaSave
                  style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
                  color="primary"
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaSave>{" "}
{/* <button >Configure</button> */}
<a href="#" >Save</a>{" "}
              


 </div>

 <div
                style={{
                  border: "1px",
                  // backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop : "10px"
                }}
              >
                <b style={{ marginLeft: "5px" }}><b>&#62;&#62;</b>{" "}General</b>
              </div>
  <div
    style={{
      border: "1px",
      backgroundColor: "grey",
      border: "1px solid black",
      marginTop : "3px"
    }}
  >
    <b style={{ marginLeft: "5px" }}>Description</b>
  </div>
  <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>ID</Label>
                </Col>

                <Col>
                
                <Input bsSize="sm" value={this.state.idPackaging} disabled="true"/>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Description</Label>
                </Col>
                
                <Col>
                  
                <Input
                  bsSize="sm"
                  value={this.state.description}
                  name="description"
                  onChange={this.onchangehandler}
                />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Short Description</Label>
                </Col>
                
                <Col>
                  
                <Input
                  bsSize="sm"
                  value={this.state.descriptionShort}
                  name="descriptionShort"
                  onChange={this.onchangehandler}
                />
                </Col>
                <Col> </Col>
                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Type</Label>
                </Col>

                <Col>
                
                <Input bsSize="sm" value={this.state.typePackaging} disabled="true" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Volume Type</Label>
                </Col>
                
                <Col>
                  
                <Input bsSize="sm" value={this.state.calculVolume} disabled="true" />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Empty Weight(kg)</Label>
                </Col>
                
                <Col>
                  
                <Input
                  bsSize="sm"
                  value={this.state.emptyWeigth}
                  onChange={this.onchangehandler}
                  name="emptyWeigth"
                />
                </Col>
                <Col> </Col>
                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Default</Label>
                </Col>

                <Col>
                
                <input type="checkbox" id="myid"></input>
                </Col>

                <Col> </Col>
                <Col>
                 
                </Col>
                
                <Col>
                 
                </Col>
                <Col> </Col>

                <Col>
                
                </Col>
                
                <Col>
                  
                 
                </Col>
                <Col> </Col>
                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>External Length(cm)</Label>
                </Col>

                <Col>
                
                <Input
                  bsSize="sm"
                  value={this.state.lenthEXT}
                  onChange={this.onchangehandler}
                  name="lenthEXT"
                />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>External Width(cm)</Label>
                </Col>
                
                <Col>
                  
                <Input
                  bsSize="sm"
                  value={this.state.widthEXT}
                  onChange={this.onchangehandler}
                  name="widthEXT"
                />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>External Height(cm)</Label>
                </Col>
                
                <Col>
                  
                <Input
                  bsSize="sm"
                  value={this.state.heightEXT}
                  onChange={this.onchangehandler}
                  name="heightEXT"
                />
                </Col>
                <Col> </Col>
                
              </Row>
</div>       


<div>
  <hr/>
  <div>
<hr></hr>

<ImCheckboxUnchecked style={{cursor:'pointer'}} onClick={()=>{this.setState({show:!this.state.show})}}

>{ this.state.show}</ImCheckboxUnchecked>
            {" "}
              <b >Active </b>{" "}
              <b style={{ marginLeft: "5px" }}><b>&gt;&gt;</b>Stock</b>
</div>


{this.state.show? <div>
  
  <Row style={{border:"1px solid black",backgroundColor:"grey",marginLeft:"0px",marginTop:"3px"}}>
<span>
<IoArrowForwardCircleSharp >

</IoArrowForwardCircleSharp>
<b> Dimensions</b> 
</span>

</Row>

  <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Internal Lenght(cm)</Label>
                </Col>

                <Col>
                
                <Input
                  bsSize="sm"
                  value={this.state.lenthINT}
                  onChange={this.onchangehandler}
                  name="lenthINT"
                />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Internal Width(cm)</Label>
                </Col>
                
                <Col>
                  
                <Input
                  bsSize="sm"
                  value={this.state.widthINT}
                  onChange={this.onchangehandler}
                  name="widthINT"
                />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Internal Height(cm)</Label>
                </Col>
                
                <Col>
                  
                <Input
                  bsSize="sm"
                  value={this.state.heightINT}
                  onChange={this.onchangehandler}
                  name="heightINT"
                />
                </Col>
                <Col> </Col>
                
              </Row>    

  </div> : null
}

  <div>
<hr></hr>

<ImCheckboxUnchecked style={{cursor:'pointer'}} onClick={()=>{this.setState({show2:!this.state.show2})}}

>{ this.state.show2}</ImCheckboxUnchecked>
            {" "}
              <b >Active </b>{" "}
              <b style={{ marginLeft: "5px" }}><b>&gt;&gt;</b>Preparation</b>
</div>


{this.state.show2? <div>
  
  <Row style={{border:"1px solid black",backgroundColor:"grey",marginLeft:"0px",marginTop:"3px"}}>
<span>
<IoArrowForwardCircleSharp >

</IoArrowForwardCircleSharp>
<b> Dimensions</b> 
</span>

</Row>

  <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Internal Lenght(cm)</Label>
                </Col>

                <Col>
                
                <Input
                  bsSize="sm"
                  value={this.state.lenthINT}
                  onChange={this.onchangehandler}
                  name="lenthINT"
                />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Internal Width(cm)</Label>
                </Col>
                
                <Col>
                  
                <Input
                  bsSize="sm"
                  value={this.state.widthINT}
                  onChange={this.onchangehandler}
                  name="widthINT"
                />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Internal Height(cm)</Label>
                </Col>
                
                <Col>
                  
                <Input
                  bsSize="sm"
                  value={this.state.heightINT}
                  onChange={this.onchangehandler}
                  name="heightINT"
                />
                </Col>
                <Col> </Col>
                
              </Row>    

  </div> : null
}

</div>    
            
               </Container>
          </React.Fragment>
        );
    }
}

export default PreparationEdit;