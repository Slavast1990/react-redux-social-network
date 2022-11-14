import profileReducer, { addPostActionCreator, deletePost } from "./profile-reducer";
import ReactDOM from "react-dom";
import App from "../App";
import react from "react";

let state = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: 'It\'s my first post', likesCount: 11 },
        { id: 3, message: 'Blabla', likesCount: 11 },
        { id: 4, message: 'Dada', likesCount: 11 }
    ]
};

test('lenght of posts should be incremented', () => {// '' - утверждения теста - длина сообщений должна быть увеличена
    //1. Готовим исходные даные (start data) => action и state
    let action = addPostActionCreator("it-kamasutra.com");
    

    //2. action - запускаем нашу проверку
    let newState = profileReducer(state, action);//проверяем что етот newState при переданом старом state и action даст ответ такой какой мы ожидаем получить

    //3. Expectation - задача нашего теста чтоб появился пятый пост "it-kamasutra.com"
    expect(newState.posts.length).toBe(5);
    //4. expect (мы ожидаем) что наше значение (newState.posts.lenght) toBe (будет) равно 5
});

test('message of new post should be incremented correct', () => {// '' - утверждения теста - сообщение нового поста должно быть правильно увеличено
    //1. Готовим исходные даные (start data) => action и state
    let action = addPostActionCreator("it-kamasutra.com");
   

    //2. action - запускаем нашу проверку
    let newState = profileReducer(state, action);//проверяем что етот newState при переданом старом state и action даст ответ такой какой мы ожидаем получить

    //4. expect (мы ожидаем) что наше значение (newState.posts[4].message) toBe (будет) "it-kamasutra.com"
    expect(newState.posts[4].message).toBe("it-kamasutra.com");// мы dispatch action newState.posts[4].message и он засунулся в массив ниже id: 4

});

test('after deleting length of messages should be decrement', () => {// '' - утверждения теста - после удаления длина сообщений должна быть уменьшена
    //1. Готовим исходные даные (start data) => action и state
    let action = deletePost(1);
   

    //2. action - запускаем нашу проверку
    let newState = profileReducer(state, action);//проверяем что етот newState при переданом старом state и action даст ответ такой какой мы ожидаем получить

    
    expect(newState.posts.length).toBe(3);// мы ожидаем что длина нашего массива будет 3

});

test(`after deleting length shouldn't be decrement if id is incorrect`, () => {// '' - утверждения теста - после удаления длина сообщений должна изменится
    //1. Готовим исходные даные (start data) => action и state
    let action = deletePost(1000);
   

    //2. action - запускаем нашу проверку
    let newState = profileReducer(state, action);//проверяем что етот newState при переданом старом state и action даст ответ такой какой мы ожидаем получить

    //4. expect (мы ожидаем) что наше значение (newState.posts.lenght) будет таким же
    expect(newState.posts.length).toBe(4);// мы ожидаем что длина нашего массива будет 4

});
