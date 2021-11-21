const mongoose  = require("mongoose");
const Validator = require("validate");

const StudentSchema = new mongoose.Schema({
    name: {
            type: String,
            required: true,
            minlength:5,
            },
    email:{
            type: String,
            required: true,
            unique: true,
            Validate(value) {
                if(!Validator.isEmail(value)){
                throw new Error("Email is not valid");
                    }
                }
            } ,
    phone: {
            type: Number,
            required: true,
        //     unique: true,
            minlength:5,
           
    },
    address:{
            type: String,
            required: true,
            minlength:5,
    },
});

const Student =  mongoose.model('student',StudentSchema);

module.exports = Student;
    
