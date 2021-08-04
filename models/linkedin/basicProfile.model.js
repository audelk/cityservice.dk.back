import { Helpers } from '../../utils/linkedHelper.js';
/**
 * Me Profile model. From linked raw data to our simplified data model
 */
class BasicProfileModel {
    constructor({
        miniProfile: { firstName },
        miniProfile: { lastName },
        miniProfile: { occupation },
        miniProfile: { objectUrn },
        miniProfile: { entityUrn },
        miniProfile: { picture },
        publicContactInfo,
        premiumSubscriber
    }) {

        let memberId = Helpers.splitGetLastItem(objectUrn, ":");
        let profileId = Helpers.splitGetLastItem(entityUrn, ":");

        try {
            picture = picture["com.linkedin.common.VectorImage"].rootUrl + picture["com.linkedin.common.VectorImage"].artifacts[3].fileIdentifyingUrlPathSegment;
        } catch (err) {
            picture = "";
        }

        const props = {

            firstName,
            lastName,
            memberId,
            occupation,
            profileId,
            picture,
            publicContactInfo,
            premiumSubscriber
        };

        ({
            firstName: this.firstName,
            lastName: this.lastName,
            occupation: this.occupation,
            profileId: this.profileId,
            memberId: this.memberId,
            picture: this.picture,
            publicContactInfo: this.publicContactInfo,
            premiumSubscriber: this.premiumSubscriber

        } = props);

    }


}



export default BasicProfileModel;