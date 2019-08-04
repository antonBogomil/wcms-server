import Article from '../models/Article';
import { errorResponse, successResponse } from '../utils';

const componentsController = {updateArticle,getArticle};

function updateArticle(req, res) {
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
}

function getArticle(req, res) {
    const name = req.query.name;
    Article.findOne({ 'name': name }, (err, result) => {
        if (err) errorResponse(res, err);
        successResponse(res, result);
    });
}
