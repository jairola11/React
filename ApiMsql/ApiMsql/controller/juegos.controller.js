
import {pool} from '../database/conexion.js';
import multer from 'multer';

const storage = multer.diskStorage(
    {
        destination:function(req,img,cb){
            cb(null,"public/img");
        },
        filename:function(req,img,cb){
            cb(null,img.originalname);
        }
    }
);

const upload = multer({storage:storage});
export const cargarImagen=upload.single('img');


export const registrarJuego = async (req,res)=>{
    try{
        let{nombre,descripcion,precio} = req.body;
        let imagen = req.file.originalname;
        let sql=`INSERT INTO juegos(nombre,descripcion,precio)
                    values ('${nombre}','${descripcion}','${precio}')`;
        const [rows] = await pool.query(sql);
        if (rows.affectedRows>0){
            res.status(200).json(
                {
                    "status":200,
                    "message":"Se registró el juego :D "
                }
            )
        } else {
            res.status(401).json(
                {
                    "status":401,
                    "message":"NO se registró el juego :("
                }
            )
        } 
    } catch (e) {
        res.status(500).json({
            "status": 500,
            "message": "Error en el servidor",
            "error": e.message
        });
    }
};

export const listarJuego = async (req,res)=>{
    try {
        const[result]=await pool.query ('select * from juegos');
        res.status(200).json(result);
    } catch(err){
        res.status(500).json({
            message:'Error en listar juegos :'+err
        })
    }
};

export const buscarJuego = async (req,res)=>{
    try {
        let id=req.params.id;
        const[result]=await pool.query ('select * from juegos where id_juego= '+id);
        res.status(200).json(result);
    } catch(err){
        res.status(500).json({
            message:'Error en buscar juego :( :'+err
        })
    }
};

export const eliminarJuego = async (req,res) => {
    try {
        let id = req.params.id;
        let sql=`delete from juegos where id_juego=${id}`;
        const [rows]=await pool.query(sql);
        if (rows.affectedRows>0) {
            res.status(200).json({"status":200,"message":"Se eliminó el juego con éxito :D ..!!"});
        } else {
            res.status(401).json({"status":401,"message":"NO se eliminó el juego :(  ..!!"});
        }
    } catch (e){
        res.status(500).json({"status":500,"message":"Error en el servidor"+e});
    }
};

export const actualizarJuego = async (req,res) =>{
    try {
        let id = req.params.id;
        let{nombre,descripcion,precio} = req.body;
        let sql=`update juegos SET nombre='${nombre}',descripcion='${descripcion}',precio='${precio}' where id_juego=${id}`;

        const [rows]=await pool.query(sql);
        
        if (rows.affectedRows>0) {
            res.status(200).json({"status":200,"message":"Se actualizó el juego con éxito :D ..!!"});
        } else {
            res.status(401).json({"status":401,"message":"NO se actualizó el juego :(  ..!!"});
        }
    } catch (e){
        res.status(500).json({"status":500,"message":"Error en el servidor"+e});
    }
}
