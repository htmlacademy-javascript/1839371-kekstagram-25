function randomInt(min, max) {

  return (min < max && min >= 0) ? Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min : 'Диапазон задан некорректно';

}


function commentLength(str, maxLegth = 140) {

  return str.length <= maxLegth;

}


randomInt();
commentLength();

