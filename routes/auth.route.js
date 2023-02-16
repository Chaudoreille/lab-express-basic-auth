const router = require("express").Router();
const bcryptjs = require("bcryptjs");
const e = require("express");
const User = require("../models/User.model");
const saltRounds = 10;

router.get("/signup", (req, res, next) => {
    try {
        res.render("auth/signup");
    } catch (error) {
        next(error);
    }
});

router.post("/signup", async (req, res, next) => {
    try {
        res.locals.errors = {
            username: false,
            password: false,
            messages: [],
        };
        const { username, password } = req.body;

        if (!password) {
            res.locals.errors.password = true;
            res.locals.errors.messages.push("Password is required.");
        } else if (password.length < 8) {
            res.locals.errors.password = true;
            res.locals.errors.messages.push(
                "Password should be at least 8 characters long."
            );
        }

        // const existingUser = await User.findOne({ username: username });
        if (!username) {
            res.locals.errors.username = true;
            res.locals.errors.messages.push("Username is required.");
        } else {
            if (await User.findOne({ username })) {
                res.locals.errors.username = true;
                res.locals.errors.messages.push(
                    "Sorry, this username already exists!"
                );
            }
        }

        if (res.locals.errors.messages.length) {
            res.locals.username = username;
            return res.render("auth/signup");
        }
        const salt = await bcryptjs.genSalt(saltRounds);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await User.create({
            username,
            "password": hashedPassword,
        });

        res.redirect("login");
    } catch (error) {
        next(error);
    }
});

router.get("/login", (req, res, next) => {
    try {
        console.log("SESSION =====> ", req.session);

        res.render("auth/login");
    } catch (error) {
        next(error);
    }
});

router.post("/login", async (req, res, next) => {
    try {
        const { username, password } = req.body;

        if (!username) {
            // handle empty username
        }
        if (!password) {
            // handle empty password
        }

        const userPassword = await User.findOne({ username }, { password: 1 });

        if (!userPassword) {
            // handle user not found
        }

        const passwordMatch = await bcryptjs.compareSync(
            password,
            userPassword
        );
        if (!passwordMatch) {
            // handle wrong password error
        }

        const user = await User.findOne({ username });

        // create session
        // add user to session
        res.redirect("/");
    } catch (error) {
        next(error);
    }
});

module.exports = router;
