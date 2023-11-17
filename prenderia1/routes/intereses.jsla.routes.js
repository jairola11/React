import { Router } from "express";
import { registrarInteresJSLA, listarInteresesJSLA, buscarInteresJSLA, actualizarInteresJSLA, eliminarInteresJSLA,listarInteresesPagadosPorClienteJSLA,listarTotalInteresesPorMesAnoJSLA,listarMesesEInteresPendientePorAlquilerJSLA } from '../controller/intereses.controller.jsla.js'; // Asegúrate de importar los controladores correctos
import { validarToken } from "../controller/aut.jsla.controller.js";


const interesRouter = Router();

interesRouter.post("/registrarJSLA", validarToken, registrarInteresJSLA);
interesRouter.get("/listarJSLA", listarInteresesJSLA);
interesRouter.get("/buscarJSLA/:id", buscarInteresJSLA);
interesRouter.patch("/eliminarJSLA/:id", validarToken, eliminarInteresJSLA);
interesRouter.put("/actualizarJSLA/:id", validarToken, actualizarInteresJSLA);
interesRouter.get("/interesesClienteJSLA/:idCliente", validarToken, listarInteresesPagadosPorClienteJSLA);
interesRouter.get("/total_interesesJSLA", validarToken, listarTotalInteresesPorMesAnoJSLA);
interesRouter.get("/intereses_pendientesJSLA/:idAlquiler", validarToken, listarMesesEInteresPendientePorAlquilerJSLA);




export default interesRouter;
