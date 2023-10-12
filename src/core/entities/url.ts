import { URL } from "../value-objects/url";

export class UrlToBeChecked {
    private _url: URL;

    constructor(_url: URL) {
        this._url = _url;
    }

    public get url() {
        return this._url
    }
}