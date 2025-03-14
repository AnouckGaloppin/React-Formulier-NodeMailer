import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());
app.post("/send", async (req, res) => {
  const { firstname, lastname, birthDate, hairColor, height, gender, remarks } =
    req.body;
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "testanouck870@gmail.com",
    subject: "Nieuw formulier ingevuld",
    html: `
    <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e2e8f0; border-radius:10px; background-color: #ffffff; font-family: Arial, sans-serif;">
      
      <h2 style="background-color: #db7093; color: white; padding: 15px; border-radius: 8px; text-align:center; margin-bottom: 20px;">
      We hebben je gegevens goed ontvangen!
      </h2>
      
      <table style="width: 100%; border-collapse: collapse;);">
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #1e293b;">Voornaam:</td>
          <td style="padding: 10px; color: #475569;">${firstname}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #1e293b;">Achternaam:</td>
          <td style="padding: 10px; color: #475569;">${lastname}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #1e293b;">Geboortedatum:</td>
          <td style="padding: 10px; color: #475569;">${birthDate}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #1e293b;">Haarkleur:</td>
          <td style="padding: 10px;">
            <span style="display: inline-block; width: 20px; height: 20px; background-color: ${hairColor}; border-radius: 50%;"></span>
            <span style="color: #475569; margin-left: 10px;">${hairColor}</span>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #1e293b;">Lengte:</td>
          <td style="padding: 10px; color: #475569;">${height} cm</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #1e293b;">Geslacht:</td>
          <td style="padding: 10px; color: #475569;">${gender}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; color: #1e293b;">Opmerking:</td>
          <td style="padding: 10px; color: #475569;">${remarks}</td>
        </tr>
      </table>

      <p style="margin-top: 20px; text-align: center; font-size: 14px; color: #64748b;">
        ✅ Dit is een automatisch bericht. Wij gaan nu voor jou aan het werk.
      </p>

    </div>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Formulier verzonden");
  } catch (error) {
    res.status(500).send("Er is een fout opgetreden");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
