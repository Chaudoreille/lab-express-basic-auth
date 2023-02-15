const router = require("express").Router();

/* GET home page */
router.get("/", (req, res, next) => {
    try {
        res.render("index");
    } catch (error) {
        next(error);
    }
});

router.use("/auth", require("./auth.route"));

module.exports = router;
