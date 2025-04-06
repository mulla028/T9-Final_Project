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
            user: "driftwaysystem@gmail.com",
            pass: "rffoibyeszpwirwb"
        }
    });

    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: "driftwaysystem@gmail.com",
        subject: `[Support] ${subject}`,
        text: `Support Request\n\nFrom: ${name}\nEmail: ${email}\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Support message received and emailed.' });
};

module.exports = { contactSupport };
