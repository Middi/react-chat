import React from "react";
import io from "socket.io-client";
import Modal from './Modal';
import Sidebar from './Sidebar';
import Messages from './Messages';
import Text from './Text';

const socket = io('localhost:5000');

class Chat extends React.Component {
    state = {
        username: '',
        message: '',
        messages: [],
        users: [],
        isModalOpen: true
    };

    addMessage = message => {
        console.log(message, 'message');
        this.setState({ messages: [...this.state.messages, message] });
        console.log(this.state.messages);
    };

    onlineUsers = user => {
        console.log(user, 'user');
        this.setState({ users: [...this.state.users, user] });
        console.log(this.state.users);
    };

    sendMessage = e => {
        e.preventDefault();
        socket.emit('SEND_MESSAGE', {
            author: this.state.username,
            message: this.state.message
        })
        this.setState({ message: '' });

    }

    online = e => {
        e.preventDefault();
        socket.emit('ONLINE', {
            user: this.state.username
        });
        this.toggleModal();
    }

    handleChange = e => {
        // Spread state into new variable
        const NS = { ...this.state };

        NS[e.name] = e.value;
        // Set state with new version of state
        this.setState(NS);
    }

    toggleModal = () => {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    callAPI = () => {
        fetch("http://localhost:5000")
            .then(res => res.json())
            .then(message => {
                this.setState({
                    messages: message
                });
            })
            .catch(err => {
                console.log(err)
            });
    }

    componentDidMount() {
        this.callAPI();
        socket.on('RECEIVE_MESSAGE', (data) => {
            this.addMessage(data);
        });
        socket.on('USER_ONLINE', (data) => {
            this.onlineUsers(data);
        });
    }

    render() {
        return (
            <React.Fragment>
                {this.state.isModalOpen &&
                    <Modal
                        updateUsername={e => this.handleChange(e.target)}
                        username={this.state.username}
                        toggleModal={this.toggleModal}
                        online={this.online}
                    />}

                <div className="wrapper">
                    <Sidebar users={this.state.users} />
                    <main>
                        <Messages messages={this.state.messages} />
                        <Text
                            message={this.state.message}
                            sendMessage={this.sendMessage}
                            handleChange={this.handleChange}
                        />
                    </main>
                </div>

            </React.Fragment>
        );
    }
}

export default Chat;