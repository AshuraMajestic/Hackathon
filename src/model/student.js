const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
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
    enroll: {
        type: Number,
        required: true,
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
    semester: {
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
    }
});

const student = new mongoose.model("Student", studentSchema);

module.exports = student;