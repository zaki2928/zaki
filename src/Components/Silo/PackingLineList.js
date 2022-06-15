import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { FaEdit } from 'react-icons/fa';
import { Container, Row, Col, Button } from "reactstrap";
import {Packinglinedata} from "../../store/Store"

class PackingLineList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    if (Packinglinedata.length === 0) {
      this.setState({
        data: this.props.tableData,
      });
    } else {
      this.setState({
        data: Packinglinedata,
      });
    }

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
            Header: ()=>{
                return(
                    <FaEdit
                  style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
                  color="primary"
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaEdit>
                )
            },
            
            // accessor: "Edit",
             filterable: false,
            Cell: () => {
              return (
                <FaEdit
                  style={{ height: "1em", width: "1em", cursor: "pointer" }}
                  color="primary"
                //   onClick={() => this.edithandler(props.original)}
                >
                  Edit
                </FaEdit>
              );
            },
            
          },
      {
        Header: "ID",
        accessor: "body",
        // filterable: false,
        // Cell: (props) => {
        // //   return (
        // //     <FaEdit
        // //       style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
        // //       color="primary"
        // //       onClick={() => this.edithandler(props.original)}
        // //     >
        // //       Edit
        // //     </FaEdit>
        // //   );
        // },
      },
      {
        Header: "Packing Line L3",
        accessor: "Delete",
        //   filterable:false,
        //   Cell: (props) => {
        //     return (
        //       <div>
        //         <FaTrashAlt
        //           style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
        //           onClick={() => this.deletehanler(props.original)}
        //         >
        //           Delete
        //         </FaTrashAlt>
        //       </div>
        //     );
        //   },
      },
      {
        Header: "Material Type",
        accessor: "display",
      },
      {
        Header: "Packing Line DCS",
        accessor: "Description",
      },
      {
        Header: "Type",
        accessor: "isAvailable",
      },
      {
        Header: "Location",
        accessor: "isAvailable",
      },
      {
        Header: "Version",
        accessor: "modifiedby",
      },
      {
        Header: "Modified the",
        accessor: "modifiedby",
      },
      {
        Header: "Modified By",
        accessor: "modifiedby",
      },
      
    ];
    return (
      <React.Fragment>
        <ReactTable
          className="-striped -highlight "
          //   data={this.state.data}
          data={this.state.data.length === 0
            ? this.props.tableData
            : this.state.data
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

export default PackingLineList;
