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
    console.log(event.target.textContent);
    textareaEl.value = `>${event.target.textContent
      .replace(/\s/g, " ")
      .trim()}\n${currentHeader.textContent.replace(/\s/g, " ").trim()}`;
  });
};
