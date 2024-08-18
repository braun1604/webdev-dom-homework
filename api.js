import { renderComments } from "./renderComments.js";
import { BASE_URL } from "./const.js";

const loadingHidden = document.createElement("div");

loadingHidden.innerHTML = ` <div class="loading" style="display: block">
      Пожалуйста подождите, загружаю комментарии...
    </div>`;
document.getElementById("app").appendChild(loadingHidden);
loadingHidden.style.display = "flex";

export const fetchPromise = async () => {
  loadingHidden.style.display = "flex";
  await fetch(BASE_URL)
    .then((responce) => {
      if (responce.status === 500) {
        throw new Error("Сервер упал");
      } else {
        return responce.json();
      }
    })
    .then((responseData) => {
      const newComments = responseData.comments;
      loadingHidden.style.display = "none";
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
