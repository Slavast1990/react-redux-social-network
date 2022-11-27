import React from "react";
import { reduxForm } from "redux-form";
import { createField, Input, Textarea } from "../../common/FormsControls/FormsControls";
import classes from './ProfileInfo.module.css';
import styles from "./../../common/FormsControls/FormsControls.module.css";


const ProfileDataForm = ({ handleSubmit, profile, error }) => {//создаем формы; handleSubmit придет к нам из внешнего мира
    return <form onSubmit={handleSubmit}>
        {<div><button>Save</button></div> //если мы IsOwner отображается button
        }
        {error && <div className={styles.formSummaryError} /* если в props приходит error то мы показываем styles error */>
            {error}
        </div>}
        <div>
            <b>Full name</b>: {createField("Full name", "fullName", [], Input)//Надпись в инпуте на заднем фоне, свойство в документации, валидация, тип формы
            }
        </div>
        <div>
            <b>looking for a job</b>: {createField(" ", "lookingForAJob", [], Input, { type: "checkbox" })//первая пустая строка так как у нас тип инпута checkbox; помним что createField нужен нам для создания форм а сам createField создается с помощью hoc ProfileDataFormReduxForm созданый reduxForm
            }
        </div>
        <div>
            <b>My professionals skills</b>: {createField("My professionals skills", "lookingForAJobDescription", [], Textarea)}
        </div>
        <div>
            <b>Aboute me</b>: {createField("Aboute me", "aboutMe", [], Textarea)}
        </div>
        <div>
            <b>Contacts</b> : {Object.keys(profile.contacts).map(key => {//Object.keys перебирает все подобьеты profile.contacts и отображает их
                return <div key={key} className={classes.contact}>
                    <b>{key}: {createField(key, "contacts." + key, [], Input)}</b>
                </div>//с помощью map на каждое имя свойства мы хотим отрисовать Contact с приходящими props contactTitle(приходит свойство key) contactValue(мы обращаемся к контактам и через квадратные скобки прочитаем значение свойства по етому ключу)
            })//{key} это свойства(масивы) contacts и напротив каждого свойства createField
            }
        </div>
    </form>
}

const ProfileDataFormReduxForm = reduxForm({ form: 'edite-profile' })(ProfileDataForm);//создаем hoc который оборачивает нашу компоненту(с помощью его создаем формы)

export default ProfileDataFormReduxForm;//импортируем наш hoc