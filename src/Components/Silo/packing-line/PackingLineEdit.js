import React, { Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import {
  Container,
  Row,
  Col,
  Button,
  Label,
  Input,
  FormGroup,
} from "reactstrap";
import { IoIosSettings } from "react-icons/io";
import { MdRestore } from "react-icons/md";
import { MdPrint } from "react-icons/md";
import { TiExport } from "react-icons/ti";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
//import {siloEditdata,remover } from "../../../store/Store";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import PackingLineList from "./PackingLineList";
import {
  PackinglineEditHandler,
  PackinglineEditdata,
  remover,
} from "../../../store/Store";
import { properties } from "../../../Properties/Properties";
const getlistofcontentonlystatus =
  properties.Port + properties.getlistofcontentonlystatus;
const getListOfRepackingLineByPackingLine =
  properties.Port + properties.getListOfRepackingLineByPackingLine;

class PackingLineEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //show:true,
      //show2:false,
      data: [],
      edit: false,
      idPackingLine: "",
      versionLock: "",
      bagNumber: "",
      counterBag: "",
      counterError: "",
      counterFracture: "",
      counterMet: "",
      counterUnweight: "",
      endBatch: "",
      startBatch: "",
      packingLineDcs: "",
      packingLineL3: "",
      idLocationPackingLine: "",
      typePackingLine: "",
      idSiloMt: "",
      mDate: "",
      mUsername: "",
      idSite: "",
      materialType: "",
      zProductType: "",
      contentArr:[],      
    };
  }

  test = (props) => {
    console.log("props data", props);
  };

  contentStatus=(id)=>{
  
    for(let i=0;i<this.state.contentArr.length;i++){
      if(this.state.contentArr[i].content_Status_id===id){
        return this.state.contentArr[i].description;
      }
    }
    
  }

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


  componentDidMount() {
    this.getlistofcontentonlystatus();
    console.log("calling edit data length", this.state.data.length);
    console.log(
      "calling edit datttaaaaaaaaaaaaa&&&&&&aaaa",
      this.props.siloeditnewdata
    );
    console.log("calling edit line 61 ", PackinglineEditdata);

    if (PackinglineEditdata !== null) {
      console.log("inside if ");
      this.getRepackingListByPackingLine(PackinglineEditdata.packingLineL3);

      this.setState(
        {
          data: PackinglineEditdata,
        },
        () => {
          console.log("data present after tab switch", this.state.data);
          this.setState({
            idPackingLine: PackinglineEditdata.idPackingLine,
            packingLineL3: PackinglineEditdata.packingLineL3,
            versionLock: PackinglineEditdata.versionLock,
            bagNumber: PackinglineEditdata.bagNumber,
            counterBag: PackinglineEditdata.counterBag,
            counterError: PackinglineEditdata.counterError,
            counterFracture: PackinglineEditdata.counterFracture,
            counterMet: PackinglineEditdata.counterMet,
            counterUnweight: PackinglineEditdata.counterUnweight,
            endBatch: PackinglineEditdata.endBatch,
            startBatch: PackinglineEditdata.startBatch,
            packingLineDcs: PackinglineEditdata.packingLineDcs,
            packingLineL3: PackinglineEditdata.packingLineL3,
            idLocationPackingLine: PackinglineEditdata.idLocationPackingLine,
            typePackingLine: PackinglineEditdata.typePackingLine,
            idSiloMt: PackinglineEditdata.idSiloMt,
            mDate: PackinglineEditdata.mDate,
            mUsername: PackinglineEditdata.mUsername,
            idSite: PackinglineEditdata.idSite,
            materialType: PackinglineEditdata.materialType,
          });
        }
      );
    }
  }

  getRepackingListByPackingLine = (id) => {
    console.log("print id", id);
    axios
      .post(getListOfRepackingLineByPackingLine + id)

      .then((response) => {
        console.log("response in method ", response.data);
        if (response.status === 200 && response.data.length !== 0) {
          console.log(
            "resposne successsssssssssssssssssssssss 113",
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
  backHandler = () => {
    console.log("calling back handler for list");
    remover("PackingLineEdit");
    this.props.editClosehandler();
  };

  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "idRepackingLine",
      },
      {
        Header: "Folder ID",
        accessor: "repackingSICLEntity.idFolder",
      },
      {
        Header: "Folder Line ID",
        accessor: "idFolderLine",
      },
      {
        Header: "Reception Type",
        accessor: "typeReception",
        Cell: (props) => {
          return (
            <text>
              {props.original.typeReception === 5 ? <span>Process order</span> : props.original.typeReception === 11 ? <span>Material to material</span> : null}
            </text>
          );
        },
      },
      {
        Header: "Packing Line ID",
        accessor: "idPackingLine",
      },
      {
        Header: "Reference From",
        accessor: "idReferenceFrom",
      },
      {
        Header: "Product ID",
        accessor: "productKLEntity.idProduct",
      },
      {
        Header: "Product",
        accessor: "productKLEntity.idReference",
      },
      {
        Header: "Product Description",
        accessor: "productKLEntity.description",
      },
      {
        Header: "Product Unit",
        accessor: "productKLEntity.descriptionUnit",
      },
      {
        Header: "Intermediate Material Code",
        accessor: "idReferenceFrom",
      },
      {
        Header: "Grade",
        accessor: "productKLEntity.zGrade",
      },
      {
        Header: "Qty to Repack",
        accessor: "qtyToRepack",
      },
      {
        Header: "Qty Repacked",
        accessor: "qtyRepacked",
      },
      {
        Header: "Comments",
        accessor: "commentary",
      },
      {
        Header: "Batch",
        accessor: "batch",
      },
      {
        Header: "Final Content Status Id",
        accessor: "idContentStatus",
        Cell:(props)=>{
          return(
            <div>{this.contentStatus(props.original.idContentStatus)}</div>
          )
        }
      },
      {
        Header: "Status",

        Cell: (props) => {
          return (
            <text>
              {props.original.statusRepackingLine === 1000 ? (
                <span>Closed</span>
              ) : props.original.statusRepackingLine === 200 ? (
                <span>Incoherent</span>
              ) : props.original.statusRepackingLine === 100 ? (
                <span>Created</span>
              ) : props.original.statusRepackingLine === 400 ? (
                <span>Inprogress</span>
              ) : props.original.statusRepackingLine === 1100 ? (
                <span>Closed & Rejected</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Rejection Status",
        //accessor: "rejectionStatus",
        Cell: (props) => {
          return (
            <text>
              {props.original.rejectionStatus === 0 ? (
                <span>OK</span>
              ) : props.original.rejectionStatus === 200 ? (
                <span>_INCOHERENCE_WITH_PRODUCT_IN_SILO_</span>
              ) : props.original.rejectionStatus === 100 ? (
                <span>PRODUCT_UNKNOWN</span>
              ) : props.original.rejectionStatus === 300 ? (
                <span>_BAD_RELATIONSHIP_</span>
              ) : props.original.rejectionStatus === 400 ? (
                <span>_PACKING_LINE_BUSY_</span>
              ) : props.original.rejectionStatus === 500 ? (
                <span>_SILO_UNKNOWN_</span>
              ) : props.original.rejectionStatus === 600 ? (
                <span>_TOO_MANY_CONTENTS_</span>
              ) : props.original.rejectionStatus === 700 ? (
                <span>_SILO_EMPTY_</span>
              ) : props.original.rejectionStatus === 800 ? (
                <span>_NEGATIVE_QTY_CHILD_</span>
              ) : props.original.rejectionStatus === 900 ? (
                <span>_PACKING_LINE_UNKNOWN_</span>
              ) : props.original.rejectionStatus === 1000 ? (
                <span>_TOO_MANY_CONTAINERS_</span>
              ) : props.original.rejectionStatus === 1100 ? (
                <span>_NOT_A_INTERMEDIATE_MATERIAL_CODE_</span>
              ) : props.original.rejectionStatus === 1200 ? (
                <span>_ANOTHER_PROCESS_IN_PROGRESS_ON_SILO_</span>
              ) : props.original.rejectionStatus === 1300 ? (
                <span>_NOT_VRAC_PRODUCT_</span>
              ) : props.original.rejectionStatus === 1400 ? (
                <span>_SAME_ORIGINAL_AND_FINAL_PRODUCT_</span>
              ) : props.original.rejectionStatus === 1500 ? (
                <span>_NO_CHILD_PRODUCT_</span>
              ) : props.original.rejectionStatus === 1600 ? (
                <span>_PACKING_LINE_MT_INCOHERENT_WITH_SILO_</span>
              ) : props.original.rejectionStatus === 1700 ? (
                <span>_PACKING_LINE_TYPE_INCOHERENT_WITH_FINAL_PRODUCT_</span>
              ) : props.original.rejectionStatus === 1800 ? (
                <span>_PRODUCT_NOT_AVAILABLE_</span>
              ) : null}
            </text>
          );
        },
      },
      {
        Header: "Start Date",
        accessor: "startProductionDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.startProductionDate !== null
                ? props.original.startProductionDate.substring(0, 10)
                : ""}
              &nbsp;
              {props.original.startProductionDate !== null
                ? props.original.startProductionDate.substring(11, 16)
                : ""}
            </span>
          );
        },
      },
      {
        Header: "End Date",
        accessor: "endProductionDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.endProductionDate !== null
                ? props.original.endProductionDate.substring(0, 10)
                : ""}
              &nbsp;
              {props.original.endProductionDate !== null
                ? props.original.endProductionDate.substring(11, 16)
                : ""}
            </span>
          );
        },
      },
      {
        Header: "Modified Date",
        accessor: "productKLEntity.companyEntity.mDate",
        Cell: (props) => {
          return (
            <span>
              {props.original.mDate !== null
                ? props.original.mDate.substring(0, 10)
                : ""}
              &nbsp;
              {props.original.mDate !== null
                ? props.original.mDate.substring(11, 16)
                : ""}
            </span>
            // <button onClick={this.test}>click</button>
            // <button onClick={() => console.log("props", props.original.mDate)}>
            //   click
            // </button>
          );
        },
      },
      {
        Header: "Modified By",
        accessor: "musername",
      },
    ];
    return (
      <React.Fragment>
        <div>
          <IoArrowBackCircleSharp onClick={this.backHandler} />
          <IoArrowForwardCircleSharp />
          <FcSearch style={{ marginLeft: "5px" }} />
          <span>
            {" "}
            <u>
              {" "}
              <b>
                <a>P</a>
              </b>
            </u>{" "}
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a style={{cursor:"pointer" }}>PackingLine search</a>
              </b>
            </u>
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a style={{cursor:"pointer" }} onClick={this.backHandler}>PackingLine Management</a>
              </b>
            </u>
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a style={{cursor:"pointer" }}>PackingLine</a>
              </b>
            </u>
            <div
              style={{
                border: "1px solid black",
                backgroundColor: "grey",
                marginLeft: "0px",
                marginTop: "3px",
              }}
            >
              <span>
                <IoArrowForwardCircleSharp
                  onClick={() => {
                    this.setState({ show: !this.state.show });
                  }}
                >
                  {this.state.show}
                </IoArrowForwardCircleSharp>
                <b> Description </b>
              </span>
            </div>
          </span>
          <div
            style={{
              marginLeft: "15px",
            }}
          >
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Material type</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.materialType} />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>PackingLine L3</Label>{" "}
              </Col>
              <Col>
                <Input bsSize="sm" value={this.state.packingLineL3} />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Location</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.idLocationPackingLine.replace("19@","")} />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label> Type</Label>{" "}
              </Col>
              <Col>
                <Input bsSize="sm"
                value={this.state.typePackingLine}
                name = "typePackingLine"
                />
                {this.state.typePackingLine === 100 ?
                this.setState({typePackingLine: "Pallet"})
                :this.state.typePackingLine === 200 ?
                this.setState({typePackingLine: "Big Bag"})
                :null
                }
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>PackingLineDCS</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.packingLineDcs} />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col> </Col>
              <Col></Col>
              <Col></Col>
              <Col> </Col>
            </Row>
          </div>
        </div>
        <div
          style={{
            border: "1px solid black",
            backgroundColor: "grey",
            marginLeft: "0px",
            marginTop: "3px",
          }}
        >
          <span>
            <IoArrowForwardCircleSharp></IoArrowForwardCircleSharp>
            <b> Counter Packing Lines</b>
          </span>
        </div>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <Label>Counter Bag </Label>{" "}
          </Col>

          <Col>
            {" "}
            <Input bsSize="sm" value={this.state.counterBag} />
          </Col>
          <Col></Col>

          <Col> </Col>
          <Col>
            <Label>Counter met</Label>{" "}
          </Col>
          <Col>
            <Input bsSize="sm" value={this.state.counterMet} />
          </Col>
          <Col></Col>
          <Col> </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <Label>CounterFracture</Label>{" "}
          </Col>

          <Col>
            {" "}
            <Input bsSize="sm" value={this.state.counterFracture} />
          </Col>
          <Col></Col>

          <Col> </Col>
          <Col>
            <Label> CounterUnweight</Label>{" "}
          </Col>
          <Col>
            <Input bsSize="sm" value={this.state.counterUnweight} />
          </Col>
          <Col></Col>
          <Col> </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <Col>
            <Label>CounterError </Label>{" "}
          </Col>

          <Col>
            {" "}
            <Input bsSize="sm" value={this.state.counterBag} />
          </Col>
          <Col></Col>

          <Col> </Col>
          <Col>
            <Label>BagNumber</Label>{" "}
          </Col>
          <Col>
            <Input bsSize="sm" value={this.state.counterMet} />
          </Col>
          <Col></Col>
          <Col> </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <Label>StartBatch</Label>{" "}
          </Col>

          <Col>
            {" "}
            <Input bsSize="sm" value={this.state.startBatch} />
          </Col>
          <Col></Col>

          <Col> </Col>
          <Col>
            <Label> EndBatch</Label>{" "}
          </Col>
          <Col>
            <Input bsSize="sm" value={this.state.endBatch} />
          </Col>
          <Col></Col>
          <Col> </Col>
        </Row>

        <div
          style={{
            border: "1px solid black",
            backgroundColor: "grey",
            marginLeft: "0px",
            marginTop: "3px",
          }}
        >
          <span>
            <IoArrowForwardCircleSharp
              onClick={() => {
                this.setState({ show2: !this.state.show2 });
              }}
            >
              {this.state.show2}
            </IoArrowForwardCircleSharp>
            <b> Repacking Lines</b>
          </span>
        </div>
        {this.state.show2 ? (
          <div>
            <ReactTable
              className="-striped -highlight "
              data={this.state.data}
              columns={columns}
              defaultPageSize={10}
              //showPaginationTop={true}
              filterable
            />
          </div>
        ) : null}

        <br />
      </React.Fragment>
    );
  }
}

export default PackingLineEdit;
