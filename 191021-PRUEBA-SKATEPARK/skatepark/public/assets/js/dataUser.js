const URL = 'http://localhost:3000';

//Formulario Datos del perfil Skater
//const formDataSkater = document.getElementById('formDataSkater');
const formDataName = document.getElementById('formDataName');
const formDataPassword = document.getElementById('formDataPassword');
const formDataPasswordTwo = document.getElementById('formDataPasswordTwo');
const formDataExperience = document.getElementById('formDataExperience');
const formDataSpecialty = document.getElementById('formDataSpecialty');

const btnUpdateSkater = document.getElementById('updateSkater');

btnUpdateSkater.addEventListener('click', async (e) => {
  console.log('entrando a updateSkater');
  e.preventDefault();

  const id = btnUpdateSkater.getAttribute('idskater');
  console.log(id)

  formDataName;
  formDataPassword;
  formDataPasswordTwo;
  formDataExperience;
  formDataSpecialty;
  
  const data = {
    id: id,
    name: formDataName.value,
    pass: formDataPassword.value,
    passTwo: formDataPasswordTwo.value,
    experience: formDataExperience.value,
    specialty: formDataSpecialty.value,
  };

  if ( data.pass == data.passTwo ) {
    axios.put(`${URL}/updateSkater`, data)
      .then((data) => {
        data ? alert('La informacion fue actualizada con exito') : alert('Ocurrio un error y no se pudo actualizar la informacion.');
      });
    
  } else {
    alert('Las contrasenas debes ser las mismas.');
  }
})

const btnDeleteSkater = document.getElementById('deleteSkater');

btnDeleteSkater.addEventListener('click', (e) => {
  e.preventDefault();

  const id = btnDeleteSkater.getAttribute('idskater');

  if(confirm('¿Está seguro de que desea eliminar su cuenta?')) {
    axios.delete(`${URL}/deleteSkater/${id}`)
      .then((data) => {
        data ? window.location.href="/" : alert('No se logro eliminar la cuenta');
      })
  } else {
    location.reload();
  };
  
});
