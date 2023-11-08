import React, { useEffect, useRef } from "react";
import api from '../components/Api'
import { useNavigate } from 'react-router-dom'

const crearUsuario = () => {
  const name = useRef();
  const cedula = useRef();
  const email = useRef();
  const password = useRef();
  const rol = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    name.current.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      nombre: name.current.value,
      documento: cedula.current.value,
      email: email.current.value,
      contraseña: password.current.value,
      tipo: rol.current.value
    };
    api.post('/registrar', data, {}).finally(() => {
      navigate('/');
    });
  };

  return (
    <div className="h-screen flex items-center justify-center" style={{ background: "#E6F6E2" }}>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold mb-4">Crear Usuario</h1>
        <div className="mb-4">
          <input type="text" className="w-full border rounded-full p-2" id="name" name="name" ref={name} placeholder="Ingrese nombre" />
        </div>
        <div className="mb-4">
          <input type="number" className="w-full border rounded-full p-2" id="cedula" name="cedula" ref={cedula} placeholder="Ingrese el documento" />
        </div>
        <div className="mb-4">
          <input type="email" className="w-full border rounded-full p-2" id="email" name="email" ref={email} placeholder="Ingrese email" />
        </div>
        <div className="mb-4">
          <input type="password" className="w-full border rounded-full p-2" id="password" name="password" ref={password} placeholder="Ingrese Contraseña" />
        </div>
        <div className="mb-4">
          <select ref={rol} className="w-full border rounded-full p-2" name="rol" id="rol">
            <option value="coadministrador">Co-Administrador</option>
            <option value="administrador">Administrador</option>
          </select>
        </div>
        <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold p-2 rounded-full focus:outline-none focus:shadow-outline" type="submit">Registrar Usuario</button>
      </form>
    </div>
  );
};

export default crearUsuario;
