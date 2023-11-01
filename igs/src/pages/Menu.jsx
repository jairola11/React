import { Outlet,Link } from "react-router-dom";
 import React from 'react'
 
 export const Menu = ()=> {
   return (
     <div>
      <nav className="bg-green-600 p-4">
        <ul className=" flex space-x-4 text-white  ">
        <li ><Link to="/">Inicio</Link></li>
         <li ><Link to="/nosotros">Nosotros</Link> </li>
         <li><Link to="/contactenos">Contactanos </Link></li>
        </ul>
      </nav>
      <Outlet />
     </div>
   )
 }
 