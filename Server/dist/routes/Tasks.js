"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Tasks_1 = require("../controllers/Tasks");
const Validate_token_1 = __importDefault(require("./Validate-token"));
const router = (0, express_1.Router)();
router.get('/', Validate_token_1.default, Tasks_1.getTask);
exports.default = router;
