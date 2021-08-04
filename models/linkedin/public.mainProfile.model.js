export default class PublicMainProfileModel {
    constructor({

        firstName,
        lastName,
        headline,
        premium,
        industry, //industry.name
        profileSkills, //profileSkills.elements[0].name
        profilePicture,
        profileCertifications,
        publicIdentifier,
        profileEducations,
        profileOrganizations,
        profileProjects,
        profileCourses,
        geoLocation,
        primaryLocale,
        profilePositionGroups: experiences,
        birthDateOn,
        address,
        backgroundPicture,
        summary,
        volunteerCauses,
        profileHonors,
        profileLanguages,
        profilePatents,
        profilePublications,
        profileTestScores,
        profileVolunteerExperiences
    }) {

        profileCourses = profileCourses.elements.map(item => {
            return item.name;
        })
        experiences = experiences.elements.map(item => {
            try {
                let i = item.profilePositionInPositionGroup.elements.length;

                if (i > 0) {
                    const element = item.profilePositionInPositionGroup.elements[i - 1];
                    var {
                        description,
                        title,
                        locationName: location,
                        employmentType: { name: employmentType },
                    } = element;
                }
            } catch (err) {}


            let {
                companyName,
                dateRange: { start },
                dateRange: { end },
            } = item;
            return {
                start,
                end,
                companyName,
                title,
                location,
                employmentType,
                description
            }
        })
        profileSkills = profileSkills.elements.map(item => {
            return item.name;
        })
        profileProjects = profileProjects.elements.map(item => {
            return item.name;
        })

        profileOrganizations = profileOrganizations.elements.map(item => {
            var { name, dateRange: { start: { year: start } = { year: undefined } } = { start: {} }, dateRange: { end: { year: end } = { year: undefined } } = { end: {} } } = item;
            return { name, start, end };
        });
        try {
            profilePicture = profilePicture.displayImageReference.vectorImage.rootUrl + profilePicture.displayImageReference.vectorImage.artifacts[3].fileIdentifyingUrlPathSegment;
        } catch (err) {
            profilePicture = undefined;
        }
        try {
            backgroundPicture = backgroundPicture.displayImageReference.vectorImage.rootUrl + backgroundPicture.displayImageReference.vectorImage.artifacts[1].fileIdentifyingUrlPathSegment;
        } catch (err) {
            backgroundPicture = undefined;
        }
        try {
            var location = geoLocation.geo.defaultLocalizedName;
            var country = primaryLocale.country;
        } catch (err) {
            var location = "";
            var country = "";
        }
        profileCertifications = profileCertifications.elements.map(item => {
            return item.name;
        })

        profileEducations = profileEducations.elements.map(item => {

            const {
                description,
                degreeName,
                schoolName,
                fieldOfStudy,
                dateRange: { start: { year: start } = { year: undefined } } = { start: {} },
                dateRange: { end: { year: end } = { year: undefined } } = { end: {} }
            } = item;
            return {
                start,
                end,
                description,
                degreeName,
                schoolName,
                fieldOfStudy
            }

        })


        const props = {
            firstName,
            lastName,
            birthDate: birthDateOn,
            address,
            headline,
            about: summary,
            premium,
            location,
            country,
            backgroundPicture,
            industry: industry.name,
            profileSkills,
            profilePicture,
            profileCertifications,
            publicIdentifier,
            profileEducations,
            profileOrganizations,
            profileProjects,
            profileCourses,
            experiences,
            volunteerCauses
        };

        Object.keys(props).forEach(key => {
            this[key] = props[key];
        })

    }


}