const allRoles = {
    user: [],
    client: ['getUsers', 'manageUsers'],
    manager: ['getUsers', 'manageUsers'],
    admin: ['getUsers', 'manageUsers'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export {
    roles,
    roleRights,
};