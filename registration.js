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
<input type="text" id="form-password" class="input" placeholder="Введите пароль">
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
};

