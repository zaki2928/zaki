import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { FaEdit, FaTrashAlt,FaFileSignature, FaPrint, FaFileExport } from "react-icons/fa";
import Swal from "sweetalert2";
import {  remover } from '../../../store/Store';
import {SiteParamNewData , SiteParamNewHandler,SiteParamData} from "../../../store/Store";
import SiteParamNew from "./SiteParamNew";
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";
import axios from "axios";
import {properties} from '../../../Properties/Properties'
import { SITES } from '../../../store/RoleBased';

const getSiteParameterBySiteId = properties.Port + properties.getSiteParameterBySiteId

class SiteParamList extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          data2: [],
          generalEdit: false,
          customer : false,
          customerArr : [],
        };
      }

      // componentDidMount=()=>{
      //   if (ParameterData.length !== 0) {
      //     this.setState({
      //       data: ParameterData
      //     })
      //   }else{
      //     this.setState({
      //       data: this.props.data
      //     })
      //   }
      //     }

          componentDidMount(){
    
            console.log("calling displaylist line 92 ", SiteParamData);
          
            if (SiteParamData !== null) {
              this.getBySitId(SiteParamData.idSite)
              this.setState(
                {
                  data: SiteParamData,
                 
                },
                () => {
                  console.log("data present after tab switch",SiteParamData );
                  this.setState({
                   
                   businessName: SiteParamData.businessName,
                 
                    
                    
                 
                  });
                }
              );
            }
          }
          getBySitId= (id) => {
            console.log("print site id",id)
            axios
              .post(getSiteParameterBySiteId+id)
        
              .then((response) => {
                if (response.status === 200 && response.data.length !== 0) {
                  console.log("resposne successsssssssssssssssssssssss ", response.data);
                  this.setState({
                    data2:response.data
                  });
                
                } else {
                  this.setState({
                    data2: [],
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          };
        
          backHandler=()=>{
            console.log("calling back handler for list")
            remover("SiteParamList")
            this.props.SiteParamCloseHandler()
          }
        

      









CustomerEditionHandler=(props)=>{
  console.log("customer handler calling")
  SiteParamNewHandler(props)
  this.setState({
    customer: true,
  })
 this.state.customerArr.push(props);
}


  customerCloseHandler=()=>{
    this.setState({
      customer: false,
    })
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
            Header: "Code",
            accessor: "code",
          },
          {
            Header: "Description",
           
          },
          {
            Header: "Value",
            accessor: "siteParameterValue",
          },
          {
            Header: "Category",
            accessor: "parameterEntity.category",
           
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
          
        
        ];
        return (
            <React.Fragment>
              {
              this.state.customer === true || SiteParamNewData.length !== 0 ?
              (<SiteParamNew customerArr={this.state.customerArr} customerCloseHandler={this.customerCloseHandler}/>) :

           
              
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
                        <a onClick={this.backHandler}>Site Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a >Site Management</a>
                      </b>
                    </u>
                    
                  </span>

                  <br />
                  <hr/>

                  <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Site</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" value={this.state.businessName} />
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Product description</Label>{" "} */}
                </Col>
                
                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>

              </Row>
              <hr/>
                  
                  <div style = {{marginTop:"10px",marginBottom:"5px"}} class="row-xs-6 bottom-row ">
    {SITES === 2? 
    <div>
<FaFileSignature
                  
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileSignature>{" "}
{/* <button >Configure</button> */}
<span 
onClick={this.CustomerEditionHandler}
>New</span>{" "}
</div>            
:''}  

                <FaPrint
                
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaPrint>{" "}
<a  >Print</a>{" "}
<FaFileExport
                 
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileExport>{" "}
<a  >Export</a>{" "}


 </div>
 
                <ReactTable 
                  className="-striped -highlight "
                  // data={this.state.data.length === 0
                  //   ? this.props.data : this.state.data
                  // }
                data= {this.state.data2}
                  columns={columns}
                  defaultPageSize={5}
                  showPaginationTop= {false}
                  filterable
                  defaultFilterMethod={this.filterCaseInsensitive}
                />
                  </div>
                  }
            </React.Fragment>
            
          );
         
        }
}

export default SiteParamList;