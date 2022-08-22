var express = require('express');
var router = express.Router();

const post = require('../controller/post');
const get = require('../controller/get');

router.get('/', (req, res, next) => {
    new get(req, res, next).index();
});

router.get('/signup', (req, res, next) => {
    new get(req, res, next).signup();
});

router.get('/signin', (req, res, next) => {
    new get(req, res, next).signin();
});

router.post('/createaccount', (req, res, next) => {
    new post(req, res, next).createaccount();
})

router.post('/signin', (req, res, next) => {
    new post(req, res, next).createaccount();
})

module.exports = router;
