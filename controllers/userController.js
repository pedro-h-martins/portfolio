import db from '../config/db.js';

export const createUser = async (req, res) => {
    try {
        const { nome, papel, email, interesses, info } = req.body;
        const [result] = await db.promise().query(
            'INSERT INTO userData (nome, papel, email, interesses, info) VALUES (?, ?, ?, ?, ?)',
            [nome, papel, email, interesses, info]
        );
        res.status(201).send({ id: result.insertId, ...req.body });
    } catch (err) {
        res.status(500).send({ message: 'Erro ao criar usuário', error: err.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await db.promise().query(
            'SELECT * FROM userData WHERE port_id = ?',
            [id]
        );
        if (results.length === 0) {
            res.status(404).send({ message: 'User não encontrado' });
        } else {
            res.status(200).send(results[0]);
        }
    } catch (err) {
        res.status(500).send({ message: 'Erro ao buscar usuário', error: err.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const [results] = await db.promise().query('SELECT * FROM userData');
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send({ message: 'Erro ao buscar usuários', error: err.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, papel, email, interesses, info } = req.body;
        const [result] = await db.promise().query(
            'UPDATE userData SET nome = ?, papel = ?, email = ?, interesses = ?, info = ? WHERE port_id = ?',
            [nome, papel, email, interesses, info, id]
        );
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'User não encontrado' });
        } else {
            res.status(200).send({ id, ...req.body });
        }
    } catch (err) {
        res.status(500).send({ message: 'Erro ao atualizar usuário', error: err.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.promise().query(
            'DELETE FROM userData WHERE port_id = ?',
            [id]
        );
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'User não encontrado' });
        } else {
            res.status(200).send({ message: 'User deletado com sucesso' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Erro ao deletar usuário', error: err.message });
    }
};
