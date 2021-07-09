import nodemailer from "nodemailer";
import config from "../config/config.js";
import logger from "../config/logger.js";
import { htmlToText as htmlToText } from "nodemailer-html-to-text";
const transport = nodemailer.createTransport(config.email.smtp);

/* istanbul ignore next */
if (config.env !== 'test') {
    transport
        .verify()
        .then(() => logger.info('Connected to email server'))
        .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
}

/**
 * Send an email
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
const sendEmail = async(to, subject, html) => {
    const msg = { from: `${config.appName}<${config.email.from}>`, to, subject, html };
    transport.use('compile', htmlToText());
    await transport.sendMail(msg);
};

/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendResetPasswordEmail = async(to, token) => {
    const subject = 'Reset password';
    // replace this url with the link to the reset password page of your front-end app
    const resetPasswordUrl = `${config.appFrontUrl}/reset-password?token=${token}`;
    const text = `Hello,<BR>
To reset your password, <a target='_blank' href='${resetPasswordUrl}'>click here.</a>
If you did not request any password resets, then ignore this email.<BR> <BR>
Regards, <BR> ${config.appName} <BR><BR><BR><small>
If you’re having trouble clicking the "click here" link, copy and paste the URL below into your web browser: ${resetPasswordUrl}</small>`;
    await sendEmail(to, subject, text);
};

/**
 * Send verification email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
const sendVerificationEmail = async(to, token) => {
    const subject = 'Email Verification';
    // replace this url with the link to the email verification page of your front-end app
    const verificationEmailUrl = `${config.appFrontUrl}/verify-email?token=${token}`;
    const text = `Hello, <BR>
    Thanks for signing up, but before you can continue we need to verify your email.
    To verify your email,  <a target='_blank' href='${verificationEmailUrl}'>click here.</a>
    <BR>If you did not create an account, then ignore this email. <BR>Thanks! See you soon.
<BR> <BR>
Regards, <BR> ${config.appName} <BR><BR><BR><small>
If you’re having trouble clicking the "click here" link, copy and paste the URL below into your web browser: ${verificationEmailUrl}</small>
`;


    await sendEmail(to, subject, text);
};
const emailService = {
    transport,
    sendEmail,
    sendResetPasswordEmail,
    sendVerificationEmail,
};
export default emailService;