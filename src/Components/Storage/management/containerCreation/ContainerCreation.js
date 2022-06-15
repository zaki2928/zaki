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
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import {
  Containerdowngradedata,
  containerdowngradeHandler,
  ResetContainerData,
  containerData,
  setContainerData,
} from "../../../../store/Store";
import Swal from "sweetalert2";
import axios from "axios";
import { properties } from "../../../../Properties/Properties";
import Loader from "react-loader-spinner";
import { CONTAINER_CREATION, USERNAME } from "../../../../store/RoleBased";
// import {containerQtyValidator} from '../../../ValidateComponent'

const getListofPackagingforContainercreation =
  properties.Port + properties.getListofPackagingforContainercreation;
const getListOfContentStatus =
  properties.Port + properties.getListOfContentStatus;

const getProductkllubyReferenceid =
  properties.Port + properties.getProductkllubyReferenceid;
const checkProcessOrderProduct =
  properties.Port + properties.checkProcessOrderProduct;
const getProductByIdReference =
  properties.Port + properties.getProductByIdReference;
const getlistofallprinterthermal =
  properties.Port + properties.getlistofallprinterthermal;
const addContainerKL = properties.Port + properties.addContainerKL;
const GetParameterValue =
  properties.Port +
  properties.GetParameterValue +
  properties.Containercreatecode;

class ContainerCreation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      dataToN3: true,
      emptyWeight: "",
      height: 0,
      idContainerFather: "",
      idLocation: "19@OVERFLOW",
      idLogisticUnit: "",
      idPackaging: "",
      idReference: "",
      idSite: "SK",
      lineId: 0,
      orignalBatch: "",
      processOrder: "",
      qtyToCreate: "",
      selectedPrinter: "",
      statusContainer: "",
      typeContainer: "",
      versionLock: "",
      volume: "",
      weight: 0,
      idCompany: "SABIC",
      content_status_id: 0,
      ListOfContentStatus: [],
      ListOfPackaging: [],
      error: "",
      quantitypal: 1,
      dynamicpack: "",
      errormesg: "",
      errormesg3: "",
      ListOfPrinter: [],
      isPoValid: false,
      printlabel: false,
      success: "",
      loading: false,
      msg: "",
      idExchange: "",
      musername:USERNAME,
    };
  }

  // getting list of content status for content status dropdown
  getListofContentStatus = (events) => {
    axios
      .get(getListOfContentStatus)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          this.setState({
            ListOfContentStatus: response.data,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  };

  // Submitting the data into database
  Submithandler = () => {
    this.setState({
      success: "",
    });
    if (this.validate()) {
      Swal.fire({
        title: "Confirmation",
        text: "Do you really want to create containers?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "gray",
        cancelButtonColor: "gray",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value) {
          this.setState({
            success: "",
            loading: true,
          });

          if (this.state.dataToN3 === false) {
            axios
              .post(addContainerKL, this.state)
              .then((response) => {
                if (response.status === 200) {
                  ResetContainerData();
                  this.setState({
                    loading: false,
                    comment: "",
                    dataToN3: true,
                    emptyWeight: "",
                    height: 0,
                    idContainerFather: "",
                    idLocation: "19@OVERFLOW",
                    idLogisticUnit: "",
                    idPackaging: "",
                    idReference: "",
                    idSite: "SK",
                    lineId: 0,
                    orignalBatch: "",
                    processOrder: "",
                    qtyToCreate: "",
                    selectedPrinter: "",
                    statusContainer: "",
                    typeContainer: "",
                    versionLock: "",
                    volume: "",
                    weight: 0,
                    idCompany: "SABIC",
                    content_status_id: 0,

                    ListOfPackaging: [],
                    error: "",
                    quantitypal: 1,
                    dynamicpack: "",
                    errormesg: "",

                    isPoValid: false,
                    printlabel: false,
                    success: "Container created successfully",
                    idExchange: "",
                  });
                }
              })
              .catch((error) => {
                console.log(error);
                this.setState({
                  loading: false,
                });
              });
          } else {
            this.verifyProcessOrder();
            this.setState({
              loading: false,
            });
          }
          // }
        }
      });
    }
  };

  verifyProcessOrder = () => {
    if (this.state.processOrder !== "") {
      axios
        .post(
          checkProcessOrderProduct +
            this.state.idReference +
            "/" +
            this.state.orignalBatch +
            "/" +
            this.state.processOrder
        )

        .then((response) => {
          if (response.status === 200) {
            this.setState({
              success: "",
              loading: true,
            });

            axios
              .post(addContainerKL, this.state)

              .then((response) => {
                if (response.status === 200) {
                  this.setState(
                    {
                      loading: false,
                      comment: "",
                      dataToN3: true,
                      emptyWeight: "",
                      height: 0,
                      idContainerFather: "",
                      idLocation: "19@OVERFLOW",
                      idLogisticUnit: "",
                      idPackaging: "",
                      idReference: "",
                      idSite: "SK",
                      lineId: 0,
                      orignalBatch: "",
                      processOrder: "",
                      qtyToCreate: "",
                      selectedPrinter: "",
                      statusContainer: "",
                      typeContainer: "",
                      versionLock: "",
                      volume: "",
                      weight: 0,
                      idCompany: "SABIC",
                      content_status_id: 0,

                      ListOfPackaging: [],
                      error: "",
                      quantitypal: 1,
                      dynamicpack: "",
                      errormesg: "",

                      isPoValid: false,
                      printlabel: false,
                      success: "Container created successfully",
                      idExchange: "",
                    },
                    () => {
                      setContainerData(this.state);
                    }
                  );
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            this.setState({
              error: "The process order does not match the product and batch",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({
            error: error.response.data.message,
          });
        });
      this.setState({
        errormesg: "",
      });
    } else {
      this.setState({
        errormesg: "Value Required",
      });
    }
  };

  //  Getting data on the behalf of product
  productChangehandler = (event) => {
    this.setState({
      success: "",
    });
    if (event.target.value !== "") {
      this.getlistofPackaging(event.target.value);
      this.getLogisticUnitbyproduct(event.target.value);
      this.getProductByReferenceId(event.target.value);
    } else {
      this.setState({
        error: "",
      });
    }
    setContainerData(this.state);
  };

  // getting product by reference Id
  getProductByReferenceId = (id) => {
    axios
      .post(getProductByIdReference + id)

      .then((response) => {
        if (response.status === 200) {
          this.setState({
            dynamicpack: response.data.descriptionUnit,
          });
        } else {
          this.setState({
            dynamicpack: "",
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getLogisticUnitbyproduct = (referenceId) => {
    axios
      .post(getProductkllubyReferenceid + referenceId)

      .then((response) => {
        if (response.status === 200) {
          this.setState({
            idLogisticUnit: response.data.idLogisticUnit,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "Invalid product",
        });
      });
  };

  // get list of packaging
  getlistofPackaging = (referenceId) => {
    axios
      .post(getListofPackagingforContainercreation + referenceId)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          this.setState({
            ListOfPackaging: response.data,
            error: "",
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "Invalid product",
          ListOfPackaging: [],
          loading: false,
        });
      });
  };

  // get list of printer values for dropdown
  getlistofallthermalPrinter = (referenceId) => {
    axios
      .get(getlistofallprinterthermal)

      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          this.setState({
            ListOfPrinter: response.data,
            error: "",
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: "Invalid product",
          ListOfPackaging: [],
          loading: false,
        });
      });
  };

  // To validate all the required filed are filled or not
  validate = () => {
    if (this.state.qtyToCreate > this.state.Creationlimit) {
      this.setState({
        errormesg3:
          "Qty to create max [" + this.state.Creationlimit + "] exceeded",
        loading: false,
      });
      return false;
    } else if (this.state.qtyToCreate === "") {
      this.setState({
        errormesg: "value required",
        loading: false,
      });
      return false;
    } else if (this.state.idLogisticUnit === "") {
      this.setState({
        errormesg: "Value required",
        loading: false,
      });
      return false;
    } else if (this.state.idPackaging === "") {
      this.setState({
        errormesg: "Value required",
        loading: false,
      });
      return false;
    } else if (this.state.orignalBatch === "") {
      this.setState({
        errormesg: "Value required",
        loading: false,
      });
      return false;
    } else if (this.state.idReference === "") {
      this.setState({
        errormesg: "Value required",
        loading: false,
      });
      return false;
    } else if (this.state.printlabel === true && this.state.idExchange === "") {
      this.setState({
        errormesg: "Value required",
        loading: false,
      });
      return false;
    } else {
      this.setState({
        errormesg: "",
        loading: false,
      });
      return true;
    }
  };

  // check the given input is number on not
  noStringkHandler = (event) => {
    if (/^[0-9\b]+$/.test(event.target.value) || event.target.value === "") {
      this.setState(
        {
          [event.target.name]: event.target.value,
        },
        () => {
          setContainerData(this.state);
        }
      );
    } else {
    }
  };

  // this will automatically called just after the render component
  componentDidMount = () => {
    this.getListofContentStatus();
    this.getParameterbyCode();
    this.getlistofallthermalPrinter();

    this.setState({
      comment: containerData.comment,
      dataToN3: containerData.dataToN3,
      emptyWeight: containerData.emptyWeight,
      height: containerData.height,
      idContainerFather: containerData.idContainerFather,
      idLocation: containerData.idLocation,
      idLogisticUnit: containerData.idLogisticUnit,
      idPackaging: containerData.idPackaging,
      idReference: containerData.idReference,
      idSite: containerData.idSite,
      lineId: containerData.lineId,
      orignalBatch: containerData.orignalBatch,
      processOrder: containerData.processOrder,
      qtyToCreate: containerData.qtyToCreate,
      idExchange: containerData.idExchange,
      statusContainer: containerData.statusContainer,
      typeContainer: containerData.typeContainer,
      versionLock: containerData.versionLock,
      volume: containerData.volume,
      weight: containerData.weight,
      idCompany: containerData.idCompany,
      content_status_id: containerData.content_status_id,
      ListOfContentStatus: containerData.ListOfContentStatus,
      ListOfPackaging: containerData.ListOfPackaging,
      error: containerData.error,
      quantitypal: containerData.quantitypal,
      dynamicpack: containerData.dynamicpack,
      errormesg: containerData.errormesg,
      ListOfPrinter: containerData.ListOfPrinter,
      isPoValid: containerData.isPoValid,
      printlabel: containerData.printlabel,
      success: containerData.success,
      loading: containerData.loading,
      msg: containerData.msg,
      dataToN3: containerData.dataToN3,
    });
  };

  // Check batch value is should be atleast 10 digits and it should in be numbers
  batchhandler = (event) => {
    if (
      (event.target.value.length <= 10 &&
        /^[0-9\b]+$/.test(event.target.value)) ||
      event.target.value === ""
    ) {
      this.setState({
        orignalBatch: event.target.value,
        loading: false,
      });
    }
  };

  getParameterbyCode = () => {
    axios
      .post(GetParameterValue)

      .then((response) => {
        if (response.status === 200) {
          this.setState({
            Creationlimit: response.data,
            loading: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loading: false,
        });
      });
  };

  saveHandler() {
    Swal.fire({
      title: "Confirmation",
      text: "Do you really want to validate?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, do it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Done", "success");
      }
    });
  }

  //Input change handler
  onChangeHandler = (event) => {
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        setContainerData(this.state);
      }
    );
  };

  // Change handler for send data to sap checkbox
  checkboxhandler = (event) => {
    if (event.target.checked === false) {
      Swal.fire({
        title: "Confirmation",
        text: "Do you really want to create containers without sending data to sap?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "gray",
        cancelButtonColor: "gray",
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.value) {
          this.setState(
            {
              dataToN3: false,
            },
            () => {
              setContainerData(this.state);
            }
          );
        }
      });
    } else {
      this.setState(
        {
          [event.target.name]: event.target.checked,
        },
        () => {
          setContainerData(this.state);
        }
      );
    }
  };

  // change handler for printing the label checkbox
  printlabelhandler = (event) => {
    this.setState({
      [event.target.name]: event.target.checked,
    });
  };
  render() {
    return (
      <React.Fragment>
        <Container
          className="themed-container"
          fluid={true}
          style={{ border: "1px solid black", marginLeft: "14px" }}
        >
          {this.state.loading ? (
            <div className="">
              <div className="row">
                <div class="col-md-4"></div>
                <div class="col-md-4">
                  <div className="col spinner_item p-5">
                    <Loader
                      type="BallTriangle"
                      color="#00BFFF"
                      height={120}
                      width={100}
                      // visible={loading}
                    />
                  </div>
                </div>
                <div class="col-md-4"></div>
              </div>
            </div>
          ) : (
            <div>
              <IoArrowBackCircleSharp />
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
                    <a style={{ cursor: "pointer" }}>Container stock create</a>
                  </b>
                </u>
              </span>
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
              <span style={{ fontWeight: "bold", color: "red" }}>
                {this.state.error}
              </span>
              <span style={{ fontWeight: "bold", color: "green" }}>
                {this.state.success}
              </span>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Send data to SAP</Label>{" "}
                </Col>

                <Col>
                  <input
                    type="checkbox"
                    name="dataToN3"
                    value={this.state.dataToN3}
                    onChange={this.checkboxhandler}
                    checked={this.state.dataToN3}
                  ></input>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Process order</Label>{" "}
                </Col>
                <Col>
                  <Input
                    name="processOrder"
                    value={this.state.processOrder}
                    onChange={this.onChangeHandler}
                    bsSize="sm"
                  ></Input>
                </Col>

                <Col>
                  {" "}
                  {this.state.dataToN3 === true ? (
                    <div>
                      {this.state.processOrder === "" ? (
                        <span>
                          <span style={{ fontWeight: "bold", color: "red" }}>
                            {this.state.errormesg}
                          </span>
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  ) : (
                    ""
                  )}
                </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Location</Label>{" "}
                </Col>

                <Col>
                  <Input
                    type="select"
                    name="idLocation"
                    value={this.state.idLocation}
                    onChange={this.onChangeHandler}
                    bsSize="sm"
                  >
                    <option value="19@OVERFLOW">OVERFLOW</option>
                    <option value="19@OVERRT11">OVERRT11</option>
                  </Input>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Qty to create</Label>{" "}
                </Col>
                <Col>
                  <Input
                    name="qtyToCreate"
                    value={this.state.qtyToCreate}
                    onChange={this.noStringkHandler}
                    bsSize="sm"
                  />
                </Col>

                <Col>
                  {this.state.qtyToCreate === "" ? (
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      {this.state.errormesg}
                    </span>
                  ) : (
                    ""
                  )}{" "}
                </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Site</Label>{" "}
                </Col>

                <Col>
                  <Input
                    name="idSite"
                    type="select"
                    value={this.state.idSite}
                    onChange={this.onChangeHandler}
                    bsSize="sm"
                  >
                    <option value="">----select----</option>
                    <option value="SK">19</option>
                  </Input>
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Company</Label>{" "}
                </Col>
                <Col>
                  <Input
                    type="select"
                    name="idSite"
                    onChange={this.onChangeHandler}
                    bsSize="sm"
                  >
                    <option value="SABIC">SABIC</option>
                  </Input>
                </Col>

                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Product</Label>{" "}
                </Col>
                <Col>
                  <Input
                    name="idReference"
                    value={this.state.idReference}
                    onChange={this.noStringkHandler}
                    onBlur={this.productChangehandler}
                    bsSize="sm"
                  />
                </Col>

                <Col>
                  {/* <span style={{ fontWeight: "bold", color: "red" }}>
                  {this.state.error}
                </span> */}
                  {this.state.idReference === "" ? (
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      {this.state.errormesg}
                    </span>
                  ) : (
                    ""
                  )}{" "}
                </Col>
                <Col>
                  <Label>Logistic unit ID</Label>{" "}
                </Col>
                <Col>
                  <Input
                    name="idLogisticUnit"
                    value={this.state.idLogisticUnit}
                    // onChange={this.onChangeHandler}
                    bsSize="sm"
                  ></Input>
                </Col>
                <Col>
                  {" "}
                  {this.state.idLogisticUnit === "" ? (
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      {this.state.errormesg}
                    </span>
                  ) : (
                    ""
                  )}{" "}
                </Col>
              </Row>

              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Content status</Label>{" "}
                </Col>

                <Col>
                  <Input
                    type="select"
                    name="content_status_id"
                    onChange={this.onChangeHandler}
                    bsSize="sm"
                  >
                    {this.state.ListOfContentStatus.length !== 0
                      ? this.state.ListOfContentStatus.map((data) => (
                          <option
                            value={data.content_Status_id}
                            key={data.content_Status_id}
                          >
                            {data.description}
                          </option>
                        ))
                      : ""}
                  </Input>
                </Col>

                <Col>
                  {" "}
                  {this.state.content_status_id === "" ? (
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      {this.state.errormesg}
                    </span>
                  ) : (
                    ""
                  )}{" "}
                </Col>
                <Col>
                  <Label>
                    Quantity
                    {this.state.dynamicpack !== "" ? (
                      <dic>
                        (<span>{this.state.dynamicpack}</span>)
                      </dic>
                    ) : (
                      ""
                    )}
                  </Label>{" "}
                </Col>
                <Col>
                  <Input
                    bsSize="sm"
                    value={this.state.quantitypal}
                    name="quantitypal"
                    onChange={this.onChangeHandler}
                  />
                </Col>

                <Col>
                  {" "}
                  {this.state.quantitypal === "" ? (
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      {this.state.errormesg}
                    </span>
                  ) : (
                    ""
                  )}{" "}
                </Col>
              </Row>
              {/* {this.state.ListOfPackaging.length !== 0 ? ( */}
              <div>
                <div
                  style={{
                    border: "1px",
                    backgroundColor: "grey",
                    border: "1px solid black",

                    marginTop: "5px",
                  }}
                >
                  <b style={{ marginLeft: "5px" }}>Statements</b>
                </div>

                <Row style={{ marginTop: "5px" }}>
                  <Col>
                    <Label>Batch</Label>{" "}
                  </Col>
                  <Col>
                    <Input
                      type="input"
                      value={this.state.orignalBatch}
                      name="orignalBatch"
                      onChange={this.batchhandler}
                      bsSize="sm"
                    ></Input>
                  </Col>

                  <Col>
                    {" "}
                    {this.state.orignalBatch === "" ? (
                      <span style={{ fontWeight: "bold", color: "red" }}>
                        {this.state.errormesg}
                      </span>
                    ) : (
                      ""
                    )}{" "}
                  </Col>
                  <Col></Col>
                  <Col></Col>
                  <Col></Col>
                </Row>
              </div>
              {/* ) : (
                ""
              )} */}
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",

                  marginTop: "5px",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Specific Packaging</b>
              </div>

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Packaging ID</Label>{" "}
                </Col>
                <Col>
                  <Input
                    type="select"
                    name="idPackaging"
                    bsSize="sm"
                    value={this.state.idPackaging}
                    onChange={this.onChangeHandler}
                  >
                    <option value="">---select-----</option>
                    {this.state.ListOfPackaging.length !== 0
                      ? this.state.ListOfPackaging.map((data) => (
                          <option
                            value={data.idPackaging}
                            key={data.idPackaging}
                          >
                            {data.description}
                          </option>
                        ))
                      : ""}
                  </Input>
                </Col>

                <Col>
                  {" "}
                  {this.state.idPackaging === "" ? (
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      {this.state.errormesg}
                    </span>
                  ) : (
                    ""
                  )}{" "}
                </Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Height(m)</Label>{" "}
                </Col>

                <Col>
                  <Input
                    bsSize="sm"
                    value={this.state.height}
                    onChange={this.onChangeHandler}
                    name="height"
                  />
                </Col>

                <Col> </Col>
                <Col>
                  <Label>Weight(kg)</Label>{" "}
                </Col>
                <Col>
                  <Input
                    bsSize="sm"
                    value={this.state.weight}
                    onChange={this.onChangeHandler}
                    name="weight"
                  />
                </Col>

                <Col> </Col>
              </Row>

              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",

                  marginTop: "5px",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Status</b>
              </div>

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Motive</Label>{" "}
                </Col>
                <Col>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    bsSize="sm"
                  >
                    <option>Entry</option>
                    <option>Entry PO open</option>
                    {/* <option></option>
                  <option></option>
                  <option></option> */}
                  </Input>
                </Col>

                <Col></Col>
                <Col>
                  <Label>Comment</Label>{" "}
                </Col>
                <Col>
                  <Input
                    bsSize="sm"
                    value={this.state.comment}
                    name="comment"
                    onChange={this.onChangeHandler}
                  />
                </Col>
                <Col> </Col>
              </Row>

              <Row style={{ marginTop: "5px" }}>
                <Col>
                  <Label>Print label</Label>{" "}
                </Col>
                <Col>
                  <input
                    type="checkbox"
                    name="printlabel"
                    value={this.state.printlabel}
                    checked={this.state.printlabel === true}
                    onChange={this.printlabelhandler}
                  ></input>
                </Col>

                <Col></Col>
                <Col>
                  <Label>Printers</Label>{" "}
                </Col>
                <Col>
                  <Input
                    type="select"
                    name="idExchange"
                    bsSize="sm"
                    onChange={this.onChangeHandler}
                    value={this.state.idExchange}
                  >
                    <option value="">---select---</option>
                    {this.state.ListOfPrinter.length !== 0
                      ? this.state.ListOfPrinter.map((data) => (
                          <option key={data.idExchange} value={data.idExchange}>
                            {data.description}
                          </option>
                        ))
                      : ""}
                  </Input>
                </Col>
                <Col>
                  {" "}
                  {this.state.printlabel === true &&
                  this.state.idExchange === "" ? (
                    <span style={{ fontWeight: "bold", color: "red" }}>
                      {this.state.errormesg}
                    </span>
                  ) : (
                    ""
                  )}{" "}
                </Col>

                {/* <Col> </Col> */}
              </Row>

              <div style={{ marginTop: "20px", marginBottom: "20px" }}>
                {CONTAINER_CREATION === 2 ? (
                  <Button onClick={() => this.Submithandler()}>Validate</Button>
                ) : (
                  ""
                )}
                &nbsp; &nbsp;
                {this.state.qtyToCreate > this.state.Creationlimit ? (
                  <span
                    style={{
                      color: "red",
                      fontWeight: "bold",
                    }}
                  >
                    {this.state.errormesg3}
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default ContainerCreation;
