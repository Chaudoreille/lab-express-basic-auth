const {
    isLoggedIn,
    isLoggedOut,
    getUser,
} = require("./middleware/route-guard");

const router = require("express").Router();

router.use("/", getUser);

/* GET home page */
router.get("/", (req, res, next) => {
    try {
        res.render("index");
    } catch (error) {
        next(error);
    }
});

router.get("/main", (req, res, next) => {
    try {
        res.render("pages/main");
    } catch (error) {
        next(error);
    }
});

router.get("/private", isLoggedIn, (req, res, next) => {
    try {
        res.render("pages/private");
    } catch (error) {
        next(error);
    }
});

router.use("/auth", require("./auth.route"));

module.exports = router;
