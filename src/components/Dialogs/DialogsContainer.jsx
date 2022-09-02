import React from "react";
import classes from './Dialogs.module.css';
import { NavLink } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { SendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";


const DialogsContainer = (props) => {

let state = props.store.getState().dialogsPage;

    let dialogsElements = state.dialogs.map(dialogs => <DialogItem name={dialogs.name} id={dialogs.id} />);

    let messagesElements = state.message.map(message => <Message message={message.message} id={message.id} />);

    let newMessageBody = state.newMessageBody;


    let onSendMessageClick = () => {
        props.store.dispatch(SendMessageCreator());
    }

    let onNewMessageChange = (body) => {
        props.store.dispatch(updateNewMessageBodyCreator(body));
    }

    return <Dialogs updateNewMessageBody={onNewMessageChange} 
    SendMessage={onSendMessageClick}
    dialogsPage={state}/>
    
}

export default DialogsContainer;