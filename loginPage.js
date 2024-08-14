export const renderLogin = () => {
    const loginTodo = document.createElement('div');
    loginTodo.innerHTML =  `<div class="login">
<div>
  <h2>Форма входа</h2>
</div>
<div class="form-row">
<input type="text" id="login-input" class="input" placeholder="Введите логин">
<br />
<input type="text" id="password-input" class="input" placeholder="Пароль">
</div>
<div class="login-button-div">
<button class="login-button" id="login-button"><b>Войти</b></button>
</div>
<br />
<a href="index.html" id="link-to-tasks" class="registration">Зарегистрироваться</a>
</div>
`;
const loginAddForm = document.getElementById("loginForm");
loginAddForm.appendChild(loginTodo);
const loginEl = document.getElementById("login-input");
const passwordEl = document.getElementById("password-input");
const loginButton = document.getElementById("login-button");
loginButton.addEventListener("click", function (e) {
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
 
  // const commentHidden = document.querySelector(".add-form");
  // commentHidden.style.display = "none";
  // const loadingCommentsHidden = document.querySelector(".loading-comments");
  // const loadingComments = (loadingCommentsHidden) => {
  //   loadingCommentsHidden.style.display = "flex";
  // };
  // loading(loadingCommentsHidden);

  fetch('https://wedev-api.sky.pro/api/user/login', {
    method: "POST",
    body: JSON.stringify({
      login: loginElement,
    password: passwordElement,
    }),
  })
    .then((responce) => {
      if (responce.status === 400) {
        throw new Error("Пользователь с таким логином уже сущетсвует");
      }
      if (responce.status === 500) {
        throw new Error("Сервер упал");
      } else {
        return responce.json();
      }
    })
    .then(() => {
      return fetch('https://wedev-api.sky.pro/api/user/login');
    })
    .then((responseData) => {
      return responseData.json();
    })
    .then((response) => {
      comments = response.comments;
      renderComments(comments);
    })
    // .then(() => {
    //   const loadingCommentsHidden = document.querySelector(".loading-comments");
    //   loadingCommentsHidden.style.display = "none";
    //   commentHidden.style.display = "flex";
    //   inputEl.value = "";
    //   textareaEl.value = "";
    // })
    .catch((error) => {
      if (error.message == "400 error") {
        alert("Пользователь с таким логином уже сущетсвует");
      } else if (error.message == "Сервер упал") {
        alert("Сервер сломался, попробуй позже");
      } else {
        error.message == "Failed to fetch";
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
      // loadingCommentsHidden.style.display = "none";
      // commentHidden.style.display = "flex";
    });

  renderComments(comments);
});
}
