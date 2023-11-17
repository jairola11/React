import { pool } from "../database/conexion.js";
import { validationResult } from 'express-validator';

export const registrarAlquilerJSLA = async (req, res) => {
    try {
        let error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(403).json(error);
        }

        let { valor, fecha, meses, descripcion, interes, fkCliente, fkArticulo } = req.body;
        let sql = `INSERT INTO alquiler (valor, fecha, meses, descripcion, interes, fkCliente, fkArticulo) 
                   VALUES (${valor}, '${fecha}', ${meses}, '${descripcion}', ${interes}, ${fkCliente}, ${fkArticulo})`;

        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({ "status": 200, "message": "Se registró con éxito el alquiler" });
        } else {
            res.status(401).json({ "status": 401, "message": "No se pudo registrar el alquiler" });
        }
    } catch (e) {
        res.status(500).json({ message: 'Error en registrarAlquiler: ' + e });
    }
}

export const listarAlquileresJSLA = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM alquiler');

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(401).json({ "status": 401, "message": "No se pudo listar los alquileres" });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor: ' + err });
    }
};

export const buscarAlquilerJSLA = async (req, res) => {
    try {
        let id = req.params.id;
        const [result] = await pool.query('SELECT * FROM alquiler WHERE idAlquiler=' + id);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(401).json({ "status": 401, "message": "No se pudo encontrar el alquiler" });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor: ' + err });
    }
};

export const actualizarAlquilerJSLA = async (req, res) => {
    try {
        let error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(403).json(error);
        }

        let id = req.params.id;
        let { valor, fecha, meses, descripcion, interes, fkCliente, fkArticulo } = req.body;
        let sql = `UPDATE alquiler SET valor = ${valor}, fecha = '${fecha}', meses = ${meses}, 
                   descripcion = '${descripcion}', interes = ${interes}, fkCliente = ${fkCliente}, 
                   fkArticulo = ${fkArticulo} WHERE idAlquiler = ${id}`;

        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({ "status": 200, "message": "Se actualizó con éxito el alquiler" });
        } else {
            res.status(401).json({ "status": 401, "message": "No se pudo actualizar el alquiler" });
        }
    } catch (e) {
        res.status(500).json({ "status": 500, "message": "Error interno en el servidor: " + e });
    }
}

export const eliminarAlquilerJSLA = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `DELETE FROM alquiler WHERE idAlquiler = ${id}`;
        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({ "status": 200, "message": "Se eliminó el alquiler" });
        } else {
            res.status(401).json({ "status": 401, "message": "No se eliminó el alquiler" });
        }
    } catch (e) {
        res.status(500).json({ message: 'Error en eliminarAlquiler: ' + e });
    }
}
