import db from '../config/db.js';

export const createHeader = async (req, res) => {
    try {
        const { href, titulo } = req.body;
        const [result] = await db.promise().query(
            'INSERT INTO headerData (href, titulo) VALUES (?, ?)',
            [href, titulo]
        );
        res.status(201).send({ id: result.insertId, ...req.body });
    } catch (err) {
        res.status(500).send({ message: 'Erro ao criar header', error: err.message });
    }
};

export const getHeader = async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await db.promise().query(
            'SELECT * FROM headerData WHERE id = ?',
            [id]
        );
        if (results.length === 0) {
            res.status(404).send({ message: 'Header não encontrado' });
        } else {
            res.status(200).send(results[0]);
        }
    } catch (err) {
        res.status(500).send({ message: 'Erro ao buscar header', error: err.message });
    }
};

export const getAllHeaders = async (req, res) => {
    try {
        const [results] = await db.promise().query('SELECT * FROM headerData');
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send({ message: 'Erro ao buscar headers', error: err.message });
    }
};

export const updateHeader = async (req, res) => {
    try {
        const { id } = req.params;
        const { href, titulo } = req.body;
        const [result] = await db.promise().query(
            'UPDATE headerData SET href = ?, titulo = ? WHERE id = ?',
            [href, titulo, id]
        );
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'Header não encontrado' });
        } else {
            res.status(200).send({ id, ...req.body });
        }
    } catch (err) {
        res.status(500).send({ message: 'Erro ao atualizar header', error: err.message });
    }
};

export const deleteHeader = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.promise().query(
            'DELETE FROM headerData WHERE id = ?',
            [id]
        );
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'Header não encontrado' });
        } else {
            res.status(200).send({ message: 'Header deletado com sucesso' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Erro ao deletar header', error: err.message });
    }
};
