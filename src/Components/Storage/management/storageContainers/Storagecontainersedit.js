import React, { Component } from "react";
import { Container, Row, Col, Label, Input } from "reactstrap";
import { remover, StoragecontainerEditdata } from "../../../../store/Store";
import { FaSave } from "react-icons/fa";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
} from "reactstrap";
import classnames from "classnames";

export default class Storagecontainersedit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1",
      batch: "",
      height: "",
      id_container: "",
      id_container_father: "",
      id_content: "",
      id_location: "",
      id_packaging: "",
      id_reference: "",
      id_warehouse: "",
      listFilterBean: "",
      mDate: "",
      mUsername: "",
      status_container: "",
      status_mvt: "",
      type_container: "",
      version_Lock: "",
      weight: "",
      z_grade: "",
      z_id_elligibility: "",
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab != tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  backHandler = () => {
    this.props.editcloseHandler();
  };
  componentDidMount = () => {
    console.log("com calling by shahid", StoragecontainerEditdata);
    this.setState({
      batch: StoragecontainerEditdata.batch,
      height: StoragecontainerEditdata.height,
      id_container: StoragecontainerEditdata.id_container,
      id_container_father: StoragecontainerEditdata.id_container,
      id_content: StoragecontainerEditdata.id_content.id_location,
      id_location: StoragecontainerEditdata.id_location,
      id_packaging: StoragecontainerEditdata.id_packaging,
      id_reference: StoragecontainerEditdata.id_reference,
      id_warehouse: StoragecontainerEditdata.id_warehouse,
      listFilterBean: StoragecontainerEditdata.listFilterBean,
      mDate: StoragecontainerEditdata.mDate,
      mUsername: StoragecontainerEditdata.mUsername,
      status_container: StoragecontainerEditdata.status_container,
      status_mvt: StoragecontainerEditdata.status_mvt,
      type_container: StoragecontainerEditdata.type_container,
      version_Lock: StoragecontainerEditdata.version_Lock,
      weight: StoragecontainerEditdata.weight,
      z_grade: StoragecontainerEditdata.z_grade,
      z_id_elligibility: StoragecontainerEditdata.z_id_elligibility,
      //   volume: StoragecontainerEditdata.volume,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div>
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
                <a style={{cursor:"pointer"}} onClick={this.backHandler}>Containers search</a>
              </b>
            </u>
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a style={{cursor:"pointer"}}onClick={this.backHandler}>Access to containers</a>
              </b>
            </u>
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a style={{cursor:"pointer"}}>Container edition</a>
              </b>
            </u>
          </span>
          <br />
        </div>

        <div>
          <br />

          <Nav tabs>
            <NavItem>
              <NavLink style={{cursor:"pointer"}}
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => {
                  this.toggle("1");
                }}
              >
                Details
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={{cursor:"pointer"}}
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => {
                  this.toggle("2");
                }}
              >
                Update
              </NavLink>
            </NavItem>
          </Nav>

          <TabContent  style={{cursor:"pointer"}} activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <li> General</li>

              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop: "3px",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Status</b>
              </div>
              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Container no</Label>
                </Col>

                <Col>
                  <Input
                    bsSize="sm"
                    name="id_container"
                    value={this.state.id_container}
                  />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Location</Label>
                </Col>

                <Col>
                  <Input
                    bsSize="sm"
                    name="id_location"
                    value={this.state.id_location.replace("19@","")}
                  />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Status</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="status_container"
                    value={this.state.status_container}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>

                <Col>
                  <Label>Type</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="type_container"
                    value={this.state.type_container}
                    bsSize="sm"
                  />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Container no (parent)</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="id_container_father"
                    value={this.state.id_container_father}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>

                <Col>
                  <Label>Packaging ID</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="id_packaging"
                    value={this.state.id_packaging}
                    bsSize="sm"
                  />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Weight (Kg)</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="weight"
                    value={this.state.weight}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>

                <Col>
                  <Label>Empty weight (Kg)</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="weight"
                    // value={this.state.weight}
                    bsSize="sm"
                  />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Height (m)</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="height"
                    value={this.state.height}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>

                <Col>
                  <Label>Volume (dm3)</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="volume"
                    value={this.state.volume}
                    bsSize="sm"
                  />
                </Col>
                <Col> </Col>
              </Row>

              <hr />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop: "3px",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Content</b>
              </div>
              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Container no</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="id_container"
                    value={this.state.id_container}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>
                <Col></Col>
                <Col></Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col style={{ marginLeft: "20px" }}>
                  <div>
                    <Input
                      type="checkbox"
                      id="exampleSelect"
                      // style={{ width: "50px" }}
                      bsSize="sm"
                    />
                  </div>

                  <Label>Active</Label>
                </Col>
                <Col>
                  <Label>Stock</Label>
                </Col>

                <Col></Col>
                <Col></Col>
                <Col> </Col>
              </Row>
              <hr />
              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Movement status</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="status_mvt"
                    value={this.state.status_mvt}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>
                <Col></Col>
                <Col></Col>
                <Col> </Col>
              </Row>
            </TabPane>

            <TabPane tabId="2">
              <b>SAVE</b>
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop: "3px",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Status</b>
              </div>
              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Container no</Label>
                </Col>

                <Col>
                  <Input
                    bsSize="sm"
                    name="id_container"
                    value={this.state.id_container}
                  />
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Location</Label>
                </Col>

                <Col>
                  <Input
                    bsSize="sm"
                    name="id_location"
                    value={this.state.id_location}
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Status</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="status_container"
                    value={this.state.status_container}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>

                <Col>
                  <Label>Type</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="type_container"
                    value={this.state.type_container}
                    bsSize="sm"
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Container no (parent)</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="id_container_father"
                    value={this.state.id_container_father}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>

                <Col>
                  <Label>Packaging ID</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="id_packaging"
                    value={this.state.id_packaging}
                    bsSize="sm"
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Weight (Kg)</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="weight"
                    value={this.state.weight}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>

                <Col>
                  <Label>Empty weight (Kg)</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="weight"
                    // value={this.state.weight}
                    bsSize="sm"
                  />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Height (m)</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="height"
                    value={this.state.height}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>

                <Col>
                  <Label>Volume (dm3)</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="volume"
                    value={this.state.volume}
                    bsSize="sm"
                  />
                </Col>
                <Col> </Col>
              </Row>
              <hr />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop: "3px",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Update</b>
              </div>
              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Packaging Id</Label>
                </Col>

                <Col>
                  <Input type="select" bsSize="sm">
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Weight(Kg)</Label>
                </Col>

                <Col>
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Height</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    id="exampleSelect"
                    // style={{ width: "50px" }}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>

                <Col></Col>

                <Col></Col>
                <Col> </Col>
              </Row>{" "}
              {/* <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Container no</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="id_container"
                    value={this.state.id_container}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>
                <Col></Col>
                <Col></Col>
                <Col> </Col>
              </Row> */}
              {/* <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col style={{ marginLeft: "20px" }}>
                  <div>
                    <Input
                      type="checkbox"
                      id="exampleSelect"
                      // style={{ width: "50px" }}
                      bsSize="sm"
                    />
                  </div>

                  <Label>Active</Label>
                </Col>
                <Col>
                  <Label>Stock</Label>
                </Col>

                <Col></Col>
                <Col></Col>
                <Col> </Col>
              </Row> */}
              {/* <hr />
              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Movement status</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    name="status_mvt"
                    value={this.state.status_mvt}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>
                <Col></Col>
                <Col></Col>
                <Col> </Col>
              </Row> */}
              {/* <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop: "3px",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Status</b>
              </div>
              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Container no</Label>
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
              </Row>

              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Status</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    id="exampleSelect"
                    // style={{ width: "50px" }}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>

                <Col>
                  <Label>Type</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    id="exampleSelect"
                    // style={{ width: "50px" }}
                    bsSize="sm"
                  />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Container no (parent)</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    id="exampleSelect"
                    // style={{ width: "50px" }}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>

                <Col>
                  <Label>Packaging ID</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    id="exampleSelect"
                    // style={{ width: "50px" }}
                    bsSize="sm"
                  />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Weight (Kg)</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    id="exampleSelect"
                    // style={{ width: "50px" }}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>

                <Col>
                  <Label>Empty weight (Kg)</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    id="exampleSelect"
                    // style={{ width: "50px" }}
                    bsSize="sm"
                  />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Height (m)</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    id="exampleSelect"
                    // style={{ width: "50px" }}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>

                <Col>
                  <Label>Volume (dm3)</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    id="exampleSelect"
                    // style={{ width: "50px" }}
                    bsSize="sm"
                  />
                </Col>
                <Col> </Col>
              </Row>

              <hr />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                  marginTop: "3px",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Update</b>
              </div>
              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Packaging Id</Label>
                </Col>

                <Col>
                  <Input type="select" bsSize="sm">
                    <option></option>
                    <option></option>
                    <option></option>
                    <option></option>
                  </Input>
                </Col>
                <Col> </Col>

                <Col>
                  <Label>Weight(Kg)</Label>
                </Col>

                <Col>
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                <Col>
                  <Label>Height</Label>
                </Col>

                <Col>
                  <Input
                    type="text"
                    id="exampleSelect"
                    // style={{ width: "50px" }}
                    bsSize="sm"
                  />
                </Col>

                <Col> </Col>

                <Col></Col>

                <Col></Col>
                <Col> </Col>
              </Row> */}
            </TabPane>
          </TabContent>
        </div>
        <br />
      </React.Fragment>
    );
  }
}
