import { Route, Routes } from "react-router-dom";
import React from "react";
import Inicio from "./pages/Inicio";
import Nosotros from "./pages/Nosotros";
import Contactenos from "./pages/Contactenos";
import { Menu } from "./pages/Menu";
import ListarProveedor from "./pages/ListarProdevor";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Menu />}>
          <Route path="/" element={<ListarProveedor />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contactenos" element={<Contactenos />} />
        </Route>
      </Routes>
    </>
  )
}
