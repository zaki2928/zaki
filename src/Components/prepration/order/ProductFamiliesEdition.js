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
  const options = [
    { value: 'one', label: 'Option One' },
    { value: 'two', label: 'Option Two' },
    { value: 'three', label: 'Option three' },
    { value: 'four', label: 'Option four' },
    { value: 'five', label: 'Option five' },
  ];
class ProductFamiliesEdition extends Component {
  constructor(props) {
    super(props);

    this.state = {
      families: false,
      FamiliesArr: [],
      selected: [''],
    };
  }

  onChange = (selected) => {
    this.setState({ selected });
  };

  componentDidMount(){
    console.log("ibzy component colling FAmilies", this.props.FamiliesArr)
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
                    &#8680;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Product List</a>
                      </b>
                    </u>
                    &#8680;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Product Families Edition</a>
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
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Product description</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "3px" }}>
                <Col >
                  <Label>Intermediate material code</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Grade</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              </div>
              
              <div>
                <hr/>
                <Row style={{ marginTop: "3px" }}>
                <Col >
                  <Label><b>All Product Families:</b></Label>{" "}
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
                  <DualListBox
                  canFilter 
                  filterCallback={(option, filterInput) => {
                    if (filterInput === '') {
                        return true;
                    }
     
                    return (new RegExp(filterInput, 'i')).test(option.label);
                }}
                filterPlaceholder="Filter..."
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

export default ProductFamiliesEdition;