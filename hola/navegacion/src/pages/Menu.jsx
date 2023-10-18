import React from "react";
import { Outlet,Link } from "react-router-dom";
export const Menu =()=>{
  return(
    <div>
      <nav className="bg-blue-500 p-4">
        <ul className=" flex space-x-4 text-white">
         <li><Link to="/">Inicio</Link></li>
         <li><Link to="/nosotros">Nosotros</Link> </li>
         <li><Link to="/contactenos">Contactanos </Link></li>
         <li><Link to="/Usuarios">Usuarios</Link></li>
         <li><Link to="/ListarUsuario">CrearUsuarios</Link></li>
         <li><Link to="/EditarUsuario">editar</Link></li>
         
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}
