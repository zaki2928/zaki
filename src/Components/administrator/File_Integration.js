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
  IoInformation,
  IoInformationCircle,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import axios from "axios";
import xmlparser from "react-xml-parser";

import SiloRepackingList from "../Silo/SiloRepackingList";
import {properties} from "../../Properties/Properties"
import { FILE_INTEGRATION } from "../../store/RoleBased";

const fileIntegrate = properties.Port + properties.fileIntegrate

class File_Integration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      silolist: false,
      selectedFile: "",
      xmlFileData: "",
      deleteContent: false,
      checked: true,
      error: "",
      color: "",
    };
  }
  onFileChangeHandler = (e) => {
    e.preventDefault();
    this.setState({
      selectedFile: e.target.files[0],
    });
    console.log("selected filefsfjhgjghjg", this.state.selectedFile);
    const formData = new FormData();
    formData.append("file", this.state.selectedFile);
  };

  // submithandler() {
  //   var self = this;
  //   axios
  //     .get("https://fakerestapi.azurewebsites.net/api/Authors", {
  //       "Content-Type": "application/xml; charset=utf-8",
  //     })
  //     .then(function (response) {
  //       self.setState({ authors: response.data });
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }

  handlesubmit = () => {
    // event.preventDefault();
    console.log("handle submit call4u5y438thfjdgt83yt", this.state.xmlFileData);
    var config = {
      headers: { "Content-Type": "text/xml" },
    };
    axios
      .post(
        fileIntegrate,
        this.state.xmlFileData,
        config
      )
      .then((response) => {
        // console.log("ibrahim data", response.config.data);
        if (response.status === 200) {
          console.log("response 200 success", response.data);
          this.setState({
            selectedFile: "",
            xmlFileData: "",
            error: "File integrated successfully ",
            color: "green",
          });
        } else {
          console.log("paath is wrong");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changehandler = (event) => {
    console.log("change selectedFile", event.target.files[0].type);
    if (event.target.files[0].type === "text/xml") {
      const reader = new FileReader();
      const parser = new DOMParser();
      reader.readAsText(event.target.files[0]);
      reader.onloadend = (evt) => {
        const readerdata = parser.parseFromString(
          evt.target.result,
          "text/xml"
        );

        //  console.log("reader dsta", new XMLSerializer().serializeToString(readerdata.documentElement))
        var XMLParser = require("react-xml-parser");
        var newXML = new XMLParser().parseFromString(
          new XMLSerializer().serializeToString(readerdata)
        );
        console.log("shahiddddddddddddddddddddddddd", newXML);
        // StringWriter writer = new StringWriter();
        this.setState(
          {
            error: "",
            xmlFileData: new XMLSerializer().serializeToString(
              readerdata.documentElement
            ),
            selectedFile: event.target.files[0].name,
          },
          () => console.log("testfbdjskhxfcnkfd", this.state.xmlFileData)
        );
      };
    } else {
      this.setState({
        error: "Invalid file format",
        color: "red",
        xmlFileData: "",
        selectedFile: "",
      });
    }
  };

  umarshalXMLtoString() {}

  onchangehandler = (event) => {
    console.log("change");
    if (this.state.checked === false) {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      console.log("Read Only Mode");
    }
  };

  onCheckBoxChnage = () => {
    if (this.state.checked === false) {
      this.setState({
        checked: true,
      });
    } else {
      this.setState({
        checked: false,
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <form>
          <Container
            className="themed-container"
            fluid={true}
            style={{
              border: "1px solid black",
              marginLeft: "14px",
              marginBottom: "15px",
            }}
          >
            {this.state.silolist === true ? (
              <File_Integration />
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
                  >
                  <u>
                    {" "}
                    <b>
                      {" "}
                      <a>File Integration</a>
                    </b>
                  </u>
                </span>
                <br />
                <div
                  style={{
                    border: "1px",
                    //   backgroundColor: "#0080ff",
                    border: "1px solid black",
                  }}
                >
                  <b style={{ marginLeft: "5px" }}>File to Integrate</b>
                </div>

                <Row style={{ marginTop: "5px" }}>
                  <Col>
                    <input
                      // accept="All/*"
                      accept=".xml"
                      // className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      // value=""
                      onChange={this.changehandler}
                    />{" "}
                  </Col>
                </Row>

                <Row style={{ marginTop: "5px" }}>
                  <Col>
                    {/* <Button color="secondary"
                            size="sm"
                      style={{marginTop:"3px",marginBottom:"10px"
                    }}>Send File</Button> */}
                  </Col>

                  <Col>
                    <Input
                      style={{ marginTop: "3px", marginBottom: "4px" }}
                      bsSize="sm"
                      value={this.state.selectedFile}
                    />
                  </Col>

                  <Col>
                  {FILE_INTEGRATION ===2 ? 
                    <Button
                      type="reset"
                      onClick={() =>
                        this.setState({
                          xmlFileData: "",
                          selectedFile: "",
                        })
                      }
                      color="secondary"
                      size="sm"
                      style={{ marginTop: "3px" }}
                    >
                      Delete
                    </Button>
                    :''}
                  </Col>
                </Row>
                <div style={{}}></div>
              </div>
            )}
          </Container>

          <Container
            className="themed-container"
            fluid={true}
            style={{
              border: "1px solid black",
              marginLeft: "14px",
              marginTop: "5px",
            }}
          >
            {this.state.silolist === true ? (
              <File_Integration />
            ) : (
              <div>
                <div style={{}}>
                  <a style={{ marginLeft: "5px" }}>Read Only</a>
                  {"  "}
                  <input
                    type="checkbox"
                    checked={this.state.checked}
                    onChange={this.onCheckBoxChnage}
                    id="myid"
                  ></input>{" "}
                  <button
                    type="button"
                    onClick={() =>
                      this.setState({
                        xmlFileData: "",
                        // selectedFile:""
                      })
                    }
                  >
                    RESET
                  </button>
                  {/* <Button onClick={()=>this.setState({
                xmlFileData:"",
                // selectedFile:""
              })} color="secondary" 
                            size="sm"
                      >Reset</Button> */}
                </div>

                <Row style={{ marginTop: "5px" }}>
                  {/* <textarea   id="outlined-basic" label="Outlined" variant="outlined"/> */}
                  {/* <input style={{marginTop:"5px"}}  /> */}
                  <textarea
                    rows="6"
                    cols="160"
                    name="comment"
                    form="usrform"
                    name="xmlFileData"
                    onChange={this.onchangehandler}
                    value={this.state.xmlFileData}
                    style={{
                      marginTop: "3px",
                      marginLeft: "15px",
                      height: "200px",
                      //   backgroundColor: "#0080ff",
                      border: "1px solid black",
                    }}
                  />
                  <br />
                  <span
                    style={{
                      fontWeight: "bold",
                      color: this.state.color,
                      marginLeft: "15px",
                    }}
                  >
                    {this.state.error}
                  </span>

                  {/* <input  
     value={this.state.xmlfiledata}
     style={{marginTop:"3px",marginLeft:"5px",marginRight:"5px",border: "1px",height:"200px",
                //   backgroundColor: "#0080ff",
                  border: "1px solid black",}}  />  */}
                  {/* {this.state.xmlFileData} */}
                </Row>

                <Row style={{ marginTop: "5px" }}>
                  <Col>
                    <a>Document Name </a>
                  </Col>

                  <Col>
                    <Input
                      style={{ marginTop: "5px" }}
                      bsSize="sm"
                      value={this.state.selectedFile}
                    />
                  </Col>

                  <Col>
                  {FILE_INTEGRATION ===2 ? 
                    <Button
                      type="reset"
                      color="secondary"
                      size="sm"
                      onClick={() => this.handlesubmit()}
                      style={{ marginTop: "3px", marginBottom: "10px" }}
                    >
                      Integrate
                    </Button>
                    :''}
                  </Col>
                </Row>
              </div>
            )}
          </Container>
        </form>
      </React.Fragment>
    );
  }
}

export default File_Integration;
