import nodemailer from "nodemailer";

export const sendEmail = async message => {
  try {
    // Create a Nodemailer transporter

    
    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      service: "gmail",
      port: 587,
      auth: {
        user: process.env.userEmail,
        pass: process.env.pass,
      },
    });

    // Send the email
    const info = await transporter.sendMail(message);

    // res.send("Email sent successfully");
  } catch (err) {
    console.error("Error sending email:", err);
    throw err; // Rethrow the error to handle it in the calling function or controller
  }
};
