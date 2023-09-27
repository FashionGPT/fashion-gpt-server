const mongoose = require('mongoose');

let UserSchema = new mongoose.Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
});

mongoose.model('User', UserSchema);
