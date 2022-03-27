const express = require('express');
const app = express();
app.use(express.json({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});
app.get("/", (req, res) => {
    res.send("Root API Works");
});
app.listen(3000, () => {
    console.log("server running on 3003");
});