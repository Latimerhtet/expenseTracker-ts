"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_js_1 = require("../Controllers/auth.js");
var router = express_1.default.Router();
router.post("/register", auth_js_1.register);
exports.default = router;
