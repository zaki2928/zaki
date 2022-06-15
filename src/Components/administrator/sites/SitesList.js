import React, { Component } from 'react';
import ReactTable from "react-table-v6";
import "react-table-v6/react-table.css";
import SitesEdit from './SitesEdit';
import { FaEdit, FaTrashAlt, FaFileSignature, FaPrint, FaFileExport, FaUsers, FaWrench } from "react-icons/fa";
import Swal from "sweetalert2";
import { SitesData, SitesEditData, SitesEditHandler, remover,siteid } from '../../../store/Store';
import { SitesNewData, SitesNewHandler } from "../../../store/Store";
import { SiteParamData, SiteParamHandler } from "../../../store/Store";
import SitesNew from "./SitesNew";
import SitesContact from "./SitesContact";
import axios from "axios";
import { SiteContactsHandler, SiteCriteriaData, SitesCriteriaHandler, ContactsData } from "../../../store/Store";
import SiteParamList from './SiteParamList';
import jsPDF from "jspdf";
import "jspdf-autotable";
import { properties } from '../../../Properties/Properties';
import { SITES } from '../../../store/RoleBased';

const GetListOfSites =
  properties.Port + properties.GetListOfSites;
const deleteSite = properties.Port + properties.deleteSite
class SitesList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data2: [],
      generalEdit: false,
      customer: false,
      customerArr: [],
      Contacts: false,
      ContactsArr: [],
      Parameter: false,
      ParameterArr: [],

    };
  }

  componentDidMount = () => {
    if (SitesData.length !== 0) {
      this.setState({
        data: SitesData
      })
    } else {
      this.setState({
        data: this.props.data
      })
    }
  }

  backHandler = () => {
    console.log("calling back handler for list")
    remover(siteid)
    this.props.backHandler()
  }


  editHandler = (props) => {
    console.log("check props dataaaaaa", props)
    this.setState({
      generalEdit: true,

    })
    this.state.data2.push(props)
    SitesEditHandler(props)
  }


  editClosehandler = () => {
    this.setState({
      generalEdit: false,
    })
  }






  exportPDF = () => {
    console.log("export pdf callingn");
    const unit = "pt";
    const size = "A1"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 1100;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(13);

    const title = "SIMPANA";

    const headers = [
      [
        "ID",
        "Number",
        "Name",
        "Address1",
        "Address2",
        "Address3",
        "Address4",
        "Post Code",
        "Town",
        "Country Code",
        "Country",
        "Phone",
        "Fax",
        "Email",
        "Modified The",
        "Modified By",

      ],
    ];

    const data1 = this.state.data.map((elt) => [


      elt.idSite,
      elt.siteNum,
      elt.businessName,
      elt.address1,
      elt.address2,
      elt.address3,
      elt.address4,
      elt.postCode,
      elt.town,
      elt.countryCode,
      elt.phone,
      elt.fax,
      elt.email,
      elt.mDate,
      elt.mUsername,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data1,
      setFontSize: 2,
    };

    doc.text(title, marginLeft, 30);
    // doc.setFontSize(1);
    doc.autoTable(content);
    doc.save("report.pdf");
  };



  CustomerEditionHandler = (props) => {
    console.log("customer handler calling")
    SitesNewHandler(props)
    this.setState({
      customer: true,
    })
    this.state.customerArr.push(props);
  }


  customerCloseHandler = () => {
    this.setState({
      customer: false,
    })
  }


  ContactsHandler = (props) => {
    SiteContactsHandler(props)
    this.setState({
      Contacts: true,
    })
    this.state.ContactsArr.push(props);
  }


  ContactsCloseHandler = () => {
    this.setState({
      Contacts: false,
    })
  }

  SiteParameterHandler = (props) => {
    SiteParamHandler(props)
    this.setState({
      Parameter: true,
      ParameterArr: props,
    })
    SiteParamHandler(props)
  }


  SiteParamCloseHandler = () => {
    this.setState({
      Parameter: false,
    })
  }

  deleteHandler = (props) => {
    console.log("product id isssss", props.idSite)
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "gray",
      cancelButtonColor: "gray",
      confirmButtonText: "Yes, delete it!",
      msg: "",
    }).then((result) => {
      if (result) {
        axios.delete(deleteSite + props.idSite)
          .then((response) => {
            console.log(" data", response);
            if (response.status === 200) {
              console.log("response data 200 success");
              this.setState({
                msg: ""
              })
              this.componentDidMount();
              this.refreshHandler();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }

            else {
              this.setState({
                msg: "Invalid Site ID"
              })
            }

          })
          .catch((error) => {
            console.log(error);
          });
        // Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });

  }

  //   deleteHandler=(props)=>{
  //     console.log("siteid",props.idSite)
  //     Swal.fire({
  //       title: 'Confirmation',
  //       text: "Do you confirm the deletion?",
  //       icon: 'warning',
  //       showCancelButton: true,
  //       confirmButtonColor: 'gray',
  //       cancelButtonColor: 'gray',
  //       confirmButtonText: 'Yes, delete it!'
  //     }).then((result) =>{ if (result) {
  //       console.log("siteid",props.idSite)
  //     axios.delete("http://localhost:8080/site/deleteSite/" + props.idSite)
  //       .then((response) => {
  //         console.log(" data", response);
  //         if (response.status === 200 && response.data === 200) {
  //           console.log("response data 200 success");
  //           this.setState({
  //             msg:""
  //           })
  //           this.componentDidMount();
  //           Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //         }

  //         else{
  //           this.setState({
  //             msg: "Invalid  Site ID"
  //           })  
  //         }

  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     // Swal.fire("Deleted!", "Your file has been deleted.", "success");
  //   }
  //  } );
  //   }
  refreshHandler = () => {
    console.log("submitHandler calling", this.state.limit)
    const contact = {
      listFilterBean: this.state.listFilterBean,
      limit: this.state.limit,
    };

    axios.post(GetListOfSites, SiteCriteriaData, {
      params: SiteCriteriaData.limit
    }
    )
      .then((response) => {
        if (response.status === 200 && response.data.length !== 0) {
          console.log("resposne success", response.data);
          this.setState({
            data: response.data,

          })

          SitesCriteriaHandler(response.data);

        } else {
          this.setState({
            data: [],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

  }

  filterCaseInsensitive(filter, row) {
    const id = filter.pivotId || filter.id;
    if (row[id] !== null) {
      return (
        row[id] !== undefined ?
          String(row[id].toString().toLowerCase())
            .includes(filter.value.toString().toLowerCase())
          :
          true
      );
    }
  }

  render() {
    const columns = [
      {
        Header: "Edit",
        accessor: "Edit",
        filterable: false,
        Cell: (props) => {
          return (
            <FaEdit
            style={{cursor:"pointer" }}
              onClick={() => this.editHandler(props.original)}
            >
              Edit
            </FaEdit>
          );
        },
      },
      {
        Header: 'Delete',
        show: SITES === 2? true: false,
        accessor: "Delete",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaTrashAlt
              style={{cursor:"pointer" }}
                onClick={() => this.deleteHandler(props.original)}
              >
                Delete
              </FaTrashAlt>
            </div>
          );
        },

      },
      {
        Header: 'Display Parameters',
        accessor: "Display Parameters",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaWrench

                // onClick={() => this.SiteParameterHandler(props.original)}
              >
                Delete
              </FaWrench>
            </div>
          );
        },

      },
      {
        Header: 'Display Contacts',
        accessor: "Display Contacts",
        filterable: false,
        Cell: (props) => {
          return (
            <div>
              <FaUsers

                // onClick={() => this.ContactsHandler(props.original)}
              >
                Delete
              </FaUsers>
            </div>
          );
        },

      },

      {
        Header: "ID",
        accessor: "idSite",
      },
      {
        Header: "Number",
        accessor: "siteNum",
      },
      {
        Header: "Name",
        accessor: "businessName",
      },
      {
        Header: "Address1",
        accessor: "address1",

      },
      {
        Header: "Address2",
        accessor: "address2",
      },
      {
        Header: "Address3",
        accessor: "address3",
      },
      {
        Header: "Address4",
        accessor: "address4",
      },
      {
        Header: "Post Code",
        accessor: "postCode",
      },
      {
        Header: "Town",
        accessor: "town",
      },
      {
        Header: "Country Code",
        accessor: "countryCode",
      },
      {
        Header: "Country",
        accessor: "country",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Fax",
        accessor: "fax",
      },
      {
        Header: "Email",
        accessor: "email",
      },


      {
        Header: "Modified Date",
        accessor: "mDate",
        Cell: (props) => {
          return (
            <span>
            {props.original.mDate === undefined
                ? ""
                : props.original.mDate === null
                ? ""
                : props.original.mDate === ""
                ? ""
                : props.original.mDate
                    .replace("T", " ")
                    }
            </span>
          );
        },
      },
      {
        Header: "Modified By",
        accessor: "mUsername",
      },


    ];
    return (
      <React.Fragment>
        {this.state.generalEdit === true || SitesEditData.length !== 0 ?
          (<SitesEdit editClosehandler={this.editClosehandler} data2={this.state.data2} />) :
          this.state.customer === true || SitesNewData.length !== 0 ?
            (<SitesNew customerArr={this.state.customerArr} customerCloseHandler={this.customerCloseHandler} />) :
            this.state.Contacts === true || ContactsData.length !== 0 ?
              (<SitesContact ContactsArr={this.state.ContactsArr} ContactsCloseHandler={this.ContactsCloseHandler} />) :
              this.state.Parameter === true || SiteParamData.length !== 0 ?
                (<SiteParamList ParameterArr={this.state.ParameterArr} SiteParamCloseHandler={this.SiteParamCloseHandler} />) :



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
                        <a onClick={this.backHandler}style={{cursor:'pointer'}}>Sites Search</a>
                      </b>
                    </u>
                    &#62;
                    <u>
                      {" "}
                      <b>
                        {" "}
                        <a >Sites Management</a>
                      </b>
                    </u>
                    <button
                      onClick={this.refreshHandler}
                      style={{
                        float: "right",
                        cursor: "pointer",
                        height: "30px",
                        width: "60px",
                        borderRadius: "5px",
                      }}
                    >
                      <text style={{ fontSize: "15px", fontWeight: "bold" }}>
                        Refresh
                      </text>
                    </button>
                  </span>
                  <br />

                  <div style={{ marginTop: "10px", marginBottom: "5px" }} class="row-xs-6 bottom-row ">
{SITES === 2 ?
<div>
                    <FaFileSignature

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaFileSignature>{" "}
                    {/* <button >Configure</button> */}
                    <span
                      onClick={this.CustomerEditionHandler}style={{cursor:'pointer'}}
                    >New</span>{" "}
                    </div>
                    :''}

                    <FaPrint
                      onClick={this.exportPDF}
                    >

                    </FaPrint>{" "}
                    <a style={{cursor:"pointer" }}>Print</a>{" "}
                    <FaFileExport

                    //   onClick={() => this.edithandler(props.original)}
                    >

                    </FaFileExport>{" "}
                    <a style={{cursor:"pointer" }}>Export</a>{" "}


                  </div>

                  <ReactTable
                    className="-striped -highlight "
                    data={this.state.data.length === 0
                      ? this.props.data : this.state.data
                    }
                    columns={columns}
                    defaultPageSize={5}
                    showPaginationTop={false}
                    filterable
                    defaultFilterMethod={this.filterCaseInsensitive}
                  />
                </div>
        }
      </React.Fragment>

    );

  }
}

export default SitesList;