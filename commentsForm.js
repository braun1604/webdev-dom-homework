import { renderComments } from "./renderComments.js";
import { BASE_URL } from "./const.js";

export const commentsForm = (user) => {
  const buttonEl = document.createElement("div");
  buttonEl.innerHTML = `<div class="add-form">
        <input
        value="${user.name}"
          id="input"
          type="text"
          class="add-form-name"
          placeholder="Введите ваше имя"
          disabled
        />
        <textarea
          id="textarea"
          type="textarea"
          class="add-form-text"
          placeholder="Введите ваш коментарий"
          rows="4"
        ></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="button">Написать</button>
        </div>
      </div >`;
  document.getElementById("app").appendChild(buttonEl);

  const inputEl = document.getElementById("input");
  const textareaEl = document.getElementById("textarea");

  buttonEl.addEventListener("click", function (e) {
    const inputElement = inputEl.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
    const textareaElement = textareaEl.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;");
    if (inputElement.trim() === "" || textareaElement.trim() === "") {
      alert("Введите данные корректно");
      return;
    }

    const commentHidden = document.querySelector(".add-form");
    commentHidden.style.display = "none";

    const loadingCommentsHidden = document.createElement("div");
    loadingCommentsHidden.innerHTML = `<div class="loading-comments" style="display: block">
        <br />Комментарии добавляются...<br />
      </div>`;

    document.getElementById("app").appendChild(loadingCommentsHidden);

    fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify({
        text: textareaElement,
      }),
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then((responce) => {
        if (responce.status === 400) {
          throw new Error("400 error");
        }
        if (responce.status === 500) {
          throw new Error("Сервер упал");
        } else {
          return responce.json();
        }
      })
      .then(() => {
        return fetch(BASE_URL, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
      })
      .then((responseData) => {
        return responseData.json();
      })
      .then((response) => {
        const comments = response.comments;

        renderComments(comments);
      })
      .then(() => {
        const loadingCommentsHidden =
          document.querySelector(".loading-comments");
        loadingCommentsHidden.style.display = "none";
        commentHidden.style.display = "flex";
        inputEl.value = "";
        textareaEl.value = "";
      })
      .catch((error) => {
        if (error.message == "400 error") {
          alert("Имя и комментарий должны быть не короче 3 символов");
        } else if (error.message == "Сервер упал") {
          alert("Сервер сломался, попробуй позже");
        } else {
          error.message == "Failed to fetch";
          alert("Кажется, у вас сломался интернет, попробуйте позже");
        }
        loadingCommentsHidden.style.display = "none";
        commentHidden.style.display = "flex";
      });

    renderComments(comments);
  });
};
