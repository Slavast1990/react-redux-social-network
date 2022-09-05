import React from "react";
import classes from './Dialogs.module.css';
import { NavLink } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { SendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import StoreContext from "../../StoreContext";
import store from "../../redux/redux-store";


const DialogsContainer = (props) => {

    return <StoreContext.Consumer> 
        { store => {
            let state = store.getState().dialogsPage;

            let onSendMessageClick = () => {
                store.dispatch(SendMessageCreator());
            }

            let onNewMessageChange = (body) => {
                store.dispatch(updateNewMessageBodyCreator(body));
            }

            return <Dialogs updateNewMessageBody={onNewMessageChange}
                SendMessage={onSendMessageClick}
                dialogsPage={state} />
        }
    }
    </StoreContext.Consumer>

}

export default DialogsContainer;