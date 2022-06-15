import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import {Repackingdata} from '../../store/Store';


class SiloRepackingList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount = () => {
    if (Repackingdata.length === 0) {
      this.setState({
        data: this.props.tableData,
      });
    } else {
      this.setState({
        data: Repackingdata,
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
        Header: "Edit",
        accessor: "body",
        // filterable: false,
        // Cell: (props) => {
        //   return (
        //     <FaEdit
        //       style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
        //       color="primary"
        //       onClick={() => this.edithandler(props.original)}
        //     >
        //       Edit
        //     </FaEdit>
        //   );
        // },
      },
      {
        Header: "Delete",
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
        Header: "display",
        accessor: "display",
      },
      {
        Header: "Product ID",
        accessor: "Description",
      },
      {
        Header: "Company",
        accessor: "printerName",
      },
      {
        Header: "Product",
        accessor: "isAvailable",
      },
      {
        Header: "Product Description",
        accessor: "modifiedby",
      },
      {
        Header: "Available",
        accessor: "isAvailable",
      },
      {
        Header: "Status",
        accessor: "modifiedby",
      },
      {
        Header: "Type",
        accessor: "isAvailable",
      },
      {
        Header: "Coaf unit",
        accessor: "modifiedby",
      },
      {
        Header: "Description Unit",
        accessor: "isAvailable",
      },
      {
        Header: "Batch mode",
        accessor: "modifiedby",
      },
      {
        Header: "Product short Desc",
        accessor: "isAvailable",
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
        accessor: "isAvailable",
      },
      {
        Header: "Modified the",
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
        <ReactTable
          className="-striped -highlight "
            data={this.state.data.length === 0
              ? this.props.tableData
              : this.state.data
}
          // data={
          //   Repackingdata.length === 0 ? this.props.tableData : Repackingdata
          // }
          columns={columns}
          defaultPageSize={10}
          showPaginationTop={true}
          filterable
          defaultFIlterMethod={this.filterCaseInsensitive}
        />
      </React.Fragment>
    );
  }
}

export default SiloRepackingList;
