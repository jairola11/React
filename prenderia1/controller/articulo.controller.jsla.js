import { pool } from "../database/conexion.js";
import { validationResult } from 'express-validator';

export const registrarArticuloJSLA = async (req, res) => {
    try {
        

        let { nombre, tipo } = req.body;
        let sql = `INSERT INTO articulos (nombre, tipo) VALUES ('${nombre}', '${tipo}')`;
        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({ "status": 200, "message": "Se registró con éxito el artículo" });
        } else {
            res.status(401).json({ "status": 401, "message": "No se pudo registrar el artículo" });
        }
    } catch (e) {
        res.status(500).json({ message: 'Error en registrarArticulo: ' + e });
    }
}

export const listarArticuloJSLA = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM articulos where status =1');

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(401).json({ "status": 401, "message": "No se pudo listar los artículos" });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor: ' + err });
    }
};

export const buscarArticuloJSLA = async (req, res) => {
    try {
        let id = req.params.id;
        const [result] = await pool.query('SELECT * FROM articulos WHERE idArticulo=' + id);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(401).json({ "status": 401, "message": "No se pudo encontrar el artículo" });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor: ' + err });
    }
};

export const actualizarArticuloJSLA = async (req, res) => {
    try {
        let error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(403).json(error);
        }

        let id = req.params.id;
        let { nombre, tipo } = req.body;
        let sql = `UPDATE articulos SET nombre = '${nombre}', tipo = '${tipo}' WHERE idArticulo = ${id}`;
        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({ "status": 200, "message": "Se actualizó con éxito el artículo" });
        } else {
            res.status(401).json({ "status": 401, "message": "No se pudo actualizar el artículo" });
        }
    } catch (e) {
        res.status(500).json({ "status": 500, "message": "Error interno en el servidor: " + e });
    }
}

export const eliminarArticuloJSLA = async (req, res) => {
    try {
        let id = req.params.id; 
        let sql = `update   articulos set status =0 WHERE idArticulo = ${id}`;
        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({ "status": 200, "message": "Se desavilito  el artículo" });
        } else {
            res.status(401).json({ "status": 401, "message": "No se desavilito  el artículo" });
        }
    } catch (e) {
        res.status(500).json({ message: 'Error en eliminarArticulo: ' + e });
    }
}
