import React, { useState } from 'react';
import classes from './ProfileInfo.module.css';


const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);//useState это хук изначальное стартовое значение которого будет false(наподобии локального state)
    let [status, setStatus] = useState(props.status);//useState это хук изначальное стартовое значение которого будет props.status(наподобии локального state)
   //editMode, setEditMode это деструктуризация в которые будет входить значения с useState
    
   const activateEditMode = () => {
    setEditMode(true);
    }

    const deActivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);//мы сообщаем родителю наверх что у нас статус поменялся
    }

    const onStatusChange = (event) => {
        setStatus( event.currentTarget.value);//передаем значение для статуса
    }

    console.log("render")
    return (
        <div>
            { !editMode &&//если editMode(false) показываем span
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || "--------"}</span>
                </div>//показывает span
            }
            {editMode &&// если editMode(true) показываем input
                <div>
                    <input onChange={onStatusChange} 
                    autoFocus={true} 
                    onBlur={deActivateEditMode} 
                    value={status} />
                </div>//autoFocus - курсив в строке input, onBlur кликаем курсором на пустом месте и у нас сетается измененый статус в state, onChange обработчик событий, value значение текущего статуса пользователя
            }
        </div>
    )
}


export default ProfileStatusWithHooks;