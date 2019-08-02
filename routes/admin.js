import express from 'express';
import User from '../model/User';
import Article from '../model/Article';
import {successResponse, errorResponse} from '../utils';

const router = express.Router();
router.get('/users', (req, res) => {
	const {page, rows,} = req.query;
	const sort = "role";
	User.getPages({page, rows, sort}, (err, data) => {
		if (err) {
			console.log(err);
		}
		res.json(data);
	});
});
router.get('/users/all', (req, res) => {
	User.find({'role': 0}, {
		email: 1,
		name: 1,
		login: 1,
		avatar: 1,
		role: 1,
        createdAt:1,
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
router.post('/users/add-list', (req, res) => {
	const array = req.body;
	User.createMany(array, function (err, res) {
		if (err) {
			if (err.code === 11000) {
				console.log(err);

				return res.json({
					success: false,
					exist: true
				});
			}
			// errorResponse(res, err);
		}
		console.log(res);
		successResponse(res)
	})
});

router.get('/users/:id', (req, res) => {
	User.findById(req.params.id, {
		email: 1,
		name: 1,
		number: 1
	}, (err, user) => {
		if (err) {
			errorResponse(res, err);
		}
		return successResponse(res, user);
	});
});

router.post('/article/update', (req, res) => {
	const {content, name} = req.body;
	Article.findOneAndUpdate({_id: req.body._id}, {
		$set: {
			content,
			name
		}
	}, {new: true}, (err, result) => {
		if (err) errorResponse(res, err);
		return successResponse(res, result);
	});
});
export default router;
