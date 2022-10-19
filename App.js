"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hello = void 0;
const world = "Hi";
function hello(word = world) {
    return `Hello ${world}! `;
}
exports.hello = hello;
