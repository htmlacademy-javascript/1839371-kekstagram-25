const TIME_DELAY = 500;

// сообщение об ошибки отправки сообщения
const showAlertError = () => {

  const alertContainer = document.querySelector('#error').content.querySelector('.error');
  document.body.append(alertContainer);

};

//сообщение при удачной отправки сообщения
const showAlertSuccess = () => {

  const alertContainer = document.querySelector('#success').content.querySelector('.success');
  document.body.append(alertContainer);

};

//устранение дребезга

const debounce = (callback, timeoutDelay = TIME_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const showAlertErrorGetData = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);
};

export {showAlertSuccess, showAlertError, debounce, showAlertErrorGetData};
