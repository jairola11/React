var ModalJuego = new bootstrap.Modal(document.getElementById('ModalJuego'), {
    keyboard: false
});

var ModalJuegoActualizar = new bootstrap.Modal(document.getElementById('ModalJuegoActualizar'), {
    keyboard: false
});

listarJuegos();

function listarJuegos() {
    
    fetch('http://localhost:4000/juego/listardatos', {
        method: 'get'
    })
        .then(resp => resp.json())
        .then(data => {
            let filas = '';
            let imageUrl="./api/public/img"
            data.forEach(element => {
            let imageUrl=`../api/public/img/${element.imagen}`

                filas += `<tr>
                            <td>${element.idjuego}</td>
                            <td>${element.nombre}</td>
                            <td>${element.descripcion}</td>
                            <td><img src="${imageUrl}" style="width: 100px;" alt="Img del juego"></td>
                            <td>${element.precio}</td>
                            <td><a href="javaScript:eliminarJuego(${element.idjuego});">Eliminar</a></td>
                            <td><a href="javaScript:mostrarActualizarJuego(${element.idjuego});">Actualizar</a></td>
                            </tr>`
            });
            document.getElementById('tabla-juegos').innerHTML = filas;
        })
        .catch(err => console.log(err))
}

function nuevoJuego() {
    ModalJuego.show();
}

function registrarJuego() {
    const formdata = new FormData();
    const fileInput = document.getElementById('img');
    if (fileInput.files.length > 0) {
        formdata.append('img', fileInput.files[0]);
    }
    formdata.append('nombre', document.getElementById('nombre').value);
    formdata.append('descripcion', document.getElementById('descripcion').value);
    formdata.append('precio', document.getElementById('Precio').value);
    fetch('http://localhost:4000/juego/ingresar', {
        method: 'POST',
        body: formdata
    })
        .then(resp => resp.json())
        .then(data => {
            listarJuegos();
            ModalJuego.hide();
            swal.fire({
                title: "Juego registrado",
                text: data.message,
                icon: "success",
                ConfirmButtonText: "Cerrar"
            })
        })
}

function seleccionarJuego(id) {
    ModalJuego.show();
    
    buscarJuego(id);
}

function buscarJuego(id) {
    fetch(`http://localhost:4000/juego/buscar/${id}`, {
        method: 'GET'
    })
        .then(resp => resp.json())
        .then(data => {
    console.log(Precio);

            document.getElementById('nombre2').value = data[0].nombre;
            document.getElementById('descripcion2').value = data[0].descripcion;
            // document.getElementById('img2').value = data[0].img;
            document.getElementById('precio2').value = data[0].precio;
        })
        .catch(err => console.log(err));
}

function mostrarActualizarJuego(id) {
    ModalJuegoActualizar.show(id);
    buscarJuego(id);
    document.getElementById('idjuego').value = id;
}

function actualizarJuego() {
    const idformulario = document.getElementById("idformulario")
    const formdata = new FormData(document.getElementById("idformulario"));
    const idhoy = document.getElementById('idjuego').value;

    fetch(`http://localhost:4000/juego/actualizar/${idhoy}`, {
        method: 'PUT',
        body: formdata
    })
        .then(resp => resp.json())
        .then(data => {
            listarJuegos();
            ModalJuegoActualizar.hide();
            swal.fire({
                title: "Usuario Actualizado",
                text: data.message,
                icon: "success",
                ConfirmButtonText: "Cerrar"
            })
        })
}

function eliminarJuego(id) {
    fetch(`http://localhost:4000/juego/eliminar/${id}`, {
        method: 'DELETE',
    })
        .then(resp => {
            if (resp.status == 200) {
                return resp.json();
            }
            if (resp.status == 500) {
                swal.fire({
                    title: "Mensaje",
                    text: data.message,
                    icon: "success",
                    ConfirmButtonText: "Cerrar"
                });
            }
            return resp.json();
        })
        .then(data => {
            listarJuegos();
            swal.fire({
                title: "Se eliminó el juego con éxito",
                text: data.message,
                icon: "success",
                ConfirmButtonText: "Cerrar"
            })
        })
}