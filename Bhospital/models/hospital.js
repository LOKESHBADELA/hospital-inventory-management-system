
const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/backendHospital");

const hospitalModel = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('Hospital', hospitalModel);