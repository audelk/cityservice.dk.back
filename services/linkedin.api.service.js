import fetch from 'node-fetch';
import config from '../config/config.js';
import ApiError from '../utils/ApiError.js';
export default class LinkedinAPI {

    /**
     * Add account 
     * @param {string} email 
     * @param {string} password 
     * @param {string} remarks 
     * @returns raw json
     */
    static async add(email, password, remarks) {
        let headers = {...request, ... { method: 'POST', body: JSON.stringify({ email, password, remarks, fullName: "adsfss" }) } };
        let r = await fetch(`${config.linkedinAPIUrl}/v1/accounts/?apiKey=${config.linkedinAPIKey}`, headers).then(checkFetchStatus)
            .then(res => res.json());
        return r;
    }
}

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