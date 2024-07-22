"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../controllers/User");
const router = (0, express_1.Router)();
router.post('/', User_1.newUser);
router.post('/login', User_1.loginUser);
exports.default = router;
