"use strict";
import { renderComments } from "./renderComments.js";
import { fetchPromise } from "./api.js";
import { initEventListener } from "./helper.js";
import { copyText } from "./helper.js";
import { renderLogin } from "./loginPage.js";
import { notion } from "./notion.js";
// import { registration } from "./registration.js";

let comments = [];

//Комментарии видны всегда кроме блока входа и регистрации
// Форма для оставления комментария видна при авторизированном входе
// Форма входа  видна после нажатия на ссылку авторизироваться 
// Регистрация видна после перехода из блока входа через кнопку регистрация

// если пользователь не авторизован показать все комментарии без поля ввода комментариев и показать ссылку на регистрацию
// if(false) {
//     registration();
//     renderLogin();
   
// }

initEventListener(comments);
fetchPromise();
notion()
renderComments(comments);
copyText();


