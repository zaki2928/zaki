import React, { Component } from "react";
import { AiOutlineCloseSquare } from "react-icons/ai";
import reacttable from "react-table-v6";

export default class ModalHeader extends Component {
  render() {
    return (
      <div>
        <div
          style={{
            backgroundColor: "blue",
            marginTop: "-20px",
            marginLeft: "-20px",
            marginRight: "-20px",
            height: "33px",
          }}
        >
          <AiOutlineCloseSquare
            size={32}
            color="white"
            style={{
              float: "right",
            }}
            onClick={this.props.close}
          />
        </div>
      </div>
    );
  }
}
