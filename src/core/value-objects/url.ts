
export class URL {
    private _value: string;

    constructor(_value: string) {
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

    public get value(): string {
        return this._value;
    }
}