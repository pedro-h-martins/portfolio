import db from '../config/db.js';

export const createSkills = async (req, res) => {
    try {
        const { lang, lang2, fworks, tools } = req.body;
        const [result] = await db.promise().query(
            'INSERT INTO skillsData (lang, lang2, fworks, tools) VALUES (?, ?, ?, ?)',
            [lang, lang2, fworks, tools]
        );
        res.status(201).send({ id: result.insertId, ...req.body });
    } catch (err) {
        res.status(500).send({ message: 'Erro ao criar skills', error: err.message });
    }
};

export const getAllSkills = async (req, res) => {
    try {
        const [results] = await db.promise().query('SELECT * FROM skillsData');
        res.status(200).send(results);
    } catch (err) {
        res.status(500).send({ message: 'Erro ao buscar skills', error: err.message });
    }
};

export const getSkills = async (req, res) => {
    try {
        const { id } = req.params;
        const [results] = await db.promise().query(
            'SELECT * FROM skillsData WHERE skills_id = ?',
            [id]
        );
        if (results.length === 0) {
            res.status(404).send({ message: 'Skills não encontrado' });
        } else {
            res.status(200).send(results[0]);
        }
    } catch (err) {
        res.status(500).send({ message: 'Erro ao buscar skills', error: err.message });
    }
};

export const updateSkills = async (req, res) => {
    try {
        const { id } = req.params;
        const { lang, lang2, fworks, tools } = req.body;
        const [result] = await db.promise().query(
            'UPDATE skillsData SET lang = ?, lang2 = ?, fworks = ?, tools = ? WHERE skills_id = ?',
            [lang, lang2, fworks, tools, id]
        );
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'Skills não encontrado' });
        } else {
            res.status(200).send({ id, ...req.body });
        }
    } catch (err) {
        res.status(500).send({ message: 'Erro ao atualizar skills', error: err.message });
    }
};

export const deleteSkills = async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await db.promise().query(
            'DELETE FROM skillsData WHERE skills_id = ?',
            [id]
        );
        if (result.affectedRows === 0) {
            res.status(404).send({ message: 'Skills não encontrado' });
        } else {
            res.status(200).send({ message: 'Skills deletado com sucesso' });
        }
    } catch (err) {
        res.status(500).send({ message: 'Erro ao deletar skills', error: err.message });
    }
};
