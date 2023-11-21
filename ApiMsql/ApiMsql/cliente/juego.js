function listarJuego() {
  fetch("http://localhost:3000/juego/listar", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let fila = "";
      data.forEach((element) => {
        fila += `<tr> 
          <td> ${element.id_juego} </td> 
          <td> ${element.nombre} </td> 
          <td> ${element.descripcion} </td> 
          <td> <img src='/public/img/${element.imagen}' alt='imagen' style='max-width:100px; max-height:100px;'> </td> 
          <td> ${element.precio} </td> 
          <td> <a href='javascript:eliminarJuego(${element.id_juego});' class="btn btn-danger"> Eliminar </a> </td> 
          <td> <a href='javascript:buscarJuego(${element.id_juego});' class="btn btn-success">Actualizar </a> </td> 
        </tr> `;
      });
      document.getElementById("tabla-juegos").innerHTML = fila;
    })
    .catch((e) => {
      console.log(e);
    });
}
listarJuego();

let ModalJuego = new bootstrap.Modal(document.getElementById("ModalJuego"), {
  keyboard: false,
});

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

function nuevoJuego() {
  ModalJuego.show();
  limpiarFormulario();
  document.getElementById("btnupdate").style.display = "none";
  document.getElementById("btnsave").style.display = "block";
}
function guardarJuego() {
  let datos = new URLSearchParams();
  datos.append("nombre", document.getElementById("nombre").value);
  datos.append("descripcion", document.getElementById("descripcion").value);
  // datos.append("ima", document.getElementById("imagen").value);
  datos.append("precio", document.getElementById("precio").value);
  fetch("http://localhost:3000/juego/registrar", {
    method: "POST",
    body: datos
  })
    .then((res) => res.json())
    .then((data) => {
      listarJuego();
      ModalJuego.hide();
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      })
    })
    .catch((error) => {
      console.error('Error during fetch:', error);
    })
}
function eliminarJuego(id) {
  fetch(`http://localhost:3000/juego/eliminar/${id} `, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      listarJuego();
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
    });
}
function selecionar(id_juego) {
  limpiarFormulario();
  buscarJuego();
  document.getElementById("id_juego").value = id_juego;
  ModalJuego.show();
}
function buscarJuego(id_juego) {
  document.getElementById("btnupdate").style.display = "block";
  document.getElementById("btnsave").style.display = "none";
  fetch(`http://localhost:3000/juego/buscar/${id_juego}`, {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("nombre").value = data[0].nombre;
      document.getElementById("descripcion").value = data[0].descripcion;
      // document.getElementById("imagen").value = data[0].imagen;
      document.getElementById("precio").value = data[0].precio;
      ModalJuego.show();
      document.getElementById("id_juego").value = id_juego;
    })
    .catch((err) => {
      console.log(err);
    });
}

function actualizarJuego() {
  let datos = new URLSearchParams();
  let id = document.getElementById("id_juego").value;
  datos.append("nombre", document.getElementById("nombre").value);
  datos.append("descripcion", document.getElementById("descripcion").value);
  // datos.append("imagen", document.getElementById("imagen").value);
  datos.append("precio", document.getElementById("precio").value);
  fetch(`http://localhost:3000/juego/actualizar/${id}`, {
    method: "PUT",
    body: datos,
  })
    .then((res) => res.json())
    .then((data) => {
      listarJuego();
      ModalJuego.hide();
      Toast.fire({
        icon: "success",
        title: "actualizado",
      });
    });
}

function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("imagen").value = "";
  document.getElementById("precio").value = "";
}
