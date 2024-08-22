import { likefun } from "./const.js";
import { renderComments } from "./renderComments.js";
import { BASE_URL } from "./const.js";

export const initEventListener = (comments, user) => {
  const likeButtonEls = document.querySelectorAll(".like-button");
  for (const likeButtonEl of likeButtonEls) {
    likeButtonEl.addEventListener("click", () => {
      const index = likeButtonEl.dataset.index;
      fetch(likefun(comments[index].id), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        .then(() => {
          return fetch(BASE_URL, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
        })
        .then((responce) => {
          return responce.json();
        })
        .then((responce) => {
          const comments = responce.comments;
          return comments;
        })
        .then((comments) => {
          renderComments(comments, user);
        });
    });
  }
};

export const copyText = () => {
  const commentsEl = document.getElementById("comments");
  const textareaEl = document.getElementById("textarea");
  commentsEl.addEventListener("click", (event) => {
    event.stopPropagation();
    let target = event.target;
    if (!target.classList.contains("comment-text")) {
      return;
    }
    const currentHeader = document.querySelector(
      `[data-index="${event.target.dataset.index}"]`
    );
    textareaEl.value = `>${event.target.textContent
      .replace(/\s/g, " ")
      .trim()}\n${currentHeader.textContent.replace(/\s/g, " ").trim()}`;
  });
};
