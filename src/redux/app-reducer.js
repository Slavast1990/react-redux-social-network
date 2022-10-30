import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";
import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCES = 'INITIALIZED_SUCCES';

let initialState = {
  initialized: false,//инициализация (происходит в app компоненте), false - сначала не проинициализировались, после удачной инициализации false меняется на true
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCES:
      return {
        ...state,
        initialized: true
      }



    default:
      return state;
  }
}


export const initializedSucces = () => ({ type: INITIALIZED_SUCCES })//нужно dispatch этот action
export const initializeApp = () => (dispatch) => {//шлем запрос (dispatch) getAuthUserData внутри него запрос me(кто мы такие?)
  let promise = dispatch(getAuthUserData());//ждем promise then когда он вернется от dispatch getAuthUserData ()
  //dispatch(somethingelse())
  //dispatch(somethingelse())
  Promise.all([promise])//когда выполняться все асинхронные запросы потом получаем результат
    .then(() => {//когда (then) ты получишь результат асинхронная операция закончена(инициализация завершена(удачно неудачно - неважно))
      dispatch(initializedSucces());//потом (после then) мы dispatch(шлем) initializedSucces(проинициализировались)
    })
}

export default appReducer;