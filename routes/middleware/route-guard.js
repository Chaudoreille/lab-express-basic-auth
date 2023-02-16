const getUser = require("express").Router();

const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/auth/login");
    }
    next();
};

const isLoggedOut = (req, res, next) => {
    if (req.session.user) {
        return res.redirect("/private");
    }
    next();
};

getUser.use("/", (req, res, next) => {
    if (req.session.user) {
        res.locals.user = req.session.user;
    }
    next();
});

module.exports = {
    isLoggedIn,
    isLoggedOut,
    getUser,
};
