import {Router} from "express";
import {validarUsuario} from '../controller/autenticacion.controller.js';

const autRoute = Router();

autRoute.post('/validar',validarUsuario);

export default autRoute;