import nodemailer from "nodemailer"

const emailFrom = `${process.env.CLIENT_NAME} <${process.env.EMAIL_ADDRESS}>`

const setup = () => {
    return (
        nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    )
}

const sendEmail = ({to, subject, text = "", html = ""}) => {
    const transport = setup()
    const email = {
        from: emailFrom,
        to,
        subject,
        text,
        html
    }

    transport.sendMail(email)
    .then(res => {
        console.log("Email sent")
    })
    .catch(err => {
        console.log("Error sending")
    })
}

export const sendConfirmationEmail = (user) => {
    sendEmail({
        to: user.email,
        subject: `Welcome to ${process.env.CLIENT_NAME}`,
        text: `Welcome to ${process.env.CLIENT_NAME}. Please confirm your email, following this link: ${user.generateConfirmationUrl()}`,
        html: "<h3>"+ process.env.CLIENT_NAME +"</>"
    })
}

export const sendResetPassword = (user) => {
    sendEmail({
        to: user.email,
        subject: "Reset password - " + process.env.CLIENT_NAME,
        text: `To reset password, follow this link: ${user.generateResetPasswordUrl()}`,
        html: "<h3>"+ process.env.CLIENT_NAME +"</>"
    })
}