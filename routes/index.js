import adminRoutes from './admin';
import commonRoutes from './common';
import auth from '../middleware/auth';
import admin from '../middleware/admin';

export default (app) => {
	app.use('/api', commonRoutes);
	app.use('/api/admin', auth, admin, adminRoutes);
	app.use('/api/root', adminRoutes);
}
