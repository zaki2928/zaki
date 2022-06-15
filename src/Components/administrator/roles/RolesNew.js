import React, { Component } from 'react'
import {
  Container,
  Row,
  Col,
  Label,
  Input,

} from "reactstrap";
import RolesList from "./RolesList";
import "react-table-v6/react-table.css";
import { FaSave } from 'react-icons/fa';
import { remover } from "../../../store/Store";
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import DualListBox from 'react-dual-listbox';
import classnames from 'classnames';
import axios from 'axios';
import { properties } from "../../../Properties/Properties";
import { USERNAME } from '../../../store/RoleBased';

const createRole = properties.Port + properties.createRole 
const createRoleAcess = properties.Port + properties.createRoleAcess
const getListOfResource = properties.Port + properties.getListOfResource

const options = [
  { menu_name: 'user', menu_id: 1 },
  { menu_name: 'roles', menu_id: 2 },
  { menu_name: 'admin', menu_id: 3 },
  { menu_name: 'gates', menu_id: 4 },
  { menu_name: 'container', menu_id: 5 },

];




export default class RolesNew extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packinglinefilter: false,
      listofmenu: [],
      access: [],
      tempmenu: [],

      category: "200",
      cdate: "",
      cusername: "",
      idRole: "",
      mDate: "",
      mUsername: "",
      name: "",
      roleLevel: "100",
      idAccess: "",
      idResource: "",
      idRole: "",
      listOfResourceBeans: [],
      listOfResourceData: [],
      listofCategoryData: [],
      idResource: "",
      mDate: "",
      mUserame: "",
      reference: "",
      resourceLevel: "",
      roleAccess: "",
      versionLock: 0,
      mDate: "",
      mUsername: "",
      roleAccess: "",
      activeTab: "1",
      message: "",

      option: [
        { reference: 'user', idResource: 1 },
        { reference: 'roles', idResource: 2 },
        { reference: 'admin', idResource: 3 },
        { reference: 'gates', idResource: 4 },
        { reference: 'container', idResource: 5 },
      ]

    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab != tab) {
      this.setState({
        activeTab: tab
      })
    }

  }

  read_handler = (id, name, category, desc) => {
    console.log(id, name)
    var index = this.state.listOfResourceData.findIndex(
      (data) => data.idResource === id
    );
    this.state.listOfResourceData.splice(index, 1)
    console.log("calling read")
    const menu = {
      category: category,
      mDate: "",
      mUserame: "",
      resourceLevel: 0,
      versionLock: 0,
      idResource: id,
      roleAccess: 1,
      reference: name,
      menuDescription: desc
    }
    this.state.tempmenu.push(menu)
    console.log("menuzzzzzzzzzz", menu)
    this.setState({
      listOfResourceBeans: this.state.tempmenu
    }, () => console.log("listofmenu", this.state.listOfResourceBeans))


  }
  write_handler = (id, name, category, desc) => {
    var index = this.state.listOfResourceData.findIndex(
      (data) => data.idResource === id
    );
    this.state.listOfResourceData.splice(index, 1)
    console.log("calling write")
    const menu = {
      category: category,
      mDate: "",
      mUserame: "",
      resourceLevel: 0,
      versionLock: 0,
      idResource: id,
      roleAccess: 2,
      reference: name,
      menuDescription:desc,
    }
    this.state.tempmenu.push(menu)
    this.setState({
      listOfResourceBeans: this.state.tempmenu
    }, () => console.log("listofmenu", this.state.listOfResourceBeans))
  }


  revert_handler = (data) => {
    console.log("revert testing dataa@@@@@@@@@@@@@",data)
    var index = this.state.listOfResourceBeans.findIndex(
      (data) => data.idResource === data.idResource
    );
    const menu = {
      category: data.category,
      mDate: "",
      mUserame: "",
      resourceLevel: 0,
      versionLock: 0,
      idResource: data.idResource,
      reference: data.reference,
      roleAccess: data.roleAccess,
      menuDescription: data.menuDescription,
    }
    this.state.listOfResourceBeans.splice(index, 1)
    let temp = this.state.listOfResourceData
    temp.push(menu)
    this.setState({ listOfResourceData: temp })


  }

  onchangehandler = (event) => {
    console.log("onchangehandler");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  backHandler = () => {
    console.log("calling back handler for list")
    remover("RolesNew")
    this.props.customerCloseHandler()
  }

  createRoleMethod = () => {
    console.log("Date which we are sending", this.state);
    const header = {
      'sessionUserId':USERNAME
    }
    axios
      .post(createRole, this.state, {headers:header})
      // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({
            message: "Role created Successfully",
            idRole: response.data.idRole
          });

        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  createRoleAccessMethod = () => {
    console.log("Date which we are sending", this.state);
    const header = {
      'sessionUserId':USERNAME
    }
    axios
      .post(createRoleAcess, this.state, {headers:header})
      // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({
            message: "Data Saved Successfully",

          });

        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getListOfAllResources = () => {
    console.log("getListOfAllResources calling");
    axios
      .post(getListOfResource)
      // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({

            listOfResourceData: response.data,
            listofCategoryData: response.data.category,
          });

        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    // console.log("calling componenet di mounttttttt")
    console.log("componentDidMount listofCategoryData hereeee2222222222", this.state.listOfResourceData.category);

    this.getListOfAllResources()
  }

  render() {
    const { message } = this.state;
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
        // style={{ border: "1px solid black", }}
        >
          {
            <div>
              <span>
                {" "}
                <u>
                  {" "}
                  <b>
                    <a style={{cursor:"pointer" }}>Home</a>
                  </b>
                </u>{" "}
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer" }}>Roles Search</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer" }} onClick={this.backHandler}>Roles Management</a>
                  </b>
                </u>
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer" }}>Roles Edition</a>
                  </b>
                </u>
              </span>
              <br />


              <div>
                <div class="row-xs-6 bottom-row ">

                  {/* <button >Configure</button> */}
                  {this.state.idRole === "" ? <div>
                    <FaSave>

                    </FaSave>{" "}
                    <a style={{cursor:"pointer" }} onClick={this.createRoleMethod}>Create</a>
                    {" "}<FaSave

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaSave>{" "}
                    {/* <button >Configure</button> */}
                    <a style={{cursor:"pointer" }}>Create and Select</a>{" "}
                  </div>

                    :
                    <>
                    <FaSave onClick={this.createRoleAccessMethod}>save</FaSave>
                    <a style={{cursor:"pointer" }} onClick={this.createRoleAccessMethod}>save</a>
                    </>
                  }

                  <div>
                    <b>
                      <span
                        style={{
                          color: "green",
                        }}
                      >
                        <h6>{message}</h6>
                      </span>
                    </b>
                  </div>



                </div>

                <div>
                  <hr />
                  <div
                    style={{
                      border: "1px",
                      backgroundColor: "grey",
                      border: "1px solid black",
                      marginTop: "10px"
                    }}
                  >
                    <b style={{ marginLeft: "5px" }}>Role</b>
                  </div>

                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Name</Label>
                    </Col>

                    <Col>

                      <Input bsSize="sm"
                        value={this.state.name}
                        name="name"
                        onChange={this.onchangehandler}
                      />
                    </Col>
                    <Col> </Col>


                    <Col> </Col>

                  </Row>
                  <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Level</Label>
                    </Col>

                    <Col>

                      <Input
                        type="select"
                        name="roleLevel"
                        id="exampleSelect"
                        value={this.state.roleLevel}
                        onChange={this.onchangehandler}
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option value={"100"}>User</option>
                        <option value={"200"}>Administrator</option>
                        <option value={"300"}>Super Administrator</option>
                      </Input>
                    </Col>
                    <Col> </Col>


                    <Col> </Col>

                  </Row>
                  <Row style={{ marginTop: "10px", marginBottom: "10px" }}>
                    <Col>
                      <Label>Category</Label>
                    </Col>

                    <Col>

                      <Input
                        type="select"
                        name="category"
                        id="exampleSelect"
                        value={this.state.category}
                        onChange={this.onchangehandler}
                        // style={{ width: "60px" }}
                        bsSize="sm"
                      >
                        <option value={"200"}>_Common_</option>
                        <option value={"100"}>_system_</option>

                      </Input>
                    </Col>
                    <Col> </Col>


                    <Col> </Col>

                  </Row>







                </div>
                <hr />



                {this.state.idRole === "" ? "" :
                  <div>
                    <div
                      style={{
                        border: "1px",
                        backgroundColor: "grey",
                        border: "1px solid black",
                        marginTop: "10px",
                        marginBottom: "10px"
                      }}
                    >
                      <b style={{ marginLeft: "5px", }}>Rights</b>
                    </div>

                    <hr />

                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => { this.toggle('1'); }}
                        >
                          Web Screens
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2' })}
                          onClick={() => { this.toggle('2'); }}
                        >
                          Radio Screens
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '3' })}
                          onClick={() => { this.toggle('3'); }}
                        >
                          Functions
                        </NavLink>
                      </NavItem>

                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <div>
                          <hr />

                          <Row style={{ marginTop: "10px" }}>
                            <Col>
                              <Label>Filters</Label>
                            </Col>

                            <Col>

                              <Input bsSize="sm" />
                            </Col>
                            <Col> </Col>


                            <Col> </Col>

                          </Row>
                          <hr />

                          <Row style={{ marginBottom: "10px" }}>
                            <Col><div>* Resource items in read mode</div>
                              <div style={{
                                width: "95%", height: "200px", border: "solid black 1px",
                                padding: "2px 2px 2px 2px",
                                fontSize: "8",
                                overflow: "auto"
                              }}>{this.state.listOfResourceBeans.map(data =>

                                data.roleAccess === 1 && data.category === 1000 ? <div style={{ textAlign: 'center', fontSize: "12px" }}>
                                  <span>{data.menuDescription}</span>
                                  <span style={{ cursor: "pointer", float: "right" }}
                                    // onClick={() => this.revert_handler(data.idResource, data.reference, data.category)}>&#8811;</span>
                                    onClick={() => this.revert_handler(data)}>&#8811;</span>
                                  <br></br>
                                </div> : ""
                                // <div style={{textAlign:'center'}}>
                                //   <span id={data.menu_id}>{data.menu_name}</span> 
                                //   <span style={{cursor : "pointer",float:"right"}}
                                //    onClick={()=>this.pop_read_handler(data.menu_id,data.menu_name)}>&#8811;</span>
                                // <br></br>
                                // </div>

                              )}</div> </Col>

                            <Col><div>* Disabled resource items</div><div style={{
                              width: "95%", height: "200px", border: "solid black 1px",
                              padding: "2px 2px 2px 2px",

                              overflow: "auto"
                            }}>
                              {this.state.listOfResourceData.map(data => data.category === 1000 ?
                                <div style={{ textAlign: 'center', fontSize: "12px" }}>
                                  <span style={{ cursor: "pointer", float: "left" }}
                                    onClick={() => this.read_handler(data.idResource, data.reference, data.category, data.menuDescription)} >&#8810;</span>

                                  <span >{data.menuDescription}</span>
                                  <span style={{ cursor: "pointer", float: "right" }}
                                    onClick={() => this.write_handler(data.idResource, data.reference, data.category, data.menuDescription)}>&#8811;</span>
                                  <br></br>
                                </div> : ""

                              )}
                            </div></Col>

                            <Col> <div>* Resource items in write mode</div><div style={{
                              width: "95%", height: "200px", border: "solid black 1px",
                              padding: "2px 2px 2px 2px",
                              fontSize: "5",
                              overflow: "auto"
                            }}>{this.state.listOfResourceBeans.map(data =>
                              data.roleAccess === 2 && data.category === 1000 ? <div style={{ textAlign: 'center', fontSize: "12px" }}>
                                <span>{data.menuDescription}</span>
                                <span style={{ cursor: "pointer", float: "left" }}
                                  onClick={() => this.revert_handler(data)}>&#8810;</span>
                                <br></br>
                              </div> : ""
                              // <div style={{textAlign:'center'}}>
                              //   <span style={{cursor : "pointer",float:"left"}} 
                              //   onClick={()=>this.pop_write_handler(data.menu_id,data.menu_name)}>&#8810;</span>
                              //   <span id={data.menu_id}>{data.menu_name}</span> 

                              // <br></br>
                              // </div>

                            )}</div> </Col>
                          </Row>

                        </div>
                      </TabPane>
                      <TabPane tabId="2">
                        <div>
                          <hr />

                          <Row style={{ marginTop: "10px" }}>
                            <Col>
                              <Label>Filters</Label>
                            </Col>

                            <Col>

                              <Input bsSize="sm" />
                            </Col>
                            <Col> </Col>


                            <Col> </Col>

                          </Row>
                          <hr />
                          <Row style={{ marginBottom: "10px" }}>
                            <Col><div>* Resource items in read mode</div>
                              <div style={{
                                width: "95%", height: "200px", border: "solid black 1px",
                                padding: "2px 2px 2px 2px"
                              }}>{this.state.listOfResourceBeans.map(data =>

                                data.roleAccess === 1 && data.category === 1100 ? <div style={{ textAlign: 'center', fontSize: "12px" }}>
                                  <span>{data.menuDescription}</span>
                                  <span style={{ cursor: "pointer", float: "right" }}
                                    onClick={() => this.revert_handler(data)}>&#8811;</span>
                                  <br></br>
                                </div> : ""
                                // <div style={{textAlign:'center'}}>
                                //   <span id={data.menu_id}>{data.menu_name}</span> 
                                //   <span style={{cursor : "pointer",float:"right"}}
                                //    onClick={()=>this.pop_read_handler(data.menu_id,data.menu_name)}>&#8811;</span>
                                // <br></br>
                                // </div>

                              )}</div> </Col>

                            <Col> <div>* Disabled resource items</div><div style={{
                              width: "95%", height: "200px", border: "solid black 1px",
                              padding: "2px 2px 2px 2px",
                              overflow: "auto"
                            }}>
                              {this.state.listOfResourceData.map(data => data.category === 1100 ?
                                <div style={{ textAlign: 'center', fontSize: "12px" }}>
                                  <span style={{ cursor: "pointer", float: "left" }}
                                    onClick={() => this.read_handler(data.idResource, data.reference, data.category, data.menuDescription)} >&#8810;</span>

                                  <span >{data.menuDescription}</span>
                                  <span style={{ cursor: "pointer", float: "right" }}
                                    onClick={() => this.write_handler(data.idResource, data.reference, data.category, data.menuDescription)}>&#8811;</span>
                                  <br></br>
                                </div> : ""

                              )}
                            </div></Col>

                            <Col><div>* Resource items in write mode</div><div style={{
                              width: "95%", height: "200px", border: "solid black 1px",
                              padding: "2px 2px 2px 2px"
                            }}>{this.state.listOfResourceBeans.map(data =>
                              data.roleAccess === 2 && data.category === 1100 ? <div style={{ textAlign: 'center', fontSize: "12px" }}>
                                <span>{data.menuDescription}</span>
                                <span style={{ cursor: "pointer", float: "left" }}
                                  onClick={() => this.revert_handler(data)}>&#8810;</span>
                                <br></br>
                              </div> : ""
                              // <div style={{textAlign:'center'}}>
                              //   <span style={{cursor : "pointer",float:"left"}} 
                              //   onClick={()=>this.pop_write_handler(data.menu_id,data.menu_name)}>&#8810;</span>
                              //   <span id={data.menu_id}>{data.menu_name}</span> 

                              // <br></br>
                              // </div>

                            )}</div> </Col>
                          </Row>


                        </div>
                      </TabPane>
                      <TabPane tabId="3">
                        <div>
                          <hr />

                          <Row style={{ marginTop: "10px" }}>
                            <Col>
                              <Label>Filters</Label>
                            </Col>

                            <Col>

                              <Input bsSize="sm" />
                            </Col>
                            <Col> </Col>


                            <Col> </Col>

                          </Row>
                          <hr />
                          <Row style={{ marginBottom: "10px" }}>
                            <Col><div>* Resource items in read mode</div>
                              <div style={{
                                width: "95%", height: "200px", border: "solid black 1px",
                                padding: "2px 2px 2px 2px",
                                overflow: "auto"
                              }}>{this.state.listOfResourceBeans.map(data =>

                                data.roleAccess === 1 && data.category === 1200 ? <div style={{ textAlign: 'center', fontSize: "12px" }}>
                                  <span>{data.menuDescription}</span>
                                  <span style={{ cursor: "pointer", float: "right" }}
                                    onClick={() => this.revert_handler(data)}>&#8811;</span>
                                  <br></br>
                                </div> : ""
                                // <div style={{textAlign:'center'}}>
                                //   <span id={data.menu_id}>{data.menu_name}</span> 
                                //   <span style={{cursor : "pointer",float:"right"}}
                                //    onClick={()=>this.pop_read_handler(data.menu_id,data.menu_name)}>&#8811;</span>
                                // <br></br>
                                // </div>

                              )}</div> </Col>

                            <Col><div>* Disabled resource items</div> <div style={{
                              width: "95%", height: "200px", border: "solid black 1px",
                              padding: "2px 2px 2px 2px",
                              overflow: "auto"
                            }}>
                              {this.state.listOfResourceData.map(data => data.category === 1200 ?
                                <div style={{ textAlign: 'center', fontSize: "12px" }}>
                                  <span style={{ cursor: "pointer", float: "left" }}
                                    onClick={() => this.read_handler(data.idResource, data.reference, data.category, data.menuDescription)} >&#8810;</span>

                                  <span >{data.menuDescription}</span>
                                  <span style={{ cursor: "pointer", float: "right" }}
                                    onClick={() => this.write_handler(data.idResource, data.reference, data.category, data.menuDescription)}>&#8811;</span>
                                  <br></br>
                                </div> : ""

                              )}
                            </div></Col>

                            <Col><div>* Resource items in write mode</div><div style={{
                              width: "95%", height: "200px", border: "solid black 1px",
                              padding: "2px 2px 2px 2px"
                            }}>{this.state.listOfResourceBeans.map(data =>
                              data.roleAccess === 2 && data.category === 1200 ? <div style={{ textAlign: 'center', fontSize: "12px" }}>
                                <span>{data.menuDescription}</span>
                                <span style={{ cursor: "pointer", float: "left" }}
                                  onClick={() => this.revert_handler(data)}>&#8810;</span>
                                <br></br>
                              </div> : ""
                              // <div style={{textAlign:'center'}}>
                              //   <span style={{cursor : "pointer",float:"left"}} 
                              //   onClick={()=>this.pop_write_handler(data.menu_id,data.menu_name)}>&#8810;</span>
                              //   <span id={data.menu_id}>{data.menu_name}</span> 

                              // <br></br>
                              // </div>

                            )}</div> </Col>
                          </Row>

                        </div>
                      </TabPane>
                    </TabContent>
                  </div>
                }



              </div>

            </div>

          }

        </Container>
      </React.Fragment>
    )
  }
}
