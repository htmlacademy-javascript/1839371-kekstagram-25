import { getData } from './load.js';
import { createThumbnails } from './pictures.js';
import { debounce, showAlertErrorGetData} from './util.js';

const picturesElement = document.querySelector('.pictures');

// отрисовка полноразмерного изображения
const bigPictureElement = document.querySelector('.big-picture');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');
const bigPictureImgElement = document.querySelector('#big-picture__img');
const bigPictureSocialElement = document.querySelector('.big-picture__social');
const likesCountElement = bigPictureSocialElement.querySelector('.likes-count');
const socialCaptionElement = bigPictureSocialElement.querySelector('.social__caption');
const socialCommentCountElement = document.querySelector('.social__comment-count');
const commentsCountElement = socialCommentCountElement.querySelector('.comments-count');
const socialCommentsElement = document.querySelector('.social__comments');
const commentsLoaderElement = document.querySelector('.comments-loader');
const bodyElement = document.querySelector('body');

const imgFiltersElement = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

const filterDefaultElement = document.querySelector('#filter-default');
const filterRandomElement = document.querySelector('#filter-random');
const filterDiscussedElement = document.querySelector('#filter-discussed');

function setupComments() {
  const socialCommentsElements = socialCommentsElement.querySelectorAll('.social__comment');

  const MAX_COUNT_COMMENT = 5;

  for (let i = MAX_COUNT_COMMENT; i < socialCommentsElements.length; i++) {
    socialCommentsElements[i].style.display = 'none';
  }

  if (socialCommentsElements.length > MAX_COUNT_COMMENT) {
    let countComment = MAX_COUNT_COMMENT;
    socialCommentCountElement.textContent = `${countComment} из ${socialCommentsElements.length} комментариев`;

    const commentsLoaderClickHandler = function () {
      countComment += MAX_COUNT_COMMENT;
      if (countComment < socialCommentsElements.length) {
        for (let i = 0; i < countComment; i++) {
          socialCommentsElements[i].style.display = null;
        }
        socialCommentCountElement.textContent = `${countComment} из ${socialCommentsElements.length} комментариев`;
      }

      if (countComment >= socialCommentsElements.length) {
        for (let i = 0; i < socialCommentsElements.length; i++) {
          socialCommentsElements[i].style.display = null;
          commentsLoaderElement.classList.add('hidden');
          commentsLoaderElement.removeEventListener('click', commentsLoaderClickHandler);
        }
        socialCommentCountElement.textContent = `${socialCommentsElements.length} из ${commentsCountElement.textContent} комментариев`;
      }
    };

    commentsLoaderElement.addEventListener('click', commentsLoaderClickHandler);
    commentsLoaderElement.classList.remove('hidden');

  } else {
    commentsLoaderElement.classList.add('hidden');
    if (socialCommentsElements.length > 1) {
      socialCommentCountElement.textContent = `${socialCommentsElements.length} из ${socialCommentsElements.length} комментариев`;
    } else {
      socialCommentCountElement.textContent = `${socialCommentsElements.length} из ${socialCommentsElements.length} комментария`;
    }
  }
}

const addThumbnailClickHandler = function (thumbnail, similarPhotos) {
  thumbnail.addEventListener('click', () => {
    bigPictureElement.classList.remove('hidden');
    bigPictureImgElement.src = thumbnail.querySelector('img').getAttribute('src');
    likesCountElement.textContent = thumbnail.querySelector('.picture__likes').textContent;
    commentsCountElement.textContent = thumbnail.querySelector('.picture__comments').textContent;

    const id = thumbnail.querySelector('img').getAttribute('id');
    socialCommentsElement.innerHTML = '';

    similarPhotos.find((photo) => String(photo.id) === id).comments.forEach(({avatar, name, message}) => {
      bigPictureElement.querySelector('.social__comments').insertAdjacentHTML('beforeend', `
          <li class="social__comment">
            <img
              class="social__picture"
              src="${avatar}"
              alt="${name}"
              width="35" height="35">
            <p class="social__text">${message}</p>
          </li>`);
    });

    socialCaptionElement.textContent = similarPhotos.find((photo) => String(photo.id) === id).description;
    setupComments();

    bodyElement.classList.add('modal-open');
  });
};

let photos = [];

const renderSimularList = (similarPhotos) => {
  const similarPicturesFragment = createThumbnails(similarPhotos);
  picturesElement.appendChild(similarPicturesFragment);
  const thumbnails = document.querySelectorAll('.picture');

  for (const thumbnail of thumbnails) {
    addThumbnailClickHandler(thumbnail, similarPhotos);
  }
};

const loadPhotos = getData((similarPhotos) => {
  photos = similarPhotos;
  renderSimularList(photos);
  imgFiltersElement.classList.remove('img-filters--inactive');
}, showAlertErrorGetData);

loadPhotos();

//закрытие попапа по нажатию на крестик
bigPictureCloseElement.addEventListener('click', () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
});

// закрытие попапа по нажатию на Esc
document.addEventListener('click', (evt) => {
  if(evt.key === 'Escape') {
    bigPictureElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  }
});

//функция сортировки для получения популярных коментариев
const comparePhoto = (photoA, photoB) => {
  const rancA = photoA.comments.length;
  const rancB = photoB.comments.length;

  return rancB - rancA;
};

//функция получения массива случайных комментариев
const shuffle = (array) => array.sort(() => Math.random() - 0.5);

const filtersFormClickHandler = debounce((evt) => {
  const activeButtonElement = document.querySelector('.img-filters__button--active');

  if (evt.target === activeButtonElement) {
    return;
  }

  filterRandomElement.classList.remove('img-filters__button--active');
  filterDefaultElement.classList.remove('img-filters__button--active');
  filterDiscussedElement.classList.remove('img-filters__button--active');

  evt.target.classList.add('img-filters__button--active');

  //удаляем старые картинки
  const picture = picturesElement.querySelectorAll('.picture');
  picture.forEach((pic) => {pic.remove();});

  //pictures.innerHTML = ''

  let newPhotos = [];

  if (evt.target.id === 'filter-default') {
    newPhotos = [...photos];
  } else if (evt.target.id === 'filter-discussed') {
    newPhotos = photos.slice().sort(comparePhoto);
  } else if (evt.target.id === 'filter-random') {
    newPhotos = [...photos];
    newPhotos = shuffle(newPhotos).slice(0, 10);
  }

  renderSimularList(newPhotos);

});

filtersForm.addEventListener('click', filtersFormClickHandler);
