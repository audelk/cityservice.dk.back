import fetch from 'node-fetch';
import config from '../config/config.js';
import FormData from 'form-data';
import ApiError from '../utils/ApiError.js';
import httpStatus from 'http-status';
/**
 * Wrapper class for LinkedAPP. LinkedApp is the  service that simplifies linkedin API calls.
 */

async function checkFetchStatus(res) {
    if (!res.ok) {
        let json = await res.json();
        throw new ApiError(res.status, json.message)
    }
    return res;
}
var request = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
};
export default class LinkedApp {


    /**
     * Login to linkedin website
     * @param {object} params 
     * @returns 
     */
    static async login({ email, password, proxy }) {
        let r = await fetch(config.linkedAppUrl + '/v1/accounts/login', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({ email, password, proxy })
            }).then(checkFetchStatus)
            .then(res => res.json());
        return r;
    }

    /**
     * Get account contracts    
     * @returns  account contracts
     */
    static async contracts({ csrfToken, cookiesStr }) {
        let temp = {...request, ... { body: JSON.stringify({ csrfToken, cookiesStr }) } };
        let r = await fetch(config.linkedAppUrl + `/v1/accounts/contracts`, temp).then(checkFetchStatus)
            .then(res => res.json());
        return r;
    }

    /**
     * Get account contract with valid cookies    
     * @returns contract with valid cookies
     */
    static async loginContract({ csrfToken, cookiesStr }, { seatUrn, contractId, name }) {
        let temp = {...request, ... { body: JSON.stringify({ csrfToken, cookiesStr, seatUrn, contractId, name }) } };
        let r = await fetch(config.linkedAppUrl + `/v1/accounts/contracts/login`, temp).then(checkFetchStatus)
            .then(res => res.json())
            .then(res => {
                return res.response;
            });
        return r;
    }

    /**
     * Check if account has verification page when login.    
     * @returns {object} {browserId}
     */
    static async checkVerification({ csrfToken, cookiesStr, verificationUrl, cookies }, proxy) {
        let temp = {...request, ... { body: JSON.stringify({ csrfToken, cookies, cookiesStr, verificationUrl, proxy }) } };
        let r = await fetch(config.linkedAppUrl + `/v1/accounts/checkVerification`, temp).then(checkFetchStatus)
            .then(res => res.json());
        return r;
    }

    static async submitVerification({ csrfToken, cookiesStr, verificationUrl, cookies }, code, proxy) {
        let temp = {...request, ... { body: JSON.stringify({ csrfToken, cookies, cookiesStr, verificationUrl, code, proxy }) } };
        let r = await fetch(config.linkedAppUrl + `/v1/accounts/submitVerification`, temp).then(checkFetchStatus)
            .then(res => res.json());
        return r;
    }
}