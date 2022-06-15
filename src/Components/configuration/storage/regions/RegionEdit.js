import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Label,
    Input,
  } from "reactstrap";
import "react-table-v6/react-table.css";
import { FaSave} from 'react-icons/fa';
import { remover, RegionEditData } from '../../../../store/Store';
import axios from 'axios';
import { properties } from '../../../../Properties/Properties';

const getListOfWarehouseById = properties.Port + properties.getListOfWarehouseById
class RegionEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      idRegion:'',
      mDate: '',
      mUsername: "",
      versionLock: '',
      cellDescOrder: "",
      combinationCell: '',
      defaultRegion: '',
      description: "",
      descriptionShort: "",
      desc1Length: '',
      desc2Length: '',
      desc3Length: '',
      desc4Length: '',
      regionLength: '',
      sepDesc1Desc2:'' ,
      sepDesc2Desc3: "",
      sepDesc3Desc4: '',
      sepRegionDesc1: '',
      modeTransitLocation: '',
      idAlpha: '',
      idSite: "",
      idWarehouse: "",
      modeLocationScan: '',
      idAlphaArr:[],
      idWarehouseArr:[],
      listFilterBean:[],
      limit: "",
      attribute: null,
      operation: "=",
      value: null,
      criteria: "",
      passedcriteria: "",
  
     
    };
  }

  componentDidMount(){
    console.log("calling edit RegionEditData", RegionEditData)
    this.SubmitHandler()
this.setState({
  idRegion:RegionEditData.idRegion,
  mDate: RegionEditData.mDate,
  mUsername: RegionEditData.mUsername,
  versionLock: RegionEditData.versionLock,
  cellDescOrder: RegionEditData.cellDescOrder,
  combinationCell: RegionEditData.combinationCell,
  defaultRegion: RegionEditData.defaultRegion,
  description: RegionEditData.description,
  descriptionShort: RegionEditData.descriptionShort,
  desc1Length: RegionEditData.desc1Length,
  desc2Length: RegionEditData.desc2Length,
  desc3Length: RegionEditData.desc3Length,
  desc4Length: RegionEditData.desc4Length,
  regionLength: RegionEditData.regionLength,
  sepDesc1Desc2:RegionEditData.sepDesc1Desc2 ,
  sepDesc2Desc3: RegionEditData.sepDesc2Desc3,
  sepDesc3Desc4: RegionEditData.sepDesc3Desc4,
  sepRegionDesc1: RegionEditData.sepRegionDesc1,
  modeTransitLocation: RegionEditData.modeTransitLocation,
  idAlpha: RegionEditData.idAlpha,
  idSite: RegionEditData.idSite,
  idWarehouse: RegionEditData.idWarehouse,
  modeLocationScan: RegionEditData.modeLocationScan,
  idAlphaArr:[],
  idWarehouseArr:[],
})
  }
  backHandler=()=>{
    remover("RegionEdit")
    this.props.editClosehandler()
  }

  onchangehandler = (event) => {
    console.log("onchangehandler");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  SubmitHandler = () => {
    console.log("Date which we are s ending", this.state);
    axios
      .post(getListOfWarehouseById + RegionEditData.idWarehouse)
      // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({
            message: "Data Saved Successfully",
          });

          // ProductHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };


//   getWarehouseById = (id) => {
//     console.log("warehouse idddddd sidd fcfgdc",RegionEditData.idWarehouse)
//         axios
//             .post("http://localhost:8080/warehouse/getListOfWarehouseById/" + RegionEditData.idWarehouse)
//             // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
//             .then((response) => {
//                 if (response.status === 200) {
//                     console.log("resposne success", response.data);
//                     this.state.warehouses.push(response.data)
//                     this.setState({
//                         message: "Data Saved Successfully",
//                         dropdownWarehousevalue: this.state.warehouses
//                     });

//                 }
//             })
//             .catch((error) => {
//                 console.log(error);
//             });
// };


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
                        <a style={{cursor:"pointer"}} onClick={this.backHandler}>Regions Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}}>Regions Management</a>
                      </b>
                    </u>
                  </span>
                  <br />
            
            <div>
            <div class="row-xs-6 bottom-row ">
            <FaSave
                
                  // onClick={() => this.edithandler(props.original)}
                >
                  
                </FaSave>{" "}
{/* <button >Configure</button> */}
<a style={{cursor:"pointer"}} onClick={this.SubmitHandler}>Save</a>
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
                  <Label>Description</Label>
                </Col>
                
                <Col>
                  
                  <Input bsSize="sm" 
                  value={this.state.description}
                  onChange={this.onchangehandler}
                  name="description"
                  />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Short Description</Label>
                </Col>
                
                <Col>
                  
                  <Input bsSize="sm" 
                  value={this.state.descriptionShort}
                  onChange={this.onchangehandler}
                  name="descriptionShort"
                  />
                </Col>
                <Col> </Col>
                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Site</Label>
                </Col>

                <Col>
                
                <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "50px" }}
                        bsSize="sm"
                        readOnly="true"
                      >
                        <option >Saudi Kayan</option>
                        {/* <option></option>
                        <option></option>
                        <option></option>
                        <option></option> */}
                      </Input>
                </Col>

                <Col> </Col>
               
                <Col>
                  <Label>Warehouse</Label>
                </Col>
                
                <Col>
                  
                <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "50px" }}
                        bsSize="sm"
                        readOnly
                      >
                        <option>Remote Terminal 1</option>
                        {/* <option></option> */}
                        {/* <option></option> */}
                        {/* <option></option> */}
                        {/* <option></option> */}
                      </Input>
                </Col>
                <Col> </Col>
                

              
                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Default Region</Label>
                </Col>

                <Col>
                
                <input type="checkbox" 
                value={this.state.defaultRegion}
                 name="defaultRegion"
                 onChange={this.onchangehandler}></input>
                </Col>

                <Col> </Col>
                
                
                <Col>
                 
                </Col>
                <Col> </Col>

                <Col>
                
                </Col>
                
               
                
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Mode Transit Location</Label>
                </Col>

                <Col>
                
                <Input
                        type="select"
                        name="modeTransitLocation"
                       value={this.state.modeTransitLocation}
                       onChange={this.onchangehandler}
                        bsSize="sm"
                      >
                        
                        <option value="-1">_Never_</option>
                        <option value="1">Region</option>
                        <option value="2">_Region aisle_</option>
                       
                      </Input>
                </Col>

                <Col> </Col>
               
                <Col>
                  <Label>Location Scan Mode</Label>
                </Col>
                
                <Col>
                  
                <Input
                        type="select"
                        name="modeLocationScan"
                       value={this.state.modeLocationScan}
                       onChange={this.onchangehandler}
                        bsSize="sm"
                      >
                        <option value="100">_Both_</option>
                        <option value="200">_check digits only_</option>
                       
                      </Input>
                </Col>
                <Col> </Col>
                

              
                
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Combination Cell</Label>
                </Col>

                <Col>
                
                <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "50px" }}
                        bsSize="sm"
                        readOnly
                      >
                        <option>All</option>
                        
                        {/* <option></option> */}
                        {/* <option></option> */}
                        {/* <option></option> */}
                        {/* <option></option> */}
                      </Input>
                </Col>

                <Col> </Col>
               
                <Col>
                  <Label>Cells Order</Label>
                </Col>
                
                <Col>
                  
                <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "50px" }}
                        bsSize="sm"
                        readOnly
                      >
                        <option>_RACL_</option>
                        {/* <option></option> */}
                        {/* <option></option> */}
                        {/* <option></option> */}
                        {/* <option></option> */}
                      </Input>
                </Col>
                <Col> </Col>
                

              
                
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Alphabet</Label>
                </Col>

                <Col>
                
                <Input
                        type="select"
                        name="select"
                        id="exampleSelect"
                        // style={{ width: "50px" }}
                        bsSize="sm"
                        readOnly
                      >
                        <option>Alphabet alphanumeric</option>
                        {/* <option></option> */}
                        {/* <option></option> */}
                        {/* <option></option> */}
                        {/* <option></option> */}
                      </Input>
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
                  marginTop : "10px"
                }}
              >
                <b style={{ marginLeft: "5px" }}>Cells Order Description</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Region</Label>
                </Col>

                <Col>
                
                <Label>Desc1</Label>
                </Col>

                <Col>
                  <Label>Desc 2</Label>
                </Col>
                
                <Col>
                  
                <Label>Desc 3</Label>
                </Col>
             

                <Col>
                <Label>Desc 4</Label>
                </Col>
                   
              </Row>
              <Row>
                <Col>
                <Input bsSize="sm" />
                </Col>

                <Col>
                
                <Input bsSize="sm" />
                </Col>

                <Col>
                <Input bsSize="sm" />
                </Col>
                
                <Col>  
                <Input bsSize="sm" />
                </Col>
             

                <Col>
                <Input bsSize="sm" />
                </Col>
                   
              </Row>

              <Row style={{marginTop:"10px",marginBottom:"10px"}}>
                <Col>
                <Input bsSize="sm" />
                </Col>

                <Col>
                
                <Input bsSize="sm" />
                </Col>

                <Col>
                <Input bsSize="sm" />
                </Col>
                
                <Col>  
                <Input bsSize="sm" />
                </Col>
             

                   
              </Row>


              


            </div>    
        
            
        </Container>
       
      </React.Fragment>
        );
    }
}

export default RegionEdit;