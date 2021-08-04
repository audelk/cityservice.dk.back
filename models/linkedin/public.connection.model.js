import { Helpers } from '../../utils/linkedHelper.js';

/**
 * Connection model. From linked raw data to our simplified data model
 */
export default class PublicConnectionModel {
    constructor({
        miniProfile: { firstName },
        miniProfile: { lastName },
        miniProfile: { occupation },
        miniProfile: { objectUrn },
        miniProfile: { entityUrn },
        miniProfile: { publicIdentifier },
        miniProfile: { picture },
        createdAt
    }) {


        let memberId = Helpers.splitGetLastItem(objectUrn, ":");
        let profileId = Helpers.splitGetLastItem(entityUrn, ":");
        let profilePic = "";
        try {
            let {
                ["com.linkedin.common.VectorImage"]: { rootUrl, artifacts: [a, b, { fileIdentifyingUrlPathSegment }] }
            } = picture;
            profilePic = rootUrl + fileIdentifyingUrlPathSegment;
        } catch (err) {}
        const props = {
            firstName,
            lastName,
            occupation,
            profilePic,
            memberId,
            profileId,
            publicIdentifier,
            createdAt
        };

        Object.keys(props).forEach(key => {
            this[key] = props[key];
        });

    }


}

/**
    endedOn,startedOn ={
        month,year
    }
*/