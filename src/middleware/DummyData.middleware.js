function verifyCreateOne(req, res, next) {
    console.debug("Running verifyCreateOne middleware to verify request body");
    if (req?.body?.field1 === undefined) {
        res.send({message: "Invalid input", reason: "Please include field1"}).status(400);
        return;
    }
    if (req?.body?.field2 === undefined) {
        res.send({message: "Invalid input", reason: "Please include field2"}).status(400);
        return;
    }
    next();
}

module.exports = { verifyCreateOne };
