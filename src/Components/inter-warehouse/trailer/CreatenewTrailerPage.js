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
import InterwarehouseTrailerList from "../../inter-warehouse/trailer/InterwarehouseTrailerList";
import { intertrailerdata, intertrailerHandler, remover } from "../../../store/Store";
import axios from "axios";
import { FaSave } from "react-icons/fa";

export default class CreatenewTrailerPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShow: false,
      tableData: [],
    };
  }

  submithandler = () => {
    console.log("Display list calling");
    this.getbodylist();
    this.setState({
      isShow: true,
    });
  };

  getbodylist = () => {
    console.log("bodylist calling");
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response);

          this.setState({
            tableData: response.data,
          });
          intertrailerHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  backhandler = () => {
    console.log("arqum Back Handler calling");
    remover("CreatenewTrailerPage");
    this.props.NewCloseHandler();
  };
  render() {
    return (
      <React.Fragment>
        <Container className="themed-container" fluid={true}>
          <div>
            <IoArrowBackCircleSharp onClick={this.backhandler} />
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
                  <a>WH trailers</a>
                </b>
              </u>{" "}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a>WH trailers management</a>
                </b>
              </u>{" "}
              &#62;
              <u>
                {" "}
                <b>
                  {" "}
                  <a>WH trailer edition </a>
                </b>
              </u>{" "}
            </span>
            <br />
            <div>
            <Row  >
              <Col style={{marginLeft:"10px"}}>
                <span>
                    <u><b><FaSave/>Create</b></u>
                </span>
              </Col>

              <Col>
                {" "}
                
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                {" "}
              </Col>
              <Col>
               
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
                    
</div>
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
                margin:"10px"
              }}
            >
               
              <b style={{ marginLeft: "5px" }}>TRAILER DESCRIPTION</b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Driver name</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Trailer Identif</Label>{" "}
              </Col>
              <Col>
                <Input bsSize="sm" />
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>BarCode</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" />
              </Col>
              <Col></Col>

              <Col> </Col>
              <Col>
                <Label>Trailer Type</Label>{" "}
              </Col>
              <Col>
              <Input
                  type="select"
                  bsSize="sm"
                  value={this.state.typePackaging}
                  required="true"
                  name="Trailer Type"
                  onChange={this.onchangehandler}
                >
                  <option value="100">_40-Feet-container_</option>
                  <option value="200">_20-Feet-container_</option>
                  
                </Input>
              </Col>
              <Col></Col>
              <Col> </Col>
            </Row>

            <Row style={{marginTop:"10px"}}>
              <Col>
                <Label>Empty Weight(kg)</Label>{" "}
              </Col>
              <Col>
                {" "}
                <Input
                    id="exampleSelect"
                    bsSize="sm"
                    />
                   
                 

              </Col>
              <Col></Col>

              <Col></Col>
              <Col> <Label>Recording Gate</Label>{" "}</Col>
              <Col> 
               <Input
                  type="select"
                  bsSize="sm"
                  value={this.state.typePackaging}
                  required="true"
                  name="Recording Gate"
                  onChange={this.onchangehandler}
                >
                  <option value="100">_RT1-Gate-Remote-Terminal_</option>
                  <option value="200">_Wh-Gate-Enterence_1</option>
                  
                </Input>
                </Col>
              <Col></Col>
              <Col> </Col>
            </Row>
            <Row style={{ marginTop:"10px" }}>
              <Col><Label>Exp containerNo</Label>{" "}</Col>
              <Col><Input
                   
                   id="exampleSelect"
                   bsSize="sm"
                   
                 /></Col>
              <Col></Col>

              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col> </Col>
            </Row>

          </div>

         <Row style={{ marginTop:"10px" }}>
              <Col>{" "}</Col>
              <Col></Col>
              <Col></Col>

              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col></Col>
              <Col> </Col>
            </Row>
<div>

</div>
        </Container>
      </React.Fragment>
    );
  }
}
