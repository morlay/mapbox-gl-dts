"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var globby_1 = __importDefault(require("globby"));
var files = globby_1.default.sync([
    "./node_modules/mapbox-gl/src/*.js",
    "./node_modules/mapbox-gl/src/**/*.js",
]);
console.log(files);
