import { IUrlPort } from "../port/url-port";
import { IUrlInputDto } from "../dto/url-dto";
import { IUrlOutPutDto } from "../dto/url-dto";
import { UrlToBeChecked } from "../entities/url";
import { URL } from "../value-objects/url";

export class VerifyUrlUseCase {
    private urlPort: IUrlPort;

    constructor(urlPort: IUrlPort) {
        this.urlPort = urlPort;
    }

    async perform(input: IUrlInputDto): Promise<IUrlOutPutDto> {
        try {
            const url = new UrlToBeChecked(new URL(input.url));
            const verifyUrl = await this.urlPort.verifyUrl(url.url.value);
            return verifyUrl;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }

            throw new Error("Erro interno do servidor");
        }
    }
}