import React, { Component } from 'react'

export default class Modal extends Component {
  render() {
    return (
      <div className="modal-bg">
        <div className="modal">
            <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
        </div>
        
        
      </div>
    )
  }
}
