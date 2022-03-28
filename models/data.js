const mongoose = require("mongoose");
//const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    restname:String,
    category:String,
    city:String,
    state:String
}) ;
//UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user",UserSchema);