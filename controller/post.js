const usersDB = require('../model/usersDB');
const { generalErr } = require('./errorcontoller')

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

                    this.res.render("signup", {
                        pageTitle: "The Deen's Connect | Sign Up",
                        styleURLs: ["global", "signup"],
                        scriptURLs: [],
                        errorMessage: ""
                    })
                }).catch(generalErr)
            }
        }).catch(generalErr)
    }
}