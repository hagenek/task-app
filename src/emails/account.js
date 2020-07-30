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
<<<<<<< HEAD
    subject: "Goodbye for now!",
<<<<<<< HEAD
    text: `We are sad to see you go, ${name}, Let us know if there is something we could have done to make you stay as a user with us.`
    text: `We are sooo! sad to see you go, ${name}, Let us know if there is something we could have done to make you stay.`
=======
=======
    subject: "Goodbye for now my friend!",
>>>>>>> newHead
    text: `We are sooo! sad to see you go, ${name}, Let us know if there is something we could have done to make you stay a little longer.`
>>>>>>> changeEmailMessage
  })
}

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
}

