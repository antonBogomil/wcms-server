'use strict';
const ROLE_ADMIN = 0;
const ROLE_DEFAULT = 1;
const COOKIE_TOKEN = 'u_auth';

const ERRORS = {
    EMAIL_NOT_FOUND: 'User not found!',
    WRONG_PASSWORD: 'Wrong password! Try again.',
    NOT_ADMIN: 'You are not allowed. Admin role only!'
};

module.exports = {ROLE_ADMIN, ROLE_DEFAULT, COOKIE_TOKEN, ERRORS};
