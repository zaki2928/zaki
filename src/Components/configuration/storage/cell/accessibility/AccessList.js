import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { AccessData, AccessHandler, CellAccessCriteria, remover, cellaccessid } from '../../../../../store/Store';
import { FaPrint, FaFileExport, FaCalendarCheck } from 'react-icons/fa';
import axios from 'axios'
import {
  Label,
  Input,

} from "reactstrap";
import Swal from "sweetalert2";
import { properties } from '../../../../../Properties/Properties';
import { CELL_ACCESSIBILITY } from '../../../../../store/RoleBased';

const getListOfCellAccessByFilterCriteria = properties.Port + properties.getListOfCellAccessByFilterCriteria
const updateRegionCellAccessibilityByIds = properties.Port + properties.updateRegionCellAccessibilityByIds
class AccessList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listofviewcellaccessibilitybeans: [],
      data: [],

      useLocation: '',
      versionLock: 0,
      index: [],
      selected: [],
      Beans: [],
      errormsg:"",
      errormsg2:"",

    };
  }
  addData = (data) => {
    console.log("add ata calling ", data)
    const Beans = {
      allocationCell: data.allocationCell,
      availability: data.availability,
      descCellRack: data.descCellRack,
      descColumn: data.descColumn,
      descIndex: data.descIndex,
      descLevel: data.descLevel,
      descRegion: data.descRegion,
      description: data.description,
      idCell: data.idCell,
      idLocationStk: data.idLocationStk,
      idProfilFamily: data.idProfilFamily,
      idRegionCellLS: data.idRegionCellLS,
      idWarehouse: data.idWarehouse,
      descAisle: data.descAisle,

      // mDate: data.mDate,
      mDateLoc: data.mDateLoc,
      mUsername: data.mUsername,
      mUsernameLoc: data.mUsernameLoc,
      typeCell: data.typeCell,
      useLocation: data.useLocation,
      weight: data.weight,
      versionLock: data.versionLock,
    }

    this.state.listofviewcellaccessibilitybeans.push(Beans)
    //  this.setState({

    //  })
    console.log("check datra===>", this.state.listofviewcellaccessibilitybeans)

  }

  criteriaFilterMethod = () => {
    console.log("testttingggggggggggggggggggggggggggggg calling");
    axios
      .post(getListOfCellAccessByFilterCriteria, CellAccessCriteria, {
        params: {
          limit: CellAccessCriteria.limit,
        },
      })

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne successsssssssssssss", response.data);
          this.setState({
            data: response.data,
          });
          AccessHandler(response.data);
        } else {
          this.setState({
            data: [],
          });
          AccessHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  refreshhandler = () => {
    console.log("referesh handler calling");
    this.setState({
      errormsg2: "",
      errormsg: ""
    });
    this.criteriaFilterMethod();
  };

  cellAccessModeficationmethod = () => {
    this.setState({
      useLocation: this.state.useLocation,
      listofviewcellaccessibilitybeans: this.state.Beans,
      Beans: []

    }, () => {
      console.log("dataaaaaaaaaaaaaaa=>", this.state)
      // data={

      // }
      axios
        .post(updateRegionCellAccessibilityByIds, this.state)

        .then((response) => {

        })
        .catch((error) => {
          console.log(error);
        });
    })


  };

  validateHandler = () => {
    
    if(this.state.Beans.length != 0){
      this.setState({
        errormsg: ""
      });
      if (this.state.useLocation != '') {
        this.setState({
          errormsg2: ""
        });
    Swal.fire({
      title: 'Confirmation',
      text: "Do you confirm the modification?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'gray',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes',

    }).then((result) => {

      if (result.value) {
        this.cellAccessModeficationmethod()
        console.log("before refresh")
        this.componentDidMount();
        this.refreshhandler();
        console.log("after refresh")
        // .then((response) => {
          // this.criteriaFilterMethod();
        console.log("confirmmmmmmmmmmmmm", result)
        // this.cellAccessModeficationmethod
        Swal.fire(
          'Modified!',
          'Your file has been Modified.',
          'success'
          
        )
        // })
    // .catch((error) => {

    //   console.log("uzmiiiiiiiiiiiiiii error",error);
    // }
        
  }
      // )}
})
    
  }else {
    this.setState({
      errormsg2: "Please select Use Location.",
    });
  }
}
  else{
    this.setState({
      errormsg2: "",
      errormsg :"Please select atleast one row."
    })
  }
}
  componentDidMount = () => {
    if (AccessData.length !== 0) {
      console.log(AccessData.length)
      this.setState({
        data: AccessData
      })
    } else {

      this.setState({
        data: this.props.data
      })
    }
  }

  componentWillMount = () => {
    console.log("component will mount ");
    console.log("will calling from lst page ", AccessData);
    console.log(
      "com calling from lst page---------------------------mmmmm ",

    );
    if (AccessData.length === 0) {
      this.setState({
        data: this.props.data,
      });
    } else {
      this.setState(
        {
          data: AccessData,

        }
      );
    }
  };

  selectAll = (events) => {
    console.log("Selected all change =>", events.target.checked);
    const array = [];
    if (events.target.checked === true) {
      for (let i = 0; i < this.state.data.length; i++) {
        array.push(this.state.data[i]);
      }
      this.setState(
        {
          Beans: array,
        },
        () => console.log("selected all=>", this.state.Beans)
      );
    } else {
      this.setState({
        Beans: [],
      });
    }
  };

  backHandler = () => {
    remover(cellaccessid)
    this.props.backHandler()
  }

  onChangehandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
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
      // {
      //   Header: "Select",
      //   Cell: (props) => {
      //     return (
      //       <input type="checkbox" onClick={() => this.addData(props.original)}>

      //       </input>
      //     );
      //   },
      // },
      {
        Header: "ID",
        accessor: "idRegionCellLS",
      },
      {
        Header: "Warehouse",
        accessor: "idWarehouse",
      },
      {
        Header: "Region Description",
        accessor: "description",
      },
      {
        Header: "Cell Description",
        accessor: "cellDesc",
      },
      {
        Header: "Cell Type",
        accessor: "typeCell",
        Cell: (props) => {
          return (
            <text>
              {
                props.original.typeCell === 100 ? <span>_Stock_</span> : props.original.typeCell === 200 ? <span>_Overflow_</span> :
                  props.original.typeCell === 300 ? <span>_GoodsIn_</span> : props.original.typeCell === 400 ? <span>_Picking_</span> :
                    props.original.typeCell === 500 ? <span>_Transit_</span> : props.original.typeCell === 600 ? <span>_Prepration_</span> :
                      props.original.typeCell === 700 ? <span>_Shipping_</span> : props.original.typeCell === 800 ? <span>_Cubing_</span> :
                        props.original.typeCell === 900 ? <span>_Launching_</span> : props.original.typeCell === 1100 ? <span>_LogicalResa_</span> :
                          props.original.typeCell === 2000 ? <span>_Destruction_</span> : null
              }
            </text>
          )
        }
      },
      {
        Header: "Cell Allocation",
        accessor:"allocationCell",
        Cell: (props) => {
          return (
            <text>
              {

                props.original.allocationCell === 3 ? <span>Rack</span> :
                  null
              }
            </text>
          )
        }
        // accessor: "allocationCell",
      },
      {
        Header: "Family Profile Description",
        accessor:"idProfilFamilys",
        Cell: (props) => {
          return (
            <text>
              {

                props.original.idProfilFamily === 10 ? <span>No restriction</span> : props.original.idProfilFamily === -1 ? <span>N/A</span> :
                  null
              }
            </text>
          )
        }
        // accessor: "idProfilFamily",
      },
      {
        Header: "Weight(kg)",
        accessor: "weight",
      },
      {
        Header: "Region",
        accessor: "descRegion",
      },
      {
        Header: "Aisle",
        accessor: "descAisle",
      },
      {
        Header: "Column",
        accessor: "descColumn",
      },
      {
        Header: "Level",
        accessor: "descLevel",
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
                    // .substring(0, props.original.mDate.lastIndexOf("."))}
                    }
            </span>
          );
        },
      },
      {
        Header: "Modified By",
        accessor: "mUsername",
      },
      {
        Header: "Index",
        accessor: "descIndex",
      },
      {
        Header: "Location",
        accessor: "idLocationStk",
        Cell: (props) => {
          return <div>{
            props.original.idLocationStk != null
                ? props.original.idLocationStk.replace("19@", "")
                : ""}</div>;
        },
      },
      {
        Header: "Use Location",
        Cell: (props) => {
          return (
            <text>
              {

                props.original.useLocation === 300 ? <span>_Inout_</span> : props.original.useLocation === 400 ? <span>_No Access_</span> :
                  null
              }
            </text>
          )
        }
        // accessor: "useLocation",
      },
      {
        Header: "Availability",
        Cell: (props) => {
          return (
            <text>
              {
                props.original.availability === 100 ? <span>_Free_</span> : props.original.availability === 200 ? <span>_Busy_</span> :
                  props.original.availability === 300 ? <span>_Reserved_</span> : props.original.availability === 400 ? <span>_Non relevent_</span> :
                     null
              }
            </text>
          )
        }
        // accessor: "availability",
      },
      {
        Header: "Loaction Modified Date",
        accessor: "mDateLoc",
        Cell: (props) => {
          return (
            <span>
              {props.original. mDateLoc === undefined
                ? ""
                : props.original. mDateLoc === null
                ? ""
                : props.original. mDateLoc === ""
                ? ""
                : props.original. mDateLoc
                    .replace("T", " ")
                    }
            </span>
          );
        },
      },
      {
        Header: "Loaction Modified By",
        accessor: "mUsernameLoc",
      },
      {
        Header: "Version",
        accessor: "versionLock",
      },
      {
        Header: "Rack Profile",
        accessor: "descCellRack",
      },
    ];
    return (
      <React.Fragment>
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
                <a style={{cursor:"pointer"}}onClick={this.backHandler}>Cells Accessibility Search</a>
              </b>
            </u>
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a style={{cursor:"pointer"}}>Cells Accessibility</a>
              </b>
            </u>
          </span>
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
          {/* <br /> */}
        </div>
        <div style={{ marginTop: "5px" }} class="row-xs-6 bottom-row ">
          <input type="checkbox" id="myid" onChange={this.selectAll}></input>
          {" "}
          <a style={{cursor:"pointer"}}>Select All </a>{" "}

          <FaCalendarCheck

          //   onClick={() => this.edithandler(props.original)}
          >

          </FaCalendarCheck>{" "}
          {/* <button >Configure</button> */}
          <a style={{cursor:"pointer"}}>Validate Selection</a>{" "}



          <FaPrint

          //   onClick={() => this.edithandler(props.original)}
          >

          </FaPrint>{" "}
          <a style={{cursor:"pointer"}}>Print</a>{" "}
          <FaFileExport

          //   onClick={() => this.edithandler(props.original)}
          >

          </FaFileExport>{" "}
          <a style={{cursor:"pointer"}}>Export</a>
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
          getTrProps={(state, rowInfo, column) => {
            return {
              onClick: (e) => {
                console.log("selected==>", rowInfo);
                var a = this.state.Beans.findIndex((data) => rowInfo.original.idRegionCellLS === data.idRegionCellLS);

                console.log("prointing AAAA", a)
                if (a == -1) {
                  this.setState({
                    Beans: [...this.state.Beans, rowInfo.original],
                  }, () => { console.log("this.state.beansssss", this.state.Beans) });
                  // Pass props to the React component
                }

                var array = this.state.Beans;

                if (a != -1) {

                  array.splice(a, 1);
                  this.setState({ Beans: array },
                    () => { console.log("this.state.beansssss", this.state.Beans) }

                  );
                }
              },
              // #393740 - Lighter, selected row
              // #302f36 - Darker, not selected row
              style: {
                background:
                  rowInfo !== undefined ?
                    this.state.Beans.findIndex((data) => data.idRegionCellLS === rowInfo.original.idRegionCellLS) != -1
                      ? "#C8C8C8"
                      : ""
                    :
                    null
              },
            };
          }}
        />
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <Label>Use Location</Label>{" "}
          </Col>
          <Col>
            {" "}
            <Input
              type="select"
              name="useLocation"
              onChange={this.onChangehandler}
              value={this.state.useLocation}
              disabled={CELL_ACCESSIBILITY !==2}
              // style={{ width: "60px" }}
              bsSize="sm"
            >
              <option value="">---select----</option>
              <option value="300">_In_Out_</option>
              <option value="400">_No_Access_</option>


            </Input>
          </Col>


          <Col>
          {CELL_ACCESSIBILITY ===2 ? 
          <Button style={{ marginBottom: "10px" }}
            onClick={this.validateHandler}
          // onClick={() => this.cellAccessModeficationmethod()}
          >
            {" "}
            Modification
          </Button>            
               : ''}   
          </Col>
          {/* {/* <Col></Col> */}
          <Col>{
                    this.state.Beans.length ===0 ?<span style={{
                      color:"red",
                      fontWeight: "bold"
                    }}>
                    {
                    this.state.errormsg
                    }
                    </span>:""
                  }{
                    this.state.useLocation ==='' ?<span style={{
                      color:"red",
                      fontWeight: "bold"
                    }}>
                    {
                    this.state.errormsg2
                    }
                    </span>:""
                  }</Col> 
          <Col></Col>
        </Row>
      </React.Fragment>

    );
  }
}

export default AccessList;