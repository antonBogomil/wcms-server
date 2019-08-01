import express from 'express';
import User from '../model/User';
import Article from '../model/Article';
import { successResponse, errorResponse } from '../utils';
const router = express.Router();
router.get('/users', (req, res) => {
    User.find({ 'role': 0 }, {
        email: 1,
        name: 1,
        number: 1
    }, (err, result) => {
        if (err) errorResponse(res, err);
        successResponse(res, result);
    });
});
router.post('/users/add', (req, res) => {
    const user = new User(req.body);
    user.save((err, doc) => {
        if (err) {
            if (err.code === 11000) {
                return res.json({
                    success: false,
                    exist: true
                });
            }
            errorResponse(res, err);
        }
        successResponse(res, doc);
    });
});
router.get('/users/:id', (req, res) => {
    User.findById(req.params.id, {
        email: 1,
        name: 1,
        number: 1
    }, (err, user) => {
        if (err) {errorResponse(res, err);}
        return successResponse(res, user);
    });
});

router.post('/article/update', (req, res) => {
    const { content, name } = req.body;
    Article.findOneAndUpdate({ _id: req.body._id }, {
        $set: {
            content,
            name
        }
    }, { new: true }, (err, result) => {
        if (err) errorResponse(res, err);
        return successResponse(res, result);
    });
});
export default router;
