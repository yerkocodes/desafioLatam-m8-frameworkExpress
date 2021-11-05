const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const formLogin = document.getElementById('formLogin');
const URL = 'http://localhost:3000';

const checkStatus = async (id, inputMarkup) => {
  const check = inputMarkup.checked;
  axios.put(`${URL}/checkAuth`, {
    id,
    check,
  })
  // TO-DO : Mostrar mensaje que se cambio el estado del Skater.
};

formLogin.addEventListener('submit', (e) => {
  e.preventDefault();
  loginEmail;
  loginPassword;

  axios.post(`${URL}/authLogin`, {
    email: loginEmail.value,
    password: loginPassword.value,
  })
    .then((token) => {
      //console.log(token.data);
      const jwt = token.data;
      window.location.href=`/authLogin/${jwt}`;
    })
})

