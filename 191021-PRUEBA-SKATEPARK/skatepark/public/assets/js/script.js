const URL = 'http://localhost:3000';

const checkStatus = async (id, inputMarkup) => {
  const check = inputMarkup.checked;
  axios.put(`${URL}/checkAuth`, {
    id,
    check,
  })
  // TO-DO : Mostrar mensaje que se cambio el estado del Skater.
};
