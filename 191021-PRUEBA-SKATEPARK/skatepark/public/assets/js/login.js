const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const formLogin = document.getElementById('formLogin');
const alertMissingUser = document.getElementById('alert');
const URL = 'http://localhost:3000';

window.onload = () => {
  console.log('onload funkchion');
  localStorage.clear();
};

formLogin.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginEmail;
  loginPassword;

  axios.post(`${URL}/authLogin`, {
    email: loginEmail.value,
    password: loginPassword.value,
  })
    .then((token) => {
      const jwt = token.data;
      if ( jwt ) {
        localStorage.setItem('Sk8token', jwt);
        window.location.href=`/authLogin?token=${jwt}`;
        console.log(jwt);
      } else {
        alertMissingUser.innerHTML = '<p style="color:red;"> Usuario o contraseñas incorrectas. </p>'
        loginEmail.value = "";
        loginPassword.value = "";
      };
    })
})

