export default class MainDetailsModel {
    constructor({
        listingInfo: {
            externalId,
            price,
            created,
            pictureUri,
            title,
            location,
            userName
        },
        comments,
        chat
    }) {
        let props = {
            externalId,
            price,
            created,
            pictureUri,
            title,
            location,
            name: userName
        }
        Object.keys(props).forEach(key => {
            this[key] = props[key];
        });
    }
}