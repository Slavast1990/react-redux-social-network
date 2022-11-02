import { stopSubmit } from "redux-form";
import { authAPI } from "../api/api";
import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,//если в initializedSucces придет getAuthUserData(данные) тогда true
      }



    default:
      return state;
  }
}


export const initializedSucces = () => ({ type: INITIALIZED_SUCCESS })
export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());//возвращается промис then (promise)
  // dispatch (somethingelse());
  // dispatch (somethingelse());
  Promise.all ([promise])
  .then(() => {//когда будет результат инициализация завершена; then говорим у всех(all) promise которые возможно будут(массив) 
    dispatch(initializedSucces());
  });
}


export default appReducer;