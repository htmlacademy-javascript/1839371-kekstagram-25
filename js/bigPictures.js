import { renderSimularList } from './pictures.js';

// Отрисовка полноразмерного изибражения

const bigPicture = document.querySelector('.big-picture ');
const thumbnails = document.querySelectorAll('.picture');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const bigPictureImj = document.querySelector('#big-picture__img'); // добавил id на img полноэкранного режима
const bigPictureSocial = document.querySelector('.big-picture__social');
const likesCount = bigPictureSocial.querySelector('.likes-count');
const socialCaption = bigPictureSocial.querySelector('.social__caption');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsCount = socialCommentCount.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments');
const commentsLoader = document.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');

// навесил обработчик открытия попапа по клику на миниатюру
const addThumbnailClickHandler = function (thumbnail) {
  thumbnail.addEventListener('click', () => {
    bigPicture.classList.remove('hidden');
    bigPictureImj.src = thumbnail.querySelector('img').getAttribute('src');
    likesCount.textContent = thumbnail.querySelector('.picture__likes').textContent;
    commentsCount.textContent = thumbnail.querySelector('.picture__comments').textContent;

    const id = thumbnail.querySelector('img').getAttribute('id');
    socialComments.innerHTML = '';

    renderSimularList.find((photo) => String(photo.id) === id).comments.forEach(({avatar, name, message}) => {
      bigPicture.querySelector('.social__comments').insertAdjacentHTML('beforeend', `
            <li class="social__comment">
              <img
                class="social__picture"
                src="${avatar}"
                alt="${name}"
                width="35" height="35">
              <p class="social__text">${message}</p>
            </li>`);
    });

    socialCaption.textContent = renderSimularList.find((photo) => String(photo.id) === id).description;

    // показ комментариев по 5 штук
    const socialComment = socialComments.querySelectorAll('.social__comment');

    for (let i = 5; i < socialComment.length; i++) {                    //скрываем с 6го комментария
      socialComment[i].style.display = 'none';
    }

    if (socialComment.length > 5) {                                     // если комментариев больше 5
      let countComment = 5;                                                  // заводим счетчик комментариев
      socialCommentCount.textContent = `${countComment} из ${socialComment.length} комментариев`;

      const listenerComment = function () {
        countComment += 5;
        if (countComment <= socialComment.length) {                      // если счетчик меньше кол-ва коментариев
          for (let i = 0; i < countComment; i++) {
            socialComment[i].style.display = null;                       // показываем еще 5
          }
          socialCommentCount.textContent = `${countComment} из ${socialComment.length} комментариев`;
        }

        if (countComment >= socialComment.length) {                       // если счетчик больше или равен кол-ву коментариев
          for (let i = 0; i < socialComment.length; i++) {
            socialComment[i].style.display = null;                         // показываем оставшиеся
            commentsLoader.classList.add('hidden');                         // скрываем кнопку
            commentsLoader.removeEventListener('click', listenerComment);  // удаляем обработчик
          }
          socialCommentCount.textContent = `${socialComment.length} из ${commentsCount.textContent} комментарияев`;
        }
      };

      commentsLoader.addEventListener('click', listenerComment);
      commentsLoader.classList.remove('hidden');

    } else {
      commentsLoader.classList.add('hidden');
      if (socialComment.length > 1) {
        socialCommentCount.textContent = `${socialComment.length} из ${socialComment.length} комментариев`;
      } else {
        socialCommentCount.textContent = `${socialComment.length} из ${socialComment.length} комментария`;
      }
    }

    bodyElement.classList.add('modal-open');
  });
};


// создал замыкание для выбора миниатюр
for (const thumbnail of thumbnails) {
  addThumbnailClickHandler(thumbnail);
}

// закрытие попапа по нажатию на крестик
bigPictureClose.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

});

// закрытие попапа по нажатию на Esc
document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  }
});

