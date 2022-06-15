import React,{ Component } from "react";
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import {
    IoArrowBackCircleSharp,
    IoArrowForwardCircleSharp,
    IoSearch,
  } from "react-icons/io5";
  import { Container, Row, Col, Button } from "reactstrap";
  import { listOfContainerInRepacking, remover } from "../../../store/Store";
  import { FcSearch } from "react-icons/fc";
  import axios from "axios";
class DisplayListOfContainers extends Component{
    constructor(props){
        super(props)
        this.state = {
            data:[]
        }
    }
componentDidMount(){
  
   console.log("=======", listOfContainerInRepacking)
   axios.post("http://localhost:8080/repacking/getListOfContainersByIdRepackingLine/"+listOfContainerInRepacking.idRepackingLine)
   .then((response)=>{
       if(response.status===200)
       {
        console.log(response.data);
           this.setState({
               
               data: response.data
           })
       }
   })
   .catch((error)=>{
        console.log(error);
   })
}

refreshhandler=()=>{
    axios.post("http://localhost:8080/repacking/getListOfContainersByIdRepackingLine/"+listOfContainerInRepacking.idRepackingLine)
   .then((response)=>{
       if(response.status===200)
       {
        console.log(response.data);
           this.setState({
               
               data: response.data
           })
       }
   })
   .catch((error)=>{
        console.log(error);
   })
}

backHandler=()=>{
    console.log("calling back handler for DisplayRepackingEdit list")
    remover("DisplayListOfContainers")
    this.props.DisplayListOfContainersCloseHandler()
  }

    render() {
        const columns = [
         
          {
            Header: "ID",
            accessor: "idCtnRepackingLine",
          },
    
    
    
          {
            Header: "Container No",
            accessor: "idContainer",
          },
          {
            Header: "Counter container",
            accessor: "counterContainer",
          },
    
    
          {
            Header: "Weight",
            accessor: "weight",
          },
          {
            Header: "Bag number",
            accessor: "bagNumber",
          },
          {
            Header: "Modified the",
            accessor: "mdate",
            Cell: (props) => {
                return (
                  <span>
                    {props.original.mdate === undefined
                      ? ""
                      : props.original.mdate === null
                      ? ""
                      : props.original.mdate === ""
                      ? ""
                      : props.original.mdate
                          .replace("T", " ")}
                  </span>
                );
                    }
          },
          {
            Header: " Modified By",
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
                        <a>Home</a>
                      </b>
                    </u>{" "}
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a >Repacking search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a>Repackings</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                  {" "}
                  <b>
                    {" "}
                    <a onClick={this.backHandler}>Repacking Line</a>
                  </b>
                </u>
                &#62;
                    <u>
                  {" "}
                  <b>
                    {" "}
                    <a>Repacking Containers</a>
                  </b>
                </u>
                  </span>
                  <br />
                  <br />
                  
                  {/* <div> */}
                  <Button style={{ float: "right", marginTop: "-38px" }} color="secondary" 
                    onClick={this.refreshhandler}
                  >Refresh</Button>
                  <ReactTable
                    className="-striped -highlight "
                    //   data={this.state.data}
                    data={this.state.data
                    }
    
                    columns={columns}
                    defaultPageSize={5}
                    //showPaginationTop= {true}
                    filterable
                    defaultFilterMethod={this.filterCaseInsensitive}
                  />
                  {/* </div> */}
    
    
                  <Row style={{
                    marginTop: "10px",
    
                  }}>
    
    
                    <br />
    
                  </Row>
                </div>
    
    
          </React.Fragment>
        );
      }
}

export default DisplayListOfContainers