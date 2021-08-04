export class LinkedinHelper {
    httpCodes = [
        { code: 200, message: "OK", status: true, invite: { status: "sent" } },
        { code: 201, message: "OK", status: true, invite: { status: "sent" } },
        { code: 409, message: "Invite already Sent", status: false, invite: { status: "sent" } },
        { code: 401, message: "Session Expired", status: false, invite: { status: "error" } },
        { code: 403, message: "Sales Navigation Expired", status: false, invite: { status: "error" } },
        { code: 400, message: "Invites Restricted ", status: false, invite: { status: "invite_restricted" }, search: { status: "bad_search_request" } },
        { code: 500, message: "Invites Restricted ", status: false, invite: { status: "error" } },
    ]
    constructor() {}

    /**
     * Convert cookies object to string
     * @param {object} cookies 
     * @returns {string}
     */
    cookiesObjToStr(cookies) {
        let cookiesSTr = "";

        cookies.map((item, index, thisArg) => {
            cookiesSTr = cookiesSTr + item.name + '=' + item.value + ';';
        });
        return cookiesSTr;
    }

    /**
     * Convert cookies string to object
     * @param {string} str 
     * @returns {object}
     */
    cookiesStrToObject(str) {
        let res = str.split('; ').reduce(function(result, v, i, a) {
            var k = v.split('=');
            result[k[0]] = k[1];
            return result;
        }, {});

    }

    /**
     * Get http code meaning
     * @param {int| string} code 
     */
    translateHTTPCode(code) {
        let that = this;
        let translation = that.httpCodes.find(item => {
            return item.code == code;
        })
        return translation || { code: 0, message: "Error not recognized.", status: false, invite: { status: 'error' } };
    }

    shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
};

export const LinkedinUrls = {
    urlEntry: "https://www.linkedin.com/login?trk=guest_homepage-basic_nav-header-signin",
    identity: "https://www.linkedin.com/voyager/api/identity/profiles/",
    urlSalesNav: "https://www.linkedin.com/sales/search",
    urlAccount: "https://www.linkedin.com/feed/",
};

export const LinkedinControls = {
    ctrlIDLoginEmail: '#username',
    ctrlIDLoginPassword: '#password',
    ctrlIDLoginSubmit: 'button.btn__primary--large',
    ctrlIDSignInVCode: '#verification-code',
    ctrlIDSignInVSubmit: 'input#btn-primary',
    ctrlIDSignInVCode2: '#input__email_verification_pin',
    ctrlIDSignInVSubmit2: '#email-pin-submit-button',
    ctrlIDSignInVCodePhone: '#input__phone_verification_pin',
    ctrlIDSignInVSubmitPhone: '#two-step-submit-button',
    codeDataID: 'bpr-guid-10752966'
};

export const LinkedinMessages = {
    LOGGED_OUT: "LOGGED_OUT",
    LOGGED_IN: "LOGGED_IN",
    INVALID_REQUEST: "INVALID_REQUEST",
    NETWORK_ERROR: "NETWORK_ERROR",
    LOGGED_IN_INVALID: "LOGGED_IN_INVALID",
    LOGGED_IN_VERIFICATION: "LOGGED_IN_VERIFICATION",
    VERIFICATION_INVALID: "VERIFICATION_INVALID",
    LOGGED_IN_VERIFICATION_EMAIL: "LOGGED_IN_VERIFICATION_EMAIL",
    VERIFICATION_INVALID2: "VERIFICATION_INVALID2",
    CAPTCHA_ERROR: "CAPTCHA_ERROR",
    CAPTCHA_UNSUPPORTED: "CAPTCHA_UNSUPPORTED",
    LOGGED_IN_VERIFICATION_PHONE: "LOGGED_IN_VERIFICATION_PHONE",
    SALES_NAVIGATOR_INACTIVE: "SALES_NAVIGATOR_INACTIVE",
    SALES_NAVIGATOR_ACTIVE: "SALES_NAVIGATOR_ACTIVE",
    RESOURCE_NOT_FOUND: "RESOURCE_NOT_FOUND",
    SOMETHINGS_WRONG: "SOMETHINGS_WRONG",
    ERROR_PARSING_SEARCH_PAGE: "ERROR_PARSING_SEARCH_PAGE",
    INVALID_PAGE: "INVALID_PAGE",
    INVITE_REQUIRED_EMAIL: "INVITE_REQUIRED_EMAIL",
    INVALID_COOKIES: "INVALID_COOKIES",
    INVITE_NOT_SENT: "INVITE_NOT_SENT",
    INVITE_ALREADY_SENT: "INVITE_ALREADY_SENT",
    INVITE_SENT: "INVITE_SENT",
    CAPTCHA_INPUT: "CAPTCHA_INPUT",
    CAPTCHA_VERIFICATION: "CAPTCHA_VERIFICATION",
    PROXY_HIGH_TRAFFIC: "PROXY_HIGH_TRAFFIC",
    PROXY_REJECTED: "PROXY_REJECTED",
    LOGGED_IN_VERIFICATION_WRONG_CODE: "LOGGED_IN_VERIFICATION_WRONG_CODE",
    LOGGED_IN_VERIFICATION_EXPIRED_CODE: "LOGGED_IN_VERIFICATION_EXPIRED_CODE",
    COOKIES_INVALID: "COOKIES_INVALID",
    LINKEDIN_ACCESS_NOT_SET: "LINKEDIN_ACCESS_NOT_SET"
}
export class Helpers {
    constructor() {

    }
    print(txt) {
        console.log(txt)
    }

    print_r(arr) {
        for (var i = 0; i < arr.length; i++)
            console.log(arr[i])
    }

    /**
     * Map multiple occurences of multiple strings and replace all
     * @param  str haystack 
     * @param  mapObj 
     */
    static replaceAll(str, mapObj) {
        var re = new RegExp(Object.keys(mapObj).join("|"), "gi");
        return str.replace(re, function(matched) {

            return mapObj[matched.toLowerCase()];
        });
    }

    /**
     * promisfy settimeout
     * @param  ms 
     */
    static timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    static randomize(min, max) {

        return (Math.floor(Math.random() * (max - min + 1)) + min);
    }
    static splitGetLastItem(str, s) {
        let r;
        str.split(s).map((item, index, thisArg) => {
            if (index == (thisArg.length - 1)) {
                r = item;
            }
            return item;
        })
        return r
    }

    static splitGetFirstItem(str, s) {
        let r;
        let temp = str.split(s);
        if (temp.length > 0)
            r = temp[0];
        else
            r = "";
        return r
    }

    static randomString(length) {
        var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ012345678";
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    static randomNum(length) {
        var chars = "0123456789";
        var result = '';
        for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }
}

/*
String.prototype.replaceAll = function(searchStr, replaceStr) {
    var str = this;

    // escape regexp special characters in search string
    searchStr = searchStr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    return str.replace(new RegExp(searchStr, 'gi'), replaceStr);
};
module.exports = new HelperService();
*/