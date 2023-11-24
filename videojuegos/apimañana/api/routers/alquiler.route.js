import {Router} from "express";

import {alquilarJuego,actualizarAlquiler,eliminarAlquiler,listarAlquiler,buscarAlquiler} from "../controllers/alquiler.controller.js";
import{validarToken}from "../controllers/autenticacion.controller.js"

const alquilarRoute= Router();

alquilarRoute.get("/listar",listarAlquiler);
alquilarRoute.post("/alquilar",validarToken,alquilarJuego);
alquilarRoute.get("/buscar/:id",buscarAlquiler);
alquilarRoute.put("/actualizar/:id",validarToken,actualizarAlquiler);
alquilarRoute.delete("/eliminar/:id",validarToken,eliminarAlquiler);








export default alquilarRoute;