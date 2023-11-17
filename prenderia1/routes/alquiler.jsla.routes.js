import { Router } from "express";
import { registrarAlquilerJSLA, listarAlquileresJSLA, buscarAlquilerJSLA, actualizarAlquilerJSLA, eliminarAlquilerJSLA} from '../controller/alquiler.controller.jsla.js'; // Asegúrate de importar los controladores correctos
import { validarToken } from "../controller/aut.jsla.controller.js"; // Asegúrate de importar el controlador de autenticación correcto


const alquilerRouter = Router();

alquilerRouter.post("/registrarJSLA", validarToken, registrarAlquilerJSLA);
alquilerRouter.get("/listarJSLA", listarAlquileresJSLA);
alquilerRouter.get("/buscarJSLA/:id", buscarAlquilerJSLA);
alquilerRouter.patch("/eliminarJSLA/:id", validarToken, eliminarAlquilerJSLA);
alquilerRouter.put("/actualizarJSLA/:id", validarToken, actualizarAlquilerJSLA);

export default alquilerRouter;
