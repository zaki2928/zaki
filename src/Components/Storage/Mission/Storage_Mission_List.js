import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { FaEdit } from 'react-icons/fa';
import { Container, Row, Col, Button } from "reactstrap";

class Storage_Mission_List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
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
        accessor: "Edit",
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
        Header: "Mission No.",
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
        Header: "Index",
        accessor: "display",
      },
      {
        Header: "Mode",
        accessor: "Description",
      },
      {
        Header: "Printable",
        accessor: "isAvailable",
      },
      {
        Header: "Movement Type",
        accessor: "isAvailable",
      },
      {
        Header: "Container Choice Type",
        accessor: "modifiedby",
      },
      {
        Header: "Container Origin",
        accessor: "modifiedby",
      },
      {
        Header: "Origin Location",
        accessor: "modifiedby",
      },
      {
        Header: "Destination Location",
        accessor: "modifiedby",
      },
      {
        Header: "Destination Choice Type",
        accessor: "modifiedby",
      },
      {
        Header: "Container Type",
        accessor: "modifiedby",
      },
      {
        Header: "Mission Class",
        accessor: "modifiedby",
      },
      {
        Header: "Reference Class Mission",
        accessor: "modifiedby",
      },
      {
        Header: "Quantity",
        accessor: "modifiedby",
      },
      {
        Header: "Priority",
        accessor: "modifiedby",
      },
      {
        Header: "User Treat",
        accessor: "modifiedby",
      },
      {
        Header: "Status",
        accessor: "modifiedby",
      },
      {
        Header: "Creation Date",
        accessor: "creationdate",
        Cell: (props) => {
          return (
            <span>
              {props.original.creationdate === undefined
                ? ""
                : props.original.creationdate === null
                ? ""
                : props.original.creationdate === ""
                ? ""
                : props.original.creationdate
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
        accessor: "modifiedby",
      },
      
    ];
    return (
      <React.Fragment>
        <ReactTable
          className="-striped -highlight "
          //   data={this.state.data}
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

export default Storage_Mission_List;
