export const initEventListener = (comments) => {
  const likeButtonEls = document.querySelectorAll(".like-button");
  for (const likeButtonEl of likeButtonEls) {
    likeButtonEl.addEventListener("click", () => {
      const index = likeButtonEl.dataset.index;
      if (comments[index].isLiked) {
        comments[index].isLiked = !comments[index].isLiked;
        comments[index].likes--;
      } else {
        comments[index].isLiked = !comments[index].isLiked;
        comments[index].likes++;
      }
    });
  }
};

const textareaEl = document.getElementById("textarea");
const commentsEl = document.getElementById("comments");

export const copyText = () => {
  commentsEl.addEventListener("click", (event) => {
    event.stopPropagation();
    let target = event.target;
    if (!target.classList.contains("comment-text")) {
      return;
    }
    const currentHeader = document.querySelector(
      `[data-index="${event.target.dataset.index}"]`
    );
    textareaEl.value = `>${target.textContent
      .replace(/\s/g, " ")
      .trim()}\n${currentHeader.textContent.replace(/\s/g, " ").trim()}`;
  });
};
