const NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия'
];

const MASSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const SIMILAR_PHOTOSPECIFICATION_COUNT = 25;

// генерирует массив от 1 до SIMILAR_PHOTOSPECIFICATION_COUNT
const usersId = Array.from({ length: SIMILAR_PHOTOSPECIFICATION_COUNT }, (v, i) => i + 1);

// генерирует случайное число в диапазоне min-max
const randomInt = function (min, max) {
    try {
      if (min < max && min >= 0) {
        return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
      }

      throw new Error('Диапазон задан некорректно');

    } catch (e) {
  }
};


// выбирает рандомный элемент из переданного массиива
const getRandomArrayElement = (elem) => {
  return elem[randomInt(0, elem.length - 1)]
};

// создает массив обьектов в кол-ве SIMILAR_PHOTOSPECIFICATION_COUNT
const createPhotoSpecification = () => {
  const arr = [];
  for (let i = 0; i < SIMILAR_PHOTOSPECIFICATION_COUNT; i++) {

    arr.push({
      id: usersId[i],
      url: `photos/${usersId[i]}.jpg`,
      description: `foto №${usersId[i]}`,
      likes: randomInt(15, 200),

      comments: {
        id: usersId[i] + 100,
        avatar: `img/avatar-${randomInt(1, 6)}.svg`,
        message: getRandomArrayElement(MASSAGES),
        name: getRandomArrayElement(NAMES)
      }
    });
  }

  return arr;
};


createPhotoSpecification();


// проверяет длинну коментария
const isCommentMaxLengthExceeded = function (str = '', maxLegth = 140) {
  return str.length <= maxLegth;
};

isCommentMaxLengthExceeded();
