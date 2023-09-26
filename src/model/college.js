const mongoose = require('mongoose');


const collegeSchema = new mongoose.Schema({
    collegename: {
        type: String,
        required: true,
    },
    collegecode: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    universitycode: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    }
});

const college = new mongoose.model("College", collegeSchema);

module.exports = college;