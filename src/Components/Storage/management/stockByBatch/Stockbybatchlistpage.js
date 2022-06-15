import React, { Component } from 'react'
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import Displaystockbylocation from './Displaystockbylocation'
import { StockbatchData, StockbatchDataHandler, StockbatchCriteria, remover,Stockbatchid, NestedStocklocationDataHandler, StocklocationDataHandler } from '../../../../store/Store'
import axios from "axios";
import { FaDesktop } from 'react-icons/fa';
import { FcSearch } from "react-icons/fc";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
  IoSearch,
} from "react-icons/io5";
import {properties} from '../../../../Properties/Properties'

const getListofStockByBatch = properties.Port + properties.getListofStockByBatch
const getStockByLocationByBatch = properties.Port + properties.getStockByLocationByBatch

export default class Stockbybatchlistpage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isShow: false,
      data: [],
      data2:[],

    }
  }

  getLocationByBatch = (props) => {
    axios.post(getStockByLocationByBatch+props.batch)
    .then((response) =>{
      if (response.status === 200){
        StocklocationDataHandler(response.data);
        this.props.additem("Stock by location");
      }
      
    })
    .catch((error) => {
      console.log(error);
    });
  }

  componentDidMount = () => {
    if (StockbatchData.length !== 0) {
      this.setState({
        data: StockbatchData
      })
    } else {
      this.setState({
        data: this.props.data,
      })
    }
  }

  refreshhhHandler = () => {
    console.log("refresh button pressed")
    this.refreshHandler()
  }
  refreshHandler = () => {
    
    axios.post(getListofStockByBatch, StockbatchCriteria, {
      params:{
        limit: StockbatchCriteria.limit
      },
    })
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
          })
          StockbatchDataHandler(response.data);
        } else {
          this.setState({
            data: [],
          });
          StockbatchDataHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  StockByBatchFilterMethod = () => {
    
  
    axios.post(getListofStockByBatch, StockbatchCriteria, {
        params: {
          limit: StockbatchCriteria.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
          });
          StockbatchDataHandler(response.data);
          // this.componentDidMount();
        } else {
          this.setState({
            data: [],
          });
          StockbatchDataHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  backHandler = () => {
    console.log("calling back handler for list")
    remover(Stockbatchid)
    this.props.bacHandler()
  }

  redirectHandler = (props) => {
    const temp = []
    temp.push(props)
    this.getLocationByBatch(props)
    // NestedStocklocationDataHandler(props)
    
    // this.props.additems("Stock By Location")
    
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
        Header: "Batch",
        accessor: "batch",
      },
      {
        Header: "display",
        Cell: (props) => (

          <FaDesktop

            onClick={() => this.redirectHandler(props.original)}
          >

          </FaDesktop>
        )
      },
      {
        Header: "Created Date",
        accessor: "dateCreation",
        Cell: (props) => {
          return (
            <span>
              {props.original.dateCreation === undefined
                ? ""
                : props.original.dateCreation === null
                ? ""
                : props.original.dateCreation === ""
                ? ""
                : props.original.dateCreation
                    .replace("T", " ")
                    .substring(0, props.original.dateCreation.lastIndexOf("."))}
            </span>
          );
        },
      },
      {
        Header: "Quantity total",
        accessor: "quantityTotal",
      },
      {
        Header: "Quantity available",
        accessor: "quantityAvailable",
      },
      {
        Header: "Quantity transit",
        accessor: "quantityTransit",
      },
      {
        Header: "Quantity damage",
        accessor: "quantityDamaged",
      },
      {
        Header: "Weight total",
        accessor: "weightTotal",
      },
      {
        Header: "Weight available",
        accessor: "weightAvailable",
      },
      {
        Header: "Weight transit",
        accessor: "weightTransit",
      },
      {
        Header: "Weight damage",
        accessor: "weightDamaged",
      },
    ]
    return (
      <React.Fragment>
        {/* {this.state.isShow === true || Displaystocklocationdata.length !== 0 ?
          (<Displaystockbylocation tableData2={this.state.tableData2} />)
          : ( */}

            <div>
              <IoArrowBackCircleSharp onClick={this.backHandler} />
              <IoArrowForwardCircleSharp />
              <FcSearch style={{ marginLeft: "5px" }} />
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
                    <a onClick={this.backHandler}>Stock by batch search</a>
                  </b>
                </u>
                            &#62;
                        <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Stock by batch</a>
                  </b>
                </u>


              </span>
              <br/>
              <button
              onClick={this.refreshhhHandler}
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

              <ReactTable
                className="-striped -highlight "
                //   data={this.state.data}
                data={this.state.data.length === 0
                  ? this.props.data
                  : this.state.data
                }

                columns={columns}
                defaultPageSize={5}
                showPaginationTop={false}
                filterable
                defaultFilterMethod={this.filterCaseInsensitive}
              />
            </div>

          {/* )} */}
      </React.Fragment>
    )
  }
}
