import { initEventListener } from "./helper.js";
import { format } from "date-fns"

export const renderComments = (comments, user) => {
  const ulComments = document.createElement("ul");
  ulComments.className = "comments";
  ulComments.id = "comments";
  document.getElementById("app").appendChild(ulComments);
  const commentsEl = document.getElementById("comments");
  const commentsHtml = comments
    .map((commentary, index) => {
      // const dateObject = new Date(`${commentary.date}`);
      // const day = dateObject.getDate().toString().padStart(2, "0");
      // const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
      // const year = dateObject.getFullYear();
      // const hours = dateObject.getHours().toString().padStart(2, "0");
      // const minutes = dateObject.getMinutes().toString().padStart(2, "0");
      // const seconds = dateObject.getSeconds().toString().padStart(2, "0");
      // const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
      const createDate = format( new Date(`${commentary.date}`), 'yyyy-MM-dd hh.mm.ss');
      const classButton = commentary.isLiked ? "-active-like" : "";
      return `<li class="comment" >
      <div class="comment-header" >
        <div data-index="${index}">${commentary.author.name}</div>
        <div>${createDate}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text" data-index="${index}">
          ${commentary.text} 
        </div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span  class="likes-counter" data-index="${index}">${commentary.likes}</span>
          <button class="like-button ${classButton}"  data-index="${index}"></button>
        </div>
      </div>
    </li>`;
    })
    .join("");
  commentsEl.innerHTML = commentsHtml;
  if (user) {
    initEventListener(comments, user);
  }
};
