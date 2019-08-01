import constants from '../constants';
const {ROLE_ADMIN, ERRORS: {NOT_ADMIN}} = constants;
const admin = (req, res, next) => {
    if (req.user.role !== ROLE_ADMIN) {
        return res.status(403).json({success: false,message: NOT_ADMIN});
    }
    next();
};
export default admin;
