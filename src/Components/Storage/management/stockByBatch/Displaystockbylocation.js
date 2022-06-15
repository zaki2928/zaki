import React, { Component } from 'react'
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Button,Row,
    Col,
    Label,
    Input,
    FormGroup,
     } from "reactstrap";
import {Displaystocklocationdata} from '../../../../store/Store'
import {
    IoArrowBackCircleSharp,
    IoArrowForwardCircleSharp,
   
  } from "react-icons/io5";

  
  import { FaPrint, FaFileExport ,FaDesktop} from 'react-icons/fa';
  import { FcSearch } from "react-icons/fc";

export default class Displaystockbylocation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // tableData2: [],
            data: []
        }


    }

    componentDidMount = () => {
        console.log("component did mount called",Displaystocklocationdata.length )
        if (Displaystocklocationdata.length === 0) {
          this.setState({
            data: this.props.tableData2,
          });
        } else {
          this.setState({
            data: Displaystocklocationdata,
          });
        }
    }

    
    render() {
        const columns = [
            {
                Header: "Location",
                accessor: "id_location_stk",
            },
            {
                Header: "Product",
                accessor: "id_product",
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
                Header: "Description Unit",
                accessor: "description_unit",
            },
            {
                Header: "Grade",
                accessor: "z_grade",
            },
            {
                Header: "Quality",
                accessor: "z_quality",
            },
        ]
        return (
            <React.Fragment>
                <div>
        <IoArrowBackCircleSharp onClick={this.backhandler} />
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
              <a>Stock by location </a>
            </b>
          </u>{" "}
         
        </span>
        <br />
       
        <div><b></b>
          
          
          <FaPrint
            
            onClick={this.exportPDF}
          >
            
          </FaPrint >{" "}
<a >Print</a>{" "}
<FaFileExport
           
          
          >
            
          </FaFileExport>{" "}
<a  >Export</a>{" "}

          
          
          </div>
          
        <div>
        
            
       
       
        </div>
        <div
 
              >
          
             
              <br />
              </div>
              
        <ReactTable
          className="-striped -highlight "
          data={this.state.data.length === 0
            ? this.props.tableData2
            : this.state.data
              }
          columns={columns}
          defaultPageSize={1}
          showPaginationTop={false}
          filterable
        />
        </div>
      </React.Fragment>
        )
    }
}
