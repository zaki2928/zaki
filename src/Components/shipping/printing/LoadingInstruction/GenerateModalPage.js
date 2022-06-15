import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import {TrailerReleaseData, remover } from "../../../store/Store";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import Swal from "sweetalert2";
class TrailerReleaseList extends Component {
  constructor(props) {
    super(props);
     this.state = {
   
        data: [],
      }
  }

componentDidMount=()=>{
if (TrailerReleaseData.length !== 0) {
  this.setState({
    data: TrailerReleaseData
  })
}else{
  this.setState({
    data: this.props.data
  })
}
  }

  releaseTrailerMethod=()=>{
    Swal.fire({
      title: 'Do you want to Release Trailer?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Release`,
      denyButtonText: `Don't Release`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  backHandler=()=>{
    console.log("calling back handler for list")
    remover("Trailer Release")
    this.props.backHandler()
  }

    render() {
        const columns = [
             {
        headerClassName: "header-clr",
        Header: (props) => {
          return (
            <div>
              <span><b>Select All</b></span>
              <br></br>
              <input type="checkbox" 
              />
            </div>
          );
        },
        maxWidth: 60,
        style: {
          textAlign: "center",
        },
        Cell: (props) => (
          <input
            type="checkbox"
            // checked={this.state.allchecked.get(props.original.idPrinter)}
            // onChange={() => this.selectSingle(props.original.idPrinter)}
          />
        ),
        filterable: false,
      },
            {
                  Header: "ID",
                  accessor: "body",
            },
            {
              Header: "Company",
              accessor: "Description",
            },
            {
              Header: "SAP id",
              accessor: "printerName",
            },
            {
              Header: "Trailer identification",
              accessor: "isAvailable",
            },
            {
              Header: "RFID tag",
              accessor: "modifiedby",
            },
            {
              Header: "Driver name",
              accessor: "isAvailable",
            },

            {
                Header: "Trailer type",
                accessor: "modifiedby",
              },
              {
                Header: "Preparation type",
                accessor: "isAvailable",
              },
              {
                Header: "Trailer number",
                accessor: "modifiedby",
              },
              {
                Header: "Status",
                accessor: "isAvailable",
              },
              {
                Header: "Preparation order",
                accessor: "modifiedby",
              },
              {
                Header: "Recording gate",
                accessor: "isAvailable",
              },

              //chekkk
              {
                Header: "Weighing status",
                accessor: "isAvailable",
              },
              {
                Header: "Reception line ID",
                accessor: "modifiedby",
              },
              {
                Header: "Position in consolidation area",
                accessor: "isAvailable",
              },
              {
                Header: "Expected container number",
                accessor: "isAvailable",
              },
              {
                Header: "Seal",
                accessor: "modifiedby",
              },
              {
                Header: "Version",
                accessor: "isAvailable",
              },
              {
                Header: "Modified the",
                accessor: "modifiedby",
              },
              {
                Header: "Modified by",
                accessor: "isAvailable",
              },
              {
                Header: "Gate",
                accessor: "isAvailable",
              },
             
          ];
        return (
            <React.Fragment>
              <div>
              <IoArrowBackCircleSharp onClick={this.backHandler}/>
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
                    >
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Trailer Release Filter</a>
                      </b>
                    </u>
                    >
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Trailer Release List</a>
                      </b>
                    </u>
                  </span>
                  <br />
              </div>
                <a href= "text"><b>Validate selection</b></a>
                
            <ReactTable
              className="-striped -highlight "
              // data={this.state.data}
              data={this.state.data.length === 0
                ? this.props.data : this.state.data
              }
              columns={columns}
              defaultPageSize={5}
              showPaginationTop= {true}
              filterable
            />
            <br/>
            <Container className="themed-container"
              fluid={true}
              style={{ border: "1px solid grey" }}>
              <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                <Button
                  onClick={
                   this.releaseTrailerMethod
                  }
                >
                  {" "}
                  Release
                </Button>
              </div>
            </Container><br/>
            
        </React.Fragment>

        );
    }
}

export default TrailerReleaseList;