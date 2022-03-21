import { similarPhotos } from './pictures.js';

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

    similarPhotos.find((photo) => String(photo.id) === id).comments.forEach(({avatar, name, message}) => {
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

    socialCaption.textContent = similarPhotos.find((photo) => String(photo.id) === id).description;

    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    bodyElement.classList.add('modal-open');
  });
};

// создал замыкание для выбора миниатюр
for (let thumbnail of thumbnails) {
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

