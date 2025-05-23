import db from '../config/db.js';

export const createResume = async (req, res) => {
    try {
        const { port_id, skills_id, telefone, endereco, cert } = req.body;
        const [result] = await db.promise().query(
            'INSERT INTO resumeData (port_id, skills_id, telefone, endereco, cert) VALUES (?, ?, ?, ?, ?)',
            [port_id, skills_id, telefone, endereco, cert]
        );
        res.status(201).send({ id: result.insertId, ...req.body });
    } catch (err) {
        res.status(500).send({ message: 'Erro ao criar resume', error: err.message });
    }
};

export const getResume = async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await db.promise().query(
            'SELECT * FROM resumeData WHERE res_id = ?',
            [id]
        );
        if (results.length === 0) {
            res.status(404).send({ message: 'Resume não encontrado' });
        } else {
            res.status(200).send(results[0]);
        }
    } catch (err) {
        res.status(500).send({ message: 'Erro ao buscar resume', error: err.message });
    }
};

export const getAllResumes = async (req, res) => {
    try {
        const [results] = await db.promise().query('SELECT * FROM resumeData');
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send({ message: 'Erro ao buscar resumes', error: err.message });
    }
};

export const updateResume = async (req, res) => {
    try {
        const { id } = req.params;
        const { port_id, skills_id, telefone, endereco, cert } = req.body;
        const [result] = await db.promise().query(
            'UPDATE resumeData SET port_id = ?, skills_id = ?, telefone = ?, endereco = ?, cert = ? WHERE res_id = ?',
            [port_id, skills_id, telefone, endereco, cert, id]
        );
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'Resume não encontrado' });
        } else {
            res.status(200).send({ id, ...req.body });
        }
    } catch (err) {
        res.status(500).send({ message: 'Erro ao atualizar resume', error: err.message });
    }
};

export const deleteResume = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.promise().query(
            'DELETE FROM resumeData WHERE res_id = ?',
            [id]
        );
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'Resume não encontrado' });
        } else {
            res.status(200).send({ message: 'Resume deletado com sucesso' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Erro ao deletar resume', error: err.message });
    }
};
