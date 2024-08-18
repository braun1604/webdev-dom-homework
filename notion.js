import { renderLogin } from "./loginPage.js";

export const notion = () => {
  const textAuthorization = document.createElement("p");
  textAuthorization.innerHTML = `Чтобы добавить комментарий, <a href="#">авторизируйтесь</a>`;
  const commentsHtml = document.getElementById("app");
  commentsHtml.appendChild(textAuthorization);

  textAuthorization.addEventListener("click", () => {
    textAuthorization.remove();
    document.getElementById("comments").remove();
    renderLogin();
  });
};
