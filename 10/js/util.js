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

export {showAlertSuccess, showAlertError};
