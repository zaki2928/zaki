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
import Swal from "sweetalert2";
import axios from "axios"

class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      login: '',
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      error: "",
    };
  }


  saveHandler() {
    Swal.fire({
      title: 'Information',
      text: "The demand has been taken in account",
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: 'gray',
      cancelButtonColor: 'gray',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(

          'Done',
          'success'
        )
      }
    })
  }

  changePassword = () => {
    console.log("changeUserPassword calling", this.state);
    if (this.Validate()) {
      
    
    axios
      .post("http://localhost:8080/user/changeUserPassword/" + this.state.login + "/" + this.state.oldPassword + "/" + this.state.newPassword)
      // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
      .then((response) => {

        if (response.status === 200) {
          console.log("resposne success login", response.data);

        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
    else{
      console.log("error_____________________00999099")
    }
  };

  ChangePasswordValidator = (password) => {
    if (password !== "") {
      console.log("true")
      return true
    }
    else
      console.log(false)
    return false;
  }

  Validate = () => {
    if (this.ChangePasswordValidator(this.state.newPassword) === true && this.ChangePasswordValidator(this.state.confirmPassword) === true) {
      console.log("password not empty")
      this.setState({
        error: ""
      })
      if (this.state.newPassword === this.state.confirmPassword) {
        console.log("password matched")
        this.setState({
          error: ""
        })
        return true
      }
      else {
        console.log("password not matched")
        this.setState({
          error: "password is not matched"
        })
        return false
      }
    }

    else {

      this.setState({
        error: "password is empty",
      })
      return false
    }
  }

  ChangeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
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
                  <a>Password</a>
                </b>
              </u>
            </span>
            <br />
            <div
              style={{
                border: "1px",
                backgroundColor: "grey",
                border: "1px solid black",
                marginTop: "10px",
                marginBottom: "10px"
              }}
            >
              <b style={{ marginLeft: "5px" }}>Modify Your Password</b>
            </div>


            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Login</Label>{" "}
              </Col>

              <Col>

                <Input
                  type="text"
                  value={this.state.login}
                  name="login"
                  onChange={this.ChangeHandler}


                  // style={{ width: "60px" }}
                  bsSize="sm"
                >

                </Input>

              </Col>


              <Col> </Col>
              <Col> </Col>

            </Row>

            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Old Password</Label>{" "}
              </Col>

              <Col>

                <Input
                  type="password"
                  value={this.state.oldPassword}
                  name="oldPassword"
                  onChange={this.ChangeHandler}


                  // style={{ width: "60px" }}
                  bsSize="sm"
                >

                </Input>

              </Col>


              <Col> </Col>
              <Col> </Col>

            </Row>



            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>New Password</Label>{" "}
              </Col>

              <Col>

                <Input
                  value={this.state.newPassword}
                  name="newPassword"
                  onChange={this.ChangeHandler}
                  bsSize="sm"
                />

              </Col>


              <Col> </Col>
              <Col> </Col>

            </Row>
            <Row style={{ marginTop: "10px" }}>
              <Col>
                <Label>Confirm Password</Label>{" "}
              </Col>

              <Col>

                <Input
                  type="password"
                  value={this.state.confirmPassword}
                  name="confirmPassword"
                  onChange={this.ChangeHandler}

                  // style={{ width: "60px" }}
                  bsSize="sm"
                >

                </Input>

              </Col>


              <Col> </Col>
              <Col> </Col>

            </Row>
              <Row>
                <Col xs='4' sm={{ offset: 1 }}>
            <p style={{color:"red", fontWeight:"bold",fontSize:"12px"}}>{this.state.error}</p>
                  
                </Col>
              </Row>


            <div style={{ marginTop: "20px", marginBottom: "20px" }}>


              <Button style={{ marginLeft: "5px" }} onClick={() => this.changePassword()}>Save</Button>
              <Button style={{ marginLeft: "5px" }} >Reset</Button>

              {" "}

            </div>

          </div>

        </Container>
      </React.Fragment>
    );
  }
}

export default ChangePassword;