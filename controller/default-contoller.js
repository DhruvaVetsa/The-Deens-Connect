const usersDB = require('../model/usersDB');
const { generalErr } = require("./errorcontoller");
const nodemailer = require('nodemailer');

var activeUserData = {};
var profile;
var roleIcon;

var fetchAllData = () => {
    usersDB.findOne({ active: true }).then(data => {
        profile = `<i class="fa-solid fa-person${(data.gender == 'Female') ? '-dress' : ''}"></i>`;
        activeUserData = data;
        if (data.isAdmin) {
            roleIcon = "screwdriver-wrench"
        }
        else if (data.isTeacher) {
            roleIcon = "chalkboard-user";
        }
        else {
            roleIcon = "graduation-cap";
        }
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
                    active: false,
                    profileDetails: {
                        aboutUser: "Write About Yourself",
                        userLikings: "What Do You Like?",
                        userDream: "I want to become a...",
                        discordName: "",
                        discordID: 1001,
                        youtubeChannel: "",
                        skype: "",
                        github: "",
                        insta : "",
                        fb : ""
                    }
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
                        activeUserData = udata;
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
        fetchAllData();
        if (activeUserData !== {}) {
            this.res.render("profile", {
                pageTitle: "The Deen's Connect | " + activeUserData.username + "'s profile",
                styleURLs: ["global", "profile"],
                scriptURLs: [],
                userDATA: activeUserData,
                maleFemaleIcon: profile
            })
        }
        else {
            this.res.redirect("/");
        }
    }

    get_chats() {
        fetchAllData();
        if (activeUserData != {}) {
            this.res.render("chats", {
                pageTitle: "The Deen's Connect | Chats",
                styleURLs: ["global", "chats", "chatting-areas"],
                scriptURLs: [],
                userDATA: activeUserData,
                maleFemaleIcon: profile
            })
        }
        else {
            this.res.redirect("/");
        }
    }

    get_servers() {
        fetchAllData();
        if (activeUserData != {}) {
            this.res.render("servers", {
                pageTitle: "The Deen's Connect | Servers",
                styleURLs: ["global", "chatting-areas", 'servers'],
                scriptURLs: [],
                userDATA: activeUserData,
                maleFemaleIcon: profile
            })
        }
        else {
            this.res.redirect("/");
        }
    }

    get_signout() {
        fetchAllData();
        var updated_user = activeUserData;
        updated_user.active = false;
        usersDB.findByIdAndUpdate({ _id: activeUserData._id }, { '$set': updated_user }, { require: true }).then((udata) => {
            this.res.redirect('/signin');
        }).catch(generalErr);

    }

    get_settings() {
        fetchAllData();
        if (activeUserData != {}) {
            this.res.render("settings", {
                pageTitle: "The Deen's Connect | Settings",
                styleURLs: ["global", "settings", "general-settings"],
                scriptURLs: ["settings"],
                userDATA: activeUserData,
                maleFemaleIcon: profile,
                occupation : roleIcon
            })
        }
        else {
            this.res.redirect("/");
        }
    }

    get_customizeProfile() {
        fetchAllData();
        if (activeUserData != {}) {
            this.res.render("settings/customizeprofile", {
                pageTitle: "The Deen's Connect | Customize Profile",
                styleURLs: ["global", "settings", "customize-profile"],
                scriptURLs: ["settings"],
                userDATA: activeUserData,
                maleFemaleIcon: profile
            })
        }
        else {
            this.res.redirect("/");
        }
    }

    get_editPassword() {
        fetchAllData();
        if (activeUserData != {}) {
            this.res.render("settings", {
                pageTitle: "The Deen's Connect | Edit Password",
                styleURLs: ["global", "settings"],
                scriptURLs: ["settings"],
                userDATA: activeUserData,
                maleFemaleIcon: profile
            })
        }
        else {
            this.res.redirect("/");
        }
    }

    get_editUserDetails() {
        fetchAllData();
        if (activeUserData != {}) {
            this.res.render("settings/editusername", {
                pageTitle: "The Deen's Connect | Edit Details",
                styleURLs: ["global", "settings"],
                scriptURLs: ["settings"],
                userDATA: activeUserData,
                maleFemaleIcon: profile
            })
        }
        else {
            this.res.redirect("/");
        }
    }

    get_deleteAccount() {
        fetchAllData();
        if (activeUserData != {}) {
            this.res.render("settings/delete-account", {
                pageTitle: "The Deen's Connect | Delete Account",
                styleURLs: ["global", "settings"],
                scriptURLs: ["settings"],
                userDATA: activeUserData,
                maleFemaleIcon: profile,
                error: "",
                username: activeUserData.username
            })
        }
        else {
            this.res.redirect("/");
        }
    }

    post_profileCustomization() {
        fetchAllData();
        var responses = this.req.body;
        var updated_user = activeUserData;
        
        updated_user.profileDetails = responses;
        usersDB.findByIdAndUpdate({ _id: activeUserData._id }, { '$set': updated_user }, { require: true }).then((udata) => {
            this.res.redirect('/profile');
        }).catch(generalErr);
    }

    getDPMaker() {
        fetchAllData();
        if (activeUserData != {}) {
            this.res.render("settings/dpmaker", {
                pageTitle: "The Deen's Connect | DP Maker",
                styleURLs: ["global", "settings"],
                scriptURLs: ["settings"],
                userDATA: activeUserData,
                maleFemaleIcon: profile
            })
        }
        else {
            this.res.redirect("/");
        }
    }

    postUpdateDP() {
        fetchAllData();
        var dataurl = this.req.body.dataurl;
        var updated_user = activeUserData;
        updated_user.dpImageDataURL = dataurl;
        usersDB.findByIdAndUpdate({ _id: activeUserData._id }, { '$set': updated_user }, { require: true }).then((data) => {
            this.res.redirect('/settings');
        }).catch(generalErr);
    }

    postDeleteAccount() {
        fetchAllData();
        var errorMessage = "";
        var { user_realname, user_username, user_password, user_email } = this.req.body;
        if (user_realname != activeUserData.name) {
            errorMessage = "Enter you r Name correctly";
        }
        else if (user_username != activeUserData.username) {
            errorMessage = "Enter your Username correctly";
        } else if (user_password != activeUserData.password) {
            errorMessage = "Enter your Password correctly";
        } else if (user_email != activeUserData.emailAddress) {
            errorMessage = "Enter your Email Address correctly";
        }
        if (errorMessage == "") {
            usersDB.findByIdAndRemove(activeUserData._id).then(() => {
                console.log("Account Successfully Deleted!");
                this.res.redirect("/");
            })
        }
    }

    postChangeProfileBanner() {
        fetchAllData();
        var updated_user = activeUserData;
        updated_user.profileBannerColour = this.req.body.bannerColor;
        usersDB.findByIdAndUpdate({ _id: activeUserData._id }, { '$set': updated_user }, { require: true }).then((updatedData) => {
            this.res.redirect('/settings');
        }).catch(generalErr);
    }
}