import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
    url: {
        type: String,
        unique: true,
        required: true,
        minLength: 3
    },
    title: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

}, { versionKey: false });
const Page = mongoose.model('Page', pageSchema);
export default Page;
