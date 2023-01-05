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

router.post('/profile-customization-post-req', (req, res, next) => {
    new controller(req, res, next).post_profileCustomization();
});

router.get('/make-your-dp', (req, res, next) => {
    new controller(req, res, next).getDPMaker();
})

router.post('/changeDP', (req, res, next) => {
    new controller(req, res, next).postUpdateDP();
})

router.post('/deleteaccount', (req, res, next) => {
    new controller(req, res, next).postDeleteAccount();
})

router.post('/change-profile-banner-colour', (req, res, next) => {
    new controller(req, res, next).postChangeProfileBanner();
})

module.exports = router;