import React, { Component } from 'react'
import {
    Container,
    Row,
    Col,
    Label,
    Input,

} from "reactstrap";
import { FaSave } from 'react-icons/fa';
import { remover } from "../../store/Store"
import axios from 'axios';
import { properties } from '../../Properties/Properties';
import { USERNAME } from '../../store/RoleBased';

const createUser = properties.Port + properties.createUser
const getListOfWarehouseById = properties.Port + properties.getListOfWarehouseById
const getCompanyById = properties.Port + properties.getCompanyById
const getSiteById = properties.Port + properties.getSiteById
const getListOfAllWarehouse = properties.Port + properties.getListOfAllWarehouse
const getlistOfAllCompanies = properties.Port + properties.getlistOfAllCompanies
const getlistOfAllSites = properties.Port + properties.getlistOfAllSites
const listOfRolesWithAccessAndResources = properties.Port + properties.listOfRolesWithAccessAndResources
const getListOfLanguage = properties.Port + properties.getListOfLanguage
const getdefaultWarehouse = properties.Port + properties.getdefaultWarehouse



export default class Createnewuser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idUser: '',
            mDate: "",
            mUsername: "",
            versionLock: 0,
            category: '200',
            cxdate: "",
            cxusername: "",
            cdate: "",
            cusername: "",
            dropdowncompanyvalue: [],
            dropdownWarehousevalue: [],
            dropdownSitevalue: [],
            expiryDate: "",
            firstName: "",
            lastName: "",
            userLevel: '100',
            login: "",
            password: "",
            status: '',
            defaultCompany: "",
            defaultLanguage: "",
            defaultSite: "",
            defaultWarehouse: "",
            isActive: '',
            isAdmin: '',
            listOfMenus: [],
            listFilterBean: [],
            listOfRoles: [],
            listOfRolesIds: [],
            listOfUserId: [],
            listOfSiteBeans: [],
            listOfCompanyBeans: [],
            listOfWarehouseBeans: [],
            listOfWarehouseIds: [],
            listOfCompanyIds: [],
            listOfSiteIds: [],
            idWarehouse: '',
            idRole: '',
            idWarehouseArr: [],
            idSiteArr: [],
            idCompanyArr: [],
            idRoleArr: [],
            checkeditems: new Map(),
            warehouses: [],
            message: "",
            idLangArr: [],
            localLang: "",
            confirmPassword: "",
            errors: '',
        }
    }

    onchangehandler = (event) => {
        console.log("onchangehandler", event.target.value);
        // console.log("onchangehandler", event.target.name);
        const index = this.state.listOfWarehouseIds.indexOf(event.target.value)
        const indexWarehouse = this.state.dropdownWarehousevalue.findIndex((data) =>
            data.idWarehouse === event.target.value
        )
        if (event.target.name === "defaultCompany") {
            this.getCompanyByID(event.target.value)
            this.state.listOfCompanyIds.push(event.target.value)

        }
        if (event.target.name === "defaultSite") {
            this.getSiteById(event.target.value)
            this.state.listOfSiteIds.push(event.target.value)
        }
        if (event.target.name === "defaultWarehouse") {
            console.log("calling degudnkmfdnzkfnfdkjfnvkdkf", event.target.isChecked)
            if (event.target.checked === true) {
                console.log("is checked is truee value chking")
                this.setState({
                    defaultWarehouse: event.target.value
                })
                // if (this.state.defaultWarehouse === "") {
                //     // this.setState({
                //     //     defaultWarehouse: event.target.value
                //     // })
                // }
            } else {
                this.setState({
                    defaultWarehouse: ""
                })
            }

            if (index === -1) {
                this.state.listOfWarehouseIds.push(event.target.value)
            } else {
                this.state.listOfWarehouseIds.splice(index, 1)
            } if (event.target.checked === true) {
                this.getWarehouseById(event.target.value)
            } if (indexWarehouse !== -1) {
                console.log("drop down value printinggggg", this.state.dropdownWarehousevalue)
                this.state.dropdownWarehousevalue.splice(indexWarehouse, 1)
                this.setState({
                    dropdownWarehousevalue: this.state.dropdownWarehousevalue
                })
            }


        }
        if (event.target.name !== "defaultWarehouse") {
            this.setState({
                [event.target.name]: event.target.value,
            });
        }

    };

    createNewUserMEthod = () => {
        console.log("user create method", this.state);
        if (this.validate()) {
            console.log("validate hogya");

            if (this.state.dropdownWarehousevalue.length > 0) {
                this.getdefaultWarehouse();
            }
            const header = {
                'sessionUserId':USERNAME
              }
            axios
                .post(createUser, this.state, {headers:header})
                // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
                .then((response) => {
                    if (response.status === 200) {
                        console.log("resposne success", response.data);
                        if (response.status === 200 && response.data === false) {
                            this.setState({
                                message: "User created Successfully",
                                errors:""

                            });
                        }
                       else if (response.status === 200 && response.data === true) {
                            this.setState({
                                errors: "Login already exists",
                                message:""

                            });
                        }
                        else{
                            this.setState({
                                message:"",
                                errors:"",
                            })
                        }


                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        } else {
            console.log("validate nahi huaaaa");
        }
    };

    getWarehouseById = (id) => {
        const index = this.state.dropdownWarehousevalue.findIndex((data) =>
            data.idWarehouse === id
        )
        if (index === -1) {
            console.log("user create method" + id);
            axios
                .post(getListOfWarehouseById + id)
                // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
                .then((response) => {
                    if (response.status === 200) {
                        console.log("resposne success", response.data);
                        this.state.warehouses.push(response.data)
                        this.setState({
                            // message: "Data Saved Successfully",
                            dropdownWarehousevalue: this.state.warehouses
                        });

                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        }
    };

    getCompanyByID = (id) => {
        const companies = []
        console.log("user create method", this.state);
        axios
            .post(getCompanyById + id)
            // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
            .then((response) => {
                if (response.status === 200) {
                    console.log("resposne success getCompanyById", response.data);
                    companies.push(response.data)
                    this.setState({
                        // message: "Data Saved Successfully",
                        dropdowncompanyvalue: companies
                    });


                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getSiteById = (id) => {
        console.log("user create method", this.state);
        const sites = []
        axios
            .get(getSiteById + id)
            // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
            .then((response) => {
                sites.push(response.data)
                if (response.status === 200) {
                    console.log("resposne success", response.data);
                    this.setState({
                        // message: "Data Saved Successfully",
                        dropdownSitevalue: sites
                    });

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getWarehouseMethod = () => {
        axios
            .get(getListOfAllWarehouse)
            .then((response) => {
                if (response.status === 200) {
                    console.log("resposne success for warehouse", response.data);
                    this.setState({
                        // message: "Data Saved Successfully",
                        idWarehouseArr: response.data
                    });

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getCompanyMethod = () => {
        axios
            .get(getlistOfAllCompanies)
            .then((response) => {
                if (response.status === 200) {
                    console.log("resposne success for company", response.data);
                    this.setState({
                        // message: "Data Saved Successfully",
                        idCompanyArr: response.data
                    });

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getSiteMethod = () => {
        axios
            .get(getlistOfAllSites)
            .then((response) => {
                if (response.status === 200) {
                    console.log("resposne success for site", response.data);
                    this.setState({
                        // message: "Data Saved Successfully",
                        idSiteArr: response.data

                    });

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getListOfRolesMethod = () => {
        axios
            .get(listOfRolesWithAccessAndResources)
            .then((response) => {
                if (response.status === 200) {
                    console.log("resposne success for roles", response.data);
                    this.setState({
                        message: "",
                        idRoleArr: response.data

                    });

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getLanguageMethod = () => {
        axios
            .post(getListOfLanguage)
            .then((response) => {
                if (response.status === 200) {
                    console.log("resposne success for languageeeeeee556667", response.data);
                    response.data.map(id => id.idLanguage === "en" ? this.setState({
                        defaultLanguage: id.idLanguage
                    }) : null)
                    this.setState({
                        message: "",
                        idLangArr: response.data,
                        langAvail: response.data.available,

                    });

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    getdefaultWarehouse = () => {
        axios
            .post(getdefaultWarehouse)
            .then((response) => {
                if (response.status === 200) {
                    console.log("resposne success for defaultWarehouse", response.data);

                    this.setState({
                        message: "",
                        defaultWarehouse: response.data.idWarehouse,
                    });
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // checkPasswordMatcher() {
    //     console.log("inside checkPasswordMatcher")
    //     if (this.state.password !== "" && this.state.confirmPassword !== "") {
    //         if (this.state.password !== this.state.confirmPassword) {
    //             this.setState({
    //                 errors: "password not matched"
    //             })
    //             return false
    //         }
    //     }
    // }


    validate() {
        console.log("inside validator")
        if (this.state.login === "") {
            this.setState({
                errors: "enter login"
            })
            return false
        }
        else if (this.state.password === "") {
            this.setState({
                errors: "enter password"
            })
            return false
        }
        else if (this.state.confirmPassword === "") {
            this.setState({
                errors: "enter confirm password"
            })
            return false
        }

        else if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                errors: "password not matched"
            })
            return false
        }
        else if (this.state.lastName === "") {
            this.setState({
                errors: "enter name"
            })
            return false
        }

        else if (this.state.firstName === "") {
            this.setState({
                errors: "enter firstName"
            })
            return false
        }

        else if (this.state.expiryDate === "") {
            this.setState({
                errors: "enter expiryDate"
            })
            return false
        }
        else if (this.state.defaultCompany === "") {
            this.setState({
                errors: "select company"
            })
            return false
        }
        else if (this.state.defaultSite === "") {
            this.setState({
                errors: "select site"
            })
            return false
        }
        else if (this.state.defaultWarehouse === "") {
            this.setState({
                errors: "select warehouse"
            })
            return false
        }
        else if (this.state.listOfRolesIds.length === 0) {
            this.setState({
                errors: "select roles"
            })
            return false
        }
        else {
            this.setState({
                error: "",
            })
            return true
        }
    }


    componentDidMount = () => {
        console.log("componentDidMount callinggggggg");
        this.getWarehouseMethod();
        this.getSiteMethod();
        this.getCompanyMethod();
        this.getListOfRolesMethod();
        this.getLanguageMethod();

    }

    roleChangeHandler = (event) => {
        const item = event.target.value;
        const intItem = Number.parseInt(item, 10);
        console.log("item", intItem);
        console.log("item", this.state.checkeditems);
        const isChecked = event.target.checked;
        const index = this.state.listOfRolesIds.indexOf(intItem);
        console.log("Before ibrahim roles Map:-", this.state.checkeditems);
        const newCheckedItemsMap = new Map();
        this.state.checkeditems.forEach(function (value, key) {
            console.log("event value", event.target.value);
            console.log("key", intItem);
            if (key === intItem) {
                console.log("value hai", index);
                newCheckedItemsMap.set(key, isChecked ? true : false);
            } else {
                console.log("value nahi hai", index);
                newCheckedItemsMap.set(key, value);
            }
        });
        console.log(" parse int", intItem);
        console.log("roleid checking", event.target.value);

        console.log("ischeked", event.target.checked);
        this.setState({ checkeditems: newCheckedItemsMap });
        console.log("index", index);
        if (isChecked) {
            if (index == -1) {
                this.state.listOfRolesIds.push(intItem);
            }
        } else {
            if (index > -1) {
                this.state.listOfRolesIds.splice(index, 1);
            }
        }
        console.log("After ibrahim roles ids:-", this.state.listOfRolesIds);
        console.log("Afteribrahim map:-", this.state.checkeditems);

    };

    backHandler = () => {
        console.log("calling back handler for list")
        remover("Createnewuser")
        this.props.newcloseHandler()
    }

    //   companyChangeHandler=()=>{
    //       console.log("idh")
    //   }


    render() {
        const { message, errors } = this.state
        return (
            <React.Fragment>
                <div>
                    <span>
                        {" "}
                        <u>
                            {" "}
                            <b>
                                <a style={{cursor:"pointer" }}>Home</a>
                            </b>
                        </u>{" "}
                        &#62;
                        <u>
                            {" "}
                            <b>
                                {" "}
                                <a style={{cursor:"pointer" }} onClick={this.backHandler}>User Search</a>
                            </b>
                        </u>
                        &#62;
                        <u>
                            {" "}
                            <b>
                                {" "}
                                <a style={{cursor:"pointer" }}>User Management</a>
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
                            {/* <button >Configure</button> */}
                            <a style={{cursor:"pointer" }}>  <u onClick={this.createNewUserMEthod}>Create</u></a>{" "}
                            {" "}<FaSave

                            //   onClick={() => this.edithandler(props.original)}
                            >

                            </FaSave>{" "}
                            {/* <button >Configure</button> */}
                            <a style={{cursor:"pointer" }}>Create and Select</a>{" "}



                        </div>

                        <div>
                            <b>
                                <span
                                    style={{
                                        color: "green",
                                    }}
                                >
                                    <h6>{message}</h6>
                                </span>
                            </b>
                        </div>

                        <div>
                            <b>
                                <span
                                    style={{
                                        color: "red",
                                    }}
                                >
                                    <h6>{errors}</h6>
                                </span>
                            </b>
                        </div>

                        <div
                            style={{
                                border: "1px",
                                backgroundColor: "grey",
                                border: "1px solid black",
                                marginTop: "3px"
                            }}
                        >
                            <b style={{ marginLeft: "5px" }}>Description</b>
                        </div>
                        <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                            <Col>
                                <Label>Login</Label>
                            </Col>

                            <Col>

                                <Input bsSize="sm"
                                    value={this.state.login}
                                    name="login"
                                    onChange={this.onchangehandler}
                                />
                            </Col>
                            <Col> </Col>

                            <Col>
                                <Label>Language</Label>
                            </Col>

                            <Col>

                                <Input type="select" name="defaultLanguage" value={this.state.defaultLanguage}>

                                    {this.state.idLangArr.map((lang) => (lang.available === 1 ?
                                        <option value={lang.idLanguage}>
                                            {lang.description}
                                        </option>
                                        : ""
                                    ))}
                                </Input>

                                {/* <Input type="select" value={this.state.defaultLanguage}>
    
                                   {this.state.idLangArr.map(data=> <option value="en">{data}</option>)}
                               </Input> */}
                            </Col>
                            <Col> </Col>

                        </Row>

                        <Row style={{ marginTop: "10px", }}>
                            <Col>
                                <Label>Password</Label>
                            </Col>

                            <Col>

                                <Input
                                    bsSize="sm"
                                    type="password"
                                    value={this.state.password}
                                    name="password"
                                    onChange={this.onchangehandler}
                                />
                            </Col>

                            <Col> </Col>

                            <Col>
                                <Label>Confirm Password</Label>
                            </Col>

                            <Col>

                                <Input
                                    bsSize="sm"
                                    type="password"
                                    value={this.state.confirmPassword}
                                    name="confirmPassword"
                                    onChange={this.onchangehandler}
                                />
                            </Col>
                            <Col> </Col>
                        </Row>

                        <Row style={{ marginTop: "5px",  }}>
                            <Col>
                                <Label>Name</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="text"
                                    id="exampleSelect"
                                    // style={{ width: "50px" }}
                                    bsSize="sm"
                                    value={this.state.lastName}
                                    name="lastName"
                                    onChange={this.onchangehandler}
                                />
                            </Col>

                            <Col> </Col>

                            <Col>
                                <Label>Firstname</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="text"
                                    id="exampleSelect"
                                    // style={{ width: "50px" }}
                                    bsSize="sm"
                                    value={this.state.firstName}
                                    name="firstName"
                                    onChange={this.onchangehandler}
                                />
                            </Col>
                            <Col> </Col>
                        </Row>

                        <Row style={{ marginTop: "5px", marginBottom: "-8px" }}>
                            <Col>
                                <Label>Status</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                    // style={{ width: "50px" }}
                                    bsSize="sm"
                                    value={this.state.status}
                                    name="status"
                                    onChange={this.onchangehandler}
                                >
                                    <option value={"100"}>_Not valid_</option>
                                    <option value={"200"}>valid</option>

                                </Input>
                            </Col>

                            <Col> </Col>

                            <Col>
                                <Label>Expire Date</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="date"

                                    value={this.state.expiryDate}
                                    name="expiryDate"
                                    onChange={this.onchangehandler}
                                    // style={{ width: "50px" }}
                                    bsSize="sm"

                                />
                            </Col>
                            <Col> </Col>




                        </Row>

                        <Row style={{ marginTop: "10px", marginBottom: "-8px" }}>
                            <Col>
                                <Label>Level</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                    // style={{ width: "50px" }}
                                    bsSize="sm"
                                    value={this.state.userLevel}
                                    name="userLevel"
                                    onChange={this.onchangehandler}
                                >
                                    <option value={"100"}>User</option>
                                    <option value={"200"}>Administrator</option>
                                    <option value={"300"}>Super Administrator</option>

                                </Input>
                            </Col>

                            <Col> </Col>

                            <Col>
                                <Label>Category</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                    // style={{ width: "50px" }}
                                    bsSize="sm"
                                    value={this.state.category}
                                    name="category"
                                    onChange={this.onchangehandler}
                                >
                                    <option value={"200"}>Common</option>
                                    <option value={"100"}>system</option>

                                </Input>
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
                            <b style={{ marginLeft: "5px" }}>Rights</b>
                        </div>

                        <Row style={{ marginTop: "10px" }}>
                            <Col>
                                <Label>Companies</Label>
                            </Col>
                            <Col></Col>

                            <Col>
                                {this.state.idCompanyArr.map(data => <div><Input value={data.idCompany} name="defaultCompany" onChange={this.onchangehandler} type="checkbox" /> <span>
                                    {data.businessName}
                                </span></div>)}



                            </Col>
                            <Col></Col>

                            <Col>
                                <Label>Default Company</Label>
                            </Col>

                            <Col>
                                <Input type="select">
                                    {this.state.dropdowncompanyvalue.map(data => <option>{data.businessName}</option>)}

                                </Input>
                            </Col>
                            <Col></Col>
                            <Col></Col>


                        </Row>
                        <Row>
                            <Col>
                                <Label>Sites</Label>
                            </Col>
                            <Col></Col>

                            <Col>
                                {this.state.idSiteArr.map(data => <div><Input value={data.idSite} name="defaultSite" onChange={this.onchangehandler} type="checkbox" /> <span>
                                    {data.businessName}
                                </span></div>)}



                            </Col>
                            <Col></Col>

                            <Col>
                                <Label>Default Site</Label>
                            </Col>

                            <Col>
                                <Input type="select">
                                    {this.state.dropdownSitevalue.map(data => <option>{data.businessName}</option>)}

                                </Input>
                            </Col>
                            <Col></Col>
                            <Col></Col>


                        </Row>

                        <Row style={{ marginTop: "10px" }}>
                            <Col>
                                <Label>Warehouse</Label>
                            </Col>
                            <Col></Col>

                            <Col>
                                {this.state.idWarehouseArr.map(data => <div><Input value={data.idWarehouse} name="defaultWarehouse" onChange={this.onchangehandler} type="checkbox" /> <span>
                                    {data.description}
                                </span></div>)}



                            </Col>
                            <Col></Col>

                            <Col>
                                <Label>Default Warehouse</Label>
                            </Col>

                            <Col>
                                <Input type="select" name="defaultWarehouse"
                                    onChange={(event) => {
                                        this.setState({
                                            defaultWarehouse: event.target.value
                                        }, () => console.log("checking brxcket workings"))
                                    }

                                    }
                                >


                                    {this.state.dropdownWarehousevalue.map(data => <option value={data.idWarehouse} >{data.description}</option>)}

                                </Input>
                            </Col>
                            <Col></Col>
                            <Col></Col>


                        </Row>
                        <br></br>
                        <Row>
                            <Col>
                                <Label>Roles</Label>
                            </Col>
                            <Col></Col>

                            <Col>
                                {this.state.idRoleArr.map((roles) => (
                                    <div >

                                        {/* style={{ float: "left" }} */}
                                        <input
                                            onChange={this.roleChangeHandler}
                                            checked={this.state.checkeditems.get(roles.idRole)}
                                            //    checked={this.findIndex(roles.idRole,this.state.listOfRolesId)}
                                            value={roles.idRole}
                                            type="checkbox"
                                        ></input> &nbsp;
                                        <label>{roles.name}</label> &nbsp; &nbsp;
                                    </div>
                                ))}



                            </Col>
                            <Col></Col>

                            <Col>
                            </Col>

                            <Col>

                            </Col>
                            <Col></Col>
                            <Col></Col>


                        </Row>





                    </div>

                </div>


            </React.Fragment>
        )
    }
}
