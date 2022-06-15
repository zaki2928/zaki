import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Label, Input} from "reactstrap";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { RackDispEditHandler, RackDisplayData, RackDisplayHandler,
   remover, RackDispEditData,RackDispNewData,RackDispNewHandler,RackCriteria } from '../../../../store/Store';
import { FaPrint, FaFileExport ,FaFileSignature} from "react-icons/fa";
import RackDisplayEdit from './RackDisplayEdit';
import Swal from "sweetalert2";
import RackDisplayNew from './RackDisplayNew';
import axios from 'axios';
import { properties } from '../../../../Properties/Properties';
import { nesteddisplayhandler, nesteddisplaydata } from '../../../../store/Store';
import { RACK_PROFILE } from '../../../../store/RoleBased';
const getListOfRackProfile = properties.Port + properties.getListOfRackProfile;
const getListOfProfileLineByIdRackCell = properties.Port + properties.getListOfProfileLineByIdRackCell;
const deletekProfileLine= properties .Port + properties.deletekProfileLine;
class RackDisplay extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: [],
          orderEdit: false,
          orderDisplay: false,
          isdisplaydata: [],
          editDisp: false,
          editDisplayArr: [],
          newDisp:false,
          newDisplayArr: [],
          description:""
          
        };
      }

      componentWillUnmount(){
        console.log("comp callin in display by   nesteddisplaydata", nesteddisplaydata.idProfilCellRack)
      }
      componentDidMount(){
        console.log("comp callin in display by  RackDisplayData", RackDisplayData)
        if (RackDisplayData.length !== 0) {
          console.log("length is not zero +++++++++++++++++++++++++++++++++++++", RackDisplayData);
            this.setState({
              description:RackDisplayData.description,
            });
        }

       
      }
        displayHandler = (props) => {
          console.log("displayyyyyyyyyyyyyyyyy===== display handler calling");
          RackDisplayHandler(props);
          this.setState({
            orderDisplay: true,
            isdisplaydata: props,
            orderEdit: false,
          });
        };

        displayCloseHandler = (props) => {
          console.log("============ edit handler calling");
      
          this.setState({
            orderDisplay: false,
          });
        };

      
      backHandler=()=>{
        console.log("calling back handler for list")
        remover("RackDisplay")
        this.props.displayCloseHandler()
      }

      editDisplayHandler=(props)=>{
        console.log("check props dataaaaaa")
        this.setState({
           editDisp: true,
            
        })
        console.log(props)
        this.state.editDisplayArr.push(props)
        RackDispEditHandler(props)
      }

      editDiplayClosehandler=()=>{
        this.setState({
          editDisp: false,
        })
    }
    newDisplayHandler=(props)=>{
      console.log("check props dataaaaaa")
      this.setState({
         newDisp: true,
          
      })
      console.log(props)
      this.state.newDisplayArr.push(props)
      RackDispNewHandler(props)
    }
    newDiplayClosehandler=(data)=>{
      console.log("newdisplay close handler calling",data)
      this.setState({
        newDisp: false,
        data: data,

      });
  };

  
  getListOfProfileLineByIdRackCell = (id) => {
    console.log(" calling getListOfProfileLineByIdRackCell", id);
  
    axios
      .post(getListOfProfileLineByIdRackCell + id)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success logistic unit ", response.data);
          this.setState({
            data: response.data,
            description: RackDisplayData.description,
            
          });

        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  
  deleteHandler(props){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'gray',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        console.log("delete id =======", props)
        axios.post(deletekProfileLine + props.idProfilCrLine)
        .then((response) => {
            console.log("my data", response);
            if (response.status === 200) {
              console.log("response  success");
              this.refreshHandler();
            }
          })
        .catch((error) => {
            console.log(error);
        });
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  }
  refreshHandler = () => {
    console.log("checking vale------------------------------>>", RackCriteria);
  
    axios
      .post(getListOfRackProfile, RackCriteria, {
        params: {
          limit: RackCriteria.limit,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log(
            "resposne successsssssssssssss===================>",
            response.data
          );
  
          this.setState({
            data: response.data,
          });
        } else {
          this.setState({
            data: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
                Header: 'Delete',
                show: RACK_PROFILE === 2? true: false,
                accessor: "Delete",
                filterable:false,
                Cell: (props) => {
                  return (
                    <div>
                      <FaTrashAlt
                  
                        onClick={() => this.deleteHandler(props.original)}
                      >
                        Delete
                      </FaTrashAlt>
                    </div>
                  );
                },
              
            },
              
          {
            Header: "ID",
            accessor: "idProfilCrLine",
          },
          {
            Header: "Packaging",
            accessor: "idPackaging",
          },
          {
            Header: "No of containers",
            accessor: "numberOfContainer",
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
            Header: "Modified by",
            accessor: "mUsername",
          },
        ];
        return (
            <React.Fragment>
              {this.state.editDisp === true || RackDispEditData.length !== 0 ? 
              <RackDisplayEdit editDisplayArr={this.state.editDisplayArr} editDiplayClosehandler={this.editDiplayClosehandler}/> :
              this.state.newDisp === true || RackDispNewData.length !== 0 ? 
              <RackDisplayNew  newDiplayClosehandler={this.newDiplayClosehandler}/> :
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
                        <a>Home</a>
                      </b>
                    </u>{" "}
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}} onClick={this.backHandler}>Cell Racks Profile Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}}onClick={this.backHandler}>Cell Racks Profile Management</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a style={{cursor:"pointer"}}>Cell Racks Profile Line Management</a>
                      </b>
                    </u>
                  </span>
  <br />
  
 <Row style={{ marginTop: "10px" }}>
                    <Col>
                      <Label>Description</Label>{" "}
                    </Col>
                    <Col>
                      {" "}
                      <input value={this.state.description} />
                    </Col>
               
    
                    
                    <Col>
                      {/* <Label>Name</Label>{" "} */}
                    </Col>
                    
                    <Col>
                      {/* {" "}
                      <Input bsSize="sm" /> */}
                    </Col>
                    <Col> </Col>
                  </Row>
                  <hr/>
                  <div class="row-xs-6 bottom-row ">
                    {RACK_PROFILE === 2?
                    <div>
  <FaFileSignature
                  
                  //   onClick={() => this.edithandler(props.original)}
                  >
                    
                  </FaFileSignature>{" "}
  {/* <button >Configure</button> */}
  <span style={{cursor:"pointer"}} 
  onClick={this.newDisplayHandler}
  >New</span>{" "}
  </div>
  :''}
                <FaPrint
                  
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaPrint>{" "}
<a style={{cursor:"pointer"}}>Print</a>{" "}
<FaFileExport
                 
                //   onClick={() => this.edithandler(props.original)}
                >
                  
                </FaFileExport>{" "}
<a style={{cursor:"pointer"}}>Export</a>{" "}


 </div>
                  
       <div>
          <hr/>
          <ReactTable
            className="-striped -highlight "
            // data={this.state.data.length === 0
            //   ? this.props.isdisplaydata : this.state.data
            // }
            data={nesteddisplaydata}
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

export default RackDisplay;