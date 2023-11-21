import {Router} from "express";


import {guardarUsuario, listarUsuario,buscarUsuario,eliminarUsuario,actualizarUsuario} from '../controller/usuario.controller.js';

import {validatorUser} from '../validator/validator.js';
const usuarioRoute = Router();

usuarioRoute.get('/listar',listarUsuario);
usuarioRoute.get('/buscar/:id',buscarUsuario);
usuarioRoute.post('/registrar',guardarUsuario);
usuarioRoute.delete('/eliminar/:id',eliminarUsuario);

usuarioRoute.put('/actualizar/:id',actualizarUsuario);

export default usuarioRoute;


