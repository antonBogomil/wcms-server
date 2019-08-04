import Controller from './controller';
import User from '../models/User';
const userController = new Controller(User);
userController.resultSelect = {
    email: 1,
    login: 1,
    role: 1,
    avatar: 1,
    active: 1,
    _id: 1,
    name: 1,
    createdAt: 1
};
export default userController;
