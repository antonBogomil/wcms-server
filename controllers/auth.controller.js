import User from '../models/User';
import { COOKIE_TOKEN, ERRORS, ROLE_ADMIN } from '../constants';
import { errorResponse, successResponse } from '../utils';

const authController = {
    login,
    logout,
    auth
};

function login(req, res) {
    const { login, password } = req.body;
    User.findOne({ login: login }, (err, user) => {

        if (!user) {
            return res.json({
                message: ERRORS.EMAIL_NOT_FOUND
            });
        }
        user.comparePassword(password, (err, isMatch) => {
            if (!isMatch) {
                return res.json({
                    message: ERRORS.WRONG_PASSWORD
                });
            }
            user.generateToken((err, user) => {
                if (err) {
                    return res.send(err);
                }
                res.cookie(COOKIE_TOKEN, user.token)
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
}

function auth(req, res) {
    const user = {
        isAdmin: req.user.role === ROLE_ADMIN,
        email: req.user.email,
        id: req.user.id,
        name: req.user.name,
        image: req.user.image
    };
    return res.json({ user });
}

function logout(req, res) {
    User.findOneAndUpdate({ _id: req.user._id }, { token: '' }, (err, doc) => {
        if (err) errorResponse(res, err);
        successResponse(res);
    });
}

export default authController;
