
import {Router} from "express";

import {listarUsuario,buscarUsuarios,guardarUsuario,eliminarUsuario,actualizarUsuario} from "../controllers/usuario.controller.js";
import{validarToken}from "../controllers/autenticacion.controller.js"

const usuarioRoute = Router();

usuarioRoute.post("/registrar",guardarUsuario);
usuarioRoute.get("/listarusuario",listarUsuario);
usuarioRoute.get("/buscarusuario/:id",buscarUsuarios);
usuarioRoute.delete("/eliminar/:id",eliminarUsuario);
usuarioRoute.put("/actualizar/:id",actualizarUsuario);


export default usuarioRoute;