const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

require("dotenv").config();  // load .env file
app.use(express.json({ limit: "50mb" }));

app.post("/send", async (req, res) => {
    const { to, subject, text, image } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,       // safe
            pass: process.env.EMAIL_PASSWORD    // safe
        }
    });

    let mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        attachments: []
    };

    if (image) {
        mailOptions.attachments.push({
            filename: "intruder.jpg",
            content: image,
            encoding: "base64"
        });
    }

    try {
        await transporter.sendMail(mailOptions);
        res.send("Email Sent Successfully");
    } catch (err) {
        res.status(500).send(err.toString());
    }
});

app.listen(3000, () => console.log("SERVER RUNNING"));
