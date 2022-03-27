// открытие и валидация формы загрузки фото
const imgUploadOverlayElement = document.querySelector('.img-upload__overlay');
const uploadFileElement = document.querySelector('#upload-file');
const imgUploadCancelElement = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const textDescriptionElement = document.querySelector('.text__description');
const textHashtagsElement = document.querySelector('.text__hashtags');
const bodyElement = document.querySelector('body');
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,100}$/;

const scaleControlSmallerElement = document.querySelector('.scale__control--smaller');
const scaleControlBiggerEleent = document.querySelector('.scale__control--bigger');
const scaleControlValueElement = document.querySelector('.scale__control--value');
const imgUploadPreviewElement = document.querySelector('#img-upload__preview');

const effectsRadioElements = document.querySelectorAll('.effects__radio');
const imgUploadEffectLevelElement = document.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadEffectLevelElement.querySelector('.effect-level__value');

// открытие модального окна
uploadFileElement.addEventListener('click', () => {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
});

// изменение масштаба фотки
function countScale () {
  let fieldValue = parseFloat(scaleControlValueElement.value);
  imgUploadPreviewElement.classList.add('scale');

  scaleControlSmallerElement.addEventListener('click', () => {
    if (fieldValue > 25) {
      fieldValue -= 25;
      imgUploadPreviewElement.style.transform = `scale(${fieldValue / 100})`;
      scaleControlValueElement.value = `${fieldValue}%`;
    }
  });

  scaleControlBiggerEleent.addEventListener('click', () => {
    if (fieldValue < 100) {
      fieldValue += 25;
      imgUploadPreviewElement.style.transform = `scale(${fieldValue / 100})`;
      scaleControlValueElement.value = `${fieldValue}%`;
    }
  });
}

countScale();

// создание потягушки
noUiSlider.create(imgUploadEffectLevelElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0.8,
  step: 0.1,
  connect: 'lower',
});

// изменение эффекта фотки
imgUploadEffectLevelElement.classList.add('hidden');

function selectEffect () {
  for (const element of effectsRadioElements) {
    element.addEventListener('change', () => {
      for (const elem of effectsRadioElements) {
        imgUploadPreviewElement.classList.remove(`effects__preview--${elem.value}`);
      }
      imgUploadPreviewElement.classList.add(`effects__preview--${element.value}`);

      if (element.value === 'none') {
        imgUploadEffectLevelElement.classList.add('hidden');
        imgUploadPreviewElement.style.filter = null;
      }

      if (element.value === 'chrome') {
        imgUploadEffectLevelElement.classList.remove('hidden');
        imgUploadEffectLevelElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 0.8,
          step: 0.1,
          connect: 'lower',
        });
        imgUploadEffectLevelElement.noUiSlider.on('update', () => {
          effectLevelValue.value = imgUploadEffectLevelElement.noUiSlider.get();
          imgUploadPreviewElement.style.filter = `grayscale(${effectLevelValue.value})`;
        });
      }

      if (element.value === 'sepia') {
        imgUploadEffectLevelElement.classList.remove('hidden');
        imgUploadEffectLevelElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 1,
          },
          start: 0.8,
          step: 0.1,
          connect: 'lower',
        });
        imgUploadEffectLevelElement.noUiSlider.on('update', () => {
          effectLevelValue.value = imgUploadEffectLevelElement.noUiSlider.get();
          imgUploadPreviewElement.style.filter = `sepia(${effectLevelValue.value})`;
        });
      }

      if (element.value === 'marvin') {
        imgUploadEffectLevelElement.classList.remove('hidden');
        imgUploadEffectLevelElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 100,
          },
          start: 90,
          step: 1,
          connect: 'lower',
        });
        imgUploadEffectLevelElement.noUiSlider.on('update', () => {
          effectLevelValue.value = imgUploadEffectLevelElement.noUiSlider.get();
          imgUploadPreviewElement.style.filter = `invert(${effectLevelValue.value}%)`;
        });
      }

      if (element.value === 'phobos') {
        imgUploadEffectLevelElement.classList.remove('hidden');
        imgUploadEffectLevelElement.noUiSlider.updateOptions({
          range: {
            min: 0,
            max: 3,
          },
          start: 2,
          step: 0.1,
          connect: 'lower',
        });
        imgUploadEffectLevelElement.noUiSlider.on('update', () => {
          effectLevelValue.value = imgUploadEffectLevelElement.noUiSlider.get();
          imgUploadPreviewElement.style.filter = `blur(${effectLevelValue.value}px)`;
        });
      }

      if (element.value === 'heat') {
        imgUploadEffectLevelElement.classList.remove('hidden');
        imgUploadEffectLevelElement.noUiSlider.updateOptions({
          range: {
            min: 1,
            max: 3,
          },
          start: 2,
          step: 0.1,
          connect: 'lower',
        });
        imgUploadEffectLevelElement.noUiSlider.on('update', () => {
          effectLevelValue.value = imgUploadEffectLevelElement.noUiSlider.get();
          imgUploadPreviewElement.style.filter = `brightness(${effectLevelValue.value})`;
        });
      }
    });
  }
}

selectEffect();


// скрытие модального окна по крестику
imgUploadCancelElement.addEventListener('click', () => {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  form.reset();
});

// скрытие модального окна Esc (при нахождении в поле ввода в комментарии или хештеге не сработает)
document.addEventListener('keydown', (evt) => {
  if (textDescriptionElement === document.activeElement || textHashtagsElement === document.activeElement) {
    return evt;
  } else {
    if (evt.key === 'Escape') {
      imgUploadOverlayElement.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
      form.reset();
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


