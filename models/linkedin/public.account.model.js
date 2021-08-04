export default class PublicAccountModel {
    constructor({
        status,
        invoices,
        fullName,
        email,
        password,
        contracts,
        createdAt,
        remarks,
        subscription,
        picture,
        profile,
        _id,
        linkedAccess: { loginStatus, linkedToken }
    }) {
        let props = {
            status,
            invoices,
            fullName,
            email,
            password,
            picture,
            profile,
            remarks,
            contracts,
            subscription,
            createdAt,
            id: _id.toString(),
            loginStatus,


        }

        Object.keys(props).forEach(key => {
            this[key] = props[key];
        });
    }
}