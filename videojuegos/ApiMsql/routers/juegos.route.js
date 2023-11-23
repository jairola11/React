import {Router} from "express";

import {registrarJuego,cargarImagen,listarJuego,buscarJuego,eliminarJuego,actualizarJuego} from '../controller/juegos.controller.js';
import {validarToken} from '../controller/autenticacion.controller.js';
const juegosRoute = Router();

juegosRoute.post('/registrar',cargarImagen,registrarJuego);
juegosRoute.get('/listar',listarJuego);
juegosRoute.get('/buscar/:id',buscarJuego);
juegosRoute.delete('/eliminar/:id',eliminarJuego);
juegosRoute.put('/actualizar/:id',actualizarJuego);

export default juegosRoute;