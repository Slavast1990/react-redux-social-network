import { stopSubmit } from "redux-form";
import { profileAPI, usersAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCES = 'SAVE_PHOTO_SUCCES';


let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }
    ],
    profile: null,
    status: ""
};

const profileReducer = (state = initialState, action) => {

    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 5,
                message: action.newPostText,
                likesCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_STATUS: {
            return {
                ...state,
                status: action.status
            }
        }
        case SET_USER_PROFILE: {
            return { ...state, profile: action.profile }
        }
        case DELETE_POST: {
            return { ...state, posts: state.posts.filter(p => p.id != action.postId) }//только те id которые не равны action.postId(1)
        }
        case SAVE_PHOTO_SUCCES: {
            return { ...state, profile: { ...state.profile, photos: action.photos } }
        }//только те id которые не равны action.postId(1)

        default:
            return state;
    }
}


export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const savePhotoSucces = (photos) => ({ type: SAVE_PHOTO_SUCCES, photos })


export const getUserProfile = (userId) => async (dispatch) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
}

export const updateStatus = (status) => async (dispatch) => {
    try {
    let response = await profileAPI.updateStatus(status);
    if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
    }
} catch (error) {//если наш запрос не зарозолвится покажи ошибку; в етот error приходит ошибка если у нас статус не обновился
    
}
}

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);//отправляю фото
    if (response.data.resultCode === 0) {//если все норм
        dispatch(savePhotoSucces(response.data.data.photos));//обновляю фото(в консоле network -> preview -> photos) и отправляю в actionCreator savePhotoSucces
    }
}

export const SaveProfile = (profile) => async (dispatch, getState) => {//помимо dispatch в санку приходит функция getState которая позволяет взять state целиком
    const userId = getState().auth.userId;//беру наш userId со state(нам не запрещено брать данные с других редьюсеров для нашего редьюсера)
    const response = await profileAPI.SaveProfile(profile);//отправляю данные profile
    if (response.data.resultCode === 0) {//если все норм
        dispatch(getUserProfile(userId));//если мы обновили наш профиль мы заново запрашиваем getUserProfile
    } else {
        dispatch(stopSubmit("edite-profile", { _error: response.data.messages[0] }));//edite-profile ProfileDataForm а _error с messages(см.)
        return Promise.reject(response.data.messages[0]);//если error то возвращается Promise с ошибкой
    }
}

export default profileReducer;