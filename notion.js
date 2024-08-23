import { renderLogin } from "./loginPage.js";

export const notion = () => {
  const textAuthorization = document.createElement("p");
  textAuthorization.innerHTML = `Чтобы добавить комментарий, <button class="buttonAuthorization">авторизируйтесь</button>`;
  const commentsHtml = document.getElementById("app");
  commentsHtml.appendChild(textAuthorization);

  const buttonAuthorization = document.querySelector(".buttonAuthorization");

  buttonAuthorization.addEventListener("click", () => {
    textAuthorization.remove();
    document.getElementById("comments").remove();
    renderLogin();
  });
};
