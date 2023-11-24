
import {pool} from "../database/conexion.js";
import multer from 'multer';

const storage = multer.diskStorage(
    {
        destination:function (req,img,cb) {
            cb(null,"public/img")
        },
        filename:function(req,img,cb){
            cb(null,img.originalname)
        }
    }
);
const upload = multer({storage:storage});
export const cargarImagen=upload.single('img');

export const ingresarJuego = async (req,res)=> {
    try {
        let{nombre,descripcion,precio}=req.body;
        let img = req.file.originalname;

        let sql = `INSERT INTO juegos(nombre,descripcion,imagen,precio)
            values ('${nombre}','${descripcion}','${img}','${precio}')`;

        const[rows] = await pool.query(sql)
        if (rows.affectedRows > 0){
            res.status(200).json({
                "status":200,
                "message":"El juego se registro con exito"
                }
            );
        }else {
            res.status(401).json({
                "status":401,
                "message":"El juego no se registro"
            });

    }
    }   catch(e){
        res.status(500).json({
            "status":500,
            "message":"error en  el servidor"+e
        }
    );
        
    }
};

export const listarJuegos = async (req,res)=>{

    try {
        const[result] = await pool.query("select * from juegos");
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            massage:"Erro al listar los juegos:"+err
        });
        
    }     
}
export const buscarJuego = async (req,res)=>{

    try {
        let id=req.params.id;
        const[result] = await pool.query("select * from juegos  where idjuego =" + id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            massage:"Error del servidor:"+err
        });
        
    }
}


export const eliminarJuego = async(req,res)=>{

    try{
        let id = req.params.id;
        let sql = `delete from juegos where idjuego=${id}`;

        const [rows]= await pool.query(sql);

        if(rows.affectedRows > 0){
            res.status(200).json({
                "status":200,
                "message":"El juego se elimino con exito"
        });
        }else{
            res.status(401).json({
            "status":401,
            "message":"El juego no fue eliminado"
            }
            );  
        }
    
    } catch(e){
        res.status(500).json({
        "status":500,
        "message":"Error en el servidor "+e
        }
    );

}
}
export const actualizarJuego = async(req,res)=>{
    try{
        let id = req.params.id;
        let {nombre,descripcion,precio}=req.body;
        // let img = req.file.originalname;
        let img;
        if(typeof req.file != "undefined"){
            img = req.file.originalname;
        }

        let sql=`update juegos SET nombre ='${nombre}',descripcion='${descripcion}', precio='${precio}'`;
        if(img){
            sql += `,imagen = '${img}'`;
        }
        sql +=  ` where idjuego=${id}`
        
        const [rows] = await pool.query(sql);

        if(rows.affectedRows > 0){
            res.status(200).json({
                "status":200,
                "message":"El juego se actuaizo con exito"
                }
            );
        }else{
            res.status(401).json({
                "status":401,
                "message":"El juego no fue actualizado"

                }
            );
        }
    }catch(e){
        res.status(500).json({
            "status":500,
            "message":"Error en el servidor "+e
            }
        );
    }
}
