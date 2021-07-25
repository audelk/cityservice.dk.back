const HelperSvc = require('../services/helper.service');
const Tea = require('../services/tinyEncrypt.service');
const { teaSecret } = require('../models/settings');
/**
 * Contact model. From linked raw data to our simplified data model
 */
class Contact {
    constructor({
        fullName,
        firstName,
        lastName,
        geoRegion,
        objectUrn,
        currentPositions,
        pastPositions,
        profilePictureDisplayImage,
        entityUrn,
        premium
    }) {
        let profilePic = "";
        if (profilePictureDisplayImage && profilePictureDisplayImage.artifacts.length > 0) {
            profilePic = profilePictureDisplayImage.rootUrl + profilePictureDisplayImage.artifacts[2].fileIdentifyingUrlPathSegment;
        }
        let mId = HelperSvc.splitGetLastItem(objectUrn, ":");
        let cIds = HelperSvc.splitGetLastItem(entityUrn, ":");
        cIds = HelperSvc.splitGetFirstItem(cIds.replace("(", "").replace(")", ""), ",");
        if (currentPositions)
            currentPositions = currentPositions.map(element => {
                const { companyName, title, description } = element;
                return { companyName, title, description };
            });
        if (pastPositions)
            pastPositions = pastPositions.map(element => {
                const {
                    companyName,
                    title,
                    description,
                    endedOn,
                    startedOn,
                    current
                } = element;
                return {
                    companyName,
                    title,
                    description,
                    endedOn,
                    startedOn,
                    current
                }
            });
        const props = {
            fullName,
            firstName,
            lastName,
            geoRegion,
            currentPositions,
            pastPositions,
            profilePic,
            mId: Tea.encrypt(mId, teaSecret),
            cIds: Tea.encrypt(cIds, teaSecret),
            //  premium
        };

        ({
            fullName: this.formattedName,
            firstName: this.firstName,
            lastName: this.lastName,
            geoRegion: this.location,
            //  currentPositions: this.currentPositions,
            //  pastPositions: this.pastPositions,
            // profilePic: this.profilePic,
            cIds: this.cIds,
            mId: this.mId,
            //  premium: this.premium
        } = props);

    }


}

/**
    endedOn,startedOn ={
        month,year
    }
*/

module.exports = Contact;