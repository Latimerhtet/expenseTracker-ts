"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_js_1 = require("./routes/auth.js");
var body_parser_1 = require("body-parser");
var app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get("/", function (req, res) {
    res.send("Hello world");
});
app.use(auth_js_1.default);
app.listen(5333, function () {
    console.log("Server running at port 5333 and testing!!");
});
