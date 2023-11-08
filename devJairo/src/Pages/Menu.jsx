import React from "react";
import { Outlet,Link } from "react-router-dom";

export const Menu = () =>{
  return (
    <div>
      <nav className="bg-green-500 p-4">
        <ul className="flex space-x-4 text-white">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/nosotros">nosotros</Link></li>
          <li><Link to="/contactenos">contactenos</Link></li>
          {/* <li><Link to="/usuarios">Usuarios</Link></li> */}
          <li><Link to="/crearusuario">Crear Usuario</Link></li>
        </ul>
      </nav>
      <Outlet/>
    </div>
  );
}