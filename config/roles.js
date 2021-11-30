const allRoles = {
    user: [],
    client: ['getUsers', 'manageUsers', 'createBooking'],
    manager: ['getUsers', 'manageUsers', 'createBooking'],
    admin: ['getUsers', 'manageUsers', 'createBooking'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export {
    roles,
    roleRights,
};