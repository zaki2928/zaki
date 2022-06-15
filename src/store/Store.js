let Stockbybatchdata = [];
let nestedlogisticunit = null;
let nesteddisplaydata = [];
let nesteddisplayreferencedata = [];
let Displaystocklocationdata = [];
let Repackingdata = [];
let RepackingEditdata = [];
let gateerrormesg = "";
let PackagingCriteriaa = null;
let Packinglinedata = [];
let Displaylistdata = [];
let MissionValidationdata = [];
let isdisplaydata = [];
let SelectedTrailerAssociationdata = [];

let TrailerAssociationdata = [];
let TrailerAssociationEditdata = null;
let Silofilterdata = [];
let siloEditdata = [];

let Boxreplacementdata = [];
let Boxreplacementcriteriadata = null;
let Boxreplacementeditdata = [];
let SiloLoadingFilterdata = [];
let SiloLoadingFilterCriteria = [];
let SiloFilterCriteria = null;
let RackCriteria = null;
let missioncancelcriteria = null;
let cancelcriteria = null;
let StatusFilterCriteria = [];
let RepackingdataCriteria = null;
let PackinglinedataCriteria = null;
let SiloLoadingEditdata = [];
let Wavedata = [];
let SelectedWavedata = [];
let WaveEditdata = [];
let WaveAddlinesdata = [];
let BoxEditdata = [];
let wavedisplaydata = [];
let waveshippingdata = [];
let WaveShippingEditdata = [];
let displayeditdata = [];
let intertrailerdata = [];
let intertrailereditdata = [];
let intertrailerdisplaydata = [];
let intertrailerdisplayeditdata = [];
let intertrailernewdata = [];
let TrailerReleaseData = [];
let TrailersData = [];
let StockByLocationData = [];

let TrailersEditData = [];
let TrailerReleaseEditData = [];

let SiteLogisticUnitData = [];
let FamiliesEditionData = [];
let Palletmovementdata = [];
let PackinglineEditdata = [];
let StorageMissionData = [];
let StoragePalletData = [];
let StorageMissionEditdata = [];
let ContainerData = [];
let ContainerEditdata = [];
let OrderData = [];
// let Snapshotdata=[];
let OrderprepData = [];
// let Uncubeddata = [];
let BoxData = [];
let OrderEditData = [];
let OrderDisplayData = [];
// let UncubedOrderDisplayData = [];
let OrderDispEditData = [];
let OrderCommentsData = [];
let Missionmultivalidata = [];
let WhMissionVdata = [];
let OrderCustomerData = [];
let OrderBoxData = [];
let OrderTrailerData = [];
let ShippingDisplayData = [];
let ShippingDispEditData = [];
let StoragePalletEditdata = [];
let PackagingData = [];
let GeneralEditData = [];
let GeneralNewData = [];
let StockListData = [];
let StockEditData = [];
let StockNewData = [];
let PreparationOrderCriteria = [];
let snapshotcriteria = null;
let PreparationOrderprepCriteria = [];
let WaveEditCriteria = [];
let TrailerCriteria = [];
let TrailerReleaseCriteria = [];
let WaveCriteria = [];
let SelectedWaveCriteria = [];

let TrailerAssociationCriteria = [];
let SelectedTrailerAssociationCriteria = [];
// let UncubedCriteria = [];
let BoxOrderCriteria = [];
let PreparationListData = [];
let PreparationEditData = [];
let PreparationNewData = [];
let palletDestructionData = [];
let PalletToDestructEditdata = [];
let Containerdowngradedata = [];
let Statuschangedata = [];
let Statuschangeeditdata = [];
let Pickingticketdata = [];
let Goodsinmydata = [];
let Formdata = [];
let MasterMissionData = [];
let RegionData = [];
let RegionEditData = [];
let RegionNewData = [];
let regioncriteriaData = [];
let AccessData = [];
let ModificationData = [];
let DeletionData = [];
let SitesData = [];
let SiteCriteriaData = [];
let SitesEditData = [];
let CompaniesData = [];
let WarehouseData = [];
let WarehousecriteriaData = [];
let LogisticUnitData = null;
let RolesData = [];
let CompaniesEditData = [];
let WarehouseEditData = [];
let LogisticUnitEditData = [];
let LogisticUnitfilterData = null;
let RolesEditData = [];
let ProductCriteria = [];
let MissionvalidationCriteria = null;
let multiMissionvalidationCriteria = null;
let CellAccessCriteria = null;
let CompaniesNewData = [];
let WarehouseNewData = [];
let LogisticUnitDisplayData = [];
let ActualLogisticUnitDisplaydata = null;
let RolesNewData = [];
let NewUserData = [];
let CreateUserData = null;
let CreateWaveData = [];
let ContactData = [];
let newCreateContactData = [];
let contactEditData = [];
let contactCriteria = null;
let companiesCriteria = null;

let contentEditData = [];
let FamiliesData = [];
let CellrackData = [];

let RackData = [];
let RackEditData = [];
let RackDisplayData = [];
let RackDispEditData = [];
let RackDispNewData = [];
let RackNewData = [];
let CancelData = [];
let MultiCancelData = [];
let RackStatusData = [];
let StockSnapData = [];
let StockSnapDisplayData = [];
let StockSnapEditData = [];
let ParameterData = [];
let ParameterEditData = [];
let ParameterNewData = [];
let StockcontentData = [];
let StockcontentCriteria = null;
let displayeditrepacking = [];
let listOfContainerInRepacking = [];
let SitesNewData = [];
let ContactsData = [];
let SiteParamData = [];
let SiteParamNewData = [];
let ParamterCriteria = [];
let storagemissionid = null;
let preparationorderid = null;
let containereligibilityid = null;
let storagepalletid = null;
let packinglineid = null;
let fileintegrationid = null;
let containercreationid = null;
let palletdestructionid = null;
let labelprintingid = null;
let collectionprintingid = null;
let missionlabelprintingid = null;
let laserprintingid = null;
let thermalprintingid = null;
let supportprintingid = null;
let cubingprintingid = null;
let stockprintingid = null;
let regionid = null;
let cellaccessid = null;
let cellmodificationid = null;
let cellcreationid = null;
let celldeletionid = null;
let companiesid = null;
let warehouseid = null;
let rolesid = null;
let changepasswordid = null;
let parameterid = null;
let rackid = null;
let stocksnapid = null;
let rackstatusid = null;
let cancelid = null;
let multicancelid = null;
let contactid = null;
let userId = null;
let UserEditData = null;
let RefreshRoleCriteria = null;
let RefreshUserCriteria = null;

// shahid variables ////////////////////////////////////////////////////
// Dynamic ids////////////////////////////////////////////////////////////
let sitesid = null;
let productid = null;
let logisticunit = null;
let StorageContainerId = null;
let Stockcontentid = null;
let Palletmovementcritaria = null;
let contentCriteria = [];
let getlistofRegionsRTWHEntities = [];
let getlistofPalletDestructionRegion = [];
let containerData = {
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
  ListOfPrinter: [],
  isPoValid: false,
  printlabel: false,
  success: "",
  loading: false,
  msg: "",
  idExchange: "",
};

// Variables/////////////////////////////////////
let ProductData = [];
let Storagfiltercriteria = null;
let StoragecontainerData = [];
let ProductEditData = null;
let ProductDisplayData = null;
let ProdDispEditData = [];
let StoragecontainerEditdata = null;
let Stockcontenteditdata = null;
// shahid////////////////////////////////////////

//////shivani variables//////
let siteid = null;
let siloid = null;
let siloloadingid = null;

let familiesid = null;
let containerDowngradeid = null;
let trailerReleaseid = null;
let trailersid = null;

////////////////////// By Arqum  Physical Gate///////////////
//start
/////////uncubed data//////
let uncubedid = null;
let Uncubeddata = [];
let UncubedOrderDisplayData = [];
let UncubedCriteria = [];

let physicalgateid = null;
////////////////////// By Arqum  Repacking ///////////////
let repackingid = null;
////////////////////// By Arqum Packaging ///////////////
let packagingid = null;
//end

//ContentStatus
let contentstatusid = null;
let contentstatusData = [];
let contentstatusEditData = [];
let contentstatusNewData = [];
let contentstatusCriteria = null;


//missionclass
let missionClassid=null;
let missionclassDataHandler =[];
let missionClassEditDataHandler =[];
let missionClassData = [];
let missionClassEditData = [];
let missionClassNewData = [];
let MissionclassCriteria = null;
let missionclassCriteriaHandler=[];


//Prepration>Box
let prepration_boxid = null;
let prepration_boxData = [];
let prepration_boxEditData = [];
let prepration_boxNewData = [];
let prepration_boxCriteria = null;

let logisticUnitCriteria = null;

//Cellmodels
let cellmodelsid = null;
let cellmodelsData = [];
let cellmodelsEditData = [];
let cellmodelsNewData = [];
let cellmodelsCriteria = null;

//Operation by region
let operationbyregionsid = null;
let operationbyregionData = [];
let operationbyregionEditData = [];
let operationbyregionNewData = [];
let operationbyregionCriteria = null;

//Pallet Movement                                       ------------------working--------------------
// let storagepalletid = null;
let palletMovementData = [];
let palletMovementEditData = [];
let palletMovementNewData = [];
let palletMovementCriteria = null;

//PalletDestruction

let palletDestructionCriteria = null;
let palletDestructionEditData = [];
//logicalgate
let logicalgateid = null;
let logicalgateData = [];
let logicalgateEditData = [];
let logicalphysicalgateNewData = [];
let logicalphysicalgateCriteria = null;

//physicalgate
let physicalgateData = [];
let physicalgateEditData = [];
let physicalgateNewData = [];
let physicalgateCriteria = null;

//StockByBatch
let Stockbatchid = null;
let StockbatchData = [];
let StockbatchEditData = [];
let StockbatchNewData = [];
let StockbatchCriteria = null;
//StockByLocation
let Stocklocationid = null;
let StocklocationData = [];
let StocklocationCriteria = null;
let MasterMissionCriteria = null;
let AssociatedTrailerdata = [];
let LOGIN_MENUS = [];
let familycriteria = null;

// Dynamic ids handler /////////////////////////////////////////////////////

export const setidhandler = (id, menuFlag) => {
  console.log("set id callled menuflag", menuFlag);
  console.log("set id callled id", id);
  // use else if condition here according to your menuflag/////////////////////////////////
  if (menuFlag === "Products") {
    productid = id;
    console.log("product id", productid);
  }
  if (menuFlag === "Classes") {
    missionClassid = id;
    console.log(" product id", missionClassid);
  }
  if (menuFlag === "Families") {
    familiesid = id;
    console.log("families id", familiesid);
  }
  if (menuFlag === "Downgrade Container") {
    containerDowngradeid = id;
    console.log("container down id", containerDowngradeid);
  }
  if (menuFlag === "Trailers release") {
    trailerReleaseid = id;
    console.log("trailer Release id", trailerReleaseid);
  }
  if (menuFlag === "Trailers") {
    trailersid = id;
    console.log("trailers id", trailersid);
  }
  if (menuFlag === "Sites") {
    siteid = id;
    console.log("Site id", siteid);
  }

  if (menuFlag === "Silo") {
    siloid = id;
    console.log("siloid", siloid);
  }

  if (menuFlag === "Silo loading") {
    siloloadingid = id;
    console.log("siloloadingid", siloloadingid);
  }

  if (menuFlag === "Logistic units") {
    logisticunit = id;
    console.log("logistic unit id", logisticunit);
  }
  if (menuFlag === "Contents") {
    Stockcontentid = id;
    console.log("logistic unit id", logisticunit);
  }
  // shahid////////////////////////////////////////////////
  if (menuFlag === "Containers") {
    StorageContainerId = id;
    console.log("Storage container  id", StorageContainerId);
  }
  if (menuFlag === "Storage Mission") {
    storagemissionid = id;
    console.log("product id", storagemissionid);
  }
  if (menuFlag === "Orders") {
    preparationorderid = id;
    console.log("product id", preparationorderid);
  }
  if (menuFlag === "Container Eligibility") {
    containereligibilityid = id;
    console.log("product id", containereligibilityid);
  }
  if (menuFlag === "Pallets") {
    storagepalletid = id;
    console.log("Storage Pallet", storagepalletid);
  }
  if (menuFlag === "Packing lines") {
    packinglineid = id;
    console.log("product id", packinglineid);
  }
  if (menuFlag === "File integration") {
    fileintegrationid = id;
    console.log("product id", fileintegrationid);
  }
  if (menuFlag === "Containers creation") {
    containercreationid = id;
    console.log("product id", containercreationid);
  }
  if (menuFlag === "Pallets to destruction") {
    palletdestructionid = id;
    console.log("pallet destruction id", palletdestructionid);
  }
  if (menuFlag === "Pallet label") {
    labelprintingid = id;
    console.log("product id", labelprintingid);
  }
  if (menuFlag === "Collection Printing") {
    collectionprintingid = id;
    console.log("product id", collectionprintingid);
  }
  if (menuFlag === "Mission Label Printing") {
    missionlabelprintingid = id;
    console.log("product id", missionlabelprintingid);
  }

  if (menuFlag === "Laser Location Label Printing") {
    laserprintingid = id;
    console.log("product id", laserprintingid);
  }
  if (menuFlag === "Thermal Location Label Printing") {
    thermalprintingid = id;
    console.log("product id", thermalprintingid);
  }
  if (menuFlag === "Support ID") {
    supportprintingid = id;
    console.log("product id", supportprintingid);
  }
  if (menuFlag === "Cubing List Printing") {
    cubingprintingid = id;
    console.log("product id", cubingprintingid);
  }
  if (menuFlag === "Stock Take Printing") {
    stockprintingid = id;
    console.log("product id", stockprintingid);
  }
  if (menuFlag === "Regions") {
    regionid = id;
    console.log("product id", regionid);
  }
  if (menuFlag === "Accessibility") {
    cellaccessid = id;
    console.log("product id", cellaccessid);
  }
  if (menuFlag === "Cells Modification") {
    cellmodificationid = id;
    console.log("product id", cellmodificationid);
  }
  if (menuFlag === "Cells Creation") {
    cellcreationid = id;
    console.log("product id", cellcreationid);
  }
  if (menuFlag === "Cells Deletion") {
    celldeletionid = id;
    console.log("product id", celldeletionid);
  }
  if (menuFlag === "Companies") {
    companiesid = id;
    console.log("product id", companiesid);
  }
  if (menuFlag === "Warehouses") {
    warehouseid = id;
    console.log("product id", warehouseid);
  }
  if (menuFlag === "Roles") {
    rolesid = id;
    console.log("product id", rolesid);
  }
  if (menuFlag === "Change Password") {
    changepasswordid = id;
    console.log("product id", changepasswordid);
  }
  if (menuFlag === "Parameters") {
    parameterid = id;
    console.log("product id", parameterid);
  }
  if (menuFlag === "Rack Profiles") {
    rackid = id;
    console.log("product id", rackid);
  }
  if (menuFlag === "Stock snapshot") {
    stocksnapid = id;
    console.log("id", stocksnapid);
  }
  if (menuFlag === "Rack Status Change") {
    rackstatusid = id;
    console.log("id", rackstatusid);
  }
  if (menuFlag === "Cancellation") {
    cancelid = id;
    console.log("id", cancelid);
  }
  if (menuFlag === "Multiple Cancellation") {
    multicancelid = id;
    console.log("product id", multicancelid);
  }

  ///Physical gate
  if (menuFlag === "Physical gates") {
    physicalgateid = id;
    console.log("physicalgateid", physicalgateid);
  }

  ///logical gate
  if (menuFlag === "Logical gates") {
    logicalgateid = id;
    console.log("logicalgateid", logicalgateid);
  }

  //StockByBatch
  if (menuFlag === "Stock by batch") {
    Stockbatchid = id;
    console.log("Stock By Batch", Stockbatchid);
  }

  //StockByLocation
  if (menuFlag === "Stock by location") {
    Stocklocationid = id;
    console.log("Stock By Location", Stocklocationid);
  }
  ///Repacking
  if (menuFlag === "Repacking") {
    repackingid = id;
    console.log("repackingid", repackingid);
  }
  if (menuFlag === "Uncubed POs") {
    uncubedid = id;
    console.log("uncubedid", uncubedid);
  }
  ///Packaging
  if (menuFlag === "Packagings") {
    packagingid = id;
    console.log("packagingid", packagingid);
  }

  if (menuFlag === "Contacts") {
    contactid = id;
    console.log("contact id", contactid);
  }
  if (menuFlag === "Users") {
    userId = id;
    console.log("user id", userId);
  }
  //Content Status
  if (menuFlag === "Content statuses") {
    contentstatusid = id;
    console.log("contentstatusid", contentstatusid);
  }

  if (menuFlag === "Boxes") {
    prepration_boxid = id;
    console.log("prepration >> box", prepration_boxid);
  }

  //Physical gate
  if (menuFlag === "Cell models") {
    cellmodelsid = id;
    console.log("cellmodelsid", cellmodelsid);
  }
  if (menuFlag === "Operation by region") {
    operationbyregionsid = id;
    console.log("operationbyregionsid", operationbyregionsid);
  }
  // if (menuFlag === "Storage Pallet") {
  //   palletMovementid = id;
  //   console.log("palletMovementid", palletMovementid);
  // }
};

//Operation by region
export const operationbyregionDataHandler = (data) => {
  operationbyregionData = data;
};

export const operationbyregionEditDataHandler = (data) => {
  operationbyregionEditData = data;
};

export const operationbyregionNewDataHandler = (data) => {
  operationbyregionNewData = data;
};
export const operationbyregionCriteriaHandler = (data) => {
  operationbyregionCriteria = data;
};

// mission class
export const missionclassCriteria =(data) =>{
  MissionclassCriteria=data;
};
export const MissionclassCriteriaHandler =(data) =>{
  missionclassCriteriaHandler=data;
};
export const MissionclassData =(data) =>{
  missionClassData=data;
};
export const MissionclassDataHandler =(data) =>{
  missionclassDataHandler=data;
};
export const MissionclassEditDataHandler =(data) =>{
  missionClassEditDataHandler=data;
};
export const MissionClassEditData =(data) =>{
  missionClassEditData=data;
};
export const MissionClassNewData =(data) =>{
  missionClassNewData=data;
};
//Pallet Movement
export const palletMovementDataHandler = (data) => {
  palletMovementData = data;
  console.log("palletMovementData", palletMovementData);
};

// pallet destruction
export const palletDestructionDataHandler = (data) => {
  palletDestructionData = data;
  console.log("palletDestructionData", palletDestructionData);
};

export const palletDestructionEditDataHandler = (data) => {
  palletDestructionEditData = data;
};


export const palletMovementEditDataHandler = (data) => {
  palletMovementEditData = data;
};

export const palletMovementNewDataHandler = (data) => {
  palletMovementNewData = data;
};
export const palletMovementCriteriaHandler = (data) => {
  palletMovementCriteria = data;
};

export const palletDestructionCriteriaHandler = (data) => {
  palletDestructionCriteria = data;
};

//contentstatusData

export const contentstatusDataHandler = (data) => {
  contentstatusData = data;
};

export const contentstatusEditDataHandler = (data) => {
  contentstatusEditData = data;
};

export const contentstatusNewDataHandler = (data) => {
  contentstatusNewData = data;
};
export const contentstatusCriteriaHandler = (data) => {
  contentstatusCriteria = data;
};

//prepration >> box

export const prepration_boxDataHandler = (data) => {
  prepration_boxData = data;
};

export const prepration_boxEditDataHandler = (data) => {
  prepration_boxEditData = data;
};

export const prepration_boxNewDataHandler = (data) => {
  prepration_boxNewData = data;
};
export const prepration_boxCriteriaHandler = (data) => {
  console.log("calling from store---------", data);
  prepration_boxCriteria = data;
};

//--------------
export const logisticUnitCriteriaHandler = (data) => {
  console.log("logisticUnitCriteriaHandler", data);
  logisticUnitCriteria = data;
};

export const PackagingCriteriaaHandler = (data) => {
  console.log("PackagingCriteriaahandler ", data);
  PackagingCriteriaa = data;
};

//Cellmodels
export const cellmodelsDataHandler = (data) => {
  cellmodelsData = data;
};

export const cellmodelsEditDataHandler = (data) => {
  cellmodelsEditData = data;
};

export const cellmodelsNewDataHandler = (data) => {
  cellmodelsNewData = data;
};
export const cellmodelsCriteriaHandler = (data) => {
  cellmodelsCriteria = data;
};

//logicalgate
export const logicalgateDataHandler = (data) => {
  logicalgateData = data;
};

export const logicalgateEditDataHandler = (data) => {
  logicalgateEditData = data;
};

export const logicalphysicalgateNewDataHandler = (data) => {
  logicalphysicalgateNewData = data;
};
export const logicalphysicalgateCriteriaHandler = (data) => {
  logicalphysicalgateCriteria = data;
};

//physicalgate
export const physicalgateDataHandler = (data) => {
  physicalgateData = data;
};

export const physicalgateEditDataHandler = (data) => {
  physicalgateEditData = data;
};

export const physicalgateNewDataHandler = (data) => {
  physicalgateNewData = data;
};
export const physicalgateCriteriaHandler = (data) => {
  physicalgateCriteria = data;
};

//StockByBatch
export const StockbatchDataHandler = (data) => {
  StockbatchData = data;
};

export const StockbatchEditDataHandler = (data) => {
  StockbatchEditData = data;
};

export const StockbatchNewDataHandler = (data) => {
  StockbatchNewData = data;
};
export const StockbatchCriteriaHandler = (data) => {
  console.log("batch criteria data", data);
  StockbatchCriteria = data;
};

//StockByLocation
export const StocklocationDataHandler = (data) => {
  console.log("stock location data", data);
  StocklocationData = data;
};
export const StocklocationCriteriaHandler = (data) => {
  StocklocationCriteria = data;
};

/// shahid methods/////////////////////////////////////////////
export const SetStoragefilter = (data) => {
  Storagfiltercriteria = data;
};
export const SetStorageEditData = (data) => {
  StoragecontainerEditdata = data;
};
export const SetStockcontentedit = (data) => {
  Stockcontenteditdata = data;
};

///////////////////////////////////////////////////////////
export const ParameterHandler = (data) => {
  ParameterData = data;
};
export const ParameterNewHandler = (data) => {
  ParameterNewData = data;
};
export const ParameterEditHandler = (data) => {
  ParameterEditData = data;
};
export const ActualLogisticUnitDisplaydatahandler = (data) => {
  ActualLogisticUnitDisplaydata = data;
};
export const RepackingHandler = (data) => {
  console.log("repacking data", data);
  Repackingdata = data;
};

export const RepackingdataCriteriaHandler = (data) => {
  console.log("repacking criteria data", data);
  RepackingdataCriteria = data;
};

export const formHandler = (data) => {
  console.log("Formdata", data);
  Formdata = data;
};

export const statuschangeHandler = (data) => {
  Statuschangedata = data;
};

export const pickingticketHandler = (data) => {
  Pickingticketdata = data;
};
export const goodsinmyHandler = (data) => {
  Goodsinmydata = data;
};

export const statuschangeeditHandler = (data) => {
  Statuschangeeditdata = data;
};

export const RepackingEditHandler = (data) => {
  console.log("repacking data", data);
  RepackingEditdata = data;
};
export const TrailerAssociationHandler = (data) => {
  console.log("repacking data", data);
  TrailerAssociationdata = data;
};
export const AssociatedTrailerHandler = (data) => {
  console.log("AssociatedTrailerHandler", data);
  AssociatedTrailerdata = data;
};
export const SelectedTrailerAssociationHandler = (data) => {
  console.log("repacking data", data);
  SelectedTrailerAssociationdata = data;
};
export const RepackingDisplaylineHandler = (data) => {
  Displaylistdata.push(data);
};
export const TrailerEditHandler = (data) => {
  TrailerAssociationEditdata = data;
};
export const MissionValidationHandler = (data) => {
  MissionValidationdata = data;
};

export const packinglineHandler = (data) => {
  Packinglinedata = data;
};
export const PackinglinedataCriteriaHandler = (data) => {
  PackinglinedataCriteria = data;
};
export const StorageMissionHandler = (data) => {
  StorageMissionData = data;
};
export const StoragePalletHandler = (data) => {
  StoragePalletData = data;
};
export const PalletDestructHandler = (data) => {
  palletDestructionData = data;
};
export const ContainerDataHandler = (data) => {
  ContainerData = data;
};
export const PackinglineEditHandler = (data) => {
  PackinglineEditdata = data;
};

export const StorageMissionEditHandler = (data) => {
  StorageMissionEditdata = data;
};
export const StoragePalletEditHandler = (data) => {
  StoragePalletEditdata = data;
};
export const PalletToDestructEditHandler = (data) => {
  PalletToDestructEditdata = data;
};
export const ContainerEditHandler = (data) => {
  ContainerEditdata = data;
};

export const DisplayEditRepackinglineHandler = (data) => {
  displayeditrepacking = data;
};

export const DisplayContainerListInRepacking = (data) => {
  listOfContainerInRepacking = data;
};

export const stockbybatchHandler = (data) => {
  Stockbybatchdata = data;
};
export const DisplaystocklocationHandler = (data) => {
  Displaystocklocationdata.push(data);
};

// export const PhysicalgateHandler = (data) => {
//   Physicalgatelistdata = data;
// };

export const siloFilterHandler = (data) => {
  Silofilterdata = data;
};

export const BoxreplacementHandler = (data) => {
  Boxreplacementdata = data;
};

export const BoxreplacementCriteriaHandler = (data) => {
  Boxreplacementcriteriadata = data;
};

export const siloLoadingFilterHandler = (data) => {
  SiloLoadingFilterdata = data;
};

export const SiloLoadingFilterCriteriaHandler = (data) => {
  SiloLoadingFilterCriteria = data;
};

export const siloLoadingEditHandler = (data) => {
  SiloLoadingEditdata = data;
};

export const SiloFilterCriteriaHandler = (data) => {
  SiloFilterCriteria = data;
};

export const familyfiltercriteriaHandler = (data) => {
  familycriteria = data;
};

export const RackCriteriaHandler = (data) => {
  RackCriteria = data;
};

export const MultiCancelCriteriaHandler = (data) => {
  missioncancelcriteria = data;
};

export const CancelCriteriaHandler = (data) => {
  cancelcriteria = data;
};
export const statuschangeCriteriaHandler = (data) => {
  console.log("Status filter criteria", data);
  StatusFilterCriteria = data;
};

export const waveHandler = (data) => {
  Wavedata = data;
};

export const SelectedwaveHandler = (data) => {
  console.log("shahidddddddddddd store js", data);
  SelectedWavedata = data;
};

export const waveShippingHandler = (data) => {
  waveshippingdata = data;
};

export const waveShippingEditHandler = (data) => {
  WaveShippingEditdata = data;
};

export const intertrailerHandler = (data) => {
  intertrailerdata = data;
};

export const waveEditHandler = (data) => {
  WaveEditdata = data;
};

export const WaveAddlinesHandler = (data) => {
  WaveAddlinesdata = data;
};

export const removeWaveAddlinesHandler = (data) => {
  WaveAddlinesdata = [];
};

export const BoxEditHandler = (data) => {
  BoxEditdata = data;
};
export const setGateerrormesg = (data) => {
  if (data === true) {
    console.log("true");
    gateerrormesg = "Impossible to change this Gate : Already Reserved";
  } else {
    console.log("false");
    gateerrormesg = "";
  }
};
export const intertrailereditHandler = (data) => {
  intertrailereditdata = data;
};

export const dispalyeditHandler = (data) => {
  displayeditdata = data;
};

export const trailerdispalyeditHandler = (data) => {
  intertrailerdisplayeditdata = data;
};

export const siloEditHandler = (data) => {
  siloEditdata.push(data);
};

export const BoxreplacementeditHandler = (data) => {
  Boxreplacementeditdata.push(data);
};

export const wavedisplayHandler = (data) => {
  // wavedisplaydata.push(data);
  wavedisplaydata = data;
};

// export const WaveAddlinesHandler =(data) =>{
//   WaveAddlinesdata.push(data);
// }

export const intertrailerdisplayHandler = (data) => {
  intertrailerdisplaydata.push(data);
};

export const intertrailernewHandler = (data) => {
  intertrailernewdata = data;
};

export const TrailerReleaseFilterHandler = (data) => {
  TrailerReleaseData = data;
};
export const TrailersFilterHandler = (data) => {
  TrailersData = data;
};
export const TrailersEditHandler = (data) => {
  TrailersEditData.push(data);
};
export const StockByLocationHandler = (data) => {
  StockByLocationData = data;
};
export const MasterMissionHandler = (data) => {
  MasterMissionData = data;
};
export const AccessHandler = (data) => {
  AccessData = data;
};
export const ModificationHandler = (data) => {
  ModificationData = data;
};
export const DeletionHandler = (data) => {
  DeletionData = data;
};
export const ProductHandler = (data) => {
  ProductData = data;
};

export const ProductEditHandler = (data) => {
  console.log("check product data", data);
  ProductEditData = data;
  console.log("product edit data", ProductEditData);
};
export const ProductDisplayHandler = (data) => {
  ProductDisplayData = data;
};
export const ProductcriteriaHandler = (data) => {
  console.log("product critteria", data);
  ProductCriteria = data;
};

export const MissionValidationcriteriaHandler = (data) => {
  console.log("missionvalidationcriteria critteria", data);
  MissionvalidationCriteria = data;
};

export const MulMissionValidationcriteriaHandler = (data) => {
  console.log("missionvalidationcriteria critteria", data);
  multiMissionvalidationCriteria = data;
};

export const PreparationOrdercriteriaHandler = (data) => {
  console.log(" Preaparationcriteria", data);
  PreparationOrderCriteria = data;
};

export const snapshotcriteriaHandler = (data) => {
  console.log(" snapshotcriteria", data);
  snapshotcriteria = data;
};

export const PreparationOrderprepcriteriaHandler = (data) => {
  console.log(" Preaparationprepcriteria", data);
  PreparationOrderprepCriteria = data;
};

export const TrailerCriteriaHandler = (data) => {
  console.log("TrailerCriteria ", data);
  TrailerCriteria = data;
};

export const TrailerReleaseCriteriaHandler = (data) => {
  console.log("TrailerReleaseCriteria ", data);
  TrailerReleaseCriteria = data;
};

export const WaveCriteriaHandler = (data) => {
  console.log("WaveCriteria ", data);
  WaveCriteria = data;
};

export const SelectedWaveCriteriaHandler = (data) => {
  console.log("WaveCriteria ============>>", data);
  SelectedWaveCriteria = data;
};
export const TrailerAssociationCriteriaHandler = (data) => {
  console.log("TrailerAssociationCriteria ", data);
  TrailerAssociationCriteria = data;
};

export const SelectedTrailerAssociationCriteriaHandler = (data) => {
  console.log("TrailerAssociationCriteria ", data);
  SelectedTrailerAssociationCriteria = data;
};

export const UncubedCriteriaHandler = (data) => {
  console.log(" UncubedCriteria", data);
  UncubedCriteria = data;
};
export const BoxOrdercriteriaHandler = (data) => {
  console.log(" Boxcriteria", data);
  BoxOrderCriteria = data;
};
export const Palletmovementcritariahandler = (data) => {
  console.log("product critteria", data);
  Palletmovementcritaria = data;
};

export const CellAccessCriteriaHandler = (data) => {
  console.log("cell access critteria", data);
  CellAccessCriteria = data;
};
export const SitesNewHandler = (data) => {
  SitesNewData = data;
};
export const SiteParamHandler = (data) => {
  SiteParamData = data;
};
export const SiteParamNewHandler = (data) => {
  SiteParamNewData = data;
};
export const SiteContactsHandler = (data) => {
  ContactsData = data;
};
export const ProdDispEditHandler = (data) => {
  ProdDispEditData = data;
};
export const SiteLogisticUnitHandler = (data) => {
  SiteLogisticUnitData = data;
};
export const ProdFamiliesEditionHandler = (data) => {
  FamiliesEditionData = data;
};
export const OrderCommentsHandler = (data) => {
  OrderCommentsData = data;
};
export const PalletmovementHandler = (data) => {
  Palletmovementdata = data;
};
export const OrderHandler = (data) => {
  OrderData = data;
};

// export const SnapshotHandler = (data) => {
//   Snapshotdata = data;
// };

export const OrderprepHandler = (data) => {
  OrderprepData = data;
};
export const UncubedHandler = (data) => {
  Uncubeddata = data;
};
export const BoxOrderHandler = (data) => {
  BoxData = data;
};
export const PackagingHandler = (data) => {
  PackagingData = data;
};
export const RegionHandler = (data) => {
  RegionData = data;
};
export const regioncriteriaHandler = (data) => {
  regioncriteriaData = data;
};
export const SitesHandler = (data) => {
  SitesData = data;
};
export const SitesCriteriaHandler = (data) => {
  SiteCriteriaData = data;
};
export const CompaniesDataHandler = (data) => {
  CompaniesData = data;
};
export const WarehouseHandler = (data) => {
  WarehouseData = data;
};
export const WarehousecriteriaDataHandler = (data) => {
  WarehousecriteriaData = data;
};
export const LogisticUnitHandler = (data) => {
  console.log(
    "logistic unint calling handlerrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr ",
    data
  );
  LogisticUnitData = data;
};

export const NestedLogisticUnitHandler = (data) => {
  console.log("getting data from product kl", data);
  nestedlogisticunit = data;
};

export const nesteddisplayhandler = (data) => {
  console.log(
    "getting  global data from dispaly  rack by uzzzuuuuuuuuuuuuuuuuuuu",
    data
  );
  nesteddisplaydata = data;
};

export const nesteddisplayreferenceHandler = (data) => {
  console.log(
    "getting  global data from dispaly reference by uzzzuuuuuuuuuuuuuuuuuuu",
    data
  );
  nesteddisplayreferencedata = data;
};

export const NestedStocklocationDataHandler = (data) => {
  console.log("getting data from product kl", data);
  StocklocationData = data;
};

export const RolesHandler = (data) => {
  RolesData = data;
};
export const OrderEditHandler = (data) => {
  OrderEditData = data;
};
export const GeneralEditHandler = (data) => {
  GeneralEditData = data;
};
export const RegionEditHandler = (data) => {
  RegionEditData = data;
};
export const SitesEditHandler = (data) => {
  SitesEditData = data;
};
export const CompaniesEditHandler = (data) => {
  CompaniesEditData = data;
};
export const WarehouseEditHandler = (data) => {
  WarehouseEditData = data;
};
export const LogisticUnitEditHandler = (data) => {
  LogisticUnitEditData = data;
};
export const LogisticUnitfilterHandler = (data) => {
  LogisticUnitfilterData = data;
};
export const RolesEditHandler = (data) => {
  RolesEditData = data;
};
export const OrderDisplayHandler = (data) => {
  OrderDisplayData = data;
};
export const UncubedOrderDisplayHandler = (data) => {
  UncubedOrderDisplayData = data;
};
export const OrderDispEditHandler = (data) => {
  OrderDispEditData = data;
};
export const MissionmultivaliHandler = (data) => {
  Missionmultivalidata = data;
};
export const OrderCustomerHandler = (data) => {
  OrderCustomerData = data;
};
export const GeneralNewHandler = (data) => {
  GeneralNewData = data;
};
export const RegionNewHandler = (data) => {
  RegionNewData = data;
};

export const CompaniesNewHandler = (data) => {
  CompaniesNewData = data;
};
export const WarehouseNewHandler = (data) => {
  WarehouseNewData = data;
};
export const LogisticUnitDisplayHandler = (data) => {
  LogisticUnitDisplayData = data;
};
export const RolesNewHandler = (data) => {
  RolesNewData = data;
};
export const StockNewHandler = (data) => {
  StockNewData = data;
};
export const PreparationNewHandler = (data) => {
  PreparationNewData = data;
};
export const OrderBoxHandler = (data) => {
  OrderBoxData = data;
};
export const OrderTrailerHandler = (data) => {
  OrderTrailerData = data;
};
export const ShippingDisplayHandler = (data) => {
  ShippingDisplayData = data;
};
export const StockListHandler = (data) => {
  StockListData = data;
};
export const PreparationListHandler = (data) => {
  PreparationListData = data;
};
export const ShippingDispEditHandler = (data) => {
  ShippingDispEditData = data;
};
export const StockEditHandler = (data) => {
  StockEditData = data;
};
export const PreparationEditHandler = (data) => {
  PreparationEditData = data;
};
export const WhMissionVHandler = (data) => {
  WhMissionVdata = data;
};

export const containerdowngradeHandler = (data) => {
  Containerdowngradedata = data;
};

export const NewUserDataHandler = (data) => {
  NewUserData = data;
};

export const CreateUserDataHandler = (data) => {
  CreateUserData = data;
};

export const CreateWaveDataHandler = (data) => {
  CreateWaveData = data;
};
export const ContactDataHandler = (data) => {
  ContactData = data;
};

export const newCreateContactDataHandler = (data) => {
  newCreateContactData = data;
};

export const contactEditDataHandler = (data) => {
  contactEditData = data;
  console.log("contactEditData", contactEditData);
};

export const contactcriteriaHandler = (data) => {
  console.log("contact critteria", data);
  contactCriteria = data;
};
export const companiescriteriaHandler = (data) => {
  console.log("companies critteria", data);
  companiesCriteria = data;
};

export const contentEditDataHandler = (data) => {
  contentEditData = data;
};

export const contentcriteriaHandler = (data) => {
  contentCriteria = data;
};

export const setContainerData = (data) => {
  console.log("container data calling", data);
  containerData = data;
};
export const ResetContainerData = (data) => {
  containerData = {
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
    ListOfPrinter: [],
    isPoValid: false,
    printlabel: false,
    success: "",
    loading: false,
    msg: "",
    idExchange: "",
  };
};
export const FamiliesDataHandler = (data) => {
  FamiliesData = data;
};

export const CellrackDataHandler = (data) => {
  CellrackData = data;
};

export const StoragecontainerDataHandler = (data) => {
  StoragecontainerData = data;
};
export const RackHandler = (data) => {
  RackData = data;
};
export const RackEditHandler = (data) => {
  RackEditData = data;
};
export const RackDisplayHandler = (data) => {
  RackDisplayData = data;
};
export const RackDispEditHandler = (data) => {
  RackDispEditData = data;
};
export const RackDispNewHandler = (data) => {
  RackDispNewData = data;
};
export const RackNewHandler = (data) => {
  RackNewData = data;
};
export const CancelHandler = (data) => {
  CancelData = data;
};
export const MultiCancelHandler = (data) => {
  MultiCancelData = data;
};
export const RackStatusHandler = (data) => {
  RackStatusData = data;
};
export const StockSnapHandler = (data) => {
  StockSnapData = data;
};
export const StockSnapDisplayHandler = (data) => {
  StockSnapDisplayData = data;
};
export const StockSnapEditHandler = (data) => {
  StockSnapEditData = data;
};
export const StockcontentDataHandler = (data) => {
  StockcontentData = data;
};
export const StockcontentCriteriaHandler = (data) => {
  StockcontentCriteria = data;
};
export const ParameterCriteriaHandler = (data) => {
  ParamterCriteria = data;
};
export const UserEditHandler = (data) => {
  UserEditData = data;
};
export const RefreshRolecriteriaHandler = (data) => {
  console.log("Refresh Role criteria Handler", data);
  RefreshRoleCriteria = data;
};
export const RefreshUsercriteriaHandler = (data) => {
  console.log("Refresh user criteria Handler", data);
  RefreshUserCriteria = data;
};
export const getlistofRegionsRTWHEntitiesHandler = (data) => {
  console.log("getlistofRegionsRTWHEntities", data);
  getlistofRegionsRTWHEntities = data;
};

export const getlistofPalletDestructionRegionHandler = (data) => {
  console.log("getlistofPalletDestructionRegion", data);
  getlistofPalletDestructionRegion = data;
};

export const MasterMissionCriteriaHandler = (data) => {
  console.log("MAsterMissionCriteriaHandler", data);
  MasterMissionCriteria = data;
};
export const ListOfLoginMenusHandler = (data) => {
  console.log("ListOfLoginMenusHandler", data);
  LOGIN_MENUS = data;
};

//Remover

export const remover = (remove) => {
  console.log("remover=====> uzmii", remove);
  if (remove === repackingid) {
    RepackingEditdata = [];
    Repackingdata = [];
    Displaylistdata = [];
    RepackingdataCriteria = null;
  } else if (remove === packinglineid) {
    Packinglinedata = [];
    PackinglineEditdata = [];
    PackinglinedataCriteria = null;
  } else if (remove === "Packing lines") {
    Packinglinedata = [];
    PackinglineEditdata = [];
    PackinglinedataCriteria = null;
  }
  // }else if(remove=== "Product"){
  //   console.log("product remover")
  //   ProductCriteria =[];
  // }
  // Shahid remover //////////////////////////////////////////////
  else if (remove === "StoragecontainerEditdata") {
    StoragecontainerEditdata = null;
  }
  // Shahid///////////////////////////////////////////////////////
  else if (remove === "storagemissionid") {
    StorageMissionData = [];
    StorageMissionEditdata = [];
    // } else if (remove === storagepalletid) {
    //   console.log("remover calling for pallet storage");
    //   StoragePalletData = [];
    //   StoragePalletEditdata = [];
    //   getlistofRegionsRTWHEntities = [];
    //   palletMovementData = [];
    //   Palletmovementcritaria = [];
    // } else if (remove === storagepalletid) {
    //   console.log("remover Storage Pallet");
    //   StoragePalletData = [];
    //   StoragePalletEditdata = [];
    //   getlistofRegionsRTWHEntities = [];
    //   Palletmovementcritaria = [];
  } else if (remove === "storagepallet") {
    console.log("remover calling for pallet storage");
    StoragePalletData = [];
  } else if (remove === palletdestructionid) {
    palletDestructionData = [];
    palletDestructionEditData = [];
  } else if (remove === "Repacking Edit Data") {
    RepackingEditdata = [];
  } else if (remove === "PackingLineEdit") {
    PackinglineEditdata = [];
  } else if (remove === "Storage_Mission_Edit") {
    StorageMissionEditdata = [];
  } else if (remove === "StoragePalletEdit") {
    StoragePalletEditdata = [];
  } else if (remove === "PalletToDestructionEdit") {
    palletDestructionEditData = [];
  } else if (remove === "Cotainer_Edit") {
    ContainerEditdata = [];
  } else if (remove === "Display Line Data") {
    Displaylistdata = [];
  } else if (remove === "Validation") {
    MissionValidationdata = [];
    MissionvalidationCriteria = null;
  } else if (remove === "Trailers association") {
    TrailerAssociationdata = [];
    TrailerAssociationEditdata = null;
  } else if (remove === "Trailer Association Edit") {
    console.log("data null");
    TrailerAssociationEditdata = null;
  } else if (remove === "addlinesdata") {
    WaveAddlinesdata = [];
  } else if (remove === "storagepallet") {
    TrailerAssociationEditdata = null;
  } else if (remove === "Stock by batch") {
    Stockbybatchdata = [];
  }
  // Displaystocklocationdata = [];

  // else if (remove === "Physical Gate") {
  //   Physicalgatelistdata = [];
  // }
  else if (remove === "Boxes replacement") {
    Boxreplacementdata = [];
    Boxreplacementeditdata = [];
    Boxreplacementcriteriadata = null;
  } else if (remove === "Statuses change") {
    Statuschangedata = [];
    Statuschangeeditdata = [];
    StatusFilterCriteria = null;
  } else if (remove === "Loading Instruction") {
    Formdata = [];
  } else if (remove === "Statuschangedit") {
    Statuschangeeditdata = [];
  } else if (remove === siloid) {
    Silofilterdata = [];
    siloEditdata = [];
    SiloFilterCriteria = null;
  } else if (remove === siloloadingid) {
    SiloLoadingFilterdata = [];
    SiloLoadingEditdata = [];
    SiloLoadingFilterCriteria = [];
  } else if (remove === "WaveListShipping") {
    waveshippingdata = [];
  } else if (remove === "WaveEditShipping") {
    WaveShippingEditdata = [];
  } else if (remove === "Waves") {
    Wavedata = [];
    SelectedWavedata = [];
    WaveEditdata = [];
    WaveAddlinesdata = [];
    wavedisplaydata = [];
    waveshippingdata = [];
    CreateWaveData = [];
  } else if (remove === "Boxes") {
    BoxData = [];
    BoxEditdata = [];
  } else if (remove === "Inter Warehouse Trailer") {
    intertrailerdata = [];
    intertrailereditdata = [];
    intertrailerdisplaydata = [];
    intertrailernewdata = [];
  } else if (remove === "InterwarehouseTrailerEdit") {
    intertrailereditdata = [];
  } else if (remove === "CreatenewTrailerPage") {
    intertrailernewdata = [];
  } else if (remove === "InterwarehouseTrailerDisplay") {
    intertrailerdisplaydata = [];
  } else if (remove === "Trailerdisplayedit") {
    intertrailerdisplayeditdata = [];
  } else if (remove === "Wave_Edit") {
    WaveEditdata = [];
    WaveEditCriteria = null;
  } else if (remove === "WaveAddlinesdata") {
    WaveAddlinesdata = [];
    OrderprepData = [];
    PreparationOrderprepCriteria = [];
  } else if (remove === "Box_Edit") {
    BoxEditdata = [];
  } else if (remove === "Silo_Edit") {
    siloEditdata = [];
  } else if (remove === "Goods In") {
    Goodsinmydata = [];
  } else if (remove === "Boxreplacementedit") {
    Boxreplacementeditdata = [];
  } else if (remove === "PickingTicket") {
    Pickingticketdata = [];
  } else if (remove === "Silo_Loading_Edit") {
    SiloLoadingEditdata = [];
  } else if (remove === "Wave_Display") {
    wavedisplaydata = [];
  } else if (remove === "Display_Edit") {
    displayeditdata = [];
  } else if (remove === "Trailers release") {
    TrailerReleaseData = [];
    TrailerReleaseEditData = [];
  } else if (remove === "Trailers") {
    TrailersData = [];
    TrailersEditData = [];
  } else if (remove === "TrailersEdit") {
    TrailersEditData = [];
  } else if (remove === "Stock by location") {
    StockByLocationData = [];
  } else if (remove === "Master missions") {
    MasterMissionData = [];
    MasterMissionCriteria = null;
  } else if (remove === cellaccessid) {
    AccessData = [];
    CellAccessCriteria = null;
  } else if (remove === cellmodificationid) {
    ModificationData = [];
  } else if (remove === "Cells Deletion") {
    DeletionData = [];
  } else if (remove === productid) {
    console.log("product remover");
    ProductData = [];
    ProductEditData = null;
    ProductDisplayData = null;
    ProdDispEditData = [];
    // ProductCriteria = null;

    SiteLogisticUnitData = [];

    FamiliesEditionData = [];
  } else if (remove === familiesid) {
    console.log("families remover");
    FamiliesData = [];
  } else if (remove === trailerReleaseid) {
    console.log("trailer release remover");
    TrailerReleaseData = [];
    TrailerReleaseCriteria = null;
    TrailerReleaseEditData = [];
  } else if (remove === trailersid) {
    console.log("trailers remover");
    TrailersData = [];
    TrailerCriteria = null;
    TrailersEditData = [];
  } else if (remove === "ProductEdit") {
    ProductEditData = null;
  } else if (remove === "ProductDisplay") {
    ProductDisplayData = null;
  } else if (remove === "ProductDisplayEdit") {
    ProdDispEditData = [];
  } else if (remove === "OrderDisplayEdit") {
    OrderDispEditData = [];
  } else if (remove === "ShippingDisplayEdit") {
    ShippingDispEditData = [];
  } else if (remove === "StockEdit") {
    StockEditData = [];
  } else if (remove === "PreparationEdit") {
    PreparationEditData = [];
  } else if (remove === "OrderCustomer") {
    OrderCustomerData = [];
  } else if (remove === "GeneralNew") {
    GeneralNewData = [];
  } else if (remove === "RegionNew") {
    RegionNewData = [];
  } else if (remove === "CompaniesNew") {
    CompaniesNewData = [];
  } else if (remove === "WarehouseNew") {
    WarehouseNewData = [];
  } else if (remove === "LogisticUnitDisplay") {
    LogisticUnitDisplayData = [];
    ActualLogisticUnitDisplaydata = null;
  } else if (remove === "RolesNew") {
    RolesNewData = [];
  } else if (remove === "StockNew") {
    StockNewData = [];
  } else if (remove === "PreparationNew") {
    PreparationNewData = [];
  } else if (remove === "OrderBox") {
    OrderBoxData = [];
  } else if (remove === "OrderTrailer") {
    OrderTrailerData = [];
  } else if (remove === "ShippingDisplay") {
    ShippingDisplayData = [];
  } else if (remove === "StockList") {
    StockListData = [];
  } else if (remove === "PreparationList") {
    PreparationListData = [];
  } else if (remove === "EditSiteLogisticUnit") {
    SiteLogisticUnitData = [];
  } else if (remove === "ProductFamiliesEdition") {
    FamiliesEditionData = [];
  } else if (remove === "OrderComments") {
    OrderCommentsData = [];
  } else if (remove === "Pallet Movement") {
    Palletmovementdata = [];
  } else if (remove === "fileintegrationid") {
    SiloLoadingFilterdata = [];
    SiloLoadingEditdata = [];
  } else if (remove === "containereligibilityid") {
    ContainerData = [];
    ContainerEditdata = [];
  } else if (remove === "Container_Edit") {
    ContainerEditdata = [];
  } else if (remove === "GeneralEdit") {
    GeneralEditData = [];
  } else if (remove === "createwaveremover") {
    console.log("remover createdatata calllinggg======>>>>");
    CreateWaveData = [];
  } else if (remove === "RegionEdit") {
    RegionEditData = [];
  } else if (remove === "SitesEdit") {
    SitesEditData = [];
  } else if (remove === "CompaniesEdit") {
    CompaniesEditData = [];
  } else if (remove === "WarehouseEdit") {
    WarehouseEditData = [];
  } else if (remove === "LogisticUnitEdit") {
    LogisticUnitEditData = [];
    LogisticUnitData = null;
    LogisticUnitDisplayData = [];
    LogisticUnitfilterData = null;
    nestedlogisticunit = null;
    ActualLogisticUnitDisplaydata = null;
    logisticUnitCriteria = null;
  } else if (remove === "RolesEdit") {
    RolesEditData = [];
  } else if (remove === preparationorderid) {
    console.log("remove uzmiiiii======>>>>");
    OrderData = [];
    isdisplaydata = [];
    OrderEditData = [];
    OrderDisplayData = [];
    OrderDispEditData = [];
    SiteLogisticUnitData = [];
    FamiliesEditionData = [];
    OrderCommentsData = [];
    OrderCustomerData = [];
    OrderBoxData = [];
    OrderTrailerData = [];
    ShippingDisplayData = [];
    ShippingDispEditData = [];
  } else if (remove === packagingid) {
    PackagingData = [];
    GeneralEditData = [];
    GeneralNewData = [];
    StockListData = [];
    StockEditData = [];
    StockNewData = [];
    PackagingCriteriaa = null;
    PreparationListData = [];
    PreparationEditData = [];
    PreparationNewData = [];
  } else if (remove === regionid) {
    RegionData = [];
    RegionEditData = [];
    RegionNewData = [];
  } else if (remove === siteid) {
    SitesData = [];
    SiteCriteriaData = [];
    SitesEditData = [];
    RegionNewData = [];
    SitesNewData = [];
    ContactsData = [];
    SiteParamData = [];
    SiteParamNewData = [];
  } else if (remove === companiesid) {
    CompaniesData = [];
    CompaniesEditData = [];
    CompaniesNewData = [];
    //companiesCriteria = null;
  } else if (remove === warehouseid) {
    WarehouseData = [];
    WarehouseEditData = [];
    WarehouseNewData = [];
  } else if (remove === logisticunit) {
    console.log("logisticunit remover");
    LogisticUnitData = null;
    LogisticUnitEditData = [];
    LogisticUnitDisplayData = [];
    LogisticUnitfilterData = null;
    nestedlogisticunit = null;
    ActualLogisticUnitDisplaydata = null;
    logisticUnitCriteria = null;
  } else if (remove === "Logistic units") {
    console.log("logisticunit remover");
    LogisticUnitData = null;
    LogisticUnitEditData = [];
    LogisticUnitDisplayData = [];
    LogisticUnitfilterData = null;
    nestedlogisticunit = null;
    ActualLogisticUnitDisplaydata = null;
    logisticUnitCriteria = null;
  } else if (remove === rolesid) {
    RolesData = [];
    RolesEditData = [];
    RolesNewData = [];
    RefreshRoleCriteria = null;
  } else if (remove === "Roles") {
    RolesData = [];
    RolesEditData = [];
    RolesNewData = [];
    RefreshRoleCriteria = null;
  } else if (remove === "OrderDisplay") {
    console.log("uzzzzzzzzzzzzzzzz");
    OrderDisplayData = [];
    isdisplaydata = [];
    OrderCommentsData = [];
    FamiliesEditionData = [];
    OrderData = [];
    OrderDisplayData = [];
    OrderEditData = [];
    OrderCustomerData = [];
    OrderBoxData = [];
    OrderTrailerData = [];
    ShippingDisplayData = [];
  } else if (remove === "OrderEdit") {
    OrderEditData = [];
  } else if (remove === "Multiple Validation") {
    Missionmultivalidata = [];
    multiMissionvalidationCriteria = null;
  } else if (remove === "WH Mission Validation") {
    WhMissionVdata = [];
  } else if (remove === "Downgrade Container") {
    Containerdowngradedata = [];
  } else if (remove === userId) {
    NewUserData = [];
    CreateUserData = null;
    UserEditData = [];
    RefreshUserCriteria = null;
  } else if (remove === "Users") {
    NewUserData = [];
    CreateUserData = null;
    UserEditData = [];
    RefreshUserCriteria = null;
  } else if (remove === "Createnewuser") {
    CreateUserData = null;
  } else if (remove === "Nestedlogisticunit") {
    nestedlogisticunit = null;
  } else if (remove === "Contacts") {
    ContactData = [];
  } else if (remove === "Createcontact") {
    newCreateContactData = [];
  } else if (remove === "contactEditData") {
    contactEditData = [];
  } else if (remove === "contentEditData") {
    contentEditData = [];
  } else if (remove === "Families") {
    FamiliesData = [];
  } else if (remove === "Rack cells") {
    CellrackData = [];
    // shahid//////////////////////////////////////////////////
  } else if (remove === containercreationid) {
    console.log(
      "shahidddddddddd from storage container remover",
      StorageContainerId
    );
    Storagfiltercriteria = null;
    StoragecontainerData = [];
    StoragecontainerEditdata = null;
    containerData = {
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
      ListOfPrinter: [],
      isPoValid: false,
      printlabel: false,
      success: "",
      loading: false,
      msg: "",
      idExchange: "",
    };
  } else if (remove === "Containers") {
    console.log("'Data clear");
    Storagfiltercriteria = null;
    StoragecontainerData = [];
    StoragecontainerEditdata = null;
  } else if (remove === rackid) {
    RackData = [];
    RackEditData = [];
    RackDisplayData = [];
    RackDispEditData = [];
    RackDispNewData = [];
    RackNewData = [];
    RackCriteria = null;
    nesteddisplaydata = [];
  } else if (remove === "RackEdit") {
    RackEditData = [];
    RackNewData = [];
    nesteddisplaydata = [];
    // RackDispNewData=[];
    // RackDisplayData=[];
    // RackDispEditData=[];
  } else if (remove === "Stockcontenteditdata") {
    Stockcontenteditdata = null;
    //////////////////////////////////////////////////////////
  } else if (remove === "RackDisplay") {
    RackDisplayData = [];
    nesteddisplaydata = [];
    RackDispNewData = [];
  } else if (remove === "RackDisplayEdit") {
    RackDispEditData = [];
  } else if (remove === "RackDisplayNew") {
    RackDispNewData = [];
    // RackDisplayData=[];
    RackDispEditData = [];
  } else if (remove === "RackNew") {
    RackNewData = [];
    RackEditData = [];
  } else if (remove === cancelid) {
    CancelData = [];
    cancelcriteria = null;
  } else if (remove === multicancelid) {
    MultiCancelData = [];

    missioncancelcriteria = null;
  } else if (remove === rackstatusid) {
    RackStatusData = [];
  } else if (remove === stocksnapid) {
    StockSnapData = [];
    StockSnapDisplayData = [];
    StockSnapEditData = [];
    snapshotcriteria = null;
    nesteddisplayreferencedata = [];
  } else if (remove === "StockSnapDisplay") {
    StockSnapDisplayData = [];
  } else if (remove === "StockSnapEdit") {
    StockSnapEditData = [];
  } else if (remove === parameterid) {
    ParameterData = [];
    ParameterEditData = [];
    ParameterNewData = [];
    ParamterCriteria = null;
  } else if (remove === "ParameterNew") {
    ParameterNewData = [];
  } else if (remove === "ParameterEdit") {
    ParameterEditData = [];
  } else if (remove === Stockcontentid) {
    console.log("stok calling");
    StockcontentData = [];
    Stockcontenteditdata = null;
    StockcontentCriteria = null;
  } else if (remove === "Contents") {
    console.log("stok calling");
    StockcontentData = [];
    Stockcontenteditdata = null;
    StockcontentCriteria = null;
  } else if (remove === "SitesNew") {
    SitesNewData = [];
  } else if (remove === "SiteParamList") {
    SiteParamData = [];
  } else if (remove === "SiteParamNew") {
    SiteParamNewData = [];
  } else if (remove === "SitesContact") {
    ContactsData = [];
  } else if (remove === "DisplayEditRepacking") {
    displayeditrepacking = [];
  } else if (remove === "DisplayListOfContainers") {
    listOfContainerInRepacking = [];
  } else if (remove === contactid) {
    ContactData = [];
    newCreateContactData = [];
    contactEditData = [];
    contactCriteria = null;
  }

  //physical gate
  else if (remove === physicalgateid) {
    physicalgateData = [];
    physicalgateEditData = [];
    physicalgateNewData = [];
    physicalgateCriteria = null;
  }

  //logical gate
  else if (remove === logicalgateid) {
    logicalgateData = [];
    logicalgateEditData = [];
    logicalphysicalgateNewData = [];
    logicalphysicalgateCriteria = null;
    setGateerrormesg(false);
  } else if (remove === "Logical gates") {
    logicalgateData = [];
    logicalgateEditData = [];
    logicalphysicalgateNewData = [];
    logicalphysicalgateCriteria = null;
  }

  //Cell models
  else if (remove === cellmodelsid) {
    cellmodelsData = [];
    cellmodelsEditData = [];
    cellmodelsNewData = [];
  }
  //Content Status
  else if (remove === contentstatusid) {
    contentstatusData = [];
    contentstatusEditData = [];
    contentstatusNewData = [];
    contentstatusCriteria = null;
  }

  else if (remove === missionClassid) {
    missionclassDataHandler =[];
     missionClassEditDataHandler =[];
    missionClassData = [];
    missionClassEditData = [];
   missionClassNewData = [];
  }
  ///24-03-2022/////
  //prepration >> box
  else if (remove === prepration_boxid) {
    prepration_boxData = [];
    prepration_boxEditData = [];
    prepration_boxNewData = [];
    prepration_boxCriteria = null;
  }

  //Operation by region
  else if (remove === "operationbyregionsid") {
    operationbyregionData = [];
    operationbyregionEditData = [];
    operationbyregionNewData = [];
    operationbyregionCriteria = null;
  }

  //pallet movement
  else if (remove === storagepalletid) {
    palletMovementData = [];
    palletMovementEditData = [];
    palletMovementNewData = [];
    palletMovementCriteria = null;
  }

  //pallet destruction
  else if(remove === palletdestructionid){
    palletDestructionCriteria = null;
    palletDestructionEditData = [];
  }

  //StockByBatch
  else if (remove === Stockbatchid) {
    StockbatchData = [];
    StockbatchEditData = [];
    StockbatchNewData = [];
    StockbatchCriteria = null;
  }
  //StockByLocation
  else if (remove === Stocklocationid) {
    StocklocationData = [];
    // StockbatchCriteria = null;
  } else if (remove === uncubedid) {
    console.log("UNCUBED remover");
    Uncubeddata = [];
    UncubedOrderDisplayData = [];
    UncubedCriteria = [];
  }
};

export {
  missionClassData,
  missionClassEditData,
  missionClassNewData,
  MissionclassCriteria,
  missionclassDataHandler,
  missionClassEditDataHandler,
  missionClassid,
  SitesNewData,
  SiteParamData,
  SiteParamNewData,
  ContactsData,
  Repackingdata,
  Packinglinedata,
  StorageMissionData,
  StoragePalletData,
  palletDestructionData,
  RepackingEditdata,
  Displaylistdata,
  Stockbybatchdata,
  Displaystocklocationdata,
  MissionValidationdata,
  TrailerAssociationdata,
  TrailerAssociationEditdata,
  Silofilterdata,
  SiloLoadingFilterdata,
  Wavedata,
  SelectedWavedata,
  WaveEditdata,
  WaveAddlinesdata,
  BoxEditdata,
  siloEditdata,
  SiloLoadingEditdata,
  wavedisplaydata,
  TrailerReleaseData,
  StockByLocationData,
  TrailersData,
  ProductData,
  TrailersEditData,
  ProductEditData,
  ProductDisplayData,
  ProdDispEditData,
  SiteLogisticUnitData,
  FamiliesEditionData,
  PackinglineEditdata,
  Palletmovementdata,
  StorageMissionEditdata,
  ContainerData,
  ContainerEditdata,
  displayeditdata,
  OrderData,
  // Snapshotdata,
  OrderprepData,
  Uncubeddata,
  BoxData,
  OrderEditData,
  OrderDisplayData,
  UncubedOrderDisplayData,
  Stockcontenteditdata,
  OrderDispEditData,
  OrderCommentsData,
  Missionmultivalidata,
  WhMissionVdata,
  intertrailerdata,
  intertrailereditdata,
  intertrailerdisplaydata,
  intertrailerdisplayeditdata,
  OrderCustomerData,
  OrderBoxData,
  OrderTrailerData,
  ShippingDisplayData,
  ShippingDispEditData,
  StoragePalletEditdata,
  // Physicalgatelistdata,
  Boxreplacementdata,
  Boxreplacementcriteriadata,
  Boxreplacementeditdata,
  PackagingData,
  GeneralEditData,
  GeneralNewData,
  StockListData,
  StockEditData,
  StockNewData,
  PreparationListData,
  PreparationEditData,
  PreparationOrderCriteria,
  snapshotcriteria,
  PreparationOrderprepCriteria,
  PreparationNewData,
  PalletToDestructEditdata,
  Containerdowngradedata,
  Statuschangedata,
  Statuschangeeditdata,
  Pickingticketdata,
  Goodsinmydata,
  Formdata,
  MasterMissionData,
  RegionData,
  RegionEditData,
  RegionNewData,
  AccessData,
  ModificationData,
  DeletionData,
  SitesData,
  SiteCriteriaData,
  SitesEditData,
  CompaniesData,
  CompaniesEditData,
  CompaniesNewData,
  WarehouseData,
  WarehousecriteriaData,
  WarehouseEditData,
  WarehouseNewData,
  RolesData,
  RolesNewData,
  RolesEditData,
  LogisticUnitData,
  LogisticUnitDisplayData,
  LogisticUnitEditData,
  NewUserData,
  CreateUserData,
  CreateWaveData,
  nestedlogisticunit,
  nesteddisplaydata,
  nesteddisplayreferencedata,
  ProductCriteria,
  UncubedCriteria,
  MissionvalidationCriteria,
  multiMissionvalidationCriteria,
  ContactData,
  newCreateContactData,
  contactCriteria,
  contentCriteria,
  contactEditData,
  contentEditData,
  companiesCriteria,
  FamiliesData,
  CellrackData,
  StoragecontainerData,
  RackData,
  RackEditData,
  RackDisplayData,
  RackDispEditData,
  RackDispNewData,
  RackNewData,
  CancelData,
  MultiCancelData,
  RackStatusData,
  StockSnapData,
  ActualLogisticUnitDisplaydata,
  StockSnapDisplayData,
  StockSnapEditData,
  ParameterData,
  ParameterEditData,
  ParameterNewData,
  StockcontentData,
  displayeditrepacking,
  listOfContainerInRepacking,
  LogisticUnitfilterData,
  Storagfiltercriteria,
  ParamterCriteria,
  TrailerCriteria,
  TrailerReleaseCriteria,
  StoragecontainerEditdata,
  waveshippingdata,
  WaveShippingEditdata,
  intertrailernewdata,
  Stockcontentid,
  productid,
  UserEditData,
  RefreshRoleCriteria,
  RefreshUserCriteria,
  physicalgateData,
  physicalgateEditData,
  physicalgateNewData,
  physicalgateCriteria,
  StockbatchData,
  StockbatchEditData,
  StockbatchNewData,
  StockbatchCriteria,
  StocklocationData,
  StocklocationCriteria,
  logicalgateData,
  logicalgateEditData,
  logicalphysicalgateNewData,
  logicalphysicalgateCriteria,
  cellmodelsData,
  cellmodelsEditData,
  SelectedTrailerAssociationdata,
  cellmodelsNewData,
  cellmodelsCriteria,
  operationbyregionData,
  operationbyregionEditData,
  operationbyregionNewData,
  operationbyregionCriteria,
  palletMovementData,
  palletMovementEditData,
  palletDestructionEditData,
  palletMovementNewData,
  palletMovementCriteria,
  palletDestructionCriteria,
  contentstatusData,
  contentstatusEditData,
  contentstatusNewData,
  contentstatusCriteria,
  regioncriteriaData,
  Palletmovementcritaria,
  getlistofRegionsRTWHEntities,
  getlistofPalletDestructionRegion,
  CellAccessCriteria,
  cellaccessid,
  MasterMissionCriteria,
  SelectedWaveCriteria,
  WaveCriteria,
  SiloLoadingFilterCriteria,
  SiloFilterCriteria,
  RackCriteria,
  StatusFilterCriteria,
  RepackingdataCriteria,
  PackinglinedataCriteria,
  PackagingCriteriaa,
  StorageContainerId,
  uncubedid,
  contactid,
  familiesid,
  containerDowngradeid,
  packinglineid,
  trailerReleaseid,
  trailersid,
  logisticUnitCriteria,
  prepration_boxData,
  prepration_boxEditData,
  prepration_boxNewData,
  prepration_boxCriteria,
  StockcontentCriteria,
  preparationorderid,
  repackingid,
  containerData,
  siteid,
  companiesid,
  warehouseid,
  parameterid,
  contentstatusid,
  packagingid,
  regionid,
  cellmodelsid,
  cancelid,
  multicancelid,
  Stockbatchid,
  Stocklocationid,
  siloid,
  siloloadingid,
  physicalgateid,
  logicalgateid,
  rackid,
  storagepalletid,
  palletdestructionid,
  rackstatusid,
  stocksnapid,
  cellmodificationid,
  prepration_boxid,
  AssociatedTrailerdata,
  missioncancelcriteria,
  cancelcriteria,
  LOGIN_MENUS,
  familycriteria,
  gateerrormesg,
};
