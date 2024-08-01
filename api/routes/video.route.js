import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deletevideo, getvideos, updatevideo } from '../controllers/video.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getvideos', getvideos)
router.delete('/deletevideo/:videoId/:userId', verifyToken, deletevideo)
router.put('/updatevideo/:videoId/:userId', verifyToken, updatevideo)

export default router;