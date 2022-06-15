import React, { Component } from "react";
import { Container, Row, Col, Label, Input, Button } from "reactstrap";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaSave } from "react-icons/fa";
import axios from "axios";
import { MdFastForward } from "react-icons/md";
import {physicalgateEditData, remover, physicalgateid} from "../../../store/Store"
import { properties } from "../../../Properties/Properties";
const getWarehousesForPhysicalgate = properties.Port + properties.getWarehousesForPhysicalgate;
const getTypeAssignmentforgoodsin = properties.Port + properties.getTypeAssignmentforgoodsin;
const getTypeAssignmentforinterstock = properties.Port + properties.getTypeAssignmentforinterstock;
const getTypeAssignmentforshipping = properties.Port + properties.getTypeAssignmentforshipping;


export default class Physicalgateedit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data:[],
      alwaysAvailable: "",
      available: "",
      defaultGate: "",
      description: "",
      encode: "",
      gateNumber: "",
      idGate: "",
      idGateFather: "",
      idLocation: "",
      idSite: "",
      idWarehouse: "",
      mDate: "",
      mParent: {},
      mUsername: "",
      physical: "",
      statusGate: "",
      typeAssignment1: "",
      typeGate: "",
      versionLock: "",
      idWarehouseList:[],
      typeAssignmentList1:[],
      typeAssignmentList2:[],
      typeAssignmentList3:[],
      isstockactive:false,
      isChecked: false,
      checkeditems: new Map(),
      listFilterBean: [],
      isstockactive1:false,
      typeAssignment2:"",
      isstockactive3:false,
      zQueueTruck:"",



    };
  }

  componentDidMount() {
    this.getIdWarehouseList();
    this.getTypeAssignList();
    this.getTypeAssignList1();
    this.getTypeAssignList2();
    console.log("calling edit data length", this.state.data.length);
    console.log( this.props.data);
    console.log("calling edit ", physicalgateEditData);

    if (physicalgateEditData !== null) {
      this.setState(
        {
          data: physicalgateEditData,
        },
        () => {
          console.log("data present after tab switch", this.state.data);
          this.setState({
            description:physicalgateEditData.description,
            idSite:physicalgateEditData.idSite,
            idWarehouse:physicalgateEditData.idWarehouse,
            defaultGate:physicalgateEditData.defaultGate,
            available: physicalgateEditData.available,
            alwaysAvailable: physicalgateEditData.alwaysAvailable,
            gateNumber: physicalgateEditData.gateNumber,
            encode: physicalgateEditData.encode,
            statusGate:physicalgateEditData.statusGate,
            typeAssignment:physicalgateEditData.typeAssignment,
            isstockactive:physicalgateEditData.isstockactive,
            isstockactive1:physicalgateEditData.isstockactive1,
            isstockactive2:physicalgateEditData.isstockactive2,
            idLocation:physicalgateEditData.idLocation,
            zQueueTruck:physicalgateEditData.zQueueTruck,
            typeGate:physicalgateEditData.typeGate,

           
            
          });
        }
      );
    }
  }

  getTypeAssignList1 = () => {
    console.log("calling region from dropdown", this.state.typeAssignmentList2) 
    axios.get(getTypeAssignmentforgoodsin)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            typeAssignmentList2: response.data,
          });

        } else {
          this.setState({
            typeAssignmentList2: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getTypeAssignList = () => {
    console.log("calling region from dropdown", this.state.typeAssignmentList1) 
    axios.get(getTypeAssignmentforinterstock)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            typeAssignmentList1: response.data,
          });

        } else {
          this.setState({
            typeAssignmentList1: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  getTypeAssignList2 = () => {
    console.log("calling region from dropdown", this.state.typeAssignmentList3) 
    axios.get(getTypeAssignmentforshipping)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            typeAssignmentList3: response.data,
          });

        } else {
          this.setState({
            typeAssignmentList3: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  getIdWarehouseList = () => {
    console.log("calling region from dropdown", this.state.idWarehouseList) 
    axios.get(getWarehousesForPhysicalgate)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            idWarehouseList: response.data,
          });

        } else {
          this.setState({
            idWarehouseList: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


  activeHandler = (event) => {
    console.log("activeHandler calling ", event.target.value);
    console.log("activeHandler calling--> ", event.target.checked);
    if (event.target.checked === true) {
      this.setState({
        // isChecked:true
        isstockactive: true,
      });
    } else {
      this.setState({
        isstockactive: false,

        // isChecked:false
      });
    }
  };


  activeHandler1 = (event) => {
    console.log("activeHandler calling ", event.target.value);
    console.log("activeHandler calling--> ", event.target.checked);
    if (event.target.checked === true) {
      this.setState({
        // isChecked:true
        isstockactive1: true,
      });
    } else {
      this.setState({
        isstockactive1: false,

        // isChecked:false
      });
    }
  };


  activeHandler2 = (event) => {
    console.log("activeHandler calling ", event.target.value);
    console.log("activeHandler calling--> ", event.target.checked);
    if (event.target.checked === true) {
      this.setState({
        // isChecked:true
        isstockactive2: true,
      });
    } else {
      this.setState({
        isstockactive2: false,

        // isChecked:false
      });
    }
  };

// SubmitHandler = () => {
//     axios.put(updateExcParameter, this.state)
//       .then((response) => {
//         if (response.status === 200) {
//           console.log("resposne success", response.data);
//           this.setState({
//             msg: "Updated Successfully",
//           });

//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };


activehndler2 = (idGate) => {
  var data = {};
  // if(this.state.isChecked===true){
  if (this.state.isstockactive === true) {
    data = {
      isstockactive:true,
      typeAssignment:this.state.typeAssignment,
      idLocation:this.state.idLocation,
      

    };
  } else {
    data = {
      typeAssignment:this.state.typeAssignment,
      idLocation:this.state.idLocation,
  }
  }
}
  onchangehandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

backHandler=()=>{
    console.log("calling back handler for list")
    remover(physicalgateid)
    this.props.editcloseHandler()
  }

    
  render() {
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ marginLeft: "14px" }}
        >
          {/* {Logicalgatelistdata.length !== 0 || this.state.isShow === true ? (
            <Logicalgatelist tableData={this.state.tableData} />
          ) : ( */}
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
                  <a>Gates Search</a>
                </b>
              </u>
              &#62;
              <u>
                <b>
                  <a style={{cursor:"pointer" }} onClick={this.backHandler}>Gates Management</a>
                </b>
              </u>
              &#62;
              <u>
                <b>
                  <a style={{cursor:"pointer" }}>Gate edition</a>
                </b>
              </u>
            </span>
            <br />
            <div>
              <span><u><FaSave size="25"/>save</u></span>
            </div>
            <br />
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
              }}
            >
              <b style={{ marginLeft: "5px" }}>General</b>
            </div>
            <br />
            <li>Description</li>
            <div style={{ padding: "2px 2px 8px 10px" }}>
            
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
                onChange={this.onchangehandler}
                bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Site</Label>{" "}
              </Col>
              <Col>
                <Input
                type="text"
                value={this.state.idSite}
                name="idSite"
                onChange={this.onchangehandler}
                bsSize="sm" />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Warehouse</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm"
                type="select"
                value={this.state.idWarehouse}
                name="idWarehouse"
                // onChange={this.onchangehandler}
                >
                      {this.state.idWarehouseList.map(data => <option value={data.idWarehouse} key={data.idWarehouse}>{data.description}</option>)}
                  </Input>
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Default</Label>{" "}
              </Col>
              <Col >
                <Input
                value={this.state.defaultGate}
                name="defaultGate"
                onChange={this.onchangehandler}
                bsSize="sm"
                type="checkbox"
                />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Available</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm"
                type="checkbox"
                value={this.state.available}
                name="available"
                onChange={this.onchangehandler}
                >
                  
                  </Input>
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Always available</Label>{" "}
              </Col>
              <Col >
                <Input bsSize="sm" 
                type="checkbox"
                value={this.state.alwaysAvailable}
                name="alwaysAvailable"
                onChange={this.onchangehandler}
                
                />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            
            
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Gate no</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                 value={this.state.gateNumber}
                 name="gateNumber"
                 onChange={this.onchangehandler}
                bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Barcode</Label>{" "}
              </Col>
              <Col>
                <Input
                type="text"
                value={this.state.encode}
                name="encode"
                onChange={this.onchangehandler}
                bsSize="sm" />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
         
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Status</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                type="text"
                value={this.state.statusGate}
                name="statusGate"
                // onChange={this.onchangehandler}
                bsSize="sm" 
                >
                {this.state.statusGate === 100
                    ? this.setState({ statusGate: "Free" })
                    : this.state.statusGate === 200
                    ? this.setState({ statusGate: "Reserved" })
                    : this.state.statusGate === 300
                    ? this.setState({ statusGate: "Busy" })
                    : null}
                </Input>
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                {" "}
              </Col>
              <Col>
                
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
         
            </div>
<hr></hr>
<Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Active</Label>
                  <Input
                    bsSize="sm"
                    type="checkbox"
                    onChange={this.activeHandler}
                    style={{ marginLeft: "10px" }}
                  />{" "}
                </Col>

                <b>Inter_Stock</b>
                <Col> </Col>
                <Col></Col>

                <Col> </Col>
                <Col> </Col>
                <Col></Col>
                <Col></Col>
                <Col> </Col>
              </Row>
               {this.state.isstockactive === true ? (
                <div>
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Inter_Stock</b>
                  </div>
           
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Assignment</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                      type="select"
                      name="typeAssignment"
                      value={this.state.typeAssignment1}
                      bsSize="sm"
                    >

                    {this.state.typeAssignmentList1.map(data => <option value={data.value} key={data.typeAssignment1}>{data.description}</option>)}

                    </Input>
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Location</Label>{" "}
              </Col>
              <Col>
              <Input
              
                      type="select"
                      name="idLocation"
                      value={this.state.idLocation}
                      bsSize="sm"
                    >
                      <option>=</option>
                    </Input>
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Rfid tag</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  type="text"
                  name="rfid Tag"
                  value={this.state.rfidTag}
                  bsSize="sm"
                    >
                    </Input>
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
               {" "}
              </Col>
              <Col>
              
              </Col>
              <Col></Col>
              <Col> </Col>
              </Row>
              </div>
              ) : null}

              <div></div>
              <br />
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Active</Label>
                  <Input
                    bsSize="sm"
                    type="checkbox"
                    onChange={this.activeHandler1}
                    style={{ marginLeft: "10px" }}
                  />{" "}
                </Col>

                <b>GoodsIn</b>
                <Col> </Col>
                <Col></Col>

                <Col> </Col>
                <Col> </Col>
                <Col></Col>
                <Col></Col>
                <Col> </Col>
              </Row>
               {this.state.isstockactive1 === true ? (
                <div>
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>GoodsIn</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Assignment</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                      type="select"
                      name="typeAssignment"
                      value={this.state.typeAssignment}
                      bsSize="sm"
                    >
                   
                    {this.state.typeAssignmentList2.map(data => <option value={data.value} key={data.typeAssignment2}>{data.description}</option>)}

                    </Input>
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Location</Label>{" "}
              </Col>
              <Col>
              <Input
                      type="select"
                      name="idLocation"
                      value={this.state.idLocation}
                      bsSize="sm"
                      readOnly
                    >
                      <option>=</option>
                    </Input>
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Rfid tag</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                       type="text"
                       name="rfid Tag"
                       value={this.state.rfidTag}
                       bsSize="sm"
                    >
                    </Input>
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
               {" "}
              </Col>
              <Col>
              
              </Col>
              <Col></Col>
              <Col> </Col>
              </Row>
              </div>
              ) : null}

<br />
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Active</Label>
                  <Input
                    bsSize="sm"
                    type="checkbox"
                    onChange={this.activeHandler2}
                    style={{ marginLeft: "10px" }}
                  />{" "}
                </Col>

                <b>Shipping</b>
                <Col> </Col>
                <Col></Col>

                <Col> </Col>
                <Col> </Col>
                <Col></Col>
                <Col></Col>
                <Col> </Col>
              </Row>
               {this.state.isstockactive2 === true ? (
                <div>
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Shipping</b>
                  </div>
                  <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Assignment</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                      type="select"
                      name="typeAssignment"
                      value={this.state.typeAssignment}
                      bsSize="sm"
                    >
                   
                    {this.state.typeAssignmentList3.map(data => <option value={data.value} key={data.typeAssignment3}>{data.description}</option>)}

                    </Input>
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Location</Label>{" "}
              </Col>
              <Col>
              <Input
                      type="select"
                      name="idLocation"
                      value={this.state.idLocation}
                      bsSize="sm"
                    >
                      <option>=</option>
                    </Input>
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Type</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                      type="select"
                      name="typeGate"
                      id="typeGate"
                      value={this.state.typeGate}

                      bsSize="sm"
                    >
                     {this.state.typeGate === 100
                    ? this.setState({ typeGate: "_Truck_" })
                    : this.state.typeGate === 200
                    ? this.setState({ typeGate: "Container" })
                   
                    : null}
                    </Input>
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
               {" "}
              </Col>
              <Col>
              
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>

            
<Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Queue truck</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                 type="text"
                 name="zQueueTruck"
                 id="zQueueTruck"
                 value={this.state.zQueueTruck}
                 bsSize="sm"
                    />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
               {" "}
              </Col>
              <Col>
              
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            </div>
              ) : null}

            </div>
            <br/>
          {/* </div> */}
          {/* )} */}
        </Container>
      </React.Fragment>
    );
  }
}
