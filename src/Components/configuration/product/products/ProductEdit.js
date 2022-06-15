import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { ProductEditData, remover } from "../../../../store/Store";
import axios from "axios";
import { properties } from "../../../../Properties/Properties";
import { PRODUCT, product } from "../../../../store/RoleBased";

const editProduct = properties.Port + properties.editProduct
class ProductEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      company: "",
      criteriaArr: [],
      product: "",
      description: "",
      available: "",
      batchStatement: "",
      cleanUpNumber: "",
      cleanUpStatus: "",
      coefUnit: "",
      controlQty: "",
      message: "",
      creationDate: "",
      description: "",
      descriptionCompl: "",
      descriptionShort: "",
      descriptionUnit: "",
      feat1Statement: "",
      feat2Statement: "",
      feat3Statement: "",
      idCompany: "",
      idProduct: "",
      idReference: "",
      mDate: "",
      mUsername: "",
      rotation: "",
      sellbydateStatement: "",
      statusProduct: "",
      type: "",
      typeProduct: "",
      usebydateStatement: "",
      versionLock: "",
      zGrade: "",
      zIMC: "",
      zLuChildCode: "",
      zMaterialType: "",
      zProductType: "",
      zQtyProductChild: "",
      zQtyProductChildinBu: "",
      zQtyProductRoot: "",
      zQtyProductRootinBu: "",
      zQuality: "",
      zUnitCode: "",
      zcoefUnit: "",
      zcyclecountingInventory: "",
      zdescriptionUnit: "",
      zidProductChild: "",
    };
  }

  deleteHandler() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
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
      .post(editProduct, this.state)
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

  componentDidMount() {
    console.log("calling edit data length", this.state.data.length);
    console.log("calling edit datttaaaaaaaaaaaaa&&&&&&aaaa", this.props.data2);
    console.log("calling edit ", ProductEditData);

    if (ProductEditData !== null) {
      this.setState(
        {
          data: ProductEditData,
        },
        () => {
          console.log("data present after tab switch", this.state.data);
          this.setState({
            company: ProductEditData.company,
            // product: ProductEditData[0].idReference,
            description: ProductEditData.description,
            available: ProductEditData.available,
            batchStatement: ProductEditData.batchStatement,
            cleanUpNumber: ProductEditData.cleanUpNumber,
            cleanUpStatus: ProductEditData.cleanUpStatus,
            coefUnit: ProductEditData.coefUnit,
            controlQty: ProductEditData.controlQty,
            creationDate: ProductEditData.creationDate,
            description: ProductEditData.description,
            descriptionCompl: ProductEditData.descriptionCompl,
            descriptionShort: ProductEditData.descriptionShort,
            descriptionUnit: ProductEditData.descriptionUnit,
            feat1Statement: ProductEditData.feat1Statement,
            feat2Statement: ProductEditData.feat2Statement,
            feat3Statement: ProductEditData.feat3Statement,
            idCompany: ProductEditData.idCompany,
            idProduct: ProductEditData.idProduct,
            idReference: ProductEditData.idReference,
            mDate: ProductEditData.mDate,
            mUsername: ProductEditData.mUsername,
            rotation: ProductEditData.rotation,
            sellbydateStatement: ProductEditData.sellbydateStatement,
            statusProduct: ProductEditData.statusProduct,
            type: ProductEditData.type,
            typeProduct: ProductEditData.typeProduct,
            usebydateStatement: ProductEditData.usebydateStatement,
            versionLock: ProductEditData.versionLock,
            zGrade: ProductEditData.zGrade,
            zIMC: ProductEditData.zIMC,
            zLuChildCode: ProductEditData.zLuChildCode,
            zMaterialType: ProductEditData.zMaterialType,
            zProductType: ProductEditData.zProductType,
            zQtyProductChild: ProductEditData.zQtyProductChild,
            zQtyProductChildinBu: ProductEditData.zQtyProductChildinBu,
            zQtyProductRoot: ProductEditData.zQtyProductRoot,
            zQtyProductRootinBu: ProductEditData.zQtyProductRootinBu,
            zQuality: ProductEditData.zQuality,
            zUnitCode: ProductEditData.zUnitCode,
            zcoefUnit: ProductEditData.zcoefUnit,
            zcyclecountingInventory: ProductEditData.zcyclecountingInventory,
            zdescriptionUnit: ProductEditData.zdescriptionUnit,
            zidProductChild: ProductEditData.zidProductChild,
          });
        }
      );
    }
  }
  backHandler = () => {
    console.log("calling back handler for list");
    remover("ProductEdit");
    this.props.editClosehandler();
  };

  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "body",
      },
      {
        Header: "Bar code",
        accessor: "printerName",
      },
      {
        Header: "Modified the",
        accessor: "isAvailable",
      },
      {
        Header: "Modified by",
        accessor: "modifiedby",
      },
      {
        Header: "Delete",
        accessor: "Delete",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaTrashAlt
                style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
                onClick={() => this.deleteHandler()}
              >
                Delete
              </FaTrashAlt>
            </div>
          );
        },
      },
    ];
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ marginLeft: "14px" }}
          // style={{ border: "1px solid black", marginLeft: "14px" }}
        >

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
                <a style={{cursor:"pointer"}} onClick={this.backHandler}>Product List</a>
              </b>
            </u>
            &#62;
            <u>
              <b>
                <a style={{cursor:"pointer"}}>Product Edit</a>
              </b>
            </u>
          </span>
          <br />
          <div>
            {/* <a href="text"><u>New</u></a>&nbsp;&nbsp;&nbsp;  */}
            <span style={{ fontWeight: "bold", color: "green" }}>
              {this.state.message}
              <br />
            </span>
            {PRODUCT===2 ?  <a style={{ cursor: "pointer", fontWeight: "bold", color: "blue" }}>
              <u onClick={this.SubmitHandler}>Save</u>
            </a> : ''} 
          </div>
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
              }}
            >
              <b style={{ marginLeft: "5px" }}>*Description</b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Product</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.idReference} />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Product description</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  bsSize="sm"
                  value={this.state.description}
                  onChange={this.onchangehandler}
                  name="description"
                />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Product complementory description</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  bsSize="sm"
                  value={this.state.descriptionCompl}
                  name="descriptionCompl"
                  onChange={this.onchangehandler}
                />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Product short description</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  bsSize="sm"
                  value={this.state.descriptionShort}
                  name="descriptionShort"
                  onChange={this.onchangehandler}
                />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Available</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  bsSize="sm"
                  // type="radio"
                  // checked={this.state.available !== null}
                  type="checkbox"
                  name="dataToN3"
                  value={this.state.available}
                  onChange={this.checkboxhandler}
                  checked={this.state.available === 1}
                />
              </Col>
              <Col> </Col>
              <Col>
                <Label>Company</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  // style={{ width: "50px" }}
                  bsSize="sm"
                  disabled = "true"
                >
                  <option>sabic</option>
                  <option>saudi kayan</option>
                </Input>
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Coef unit</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  value={this.state.coefUnit}
                  name="coefUnit"
                  onChange={this.onchangehandler}
                  type="select"
                  // name="select"
                  id="exampleSelect"
                  // style={{ width: "50px" }}
                  bsSize="sm"
                >
                  <option>_1_</option>
                  <option>_1/10_</option>
                  <option>_1/100_</option>
                  <option>_1/1 000_</option>
                  <option>_1/10 000_</option>
                  <option>_1/100 000_</option>
                  <option>_1/1 000 000_</option>
                  <option>_1/10 000 000_</option>
                </Input>
              </Col>

              <Col> </Col>
              <Col>
                <Label>Description unit</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  bsSize="sm"
                  value={this.state.descriptionUnit}
                  name="descriptionUnit"
                  onChange={this.onchangehandler}
                />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Status</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm"
                 value={this.state.statusProduct}
                 name= "statusProduct"
                 disabled= "true"
                >
                  {this.state.statusProduct === 100 ?
                  this.setState({statusProduct: "Created"})
                  : this.state.statusProduct === 400 ?
                  this.setState({statusProduct: "Closure request"})
                  : this.state.statusProduct === 500 ?
                  this.setState({statusProduct: "closed"})
                  : null
                }
                
                </Input>
              </Col>

              <Col> </Col>
              <Col>
                <Label>Type</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  type="select"
                  bsSize="sm"
                  value={this.state.typeProduct}
                  name="typeProduct"
                  onChange={this.onchangehandler}
                >
                  <option value="100">consumable</option>
                  <option value="200">production</option>
                </Input>
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Rotation</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  value={this.state.rotation}
                  name="rotation"
                  onChange={this.onchangehandler}
                  type="select"
                  // name="select"
                  id="exampleSelect"
                  // style={{ width: "50px" }}
                  bsSize="sm"
                >
                  <option value="">---select---</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </Input>
              </Col>

              <Col> </Col>
              <Col>
                <Label>Created the</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.creationDate} />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Modified by</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.mUsername} />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Modified the</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.mDate} />
              </Col>
              <Col> </Col>
            </Row>
          </div>

          <div>
            <hr />
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
              }}
            >
              <b style={{ marginLeft: "5px" }}>*Further Description</b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Intermediate material code</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.zIMC} />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Material type</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.zMaterialType} />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Grade</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  bsSize="sm"
                  value={this.state.zGrade}
                  name="zGrade"
                  onChange={this.onchangehandler}
                />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Root description unit</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.zdescriptionUnit} />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Root qty (T)</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.zQtyProductRoot} />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Root qty</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.zQtyProductChildinBu} />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Root coef unit</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.zcoefUnit} />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Qty child</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.zQtyProductChild} />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Reference child</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.zProductType} />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Cycle counting inventory</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.zcyclecountingInventory} />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Unit code</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.zUnitCode} />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Reference child code</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.zLuChildCode} />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Qty child in base unit</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.zQtyProductChildinBu} />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Quality</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  type="select"
                  name="zQuality"
                  id="exampleSelect"
                  // style={{ width: "50px" }}
                  bsSize="sm"
                  value={this.state.zQuality}
                  onChange={this.onchangehandler}
                >
                  <option value="">---select---</option>
                  <option value="100">No Prime</option>
                  <option value="200">Prime</option>
                  <option value="300">Scrap</option>
                </Input>
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col>
                <Label>Product type</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  type="select"
                  id="exampleSelect"
                  // style={{ width: "50px" }}
                  bsSize="sm"
                  name="zProductType"
                  value={this.state.zProductType}
                  onChange={this.onchangehandler}
                >
                  <option value="100">Bulk</option>
                  <option value="200">Non Bulk</option>
                </Input>
              </Col>

              <Col> </Col>
              <Col>{/* <Label>Quality</Label>{" "} */}</Col>

              <Col> {/* <Input bsSize="sm" /> */}</Col>
              <Col> </Col>
            </Row>
          </div>

          <div>
            <hr />
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
              }}
            >
              <b style={{ marginLeft: "5px" }}>*Characteristics Statement</b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Batch mode</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  type="select"
                  name="batchStatement"
                  id="exampleSelect"
                  // style={{ width: "50px" }}
                  bsSize="sm"
                >
                  <option value="0">_No Statement</option>
                  <option value="3">_Imposed_</option>
                  <option value="1">_At Preparation_</option>
                  <option value="2">_Total Tracability_</option>
                </Input>
              </Col>

              <Col> </Col>
              <Col>{/* <Label>Material type</Label>{" "} */}</Col>

              <Col> {/* <Input bsSize="sm" /> */}</Col>
              <Col> </Col>
            </Row>
          </div>

          <div>
            <hr />
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
              }}
            >
              <b style={{ marginLeft: "5px" }}>*Bar codes</b>
            </div>
            <br />

            {/* <ReactTable
              className="-striped -highlight "
              data={
                this.state.data.length === 0
                  ? this.props.data2
                  : this.state.data
              }
              columns={columns}
              defaultPageSize={4}
              // showPaginationTop= {true}
              filterable
            /> */}
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default ProductEdit;
