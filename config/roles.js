const allRoles = {
    user: [],
    client: ['getUsers', 'createBooking', 'createCalendar'],
    manager: ['getUsers', 'manageUsers', 'createBooking'],
    admin: ['getUsers', 'manageUsers', 'createBooking', 'createCalendar', 'updateBooking'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export {
    roles,
    roleRights,
};