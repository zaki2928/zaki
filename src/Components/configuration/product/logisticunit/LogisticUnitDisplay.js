import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Label,
  Input,

} from "reactstrap";
import LogisticUnitList from "./LogisticUnitList";
import "react-table-v6/react-table.css";
import { FaSave} from 'react-icons/fa';
import { remover, nestedlogisticunit, LogisticUnitDisplayData,ActualLogisticUnitDisplaydata } from "../../../../store/Store";


export default class LogisticUnitDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data:[],
      packinglinefilter: false,
      // description:"",
      description:"",
      idProduct: "",
      mDate: "",
      mUsername: "",
      rotation: "",
      zGrade: '',
      zIMC: '',
      controlQty: '',
      height: '',
      // idLU: nestedlogisticunit.idLU,
      idLogisticUnit: '',
      length: '',
      quantity: '',
      statusError: '',
      statusLu: '',
      versionLock: '',
      weight: '',
      weightNet: '',
      width: '',
      prodDescription: '',
      prodGrade: '',
      prodIMC: '',
      prodProduct: '',
      available: '',
    };
  }

  componentDidMount=()=>{
    // console.log("calling component did mount hereeeeeeeeeeeeeewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww", LogisticUnitDisplayData)
    if(LogisticUnitDisplayData.length !== 0){
      console.log("calling component did mount hereeeeeeeeeeeeee LogisticUnitDisplayData", LogisticUnitDisplayData)
      this.setState({
        description: LogisticUnitDisplayData.description,
        idProduct: LogisticUnitDisplayData.idProduct,
        mDate: LogisticUnitDisplayData.mDate,
        mUsername: LogisticUnitDisplayData.mUsername,
        rotation: LogisticUnitDisplayData.rotation,
        controlQty: LogisticUnitDisplayData.controlQty,
        height: LogisticUnitDisplayData.height,
        idLU: LogisticUnitDisplayData.idLU,
        idLogisticUnit: LogisticUnitDisplayData.idLogisticUnit,
        length: LogisticUnitDisplayData.length,
        quantity: LogisticUnitDisplayData.quantity,
        statusError: LogisticUnitDisplayData.statusError,
        statusLu: LogisticUnitDisplayData.statusLu,
        versionLock: LogisticUnitDisplayData.versionLock,
        weight: LogisticUnitDisplayData.weight,
        weightNet: LogisticUnitDisplayData.weightNet,
        width: LogisticUnitDisplayData.width,
        prodDescription: LogisticUnitDisplayData.productKLEntity.description,
        prodGrade: LogisticUnitDisplayData.productKLEntity.zGrade,
        prodIMC: LogisticUnitDisplayData.productKLEntity.zIMC,
        prodProduct: LogisticUnitDisplayData.productKLEntity.idReference
      })
    }
    else{
      console.log("calling component did mount hereeeeeeeeeeeeee ActualLogisticUnitDisplaydata", ActualLogisticUnitDisplaydata)
      this.setState({
        description: ActualLogisticUnitDisplaydata.description,
        idProduct: ActualLogisticUnitDisplaydata.idProduct,
        mDate: ActualLogisticUnitDisplaydata.mDate,
        mUsername: ActualLogisticUnitDisplaydata.mUsername,
        rotation: ActualLogisticUnitDisplaydata.rotation,
        controlQty: ActualLogisticUnitDisplaydata.controlQty,
        height: ActualLogisticUnitDisplaydata.height,
        idLU: ActualLogisticUnitDisplaydata.idLU,
        idLogisticUnit: ActualLogisticUnitDisplaydata.idLogisticUnit,
        length: ActualLogisticUnitDisplaydata.length,
        quantity: ActualLogisticUnitDisplaydata.quantity,
        statusError: ActualLogisticUnitDisplaydata.statusError,
        statusLu: ActualLogisticUnitDisplaydata.statusLu,
        versionLock: ActualLogisticUnitDisplaydata.versionLock,
        weight: ActualLogisticUnitDisplaydata.weight,
        weightNet: ActualLogisticUnitDisplaydata.weightNet,
        width: ActualLogisticUnitDisplaydata.width,
        prodDescription: ActualLogisticUnitDisplaydata.description,
        zGrade: ActualLogisticUnitDisplaydata.zGrade,
        zIMC: ActualLogisticUnitDisplaydata.zIMC,
        available: ActualLogisticUnitDisplaydata.available,
        idReference: ActualLogisticUnitDisplaydata.idReference
        
        // prodGrade: LogisticUnitDisplayData.productKLEntity.zGrade,
        // prodIMC: LogisticUnitDisplayData.productKLEntity.zIMC,
        // prodProduct: LogisticUnitDisplayData.productKLEntity.idReference
      })
    }
  
  }

  backHandler=()=>{
    console.log("calling back handler for list")
    remover("LogisticUnitDisplay")
    this.props.lUDisplayCloseHandler()
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
                  <a onClick={this.backHandler}>Display Logistic Unit</a>
                </b>
              </u>
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a>Site Logistic Unit</a>
                </b>
              </u>
            </span>
            <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
               
              </div>
             {LogisticUnitDisplayData.length !== 0 ?
               <div>
               <hr />
              <Row style={{ marginTop: "0px" }}>
             <Col>
               <Label>Product</Label>{" "}
             </Col>
   
             <Col>
               {" "}
               <Input bsSize="sm"  value={this.state.prodProduct}/>
             </Col>
   
             <Col> </Col>
             <Col>
               <Label>Product description</Label>{" "}
             </Col>
             
             <Col>
               {" "}
               <Input bsSize="sm" value={this.state.prodDescription}/>
             </Col>
             <Col> </Col>
           </Row>
   
           <Row style={{ marginTop: "3px" }}>
             <Col >
               <Label>Intermediate material code</Label>{" "}
             </Col>
   
             <Col>
               {" "}
               <Input bsSize="sm" value={this.state.prodIMC}/>
             </Col>
   
             <Col> </Col>
             <Col>
               <Label>Grade</Label>{" "}
             </Col>
             
             <Col>
               {" "}
               <Input bsSize="sm" value={this.state.prodGrade}/>
             </Col>
             <Col> </Col>
           </Row>
           </div>
             :
             <div>
             <hr />
            <Row style={{ marginTop: "0px" }}>
           <Col>
             <Label>Product</Label>{" "}
           </Col>
 
           <Col>
             {" "}
             <Input bsSize="sm"  value={this.state.idReference}/>
           </Col>
 
           <Col> </Col>
           <Col>
             <Label>Product description</Label>{" "}
           </Col>
           
           <Col>
             {" "}
             <Input bsSize="sm" value={this.state.description}/>
           </Col>
           <Col> </Col>
         </Row>
 
         <Row style={{ marginTop: "3px" }}>
           <Col >
             <Label>Intermediate material code</Label>{" "}
           </Col>
 
           <Col>
             {" "}
             <Input bsSize="sm" value={this.state.zIMC}/>
           </Col>
 
           <Col> </Col>
           <Col>
             <Label>Grade</Label>{" "}
           </Col>
           
           <Col>
             {" "}
             <Input bsSize="sm" value={this.state.zGrade}/>
           </Col>
           <Col> </Col>
         </Row>
         </div>
         }
          
        

       
             <div>
            <hr />
           <Row style={{ marginTop: "0px" }}>
          <Col>
            <Label>Logistic unit id</Label>{" "}
          </Col>

          <Col>
            {" "}
            <Input bsSize="sm" value={this.state.idLogisticUnit}/>
          </Col>

          <Col> </Col>
          <Col>
            <Label>Description</Label>{" "}
          </Col>
          
          <Col>
            {" "}
            <Input bsSize="sm" value={this.state.description}/>
          </Col>
          <Col> </Col>
        </Row>

        <Row style={{ marginTop: "3px" }}>
          <Col >
            <Label>Status</Label>{" "}
          </Col>

          <Col>
                {" "}
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  // style={{ width: "50px" }}
                  bsSize="sm"
                  value={this.state.statusLu}
                  disabled
                >
                  <option value="100">In_Progress</option>
                  <option value="200">saudi kayan</option>

                </Input>
              </Col>

          <Col> </Col>
          <Col>
            <Label>Error status</Label>{" "}
          </Col>
          
          <Col>
                    {" "}
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      // style={{ width: "50px" }}
                      bsSize="sm"
                      value={this.state.statusError}
                      disabled
                    >
                      <option value="100">_NO ERROR_</option>
                      <option value="200">_ERROR_</option>
                      
                    </Input>
                  </Col>
          <Col> </Col>
        </Row>
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
              <b style={{ marginLeft: "5px" }}>* <b>&#62;&#62;</b><a > GENERAL</a></b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Site</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Available</Label>{" "}
              </Col>
              
              <Col>
                {" "}
                <Input bsSize="sm"
                type="checkbox"
                checked={this.state.available !== null}
                 />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
            <Col>
                <Label>Status</Label>{" "}
              </Col>

              <Col>
                    {" "}
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      // style={{ width: "50px" }}
                      bsSize="sm"
                      value={this.state.statusLu}
                      disabled
                    >
                      <option value="100">_IN PROGRESS_</option>
                      <option value="200">_COMPLETE_</option>
                      
                    </Input>
                  </Col>
              <Col> </Col>
              <Col>
                <Label>Error status</Label>{" "}
              </Col>

              <Col>
                    {" "}
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      // style={{ width: "50px" }}
                      bsSize="sm"
                      value={this.state.statusError}
                      disabled
                    >
                      <option value="100">_NO ERROR_</option>
                      <option value="200">_ERROR_</option>
                      
                    </Input>
                  </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col >
                <Label>Modified by</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.mUsername}/>
              </Col>
              <Col> </Col>
              <Col>
                <Label>Modified the</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.mDate} />
              </Col>
              <Col> </Col>
            </Row>

           
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
              <b style={{ marginLeft: "5px" }}>
                  * <input type="checkbox"></input> &nbsp;Active  <b>&#62;&#62;</b>
                  <a >STOCK</a></b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Storage profile</Label>{" "}
              </Col>

              <Col>
                    {" "}
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      // style={{ width: "50px" }}
                      bsSize="sm"
                    >
                      <option>(Default: Default storage profile)</option>
                      {/* <option>_ERROR_</option> */}
                      
                    </Input>
                  </Col>
              <Col> </Col>
              <Col>
                <Label>First goods in</Label>{" "}
              </Col>
              
              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Number of layers(cm)</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>

              <Col> </Col>
              <Col>
                {/* <Label></Label>{" "} */}
              </Col>
              
              <Col>
                {" "}
                {/* <Input bsSize="sm" /> */}
              </Col>
              <Col> </Col>
            </Row>
           
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
              <b style={{ marginLeft: "5px" }}> * <input type="checkbox"></input>
               &nbsp;Active  <b>&#62;&#62;</b>
                  <a >PREPARATION</a></b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Preparation algorithm</Label>{" "}
              </Col>

              <Col>
                    {" "}
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      // style={{ width: "50px" }}
                      bsSize="sm"
                    >
                      <option>Full case</option>
                      {/* <option>_ERROR_</option> */}
                      
                    </Input>
                  </Col>

              <Col> </Col>
              <Col>
                <Label>Packaging</Label>{" "}
              </Col>
              
              <Col>
                    {" "}
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      // style={{ width: "50px" }}
                      bsSize="sm"
                    >
                      <option>Full case</option>
                      {/* <option>_ERROR_</option> */}
                      
                    </Input>
                  </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Preparation mode</Label>{" "}
              </Col>

              <Col>
                    {" "}
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      // style={{ width: "50px" }}
                      bsSize="sm"
                    >
                      <option>_Picking dynamic_</option>
                      {/* <option>_ERROR_</option> */}
                      
                    </Input>
                  </Col>
              <Col> </Col>
              <Col>
                <Label>Preparation location</Label>{" "}
              </Col>
              
              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Content status</Label>{" "}
              </Col>

              <Col>
                    {" "}
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      // style={{ width: "50px" }}
                      bsSize="sm"
                    >
                      <option>Available</option>
                      {/* <option>_ERROR_</option> */}
                      
                    </Input>
                  </Col>
              <Col> </Col>
              <Col>
                {/* <Label>Root qty</Label>{" "} */}
              </Col>
              
              <Col>
                {" "}
                {/* <Input bsSize="sm" /> */}
              </Col>
              <Col> </Col>
            </Row>
          </div>  
             <br/>
        </Container>

        {/* <div style={{ marginTop: "10px", marginBottom: "2px",marginLeft: "550px" }}>
         <Button>save</Button>
         </div> */}
    </React.Fragment>
    )
  }
}
