const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();

// view engine
app.engine(
	"handlebars",
	exphbs({
		extname: "handlebars",
		layoutsDir: "views/",
	})
);
app.set("view engine", "handlebars");

// body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// static folder
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
	res.render("main", { layout: false });
});

app.post("/", (req, res) => {
	const output = `
    <p>You have a new contact request</p>
    <h3> Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Name: ${req.body.email}</li>
    <li>Name: ${req.body.subjec}</li>
    <li>Name: ${req.body.message}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    `;

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: "melany.gislason77@ethereal.email", // generated ethereal user
			pass: "Dte9zjUHxzq4muHZwt", // generated ethereal password
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	// setup email data with unicode symbols
	let mailOptions = {
		from: '"Nodemailer Contact" <melany.gislason77@ethereal.email>', // sender address
		to: "alexpulido33@gmail.com", // list of receivers
		subject: "Node Contact Request", // Subject line
		text: "Hello world?", // plain text body
		html: output, // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log("Message sent: %s", info.messageId);
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

		res.render("main");
	});
});

app.listen(3000, () => {
	console.log("server started");
});
