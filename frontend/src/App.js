import React, { Component } from 'react';
import Chat from "./Chat";
import Modal from './Modal';

class App extends Component {
  render() {
    return (
      <div>
          <Chat/>
          <Modal />
      </div>
    );
  }
}

export default App;