let url = "http://localhost:3000/curso";
let tbody = document.getElementById("cuerpo");
let nombre = document.getElementById("nombre");
let nivelTecnico = document.getElementById("nivelTecnico");
let fechaInicio = document.getElementById("fechaInicio");
let duracion = document.getElementById("duracion");

let cursos = [];
window.onload = getData();

async function getData() {
  await axios.get(url + "s").then((data) => {
    cursos = data.data;
    console.log(typeof(cursos));
    console.log(cursos);
    tbody.innerHTML = "";
    cursos.forEach((c, i) => {
      tbody.innerHTML += `
        <tr>
          <td>${i + 1}</td>
          <td>${c.nombre}</td>
          <td>${c.nivel}</td>
          <td>${c.fecha}</td>
          <td>${c.duracion}</td>
          <td>
            <button class="btn btn-warning" onclick="prepararCurso(${i},'${
          c.id
        }')">Editar</button>
            <button class="btn btn-danger" onclick="eliminarCurso(${i},'${
          c.id
        }')">Eliminar</button>
          </td>
        </tr>
      `;
    });
  });
  nombre.value = "";
  nivelTecnico.value = "";
  fechaInicio.value = "";
  duracion.value = "";
}

function nuevoCurso() {
  nombre;
  nivelTecnico;
  fechaInicio;
  duracion;
  let data = {
    nombre: nombre.value,
    nivelTecnico: nivelTecnico.value,
    fechaInicio: fechaInicio.value,
    duracion: duracion.value,
  };
  console.log(data);
  axios.post(url, data).then(() => getData());
}

function eliminarCurso(i, nombre) {
  axios.delete(url + "/" + nombre).then(() => {
    alert("Curso " + nombre + " eliminado");
    getData();
  });
}

function prepararCurso(i, id) {
  console.log(cursos);
  nombre.value = cursos[i].nombre;
  nivelTecnico.value = cursos[i].nivel;
  fechaInicio.value = cursos[i].fecha;
  duracion.value = cursos[i].duracion;
  document
    .getElementById("editar")
    .setAttribute("onclick", `editarCurso('${id}')`);
  document.getElementById("agregar").style.display = "none";
  document.getElementById("editar").style.display = "block";
}

function editarCurso(id) {
  axios
    .put(url + '/' + id, {
      nombre: nombre.value,
      nivelTecnico: nivelTecnico.value,
      fechaInicio: fechaInicio.value,
      duracion: duracion.value,
    })
    .then(() => {
      getData();
      document.getElementById("agregar").style.display = "block";
      document.getElementById("editar").style.display = "none";
    });
}

