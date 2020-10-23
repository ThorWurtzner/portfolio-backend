require("dotenv").config();
var nodemailer = require("nodemailer");
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

var GMAIL_USER = process.env.EMAIL;
var GMAIL_PASS = process.env.PASS;
var PORT = 8080;

var app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// View engine setup
app.engine('handlebars', exphbs({
  defaultLayout: null
}));
app.set('view engine', 'handlebars');

app.use('/', express.static('public'));

app.get("/contact", (req, res) => {
  res.render('contact', {layout: false});
});

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));

app.post("/contact", (req, res) => {
  var smtpTrans = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    }
  });

  var mailOptions = {
    from: "Your sender info here", // ignored by gmail
    to: GMAIL_USER,
    subject: "New message from contact form",
    text: `${req.body.name} (${req.body.email}) says: ${req.body.message}`,
    html: 
    `
    <p> New contact request </p>
    <h3> Contact Details </p>
    <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `
  };

  smtpTrans.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Message is sent...");
      res.render('contact', {msg: 'Email is sent...'});
    }
  });
});
