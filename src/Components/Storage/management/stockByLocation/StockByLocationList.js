import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { StocklocationData, StocklocationDataHandler, StocklocationCriteria, remover,Stocklocationid } from '../../../../store/Store';
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { properties } from '../../../../Properties/Properties'
import axios  from "axios";


const getListofStockByLocation = properties.Port + properties.getListofStockByLocation


class StockByLocationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    if (StocklocationData.length !== 0) {
      
      this.setState({
        data: StocklocationData
      })
    } else {
      this.setState({
        data: this.props.data,
      })
    }
  }

  StockByLocationFilterMethod = () => {

    axios.post(getListofStockByLocation, StocklocationCriteria, {
      params: {
        limit: StocklocationCriteria.limit,
      },
    })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,
          });
          StocklocationDataHandler(response.data);
          this.componentDidMount();
        } else {
          this.setState({
            data: [],
          });
          StocklocationDataHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  backkHandler = () => {
    console.log("calling back handler for list")
    remover(Stocklocationid)
    this.props.backHandler()
  }

  refreshHandler=()=>{
    console.log("refreshHandler calling")
    this.StockByLocationFilterMethod()
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
      // {
      //   Header: "Location",
      //   accessor: "location",
        
      //   //  Cell: (props) => {
      //   //  return <span>{props.original.location.substring(3)}</span>;
      //   // //console.log(props.original);
      //   //  },
      // },
      {
        Header: "Location",
        // accessor: "location",
        
        Cell: (props) => {
          return <div>{
            props.original.location != null
                ? props.original.location.replace("19@", "")
                : ""}</div>;
        },
      },

      {
        Header: "Product",
        accessor: "productReference",
      },
      {
        Header: "Batch",
        accessor: "batch",
      },
      {
        Header: "Quantity",
        accessor: "quantity",
      },
      {
        Header: "Description unit",
        accessor: "descriptionUnit",
      },
      {
        Header: "Grade",
        accessor: "grade",
      },
      {
        Header: "Quality",
        accessor: "quality",
        Cell:(props) =>{
          return(
            <text>
              {
              props.original.quality ===100?<span>Prime</span>
              :null
              }
            </text>
          )
        }
      },
    ];
    return (
      <React.Fragment>
        <div>
          <IoArrowBackCircleSharp onClick={this.backkHandler}/>
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
                <a style={{cursor:"pointer"}} onClick={this.backkHandler}>Stock By Location Search</a>
              </b>
            </u>
            &#62;     
            <u>
              {" "}
              <b>
                {" "}
                <a>Stock By Location List</a>
              </b>
            </u>
            <button
              onClick={this.refreshHandler}
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
        </div>
        <ReactTable
          className="-striped -highlight "
          data={this.state.data.length === 0
            ? this.props.data : this.state.data
          }
          columns={columns}
          defaultPageSize={10}
          showPaginationTop={true}
          filterable
          defaultFilterMethod={this.filterCaseInsensitive}
        />
      </React.Fragment>

    );
  }
}

export default StockByLocationList;