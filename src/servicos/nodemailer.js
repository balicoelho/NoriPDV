
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.NODEMAILER_HOST,
    port: process.env.NODEMAILER_PORT,
    secure: false,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
    },
});

enviarEmail = async(email) => {
    await transporter.sendMail({
        from: process.env.NODEMAILER_USER, 
        to: email, 
        subject: "Seu pedido foi cadastrado com suuuuuucesso!", 
        html: "<b>O tempo de entrega leva de 2 a 3 dias úteis. :D</b>"
    });
};

module.exports = {
    enviarEmail
};