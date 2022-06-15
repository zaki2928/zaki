import React, { Component } from "react";
import Modal from "react-modal";
import ModalHeader from "../wave/ModalHeader";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { properties } from "../../../Properties/Properties";
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
import { Link, NavLink } from "react-router-dom";
const getSalesTermforWaveLaunch =
  properties.Port + properties.getSalesTermforWaveLaunch;
const getListOfGatesForWaveLaunch =
  properties.Port + properties.getListOfGatesForWaveLaunch;
const lauchWave = properties.Port + properties.lauchWave;
let gateid = 0;
let salestermid = 0;

export default class WaveLaunchModal2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      listofgates: [],
      listofsalesterm: [],
      wavedata: [],
    };
  }

  gateOnBlurHandler = (props, gate) => {
    console.log("onblurhandler wavedata", props);
    console.log("onblurhandler gateid", gate);
    const index = this.state.wavedata.findIndex(
      (data) => data.idpreporder === props.idPrepOrder
    );
    // console.log("bbbbbbbbbbbbbbbb=>", this.state.wavedata[index]);
    console.log("indexxxxxxx", index);
    this.state.wavedata[index].gateId = gate;
    console.log("checkkk data", this.state.wavedata);
  };

  salesOnBlurHandler = (props, salestermid) => {
    console.log("onblurhandler wavedata", props);
    console.log("onblurhandler salestermid", salestermid);
    const index = this.state.wavedata.findIndex(
      (data) => data.idpreporder === props.idPrepOrder
    );
    // console.log("bbbbbbbbbbbbbbbb=>", this.state.wavedata[index]);
    console.log("indexxxxxxx", index);
    this.state.wavedata[index].salestermid = salestermid;
    console.log("checkkk data", this.state.wavedata);
  };

  onOpenModal = () => {
    console.log("set data handler calling");
    this.setState(
      {
        wavedata: this.props.data,
      },
      () => console.log("checkingggggggg", this.state.wavedata)
    );
  };

  changehandler = (events) => {
    console.log(
      "shahidddddddddddddddddddddddddddddddddddddddd",
      events.target.name
    );
    if (events.target.name === "gate") {
      gateid = events.target.value;
    }
    if (events.target.name === "sales") {
      salestermid = events.target.value;
    }
    console.log("value of sales term", salestermid);
  };

  testhandler = () => {
    console.log("test handler");
    axios
      .post(lauchWave, this.state.waveLaunchbean)
      .then((response) => {
        console.log("response success getListOfGatesForWaveLaunch", response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount = () => {
    this.getListOfGatesForWaveLaunch();
    this.getSalesTermforWaveLaunch();
  };

  submitHandler = () => {
    console.log("submit handler calling ");
    const data = {
      wavedata: this.state.wavedata,
    };
    axios
      .post(lauchWave, data)
      .then((response) => {
        if (response.status === 200) {
          console.log("rsponse successsss");
          this.BackHandler();
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  getListOfGatesForWaveLaunch = () => {
    axios
      .post(getListOfGatesForWaveLaunch)
      .then((response) => {
        console.log("response success getListOfGatesForWaveLaunch", response);
        this.setState({
          listofgates: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  getSalesTermforWaveLaunch = () => {
    axios
      .post(getSalesTermforWaveLaunch)
      .then((response) => {
        console.log("response success getSalesTermforWaveLaunch", response);
        this.setState({
          listofsalesterm: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  BackHandler = () => {
    this.props.onOkClick();
  };

  render() {
    const columns = [
      {
        Header: "PO",
        accessor: "idPrepOrder",
      },
      {
        Header: "Stuffing Type",
        Cell: (props) => {
          return (
            <div>
              {props.original.typePoStuffing === 100
                ? "_Stuffing at Affiliate_"
                : props.original.typePoStuffing === 200
                ? "_Stuffing at PLF_"
                : props.original.typePoStuffing === 0
                ? "_Sans_"
                : "_not_Found_"}
            </div>
          );
        },
      },

      {
        Header: "Link",
        accessor: "plfLink",
        

        // Cell: (props) => {
        //   return <div>-</div>;
        // },
      },

      {
        Header: "WH",
        width: 150,
        Cell: (props) => {
          return (
            <div>
              <select
                onBlur={() => this.gateOnBlurHandler(props.original, gateid)}
                onChange={this.changehandler}
                name="gate"
              >
                {this.state.listofgates.map((data) => (
                  <option value={data.idGate}>{data.description}</option>
                ))}
              </select>
            </div>
          );
        },
      },
      {
        Header: "RT1",
        Cell: (props) => {
          return <div>-</div>;
        },
      },
      {
        Header: "SOLA",
        Cell: (props) => {
          return <div>-</div>;
        },
      },
      {
        Header: "Sales term",
        width: 150,
        Cell: (props) => {
          return (
            <div>
              <select
                name="sales"
                onChange={this.changehandler}
                onBlur={() =>
                  this.salesOnBlurHandler(props.original, salestermid)
                }
              >
                {this.state.listofsalesterm.map((data) => (
                  <option value={data.salesTermKey}>{data.salesTermKey}</option>
                ))}
              </select>
            </div>
          );
        },
      },
    ];
    return (
      <div>
        <Modal
          onAfterOpen={this.onOpenModal}
          isOpen={this.props.modalIsOpen2}
          //   onAfterOpen={afterOpenModal}
          onRequestClose={this.props.openModalIsclose2}
          style={{
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              height: "auto",
              position: "fixed",
            },
            overlay: {
              background: "rgba(0,0,0,0.8)",
            },
          }}
        >
          <ModalHeader close={this.props.onOkClick} />
          <ReactTable
            style={{
              marginLeft: "-20px",
              marginRight: "-20px",
              marginBottom: "-20px",
            }}
            className="-striped -highlight "
            data={this.props.preparationOrder}
            columns={columns}
            defaultPageSize={this.props.data.length}
            filterable
          />

          <br />
          <Row>
            <Col>
              <button
                onClick={this.props.onWhClick}
                style={{
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "inherit",
                }}
              >
                WH
              </button>
            </Col>
            <Col>
              <button
                style={{
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "inherit",
                }}
              >
                RT1
              </button>
            </Col>
            <Col>
              <button
                style={{
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "inherit",
                }}
              >
                SOLA
              </button>
            </Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col></Col>
            <Col>
              <button
                style={{
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "inherit",
                }}
                onClick={this.submitHandler}
                // onClick={this.props.onOkClick}
              >
                OK
              </button>
            </Col>
          </Row>

          <br />
          <Row>
            <Col></Col>
            <Col></Col>
            <Col>
              <button
                style={{
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "inherit",
                }}
              >
                Refresh
              </button>
            </Col>
            <Col>
              <button
                style={{
                  border: "2px solid black",
                  borderRadius: "5px",
                  width: "inherit",
                }}
                onClick={this.props.onOkClick}
              >
                Cancel
              </button>
            </Col>

            <Col></Col>
            <Col></Col>
          </Row>
        </Modal>
      </div>
    );
  }
}
