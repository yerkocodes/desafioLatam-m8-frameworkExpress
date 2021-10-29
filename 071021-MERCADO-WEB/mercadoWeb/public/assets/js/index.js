const botonModal = document.querySelectorAll('.botonModal');

for ( let i = 0; i < botonModal.length; i++ ) {
  //console.log(botonModal[i]);
  botonModal[i].addEventListener('click', async (e) => {
    e.preventDefault();
    //console.log(res);
    const resultado = e.target.href;
    addCart(resultado)
  });
}

const addCart = async (result) => {
    console.log(result);
    const data = await axios.get(result);
};
