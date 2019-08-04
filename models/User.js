import mongoose from 'mongoose';
import bcript from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { errorResponse, successResponse } from '../utils';

const { ROLE_DEFAULT } = require('../constants');

const SALT_NUM = 10;
config();

const userSchema = new mongoose.Schema({
    name: {
        type: String
    },
    login: {
        type: String,
        unique: true,
        required: true,
        minLength: 5
    },
    email: {
        type: String, // required: true,
        trim: true,
        unique: 1,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    avatar: {
        type: String,
        default: null
    },
    role: {
        type: Number,
        default: ROLE_DEFAULT,
        enum: [0, 1, 2]
    },
    token: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.generatePassword(next);
    }
    else {
        next();
    }
});
userSchema.methods.generatePassword = function (callback) {
    const user = this;
    bcript.genSalt(SALT_NUM, function (err, salt) {
        if (err) {
            return callback(err);
        }
        bcript.hash(user.password, salt, function (err, hash) {
            if (err) {
                return callback(err);
            }
            user.password = hash;
            return callback();
        });
    });
};
userSchema.methods.comparePassword = function (password, callback) {
    const user = this;
    bcript.compare(password, user.password, function (err, isMatch) {
        if (err) return callback(err);
        return callback(null, isMatch);
    });
};
userSchema.methods.generateToken = function (callback) {
    const user = this;
    const token = jwt.sign(user._id.toHexString(), process.env.SECRET);
    user.token = token;
    user.save((err, user) => {
        if (err) {
            return callback(err);
        }
        return callback(err, user);
    });
};
userSchema.statics.findByToken = function (token, callback) {
    jwt.verify(token, process.env.SECRET, function (err, decode) {
        User.findOne({
            '_id': decode,
            'token': token
        }, (err, user) => {
            if (err) return callback(err);
            return callback(err, user);
        });
    });
};
const User = mongoose.model('User', userSchema);
export default User;
