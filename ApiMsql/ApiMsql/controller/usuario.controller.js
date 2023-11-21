import {pool} from '../database/conexion.js';

import{validationResult} from 'express-validator';

export const listarUsuario = async (req,res)=>{
    try {
        const[result]=await pool.query ('select * from usuarios');
        res.status(200).json(result);
    } catch(err){
        res.status(500).json({
            message:'Error en listar usuario :'+err
        })
    }
};

export const buscarUsuario = async (req,res)=>{
    try {
        let id=req.params.id;
        const[result]=await pool.query ('select * from usuarios where id_usuario= '+id);
        res.status(200).json(result);
    } catch(err){
        res.status(500).json({
            message:'Error en buscar usuario :'+err
        })
    }
};

export const guardarUsuario = async (req,res)=>{
    try{
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
        let{nombres,direccion,telefono,correo,rol} = req.body;
        let sql=`insert into usuarios (nombres,direccion,telefono,correo,rol)
                    values ('${nombres}','${direccion}','${telefono}','${correo}','${rol}')`;
        console.log(sql);
        const [rows] = await pool.query(sql);
        console.log(rows);
        if (rows.affectedRows>0){
            return res.status(200).json(
                {
                    "status":200,
                    "message":"Se registró con éxito el usuario"
                }
            )
        } else {
             return res.status(401).json(
                {
                    "status":401,
                    "message":"No se registro"
                }
            )
        }
    } catch {
        res.status(500).json(
            {
                "status":500,
                "message":"Error en el servidor"
            }
        )
    }
}

export const eliminarUsuario = async (req,res) => {
    try {
        let id = req.params.id;
        let sql=`delete from usuarios where id_usuario=${id}`;
        const [rows]=await pool.query(sql);
        if (rows.affectedRows>0) {
            res.status(200).json({"status":200,"message":"Se eliminó el unsuario con éxito..!!"});
        } else {
            res.status(401).json({"status":401,"message":"NO se eliminó el unsuario con éxito..!!"});
        }
    } catch (e){
        res.status(500).json({"status":500,"message":"Error en el servidor"+e});
    }
}

export const actualizarUsuario = async (req,res) =>{
    try {
        let error1 = validationResult(req);
        if (!error1.isEmpty()){
            return res.status(400).json(error1);
        }
        let id = req.params.id;
        let{nombres,direccion,telefono,correo,rol} = req.body;

        let sql=`update usuarios SET nombres='${nombres}',direccion='${direccion}',telefono='${telefono}',correo='${correo}',rol='${rol}' where id_usuario=${id}`;

        const [rows]=await pool.query(sql);
        
        if (rows.affectedRows>0) {
            res.status(200).json({"status":200,"message":"Se actualizó el unsuario con éxito..!!"});
        } else {
            res.status(401).json({"status":401,"message":"NO se actualizó el unsuario..!!"});
        }
    } catch (e){
        res.status(500).json({"status":500,"message":"Error en el servidor"+e});
    }
}
