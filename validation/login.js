module.exports = function({login, password}){
    const errors = {};
    let isValid = true;

    if(login.length < 6){
        isValid = false;
        errors.login = 'Login isnt valid';
    }
    if(password.length < 6){
        isValid = false;
        errors.password = 'Password isnt valid';
    }

    return {
        isValid,
        errors
    }
};