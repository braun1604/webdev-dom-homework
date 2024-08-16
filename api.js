import { renderComments } from "./renderComments.js";
import { BASE_URL } from "./const.js";
export const fetchPromise =  async () => {
  await fetch(BASE_URL)
    .then((responce) => {
      if (responce.status === 500) {
        throw new Error("Сервер упал");
      } else {
        return responce.json();
      }
    })
    .then((responseData) => {
      // const loadingHidden = document.querySelector(".loading");
      // loadingHidden.style.display = "none";
      const newComments = responseData.comments;
      console.log(newComments)
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



