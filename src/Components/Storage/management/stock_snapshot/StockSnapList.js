import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import {FaDesktop,FaPrint, FaFileExport } from "react-icons/fa";
import { StockSnapData,StockSnapHandler,  snapshotcriteria,snapshotcriteriaHandler,StockSnapDisplayData,StockcontentDataHandler, StockSnapDisplayHandler,remover,stocksnapid,nesteddisplayreferencedata,nesteddisplayreferenceHandler,
} from '../../../../store/Store';
import StockSnapDisplay from './StockSnapDisplay';
import axios from 'axios';
import { properties } from '../../../../Properties/Properties';
const getlistofstocksnapshotfiltercriteria=properties.Port + properties.getlistofstocksnapshotfiltercriteria;
const listOfContentEntities=properties.Port + properties.listOfContentEntities;

class StockSnapList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          orderDisplay: false,
          isdisplaydata: [],
          idRefrence:"",
        
        };
      }

      componentDidMount=()=>{
        if (StockSnapData.length !== 0) {
          this.setState({
            data: StockSnapData
          })
        }else{
          this.setState({
            data: this.props.data
          })
        }
          }
        
          backHandler=()=>{
            console.log("calling back handler for list")
            remover(stocksnapid)
            this.props.backHandler()
          }

          refreshHandler=()=>{
            console.log("refreshHandler calling")
            this.criteriaFilterMethod()
          }

          // criteriaFilterMethod = () => {
          //   console.log("testtttttttttttttt  api ");
          //   const criteria = {
          //     listFilterBean: this.state.listFilterBean,
          //     limit: this.state.limit,
          //   };
          //   axios
          //     .post(getlistofstocksnapshotfiltercriteria, this.state, {
          //       params: {
          //         limit: this.state.limit,
          //       },
          //     })
          //     .then((response) => {
          //       console.log("snapshot=========>")
          //       if (response.status === 200 && response.data.length !== 0) {
          //         console.log("resposne success ______________________________", response.data);
          //         this.setState({
          //           data: response.data,
          //           orderList: true,
          //         });
          //         StockSnapHandler(response.data);
          //         snapshotcriteriaHandler(criteria);
          //       } else {
          //         this.setState({
          //           orderList: true,
          //           data: [],
          //         });
                
          //       }
          //     })
          //     .catch((error) => {
          //       console.log(error);
          //     });
          // };

  criteriaFilterMethod = () => {
    
    console.log("testttingggggggggggggggggggggggggggggg calling");
    axios
      .post(getlistofstocksnapshotfiltercriteria,  snapshotcriteria, {
        params: {
          limit:  snapshotcriteria.limit,
        },
      })
      
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne successsssssssssssss", response.data);
          this.setState({
            data: response.data,
            

          });
          StockSnapHandler(response.data);
          
        } else {
          
          this.setState({
            data: [],

          });
          StockSnapHandler(response.data);
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  displayHandler=(props)=>{
    console.log("display handler calling uzzuuuuu", props.idRefrence)
    // this.getstocksnapDisplayByidReference(props.idReference);
    StockSnapDisplayHandler(props)
    StockcontentDataHandler(props)
    this.getstocksnapDisplayByidReference(props.idRefrence);

    //  console.log("chek reference here ==========>", StockSnapDisplayData )
  //   console.log("display handler calling")
  //   StockSnapDisplayHandler(props)
  //   this.setState({
  //     orderDisplay: true,
  //   })
  //  this.state.isdisplaydata.push(props);
  // }
  }
  

displayCloseHandler=()=>{
  this.setState({
    orderDisplay: false,
  })
}

getstocksnapDisplayByidReference=(id)=>{

    console.log(" calling getdisplaydata by refernce ======>>>>>>>>>>>>>>>>>", id);

    axios
      .post(listOfContentEntities+ id)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success stock content unit ", response.data);
          nesteddisplayreferenceHandler(response.data)
          // this.props.addItem("Stock contents");
          this.props.additem("Contents");

          // nesteddisplayreferenceHandler(response.data)
          // this.setState({
          //   orderDisplay: true,
      
          // })  
              }
      })
      .catch((error) => {
        console.log(error);
      });
  
}

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
                Header: "Display",
                accessor: "display",
                filterable:false,
                Cell: (props) => {
                  return (
                    <div>
                      <FaDesktop
                      
                        // onClick={() => this.displayHandler(props.original)}
                        onClick={() => this.displayHandler(props.original)}
                      >
                        Display
                      </FaDesktop>
                    </div>
                  );
                },
              },
              
          {
            Header: "Warehouse",
            accessor: "idWarehouse",
          },
          {
            Header: "Product Company",
            accessor: "idCompany",
          },
          {
            Header: "Product ID",
            accessor: "idProduct",
          },
          {
            Header: "Product",
            accessor: "idRefrence",
          },
          {
            Header: "Product Description",
            accessor: "descriptionUnit",
          },
          {
            Header: "Product Unit",
            accessor: "description",
          },
          {
            Header: "Quantity Unit",
            accessor: "coefUnit",
          },
          {
            Header: "Intermediate Material Code",
            accessor: "zIntermaterialCode",
          },
          {
            Header: "Grade",
            accessor: "zGrade",
          },
          {
            Header: "Batch",
            accessor: "batch",
          },
          {
            Header: "Content Status",
            accessor: "contentStatus",
            Cell: (props) => {
              return (
                <text>
                  {props.original.contentStatus === -1? (
                    <span>N/A</span>
                  ) : null}
                </text>
              );
            },

          },
          {
            Header: "Type",
            accessor: "type",
            Cell: (props) => {
              return (
                <text>
                  {props.original.type === -1? (
                    <span>N/A</span>
                  ) : null}
                </text>
              );
            },
          },
          {
            Header: "Quality",
            accessor: "zQuality",
            Cell: (props) => {
              return (
                <text>
                  {props.original.zQuality === 100 ? (
                    <span>_Prime_</span>
                  ) : props.original.zQuality === 200 ? (
                    <span>_Non Prime_</span>
                  ) : props.original.zQuality === 300 ? (
                    <span>_Scrap_</span>
                  ) : null}
                </text>
              );
            },
          },
          {
            Header: "Product Type",
            accessor: "zProductType",

            Cell: (props) => {
              return (
                <text>
                  {props.original.zProductType === 200 ? (
                    <span>_Bulk_</span>
                  ) : props.original.zProductType === 100 ? (
                    <span>_Non Bulk_</span>)
                    : null}
                </text>
              );
            },
          },
          {
            Header: "Quantity",
            accessor: "quantity",
          },
          {
            Header: "Material Type",
            accessor: "zmaterialType",
          },
          {
            Header: "Weight(T)",
            accessor: "weight",
          },

       
         
        ];
        return (
            <React.Fragment>
              {/* {
              this.state.orderDisplay === true || nesteddisplayreferencedata.length !== 0 ? (
                <StockSnapDisplay isdisplaydata={this.state.isdisplaydata} displayCloseHandler={this.displayCloseHandler} />
              ) : */}
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
                        <a onClick={this.backHandler}>Stock Snapshot Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Access to Stock Snapshot</a>
                      </b>
                    </u>
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
                  </span>
                  <br />
                  <br />
                  <div class="row-xs-6 bottom-row " style={{marginTop:"10px",marginBottom:"10px"}}>
        
                <FaPrint
                  
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaPrint>{" "}
<a >Print</a>{" "}
<FaFileExport
                 
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileExport>{" "}
<a  >Export</a>{" "}


 </div>
                <ReactTable
                  className="-striped -highlight "
                  data={this.state.data.length === 0
                    ? this.props.data : this.state.data
                  }
                  columns={columns}
                  defaultPageSize={10}
                  showPaginationTop= {true}
                  filterable
                  defaultFilterMethod={this.filterCaseInsensitive}
                />
                  </div>
                  {/* } */}
                  
                              </React.Fragment>
            
          );
         
        }
}

export default StockSnapList;