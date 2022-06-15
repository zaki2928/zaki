import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import { Container, Row, Col, Button } from "reactstrap";
import {Formdata, remover } from "../../../../store/Store";
import {
  IoArrowBackCircleSharp,
  IoArrowForwardCircleSharp,
} from "react-icons/io5";
import { FcSearch } from "react-icons/fc";
import Swal from "sweetalert2";
class DisplayLastGenModal extends Component {
  constructor(props) {
    super(props);
     this.state = {
   
        data: [],
      }
  }

componentDidMount=()=>{
if (Formdata.length !== 0) {
  this.setState({
    data: Formdata
  })
}else{
  this.setState({
    data: this.props.data
  })
}
  }

  releaseTrailerMethod=()=>{
    Swal.fire({
      title: 'Do you want to Release Trailer?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Release`,
      denyButtonText: `Don't Release`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  }

  backHandler=()=>{
    console.log("calling back handler for list")
    remover("Loading Instruction")
    this.props.backHandler()
  }

    render() {
        
        return (
            <React.Fragment>
              <div>
              <IoArrowBackCircleSharp onClick={this.backHandler}/>
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
                        <a>Loading Instruction</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a> Display Last Generated Modal</a>
                      </b>
                    </u>
                  </span>
                  <br />
              </div>
              
                
          
            <br/>
            <Container className="themed-container"
              fluid={true}
              style={{ border: "1px solid grey" }}>
              <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                <Button
                  onClick={
                   this.releaseTrailerMethod
                  }
                >
                  {" "}
                  No data due to database 
                </Button>
              </div>
            </Container><br/>
            
        </React.Fragment>

        );
    }
}

export default DisplayLastGenModal;