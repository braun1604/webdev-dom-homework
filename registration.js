export const registration = () => {
    const registrationForm = document.createElement('div');
    registrationForm.innerHTML =  `<div class="registration-form">
<div>
  <h2>Форма регистрации</h2>
</div>
<div class="form-row">
<input type="text" id="form-name" class="input" placeholder="Введите имя">
<br />
<input type="text" id="form-login" class="input" placeholder="Введите логин">
<br />
<input type="password" id="form-password" class="input" placeholder="Введите пароль">
</div>
<div class="login-button-div">
<button class="login-button" id="button-registration"><b>Зарегистрироваться</b></button>
</div>
<br />
<a href="index.html" id="form-enter" class="registration">Войти</a>
</div>
`
    const registrationFormNew = document.getElementById("container");
    registrationFormNew.appendChild(registrationForm);

    const formNameEl = document.getElementById("form-name");
    const formLoginEl = document.getElementById("form-login");
    const formPasswordEl = document.getElementById("form-password");
    const buttonRegistration = document.getElementById("button-registration");
    buttonRegistration.addEventListener("click", function (e) {
      const formNameElement = formNameEl.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
        const formPasswordElement = formPasswordEl.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
      const formLoginElement = formLoginEl.value
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
  
      fetch("https://wedev-api.sky.pro/api/user", {
        method: "POST",
        body: JSON.stringify({
          login: formLoginElement,
          name: formNameElement,
          password: formPasswordElement,
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
  
        .then((response) => {
          const user = response.user;
          console.log(user);
        })
        .catch((error) => {
          if (error.message == "400 error") {
            alert("Пользователь с таким логином уже сущетсвует");
          } else if (error.message == "Сервер упал") {
            alert("Сервер сломался, попробуй позже");
          } else {
            error.message == "Failed to fetch";
            alert("Кажется, у вас сломался интернет, попробуйте позже");
          }
        });
    });
  };
  
