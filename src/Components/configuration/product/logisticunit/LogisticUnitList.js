import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import LogisticUnitEdit from "./LogisticUnitEdit";
import { Container, Row, Col, Button, Label, Input } from "reactstrap";
import { FaEdit, FaDesktop, FaPrint, FaFileExport } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import {
  ProductDisplayData,
  LogisticUnitEditHandler,
  ActualLogisticUnitDisplaydata,
  LogisticUnitEditData,
  ActualLogisticUnitDisplaydatahandler,
  WarehouseEditHandler,
  NestedLogisticUnitHandler,
  LogisticUnitData,
  LogisticUnitHandler,
  LogisticUnitfilterData,
  nestedlogisticunit,
  remover,
  logisticUnitCriteria
} from "../../../../store/Store";
import {
  LogisticUnitDisplayData,
  LogisticUnitDisplayHandler,
} from "../../../../store/Store";
import LogisticUnitDisplay from "./LogisticUnitDisplay";
import { properties } from "../../../../Properties/Properties";

const getProductKLLUbyIdProduct = properties.Port + properties.getProductKLLUbyIdProduct
const getListofAllFilteredDataForLUproduct = properties.Port + properties.getListofAllFilteredDataForLUproduct

class LogisticUnitList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data2: [],
      generalEdit: false,
      lUDisplay: false,
      lUDispArr: [],
      idReference: "",
      description: "",
      zIMC: "",
      zGrade: "",
    };
  }

  componentDidMount = () => {
     console.log("testinggggggggggggggggggggggggggg LogisticUnitData",LogisticUnitData)
   
   if(LogisticUnitData!==null && LogisticUnitData !== ""){
     console.log("testinggggggggggggggggggggggggggg LogisticUnitData",LogisticUnitData)
    //  this.criteriaFilterMethod(LogisticUnitfilterData)
    //  this.setState({
    //    data:LogisticUnitData
    //  })
    this.state.data.push(LogisticUnitData)
    console.log("table data",this.state.data)
   }
    if (nestedlogisticunit !== null && nestedlogisticunit !== "") {
      console.log("testinggggggggggggggggggggggggggg nestedlogisticunit",nestedlogisticunit)
      this.setState({
        idReference: ProductDisplayData.idReference,
        description: ProductDisplayData.description,
        zIMC: ProductDisplayData.zIMC,
        zGrade: ProductDisplayData.zGrade,
      });
      this.getProductLogisticUnitByProductId(ProductDisplayData.idProduct);
    }

    // if (LogisticUnitData.length !== 0) {
    //   this.setState({
    //     data: LogisticUnitData,
    //   });
    // } else {
    //   this.setState({
    //     data: this.props.data,
    //   });
    // }
  };

  getProductLogisticUnitByProductId = (id) => {
    console.log(" calling getProductLogisticUnitByProductId");

    axios
      .post(getProductKLLUbyIdProduct + id)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success logistic unit dshfjkfgkjvhdfsdfsmnfkjbdfngfkn ", response.data);
          this.setState({
            data: response.data,
          });
          // NestedLogisticUnitHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  backHandler = () => {
    console.log("calling back handler for list");
    remover("Logistic units");
    this.props.backHandler();
  };

  lUEditHandler = (props) => {
    console.log("check props dataaaaaa", props);
    this.setState({
      generalEdit: true,
    });
    this.state.data2.push(props);
    console.log("shahdidddddddd",LogisticUnitDisplayData)
    LogisticUnitEditHandler(props);
  };

  lUeditClosehandler = (passedVal) => {
//     console.log("sioddjndbgndfbgkngfbjkngnkdf back e=handlerer", passedVal)
//     if(passedVal === false){
//       console.log("sLogisticUnitEditData true", LogisticUnitEditData)
//  var editArr = []
//     editArr.push(nestedlogisticunit)
//     this.setState({
//       generalEdit: false,
//      data: editArr,
//     });
//     }
//     if (passedVal === true) {
//       console.log("sLogisticUnitEditData false ", LogisticUnitEditData)
//       console.log("sLogisticUnitEditData criteria ", LogisticUnitfilterData)
      
//       this.criteriaFilterMethod(LogisticUnitfilterData)
     
      
      this.setState({
        generalEdit: false,
      
      });
      
   
   
  };
  criteriaFilterMethod = (filterdata) => {
    console.log("testtttttttttttttt  api ");
   
    axios
      .post(getListofAllFilteredDataForLUproduct, filterdata, {
        params: {
          limit:filterdata.limit,
          // limit:2
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
         

          console.log("resposne success xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", response.data);
          this.setState({
            data: response.data,
          
          });
 

          LogisticUnitHandler(response.data);
          // ProductcriteriaHandler(criteria);
        } else {
          this.setState({
            data: [],
          });
          // ProductHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  lUDisplayHandler = (props) => {
    console.log("logistic unit display handler calling by  shahid",props);
    if(props.productKLEntity===null){
      console.log("product entity is nullllllllllllllllllllllllllllll")
      
 ActualLogisticUnitDisplaydatahandler(props)
    }
    else{
      console.log("product entity is not nullllllllllllllllllllllllllllll")
 LogisticUnitDisplayHandler(props);
    }
   
   
    this.setState({
      lUDisplay: true,
    });
    this.state.lUDispArr.push(props);
    
  };

  lUDisplayCloseHandler = () => {
    this.setState({
      lUDisplay: false,
    });
  };

  deleteHandler() {
    Swal.fire({
      title: "Confirmation",
      text: "Do you confirm the deletion?",
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

  refreshhandler = () => {
    console.log("referesh handler calling");
    this.listRefresh();
  };
  listRefresh = () => {
    console.log("testttingggggggggggggggggggggggggggggg calling",logisticUnitCriteria);
    axios
      .post(getListofAllFilteredDataForLUproduct, logisticUnitCriteria, {
        params: {
          limit: logisticUnitCriteria.limit,
        },
      })

      .then((response) => {
        console.log("shahid",response.data)
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne successsssssssssssss", response.data);
          this.setState({
            data: response.data,
          });
          // ProductHandler(response.data);
        } else {
          this.setState({
            data: [],
          });
          // ProductHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
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
    const columns = [
      {
        Header: "Edit",
        accessor: "Edit",
        filterable: false,
        Cell: (props) => {
          return (
            <FaEdit
              style={{ marginLeft: "40px" }}
              onClick={() => this.lUEditHandler(props.original)}
            >
              Edit
            </FaEdit>
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
              <FaDesktop
                style={{ marginLeft: "40px" }}
                onClick={() => this.lUDisplayHandler(props.original)}
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
        Header: "Description",
        accessor: "description",
      },
      // {
      //   Header: "Product Company",
      //   accessor: "modifiedby",
      // },
      {
        Header: "Product Id",
        accessor: "idProduct",
      },
      {
        Header: "Product ",
        accessor: "productKLEntity.idReference",
      },
      {
        Header: "Product Description",
        accessor: "productKLEntity.description",
      },

      {
        Header: "Product Unit",
        accessor: "productKLEntity.descriptionUnit",
      },
      {
        Header: "Quantity Unit",
        accessor: "productKLEntity.zGrade",
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
        Header: "Status",
        accessor: "statusLu",
        Cell: (props) => {
          return (
            <text>
              {
                props.original.statusLu === 100 ? <span>In progress</span>
                : props.original.statusLu === 200 ? <span>To be filled</span>
                  : props.original.statusLu === 400 ? <span>Closure request</span>
                    : props.original.statusLu === 500 ? <span>Closed</span>
                      : null
              }
            </text>
          )
        }
      },
      {
        Header: "Error Status",
        accessor: "statusError",
        Cell: (props) => {
          return (
            <text>
              {
                props.original.statusError === 100 ? <span>No error</span>
                  : props.original.statusError === 200 ? <span>Packaging incorrect</span>
                    : props.original.statusError === 300 ? <span>Preparation incorrect</span>
                    : props.original.statusError === 400 ? <span>Replenishment incorrect</span>
                      : null
              }
            </text>
          )
        }
      },
      {
        Header: "Length(cm)",
        accessor: "length",
      },
      {
        Header: "Width(cm)",
        accessor: "width",
      },
      {
        Header: "Height(cm)",
        accessor: "height",
      },
      {
        Header: "Weight(g)",
        accessor: "weight",
      },
      {
        Header: "Weight Net(g)",
        accessor: "weightNet",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
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
                    .substring(0, props.original.mDate.lastIndexOf("."))}
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
        Header: "Type",
        accessor: "typeProduct",
        Cell: (props) => {
          return (
            <text>
              {
                props.original.typeProduct === "200" ? <span>Consumable</span>
                  : props.original.typeProduct === "100" ? <span>Production</span> : null
              }
            </text>
          )
        }
      },
    ];
    return (
      <React.Fragment>
        {this.state.generalEdit === true ||
        LogisticUnitEditData.length !== 0 ? (
          <LogisticUnitEdit
            lUeditClosehandler={this.lUeditClosehandler}
            data2={this.state.data2}
          />
        ) : this.state.lUDisplay === true ||
          LogisticUnitDisplayData.length !== 0 || ActualLogisticUnitDisplaydata!==null? (
          <LogisticUnitDisplay
          lUDispArr={this.state.lUDispArr}
            lUDisplayCloseHandler={this.lUDisplayCloseHandler}
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
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor: "pointer"}} onClick={this.backHandler}>Logistic Units Search</a>
                </b>
              </u>
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a style={{cursor:"pointer"}}>Logistic Units Management</a>
                </b>
              </u>
            </span>
            <br />

            <div
              style={{ marginTop: "10px", marginBottom: "5px" }}
              class="row-xs-6 bottom-row "
            >
              <FaPrint

              //   onClick={() => this.edithandler(props.original)}
              ></FaPrint>{" "}
              <a style={{cursor:"pointer"}}>Print</a>{" "}
              <FaFileExport

              //   onClick={() => this.edithandler(props.original)}
              ></FaFileExport>{" "}
              <a style={{cursor:"pointer"}}>Export</a>{" "}
              <br />
            <button
              onClick={this.refreshhandler}
              style={{
                // float: "right",
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
            </div>
            {nestedlogisticunit !== null ? (
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
            ) : (
              ""
            )}
            <ReactTable
              className="-striped -highlight "
              data={
                this.state.data.length === 0 ? this.props.data : this.state.data
              }
              columns={columns}
              defaultPageSize={10}
              showPaginationTop={true}
              filterable
              defaultFilterMethod={this.filterCaseInsensitive}

            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default LogisticUnitList;
