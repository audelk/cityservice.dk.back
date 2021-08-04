import RequestModel from '../models/linkedin/request.model.js';
import ApiError from "../utils/ApiError.js";
import { LinkedinControls, LinkedinHelper, LinkedinMessages, LinkedinUrls } from '../utils/linkedHelper.js';
import fetch from 'node-fetch';
import BasicProfileModel from '../models/linkedin/basicProfile.model.js';
import PublicConnectionModel from '../models/linkedin/public.connection.model.js';
import PublicContactInfoModel from '../models/linkedin/public,contactInfo.model.js';
import PublicMainProfileModel from '../models/linkedin/public.mainProfile.model.js';
const APIRoot = "https://www.linkedin.com/";
export default class LinkedMemberService {

    constructor() {}
    static async getContactInfo(csrfToken, cookiesStr, profileId) {
        let request = (new RequestModel()).ConnectionProfileContactInfo;
        request.headers['Csrf-Token'] = csrfToken;
        request.headers['Cookie'] = cookiesStr;
        request.url += profileId + "/profileContactInfo";
        request.headers['Accept'] = "application/json, */*; q=0.01";
        return await fetch(request.url, request).then(checkFetchStatus);
    }
    static formatRawGetContactInfo(raw) {
        return new PublicContactInfoModel(raw);
    }
    static async getMainProfile(csrfToken, cookiesStr, publicIdentifier) {
        const url = APIRoot +
            `voyager/api/identity/dash/profiles?q\u003DmemberIdentity\u0026memberIdentity\u003D${publicIdentifier}\u0026decorationId\u003Dcom.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities-57`;
        return await getJson(url, csrfToken, cookiesStr);
    }
    static formatRawGetMainProfile(raw) {
        if (raw.elements && raw.elements.length > 0)
            return new PublicMainProfileModel(raw.elements[0]);
        return {}
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