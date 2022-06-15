import React from "react";

import CloseableTabs from "react-closeable-tabs";
import Shahid from "./Shahid";
import Shahidd from "./Shahidd";
import Shahiddd from "./Shahiddd";

class Testing extends React.Component {
  state = {
    shahid: <Shahiddd />,
    data: [
      {
        tab: "List",
        component: (
          <Shahid />
          //   <div>
          //     <h1>Your list</h1>
          //   </div>
        ),
        id: 0,
      },
    ],
  };

  addItem = (data) => {
    console.log("ddddddddddddddddddddddd", data.type.name);
    // const dd = <Shahiddd />;
    const id = new Date().valueOf();
    // const id = "<" + "Shahidd" + " " + "/" + ">";
    // console.log("id", id);
    this.setState({
      data: this.state.data.concat({
        tab: data.type.name,
        component: data,
        id: id,
        closeable: true,
      }),
      activeIndex: this.state.data.length,
    });
  };
  menuhandler = (menutag) => {
    console.log("menu handler calling", menutag);
    this.addItem(this.state.shahid);
  };

  render() {
    return (
      <div>
        {/* <button onClick={this.menuhandler}>Add item</button> */}
        <CloseableTabs
          tabPanelColor="lightgray"
          data={this.state.data}
          onCloseTab={(id, newIndex) => {
            this.setState({
              data: this.state.data.filter((item) => item.id !== id),
              activeIndex: newIndex,
            });
          }}
          activeIndex={this.state.activeIndex}
        />
      </div>
    );
  }
}

export default Testing;
