import { Router } from 'express';
import { chat } from '../controllers/aiControler.js';

const router = Router();
router.post('/chat', chat);

export default router;
