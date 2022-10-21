import React from "react";
import classes from './Dialogs.module.css';
import { NavLink, Redirect } from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { SendMessageCreator, updateNewMessageBodyCreator } from "../../redux/dialogs-reducer";
import { Field, reduxForm } from "redux-form";


const Dialogs = (props) => {

let state = props.dialogsPage;

    let dialogsElements = state.dialogs.map(dialogs => <DialogItem name={dialogs.name} key={dialogs.id} id={dialogs.id} />);

    let messagesElements = state.message.map(message => <Message message={message.message} key={message.id} id={message.id} />);

    let newMessageBody = state.newMessageBody;


    let addNewMessage = (values) => {
        props.SendMessage(values.newMessageBody);
    }

    if (!props.isAuth) return <Redirect to="/Login"/>;

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                <div>{messagesElements}</div>
               
            </div>
            <AddMessageFormReddux onSubmit={addNewMessage} />
        </div>
    )
}

const AddMessageForm = (props) => {
return (
    <form onSubmit={props.handleSubmit}>
    <div>
        <Field component={"textarea"} name={"newMessageBody"} placeholder={"Enter your message"} /> 
        </div>
    <div>
        <button>Send</button>
    </div>
</form>
)
}

const AddMessageFormReddux = reduxForm ({form: 'dialogAddMessageForm'}) (AddMessageForm);

export default Dialogs;