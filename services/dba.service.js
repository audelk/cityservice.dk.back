import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import fetch from 'node-fetch';
import MainDetailsModel from "../models/mainDetails.model.js";
import htmlParser from 'node-html-parser';
var request = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
};

export default class DBAService {
    static async getJSON(url) {
        let r = await fetch(url, request).then(checkFetchStatus)
            .then(res => {
                return res.json()
            })
            .then(res => {
                return res;
            });
        return r;
    }

    static async getHTMLCode(url) {
        let r = await fetch(url, { ...request, ...{ 'gzip': true } }).then(checkFetchStatus)
            .then(res => {
                return res.text();
            })

        return r;
    }
    static formatRawDetails(raw) {
        return new MainDetailsModel(raw);
    }

    static async getGallery(url) {
        let r = await fetch(url, request).then(checkFetchStatus)
            .then(res => {
                return res.json()
            })
            .then(res => {
                return res;
            });
        return r;
    }

    static getGalleryFromHTML(htmlStr) {
        const htmlDom = htmlParser.parse(htmlStr);
        let divs = htmlDom.querySelectorAll("ul.thumbnails>li>div");
        let images = divs.map(item => {
            let image = item.attrs.style.match(/\bhttps?:\/\/\S+/gi)[0].replace(');', "")
            return image.replace("s-l140.jpg", "s-l1000.jpg")
        })
        return images;
    }
}

async function checkFetchStatus(res) {
    if (!res.ok) {
        let json = await res.json();
        throw new ApiError(res.status, json.title)
    }
    return res;
}