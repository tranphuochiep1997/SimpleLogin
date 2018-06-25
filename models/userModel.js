const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema ({
    userName: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
}, {collection: "User"});

module.exports = mongoose.model("User", userSchema);