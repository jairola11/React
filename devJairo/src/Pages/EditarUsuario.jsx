import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../components/Api";

const EditarUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({nombre_usuario:""});
  const navigate = useNavigate();

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const res = await api.get(`/buscar/${id}`);
        console.log(res);
        /* setUsuario({
          nombre: res.data.nombre_usuario,
          email: res.data.email,
          contrasena: res.data.,
          documento: res.data.documento,
          tipo: res.data.tipo
        }); */
        setUsuario(res.data);
        console.log(usuario, res.data[0]);
      } catch (e) {
        console.log("Error buscando el usuario", e);
      }
    };
    buscarUsuario();
  }, [id]);

  const handleEditUser = async () => {
    try {
      await api.put(`/editar/${id}`, usuario);
      navigate("/");
    } catch (e) {
      console.log("Error en handleEditUser", e);
    }
  };
  const handleDeleteUser = async () => {
    try {
      await api.patch(`/deshabilitar/${id}`, usuario);
      navigate("/");
    } catch (e) {
      console.log("Error en handleDeleteUser", e);
    }
  };

  return (
    <div>
      <h1 className="p-3 m-3 font-bold text-center underline text-3-xl">
        Editar Usuario
      </h1>
      <div className="max-w-xs">
        <input
          type="text"
          className="w-full p-2 m-2 text-gray-700 border rounded shadow appearance-none laeding-tight focus:outline-none focus:shodow-outline"
          id="nombre"
          name="nombre"
          defaultValue={usuario.length > 0 ? usuario[0].nombre_usuario : ""}
          placeholder="Ingrese nombre"
          onChange={(e)=>{
            setUsuario({...usuario, nombre_usuario: e.target.value})
          }}
        />
      </div>
      <div className="max-w-xs">
        <input
          type="text"
          className="w-full p-2 m-2 text-gray-700 border rounded shadow appearance-none laeding-tight focus:outline-none focus:shodow-outline"
          id="documento"
          name="documento"
          defaultValue={usuario.length > 0 ? usuario[0].documento_usuario : ""}
          placeholder="Ingrese Identificaciòn"
        />
      </div>
      <div className="max-w-xs">
        <input
          type="email"
          className="w-full p-2 m-2 text-gray-700 border rounded shadow appearance-none laeding-tight focus:outline-none focus:shodow-outline"
          id="email"
          name="email"
          defaultValue={usuario.length > 0 ? usuario[0].email_usuario : ""}
          placeholder="Ingrese email"
        />
      </div>
      <div className="max-w-xs">
        <input
          type="password"
          className="w-full p-2 m-2 text-gray-700 border rounded shadow appearance-none laeding-tight focus:outline-none focus:shodow-outline"
          id="contraseña"
          name="contraseña"
          defaultValue={usuario.length > 0 ? usuario[0].contrasena_usuario : ""}
          placeholder="ingrese la contraseña"
        />
      </div>
      <div className="max-w-xs">
        <select
          name="tipo"
          id="tipo"
          className="w-full p-2 m-2 text-gray-700 border rounded shadow appearance-none laeding-tight focus:outline-none focus:shodow-outline"
          defaultValue={usuario.length > 0 ? usuario[0].tipo_usuario : ""}
        >
          <option value="">Seleccione un Rol</option>
          <option value="coadministrador">Co-Administrador</option>
          <option value="administrador">Administrador</option>
        </select>
      </div>
      <button
        className="p-2 m-2 font-bold text-white bg-green-500 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline"
        type="submit"
        onClick={handleEditUser}
      >
        Editar Usuario
      </button>
      <button
        className="p-2 m-2 font-bold text-white rounded bg-rose-500 hover:bg-rose-700 focus:outline-none focus:shadow-outline"
        type="submit"
        onClick={handleDeleteUser}
      >
        Eliminar Usuario
      </button>
    </div>
  );
};

export default EditarUsuario;
