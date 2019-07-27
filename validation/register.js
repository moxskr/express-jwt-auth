module.exports = function({email, login, password, passwordConfirm}){
    const errors = {};
    let isValid = true;

    if(email.length < 8){
        isValid = false;
        errors.email = 'Email isnt valid';
    }
    if(login.length < 6){
        isValid = false;
        errors.login = 'Login isnt valid';
    }
    if(password.length < 6){
        isValid = false;
        errors.password = 'Password isnt valid';
    }
    if(passwordConfirm !== password){
        isValid = false;
        errors.passwordConfirm = 'Passwrods arent equal';
    }

    return {
        isValid,
        errors
    }
};