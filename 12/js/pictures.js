const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');

function createThumbnails(photos) {
  const simularPictureFragment = document.createDocumentFragment();

  photos.forEach(({url, comments, likes, id}) => {
    const pictureElement = pictureTemplateElement.cloneNode(true);

    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__img').id = id;

    simularPictureFragment.appendChild(pictureElement);
  }) ;

  return simularPictureFragment;
}

export {createThumbnails};
