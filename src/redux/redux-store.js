import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./app-reducer";


let reducers = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer  
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//мы получаем функцию composeEnhancers если у нас есть глобальный расширитель или compose(мы должны его получить); REDUX_DEVTOOLS_EXTENSION_COMPOSE__ добавляет расширение
const store = createStore(reducers, composeEnhancers (applyMiddleware(thunkMiddleware)));// composeEnhancers будет создавать свой Middleware который будет перехватывать все dispatch и actions и отображать в своей панели
window.__store__ = store;

export default store;
