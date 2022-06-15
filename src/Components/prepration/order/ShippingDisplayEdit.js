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
class ShippingDisplayEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shippingDisp: false,
      shippingDisplayArr: [],
    };
  }
  componentDidMount(){
    console.log("dhkfjshjgv", this.props.shippingDisplayArr)
  }


backHandler=()=>{
  console.log("calling back handler for list")
  remover("ShippingDisplayEdit")
  this.props.shippingDiplayClosehandler()
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
        <a onClick={this.backHandler}>Container Display</a>
      </b>
    </u>{" "}
    &#62;
    <u>
      {" "}
      <b>
        {" "}
        <a>Preparation Orders Management</a>
      </b>
    </u>{" "}
    
  </span>
                
               
  <div>

<div
    style={{
      border: "1px",
      // backgroundColor: "grey",
      border: "1px solid black",
      marginTop : "10px"
    }}
  >
    <b style={{ marginLeft: "5px" }}>&#62;&#62;{" "}Preparation</b>
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
      <Label>Site</Label>
    </Col>

    <Col>
    
      <Input bsSize="sm" />
    </Col>

    <Col> </Col>
    <Col>
      <Label>Company</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>

    <Col>
      <Label>History</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>
    
  </Row>

  <Row style={{ marginTop: "10px" }}>
    <Col>
      <Label>Preparation Order Id</Label>
    </Col>

    <Col>
    
      <Input bsSize="sm" />
    </Col>

    <Col> </Col>
    <Col>
      <Label>Type</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>

    <Col>
      <Label>Status</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>
    
  </Row>

  <Row style={{ marginTop: "10px" }}>
    <Col>
      <Label>Urgency</Label>
    </Col>

    <Col>
    
      <Input bsSize="sm" />
    </Col>

    <Col> </Col>
    <Col>
      <Label>Printing Language</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>

    <Col>
      <Label>Order Taken Date</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>
    
  </Row>

  <Row style={{ marginTop: "10px" }}>
    <Col>
      <Label>Desired Preparation Date</Label>
    </Col>

    <Col>
    
      <Input bsSize="sm" />
    </Col>

    <Col> </Col>
    <Col>
      <Label>Desired Delivery Date</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>

    <Col>
      <Label>Customer Desired Delivery Date</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>
    
  </Row>

  <Row style={{ marginTop: "10px" }}>
    <Col>
      <Label>Waves</Label>
    </Col>

    <Col>
    
      <Input bsSize="sm" />
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

        
</div>           


<div>
 <hr/>
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
      <Label>Container Shipping Line</Label>
    </Col>

    <Col>
    
      <Input bsSize="sm" />
    </Col>

    <Col> </Col>
    <Col>
      <Label>Number Of Trailers</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>

    <Col>
      <Label>ETA Date</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>
    
  </Row>

  <Row style={{ marginTop: "10px" }}>
    <Col>
      <Label>Transport Plan</Label>
    </Col>

    <Col>
    
      <Input bsSize="sm" />
    </Col>

    <Col> </Col>
    <Col>
      <Label>Vessel</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>

    <Col>
      <Label>Transport Company</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>
    
  </Row>

  <Row style={{ marginTop: "10px" }}>
    <Col>
      <Label>Saudi Kayan Order Id</Label>
    </Col>

    <Col>
    
      <Input bsSize="sm" />
    </Col>

    <Col> </Col>
    <Col>
      <Label>Saudi Kayan Delivery Id</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>

    <Col>
      <Label>Saudi Kayan Shipment Id</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>
    
  </Row>

  <Row style={{ marginTop: "10px" }}>
    <Col>
      <Label>Sabic Order Id</Label>
    </Col>

    <Col>
    
      <Input bsSize="sm" />
    </Col>

    <Col> </Col>
    <Col>
      <Label>Sabic Delivery Id</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>

    <Col>
      <Label>Sabic Shipment Id</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>
    
  </Row>

  <Row style={{ marginTop: "10px" }}>
    <Col>
      <Label>Shipping Point</Label>
    </Col>

    <Col>
    
      <Input bsSize="sm" />
    </Col>

    <Col> </Col>
    <Col>
      <Label>Voyage</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>

    <Col>
      <Label>Destination</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>
    
  </Row>

  <Row style={{ marginTop: "10px" }}>
    <Col>
      <Label>SAP Shipment No</Label>
    </Col>

    <Col>
    
      <Input bsSize="sm" />
    </Col>

    <Col> </Col>
    <Col>
    <Label>Link</Label>
    </Col>
    
    <Col>
    <Input bsSize="sm" />
      
    </Col>
    <Col> </Col>

    <Col>
      
    </Col>
    
    <Col>
      
    
    </Col>
    <Col> </Col>
    
  </Row>
</div>       


<div>
  <hr/>
  <div>
<input type="checkbox" id="myid"></input>
{" "}
  <a href="#" >Active </a>{" "}
  <a style={{marginLeft : "15px"}}>&#62;&#62;Shipping </a>{" "}

  </div>
  <div
    style={{
      border: "1px",
      backgroundColor: "grey",
      border: "1px solid black",
      marginTop : "10px"
    }}
  >
    <b style={{ marginLeft: "5px" }}>Description</b>
  </div>
  <Row style={{ marginTop: "10px" }}>
    <Col>
      <Label>Shipping Status</Label>
    </Col>

    <Col>
    
      <Input bsSize="sm" />
    </Col>

    <Col> </Col>
    <Col>
      <Label>Carrier</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>

    <Col>
      <Label>Dispatch Mode</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>
    
  </Row>

  <Row style={{ marginTop: "10px" }}>
    <Col>
      <Label>Means of Transport</Label>
    </Col>

    <Col>
    
      <Input bsSize="sm" />
    </Col>

    <Col> </Col>
    <Col>
      <Label>Carrier Recieved</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>

    <Col>
      <Label>Dispatch Mode Recieved</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>
    
  </Row>

  <Row style={{ marginTop: "10px" }}>
    <Col>
      <Label>Palletisation Type</Label>
    </Col>

    <Col>
    
      <Input bsSize="sm" />
    </Col>

    <Col> </Col>
    <Col>
      <Label>Location</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>

    <Col>
      <Label>Gate</Label>
    </Col>
    
    <Col>
      
      <Input bsSize="sm" />
    </Col>
    <Col> </Col>
    
  </Row>


</div>    
            
               </Container>
          </React.Fragment>
        );
    }
}

export default ShippingDisplayEdit;