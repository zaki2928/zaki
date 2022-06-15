import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import ProductEdit from "./ProductEdit";
import { ProdutMngt } from "../../../globalLogin/GlobalLogin"
import {
  FaEdit,
  FaTrashAlt,
  FaList,
  FaChrome,
  FaDesktop,
  FaProductHunt,
  FaBoxOpen,
} from "react-icons/fa";
import Swal from "sweetalert2";
import {
  FamiliesEditionData,
  ProdFamiliesEditionHandler,
  NestedLogisticUnitHandler,
  ProductData,
  ProductDisplayData,
  ProductDisplayHandler,
  ProductEditData,
  ProductEditHandler,
  LogisticUnitHandler,
  ProductHandler,
  remover,
  ProductCriteria,
  productid,
} from "../../../../store/Store";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import ProductDisplay from "./ProductDisplay";
import ProductFamiliesEdition from "./ProductFamiliesEdition";
import axios from "axios";
import { properties } from "../../../../Properties/Properties";
import Loader from "react-loader-spinner";
import { PRODUCT } from "../../../../store/RoleBased";

const GetProductListOfAllFilters =
  properties.Port + properties.GetProductListOfAllFilters;
const getProductKLLUbyIdProduct =
  properties.Port + properties.getProductKLLUbyIdProduct;
const deleteProductByIdWithIMC = properties.Port + properties.deleteProductByIdWithIMC


class ProductList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data2: [],
      prodEdit: false,
      prodDisplay: false,
      isdisplaydata: [],
      families: false,
      FamiliesArr: [],
      msg: "",
      // loading: false,
    };
  }

  refreshhandler = () => {
    console.log("referesh handler calling");
    this.criteriaFilterMethod();
  };

  

  componentDidMount = () => {
    console.log("ProductMngt  component calling");
    if (ProductData.length !== 0) {
      this.setState({
        data: ProductData,
        // loading:true
      });
    } else {
      this.setState({
        data: this.props.data,
        // loading:true
      });
    }
  };

  backHandler = () => {
    console.log("calling back handler for list");

    remover(productid);
    this.props.backHandler();
  };

  editHandler = (props) => {
    console.log("check props dataaaaaa", props);
    this.setState({
      prodEdit: true,
      data2: props,

    });

    ProductEditHandler(props);
  };

  criteriaFilterMethod = () => {
    
    console.log("testttingggggggggggggggggggggggggggggg calling");
    axios
      .post(GetProductListOfAllFilters, ProductCriteria, {
        params: {
          limit: ProductCriteria.limit,
        },
      })
      
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne successsssssssssssss", response.data);
          this.setState({
            data: response.data,
            

          });
          ProductHandler(response.data);
          
        } else {
          
          this.setState({
            data: [],

          });
          ProductHandler(response.data);
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  editClosehandler = () => {
    this.criteriaFilterMethod();
    this.setState({
      prodEdit: false,

    });
  };

  displayHandler = (props) => {
    ProductDisplayHandler(props);
    LogisticUnitHandler(props);
    this.getProductLogisticUnitByProductId(props.idProduct);
  };

  displayCloseHandler = () => {
    this.setState({
      prodDisplay: false,

    });
  };

  getProductLogisticUnitByProductId = (id) => {
    console.log(" calling getProductLogisticUnitByProductId", id);

    axios
      .post(getProductKLLUbyIdProduct + id)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success logistic unit ", response.data);
          // this.setState({
          //   data: response.data,
          // });
          NestedLogisticUnitHandler(response.data);
          this.props.additem("Logistic units");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  familiesEditionHandler = (props) => {
    console.log("familiesss handler calling");
    ProdFamiliesEditionHandler(props);
    this.setState({
      families: true,

    });
    this.state.FamiliesArr.push(props);
  };

  familieCloseHandler = () => {
    this.setState({
      families: false,

    });
  };

  deleteHandler = (props) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!",
      msg: "",
    }).then((result) => {
      if (result.value) {
        axios
          .delete(
            deleteProductByIdWithIMC +
            props.idProduct
          )
          .then((response) => {
            console.log(" data", response);
            if (response.status === 200 && response.data === 200) {
              console.log("response 200 successs");
              this.setState({
                msg: "",
              });
              this.componentDidMount();
			         this.refreshhandler();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            } else if (response.status === 200 && response.data === 300) {
              console.log("response data 300 success");
              this.setState({
                msg: "*This product is a child product",
              });
            } else if (response.status === 200 && response.data === 100) {
              console.log("response data 100 success");
              this.setState({
                msg: "*You cannot delete this product as it is associated with containers",
              });
            } else {
              this.setState({
                msg: "Invalid Product ID",
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  filterCaseInsensitive(filter, row) {
    const id = filter.pivotId || filter.id;
    if (row[id] !== null) {
      return (
        row[id] !== undefined ?
          String(row[id].toString().toLowerCase())
            .includes(filter.value.toString().toLowerCase())
          :
          true
      );
    }
  }

  render() {
    const { msg } = this.state;
    const columns = [
      {
        Header: "Edit",
        accessor: "Edit",
        filterable: false,
        // show: product === 2 ? true : false,
        Cell: (props) => {
          return (
            <FaEdit style={{cursor:"pointer"}} onClick={() => this.editHandler(props.original)}>
              Edit
            </FaEdit>
          );
        },
      },
      {
        Header: "Delete",
        show:
        PRODUCT === 2 ? true : false,
        accessor: "Delete",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaTrashAlt disabled={true} style={{cursor:"pointer"}} onClick={() => this.deleteHandler(props.original)}>
                Delete
              </FaTrashAlt>

            </div>
          );
        },
      },
      {
        Header: "Display",
        accessor: "display",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaDesktop style={{cursor:"pointer"}} onClick={() => this.displayHandler(props.original)}>
                Display
              </FaDesktop>
            </div>
          );
        },
      },
      {
        Header: "Product Families",
        accessor: "display",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaBoxOpen
                style={{cursor:"pointer"}} onClick={() => this.familiesEditionHandler(props.original)}
              >
                Product families
              </FaBoxOpen>
            </div>
          );
        },
      },
      {
        Header: "Product ID",
        accessor: "idProduct",
      },
      {
        Header: "Company",
        accessor: "idCompany",
      },
      {
        Header: "Product",
        accessor: "idReference",
      },
      {
        Header: "Product Description",
        accessor: "description",
      },
      {
        Header: "Available",
        accessor: "available",
        Cell: (props) => {
          return (
            <text>
              {
                props.original.available === 1 ? <input type="checkbox" checked /> :
                  props.original.available === 2 ? <input type="checkbox" /> : null
                  
              }
            </text>
          )
        }
      },
      {
        Header: "Status",
        accessor: "statusProduct",
        Cell: (props) => {
          return (
            <text>
              {
                props.original.statusProduct === 100 ? <span>Created</span>
                  : props.original.statusProduct === 400 ? <span>Closure request</span>
                    : props.original.statusProduct === 500 ? <span>Closed</span>
                      : null
              }
            </text>
          )
        }
      },
      {
        Header: "Type",
        accessor: "typeProduct",
        Cell: (props) => {
          return (
            <text>
              {
                props.original.typeProduct === 200 ? <span>Consumable</span>
                  : props.original.typeProduct === 100 ? <span>Production</span> : null
              }
            </text>
          )
        }
      },
      {
        Header: "Coef Unit",
        accessor: "coefUnit",
      },
      {
        Header: "Description Unit",
        accessor: "descriptionUnit",
      },
      {
        Header: "Batch Mode",
        accessor: "batchStatement",
        Cell: (props) => {
          return (
            <text>
              {
                props.original.batchStatement === 0 ? <text>Without</text> :
                  props.original.batchStatement === 1 ? <text>At_Preparation</text> :
                    props.original.batchStatement === 2 ? <text>Aotal_Tracability</text> :
                      props.original.batchStatement === 3 ? <text>Imposed</text> : null

              }
            </text>
          )
        }
      },
      {
        Header: "Product Short Desc",
        accessor: "descriptionShort",
      },
      {
        Header: "Product Complimentory Description",
        accessor: "descriptionCompl",
      },
      {
        Header: "Rotation",
        accessor: "rotation",
      },
      {
        Header: "Created Date",
        accessor: "creationDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.creationDate === undefined
                ? ""
                : props.original.creationDate === null
                ? ""
                : props.original.creationDate === ""
                ? ""
                : props.original.creationDate
                    .replace("T", " ")
                    }
            </span>
          );
        },
      },
      {
        Header: "Modified Date",
        accessor: "mDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.mDate === undefined
                ? ""
                : props.original.mDate === null
                ? ""
                : props.original.mDate === ""
                ? ""
                : props.original.mDate
                    .replace("T", " ")
                    }
            </span>
          );
        },
      },
      {
        Header: "Modified By",
        accessor: "mUsername",
      },
      {
        Header: "Version",
        accessor: "versionLock",
      },
      {
        Header: "Intermediate Material Code",
        accessor: "zIMC",
      },

      {
        Header: "Material Type",
        accessor: "zMaterialType",
      },
      {
        Header: "Grade",
        accessor: "zGrade",
      },
      {
        Header: "Root Qty",
        accessor: "zQtyProductRoot",
      },
      {
        Header: "Root Desc Unit",
        accessor: "zdescriptionUnit",
      },
      {
        Header: "Qty Child",
        accessor: "zQtyProductChild",
      },
      {
        Header: "Reference Child",
        accessor: "zidReferenceChild",
      },
      {
        Header: "Cycle Counting Inventory",
        accessor: "zcyclecountingInventory",
      },
      {
        Header: "Unit Code",
        accessor: "zUnitCode",
      },
      {
        Header: "Quality",
        accessor: "zQuality",
        Cell: (props) => {
          return (
            <text>{
              props.original.zQuality === 100 ? <span>Prime</span>
                : props.original.zQuality === 200 ? <span>Non_Prime</span>
                  : null
            }</text>
          )
        }
      },
      {
        Header: "Product Type",
        accessor: "zProductType",
        Cell: (props) => {
          return (<text>{
            props.original.zProductType === 100 ? <span>Non bulk</span> :
              props.original.zProductType === 200 ? <span>bulk</span> :
                props.original.zProductType === 300 ? <span>Scrape</span>
                  : null
          }</text>)
        }
      },
      {
        Header: "Root Qty",
        accessor: "zQtyProductRoot",
      },
      {
        Header: "Root Coef Unit",
        accessor: "zcoefUnit",
      },
      {
        Header: "Ref Child Code",
        accessor: "zLuChildCode",
      },
      {
        Header: "Qty Child In Base Unit",
        accessor: "zQtyProductChildinBu",
      },
      {
        Header: "Qty Root In Base Unit",
        accessor: "zQtyProductRootinBu",
      },
    ];
    return (
      <React.Fragment>

        {this.state.prodEdit === true || ProductEditData !== null ? (
          <ProductEdit
            editClosehandler={this.editClosehandler}
            data2={this.state.data2}
          />
        ) :
          this.state.families === true || FamiliesEditionData.length !== 0 ? (
            <ProductFamiliesEdition
              FamiliesArr={this.state.FamiliesArr}
              familieCloseHandler={this.familieCloseHandler}
            />
          ) : (
            <div>
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
                    <a style={{cursor:"pointer"}} onClick={this.backHandler}>
                      Product Search
                    </a>
                  </b>
                </u>
                &#8680;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{cursor:"pointer"}}>Product List</a>
                  </b>
                </u>
              </span>
              {/* <br /> */}
              <button
                onClick={this.refreshhandler}
                style={{
                  float: "right",
                  cursor: "pointer",
                  height: "30px",
                  width: "60px",
                  borderRadius: "5px",
                }}
              >
                <text style={{ fontSize: "15px", fontWeight: "bold" }}>
                  Refresh
                </text>
              </button>
              <div>
                <b>
                  <span
                    style={{
                      color: "red",
                    }}
                  >
                    <h6>{msg}</h6>
                  </span>
                </b>
              </div>
                <>
                {
                  this.props.loading ?
                    <div className="">
                      <div className="row">
                        <div class="col-md-4"></div>
                        <div class="col-md-4">

                          <div className="col spinner_item p-5">
                            <Loader
                              type="Oval"
                              color="#00BFFF"
                              height={120}
                              width={100}
                            // visible={loading}
                            />
                          </div>
                        </div>
                        <div class="col-md-4"></div>
                      </div>
                    </div>
                    :
                    <ReactTable
                      className="-striped -highlight "
                      data={
                        this.state.data.length === 0 ? this.state.data : this.state.data
                      }
                      columns={columns}
                      defaultPageSize={10}
                      showPaginationTop={true}
                      filterable
                      defaultFilterMethod={this.filterCaseInsensitive}
                    />
                  }
             </>
            </div>
          )
        }
      </React.Fragment>
    );
  }
}
export default ProductList;
