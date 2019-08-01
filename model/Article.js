import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const articleSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: 1,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    }
});
articleSchema.pre('save', function (next) {

});
const Article = mongoose.model('Article', articleSchema);
export default Article;
