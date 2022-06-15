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
  import { remover } from '../../../store/Store';
  import DualListBox from 'react-dual-listbox';
  import 'react-dual-listbox/lib/react-dual-listbox.css';
  import { FaSave} from 'react-icons/fa';
  const options = [
    { value: 'one', label: 'Option One' },
    { value: 'two', label: 'Option Two' },
    { value: 'three', label: 'Option three' },
    { value: 'four', label: 'Option four' },
    { value: 'five', label: 'Option five' },
  ];
class SitesContact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: [''],
    };
  }

  onChange = (selected) => {
    this.setState({ selected });
  };

  componentDidMount(){
    
  }
  backHandler=()=>{
    console.log("calling back handler for list")
    remover("SitesContact")
    this.props.ContactsCloseHandler()
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
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a onClick={this.backHandler}>Sites Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a onClick={this.backHandler}>Sites Management</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Sites Contacts Management</a>
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
                  <Label>Site</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Product description</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>

              </Row>
              <FaSave
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaSave>{" "}
{/* <button >Configure</button> */}
<a >  <u onClick={this.SubmitHandler}>Save</u></a>{" "}
<div 
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      marginTop: "10px"
                    }}
                  >
                  
                    <b style={{ marginLeft: "5px" }}>Contacts</b>
                  </div>
                  <hr/>
                 <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Filters</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Product description</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>

              </Row>

             
              </div>
              
              
              <div>
                <hr/>
                <Row style={{ marginTop: "3px" }}>
                <Col >
                  <Label><b>Associated Contacts:</b></Label>{" "}
                </Col>

                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>

                <Col> </Col>
                <Col>
                  <Label><b>Available Contacts:</b></Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
                  <DualListBox
                  canFilter 
                  filterCallback={(option, filterInput) => {
                    if (filterInput === '') {
                        return true;
                    }
     
                    return (new RegExp(filterInput, 'i')).test(option.label);
                }}
                // filterPlaceholder=""
                options={options}
                options={options}
                selected={selected}
                onChange={this.onChange}
            />
                  </div><br/>
              </Container>

             
          </React.Fragment>
      
        );
    }
}

export default SitesContact;