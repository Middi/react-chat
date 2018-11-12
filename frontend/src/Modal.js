import React from 'react'

const Modal = ({username, updateUsername, toggleModal, online}) => (
      <div className="modal-bg">
        <div className="modal">
        <span className="close" onClick={toggleModal}>+</span>
        <h2>Select a Username</h2>
            <input type="text" placeholder="Username" name="username" value={username} onChange={updateUsername} className="form-control"/>
            <button className="btn" onClick={online}>GO</button>
        </div>
      </div>
    );

export default Modal;