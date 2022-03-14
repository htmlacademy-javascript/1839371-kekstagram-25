import {createPhotos} from './data.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPhotos = createPhotos();
const similarPicturesFragment = document.createDocumentFragment();

similarPhotos.forEach(({url, comments, likes}) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

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
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsCount = socialCommentCount.querySelector('.comments-count');
const socialComments = document.querySelector('.social__comments');
const socialComment = document.querySelector('.social__comment')

console.log(bigPictureImj);

// навесил обработчик открытия попапа по клику на миниатюру
const addThumbnailClickHandler = function (thumbnail) {

  thumbnail.addEventListener('click', () => {


    bigPicture.classList.remove('hidden');
    bigPictureImj.src = thumbnail.querySelector('img').getAttribute('src');
    likesCount.textContent = thumbnail.querySelector('.picture__likes').textContent;
    commentsCount.textContent = thumbnail.querySelector('.picture__comments').textContent;

    socialComments.innerHTML = '';

    for (let photo of similarPhotos) {
      photo.comments.forEach(({avatar, name, message}) => {
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
    }
  });

};

// создал замыкание для выбора миниатюр

for (let thumbnail of thumbnails) {
  addThumbnailClickHandler(thumbnail);
}

bigPictureClose.addEventListener('click', () => bigPicture.classList.add('hidden')); // закрытие попапа по нажатию на крестик


