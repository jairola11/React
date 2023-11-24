import { pool } from "../database/conexion.js";

export const guardarUsuario = async (req, res) => {
    try {
        // let data = req.body;
        let {nombres,direccion,telefono,correo,rol} = req.body
        // console.log("USER", data)
        console.log(req.body, "XD")
        let sql = `insert into usuarios (nombres,direccion,telefono,correo,rol) values ('${nombres}','${direccion}','${telefono}','${correo}','${rol}')`;

        // const [rows] = await pool.query(sql, [data.nombres, data.direccion, data.telefono, data.correo, data.rol]);
        const[rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "El usuario se registro con exito"   
            }
            );

        } else {
            res.status(400).json({
                "status": 400,
                "message": "No se registro"
            }
            );
        }
    } catch (e) {
        res.status(500).json({
            "status": 500,
            "message": "error en en el servidor" + e
        }
        );

    }

};

export const listarUsuario = async (req, res) => {

    try {
        const [result] = await pool.query("select * from usuarios");
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            massage: "Error en listar usuario :" + err
        });
    }
}
export const buscarUsuarios = async (req, res) => {
    try {
        let id = req.params.id;
        const [result] = await pool.query("select * from usuarios where idusuario =" + id);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({
            massage: "Error en listar usuario :" + err
        });
    }

};


export const eliminarUsuario = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `delete from usuarios where idusuario=${id}`;

        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "El usuario se elimino con exito"
            }
            );
        } else {
            res.status(400).json({
                "status": 401,
                "message": "El usuario no fue eliminado"
            }
            );
        }
    } catch (e) {
        res.status(500).json({
            "status": 500,
            "message": "Error en el servidor " + e
        }
        );
    }
};

export const actualizarUsuario = async (req, res) => {
    try {
        let id = req.params.id;
        let { nombres, direccion, telefono, correo } = req.body;


        let sql = `update usuarios SET nombres ='${nombres}',direccion='${direccion}',telefono='${telefono}',correo ='${correo}' where  idusuario=${id}`;

        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({
                "status": 200,
                "message": "El usuario se actuaizo con exito"
            }
            );
        } else {
            res.status(400).json({
                "status": 400,
                "message": "El usuario no fue actualizado"

            }
            );
        }
    } catch (e) {
        res.status(500).json({
            "status": 500,
            "message": "Error en el servidor " + e
        }
        );

    }
}