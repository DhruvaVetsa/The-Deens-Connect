const usersDB = require('../model/usersDB');
const { generalErr } = require('./errorcontoller');

module.exports = class post {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    createaccount() {
        const responses = this.req.body;
        usersDB.findOne({ username: responses.user_username }).then((alternameUsername) => {
            if (alternameUsername != null) {
                this.res.render("signup", {
                    pageTitle: "The Deen's Connect | Sign Up",
                    styleURLs: ["global", "signup"],
                    scriptURLs: [],
                    errorMessage: "Please enter another username. One already exists."
                })
            }
            else {
                usersDB.create({
                    username: responses.user_username,
                    password: responses.user_password,
                    dateOfBirth: responses.user_dob,
                    emailAddress: responses.user_email,
                    class_and_section: responses.user_class,
                    admissionNumber: responses.user_admission_number,
                    name: responses.user_real_name,
                    isTeacher: (responses.user_admission_number == "Teacher") ? true : false,
                    isAdmin: false,
                }).then((data) => {
                    this.res.render("/", {
                        pageTitle: "The Deen's Connect | Sign Up",
                        styleURLs: ["global"],
                        scriptURLs: []
                    })
                }).catch(generalErr)
            }
        }).catch(generalErr)
    }

    signin() {
        var user_info;
        const responses = this.req.body;
        usersDB.findOne({ username: responses.user_username }).then((user) => {
            if (user != null) {
                if (responses.user_password === user.password) {
                    user_info = user;
                }
                else {
                    this.res.render("signin", {
                        pageTitle: "The Deen's Connect | Sign In",
                        styleURLs: ["global", "signin"],
                        scriptURLs: [],
                        errorMessage: "Please enter the correct password hAcKeR!"
                    })
                }
            }
            else {
                this.res.render("signin", {
                    pageTitle: "The Deen's Connect | Sign In",
                    styleURLs: ["global", "signin"],
                    scriptURLs: [],
                    errorMessage: "Please enter the correct username. It is cAsE sEnsItiVe"
                })
            }
        }).catch(generalErr);
    }
}