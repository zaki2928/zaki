import React, { Component } from "react";
import "./css/menu.css";
import CloseableTabs from "react-closeable-tabs";
import Repacking from "./Components/Silo/repacking/Repacking";
// import Homepage from "./Components/Homepage";
import logo from "./Images/saudikayan.PNG";
import { LOGIN_MENUS, remover } from "./store/Store";
// import {Packinglineremover} from './store/Store'
import Header from "./Header";
import Homepage from "./Components/Homepage";
import DowngradeContainer from "./Components/Storage/management/containerDowngrade/DowngradeContainer";
import PackingLinefilter from "./Components/Silo/packing-line/PackingLinefilter";
import PackingLineEdit from "./Components/Silo/packing-line/PackingLineEdit";
import Silo_Edit from "./Components/Silo/silo/Silo_Edit";
import Silo_Filter from "./Components/Silo/silo/Silo_Filter";
import Silo_List from "./Components/Silo/silo/Silo_List";
import Boxreplacement from "./Components/shipping/box-replacement/Boxreplacement";
import Boxreplacementlist from "./Components/shipping/box-replacement/Boxreplacementlist";
import Silo_Loading_Filter from "./Components/Silo/silo-Loading/Silo_Loading_Filter";
import Silo_Loading_List from "./Components/Silo/silo-Loading/Silo_Loading_List";
import InterwarehouseTrailer from "./Components/inter-warehouse/trailer/InterwarehouseTrailer";
import Wave_Filter from "./Components/prepration/wave/Wave_Filter";
import Wave_List from "./Components/prepration/wave/Wave_List";
import Box_Filter from "./Components/prepration/Box/Box_Filter";
import Box_List from "./Components/prepration/Box/Box_List";
import UncubedFilter from "./Components/prepration/uncubedpos/UncubedFilter";
import UncubedList from "./Components/prepration/uncubedpos/UncubedList";

import Storage_Mission_Filter from "./Components/Storage/Mission/display/Storage_Mission_Filter";
import Storage_Mission_Edit from "./Components/Storage/Mission/Storage_Mission_Edit";
import SiloRepackingList from "./Components/Silo/repacking/SiloRepackingList";
import Stockbybatch from "./Components/Storage/management/stockByBatch/Stockbybatch";
import Stockbybatchlistpage from "./Components/Storage/management/stockByBatch/Stockbybatchlistpage";
import Logicalgate from "./Components/configuration/logical-gate/Logicalgate";
import Physicalgate from "./Components/configuration/physical-gate/Physicalgate";
import Logicalgatelist from "./Components/configuration/logical-gate/Logicalgatelist";
import Physicalgatelist from "./Components/configuration/physical-gate/Physicalgatelist";
import TrailerAssociationFilter from "./Components/prepration/trailer-association/TrailerAssociationFilter";
import MissionValidation from "./Components/Storage/Mission/validation/MissionValidation";
import TrailerReleaseFilter from "./Components/shipping/TrailerRelease/TrailerReleaseFilter";
import TrailerReleaseList from "./Components/shipping/TrailerRelease/TrailerReleaseList";
import StockByLocationFilter from "./Components/Storage/management/stockByLocation/StockByLocationFilter";
import StockByLocationList from "./Components/Storage/management/stockByLocation/StockByLocationList";
import TrailersFilter from "./Components/shipping/Trailers/TrailersFilter";
import TrailersList from "./Components/shipping/Trailers/TrailersList";
import ProductFilter from "./Components/configuration/product/products/ProductFilter";
import Palletmovement from "./Components/inter-warehouse/palletMovement/Palletmovement";
import File_Integration from "./Components/administrator/File_Integration";
import Container_Filter from "./Components/inter-warehouse/containersEligibility/Container_Filter";
import OrderFilter from "./Components/prepration/order/OrderFilter";
import Missionmultivalidation from "./Components/Storage/Mission/multiValidation/Missionmultivalidation";
import WhMissionValidation from "./Components/inter-warehouse/Mission/validation/WhMissionValidation";
import StoragePalletFilter from "./Components/Storage/Movement/Pallet/StoragePalletFilter";
import PackagingFilter from "./Components/configuration/packaging/PackagingFilter";
import PalletToDestructionFilter from "./Components/Storage/Movement/Pallet_To_Destruction/PalletToDestructionFilter";
import ContainerCreation from "./Components/Storage/management/containerCreation/ContainerCreation";
import Statuschange from "./Components/Storage/management/StatusChange/Statuschange";
import CubingList from "./Components/prepration/printing/cubingList/CubingList";
import StockTake from "./Components/StockTake/printing/StockTake";
import PalletLabel from "./Components/Storage/printing/PalletLabel";
import SupportId from "./Components/Storage/printing/SupportId";
import ThermalLocation from "./Components/Storage/printing/ThermalLocation";
import LaserLocation from "./Components/Storage/printing/LaserLocation";
import MissionLabel from "./Components/Storage/printing/MissionLabel";
import Collection from "./Components/Storage/printing/Collection";
import LoadingVoucher from "./Components/shipping/printing/LoadingVoucher";
import NoticeDocument from "./Components/shipping/printing/NoticeDocument";
import PackingList from "./Components/shipping/printing/PackingList";
import PickingTicket from "./Components/prepration/printing/pickingTicket/PickingTicket";
import GoodsIn from "./Components/goodsIn/printing/GoodsIn";
import GoodsInline from "./Components/goodsIn/printing/GoodsInline";
import Form from "./Components/shipping/printing/LoadingInstruction/Form";
import RegionFilter from "./Components/configuration/storage/regions/RegionFilter";
import MasterMissionFilter from "./Components/Storage/Mission/display/master_mission/MasterMissionFilter";
import AccessFilter from "./Components/configuration/storage/cell/accessibility/AccessFilter";
import DeletionFilter from "./Components/configuration/storage/cell/deletion/DeletionFilter";
import CreationForm from "./Components/configuration/storage/cell/creation/CreationForm";
import ModificationFilter from "./Components/configuration/storage/cell/modification/ModificationFilter";
import SitesFilter from "./Components/administrator/sites/SitesFilter";
import CompaniesFilter from "./Components/administrator/companies/CompaniesFilter";
import WarehouseFilter from "./Components/administrator/warehouse/WarehouseFilter";
import LogisticUnitFilter from "./Components/configuration/product/logisticunit/LogisticUnitFilter";
import RolesFilter from "./Components/administrator/roles/RolesFilter";
import Userfilter from "./Components/users/Userfilter";
import MissionClassFilter from "./Components/configuration/storage/missionclass/MissionClassFilter";
import ProductDisplay from "./Components/configuration/product/products/ProductDisplay";
import Contactfilter from "./Components/contacts/Contactfilter";
import Contentfilter from "./Components/configuration/Contentstatuses/Contentfilter";
import Familiesfilter from "./Components/configuration/product/families/Familiesfilter";
import Rackmodifilter from "./Components/configuration/storage/cell/rackmodification/Rackmodifilter";
import Storagecontainersfilter from "./Components/Storage/management/storageContainers/Storagecontainersfilter";
import RackFilter from "./Components/configuration/storage/rack_profile/RackFilter";
import CancelFilter from "./Components/Storage/Mission/cancellation/CancelFilter";
import MultiCancelFilter from "./Components/Storage/Mission/multiple_cancellation/MultiCancelFilter";
import RackStatusFilter from "./Components/Storage/management/rackStatusChange/RackStatusFilter";
import StockSnapFilter from "./Components/Storage/management/stock_snapshot/StockSnapFilter";
import ParameterFilter from "./Components/administrator/parameters/ParameterFilter";
import ChangePassword from "./Components/administrator/change_password/ChangePassword";
import Stockcontentfilter from "./Components/Storage/management/contents/Stockcontentfilter";
import Cellmodelsfilter from "./Components/configuration/storage/cell_models/Cellmodelsfilter";
import Operationbyregionfilter from "./Components/configuration/storage/mission/distribution/Operationbyregionfilter";
import { setidhandler } from "../src/store/Store";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      silolist: false,
      passeddata: "",
      packinglinefilter: false,
      packinglinedit: false,
      Repacking: <Repacking />,
      PackingLinefilter: <PackingLinefilter />,
      PackingLineEdit: <PackingLineEdit />,
      SiloRepackingList: <SiloRepackingList />,
      Silo_Edit: <Silo_Edit />,
      Silo_List: <Silo_List />,
      Silo_Filter: <Silo_Filter />,
      Silo_Loading_Filter: <Silo_Loading_Filter />,
      File_Integration: <File_Integration />,
      Wave_Filter: <Wave_Filter />,
      Box_Filter: <Box_Filter />,
      Box_List: <Box_List />,
      UncubedFilter: <UncubedFilter />,
      UncubedList: <UncubedList />,
      Storage_Mission_Filter: <Storage_Mission_Filter />,
      StoragePalletFilter: <StoragePalletFilter />,
      PalletToDestructionFilter: <PalletToDestructionFilter />,
      Storage_Mission_Edit: <Storage_Mission_Edit />,
      Stockbybatch: <Stockbybatch additem={this.addItem} />,
      Stockbybatchlistpage: <Stockbybatchlistpage />,
      Logicalgate: <Logicalgate />,
      Logicalgatelist: <Logicalgatelist />,
      Physicalgate: <Physicalgate />,
      Physicalgatelist: <Physicalgatelist />,
      TrailerAssociation: <TrailerAssociationFilter />,
      MissionValidation: <MissionValidation />,
      TrailerReleaseFilter: <TrailerReleaseFilter />,
      TrailerReleaseList: <TrailerReleaseList />,
      StockByLocationFilter: <StockByLocationFilter />,
      StockByLocationList: <StockByLocationList />,
      TrailersFilter: <TrailersFilter />,
      TrailersList: <TrailersList />,
      ProductFilter: (
        <ProductFilter
          startLoading={this.startLoading}
          stopLoading={this.stopLoading}
          additem={this.addItem}
        />
      ),
      ProductLUDisplay: <ProductDisplay />,
      Palletmovement: <Palletmovement />,
      Container_Filter: <Container_Filter />,
      OrderFilter: <OrderFilter />,
      Missionmultivalidation: <Missionmultivalidation />,
      WhMissionValidation: <WhMissionValidation />,
      InterwarehouseTrailer: <InterwarehouseTrailer />,
      Boxreplacement: <Boxreplacement />,
      Boxreplacementlist: <Boxreplacementlist />,
      PackagingFilter: <PackagingFilter />,
      DowngradeContainer: <DowngradeContainer />,
      ContainerCreation: <ContainerCreation />,
      Statuschange: <Statuschange />,
      CubingList: <CubingList />,
      StockTake: <StockTake />,
      LoadingVoucher: <LoadingVoucher />,
      PackingList: <PackingList />,
      NoticeDocument: <NoticeDocument />,
      PalletLabel: <PalletLabel />,
      SupportId: <SupportId />,
      ThermalLocation: <ThermalLocation />,
      LaserLocation: <LaserLocation />,
      MissionLabel: <MissionLabel />,
      Collection: <Collection />,
      PickingTicket: <PickingTicket />,
      GoodsIn: <GoodsIn />,
      GoodsInline: <GoodsInline />,
      MasterMissionFilter: <MasterMissionFilter />,
      Form: <Form />,
      
      RegionFilter: <RegionFilter />,
      AccessFilter: <AccessFilter />,
      ModificationFilter: <ModificationFilter />,
      DeletionFilter: <DeletionFilter />,
      CreationForm: <CreationForm />,
      SitesFilter: <SitesFilter />,
      CompaniesFilter: <CompaniesFilter />,
      WarehouseFilter: <WarehouseFilter />,
      RolesFilter: <RolesFilter />,
      LogisticUnitFilter: <LogisticUnitFilter />,
      Userfilter: <Userfilter />,
    MissionClassFilter:<MissionClassFilter/>,
      Contactfilter: <Contactfilter />,
      Contentfilter: <Contentfilter />,
      Familiesfilter: <Familiesfilter />,
      Rackmodifilter: <Rackmodifilter />,
      Storagecontainersfilter: <Storagecontainersfilter />,
      RackFilter: <RackFilter />,
      CancelFilter: <CancelFilter />,
      MultiCancelFilter: <MultiCancelFilter />,
      RackStatusFilter: <RackStatusFilter />,
      StockSnapFilter: <StockSnapFilter additem={this.addItem} />,
      ParameterFilter: <ParameterFilter />,
      ChangePassword: <ChangePassword />,
      Stockcontentfilter: <Stockcontentfilter />,
      Cellmodelsfilter: <Cellmodelsfilter />,
      Operationbyregionfilter: <Operationbyregionfilter />,

      data: [
        {
          tab: "Home",
          component: <Homepage />,
          id: 0,
        },
      ],
      test: "not chnage",
    };
  }

  testing = () => {
    console.log("testing");
    this.setState({
      hide: true,
    });
  };

  startLoading = () => {
    this.setState({
      loading: true,
    });
  };
  stopLoading = () => {
    this.setState({
      loading: false,
    });
  };

  testLogin = () => {
    console.log("testing hander  clling", LOGIN_MENUS);
  };

  addItem = (Menutag, passeddata) => {
    console.log("Menutag", Menutag);

    if (Menutag === "Packing lines") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Packing lines",
            component: this.state.PackingLinefilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
        return;
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    }

    if (Menutag === "Goods In Line") {
      console.log("data value", this.state.data);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Goods In Line",
            component: this.state.GoodsInline,
            id: "Goods In Line",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    }

    if (Menutag === "Loading Instruction") {
      console.log("data value", this.state.data);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Loading Instruction",
            component: this.state.Form,
            id: "Loading Instruction",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Repacking") {
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Repacking",
            component: this.state.Repacking,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Uncubed POs") {
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Uncubed POs",
            component: this.state.UncubedFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    }
    // else if (Menutag === "Packing Line") {
    //   console.log("data value", this.state.data);
    //   var index = this.state.data.findIndex((data) => data.tab === Menutag);
    //   if (index === -1) {
    //     console.log(" active");
    //     this.setState({
    //       data: this.state.data.concat({
    //         tab: "Packing Line",
    //         component: this.state.PackingLinefilter,
    //         id: "Packing Line",
    //         closeable: true,
    //       }),
    //       activeIndex: this.state.data.length,
    //     });
    //   } else {
    //     console.log("already active");
    //     this.setState({
    //       activeIndex: index,
    //     });
    //   }
    // }

    // else if (Menutag === "Packing lines") {
    //   console.log("data value", this.state.data);
    //   const id = new Date().valueOf();
    //   setidhandler(id, Menutag);
    //   var index = this.state.data.findIndex((data) => data.tab === Menutag);
    //   if (index === -1) {
    //     console.log(" active");
    //     this.setState({
    //       data: this.state.data.concat({
    //         tab: "Packing lines",
    //         component: this.state.PackingLinefilter,
    //         id: id,
    //         closeable: true,
    //       }),
    //       activeIndex: this.state.data.length,
    //     });
    //   } else {
    //     console.log("already active");
    //     this.setState({
    //       activeIndex: index,
    //     });
    //   }
    // }

    //......................................................
    else if (Menutag === "Stock by batch") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Stock by batch",
            component: this.state.Stockbybatch,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Silo") {
      console.log("Silo Filter", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Silo",
            component: this.state.Silo_Filter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Silo loading") {
      console.log("Silo Loading Filter", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Silo loading",
            component: this.state.Silo_Loading_Filter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "File integration") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "File integration",
            component: this.state.File_Integration,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Waves") {
      console.log("Wave Filter", this.state.data);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Waves",
            component: this.state.Wave_Filter,
            id: "Wave",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Boxes") {
      console.log("Box", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Boxes",
            component: this.state.Box_Filter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    }
    //   else if (Menutag === "Box") {
    //     console.log("data value", this.state.data);
    //     const id=new  Date().valueOf();
    //     setidhandler(id,Menutag);
    //     var index = this.state.data.findIndex((data) => data.tab === Menutag);
    //     if (index === -1) {
    //       console.log(" active");
    //       this.setState({
    //         data: this.state.data.concat({
    //           tab: "Box",
    //           component: this.state.Box_Filter,
    //           id: "Box",
    //           closeable: true,
    //         }),
    //         activeIndex: this.state.data.length,
    //       });
    //     } else {
    //       console.log("already active");
    //       this.setState({
    //         activeIndex: index,
    //       });
    //     }
    // }
    else if (Menutag === "Statuses change") {
      console.log("Statuschange", this.state.data);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Statuses change",
            component: this.state.Statuschange,
            id: "Statuses change",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Inter Warehouse Trailer") {
      console.log("InterwarehouseTrailer", this.state.data);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Inter Warehouse Trailer",
            component: this.state.InterwarehouseTrailer,
            id: "Inter Warehouse Trailer",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Boxes replacement") {
      console.log("Boxreplacement", this.state.data);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Boxes replacement",
            component: this.state.Boxreplacement,
            id: "Boxes replacement",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Logical gates") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Logical gates",
            component: this.state.Logicalgate,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Physical gates") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Physical gates",
            component: this.state.Physicalgate,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Validation") {
      //mujtaba Displaystockbylocation
      console.log("data value", this.state.data);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Validation",
            component: this.state.MissionValidation,
            id: "Validation",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Trailers association") {
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        this.setState({
          data: this.state.data.concat({
            tab: "Trailers association",
            component: this.state.TrailerAssociation,
            id: "Trailers association",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    }

    //ibrahim added
    // else if (Menutag === "Trailer Release") {
    //   console.log("data value", this.state.data);
    //   var index = this.state.data.findIndex((data) => data.tab === Menutag);
    //   if (index === -1) {
    //     console.log(" active");
    //     this.setState({
    //       data: this.state.data.concat({
    //         tab: "Trailer Release",
    //         component: this.state.TrailerReleaseFilter,
    //         id: "Trailer Release",
    //         closeable: true,
    //       }),
    //       activeIndex: this.state.data.length,
    //     });
    //   } else {
    //     console.log("already active");
    //     this.setState({
    //       activeIndex: index,
    //     });
    //   }
    // }
    else if (Menutag === "Trailers release") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Trailers release",
            component: this.state.TrailerReleaseFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Products") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Products",
            component: this.state.ProductFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
        
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    }else if (Menutag === "Classes") {
        console.log("data value", this.state.data);
        const id = new Date().valueOf();
        setidhandler(id, Menutag);
        var index = this.state.data.findIndex((data) => data.tab === Menutag);
        if (index === -1) {
          console.log(" active");
          this.setState({
            data: this.state.data.concat({
              tab: "Classes",
              component: this.state.MissionClassFilter,
              id: id,
              closeable: true,
            }),
            activeIndex: this.state.data.length,
          });
          
        } else {
          console.log("already active");
          this.setState({
            activeIndex: index,
          });
        }
    }
    // else if (Menutag === "Trailers Filter") {
    //   console.log("data value", this.state.data);
    //   var index = this.state.data.findIndex((data) => data.tab === Menutag);
    //   if (index === -1) {
    //     console.log(" active");
    //     this.setState({
    //       data: this.state.data.concat({
    //         tab: "Trailers",
    //         component: this.state.TrailersFilter,
    //         id: "Trailers Filter",
    //         closeable: true,
    //       }),
    //       activeIndex: this.state.data.length,
    //     });
    //   } else {
    //     console.log("already active");
    //     this.setState({
    //       activeIndex: index,
    //     });
    //   }
    // }
    else if (Menutag === "Trailers") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Trailers",
            component: this.state.TrailersFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Stock by location") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Stock by location",
            component: this.state.StockByLocationFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Master missions") {
      console.log("data value", this.state.data);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Master missions",
            component: this.state.MasterMissionFilter,
            id: "Master missions",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Accessibility") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Accessibility",
            component: this.state.AccessFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Cells Modification") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Cells Modification",
            component: this.state.ModificationFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Cells Creation") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Cells Creation",
            component: this.state.CreationForm,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Cells Deletion") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Cells Deletion",
            component: this.state.DeletionFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Pallet Movement") {
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        this.setState({
          data: this.state.data.concat({
            tab: "Pallet Movement",
            component: this.state.Palletmovement,
            id: "Pallet Movement",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Storage Mission") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Storage Mission",
            component: this.state.Storage_Mission_Filter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Pallets") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Pallets",
            component: this.state.StoragePalletFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Pallets to destruction") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Pallet To Destruction",
            component: this.state.PalletToDestructionFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Picking Ticket") {
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        this.setState({
          data: this.state.data.concat({
            tab: "Picking Ticket",
            component: this.state.PickingTicket,
            id: "Picking Ticket",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Goods In") {
      console.log("GoodsIn", this.state.data);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Goods In",
            component: this.state.GoodsIn,
            id: "Goods In",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Cubing List Printing") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Cubing List Printing",
            component: this.state.CubingList,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Stock Take Printing") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Stock Take Printing",
            component: this.state.StockTake,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Loading voucher") {
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        this.setState({
          data: this.state.data.concat({
            tab: "Loading voucher",
            component: this.state.LoadingVoucher,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Packing List Printing") {
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        this.setState({
          data: this.state.data.concat({
            tab: "Packing List Printing",
            component: this.state.PackingList,
            id: "Packing List Printing",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Notice Document Printing") {
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        this.setState({
          data: this.state.data.concat({
            tab: "Notice Document Printing",
            component: this.state.NoticeDocument,
            id: "Notice Document Printing",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Pallet label") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Pallet label",
            component: this.state.PalletLabel,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Collection Printing") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Collection Printing",
            component: this.state.Collection,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Mission Label Printing") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Mission Label Printing",
            component: this.state.MissionLabel,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Laser Location Label Printing") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Laser Location Label Printing",
            component: this.state.LaserLocation,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Thermal Location Label Printing") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Thermal Location Label Printing",
            component: this.state.ThermalLocation,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Support ID") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Support ID",
            component: this.state.SupportId,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Container Eligibility") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Container Eligibility",
            component: this.state.Container_Filter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Orders") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Orders",
            component: this.state.OrderFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Packagings") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Packagings",
            component: this.state.PackagingFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Regions") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Regions",
            component: this.state.RegionFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Cell models") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Cell models",
            component: this.state.Cellmodelsfilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Operation by region") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Operation by region",
            component: this.state.Operationbyregionfilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Sites") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Sites",
            component: this.state.SitesFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Companies") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Companies",
            component: this.state.CompaniesFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Warehouses") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Warehouses",
            component: this.state.WarehouseFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Logistic units") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Logistic units",
            component: this.state.LogisticUnitFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Roles") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Roles",
            component: this.state.RolesFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Multiple Validation") {
      console.log("data value", this.state.data);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Multiple Validation",
            component: this.state.Missionmultivalidation,
            id: "Multiple Validation",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "WH Mission Validation") {
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        this.setState({
          data: this.state.data.concat({
            tab: "WH Mission Validation",
            component: this.state.WhMissionValidation,
            id: "WH Mission Validation",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Downgrade Container") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Downgrade Container",
            component: this.state.DowngradeContainer,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    }
    // else if (Menutag === "Downgrade Container") {
    //   var index = this.state.data.findIndex((data) => data.tab === Menutag);
    //   if (index === -1) {
    //     this.setState({
    //       data: this.state.data.concat({
    //         tab: "Downgrade Container",
    //         component: this.state.DowngradeContainer,
    //         id: "Downgrade Container",
    //         closeable: true,
    //       }),
    //       activeIndex: this.state.data.length,
    //     });
    //   } else {
    //     console.log("already active");
    //     this.setState({
    //       activeIndex: index,
    //     });
    //   }
    // }
    else if (Menutag === "Containers creation") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Containers creation",
            component: this.state.ContainerCreation,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Users") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Users",
            component: this.state.Userfilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "ProductLUDisplay") {
      console.log("data value", this.state.data);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          // passeddata: passeddata,
          data: this.state.data.concat({
            tab: "Logistic Unit",
            component: this.state.ProductLUDisplay,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Contacts") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Contacts",
            component: this.state.Contactfilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Content statuses") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Content statuses",
            component: this.state.Contentfilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Families") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Families",
            component: this.state.Familiesfilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Rack cells") {
      console.log("data value", this.state.data);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Rack cells",
            component: this.state.Rackmodifilter,
            id: "Rack cells",
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Containers") {
      console.log("data value", this.state.data);
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Containers",
            component: this.state.Storagecontainersfilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Rack Profiles") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Rack Profiles",
            component: this.state.RackFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Cancellation") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Cancellation",
            component: this.state.CancelFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Multiple Cancellation") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Multiple Cancellation",
            component: this.state.MultiCancelFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Rack Status Change") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Rack Status Change",
            component: this.state.RackStatusFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Stock snapshot") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Stock snapshot",
            component: this.state.StockSnapFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Parameters") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Parameters",
            component: this.state.ParameterFilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Change Password") {
      console.log("data value", this.state.data);
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active");
        this.setState({
          data: this.state.data.concat({
            tab: "Change Password",
            component: this.state.ChangePassword,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else if (Menutag === "Contents") {
      const id = new Date().valueOf();
      setidhandler(id, Menutag);
      var index = this.state.data.findIndex((data) => data.tab === Menutag);
      if (index === -1) {
        console.log(" active", Menutag);
        this.setState({
          data: this.state.data.concat({
            tab: "Contents",
            component: this.state.Stockcontentfilter,
            id: id,
            closeable: true,
          }),
          activeIndex: this.state.data.length,
        });
      } else {
        console.log("already active");
        this.setState({
          activeIndex: index,
        });
      }
    } else {
      console.log("invalid inouts");
    }
  };

  logouthandler = () => {
    console.log("header logout handler calling");
    this.props.logouthandler();
  };

  componentWillMount = () => {
    console.log("calling comp home js", LOGIN_MENUS);
  };
  render() {
    return (
      <React.Fragment>
        <div style={{ float: "left" }}>
          {/* <button onClick={this.testLogin}>testinggggggg</button> */}
          <img src={logo} alt="logo" className="mdHome" />
          <nav>
            <ul>
              {/* {LOGIN_MENUS.menuList.length!==0?
            LOGIN_MENUS.menuList.map((menu)=> */}
              {LOGIN_MENUS.listOfMenuHeirarchyBeans.length !== 0
                ? LOGIN_MENUS.listOfMenuHeirarchyBeans.map((menu) =>
                    menu.menuType === 0 ? (
                      <li className="dropdown">
                        {" "}
                        <a onClick={() => this.addItem(menu.defaultMsg)}>
                          {menu.defaultMsg} <span>&rsaquo;</span>
                        </a>
                        {menu.listOfChildMenuHeirarchyBeans.length !== 0 ? (
                          <ul>
                            {menu.listOfChildMenuHeirarchyBeans.map(
                              (childmenus) => (
                                <li className="dropdown">
                                  <a
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                      this.addItem(childmenus.defaultMsg)
                                    }
                                  >
                                    {childmenus.defaultMsg}
                                    {childmenus.listOfChildMenuHeirarchyBeans
                                      .length !== 0 ? (
                                      <span>&rsaquo;</span>
                                    ) : (
                                      ""
                                    )}
                                  </a>
                                  {childmenus.listOfChildMenuHeirarchyBeans
                                    .length !== 0 ? (
                                    <ul className="nesteddropdown">
                                      {childmenus.listOfChildMenuHeirarchyBeans.map(
                                        (nested) => (
                                          <li className="dropdown">
                                            <a
                                              onClick={() =>
                                                this.addItem(nested.defaultMsg)
                                              }
                                            >
                                              {nested.defaultMsg}
                                              {nested
                                                .listOfChildMenuHeirarchyBeans
                                                .length !== 0 ? (
                                                <span>&rsaquo;</span>
                                              ) : (
                                                ""
                                              )}
                                            </a>
                                            {nested
                                              .listOfChildMenuHeirarchyBeans
                                              .length !== 0 ? (
                                              <ul>
                                                {nested.listOfChildMenuHeirarchyBeans.map(
                                                  (nestedmenu2) => (
                                                    <li className="dropdown">
                                                      <a
                                                        onClick={() =>
                                                          this.addItem(
                                                            nestedmenu2.defaultMsg
                                                          )
                                                        }
                                                      >
                                                        {nestedmenu2.defaultMsg}
                                                        {nestedmenu2
                                                          .listOfChildMenuHeirarchyBeans
                                                          .length !== 0 ? (
                                                          <span>&rsaquo;</span>
                                                        ) : (
                                                          ""
                                                        )}
                                                      </a>
                                                      {nestedmenu2
                                                        .listOfChildMenuHeirarchyBeans
                                                        .length !== 0 ? (
                                                        <ul>
                                                          {nestedmenu2.listOfChildMenuHeirarchyBeans.map(
                                                            (data) => (
                                                              <li>
                                                                <a>
                                                                  {
                                                                    data.defaultMsg
                                                                  }
                                                                </a>
                                                              </li>
                                                            )
                                                          )}
                                                        </ul>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </li>
                                                  )
                                                )}
                                              </ul>
                                            ) : (
                                              ""
                                            )}
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  ) : (
                                    ""
                                  )}
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          ""
                        )}
                      </li>
                    ) : (
                      ""
                    )
                  )
                : ""}
            </ul>
            {/* { menu.listOfChildMenuHeirarchyBeans.length !== 0 ? menu.listOfChildMenuHeirarchyBeans.map((childMenu)=>
           <ul><li><a>{childMenu.defaultMsg}</a></li></ul>
           ):'' } */}
            {/* <li className="dropdown">
                <a>
                  Administration<span>&rsaquo;</span>
                </a>

                <ul>
                  <li>
                    <a onClick={() => this.addItem("Contacts")}>Contacts</a>
                  </li>
                  <li>
                    <a onClick={() => this.addItem("Sites")}>Sites</a>
                  </li>
                  <li>
                    <a onClick={() => this.addItem("Companies")}>Companies</a>
                  </li>
                  <li>
                    <a onClick={() => this.addItem("Warehouses")}>Warehouses</a>
                  </li>
                  <li>
                    <a onClick={() => this.addItem("Roles")}>Roles</a>
                  </li>
                  <li>
                    <a onClick={() => this.addItem("Users")}>Users</a>
                  </li>
                  <li>
                    <a onClick={() => this.addItem("Parameters")}>Parameters</a>
                  </li>
                  <li>
                    <a onClick={() => this.addItem("Change Password")}>
                      Change Password
                    </a>
                  </li>
                  <li>
                    <a onClick={() => this.addItem("File Integration")}>
                      File Integration
                    </a>
                  </li>

                
                </ul>
              </li>

              <li className="dropdown">
                <a>
                  Configuration<span>&rsaquo;</span>
                </a>
                <ul>
                  <li className="dropdown_two">
                    <a onClick={() => this.addItem("Content Statuses")}>
                      Content Statuses
                    </a>
                  </li>
                  <li className="dropdown">
                    <a>
                      Product<span>&rsaquo;</span>
                    </a>
                    <ul>
                      <li>
                        <a onClick={() => this.addItem("Families")}>Families</a>
                      </li>
                      <li>
                        <a onClick={() => this.addItem("Product")}>Products</a>
                      </li>
                      <li>
                        <a onClick={() => this.addItem("Logistic Units")}>
                          Logistic Units
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown_two">
                    <a onClick={() => this.addItem("Logical Gate")}>
                      Logical Gate
                    </a>
                  </li>
                  <li className="dropdown_two">
                    <a onClick={() => this.addItem("Physical Gate")}>
                      Physical Gate
                    </a>
                  </li>
                  <li className="dropdown_two">
                    <a onClick={() => this.addItem("Packaging")}>Packaging</a>
                  </li>
                  <li className="dropdown">
                    <a>
                      Storage<span>&rsaquo;</span>
                    </a>
                    <ul>
                      <li className="dropdown">
                        <a>Mission<span>&rsaquo;</span></a>
                        <ul>
                        <li className="dropdown">
                          <a>Distribution<span>&rsaquo;</span></a>
                          <ul>
                            <li>
                              <a onClick={() => this.addItem("Operation by region")}>Operation by region</a>
                            </li>
                          </ul>
                        </li>
                        </ul>
                      </li>
                      <li>
                        <a onClick={() => this.addItem("Regions")}>Regions</a>
                      </li>
                      <li>
                        <a onClick={() => this.addItem("Cell models")}>Cell models</a>
                      </li>
                      <li className="dropdown">
                        <a>
                          Cell<span>&rsaquo;</span>
                        </a>
                        <ul>
                          <li>
                            <a
                              onClick={() =>
                                this.addItem("Cells Accessibility")
                              }
                            >
                              Accessibility
                            </a>
                          </li>

                          <li>
                            <a onClick={() => this.addItem("Cells Creation")}>
                              Creation
                            </a>
                          </li>
                          <li>
                            <a
                              onClick={() => this.addItem("Cells Modification")}
                            >
                              Modification
                            </a>
                          </li>
                          <li>
                            <a onClick={() => this.addItem("Rack cells")}>
                              Racks Modification
                            </a>
                          </li>
                          <li>
                            <a onClick={() => this.addItem("Cells Deletion")}>
                              Deletion
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <a onClick={() => this.addItem("Cell Rack Profiles")}>
                          Rack Profiles
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <a>
                  Storage<span>&rsaquo;</span>
                </a>
                <ul>
                  <li className="dropdown">
                    <a>
                      Mission<span>&rsaquo;</span>
                    </a>
                    <ul>
                      <li className="dropdown">
                        <a>
                          Display<span>&rsaquo;</span>
                        </a>
                        <ul>
                          <li>
                            <a onClick={() => this.addItem("Storage Mission")}>
                              All
                            </a>
                            <a onClick={() => this.addItem("Master Missions")}>
                              Master Missions
                            </a>
                          </li>
                        </ul>

                        <a onClick={() => this.addItem("Mission Validation")}>
                          Validation
                        </a>
                        <a
                          onClick={() =>
                            this.addItem("Mission Multi Validation")
                          }
                        >
                          Multiple Validation
                        </a>
                        <a onClick={() => this.addItem("Mission Cancelling")}>
                          Cancellation
                        </a>
                        <a
                          onClick={() =>
                            this.addItem("Multiple Mission Cancelling")
                          }
                        >
                          MultipleCancellation
                        </a>
                        <ul></ul>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown_two">
                    <a>
                      Movement<span>&rsaquo;</span>
                    </a>
                    <ul className="">
                      <li>
                        <a onClick={() => this.addItem("Storage Pallet")}>
                          Pallet
                        </a>
                      </li>
                      <li style={{ marginTop: "5px", marginBottom: "5px" }}>
                        <a
                          onClick={() => this.addItem("Pallet To Destruction")}
                        >
                          PalletToDestruction
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown drp">
                    <a>
                      Management<span>&rsaquo;</span>
                    </a>
                    <ul>
                      <li>
                        <a onClick={() => this.addItem("Stock contents")}>
                          Contents
                        </a>
                      </li>
                      <li>
                        <a onClick={() => this.addItem("Storage containers")}>
                          Containers
                        </a>
                      </li>
                      <li>
                        <a onClick={() => this.addItem("Stock By Batch")}>
                          Stock By Batch
                        </a>
                      </li>
                      <li>
                        <a onClick={() => this.addItem("Stock By Location")}>
                          Stock By Location
                        </a>
                      </li>

                      <li>
                        <a onClick={() => this.addItem("Downgrade Container")}>
                          ContainerDowngrade
                        </a>
                      </li>

                      <li>
                        <a onClick={() => this.addItem("Container Creation")}>
                          Container Creation
                        </a>
                      </li>

                      <li>
                        <a onClick={() => this.addItem("Status Change")}>
                          StatusChange
                        </a>
                      </li>
                      <li>
                        <a onClick={() => this.addItem("Rack Status Change")}>
                          Rack Status
                        </a>
                      </li>
                      <li>
                        <a onClick={() => this.addItem("Stock Snapshot")}>
                          Stock Snapshot
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="dropdown drp">
                    <a>
                      Printing<span>&rsaquo;</span>
                    </a>
                    <ul>
                      <li>
                        <a
                          onClick={() => this.addItem("Pallet Label Printing")}
                        >
                          Pallet Label
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => this.addItem("Support Label Printing")}
                        >
                          Support Id
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            this.addItem("Thermal Location Label Printing")
                          }
                        >
                          Thermal Location
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            this.addItem("Laser Location Label Printing")
                          }
                        >
                          Laser Location
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => this.addItem("Mission Label Printing")}
                        >
                          Mission Label
                        </a>
                      </li>
                      <li>
                        <a onClick={() => this.addItem("Collection Printing")}>
                          Collection
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <a>
                  Inter-Warehouse<span>&rsaquo;</span>
                </a>
                <ul>
                  <li className="dropdown_two">
                    <a>
                      Mission<span>&rsaquo;</span>
                    </a>
                    <ul>
                      <li>
                        <a
                          onClick={() => this.addItem("WH Mission Validation")}
                        >
                          Validation
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a onClick={() => this.addItem("Container Eligibility")}>
                      Containers eligiblity
                    </a>
                    <a onClick={() => this.addItem("Pallet Movement")}>
                      Pallet Movement
                    </a>
                    <a onClick={() => this.addItem("Inter Warehouse Trailer")}>
                      Trailer
                    </a>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <a>
                  Silo<span>&rsaquo;</span>
                </a>
                <ul>
                  <li className="dropdown_two">
                    <a onClick={() => this.addItem("Repacking")}>Repacking</a>
                  </li>
                  <li>
                    <a onClick={() => this.addItem("Packing Line")}>
                      Packing Line
                    </a>
                  </li>

                  <li className="dropdown drp">
                    <a onClick={() => this.addItem("Silo")}>Silo</a>
                  </li>
                  <li className="dropdown drp2">
                    <a onClick={() => this.addItem("Silo Loading")}>
                      Silo Loading
                    </a>

                    <ul></ul>
                  </li>
                  <li></li>
                </ul>
              </li>

              <li className="dropdown">
                <a>
                  GoodsIn<span>&rsaquo;</span>
                </a>
                <ul>
                  <li className="dropdown_two">
                    <a>
                      Printing<span>&rsaquo;</span>
                    </a>
                    <ul>
                      <li>
                        <a onClick={() => this.addItem("Goods In")}>
                          GoodsInFolder
                        </a>
                      </li>
                      <li>
                        <a onClick={() => this.addItem("Goods In Line")}>
                          Goods In Line
                        </a>
                      </li>
                      <li></li>
                    </ul>
                  </li>
                  <li></li>
                </ul>
              </li>

              <li className="dropdown">
                <a>
                  Preparation<span>&rsaquo;</span>
                </a>
                <ul>
                  <li>
                    <a onClick={() => this.addItem("Preparation Orders")}>
                      Order
                    </a>
                  </li>
                  <li className="dropdown_two">
                    <a onClick={() => this.addItem("Wave")}>Wave</a>
                    <ul></ul>
                  </li>
                  <li>
                  <a onClick={() => this.addItem("Box")}>Box</a>
                    <ul></ul>
                   </li>
                   <li>
                    <a onClick={() => this.addItem("UncubedPOS")}>UncubedPOS</a>
                    <ul></ul>
                    </li>
                  <li>
                    <a onClick={() => this.addItem("Trailer Association")}>
                      Trailer Association
                    </a>
                  </li>
                  <li className="dropdown">
                    <a>
                      Printing<span>&rsaquo;</span>
                    </a>
                    <ul>
                      <li>
                        <a onClick={() => this.addItem("Cubing List Printing")}>
                          Cubing List
                        </a>
                      </li>
                      <li>
                        <a onClick={() => this.addItem("Picking Ticket")}>
                          Picking Ticket
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <a>
                  Shipping<span>&rsaquo;</span>
                </a>
                <ul>
                  <li className="dropdown_two">
                    <a onClick={() => this.addItem("Trailer Release")}>
                      Trailer Release
                    </a>
                  </li>
                  <li className="dropdown_two">
                    <a onClick={() => this.addItem("Trailers Filter")}>
                      Trailers
                    </a>
                  </li>
                  <li className="dropdown_two">
                    <a onClick={() => this.addItem("Box Replacement")}>
                      BoxReplacement
                    </a>
                  </li>
                  <li className="dropdown">
                    <a>
                      Printing<span>&rsaquo;</span>
                    </a>
                    <ul>
                      <li>
                        <a onClick={() => this.addItem("Loading Instruction")}>
                          Loading Instruction
                        </a>
                      </li>

                      <li>
                        <a
                          onClick={() =>
                            this.addItem("Loading Voucher Printing")
                          }
                        >
                          Loading Voucher
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() =>
                            this.addItem("Notice Document Printing")
                          }
                        >
                          Notice Document
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => this.addItem("Packing List Printing")}
                        >
                          Packing List
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <a>
                  Stock Take<span>&rsaquo;</span>
                </a>
                <ul>
                  <li>
                    <a>Stock Take</a>
                  </li>
                  <li className="dropdown_two">
                    <a>Recommendation</a>
                    <ul></ul>
                  </li>

                  <li className="dropdown">
                    <a>
                      Printing<span>&rsaquo;</span>
                    </a>
                    <ul>
                      <li>
                        <a onClick={() => this.addItem("Stock Take Printing")}>
                          Stock Take
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li> */}
            {/* </ul> */}
          </nav>
        </div>

        <Header logouthandler={this.logouthandler} />

        <div
          style={{
            // backgroundColor: "yellow",
            marginLeft: "135px",
            marginTop: "5px",
          }}
        >
          <CloseableTabs
            style={{ float: "right" }}
            tabPanelColor="gainsboro"
            tabpanelclass="tab"
            data={this.state.data}
            onCloseTab={(id, newIndex) => {
              remover(id);
              this.setState({
                data: this.state.data.filter((item) => item.id !== id),
                activeIndex: newIndex,
              });
            }}
            activeIndex={this.state.activeIndex}
          />
        </div>
        {/* </div> */}
      </React.Fragment>
    );
  }
}

export default Home;
