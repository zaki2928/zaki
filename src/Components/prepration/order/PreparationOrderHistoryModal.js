import React, { Component } from 'react'
import Modal from "react-modal";
import ModalHeader from "../wave/ModalHeader";

export default class PreparationOrderHistoryModal extends Component {
  render() {
    return (
      <div>
           <Modal
          isOpen={this.props.isOpen}
          //   onAfterOpen={afterOpenModal}
          onRequestClose={this.props.closeModal}
          style={{
            content: {
              fontSize: "70%",
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
              width: "35%",
              height: "auto",
              position: "fixed",
            
            },
            overlay: {
              background: "rgba(0,0,0,0.8)",
            
            },
          }}
        >
          <ModalHeader close={this.props.closeModal} />
          
          <table className='table table-striped table-bordered'>

          
            <thead align='center' color='green'>
              <tr>
                <th> Status </th>
                <th> Date </th>
                <th> User </th>
              </tr>
            </thead>
            {this.props.poHistory.map((data) => (
              <tr>
                <td> {data.statusType===400?"Launched"
                :data.statusType===360?"Selected"
                :data.statusType===350?"Launchable"
                :data.statusType===300?"CubingOk"
                :data.statusType===100?"Created"
              :data.statusType===424?"In_prepration"
              :data.statusType===4000?"Cancelled"
              :data.statusType===500?"Prepared"
              :data.statusType===200?"_CubingError_"
              :""} </td>
                
                <td> { data.mDate.replace("T", " ")
                    .substring(0, data.mDate.lastIndexOf(".")) } </td>
                <td> { data.mUsername } </td>
                  
              </tr>
            ))}
          </table>
        </Modal>
        
      </div>
    )
  }
}

