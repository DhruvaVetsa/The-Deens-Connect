var express = require('express');
var router = express.Router();

const controller = require('../controller/default-contoller');

router.get('/customize-profile', (req, res, next) => {
    new controller(req, res, next).get_customizeProfile();
});

router.get('/edit-password', (req, res, next) => {
    new controller(req, res, next).get_editPassword();
});

router.get('/edit-username', (req, res, next) => {
    new controller(req, res, next).get_editUsername();
});

router.get('/change-email-address', (req, res, next) => {
    new controller(req, res, next).get_changeEmail();
});

router.get('/forgot-password', (req, res, next) => {
    new controller(req, res, next).get_forgotPassword();
});

router.get('/delete-account', (req, res, next) => {
    new controller(req, res, next).get_deleteAccount();
});

module.exports = router;