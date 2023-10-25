import {Route,Routes  } from "react-router-dom";
import Contacto from "./pages/Contacto";
import Inicio from "./pages/Inicio";
import CrearUsuario from "./pages/CrearUsuario";
import EditarUsuario from "./pages/EditarUsuario";
import ListarUsuario from "./pages/ListarUsuario";
import { Menu } from "./pages/Menu";
import Nosotros from "./pages/Nosotros";

 function App() {
  return (
  <>
   <Routes>
   <Route path='/' element ={<Menu/>}>
    <Route path='/' element ={<Inicio/>}/>
    <Route path='/nosotros' element ={<Nosotros/>}/>
    <Route path='/contactenos' element ={<Contacto/>}/>
    <Route path='/Usuarios' element ={<ListarUsuario/>}/>
    <Route path='/CrearUsuario' element ={< CrearUsuario/>}/>
    <Route path='/edit/:id' element ={<EditarUsuario/>}/>

    </Route>
   </Routes>
   
   </>
  )
}
export default App