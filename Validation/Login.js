const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function ValidateLogin(data){
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.pass = !isEmpty(data.pass) ? data.pass : "";

    //Email validator
    if(Validator.isEmpty(data.email)) {
        errors.email = "Email field is required!";
    }else if(!Validator.isEmail(data.email)) {
        errors.email = "Invalid Email!";
    }

    //Password & Confirm password validator
    if(Validator.isEmpty(data.pass)) {
        errors.pass = "Password field is required!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};