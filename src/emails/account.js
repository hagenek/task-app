const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email,  name) => {
  sgMail.send({
    to: email,
    from: "georghagen@gmail.com",
    subject: "Thanks for registering for your interest in In Search of Lora!",
    text: `Welcome to the app, ${name}, Let me know how you get along with the app.`
  })
}

const sendCancelationEmail = (email,  name) => {
  sgMail.send({
    to: email,
    from: "georghagen@gmail.com",
    subject: "Goodbye for now my friend!",
    text: `We are sooo! sad to see you go, ${name}, Let us know if there is something we could have done to make you stay a little longer.`
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
}

