let PRODUCT = 1;
let INVENTORY = 1;
let REPACKING = 1;
let LOGISTIC_UNIT = 1;
let PACKAGING = 1;
let CONTENT_STATUS = 1;
let USERS = 1;
let ROLES = 1;
let LOGICAL_GATE = 1;
let PHYSICAL_GATE = 1;
let MISSION_CANCELLATION = 1;
let MISSION_VALIDATION = 1;
let PREPARATION_ORDER = 1;
let WAVE = 1;
let MISSION_MULTI_CANCELLATION = 1;
let MISSION_MULTI_VALIDATION = 1;
let RACK_PROFILE = 1;
let STATUS_CHANGE = 1;
let CELL_ACCESSIBILITY = 1;
let MASTER_MISSION = 1;
let SITES = 1;
let COMPANIES = 1;
let Mission_Class=1;
let CHANGE_PASSWORD = 1;
let CONTACTS = 1;
let CONTENTS = 1;
let PARAMETERS = 1;
let PALLET = 1;
let WAREHOUSE = 1;
let FILE_INTEGRATION = 1;
let TRAILER_ASSOCIATION = 1;
let TRAILER_RELEASE = 1;
let TRAILER_EXIT = 1;
let PACKING_LINE = 1;
let UNCUBE_POS = 1;
let CONTAINER_CREATION = 1;
let FAMILY_PROFILE = 1;
let SILO = 1;
let SILO_LOADING = 1;
let USERNAME = "";

export const setUserName = (username) => {
  USERNAME = username;
};
export const removeUserName = () => {
  USERNAME = "";
};

export const resetRoleBaseAccess = () => {
  console.log("calling logout global handler");
  PRODUCT = 1;
  INVENTORY = 1;
  Mission_Class =1;
  REPACKING = 1;
  LOGISTIC_UNIT = 1;
  PACKAGING = 1;
  CONTENT_STATUS = 1;
  USERS = 1;
  ROLES = 1;
  LOGICAL_GATE = 1;
  PHYSICAL_GATE = 1;
  MISSION_CANCELLATION = 1;
  MISSION_VALIDATION = 1;
  PREPARATION_ORDER = 1;
  WAVE = 1;
  MISSION_MULTI_CANCELLATION = 1;
  MISSION_MULTI_VALIDATION = 1;
  Mission_Class =1;
  RACK_PROFILE = 1;
  STATUS_CHANGE = 1;
  CELL_ACCESSIBILITY = 1;
  MASTER_MISSION = 1;
  SITES = 1;
  COMPANIES = 1;
  CHANGE_PASSWORD = 1;
  CONTACTS = 1;
  CONTENTS = 1;
  PARAMETERS = 1;
  PALLET = 1;
  WAREHOUSE = 1;
  FILE_INTEGRATION = 1;
  TRAILER_ASSOCIATION = 1;
  TRAILER_RELEASE = 1;
  TRAILER_EXIT = 1;
  PACKING_LINE = 1;
  UNCUBE_POS = 1;
  CONTAINER_CREATION = 1;
  FAMILY_PROFILE = 1;
  SILO = 1;
  SILO_LOADING = 1;
};

export const setUserRoleAccess = (data) => {
  console.log(
    "login setUserRoleAccess handler",
    data.listOfMenuResourceRoleAcess.length
  );
  for (let i = 0; i < data.listOfMenuResourceRoleAcess.length; i++) {
    // for (let j = 0; j < data.listOfMenuResourceRoleAcess[i].listOfMenus.length; j++) {
    if (
      data.listOfMenuResourceRoleAcess[i].reference === "ProductMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log("prod chkkkkkkkkkkk", data.listOfMenuResourceRoleAcess[i]);
      PRODUCT = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    if (
      data.listOfMenuResourceRoleAcess[i].reference === "InventoryPart" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "InventoryPart chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      INVENTORY = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    if (
      data.listOfMenuResourceRoleAcess[i].reference === "RepackingMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "REPACKING chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      REPACKING = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    if (
      data.listOfMenuResourceRoleAcess[i].reference === "LogisticUnitMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "LOGISTIC_UNIT chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      LOGISTIC_UNIT = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    if (
      data.listOfMenuResourceRoleAcess[i].reference === "PackagingMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "PACKAGING chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      PACKAGING = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    if (
      data.listOfMenuResourceRoleAcess[i].reference === "ContentStatusMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "CONTENT_STATUS chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      CONTENT_STATUS = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    if (
      data.listOfMenuResourceRoleAcess[i].reference === "UserAdminFmk" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "USER chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      USERS = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "RoleAdminFmk" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "ROLES chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      ROLES = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "LogicalGateMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "LOGICAL_GATE chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      LOGICAL_GATE = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    if (
      data.listOfMenuResourceRoleAcess[i].reference === "MissionClassMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "Mission_Class chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      Mission_Class = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "GateMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "PHYSICAL_GATE chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      PHYSICAL_GATE = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference ===
        "MissionValidationMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "MISSION_VALIDATION chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      MISSION_VALIDATION = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference ===
        "MissionMultipleValidationMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "MISSION_MULTI_VALIDATION chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      MISSION_MULTI_VALIDATION = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    if (
      data.listOfMenuResourceRoleAcess[i].reference ===
        "MissionMultipleCancelMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "MISSION_MULTI_CANCELLATION chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      MISSION_MULTI_CANCELLATION =
        data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "MissionCancelMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "MISSION_CANCELLATION chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      MISSION_CANCELLATION = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference ===
        "PreparationOrderMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "PREPARATION_ORDER chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      PREPARATION_ORDER = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "WaveMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "WAVE chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      WAVE = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "ProfilCellRackMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "RACK_PROFILE chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      RACK_PROFILE = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference ===
        "ContentStatusChangeMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "STATUS_CHANGE chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      STATUS_CHANGE = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    if (
      data.listOfMenuResourceRoleAcess[i].reference ===
        "RegionCellAccessibility" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "CELL_ACCESSIBILITY chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      CELL_ACCESSIBILITY = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    if (
      data.listOfMenuResourceRoleAcess[i].reference ===
        "MasterMissionDisplayWmsStkAM" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "MASTER_MISSION chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      MASTER_MISSION = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    // from todayyyyy
    if (
      data.listOfMenuResourceRoleAcess[i].reference === "SiteAdminFmk" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "SITES chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      SITES = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "ContactAdminFmk" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "CONTACTS chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      CONTACTS = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "CompanyAdminFmk" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "COMPANIES chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      COMPANIES = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "WarehouseAdminFmk" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "WAREHOUSE chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      WAREHOUSE = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "ParameterAdminFmk" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "PARAMETERS chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      PARAMETERS = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "UserPasswordFmk" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "CHANGE_PASSWORD chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      CHANGE_PASSWORD = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference ===
        "FileIntegrationFmkDoc" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "FILE_INTEGRATION chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      FILE_INTEGRATION = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "PalletMvt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "PALLET chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      PALLET = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "ContentStock" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "CONTENTS chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].referroleAccessence
      );
      CONTENTS = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    // 23-04-2022////

    if (
      data.listOfMenuResourceRoleAcess[i].reference ===
        "TrailerAssociationMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "TRAILER_ASSOCIATION chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      TRAILER_ASSOCIATION = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "TrailerReleaseMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "TRAILER_RELEASE chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      TRAILER_RELEASE = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference ===
        "ShippingContainerClientMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "TRAILER_EXIT chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      TRAILER_EXIT = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "PackingLineMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "PACKING_LINE chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      PACKING_LINE = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    if (
      data.listOfMenuResourceRoleAcess[i].reference === "UncubedPOMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "UNCUBE_POS chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      UNCUBE_POS = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    if (
      data.listOfMenuResourceRoleAcess[i].reference ===
        "ContainerStockCreate" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "CONTAINER_CREATION chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      CONTAINER_CREATION = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    if (
      data.listOfMenuResourceRoleAcess[i].reference === "ProfilfamilyMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "FAMILY_PROFILE chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      FAMILY_PROFILE = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    if (
      data.listOfMenuResourceRoleAcess[i].reference === "SiloMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "SILO chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      SILO = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }
    if (
      data.listOfMenuResourceRoleAcess[i].reference === "SiloLoadingMngt" &&
      data.listOfMenuResourceRoleAcess[i].roleAccess === 2
    ) {
      console.log(
        "SILO_LOADING chkkkkkkkkkkk",
        data.listOfMenuResourceRoleAcess[i].roleAccess
      );
      SILO_LOADING = data.listOfMenuResourceRoleAcess[i].roleAccess;
    }

    // }
  }
  console.log("print poduct value", PRODUCT);
  console.log("print poduct value", ROLES);
  console.log("TRAILER_EXIT value", TRAILER_EXIT);
};

export {
  PRODUCT,
  Mission_Class,
  INVENTORY,
  REPACKING,
  LOGISTIC_UNIT,
  PACKAGING,
  CONTENT_STATUS,
  USERS,
  ROLES,
  LOGICAL_GATE,
  PHYSICAL_GATE,
  MISSION_CANCELLATION,
  MISSION_VALIDATION,
  PREPARATION_ORDER,
  WAVE,
  MISSION_MULTI_CANCELLATION,
  MISSION_MULTI_VALIDATION,
  RACK_PROFILE,
  STATUS_CHANGE,
  CELL_ACCESSIBILITY,
  MASTER_MISSION,
  SITES,
  COMPANIES,
  CHANGE_PASSWORD,
  CONTACTS,
  CONTENTS,
  PARAMETERS,
  PALLET,
  WAREHOUSE,
  FILE_INTEGRATION,
  TRAILER_ASSOCIATION,
  TRAILER_RELEASE,
  TRAILER_EXIT,
  PACKING_LINE,
  UNCUBE_POS,
  CONTAINER_CREATION,
  FAMILY_PROFILE,
  SILO,
  SILO_LOADING,
  USERNAME,
};
