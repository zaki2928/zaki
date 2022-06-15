import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Label,
  Input,
  FormGroup,
  Button,
} from "reactstrap";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { FaEdit, FaTrashAlt, FaHistory } from "react-icons/fa";
import Swal from "sweetalert2";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import { ProductEditData, remover, OrderEditData } from "../../../store/Store";
import PreparationOrderHistoryModal from "./PreparationOrderHistoryModal";
import { properties } from "../../../Properties/Properties";
// import { FaHistory } from "react-icons/fa";
// import HistoryIcon from '@mui/icons-material/History';
import axios from "axios";
const getHistorybyIdpo = properties.Port + properties.getHistorybyIdpo;
class OrderEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],

      orderList: false,
      batch: "",
      idCarrier: "",
      idCarrierReceived: "",
      idPo: "",
      idDm: "",
      idDmReceived: "",
      idGate: "",
      idWave: "",
      idLocation: "",
      idPrepOrder: "",
      idPrepOrderCustomer: "",
      idPrepOrderL3: "",
      idProduct: "",
      listFilterBean: [],
      attribute: null,
      operation: "=",
      value: null,
      mDate: "",
      meansOfTransport: "",
      plfLink: "",
      plfObd1: "",
      statusPo: "",
      statusShipping: "",
      typePalettisation: "",
      typePo: "",
      typePoStuffing: "",
      warehousePreparationIds: "",
      zContShipLine: "",
      zEtaDate: "",
      zSabicDelivId: "",
      zSabicOrderId: "",
      zSalesTerm: "",
      zShipPoint: "",
      zSkOrderId: "",
      isOpen: false,
      history: [],
    };
  }

  deleteHandler() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

 

  componentDidMount() {
    console.log(
      "calling edit datttaaaaaaaaaaaaa&&&&&&aaaa uzmaaaaaaa",OrderEditData);

    this.setState(
      {
        idPo: OrderEditData.idPo,
        batch: OrderEditData.batch,
        desiredDeliveryDate: OrderEditData.desiredDeliveryDate,
        desiredDeliveryDateClient: OrderEditData.desiredDeliveryDateClient,
        dsiredPreparationDate: OrderEditData.dsiredPreparationDate,
        idCarrier: OrderEditData.idCarrier,
        idCarrierReceived: OrderEditData.idCarrierReceived,
        idCompany: OrderEditData.idCompany,
        idDm: OrderEditData.idDm,
        idDmReceived: OrderEditData.idDmReceived,
        idGate: OrderEditData.idGate,
        idLocation: OrderEditData.idLocation,
        idPrepOrder: OrderEditData.idPrepOrder,
        idPrepOrderCustomer: OrderEditData.idPrepOrderCustomer,
        idPrepOrderL3: OrderEditData.idPrepOrderL3,
        idProduct: OrderEditData.idProduct,
        mDate: OrderEditData.mDate,
        meansOfTransport: OrderEditData.meansOfTransport,
        orderTakenDate: OrderEditData.orderTakenDate,
        plfLink: OrderEditData.plfLink,
        plfObd1: OrderEditData.plfObd1,
        printingLanguage: OrderEditData.printingLanguage,
        statusPo: OrderEditData.statusPo,
        statusPoWf: OrderEditData.statusPoWf,
        statusPrep: OrderEditData.statusPrep,
        statusShipping: OrderEditData.statusShipping,
        typePalettisation: OrderEditData.typePalettisation,
        typePo: OrderEditData.typePo,
        typePoStuffing: OrderEditData.typePoStuffing,
        urgency: OrderEditData.urgency,
        versionLock: OrderEditData.versionLock,
        warehousePreparationIds: OrderEditData.warehousePreparationIds,
        zContShipLine: OrderEditData.zContShipLine,
        zDest: OrderEditData.zDest,
        zEtaDate: OrderEditData.zEtaDate,
        zNbOfTrailers: OrderEditData.zNbOfTrailers,
        zNbOfTrailersAff: OrderEditData.zNbOfTrailersAff,
        zSabicDelivId: OrderEditData.zSabicDelivId,
        zSabicOrderId: OrderEditData.zSabicOrderId,
        zSabicShipId: OrderEditData.zSabicShipId,
        zSalesTerm: OrderEditData.zSalesTerm,
        zSapShipmentNumber: OrderEditData.zSapShipmentNumber,
        zShipPoint: OrderEditData.zShipPoint,
        zSkDelivId: OrderEditData.zSkDelivId,
        zSkOrderId: OrderEditData.zSkOrderId,
        zSkShipId: OrderEditData.zSkShipId,
        zTransCo: OrderEditData.zTransCo,
        zTrspPlan: OrderEditData.zTrspPlan,
        zVessel: OrderEditData.zVessel,
        zVoyage: OrderEditData.zVoyage,
        idWave: OrderEditData.idWave,
        listFilterBean: OrderEditData.listFilterBean,
      },
      () => {
        this.getPohistory();
      }
    );
  }
  backHandler = () => {
    console.log("calling back handler for list");
    remover("OrderEdit");
    this.props.editClosehandler();
  };
  getPohistory = () => {
    console.log("getpohistory", this.state.idPo);
    axios
      .post(
        getHistorybyIdpo +
          this.state.idPo
      )
      .then((response) => {
        if (response.status === 200) {
          console.log(
            "response successssssssssssss",
            response.data
          );
          this.setState({
            history: response.data,
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  openModal = () => {
    this.setState({
      isOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isOpen: false,
    });
  };

  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "body",
      },
      {
        Header: "Bar code",
        accessor: "printerName",
      },
      {
        Header: "Modified the",
        accessor: "isAvailable",
      },
      {
        Header: "Modified by",
        accessor: "modifiedby",
      },
      {
        Header: "Delete",
        accessor: "Delete",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaTrashAlt
                style={{ height: "1.5em", width: "1.5em", cursor: "pointer" }}
                onClick={() => this.deleteHandler()}
              >
                Delete
              </FaTrashAlt>
            </div>
          );
        },
      },
    ];
    return (
      <React.Fragment>
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
                <a onClick={this.backHandler}>Container Display</a>
              </b>
            </u>
            &#62;
            <u>
              {" "}
              <b>
                {" "}
                <a>Preparation Order Management</a>
              </b>
            </u>
          </span>
          <br />

          <div>
            <div
              style={{
                border: "1px",
                // backgroundColor: "grey",
                border: "1px solid black",
                marginTop: "10px",
              }}
            >
              <b style={{ marginLeft: "5px" }}> &#62; &#62; Preparation</b>
            </div>

            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
                marginTop: "3px",
              }}
            >
              <b style={{ marginLeft: "5px" }}>Description</b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Site</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.idCompany}
                  name="idCompany"
                  bsSize="sm"
                />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Company</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.idCompany}
                  name="idCompany"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>             
               <PreparationOrderHistoryModal
                closeModal={this.closeModal}
                isOpen={this.state.isOpen}
                poHistory={this.state.history}
              />
              <Col>
                <Label>History</Label>
              </Col>

              <Col>
              {/* <FaHistory onMouseOver={this.openModal}/> */}
              {/* <HistoryIcon onMouseOver={this.openModal}/> */}
              <FaHistory onMouseOver={this.openModal}/>
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Preparation Order Id</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.idPrepOrder}
                  name="idPrepOrder"
                  bsSize="sm"
                />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Type</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.typePo}
                  name="typePo"
                  bsSize="sm"
                >
                  {" "}
                  {this.state.typePo === 100
                    ? this.setState({ typePo: "_standard_" })
                    : null}
                </Input>
              </Col>
              <Col> </Col>

              <Col>
                <Label>Status</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.statusPo}
                  name="statusPo"
                  bsSize="sm"
                >
                  {this.state.statusPo === 500
                    ? this.setState({ statusPo: "_Prepared_" })
                    : this.state.statusPo === 100
                    ? this.setState({ statusPo: "Created" })
                    : this.state.statusPo === 355
                    ? this.setState({ statusPo: "_Error_" })
                    : this.state.statusPo === 350
                    ? this.setState({ statusPo: "_Launchable_" })
                    : this.state.statusPo === 370
                    ? this.setState({ statusPo: "_pre Calculated_" })
                    : this.state.statusPo === 380
                    ? this.setState({ statusPo: "_Calculated_" })
                    : this.state.statusPo === 400
                    ? this.setState({ statusPo: "_Launched_" })
                    : this.state.statusPo === 424
                    ? this.setState({ statusPo: "_In InPreparation_" })
                    : this.state.statusPo === 500
                    ? this.setState({ statusPo: "_Prepared_" })
                    : this.state.statusPo === 4000
                    ? this.setState({ statusPo: "_Cancelled_" })
                    : this.state.statusPo === 360
                    ? this.setState({ statusPo: "_Selected_" })
                    : null}
                </Input>
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Urgency</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.urgency}
                  name="urgency"
                  bsSize="sm"
                />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Printing Language</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.printingLanguage}
                  name="printingLanguage"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>

              <Col>
                <Label>Order Taken Date</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.orderTakenDate}
                  name="orderTakenDate"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Desired Preparation Date</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.dsiredPreparationDate}
                  name="dsiredPreparationDate"
                  bsSize="sm"
                />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Desired Delivery Date</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.desiredDeliveryDate}
                  name="desiredDeliveryDate"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>

              <Col>
                <Label>Customer Desired Delivery Date</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.desiredDeliveryDateClient}
                  name="desiredDeliveryDateClient"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Waves</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.idWave}
                  name="idWave"
                  bsSize="sm"
                />
              </Col>

              <Col> </Col>
              <Col></Col>

              <Col></Col>
              <Col> </Col>

              <Col></Col>

              <Col></Col>
              <Col> </Col>
            </Row>
          </div>

          <div>
            <hr />
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
              }}
            >
              <b style={{ marginLeft: "5px" }}>Description</b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Container Shipping Line</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zContShipLine}
                  name="zContShipLine"
                  bsSize="sm"
                />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Number Of Trailers</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zNbOfTrailers}
                  name="zNbOfTrailers"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>

              <Col>
                <Label>ETA Date</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zEtaDate}
                  name="zEtaDate"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Transport Plan</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zTrspPlan}
                  name="zTrspPlan"
                  bsSize="sm"
                />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Vessel</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zVessel}
                  name="zVessel"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>

              <Col>
                <Label>Transport Company</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zTransCo}
                  name="zTransCo"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Saudi Kayan Order Id</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zSkOrderId}
                  name="zSkOrderId"
                  bsSize="sm"
                />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Saudi Kayan Delivery Id</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zSkDelivId}
                  name="zSkDelivId"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>

              <Col>
                <Label>Saudi Kayan Shipment Id</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zShipPoint}
                  name="zShipPoint"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Sabic Order Id</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zSabicOrderId}
                  name="zSabicOrderId"
                  bsSize="sm"
                />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Sabic Delivery Id</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zSkDelivId}
                  name="zSkDelivId"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>

              <Col>
                <Label>Sabic Shipment Id</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zSabicShipId}
                  name="zSabicShipId"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Shipping Point</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zShipPoint}
                  name="zShipPoint"
                  bsSize="sm"
                />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Voyage</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zVoyage}
                  name="zVoyage"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>

              <Col>
                <Label>Destination</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zDest}
                  name="zDest"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>SAP Shipment No</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.zSapShipmentNumber}
                  name="zSapShipmentNumber"
                  bsSize="sm"
                />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Link</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.plfLink}
                  name="plfLink"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>

              <Col></Col>

              <Col></Col>
              <Col> </Col>
            </Row>
          </div>

          <div>
            <hr />
            <div>
              <input type="checkbox" id="myid"></input> <a href="#">Active </a>{" "}
              <a style={{ marginLeft: "15px" }}> &#62; &#62;Shipping </a>{" "}
            </div>
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
                marginTop: "10px",
              }}
            >
              <b style={{ marginLeft: "5px" }}>Description</b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Shipping Status</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.statusShipping}
                  name="statusShipping"
                  bsSize="sm"
                />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Carrier</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.idCarrier}
                  name="idCarrier"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>

              <Col>
                <Label>Dispatch Mode</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.idDm}
                  name="idDm"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Means of Transport</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.meansOfTransport}
                  name="meansOfTransport"
                  bsSize="sm"
                />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Carrier Recieved</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.idCarrierReceived}
                  name="idCarrierReceived"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>

              <Col>
                <Label>Dispatch Mode Recieved</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.idDmReceived}
                  name="idDmReceived"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Palletisation Type</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.typePalettisation}
                  name="typePalettisation"
                  bsSize="sm"
                >
                  {this.state.typePalettisation === -1
                    ? this.setState({ typePalettisation: "_Non Relevant_" })
                    : this.state.typePalettisation === 100
                    ? this.setState({ typePalettisation: "_Without_" })
                    : this.state.typePalettisation === 200
                    ? this.setState({
                        typePalettisation: "_Palettisation_",
                      })
                    : this.state.typePalettisation === 300
                    ? this.setState({ typePalettisation: "_Trailer_" })
                    : null}
                </Input>
              </Col>

              <Col> </Col>
              <Col>
                <Label>Location</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.idLocation}
                  name="idLocation"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>

              <Col>
                <Label>Gate</Label>
              </Col>

              <Col>
                <Input
                  type="text"
                  value={this.state.idGate}
                  name="idGate"
                  bsSize="sm"
                />
              </Col>
              <Col> </Col>
            </Row>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default OrderEdit;
