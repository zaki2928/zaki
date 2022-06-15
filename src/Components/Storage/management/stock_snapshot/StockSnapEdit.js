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
  import {remover } from '../../../../store/Store';
  import { TabContent, TabPane, Nav, NavItem, NavLink, Card,CardTitle, CardText} from 'reactstrap';
  import classnames from 'classnames';
class StockSnapEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editDisp: false,
      editDisplayArr: [],
      activeTab: "1",
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if(this.state.activeTab != tab){
        this.setState({
            activeTab : tab
        })
    }
       
   } 

  componentDidMount(){
    console.log("dhkfjshjgv", this.props.editDisplayArr)
  }


backHandler=()=>{
  console.log("calling back handler for list")
  remover("StockSnapEdit")
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
                        <a onClick={this.backHandler}>Access to Stock Snapshot</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a onClick={this.backHandler}>Stock Content Edition</a>
                      </b>
                    </u>
                  </span>
                  <br />

                <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '1' })}
            onClick={() => { this.toggle('1'); }}
          >
            Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '2' })}
            onClick={() => { this.toggle('2'); }}
          >
            Update Quantity
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '3' })}
            onClick={() => { this.toggle('3'); }}
          >
            Update Reference
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '4' })}
            onClick={() => { this.toggle('4'); }}
          >
            Update Content
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '5' })}
            onClick={() => { this.toggle('5'); }}
          >
            Update Characteristics
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: this.state.activeTab === '6' })}
            onClick={() => { this.toggle('6'); }}
          >
            Update Logistic Unit
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
        <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>&#8250;&#8250;General</b>
              </div>
              <hr/>
              <b style={{ marginLeft: "5px" }}>Status</b>
              <hr/>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Container No</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <a href="#">Edit</a>
                <Col> </Col>
                <Col>
                  <Label>Location</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Product</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <a href="#">Edit</a>
                <Col> </Col>
                <Col>
                  <Label>Product Description</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Intermediate Material Code</Label>{" "}
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
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Quantity(PAL)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Type</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Logistic Unit ID</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Logistic Unit Qty</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Content Status</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Logistic Unit Qty</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              <hr/>
              <b style={{ marginLeft: "5px" }}>Statements</b>
              <hr/>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Batch</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Logistic Unit Qty</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              <div>
            <input type="checkbox" id="myid"></input>
            {" "}
              <a >Active </a>{" "}
              <a style={{marginLeft : "15px"}}>&#8250;&#8250;Stock </a>{" "}
              </div>
              <hr/>
            
              <b style={{ marginLeft: "5px" }}>Stock Quantities</b>
              <hr/>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Reserved Quantity(PAL)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Expected Quantity(PAL)</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <hr/>
              <b style={{ marginLeft: "5px" }}>Information Of Reception</b>
              <hr/>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Reception ID</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Reception Line ID</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Reception Type</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Reception Line ID</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              
        </TabPane>
        <TabPane tabId="2">
       
              <hr/>
              <b style={{ marginLeft: "5px" }}>Status</b>
              <hr/>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Container No</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <a href="#">Edit</a>
                <Col> </Col>
                <Col>
                  <Label>Location</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Product</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <a href="#">Edit</a>
                <Col> </Col>
                <Col>
                  <Label>Product Description</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Intermediate Material Code</Label>{" "}
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
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Quantity(PAL)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Type</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Logistic Unit ID</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Logistic Unit Qty</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Content Status</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Logistic Unit Qty</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              <hr/>
              <b style={{ marginLeft: "5px" }}>Statements</b>
              <hr/>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Batch</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Logistic Unit Qty</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              <hr/>
             
              <b style={{ marginLeft: "5px" }}>Update</b>
              <hr/>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Motive</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Quantity(PAL)</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Comment</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Reception Line ID</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
        </TabPane>

        <TabPane tabId="3">
       
              <hr/>
              <b style={{ marginLeft: "5px" }}>Status</b>
              <hr/>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Container No</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <a href="#">Edit</a>
                <Col> </Col>
                <Col>
                  <Label>Location</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Product</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <a href="#">Edit</a>
                <Col> </Col>
                <Col>
                  <Label>Product Description</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Intermediate Material Code</Label>{" "}
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
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Quantity(PAL)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Type</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Logistic Unit ID</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Logistic Unit Qty</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Content Status</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Logistic Unit Qty</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              <hr/>
              <b style={{ marginLeft: "5px" }}>Statements</b>
              <hr/>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Batch</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Logistic Unit Qty</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              <hr/>
             
              <b style={{ marginLeft: "5px" }}>Update</b>
              <hr/>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Motive</Label>{" "}
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
                        <option>=</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Product</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Logistic Unit ID</Label>{" "}
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
                        <option>=</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Quantity(PAL)</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Comment</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Reception Line ID</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              <hr/>
              <b style={{ marginLeft: "5px" }}>Statements</b>
              <hr/>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Batch</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Logistic Unit Qty</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
        </TabPane>

        <TabPane tabId="4">
       
              <hr/>
              <b style={{ marginLeft: "5px" }}>Status</b>
              <hr/>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Container No</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <a href="#">Edit</a>
                <Col> </Col>
                <Col>
                  <Label>Location</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Product</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <a href="#">Edit</a>
                <Col> </Col>
                <Col>
                  <Label>Product Description</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Intermediate Material Code</Label>{" "}
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
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Quantity(PAL)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Type</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Logistic Unit ID</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Logistic Unit Qty</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Content Status</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Logistic Unit Qty</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              <hr/>
              <b style={{ marginLeft: "5px" }}>Statements</b>
              <hr/>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Batch</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Logistic Unit Qty</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              <hr/>
             
              <b style={{ marginLeft: "5px" }}>Update</b>
              <hr/>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Created The</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input type = "date" bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Quantity(PAL)</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              
        </TabPane>

        <TabPane tabId="5">
       
              <hr/>
              <b style={{ marginLeft: "5px" }}>Status</b>
              <hr/>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Container No</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <a href="#">Edit</a>
                <Col> </Col>
                <Col>
                  <Label>Location</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Product</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <a href="#">Edit</a>
                <Col> </Col>
                <Col>
                  <Label>Product Description</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Intermediate Material Code</Label>{" "}
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
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Quantity(PAL)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Type</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Logistic Unit ID</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Logistic Unit Qty</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Content Status</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Logistic Unit Qty</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              <hr/>
              <b style={{ marginLeft: "5px" }}>Statements</b>
              <hr/>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Batch</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Logistic Unit Qty</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              <hr/>
             
              <b style={{ marginLeft: "5px" }}>Update</b>
              <hr/>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Motive</Label>{" "}
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
                        <option>=</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Product</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Comment</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Reception Line ID</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              <hr/>
              <b style={{ marginLeft: "5px" }}>Statements</b>
              <hr/>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Batch</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Logistic Unit Qty</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
        </TabPane>

        <TabPane tabId="6">
       
              <hr/>
              <b style={{ marginLeft: "5px" }}>Status</b>
              <hr/>
              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Container No</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <a href="#">Edit</a>
                <Col> </Col>
                <Col>
                  <Label>Location</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Product</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <a href="#">Edit</a>
                <Col> </Col>
                <Col>
                  <Label>Product Description</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Intermediate Material Code</Label>{" "}
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
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Quantity(PAL)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Type</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Logistic Unit ID</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Logistic Unit Qty</Label>{" "}
                </Col>
                
                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Content Status</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Logistic Unit Qty</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              <hr/>
              <b style={{ marginLeft: "5px" }}>Statements</b>
              <hr/>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Batch</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Logistic Unit Qty</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              <hr/>
             
              <b style={{ marginLeft: "5px" }}>Update</b>
              <hr/>
              
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Logistic Unit ID</Label>{" "}
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
                        <option>=</option>
                        <option></option>
                        <option></option>
                        <option></option>
                        <option></option>
                      </Input>
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Quantity(PAL)</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>
              
              <hr/>
              
              
        </TabPane>

        
      </TabContent>   
           

                   <div>
                  <hr />
                   
                 
              </div>
            
               </Container>
          </React.Fragment>
        );
    }
}

export default StockSnapEdit;