import { IUrlPort } from "../../core/port/url-port";
import axios from "axios";

export class VerifyUrlAdapter implements IUrlPort {
    async verifyUrl(url: string): Promise<any> {
        try {
            const analysisId = await this.submitUrlForAnalysis(url);
            await this.waitForAnalysisCompletion(analysisId, "completed");
            const analysisResult = await this.getAnalysisResult(analysisId);
            return analysisResult;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async submitUrlForAnalysis(url: string): Promise<string> {
        const formData = new URLSearchParams();
        formData.set('url', url);

        const options = {
            method: 'POST',
            url: `${process.env.VIRUSTOTAL_API_BASE_URL}/urls`,
            headers: {
                accept: 'application/json',
                'x-apikey': process.env.API_KEY,
                'content-type': 'application/x-www-form-urlencoded',
            },
            data: formData,
        };

        const response = await axios.request(options);
        const analysisId = response.data.data.id;
        return analysisId;
    }

    async getAnalysisResult(analysisId: string): Promise<any> {
        const options = {
            method: 'GET',
            url: `${process.env.VIRUSTOTAL_API_BASE_URL}/analyses/${analysisId}`,
            headers: {
                accept: 'application/json',
                'x-apikey': process.env.API_KEY,
            },
        };

        const response = await axios.request(options);
        return response.data;
    }

    async waitForAnalysisCompletion(analysisId: string, targetStatus: string): Promise<void> {
        let statusCheckInterval = 1000;
        let maxWaitTime = 600000;

        let totalTimeWaited = 0;
        let status = "";

        while (totalTimeWaited < maxWaitTime) {
            const analysisResult = await this.getAnalysisResult(analysisId);
            status = analysisResult.data.attributes.status;

            if (status === targetStatus) {
                return;
            } else {
                totalTimeWaited += statusCheckInterval;
                await new Promise(resolve => setTimeout(resolve, statusCheckInterval));
            }
        }
        throw new Error(`Tempo limite de espera atingido. O status é: ${status}`);
    }
}
