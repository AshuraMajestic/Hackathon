const mongoose = require('mongoose');
const validator = require('validator');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    universitycode: {
        type: String,
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
    address: {
        type: String,
        required: true
    }
});

const student = new mongoose.model("Student", studentSchema);

module.exports = student;