import {showAlertSuccess, showAlertError } from './util.js';

// открытие и валидация формы загрузки фото
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadFileElement = document.querySelector('#upload-file');
const imgUploadCancelElement = document.querySelector('.img-upload__cancel');
const formElement = document.querySelector('.img-upload__form');
const textDescriptionElement = document.querySelector('.text__description');
const textHashtagsElement = document.querySelector('.text__hashtags');
const bodyElement = document.querySelector('body');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,100}$/;

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerElement = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgUploadPreviewElement = document.querySelector('#img-upload__preview');

const errorElement = document.querySelector('#error').content.querySelector('.error');
const successElement = document.querySelector('#success').content.querySelector('.success');
const successButtonElement = document.querySelector('#success').content.querySelector('.success__button');
const errorButtonElement = document.querySelector('#error').content.querySelector('.error__button');
const errorInnerElement = document.querySelector('#error').content.querySelector('.error__inner');
const successInnerElement = document.querySelector('#success').content.querySelector('.success__inner');

const ErrorMessages = {
  INCORRECT_LENGTH: 'Хештег не должен быть длинее 20 символов',
  INCORRECT_COUNT: 'Максимальное количество хэш-тегов 5',
  INCORRECT_VALUE: 'Строка после решётки должна состоять из букв и чисел',
  INCORRECT_FIRST_SIMBOL: 'Хештег должен начинаться с решетки',
  INCORRECT_ONLY_GRID: 'Хештег должен содержать не только решетку',
  INCORRECT_NOT_REPIT: 'Один и тот же хэш-тег не может быть использован дважды',
};

const MAX_HASHTAG_LENGTH = 20;
const MAX_HASHTAG_COUNT = 5;

const WEBSITE_ADDRESS_SEND_DATA = 'https://25.javascript.pages.academy/kekstagram';

const MIN_SIZE_PHOTO = 25;
const MAX_SIZE_PHOTO = 100;
const STEP_SIZE_PHOTO = 25;

const imgUploadEffectLevelElement = document.querySelector('.img-upload__effect-level');


// открытие модального окна
uploadFileElement.addEventListener('click', () => {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  uploadFileElement.addEventListener('change', () => {
    if (uploadFileElement.value !== '') {
      imgUploadOverlayElement.classList.remove('hidden');
      bodyElement.classList.add('modal-open');
    }
  });
});

// изменение масштаба фотки
function countScale () {
  let fieldValue = parseFloat(scaleControlValueElement.value);
  imgUploadPreviewElement.classList.add('scale');

  scaleControlSmallerElement.addEventListener('click', () => {
    if (fieldValue > MIN_SIZE_PHOTO) {
      fieldValue -= STEP_SIZE_PHOTO;
      imgUploadPreviewElement.style.transform = `scale(${fieldValue / 100})`;
      scaleControlValueElement.value = `${fieldValue}%`;
    }
  });

  scaleControlBiggerElement.addEventListener('click', () => {
    if (fieldValue < MAX_SIZE_PHOTO) {
      fieldValue += STEP_SIZE_PHOTO;
      imgUploadPreviewElement.style.transform = `scale(${fieldValue / 100})`;
      scaleControlValueElement.value = `${fieldValue}%`;
    }
  });
}

countScale();

// скрытие модального окна по крестику
imgUploadCancelElement.addEventListener('click', () => {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  formElement.reset();
  imgUploadEffectLevelElement.classList.add('hidden');
  imgUploadPreviewElement.style.filter = 'none';

});

// скрытие модального окна Esc (при нахождении в поле ввода в комментарии или хештеге не сработает)
document.addEventListener('keydown', (evt) => {
  if (textDescriptionElement === document.activeElement || textHashtagsElement === document.activeElement) {
    return evt;
  } else {
    if (evt.key === 'Escape') {
      imgUploadOverlayElement.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
      formElement.reset();
      imgUploadEffectLevelElement.classList.add('hidden');
      imgUploadPreviewElement.style.filter = 'none';
    }
  }
});

//закрытия сообщения об ошибке отправки
const closeErrorClickButton = () => errorButtonElement.addEventListener('click', () => {
  errorElement.classList.add('hidden');
  imgUploadEffectLevelElement.classList.add('hidden');
  imgUploadPreviewElement.style.filter = 'none';
});

const closeErrorClickBody = () => document.addEventListener('click', (evt) => {
  if (!errorInnerElement.contains(evt.target)){
    errorElement.classList.add('hidden');
    imgUploadEffectLevelElement.classList.add('hidden');
    imgUploadPreviewElement.style.filter = 'none';
  }
}, {once: true});

document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    errorElement.classList.add('hidden');
    imgUploadEffectLevelElement.classList.add('hidden');
    imgUploadPreviewElement.style.filter = 'none';
  }
});

//закрытия сообщения об успешной отправки
const closeSuccessClickButton = () => successButtonElement.addEventListener('click', () => {
  successElement.classList.add('hidden');
  imgUploadEffectLevelElement.classList.add('hidden');
  imgUploadPreviewElement.style.filter = 'none';
});

const closeSuccessClickBody = () => document.addEventListener('click', (evt) => {
  if (!successInnerElement.contains(evt.target)){
    successElement.classList.add('hidden');
    imgUploadEffectLevelElement.classList.add('hidden');
    imgUploadPreviewElement.style.filter = 'none';
  }
}, {once: true});

document.addEventListener('keydown', (evt) => {
  if(evt.key === 'Escape') {
    successElement.classList.add('hidden');
    imgUploadEffectLevelElement.classList.add('hidden');
    imgUploadPreviewElement.style.filter = 'none';
  }
});

//валидация хештега
const pristine = new Pristine(formElement, {
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
}, ErrorMessages.INCORRECT_VALUE);

pristine.addValidator(textHashtagsElement, () => {
  const arrayHashtags = textHashtagsElement.value.split(' ');
  for (const hashtag of arrayHashtags) {
    if (hashtag[0] !== '#' && hashtag.length !== 0) {
      return false;
    }
  }
  return true;
}, ErrorMessages.INCORRECT_FIRST_SIMBOL);

pristine.addValidator(textHashtagsElement, () => {
  const arrayHashtags = textHashtagsElement.value.split(' ');
  for (const hashtag of arrayHashtags) {
    if (hashtag === '#') {
      return false;
    }
  }
  return true;
}, ErrorMessages.INCORRECT_ONLY_GRID);

pristine.addValidator(textHashtagsElement, () => {
  const arrayHashtags = textHashtagsElement.value.split(' ');
  for (const hashtag of arrayHashtags) {
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return false;
    }
  }
  return true;
}, ErrorMessages.INCORRECT_LENGTH);

pristine.addValidator(textHashtagsElement, () => {
  const arrayHashtags = textHashtagsElement.value.split(' ');
  if (arrayHashtags.length > MAX_HASHTAG_COUNT) {
    return false;
  }
  return true;
}, ErrorMessages.INCORRECT_COUNT);

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
}, ErrorMessages.INCORRECT_NOT_REPIT);

formElement.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();

  if (isValid) {

    const formData = new FormData(evt.target);

    fetch(
      WEBSITE_ADDRESS_SEND_DATA,
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => {
      if (response.ok) {
        showAlertSuccess();
        imgUploadOverlayElement.classList.add('hidden');
        bodyElement.classList.remove('modal-open');
        formElement.reset();
        successElement.classList.remove('hidden');
        closeSuccessClickButton();
        closeSuccessClickBody();
      } else {
        showAlertError();
        imgUploadOverlayElement.classList.add('hidden');
        bodyElement.classList.remove('modal-open');
        formElement.reset();
        errorElement.classList.remove('hidden');
        closeErrorClickBody();
        closeErrorClickButton();
      }

    })
      .catch(() => {
        showAlertError();
        imgUploadOverlayElement.classList.add('hidden');
        bodyElement.classList.remove('modal-open');
        formElement.reset();
        errorElement.classList.remove('hidden');
        closeErrorClickBody();
        closeErrorClickButton();
      });
  }
});

