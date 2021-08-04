export default class PublicContactInfoModel {
    constructor({
        emailAddress,
        address,
        connectedAt,
        websites = [],
        twitterHandles = [],
        phoneNumbers = []
    }) {


        websites = websites.map(item => {
            try {
                const {
                    type: {
                        ["com.linkedin.voyager.identity.profile.StandardWebsite"]: { category }
                    },
                    url
                } = item;
                return { url, type: category };
            } catch (err) {
                return false;
            }
        }).filter((item) => item);
        const twitterProfiles = twitterHandles.map(item => {
            try {
                return `https://twitter.com/${item.name}`
            } catch (err) {
                return false;
            }
        }).filter((item) => item);


        let props = {
            emailAddress,
            address,
            connectedAt,
            websites,
            twitterProfiles,
            phoneNumbers
        }

        Object.keys(props).forEach(key => {
            this[key] = props[key];
        })
    }
}