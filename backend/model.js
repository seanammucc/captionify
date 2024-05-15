const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    session_id: String
})

const User = mongoose.model('User', userSchema);

module.exports = User;