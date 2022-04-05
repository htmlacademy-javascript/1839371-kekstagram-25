import { getData } from './load.js';
import { debounce } from './util.js';
//import { similar } from './pictures.js';

const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Отрисовка полноразмерного изибражения

const bigPicture = document.querySelector('.big-picture ');
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
const similarPicturesFragment = document.createDocumentFragment();

const imgFiltersElement = document.querySelector('.img-filters');
const filterDefaultElement = document.querySelector('#filter-default');
const filterRandomElement = document.querySelector('#filter-random');
const filterDiscussedElement = document.querySelector('#filter-discussed');

//функция сортировки для получения популярных коментариев
const comparePhoto = (photoA, photoB) => {
  const rancA = photoA.comments.length;
  const rancB = photoB.comments.length;

  return rancB - rancA;
};


const renderSimularList = (similarPhotos) => {
  const similar = (photos) => {                                                 // написал функцию но вынести в отдельный блок ее не получилось
    photos.forEach(({url, comments, likes, id}) => {
      const pictureElement = pictureTemplate.cloneNode(true);

      pictureElement.querySelector('.picture__img').src = url;
      pictureElement.querySelector('.picture__comments').textContent = comments.length;
      pictureElement.querySelector('.picture__likes').textContent = likes;
      pictureElement.querySelector('.picture__img').id = id;                       // добавил id для выбора миниатюры

      similarPicturesFragment.appendChild(pictureElement);

    });
  };
  similar(similarPhotos);

  pictures.appendChild(similarPicturesFragment);

  const thumbnails = document.querySelectorAll('.picture');


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

    imgFiltersElement.classList.remove('img-filters--inactive');
    filterDefaultElement.classList.remove('img-filters__button--active');

  };

  // создал замыкание для выбора миниатюр
  for (const thumbnail of thumbnails) {
    addThumbnailClickHandler(thumbnail);
  }
};

const loadPhotos = getData(renderSimularList, console.error);

loadPhotos();


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


// блок фильтров

//фильтр по умолчанию
filterDefaultElement.addEventListener('click', () => {
  filterDefaultElement.classList.add('img-filters__button--active');
  filterRandomElement.classList.remove('img-filters__button--active');
  filterDiscussedElement.classList.remove('img-filters__button--active');

  const picture = pictures.querySelectorAll('.picture');

  picture.forEach((pic) => {pic.remove();});

  const renderSimularListFilterDefault = debounce((similarPhotosFilterDefault) => {
    const similarFilterDefault = (photos) => {                                                 // написал функцию но вынести в отдельный блок ее не получилось
      photos.forEach(({url, comments, likes, id}) => {
        const pictureElement = pictureTemplate.cloneNode(true);

        pictureElement.querySelector('.picture__img').src = url;
        pictureElement.querySelector('.picture__comments').textContent = comments.length;
        pictureElement.querySelector('.picture__likes').textContent = likes;
        pictureElement.querySelector('.picture__img').id = id;                       // добавил id для выбора миниатюры

        similarPicturesFragment.appendChild(pictureElement);

      });
    };
    similarFilterDefault(similarPhotosFilterDefault);

    pictures.appendChild(similarPicturesFragment);

    const thumbnails = document.querySelectorAll('.picture');

    const addThumbnailClickHandler = function (thumbnail) {

      thumbnail.addEventListener('click', () => {
        bigPicture.classList.remove('hidden');
        bigPictureImj.src = thumbnail.querySelector('img').getAttribute('src');
        likesCount.textContent = thumbnail.querySelector('.picture__likes').textContent;
        commentsCount.textContent = thumbnail.querySelector('.picture__comments').textContent;

        const id = thumbnail.querySelector('img').getAttribute('id');
        socialComments.innerHTML = '';

        similarPhotosFilterDefault.find((photo) => String(photo.id) === id).comments.forEach(({avatar, name, message}) => {
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

        socialCaption.textContent = similarPhotosFilterDefault.find((photo) => String(photo.id) === id).description;

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

    for (const thumbnail of thumbnails) {
      addThumbnailClickHandler(thumbnail);
    }

  });

  const loadPhotosFilterDefault = getData(renderSimularListFilterDefault, console.error);

  loadPhotosFilterDefault();

});

// фильтр 10 случайных
filterRandomElement.addEventListener('click', () => {
  filterRandomElement.classList.add('img-filters__button--active');
  filterDefaultElement.classList.remove('img-filters__button--active');
  filterDiscussedElement.classList.remove('img-filters__button--active');

  const picture = pictures.querySelectorAll('.picture');

  picture.forEach((pic) => {pic.remove();});

  const renderSimularListFilterRandom = debounce((similarPhotosFilterRandom) => {
    const similarFilterRandom = (photos) => {                                                 // написал функцию но вынести в отдельный блок ее не получилось
      photos.forEach(({url, comments, likes, id}) => {
        const pictureElement = pictureTemplate.cloneNode(true);

        pictureElement.querySelector('.picture__img').src = url;
        pictureElement.querySelector('.picture__comments').textContent = comments.length;
        pictureElement.querySelector('.picture__likes').textContent = likes;
        pictureElement.querySelector('.picture__img').id = id;                       // добавил id для выбора миниатюры

        similarPicturesFragment.appendChild(pictureElement);

      });
    };

    //получение 10 рандомных картинок
    let result = [];
    const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

    while (result.length !== 10) {
      const index = getRandomInt(similarPhotosFilterRandom.length);
      result.push(similarPhotosFilterRandom[index]);
      result = result.filter((v, i, arr) =>  arr.indexOf(v) === i);
    }

    similarFilterRandom(result);

    pictures.appendChild(similarPicturesFragment);

    const thumbnails = document.querySelectorAll('.picture');

    const addThumbnailClickHandler = function (thumbnail) {

      thumbnail.addEventListener('click', () => {
        bigPicture.classList.remove('hidden');
        bigPictureImj.src = thumbnail.querySelector('img').getAttribute('src');
        likesCount.textContent = thumbnail.querySelector('.picture__likes').textContent;
        commentsCount.textContent = thumbnail.querySelector('.picture__comments').textContent;

        const id = thumbnail.querySelector('img').getAttribute('id');
        socialComments.innerHTML = '';

        similarPhotosFilterRandom.find((photo) => String(photo.id) === id).comments.forEach(({avatar, name, message}) => {
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

        socialCaption.textContent = similarPhotosFilterRandom.find((photo) => String(photo.id) === id).description;

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

    for (const thumbnail of thumbnails) {
      addThumbnailClickHandler(thumbnail);
    }

  });

  const loadPhotosFilterRandom = getData(renderSimularListFilterRandom, console.error);

  loadPhotosFilterRandom();

});

// фильтр по популярности
filterDiscussedElement.addEventListener('click', () => {
  filterDiscussedElement.classList.add('img-filters__button--active');
  filterDefaultElement.classList.remove('img-filters__button--active');
  filterRandomElement.classList.remove('img-filters__button--active');


  const picture = pictures.querySelectorAll('.picture');

  picture.forEach((pic) => {pic.remove();});

  const renderSimularListFilterDiscussed = debounce((similarPhotosFilterDiscussed) => {
    const similarFilterDiscussed = (photos) => {                                                 // написал функцию но вынести в отдельный блок ее не получилось
      photos.slice().sort(comparePhoto).forEach(({url, comments, likes, id}) => {
        const pictureElement = pictureTemplate.cloneNode(true);
        pictureElement.querySelector('.picture__img').src = url;
        pictureElement.querySelector('.picture__comments').textContent = comments.length;
        pictureElement.querySelector('.picture__likes').textContent = likes;
        pictureElement.querySelector('.picture__img').id = id;                       // добавил id для выбора миниатюры
        similarPicturesFragment.appendChild(pictureElement);
      });
    };

    similarFilterDiscussed(similarPhotosFilterDiscussed);

    pictures.appendChild(similarPicturesFragment);

    const thumbnails = document.querySelectorAll('.picture');


    const addThumbnailClickHandler = function (thumbnail) {

      thumbnail.addEventListener('click', () => {
        bigPicture.classList.remove('hidden');
        bigPictureImj.src = thumbnail.querySelector('img').getAttribute('src');
        likesCount.textContent = thumbnail.querySelector('.picture__likes').textContent;
        commentsCount.textContent = thumbnail.querySelector('.picture__comments').textContent;

        const id = thumbnail.querySelector('img').getAttribute('id');
        socialComments.innerHTML = '';

        similarPhotosFilterDiscussed.find((photo) => String(photo.id) === id).comments.forEach(({avatar, name, message}) => {
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

        socialCaption.textContent = similarPhotosFilterDiscussed.find((photo) => String(photo.id) === id).description;

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

    for (const thumbnail of thumbnails) {
      addThumbnailClickHandler(thumbnail);
    }

  });

  const loadPhotosFilterDiscussed = getData(renderSimularListFilterDiscussed, console.error);

  loadPhotosFilterDiscussed();

});
