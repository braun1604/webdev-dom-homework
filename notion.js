import { renderLogin } from "./loginPage.js";


export const notion = () => {
    const textAuthorization = document.createElement('p');
    textAuthorization.innerHTML =  `Чтобы добавить комментарий, <a href="#">авторизируйтесь</a>`
    const commentsHtml = document.getElementById("container");
    commentsHtml.appendChild(textAuthorization);
    textAuthorization.addEventListener("click", () => {
        textAuthorization.remove();
        renderLogin()
    })

}


