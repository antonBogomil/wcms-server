import express from 'express';
import userController from '../controllers/users.controller';
import pagesController from '../controllers/pages.controller';
// import { validate } from '../middleware/validate';

const router = express.Router();
router.get('/users', userController.getSome);
router.get('/users/all', userController.getAll);
router.get('/users/:id', userController.getById);
router.post('/users/add', userController.createOne);
router.post('/users/add-list', userController.createSome);
router.post('/users/update', userController.update);

router.get('/pages', pagesController.getSome);
router.post('/pages/add', pagesController.createOne);
router.post('/pages/update', pagesController.update);

// router.post('/article/update');
export default router;
