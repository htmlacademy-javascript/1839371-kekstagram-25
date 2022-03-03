// генерирует случайное число в диапазоне min-max
const randomInt = function (min, max) {
  try {
    if (min >= 0 && min <= max) {
      return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
    }

    throw new Error('Диапазон задан некорректно');

  } catch (e) {
      console.log(e);
  }

};

// выбирает рандомный элемент из переданного массиива
const getRandomArrayElement = elem => {
  return elem[randomInt(0, elem.length - 1)];
};

// возвращает и удаляет рандомыный элемент из массива
function getRandomId(arr) {
  const i = randomInt(0, arr.length - 1);
  const randomId = arr[i];
  arr.splice(i, 1);
  return randomId;
}

export {randomInt, getRandomArrayElement, getRandomId};

// проверяет длинну коментария
const isCommentMaxLengthExceeded = function (str = '', maxLegth = 140) {
  return str.length <= maxLegth;
};

isCommentMaxLengthExceeded();
