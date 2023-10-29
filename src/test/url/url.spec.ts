import { describe, expect, test } from "vitest";
import { UrlToBeChecked } from "../../core/entities/url";
import { URL } from "../../core/value-objects/url";

describe("Test from url class", () => {

    test("Should throw an error if URL does not start with http or https", () => {
        expect(() => new URL("www.google.com.br")).toThrowError(new Error("A url deve começar com http:// ou https://"));
    });

    test("should throw an error if URL is diferent from string", () => {
        const teste = 54545454 as any;
        expect(() => new URL(teste)).toThrowError(new Error("A url informada deve ser do tipo texto"));
    });

    test("should return value when url is valid", () => {
        const url = new UrlToBeChecked(new URL("https://www.google.com.br"));
        expect(url.url.value).toBe("https://www.google.com.br");
    });
});