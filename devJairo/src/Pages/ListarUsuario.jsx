import React, { useEffect, useState } from "react";
import api from '../components/Api';
import { Link } from "react-router-dom";

const Listar = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await api.get('/listar');
        setUsuarios(response.data);
      } catch (e) {
        console.error('Error fetching usuarios:', e);
      }
    };
    fetchUsuarios();
  }, []);

  const handleDelete = (id) => {
    // Implementa la lógica para eliminar el usuario con el ID proporcionado
  };

  return (
    <div className="m-3 p-3">
      <h1 className="text-center font-bold underline text-3xl">Usuarios</h1>
      <table className="w-full border-collapse border border-gray-400 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 p-2">Documento</th>
            <th className="border border-gray-400 p-2">Nombre</th>
            <th className="border border-gray-400 p-2">Email</th>
            <th className="border border-gray-400 p-2">Tipo</th>
            <th className="border border-gray-400 p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id_usuario}>
              <td className="border border-gray-400 p-2">
                <Link to={`/edit/${usuario.id_usuario}`}>{usuario.documento_usuario}</Link>
              </td>
              <td className="border border-gray-400 p-2">{usuario.nombre_usuario}</td>
              <td className="border border-gray-400 p-2">{usuario.email_usuario}</td>
              <td className="border border-gray-400 p-2">{usuario.tipo_usuario}</td>
              <td className="border border-gray-400 p-2">
                <Link to={`/edit/${usuario.id_usuario}`}>
                <button className="bg-green-500 text-white px-2 py-1 m-1 rounded-full">Actualizar</button>

                </Link>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Listar;
