const getData = (onSuccess, showAlertErrorGetData) => () => fetch(
  'https://25.javascript.pages.academy/kekstagram/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }

    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((photos) => {
    onSuccess(photos);
  })
  .catch(() => {
    showAlertErrorGetData('Не удалось загрузить фото');
  });

export {getData};


