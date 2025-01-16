const nodemailer = require('nodemailer');
const pug = require('pug');
const { htmlToText } = require('html-to-text');

module.exports = class Email {
    constructor(user, url) {
        this.to = user.email;
        this.firstName = user.name.split(' ')[0];
        this.url = url;
        this.from = `Natty Lar <${process.env.EMAIL_FROM}>`;
    }

    newTransport() {
        if (process.env.NODE_ENV === 'production') {
            // MailerSend
            return nodemailer.createTransport({
                host: process.env.MAILERSEND_SERVER,
                port: process.env.MAILERSEND_PORT,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.MAILERSEND_USERNAME, // MailerSend SMTP username
                    pass: process.env.MAILERSEND_PASSWORD, // MailerSend API key
                },
                tls: {
                    rejectUnauthorized: false
                }
            });
        }

        // Development or other environment
        return nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }

    // Send the actual email.
    async send(template, subject) {
        // 1) Render HTML based on a pug template.
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject
        });

        // 2) Define the email options.
        const mailOptions = {
            from: this.from,
            to: this.to,
            subject,
            html,
            text: htmlToText(html),
        };

        // 3) Create a transport and send email.
        await this.newTransport().sendMail(mailOptions);
    }

    async sendWelcome() {
        await this.send('welcome', 'Welcome to the Beautiful Smiles Family!');
    }

    async sendPasswordReset() {
        await this.send('resetPassword', 'Your password reset token (valid for only 10 minutes).');
    }
};



// const nodemailer = require('nodemailer');
// const pug = require('pug');
// const { htmlToText } = require('html-to-text');


// module.exports = class Email {
//     constructor(user, url) {
//         this.to = user.email;
//         this.firstName = user.name.split(' ')[0];
//         this.url = url;
//         this.from = `Natty Lar <${process.env.EMAIL_FROM}>`;
//     }

//     newTransport() {
//         if (process.env.NODE_ENV === 'production') {
//             // Mailersend
//             nodemailer.createTransport({
//                 host: process.env.MAILERSEND_SERVER,
//                 port: process.env.MAILERSEND_PORT,
//                 secure: false, // true for 465, false for other ports
//                 auth: {
//                     user: process.env.MAILERSEND_USERNAME, // MailerSend SMTP username
//                     pass: process.env.MAILERSEND_APIKEY, // MailerSend API key
//                 },
//             });
//         }

//         return nodemailer.createTransport({
//             host: process.env.EMAIL_HOST,
//             port: process.env.EMAIL_PORT,
//             auth: {
//                 user: process.env.EMAIL_USERNAME,
//                 pass: process.env.EMAIL_PASSWORD
//             }
//         });
//     }

//     // Send the actual email.
//     async send(template, subject) {
//         // 1) Render HTML based on a pug template.
//         const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`,
//             {
//                 firstName: this.firstName,
//                 url: this.url,
//                 subject
//             }
//         );

//         // 2) Define the email options.
//         const mailOptions = {
//             from: this.from,
//             to: this.to,
//             subject,
//             html,
//             text: htmlToText(html),
//         };

//         // 3) Create a transport and send email.
//         await this.newTransport().sendMail(mailOptions);
//     }

//     async sendWelcome() {
//         await this.send('welcome', 'Welcome to the Beautiful Smiles Family!');
//     }

//     async sendPasswordReset() {
//         await this.send('resetPassword', 'Your password reset token (valid for only 10 minutes).');
//     }
// };