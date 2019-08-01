import { COOKIE_TOKEN } from '../constants';
import User from '../model/User';

const auth = (req, res, next) => {
    let token = req.cookies[COOKIE_TOKEN];
    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ message: 'Not auth!' });
        }
        req.token = token;
        req.user = user;
        next();
    });
};
export default auth;
