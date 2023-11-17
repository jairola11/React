import { pool } from "../database/conexion.js";
import { validationResult } from 'express-validator';

export const registrarInteresJSLA = async (req, res) => {
    try {
       
        let { mes, fecha, fkAlquiler } = req.body;
        let Alquiler = "SELECT * FROM alquiler WHERE idAlquiler = ? ";
        let [resultAlquiler] =  await pool.query(Alquiler,[fkAlquiler]);
        console.log(resultAlquiler)
        let valor = (resultAlquiler[0].valor * resultAlquiler[0].interes) / 100;
        let sql = `INSERT INTO intereses (mes, fecha, valor  , fkAlquiler) 
                   VALUES (${mes}, '${fecha}', ${valor}, ${fkAlquiler})`;

        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({ "status": 200, "message": "Se registró con éxito el interés" });
        } else {
            res.status(401).json({ "status": 401, "message": "No se pudo registrar el interés" });
        }
    } catch (e) {
        res.status(500).json({ message: 'Error en registrarInteres: ' + e });
    }
}   

export const listarInteresesJSLA = async (req, res) => {
    try {
        const [result] = await pool.query('SELECT * FROM intereses');

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(401).json({ "status": 401, "message": "No se pudo listar los intereses" });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor: ' + err });
    }
};

export const buscarInteresJSLA = async (req, res) => {
    try {
        let id = req.params.id;
        const [result] = await pool.query('SELECT * FROM intereses WHERE idInteres=' + id);

        if (result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(401).json({ "status": 401, "message": "No se pudo encontrar el interés" });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error en el servidor: ' + err });
    }
};

export const actualizarInteresJSLA = async (req, res) => {
    try {
        let error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(403).json(error);
        }

        let id = req.params.id;
        let { mes, fecha, valor, fkAlquiler } = req.body;
        let sql = `UPDATE intereses SET mes = ${mes}, fecha = '${fecha}', valor = ${valor}, fkAlquiler = ${fkAlquiler} 
                   WHERE idInteres = ${id}`;

        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({ "status": 200, "message": "Se actualizó con éxito el interés" });
        } else {
            res.status(401).json({ "status": 401, "message": "No se pudo actualizar el interés" });
        }
    } catch (e) {
        res.status(500).json({ "status": 500, "message": "Error interno en el servidor: " + e });
    }
}

export const eliminarInteresJSLA = async (req, res) => {
    try {
        let id = req.params.id;
        let sql = `DELETE FROM intereses WHERE idInteres = ${id}`;
        const [rows] = await pool.query(sql);

        if (rows.affectedRows > 0) {
            res.status(200).json({ "status": 200, "message": "Se eliminó el interés" });
        } else {
            res.status(401).json({ "status": 401, "message": "No se eliminó el interés" });
        }
    } catch (e) {
        res.status(500).json({ message: 'Error en eliminarInteres: ' + e });
    }
} 
// Listar intereses pagados de un cliente específico
export const listarInteresesPagadosPorClienteJSLA = async (req, res) => {
    try {
        const { idCliente } = req.params;
        const sql = `
            SELECT c.nombres AS nombre_cliente, a.idAlquiler AS alquiler, ar.nombre AS articulo, i.mes, i.valor
            FROM intereses AS i
            JOIN alquiler AS a ON i.fkAlquiler = a.idAlquiler
            JOIN clientes AS c ON a.fkCliente = c.idCliente
            JOIN articulos AS ar ON a.fkArticulo = ar.idArticulo
            WHERE c.idCliente = ?;
        `;
        const [rows] = await pool.query(sql, [idCliente]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
// export const listarInteresesPagadosPorCliente = async (req, res) => {
//     try {
//         const { idCliente } = req.params;
//         const sql = `
//             SELECT c.nombres AS nombre_cliente, a.valor AS alquiler, ar.nombre AS articulo, i.mes, i.valor * 2 AS valor
//             FROM intereses AS i
//             JOIN alquiler AS a ON i.fkAlquiler = a.idAlquiler
//             JOIN clientes AS c ON a.fkCliente = c.idCliente
//             JOIN articulos AS ar ON a.fkArticulo = ar.idArticulo
//             WHERE c.idCliente = ?;
//         `;
//         const [rows] = await pool.query(sql, [idCliente]);
//         res.status(200).json(rows);
//     } catch (error) {
//         res.status(500).json({ error: "Error interno del servidor" });
//     }
// };

// Listar el total de intereses recaudados en un mes y año
// export const listarTotalInteresesPorMesAno = async (req, res) => {
//     try {
        
//         const sql = `
//             SELECT MONTH(i.fecha) AS mes, YEAR(i.fecha) AS ano, SUM(i.valor) AS total_intereses
//             FROM alquiler AS a
//             JOIN intereses AS i ON i.fkAlquiler = a.idAlquiler group by MONTH(i.fecha),YEAR(i.fecha)
//             `;
//         const [rows] = await pool.query(sql);

//         if (rows.length > 0) {
//             res.status(200).json(rows[0]); 
//         } else {
//             res.status(404).json({ error: "No se encontraron registros para el mes y año especificados" });
//         }
//     } catch (error) {
//         res.status(500).json({ error: "Error interno del servidor" });
//     }
// };

// Controlador
// Controlador
export const listarTotalInteresesPorMesAnoJSLA = async (req, res) => {
    try {
        const sql = `
            SELECT YEAR(i.fecha) AS ano, MONTH(i.fecha) AS mes, SUM(i.valor) AS total_intereses
            FROM intereses AS i
            GROUP BY YEAR(i.fecha), MONTH(i.fecha)
            ORDER BY ano, mes;
        `;
        const [rows] = await pool.query(sql);

        if (rows.length > 0) {
            res.status(200).json(rows);
        } else {
            res.status(404).json({ error: "No se encontraron registros de intereses" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


// listar meses e interés pendiente por pagar de un alquiler
export const listarMesesEInteresPendientePorAlquilerJSLA = async (req, res) => {
    try {
        const { idAlquiler } = req.params;
        const sql = `
            SELECT a.meses, a.valor AS alquiler, i.mes, i.valor
            FROM alquiler AS a
            LEFT JOIN intereses AS i ON a.idAlquiler = i.fkAlquiler
            WHERE a.idAlquiler = ?;
        `;
        const [rows] = await pool.query(sql, [idAlquiler]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
};



