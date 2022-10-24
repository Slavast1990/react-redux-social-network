import React from "react";
import styles from "./FormsControls.module.css";

const FormControl = ({ input, meta, child, ...props }) => {
    const hasError = meta.touched && meta.error;//meta.error не больше 10 строк

    return (
        <div className={styles.formControl + " " + (hasError ? styles.error : " " /* если error покажи styles.error если нет пустую строку*/)}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span> /* если данные тронуты и ошибка(больше 10 символов) то показываем span*/}
        </div>
    )
}


export const Textarea = (props) => { // rest parametrs
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return (
         <FormControl {...props}><input {...input} {...restProps} /></FormControl>
    )
}

