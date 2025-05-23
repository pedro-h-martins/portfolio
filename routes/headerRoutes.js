import express from 'express';
import { createHeader, getAllHeaders, getHeader, updateHeader, deleteHeader } from '../controllers/headerController.js';

const router = express.Router();

router.post('/header', createHeader);
router.get('/headers', getAllHeaders);
router.get('/header/:id', getHeader);
router.put('/header/:id', updateHeader);
router.delete('/header/:id', deleteHeader);

export default router;
