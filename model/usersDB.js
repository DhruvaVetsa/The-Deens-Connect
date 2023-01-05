const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://The-Deens-Connect:ZhoXICZ3ah7pIaGy@all-data.ldbkbgx.mongodb.net/?retryWrites=true&w=majority");

let schema = mongoose.Schema(
    {
        username: String,
        password: String,
        dateOfBirth: String,
        emailAddress: String,
        class_and_section: String,
        admissionNumber: String,
        name: String,
        isAdmin: Boolean,
        isTeacher: Boolean,
        gender : String,
        active : Boolean,
        profileDetails : {
            aboutUser : String,
            userLikings : String,
            userDream : String,
            discordName : String,
            discordID : Number,
            youtubeChannel : String,
            skype : String,
            github : String,
            insta : String,
            fb : String
        },
        dpImageDataURL : String,
        // 
        profileBannerColour : String
    }
);

module.exports = mongoose.model("usersData", schema);