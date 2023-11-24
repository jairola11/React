
import {pool} from "../database/conexion.js";

export const alquilarJuego = async (req,res)=> {
    try {
        let{fecha_alquiler,cantidad,estado,fk_usuario,fk_juego}=req.body;

        let sql = `INSERT INTO alquiler(fecha_alquiler,cantidad,estado,fk_usuario, fk_juego)
        VALUES ('${fecha_alquiler}','${cantidad}','${estado}','${fk_usuario}','${fk_juego}')`;

        const[rows] = await pool.query(sql)
        if (rows.affectedRows > 0){
            res.status(200).json({
                "status":200,
                "message":"El alquiler se registro con exito"
                }
            );
        }else {
            res.status(401).json({
                "status":401,
                "message":"El alquiler no se registro"
            });

    }
    }   catch{
        res.status(500).json({
            "status":500,
            "message":"error en  el servidor"
        }
    );
        
    }
    
};
export const listarAlquiler = async (req,res)=>{

    try {
        const[result] = await pool.query("select nombres as cliente,nombre as juego, fecha_alquiler,fecha_devolucion,cantidad,estado,imagen,precio as precio_unidad,(precio * cantidad) as total from  alquiler join juegos on idjuego = fk_juego join usuarios on idusuario = fk_usuario;");
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            massage:"Erro al listar los juegos:"+err
        });
        
    }     
}
export const buscarAlquiler = async (req,res)=>{

    try {
        let id=req.params.id;
        const[result] = await pool.query("select nombres as cliente,nombre as juego, fecha_alquiler,fecha_devolucion,cantidad,estado,imagen,precio as precio_unidad,(precio * cantidad) as total from  alquiler join juegos on idjuego = fk_juego join usuarios on idusuario = fk_usuario where idalquiler =" + id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            massage:"Error del servidor:"+err
        });
        
    }
}
export const eliminarAlquiler = async(req,res)=>{

    try{
        let id = req.params.id;
        let sql = `delete from alquiler where idalquiler=${id}`;

        const [rows]= await pool.query(sql);

        if(rows.affectedRows > 0){
            res.status(200).json({
                "status":200,
                "message":"El alquiler se elimino con exito"
        });
        }else{
            res.status(401).json({
            "status":401,
            "message":"El alquiler no fue eliminado"
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
export const actualizarAlquiler = async(req,res)=>{
    try{
        let id = req.params.id;
        let {fecha_devolucion,cantidad,estado}=req.body;

        let sql=`update alquiler SET fecha_devolucion ='${fecha_devolucion}',cantidad='${cantidad}',estado='${estado}' where idalquiler=${id}`;
    
        
        const [rows] = await pool.query(sql);

        if(rows.affectedRows > 0){
            res.status(200).json({
                "status":200,
                "message":"El alquiler se actuaizo con exito"
                }
            );
        }else{
            res.status(401).json({
                "status":401,
                "message":"El alquiler no fue actualizado"

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


