import { LOGIN_URL } from "./const.js";
import { BASE_URL } from "./const.js";
import { renderComments } from "./renderComments.js";
import { registration } from "./registration.js";
import { commentsForm } from "./commentsForm.js";
import { copyText } from "./helper.js";

export const renderLogin = () => {
  const loginTodo = document.createElement("div");
  loginTodo.innerHTML = `<div class="login">
<div>
  <h2>Форма входа</h2>
</div>
<div class="form-row">
<input type="text" value="admin" id="login-input" class="input" placeholder="Введите логин">
<br />
<input type="password" value="admin" id="password-input" class="input" placeholder="Пароль">
</div>
<div class="login-button-div">
<button class="login-button" id="login-button"><b>Войти</b></button>
</div>
<br />
<a href="#" id="link-to-tasks" class="registration">Зарегистрироваться</a>
</div>
`;
  const loginAddForm = document.getElementById("app");
  loginAddForm.appendChild(loginTodo);
  const loginEl = document.getElementById("login-input");
  const passwordEl = document.getElementById("password-input");
  const loginButton = document.getElementById("login-button");
  const linkToTasks = document.getElementById("link-to-tasks");
  const login = document.querySelector(".login");
  linkToTasks.addEventListener("click", function () {
    login.remove();
    registration();
  });
  loginButton.addEventListener("click", async function (e) {
    const loginElement = loginEl.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
    const passwordElement = passwordEl.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
    let user;
    await fetch(LOGIN_URL, {
      method: "POST",
      body: JSON.stringify({
        login: loginElement,
        password: passwordElement,
      }),
    })
      .then((responce) => {
        if (responce.status === 400) {
          throw new Error("Передан неправильный логин или пароль");
        }
        if (responce.status === 500) {
          throw new Error("Сервер упал");
        } else {
          return responce.json();
        }
      })

      .then((data) => {
        user = data.user;
        return user;
      })
      .then((user) => {
        return fetch(BASE_URL, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      })

      .then((responce) => {
        return responce.json();
      })
      .then((responce) => {
        const comments = responce.comments;
        return comments;
      })
      .then((comments) => {
        login.remove();
        renderComments(comments);
        commentsForm(user);
        copyText();
        initEventListener();
      })

      .catch((error) => {
        if (error.message == "400 error") {
          alert("Передан неправильный логин или пароль");
        } else if (error.message == "Сервер упал") {
          alert("Сервер сломался, попробуй позже");
        } else {
          error.message == "Failed to fetch";
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
      });
  });
};
