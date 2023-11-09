import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../components/Api";

const EditarUsuario = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState({ nombre:"" , email: "", contrasena_usuario:"", documento: "", rol: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        const res = await api.get(`/buscar/${id}`);
        /* setUsuario({
          nombre: res.data.nombre_usuario,
          email: res.data.email,
          contrasena: res.data.,
          documento: res.data.documento,
          tipo: res.data.tipo
        }); */
        setUsuario(res.data);
        console.log(res.data.contrasena_usuario);
      } catch (e) {
        console.log("Error buscando el usuario", e);
      }
    };  
    buscarUsuario();
  }, [id]);

  const handleEditUser = async () => {
    try {
      await api.put(`/editar/${id}`,usuario);
      navigate("/")
    } catch (e) {
      console.log("Error en handleEditUser", e);
    }
  };
  const handleDeleteUser = async () => {
    try {
      await api.patch(`/deshabilitar/${id}`,usuario);
      navigate("/")
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
          placeholder="Ingrese nombre"
          value={usuario.nombre  ||""}
          onChange={(e) => {
            setUsuario({ ...usuario, nombre: e.target.value });
          }}
        />
      </div>
      <div className="max-w-xs">
        <input
          type="text"
          className="w-full p-2 m-2 text-gray-700 border rounded shadow appearance-none laeding-tight focus:outline-none focus:shodow-outline"
          id="documento"
          name="documento"
          placeholder="Ingrese Identificaciòn"
          value={usuario.documento ||""}
          onChange={(e) => {
            setUsuario({ ...usuario, documento: e.target.value });
          }}
        />
      </div>
      <div className="max-w-xs">
        <input
          type="email"
          className="w-full p-2 m-2 text-gray-700 border rounded shadow appearance-none laeding-tight focus:outline-none focus:shodow-outline"
          id="email"
          name="email"
          placeholder="Ingrese email"
          value={usuario.email  ||""}
          onChange={(e) => {
            setUsuario({ ...usuario, email: e.target.value });
          }}
        />
      </div>
      <div className="max-w-xs">
        <input
          type="password"
          className="w-full p-2 m-2 text-gray-700 border rounded shadow appearance-none laeding-tight focus:outline-none focus:shodow-outline"
          id="contraseña"
          name="contraseña"
          placeholder="ingrese la contraseña"
          value={usuario.contraseña  ||""}
          onChange={(e) => {
            setUsuario({ ...usuario, contraseña: e.target.value });
          }}
        /> 
      </div> 
      <div className="max-w-xs">
        <select name="tipo" id="tipo" className="w-full p-2 m-2 text-gray-700 border rounded shadow appearance-none laeding-tight focus:outline-none focus:shodow-outline"
        value={usuario.tipo  ||""}
        onChange={(e) => {
          setUsuario({ ...usuario, tipo: e.target.value });
        }}>
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

