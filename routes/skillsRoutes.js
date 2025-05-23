import express from 'express';
import { createSkills, getSkills, updateSkills, deleteSkills, getAllSkills } from '../controllers/skillsController.js';

const router = express.Router();

router.post('/skills', createSkills);
router.get('/skills', getAllSkills);
router.get('/skills/:id', getSkills);
router.put('/skills/:id', updateSkills);
router.delete('/skills/:id', deleteSkills);


export default router;
