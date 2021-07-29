import httpStatus from "http-status";
import pick from "../utils/pick.js";
import ApiError from "../utils/ApiError.js";
import catchAsync from "../utils/catchAsync.js";
import { userService } from "../services/index.js";

const createUser = catchAsync(
    async(req, res) => {
        const user = await userService.createUser(req.body);
        res.status(httpStatus.CREATED).send(user);
    }

);

const getUsers = catchAsync(async(req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await userService.queryUsers(filter, options);
    res.send(result);
});

const getUser = catchAsync(async(req, res) => {
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'INVALID_USER');
    }
    res.send(user);
});
const getMe = catchAsync(async(req, res) => {
    const user = await userService.getUserById(res.locals.user.id);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'INVALID_USER');
    }
    res.send(user);
});
const updateUser = catchAsync(async(req, res) => {
    const user = await userService.updateUserById(req.params.userId, req.body);
    res.send(user);
});

const deleteUser = catchAsync(async(req, res) => {
    await userService.deleteUserById(req.params.userId);
    res.status(httpStatus.NO_CONTENT).send();
});

const getAccounts = catchAsync(async(req, res) => {
    let accounts = await userService.getAccounts(req.params.userId);
    res.status(httpStatus.OK).send(accounts);
});
const userController = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getAccounts,
    getMe
};
export default userController;