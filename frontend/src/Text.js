import React from 'react'

const Text = ({ message, sendMessage, handleChange }) => (
    <div className="text">
                            <textarea
                                type="text"
                                placeholder="Message"
                                className="form-control"
                                name="message"
                                value={message}
                                onChange={e => handleChange(e.target)}>
                            </textarea>

                            <button onClick={sendMessage} className="btn btn-primary form-control">Send</button>
                        </div>
);

export default Text;