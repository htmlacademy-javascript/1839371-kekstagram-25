const effectsRadioElements = document.querySelectorAll('.effects__radio');
const imgUploadEffectLevelElement = document.querySelector('.img-upload__effect-level');
const effectLevelValue = imgUploadEffectLevelElement.querySelector('.effect-level__value');
const imgUploadPreviewElement = document.querySelector('#img-upload__preview');

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

imgUploadEffectLevelElement.classList.add('hidden');

// изменение эффекта фотки
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
