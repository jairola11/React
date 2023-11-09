import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../components/Api";

const EditarUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({
    nombre_usuario: "",
    documento_usuario: "",
    email_usuario: "",
    contrasena_usuario: "",
    tipo_usuario: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const response = await api.get(`/buscar/${id}`);
        console.log(response.data);
        setUsuario(response.data[0]);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario({ ...usuario, [name]: value });
  };

  return (
    <div>
      <h1 className="p-3 m-3 font-bold text-center underline text-3xl">
        Editar Usuario
      </h1>
      <div className="max-w-xs">
        <input
          type="text"
          className="w-full p-2 m-2 text-gray-700 border rounded shadow appearance-none leading-tight focus:outline-none focus:shadow-outline"
          id="nombre_usuario"
          name="nombre_usuario"
          value={usuario.nombre_usuario}
          placeholder="Ingrese nombre"
          onChange={handleInputChange}
        />
      </div>
      <div className="max-w-xs">
        <input
          type="text"
          className="w-full p-2 m-2 text-gray-700 border rounded shadow appearance-none leading-tight focus:outline-none focus:shadow-outline"
          id="documento_usuario"
          name="documento_usuario"
          value={usuario.documento_usuario}
          placeholder="Ingrese Identificación"
          onChange={handleInputChange}
        />
      </div>
      <div className="max-w-xs">
        <input
          type="email"
          className="w-full p-2 m-2 text-gray-700 border rounded shadow appearance-none leading-tight focus:outline-none focus:shadow-outline"
          id="email_usuario"
          name="email_usuario"
          value={usuario.email_usuario}
          placeholder="Ingrese email"
          onChange={handleInputChange}
        />
      </div>
      <div className="max-w-xs">
        <input
          type="password"
          className="w-full p-2 m-2 text-gray-700 border rounded shadow appearance-none leading-tight focus:outline-none focus:shadow-outline"
          id="contrasena_usuario"
          name="contrasena_usuario"
          value={usuario.contrasena_usuario}
          placeholder="Ingrese la contraseña"
          onChange={handleInputChange}
        />
      </div>
      <div className="max-w-xs">
        <select
          name="tipo_usuario"
          id="tipo_usuario"
          className="w-full p-2 m-2 text-gray-700 border rounded shadow appearance-none leading-tight focus:outline-none focus:shadow-outline"
          value={usuario.tipo_usuario}
          onChange={handleInputChange}
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
