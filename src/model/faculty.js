const mongoose = require('mongoose');
const validator = require('validator');

const facultySchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true,
        minLength: 4
    },
    email: {
        type: String,
        required: true,
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error("Invalid email");
            }
        },
    },
    experience: {
        type: Number,
        required: true,
        minLength: 1,
        maxLength: 2
    },
    password: {
        type: String,
        required: true
    },
    collegecode: {
        type: String,
        required: true
    },
    expertise: {
        type: String,
        required: true
    }
});

const faculty = new mongoose.model("Faculty", facultySchema);

module.exports = faculty;