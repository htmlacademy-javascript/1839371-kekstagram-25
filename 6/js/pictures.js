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

export {similarPhotos};
