const usersDB = require('../model/usersDB');
const chatsDB = require('../model/user-chats');
// const activeUser = require('../model/single-user-data');
const serversDB = require('../model/user-chatting-servers');
const { generalErr } = require("./errorcontoller")
var activeUserData;

var fetchAllData = () => {
    usersDB.findOne({ active: true }).then(data => {
        activeUserData = data;
    }).catch(generalErr);
}

fetchAllData();


module.exports = class post {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    get_index() {
        this.res.render("index", {
            pageTitle: "The Deen's Connect | Home",
            styleURLs: ["global"],
            scriptURLs: []
        })
    }

    get_signup() {
        this.res.render("signup", {
            pageTitle: "The Deen's Connect | Sign Up",
            styleURLs: ["global", "signup"],
            scriptURLs: [],
            errorMessage: ""
        })
    }

    get_signin() {
        this.res.render("signin", {
            pageTitle: "The Deen's Connect | Sign In",
            styleURLs: ["global", "signin"],
            scriptURLs: [],
            errorMessage: ""
        })
    }

    post_createaccount() {
        const responses = this.req.body;
        usersDB.findOne({ username: responses.user_username }).then((alternameUsername) => {
            if (alternameUsername != null || alternameUsername != undefined) {
                this.res.render("signup", {
                    pageTitle: "The Deen's Connect | Sign Up",
                    styleURLs: ["global", "signup"],
                    scriptURLs: [],
                    errorMessage: "Please enter another username. One already exists."
                })
            }
            else {
                var dob = `${responses.date_dob}-${responses.month_dob}-${responses.year_dob}`;
                var class_and_section = responses.class + responses.section;
                var adm_no = `${responses.campus_ADM_No}-${responses.adminssion_Code}-${responses.admission_year1}-${responses.admission_year2}`;
                usersDB.create({
                    username: responses.user_username,
                    password: responses.user_password,
                    dateOfBirth: dob,
                    emailAddress: responses.user_email,
                    class_and_section: class_and_section,
                    admissionNumber: adm_no,
                    name: responses.user_real_name,
                    isTeacher: (responses.campus_ADM_No == "T") ? true : false,
                    isAdmin: false,
                    gender: responses.gender,
                    active: false
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

    post_signin() {
        const responses = this.req.body;
        usersDB.findOne({ username: responses.user_username }).then((user_info) => {
            if (user_info != null) {
                if (responses.user_password === user_info.password) {
                    var updated_user = user_info;
                    updated_user.active = true;
                    usersDB.findByIdAndUpdate({ _id: user_info._id }, { '$set': updated_user }, { require: true }).then((udata) => {
                        this.res.redirect('/profile');
                    }).catch(generalErr);
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

    get_profile() {
        if (activeUserData !== {}) {
            this.res.render("profile", {
                pageTitle: "The Deen's Connect | " + activeUserData.username + "'s profile",
                styleURLs: ["global", "profile"],
                scriptURLs: [],
                userDATA: activeUserData
            })
        }
        else {
            this.res.redirect("/");
        }
    }

    get_chats() {
        if (activeUserData != {}) {
            chatsDB.find({}).then((data) => {
                this.res.render("chats", {
                    pageTitle: "The Deen's Connect | Sign In",
                    styleURLs: ["global", "chats", "chatting-areas"],
                    scriptURLs: [],
                    userDATA: activeUserData,
                    chats: data
                })
            });
        }
        else {
            this.res.redirect("/");
        }
    }

    get_servers() {
        if (activeUserData != {}) {
            serversDB.find({}).then((data) => {
                this.res.render("servers", {
                    pageTitle: "The Deen's Connect | Sign In",
                    styleURLs: ["global", "chatting-areas", 'servers'],
                    scriptURLs: [],
                    userDATA: activeUserData,
                    servers: data
                })
            });
        }
        else {
            this.res.redirect("/");
        }
    }

    get_signout() {
        var updated_user = user_info;
        updated_user.active = false;
        usersDB.findByIdAndUpdate({ _id: user_info._id }, { '$set': updated_user }, { require: true }).then((udata) => {
            this.res.redirect('/signin');
        }).catch(generalErr);

    }

    get_settings() {
        this.res.redirect("/settings/customize-profile")
    }

    get_customizeProfile() {
        if (activeUserData != {}) {
            this.res.render("settings", {
                pageTitle: "The Deen's Connect | Sign In",
                styleURLs: ["global", "settings", "/settings/customize-profile"],
                scriptURLs: ["settings"],
                userDATA: activeUserData,
                ejsFile: "customizeprofile"
            })
        }
        else {
            this.res.redirect("/");
        }
    }
    
    get_editPassword() {
        if (activeUserData != {}) {
            this.res.render("settings", {
                pageTitle: "The Deen's Connect | Sign In",
                styleURLs: ["global", "settings", "/settings/customize-profile"],
                scriptURLs: ["settings"],
                userDATA: activeUserData,
                ejsFile: "customizeprofile"
            })
        }
        else {
            this.res.redirect("/");
        }
    }
    
    get_editUsername() {
        if (activeUserData != {}) {
            this.res.render("settings", {
                pageTitle: "The Deen's Connect | Sign In",
                styleURLs: ["global", "settings", "/settings/customize-profile"],
                scriptURLs: ["settings"],
                userDATA: activeUserData,
                ejsFile: "customizeprofile"
            })
        }
        else {
            this.res.redirect("/");
        }
    }
    
    get_changeEmail() {
        if (activeUserData != {}) {
            this.res.render("settings", {
                pageTitle: "The Deen's Connect | Sign In",
                styleURLs: ["global", "settings", "/settings/customize-profile"],
                scriptURLs: ["settings"],
                userDATA: activeUserData,
                ejsFile: "customizeprofile"
            })
        }
        else {
            this.res.redirect("/");
        }
    }

    
    get_forgotPassword() {
        if (activeUserData != {}) {
            this.res.render("settings", {
                pageTitle: "The Deen's Connect | Sign In",
                styleURLs: ["global", "settings", "/settings/customize-profile"],
                scriptURLs: ["settings"],
                userDATA: activeUserData,
                ejsFile: "customizeprofile"
            })
        }
        else {
            this.res.redirect("/");
        }
    }

    
    get_deleteAccount() {
        if (activeUserData != {}) {
            this.res.render("settings", {
                pageTitle: "The Deen's Connect | Sign In",
                styleURLs: ["global", "settings", "/settings/customize-profile"],
                scriptURLs: ["settings"],
                userDATA: activeUserData,
                ejsFile: "customizeprofile"
            })
        }
        else {
            this.res.redirect("/");
        }
    }
}