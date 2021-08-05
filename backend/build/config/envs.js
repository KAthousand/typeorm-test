"use strict";
// Accesses a variable inside of process.env, throwing an error if it's not found.
// Always run this method in advance (ie. upon initialization) so that error is thrown as early as possible.
// Caching the value improves performance - accessing process.env many times is bad.
Object.defineProperty(exports, "__esModule", { value: true });
const cache = {};
const accessEnv = (key, defaultValue) => {
    if (!(key in process.env) || typeof process.env[key] === undefined) {
        if (defaultValue)
            return defaultValue;
        throw new Error(`${key} not found in Environment Variables`);
    }
    if (!(key in cache)) {
        cache[key] = process.env[key];
    }
    return cache[key];
};
exports.default = accessEnv;
