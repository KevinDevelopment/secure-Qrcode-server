import { describe, expect, test } from "vitest";
import { UrlToBeChecked } from "../../core/entities/url";
import { URL } from "../../core/value-objects/url";

describe("Test from url class", () => {

    test("Should throw an error if URL does not start with http or https", () => {
        expect(() => new URL("www.google.com.br")).toThrowError("A url deve começar com http:// ou https://");
    });

    test("should return value when url is valid", () => {
        const url = new UrlToBeChecked(new URL("https://www.google.com.br"));
        expect(url.url.value).toBe("https://www.google.com.br");
    });

})