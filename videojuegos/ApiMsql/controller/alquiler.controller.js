import {pool} from '../database/conexion.js';

export const registrarAlquiler = async (req,res)=>{
    try{
        let{fecha_alquiler,cantidad,estado,fk_usuario,fk_juego} = req.body;
        let sql=`insert into alquiler (fecha_alquiler,cantidad,estado,fk_usuario,fk_juego)
                    values ('${fecha_alquiler}','${cantidad}','${estado}','${fk_usuario}','${fk_juego}')`;
        console.log(sql);
        const [rows] = await pool.query(sql);
        console.log(rows);
        if (rows.affectedRows>0){
            res.status(200).json(
                {
                    "status":200,
                    "message":"Se registró el alquiler :D "
                }
            )
        } else {
            res.status(401).json(
                {
                    "status":401,
                    "message":"NO se registró el alquiler :("
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
};

export const listarAlquiler = async (req,res)=>{
    try {
        const[result]=await pool.query ('select idalquiler, nombres as Cliente, fecha_alquiler, fecha_devolucion,nombre as juego,precio as precio_individual, cantidad, estado, (cantidad * precio) as Pago_Final from alquiler join usuarios on fk_usuario = idusuario join juegos on fk_juego = idjuego');
        res.status(200).json(result);
    } catch(err){
        res.status(500).json({
            message:'Error en listar alquiler :'+err
        })
    }
};

export const buscarAlquiler = async (req,res)=>{
    try {
        let id=req.params.id;
        const[result]=await pool.query ('select * from alquiler where idalquiler= '+id);
        res.status(200).json(result);
    } catch(err){
        res.status(500).json({
            message:'Error en buscar alquiler :( :'+err
        })
    }
};

export const actualizarAlquiler = async (req,res) =>{
    try {
        let id = req.params.id;
        let{fecha_alquiler,fecha_devolucion,cantidad,estado,fk_usuario,fk_juego} = req.body;

        let sql=`update alquiler SET fecha_alquiler='${fecha_alquiler}',fecha_devolucion='${fecha_devolucion}',cantidad='${cantidad}',estado='${estado}',fk_usuario='${fk_usuario}',fk_juego='${fk_juego}' where idalquiler=${id}`;

        const [rows]=await pool.query(sql);
        
        if (rows.affectedRows>0) {
            res.status(200).json({"status":200,"message":"Se actualizó el alquiler con éxito :D ..!!"});
        } else {
            res.status(401).json({"status":401,"message":"NO se actualizó el alquiler :(  ..!!"});
        }
    } catch (e){
        res.status(500).json({"status":500,"message":"Error en el servidor"+e});
    }
};

export const eliminarAlquiler = async (req,res) => {
    try {
        let id = req.params.id;
        let sql=`delete from alquiler where idalquiler=${id}`;
        const [rows]=await pool.query(sql);
        if (rows.affectedRows>0) {
            res.status(200).json({"status":200,"message":"Se eliminó el alquiler con éxito :D ..!!"});
        } else {
            res.status(401).json({"status":401,"message":"NO se eliminó el alquiler :(  ..!!"});
        }
    } catch (e){
        res.status(500).json({"status":500,"message":"Error en el servidor"+e});
    }
};