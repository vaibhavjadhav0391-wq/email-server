const express = require("express");
const nodemailer = require("nodemailer");
const app = express();

app.use(express.json({ limit: "50mb" }));

app.post("/send", async (req, res) => {
    const { to, subject, text, image } = req.body;

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "YOUR_EMAIL@gmail.com",
            pass: "YOUR_APP_PASSWORD"
        }
    });

    let mailOptions = {
        from: "YOUR_EMAIL@gmail.com",
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
