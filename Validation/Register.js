const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function ValidateReg(data){
    let errors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.pass = !isEmpty(data.pass) ? data.pass : "";
    data.passcon = !isEmpty(data.passcon) ? data.passcon : "";

    //Name validator
    if(Validator.isEmpty(data.name)) {
        errors.name = "Name field is required!";
    }

    //Email validator
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email field is required!";
    }
    
    if(!Validator.isEmail(data.email)) {
        errors.email = "Invalid Email!";
    }

    //Password & Confirm password validator
    if(Validator.isEmpty(data.pass)) {
        errors.pass = "Password field is required!";
    }

    if(Validator.isEmpty(data.passcon)) {
        errors.passcon = "Password field is required!";
    }

    if(!Validator.isLength(data.pass, {min: 6, max: 30})) {
        errors.pass = "Password must be 6-30 characters long!";
    }

    if(!Validator.equals(data.pass, data.passcon)) {
        error.passcon = "Passwords did not match!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
}