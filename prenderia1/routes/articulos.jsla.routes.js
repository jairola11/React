import { Router } from "express";
import { registrarArticuloJSLA, listarArticuloJSLA, buscarArticuloJSLA, actualizarArticuloJSLA, eliminarArticuloJSLA } from '../controller/articulo.controller.jsla.js';
import { validarToken } from "../controller/aut.jsla.controller.js"; // Asegúrate de importar el controlador de autenticación correcto

const articuloRouter = Router();

articuloRouter.post("/registrarJSLA", validarToken, registrarArticuloJSLA);
articuloRouter.get("/listarJSLA", listarArticuloJSLA);
articuloRouter.get("/buscarJSLA/:id", buscarArticuloJSLA);
articuloRouter.patch("/desavilitarJSLA/:id", validarToken, eliminarArticuloJSLA);
articuloRouter.put("/actualizarJSLA/:id", validarToken, actualizarArticuloJSLA);

export default articuloRouter;
