function randomInt(min, max) {

  try {
    if (min < max && min >= 0) {
      return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
    }

    throw new Error('Диапазон задан некорректно');

  } catch (e) {
    console.log(e.message);
  }
}


function isCommentMaxLengthExceeded(str = '', maxLegth = 140) {

  return str.length <= maxLegth;

}


randomInt(1, 4);
isCommentMaxLengthExceeded();

