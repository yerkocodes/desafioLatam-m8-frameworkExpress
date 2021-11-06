const emailRegister = document.getElementById('formEmail');
const nameRegister = document.getElementById('formName');
const passRegister = document.getElementById('formPass');
const passTwoRegister = document.getElementById('formPassTwo');
const experienceRegister = document.getElementById('formExperience');
const specialtyRegister = document.getElementById('formSpecialty');
//const imgRegister = document.getElementById('formPic');

const formRegister = document.getElementById('formRegister');

formRegister.addEventListener('submit', async (e) => {
  e.preventDefault();

  emailRegister;
  nameRegister;
  passRegister;
  passTwoRegister;
  experienceRegister;
  specialtyRegister;
  //imgRegister;

  const data = {
    email: emailRegister.value,
    name: nameRegister.value,
    pass: passRegister.value,
    experience: experienceRegister.value,
    specialty: specialtyRegister.value,
    //img: imgRegister.value, // TO DO
  };
  
  if( passRegister.value == passTwoRegister.value ) {
    axios.post('/registro', data)
  } else {
    alert('Las contrasenas no son iguales.');
  };

console.log(data)

});
