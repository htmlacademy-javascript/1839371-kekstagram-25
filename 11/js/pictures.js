const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPicturesFragment = document.createDocumentFragment();
const similar = function(photos) {
  photos.forEach(({url, comments, likes, id}) => {
    const pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__img').id = id;                       // добавил id для выбора миниатюры

    return similarPicturesFragment.appendChild(pictureElement);
  });
};


export {similar};
