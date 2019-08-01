import express from 'express';
import Article from '../model/Article';
import User from '../model/User';
import { errorResponse, successResponse } from '../utils';
import auth from '../middleware/auth';
import { COOKIE_TOKEN, ERRORS, ROLE_ADMIN } from '../constants';
import Menu from '../model/Menu';

const router = express.Router();
router.get('/article', (req, res) => {
    const name = req.query.name;
    Article.findOne({ 'name': name }, (err, result) => {
        if (err) errorResponse(res, err);
        successResponse(res, result);
    });
});

router.get('/menu', (req, res) => {
    const menu = new Menu({
        title: 'Sub menu 1',
        children: '5d34c6e45d10611614ba83d0'
    });
    menu.save((err, doc) => {
        if (err) errorResponse(res, err);
        successResponse(res, doc);
    });
});

router.get('/auth', auth, (req, res) => {
    const user = {
        isAdmin: req.user.role === ROLE_ADMIN,
        email: req.user.email,
        id: req.user.id,
        name: req.user.name,
        image: req.user.image
    };
    res.status(200);
    return res.json({ user });
});
router.get('/logout', auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
        if (err) errorResponse(res, err);
        successResponse(res);
    });
});
router.post('/login', (req, res) => {
    const { login, password } = req.body;
    User.findOne({ login: login }, (err, user) => {
        if (!user) {
            return res.status(400)
              .json({
                  message: ERRORS.EMAIL_NOT_FOUND
              });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
                return res
                  .json({
                      message: ERRORS.WRONG_PASSWORD
                  });
            }
            user.generateToken((err, user) => {
                if (err) {
                    return res.status(500);
                }
                res.cookie(COOKIE_TOKEN, user.token)
                  .status(200)
                  .json({
                      user: {
                          name: user.name,
                          id: user.id,
                          email: user.email,
                          isAdmin: user.role === ROLE_ADMIN,
                          image: ''
                      }
                  });
            });
        });
    });
});
export default router;
