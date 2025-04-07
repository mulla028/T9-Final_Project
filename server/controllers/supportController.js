const nodemailer = require('nodemailer');
const SupportMessage = require('../models/SupportMessage');

const contactSupport = async (req, res) => {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        res.status(400);
        throw new Error('All fields are required');
    }

    // Save to DB
    await SupportMessage.create({ name, email, subject, message });

    // Send email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.EMAIL_USER,
        subject: `[Support] ${subject}`,
        text: `Support Request\n\nFrom: ${name}\nEmail: ${email}\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Support message received and emailed.' });
};

module.exports = { contactSupport };
