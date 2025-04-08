const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const SocialUser = require('../models/SocialUser');
const { CALLBACK_URL } = require('../utils/general');

// Nodemailer transporter setup
// .env does not work for nodemailer, so hardcoded the user and pass!
const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Generate verification code and email it to the user
module.exports.sendPasswordReset = async function (email) {
    // Update user verification code in the db
    try {
        const user = await User.findOne({ email });
        console.log(user);
        if (!user) {
            // Check if the user has signed in with google or fb
            const socialUser = await SocialUser.findOne({ email });
            if (socialUser) {
                throw new Error("You are using third-party applications, please use Google or Facebook to sign-in.");
            } else {
                throw new Error("No user found.");
            }
        } else {
            // Send the verification code to the user's email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Verification Code for Password Reset',
                html: `
  <!doctype html>
                    <html lang="en-US">

                    <head>
                        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
                        <title>Verification Code</title>
                        <meta name="description" content="Verification Code">
                        <style type="text/css">
                            a:hover {text-decoration: underline !important;}
                        </style>
                    </head>

                    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
                    <!--100% body table-->
                    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                        <tr>
                            <td>
                                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                          <a href="${CALLBACK_URL}" title="logo" target="_blank" style="font-family:poppins,serif; font-size:48px; text-decoration:none!important; color:black; font-weight:bold;">
                                            DriftWay
                                          </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                                <tr>
                                                    <td style="padding:0 70px;">
                                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">Your Password Reset Link</h1>
                                                        <span
                                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:90px; "></span>
                                                            <p style="color:#455056; font-size:18px;line-height:24px; margin:0;text-align:start;">Hello ${user.username},</p><br>
                                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;text-align:start; ">
                                                                Here is your password reset link:
                                                        </p><br><br><br>
                                                        <button style="background-color:green; color:white; font-size:30px; border:none; border-radius:8px; padding:15px;"><a href="${CALLBACK_URL}/reset-password/${user._id}" style="color:white; text-decoration:none; ">Reset password here</a></button><br><br><br>
                                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;text-align:start;">
                                                            If this link is not requested by you, you may ignore this email.</p><br>
                                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;text-align:start;">Regards,</p>
                                                            <p style="color:#455056; font-size:15px;line-height:24px; margin:0;text-align:start;">DriftWay Team</p>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="height:40px;">&nbsp;</td>
                                                </tr>
                                            </table>
                                        </td>
                                    <tr>
                                        <td style="height:20px;">&nbsp;</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align:center;">
                                            <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <a href="${CALLBACK_URL}" style="text-decoration: none; color:rgba(69, 80, 86, 0.7411764705882353);"><strong>DriftWay Inc.</strong></a></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="height:80px;">&nbsp;</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
        <!--/100% body table-->
    </body>
  `
            };
            await new Promise((resolve, reject) => {
                transporter.sendMail(mailOptions, (error) => {
                    if (error) {
                        console.log("Email sent fail");
                        reject(error);
                    } else {
                        resolve("email sent");
                        console.log("Email sent!");
                    }
                });
            });
        }
    } catch (error) {
        throw error; // Rethrow the error to ensure it's caught in the caller function
    }
}


// Reset password in db
module.exports.resetPassword = async function (id, password) {
    try {
        // Hash the password
        const salt = process.env.PASSWORD_SALT;
        const hashedPassword = await bcrypt.hash(password.password, salt);

        // Update the user
        await User.updateOne({ _id: id },
            { $set: { password: hashedPassword } });
    } catch (error) {
        console.log(error.message);
    }
}