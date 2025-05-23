import express from 'express';
import { createResume, getResume, updateResume, deleteResume, getAllResumes } from '../controllers/resumeController.js';

const router = express.Router();

router.post('/resume', createResume);
router.get('/resumes', getAllResumes);
router.get('/resume/:id', getResume);
router.put('/resume/:id', updateResume);
router.delete('/resume/:id', deleteResume);


export default router;
