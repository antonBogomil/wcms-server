import { errorResponse, successResponse } from '../utils';

function Controller(Model) {
    this.Model = Model;
    this.resultSelect = {};
    this.getById = getById.bind(this);
    this.createOne = createOne.bind(this);
    this.getSome = getSome.bind(this);
    this.getAll = getAll.bind(this);
    this.createSome = createSome.bind(this);
    this.update = update.bind(this);
}

function getById(req, res) {
    const { id } = req.params;
    this.Model.findById(id, this.resultSelect, (err, result) => {
        if (err) return next(err);
        return res.json({ result });
    });
};

function getBy(fieldName, select) {
    const { Model, resultSelect } = this;
    return function (req, res) {
        const param = req.params[fieldName];
        Model.findOne({ [fieldName]: param }, select || resultSelect, function (err, result) {
            if (err) return next(err);
            return res.json({ result });
        });
    };
};

function getSome(req, res) {
    let { page, rows, sort } = req.query;
    page = +page || 0;
    rows = +rows || 0;
    const { Model, resultSelect } = this;
    Model.find({}, resultSelect)
      .sort({ [sort]: 1 })
      .skip(page * rows)
      .limit(rows)
      .exec((err, docs) => {
          Model.countDocuments()
            .exec(function (err, count) {
                if (err) return res.json(err);
                return res.json({
                    items: docs,
                    count: count,
                    rows: rows,
                    page: page,
                    sort: sort
                });
            });
      });
};

function getAll(req, res) {
    this.Model.find({}, this.resultSelect, (err, result) => {
        if (err) errorResponse(res, err);
        successResponse(res, result);
    });
};

function createOne(req, res) {
    const Model = this.Model;
    const item = new Model(req.body);
    item.save((err, doc) => {
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
};

function createSome(req, res) {
    const Model = this.Model;
    const data = req.body;
    Model.collection.insert(data, function (err, doc) {
        if (err) {
            if (err.code === 11000) {
                return res.json({
                    success: false,
                    exist: true
                });
            }
            return res.send(err);
        }
        Model.collection.count(function (err, count) {
            if (err) return res.json(err);
            return res.json({
                success: true,
                inserted: doc.insertedCount,
                total: count
            });
        });
    });
};

function update(req, res) {
    const Model = this.Model;
    const data = req.body;
    Model.findOneAndUpdate({ _id: data._id }, { $set: data }, { new: true }, function (err, doc) {
        if (err) { throw err; }
        else { res.send(doc); }
    });
};
export default Controller;
