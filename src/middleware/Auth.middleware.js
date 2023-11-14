const mongoose = require("mongoose");
const User = mongoose.model("User");

function createOAuthUser(req, res, next) {
    let auth0User = req?.headers?.user;
    // console.debug("Req header user", auth0User);

    if (auth0User) {
        auth0User = JSON.parse(auth0User);
        const userId = auth0User.sub || "";
        User.exists({auth0ID: userId}).then((res0) => {
            // console.debug("User exists", res0);
            if (res0 === true || res0?._id !== undefined) {
                User.findOne({auth0ID: userId}).then((res1) => {
                    if (req?.body) {
                        req.body.userID = res1._id;
                        req.body.userId = res1._id;
                    }
                    next();
                }).catch((err) => {
                    res.status(500).send({message: "Unable to get user"});
                    console.error("Unable to get user", err);
                });
            } else {
                const user = new User();
                user.first_name = auth0User.family_name || "Unknown";
                user.last_name = auth0User.given_name || "Unknown";
                user.username = auth0User.nickname || "Unknown";
                user.email = auth0User.email || "Unknown";
                user.auth0ID = auth0User.sub || "Unknown";

                user.save().then((res1) => {
                    if (req?.body) {
                        req.body.userID = res1._id;
                        req.body.userId = res1._id;
                    }
                    next();
                }).catch((err) => {
                    res.status(500).send({message: "Unable to create user from OAuth details"});
                    console.error("Unable to create user", err);
                });
            }
        }).catch((err) => {
            res.status(500).send({message: "Unable to verify if user exists"});
            console.error("Unable to verify if user exists", err);
        })
    } else {
        next();
    }
}

module.exports = { createOAuthUser };
