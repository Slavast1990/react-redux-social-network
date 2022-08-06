import React from "react";
import classes from './Dialogs.module.css';
import { NavLink } from "react-router-dom";

const DialogItem = (props) => {
    let path = '/dialogs/' + props.id
    return ( 
        <div className={classes.dialogs + ' ' + classes.active}>
                <NavLink to={path}>{props.name}</NavLink>
            </div>
    )
}

const Message = (props) => {
    return (
        <div className={classes.message}>{props.message}</div>
    )
}

const Dialogs = (props) => {

    let dialogsData = [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Victor'},
        {id: 6, name: 'Valera'},
    ]

    let messageData = [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'},
        {id: 6, message: 'Yo'},
    ]
return (
    <div className={classes.dialogs}>
        <div className={classes.dialogsItems}>
           <DialogItem name={dialogsData[0].name} id={dialogsData[0].id} />
           <DialogItem name={dialogsData[1].name} id={dialogsData[1].id} />
           <DialogItem name={dialogsData[2].name} id={dialogsData[2].id} />
           <DialogItem name={dialogsData[3].name} id={dialogsData[3].id} />
           <DialogItem name={dialogsData[4].name} id={dialogsData[4].id} />
           <DialogItem name={dialogsData[5].name} id={dialogsData[5].id} />
       
        </div>
        <div className={classes.messages}>
            <Message message={messageData[0].message} id={messageData[0].id} />
            <Message message={messageData[1].message} id={messageData[1].id} />
            <Message message={messageData[2].message} id={messageData[2].id} />
            <Message message={messageData[3].message} id={messageData[3].id} />
            <Message message={messageData[4].message} id={messageData[4].id} />
            <Message message={messageData[5].message} id={messageData[5].id} />
        </div>
    </div>
)
}

export default Dialogs;