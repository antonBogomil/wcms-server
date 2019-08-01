require('dotenv');
const mongoose = require('mongoose');

module.exports = function () {
    console.log(process.env.DATABASE);
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.DATABASE, {useNewUrlParser: true})
        .then(() => {
            console.log(`Connected to ${process.env.DATABASE}...`);
        })
        .catch((err) => {
            console.error(err);
        });
};