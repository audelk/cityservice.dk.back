import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import { authService, userService, tokenService, emailService } from "../services/index.js";
import config from "../config/config.js";
import { Helpers } from "../utils/linkedHelper.js";
const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    const tokens = await tokenService.generateAuthTokens(user);
    if (config.registration.emailVerification == true) {
        const verifyEmailToken = await tokenService.generateVerifyEmailToken(user);
        //  await emailService.sendVerificationEmail(user.email, verifyEmailToken);
    }

    res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
});

const logout = catchAsync(async (req, res) => {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
    const tokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
    const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
    await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
    res.status(httpStatus.OK).send({ message: "Password reset link sent! You\'ll receive an email if you are registered on our system." });
});

const resetPassword = catchAsync(async (req, res) => {
    await authService.resetPassword(req.body.token, req.body.password);
    res.status(httpStatus.OK).send({ message: "Your password has changed." });
});

const sendVerificationEmail = catchAsync(async (req, res) => {
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
    await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
    res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
    await authService.verifyEmail(req.query.token);
    res.status(httpStatus.OK).send({ message: "Email verified. You can now login." });
});
const verifyRPToken = catchAsync(async (req, res) => {
    await authService.verifyRPToken(req.query.token);
    res.status(httpStatus.OK).send({ message: "Token valid" });
});

const authController = {
    register,
    login,
    logout,
    refreshTokens,
    forgotPassword,
    resetPassword,
    sendVerificationEmail,
    verifyEmail, verifyRPToken
};

export default authController;