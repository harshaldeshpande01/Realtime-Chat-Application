import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import { Redirect } from "react-router-dom";

import TextContainer from '../TextContainer/TextContainer';
import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

import './Chat.css';

let socket;

const Chat = ({ location }) => {
  const [redirect, setRedirect] = useState(false);
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [pass, setPass] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = '/';

  useEffect(() => {
    const { name, room, pass } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);
    setPass(pass);
    console.log(room);

    socket.emit('join', { name, room, pass}, (error) => {
      if(error) {
        // console.log(error);
        alert(error);
        setRedirect(true);
      }
    });
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    socket.on('message', message => {
      setMessages(messages => [ ...messages, message ]);
    });
    
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }
  if (redirect) {
    return <Redirect to="/dashboard" />
  }
  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} /> 
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage} /> 
      </div>
      <TextContainer users={users}/>
    </div>
  );

}

export default Chat;
