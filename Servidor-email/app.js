const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(cors({ origin: 'http://192.168.100.144:3000' }));
app.use(express.json());   


// Configura tu transportador de correo aquí
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
      auth: {
          user: 'cbas.secoli@gmail.com', // Reemplaza con tu correo
          pass: '' // Reemplaza con tu contraseña
      }
});

app.post('/send-email', (req, res) => {
  const { email } = req.body;

  const mailOptions = {
    from: 'cbas.secoli@gmail.com',
    to: email,
    subject: 'Correo de prueba',
    text: 'Este es un correo enviado desde tu aplicación React'
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error al enviar el correo***********');
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ message: 'Correo enviado exitosamente' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});