const isLoggedIn = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect("/auth/login");
    }
    res.locals.user = req.session.user;
    next();
};

const isLoggedOut = (req, res, next) => {
    if (req.session.user) {
        return res.redirect("/auth/logout");
    }
    next();
};

module.exports = {
    isLoggedIn,
    isLoggedOut,
};
