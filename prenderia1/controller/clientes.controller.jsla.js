import { pool } from "../database/conexion.js"
import {validationResult} from 'express-validator';

export const registroclienteJSLA = async (req, res) => {

        try{	
            let error = validationResult(req);
            if(!error.isEmpty()){
                return res.status(403).json(error)
            }
 let {identificacion,nombres,direccion,telefono,fechaNa,password}=req.body;
 let sql= `insert into clientes (identificacion,nombres,direccion,telefono,fechaNa,password) values ('${identificacion}','${nombres}','${direccion}','${telefono}','${fechaNa}','${password}')`;
 const[rows]=await pool.query(sql)
 if(rows.affectedRows > 0){
    res.status(200).json({"status":200,"message":"Se registro con exito el cliente"})
}else{
    res.status(401).json({"status":401,"message":"No se pudo registrar el cliente "})
}
    }catch(e){
		res.status(500).json({message: 'Error en guardarcliente : '+e})
	}
}
export const listarclienteJSLA = async (req, res) => {
    try {
        const [result] = await pool.query('select * from clientes ');
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(401).json({ "status": 401, "message": "No se pudo listar los clientes " });

        }

    } catch (err) {
        res.status(500).json({
            massage: 'error en servidor:' + err
        })
    }

};

export const buscarclienteJSLA = async (req, res) => {
    try {
        let id = req.params.id;
        const [result] = await pool.query('select * from clientes where idCliente=' + id);
        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(401).json({ "status": 401, "message": "No se pudo encontar el cliente " });

        }

    } catch (err) {
        res.status(500).json({
            massage: 'error en servidor:' + err
        })
    }

};
export const actualizarclienteJSLA = async (req ,res) =>{
   
    try{	
		let error = validationResult(req);
		if(!error.isEmpty()){
			return res.status(403).json(error)
		}
        let id = req.params.id;
        let {identificacion,nombres,direccion,telefono,fechaNa,password}=req.body;

    let sql=`update clientes SET identificacion = '${identificacion}',
    nombres = '${nombres}', direccion = '${direccion}',telefono = '${telefono}',fechaNa= '${fechaNa}',password= '${password}'
    where idCliente = ${id} `;
    console.log(sql)

    const [rows] = await pool.query(sql);
    if (rows.affectedRows>0){
        res.status(200).json(
            {"status": 200,"menssge": "Se actualizo con exito el cliente "});
    }else{
        res.status(401).json(
            {"status": 401,"menssge": "No se  pudo actualizo el cliente "});
    }

    } catch (e) {
        res.status(500).json({
        "status": 500,
        "menssge": "Error interno en el sevidor :(" + e});
    }
}
export const eliminarClienteJSLA = async (req, res) => {
    try {
        let id = req.params.id;

        // Primero, elimina los registros en la tabla alquiler que hacen referencia al cliente
        const deleteAlquilerSql = `delete from alquiler where fkCliente=${id}`;
        await pool.query(deleteAlquilerSql);

        // Luego, elimina el cliente
        const deleteClienteSql = `delete from clientes where idCliente=${id}`;
        const [rows] = await pool.query(deleteClienteSql);

        if (rows.affectedRows > 0) {
            res.status(200).json({ "status": 200, "message": "Se eliminó el cliente" });
        } else {
            res.status(401).json({ "status": 401, "message": "No se eliminó el cliente" });
        }
    } catch (e) {
        res.status(500).json({ message: 'Error en eliminar cliente: ' + e });
    }
}
