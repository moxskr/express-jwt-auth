const express = require('express');
const hbs = require('hbs');
const Cookies = require('cookies');
const jwt_decode = require('jwt-decode');
const router = express.Router();

router.get("/", (req, res) => {
    const cookie = new Cookies(req, res);
    let token = cookie.get('token');
    if(token) {
        const {login} = jwt_decode(token);
        res.render("../view/index.hbs", {
            login
        });
    }else{
        res.render("../view/index.hbs");
    }
});

hbs.registerHelper("showLogin", (login) => {
    if(login){
        return new hbs.SafeString(login + "");
    }
    else{
        return new hbs.SafeString("Guest");
    }
});

router.get("/login", (req, res) => {
    const cookie = new Cookies(req, res);
    let token = cookie.get('token');
    if(token){
        res.redirect("/");
    }else {
        res.render("../view/login.hbs");
    }
});

router.get("/register", (req, res) => {
    const cookie = new Cookies(req, res);
    let token = cookie.get('token');
    if(token){
        res.redirect("/");
    }else {
        res.render("../view/register.hbs");
    }
});

module.exports = router;