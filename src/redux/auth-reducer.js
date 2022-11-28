import { authAPI, securityAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'samurai-network/auth/GET_CAPTCHA_URL_SUCCESS';


let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null//стартовое значение капчи нулевое, если приходит значение с actionCreator оно меняется
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_URL_SUCCESS://так как содержимое етих case одинаковое мы их обьеденяем
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}


export const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA, payload:
        { userId, email, login, isAuth }
});

export const getCaptchaURLSucces = (captchaUrl) => ({
    type: GET_CAPTCHA_URL_SUCCESS, payload: { captchaUrl }
});

export const getAuthUserData = () => async (dispatch) => {//с помощью async обьявляем функцию асинхоронной
    let response = await authAPI.me();//await возвращает Promise, response это значение Promise-а котрый вернулся      
    if (response.data.resultCode === 0) {//then уже непишем
        let { id, login, email } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    }
}

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha);
    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData())
    } else {
        if (response.data.resultCode === 10) {//если у нас результат ошибки 10 мы запросим капчу getCaptchaURL
            dispatch(getCaptchaURL())
        }
        let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
        dispatch(stopSubmit("login", { _error: message }));
    }
}

export const getCaptchaURL = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaURL();
    const captchaUrl = response.data.url //возвращается response.data.url(url в документации)
    dispatch(getCaptchaURLSucces(captchaUrl));// полученная капча dispatch в getCaptchaURLSucces

}

export const logout = () => async (dispatch) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    }
}

export default authReducer;