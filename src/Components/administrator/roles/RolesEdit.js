import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Label,
  Input,
} from "reactstrap";

import "react-table-v6/react-table.css";
import classnames from 'classnames';
import { FaSave } from 'react-icons/fa';
import { remover, RolesEditData } from '../../../store/Store';
import DualListBox from 'react-dual-listbox';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import axios from 'axios';
import {properties} from '../../../Properties/Properties'
import { ROLES, USERNAME } from '../../../store/RoleBased';

const getListOfResource = properties.Port + properties.getListOfResource
const getRoleById = properties.Port + properties.getRoleById
const getlistOfResourcesAvailable = properties.Port + properties.getlistOfResourcesAvailable
const createRole = properties.Port + properties.createRole
const createRoleAcess = properties.Port + properties.createRoleAcess



class RolesEdit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      selected: [''],
      listofmenu: [],
      access: [],
      tempmenu: [],
      idRole: '',
      listOfAccess: [],
      listOfMenuId: [],
      listOfMenus: [],
      roleBeans: [],
      listOfResourceData: [],
      listofCategoryData: [],
      listOfResourceBeans: [],
      activeTab: "1",
      listOfMenusBean: [],
      versionLock: 0,
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

  onchangehandler = (event) => {
    console.log("onchangehandler");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  // ibrahim added code  start here 
  read_handler = (id, name, category, desc) => {
    console.log("checking read this.state.listOfResourceData", this.state.listOfResourceData)
    console.log("checking read idddd", id)
    console.log("checking read name", name)
    var index = this.state.listOfResourceData.findIndex(
      (data) => data.idResource === id
    );
    console.log("checking read indexxxxxxxx", index)
    this.state.listOfResourceData.splice(index, 1)
    console.log("calling read")
    const menu = {
      category: category,
      idResource: id,
      mDate: "",
      mUserame: "",
      reference: name,
      resourceLevel: "",
      roleAccess: 1,
      versionLock: 0,
      menuDescription:desc,
    }
    this.state.tempmenu.push(menu)
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


  // revert_handler = (id, name) => {
  //   var index = this.state.listOfResourceBeans.findIndex(
  //     (data) => data.idResource === id
  //   );
  //   const menu = {
  //     category: 0,
  //     mDate: "",
  //     mUserame: "",
  //     resourceLevel: 0,
  //     versionLock: 0,
  //     idResource: id,
  //     reference: name,
  //     roleAccess: "",
  //   }
  //   let temp = this.state.listOfResourceData
  //   temp.push(menu)
  //   this.setState({ listOfResourceData: temp })
  //   this.state.listOfResourceBeans.splice(index, 1)
  //   console.log("listofmenu", this.state.listOfResourceBeans)


  // }

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

  // ibrahim added code end here 
  onChange = (selected) => {
    this.setState({ selected });
  };
  componentDidMount() {
    console.log("calling edit", this.props.data2)
    console.log("calling RolesEditDataRolesEditData componentDidMount", RolesEditData)
    this.getRoleByRoleId(RolesEditData)
    console.log("after role print in component", this.props.data2)

  }
  backHandler = () => {
    remover("RolesEdit")
    this.props.editClosehandler()
  }

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

  getRoleByRoleId() {
    console.log("calling getRoleByRoleId ", RolesEditData)
    axios
      .post(getRoleById, RolesEditData)
      // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success getRoleByRoleId@@@@#####$$$$$$$$", response.data.listOfMenus);
          this.setState({
            // message: "Role created Successfully",
            idRole: response.data.idRole,
            name: response.data.name,
            roleLevel: response.data.roleLevel,
            category: response.data.category,
            roleBeans: response.data,
            tempmenu: response.data.listOfMenus,
            listOfResourceBeans: response.data.listOfMenus,
            versionLock: response.data.versionLock
          });
          console.log("resposne success response.data.listOfMenus ibrahimmmmm", this.state.listOfResourceBeans);
          if (this.state.listOfResourceBeans.length <=0) {
            console.log("if condition me hai list k lie")
            this.getListOfAllResources();
           
          }else{
            console.log("else condition me hai list of menus  k lie")
            var roleBeans = response.data
            this.getAvailableResourcesMethod(roleBeans);
          }
        
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAvailableResourcesMethod(roleBeans) {
    console.log("calling getAvailableResourcesMethod ", roleBeans)
    axios
      .post(getlistOfResourcesAvailable, roleBeans)
      // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success getAvailableResourcesMethod", response.data);
          this.setState({
            listOfResourceData: response.data,
            listofCategoryData: response.data.category,
          });
          console.log("ibrahiim getAvailableResourcesMethod", response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  UpdateRoleByRoleIdMethod = () => {
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
            message: "Role Updated Successfully",
            idRole: response.data.idRole,
            updateAccess: response.data
          });
          this.UpdateRoleAccessByRoleIdMethod();

        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  UpdateRoleAccessByRoleIdMethod = () => {
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


  render() {

    const { selected, message } = this.state;
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
                <a style={{cursor:"pointer" }} onClick={this.backHandler}>Roles Search</a>
              </b>
            </u>
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a style={{cursor:"pointer" }}onClick={this.backHandler}>Roles Management</a>
              </b>
            </u>
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a>Roles Edition</a>
              </b>
            </u>

          </span>
          <br />

          <div>
            <div class="row-xs-6 bottom-row ">
              <FaSave

              //   onClick={() => this.edithandler(props.original)}
              >

              </FaSave>{" "}
              {ROLES===2 ?  <a style={{ cursor: "pointer", fontWeight: "bold", color: "blue" }}>
              <u onClick={this.UpdateRoleByRoleIdMethod}>Save</u>
            </a> : ''}
              {/* <button >Configure</button> */}
              {/* <a onClick={this.UpdateRoleByRoleIdMethod}>Save</a>{" "} */}
            </div>
          </div>

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
                // name="select"
                id="exampleSelect"
                value={this.state.roleLevel}
                name="roleLevel"
                disabled
                // style={{ width: "60px" }}
                bsSize="sm"
              >
                <option value="100">User</option>
                <option value="200">Administrator</option>
                <option value="300">_Super administrator_</option>
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
                // name="select"
                id="exampleSelect"
                value={this.state.category}
                name="category"
                onChange={this.onchangehandler}
                // style={{ width: "60px" }}
                bsSize="sm"
              >
                <option value="200">_Common_</option>
                <option value="100">_System_</option>

              </Input>
            </Col>
            <Col> </Col>


            <Col> </Col>

          </Row>

          <hr />

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
                  
                  <Col>
                  <div>* Resource items in read mode</div>
                    <div style={{
                      width: "95%", height: "200px", border: "solid black 1px",
                      padding: "2px 2px 2px 2px",
                      fontSize: "8",
                      overflow: "auto"
                    }}>{this.state.listOfResourceBeans.map(data =>

                      data.roleAccess === 1 && data.category === 1000 ? <div style={{ textAlign: 'center', fontSize: "12px" }}>
                        <span>{data.menuDescription}</span>
                        <span style={{ cursor: "pointer", float: "right" }}
                          onClick={() => this.revert_handler(data)}>&#8811;</span>
                        <br></br>
                      </div> : ""

                    )}</div> </Col>

                  <Col> <div>* Disabled resource items</div>
                  <div style={{
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

                  <Col><div>* Resource items in write mode</div>
                  <div style={{
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
                    padding: "2px 2px 2px 2px",
                    fontSize: "5",
                    overflow: "auto"
                  }}>{this.state.listOfResourceBeans.map(data =>
                    data.roleAccess === 1 && data.category === 1100 ? <div style={{ textAlign: 'center', fontSize: "12px" }}>
                      <span>{data.menuDescription}</span>
                      <span style={{ cursor: "pointer", float: "right" }}
                        onClick={() => this.revert_handler(data)}>&#8811;</span>
                      <br></br>
                    </div> : ""

                  )}</div> </Col>
                  <Col> <div>* Disabled resource items</div>
                  <div style={{
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


                  <Col><div>* Resource items in write mode</div>
                  <div style={{
                    width: "95%", height: "200px", border: "solid black 1px",
                    padding: "2px 2px 2px 2px",
                    fontSize: "5",
                    overflow: "auto"
                  }}>{this.state.listOfResourceBeans.map(data =>
                    data.roleAccess === 2 && data.category === 1100 ? <div style={{ textAlign: 'center', fontSize: "12px" }}>
                      <span>{data.menuDescription}</span>
                      <span style={{ cursor: "pointer", float: "left" }}
                        onClick={() => this.revert_handler(data)}>&#8810;</span>
                      <br></br>
                    </div> : ""

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
                    fontSize: "5",
                    overflow: "auto"
                  }}>{this.state.listOfResourceBeans.map(data =>
                    data.roleAccess === 1 && data.category === 1200 ? <div style={{ textAlign: 'center', fontSize: "12px" }}>
                      <span>{data.menuDescription}</span>
                      <span style={{ cursor: "pointer", float: "right" }}
                        onClick={() => this.revert_handler(data)}>&#8811;</span>
                      <br></br>
                    </div> : ""

                  )}</div> 
                  </Col>
                  <Col> <div>* Disabled resource items</div>
                  <div style={{
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

                  <Col><div>* Resource items in write mode</div>
                  <div style={{
                    width: "95%", height: "200px", border: "solid black 1px",
                    padding: "2px 2px 2px 2px",
                    fontSize: "5",
                    overflow: "auto"
                  }}>{this.state.listOfResourceBeans.map(data =>
                    data.roleAccess === 2 && data.category === 1200 ? <div style={{ textAlign: 'center', fontSize: "12px" }}>
                      <span>{data.menuDescription}</span>
                      <span style={{ cursor: "pointer", float: "left" }}
                        onClick={() => this.revert_handler(data)}>&#8810;</span>
                      <br></br>
                    </div> : ""

                  )}</div> </Col>
                </Row>


              </div>
            </TabPane>
          </TabContent>



        </Container>

      </React.Fragment>
    );
  }
}

export default RolesEdit;