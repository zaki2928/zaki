import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import {
  Container,
  Row,
  Col,
  Label,
  Input,
} from "reactstrap";
import "react-table-v6/react-table.css";
import { FaSave } from 'react-icons/fa';
import { ProdDispEditData, ProductEditData,LogisticUnitEditData,LogisticUnitEditHandler,NestedLogisticUnitHandler,  remover } from '../../../../store/Store';
import axios from 'axios'
import { properties } from '../../../../Properties/Properties';
import { LOGISTIC_UNIT } from '../../../../store/RoleBased';

const updateProductKLLUbyLUid = properties.Port + properties.updateProductKLLUbyLUid
class LogisticUnitEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      
     
      description: "",
      idProduct: "",
      idReference: "",
      mDate: "",
      mUsername: "",
      rotation: "",
      zGrade: "",
      zIMC: "",
      controlQty: '',
      description: "",
      height: '',
      idLU: '',
      idLogisticUnit: "",
      idProduct: '',
      length: '',
      mDate: '',
      mUsername: '',
      quantity: '',
      statusError: '',
      statusLu: '',
      versionLock: '',
      weight: '',
      weightNet: '',
      width: '',
      prodDescription:'',
      prodGrade:'',
      prodIMC:'',
      prodProduct:'',

    };
  }

  componentDidMount() {
    console.log("calling edifsdhkjdhfksdjhfkdshfWarehouseEditDatat", LogisticUnitEditData)
    if (LogisticUnitEditData !== null) {
      this.setState(
        {
          data: [],
        },
        () => {
          console.log("data present after tab switch in LUUUUUUUUU", this.state.data);
          this.setState({
            description: LogisticUnitEditData.description,
            height: LogisticUnitEditData.height,
            idLU: LogisticUnitEditData.idLU,
            idLogisticUnit: LogisticUnitEditData.idLogisticUnit,
            idProduct: LogisticUnitEditData.idProduct,
            length: LogisticUnitEditData.length,
            mDate: LogisticUnitEditData.mDate,
            mUsername: LogisticUnitEditData.mUsername,
            quantity: LogisticUnitEditData.quantity,
            statusError: LogisticUnitEditData.statusError,
            statusLu: LogisticUnitEditData.statusLu,
            versionLock: LogisticUnitEditData.versionLock,
            weight: LogisticUnitEditData.weight,
            weightNet: LogisticUnitEditData.weightNet,
            width: LogisticUnitEditData.width,
           
            
          });
          if(LogisticUnitEditData.productKLEntity!==null){
            this.setState({
             prodDescription: LogisticUnitEditData.productKLEntity.description,
            prodGrade: LogisticUnitEditData.productKLEntity.zGrade,
            prodIMC: LogisticUnitEditData.productKLEntity.zIMC,
            prodProduct: LogisticUnitEditData.productKLEntity.idReference
            })
          }
          if(LogisticUnitEditData.productKLEntity===null){
            this.setState({
             prodDescription: LogisticUnitEditData.description,
            prodGrade: LogisticUnitEditData.zGrade,
            prodIMC: LogisticUnitEditData.zIMC,
            prodProduct: LogisticUnitEditData.idReference
            })
          }

        }
      );
    }else{

    }

  }
  backHandler = () => {
   
    console.log(",LogisticUnitEditData.productKLEntity",LogisticUnitEditData)
   
    if (LogisticUnitEditData.productKLEntity===null ) {
      console.log("true")
      this.props.lUeditClosehandler(true)
    }else{
      console.log("false")
      this.props.lUeditClosehandler(false)
    }
    remover("LogisticUnitEdit")
    // this.props.lUeditClosehandler()
  }

  onchangehandler = (event) => {
    console.log("onchangehandler");
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  updateLUproduct = () => {
    console.log("edit LU product  by id", this.state);
    axios
      .put(updateProductKLLUbyLUid, this.state)
      // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
      .then((response) => {
        if (response.status === 200) {
          console.log("resposne success", response.data);
          console.log("resposne success update", LogisticUnitEditData.productKLEntity);
          
          if (LogisticUnitEditData.productKLEntity!==null) {
            NestedLogisticUnitHandler(response.data);
          }
          // NestedLogisticUnitHandler(response.data);
          // LogisticUnitEditHandler(response.data);
          this.setState({
            message: "Data Saved Successfully",
          });

          // ProductHandler(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
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

    ]

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
                <a>Logistic Units Search</a>
              </b>
            </u>
                    &#62;
                    <u>
              {" "}
              <b>
                {" "}
                <a style={{cursor:"pointer"}} onClick={this.backHandler}>Logistic Units Management</a>
              </b>
            </u>
                    &#62;
                    <u>
              {" "}
              <b>
                {" "}
                <a>Logistic Units Edition</a>
              </b>
            </u>

          </span>
          <br />

          <div>
            <div class="row-xs-6 bottom-row ">
              <FaSave

              //   onClick={() => this.edithandler(props.original)}
              >

              </FaSave>{" "}
              {LOGISTIC_UNIT===2 ?  <a style={{ cursor: "pointer", fontWeight: "bold", color: "blue" }}>
              <u onClick={this.updateLUproduct}>Save</u>
            </a> : ''}
              {/* <button >Configure</button> */}
              {/* <a onClick={this.updateLUproduct}>Save</a>{" "} */}
            </div>
          </div>
          <div>
            <hr />
            <Row style={{ marginTop: "0px" }}>
              <Col>
                <Label>Product</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.prodProduct} />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Product description</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.prodDescription} />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col >
                <Label>Intermediate material code</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.prodIMC} />
              </Col>

              <Col> </Col>
              <Col>
                <Label>Grade</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.prodGrade} />
              </Col>
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
                marginTop: "10px"
              }}
            >
              <b style={{ marginLeft: "5px" }}>Status</b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Logistic Unit Id</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm"
                  value={this.state.idLogisticUnit}
                />
              </Col>

              <Col> </Col>
              <Col>
                <Label> Description</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm"
                  value={this.state.description}
                  onChange={this.onchangehandler}
                  name="description"
                />
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col >
                <Label>Error Status</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  // style={{ width: "50px" }}
                  bsSize="sm"
                  value={this.state.statusError}
                  disabled
                  
                >
                  <option value="100">_NoError_</option>
                  <option value="200">saudi kayan</option>

                </Input>
              </Col>

              <Col> </Col>
              <Col>
                <Label>Status</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input
                  type="select"
                  name="select"
                  id="exampleSelect"
                  // style={{ width: "50px" }}
                  bsSize="sm"
                  value={this.state.statusLu}
                  disabled
                >
                  <option value="100">In_Progress</option>
                  <option value="200">saudi kayan</option>

                </Input>
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col >
                <Label>Modified By</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm"  value={this.state.mUsername}/>
              </Col>

              <Col> </Col>
              <Col>
                <Label>Modified The</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.mDate} />
              </Col>
              <Col> </Col>
            </Row>

            <div>
              <hr />
              <div
                style={{
                  border: "1px",
                  backgroundColor: "grey",
                  border: "1px solid black",
                }}
              >
                <b style={{ marginLeft: "5px" }}>Quantity</b>
              </div>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <Label>Quantity(PAL)</Label>{" "}
                </Col>

                <Col>
                  {" "}
                  <Input

                    bsSize="sm"
                    value={this.state.quantity}
                  >


                  </Input>
                </Col>

                <Col> </Col>
                <Col>
                  {/* <Label>Material type</Label>{" "} */}
                </Col>

                <Col>
                  {" "}
                  {/* <Input bsSize="sm" /> */}
                </Col>
                <Col> </Col>
              </Row>

            </div>
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
                marginTop: "10px"
              }}
            >
              <b style={{ marginLeft: "5px" }}>Dimensions</b>
            </div>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Length(cm)</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm" value={this.state.length}/>
              </Col>

              <Col> </Col>
              <Col>
                <Label> Weight(g)</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm"  value={this.state.weight}/>
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col >
                <Label>Width(cm)</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input

                  // style={{ width: "50px" }}
                  bsSize="sm"
                  value={this.state.width}
                >


                </Input>
              </Col>

              <Col> </Col>
              <Col>
                <Label>Weight Net(g)</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input

                  bsSize="sm"
                  value={this.state.weightNet}
                >


                </Input>
              </Col>
              <Col> </Col>
            </Row>

            <Row style={{ marginTop: "3px" }}>
              <Col >
                <Label>Height(cm)</Label>{" "}
              </Col>

              <Col>
                {" "}
                <Input bsSize="sm"  value={this.state.height} />
              </Col>

              <Col> </Col>
              <Col>
                {/* <Label>Modified The</Label>{" "} */}
              </Col>

              <Col>
                {" "}
                {/* <Input bsSize="sm" type="date" /> */}
              </Col>
              <Col> </Col>
            </Row>



          </div>
          <div
            style={{
              border: "1px",
              backgroundColor: "grey",
              border: "1px solid black",
              marginTop: "10px",
              marginBottom: "5px"
            }}
          >
            <b style={{ marginLeft: "5px" }}>Bar Code</b>
          </div>
          <ReactTable
            className="-striped -highlight "
            data={this.state.data.length === 0
              ? this.props.data2 : this.state.data
            }
            columns={columns}
            defaultPageSize={0}
            // showPaginationTop= {true}
            filterable
          />
        </Container>

      </React.Fragment>
    );
  }
}

export default LogisticUnitEdit;