import express from 'express';
import auth from '../middleware/auth';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.get('/article');
router.get('/auth', auth, authController.auth);
router.get('/logout', auth, authController.logout);
router.post('/login', authController.login);
export default router;
