import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button, Label, Input } from "reactstrap";
import ProductEdit from "./ProductEdit";
import { FaEdit, FaTrashAlt, FaList, FaDesktop } from "react-icons/fa";
import {
  ProdDispEditHandler,
  ProductDisplayData,
  ProductDisplayHandler,
  remover,
  ProdDispEditData,
  SiteLogisticUnitHandler,
  SiteLogisticUnitData,
} from "../../../../store/Store";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import ProductDisplayEdit from "./ProductDisplayEdit";
import EditSiteLogisticUnit from "./EditSiteLogisticUnit";
import axios from "axios";
import { properties } from "../../../../Properties/Properties";

const getProductKLLUbyIdProduct = properties.Port + properties.getProductKLLUbyIdProduct

class ProductDisplay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      idReference: "",
      zIMC: "",
      description: "",
      zGrade: "",
      data: [],
      prodEdit: false,
      prodDisplay: false,
      isdisplaydata: [],
      editDisp: false,
      editDisplayArr: [],
      siteLog: false,
      siteLogArr: [],
    };
  }

  componentDidMount() {
    console.log("product display calling ", ProductDisplayData);
    this.getproductLUBYproductId(ProductDisplayData);

    // console.log(
    //   "calling edit datttaaaaaaaaaaaaaaaaa",
    //   this.props.isdisplaydata
    // );
    // if (ProductDisplayData.length === 0) {
    //   console.log("length is zero");
    //   this.state.data.push(this.props.isdisplaydata);
    //   this.setState({
    //     idReference: this.props.isdisplaydata.idReference,
    //     zIMC: this.props.isdisplaydata.zIMC,
    //     description: this.props.isdisplaydata.description,
    //     zGrade: this.props.isdisplaydata.zGrade,
    //   });
    //   console.log("after data pushed in table", this.state.data);
    // } else {
    //   console.log("length is not zero", ProductDisplayData);
    //   this.state.data.push(ProductDisplayData);
    //   this.setState({
    //     idReference: ProductDisplayData.idReference,
    //     zIMC: ProductDisplayData.zIMC,
    //     description: ProductDisplayData.description,
    //     zGrade: ProductDisplayData.zGrade,
    //   });
    //   console.log("after data pushed in table", this.state.data);
    // }
  }

  getproductLUBYproductId = (props) => {
    console.log("Date which we are s ending", this.state);
    axios
      .post(
        getProductKLLUbyIdProduct +
          props.idProduct
      )
      // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
            idReference: ProductDisplayData.idReference,
            zIMC: ProductDisplayData.zIMC,
            description: ProductDisplayData.description,
            zGrade: ProductDisplayData.zGrade,
          });

          // ProductHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  displayHandler = (props) => {
    console.log("ibzy display handler calling");
    ProductDisplayHandler(props);
    this.setState({
      prodDisplay: true,
      isdisplaydata: props,
      prodEdit: false,
    });
  };

  displayCloseHandler = (props) => {
    console.log("ibzy edit handler calling");

    this.setState({
      prodDisplay: false,
    });
  };

  backHandler = () => {
    console.log("calling back handler for list");
    remover("ProductDisplay");
    this.props.displayCloseHandler();
  };

  editDisplayHandler = (props) => {
    console.log("check props dataaaaaa");
    this.setState({
      editDisp: true,
    });
    console.log("chekkkkkk", props);
    this.state.editDisplayArr.push(props);
    ProdDispEditHandler(props);
  };

  editDiplayClosehandler = () => {
    this.setState({
      editDisp: false,
    });
  };

  siteLogUnitHandler = (props) => {
    console.log("check props dataaaaaa");
    this.setState({
      siteLog: true,
    });
    console.log("chekkkkkk", props);
    this.state.siteLogArr.push(props);
    SiteLogisticUnitHandler(props);
  };

  siteLogisticClosehandler = () => {
    this.setState({
      siteLog: false,
    });
  };

  render() {
    const columns = [
      {
        Header: "Edit",
        accessor: "Edit",
        filterable: false,
        Cell: (props) => {
          return (
            <FaEdit onClick={() => this.editDisplayHandler(props.original)}>
              Edit
            </FaEdit>
          );
        },
      },
      {
        Header: "display",
        accessor: "display",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaDesktop
                onClick={() => this.siteLogUnitHandler(props.original)}
              >
                Display
              </FaDesktop>
            </div>
          );
        },
      },
      {
        Header: "ID",
        accessor: "idLU",
      },
      {
        Header: "Product Description",
        accessor: "description",
      },
      {
        Header: "Company",
        accessor: "productKLEntity.companyEntity.idCompany",
      },
      {
        Header: "Product ID",
        accessor: "productKLEntity.idProduct",
      },

      {
        Header: "Product",
        accessor: "productKLEntity.idReference",
      },
      {
        Header: " Product Description",
        accessor: "productKLEntity.description",
      },
      {
        Header: "Product Unit",
        accessor: "productKLEntity.descriptionUnit",
      },
      {
        Header: "Quantity unit",
        accessor: "modifiedby",
      },
      {
        Header: "Intermediate Material Code",
        accessor: "productKLEntity.zIMC",
      },
      {
        Header: "Grade",
        accessor: "productKLEntity.zGrade",
      },
      {
        Header: "Logistic Unit Id",
        accessor: "idLogisticUnit",
      },
      {
        Header: "Product complimentory Description",
        accessor: "modifiedby",
      },
      {
        Header: "Rotation",
        accessor: "modifiedby",
      },
      {
        Header: "Created the",
        
          Cell: (props) => {
            return (
              <span>
                {props.original.creationDate !== null
                  ? props.original.creationDate.substring(0, 10)
                  : ""}
                &nbsp;
                {props.original.creationDate !== null
                  ? props.original.creationDate.substring(14, 19)
                  : ""}
              </span>
            );
          },
        },
      {
        Header: "Modified Date",
        
        Cell: (props) => {
          return (
            <span>
              {props.original.mDate !== null
                ? props.original.mDate.substring(0, 10)
                : ""}
              &nbsp;
              {props.original.mDate !== null
                ? props.original.mDate.substring(14, 19)
                : ""}
            </span>
          );
        },
      },
      {
        Header: "Modified by",
        accessor: "modifiedby",
      },
      {
        Header: "Version",
        accessor: "isAvailable",
      },
      {
        Header: "intermediate material code",
        accessor: "modifiedby",
      },
      {
        Header: "Modified by",
        accessor: "modifiedby",
      },
      {
        Header: "Version",
        accessor: "isAvailable",
      },
      {
        Header: "intermediate material code",
        accessor: "modifiedby",
      },
      {
        Header: "Material tyoe",
        accessor: "modifiedby",
      },
      {
        Header: "Grade",
        accessor: "isAvailable",
      },
      {
        Header: "Root qyt",
        accessor: "modifiedby",
      },
      {
        Header: "Root desc unit",
        accessor: "modifiedby",
      },
      {
        Header: "Qty child",
        accessor: "isAvailable",
      },
      {
        Header: "Reference child",
        accessor: "modifiedby",
      },
      {
        Header: "Cycle counting inventory",
        accessor: "modifiedby",
      },
      {
        Header: "Unit code",
        accessor: "isAvailable",
      },
      {
        Header: "Quality",
        accessor: "modifiedby",
      },
      {
        Header: "Product type",
        accessor: "modifiedby",
      },
      {
        Header: "Root Qty",
        accessor: "isAvailable",
      },
      {
        Header: "Root coef unit",
        accessor: "modifiedby",
      },
      {
        Header: "Ref child code",
        accessor: "modifiedby",
      },
      {
        Header: "Qty child in base unit",
        accessor: "isAvailable",
      },
      {
        Header: "Qty root in base unit",
        accessor: "modifiedby",
      },
    ];
    return (
      <React.Fragment>
        {this.state.editDisp === true || ProdDispEditData.length !== 0 ? (
          <ProductDisplayEdit
            editDisplayArr={this.state.editDisplayArr}
            editDiplayClosehandler={this.editDiplayClosehandler}
          />
        ) : this.state.siteLog === true || SiteLogisticUnitData.length !== 0 ? (
          <EditSiteLogisticUnit
            siteLogArr={this.state.siteLogArr}
            siteLogisticClosehandler={this.siteLogisticClosehandler}
          />
        ) : (
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
                  <a style={{cursor:"pointer"}}>Product search</a>
                </b>
              </u>{" "}
              &#8680;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor:"pointer"}} onClick={this.backHandler}>Product List</a>
                </b>
              </u>{" "}
              &#8680;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor:"pointer"}}>Product Display</a>
                </b>
              </u>{" "}
            </span>
            <br />
            <div>
              <hr />
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
                  <Input bsSize="sm" value={this.state.description} />
                </Col>
                <Col> </Col>
              </Row>

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
                  <Label>Grade</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.zGrade} />
                </Col>
                <Col> </Col>
              </Row>
            </div>
            <div>
              <hr />
              <ReactTable
                className="-striped -highlight "
                data={this.state.data}
                columns={columns}
                defaultPageSize={10}
                showPaginationTop={true}
                filterable
              />
            </div>
          </Container>
        )}
      </React.Fragment>
    );
  }
}

export default ProductDisplay;
