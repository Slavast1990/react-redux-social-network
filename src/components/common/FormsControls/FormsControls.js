import React from "react";
import { Field } from "redux-form";
import styles from "./FormsControls.module.css";

const FormControl = ({ input, meta: {touched, error}, children }) => {//meta: {touched, error} ===  meta.touched && meta.error
    const hasError = touched && error;//meta.error не больше 10 строк

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : " " /* если error покажи styles.error если нет пустую строку*/)}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span> /* если данные тронуты и ошибка(больше 10 символов) то показываем span*/}
        </div>
    )
}


export const Textarea = (props) => { // rest parametrs
    const { input, meta, child, ...restProps } = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const { input, meta, child, ...restProps } = props;
    return (
        <FormControl {...props}><input {...input} {...restProps} /></FormControl>
    )
}

export const createField = (placeholder, name, validators, component, props = {}, text = " ") => (//если пишем тег используем ();props = {}, text = " " - по умолчанию будет пустой обьект а дальше текст
    <div>
        <Field placeholder={placeholder} name={name}
            validate={validators}
            component={component}
            {...props}
        /> {text}
    </div>// отображаем текс рядом с Field - {text}
)

