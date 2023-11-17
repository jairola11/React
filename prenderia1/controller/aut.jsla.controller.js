import { pool } from "../database/conexion.js";
import jwt from 'jsonwebtoken';

export const validarCliente = async (req,res) =>{
	try{
		let {identificacion, password} = req.body;
		let sql = `SELECT idCliente, nombres, direccion, telefono,fechaNa,status from clientes status  WHERE identificacion='${identificacion}' AND password = '${password}'`;
		const [rows] = await pool.query(sql);
		if(rows.length > 0){
			let token = jwt.sign({user:rows},process.env.AUT_SECRET,{expiresIn:process.env.AUT_EXPIRE});
			return res.status(200).json({token:token,message:'Usuario Autorizado'});
		}else{
			res.status(401).json({"status":401,"message":"cliente no fue  encontrado..."})
		}
	}catch(e){
		res.status(500).json({message: 'Error en  en ñla validacion del cliente : '+e})
	}
}
export const validarToken = async (req,res,next) =>{
	try{
		let tokenCliente = req.headers['token'];
		if(!tokenCliente){
			return res.status(401).json({message:"Se requiere el token..."})
		}else{
			const decoded = jwt.verify(tokenCliente,process.env.AUT_SECRET,(error,decoded)=>{
				if(error){
					return res.status(401).json({message:"Token invalido",autorizado:false});
				}else{
					next();
				}
			})
		}
	}catch(e){
    res.status(500).json({message: 'Error en validarToken: '+e})
  }
}