// открытие и валидация формы загрузки фото
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadFileElement = document.querySelector('#upload-file');
const imgUploadCancelElement = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const textDescriptionElement = document.querySelector('.text__description');
const textHashtagsElement = document.querySelector('.text__hashtags');
const bodyElement = document.querySelector('body');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,100}$/;

// открытие модального окна
uploadFileElement.addEventListener('click', () => {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
});

// скрытие модального окна по крестику
imgUploadCancelElement.addEventListener('click', () => {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  form.resete();
});

// скрытие модального окна Esc (при нахождении в поле ввода в комментарии или хештеге не сработает)
document.addEventListener('keydown', (evt) => {
  if (textDescriptionElement === document.activeElement || textHashtagsElement === document.activeElement) {
    return evt;
  } else {
    if (evt.key === 'Escape') {
      imgUploadOverlayElement.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
      form.resete();
    }
  }
});

//валидация хештега
const pristine = new Pristine(form, {
  classTo: 'img-upload__text',
  errorClass: 'img-upload__text--invalid',
  successClass: 'img-upload__text--valid',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'img-upload-error'
});


pristine.addValidator(textHashtagsElement, () => {
  const arrayHashtags = textHashtagsElement.value.split(' ');
  for (const hashtag of arrayHashtags) {
    if (!re.test(hashtag) && hashtag !== '') {
      return false;
    }
  }
  return true;
}, 'Строка после решётки должна состоять из букв и чисел');

pristine.addValidator(textHashtagsElement, () => {
  const arrayHashtags = textHashtagsElement.value.split(' ');
  for (const hashtag of arrayHashtags) {
    if (hashtag[0] !== '#') {
      return false;
    }
  }
  return true;
}, 'Хештег должен начинаться с решетки');

pristine.addValidator(textHashtagsElement, () => {
  const arrayHashtags = textHashtagsElement.value.split(' ');
  for (const hashtag of arrayHashtags) {
    if (hashtag === '#') {
      return false;
    }
  }
  return true;
}, 'Хештег должен содержать не только решетку');

pristine.addValidator(textHashtagsElement, () => {
  const arrayHashtags = textHashtagsElement.value.split(' ');
  for (const hashtag of arrayHashtags) {
    if (hashtag.length > 20) {
      return false;
    }
  }
  return true;
}, 'Хештег не должен быть длинее 20 символов');

pristine.addValidator(textHashtagsElement, () => {
  const arrayHashtags = textHashtagsElement.value.split(' ');
  if (arrayHashtags.length > 5) {
    return false;
  }
  return true;
}, 'Максимальное количество хэш-тегов 5');

pristine.addValidator(textHashtagsElement, () => {
  const arrayHashtags = textHashtagsElement.value.split(' ');
  for (let i = 0; i < arrayHashtags.length; i++) {
    for (let j = i + 1; j < arrayHashtags.length; j++) {
      if (arrayHashtags[i].toLowerCase() === arrayHashtags[j].toLowerCase() && arrayHashtags[i] !== '') {
        return false;
      }
    }
  }
  return true;
}, 'Один и тот же хэш-тег не может быть использован дважды');


form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


