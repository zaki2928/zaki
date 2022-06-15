import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { IoIosSettings } from "react-icons/io";
import { MdRestore } from "react-icons/md";
import { MdPrint } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import {Statuschangedata,remover,Statuschangeeditdata,statuschangeeditHandler,statuschangeHandler,StatusFilterCriteria} from "../../../../store/Store";
import { FaCheck, FaEdit, FaReadme } from 'react-icons/fa';
import  Statuschangedit from "../../../Storage/management/StatusChange/Statuschangedit";
import { Label, Input } from "reactstrap";

import Swal from "sweetalert2";

import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
  IoSearch,
  IoInformationCircle,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { properties } from "../../../../Properties/Properties";
import axios from "axios";
import { STATUS_CHANGE } from '../../../../store/RoleBased';
const getlistofcontentonlystatus =
  properties.Port + properties.getlistofcontentonlystatus;
  const getListOfFilterDataForChangeStatus =
  properties.Port + properties.getListOfFilterDataForChangeStatus;
  const getListOfContentStatus =
  properties.Port + properties.getListOfContentStatus;
  const getListOfMotiveStockForContentStatus =
  properties.Port + properties.getListOfMotiveStockForContentStatus;
  const changeContentStatus =
  properties.Port + properties.changeContentStatus;

class Statuschangelist extends Component {


    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          siloloadingedit:false,
          contentArr:[],
          ListOfContentStatus: [],
          contentStatusId:"",
          codeMotiveL3:"101",
          ListOfmotivestock:[],
          idContents:[],
          newStatus:"0",
          // listofviewcellaccessibilitybeans: [],
          //  useLocation: '',
          // versionLock: 0,
          // index: [],
          // selected: [],
          // Beans: [],
          // errormsg:""

        };
      }


componentDidMount=()=>{
  this.getlistofcontentonlystatus();
  this.getListofContentStatus();
  this.getListOfMotiveStockForContentStatus();



if(Statuschangedata.length!==0)
{

this.setState({
data:Statuschangedata

})

}else{

this.setState({
data:this.props.data

})

}

}
getListofContentStatus = (events) => {
  console.log("getListofContentStatus handler by uzmiiiiiiiiiiiiiiiiiiiiiii");
  axios.get(getListOfContentStatus)
  
    .then((response) => {
      if (response.status === 200 && response.data.length !== 0) {
        console.log("resposne success ListOfContentStatus =>", response.data);
        this.setState({
          ListOfContentStatus: response.data,
          loading:false
        });
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        loading:false
      })
    });
};

getListOfMotiveStockForContentStatus = (events) => {
  console.log("getListOfMotiveStockForContentStatus handler by uzmmmmaa");
  axios.post(getListOfMotiveStockForContentStatus)
  
    .then((response) => {
      if (response.status === 200 && response.data.length !== 0) {
        console.log("resposne success ListOfmotivestock =>", response.data);
        this.setState({
          ListOfmotivestock: response.data,
          loading:false
        });
      }
    })
    .catch((error) => {
      console.log(error);
      this.setState({
        loading:false
      })
    });
};

saveHandler(){
  Swal.fire({
      title: 'Confirmation?',
      text: "Do u confirm the modification",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'gray',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes, do it!'
    }).then((result) => {
      if (result.value) {
        // axios.post(palletMovementConfirmValidation, this.state);{
        // }
        console.log("uzmmmiiiiiiii" , this.state  );
        axios
        .post(changeContentStatus, this.state)
        .then((response) => {
          this.criteriaFilterMethod();
          Swal.fire("Validated Successfully");
          console.log("response 200 successs");
        })
  
        .catch((error) => {

          console.log("pallllllet error",error);
          this.setState({
              exceptionmsg :error.response.data.message
            })
        });
        
      }
    })    
}

onChangeHandler = (event) => {
  console.log("onchange caling ");
  this.setState({
    [event.target.name]: event.target.value,
  });
};
 refreshhandler=()=>{
   console.log("caling refresh handler");
   this.criteriaFilterMethod();
 }

criteriaFilterMethod = () => {
  console.log("calling criteriaFilterMethod", StatusFilterCriteria);
  axios
    .post(getListOfFilterDataForChangeStatus, StatusFilterCriteria, {
      params: {
        limit: StatusFilterCriteria.limit,
      },
    })

    .then((response) => {
      if (response.status === 200 && response.data.length !== 0) {
        console.log("resposne success", response.data);
        this.setState({
          data: response.data,
          status: true,
        });
        statuschangeHandler(response.data);
      } else {
        this.setState({
          status: true,
          data: [],
        });
        statuschangeHandler(response.data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

backHandler=()=>{
  console.log("calling backhandler")
remover("Statuses change")
this.props.backHandler()

}



editHandler=(props)=>{
  this.setState({
      siloloadingedit: true,
  })
  statuschangeeditHandler(props)
}


editClosehandler=()=>{
  this.setState({
      siloloadingedit: false,
  })
}

contentStatus=(id)=>{
  
  for(let i=0;i<this.state.contentArr.length;i++){
    if(this.state.contentArr[i].content_Status_id===id){
      return this.state.contentArr[i].description;
    }
  }
  
}


// selectAll = (events) => {
//   console.log("Selected all change =>", events.target.checked);
//   const array = [];
//   if (events.target.checked === true) {
//     for (let i = 0; i < this.state.data.length; i++) {
//       array.push(this.state.data[i]);
//     }
//     this.setState(
//       {
//         Beans: array,
//       },
//       () => console.log("selected all=>", this.state.Beans)
//     );
//   } else {
//     this.setState({
//       Beans: [],
//     });
//   }
// };

getlistofcontentonlystatus = () => {

  axios
    .get(getlistofcontentonlystatus)
    .then((response) => {
      if (response.status === 200) {
        
        this.setState({
          contentArr: response.data,
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

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
              accessor: "Edit",
              filterable: false,
              Cell: (props) => {
                return (
                  <FaEdit
                    style={{ height: "1.0em", width: "1.0em", cursor: "pointer" }}
                    color="primary"
                    onClick={() => this.editHandler(props.original)}
                  >
                    Edit
                  </FaEdit>
                  
                );
              },
            },
           

         {
               Header: "Stock content no",
               accessor: "idContentStk",
         },
         {
           Header: "Content no",
           accessor: "idContent",
         },
         {
          Header: "Container No",
          accessor: "idContainer",
        },
         {
           Header: "Location",
          //  accessor: "idLocation",
          Cell: (props) => {
            return <div>{
              props.original.idlocationSilo != null
                  ? props.original.idlocationSilo.replace("19@", "")
                  : ""}</div>;
          }
         },
         {
           Header: "Content status",
           accessor: "contentStatusId",
           Cell:(props)=>{
            return(
              <div>{this.contentStatus(props.original.contentStatusId)}</div>
            )
          }
         },
         {
           Header: "Type",
           accessor: "typeContent",
           Cell:(props)=>{
            return(
              <text>
                {
                  props.original.typeContent===100?<span>Stock</span>:
                  props.original.typeContent===200?<span>Picking</span>:
                  props.original.typeContent===300?<span>Picking Dynamic</span>:
                  props.original.typeContent===600?<span>Prepration</span>:null
                }
              </text>
            )
          }
          
         },
         {
           Header: "Container status",
           accessor: "statusContainer",
           Cell: (props) => {
            return (
              <span>
                {props.original.statusContainer === 500 ? (
                  <font>Validated</font>
                ) : (
                  ""
                )}
              </span>
            );
          },
         },

         {
             Header: "Container type",
             accessor: "typeContainer",
             Cell: (props) => {
              return (
                <span>
                  {props.original.typeContainer === 100 ? (
                    <font>_Pallet_</font>
                  ) : (
                    ""
                  )}
                </span>
              );
            },
           },
           {
             Header: "Product company",
             accessor: "idCompany",
           },
           {
             Header: "Product ID",
             accessor: "idProduct",
           },
           {
             Header: "Product Description",
             accessor: "description",
           },
           {
             Header: "Product unit",
             accessor: "descriptionUnit",
           },
           {
             Header: "Quantity unit",
             accessor: "coefUnit",
           },

           {
             Header: "Intermediate material code ",
             accessor: "zInterMaterialCode",
           },
           {
             Header: "Grade",
             accessor: "zGrade",
           },
           {
             Header: "Logistic unit iD",
             accessor: "idLogisticUnit",
           },
           {
             Header: "Batch",
             accessor: "batch",
           },
           {
             Header: "Quantity",
             accessor: "quantityCoefUnit",
           },

           {
            Header: "Version",
            accessor: "versionLock",
          },
          {
            Header: "Modified Date",
            accessor: "mDate",
            // Cell: (props) => {
            //   return (
            //     <span>
            //       {props.original.mDate === undefined
            //         ? ""
            //         : props.original.mDate === null
            //         ? ""
            //         : props.original.mDate === ""
            //         ? ""
            //         : props.original.mDate
            //             .replace("T", " ")
            //           }
            //     </span>
            //   );
            // },
          },
          {
            Header: "Modified by",
            accessor: "mUserName",
          },
           {
             Header: "Reserved quantity",
             accessor: "qtyReservedCoefUnit",
           },
           {
             Header: "Expected quantity",
             accessor: "idExpectedCoefUnit",
           },
           {
            Header: "Version",
            accessor: "versionLock",
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
            Header: "Modified by",
            accessor: "mUserName",
          },
       ];

        return (
            <React.Fragment>
{this.state.siloloadingedit=== true||Statuschangeeditdata.length!==0?
            <Statuschangedit editClosehandler={this.editClosehandler}/>:
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
                    <a style={{ cursor: "pointer" }} onClick={this.backHandler}>Status search</a>
                  </b>
                </u>
                    &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Change content Status</a>
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
             <div><br/>
              </div>


               <ReactTable
                  className="-striped -highlight "
                //   data={this.state.data}
                data={this.state.data.length === 0
                  ? this.props.data
                  : this.state.data
                  }

                  columns={columns}
                  defaultPageSize={5}
                  //showPaginationTop= {true}
                  filterable
                  defaultFilterMethod={this.filterCaseInsensitive}
                  getTrProps={(state, rowInfo, column) => {
                    return {
                      onClick: (e) => {
                        console.log("selected==>", rowInfo.original.idContent);
                        var a = this.state.idContents.indexOf(
                          rowInfo.original.idContent
                        );
  
                        if (a == -1) {
                          this.setState(
                            {
                              idContents: [
                                ...this.state.idContents,
                                rowInfo.original.idContent,
                              ],
                            },
                            () => {
                              console.log(
                                "containerid=>",
                                this.state.idContents
                              );
                            }
                          );
                          // Pass props to the React component
                        }
  
                        var array = this.state.idContents;
  
                        if (a != -1) {
                          array.splice(a, 1);
                          this.setState({ idContents: array });
                        }
                      },
                      style: {
                        background:
                          rowInfo !== undefined
                            ? this.state.idContents.findIndex(
                                (data) => data === rowInfo.original.idContent
                              ) != -1
                              ? "#C8C8C8"
                              : ""
                            : null,
                      },
                      // #393740 - Lighter, selected row
                      // #302f36 - Darker, not selected row
                      // style: {
                      //   background:
                      //     this.state.containerid.indexOf(
                      //       rowInfo.original.containerNo
                      //     ) != -1
                      //       ? "#C8C8C8"
                      //       : "",
                      // },
                    };
                  }}
                />
              <Row style={{ marginTop: "10px" }}>
             
                <Col>
                  <Label>Status</Label>
                </Col>
                <Col>
                  {" "}
                  <Input
                    type="select"
                    name="newStatus"
                    onChange={this.onChangeHandler}
                    bsSize="sm"
                    disabled={STATUS_CHANGE !==2}
                   
                  
                  >
                     {this.state.ListOfContentStatus.map((data) => (
                    <option
                      value={data.content_Status_id}
                      key={data.content_Status_id}
                    >
                      {data.description}
                    </option>
                  ))}
                  </Input>
                </Col>
                <Col>
                  <Label>Motive</Label>
                </Col>
                <Col>
                  <Input
                    type="select"
                    name="codeMotiveL3"
                    value={this.state.codeMotiveL3}
                    bsSize="sm"
                    onChange={this.onChangeHandler}
                    disabled={STATUS_CHANGE !==2}
                  >
                   {this.state.ListOfmotivestock.map((data) => (
                    <option
                      value={data.codeMotiveL3}
                      key={data.codeMotiveL3}
                    >
                      {data.description}
                    </option>
                  ))}
                  </Input>
                </Col>
                <Col></Col>
               
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Comment</Label>
                </Col>

                <Col>
                  <Input
                    type="input"
                    name="cellAllocation"
                    value={this.state.cellAllocation}
                    bsSize="sm"
                    disabled={STATUS_CHANGE !==2}
                    onChange={this.changeHandler}
                  >

                  </Input>
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                </Row>
                  <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                  <Row>
                   
                      <Col>
                      { STATUS_CHANGE === 2?
                      <div>
                      <Button 
                   onClick={()=>this.saveHandler()}
                  style={{marginTop:"10px",float:"left"}}
                  size="sm"
                >
                  {" "}
                  Change
                </Button>
                </div>
                :''}
                </Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col></Col>
                      <Col><span style={{color:"lightgreen",
                    }}
                    
                    >
                        <b style={{color:"black",
                    marginRight:"5px"}}> <IoInformationCircle/></b><u><b>filters</b></u></span></Col>
                   
                                
            </Row>
              </div>


                <Row style={{ marginTop: "10px" ,
              
            }}>

              
              <br />

                </Row>
</div>}
            </React.Fragment>
          );
        }
}

export default Statuschangelist;