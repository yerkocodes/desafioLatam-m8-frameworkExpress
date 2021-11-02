const botonModal = document.querySelectorAll('.botonModal');
let tbody = document.getElementById('cuerpo');

for ( let i = 0; i < botonModal.length; i++ ) {
  //console.log(botonModal[i]);
  botonModal[i].addEventListener('click', async (e) => {
    e.preventDefault();
    //console.log(res);
    const resultado = e.target.href;
    addCart(resultado);
    getCompras();
  });
}

const addCart = async (result) => {
  console.log(result);
  const data = await axios.get(result);
  $("#exampleModal").modal("show");
};

const getCompras = async () => {  // TO DO!!!
  try {
    //tbody.innerHTML = "";
    const data = await axios.get('http://localhost:3000/modal')
    let arrayCart = data.data.rows;
    
    arrayCart.forEach((p, i) => {
      //console.log(i + ' *** ' + p.product)
       tbody.innerHTML += `
          <tr>
            <th scope="row">${i + 1}</th>
            <td>${p.product}</td>
          </tr>
      `;
    });
  } catch ( err ) {
    console.log(err.message);
  };
};

    //getCompras();
