import React from "react";
import io from "socket.io-client";

const socket = io('localhost:5000');

class Chat extends React.Component{
        state = {
            username: '',
            message: '',
            messages: []
        };

       addMessage = message => {
            console.log(message, 'message');
            this.setState({messages: [...this.state.messages, message]});
            console.log(this.state.messages);
        };

        sendMessage = e => {
            e.preventDefault();
            socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            })
            this.setState({message: ''});

        }

        componentDidMount() {
            socket.on('RECEIVE_MESSAGE', (data) => {
                this.addMessage(data);
            });
        }
        
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                                <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                                <br/>
                                <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;