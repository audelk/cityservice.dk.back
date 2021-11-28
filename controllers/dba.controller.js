import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import { DBAService } from "../services/index.js";
const getMainDetails = catchAsync(
    async (req, res) => {
        const { url } = req.query;
        let temp = url.replace(/^\D+/g, '');
        if (temp.includes("id-")) {
            var listingId = temp.split("/").find(item => item.includes("id-")).replace("id-", "").replace("/", "");
        }
        else {
            var listingId = parseInt(temp);
        }

        const apiUrl = `https://www.dba.dk/api/dba-vip-site/${listingId}/conversation`;
        const detailsRaw = await DBAService.getJSON(apiUrl);
        const details = DBAService.formatRawDetails(detailsRaw);
        ///ajax/vip/telephonenumber/gettelephonenumber/?externalid=1063284588
        const apiPhone = `https://www.dba.dk/api/dba-vip-site/phonenumber/${listingId}`;
        const phoneRaw = await DBAService.getJSON(apiPhone);
        try {
            const [phone] = phoneRaw.data;
            details.phone = phone;
        } catch (err) { }
        const htmlRaw = await DBAService.getHTMLCode(url + "/billeder/1/");
        const images = DBAService.getGalleryFromHTML(htmlRaw);
        details.url = url;
        res.status(httpStatus.OK).send({ details, images });
    }

);



function splitGetLastItem(str, s) {
    let r;
    str.split(s).map((item, index, thisArg) => {
        if (index == (thisArg.length - 1)) {
            r = item;
        }
        return item;
    })
    return r
}

const DBAController = {
    getMainDetails
}


export default DBAController;