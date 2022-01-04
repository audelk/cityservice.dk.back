import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import { DBAService } from "../services/index.js";
import bookingService from "../services/booking.service.js";

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
        /*  const details1 = {
              name: "dummy",
              location: "new york",
              zip: 23244,
              phone: "asdf",
              title: "dummy title",
              price: "$1"
          };
         const images1 = [];
         res.status(httpStatus.OK).send({ details: details1, images: images1 });*/
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

        //geocode address
        const results = await bookingService.geoCodeAddress(details.location);
        // details.zip = parseInt(details.location.match(/\d+/)[0]);
        details.zip = details.location.match(/\d+/)[0];
        if (results.length > 0) {
            // details.geoLocation = results[0];
            details.longitude = results[0].longitude;
            details.latitude = results[0].latitude;
        }
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