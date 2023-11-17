import {Router} from "express";

import {registrarAlquiler,listarAlquiler,buscarAlquiler,actualizarAlquiler,eliminarAlquiler} from '../controller/alquiler.controller.js';
import {validarToken} from '../controller/autenticacion.controller.js';
const alquilarRoute = Router();

alquilarRoute.post('/registrar',validarToken,registrarAlquiler);
alquilarRoute.get('/listar',listarAlquiler);
alquilarRoute.get('/buscar/:id',buscarAlquiler);
alquilarRoute.put('/actualizar/:id',validarToken,actualizarAlquiler);
alquilarRoute.delete('/eliminar/:id',validarToken,eliminarAlquiler);

export default alquilarRoute;