import * as mongoose from 'mongoose';
import Counters from './Counter';


const menuSchema = new mongoose.Schema({
    title: {
        type: String
    },
    url: {
        type: String
    },
    order: {
        type: Number,
        unique: false
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    }]
});
menuSchema.pre('save', function (next) {
    const menu = this;
    if (!menu.order) {
        Counters.findOneAndUpdate({ _id: 'menuId' }, { $inc: { sequence_value: 1 } }, { new: true }, function (err, seq) {
            if (err) return next(err);
            menu.order = seq.sequence_value;
            next();
        });
    }
    else {
        next();
    }
});
const Menu = mongoose.model('Menu', menuSchema);


export default Menu;
