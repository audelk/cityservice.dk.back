const allRoles = {
    user: [],
    client: ['getUsers', 'createBooking', 'createCalendar', 'getBookings', 'updateBooking', 'deleteBooking', 'getBooking'],
    manager: ['getUsers', 'manageUsers', 'createBooking'],
    admin: ['getUsers', 'manageUsers', 'createBooking', 'createCalendar', 'updateBooking', 'getBooking',
        'getBookings', 'deleteBooking'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

export {
    roles,
    roleRights,
};