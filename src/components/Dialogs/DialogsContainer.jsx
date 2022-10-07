import React from "react";
import classes from './Dialogs.module.css';
import { NavLink, Redirect } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { SendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import store from "../../redux/redux-store";
import { connect } from "react-redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";



let mapStateToProps = (state) => {
    return {
        dialogsPage: state.dialogsPage,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body));
        },
        SendMessage: () => {
            dispatch(SendMessageCreator())
        }
    }

}

let AuthRedirectComponent = withAuthRedirect (Dialogs);

    

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps) (AuthRedirectComponent);

export default DialogsContainer;