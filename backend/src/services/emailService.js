require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Blood Community Website" <ledohoangkhiem3k@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lịch hiến máu ✔", // Subject line
    html: getBodyHTMLEmail(dataSend),
  });
};
let sendEmailResetPassword = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP, // generated ethereal user
      pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Blood Community Website" <ledohoangkhiem3k@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Đặt lại mật khẩu của bạn ✔", // Subject line
    html: getBodyHTMLResetPassword(dataSend),
  });
}
let getBodyHTMLEmail = (dataSend) => {
  let result = "";
  console.log("dataSend: ", dataSend);
  // if (dataSend.language === "vi") {
  result = `
    
    <h3>Xin chào ${dataSend.donorName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch hiến máu ở website của chúng tôi.</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Tại bệnh viện: ${dataSend.hospitalName}</b></div>

    <div>
    <p>Nếu thông tin trên là đúng, hãy click vào link bên dưới để hoàn tất thủ tục đặt lịch hiến máu </p> <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>

    <p>Mỗi giọt máu cho đi,
    một cuộc đời ở lại!</p>
    
    <div>Với mỗi lần hiến máu bạn có thể
    mang lại cơ hội cứu sống 3 người.</div>

    <div>Hãy cứu lấy mạng người bằng ít máu của mình!</div>
    <div>Xin chân thành cảm ơn.</div>

    `;
  // }
  // if (dataSend.language === "en") {
  //   result = `

  //    <h3>Hello ${dataSend.patientName}!</h3>
  //    <p>You received this email because you booked a medical appointment on the website</p>
  //    <div><b>Time: ${dataSend.time}</b></div>
  //    <div><b>Doctor: ${dataSend.doctorName}</b></div>

  //    <p>If the above information is correct, please click on the link below to complete the medical appointment booking procedure</p>
  //    <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>

  //    <div>Thank you very much</div>
  //   `;
  // }
  return result;
};
let getBodyHTMLResetPassword = (dataSend) => {
  let result = "";
  // if (dataSend.language === "vi") {
  result = `
    
    <h3>Xin chào!</h3>
    <p>Bạn nhận được email để xác nhận việc đặt lại mật khẩu.</p>
    <p>Hãy click vào link bên dưới để hoàn tất thủ tục đặt lại mật khẩu </p> <a href=${dataSend.redirectLink} target="_blank">Click here</a>
    </div>

    <p>Mỗi giọt máu cho đi,
    một cuộc đời ở lại!</p>
    
    <div>Với mỗi lần hiến máu bạn có thể
    mang lại cơ hội cứu sống 3 người.</div>

    <div>Hãy cứu lấy mạng người bằng ít máu của mình!</div>
    <div>Xin chân thành cảm ơn.</div>

    `;
  // }
  // if (dataSend.language === "en") {
  //   result = `

  //    <h3>Hello ${dataSend.patientName}!</h3>
  //    <p>You received this email because you booked a medical appointment on the website</p>
  //    <div><b>Time: ${dataSend.time}</b></div>
  //    <div><b>Doctor: ${dataSend.doctorName}</b></div>

  //    <p>If the above information is correct, please click on the link below to complete the medical appointment booking procedure</p>
  //    <div><a href=${dataSend.redirectLink} target="_blank">Click here</a></div>

  //    <div>Thank you very much</div>
  //   `;
  // }
  return result;
};
// let getBodyHTMLRemedy = (dataSend) => {
//   let result = "";
//   // if (dataSend.language === "vi") {
//     result = `
//     <h3>Xin chào ${dataSend.patientName}!</h3>
//     <p>Bạn nhận được email này vì đã đặt lịch khám bệnh ở website</p>
//     <p>Thông tin đơn thuốc, hóa đơn được sửi trong file đính kèm</p>


//     <div>Chân thành cảm ơn</div>
//     `;
//   // }
//   // if (dataSend.language === "en") {
//   //   result = `

//   //    <h3>Hello ${dataSend.patientName}!</h3>
//   //    <p>You received this email because you booked a medical appointment on the website</p>


//   //    <div>Thank you very much</div>
//   //   `;
//   // }
//   return result;
// };
// let sendAttachment = async (dataSend) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let transporter = nodemailer.createTransport({
//         host: "smtp.gmail.com",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//           user: process.env.EMAIL_APP, // generated ethereal user
//           pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
//         },
//       });

//       let info = await transporter.sendMail({
//         from: '"Hoang Khiem 👻" <ledohoangkhiem3k@gmail.com>', // sender address
//         to: dataSend.email, // list of receivers
//         subject: "Kết quả đặt lịch khám bệnh ✔", // Subject line
//         html: getBodyHTMLRemedy(dataSend),
//         attachments: [
//           {
//             filename: `remedy-${dataSend.patientId}.png`,
//             content: dataSend.imgBase64.split("base64,")[1],
//             encoding: "base64",
//           },
//         ],
//       });
//       resolve(true);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };
module.exports = { sendSimpleEmail, sendEmailResetPassword };
