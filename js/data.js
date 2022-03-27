import { randomInt, getRandomArrayElement, getRandomId } from './util.js';

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

// создает обьект с комментариями к фото
let idCom = 1;

const createComments = () => ({
  id: idCom++,
  avatar: `img/avatar-${randomInt(1, 6)}.svg`,
  message: getRandomArrayElement(MASSAGES),
  name: getRandomArrayElement(NAMES)
});

// создает обьект описания фото с комментариями
const createPhotoSpecification = () => {
  const id = getRandomId(usersId);
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `foto №${id}`,
    likes: randomInt(15, 200),

    comments: Array.from({length: randomInt(1, 20)}, createComments)
  };
};

const createPhotos = () => Array.from({ length: SIMILAR_PHOTOSPECIFICATION_COUNT }, createPhotoSpecification);

export {createPhotos};
