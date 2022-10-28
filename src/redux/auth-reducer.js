import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false
  // isFetching: false
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      }



    default:
      return state;
  }
}


export const setAuthUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, payload: {id, email, login, isAuth} })
export const getAuthUserData = () => (dispatch) => {//установить авторизованые даные
  authAPI.me()
  .then(Response => {
    if (Response.data.resultCode === 0) {
      let {id, login, email} = Response.data.data;
      dispatch (setAuthUserData( id, email, login, true ));//если мы авторизованы мы шлем ети данные
    }
});
}

export const login = (email, password, rememberMe) => (dispatch) => {
  authAPI.login(email, password, rememberMe)
  .then(Response => {
    if (Response.data.resultCode === 0) {
      dispatch (getAuthUserData())
    } else {
      let message = Response.data.messages.length > 0 ? Response.data.messages[0] : "Some error";//Покажем 1-е значение(0) или Some error(true : false)
      dispatch(stopSubmit("login", {_error: message}));//Если resultCode не 0 тогда мы stopSubmit; login ето имя -> const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm); второе это проблемное свойство _error
//_error: message это сообщение которое приходит из let message
    }
});
}
//Login это санка задача которой логинится. Санка это логика в квадратных скобках которая принимает метод dispatch
//Когда мы залогинились мы dispatch getAuthUserData наши данные

export const logout = () => (dispatch) => {
  console.log()
  authAPI.logout()
  .then(Response => {
    if (Response.data.resultCode === 0) {
      dispatch (setAuthUserData(null, null, null, false))//если мы вылогинились мы занулились
    }
});
}
export default authReducer;