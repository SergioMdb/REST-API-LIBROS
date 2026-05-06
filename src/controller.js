import { pool } from './database.js';

class libroController {

    async getAll(req, res) {
        try {
            const [result] = await pool.query('SELECT * FROM libros');
            res.json(result);
        } catch (error) {
            res.status(500).json({
                error: "Error al obtener libros",
                detalle: error.message
            });
        }
    }

    async add(req, res) {
        try {
            const libro = req.body;

        
            const camposValidos = ["nombre", "autor", "categoria", "añopublicaciones", "isbn"];
            const camposRecibidos = Object.keys(libro);

            const camposInvalidos = camposRecibidos.filter(c => !camposValidos.includes(c));

            if (camposInvalidos.length > 0) {
                return res.status(400).json({
                    error: "Campos inválidos",
                    camposInvalidos
                });
            }

            const [result] = await pool.query(
                `INSERT INTO libros(nombre, autor, categoria, añopublicaciones, isbn) VALUES (?, ?, ?, ?, ?)`,
                [libro.nombre, libro.autor, libro.categoria, libro.añopublicaciones, libro.isbn]
            );

            res.json({ "id insertado": result.insertId });

        } catch (error) {
            res.status(500).json({
                error: "Error al crear libro",
                detalle: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const { isbn } = req.body; 

            const [result] = await pool.query(
                `DELETE FROM libros WHERE isbn = ?`,
                [isbn]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Libro no encontrado"
                });
            }

            res.json({ "Registros eliminados": result.affectedRows });

        } catch (error) {
            res.status(500).json({
                error: "Error al eliminar",
                detalle: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const libro = req.body;

            const [result] = await pool.query(
                `UPDATE libros SET nombre=?, autor=?, categoria=?, añopublicaciones=? WHERE isbn=?`,
                [libro.nombre, libro.autor, libro.categoria, libro.añopublicaciones, libro.isbn]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    error: "Libro no encontrado"
                });
            }

            res.json({ "Registros actualizados": result.changedRows });

        } catch (error) {
            res.status(500).json({
                error: "Error al actualizar",
                detalle: error.message
            });
        }
    }
}

export const libro = new libroController();