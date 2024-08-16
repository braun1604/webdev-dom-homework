import { renderComments } from "./renderComments.js";
import { BASE_URL } from "./const.js";
export const fetchPromise = () => {
  fetch(BASE_URL)
    .then((responce) => {
      if (responce.status === 500) {
        throw new Error("Сервер упал");
      } else {
        return responce.json();
      }
    })
    .then((responseData) => {
      loadingHidden.style.display = "none";
      const newComments = responseData.comments;
      renderComments(newComments);
    })
    .catch((error) => {
      if (error.message == "Сервер упал") {
        alert("Сервер сломался, попробуй позже");
      } else {
        error.message == "Failed to fetch";
        alert("Кажется, у вас сломался интернет, попробуйте позже");
      }
    });
};
const buttonEl = document.getElementById("button");
let comments = [];

const loadingHidden = document.createElement("div");

loadingHidden.innerHTML = ` <div class="loading" style="display: block">
        Пожалуйста подождите, загружаю комментарии...
      </div>`;
document.getElementById("app").appendChild(loadingHidden);

const loading = (loadingHidden) => {
  loadingHidden.style.display = "flex";
};
loading(loadingHidden);

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

  const loadingComments = (loadingCommentsHidden) => {
    loadingCommentsHidden.style.display = "flex";
  };
  loading(loadingCommentsHidden);

  fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify({
      text: textareaElement,
      name: inputElement,
      forceError: true,
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
      return fetch(BASE_URL);
    })
    .then((responseData) => {
      return responseData.json();
    })
    .then((response) => {
      comments = response.comments;
      renderComments(comments);
    })
    .then(() => {
      const loadingCommentsHidden = document.querySelector(".loading-comments");
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
