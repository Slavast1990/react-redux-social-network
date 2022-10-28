import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import styles from "./../common/FormsControls/FormsControls.module.css";


const LoginForm = (props) => {
    console.log('RERENDER')
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'Email'} name={"email"}
                    validate={[required]}
                    component={Input} />
            </div>
            <div>
                <Field placeholder={'Password'} name={"password"} type={"password"}
                    validate={[required]}
                    component={Input} />
            </div>
            <div>
                <Field component={Input} name={"rememberMe"} type={"checkbox"} /> remember me 
            </div>
            { props.error && <div className={styles.formSummaryError} /* если в props приходит error то мы показываем styles error */> 
            {props.error} 
            </div> }
            <div>
                <button>login</button>
            </div>
        </form>
    )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)
//reduxForm это hoc который конектить LoginForm со store.Занимается dispathc action

const Login = (props) => {
    const onSubmit = (FormData) => {
        props.login(FormData.email, FormData.password, FormData.rememberMe)//данные из login заходят в FormData и потом с помощью props раскукоживаем их
    }

    if (props.isAuth) {
        return <Redirect to={"/profile"} />//если мы залогинины то возвращаем redirect
    }

    return <div>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </div>
}
const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);//login это санка из auth-reducer