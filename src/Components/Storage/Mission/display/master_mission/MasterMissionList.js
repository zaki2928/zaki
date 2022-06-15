import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import { MasterMissionCriteria, MasterMissionData, MasterMissionHandler, remover } from '../../../../../store/Store';
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { FaCog, FaSdCard } from 'react-icons/fa';
import { FaRegShareSquare } from 'react-icons/fa';
import { FaPrint, FaFileExport, FaCalendarCheck, FaEdit } from 'react-icons/fa';
import {
  Label,
  Input,

} from "reactstrap";
import Swal from "sweetalert2";
import axios from "axios";
import { properties } from '../../../../../Properties/Properties';
import { MASTER_MISSION } from '../../../../../store/RoleBased';

const updateMasterMission = properties.Port + properties.updateMasterMission
const getListOfMasterMissionByFilterCriteria = properties.Port + properties.getListOfMasterMissionByFilterCriteria
const getListOfDescriptionEntities = properties.Port + properties.getListOfDescriptionEntities

class MasterMissionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      descArr:[],
      idTarget:'',
      description:'',
      listOfMissionBeanViews: [],

      idTargetMisDistr: '',
      versionLock: 0,
      index: [],
      selected: [],
      Beans: [],
      errormsg:"",
    };
  }

  validateHandler=()=> {

    if(this.state.Beans.length !=0){
      this.setState({
        errormsg: ""
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

        this.MasterMissionModeficationmethod()
        console.log("confirmmmmmmmmmmmmm", result)
        // this.cellAccessModeficationmethod
        Swal.fire(
          'Modified!',
          'Your data has been Modified.',
          'success'
        )
      }
    })
  }
  else{
    this.setState({
      errormsg :"Please select atleast one row."
    })
  }
  }

  refreshhandler = () => {
    console.log("referesh handler calling");
    this.setState({
      errormsg: ""
    });
    this.criteriaFilterMethod();
  };

  MasterMissionModeficationmethod = () => {
    this.setState({
      idTargetMisDistr: this.state.idTargetMisDistr,
      listOfMissionBeanViews: this.state.Beans,
      Beans: []

    }, () => {
      console.log("dataaaaaaaaaaaaaaa=>", this.state)
      axios
        .post(updateMasterMission, this.state)

        .then((response) => {

        })
        .catch((error) => {
          console.log(error);
        });
    })


  };

  addData = (data) => {
    console.log("add ata calling ", data)
    const Beans = {
      idMission: data,
      idResaContainer: data,
      idResaContent: data,
      missionIndex: data,
     missionMode: data,
     numMission: data,
      priority: data,
      typeMvt: data,
      useUnmarkedContainer: data,
      printable: data,
      statusMission: data,
      typeContainer: data,
      typeContainerChoice: data,
      typeDestinationChoice: data,
      mDate: data,
      creationDate: data,
      executionDate: data,
     startingDate: data,
     mUsername: data,
      userTreatLogin: data,
     idLocationStkDisplay: data,
      idLocationStk: data,
     idWarehouseFrom: data,
     idWarehouseTo: data,
     versionLock: data,
     allocationCell: data,
      typeCell: data,
      useLocation: data,
      idRegion: data,
      idRegionCell: data,
      idLocation: data,
     descIndex: data,
     height: data,
     length: data,
     width: data,
     idReservation: data,
      idMovement: data,
     missionClass: data,
     statusProgress: data,
     commentaryIc: data,
     cUsernameIc: data,
     wsNameIc: data,
     reference: data,
     idContainerStk: data,
     cDateIc: data,
     batch:data,
     typeContainerChoice:data,
     idProduct:data ,
   description:data ,
     zIMC:data ,
     zGrade :data,
     pcreationDate:data,
      listFilterBean: [],
      palletToTake:data,
      encode:data,
      originMasters:data,
      idMissionAM: data,
      zIdLocationOriginMaster:data,
      idTargetMisDistr: data,
      zIdContainerMaster: data,
      zIdContainerSelected1: data,
      zIdContainerSelected2: data,
      zIdContainerSelected3: data,
      zIdContainerSelected4: data,
      zIdContainerSelected5: data,
      zIdContainerSelected6: data,
      versionLock: data,
      idMission: data,
      numMission: data,
      idWarehouseFrom: data,
      idWarehouseTo: data,
      idLocationStkDisplay: data,
      priority: data,
      statusMission: data,
      mDate: data,
      mUsername: data,
      klsVersionLock: data,
      creationDate: data,
      userTreatLogin: data,
      zSabicDelivId: data,
      zSabicOrderId: data,
      zSkDelivId: data,
      zSkOrderId: data,
      idPrepOrder: data,
      distributedSk:data,
    }

    this.state.listOfMissionBeanViews.push(Beans)
    //  this.setState({

    //  })
    console.log("check datra===>", this.state.listOfMissionBeanViews)

  }

  criteriaFilterMethod = () => {
    console.log("testttingggggggggggggggggggggggggggggg calling");
    axios
      .post(getListOfMasterMissionByFilterCriteria, MasterMissionCriteria, {
        params: {
          limit: MasterMissionCriteria.limit,
        },
      })

      .then((response) => {
        if (response.status === 200) {
          console.log("resposne successsssssssssssss", response.data);
          this.setState({
            data: response.data,
          });
          MasterMissionHandler(response.data);
        } else {
          this.setState({
            data: [],
          });
          MasterMissionHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    this.getListOfUserGroupDescriptions();
    if (MasterMissionData.length !== 0) {
      console.log(MasterMissionData.length)
      this.setState({
        data: MasterMissionData
      })
    } else {

      this.setState({
        data: this.props.data
      })
    }
  }

  componentWillMount = () => {
    console.log("component will mount ");
    console.log("will calling from lst page ", MasterMissionData);
    console.log(
      "com calling from lst page---------------------------mmmmm ",

    );
    if (MasterMissionData.length === 0) {
      this.setState({
        data: this.props.data,
      });
    } else {
      this.setState(
        {
          data: MasterMissionData,

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

  onChangehandler = (event) => {
    console.log('calling change handler', this.state.idTargetMisDistr)
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log("[event.target.name]: event.target.value", event.target.value)
  }


  getListOfUserGroupDescriptions = () => {
    console.log("getListOfUserGroupDescriptions calling")

    axios
      .get(getListOfDescriptionEntities)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          this.setState({
            descArr: response.data,
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  backHandler = () => {
    console.log("calling back handler for list")
    remover("Master missions")
    this.props.backHandler()
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
        Header: "ID",
        accessor: "idMissionAM",
      },
      {
        Header: "Mission No",
        accessor: "numMission",
      },
      {
        Header: "Origins",
        accessor: "originMasters",


      },
      {
        Header: "Destination",
        
        accessor: "idLocationStkDisplay",
        Cell: (props) => {
          return <span>{props.original.idLocationStkDisplay.replace("19@","")}</span>;
        },
      },
      {
        Header: "Trolley",
        accessor: "zIdContainerMaster",
      },

      {
        Header: "Preparation Order Id",
        accessor: "idPrepOrder",
      },
      
      {
        Header: "Pallet1",
        accessor: "zIdContainerSelected1",
      },
      {
        Header: "Pallet2",
        accessor: "zIdContainerSelected2",
      },
      {
        Header: "Pallet3",
        accessor: "zIdContainerSelected3",
      },
      {
        Header: "Pallet4",
        accessor: "zIdContainerSelected4",
      },
      {
        Header: "Pallet5",
        accessor: "zIdContainerSelected5",
      },
      {
        Header: "Pallet6",
        accessor: "zIdContainerSelected6",
      },
      {
        Header: "Priority",
        accessor: "priority",
      },
      {
        Header: "Mission ID",
        accessor: "idMission",
      },
      {
        Header: "Pallets to take",
        accessor: "palletToTake",
      },

      {
        Header: "Warehouse From",
        accessor: "idWarehouseFrom",
      },

      {
        Header: "Warehouse To",
        accessor: "idWarehouseTo",
      },

      {
        Header: "Distributed To",
        accessor: "distributedSk",
      },

      {
        Header: "Status",
        accessor: "statusMission",
      },

      {
        Header: "Creation date",
        accessor: "creationDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.creationDate === undefined
                ? ""
                : props.original.creationDate === null
                ? ""
                : props.original.creationDate === ""
                ? ""
                : props.original.creationDate
                    .replace("T", " ")
                    .substring(0, props.original.creationDate.lastIndexOf("."))}
            </span>
          );
        },
      },
 
      {
        Header: "Modified date",
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

      {
        Header: "User Treat",
        accessor: "userTreatLogin",
      },
 

      {
        Header: "Sabic Order Id",
        accessor: "zSabicOrderId",
      },

      {
        Header: "Sabic Delivery Id",
        accessor: "zSabicDelivId",
      },
 
      {
        Header: "Saudi Kayan Order id",
        accessor: "zSkOrderId",
      },
      {
        Header: "Saudi kayan delivery Id",
        accessor: "zSkDelivId",
      },
 

 
 
      // {
      //   Header: "Index",
      //   accessor: "missionIndex",
      // },

      // {
      //   Header: "Mode",
      //   Cell: (props) => {
      //     return (
      //       <text>
      //         {props.original.missionMode === 100 ? <span>Manual</span> : props.original.missionMode === 200 ?<span>Automatic</span> 
      //           :null}
      //       </text>
      //     );
      //   },
      // },
      // {
      //   Header: "Printable",
      //   accessor: "printable",
      //   Cell: (props) => {
      //     return (
      //       <text>
      //         {props.original.printable === 1 ? <span>Yes</span> : props.original.missionMode === 0 ?<span>No</span> 
      //           :null}
      //       </text>
      //     );
      //   },
      // },
      // {
      //   Header: "Movement type",


      //   Cell: (props) => {
      //     return (
      //       <text>
      //         {props.original.typeMvt === 2 ? <span>Container Transfer</span> : props.original.typeMvt === 3 ?<span>Quantity Picking</span> 
      //           :null}
      //       </text>
      //     );
      //   },
      // },
      // {
      //   Header: "Container choice type",
      //   accessor: "typeContainerChoice",


      //   Cell: (props) => {
      //     return (
      //       <text>
      //         {props.original.typeContainerChoice === 2 ? <span>Free</span> : props.original.typeContainerChoice === 1 ?<span>Imposed</span> 
      //           :null}
      //       </text>
      //     );
      //   },
      // },

      // {
      //   Header: "Origin Location",
      //   accessor: "idLocation",
      // },
      // {
      //   Header: "Destination location",
      //   accessor: "idLocationStkDisplay",
      // },

      // {
      //   Header: "Destination choice type",
      //   accessor: "typeDestinationChoice",
      //   Cell: (props) => {
      //     return (
      //       <text>
      //         {props.original.typeDestinationChoice === 2 ? <span>Free</span> : props.original.typeDestinationChoice === 1 ?<span>Imposed</span> 
      //           :null}
      //       </text>
      //     );
      //   },
      // },

      // {
      //   Header: "Container type",
      //   accessor: "typeContainer",
      //   Cell: (props) => {
      //     return (
      //       <text>
      //         {props.original.typeContainer === 100 ? <span>_pallet_</span> : props.original.typeContainer === 200 ?<span>not found</span> 
      //           :null}
      //       </text>
      //     );
      //   },
      // },

      // {
      //   Header: "Mission class",
      //   accessor: "missionClass",
      //   Cell: (props) => {
      //     return (
      //       <text>
      //         {props.original.missionClass === 1 ? <span>_Order_</span> : props.original.missionClass === 2 ?<span>_Preparation_</span> :
      //          props.original.missionClass === 3 ? <span>Stock to Prepare</span>:props.original.missionClass === 4 ? <span>_Replishment_</span> :
      //          props.original.missionClass === 5 ? <span>Preparation</span>:props.original.missionClass === 6 ? <span>_Internal Movement</span> :
      //          props.original.missionClass === 7 ? <span>Box Replacement_</span>:props.original.missionClass === 8 ? <span>_Goods In</span> :
      //          props.original.missionClass === 9 ?<span>_Destruction_</span>:
      //          null}
      //       </text>
      //     );
      //   },
      // },
      // {
      //   Header: "Refrence class mission",
      //   accessor: "reference",
      // },
      // {
      //   Header: "Quantity",
      //   accessor: "modifiedby",
      // },



      // {
      //   Header: "User treat",
      //   accessor: "modifiedby",
      // },
      // {
      //   Header: "Status",
      //   accessor: "statusMission",
      //   Cell: (props) => {
      //     return (
      //       <text>
      //         {props.original.statusMission === 100 ? <span>Created</span> : props.original.statusMission === 200 ?<span>Executed</span> :
      //          props.original.statusMission === 300 ? <span>Executable</span>:props.original.statusMission === 400 ? <span>Cancelled</span> 
      //          :null}
      //       </text>
      //     );
      //   },
      // },
      // {
      //   Header: "Creation date",
      //   accessor: "creationDate",
      //   Cell: (props) => {
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
      //             .substring(0, props.original.mDate.lastIndexOf("."))}
      //     </span>
      //   );
      // },
      
      // },
      // {
      //   Header: "Modified Date",
      //   accessor: "mDate",
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
      //             .substring(0, props.original.mDate.lastIndexOf("."))}
      //     </span>
      //   );
      // },
      // },


      // {
      //   Header: "Modified by",
      //   accessor: "mUsername",
      // },
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
                <a onClick={this.backHandler}>Master Missions Criteria</a>
              </b>
            </u>
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a>Master Missions List</a>
              </b>
            </u>
          </span>
          {/* <br /> */}
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
        </div>
        <div style={{ marginTop: "5px" }} class="row-xs-6 bottom-row ">
          <input type="checkbox" id="myid"  onChange={this.selectAll}></input>
          {" "}
          <a >Select All </a>{" "}

          <FaCalendarCheck

          //   onClick={() => this.edithandler(props.original)}
          >

          </FaCalendarCheck>{" "}
          {/* <button >Configure</button> */}
          <a  >Validate Selection</a>{" "}



          <FaPrint

          //   onClick={() => this.edithandler(props.original)}
          >

          </FaPrint>{" "}
          <a>Print</a>{" "}
          <FaFileExport

          //   onClick={() => this.edithandler(props.original)}
          >

          </FaFileExport>{" "}
          <a >Export</a>
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
                var a = this.state.Beans.findIndex((data) => rowInfo.original.idMissionAM === data.idMissionAM);

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
                  this.state.Beans.findIndex((data) => data.idMissionAM === rowInfo.original.idMissionAM) != -1
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
            <Label>Distributed To</Label>{" "}
          </Col>
          <Col>
            {" "}
            <Input
              type="select"
              name="idTargetMisDistr"
              onChange={this.onChangehandler}
              value={this.state.idTargetMisDistr}
              disabled={MASTER_MISSION !==2}
              // style={{ width: "60px" }}
              bsSize="sm"
            >
              <option value="-1">Without</option>
              {/* {this.state.descArr.map((data)=>) } */}
              {this.state.descArr.map(data=> <option value={data.idTargetMisDistr}>{data.description}</option>)}
            </Input>
          </Col>


          <Col>
          {MASTER_MISSION ===2 ? 
          <Button style={{ marginBottom: "10px" }}
            onClick={this.validateHandler}
          >
            {" "}
            Modification
          </Button>
          : ''}
          </Col>
          <Col>{
                    this.state.Beans.length ===0 ?<span style={{
                      color:"red",
                      fontWeight: "bold"
                    }}>
                    {
                    this.state.errormsg
                    }
                    </span>:""
                  }
          </Col>
          {/* <Col></Col> */}
          <Col></Col>
        </Row>
      </React.Fragment>

    );
  }
}

export default MasterMissionList;