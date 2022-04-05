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

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {showAlertSuccess, showAlertError, debounce};
