import { Router } from 'express';
import {validarCliente} from '../controller/aut.jsla.controller.js'

const autRouter = Router();

autRouter.post('/validar',validarCliente);

export default autRouter;