import React, { Component } from 'react'
import {
    Container,
    Row,
    Col,
    Label,
    Input,

} from "reactstrap";
import { FaSave } from 'react-icons/fa';
import { remover, UserEditData } from "../../store/Store"
import axios from 'axios';
import { properties } from '../../Properties/Properties';
import { USERNAME, USERS } from '../../store/RoleBased';

const getUserById = properties.Port + properties.getUserById
const getListOfWarehouseById = properties.Port + properties.getListOfWarehouseById
const createUser = properties.Port + properties.createUser
const getCompanyById = properties.Port + properties.getCompanyById
const getSiteById = properties.Port + properties.getSiteById
const getListOfAllWarehouse = properties.Port + properties.getListOfAllWarehouse
const getlistOfAllCompanies = properties.Port + properties.getlistOfAllCompanies
const getlistOfAllSites = properties.Port + properties.getlistOfAllSites
const listOfRolesWithAccessAndResources = properties.Port + properties.listOfRolesWithAccessAndResources
const getListOfLanguage = properties.Port + properties.getListOfLanguage
const getdefaultWarehouse = properties.Port + properties.getdefaultWarehouse


export default class Edituser extends Component {
    constructor(props) {
        super(props)

        this.state = {
            idUser: '',
            mDate: "",
            mUsername: "",
            versionLock: 0,
            category: '',
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
            userLevel: '',
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
            warehouseCheckeditems: new Map(),
            warehouses: [],
            message: "",
            idLangArr: [],
            localLang: "",
            confirmPassword: "",
            errors: '',
            listOfUserRoleMapEntity: [],
            message:'',

        }
    }

    backHandler = () => {
        console.log("calling back handler for list")
        remover("Edituser")
        this.props.editcloseHandler()
    }


    componentDidMount() {
        console.log("calling edit",UserEditData)
        this.state.listOfCompanyIds.push(UserEditData.listOfCompanyBeans[0].idCompany)
        this.state.listOfSiteIds.push(UserEditData.listOfSiteBeans[0].idSite)
        for (let index = 0; index < UserEditData.listOfWarehouseBeans.length; index++) {
            this.state.listOfWarehouseIds.push(UserEditData.listOfWarehouseBeans[index].idWarehouse)
            this.state.warehouseCheckeditems.set(UserEditData.listOfWarehouseBeans[index].idWarehouse, true)            
        }
        console.log("print warehouse iddsssss65758675i", this.state.listOfWarehouseIds)
        this.setState({
            // message: "Role created Successfully",
            idUser: UserEditData.idUser,
            name: UserEditData.name,
            userLevel: UserEditData.userLevel,
            category: UserEditData.category,
            versionLock: UserEditData.versionLock,
            defaultCompany: UserEditData.listOfCompanyBeans[0].idCompany,
            defaultSite: UserEditData.listOfSiteBeans[0].idSite,
            defaultWarehouse: UserEditData.defaultWarehouse,
            login: UserEditData.login,
            firstName: UserEditData.firstName,
            expiryDate: UserEditData.expiryDate,
            lastName: UserEditData.lastName,
            listOfCompanyBeans: UserEditData.listOfCompanyBeans,
            listOfSiteBeans: UserEditData.listOfSiteBeans,
            selectedRolesArr: UserEditData.listOfUserRoleMapEntity,
            listOfWarehouseBeans: UserEditData.listOfWarehouseBeans,
            status: UserEditData.status,
            password: UserEditData.password,
            defaultLanguage: UserEditData.defaultLanguage,
          

        });
        console.log("UserEditData.listOfCompanyBeans", UserEditData.listOfCompanyBeans[0].idCompany)
      
        console.log("after user print in component UserEditData.listOfUserRoleMapEntity", UserEditData)
        this.getWarehouseMethod();
        this.getSiteMethod();
        this.getCompanyMethod();
        this.getListOfRolesMethod();
        this.getLanguageMethod();
        this.getCompanyByID(UserEditData.listOfCompanyBeans[0].idCompany)
        this.getSiteById(UserEditData.listOfSiteBeans[0].idSite)
        this.getWarehouseById(UserEditData.defaultWarehouse)
       
    }

    getUserByUserId() {
        console.log("calling getRoleByRoleId ", UserEditData.idUser)
        axios
            .post(getUserById + UserEditData.idUser)
            // console.log("criteriaArrrrrrrrr", this.state.criteriaArr)
            .then((response) => {
                if (response.status === 200) {
                    console.log("resposne success getUserByUserId@@@@#####$$$$$$$$", response.data);
                    this.setState({
                        // message: "Role created Successfully",
                        idUser: response.data.idUser,
                        name: response.data.name,
                        userLevel: response.data.userLevel,
                        category: response.data.category,
                        versionLock: response.data.versionLock,
                        defaultCompany: response.data.listOfCompanyBeans[0].idCompany,
                        defaultSite: response.data.defaultSite,
                        defaultWarehouse: response.data.defaultWarehouse,
                        login: response.data.login,
                        firstName: response.data.firstName,
                        expiryDate: response.data.expiryDate,
                        lastName: response.data.lastName,
                        listOfCompanyBeans: response.data.listOfCompanyBeans,
                        listOfSiteBeans: response.data.listOfSiteBeans[0].idSite,
                        selectedRolesArr: response.data.listOfUserRoleMapEntity,
                        listOfWarehouseBeans: response.data.listOfWarehouseBeans,
                        status: response.data.status,
                        password: response.data.password,
                        defaultLanguage: response.data.defaultLanguage

                    });
                  
                    console.log("resposne success response.data.listOfUserRoleMapEntity", response.data.listOfUserRoleMapEntity);
                    console.log("entering before if condition ibrahim", this.state.idRoleArr.length)
                    console.log("entering before if condition shahid", response.data.listOfUserRoleMapEntity.length)
                  for (let index = 0; index < this.state.idRoleArr.length; index++) {
                   for (let j = 0; j < response.data.listOfUserRoleMapEntity.length; j++) {
                       console.log("entering before if condition first", this.state.idRoleArr[index].idRole)
                       console.log("entering before if condition last", response.data.listOfUserRoleMapEntity[j].idRole)
                     if(this.state.idRoleArr[index].idRole === response.data.listOfUserRoleMapEntity[j].idRole){

                        this.state.checkeditems.set( response.data.listOfUserRoleMapEntity[j].idRole,true)
                     }
                       
                   }
                      
                  }
                  console.log("after first fpor loop close printing checkitems", this.state.checkeditems)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onchangehandler = (event) => {
        console.log("onchangehandler");
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

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

    UpdateUserMEthod = () => {
        console.log("user create method", this.state);
        // if (this.validate()) {
        //     console.log("validate hogya");

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
                                message: "User updated Successfully",
                                errors: ""

                            });
                        }
                        else if (response.status === 200 && response.data === true) {
                            this.setState({
                                errors: "Login already exists",
                                message: ""

                            });
                        }
                        else {
                            this.setState({
                                message: "",
                                errors: "",
                            })
                        }


                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        // } else {
        //     console.log("validate nahi huaaaa");
        // }
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
                    for (let index = 0; index < response.data.length; index++) {
                        
                        for (let j = 0; j < UserEditData.listOfUserRoleMapEntity.length; j++) {
                          if (response.data[index].idRole === UserEditData.listOfUserRoleMapEntity[j].idRole) {
                            this.state.checkeditems.set(response.data[index].idRole,true)
                            this.state.listOfRolesIds.push(response.data[index].idRole)
                          }
                            
                        }
                      
                        
                    }
                    this.setState({
                        message: "",
                        idRoleArr: response.data

                    });

                }
            })
            .catch((error) => {
                console.log(error);
            });
            console.log("cheking calue for checkedItemssss$$$$$$4", this.state.checkeditems);
           
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


    render() {
        const {message} = this.state
        return (
            <React.Fragment>
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
                                <a style={{cursor:"pointer" }} onClick={this.backHandler}>User List</a>
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
                            {USERS===2 ?  <a style={{ cursor: "pointer", fontWeight: "bold", color: "blue" }}>
              <u onClick={this.UpdateUserMEthod}>Save</u>
            </a> : ''}
                            {/* <button >Configure</button> */}
                            {/* <a onClick={this.UpdateUserMEthod} >save</a>{" "} */}
                            {" "}



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
                        <Row style={{ marginTop: "10px" }}>
                            <Col>
                                <Label>Login</Label>
                            </Col>

                            <Col>

                                <Input bsSize="sm"
                                    value={this.state.login}
                                    name="login"

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
                            </Col>
                            <Col> </Col>

                        </Row>

                        {/* <Row style={{ marginTop: "10px", marginBottom:"-8px" }}>
                            <Col>
                                <Label>Password</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="text"
                                    id="exampleSelect"
                                    // style={{ width: "50px" }}
                                    bsSize="sm"
                                 />
                            </Col>

                            <Col> </Col>

                            <Col>
                                <Label>Confirm Password</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="text"
                                    id="exampleSelect"
                                    // style={{ width: "50px" }}
                                    bsSize="sm"
                                 />
                            </Col>
                            <Col> </Col>
                        </Row> */}

                        <Row style={{ marginTop: "5px",  }}>
                            <Col>
                                <Label>Name</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="text"
                                    value={this.state.lastName}
                                    name="lastName"
                                    onChange={this.onchangehandler}
                                    bsSize="sm"
                                />
                            </Col>

                            <Col> </Col>

                            <Col>
                                <Label>Firstname</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="text"
                                    value={this.state.firstName}
                                    name="firstName"
                                    onChange={this.onchangehandler}
                                    
                                    bsSize="sm"
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
                                    onChange={this.onchangehandler}
                                    // style={{ width: "50px" }}
                                    name="status"
                                    value={this.state.status}
                                    bsSize="sm"
                                >
                                    <option value="100">_Not valid_</option>
                                    <option value="200">valid</option>

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
                                    value={this.state.userLevel}
                                    name="userLevel"
                                    onChange={this.onchangehandler}
                                    // style={{ width: "60px" }}
                                    bsSize="sm"
                                >
                                    <option value="100">User</option>
                                    <option value="200">Administrator</option>
                                    <option value="300">_Super administrator_</option>
                                </Input>
                            </Col>

                            <Col> </Col>

                            <Col>
                                <Label>Category</Label>
                            </Col>

                            <Col>

                                <Input
                                    type="select"
                                    // name="select"
                                    id="exampleSelect"
                                    value={this.state.category}
                                    name="category"
                                    onChange={this.onchangehandler}
                                    // style={{ width: "60px" }}
                                    bsSize="sm"
                                >
                                    <option value="200">_Common_</option>
                                    <option value="100">_System_</option>

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
                            {/* <Col></Col> */}

                            <Col>
                                {this.state.idCompanyArr.map(data => <div> <Input type="checkbox" name="defaultCompany" value={data.idCompany} onChange={this.onchangehandler} checked={this.state.defaultCompany === data.idCompany? true : false}></Input> <span>
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
                            {/* <Col></Col> */}


                        </Row>
                        <Row>
                        <Col>
                                <Label>Sites</Label>
                            </Col>
                            {/* <Col></Col> */}

                            <Col>
                                {this.state.idSiteArr.map(data => <div><Input type="checkbox" name="defaultSite" value={data.idSite} onChange={this.onchangehandler} checked={this.state.defaultSite === data.idSite? true : false}></Input> <span>
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
                            {/* <Col></Col> */}


                        </Row>

                        <Row style={{ marginTop: "10px" }}>
                        <Col>
                                <Label>Warehouse</Label>
                            </Col>
                            {/* <Col></Col> */}

                            <Col>
                                {this.state.idWarehouseArr.map((data) => <div><Input type="checkbox" name="defaultWarehouse" value={data.idWarehouse} onChange={this.onchangehandler} checked={this.state.warehouseCheckeditems.get(data.idWarehouse)}></Input> <span>
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
                            {/* <Col></Col> */}


                        </Row>

                        <br></br>
                        <Row>
                            <Col>
                                <Label>Roles</Label>
                            </Col>
                            {/* <Col></Col> */}

                            <Col md={4}>
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

                            {/* <Col></Col> */}

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
