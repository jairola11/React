import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import CrearUsuario from "./pages/CrearUsuario";
import ListarUsuario from "./pages/ListarUsuario";
import EditarUsuario from "./pages/EditarUsuario";
import { Menu } from "./pages/Menu";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Menu/>}>
          <Route path="/" element={<ListarUsuario/>}/>
          <Route path="/nosotros" element={<Nosotros/>}/>
          <Route path="/contactenos" element={<Contacto/>}/>
          <Route path="/crearusuario" element={<CrearUsuario/>}/>
          {/* <Route path="/usuarios" element={<ListarUsuario/>}/> */}
          <Route path="/edit/:id" element={<EditarUsuario/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App;