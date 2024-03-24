"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyUrlAdapter = void 0;
const axios_1 = __importDefault(require("axios"));
class VerifyUrlAdapter {
    async verifyUrl(url) {
        try {
            const analysisId = await this.submitUrlForAnalysis(url);
            await this.waitForAnalysisCompletion(analysisId, "completed");
            const analysisResult = await this.getAnalysisResult(analysisId);
            return analysisResult;
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    async submitUrlForAnalysis(url) {
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
        const response = await axios_1.default.request(options);
        const analysisId = response.data.data.id;
        return analysisId;
    }
    async getAnalysisResult(analysisId) {
        const options = {
            method: 'GET',
            url: `${process.env.VIRUSTOTAL_API_BASE_URL}/analyses/${analysisId}`,
            headers: {
                accept: 'application/json',
                'x-apikey': process.env.API_KEY,
            },
        };
        const response = await axios_1.default.request(options);
        return response.data;
    }
    async waitForAnalysisCompletion(analysisId, targetStatus) {
        let statusCheckInterval = 1000;
        let maxWaitTime = 600000;
        let totalTimeWaited = 0;
        let status = "";
        while (totalTimeWaited < maxWaitTime) {
            const analysisResult = await this.getAnalysisResult(analysisId);
            status = analysisResult.data.attributes.status;
            if (status === targetStatus) {
                return;
            }
            else {
                totalTimeWaited += statusCheckInterval;
                await new Promise(resolve => setTimeout(resolve, statusCheckInterval));
            }
        }
        throw new Error(`Tempo limite de espera atingido. O status é: ${status}`);
    }
}
exports.VerifyUrlAdapter = VerifyUrlAdapter;
