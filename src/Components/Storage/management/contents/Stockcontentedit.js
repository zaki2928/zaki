import React, { Component } from "react";
import { Row, Col, Label, Input } from "reactstrap";
import { FaSave } from "react-icons/fa";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { Stockcontenteditdata } from "../../../../store/Store";
import classnames from "classnames";

export default class Stockcontentedit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "1",
      batch: "",
      content_status_id: "",
      description: "",
      id_Company: "",
      id_Container: "",
      id_Content: "",
      id_Location: "",
      id_Logistic_unit: "",
      id_Packaging: "",
      id_Product: "",
      id_Reference: "",
      qty_Expected: "",
      qty_Lu: "",
      qty_Reserved: "",
      quantity: "",
      status_Container: "",
      status_MVT: "",
      type_Container: "",
      type_Content: "",
      version_Lock: "",
      z_Description_unit: "",
      z_Grade: "",
      z_Inter_material_code: "",
      z_Unit_code: "",
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
    console.log("edit");
    this.props.editcloseHandler();
  };

  componentDidMount = () => {
    console.log("content edit com calling by shahid", Stockcontenteditdata);
    this.setState({
      batch: Stockcontenteditdata.batch,
      content_status_id: Stockcontenteditdata.content_status_id,
      description: Stockcontenteditdata.description,
      id_Company: Stockcontenteditdata.id_Company,
      id_Container: Stockcontenteditdata.id_Container,
      id_Content: Stockcontenteditdata.id_Content,
      id_Location: Stockcontenteditdata.id_Location,
      id_Logistic_unit: Stockcontenteditdata.id_Logistic_unit,
      id_Packaging: Stockcontenteditdata.id_Packaging,
      id_Product: Stockcontenteditdata.id_Product,
      id_Reference: Stockcontenteditdata.id_Reference,
      qty_Expected: Stockcontenteditdata.qty_Expected,
      qty_Lu: Stockcontenteditdata.qty_Lu,
      qty_Reserved: Stockcontenteditdata.qty_Reserved,
      quantity: Stockcontenteditdata.quantity,
      status_Container: Stockcontenteditdata.status_Container,
      status_MVT: Stockcontenteditdata.status_MVT,
      type_Container: Stockcontenteditdata.type_Container,
      type_Content: Stockcontenteditdata.type_Content,
      version_Lock: Stockcontenteditdata.version_Lock,
      z_Description_unit: Stockcontenteditdata.z_Description_unit,
      z_Grade: Stockcontenteditdata.z_Grade,
      z_Inter_material_code: Stockcontenteditdata.z_Inter_material_code,
      z_Unit_code: Stockcontenteditdata.z_Unit_code,
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
                <a style={{cursor:"pointer"}}>Stock content Search</a>
              </b>
            </u>
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a style={{ cursor: "pointer" }} onClick={this.backHandler}>
                  List of Stock content
                </a>
              </b>
            </u>
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a style={{cursor:"pointer"}}>Stock content edition</a>
              </b>
            </u>
          </span>

          <br />

          <div>
            <div class="row-xs-6 bottom-row ">
              <FaSave />
              <a style={{cursor:"pointer"}}>Save</a>{" "}
            </div>

            <Nav tabs style={{ cursor: "pointer" }}>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "1",
                  })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  Details
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "2",
                  })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Update quantity
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "3",
                  })}
                  onClick={() => {
                    this.toggle("3");
                  }}
                >
                  Update reference
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "4",
                  })}
                  onClick={() => {
                    this.toggle("4");
                  }}
                >
                  Update content
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "5",
                  })}
                  onClick={() => {
                    this.toggle("5");
                  }}
                >
                  Update characteristics
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: this.state.activeTab === "6",
                  })}
                  onClick={() => {
                    this.toggle("6");
                  }}
                >
                  Update logistic unit
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <li> &#62; &#62; General</li>
                <br />
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
                    <Input bsSize="sm" value={this.state.id_Container} />
                  </Col>
                  <Col> </Col>

                  <Col>
                    <Label>Location</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" value={this.state.id_Location.replace("19@","")} />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Product</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.id_Product}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Product description</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.description}
                      bsSize="sm"
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Intermediate material code</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.z_Inter_material_code}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Grade</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.z_Grade} bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Quantity (PAL)</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.quantity}
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
                      value={this.state.type_Content}
                      bsSize="sm"
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Logistic unit ID</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.id_Logistic_unit}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Logistic unit qty (PAL)</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.qty_Lu} bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Content status</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.content_status_id}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col></Col>

                  <Col></Col>
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
                  <b style={{ marginLeft: "5px" }}>Statements</b>
                </div>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Batch</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.batch} bsSize="sm" />
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

                <div
                  style={{
                    border: "1px",
                    backgroundColor: "grey",
                    border: "1px solid black",
                    marginTop: "3px",
                  }}
                >
                  <b style={{ marginLeft: "5px" }}>Stock Quantities</b>
                </div>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Reserved quantity (PAL)</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" />
                  </Col>
                  <Col> </Col>

                  <Col>
                    <Label>Expected quantity (PAL)</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" />
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
                  <b style={{ marginLeft: "5px" }}>Informations of Reception</b>
                </div>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Reception ID</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" />
                  </Col>
                  <Col> </Col>

                  <Col>
                    <Label>Reception Line ID</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Reception type</Label>
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
                </Row>
              </TabPane>

              <TabPane tabId="2">
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
                    <Input bsSize="sm" value={this.state.id_Container} />
                  </Col>
                  <Col> </Col>

                  <Col>
                    <Label>Location</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" value={this.state.id_Location} />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Product</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.id_Product}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Product description</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.description}
                      bsSize="sm"
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Intermediate material code</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.z_Inter_material_code}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Grade</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.z_Grade} bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Quantity (PAL)</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.quantity}
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
                      value={this.state.type_Content}
                      bsSize="sm"
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Logistic unit ID</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.id_Logistic_unit}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Logistic unit qty (PAL)</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.qty_Lu} bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Content status</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.content_status_id}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col></Col>

                  <Col></Col>
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
                  <b style={{ marginLeft: "5px" }}>Statements</b>
                </div>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Batch</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.batch} bsSize="sm" />
                  </Col>

                  <Col> </Col>
                  <Col></Col>
                  <Col></Col>
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
                    <Label>Motive</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" />
                  </Col>
                  <Col> </Col>

                  <Col>
                    <Label>Quantity(PAL)</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Comment</Label>
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
                </Row>
              </TabPane>

              <TabPane tabId="3">
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
                    <Input bsSize="sm" value={this.state.id_Container} />
                  </Col>
                  <Col> </Col>

                  <Col>
                    <Label>Location</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" value={this.state.id_Location} />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Product</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.id_Product}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Product description</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.description}
                      bsSize="sm"
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Intermediate material code</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.z_Inter_material_code}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Grade</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.z_Grade} bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Quantity (PAL)</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.quantity}
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
                      value={this.state.type_Content}
                      bsSize="sm"
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Logistic unit ID</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.id_Logistic_unit}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Logistic unit qty (PAL)</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.qty_Lu} bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Content status</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.content_status_id}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col></Col>

                  <Col></Col>
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
                  <b style={{ marginLeft: "5px" }}>Statements</b>
                </div>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Batch</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.batch} bsSize="sm" />
                  </Col>

                  <Col> </Col>
                  <Col></Col>
                  <Col></Col>
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
                    <Label>Motive</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" />
                  </Col>
                  <Col> </Col>

                  <Col>
                    <Label>Product</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Logistic unit ID</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" />
                  </Col>
                  <Col> </Col>

                  <Col>
                    <Label>Quantity(PAL)</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Comment</Label>
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
                  <b style={{ marginLeft: "5px" }}>Statements</b>
                </div>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Batch</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.batch} bsSize="sm" />
                  </Col>

                  <Col> </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col> </Col>
                </Row>
              </TabPane>

              <TabPane tabId="4">
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
                    <Input bsSize="sm" value={this.state.id_Container} />
                  </Col>
                  <Col> </Col>

                  <Col>
                    <Label>Location</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" value={this.state.id_Location} />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Product</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.id_Product}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Product description</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.description}
                      bsSize="sm"
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Intermediate material code</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.z_Inter_material_code}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Grade</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.z_Grade} bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Quantity (PAL)</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.quantity}
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
                      value={this.state.type_Content}
                      bsSize="sm"
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Logistic unit ID</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.id_Logistic_unit}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Logistic unit qty (PAL)</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.qty_Lu} bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Content status</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.content_status_id}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col></Col>

                  <Col></Col>
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
                  <b style={{ marginLeft: "5px" }}>Statements</b>
                </div>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Batch</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.batch} bsSize="sm" />
                  </Col>

                  <Col> </Col>
                  <Col></Col>
                  <Col></Col>
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
                    <Label>Created the</Label>
                  </Col>

                  <Col>
                    <Input
                      type="date"
                      id="exampleSelect"
                      // style={{ width: "50px" }}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col> </Col>
                </Row>
              </TabPane>

              <TabPane tabId="5">
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
                    <Input bsSize="sm" value={this.state.id_Container} />
                  </Col>
                  <Col> </Col>

                  <Col>
                    <Label>Location</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" value={this.state.id_Location} />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Product</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.id_Product}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Product description</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.description}
                      bsSize="sm"
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Intermediate material code</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.z_Inter_material_code}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Grade</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.z_Grade} bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Quantity (PAL)</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.quantity}
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
                      value={this.state.type_Content}
                      bsSize="sm"
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Logistic unit ID</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.id_Logistic_unit}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Logistic unit qty (PAL)</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.qty_Lu} bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Content status</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.content_status_id}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col></Col>

                  <Col></Col>
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
                  <b style={{ marginLeft: "5px" }}>Statements</b>
                </div>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Batch</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.batch} bsSize="sm" />
                  </Col>

                  <Col> </Col>
                  <Col></Col>
                  <Col></Col>
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
                    <Label>Motive</Label>
                  </Col>

                  <Col>
                    <Input
                      type="select"
                      id="exampleSelect"
                      // style={{ width: "50px" }}
                      bsSize="sm"
                    >
                      <option></option>
                    </Input>
                  </Col>

                  <Col> </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col> </Col>
                </Row>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Comment</Label>
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
                  <b style={{ marginLeft: "5px" }}>Statements</b>
                </div>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Batch</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.batch} bsSize="sm" />
                  </Col>

                  <Col> </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col> </Col>
                </Row>
              </TabPane>

              <TabPane tabId="6">
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
                    <Input bsSize="sm" value={this.state.id_Container} />
                  </Col>
                  <Col> </Col>

                  <Col>
                    <Label>Location</Label>
                  </Col>

                  <Col>
                    <Input bsSize="sm" value={this.state.id_Location} />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Product</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.id_Product}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Product description</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.description}
                      bsSize="sm"
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Intermediate material code</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.z_Inter_material_code}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Grade</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.z_Grade} bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Quantity (PAL)</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.quantity}
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
                      value={this.state.type_Content}
                      bsSize="sm"
                    />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Logistic unit ID</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.id_Logistic_unit}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col>
                    <Label>Logistic unit qty (PAL)</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.qty_Lu} bsSize="sm" />
                  </Col>
                  <Col> </Col>
                </Row>

                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Content status</Label>
                  </Col>

                  <Col>
                    <Input
                      type="text"
                      value={this.state.content_status_id}
                      bsSize="sm"
                    />
                  </Col>

                  <Col> </Col>

                  <Col></Col>

                  <Col></Col>
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
                  <b style={{ marginLeft: "5px" }}>Statements</b>
                </div>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col>
                    <Label>Batch</Label>
                  </Col>

                  <Col>
                    <Input type="text" value={this.state.batch} bsSize="sm" />
                  </Col>

                  <Col> </Col>
                  <Col></Col>
                  <Col></Col>
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
                    <Label>Logistic unit ID</Label>
                  </Col>

                  <Col>
                    <Input
                      type="select"
                      id="exampleSelect"
                      // style={{ width: "50px" }}
                      bsSize="sm"
                    >
                      <option></option>
                    </Input>
                  </Col>

                  <Col> </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col> </Col>
                </Row>
                <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                  <Col></Col>

                  <Col></Col>

                  <Col> </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col> </Col>
                </Row>
              </TabPane>
            </TabContent>

            <br />
          </div>
        </div>
      </React.Fragment>
    );
  }
}
