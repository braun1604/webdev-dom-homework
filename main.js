"use strict";
    const buttonEl = document.getElementById('button');
    const inputEl = document.getElementById('input');
    const textareaEl = document.getElementById('textarea');
    const commentsEl = document.getElementById('comments');
    const BASE_URL = 'https://wedev-api.sky.pro/api/v1/braun1613/comments';
    let comments = [];

    const loadingHidden = document.querySelector('.loading');
    const loading = (loadingHidden) => {
      loadingHidden.style.display = 'flex'
    }
    loading(loadingHidden);

    const fetchPromise = () => {fetch(BASE_URL, {
      method: "GET",
      forceError: true,
    })
    .then((responce) => {
        return responce.json();
     })
      .then((responseData) => {
        loadingHidden.style.display = 'none'
      comments = responseData.comments;
      renderComments();
      })
    };

      const renderComments = () => {
      const commentsHtml = comments.map((commentary, index) => {
      const dateObject = new Date(`${commentary.date}`);
      const day = dateObject.getDate().toString().padStart(2, '0');
      const month = (dateObject.getMonth() + 1).toString().padStart(2, '0'); 
      const year = dateObject.getFullYear();
      const hours = dateObject.getHours().toString().padStart(2, '0');
      const minutes = dateObject.getMinutes().toString().padStart(2, '0');
      const seconds = dateObject.getSeconds().toString().padStart(2, '0');
      const formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
        const classButton = commentary.isLiked ? "-active-like" : ""; 
        return `<li class="comment" >
          <div class="comment-header" >
            <div data-index="${index}">${commentary.author.name}</div>
            <div>${formattedDate}</div>
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
        </li>`
      }).join('');
      commentsEl.innerHTML = commentsHtml;
      initEventListener();
    }

      function initEventListener(){
      const likeButtonEls = document.querySelectorAll('.like-button');
    for (const likeButtonEl of likeButtonEls) {
      likeButtonEl.addEventListener('click', () => {
       const index = likeButtonEl.dataset.index
       if (comments[index].isLiked) {
        comments[index].isLiked = !comments[index].isLiked
        comments[index].likes--
      } else {
        comments[index].isLiked = !comments[index].isLiked
        comments[index].likes++
      }
      renderComments();
    })
  }
}

const copyText = () => {
  commentsEl.addEventListener('click', (event) => {
    event.stopPropagation()
    let target = event.target
    if (!target.classList.contains('comment-text')) {
      return
    }
    const currentHeader = document.querySelector(`[data-index="${event.target.dataset.index}"]`);
    textareaEl.value = `>${target.textContent.replace(/\s/g, ' ').trim()}\n${
          currentHeader.textContent.replace(/\s/g, ' ').trim()}`
  })
}

    buttonEl.addEventListener('click', function (e) {
      const inputElement = inputEl.value .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
      const textareaElement = textareaEl.value .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;");
      if (inputElement.trim() === '' || textareaElement.trim() === '') {
        alert('Введите данные корректно')
        return 
      }
      const commentHidden = document.querySelector('.add-form');
    commentHidden.style.display = 'none';
    const loadingCommentsHidden = document.querySelector('.loading-comments');
    const loadingComments = (loadingCommentsHidden) => {
      loadingCommentsHidden.style.display = 'flex'
    }
    loading(loadingCommentsHidden);
      fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify({ text: textareaElement, name: inputElement, forceError: true,}),
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
            method: "GET",
          })
        })
        .then((responseData) => {
          return responseData.json();
        })
        .then((response) => {
          comments = response.comments;
          renderComments();
        })
        .then(() => {
          const loadingCommentsHidden = document.querySelector('.loading-comments');
    loadingCommentsHidden.style.display = 'none';
          commentHidden.style.display = 'flex';
          inputEl.value = "";
          textareaEl.value = "";
        })
        .catch((error) => {
          if (error.message == "400 error") {
            alert("Имя и комментарий должны быть не короче 3 символов")
            }
          else if (error.message == "Сервер упал") {
            alert("Сервер сломался, попробуй позже")
            }
          else { (error.message == "Failed to fetch") 
            alert("Кажется, у вас сломался интернет, попробуйте позже")
          }
          loadingCommentsHidden.style.display = 'none';
          commentHidden.style.display = 'flex';
        });
        
        
      renderComments();
     
     
    });
    fetchPromise();
    renderComments();
    copyText();
  