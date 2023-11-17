import { Router } from "express";
import {registroclienteJSLA,listarclienteJSLA,buscarclienteJSLA,actualizarclienteJSLA, eliminarClienteJSLA} from '../controller/clientes.controller.jsla.js';
import { validarToken } from "../controller/aut.jsla.controller.js";
import {validartorCliente} from '../validation/validator.jsla.js';


const clienteRuter = Router();

clienteRuter.post("/registrarJSLA",validarToken,validartorCliente ,registroclienteJSLA);
clienteRuter.get("/listarJSLA", listarclienteJSLA );
clienteRuter.get("/buscarJSLA/:id", buscarclienteJSLA );
clienteRuter.delete("/eliminar/:id",validarToken,eliminarClienteJSLA );
clienteRuter.put("/actualizarJSLA/:id",validarToken, actualizarclienteJSLA );
export default clienteRuter