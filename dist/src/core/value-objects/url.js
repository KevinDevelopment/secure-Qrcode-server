"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = void 0;
class URL {
    _value;
    constructor(_value) {
        if (typeof (_value) == "string") {
            if (!(_value.startsWith("http://")) && !(_value.startsWith("https://"))) {
                throw new Error("A url deve começar com http:// ou https://");
            }
        }
        if (typeof (_value) !== "string") {
            throw new Error("A url informada deve ser do tipo texto");
        }
        this._value = _value;
        Object.freeze(this);
    }
    get value() {
        return this._value;
    }
}
exports.URL = URL;
