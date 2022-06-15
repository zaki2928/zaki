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
  import { remover,FamiliesEditionData } from '../../../../store/Store';
  import DualListBox from 'react-dual-listbox';
  import 'react-dual-listbox/lib/react-dual-listbox.css';
  import axios from "axios";
import { properties } from '../../../../Properties/Properties';
  const listOfAllFamilyDEScriptions=  properties.Port + properties.listOfAllFamilyDEScriptions;


  const options = [
    { value: 'one', label: '_other_' },
    { value: 'two', label: '_Aerosol_' },
    { value: 'three', label: '_fragile_' },
    { value: 'four', label: '_Hazardous_ ' },
    { value: 'five', label: '_Vertical_' },
  ];
class ProductFamiliesEdition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      families: false,
      FamiliesArr: [],
      selected: [''],
      idReference:"",
      description:"",
      zIMC:"",
      zGrade:"",
      iddescriptionlisttt:[],

       options : [
        { value: 'one', label: '_other_' },
        { value: 'two', label: '_Aerosol_' },
        { value: 'three', label: '_fragile_' },
        { value: 'four', label: '_Hazardous_ ' },
        { value: 'five', label: '_Vertical_' },
      ]
    };
  }


  getDescriptionlist = (options) => {
    console.log("calling region from dropdown", this.state.iddescriptionlisttt) 
    axios.get(listOfAllFamilyDEScriptions)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success uzmmmmmaaaa", response.data);
          this.setState({
            iddescriptionlisttt: response.data,
          });

        } else {
          this.setState({
            iddescriptionlisttt: [],
          });
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }; 

  onChange = (selected) => {
    this.setState({ selected });
  };

  componentDidMount(){
    this.getDescriptionlist();
    console.log("ibzy component colling FAmilies", this.props.FamiliesArr)
    console.log("------------------------------------",FamiliesEditionData)
    this.setState({
      idReference:FamiliesEditionData.idReference,
      // idReference:this.props.FamiliesArr.idReference,
      // description:this.props.FamiliesArr.description,
      // zIMC:this.props.FamiliesArr.zIMC,
      // zGrade:this.props.FamiliesArr.zGrade,
      description:FamiliesEditionData.description,
      zIMC:FamiliesEditionData.zIMC,
      zGrade:FamiliesEditionData.zGrade,
  })

  }
  backHandler=()=>{
    console.log("calling back handler for list")
    remover("ProductFamiliesEdition")
    this.props.familieCloseHandler()
  }
    render() {
      const { selected } = this.state;
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
                    &#8680;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}} onClick={this.backHandler}>Product List</a>
                      </b>
                    </u>
                    &#8680;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}}>Product Families Edition</a>
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

                   <div>
                     <hr/>
                 <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Product</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input 
                                    type="text"
                                    value={this.state.idReference}
                                    name="idReference"
                                    bsSize="sm"/>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Product description</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input 
                                    type="text"
                                    value={this.state.description}
                                    name="description"
                                    bsSize="sm"/>
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "3px" }}>
                <Col >
                  <Label>Intermediate material code</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input 
                                    type="text"
                                    value={this.state.zIMC}
                                    name="zIMC"
                                    bsSize="sm"
                   />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Grade</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input
                                    type="text"
                                    value={this.state.zGrade}
                                    name="zGrade"
                                    bsSize="sm"/>
                </Col>
                <Col> </Col>
              </Row>
              </div>
              
              <div>
                <hr/>
                <Row style={{ marginTop: "3px" }}>
                <Col >
                
                  <Label><b>All Product Families:</b></Label>{" "}
                  {this.state.iddescriptionlisttt.map(data => <option value={data.description} key={data.description}>{data.description}</option>)}

                </Col>
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>

                <Col> </Col>
                <Col>
                  <Label><b>Selected Product Families:</b></Label>{" "}

                    
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
                  {/* <DualListBox
                  canFilter 
                  filterCallback={(option, filterInput) => {
                    if (filterInput === '') {
                        return true;
                    }
     
                    return (new RegExp(filterInput, 'i')).test(option.label);
                }}
                filterPlaceholder="Filter..."
                options={options}
                // options={options}
                selected={selected}
                onChange={this.onChange}
            /> */}
                  </div><br/>
              </Container>

             
          </React.Fragment>
      
        );
    }
}

export default ProductFamiliesEdition;