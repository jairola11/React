import { Router } from "express";
import{validarUsuario} from "../controllers/autenticacion.controller.js"

const  autRote = Router();

autRote.post('/validar',validarUsuario);


export default autRote;