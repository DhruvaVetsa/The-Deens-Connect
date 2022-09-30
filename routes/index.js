var express = require('express');
var router = express.Router();

const controller = require('../controller/default-contoller');

router.get('/', (req, res, next) => {
    new controller(req, res, next).get_index();
});

router.get('/signup', (req, res, next) => {
    new controller(req, res, next).get_signup();
});

router.get('/signin', (req, res, next) => {
    new controller(req, res, next).get_signin();
});

router.post('/createaccount', (req, res, next) => {
    new controller(req, res, next).post_createaccount();
})

router.post('/signin', (req, res, next) => {
    new controller(req, res, next).post_signin();
});

router.get('/profile', (req, res, next) => {
    new controller(req, res, next).get_profile();
});

router.get('/servers', (req, res, next) => {
    new controller(req, res, next).get_servers();
});

router.get('/chats', (req, res, next) => {
    new controller(req, res, next).get_chats();
});

router.get('/signout', (req, res, next) => {
    new controller(req, res, next).get_signout();
});

router.get('/settings', (req, res, next) => {
    new controller(req, res, next).get_settings();
});

module.exports = router;