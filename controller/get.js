module.exports = class get {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    index() {
        this.res.render("index", {
            pageTitle: "The Deen's Connect | Home",
            styleURLs: ["global"],
            scriptURLs: []
        })
    }

    signup() {
        this.res.render("signup", {
            pageTitle: "The Deen's Connect | Sign Up",
            styleURLs: ["global", "signup"],
            scriptURLs: [],
            errorMessage : ""
        })
    }

    signin() {
        this.res.render("signin", {
            pageTitle: "The Deen's Connect | Sign In",
            styleURLs: ["global", "signin"],
            scriptURLs: [],
            errorMessage : ""
        })
    }
}