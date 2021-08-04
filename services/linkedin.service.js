import RequestModel from '../models/linkedin/request.model.js';
import ApiError from "../utils/ApiError.js";
import { LinkedinControls, LinkedinHelper, LinkedinMessages, LinkedinUrls } from '../utils/linkedHelper.js';
import fetch from 'node-fetch';
import BasicProfileModel from '../models/linkedin/basicProfile.model.js';
import PublicConnectionModel from '../models/linkedin/public.connection.model.js';
const APIRoot = "https://www.linkedin.com/";
export default class LinkedService {

    constructor() {}

    /**
     * Get basic profile data
     * @param {string} csrfToken 
     * @param {string} cookiesStr 
     * @returns  linkedin raw
     */
    static async getBasicProfile(csrfToken, cookiesStr) {
        const url = APIRoot + "voyager/api/me";
        return await getJson(url, csrfToken, cookiesStr)
    }

    /**
     * Clean and simplify invite summary data
     * @param {object} raw response from getBasicProfile
     * @returns 
     */
    static formatRawBasicProfile(raw) {
        return new BasicProfileModel(raw);
    }

    /**
     * Get invitation summary from linkedin website
     * @param {string} csrfToken 
     * @param {string} cookiesStr 
     * @returns linkedin raw
     */
    static async getInvitationSummary(csrfToken, cookiesStr) {
        let request = (new RequestModel()).InvitationsSummaryV2;
        request.headers['Csrf-Token'] = csrfToken;
        request.headers['Cookie'] = cookiesStr;
        let qString = "types=List(SENT_INVITATION_COUNT,PENDING_INVITATION_COUNT,UNSEEN_INVITATION_COUNT,PENDING_INVITATION_BY_FACET_COUNT)";
        request.url += qString;
        return await fetch(request.url, request).then(checkFetchStatus);
    }

    /**
     * Clean and simplify invite summary data
     * @param {object} raw response from getInvitationSummary
     * @returns object
     */
    static formatRawInvitationSummary(raw) {
        const { numNewInvitations, numPendingInvitations, numSingleSentInvitations, numTotalSentInvitations } = raw.data;
        return { numNewInvitations, numPendingInvitations, numSingleSentInvitations, numTotalSentInvitations };
    }

    /**
     * Get connections count
     * @param {string} csrfToken 
     * @param {string} cookiesStr 
     * @returns linkedin raw
     */
    static async getConnectionSummary(csrfToken, cookiesStr) {
        let request = (new RequestModel()).ConnectionSummary;
        request.headers['Csrf-Token'] = csrfToken;
        request.headers['Cookie'] = cookiesStr;
        return await fetch(request.url, request).then(checkFetchStatus);
    }

    /**
     * Get connections with pagination
     * @param {string} csrfToken 
     * @param {string} cookiesStr 
     * @param {number} start 
     * @param {number} count 
     * @returns linkedin json raw
     */
    static async getConnections(csrfToken, cookiesStr, start = 0, count = 40, sortType = "RECENTLY_ADDED") {
        const url = APIRoot +
            `/voyager/api/relationships/connections?sortType=${sortType}&start=${start}&count=${count}`;
        return await getJson(url, csrfToken, cookiesStr);
    }

    /**
     * Clean and simplify connections data
     * @param {object} raw response from getConnections
     * @returns 
     */
    static formatRawGetConnections(raw) {
        let connections = raw.elements.map(item => {
            return new PublicConnectionModel(item);
        })
        return connections;
    }



}

async function checkFetchStatus(res) {
    if (!res.ok) {
        throw new ApiError(res.status, res.statusText);
    }
    return await res.json();
}

/**
 * 
 * @param {string} url 
 * @param {string} cookiesStr 
 * @param {string} csrfToken 
 * @returns json
 */
async function getJson(url, csrfToken, cookiesStr) {
    var request = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            //Accept: "application/vnd.linkedin.normalized+json+2.1",
            Accept: "application/json, */*; q=0.01",
            Cookie: cookiesStr,
            'csrf-token': csrfToken
        }
    };
    return await fetch(url, request).then(checkFetchStatus);
}