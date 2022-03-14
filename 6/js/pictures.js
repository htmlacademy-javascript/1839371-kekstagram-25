import {createPhotos} from './data.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPhotos = createPhotos();
const similarPicturesFragment = document.createDocumentFragment();

similarPhotos.forEach(({url, comments, likes, id}) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__img').id = id;                       // добавил id для выбора миниатюры

  similarPicturesFragment.appendChild(pictureElement);
});

pictures.appendChild(similarPicturesFragment);

//=======================================================================
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
const body = document.querySelector('body');


// навесил обработчик открытия попапа по клику на миниатюру
const addThumbnailClickHandler = function (thumbnail) {
  thumbnail.addEventListener('click', () => {

    bigPicture.classList.remove('hidden');
    bigPictureImj.src = thumbnail.querySelector('img').getAttribute('src');
    likesCount.textContent = thumbnail.querySelector('.picture__likes').textContent;
    commentsCount.textContent = thumbnail.querySelector('.picture__comments').textContent;

    const id = thumbnail.querySelector('img').getAttribute('id');

    socialComments.innerHTML = '';
    similarPhotos[id].comments.forEach(({avatar, name, message}) => {
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

    socialCaption.textContent = similarPhotos[id].description;

    socialCommentCount.classList.add('hidden');
    commentsLoader.classList.add('hidden');
    body.classList.add('modal-open');
  });
};

// создал замыкание для выбора миниатюр
for (let thumbnail of thumbnails) {
  addThumbnailClickHandler(thumbnail);
}

// закрытие попапа по нажатию на крестик
bigPictureClose.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

// закрытие попапа по нажатию на Esc
document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});


