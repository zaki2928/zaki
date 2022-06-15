import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container} from "reactstrap";
import { FaEdit} from "react-icons/fa";
import { StockSnapEditHandler, StockSnapDisplayData, StockSnapDisplayHandler,
   remover, StockSnapEditData, nesteddisplayreferencedata } from '../../../../store/Store';
import { FaPrint, FaFileExport } from "react-icons/fa";
import StockSnapEdit from './StockSnapEdit';


class StockSnapDisplay extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          orderEdit: false,
          orderDisplay: false,
          isdisplaydata: [],
          editDisp: false,
          editDisplayArr: [],
          
        };
      }

      componentDidMount(){
        console.log("nestedddisplay refrence datatattatattata",nesteddisplayreferencedata)
        if (StockSnapDisplayData.length === 0) {
          console.log("length is zero");
          this.state.data.push(this.props.isdisplaydata);
          console.log("after data pushed in table", this.state.data);
        } else {
          console.log("length is not zero", StockSnapDisplayData);
         this.state.data.push(StockSnapDisplayData)
          console.log("after data pushed in table", this.state.data);
        }
      }
        displayHandler = (props) => {
          console.log("ibzy display handler calling");
          StockSnapDisplayHandler(props);
          this.setState({
            orderDisplay: true,
            isdisplaydata: props,
            orderEdit: false,
          });
        };

        displayCloseHandler = (props) => {
          console.log("ibzy edit handler calling");
      
          this.setState({
            orderDisplay: false,
          });
        };

      
      backHandler=()=>{
        console.log("calling back handler for list")
        remover("StockSnapDisplay")
        this.props.displayCloseHandler()
      }

      editDisplayHandler=(props)=>{
        console.log("check props dataaaaaa")
        this.setState({
           editDisp: true,
            
        })
        console.log(props)
        this.state.editDisplayArr.push(props)
        StockSnapEditHandler(props)
      }

      editDiplayClosehandler=()=>{
        this.setState({
          editDisp: false,
        })
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
                      
                      onClick={() => this.editDisplayHandler(props.original)}
                    >
                      Edit
                    </FaEdit>
                  );
                },
              },
          {
            Header: "Quantity",
            accessor: "body",
          },
          {
            Header: "Stock Content No",
            accessor: "printerName",
          },
          {
            Header: "Content No",
            accessor: "isAvailable",
          },
          {
            Header: "Container No",
            accessor: "modifiedby",
          },
          {
            Header: "Location",
            accessor: "modifiedby",
          },
          {
            Header: "Content Status",
            accessor: "modifiedby",
          },
          {
            Header: "Type",
            accessor: "modifiedby",
          },

           {
            Header: "Container Status",
            accessor: "modifiedby",
          },
          {
            Header: "Product Unit",
            accessor: "modifiedby",
          },
          {
            Header: "Container Type",
            accessor: "modifiedby",
          },

           {
            Header: "Product Company",
            accessor: "modifiedby",
          },
          {
            Header: "Product ID",
            accessor: "modifiedby",
          },
          {
            Header: "Product",
            accessor: "modifiedby",
          },
          {
            Header: "Product Description",
            accessor: "modifiedby",
          },
          {
            Header: "Quantity Unit",
            accessor: "modifiedby",
          },
          {
            Header: "Intermediate Material Code",
            accessor: "modifiedby",
          },

          {
            Header: "Grade",
            accessor: "modifiedby",
          },
          {
            Header: "Logistic Unit ID",
            accessor: "modifiedby",
          },
          {
            Header: "Batch",
            accessor: "modifiedby",
          },
          {
            Header: "Packaging ID",
            accessor: "modifiedby",
          },
          {
            Header: "Version",
            accessor: "modifiedby",
          },
          {
            Header: "Modified The",
            accessor: "modifiedby",
          },
          {
            Header: "Modified By",
            accessor: "modifiedby",
          },
          {
            Header: "Reserved Quantity",
            accessor: "modifiedby",
          },
          {
            Header: "Expected Quantity",
            accessor: "modifiedby",
          },

          {
            Header: "Version",
            accessor: "modifiedby",
          },
          {
            Header: "Modified The",
            accessor: "modifiedby",
          },
          {
            Header: "Modified By",
            accessor: "modifiedby",
          },
          {
            Header: "Movement Status",
            accessor: "modifiedby",
          },
        ];
        return (
            <React.Fragment>
              {this.state.editDisp === true || StockSnapEditData.length !== 0 ? 
              <StockSnapEdit editDisplayArr={this.state.editDisplayArr} editDiplayClosehandler={this.editDiplayClosehandler}/> :
              <Container
              className="themed-container"
               fluid={true}
                // style={{ border: "1px solid black", marginLeft: "14px" }}
        >
  <span>
                    {" "}
                    <u>
                      {" "}
                      <b>
                        <a onClick={this.backHandler}>Home</a>
                      </b>
                    </u>{" "}
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Access to Stock Snapshot</a>
                      </b>
                    </u>
                  </span>
  <br />
                  <hr/>
                  <div class="row-xs-6 bottom-row ">
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
                  
       <div>
          <hr/>
          <ReactTable
            className="-striped -highlight "
            // data={this.state.data.length === 0
            //   ? this.props.isdisplaydata : this.state.data
            // }
            data={nesteddisplayreferencedata}
            columns={columns}
            defaultPageSize={10}
            showPaginationTop= {true}
            filterable
          />
            </div>

            </Container>
              }
            </React.Fragment>
        );
    }
}

export default StockSnapDisplay;