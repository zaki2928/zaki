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
import PalletToDestructionList from "./PalletToDestructionList";
import "react-table-v6/react-table.css";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";

import ReactTable from "react-table-v6";
// import { StoragePalletEditdata, remover } from "../../../../store/Store";
import { palletDestructionEditData, remover, palletdestructionid } from "../../../../store/Store";
export default class PalletToDestructionEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packinglinefilter: false,
      data: [],
      batch: "",
      ContainerNo: "",
      creation_date: "",
      height: "",
      id_CONTAINER_STK: "",
      id_REFERENCE: "",
      id_container_father: "",
      id_location: "",
      id_packaging: "",
      modefieddate: "",
      modefiedusername: "",
      operation: "=",
      status_container: "",
      status_mvt: "",
      type_container: "",
      vlock: "",
      volume: "",
      weight: "",
      z_description_unit: "",
      z_grade: "",
    };
  }

  backHandler = () => {
    console.log("calling back handler for list");
    remover(palletdestructionid);
    this.props.editCloseHandler();
  };

  componentDidMount() {
    console.log("calling edit datttaaaaaaaaaaaaaaaaa", this.props.data2);
    console.log("calling edit ", palletDestructionEditData);
    if(palletDestructionEditData !== null){
      this.setState({
        ContainerNo: palletDestructionEditData.idContainer,
        id_location: palletDestructionEditData.idLocation,
        status_container: palletDestructionEditData.statusContainer,
        type_container: palletDestructionEditData.typeContainer,
        id_container_father: palletDestructionEditData.idContainerFather,
        id_packaging: palletDestructionEditData.idPackaging,
        weight: palletDestructionEditData.weight,
        height: palletDestructionEditData.height,
        volume: palletDestructionEditData.volume,
        batch: palletDestructionEditData.batch,
        status_mvt: palletDestructionEditData.statusMvt,
      })
    }
    else{
      this.setState({
        ContainerNo: palletDestructionEditData.containerNo,
        id_location: palletDestructionEditData.id_location,
        status_container: palletDestructionEditData.status_container,
        type_container: palletDestructionEditData.type_container,
        id_container_father: palletDestructionEditData.id_container_father,
        id_packaging: palletDestructionEditData.id_packaging,
        weight: palletDestructionEditData.weight,
        height: palletDestructionEditData.height,
        volume: palletDestructionEditData.volume,
        batch: palletDestructionEditData.batch,
        status_mvt: palletDestructionEditData.status_mvt,
      })
    }
    // if (palletDestructionEditData !== null) { 
    //   console.log("inside if condition--------------------",palletDestructionEditData)
    //   this.setState(
    //     {
    //       data: palletDestructionEditData,
    //     },
    //     () => {
    //       console.log("data present after tab switch", this.state.data);
    //       this.setState({
    //         ContainerNo: palletDestructionEditData.ContainerNo,
    //       });
    //     }
    //   );
    // }
  }

  // componentDidMount = () => {
  //   console.log("com calling from palletedit", palletDestructionEditData);
  //   if(palletDestructionEditData !== null){
  //     this.setState(
  //       {
  //       data: palletDestructionEditData
  //     },
  //     ()=>{
  //       this.setState({
  //         ContainerNo: palletDestructionEditData.ContainerNo,
  //       })
  //     }
  //     )
  //   }
    
  // };
  render() {
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          // style={{ border: "1px solid black", marginLeft: "14px" }}
        >
          {this.state.packinglinefilter === true ? (
            <PalletToDestructionList />
          ) : (
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
                    <a>Pallets to destruction movements criteria</a>
                  </b>
                </u>
                {" "}
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a style={{ cursor: "pointer" }} onClick={this.backHandler}>Pallets to destruction movements list</a>
                  </b>
                </u>
                {" "}
                &#62;
                <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Container display</a>
                  </b>
                </u>
              </span>
              <br />
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}> &#62; &#62;General</b>
              </div>
              <b style={{ marginLeft: "5px" }}>Status</b>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Container No</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                  value={this.state.ContainerNo}
                  // name="ContainerNo"
                  bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Location</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input 
                  value={this.state.id_location.replace("19@","")}
                  bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Status</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                  value={this.state.status_container}
                  bsSize="sm" >
                    {this.state.status_container === 50
                    ? this.setState({ status_container: "CREATION_IN_PROGRESS" })
                    : this.state.status_container === 100
                    ? this.setState({ status_container: "STATUS_CREATED" })
                    : this.state.status_container === 500
                    ? this.setState({ status_container: "Validated" })
                    : this.state.status_container === 800
                    ? this.setState({ status_container: "STATUS_DESTROYED" })
                    : null}
                  </Input>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Type</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                  value={this.state.type_container}
                  bsSize="sm" >
                    {this.state.type_container === 100
                    ? this.setState({ type_container: "PALLET" })
                    : this.state.type_container === 200
                    ? this.setState({ type_container: "PRODUCT" })
                    : this.state.type_container === 400
                    ? this.setState({ type_container: "SHIPPING_PALLET" })
                    : this.state.type_container === 500
                    ? this.setState({ type_container: "BOX" })
                    : this.state.type_container === 510
                    ? this.setState({ type_container: "BOX_SHIPPING" })
                    : this.state.type_container === 600
                    ? this.setState({ type_container: "LOCATION" })
                    : this.state.type_container === 700
                    ? this.setState({ type_container: "LOAD_COLLECTION" })
                    : this.state.type_container === 710
                    ? this.setState({ type_container: "UNLOAD_COLLECTION" })
                    : this.state.type_container === 800
                    ? this.setState({ type_container: "TRAILER" })
                    : null}

                  </Input>
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Container no(Parent)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input 
                  value={this.state.id_container_father}
                  bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Packaging Id</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                  value={this.state.id_packaging}
                  bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Weight(Kg)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                  value={this.state.weight}
                  bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Empty Weight(Kg)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Height(m)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                  value={this.state.height}
                  bsSize="sm" />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Volume(dm3)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input
                  value={this.state.volume}
                  bsSize="sm" />
                </Col>
                <Col> </Col>
              </Row>
            </div>
          )}
          {/* {this.state.silolist === true ? (
            <SiloRepackingList />
          ) : } */}
        </Container>
        <Container
          className="themed-container"
          fluid={true}
          // style={{ border: "1px solid black", marginLeft: "14px" }}
        >
          {this.state.packinglinefilter === true ? (
            <PalletToDestructionList />
          ) : (
            <div>
              <br />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Content</b>
              </div>
              Container No : {this.state.ContainerNo}
              <br/>
              Batch: {this.state.batch}
              <div>
                <input type="checkbox" id="myid" checked></input>{" "}
                <a href="#">Active </a>{" "}
                <a style={{ marginLeft: "15px" }}> &#62; &#62;Stock </a>{" "}
              </div>
            </div>
          )}
        </Container>
        <Container
          className="themed-container"
          fluid={true}
          // style={{ border: "1px solid black", marginLeft: "14px" }}
        >
          {this.state.packinglinefilter === true ? (
            <PalletToDestructionList />
          ) : (
            <div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label style={{ marginBottom: "5px" }}>Movement Status</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input 
                  value={this.state.status_mvt} 
                  style={{ marginBottom: "5px" }} bsSize="sm" >
                    {/* {this.state.status_mvt===100?<text>_Immobile_</text>:null} */}
                    {this.state.status_mvt === 100
                    ? this.setState({ status_mvt: "IMMOBILE" })
                    : this.state.status_mvt === 200
                    ? this.setState({ status_mvt: "TRANSFER" })
                    : this.state.status_mvt === 300
                    ? this.setState({ status_mvt: "MVT_QTY" })
                    : null}
                  </Input>
                </Col>

                <Col> </Col>
                <Col> </Col>
                <Col> </Col>

                <Col> </Col>
              </Row>
            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}
