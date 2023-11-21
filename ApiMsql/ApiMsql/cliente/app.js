

function listarUsuario() {
  fetch("http://localhost:3000/usuario/listar", {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let fila = "";
      data.forEach((element) => {
        fila += `<tr> 
                 <td> ${element.id_usuario} </td> 
                 <td> ${element.nombres} </td> 
                 <td> ${element.direccion} </td> 
                 <td> ${element.telefono} </td> 
                 <td> ${element.correo} </td> 
                 <td> ${element.rol} </td> 
                 <td> <a href='javascript:eliminarUsuario(${element.id_usuario});' class="btn btn-danger"> Eliminar </a> </td> 
                 <td> <a href='javascript:buscarUsuario (${element.id_usuario});' class="btn btn-success   ">Actualizar </a> </td> 
      </tr> `;
      });
      document.getElementById("tabla-usuario").innerHTML = fila;
    })
    .catch((e) => {
      console.log(e);
    });
}
listarUsuario();

let ModalUsuario = new bootstrap.Modal(document.getElementById('ModalUsuario'), {
  keyboard: false,
});
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

function nuevoUsuario() {
  ModalUsuario.show();
  limpiarFormulario()
  document.getElementById('btnupdate').style.display='none'
  document.getElementById('btnsave').style.display='block'
}
function guardarUsuario() {
  let datos = new URLSearchParams();
  datos.append('nombres', document.getElementById('nombres').value);
  datos.append('direccion', document.getElementById('direccion').value);
  datos.append('telefono', document.getElementById('telefono').value);
  datos.append('correo', document.getElementById('correo').value);
  datos.append('rol', document.getElementById('rol').value);
  fetch('http://localhost:3000/usuario/registrar', {
    method: 'POST',
    body: datos,
  })
    .then(res => res.json())
    .then(data => {
      listarUsuario()
      ModalUsuario.hide();
      Toast.fire({
        icon: 'success',
        title: 'Signed in successfully'
      })
    });
}
function eliminarUsuario(id) {
fetch(`http://localhost:3000/usuario/eliminar/${id} `,
{
 method:'delete',
}
)
.then(res=>res.json())
.then(data=>{
  listarUsuario()   
  Toast.fire({
    icon: 'success',
    title: 'Signed in successfully'
  })
} )
}
function selecionar(id_usuario) {
  limpiarFormulario();
  buscarUsuario();
  document.getElementById('id_usuario').value=id_usuario
  ModalUsuario.show();
}
function buscarUsuario(id_usuario) {
  document.getElementById('btnupdate').style.display='block'
  document.getElementById('btnsave').style.display='none'
  fetch(`http://localhost:3000/usuario/buscar/${id_usuario}`, {
    method: "get",
  })
    .then((res) => res.json())
    .then((data) => {
     
        document.getElementById('nombres').value=data[0].nombres;
        document.getElementById('direccion').value=data[0].direccion;
        document.getElementById('telefono').value=data[0].telefono;
        document.getElementById('correo').value=data[0].correo;
        document.getElementById('rol').value=data[0].rol;
        ModalUsuario.show();
        document.getElementById('id_usuario').value=id_usuario;
       

    }).catch(err=>{console.log(err);});
  }

  function actualizarUsuario() {
    let datos = new URLSearchParams();
   let id=document.getElementById('id_usuario').value;
    datos.append('nombres', document.getElementById('nombres').value);
    datos.append('direccion', document.getElementById('direccion').value);
    datos.append('telefono', document.getElementById('telefono').value);
    datos.append('correo', document.getElementById('correo').value);
    datos.append('rol', document.getElementById('rol').value);
    fetch(`http://localhost:3000/usuario/actualizar/${id}`, {
      method: 'PUT',
      body: datos
    })
      .then(res => res.json())
      .then(data => {
        listarUsuario()
        ModalUsuario.hide();
        Toast.fire({
          icon: 'success',
          title: 'actualizado'
        })
      });
  }
  function eliminarUsuario(id) {
  fetch(`http://localhost:3000/usuario/eliminar/${id} `,
  {
   method:'delete',
  }
  )
  .then(res=>res.json())
  .then(data=>{
    listarUsuario()   
    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
  } )
  }
function limpiarFormulario() {
  document.getElementById('nombres').value="";
  document.getElementById('direccion').value="";
  document.getElementById('telefono').value="";
  document.getElementById('correo').value="";
  document.getElementById('rol').value="";
}