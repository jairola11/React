import {Router} from "express";

import {ingresarJuego,cargarImagen,listarJuegos,buscarJuego,eliminarJuego,actualizarJuego} from "../controllers/juego.controller.js";
import{validarToken}from "../controllers/autenticacion.controller.js"

const juegosRoute= Router();


juegosRoute.post("/ingresar",cargarImagen,ingresarJuego);
juegosRoute.get("/listardatos",listarJuegos);
juegosRoute.get("/buscar/:id",buscarJuego);
juegosRoute.delete("/eliminar/:id",eliminarJuego);
juegosRoute.put("/actualizar/:id",cargarImagen,actualizarJuego);


export default juegosRoute;