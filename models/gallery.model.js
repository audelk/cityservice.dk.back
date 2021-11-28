export default class GalleryModel {
    constructor({
        listingInfo: {
            externalId,
            price,
            created,
            pictureUri,
            title,
            location,
            userName: { name }
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
            name
        }
        Object.keys(props).forEach(key => {
            this[key] = props[key];
        });
    }
}