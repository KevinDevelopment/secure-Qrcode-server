"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const url_1 = require("../../core/entities/url");
const url_2 = require("../../core/value-objects/url");
(0, vitest_1.describe)("Test from url class", () => {
    (0, vitest_1.test)("Should throw an error if URL does not start with http or https", () => {
        (0, vitest_1.expect)(() => new url_2.URL("www.google.com.br")).toThrowError(new Error("A url deve começar com http:// ou https://"));
    });
    (0, vitest_1.test)("should throw an error if URL is diferent from string", () => {
        const teste = 54545454;
        (0, vitest_1.expect)(() => new url_2.URL(teste)).toThrowError(new Error("A url informada deve ser do tipo texto"));
    });
    (0, vitest_1.test)("should return value when url is valid", () => {
        const url = new url_1.UrlToBeChecked(new url_2.URL("https://www.google.com.br"));
        (0, vitest_1.expect)(url.url.value).toBe("https://www.google.com.br");
    });
});
